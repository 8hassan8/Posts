myApp.namespace("Validation");

myApp.Validation = (() => {
  const validateUser = vName => {
    const settings = {
      contentType: "Application/Json",
      type: "Get",

      success: response => {
        const user = response.filter(user => user.name === vName);
        if (user.length > 0) {
          alert("valid user name");
          window.location.href="Post.html"
        } else {
          alert("invalid user name");
        }
      },

      error: err => {
        $.alert(err);
      }
    };
    $.ajax("https://jsonplaceholder.typicode.com/users", settings);
  };
  const bindEvents = () => {
    $(".login-btn").click(() => {
      const name = $("input[hassan='myHassan']").val();
      alert(`This is ${name}`);
      //alert(`This is ${$(".uName").val()}`);
      validateUser(name);
    });
  };
  const readyMain = () => {
    bindEvents();
  };
  return {
    readyMain
  };
})();
