const lodash = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;

  blogs.forEach((blog) => (sum += blog.likes));
  return sum;
};

const favoriteBlog = (blogs) => {
  let favorite = blogs[0];

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = blogs[i];
    }
  }

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};
const mostBlogsAuthor = (blogs) => {
  const authorWithBlogNumber = lodash.countBy(blogs, "author");
  const maxValue = Math.max(...Object.values(authorWithBlogNumber));
  const maxIndex = Object.keys(authorWithBlogNumber).find(
    (key) => authorWithBlogNumber[key] === maxValue
  );

  return {
    author: maxIndex,
    blogs: maxValue,
  };
};

const mostLike = (blogs) => {
  let authorWithMostLikes = {};
  blogs.forEach((blog) => {
    if (blog.author in authorWithMostLikes) {
      authorWithMostLikes[blog.author] += blog.likes;
    } else {
      authorWithMostLikes[blog.author] = blog.likes;
    }
  });

  const maxValue = Math.max(...Object.values(authorWithMostLikes));
  const maxIndex = Object.keys(authorWithMostLikes).find(
    (key) => authorWithMostLikes[key] === maxValue
  );

  return {
    author: maxIndex,
    likes: maxValue,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogsAuthor,
  mostLike,
};
