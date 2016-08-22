(function() {
  angular.module('ngBlog')
        .config(RouterConfig);

  RouterConfig.$inject = ['$routeProvider'];

  function RouterConfig($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'html/views/home.html',
        controller: 'HomeController',
        access: {
          restricted: false
        }
      })
      .when('/login', {
        templateUrl: 'html/views/login.html',
        controller: 'LoginController',
        access: {
          restricted: false
        }
      })
      .when('/signup', {
        templateUrl: 'html/views/signup.html',
        controller: 'SignupController',
        access: {
          restricted: false
        }
      })
      .when('/profile/:userId', {
        templateUrl: 'html/views/profile.html',
        controller: 'ProfileController',
        access: {
          restricted: true
        }
      })
      .when('/post/:postId', {
        templateUrl: 'html/views/post.html',
        controller: 'PostController',
        access: {
          restricted: false
        }
      })
      .when('/create', {
        templateUrl: 'html/views/post-create.html',
        controller: 'PostController',
        access: {
          restricted: true
        }
      })
      .when('/edit/:postId', {
        templateUrl: 'html/views/post-edit.html',
        controller: 'PostController',
        access: {
          restricted: true
        }
      })
      .otherwise({
        redirectTo: '/',
        access: {
          restricted: false
        }
      });
  }
}());
