app.controller("companyWizardReadCtrl",function($scope,$http,$constants){

$scope.createNewCompanyBtn = function(){
    location.href = "#!/companyRead";
}


var CompanyRead = function(){
     var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
     $scope.companyNumbers=0;

$http.get($constants.endPointInUse+"/api/companies",{headers:{'Content-Type':'application/json','Authorization': auth}})
     .then(function(response){
         $scope.companyDetails = response.data;
         $scope.companyNumbers = response.data.length;
         $scope.companyArray=[];
         for(var i=$scope.companyNumbers-1;i>=0;i--)
            $scope.companyArray.push(companyDetails[i]);
        
        //   angular.forEach($scope.companyDetails,function(data,index){
        //       $scope.admins.push(data.admins);
        //       console.log(data.admins);
        //   });

     })
     .catch(function(response){
         console.log(response.data);
     });

}

 CompanyRead();
// $scope.companyDetails = [{
//     "name" : "sa",
//     "address":"sad",
//     "fleet_size":"sd",
//     "phone_no":"sd",
//     "pan_no":"sd",
//     "director_name":"D",
//     "director_phone_no": "d"
// }];
$scope.AddDataToView = function(c){
    $scope.companyData = c;
    console.log($scope.companyData);

}
$scope.AddDatatoUpdate = function(c){
    $scope.companyData = c;
    console.log($scope.companyData);
    localStorage.setItem("companyData",JSON.stringify(c));
    location.href = "#!/companyUpdate";
}
$scope.AddDatatoReadSingle = function(c){
    $scope.companyData = c;
    console.log($scope.companyData);
    localStorage.setItem("companyData",JSON.stringify(c));
    location.href = "#!/companySingleRead";
}
$scope.deleteCompany=function(c){
    var autho=localStorage.getItem("sixthsense.token");
    var auth= "Bearer "+autho;
    var id= c._id;
    var deleteCompanyCall= $http.delete($constants.endPointInUse+"/api/companies/"+id,{headers:{'Content-Type':'application/json','Authorization': auth}});
    deleteCompanyCall.then(function(response){
        CompanyRead();
    })
}

//ITEMS PER PAGE

$scope.pageSize=5;
$scope.currentPage = 0;
$scope.start='';


});

app.filter('startFrom', function() {
    return function(input, start) {
        console.log(input);
        console.log(start);
        start = +start; //parse to int
        return input.slice(start);
    }
});


