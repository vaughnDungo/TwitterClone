document.addEventListener('DOMContentLoaded', function () {
    const tweetForm = document.getElementById('postbox');
    const tweetInput = document.getElementById('tweetInput');
  
    function createPostElement(post) {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
  
      const postBody = document.createElement('div');
      postBody.classList.add('post__body');
  
      const postHeader = document.createElement('div');
      postHeader.classList.add('post__header');
  
      const postHeaderText = document.createElement('div');
      postHeaderText.classList.add('post__headerText');
  
      const username = document.createElement('h3');
      username.textContent = post.username;
      postHeaderText.appendChild(username);
      postHeader.appendChild(postHeaderText);
  
      const postDescription = document.createElement('div');
      postDescription.classList.add('post__headerDescription');
      const descriptionText = document.createElement('p');
      descriptionText.textContent = post.content;
      postDescription.appendChild(descriptionText);
      postHeader.appendChild(postDescription);
  
      postBody.appendChild(postHeader);
  
      const postFooter = document.createElement('div');
      postFooter.classList.add('post__footer');

  
      postBody.appendChild(postFooter);
  
      postElement.appendChild(postBody);
  
      return postElement;
    }
  
    
    var authToken = localStorage.getItem('authToken');
    var currentUser = localStorage.getItem('currentUser');
  
  
    //Just for putting tweet on (client-side) timeline. Refer to publishPost for putting stuff in API
    function addPost(post) {
      const postElement = createPostElement(post);
      feed.appendChild(postElement);
    }
  
    //Publish post to API and put it in timeline
    function publishPost(post){
      fetch('/api/v1/posts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization' : 'Bearer '+authToken
        },
        body: JSON.stringify({
          "content": post.content
        })
      })
        // .then(response => response.json())
        .then(console.log('Post published by: ',post.username))
        .then(addPost(post))
      .catch(error => {
        console.error('Error publishing post:', error);
      })
    }
});