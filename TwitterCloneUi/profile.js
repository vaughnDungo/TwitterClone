// Function to get the current user's username from localStorage
function getCurrentUserToken() {
    return localStorage.getItem('authToken');
  }
  
  // Function to fetch all posts
// Function to fetch all posts of the current user
async function fetchAllPosts(currentUser) {
  try {
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
    const posts = await response.json();
    // Filter posts to only include those posted by the current user
    const currentUserPosts = posts.filter(post => post.postedBy === currentUser);
    return currentUserPosts;
  } catch (error) {
    console.error(`Fetching posts failed: ${error}`);
    throw error;
  }
}

  
  // Function to display posts on the page
  function displayPosts(posts) {
    const postContainer = document.querySelector('.profile-page-inner');
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `
        <h3>${post.postedBy}</h3>
        <p>${post.content}</p>
      `;
      postContainer.appendChild(postElement);
    });
  }
  
// Main function to get all posts of the current user and display them
async function showUserPosts() {
  const currentUser = localStorage.getItem('currentUser'); // Get the current user's username from localStorage
  const posts = await fetchAllPosts(currentUser); // Pass the current user's username to fetchAllPosts
  displayPosts(posts);
}

// Call the main function when the page loads
document.addEventListener('DOMContentLoaded', showUserPosts);