IonicApp.service('AuthenService', function ($q, $http, Config) {

    this.login = function (login) {
        var dfd = $q.defer();
        $http.post(Config.apiUrl + 'api/auth/signin', login).success(function (user) {
            window.localStorage.setItem('TOA_user', JSON.stringify(user))
            dfd.resolve(user);
        }).error(function (error) {
            dfd.reject(error);
        });
        return dfd.promise;
    }

    this.logout = function (login) {
        window.localStorage.removeItem('TOA_user');
        return;
    }

    this.getUser = function (login) {
        return window.localStorage.getItem('TOA_user') ? JSON.parse(window.localStorage.getItem('TOA_user')) : null;
    }

    this.registerPushNoti = function (register) {
        var dfd = $q.defer();
        $http.post(Config.apiUrl + 'api/pushnotifications', register).success(function (response) {
            dfd.resolve(response);
        }).error(function (error) {
            dfd.reject(error);
        });
        return dfd.promise;
    }


});