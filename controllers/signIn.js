var SignInapp = angular.module("SixSenseSignIn", ['ngRoute','ui.select', 'ngSanitize']);




SignInapp.controller("SignIn", function ($scope,$http,$constants) {
    
    //On Submit Button Click
    $scope.submit = function () {
        var e=$scope.email;
        var p=$scope.password;

    //Json to Request
        var loginjson={
        username:e,
        password:p
        }

    //Calling the API
        var login=$http.post($constants.endPointInUse+"/auth/signin",loginjson)
                .then(function(response){
                    localStorage.setItem("sixthsense.token",response.data.token);
                    localStorage.setItem("userName",response.data.name);
                    console.log(response.data);
                    console.log(localStorage.getItem("sixthsense.token"));
                     localStorage.setItem("vehicleTypes",JSON.stringify(response.data.master.vehicle_makes));
                    localStorage.setItem("role",response.data.role);
                    if(response.data.role == "Company Admin"){
                        localStorage.setItem("companyId",response.data.company._id);
                    }

                 //location.href = '/';
                 location.href = '/sixthsense';
                })
                .catch(function(response){
                    $scope.error = response.data.message;
                    console.log(response.data);
                });
    };


});



