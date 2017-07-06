app.controller("vehicleTypeCtrl", function ($scope,$http,$constants) {

//Select Options
$scope.vehicleEngineOption = ["CRS","NON-CRS"];
$scope.vehicleBreakPedalOption = ["FLOOR","PENDULUM"];
$scope.vehicleacceleratorOption = ["ECU","FUEL PUMP","CABLE"];
$scope.vehicleSpeedOption = ["YES","NO"];
//Select Options End


$scope.getVehicleModel = function(){
$scope.vehicleModelOptions = $scope.vehicleMake.models;
console.log($scope.vehicleModelOptions);
}
//SetDeleteVehicleTypeId
$scope.setDeleteElementId = function(id){
    $scope.DeleteElementId = id;
}



// $scope.EditgetVehicleModel = function(){
// $scope.EditvehicleModelOptions = $scope.EditvehicleMake.models;
// console.log($scope.vehicleModelOptions);
// }
 

var vehicleMakeOptions= JSON.parse(localStorage.getItem("vehicleTypes"));
$scope.vehicleMakeOptions = vehicleMakeOptions;







    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
    $scope.ecuNumbers=0;

    $scope.itemArray = [];

    var GetEcuList = $http.get($constants.endPointInUse+"/api/ecuTypes",{headers:{'Content-Type':'application/json','Authorization': auth}});
      GetEcuList.then(function(response){
       var ecuList = response.data;
       $scope.ecuNumbers=response.data.length;
       

       console.log(ecuList);
        $scope.itemArray.push(ecuList);
      console.log($scope.itemArray[0]);
    });
    GetEcuList.catch(function(response){
       console.log(response.data);
    });



    $scope.selected = [];

var getVehicleType = function(){
    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
    var GetVehList = $http.get($constants.endPointInUse+"/api/vehicleTypes",{headers:{'Content-Type':'application/json','Authorization': auth}});
    GetVehList.then(function(response){
      console.log(response);
      $scope.vehiclemodels = response.data;
      $scope.vehicleTotal=response.data.length;
        $scope.vehicleArray=[];
       for (var i = $scope.vehicleTotal - 1; i >= 0; i--) {
         $scope.vehicleArray.push($scope.vehiclemodels[i]);
       }

        var ecuArr = [];
        angular.forEach(response.data,function(value, key){
        ecuArr.push(value._id);
        });

  });
  GetVehList.catch(function(response){
       console.log(response.data);
    });
}
getVehicleType();


 $scope.deleteVehicleType = function(id){
   var autho = localStorage.getItem("sixthsense.token");
   var auth = "Bearer "+autho;

   var DeleteVehicle = $http.delete($constants.endPointInUse+"/api/vehicleTypes/"+id,{headers:{'Content-Type':'application/json','Authorization': auth}});
   DeleteVehicle.then(function(response){
     console.log(response);
getVehicleType();
   });
   DeleteVehicle.catch(function(response){
       console.log(response.data);
    });

 }



 $scope.createVehicleType = function(form){
    $scope.clicked = true;
   if($scope[form].$valid){
        var autho = localStorage.getItem("sixthsense.token");
        var auth = "Bearer "+autho;
        var ecuArr = [];
        angular.forEach($scope.selected.value,function(value, key){
          ecuArr.push(value._id);
        });
      console.log($scope.vehicleMake);
      var vehiType = {
        name: $scope.vehicleName,
        make : $scope.vehicleMake.name,
        model:$scope.vehicleModel,
        ecu_types: ecuArr,
        engine_type: $scope.vehicleEngineType,
        speed_sensor:$scope.vehicleSpeed,
        accelerator: $scope.vehicleaccelerator,
        brake_pedal:$scope.vehicleBreakPedal

      }
      console.log(vehiType);
      var createVehicleType = $http.post($constants.endPointInUse+"/api/vehicleTypes",vehiType,{headers:{'Content-Type':'application/json','Authorization': auth}});
      createVehicleType.then(function(response){
        console.log(response.data);
        getVehicleType();
        angular.element("#addVehicleType").modal("hide");
      }).catch(function(response){
          $scope.error = true;
          console.log(response.data);
          $scope.errorMsg = response.data.errmsg;
          $scope.errorLists = response.data.message_list;
      });
   }
  

 }



 $scope.putValuesOnEditModal=function(id){

    angular.forEach($scope.vehiclemodels, function(value, key) {
      if(value._id === id){
        console.log(value);
        $scope.EditVehicleID= value._id;
        $scope.EditvehicleName = value.name;
        $scope.EditvehicleMake = value.make;
        $scope.EditvehicleModel= value.model;
        $scope.EditvehicleEngineType= value.engine_type;
        $scope.EditvehicleBreakPedal = value.brake_pedal;
        $scope.Editvehicleaccelerator= value.accelerator;
        $scope.EditvehicleSpeed = value.speed_sensor;
       $scope.Editselected = value.ecu_types;
        $scope.Editselected.value = value.ecu_types;
      }
    });
 }


$scope.EditVehicleType = function(id){
    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;

    var ecuArr = [];
        angular.forEach($scope.Editselected.value,function(value, key){
        ecuArr.push(value._id);
        });

    var vehiType = {
        name: $scope.EditvehicleName,
        make : $scope.EditvehicleMake,
        model:$scope.EditvehicleModel,
        ecu_types:  ecuArr ,
        engine_type: $scope.EditvehicleEngineType,
        speed_sensor:$scope.EditvehicleSpeed,
        accelerator: $scope.Editvehicleaccelerator,
        brake_pedal:$scope.EditvehicleBreakPedal
      }
      console.log(vehiType);
  var EditVehicleType = $http.put($constants.endPointInUse+"/api/vehicleTypes/"+id,vehiType,{headers:{'Content-Type':'application/json','Authorization': auth}});
        EditVehicleType.then(function(response){
            console.log(response);
              getVehicleType();
        }).catch(function(response){
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