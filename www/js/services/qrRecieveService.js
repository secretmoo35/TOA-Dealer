IonicApp.service('QRRecieveService', function ($q, $http, Config) {

    this.sendQRRecieve = function (qrRecieve) {
        var dfd = $q.defer();
        $http.post(Config.apiUrl + 'api/checkQrcode', qrRecieve).success(function (recieve) {
            window.localStorage.removeItem("scannerItem");
            dfd.resolve(recieve);
        }).error(function (error) {
            dfd.reject(error);
        });
        return dfd.promise;
    }

});