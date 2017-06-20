IonicApp.controller('NewsCtrl', function ($scope, $state, $stateParams, $ionicLoading, NewsService) {

    $scope.goDetail = function (item) {
        $state.go('app.tabs.news-detail', { data: JSON.stringify(item) });
    }

    $scope.initNews = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="android"></ion-spinner><p>Loading...</p>'
        }).then(function () {
            NewsService.getNewsPromotion().then(function (news) {
                $ionicLoading.hide().then(function () {
                    $scope.newsPromotion = news;
                });
            }, function (error) {
                $ionicLoading.hide().then(function () {
                    alert(error.message);
                });
            });
        });
    }

    $scope.initNewsDetail = function () {
        $scope.detail = JSON.parse($stateParams.data);
    }

});