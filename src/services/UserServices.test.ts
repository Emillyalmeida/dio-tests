import { getMockUser } from "./../__mocks__/mockUser";
import { UserService } from "./UserService";

jest.mock("../repositories/UserRepository");
const mockRepository = require("../repositories/UserRepository");

describe("User service", () => {
  const mockUser = getMockUser();

  const userService = new UserService({
    userRepository: mockRepository,
    name: "emilly",
    email: "emilly@email.com",
  });
  it("Return user when save it", async () => {
    mockRepository.save = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser));
    const user = await userService.createUser();
    expect(user).toHaveProperty("user_id");
    expect(user).toMatchObject({
      name: "emilly",
      email: "emilly@email.com",
    });
  });
});
