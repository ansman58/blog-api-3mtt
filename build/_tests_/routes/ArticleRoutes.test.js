"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
describe("ArticleRoutes endpoints", () => {
    let token;
    let authorId;
    let articleId;
    describe("POST /auth/login", () => {
        it("should return a 200 status after logging in and set the token", async () => {
            const response = await (0, supertest_1.default)(app_1.default).post("/auth/login").send({
                email: "janedoe@yopmail.com",
                password: "12345678",
            });
            token = response.body.token;
            expect(token).toBeTruthy();
        });
        it("should return a 401 status for invalid login credentials", async () => {
            const response = await (0, supertest_1.default)(app_1.default).post("/auth/login").send({
                email: "invalidemail@yopmail.com",
                password: "invalidpassword",
            });
            expect(response.statusCode).toBe(401);
        });
    });
    describe("POST /articles", () => {
        it("should create a new article", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/articles")
                .send({
                title: "Test Article 2",
                description: "This is a test article",
                body: "This is the body of the test article",
                tags: ["test", "article"],
            });
            expect(response.body).toHaveProperty("success", true);
            articleId = response.body.data._id;
            expect(articleId).toBeTruthy();
        });
        it("should return a 400 status for creating an article with invalid data", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/articles")
                .send({});
            expect(response.statusCode).toBe(400);
        });
        it("should return a 401 status for creating an article without authentication", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
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
    describe("GET /articles", () => {
        it("should return a 200 status", async () => {
            const response = await (0, supertest_1.default)(app_1.default).get("/articles");
            expect(response.statusCode).toBe(200);
        });
    });
    describe("GET /articles/:id", () => {
        it("should return a 200 status for fetching specific article by ID", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .get(`/articles/${articleId}`);
            expect(response.statusCode).toBe(200);
        });
    });
    describe("GET /articles/author/:id", () => {
        it("should return a 200 status for fetching articles by author ID", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .get(`/articles/author/${authorId}`);
            expect(response.statusCode).toBe(200);
        });
    });
    describe("PUT /articles/:id", () => {
        it("should update an article", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .put(`/articles/${articleId}`)
                .send({
                title: "Updated Test Article",
                description: "This is an updated test article",
                body: "This is the updated body of the test article",
                tags: ["test", "article"],
                state: "PUBLISHED",
            });
            expect(response.statusCode).toBe(200);
        });
    });
    describe("DELETE /articles/:id", () => {
        it("should delete an article", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .delete(`/articles/${articleId}`);
            expect(response.statusCode).toBe(200);
        });
    });
});
