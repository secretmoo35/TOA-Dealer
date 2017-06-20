IonicApp.service('NewsService', function ($q, $http, Config) {

    this.getNewsPromotion = function () {
        var dfd = $q.defer();
        $http.get(Config.apiUrl + 'api/news').success(function (news) {
            dfd.resolve(news);
        }).error(function (error) {
            dfd.reject(error);
        });
        return dfd.promise;
    }

});