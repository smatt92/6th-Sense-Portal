app.controller("companyWizardCtrl",function($scope,$http,$constants){
 $scope.ecuTypes = [];
$scope.EcuitemArray = [];

$scope.deviceUnit = [];
$scope.DeviceArray = [];


//For Features Default Options
$scope.cas = "YES";
$scope.casChecked=true;

$scope.sleepAlert = "YES";
$scope.sleepAlertChecked=true;

$scope.tpms="NO";
$scope.tpmsChecked=false;

$scope.accAlert="YES";
$scope.accAlertChecked=true;

$scope.honkChk="NO";
$scope.honkChkChecked=false;


$scope.obd="NO";
$scope.obdChecked=false;

$scope.fuel = "NO";
$scope.fuelChecked=false;

$scope.extBatt="NO";
$scope.extBattChecked=false;

$scope.cruise="YES";
$scope.cruiseChecked=true;

$scope.accCutOff="YES";
$scope.accCutOffChecked=true;

$scope.accCutOfferror="NO";
$scope.accCutOfferrorChecked=false;


$scope.alcCheck="YES";
$scope.alcCheckChecked=true;
//For Features Default Options

$scope.adminArr= [];
var admin = class{
  constructor(username,name){
    this.name =name,
    this.username = username;
  }
};


var adminDetails = new admin();

$scope.saveAdmin= function(){
  var isEmailPresent=0;
var adminDetails = new admin($scope.adminEmail,$scope.adminName);
  //admin.username = $scope.adminEmail;
  angular.forEach($scope.adminArr,function(val,index){
    if(val.username==$scope.adminEmail) {
      isEmailPresent = 1;
    }
  });

  if(isEmailPresent == 0){
      $scope.adminArr.push(adminDetails);
      console.log(angular.toJson($scope.adminArr));
  }
  else{
    angular.element("#adminEmail").next().text("Email already Present.");
    $scope['CompanyAdminDetails']['email'].$invalid = true;
  }
  
}

$scope.deleteAdmin = function(id){
 $scope.adminArr.splice(id,1);
 
}


var getEcuType = function(){
    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho; 
    var GetVehList = $http.get($constants.endPointInUse+"/api/ecus",{headers:{'Content-Type':'application/json','Authorization': auth}});
    GetVehList.then(function(response){
    console.log(response.data);
    
     $scope.EcuitemArray.push(response.data);
    });
    GetVehList.catch(function(response){
       console.log(response.data);
    });
}
getEcuType();

var getDeviceUnit = function(){
	
    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho; 
    var GetdeviceList = $http.get($constants.endPointInUse+"/api/devices",{headers:{'Content-Type':'application/json','Authorization': auth}});
    GetdeviceList.then(function(response){
      console.log(response);
      $scope.DeviceArray.push(response.data);
  });
}
getDeviceUnit();
  //for wizard
angular.element(".nav-tabs a[data-toggle=tab]").click(function(e) {
  if ($(this).hasClass("disabled")) {
console.log("ASd");
    e.preventDefault();
    return false;
}});


$scope.next1 = function(form){

$scope.clicked1=true;

// if($scope.phoneNumber < 8 || $scope.phoneNumber >8){
// angular.element("#phoneNumber").next().text("Phone Number should be of 8 digits only");
// $scope[form]["phoneNumber"].$invalid= true;
// }
  if($scope[form].$valid){
$("#atab2").removeClass("disabled");
$("#atab2").addClass("active");
$("#atab2").parent().removeClass("disabled");
$("#atab1").parent().addClass("done");
$("#atab2").trigger('click');
  }

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

$scope.next3 = function(form){
  $scope.checked3 = true;
  if($scope[form].$valid){

        $("#atab3").addClass("done"); 
  $("#atab2").removeClass("active");
$("#atab4").removeClass("disabled");
$("#atab4").addClass("active");
$("#atab4").parent().removeClass("disabled");
$("#atab3").parent().addClass("done");
$("#atab4").trigger('click');
  }
}


$scope.next4 = function(form){
  $scope.checked4 = true;
  if($scope[form].$valid){
  $("#atab4").addClass("done"); 
  $("#atab3").removeClass("active");
$("#atab5").removeClass("disabled");
$("#atab5").addClass("active");
$("#atab5").parent().removeClass("disabled");
$("#atab4").parent().addClass("done");
$("#atab5").trigger('click');
}
}
  //for wozard end


$scope.createCompany = function(form){
   $scope.checked5 = true;
  if($scope[form].$valid){
 
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
  console.log($scope.phoneCode+'-'+$scope.phoneNumber);
  var ecuArr = [];
    angular.forEach($scope.ecuTypes.value,function(value, key){
          ecuArr.push(value._id);
          });
  var deviceArr = [];
    angular.forEach($scope.deviceUnit.value,function(value, key){
          deviceArr.push(value._id);
          });

 
  var json = 
      {
      "name":$scope.companyName ,
      "address": $scope.companyAdd,
      "fleet_size": $scope.fleetSize,
      "phone_no": $scope.phoneCode+'-'+$scope.phoneNumber,
      "pan_no":$scope.panNo ,
      "director_name": $scope.DirectorName,
      "director_phone_no": $scope.DirectorMoNo,
      "feature": {
        "cas": {
          "alarm_th": $scope.alarmTh,
          "brake_th": $scope.brakeTh,
          "brake_speed": $scope.brakeSpeed,
          "enabled": $scope.cas.toUpperCase()
        },
        "sleep_alert": {
          "switch_interval": $scope.SwitchInterval,
          "switch_on": $scope.switchOn,
          "switch_off": $scope.switchOff,
          "enabled": $scope.sleepAlert.toUpperCase()
        },
        "tpms": {
          "interval": $scope.tpmsinterval,
          "cut": $scope.cut,
          "enabled": $scope.tpms.toUpperCase(),
          "up_thershold":$scope.tpmsupTh,
			    "down_thershold":$scope.tpmsdwTh
        },
        "acc_alert": {
          "erc_1": $scope.erc1,
          "enabled": $scope.accAlert.toUpperCase()
        },
        "alc_check": {
          "interval": $scope.accInterval,
          "threshold": parseInt($scope.accTh),
          "enabled": $scope.alcCheck.toUpperCase()
        },
        "honk_check": {
          "threshold_1":parseInt($scope.honkChkTh1),
          "threshold_2":parseInt($scope.honkChkTh2),
          "enabled": $scope.honkChk.toUpperCase()
        },
        "obd": {
          "interval": $scope.obdInterval,
          "enabled": $scope.obd.toUpperCase()
        },
        "fuel_sensor": {
          "enabled": $scope.fuel.toUpperCase()
        },
        "extra_batt": {
          "enabled": $scope.extBatt.toUpperCase()
        },
        "cruise": {
          "speed": $scope.speed,
          "enabled": $scope.cruise.toUpperCase()
        },
        "acc_cutoff_brake": {
          "enabled":$scope.accCutOff.toUpperCase()
        },
        "acc_cutoff_error": {
          "enabled": $scope.accCutOfferror.toUpperCase()
        }
      },
      // "_id": "593935cd6e7a9b0b380beb18",
      "devices":deviceArr,
      "ecus": ecuArr,
      "admins":JSON.parse(angular.toJson($scope.adminArr)) 
}

console.log(JSON.stringify(json));
   var autho = localStorage.getItem("sixthsense.token");
   var auth = "Bearer "+autho;
    $http.post($constants.endPointInUse+"/api/companies",json,{headers:{'Content-Type':'application/json','Authorization': auth}})
        .then(function(response){
          console.log(response.data);
          location.href="index.html#!/companyWizard";
        })
        .catch(function(response){
          angular.element("#errorModal").modal("show");
          $scope.errorMessages = response.data.msg_list;
          
        })


}

}

});