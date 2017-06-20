IonicApp.controller('TabsCtrl', function ($scope, $rootScope, $state, $timeout) {

    $scope.openScanner = function () {
        $state.go('app.tabs.scan-list');
        $timeout(function () {
            $rootScope.openScanQR();
        }, 1000);
    }

    $scope.openHistory = function(){
        $rootScope.closeScan();
        $state.go('app.tabs.history');
    }

    $scope.openNews = function(){
        $rootScope.closeScan();
        $state.go('app.tabs.news');
    }

});