
(function() {
  angular.module('ngBlog')
        .factory('UserService', UserService);

  UserService.$inject = ['$http'];

  function UserService($http){
    var baseUrl = 'https://calm-atoll-49293.herokuapp.com/users/';
    var signUpUrl = 'https://calm-atoll-49293.herokuapp.com/signup/';
    var service = {
      getAllUsers: getAllUsers,
      signUp: signUp,
      getOneUser: getOneUser,
      updateUser: updateUser,
      deleteUser: deleteUser
    };
    return service;

    function getAllUsers(){
      return $http.get(baseUrl);
    }
    function signUp(userObj){
      return $http.post(signUpUrl, userObj);
    }
    function getOneUser(userId){
      return $http.get(baseUrl + userId);
    }
    function updateUser(userId, updateInfo){
      return $http.update(baseUrl, updateInfo);
    }
    function deleteUser(userId){
      return $http.delete(baseUrl + userId);
    }
  }
})();
