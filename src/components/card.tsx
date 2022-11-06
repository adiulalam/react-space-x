import React from "react";
import { RocketSlideshow, ShipSlideshow } from "./slideshow";

const Card = (launch: any) => {
  console.log(launch);
  return (
    <>
      <div className="lg:flex sm:md:block max-w-5xl rounded py-5 justify-between mx-2">
        <div className="p-2 max-w-2xl">
          <RocketSlideshow images={launch?.links} />
          <div className="flex px-6 py-2 bg-gray-900 justify-between">
            <div className=" font-bold text-xl mb-2 text-slate-300 text-left">
              {launch?.rocket?.rocket_name}
            </div>

            <p className="text-gray-500 text-base text-end">
              {launch?.launch_year}
            </p>
          </div>
          <div className=" px-3 bg-gray-900 rounded-b-lg">
            <div className=" font-bold text-sm pb-2 text-slate-500 text-left">
              {launch?.mission_name}
            </div>
          </div>
        </div>
        <div className="p-2 max-w-2xl">
          <ShipSlideshow images={launch?.ships} />
        </div>
      </div>
    </>
  );
};

export default Card;
