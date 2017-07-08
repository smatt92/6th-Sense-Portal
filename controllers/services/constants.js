
try{
app.service('$constants',function(){
    this.demoEndPoint = "http://ec2-13-126-217-60.ap-south-1.compute.amazonaws.com:3000";
    this.devEndPoint = "http://ec2-52-66-111-29.ap-south-1.compute.amazonaws.com:3000";
    this.endPointInUse = this.demoEndPoint;
});
}
catch(a){

}

try{
SignInapp.service('$constants',function(){
    this.demoEndPoint = "http://ec2-13-126-217-60.ap-south-1.compute.amazonaws.com:3000";
    this.devEndPoint = "http://ec2-52-66-111-29.ap-south-1.compute.amazonaws.com:3000";
    this.endPointInUse = this.demoEndPoint;
})
}
catch(a){

}
