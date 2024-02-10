import DataAccessError from "./DataAccessError.js";

const users = {};

function createUser(username) {
  if (isExistingUser(username)) {
    throw new DataAccessError(
      `User with username '${username}' already exists`
    );
  }
  const user = {
    username,
    following: [],
  };
  users[username] = user;
  return user;
}

function isExistingUser(username) {
  return users[username] !== undefined;
}

function followUser(usernameOfFollower, usernameToFollow) {
  const user = users[usernameOfFollower];
  if (user === undefined) {
    throw new DataAccessError(`${usernameOfFollower} does not exist`);
  }

  if (user.following.includes(usernameToFollow)) {
    return user;
  }

  user.following.push(usernameToFollow);
  return user;
}

function unfollowUser(usernameOfFollower, usernameToUnfollow) {
  const user = users[usernameOfFollower];
  if (user === undefined) {
    throw new DataAccessError(`${usernameOfFollower} does not exist`);
  }

  user.following = user.following.filter(
    (username) => username !== usernameToUnfollow
  );
  return user;
}

function getFollowingUsernames(usernameOfFollower) {
  const user = users[usernameOfFollower];
  if (user === undefined) {
    throw new DataAccessError(`${usernameOfFollower} does not exist`);
  }
  return user.following;
}

export default { createUser, followUser, getFollowingUsernames, unfollowUser };
