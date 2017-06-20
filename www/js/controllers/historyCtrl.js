IonicApp.controller('HistoryCtrl', function ($scope, $state, $stateParams, $ionicLoading, $timeout, ChangeCoinService, KeepCoinService) {

    $scope.goToChangeCoin = function () {
        $state.go('app.tabs.change-coin-list');
    }

    $scope.goToKeepCoin = function () {
        $state.go('app.tabs.keep-coin-list');
    }

    $scope.goToChangeDetail = function (item) {
        $state.go('app.tabs.change-coin-detail', { changeCoinDate: item });
    }

    $scope.goToKeepDetail = function (item) {
        $state.go('app.tabs.keep-coin-detail', { keepCoinMonth: item });
    }

    $scope.initChangeCoinList = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="android"></ion-spinner><p>Loading...</p>'
        }).then(function () {
            ChangeCoinService.getChangeCoinList().then(function (changeCoinList) {
                $ionicLoading.hide().then(function () {
                    $scope.changeCoinList = changeCoinList;
                });
            }, function (error) {
                $ionicLoading.hide().then(function () {
                    alert(error.message);
                });
            });
        });
    }

    $scope.initChangeCoinDetail = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="android"></ion-spinner><p>Loading...</p>'
        }).then(function () {
            $timeout(function () {
                $scope.changeCoinDate = (+new Date($stateParams.changeCoinDate));
                var newDate = new Date($scope.changeCoinDate);
                var year = newDate.getFullYear();
                var month = newDate.getMonth();
                var date = newDate.getDate();
                var passDate = year + '-' + (month > 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date > 10 ? (date) : '0' + (date));
                console.log(passDate);
                ChangeCoinService.getChangeCoinDetail(passDate).then(function (changeCoinDetail) {
                    $ionicLoading.hide().then(function () {
                        $scope.changeCoinDetail = changeCoinDetail.data;
                    });
                }, function (error) {
                    $ionicLoading.hide().then(function () {
                        alert(error.message);
                    });
                });
                $ionicLoading.hide().then(function () {
                });
            }, 1000);
        });
    }

    $scope.initKeepCoinList = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="android"></ion-spinner><p>Loading...</p>'
        }).then(function () {
            KeepCoinService.getKeepCoinList().then(function (keepCoinList) {
                $ionicLoading.hide().then(function () {
                    $scope.keepCoinList = keepCoinList;
                });
            }, function (error) {
                $ionicLoading.hide().then(function () {
                    alert(error.message);
                });
            });
        });
    }

    $scope.initKeepCoinDetail = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="android"></ion-spinner><p>Loading...</p>'
        }).then(function () {
            $timeout(function () {
                $scope.keepCoinMonth = (+new Date($stateParams.keepCoinMonth));
                var newDate = new Date($scope.keepCoinMonth);
                var year = newDate.getFullYear();
                var month = newDate.getMonth();
                var passMonth = year + '-' + (month > 10 ? (month + 1) : '0' + (month + 1));
                console.log(passMonth);
                KeepCoinService.getKeepCoinDetail(passMonth).then(function (keepCoinDetail) {
                    $ionicLoading.hide().then(function () {
                        $scope.keepCoinDetail = keepCoinDetail.data;
                    });
                }, function (error) {
                    $ionicLoading.hide().then(function () {
                        alert(error.message);
                    });
                });
                $ionicLoading.hide().then(function () {
                });
            }, 1000);
        });
    }

    $scope.parseDate = function (date) {
        return (+ new Date(date));
    }

});