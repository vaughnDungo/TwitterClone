import { nanoid } from "nanoid";
import DataAccessError from "./DataAccessError.js";

const postsPerUser = {};

function createPost(username, post, dateTimePosted) {
  if (postsPerUser[username] === undefined) {
    throw new DataAccessError("User does not exist");
  }

  const createdPost = {
    postId: nanoid(),
    postedBy: username,
    content: post,
    dateTimePosted,
    likes: [],
  };

  postsPerUser[username].push(createdPost);
  return createdPost;
}

function getPostOfUser(username) {
  if (postsPerUser[username] === undefined) {
    throw new DataAccessError("User does not exist");
  }
  return postsPerUser[username];
}

function getFeedOfUser(username, followingUsernames) {
  const feed = [...getPostOfUser(username)];
  for (const username of followingUsernames) {
    if (postsPerUser[username] !== undefined) {
      feed.push(...postsPerUser[username]);
    }
  }
  return feed;
}

function getPost(postId) {
  for (const [_, posts] of Object.entries(postsPerUser)) {
    for (const post of posts) {
      const currentPostId = post.postId;
      if (currentPostId === postId) {
        return post;
      }
    }
  }
  return undefined;
}

function likePost(username, postId) {
  const post = getPost(postId);
  if (post === undefined) {
    throw new DataAccessError("Post does not exist");
  }
  if (post.likes.includes(username)) {
    return post;
  }
  post.likes.push(username);
  console.log(post);
  return post;
}

function unlikePost(username, postId) {
  const post = getPost(postId);
  if (post === undefined) {
    throw new DataAccessError("Post does not exist");
  }
  if (!post.likes.includes(username)) {
    return post;
  }
  post.likes = post.likes.filter((like) => like !== username);
  return post;
}

function initializePosts(username) {
  postsPerUser[username] = [];
}

export default {
  createPost,
  getPostOfUser,
  getFeedOfUser,
  likePost,
  unlikePost,
  initializePosts,
};
