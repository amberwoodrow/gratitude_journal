app.factory('SessionFactory', ['$q', '$timeout', '$http', '$cookies', function($q, $timeout, $http, $cookies){
  

  // return available functions for use in controllers
  return ({
    getUserStatus: getUserStatus,
    login: login,
    // logout: logout,
    register: register,
  });

  function getUserStatus() {
    var authenticated = $cookies.get('loggedin');
    if(authenticated) {
      return true;
    } else {
      return false;
    }
  }

  //post request
  function register(payload) {
    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('api/v1/journalUsers', payload)
      // handle success
      .success(function (data, status) {
        if(status === 200){
          $cookies.put('loggedin', JSON.stringify(data));
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      // handle error
      .error(function (data) {
        deferred.reject();
      });

    // return promise object
    return deferred.promise;

  }

  function login(payload) {
    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('api/v1/login', payload)
      // handle success
      .success(function (data, status) {
        if(status === 200){
          // set login cookie
          $cookies.put('loggedin', JSON.stringify(data));
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      // handle error
      .error(function (data) {
        deferred.reject();
      });

    // return promise object
    return deferred.promise;
  }


}]);

app.factory('EntryFactory', ['$q', '$timeout', '$http', '$cookies', function($q, $timeout, $http, $cookies){

  return ({
    postEntry: postEntry,
    getEntries: getEntries
  });

  function postEntry(payload) {
    return $http.post('api/v1/journalEntry', payload);
  }

  function getEntries(payload) {
    return $http.get('api/v1/journalEntries?_id=' +payload.currentUser._id+ '', {data: payload});
  }

}]);

