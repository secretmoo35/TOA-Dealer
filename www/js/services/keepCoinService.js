IonicApp.service('KeepCoinService', function ($q, $http, Config) {

    this.getKeepCoinList = function () {
        var dfd = $q.defer();
        $http.get(Config.apiUrl + 'api/getchangecoinbymonth').success(function (keepCoinList) {
            dfd.resolve(keepCoinList);
        }).error(function (error) {
            dfd.reject(error);
        });
        return dfd.promise;
    }

    this.getKeepCoinDetail = function (month) {
        var dfd = $q.defer();
        $http.get(Config.apiUrl + 'api/getchangecoinbymonth/' + month).success(function (keepCoinDetail) {
            dfd.resolve(keepCoinDetail);
        }).error(function (error) {
            dfd.reject(error);
        });
        return dfd.promise;
    }

});