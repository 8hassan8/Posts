myApp.namespace("posts");

myApp.posts = (() => {
  const getAllPosts = () => {
    const settings = {
      contentType: "application/json",
      type: "Get",

      success: response => {
        response.map(Post => {
          getCommentsByPostId(Post.id)
            .then(comments => {
              Post["comments"] = comments;
              console.log(response);
              let theTemplateScript = $("#adress-template").html();
              let theTemplate = Handlebars.compile(theTemplateScript);
              let theCompiledHtml = theTemplate(Post);
              $(".container").append(theCompiledHtml);
            })
            .catch(error => {});
        });
      },
      error: err => {
        $.alert(err);
      }
    };

    $.ajax("https://jsonplaceholder.typicode.com/posts", settings);
  };
  const getCommentsByPostId = postId => {
    return new Promise((resolve, reject) => {
      const settings = {
        contentType: "application/json",
        type: "Get",
        success: response => resolve(response),
        error: err => reject(err)
      };

      $.ajax(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
        settings
      );
    });
  };
  const readyMain = () => {
    getAllPosts();
  };
  return {
    readyMain
  };
})();
