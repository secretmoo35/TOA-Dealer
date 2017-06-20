IonicApp.controller('ScanListCtrl', function ($scope, $rootScope, $stateParams, $timeout, $state, $ionicHistory, $ionicLoading, AuthenService, QRRecieveService) {
    $scope.userLogin = AuthenService.getUser();
    $scope.qrRecieve = {};
    $scope.resultRecieve = null;
    $scope.init = function () {
        $rootScope.scanditOn = true;
        // $ionicLoading.show({
        //     template: '<ion-spinner class="android"></ion-spinner><p>Loading...</p>'
        // }).then(function () {

        // });
    }

    $scope.inputSerialNumber = function () {
        var serialNumber = prompt("Enter serial number", "");
        if (serialNumber === null) {
            // alert("Please input serial number");
        } else if (serialNumber === "") {
            alert("Please input serial number");
        } else {
            console.log(serialNumber);
            $rootScope.data.push({
                symbology: 'sn',
                data: serialNumber
            });
            window.localStorage.setItem("scannerItem", JSON.stringify($rootScope.data));
        }
    }

    $scope.sendSerialNumber = function () {
        var phoneNumber = prompt("Enter customer phone number", "");
        var dataScannerItem = [];
        var i;
        var l = $rootScope.data.length;
        $timeout(function () {
            if (phoneNumber === null) {
                // alert("Please input serial number");
            } else if (phoneNumber === "") {
                alert("Please input serial number");
            } else {
                window.localStorage.setItem("customertel", phoneNumber);
                $ionicLoading.show({
                    template: '<ion-spinner class="android"></ion-spinner><p>Loading...</p>'
                }).then(function () {
                    console.log(phoneNumber);
                    for (i = 0; i < l; i++) {
                        if ($rootScope.data[i].symbology === "qr") {
                            dataScannerItem.push({
                                qr: $rootScope.data[i].data
                            });
                        } else {
                            dataScannerItem.push({
                                sn: $rootScope.data[i].data
                            });
                        }
                    }
                    $scope.qrRecieve = {
                        customernumber: phoneNumber,
                        dealercode: $scope.userLogin.dealercode,
                        qrcode: dataScannerItem
                    }
                    // alert(JSON.stringify($scope.qrRecieve));
                    QRRecieveService.sendQRRecieve($scope.qrRecieve).then(function (result) {
                        $timeout(function () {
                            $ionicLoading.hide().then(function () {
                                // alert(JSON.stringify(result));
                                window.localStorage.removeItem("resultRecieve");
                                window.localStorage.setItem("resultRecieve", JSON.stringify(result));
                                window.localStorage.removeItem("scannerItem");
                                $ionicHistory.clearCache();
                                $ionicLoading.hide().then(function () {
                                    $state.go('app.scan-result');
                                });
                            });
                        }, 1000);
                    }, function (err) {
                        $timeout(function () {
                            $ionicLoading.hide().then(function () {
                                window.localStorage.removeItem("scannerItem");
                                $ionicHistory.clearCache();
                                alert('Error!' + JSON.stringify(err));
                            });
                        }, 1000);
                    });
                });
            }
        }, 0);
    }

    $scope.done = function () {
        window.localStorage.removeItem("resultRecieve");
        $state.go('app.tabs.news');
        $rootScope.getScanItem();
        // window.location = "#/app/tabs/news";
    }

    $scope.initResult = function () {
        $scope.resultList = JSON.parse(window.localStorage.getItem("resultRecieve"));
        // alert(JSON.stringify($scope.resultList));
    }

    $scope.goToDetail = function (data) {
        $state.go('app.scan-description', { data: JSON.stringify(data) });
    }

    $scope.initDescription = function () {
        $scope.dataDescription = JSON.parse($stateParams.data);
    }

});