// Function to get the current user's username from localStorage
function getCurrentUser() {
    return localStorage.getItem('currentUser');
  }
  
  // Function to fetch all posts
async function fetchAllPosts() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    return posts;
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
        <p>${post.dateTimePosted}</p>
      `;
      postContainer.appendChild(postElement);
    });
  }
  
  // Main function to get all posts and display them
async function showUserPosts() {
  const posts = await fetchAllPosts();
  displayPosts(posts);
}

// Call the main function when the page loads
document.addEventListener('DOMContentLoaded', showUserPosts);