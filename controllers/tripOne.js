app.controller("TripOneCtrl",function($scope,$http,$constants){
    

var getTripDetails = function(){
    var tripid = localStorage.getItem("tripId");
    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho; 
    var compId = localStorage.getItem("companyId");
    $http.get($constants.endPointInUse+"/api/companies/"+compId+"/trips/"+tripid,{headers:{'Content-Type':'application/json','Authorization': auth}})
         .then(function(response){
            $scope.TripDetails = response.data;
            
             console.log(response.data);
             integrateMap();
         })
         .catch(function(response){
            console.log(response);
         });

}

getTripDetails();

function integrateMap(){

var json = $scope.TripDetails.events;

var x1 = 0;
var y1=0;
var wayPoints = [];
var a,b;
var alarms = [];
var limp = [];
var brake = [];
var accCutOff = [];
var sleep = [];


    json.forEach(function(element) {
        x1+=element.data.lat;
        y1+=element.data.long;
        b = new google.maps.LatLng(element.data.lat, element.data.long);
        wayPoints.push(b);
        
        
        if(element.type==2){
            alarms.push(b);
        }
        if(element.type==3){
            limp.push(b);
        }
        if(element.type==4){
            brake.push(b);
        }
        if(element.type==5){
            accCutOff.push(b);
        }
        if(element.type==6){
            sleep.push(b);
        }



    }, this);

 var x = x1/json.length;
 var y = y1/json.length;
   
     var center = new google.maps.LatLng(x, y);
    
    var mapProp = {
            
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
               
            
            };
    
  $scope.map = new google.maps.Map(document.getElementById("map"), mapProp);
  var latlngbounds = new google.maps.LatLngBounds();
var marker = [];
var icons = "bus.png";
var alarmIcon="Alarm.png";
var limpIcon = "LIMP.png";
var brakeIcon = "Brake.png";
var accCutOffIcon = "AccCutOff.png";
var sleepIcon = "Sleep.png";
var startTrip ="TripStartPoint.png";
var endTrip ="TripEndPoint.png";
console.log(wayPoints[0]);
console.log(wayPoints[wayPoints.length-1]);

            //Marker for Starting
             var m = new google.maps.Marker({
                 Name: "a",
                 position:wayPoints[0], 
                 icon:startTrip
             });
             marker.push(m);
             m.setMap( $scope.map );

if($scope.TripDetails.status == "ACTIVE"){
 var m = new google.maps.Marker({
                 Name: "a",
                 position:wayPoints[wayPoints.length-1], 
                  icon:endTrip
             });
             marker.push(m);
             m.setMap( $scope.map );
}
              //Marker for Current
            



alarms.forEach(function(alarmElement) {
     var m = new google.maps.Marker({
                 Name: "a",
                 position:alarmElement,
                 icon:alarmIcon
             });
             marker.push(m);
             m.setMap( $scope.map );
}, this);

limp.forEach(function(alarmElement) {
     var m = new google.maps.Marker({
                 Name: "a",
                 position:alarmElement,
                 icon:limpIcon
             });
             marker.push(m);
             m.setMap( $scope.map );
}, this);
brake.forEach(function(alarmElement) {
     var m = new google.maps.Marker({
                 Name: "a",
                 position:alarmElement,
                 icon:brakeIcon
             });
             marker.push(m);
             m.setMap( $scope.map );
}, this);
accCutOff.forEach(function(alarmElement) {
     var m = new google.maps.Marker({
                 Name: "a",
                 position:alarmElement,
                 icon:accCutOffIcon
             });
             marker.push(m);
             m.setMap( $scope.map );
}, this);

sleep.forEach(function(alarmElement) {
     var m = new google.maps.Marker({
                 Name: "a",
                 position:alarmElement,
                 icon:sleepIcon
             });
             marker.push(m);
             m.setMap( $scope.map );
}, this);


var flightPath = new google.maps.Polyline({
                path: wayPoints,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 0.5,
                strokeWeight: 3,
                fillColor: "#0000FF",
                fillOpacity: 0.4,

            });
            flightPath.setMap($scope.map);
//for looping way points
  wayPoints.forEach(function(element) {
      //For Markers
      
       
 latlngbounds.extend(element);
  }, this);
    
    $scope.map.setCenter(latlngbounds.getCenter());
    $scope.map.fitBounds(latlngbounds);
    var path = new google.maps.MVCArray();
    var service = new google.maps.DirectionsService();
    // var poly = new google.maps.Polyline({ map:  $scope.map, strokeColor: '#4986E7' });
    //  for (var i = 0; i < wayPoints.length; i++) {
    //         if ((i + 1) < wayPoints.length) {
    //             var src = wayPoints[i];
    //             var des = wayPoints[i + 1];
    //             path.push(src);
    //             poly.setPath(path);
    //             service.route({
    //                 origin: src,
    //                 destination: des,
    //                 travelMode: google.maps.DirectionsTravelMode.DRIVING
    //             }, function (result, status) {
    //                 if (status == google.maps.DirectionsStatus.OK) {
    //                     for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
    //                         path.push(result.routes[0].overview_path[i]);
    //                     }
    //                 }
    //             });
    //         }
    //     }
}





    // var json = [{lat: 19.069313,lon:73.019912},{lat:19.103227,lon: 73.011405},{lat:19.136693,lon:73.003076}];


 




});