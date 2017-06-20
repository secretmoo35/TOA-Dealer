IonicApp.controller('AuthenCtrl', function ($scope, $state, $timeout, AuthenService, $ionicLoading) {

    $scope.login = {}

    $scope.doLogin = function (login) {
        $ionicLoading.show({
            template: '<ion-spinner class="android"></ion-spinner><p>login...</p>'
        }).then(function () {
            AuthenService.login(login).then(function (user) {
                var register = {
                    user_id: user._id,
                    user_name: user.username,
                    device_token: window.localStorage.getItem("push_token"),
                    device_uuid: window.localStorage.getItem("uuid"),
                    role: user.roles[0]
                }
                // alert(JSON.stringify(register));
                AuthenService.registerPushNoti(register).then(function (response) {
                    $ionicLoading.hide().then(function () {
                        $state.go('app.tabs.news');
                    });
                }, function (err) {
                    $ionicLoading.hide().then(function () {
                        alert(err.message);
                    });
                });
            }, function (err) {
                $ionicLoading.hide().then(function () {
                    alert(err.message)
                });
            });
        });
    }

});