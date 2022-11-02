import { NetworkStatus, useQuery } from "@apollo/client";
import { useState } from "react";
import { InView } from "react-intersection-observer";
import { LaunchQuery } from "./connection/query";
import { Skeleton } from "@mui/material";
import { client } from "./connection/client";
import { RocketsImages, ShipsImages } from "./components/slideshow";
import _ from "lodash";
import SearchBar from "./components/searchbar";
import Error from "./components/error";

function App() {
  const [searchString, setSearchString] = useState("");
  const [fullyLoaded, setFullyLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await refetch({
      variables: {
        mission_name: e.target.value,
      },
    });
  };

  const handleOnChange = (e) => {
    setSearchString(e.target.value);
  };

  const { data, networkStatus, error, fetchMore, variables, refetch, loading } =
    useQuery(LaunchQuery, {
      client,
      notifyOnNetworkStatusChange: true,
      variables: {
        offset: 0,
        limit: 10,
        mission_name: searchString,
      },
    });

  if (networkStatus === NetworkStatus.loading || loading) {
    return (
      <div class="bg-black flex flex-col items-center divide-y-4 divide-slate-400/25">
        {networkStatus === NetworkStatus.loading ? (
          <div class="lg:flex sm:md:block max-w-5xl rounded py-5 justify-between mx-2">
            <Skeleton
              sx={{ bgcolor: "grey.400", width: { sm: 400, md: 800 } }}
              variant="rounded"
              height={60}
              animation="wave"
            />
          </div>
        ) : (
          <SearchBar
            searchString={searchString}
            handleOnChange={handleOnChange}
            handleSubmit={handleSubmit}
          />
        )}

        {[1, 2, 3].map(() => (
          <div class="lg:flex sm:md:block max-w-5xl rounded py-5 justify-between mx-2">
            <div class="p-2 max-w-2xl">
              <Skeleton
                sx={{ bgcolor: "grey.400" }}
                variant="rounded"
                width={400}
                height={200}
                animation="wave"
              />

              <div class="flex py-2">
                <Skeleton
                  sx={{ bgcolor: "grey.400" }}
                  variant="rounded"
                  width={400}
                  height={80}
                  animation="wave"
                />
              </div>
            </div>
            <div class="p-2 max-w-2xl">
              <Skeleton
                sx={{ bgcolor: "grey.400" }}
                variant="rounded"
                width={400}
                height={200}
                animation="wave"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <Error {...error} />;
  }

  return (
    <>
      <div
        class={`bg-black ${
          _.isEmpty(data?.launches) ? "h-screen" : ""
        } flex flex-col items-center divide-y-4 divide-slate-400/25`}
      >
        <SearchBar
          searchString={searchString}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
        />

        {data?.launches?.map((launch) => (
          <div class="lg:flex sm:md:block max-w-5xl rounded py-5 justify-between mx-2">
            <div class="p-2 max-w-2xl">
              <RocketsImages images={launch?.links} />
              <div class="flex px-6 py-2 bg-gray-900 justify-between">
                <div class=" font-bold text-xl mb-2 text-slate-300 text-left">
                  {launch?.rocket?.rocket_name}
                </div>

                <p class="text-gray-500 text-base text-end">
                  {launch?.launch_year}
                </p>
              </div>
              <div class=" px-3 bg-gray-900 rounded-b-lg">
                <div class=" font-bold text-sm pb-2 text-slate-500 text-left">
                  {launch?.mission_name}
                </div>
              </div>
            </div>
            <div class="p-2 max-w-2xl">
              <ShipsImages images={launch?.ships} />
            </div>
          </div>
        ))}
      </div>

      {networkStatus !== NetworkStatus.fetchMore &&
        data?.launches?.length % variables?.limit === 0 &&
        !fullyLoaded && (
          <InView
            onChange={async (inView) => {
              if (inView) {
                const result = await fetchMore({
                  variables: {
                    offset: data?.launches?.length,
                  },
                });
                setFullyLoaded(!result?.data?.launches?.length);
              }
            }}
          />
        )}
    </>
  );
}

export default App;
