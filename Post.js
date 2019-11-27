myApp.namespace("posts");

myApp.posts = (() => {
  const getAllPosts = () => {
    const settings = {
      contentType: "application/json",
      type: "Get",

      success: response => {
        response.map(async Post => {
          let commentsHtml = "";
          await getCommentsByPostId(Post.id)
            .then(comments => {
              comments.map(com => {
                commentsHtml += `<h5>Email: ${com.email}  </h5> <p>Body: ${com.body}  </p>`;
              });
            })
            .catch(error => {});

          console.log(commentsHtml);
          const html = `<div style="background-color: whitesmoke;" class="mt-1">
          <h5> Title: </h5>  ${Post.title}
            <h6> Body: </h6> ${Post.body}
            </div>
            <div>
            <h2> Comments: </h2>
            <div class=mr-50>
            ${commentsHtml}
            </div>
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
