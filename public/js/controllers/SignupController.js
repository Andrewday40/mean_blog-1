(function() {
  angular.module('ngBlog')
      .controller('SignupController', SignupController);

  SignupController.$inject = ['$scope', 'UserService', 'AuthService'];

  function SignupController($scope, UserService, AuthService){
    $scope.signUp = signUp;


    function signUp(user, confirm){
      if(user.password !== confirm.password){
        $scope.error = true;
        user.password = '';
        confirm.password = '';
        return;
      } else {
        UserService.signUp(user)
                   .then(function(response){
                     console.log(response);
                     AuthService.saveToken(response.data.token);
                   })
                   .catch(function(err){
                     console.log(err);
                   });
      }
    }
  }
}());
