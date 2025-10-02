const Blog = require("../models/blog");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const mongoose = require("mongoose");

chai.use(chaiHttp);
chai.should();

describe("Blogs API", () => {
  // Wait for MongoDB connection before running tests
  before(async function() {
    this.timeout(15000); // Increase timeout for connection
    
    // Wait for mongoose to connect
    if (mongoose.connection.readyState === 0) {
      await new Promise((resolve, reject) => {
        mongoose.connection.on('connected', resolve);
        mongoose.connection.on('error', reject);
        
        // Timeout after 10 seconds
        setTimeout(() => reject(new Error('MongoDB connection timeout')), 10000);
      });
    }
    
    console.log('✅ MongoDB connected for testing');
  });

  // Clear DB before each test
  beforeEach(async function() {
    this.timeout(5000);
    await Blog.deleteMany({});
  });

  // Close connection after all tests
  after(async function() {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  });

  // GET all blogs
  describe("GET /api/blogs", () => {
    it("should GET all blogs", (done) => {
      chai
        .request(app)
        .get("/api/blogs")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  // POST blog
  describe("POST /api/blogs", () => {
    it("should CREATE a new blog", (done) => {
      let blog = {
        title: "This is the first blog",
        body: "This is a blog post",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      };
      chai
        .request(app)
        .post("/api/blogs")
        .send(blog)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a("object");
          res.body.status.should.be.eql("success");
          res.body.data.should.have.property("title").eql(blog.title);
          done();
        });
    });
  });

  // GET by ID
  describe("GET /api/blogs/:id", () => {
    it("should GET a blog by id", async () => {
      const blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      });
      const savedBlog = await blog.save();

      const res = await chai.request(app).get("/api/blogs/" + savedBlog._id);

      res.should.have.status(200);
      res.body.data.should.be.a("object");
      res.body.status.should.be.eql("success");
      res.body.data.should.have.property("title").eql(savedBlog.title);
    });
  });

  // PUT by ID
  describe("PUT /api/blogs/:id", () => {
    it("should UPDATE a blog by id", async () => {
      const blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      });
      const savedBlog = await blog.save();

      const res = await chai
        .request(app)
        .put("/api/blogs/" + savedBlog._id)
        .send({
          title: "The first blog was updated",
          body: "Updated content",
          image: savedBlog.image,
        });

      res.should.have.status(200);
      res.body.data.should.be.a("object");
      res.body.status.should.be.eql("success");
      res.body.data.should.have
        .property("title")
        .eql("The first blog was updated");
    });
  });

  // DELETE by ID
  describe("DELETE /api/blogs/:id", () => {
    it("should DELETE a blog by id", async () => {
      const blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      });
      const savedBlog = await blog.save();

      const res = await chai
        .request(app)
        .delete("/api/blogs/" + savedBlog._id);

      res.should.have.status(200);
      res.body.data.should.be.a("object");
      res.body.status.should.be.eql("success");
    });
  });
});