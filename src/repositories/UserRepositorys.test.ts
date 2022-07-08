import { getMockUser } from "./../__mocks__/mockUser";
import { UserRepository } from "./UserRepository";
import getEntityManagerMock from "../__mocks__/getEntityManagerMock";
import { User } from "../entities/User";

describe("User Repository", () => {
  const mockUser: User = getMockUser();
  it("retornando usuario criado", async () => {
    const mockManage = await getEntityManagerMock({
      saveReturn: mockUser,
    });
    const useRespository = new UserRepository(mockManage);
    const user = await useRespository.save(mockUser);
    expect(user).toHaveProperty("user_id");
    expect(user).toMatchObject({
      name: "emilly",
      email: "emilly@email.com",
    });
  });
});
