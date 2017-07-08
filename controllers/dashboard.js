app.controller("dashboardCtrl", function ($scope,$http,$constants) {

$scope.ecuTypeNumbers = 0;
$scope.vehicleTypeNumbers = 0;
$scope.companyNumbers = 0;
$scope.ecuUnits=0;
$scope.deviceUnit = 0;

var ecuCount = 0;
 var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho; 
$http.get($constants.endPointInUse+"/api/ecuTypes",{headers:{'Content-Type':'application/json','Authorization': auth}})
     .then(function(response){
       $scope.ecuTypeNumbers= response.data.length;

     })
     .catch(function(response){
       console.log(response.data);
    });

 var GetVehList = $http.get($constants.endPointInUse+"/api/vehicleTypes",{headers:{'Content-Type':'application/json','Authorization': auth}});
    GetVehList.then(function(response){
      $scope.vehicleTypeNumbers = response.data.length;
        });
      
  GetVehList.catch(function(response){
       console.log(response.data);
    });

$http.get($constants.endPointInUse+"/api/companies",{headers:{'Content-Type':'application/json','Authorization': auth}})
     .then(function(response){
         $scope.companyNumbers = response.data.length;
         
     })
     .catch(function(response){
         console.log(response.data);
     });

 var GetecuList = $http.get($constants.endPointInUse+"/api/ecus",{headers:{'Content-Type':'application/json','Authorization': auth}});
    GetecuList.then(function(response){
      
      $scope.ecuUnits = response.data.length;
  })
  .catch(function(response){
       console.log(response.data);
    });


 var GetdeviceList = $http.get($constants.endPointInUse+"/api/devices",{headers:{'Content-Type':'application/json','Authorization': auth}});
    GetdeviceList.then(function(response){
  
      $scope.deviceUnit = response.data.length;
  });
  GetdeviceList.catch(function(response){
       console.log(response.data);
    });

// Company admin get numbers

var compId = localStorage.getItem("companyId");


var getDrivers=$http.get($constants.endPointInUse+"/api/companies/"+compId+"/drivers",{headers:{'Content-Type':'application/json','Authorization':auth}});
 getDrivers.then(function(response){
      $scope.drivers=response.data.length;
});

var getCompanyVehicle=$http.get($constants.endPointInUse+"/api/companies/"+compId+"/vehicles",{headers:{'Content-Type':'application/json','Authorization':auth}});
getCompanyVehicle.then(function(response){
  $scope.companyVehicleList=response.data.length;
});

var getCompanyEcu=$http.get($constants.endPointInUse+"/api/companies/"+compId+"/ecus",{headers:{'Content-Type':'application/json','Authorization':auth}});
getCompanyEcu.then(function(response){
  $scope.companyEcuList=response.data.length;
});

var getCompanyDevice=$http.get($constants.endPointInUse+"/api/companies/"+compId+"/devices",{headers:{'Content-Type':'application/json','Authorization':auth}});
getCompanyDevice.then(function(response){
  $scope.companyDeviceList=response.data.length;
});


var getTrips=$http.get($constants.endPointInUse+"/api/companies/"+compId+"/trips",{headers:{'Content-Type':'application/json','Authorization':auth}});
getTrips.then(function(response){
  $scope.companyTripList=response.data.length;
});

















//trip pie value
 
    var compId = localStorage.getItem("companyId");

var gettrippie=$http.get($constants.endPointInUse+"/api/companies/"+compId+"/charts/getTripChart",{headers:{'Content-Type':'application/json','Authorization':auth}});
gettrippie.then(function(response){
  $scope.tripActive= response.data.active;
  $scope.tripEnd=response.data.ended;
  console.log( $scope.tripActive +","+  $scope.tripEnd);

// trip Pie chart


  $scope.labels = [ "Active","Ended"];
  $scope.data = [$scope.tripActive, $scope.tripEnd];
  $scope.backgroundColor =
  [
        "#4adb9e",
        "#f48a55"
        
  ]

  $scope.options= {
        legend: {
            display: true,
            labels: {
                
                boxWidth:20
            },
            position:'bottom'


        },

        title: {
            display:true,
            text: 'Trips',
            fontSize: 20
        }



}
 
});//option close


//vehicle pie

var getVehichlepie=$http.get($constants.endPointInUse+"/api/companies/"+compId+"/charts/getVehicleChart",{headers:{'Content-Type':'application/json','Authorization':auth}});
getVehichlepie.then(function(response){
  $scope.provisioned=response.data.provisioned;
  $scope.nonProvisioned=response.data.non_provisioned;


$scope.labels1=["Provisioned","Not Provisioned"];
    $scope.data1=[$scope.provisioned,$scope.nonProvisioned ];
    $scope.options1={

        legend: {

            display:true,
            label1:{ 

        },
            position:'bottom',

             boxWidth:20

        },

        title: { display:true, text:'Vehicles', fontSize:20},

        
    }
    $scope.backgroundColor1=["#4554a3", "#f8981c"];



});


// Leaderboard

var getLeader=$http.get($constants.endPointInUse+"/api/companies/"+compId+"/charts/getDriverChart",{headers:{'Content-Type':'application/json','Authorization':auth}});

getLeader.then(function(response){

  $scope.ranking=response.data;


});



      
});