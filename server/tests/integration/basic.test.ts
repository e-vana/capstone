import request from "supertest";
import { app } from "../..";

const authHeader = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInBlcm1pc3Npb25zIjpbeyJ1c2VyX2lkIjoxLCJvcmdhbml6YXRpb25faWQiOjEsImxldmVsIjowfV0sImlhdCI6MTcwMTAxNjI5MX0.YyydcNeJVRyBQLMxsO43hlVT7vLSogwaTvsjlk4rZtk`,
};

describe("/organization", () => {
  it("GET /organizations should 200 and return an array of orgs with length == 1 belonging to user", async () => {
    const response = await request(app).get("/organizations").set(authHeader);
    expect(response.status).toBe(200);
    expect(response.body.organizations).toHaveLength(1);
  });
  // it("GET /organizations should 200 and return an array of orgs", async () => {
  //   const response = await request(app).get("/organizations").set(authHeader);
  //   expect(response.status).toBe(200);
  //   expect(response.body.organizations).toHaveLength(1);
  // });
  // it("POST /organizations should 200", async () => {
  //   const requestBody = {
  //     name: "test_organization",
  //     website_url: "www.test_organization.com",
  //     phone_number: "+555-555-5555",
  //     logo_url: "www.test_organization.com/logo",
  //   };
  //   const response = await request(app)
  //     .post("/organizations")
  //     .set(authHeader)
  //     .send(requestBody);
  //   expect(response.status).toBe(200);
  // });
  // it("POST /organizations should 500 with invalid name data", async () => {
  //   const requestBody = {
  //     name: 4,
  //     website_url: "www.test_organization.com",
  //     phone_number: "+555-555-5555",
  //     logo_url: "www.test_organization.com/logo",
  //   };
  //   const response = await request(app)
  //     .post("/organizations")
  //     .set(authHeader)
  //     .send(requestBody);
  //   expect(response.status).toBe(500);
  // });
  // it("GET /organizations/1/events should 200 and return an array of events", async () => {
  //   const response = await request(app)
  //     .get("/organizations/1/events")
  //     .set(authHeader);
  //   expect(response.status).toBe(200);
  // });
  // it("GET /organizations/1/events/1 should 200 and return an array of length 1 with a single event", async () => {
  //   const response = await request(app)
  //     .get("/organizations/1/events")
  //     .set(authHeader);
  //   expect(response.status).toBe(200);
  //   expect(response.body.organizations).toHaveLength(1);
  // });
  // it("GET /organizations/1/events/1/tasks should 200 and return an array of tasks", async () => {
  //   const response = await request(app)
  //     .get("/organizations/1/events")
  //     .set(authHeader);
  //   expect(response.status).toBe(200);
  // });
  // it("GET /organizations/1/events/1 should 200 and return an array of length 1 with a single event", async () => {
  //   const response = await request(app)
  //     .get("/organizations/1/events")
  //     .set(authHeader);
  //   expect(response.status).toBe(200);
  //   expect(response.body.organizations).toHaveLength(1);
  // });
});
