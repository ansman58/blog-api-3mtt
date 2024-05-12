import request from "supertest";
import app from "../../app"

// describe("AuthRoutes endpoints", () => {
//   describe("POST /auth/register", () => {
//     it("should return a 201 status after registering a new user", async () => {
//       const response = await request(app)
//         .post("/auth/register")
//         .send({
//           first_name: "Jane",
//           last_name: "Doe",
//           password: "12345678",
//           email: "janedoe@yopmail.com",
//         })
//         .expect(201);

//       expect(response.body).toHaveProperty("success", true);

//       expect(response.statusCode).toBe(201);
//     });
//   });
// });
