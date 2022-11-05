import React from "react";
import { Skeleton } from "@mui/material";

export const SearchSkeleton = () => (
  <>
    <div className="lg:flex sm:md:block max-w-5xl rounded py-5 justify-between mx-2">
      <Skeleton
        sx={{ bgcolor: "grey.400", width: { sm: 400, md: 800 } }}
        variant="rounded"
        height={60}
        animation="wave"
      />
    </div>
  </>
);

export const CardSkeleton = () => (
  <>
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
  </>
);
