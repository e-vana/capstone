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
  it("GET /organizations/:id/events should 200 and return an array of events with length == 1 belonging to user", async () => {
    const response = await request(app)
      .get("/organizations/1/events")
      .set(authHeader);
    expect(response.status).toBe(200);
    expect(response.body.events).toHaveLength(1);
  });
  it("POST /organizations/:id/teams/:teamId/events should 200 and return {success: true}", async () => {
    const response = await request(app)
      .post("/organizations/1/teams/1/events")
      .send({
        event_name: "Annual Fall BBQ",
        event_description: "Please sign up for our 15th consecutive Fall BBQ!",
        address_street: "1234 Milksteak Blvd",
        address_city: "Philadelphia",
        address_state: "Pennsylvania",
        address_zipcode: "12345",
        start_time: "2023-08-31T10:00:00",
        end_time: "2023-08-31T03:00:00",
      })
      .set(authHeader);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ success: true, event_id: 2 });
  });
  it("GET /organizations/:id/events/:eventId should 200 and return an event matching the seeded data", async () => {
    const response = await request(app)
      .get("/organizations/1/events/1")
      .set(authHeader);
    expect(response.status).toBe(200);
    expect(response.body.event).toEqual({
      team_id: 1,
      team_name: "Organization-wide Team",
      event_id: 1,
      start_time: "2023-08-28T14:00:00.000Z",
      end_time: "2023-08-28T19:00:00.000Z",
      event_name: "test_event",
      event_description: "Description for test_event",
      address_street: "1234 Test Street",
      address_city: "test_city",
      address_state: "test_state",
      address_zipcode: "12345",
      organization_name: "test_org",
      organization_id: 1,
    });
  });
  it("GET /organizations/:id/events/:eventId/tasks should 200 and return an array of tasks with length == 1 belonging to event", async () => {
    const response = await request(app)
      .get("/organizations/1/events/1/tasks")
      .set(authHeader);
    expect(response.status).toBe(200);
    expect(response.body.tasks).toHaveLength(1);
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
