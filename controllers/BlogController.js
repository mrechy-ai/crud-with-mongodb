const blogService = require("../services/BlogService");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json({ data: blogs, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const blog = await blogService.createBlog(req.body);
    res.status(201).json({ data: blog, status: "success" }); // ✅ Changed to 201
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};