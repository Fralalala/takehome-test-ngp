const getRequest = require("./route");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/", getRequest);

test("Body is defined", async () => {
  const response = await request(app).get("/api").expect(200);

  expect(response.body).toBeDefined();
});

test("Items array length must have at least 1", async () => {
  const response = await request(app).get("/api").expect(200);

  expect(response.body.items.length).toBeGreaterThan(0);
});

test("Items array length must be equal to count", async () => {
  const response = await request(app).get("/api").expect(200);

  expect(response.body.items.length).toBe(response.body.count);
});

test("Each of the value in the items array must have emailMessageId and name", async () => {
  const response = await request(app).get("/api").expect(200);

  response.body.items.forEach((item) => {
    expect(item.emailMessageId).toBeDefined();
    expect(item.name.trim().length).toBeGreaterThan(0);
  });
});

test("Should have no duplicate emailMessageId inside the items array", async () => {
  const response = await request(app).get("/api").expect(200);

  let map = {};

  response.body.items.forEach((item) => {
    expect(map[`${item.name}`]).toBeUndefined();
    map[`${item.name}`] = item.name;
  });
});
