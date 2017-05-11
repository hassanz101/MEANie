var myApp = angular.module('myApp', []);
console.log('script sourced');
myApp.controller('WhereMyPeeps', function($http) {
  var vm = this;
  //POST to server
  vm.addRecord = function() {
    var objectToSend = {
      name: vm.nameIn,
      location: vm.locationIn, //instead of  = changed to :
    }; //END objectToSend
    $http({
      method: 'POST',
      url: '/testPost',
      data: objectToSend
    }).then(function(response) {
      console.log('back from the server:', response);
      vm.getRecords(); //getting records
    }); //end http post
    vm.nameIn = '';
    vm.locationIn = ''; //empties nameIn and locationIn input
  }; //end addRecord

  //GET
  vm.getRecords = function() {
    $http({ //HTTP DOES NOT NEED $.
      method: 'GET',
      url: '/getRecords',
    }).then(function(response) {
      console.log("this is the response", response);
      vm.allTheRecords = response.data; //array that holds all the data in resp.data
      console.log(vm.allTheRecords);
    });
  };
  //delete
  vm.deleteRecords = function(id) {
    $http({
      method: 'DELETE',
      url: '/delete/' + id,
    }).then(function(response) {
      console.log(response);
      console.log('deleting from:');
      vm.getRecords();
    }); //end then
  }; //end delete
}); //end controller function
