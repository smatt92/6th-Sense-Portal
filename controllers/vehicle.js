app.controller("vehicleCtrl",function($scope,$http,$constants){
 $scope.ecuTypes = [];
$scope.EcuitemArray = [];

$scope.deviceUnit = [];
$scope.DeviceArray = [];


var getVehicle = function(){
     var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
    var compId = localStorage.getItem("companyId");
    $scope.vehiclesNumber = 0;

    $http.get($constants.endPointInUse+"/api/companies/"+compId+"/vehicles",{headers:{'Content-Type':'application/json','Authorization': auth}})
         .then(function(response){
             $scope.vehicles = response.data;
             $scope.vehiclesNumber = response.data.length;
             
             $scope.compvehicleArray=[];
             for(var i=$scope.vehiclesNumber-1;i>=0;i--){
                $scope.compvehicleArray.push($scope.vehicles[i]);
             }
         })
         .catch(function(response){
             console.log(response.data);
         })
}
getVehicle();

var getVehicleTypes = function(){
     var autho = localStorage.getItem("sixthsense.token");
     var auth = "Bearer "+autho;
    $http.get($constants.endPointInUse+"/api/vehicleTypes",{headers:{'Content-Type':'application/json','Authorization': auth}})
    .then(function(response){
            $scope.vehicleTypes = response.data;
            console.log(  $scope.vehicleTypes);
    })
    .catch(function(response){
        console.log(response);
    })
}
getVehicleTypes();
var getEcuUnits = function(){
     var autho = localStorage.getItem("sixthsense.token");
     var auth = "Bearer "+autho;
     var compId = localStorage.getItem("companyId");
     $http.get($constants.endPointInUse+"/api/companies/"+compId+"/ecus",{headers:{'Content-Type':'application/json','Authorization': auth}})
    .then(function(response){
             $scope.EcuitemArray.push(response.data);
     console.log( $scope.EcuitemArray);

    })
    .catch(function(response){
        console.log(response);
    })
}
getEcuUnits();


var getDeviceUnits = function(){
     var autho = localStorage.getItem("sixthsense.token");
     var auth = "Bearer "+autho;
     var compId = localStorage.getItem("companyId");
     $http.get($constants.endPointInUse+"/api/companies/"+compId+"/devices",{headers:{'Content-Type':'application/json','Authorization': auth}})
    .then(function(response){
             $scope.DeviceArray.push(response.data);
     console.log( $scope.DeviceArray);

    })
    .catch(function(response){
        console.log(response);
    })
}
getDeviceUnits();


$scope.CreateDriver = function(form){
    $scope.clicked = true;
    if($scope[form].$valid){
            var autho = localStorage.getItem("sixthsense.token");
            var auth = "Bearer "+autho;
            var compId = localStorage.getItem("companyId");
            var json={
                vehicle_no: $scope.vehicleNo,
                vehicle_type:$scope.vehicleType._id, 
                registration_no:$scope.registrationNo,
                ecu_unit:$scope.ecuTypes.value._id,
                device_unit:$scope.deviceUnit.value._id
            }
            console.log(json);
        $http.post($constants.endPointInUse+"/api/companies/"+compId+"/vehicles",json,{headers:{'Content-Type':'application/json','Authorization': auth}})
            .then(function(response){
                angular.element("#addVehicle").modal("hide");
            console.log(response.data);
        getVehicle();

            })
            .catch(function(response){
                console.log(response);
            })
    }


}

//SetDeleteECUTypeId
$scope.setDeleteElementId = function(id){
    $scope.DeleteElementId = id;
}

$scope.deleteVehicle = function(vid){
    var autho = localStorage.getItem("sixthsense.token");
     var auth = "Bearer "+autho;
     var compId = localStorage.getItem("companyId");

    $http.delete($constants.endPointInUse+"/api/companies/"+compId+"/vehicles/"+vid,{headers:{'Content-Type':'application/json','Authorization': auth}})
     .then(function(response){
         $scope.vehicles = response.data;
         getVehicle();
     })
     .catch(function(response){
         console.log(response.data);
     })
}

$scope.getVehicleData = function(id){
    var autho = localStorage.getItem("sixthsense.token");
     var auth = "Bearer "+autho;
     var compId = localStorage.getItem("companyId");
     console.log(id);
 $http.get($constants.endPointInUse+"/api/companies/"+compId+"/vehicles/"+id,{headers:{'Content-Type':'application/json','Authorization': auth}})
    .then(function(response){
             $scope.EditValues= response.data;
             console.log(response.data.vehicle_type);
             $scope.editSelectedVehicle = response.data.vehicle_type;
               
             console.log($scope.EditValues);

    })
    .catch(function(response){
        console.log(response);
    })


}

$scope.editVehicle = function(){
    var autho = localStorage.getItem("sixthsense.token");
     var auth = "Bearer "+autho;
     var compId = localStorage.getItem("companyId");
     var json = {
         vehicle_no : $scope.EditValues.vehicle_no,
         vehicle_type:$scope.editSelectedVehicle._id,
         registration_no:$scope.EditValues.registration_no,
         ecu_unit : $scope.EditValues.ecu_unit._id,
         device_unit: $scope.EditValues.device_unit._id

         }
  $http.put($constants.endPointInUse+"/api/companies/"+compId+"/vehicles/"+$scope.EditValues._id,json,{headers:{'Content-Type':'application/json','Authorization': auth}})
    .then(function(response){
             $scope.EditValues= response.data;
             console.log($scope.EditValues);
              getVehicle();
    })
    .catch(function(response){
        console.log(response);
    })
         console.log(json);

}

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

