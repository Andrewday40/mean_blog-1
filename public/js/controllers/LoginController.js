(function() {
  angular.module('ngBlog')
          .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'AuthService', '$location', '$route'];

  function LoginController($scope, AuthService, $location, $route){
    $scope.login = login;

    $scope.user = {
      email: 'justin@dennison.com',
      password: 'password'
    };
    function login(user){
      AuthService.login(user)
            .then(function(){
              $location.path('/');
              // $route.reload();
            })
            .catch(function(err){
              console.log(err);
            });
    }
  }
}());
