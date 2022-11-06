import { gql } from "@apollo/client";
import { client } from "../src/connection/client";

const TestQuery = gql`
  query ListLaunches {
    launches: launchesPast(limit: 1) {
      id
      launch_date_utc
      launch_year
      mission_name
      links {
        mission_patch
        flickr_images
      }
      rocket {
        rocket_name
      }
      ships {
        id
        image
        name
        year_built
      }
    }
  }
`;

const testConnection: any = async () => {
  return await client.query({
    query: TestQuery,
  });
};

it("runs a test against spacex graphql", async () => {
  const result = await testConnection();
  expect(result).toBeTruthy();
  expect(result).toHaveProperty("data");
  expect(result.errors).toBeFalsy();
  expect(result.data).toHaveProperty("launches");
});
