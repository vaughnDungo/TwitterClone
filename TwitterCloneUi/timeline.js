function getCurrentUserToken(){
  return localStorage.getItem('authToken');
}
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

async function displayPosts(posts){
  const authToken = localStorage.getItem('authToken');
  const postContainer = document.querySelector('.timeline-page');
  const postElement = document.createElement('div');
  const post = await fetch('http://localhost:3000/api/v1/posts', {
    
  })
}

async function showPosts() {
  const posts = await fetchAllPosts();
  displayPosts(posts);
}

document.addEventListener('DOMContentLoaded', showPosts);
