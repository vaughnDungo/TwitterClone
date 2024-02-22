function getCurrentUserToken(){
  return localStorage.getItem('authToken');
}
async function fetchUsersToFollow() {
  const currentUser = localStorage.getItem('currentUser');
  try {
    const response = await fetch('http://localhost:3000/api/v1/users',{
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCurrentUserToken()}`}
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    return users.filter(user => user != currentUser);
  } catch (error) {
    console.error(`Error fetching users to follow: ${error}`);
    throw error;
  }
}

async function renderUsersToFollow(){
  const users = await fetchUsersToFollow();
  const usersFollowed = new Set(await getFollowedUsers()) // fetch followed user from API

  const usersList = document.getElementById('suggest-users-container');
  usersList.innerHTML = "" // remove all children
  users.forEach(user => {
    const listItem = document.createElement('div');
    listItem.classList.add("following-user")
    // if user is followed, then change button text to unfollow and s
    const isUserFollowed = usersFollowed.has(user)
    listItem.innerHTML = `
          <div class="profile-name">${user}</div>
          <div class="username">@${user}</div>
          <button class="follow" id="follow_btn" >${ isUserFollowed? "Unfollow" : "Follow"}</button>
        `;
    usersList.appendChild(listItem);
    listItem.getElementsByClassName("follow")[0].addEventListener("click", () => {
      // if statement
      if (isUserFollowed){
        unfollowUser(user);
      }
      else{
        followUser(user);
      }
      renderUsersToFollow() // rerender
    })
  });
}
document.addEventListener('DOMContentLoaded', renderUsersToFollow);

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
// Function to follow a user
async function followUser(usernameToFollow) {
  console.log("Following", usernameToFollow);
  try {
    const authToken = localStorage.getItem('authToken');
    const follower = localStorage.getItem('currentUser');
    // POST api/v1/users/<follower>/following/<toFollow>
    const response = await fetch(`/api/v1/users/${follower}/following/${usernameToFollow}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error(`Error following user: ${error}`);
    throw error;
  }
}

// Function to unfollow a user
async function unfollowUser(usernameToFollow) {
  try {
    const authToken = localStorage.getItem('authToken');
    const follower=localStorage.getItem('currentUser');
    const response = await fetch(`http://localhost:3000/api/v1/users/${follower}/following/${usernameToFollow}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (!response.ok) {
      throw new Error(`Unfollow request failed with status ${response.status}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(`Error unfollowing user: ${error}`);
    throw error;
  }
}