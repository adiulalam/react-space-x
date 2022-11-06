import { client } from "../src/connection/client";
import { LaunchQuery } from "../src/connection/query";

const testConnection: any = async () => {
  return await client.query({
    query: LaunchQuery,
    variables: {
      offset: 0,
      limit: 10,
      mission_name: "",
    },
  });
};

it("Runs a test against Space-X graphql", async () => {
  const result = await testConnection();
  expect(result).toBeTruthy();
  expect(result).toHaveProperty("data");
  expect(result.errors).toBeFalsy();
  expect(result.data).toHaveProperty("launches");
});
