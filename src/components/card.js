import { RocketSlideshow, ShipSlideshow } from "./slideshow";

const Card = (launch) => {
  return (
    <>
      <div class="lg:flex sm:md:block max-w-5xl rounded py-5 justify-between mx-2">
        <div class="p-2 max-w-2xl">
          <RocketSlideshow images={launch?.links} />
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
          <ShipSlideshow images={launch?.ships} />
        </div>
      </div>
    </>
  );
};

export default Card;
