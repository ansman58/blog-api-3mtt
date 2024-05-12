import request from "supertest";
import app from "../../app"

// Assuming you have already imported required libraries like supertest and express

describe("ArticleRoutes endpoints", () => {
  let token;
  let authorId;
  let articleId;

  // Login test
  describe("POST /auth/login", () => {
    it("should return a 200 status after logging in and set the token", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "janedoe@yopmail.com",
        password: "12345678",
      });

      token = response.body.token;

      expect(token).toBeTruthy();
    });

    it("should return a 401 status for invalid login credentials", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "invalidemail@yopmail.com",
        password: "invalidpassword",
      });

      expect(response.statusCode).toBe(401);
    });
  });

  // Article creation test
  describe("POST /articles", () => {
    it("should create a new article", async () => {
      const response = await request(app)
        .post("/articles")
        .send({
          title: "Test Article 2",
          description: "This is a test article",
          body: "This is the body of the test article",
          tags: ["test", "article"],
        })
        // .set("Authorization", `Bearer ${token}`);
      expect(response.body).toHaveProperty("success", true);

      articleId = response.body.data._id;
      expect(articleId).toBeTruthy();
    });

    it("should return a 400 status for creating an article with invalid data", async () => {
      const response = await request(app)
        .post("/articles")
        .send({
          // Missing required fields
        })
        // .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(400);
    });

    it("should return a 401 status for creating an article without authentication", async () => {
      const response = await request(app)
        .post("/articles")
        .send({
          title: "Test Article 3",
          description: "This is a test article",
          body: "This is the body of the test article",
          tags: ["test", "article"],
        });

      expect(response.statusCode).toBe(401);
    });
  });

  // Article retrieval test
  describe("GET /articles", () => {
    it("should return a 200 status", async () => {
      const response = await request(app).get("/articles");

      expect(response.statusCode).toBe(200);
    });
  });

  describe("GET /articles/:id", () => {
    it("should return a 200 status for fetching specific article by ID", async () => {
      const response = await request(app)
        .get(`/articles/${articleId}`)
        // .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });
  });

  describe("GET /articles/author/:id", () => {
    it("should return a 200 status for fetching articles by author ID", async () => {
      const response = await request(app)
        .get(`/articles/author/${authorId}`)
        // .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });
  });

  // Article update test
  describe("PUT /articles/:id", () => {
    it("should update an article", async () => {
      const response = await request(app)
        .put(`/articles/${articleId}`) // Use PUT for partial updates
        .send({
          title: "Updated Test Article",
          description: "This is an updated test article",
          body: "This is the updated body of the test article",
          tags: ["test", "article"],
          state: "PUBLISHED",
        })
        // .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("DELETE /articles/:id", () => {
    it("should delete an article", async () => {
      const response = await request(app)
        .delete(`/articles/${articleId}`)
        // .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
});
