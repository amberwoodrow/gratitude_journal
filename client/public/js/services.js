app.factory('HTTPfactory', ['$http', function($http){
 var obj = {};

 //get request
 obj.get = function() {
   return $http.get('api/v1/journalUsers');
 };

 //post request
 obj.post = function(payload) {
   return $http.post('api/v1/journalUsers', payload);
 };

 return obj;
}]);