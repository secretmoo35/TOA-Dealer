// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var IonicApp = angular.module('starter', ['ionic', 'ion-floating-menu', 'ngCordova']);

IonicApp.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    window.localStorage.setItem("uuid", device.uuid);

    var push = new Ionic.Push({
      "debug": true
    });

    push.register(function (token) {
      console.log("My Device token:", token.token);
      // prompt('Token', token.token);
      window.localStorage.setItem("push_token", token.token);
      push.saveToken(token);  // persist the token in the Ionic Platform
    });

  });
})

IonicApp.constant('Config', {
  apiUrl: 'https://toa-scanner.herokuapp.com/'
})

IonicApp.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.tabs', {
      url: '/tabs',
      views: {
        'menuContent': {
          templateUrl: 'templates/tabs.html',
          controller: 'TabsCtrl'
        }
      }
    })

    .state('app.tabs.news', {
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'templates/tabs/tab-news.html',
          controller: 'NewsCtrl'
        }
      }
    })

    .state('app.tabs.news-detail', {
      url: "/news-detail",
      params: {
        data: null
      },
      views: {
        'tab-news': {
          templateUrl: 'templates/views/news-detail.html',
          controller: 'NewsCtrl'
        }
      }
    })

    .state('app.tabs.history', {
      url: '/history',
      views: {
        'tab-history': {
          templateUrl: 'templates/tabs/tab-history.html',
          controller: 'HistoryCtrl'
        }
      }
    })

    .state('app.tabs.change-coin-list', {
      url: "/change-coin-list",
      views: {
        'tab-history': {
          templateUrl: 'templates/views/change-coin-list.html',
          controller: 'HistoryCtrl'
        }
      }
    })

    .state('app.tabs.change-coin-detail', {
      url: "/change-coin-detail",
      params: {
        changeCoinDate: null
      },
      views: {
        'tab-history': {
          templateUrl: 'templates/views/change-coin-detail.html',
          controller: 'HistoryCtrl'
        }
      }
    })

    .state('app.tabs.keep-coin-list', {
      url: "/keep-coin-list",
      views: {
        'tab-history': {
          templateUrl: 'templates/views/keep-coin-list.html',
          controller: 'HistoryCtrl'
        }
      }
    })

    .state('app.tabs.keep-coin-detail', {
      url: "/keep-coin-detail",
      params: {
        keepCoinMonth: null
      },
      views: {
        'tab-history': {
          templateUrl: 'templates/views/keep-coin-detail.html',
          controller: 'HistoryCtrl'
        }
      }
    })

    .state('app.tabs.scan-list', {
      url: '/scan-list',
      views: {
        'tab-scanner': {
          templateUrl: 'templates/views/scan-list.html',
          controller: 'ScanListCtrl'
        }
      }
    })

    .state('app.scan-result', {
      url: "/scan-result",
      views: {
        'menuContent': {
          templateUrl: 'templates/views/scan-result.html',
          controller: 'ScanListCtrl'
        }
      }
    })

    .state('app.scan-description', {
      url: "/scan-description",
      params: {
        data: null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/views/scan-description.html',
          controller: 'ScanListCtrl'
        }
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/authen/login.html',
      controller: 'AuthenCtrl'
    })

  // if none of the above states are matched, use this as the fallback
  if (window.localStorage.getItem('TOA_user')) {
    $urlRouterProvider.otherwise('/app/tabs/news');
  } else {
    $urlRouterProvider.otherwise('/login');
  }


  $ionicConfigProvider.platform.android.tabs.position('bottom');
});
