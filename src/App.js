import { NetworkStatus, useQuery } from "@apollo/client";
import { useState } from "react";
import { InView } from "react-intersection-observer";
import { LaunchQuery } from "./connection/query";
import { Skeleton } from "@mui/material";
import { client } from "./connection/client";
import { RocketsImages, ShipsImages } from "./components/slideshow";

function App() {
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const { data, networkStatus, error, fetchMore, variables } = useQuery(
    LaunchQuery,
    {
      client,
      notifyOnNetworkStatusChange: true,
      variables: {
        offset: 0,
        limit: 10,
      },
    }
  );

  if (networkStatus === NetworkStatus.loading) {
    return (
      <div class="bg-black flex flex-col items-center divide-y-4 divide-slate-400/25">
        {[1, 2, 3].map((item) => (
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
    return (
      <div class="bg-black flex h-screen flex-col items-center divide-y-4 divide-slate-400/25">
        <div
          class="flex m-auto p-4 text-sm rounded-lg bg-yellow-200 text-yellow-800"
          role="alert"
        >
          <svg
            aria-hidden="true"
            class="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Warning alert!</span> {error?.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div class="bg-black flex flex-col items-center divide-y-4 divide-slate-400/25">
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
