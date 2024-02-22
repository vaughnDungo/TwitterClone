function getCurrentUserToken(){
  return localStorage.getItem('authToken');
}
// Function to fetch all posts of the current user and the users they are following
async function fetchAllPosts() {
  try {
    const currentUser = localStorage.getItem('currentUser'); // Get the current user's username from localStorage
    const followedUsers = await getFollowedUsers(); // Get the list of users that the current user is following

    // Fetch all posts
    const response = await fetch('http://localhost:3000/api/v1/posts', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCurrentUserToken()}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const allPosts = await response.json();

    // Filter posts to include only those from the users that the current user is following
    const filteredPosts = allPosts.filter(post => followedUsers.includes(post.postedBy));

    return filteredPosts;
  } catch (error) {
    console.error(`Fetching posts failed: ${error}`);
    throw error;
  }
}

async function getFollowedUsers(){
  const user=localStorage.getItem('currentUser');
  const response = await fetch(`http://localhost:3000/api/v1/users/${user}/following`,{
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getCurrentUserToken()}`}
  });
  const followedUsers = await response.json();
  return followedUsers;
}
async function createPost(){
    const authToken = localStorage.getItem('authToken');
    const content = document.getElementById('input').value;
    const response = await fetch('http://localhost:3000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        content
      }),
    })
}


async function displayPosts(posts) {
  const postContainer = document.querySelector('.secondContainer');
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.setAttribute('class', 'postElement');
    const currentUser = localStorage.getItem('currentUser');
    const likeButtonText = post.likes.includes(currentUser) ? 'Unlike' : 'Like';
    postElement.innerHTML = `
      <h3 class='usernamePost'>${post.postedBy}</h3>
      <p class='contentPost'>${post.content}</p>
      <button class="like-button" data-post-id="${post.postId}">${likeButtonText}</button>
    `;
    postContainer.appendChild(postElement);

    // Attach event listener to the like button
    const likeButton = postElement.querySelector('.like-button');
    likeButton.addEventListener('click', async () => {
      try {
        await toggleLikePost(post.postId);
      } catch (error) {
        console.error(`Error toggling like status of post: ${error}`);
      }
    });
  });
}

async function showPosts() {
  const posts = await fetchAllPosts();
  displayPosts(posts);
}
async function toggleLikePost(postId) {
  try {
    const authToken = localStorage.getItem('authToken');
    const currentUser = localStorage.getItem('currentUser');
    const response = await fetch(`/api/v1/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ action: 'toggleLike', user: currentUser })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedPost = await response.json();
    // Update the like button text based on the updated 'likes' array
    const likeButton = document.querySelector(`.like-button[data-post-id="${postId}"]`);
    if (updatedPost.likes.includes(currentUser)) {
      likeButton.textContent = 'Unlike';
    } else {
      likeButton.textContent = 'Like';
    }
    return updatedPost;
  } catch (error) {
    console.error(`Error toggling like status of post: ${error}`);
    throw error;
  }
}

document.addEventListener('DOMContentLoaded', showPosts);
