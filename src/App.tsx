import { NetworkStatus, useQuery } from "@apollo/client";
import { useState } from "react";
import { InView } from "react-intersection-observer";
import { LaunchQuery } from "./connection/query";
import { Skeleton } from "@mui/material";
import { client } from "./connection/client";
import SearchBar from "./components/searchbar";
import Error from "./components/error";
import Card from "./components/card";
import React from "react";
// import _ from "lodash";
const _ = require("lodash");

function App() {
  const [searchString, setSearchString] = useState("");
  const [fullyLoaded, setFullyLoaded] = useState(false);

  const handleSubmit = async (e: any) => {
    const variable: any = {
      variables: {
        mission_name: e?.target?.value,
      },
    };
    e.preventDefault();
    await refetch(variable);
  };

  const handleOnChange = (e: any) => {
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
      <div className="bg-black flex flex-col items-center divide-y-4 divide-slate-400/25">
        {networkStatus === NetworkStatus.loading ? (
          <div className="lg:flex sm:md:block max-w-5xl rounded py-5 justify-between mx-2">
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
          <div className="lg:flex sm:md:block max-w-5xl rounded py-5 justify-between mx-2">
            <div className="p-2 max-w-2xl">
              <Skeleton
                sx={{ bgcolor: "grey.400" }}
                variant="rounded"
                width={400}
                height={200}
                animation="wave"
              />

              <div className="flex py-2">
                <Skeleton
                  sx={{ bgcolor: "grey.400" }}
                  variant="rounded"
                  width={400}
                  height={80}
                  animation="wave"
                />
              </div>
            </div>
            <div className="p-2 max-w-2xl">
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
        className={`bg-black ${
          _.isEmpty(data?.launches) ? "h-screen" : ""
        } flex flex-col items-center divide-y-4 divide-slate-400/25`}
      >
        <SearchBar
          searchString={searchString}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
        />

        {data?.launches?.map((launch: any) => (
          <Card {...launch} />
        ))}
      </div>

      {networkStatus !== NetworkStatus.fetchMore &&
        data?.launches?.length % (variables?.limit ?? 0) === 0 &&
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
