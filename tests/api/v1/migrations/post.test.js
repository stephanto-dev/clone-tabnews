import database from "infra/database";
import waitForServices from "tests/orchestrator";

beforeAll(async () => {
  await waitForServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("GET /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
});
