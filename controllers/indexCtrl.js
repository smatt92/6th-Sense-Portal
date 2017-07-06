 app.controller("IndexCtrl",function($scope,$location){
   
    var role = localStorage.getItem("role");
    $scope.username = localStorage.getItem("userName");
    
    if(role =="Super Admin"){
        $scope.superAdmin = true;
        $scope.companyAdmin=false;
    }
    if(role =="Company Admin"){
        $scope.superAdmin = false;
        $scope.companyAdmin=true;
    }

    //Route to Company Features page
    $scope.companyFeatures = function(){
        console.log("SDf");
        $location.path("/CompanyAdmin/CompanyAdminFeatures");
    }

    //Logout Function
    $scope.logout = function(){
        localStorage.clear();
        location.reload();
    }

   // $constants.endPointInUse="http://ec2-52-66-111-29.ap-south-1.compute.amazonaws.com:3000";
$scope.pageSize = 5;
    $scope.sort=function(x){

        $scope.done = x;
        $scope.reverse = !$scope.reverse;
        }

});
