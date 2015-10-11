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
          $cookies.put('loggedin', 'true');
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



// to post notes, and render them with ng repeat, edit on click, add on click
// app.factory('HTTPfactory', ['$http', function($http){
//   var obj = {};

//   //get request
//   obj.get = function() {
//     return $http.get('api/v1/journalUsers');
//   };

//   //post request
//   obj.post = function(payload) {
//     return $http.post('api/v1/journalUsers', payload);
//   };

//   return obj;
// }]);


//       var Note = function($scope){
//         $scope.items = [];

//         $scope.add = function () {
//           $scope.items.push({ 
//             inlineChecked: false,
//             question: "",
//             questionPlaceholder: "foo",
//             text: ""
//           });
//         };
//       }