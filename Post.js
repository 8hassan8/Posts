myApp.namespace("posts");

myApp.posts = (() => {
  const getAllPosts = () => {
    const settings = {
      contentType: "application/json",
      type: "Get",

      success: response => {
        response.map(Element => {
          const html = `<div style="background-color: whitesmoke;" class="mt-1">
          <h5> Title: </h5>  ${Element.title}
            <h6> Body: </h6>
            ${Element.body}
          </div>
      `;
          $("#main-container").append(html);
        });
      },
      error: err => {
        $.alert(err);
      }
    };
    $.ajax("https://jsonplaceholder.typicode.com/posts", settings);
  };
  const readyMain = () => {
    getAllPosts();
  };
  return {
    readyMain
  };
})();
