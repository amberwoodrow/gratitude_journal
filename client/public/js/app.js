var app = angular.module("myApp", ['ngRoute', 'ngCookies', 'ngAnimate', 'ui.bootstrap']);

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
  });//.otherwise('/')
});

app.run(function ($rootScope, $location, $route, SessionFactory) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && !SessionFactory.getUserStatus()) {
      $location.path('/');
    }
  });
});