(function() {
  angular.module('ngBlog')
        .controller('NavBarController', NavBarController);

  NavBarController.$inject = ['$scope', 'AuthService', '$location'];

  function NavBarController($scope, AuthService, $location){
    $scope.isLoggedIn = AuthService.isLoggedIn;
    $scope.logout = logout;
    $scope.user = AuthService.currentUser();


    function logout(){
      AuthService.logout();
    }
  }
}());
