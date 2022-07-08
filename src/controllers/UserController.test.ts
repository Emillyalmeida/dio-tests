import { getMockUser } from "./../__mocks__/mockUser";
import { User } from "./../entities/User";
import { UserController } from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse";
import { makeMockRequest } from "../__mocks__/mockRequest";
import { Request } from "express";

const mockUser: User = getMockUser();

let returnCreateUser;

jest.mock("../services/UserService", () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return {
        createUser: returnCreateUser,
      };
    }),
  };
});
describe("UserController", () => {
  const userController = new UserController();
  const mockResponse = makeMockResponse();
  const mockRequest = {
    body: {
      name: "emilly",
      email: "emilly@email.com",
    },
  } as Request;

  it("Return state 201", async () => {
    returnCreateUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser));
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toHaveProperty("user_id");
    expect(mockResponse.state.json).toMatchObject({
      name: "emilly",
      email: "emilly@email.com",
    });
  });

  it("it's ocurr a error ,return 500", async () => {
    returnCreateUser = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(500);
  });

  it("if name empty", async () => {
    const mockRequest = {
      body: {
        name: "",
        email: "",
      },
    } as Request;
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
  });
});
