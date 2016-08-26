(function() {
  angular.module('ngBlog')
        .run(AuthWatcher);

    AuthWatcher.$inject = ['$rootScope', '$location', 'AuthService'];


    /**
     * AuthWatcher - this function sets up angular to watch when we move between pages
     *                    and then runs a function that checks to see if there is a
     *                    protected route or not.
     *
     * @param  {object} $rootScope  this is the mother of all scopes. This listens
     *                              for wide scale changes
     * @param  {object} $location   location service that allows for redirects and
     *                              managing redirects
     * @param  {object} AuthService created authentication service for managing
     *                              whether a user authentication utilizing our
     *                              backend routes
     * @return {none}             none
     */
    function AuthWatcher($rootScope, $location, AuthService){
      //when the router changes the url in the browser, it fires out an event
      // (think yell) that it is changing locations
      $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
        //if the page that you are trying to go to is protected and
        // you are not logged in, then you are sent to the home page
        if(nextRoute.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/');
        }
      });
    }
}());
