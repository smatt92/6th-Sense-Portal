app.controller("ecuTypeCtrl", function ($scope,$http,$constants,$filter) {
//View All ECU Types
var getEcuType = function(){
    var autho = localStorage.getItem("sixthsense.token");
    var auth = "Bearer "+autho;
    $scope.ecuTypePages=0;

    $http.get($constants.endPointInUse+"/api/ecuTypes",{headers:{'Content-Type':'application/json','Authorization': auth}})
    .then(function(response){
    console.log(response);
    $scope.ecuTypes = response.data;
    $scope.ecuTypePages= response.data.length;
    $scope.ecuTypeReverse=[];
    for(var i=$scope.ecuTypePages-1;i>0;i--){
        $scope.ecuTypeReverse.push($scope.ecuTypes[i]);
    }


    })
    .catch(function(response){
       console.log(response.data); 
    });
}
getEcuType(); 


//SetDeleteECUTypeId
$scope.setDeleteElementId = function(id){
    $scope.DeleteElementId = id;
}



$scope.ecuOptions = ["YES","NO"];
//Delete the ECU type
 $scope.deleteEcuType = function(id){
        var autho = localStorage.getItem("sixthsense.token");
        var auth = "Bearer "+autho;
        var DeleteEcuTypeCall = $http.delete($constants.endPointInUse+"/api/ecuTypes/"+id,{headers:{'Content-Type':'application/json','Authorization': auth}});
        DeleteEcuTypeCall.then(function(response){
            console.log(response);
            getEcuType();
        })
        .catch(function(response){
       console.log(response.data);
    });
 }


$scope.addEcuType = function(){

    

        var autho = localStorage.getItem("sixthsense.token");
        var auth = "Bearer "+autho;

            var name = $scope.ecuTypeName;
            var can = $scope.ecuTypeCan;
            var cylinder =$scope.ecuTypeCylinder;
            var analog = $scope.ecuTypeAnalog;

            if(name==undefined){
               $scope.ECUnameErr = true;
            }else{
                angular.element("#addEcuType").modal("hide");
            var newEcu = {
                        "name":name,
                        "can":can,
                        "cylinder_2":cylinder,
                        "analog_switch":analog
                    }
                    var AddEcuType = $http.post($constants.endPointInUse+"/api/ecuTypes",newEcu,{headers:{'Content-Type':'application/json','Authorization': auth}});
                    AddEcuType.then(function(response){
                        console.log((response));
                        getEcuType();
                    })
                    .catch(function(response){
                        $scope.error = true;
                        console.log(response.data);
                        $scope.errorMsg = response.data.errmsg;
                        $scope.errorLists = response.data.message_list;

                    $("#addEcuType").modal("show");
                });
            }
       
}

$scope.AddDataToEdit = function(id){

        var edittableObject = $filter('filter')($scope.ecuTypes,function(d){return d._id === id })[0];
        console.log(edittableObject);
            $scope.EditecuId = id;
            $scope.EditecuTypeName = edittableObject.name;
            $scope.EditecuTypeCan = edittableObject.can;
            $scope.EditecuTypeCylinder = edittableObject.cylinder_2;
            $scope.EditecuTypeAnalog = edittableObject.analog_switch;
}

$scope.EditData = function(){
    var autho = localStorage.getItem("sixthsense.token");
        var auth = "Bearer "+autho;
        var id =   $scope.EditecuId;
            var name =  $scope.EditecuTypeName;
            var can =$scope.EditecuTypeCan;
            var cylinder =  $scope.EditecuTypeCylinder;
            var analog = $scope.EditecuTypeAnalog;

        var newEcu = {
            "name":name,
            "can":can,
            "cylinder_2":cylinder,
            "analog_switch":analog
        }
        var AddEcuType = $http.put($constants.endPointInUse+"/api/ecuTypes/"+id,newEcu,{headers:{'Content-Type':'application/json','Authorization': auth}});
        AddEcuType.then(function(response){
            console.log(response);
              getEcuType();
        })
        .catch(function(response){
       console.log(response.data);
    });
}


// $scope.currentPage=1;
// $scope.pageSize=ecuTypePages;


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