(function() {
  angular.module('ngBlog')
        .factory('AuthService', AuthService);

  AuthService.$inject = ['$http', '$window'];

  function AuthService($http, $window){
    var loginUrl = 'https://calm-atoll-49293.herokuapp.com/login/';
    var service = {
      currentUser: currentUser,
      saveToken: saveToken,
      getToken: getToken,
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout
    };
    return service;
    function currentUser(){
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        console.log('Payload:', payload);
        return {
          email: payload.email
        }
      }
    }
    function saveToken(token){
      $window.localStorage['mean-token'] = token;
      console.log($window.localStorage);
    }
    function getToken(){
      return $window.localStorage['mean-token'];
    }
    function isLoggedIn(){
      var token = getToken();
      var payload;
      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.expiration > new Date() / 1000;
      } else {
        return false;
      }
    }
    function login(user){
      return $http.post(loginUrl, user)
                  .then(function(response){
                    saveToken(response.data.token);
                  })
                  .catch(function(err){
                    console.log(err);
                  });
    }
    function logout(){
      $window.localStorage.removeItem('mean-token');
    }
  }

}());
