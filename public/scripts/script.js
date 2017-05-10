var myApp=angular.module( 'myApp', [] );
myApp.controller( 'WhereMyPeeps', '$http', function( $http ){
var vm = this;
//POST to server
vm.addRecord = function(){
  var objectToSend ={
    name: vm.nameIn,
    location: vm.locationIn, //instead of  = changed to :
  }; //END objectToSend
  $http({
    method: 'POST',
    url: '/testPost',
    data: objectToSend
  }).then(function(response){
    console.log('back from the server:', response);
    vm.getRecords(); //getting records
  });//end http post
  vm.nameIn ='';
  vm.locationIn=''; //empties nameIn and locationIn input
};//end addRecord

//GET
vm.getRecords = function(){
  $http({//HTTP DOES NOT NEED $.
    method: 'GET',
    url: '/getRecords',
  }).then( function( response ){
    vm.allTheRecords = response;
    console.log( vm.allTheRecords );
  });
  };
});//end controller function
