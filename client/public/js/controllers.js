app.controller('mainController', function($scope, SessionFactory, EntryFactory, $location, $cookies) {

  $scope.entries = '';
  if ($cookies.get('loggedin') !== undefined) {
    $scope.cakes = JSON.parse($cookies.get('loggedin')).email;
  }
  $scope.date = Date.now();

  $scope.isLoggedin = function() {
    if ($cookies.get('loggedin') !== undefined) {
      $scope.signedIn = true;
      return $scope.signedIn;
    } else {
      $scope.signedIn = false;
      return $scope.signedIn;
    }
  };

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
      var temp = [];
      for (var i=0; i<$scope.entries.length; i++) {
        for (var j=0; j<$scope.entries[i].items.length; j++) {
        //loop through the days
        //loop through the array of entries and add them to the temp array, one by one
          temp.push($scope.entries[i].items[j]);
        }
      }
      temp.push($scope.items);
      console.log(temp)

      // $scope.entries.push($scope.items);
      var payload = {
        'items': temp,
        'currentUser': JSON.parse($cookies.get('loggedin'))
      };
      console.log(payload)
      postEntry(payload);
      $scope.items = [];
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












  $scope.today = function() {
    $scope.dt = new Date();
  };

  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open = function($event) {
    $scope.status.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.status = {
    opened: false
  };



  $scope.changeDate = function() {
    var payload = {
      'currentUser': JSON.parse($cookies.get('loggedin')),
      'timeStamp': $scope.dt
    };
    getEntries(payload);
  };

});


// var ignore = ['for', 'and', 'nor', 'or', 'but', 'yet', 'so', 'all things not letters or intagers, except periods with an int directly behind it', 'after', 'although', 'as', 'because', 'before', 'if', 'we\'re', 'long', 'once', 'now', 'that', 'since', 'though', 'unless', 'until', 'when', 'where', 'while', 'such', 'scare', 'scarely', 'many', 'soon', 'rather', 'than'];
