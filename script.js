var userToken;
var currentUser;

async function register(username,password) {    
    var getUsername = document.getElementById('register-username').value;
    var getPassword = document.getElementById('register-password').value;
    console.log(getUsername); console.log(getPassword);
    const res = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: getUsername,
            password: getPassword,
            following: []
        })
    })
    return await res.text()
}

async function login() {
    var getUsername = document.getElementById('login-username').value;
    var getPassword = document.getElementById('login-password').value;

    try {
        const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: getUsername,
            password: getPassword,
        })
        });
        userToken = await res.text();
        console.log(`Token: ${userToken}`);
        currentUser = getUsername;
        console.log(currentUser);

    } catch (error) {
        console.error('Error logging in:', error);
    }
}

async function NewPost() {
    var getNewPost = document.getElementById('new-post').value;
    try {
        const res = await fetch("http://localhost:3000/api/v1/posts", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: getNewPost
            })
        });

        console.log(await res.text());
        // After posting, refresh the posts
        await displayUserAndFollowingPosts(); // add as well another function for displaying all following posts
    } catch (error) {
        console.error('Error posting:', error);
    }
}

async function displayUserAndFollowingPosts() {
    const postsContainer = document.getElementById('posts-container');
    // Clear previous posts
    postsContainer.innerHTML = "";

    try {
        const res = await fetch("http://localhost:3000/api/v1/posts", {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });

        if (!res.ok) {
            console.error(`Error fetching posts: ${res.status} ${res.statusText}`);
            // Handle the error here, for example, display an error message to the user.
            return;
        }

        const posts = await res.json();

        console.log(posts.id);
        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <div class="post-header">
                    Username: ${post.postedBy}, Time: ${post.dateTimePosted}
                </div>
                <div>
                    Post: ${post.content}
                </div>
                <button id="like-btn" onclick='likeOrUnlike('${post.postId}')'>Like</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

async function displayUserPosts() {
    const followingPostsContainer = document.getElementById('users-posts-container');
    followingPostsContainer.innerHTML = ""; // Clear previous posts

    try {
        const res = await fetch(`http://localhost:3000/api/v1/posts?username=${currentUser}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });

        if (!res.ok) {
            console.error(`Error fetching all following posts: ${res.status} ${res.statusText}`);
            // Handle the error here, for example, display an error message to the user.
            return;
        }

        const posts = await res.json();

        console.log(posts);
        followingPostsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <div class="post-header">
                    Username: ${post.postedBy}, Time: ${post.dateTimePosted}
                </div>
                <div>
                    Post: ${post.content}
                </div>
                <button disabled>Like</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching all following posts:', error);
    }
}

async function displayAllUsernames() {
    const container = document.getElementById('users-container');
    container.innerHTML = ""; // Clear previous content

    try {
        const res = await fetch("http://localhost:3000/public/usernames");
        const allUsernames = await res.json();

        allUsernames.forEach(username => {
            container.innerHTML += `
                <div class="user-container">
                    <div class="user-name">${username}</div>
                    <div class="buttons-container">
                        <button class="follow-button" onclick="followUser('${username}')">Follow</button>
                        <button class="unfollow-button" onclick="unfollowUser('${username}')">Unfollow</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching all users:', error);
    }
}

async function followUser(toFollow) {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/${currentUser}/following/${toFollow}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        }
        });

        if (res.ok) {
        console.log(`Now following: ${toFollow}`);
        } else {
        const errorMessage = await res.text();
        console.error(`Error following user: ${errorMessage}`);
        }

    } catch (error) {
        console.error('Error following user:', error);
    }
}

async function unfollowUser(toUnfollow) {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/${currentUser}/following/${toUnfollow}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        }
    });

        if (res.ok) {
        console.log(`Unfollowed: ${toUnfollow}`);
        } else {
        const errorMessage = await res.text();
        console.error(`Error unfollowing user: ${errorMessage}`);
        }

    } catch (error) {
        console.error('Error unfollowing user:', error);
    }
}

async function likeOrUnlike(postId, username) {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`, // Replace with the actual user token
            },
            body: JSON.stringify({ action: 'like' }) // 'like' or 'unlike'
        });

        if (!response.ok) {
            console.error(`Error liking/unliking post: ${response.status} ${response.statusText}`);
            return;
        }

        const result = await response.json();
        console.log(result);

        displayPosts();
    } catch (error) {
        console.error('Error liking/unliking post:', error);
    }
}

async function posts() {
    await displayUserAndFollowingPosts();
    await displayUserPosts();
}

async function start(){
    await displayAllUsernames();
}