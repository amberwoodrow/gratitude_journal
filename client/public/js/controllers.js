app.controller('mainController', function($scope, SessionFactory, EntryFactory, $location, $cookies) {

  // $scope.loggedin = "YO";
  $scope.entries = '';

  function register(payload) {  
    SessionFactory.register(payload).success(function(response) {
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
  };

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
    $location.path('/');
  };

  // app.controller('entryController', function($scope, EntryFactory, $location) {

    function postEntry(payload) { 
      EntryFactory.postEntry(payload)
      .then(function(response) {
      })
      .catch(function(data) {
        console.log('Error: ' + data);
      });
    }

    $scope.addEntry = function() {
      var payload = {
        'entry': [$scope.entry],
        'currentUser': JSON.parse($cookies.get('loggedin'))
      };
      postEntry(payload);
    };


    function getEntries(payload) {
      EntryFactory.getEntries(payload)
      .then(function(response) {
        $scope.entries = response.data;
      })
      .catch(function(data) {
        console.log('Error: ' + data);
      });
    }

    $scope.doGetEntries = function() {
      var payload = {
        'currentUser': JSON.parse($cookies.get('loggedin'))
      };
      getEntries(payload);
    };

  $scope.doGetEntries();

  // });

});


// var ignore = ['for', 'and', 'nor', 'or', 'but', 'yet', 'so', 'all things not letters or intagers, except periods with an int directly behind it', 'after', 'although', 'as', 'because', 'before', 'if', 'we\'re', 'long', 'once', 'now', 'that', 'since', 'though', 'unless', 'until', 'when', 'where', 'while', 'such', 'scare', 'scarely', 'many', 'soon', 'rather', 'than'];
