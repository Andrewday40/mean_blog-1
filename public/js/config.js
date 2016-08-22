(function() {
  angular.module('ngBlog')
        .run(AuthWatcher);

    AuthWatcher.$inject = ['$rootScope', '$location', 'AuthService', '$route'];

    function AuthWatcher($rootScope, $location, AuthService, $route){
      $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
        if(nextRoute.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/');
        }
      });
    }
}());
