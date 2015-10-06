app.controller('mainController', function($scope, HTTPfactory, $location) {

  // get request
  function getData() {
    HTTPfactory.get().success(function(response){
      $scope.journalUsers = response;
    })
    .error(function(error){
      console.log(error);
    });
  }
  getData();

 //post request
  function postData(payload) {  
    HTTPfactory.post(payload).success(function(response) {
      $scope.journalUsers.push(response);
    })
    .error(function(data) {
    console.log('Error: ' + data);
    });
  }
  $scope.addUser = function() {
    var payload = {
      'email': $scope.email,
      'password': $scope.password
    };
    postData(payload);
    // $location.path('/user_home');
  };

});