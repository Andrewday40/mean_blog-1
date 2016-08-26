(function() {
  angular.module('ngBlog')
        .controller('NavBarController', NavBarController);

  NavBarController.$inject = ['$scope', 'AuthService', '$location'];


  /**
   * NavBarController - description
   *
   * @param  {object} $scope      Angular service that exposes functions and data
   *                              to the DOM
   * @param  {object} AuthService Our custom written AuthService that allows for
   *                            Authentication and persistence of a user
   * @param  {object} $location   Angular service that will allow the redirect to a url
   * @return {none}             none
   */
  function NavBarController($scope, AuthService, $location){
    $scope.isLoggedIn = AuthService.isLoggedIn; //exposes the isLoggedIn function
                                                // to the DOM
    $scope.logout = logout; // allow the logging out of a user
    $scope.user = AuthService.currentUser(); //obtains the current user that is
                                            // logged in if there is one



    /**
     * logout - Wrapper function for the AuthService logout
     *
     * @return {none}  none
     */
    function logout(){
      AuthService.logout();
    }
  }
}());
