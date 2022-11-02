import { gql } from "@apollo/client";

export const LaunchQuery = gql`
  query ListLaunches($offset: Int!, $limit: Int!, $mission_name: String!) {
    launches: launchesPast(
      offset: $offset
      limit: $limit
      sort: "launch_date_utc"
      order: "desc"
      find: { mission_name: $mission_name }
    ) {
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
