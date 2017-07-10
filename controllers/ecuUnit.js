app.controller("ecuUnitctrl",function($scope,$http,$constants){



 
var getecuUnit = function(){

    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
    $scope.ecuNumbers=0;
    var GetecuList = $http.get($constants.endPointInUse+"/api/ecus",{headers:{'Content-Type':'application/json','Authorization': auth}});
    GetecuList.then(function(response){
      console.log(response);
      $scope.ecuUnits = response.data;
      $scope.ecuNumbers=response.data.length;
      $ecuunitArray=[];
      for(var i=$scope.ecuNumbers-1;i>=0;i--){
        $scope.ecuunitArray.push($scope.ecuUnits[i]);
      }

      

  })
  .catch(function(response){ 
       console.log(response.data);
    });
}
getecuUnit();

$scope.deleteEcuUnit = function(id){
   var autho = localStorage.getItem("sixthsense.token");
   var auth = "Bearer "+autho;

   var deleteEcu = $http.delete($constants.endPointInUse+"/api/ecus/"+id,{headers:{'Content-Type':'application/json','Authorization': auth}});
   deleteEcu.then(function(response){
     console.log(response);
getecuUnit();
   })
   .catch(function(response){
       console.log(response.data);
    });
getecuUnit();
 }


//SetDeleteVehicleTypeId
$scope.setDeleteElementId = function(id){
    $scope.DeleteElementId = id;
}


$scope.CreateEcuUnit = function(form){

    $scope.clicked = true;
    if($scope[form].$valid)
    {   
        
        var autho = localStorage.getItem("sixthsense.token");
        var auth = "Bearer "+autho;
        console.log($scope.ecuType);
        var json = {
            serial_no: $scope.serialNo,
            version_no:$scope.vrNo,
            ecu_type: $scope.ecuType,
            manufactured_on:  $scope.manufacturedOn
            }
        $http.post($constants.endPointInUse+"/api/ecus",json,{headers:{'Content-Type':'application/json','Authorization': auth}})
                .then(function(response){
                console.log(response.data);
                getecuUnit();
                angular.element("#addEcuUnit").modal("hide");
                })
                .catch(function(response){
                    $scope.error = true;
                console.log(response.data);
                $scope.errorMsg = response.data.errmsg;
                $scope.errorLists = response.data.message_list;
            });
    }

   

}

 $scope.getEcuType = function(){
   var autho = localStorage.getItem("sixthsense.token");
   var auth = "Bearer "+autho;

   $http.get($constants.endPointInUse+"/api/ecuTypes",{headers:{'Content-Type':'application/json','Authorization': auth}})
  .then(function(response){
    console.log(response);
    $scope.ecuTypes = response.data;

    console.log($scope.ecuTypes);
    })
    .catch(function(response){
       console.log(response.data);
    });

}

$scope.getDetails = function(id){
   $scope.getEcuType();
  var autho = localStorage.getItem("sixthsense.token");
  var auth = "Bearer "+autho;
  $http.get($constants.endPointInUse+"/api/ecus/"+id,{headers:{'Content-Type':'application/json','Authorization': auth}})
       .then(function(response){
          $scope.EditId = response.data._id;
          $scope.EditserialNo= response.data.serial_no;
          $scope.EditvrNo= response.data.version_no;
          $scope.EditecuType= response.data.ecu_type;
          console.log(response.data.manufactured_on.split("T")[0]);
         //$scope.EditmanufacturedOn= response.data.manufactured_on.split("T")[0];

        })
        .catch(function(response){
       console.log(response.data);
    });


}


$scope.updateEcuUnit = function(){



  var autho = localStorage.getItem("sixthsense.token");
  var auth = "Bearer "+autho;

    var json = {
	 serial_no: $scope.EditserialNo,
	 version_no:$scope.EditvrNo,
	 ecu_type: $scope.EditecuType,
	 manufactured_on: $scope.EditmanufacturedOn
    }
  $http.put($constants.endPointInUse+"/api/ecus/"+$scope.EditId,json,{headers:{'Content-Type':'application/json','Authorization': auth}})
        .then(function(response){
            console.log(response);
              getecuUnit();
        })
        .catch(function(response){
       console.log(response.data);
    });


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