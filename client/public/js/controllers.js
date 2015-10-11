app.controller('mainController', function($scope, SessionFactory, $location, $cookies) {

 // Register
  function register(payload) {  
    SessionFactory.register(payload).success(function(response) {
      // $scope.journalUsers.push(response);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  }

  $scope.doRegister = function() {
    var payload = {
      'email': $scope.email,
      'password': $scope.password
    };
    register(payload);
    //$location.path('home');
  };

  // Login
  function login(payload) {  
    SessionFactory.login(payload)
    .then(function(response) {
      $location.path('home');
      console.log("successfully signed in");
    })
    .catch(function(data) {
      console.log('Error: ' + data);
    });
  }

  $scope.doLogin = function() {
    var payload = {
      'email': $scope.loginEmail,
      'password': $scope.loginPassword
    };
    login(payload);
  };

  $scope.doLogout = function() {
    $cookies.remove('loggedin');
  };

});

    // $scope.logout = function () {

    //   // console.log(AuthService.getUserStatus());

    //   // call logout from service
    //   AuthService.logout()
    //     .then(function () {
    //       $location.path('/login');
    //     });

    // };

// var ignore = ['for', 'and', 'nor', 'or', 'but', 'yet', 'so', 'all things not letters or intagers, except periods with an int directly behind it', 'after', 'although', 'as', 'because', 'before', 'if', 'we\'re', 'long', 'once', 'now', 'that', 'since', 'though', 'unless', 'until', 'when', 'where', 'while', 'such', 'scare', 'scarely', 'many', 'soon', 'rather', 'than'];


// .controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
//   $scope.credentials = {
//     username: '',
//     password: ''
//   };
//   $scope.login = function (credentials) {
//     AuthService.login(credentials).then(function (user) {
//       $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//       $scope.setCurrentUser(user);
//     }, function () {
//       $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
//     });
//   };
// })