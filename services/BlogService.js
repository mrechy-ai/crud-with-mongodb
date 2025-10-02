const Blog = require("../models/blog");

const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return blogs;
  } catch (err) {
    throw new Error(`Error fetching blogs: ${err.message}`);
  }
};

const createBlog = async (blogData) => {
  try {
    const blog = new Blog(blogData);
    const savedBlog = await blog.save();
    return savedBlog;
  } catch (err) {
    throw new Error(`Error creating blog: ${err.message}`);
  }
};

const getBlogById = async (id) => {
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("Blog not found");
    }
    return blog;
  } catch (err) {
    throw new Error(`Error fetching blog: ${err.message}`);
  }
};

const updateBlog = async (id, blogData) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      blogData,
      { new: true, runValidators: true }
    );
    if (!blog) {
      throw new Error("Blog not found");
    }
    return blog;
  } catch (err) {
    throw new Error(`Error updating blog: ${err.message}`);
  }
};

const deleteBlog = async (id) => {
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      throw new Error("Blog not found");
    }
    return blog;
  } catch (err) {
    throw new Error(`Error deleting blog: ${err.message}`);
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};