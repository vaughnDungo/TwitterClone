
async function fetchUsersToFollow() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error(`Error fetching users to follow: ${error}`);
    throw error;
  }
}

// Function to follow a user
async function followUser(username) {
  try {
    const authToken = sessionStorage.getItem('authToken');

    const response = await fetch(`/api/follow/${username}`, {
      method: 'POST',
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
    console.error(`Error following user: ${error}`);
    throw error;
  }
}

// Function to unfollow a user
async function unfollowUser(username) {
  try {
    const authToken = sessionStorage.getItem('authToken');

    const response = await fetch(`http://localhost:3000/api/v1/users/${username}/following`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (!response.ok) {
      throw new Error(`Unfollow request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error unfollowing user: ${error}`);
    throw error;
  }
}
// Function to unfollow a user
async function unfollowUser(username) {
  try {
    const authToken = sessionStorage.getItem('authToken');

    const response = await fetch(`http://localhost:3000/api/v1/users/${username}/following`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (!response.ok) {
      throw new Error(`Unfollow request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error unfollowing user: ${error}`);
    throw error;
  }
}

// Function to get the current user's token
function getCurrentUserToken() {
  return localStorage.getItem('authToken');
}

// Function to display users to follow
function displayUsersToFollow(users) {
  const userListContainer = document.querySelector('.following-page-item');
  users.forEach((user) => {
    const userContainer = document.createElement('div');
    userContainer.textContent = user.username;
    const followButton = document.createElement('button');
    followButton.textContent = 'Follow';
    followButton.onclick = function() {
      followUser(user.username).then(() => {
        followButton.textContent = 'Unfollow';
        followButton.onclick = function() {
          unfollowUser(user.username).then(() => {
            followButton.textContent = 'Follow';
          });
        };
      });
    };
    userContainer.appendChild(followButton);
    userListContainer.appendChild(userContainer);

    // Log the user to the console
    console.log(user);
  });
}

// Main function to fetch users to follow and display them
async function showUsersToFollow() {
  const users = await fetchUsersToFollow();
  displayUsersToFollow(users);
}

document.addEventListener('DOMContentLoaded', showUsersToFollow);
async function unfollowUser(username) {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/users/${username}/following`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCurrentUserToken()}`
      }
    });
    if (!response.ok) {
      throw new Error(`Unfollow request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error unfollowing user: ${error}`);
    throw error;
  }
}

function getCurrentUserToken() {
  return localStorage.getItem('authToken');
}

function displayUsersToFollow(users) {
  const userListContainer = document.querySelector('.following-page-item');
  users.forEach((user) => {
    const userContainer = document.createElement('div');
    userContainer.textContent = user.username;
    const followButton = document.createElement('button');
    followButton.textContent = 'Follow';
    followButton.onclick = function() {
      followUser(user.username).then(() => {
        followButton.textContent = 'Unfollow';
        followButton.onclick = function() {
          unfollowUser(user.username).then(() => {
            followButton.textContent = 'Follow';
          });
        };
      });
    };
    userContainer.appendChild(followButton);
    userListContainer.appendChild(userContainer);

    console.log(user);
  });
}

async function showUsersToFollow() {
  const users = await fetchUsersToFollow();
  displayUsersToFollow(users);
}

document.addEventListener('DOMContentLoaded', showUsersToFollow);