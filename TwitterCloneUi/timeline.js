// Function to fetch all posts
async function fetchAllPosts() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/posts', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCurrentUserToken()}`
      }
    });

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

// Function to display posts
function displayPosts(posts) {
  const postContainer = document.querySelector('.timeline-page');
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <p>${post.content}</p>
      <p>Posted by: ${post.postedBy}</p>
      <p>Posted at: ${post.dateTimePosted}</p>
    `;
    postContainer.appendChild(postElement);
  });
}

// Main function to fetch posts and display them
async function showPosts() {
  const posts = await fetchAllPosts();
  displayPosts(posts);
}

// Call the main function when the page loads
document.addEventListener('DOMContentLoaded', showPosts);
