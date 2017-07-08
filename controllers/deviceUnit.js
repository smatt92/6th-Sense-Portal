app.controller("deviceUnitctrl",function($scope,$http,$constants){


//Selection Options

$scope.SimCarrierOptions = ["AIRTEL","BSEL","VODAFONE","IDEA"];
$scope.AndroidVersionOptions = ["LOLLIPOP5.0.0","LOLLIPOP5.1.1","MARSHMALLOW6.0.1"];

//Selection Options Ends 

var getDeviceUnit = function(){

    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
    $scope.deviceunitnumbers=0;
    var GetdeviceList = $http.get($constants.endPointInUse+"/api/devices",{headers:{'Content-Type':'application/json','Authorization': auth}});
    GetdeviceList.then(function(response){
      console.log(response);
      $scope.deviceUnits = response.data;
      $scope.deviceunitnumbers=response.data.length;
      $scope.deviceArray=[];
      for(var i=$scope.deviceunitnumbers-1;i>=0;i--){
        $scope.deviceArray.push($scope.deviceUnits[i]);
      }
      
  });
  GetdeviceList.catch(function(response){
       console.log(response.data);
    });
}
getDeviceUnit();

$scope.deleteDeviceUnit = function(id){
   var autho = localStorage.getItem("sixthsense.token");
   var auth = "Bearer "+autho;

   var deleteDevice = $http.delete($constants.endPointInUse+"/api/devices/"+id,{headers:{'Content-Type':'application/json','Authorization': auth}});
   deleteDevice.then(function(response){
     console.log(response);
          getDeviceUnit();
   });
   deleteDevice.catch(function(response){
       console.log(response.data);
    });

 }

//SetDeleteVehicleTypeId
$scope.setDeleteElementId = function(id){
    $scope.DeleteElementId = id;
}

$scope.AddUpdateDetails = function(id){
  var autho = localStorage.getItem("sixthsense.token");
   var auth = "Bearer "+autho;
   $http.get($constants.endPointInUse+"/api/devices/"+id,{headers:{'Content-Type':'application/json','Authorization': auth}})
        .then(function(response){
          console.log(response.data);
          $scope.EditId = response.data._id;
          $scope.EditserialNo = response.data.serial_no;
          $scope.EditVrNo = response.data.version_no;
          $scope.EditSimNo = response.data.sim_no;
          $scope.EditIMEINo = response.data.imei_no;
          $scope.EditandVersion = response.data.android_version;
          $scope.Editsim = response.data.sim_carrier;

        })
        .catch(function(response){
       console.log(response.data);
    });
}

$scope.UpdateDevice = function(id){
   var autho = localStorage.getItem("sixthsense.token");
   var auth = "Bearer "+autho;
   var json = {
      serial_no: $scope.EditserialNo,
	    version_no: $scope.EditVrNo,
	    android_version: $scope.EditandVersion,
	    sim_no: $scope.EditSimNo,
	    sim_carrier: $scope.Editsim,
	    imei_no: $scope.EditIMEINo
   }
   $http.put($constants.endPointInUse+"/api/devices/"+id,json,{headers:{'Content-Type':'application/json','Authorization': auth}})
        .then(function(response){
          getDeviceUnit();
        })
        .catch(function(response){
       console.log(response.data);
    });
}

 $scope.deviceCreate = function(form){

$scope.clicked = true;
if($scope[form].$valid){

    var autho = localStorage.getItem("sixthsense.token");
   var auth = "Bearer "+autho;

   var json =  {
serial_no:$scope.serialNo,
version_no:$scope.VrNo,
android_version:String($scope.andVersion).trim(),
sim_no:$scope.SimNo,
sim_carrier:$scope.sim,
imei_no:$scope.IMEINo
}

$http.post($constants.endPointInUse+"/api/devices",json,{headers:{'Content-Type':'application/json','Authorization': auth}})

    .then(function(response){
      console.log(response);
      getDeviceUnit();
      angular.element("#deviceUnit").modal("hide");
    })
    .catch(function(response){
        $scope.error = true;
        console.log(response.data);
        $scope.errorMsg = response.data.errmsg;
        $scope.errorLists = response.data.message_list;
    });
}
   

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