app.controller("CompAdmEcuUnit",function($scope,$http,$constants){





var getECUTypes = function(){
    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
    var compId = localStorage.getItem("companyId");
    $scope.ecuNumbers=0;


    $http.get($constants.endPointInUse+"/api/companies/"+compId+"/ecus")
         .then(function(response){
             $scope.ecuUnits = response.data;
             console.log(response.data);
             $scope.ecuNumbers=response.data.length;
             $scope.compecuArray=[];
             for(var i=$scope.ecuNumbers-1;i>=0;i--){
                $scope.compecuArray.push($scope.ecuUnits[i]);
             }
            
         })
         .catch(function(response){
             console.log(response.data);
         });
}
   



getECUTypes();
 

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