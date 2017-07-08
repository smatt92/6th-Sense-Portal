app.controller("driverCtrl", function ($scope,$http,$constants) {
//Change in Url
// api/companies/{{CompanyId}}/drivers


//getCompany id
var compId = localStorage.getItem("companyId");
console.log(compId);

var getDrivers = function(){
     var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
     $scope.driverNumbers=0;

    $http.get($constants.endPointInUse+"/api/companies/"+compId+"/drivers",{headers:{'Content-Type':'application/json','Authorization': auth}})
         .then(function(response){
             $scope.drivers = response.data;
             $scope.driverNumbers =response.data.length;
             $scope.driverArray=[];
             for(var i=$scope.driverNumbers-1;i>=0;i--){
                $scope.driverArray.push($scope.drivers[i]);
             }
         })
         .catch(function(response){
             console.log(response.data);
         })
}
getDrivers();
$scope.editOrCreate = "1";
var imageLoader1 = document.getElementById('imageLoader1');
    imageLoader1.addEventListener('change', handleImage, false);
var canvas1 = document.getElementById('imageCanvas1');
var ctx1 = canvas1.getContext('2d');

var imageSize = 400;
function handleImage(e){
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    $scope.createImgAvailable = "true";
    var reader = new FileReader();
    reader.onload = function(event){
        

        var img = new Image();
        img.onload = function(){
            var width = img.width;
            var height = img.height;
            var widthRatio =1;
            var heightRatio =1;



            if(width > height){
                widthRatio = imageSize/width;  
                heightRatio = imageSize/width;
            }    
            if(height > width){
                 widthRatio = imageSize/height;  
                heightRatio = imageSize/height;
             
            }

            console.log(widthRatio+","+heightRatio);

            ctx1.scale(widthRatio,heightRatio);


            ctx1.drawImage(img,0,0); 
           localStorage.setItem("savedImageData", canvas1.toDataURL("image/png"));
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

var imageLoader2 = document.getElementById('imageLoader2');
    imageLoader2.addEventListener('change', handleImage2, false);
var canvas2 = document.getElementById('imageCanvas2');
var ctx2 = canvas2.getContext('2d');

var imageLoader2 = document.getElementById('imageLoader2');
    imageLoader2.addEventListener('change', handleImage2, false);
function handleImage2(e){


    angular.element("#canvasHolder").empty();
    angular.element("#canvasHolder").append('<canvas id="imageCanvas2"></canvas>');
 

var canvas2 = document.getElementById('imageCanvas2');
var ctx2 = canvas2.getContext('2d');

    $scope.createImgAvailable = "true";
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            var width = img.width;
            var height = img.height;
            var widthRatio =1;
            var heightRatio =1;
                if(width > height){
                    widthRatio = imageSize/width;  
                    heightRatio = imageSize/width;
                }    
                if(height > width){
                    widthRatio = imageSize/height;  
                    heightRatio = imageSize/height;
                }
            console.log(widthRatio+","+heightRatio);
            ctx2.scale(widthRatio,heightRatio);
            ctx2.drawImage(img,0,0); 
           localStorage.setItem("savedImageData", canvas2.toDataURL("image/png"));
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);  
}

$scope.getDriverData = function(id){
     var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
    $http.get($constants.endPointInUse+"/api/companies/"+compId+"/drivers/"+id,{headers:{'Content-Type':'application/json','Authorization': auth}})
         .then(function(response){
             $scope.driverEditDetails = response.data;
            var canvas = document.getElementById('imageCanvas2');
      var context = canvas.getContext('2d');
      var imageObj = new Image();

      imageObj.onload = function() {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.drawImage(imageObj, 0, 0);
        
      };
      imageObj.src =  $scope.driverEditDetails.profile_url;
      console.log( $scope.driverEditDetails.profile_url);
         })
         .catch(function(response){
             console.log(response.data);
         })
}
$scope.EditDriver = function(id,form){


    



    $scope.clicked1 = true;
    if($scope[form].$valid){
        var autho = localStorage.getItem("sixthsense.token");
            var auth = "Bearer "+autho;
        if($scope.createImgAvailable == "true"){
            var img = localStorage.getItem("savedImageData");
            img = img.replace("data:image/png;base64,","");
            console.log(img);
            var json = {
                image_data : img,
                name: $scope.driverEditDetails.name,
                address :$scope.driverEditDetails.address,
                mobile_no:$scope.driverEditDetails.mobile_no,
                license_no : $scope.driverEditDetails.license_no
            }
        }
        else{
            var json = {
                name: $scope.driverEditDetails.name,
                address :$scope.driverEditDetails.address,
                mobile_no:$scope.driverEditDetails.mobile_no,
                license_no : $scope.driverEditDetails.license_no
            }
        }
            $http.put($constants.endPointInUse+"/api/companies/"+compId+"/drivers/"+id,json,{headers:{'Content-Type':'application/json','Authorization': auth}})
                .then(function(response){
                    console.log(response.data);
                    angular.element("#editDriver").modal("hide");
                })
                .catch(function(response){
                    console.log(response.data);
                });
        }
            
        getDrivers();
    }
    


$scope.createDriver = function(form){



    $scope.clicked = true;
    if($scope[form].$valid){
        var img = "";
        var json;
        if($scope.createImgAvailable == "true"){
            img = canvas1.toDataURL();
            img = img.replace("data:image/png;base64,","");
            console.log(canvas1.toDataURL());
         json = {
                name: $scope.driverName,
                address :$scope.driverAdd,
                mobile_no:$scope.driverMobile,
                license_no : $scope.driverLicNo,
                image_data: img
                 }
        }
        else{
            json = {
                    name: $scope.driverName,
                    address :$scope.driverAdd,
                    mobile_no:$scope.driverMobile,
                    license_no : $scope.driverLicNo
                }
        }
        
        var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;

   console.log(json);
     $http.post($constants.endPointInUse+"/api/companies/"+compId+"/drivers",json,{headers:{'Content-Type':'application/json','Authorization': auth}})
         .then(function(response){
             console.log(response.data);
            getDrivers();
            angular.element("#addDriver").modal("hide");
         })
         .catch(function(response){
             console.log(response.data);
             $scope.error = true;
          console.log(response.data);
          $scope.errorMsg = response.data.errmsg;
          $scope.errorLists = response.data.message_list;
         });
    

}
    }

    

$scope.deleteDriver = function(id){
    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
    $http.delete($constants.endPointInUse+"/api/companies/"+compId+"/drivers/"+id,{headers:{'Content-Type':'application/json','Authorization': auth}})
        .then(function(response){
            console.log(response);
            getDrivers();
        })
        .catch(function(response){
       console.log(response.data);
    });
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