app.controller("CompanyAdminFeatures",function($scope,$http,$constants){

var auth=localStorage.getItem("sixthsense.token");
var autho= bearer+"id"
var compId=localStorage.getitem("companyId"); 


$http.get($constants.endPointInUse+"/api/companies/"+compId)
.then(function(response){
    $scope.companyData = response.data;
    
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

});

});