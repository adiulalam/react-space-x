import { gql } from "@apollo/client";

export const LaunchQuery = gql`
  query ListLaunches($offset: Int!, $limit: Int!) {
    launches: launchesPast(
      offset: $offset
      limit: $limit
      sort: "launch_date_utc"
      order: "desc"
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
