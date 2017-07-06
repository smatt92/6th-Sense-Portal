app.controller("tripAllCtrl",function($scope,$http,$constants,$filter){

var getAllTrips = function(){
     var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho; 
    var compId = localStorage.getItem("companyId");
    $scope.tripNumber = 0;
    $http.get($constants.endPointInUse+"/api/companies/"+compId+"/trips",{headers:{'Content-Type':'application/json','Authorization': auth}})
         .then(function(response){
            $scope.allTrip = response.data;
            $scope.tripNumber=response.data.length;
            $scope.allTrips = [];
            for(var i=$scope.tripNumber-1;i>=0;i--){
                 $scope.allTrips.push($scope.allTrip[i]);
            } 
             

         })
         .catch(function(response){
            console.log(response);
         });


}
getAllTrips();

$scope.goToTripDashboard = function(id){
    localStorage.setItem("tripId",id);
    location.href="#!/CompanyAdmin/tripOne";
}

//ITEMS PER PAGE

$scope.pageSize=5;
$scope.currentPage = 0;
$scope.start='';


// $scope.numberofPages=function(){
//     return Math.ceil($scope.tripNumber/$scope.pageSize);
// }




});
app.filter('startFrom', function() {
    return function(input, start) {
        console.log(input);
        console.log(start);
        start = +start; //parse to int
        return input.slice(start);
    }
});