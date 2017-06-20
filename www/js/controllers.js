IonicApp.controller('AppCtrl', function ($scope, $rootScope, $state, $timeout, $ionicLoading, $ionicHistory, $ionicScrollDelegate, AuthenService) {

    // set ready scanner 
    var pickerQR = null;
    var pickerSN = null;
    $rootScope.QRScan = true;
    $rootScope.SNScan = false;
    $rootScope.scanditOn = false;
    $rootScope.data = window.localStorage.getItem("scannerItem") ? JSON.parse(window.localStorage.getItem("scannerItem")) : [];

    $rootScope.getScanItem = function () {
        $rootScope.data = window.localStorage.getItem("scannerItem") ? JSON.parse(window.localStorage.getItem("scannerItem")) : [];
    }

    $rootScope.openScanSN = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="android"></ion-spinner><p>Loading...</p>'
        }).then(function () {
            console.log("The loading is show");
        });
        $rootScope.scanditOn = true;
        $rootScope.QRScan = false;
        $rootScope.SNScan = true;
        // window.localStorage.setItem("ModeScan", "SNScan");
        if (pickerQR) {
            stopQR();
        }
        Scandit.License.setAppKey("AeHa/lpHQA+cOZyNXQMRo+Qm9N3ZQBlVh3aznBdad+iJeaQ/TVA1UWJgd7IySmM/41OjxZ1lTIE3ctCehGR25scWv0QWTwHtjjxWLCdPg9xGOo7waBkpivAr9rqEHbX00UqNCa6fGcET6CreAvmP5QFvFD+b9p1+ZjRZMgcaVNgUcE0bDmsRtuaVYbzvWNUdqEdpTfqD1hzxRYeT7naP4Xg3GrcqolB8LzXAeZv+FCuD886gVjLvYDDmi5c9OXwkQ+LJvPICqy4LuaJmg63ngl8T0RHyA/HgKEw2pnPkwioPpwBdE0DA0+oS2hGY9+IInAXehlKtq9SCfsn0djQg5bH681aQk1LD8DbD4MvgxVTbk+ObRoOwZOTgX7MGB2pUaSVrEb7kQwW2Hs87bN+rjVjtMb03cwVXSNFUTXlA3+zVZ9dgCdmrqyF8FXoa29XbzHanoRzGtVovKczsoDnrYvlj4Ar0H2kLQD7skGxxOcAPQU4E5GgHbAF55RHatyygvlrHnaPVizbD72Ef9ID/Ipu4RO1EIf37E72Iqw176lUgJTnHDl5XfKv3+myGkZWpoEvQDfCGchL9TUAFJghiScpkB/zjjJbyVEZjbni6LwulFDOwVlffKDi8TFa9JcOxmMCNWAeeJ1Y4/h4D7+R2AJNjmiC39w+XKJ0sG5ygKfgpAi450n3auv9kU1dSjbB7s8TPNL6Q4d1yKcDFQ0tFWMIQW06VmXdnBvW3VihUdrn28AdPW28806SDki2POTHPDHvyDQlcr1fThbtF9AJgxDVWlt2QEZWDN7M=");
        var settingsSN = new Scandit.ScanSettings();
        settingsSN.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN13, true);
        settingsSN.setSymbologyEnabled(Scandit.Barcode.Symbology.UPC12, true);
        settingsSN.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN8, true);
        settingsSN.setSymbologyEnabled(Scandit.Barcode.Symbology.CODE39, true);
        settingsSN.setSymbologyEnabled(Scandit.Barcode.Symbology.QR, false);
        settingsSN.codeDuplicateFilter = -1;
        pickerSN = new Scandit.BarcodePicker(settingsSN);
        pickerSN.continuousMode = true;
        pickerSN.getOverlayView().setViewfinderDimension(0.9, 0.5, 0.9, 0.9);
        pickerSN.setMargins(new Scandit.Margins(16, 120, 16, 200), null, 0);
        pickerSN.show(success, null, failure);
        pickerSN.startScanning();
        $timeout(function () {
            $ionicLoading.hide().then(function () {
                console.log("The loading is hidden");
            });
        }, 2000);
    }

    $rootScope.openScanQR = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="android"></ion-spinner><p>Loading...</p>'
        }).then(function () {
            console.log("The loading is show");
        });
        $rootScope.scanditOn = true;
        $rootScope.QRScan = true;
        $rootScope.SNScan = false;
        // window.localStorage.setItem("ModeScan", "QRScan");
        if (pickerSN) {
            stopSN();
        }
        Scandit.License.setAppKey("AeHa/lpHQA+cOZyNXQMRo+Qm9N3ZQBlVh3aznBdad+iJeaQ/TVA1UWJgd7IySmM/41OjxZ1lTIE3ctCehGR25scWv0QWTwHtjjxWLCdPg9xGOo7waBkpivAr9rqEHbX00UqNCa6fGcET6CreAvmP5QFvFD+b9p1+ZjRZMgcaVNgUcE0bDmsRtuaVYbzvWNUdqEdpTfqD1hzxRYeT7naP4Xg3GrcqolB8LzXAeZv+FCuD886gVjLvYDDmi5c9OXwkQ+LJvPICqy4LuaJmg63ngl8T0RHyA/HgKEw2pnPkwioPpwBdE0DA0+oS2hGY9+IInAXehlKtq9SCfsn0djQg5bH681aQk1LD8DbD4MvgxVTbk+ObRoOwZOTgX7MGB2pUaSVrEb7kQwW2Hs87bN+rjVjtMb03cwVXSNFUTXlA3+zVZ9dgCdmrqyF8FXoa29XbzHanoRzGtVovKczsoDnrYvlj4Ar0H2kLQD7skGxxOcAPQU4E5GgHbAF55RHatyygvlrHnaPVizbD72Ef9ID/Ipu4RO1EIf37E72Iqw176lUgJTnHDl5XfKv3+myGkZWpoEvQDfCGchL9TUAFJghiScpkB/zjjJbyVEZjbni6LwulFDOwVlffKDi8TFa9JcOxmMCNWAeeJ1Y4/h4D7+R2AJNjmiC39w+XKJ0sG5ygKfgpAi450n3auv9kU1dSjbB7s8TPNL6Q4d1yKcDFQ0tFWMIQW06VmXdnBvW3VihUdrn28AdPW28806SDki2POTHPDHvyDQlcr1fThbtF9AJgxDVWlt2QEZWDN7M=");
        var settingsQR = new Scandit.ScanSettings();
        settingsQR.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN13, false);
        settingsQR.setSymbologyEnabled(Scandit.Barcode.Symbology.UPC12, false);
        settingsQR.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN8, false);
        settingsQR.setSymbologyEnabled(Scandit.Barcode.Symbology.CODE39, false);
        settingsQR.setSymbologyEnabled(Scandit.Barcode.Symbology.QR, true);
        settingsQR.codeDuplicateFilter = -1;
        pickerQR = new Scandit.BarcodePicker(settingsQR);
        pickerQR.continuousMode = true;
        pickerQR.getOverlayView().setViewfinderDimension(0.9, 0.9, 0.9, 0.9);
        pickerQR.setMargins(new Scandit.Margins(16, 120, 16, 200), null, 0);
        pickerQR.show(success, null, failure);
        pickerQR.startScanning();
        $timeout(function () {
            $ionicLoading.hide().then(function () {
                console.log("The loading is hidden");
            });
        }, 2000);
    }

    $rootScope.closeScan = function () {
        $rootScope.scanditOn = false;
        stopQR();
        stopSN();
    }

    function stopQR() {
        if (pickerQR) {
            pickerQR.cancel();
        }
    }

    function stopSN() {
        if (pickerSN) {
            pickerSN.cancel();
        }
    }

    // function start() {
    //     picker.startScanning();
    //     picker.setMargins(new Scandit.Margins(16, 120, 16, 200), null, 0.5);
    //     picker.getOverlayView().setViewfinderDimension(0.9, 0.9, 0.9, 0.9);
    // }

    function success(session) {
        // alert(session.newlyRecognizedCodes[0].data);
        $rootScope.data.push(session.newlyRecognizedCodes[0]);
        window.localStorage.setItem("scannerItem", JSON.stringify($rootScope.data));
        $ionicHistory.clearCache();
        $ionicScrollDelegate.scrollBottom();
    }

    function failure(error) {
        // alert("Failed: " + error);
    }
    // end ready scanner 

    $scope.logout = function () {
        $state.go('login');
        AuthenService.logout();
    }

    $scope.gohome = function () {
        $state.go('app.tabs');
    }
})

