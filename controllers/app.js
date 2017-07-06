//App.js

var app = angular.module("SixSense", ['ngRoute','ui.select', 'ngSanitize','mgo-angular-wizard', 'chart.js','angularUtils.directives.dirPagination']);
var token = localStorage.getItem("sixthsense.token");




if(token==undefined){
    window.location.href = "views/six-signin.html";
}
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/main.htm",
        controller : "dashboardCtrl"
    })
    .when("/ecuType", {
        templateUrl : "views/ecuType.htm",
        controller : "ecuTypeCtrl"
    })
    .when("/vehicleType", {
        templateUrl : "views/vehicleType.htm",
        controller : "vehicleTypeCtrl"
    })

    .when("/ecuUnit", {
        templateUrl : "views/ecuUnit.htm",
        controller : "ecuUnitctrl"
    })

    .when("/deviceUnit", {
        templateUrl : "views/deviceUnit.htm",
        controller : "deviceUnitctrl"
    })
    .when("/companyWizard",{
        templateUrl : "views/companyRead.htm",
        controller: "companyWizardReadCtrl"
    })
    .when("/companyRead",{
        templateUrl : "views/company.htm",
        controller: "companyWizardCtrl"
    })
     .when("/companySingleRead",{
        templateUrl:"views/companyReadNew.htm",
        controller:"companyUpdateCtrl"
    })
    .when("/companyUpdate",{
        templateUrl:"views/companyUpdate.htm",
        controller:"companyUpdateCtrl"
    })
    .when("/driver",{
        templateUrl:"views/driver.htm",
        controller:"driverCtrl"
    })
    .when("/vehicle",{
        templateUrl : "views/vehicle.htm",
        controller: "vehicleCtrl"
    })
    .when("/CompanyAdmin/EcuUnits",{
        templateUrl:"views/CompanyAdminEcuUnits.htm",
        controller:"CompAdmEcuUnit"
    })
    .when("/CompanyAdmin/DeviceUnits",{
        templateUrl:"views/CompanyAdminDeviceUnits.htm",
        controller:"CompAdmDeviceUnit"
    })
     .when("/CompanyAdmin/TripAll",{
        templateUrl:"views/tripAll.htm",
        controller:"tripAllCtrl"
    })
     .when("/CompanyAdmin/tripOne",{
        templateUrl:"views/trip.htm",
        controller:"TripOneCtrl"
    })

    .when("/CompanyAdmin/fleets",{
    templateUrl:"views/fleets.htm",
    controller:"fleetCtrl"
   })

    .when("/CompanyAdmin/CompanyAdminFeatures",{
        templateUrl:"/views/CompanyAdminFeatures.htm",
        controller:"CompanyAdminFeatures "
     });
});
