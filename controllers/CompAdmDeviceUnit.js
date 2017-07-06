app.controller("CompAdmDeviceUnit",function($scope,$http,$constants){

    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
    var compId = localStorage.getItem("companyId");
    $scope.deviceUnitsNumbers = 0;


      $http.get($constants.endPointInUse+"/api/companies/"+compId+"/devices")
         .then(function(response){
             $scope.deviceUnits = response.data;
             $scope.deviceUnitsNumbers = response.data.length;
             $scope.compdeviceArray=[];
             for(var i= $scope.deviceUnitsNumbers-1;i>=0;i--){
                $scope.compdeviceArray.push($scope.deviceUnits[i]);
             }
         })
         .catch(function(response){
             console.log(response.data);
         });


//ITEMS PER PAGE

$scope.pageSize=5;
$scope.currentPage = 0; 
$scope.start='';


$scope.numberofPages=function(){
    return Math.ceil($scope.tripNumber/$scope.pageSize);
}



});

app.filter('startFrom', function() {
    return function(input, start) {
        console.log(input);
        console.log(start);
        start = +start; //parse to int
        return input.slice(start);
    }
});