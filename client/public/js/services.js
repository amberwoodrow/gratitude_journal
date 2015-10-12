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
    console.log(authenticated);
    if(authenticated) {
      return true;
    } else {
      return false;
    }
  }

  //post request
  function register(payload) {
    return $http.post('api/v1/journalUsers', payload);
  }

  function login(payload) {
  // return $http.post('api/v1/login', payload);
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
        user = false;
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

// app.factory('currentDateService', [function(){
//   // returns a date with full month name
//   function dateToDisplay() {
//     var d = new Date();
//     var monthNames = ["January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
//     var date = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
//     return date;
//   }
// }]);
