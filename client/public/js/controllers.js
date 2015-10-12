app.controller('mainController', function($scope, SessionFactory, EntryFactory, $location, $cookies) {

  $scope.loggedin = false;

  $scope.entries = '';
  if ($cookies.get('loggedin') !== undefined) {
    console.log($scope.loggedin);
    $scope.cakes = JSON.parse($cookies.get('loggedin')).email;
    $scope.loggedin = true;
  }
  $scope.date = Date.now();

  // $scope.date = currentDateService.dateToDisplay();

  // $scope.timeStampToDate = function(time) {
  //   $scope.dateForStamp = currentDateService.dateToDisplay(time);
  // };

  $scope.goHome = function() {
    $location.path('home');
  };

  function register(payload) {  
    SessionFactory.register(payload)
    .then(function(response) {
      $location.path('home');
      console.log("successfully signed up");
    })
    .catch(function(data) {
      console.log('Error: ' + "Register no good");
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
      $scope.entry = "";
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

  if($cookies.get('loggedin') !== undefined) {
    $scope.doGetEntries();
  }
  // });

});


// var ignore = ['for', 'and', 'nor', 'or', 'but', 'yet', 'so', 'all things not letters or intagers, except periods with an int directly behind it', 'after', 'although', 'as', 'because', 'before', 'if', 'we\'re', 'long', 'once', 'now', 'that', 'since', 'though', 'unless', 'until', 'when', 'where', 'while', 'such', 'scare', 'scarely', 'many', 'soon', 'rather', 'than'];
