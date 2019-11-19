var myApp = {};

myApp.namespace = function(subSpace) {
  myApp[subSpace] = {};
  console.log(myApp);
};
