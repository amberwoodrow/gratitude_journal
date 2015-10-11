var app = angular.module("myApp", ['ngRoute', 'ngCookies']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './views/partials/index.html',
    controller: 'mainController',
    access: {restricted: false}
  }).when('/home', {
    templateUrl: './views/partials/user_home.html',
    controller: 'mainController',
    access: {restricted: true}
  });
});

app.run(function ($rootScope, $location, $route, SessionFactory) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && !SessionFactory.getUserStatus()) {
      $location.path('/');
    }
  });
});

// myApp.run(function ($rootScope, $location, $route, AuthService) {
//   $rootScope.$on('$routeChangeStart', function (event, next, current) {
//     if (next.access.restricted && !AuthService.getUserStatus()) {
//       $location.path('/login');
//     }
//   });
// });