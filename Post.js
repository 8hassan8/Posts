myApp.namespace("posts");

myApp.posts = (function() {
  function getAllPosts() {
    const settings = {
      contentType: "application/json",
      type: "Get",

      success: function(respose) {
        for (let i = 0; i < respose.length; i++) {
          console.log(`Title: ${respose[i].title} Body: ${respose[i].body}`);
          const html = `<div style="background-color: whitesmoke;" class="mt-1">
            <h5>${respose[i].title}</h5>
            <p>
            ${respose[i].body}
            </p>
          </div>
      `;
          $("#main-container").append(html);
        }
        console.log(respose);
      },
      error: function(err) {
        console.log(err);
      }
    };
    $.ajax("https://jsonplaceholder.typicode.com/posts", settings);
  }
  function readyMain() {
    getAllPosts();
  }
  return {
    readyMain
  };
})();
