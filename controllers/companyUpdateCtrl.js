app.controller("companyUpdateCtrl", function($scope,$http,$constants){
 
$scope.EcuitemArray = [];



$scope.DeviceArray = [];


//For Tabs
$scope.next1 = function(){



$("#atab2").removeClass("disabled");
$("#atab2").addClass("active");
$("#atab2").parent().removeClass("disabled");
$("#atab1").parent().addClass("done");
$("#atab2").trigger('click');
  

}
 
$scope.prev2 = function(){
 $("#atab1").trigger('click');
  
}
$scope.prev3 = function(){
 $("#atab2").trigger('click');
  
}
$scope.prev4 = function(){
 $("#atab3").trigger('click');
  
}
$scope.prev5 = function(){
 $("#atab4").trigger('click');
  
}
$scope.next2 = function(){
  if($scope.adminArr.length > 0){
    $("#atab2").addClass("done"); 
    $("#atab1").removeClass("active");
    $("#atab3").removeClass("disabled");
    $("#atab3").addClass("active");
    $("#atab3").parent().removeClass("disabled");
    $("#atab2").parent().addClass("done");
    $("#atab3").trigger('click');
  }
else{
  $scope.noAdminArr = "Please add Admin information";
}
}

$scope.next3 = function(){


        $("#atab3").addClass("done"); 
  $("#atab2").removeClass("active");
$("#atab4").removeClass("disabled");
$("#atab4").addClass("active");
$("#atab4").parent().removeClass("disabled");
$("#atab3").parent().addClass("done");
$("#atab4").trigger('click');
  
}


$scope.next4 = function(){

 
  $("#atab4").addClass("done"); 
  $("#atab3").removeClass("active");
$("#atab5").removeClass("disabled");
$("#atab5").addClass("active");
$("#atab5").parent().removeClass("disabled");
$("#atab4").parent().addClass("done");
$("#atab5").trigger('click');
}

















var getEcuType = function(){
    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho; 
    var GetVehList = $http.get($constants.endPointInUse+"/api/ecus",{headers:{'Content-Type':'application/json','Authorization': auth}});
    GetVehList.then(function(response){
  //  console.log(response.data);
    
     $scope.EcuitemArray.push(response.data);
    });
    GetVehList.catch(function(response){
      console.log(response.data);
    })
}
getEcuType();
var getDeviceUnit = function(){
	
    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho; 
    var GetdeviceList = $http.get($constants.endPointInUse+"/api/devices",{headers:{'Content-Type':'application/json','Authorization': auth}});
    GetdeviceList.then(function(response){
      //console.log(response);
      $scope.DeviceArray.push(response.data);
  });
  GetdeviceList.catch(function(response){
console.log(response);
  });
}
getDeviceUnit();



var admin = class{
  constructor(username,name){
    this.name =name,
    this.username = username;
  }
};
var adminDetails = new admin();

$scope.saveAdmin= function(){
var adminDetails = new admin($scope.adminEmail,$scope.adminName);
  //admin.username = $scope.adminEmail;
  $scope.adminArr.push(adminDetails);
  console.log(angular.toJson($scope.adminArr));
}

$scope.deleteAdmin = function(id){
 $scope.adminArr.splice(id,1);
 
}



   $scope.companyData = JSON.parse(localStorage.getItem("companyData"));
console.log(JSON.parse(localStorage.getItem("companyData")));


  $scope.companyName    = $scope.companyData.name ;
  $scope.companyAdd     = $scope.companyData.address;      
  $scope.fleetSize      = $scope.companyData.fleet_size;
  $scope.phoneCode      = $scope.companyData.phone_no;
  $scope.phoneNumber    =$scope.companyData.phone_no;
  $scope.panNo          =$scope.companyData.pan_no;
  $scope.DirectorName   =$scope.companyData.director_name;
  $scope.DirectorMoNo   =$scope.companyData.director_phone_no;

 $scope.alarmTh         =$scope.companyData.feature.cas.alarm_th;
 $scope.brakeTh         =$scope.companyData.feature.cas.brake_th;
 $scope.brakeSpeed      =$scope.companyData.feature.cas.brake_speed;
 $scope.cas             =$scope.companyData.feature.cas.enabled;

$scope.SwitchInterval   =$scope.companyData.feature.sleep_alert.switch_interval;
$scope.switchOn         =$scope.companyData.feature.sleep_alert.switch_off;
$scope.switchOff        =$scope.companyData.feature.sleep_alert.switch_on;
$scope.sleepAlert       =$scope.companyData.feature.sleep_alert.enabled;

$scope.tpmsinterval     =$scope.companyData.feature.tpms.interval;
$scope.cut              =$scope.companyData.feature.tpms.cut;
$scope.tpms             =$scope.companyData.feature.tpms.enabled;


$scope.erc1             =$scope.companyData.feature.acc_alert.erc_1;
$scope.accAlert         =$scope.companyData.feature.acc_alert.enabled;
   
$scope.accInterval      =$scope.companyData.feature.alc_check.interval;
$scope.accTh            =$scope.companyData.feature.alc_check.threshold;
$scope.alcCheck         =$scope.companyData.feature.alc_check.enabled;

$scope.honkChkTh1       =$scope.companyData.feature.honk_check.threshold_1;
$scope.honkChkTh2       =$scope.companyData.feature.honk_check.threshold_2;
$scope.honkChk          =$scope.companyData.feature.honk_check.enabled;

$scope.obdInterval      =$scope.companyData.feature.obd.interval;
$scope.obd              =$scope.companyData.feature.obd.enabled;

$scope.fuel             =$scope.companyData.feature.fuel_sensor.enabled;
$scope.extBatt          =$scope.companyData.feature.extra_batt.enabled;
$scope.speed            =$scope.companyData.feature.cruise.speed;
 $scope.cruise          =$scope.companyData.feature.cruise.enabled;
 $scope.accCutOff       =$scope.companyData.feature.acc_cutoff_brake.enabled;
 $scope.accCutOfferror  =$scope.companyData.feature.acc_cutoff_error.enabled;


  if($scope.cas =="YES"){
     $scope.casChecked =true;
  }
  else{
    $scope.casChecked =false;
  }

 if($scope.sleepAlert =="YES"){
     $scope.sleepAlertChecked =true;
  }
  else{
    $scope.sleepAlertChecked =false;
  }

 if($scope.tpms =="YES"){
     $scope.tpmsChecked =true;
  }
  else{
    $scope.tpmsChecked =false;
  }
 if($scope.accAlert =="YES"){
     $scope.accAlertChecked =true;
  }
  else{
    $scope.accAlertChecked =false;
  }


if($scope.alcCheck =="YES"){
     $scope.alcCheckChecked =true;
  }
  else{
    $scope.alcCheckChecked =false;
  }

if($scope.honkChk =="YES"){
     $scope.honkChkChecked =true;
  }
  else{
    $scope.honkChkChecked =false;
  }


if($scope.obd =="YES"){
     $scope.obdChecked =true;
  }
  else{
    $scope.obdChecked =false;
  }
if($scope.fuel =="YES"){
     $scope.fuelChecked =true;
  }
  else{
    $scope.fuelChecked =false;
  }

  if($scope.extBatt =="YES"){
     $scope.extBattChecked =true;
  }
  else{
    $scope.extBattChecked =false;
  }

   if($scope.cruise =="YES"){
     $scope.cruiseChecked =true;
  }
  else{
    $scope.cruiseChecked =false;
  }


  
   if($scope.accCutOff =="YES"){
     $scope.accCutOffChecked =true;
  }
  else{
    $scope.accCutOffChecked =false;
  }

   if($scope.accCutOfferror =="YES"){
     $scope.accCutOfferrorChecked =true;
  }
  else{
    $scope.accCutOfferrorChecked =false;
  }
$scope.adminArr         = $scope.companyData.admins;
//$scope.ecuTypes        = $scope.companyData.ecus;
 $scope.ecuTypes={
   a: $scope.companyData.ecus}

$scope.deviceUnit       = {a :$scope.companyData.devices}
//$scope.deviceUnit.a =$scope.companyData.devices; 



 $scope.updateCompany= function(){
    if($scope.casChecked == true){
    $scope.casChecked ="YES"
  }
  else{
    $scope.casChecked="NO"
  }
 if($scope.sleepAlertChecked == true){
    $scope.sleepAlertChecked ="YES"
  }
   else{
    $scope.sleepAlertChecked="NO"
  }
 if($scope.tpmsChecked == true){
    $scope.tpmsChecked ="YES"
  }
  else{
    $scope.tpmsChecked="NO"
  }
 if($scope.accAlertChecked == true){
    $scope.accAlertChecked ="YES"
  }
   else{
    $scope.accAlertChecked="NO"
  }
 if($scope.honkChkChecked == true){
    $scope.honkChkChecked ="YES"
  }
    else{
    $scope.honkChkChecked="NO"
  }
 if($scope.obdChecked == true){
    $scope.obdChecked ="YES"
  }
  else{
    $scope.obdChecked="NO"
  }
   if($scope.fuelChecked == true){
    $scope.fuelChecked ="YES"
  }
   else{
    $scope.fuelChecked="NO"
  }
 if($scope.extBattChecked == true){
    $scope.extBattChecked ="YES"
  }
   else{
    $scope.extBattChecked="NO"
  }
   if($scope.cruiseChecked == true){
    $scope.cruiseChecked ="YES"
  }
   else{
    $scope.cruiseChecked="NO"
  }
   if($scope.accCutOffChecked == true){
    $scope.accCutOffChecked ="YES"
  }
   else{
    $scope.accCutOffChecked="NO"
  }
   if($scope.accCutOfferrorChecked == true){
    $scope.accCutOfferrorChecked ="YES"
  }
   else{
    $scope.accCutOfferrorChecked="NO"
  }
    if($scope.alcCheckChecked == true){
    $scope.alcCheckChecked ="YES"
  }
   else{
    $scope.alcCheckChecked="NO"
  }





      var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho; 

    $scope.companyData = JSON.parse(localStorage.getItem("companyData"));
console.log(JSON.parse(localStorage.getItem("companyData")));



var ecuArr = [];
   angular.forEach($scope.ecuTypes.a,function(value, key){
        ecuArr.push(value._id);
        });
var deviceArr = [];
   angular.forEach($scope.deviceUnit.a,function(value, key){
        deviceArr.push(value._id);
        });

 
      var json = 
      {
      "name":$scope.companyName ,
      "address": $scope.companyAdd,
      "fleet_size": $scope.fleetSize,
      "phone_no": $scope.phoneNumber,
      "pan_no":$scope.panNo ,
      "director_name": $scope.DirectorName,
      "director_phone_no": $scope.DirectorMoNo,
      "feature": {
        "cas": {
          "alarm_th": $scope.alarmTh,
          "brake_th": $scope.brakeTh,
          "brake_speed": $scope.brakeSpeed,
          "enabled": $scope.casChecked.toUpperCase()
        },
        "sleep_alert": {
          "switch_interval": $scope.SwitchInterval,
          "switch_on": $scope.switchOn,
          "switch_off": $scope.switchOff,
          "enabled": $scope.sleepAlertChecked.toUpperCase()
        },
        "tpms": {
          "interval": $scope.tpmsinterval,
          "cut": $scope.cut,
          "enabled": $scope.tpmsChecked.toUpperCase(),
          "up_thershold":$scope.tpmsupTh,
			    "down_thershold":$scope.tpmsdwTh
        },
        "acc_alert": {
          "erc_1": $scope.erc1,
          "enabled": $scope.accAlertChecked.toUpperCase()
        },
        "alc_check": {
          "interval": $scope.accInterval,
          "threshold": parseInt($scope.accTh),
          "enabled": $scope.alcCheckChecked.toUpperCase()
        },
        "honk_check": {
          "threshold_1":parseInt( $scope.honkChkTh1),
          "threshold_2":parseInt( $scope.honkChkTh2),
          "enabled": $scope.honkChkChecked.toUpperCase()
        },
        "obd": {
          "interval": $scope.obdInterval,
          "enabled": $scope.obdChecked.toUpperCase()
        },
        "fuel_sensor": {
          "enabled": $scope.fuelChecked.toUpperCase()
        },
        "extra_batt": {
          "enabled": $scope.extBattChecked.toUpperCase()
        },
        "cruise": {
          "speed": $scope.speed,
          "enabled": $scope.cruiseChecked.toUpperCase()
        },
        "acc_cutoff_brake": {
          "enabled":$scope.accCutOffChecked.toUpperCase()
        },
        "acc_cutoff_error": {
          "enabled": $scope.accCutOfferrorChecked.toUpperCase()
        }
      },
      // "_id": "593935cd6e7a9b0b380beb18",
      "devices":deviceArr,
      "ecus": ecuArr,
      "admins":JSON.parse(angular.toJson($scope.adminArr)) 
}
  
console.log((angular.toJson(json)) );
 $http.put($constants.endPointInUse+"/api/companies/"+$scope.companyData._id,json,{headers:{'Content-Type':'application/json','Authorization': auth}})
    .then(function(response){
      //console.log(response);
      console.log(response.data);
      location.href="index.html#!/companyWizard";
      
  })
  .catch(function(response){
    console.log(response.data);
  });
  
 }

});
