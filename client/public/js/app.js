var app = angular.module("myApp", ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './views/partials/index.html',
    controller: 'mainController'
  }).when('/home', {
    templateUrl: './views/partials/user_home.html',
    controller: 'mainController'
    // access: {restricted: true}
  });
});

// if user logged in 
  // .when('/', {
  //   templateUrl: './views/partials/user_home.html',
  //   controller: 'mainController'
  // });
// else

// when logged in turn signin signup to logout link