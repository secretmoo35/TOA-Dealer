IonicApp.service('ChangeCoinService', function ($q, $http, Config) {

    this.getChangeCoinList = function () {
        var dfd = $q.defer();
        $http.get(Config.apiUrl + 'api/getchangecoinlist').success(function (changeCoinList) {
            dfd.resolve(changeCoinList);
        }).error(function (error) {
            dfd.reject(error);
        });
        return dfd.promise;
    }

    this.getChangeCoinDetail = function (date) {
        var dfd = $q.defer();
        $http.get(Config.apiUrl + 'api/getchangecoinbyday/' + date).success(function (changeCoinDetail) {
            dfd.resolve(changeCoinDetail);
        }).error(function (error) {
            dfd.reject(error);
        });
        return dfd.promise;
    }

});