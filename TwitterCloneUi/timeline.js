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
  console.log(followedUsers);
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
  const postContainer = document.querySelector('.timeline-page');
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.setAttribute('class', 'postElement');
    postElement.innerHTML = `
      <h3 class='usernamePost'>${post.postedBy}</h3>
      <p class='contentPost'>${post.content}</p>
      <button class="like-button" data-post-id="${post.id}">Like</button>
    `;
    postContainer.appendChild(postElement);

    // Attach event listener to the like button
    const likeButton = postElement.querySelector('.like-button');
    likeButton.addEventListener('click', async () => {
      try {
        await toggleLikePost(post.id);
        // Optionally update the button text or style to indicate the like status
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
async function toggleLikePost(postID) {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`http://localhost:3000/api/v1/posts/${postID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error toggling like status of post: ${error}`);
    throw error;
  }
}

document.addEventListener('DOMContentLoaded', showPosts);
