(function() {
  angular.module('ngBlog')
      .controller('SignupController', SignupController);

  SignupController.$inject = ['$scope', 'UserService'];

  function SignupController($scope, UserService){
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
                  })
                  .catch(function(err){
                    console.log(err);
                  });
      }
    }
  }
}());
