import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:5001",
});

describe("/", () => {
  it("recive message welcome", async () => {
    const message = await server.get("/");
    expect(message.status).toBe(200);
    expect(message.data).toMatchObject({
      message: "Wellcome to TestsAPI",
    });
  });
});
