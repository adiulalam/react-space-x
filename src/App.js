import { useEffect, useState } from "react";
import ContentObjects from "./connection/connection";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const _ = require("lodash");

function App() {
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [query, setQuery] = useState({
    query: `{ launches(limit: 10, sort: "launch_date_utc", order: "desc") { id launch_date_utc launch_year mission_name links { mission_patch flickr_images } rocket { rocket_name } ships { id image name year_built } } } `,
    variables: {},
  });

  useEffect(() => {
    (async function fetchData() {
      const result = await ContentObjects(query);
      setData(result);
      setIsLoading(false);
    })();
  }, []);

  console.log(data);

  return (
    <div class="bg-black flex flex-col items-center divide-y-4 divide-slate-400/25">
      {data?.launches?.map((item) => (
        <div class="lg:flex sm:md:block max-w-5xl rounded py-5 justify-between mx-2">
          <div class="p-2 max-w-2xl">
            {item?.links?.flickr_images?.length > 1 ? (
              <Carousel
                dynamicHeight={true}
                centerMode={true}
                autoFocus={true}
                emulateTouch={true}
                autoPlay
                axis="horizontal"
                interval="5000"
                transitionTime="1000"
                infiniteLoop
              >
                {item?.links?.flickr_images?.map((image) => (
                  <div>
                    <img src={image} alt="rocket" />
                  </div>
                ))}
              </Carousel>
            ) : item?.links?.flickr_images?.length === 1 ? (
              item?.links?.flickr_images?.map((image) => (
                <div>
                  <img src={image} alt="rocket" />
                </div>
              ))
            ) : !_.isEmpty(item?.links?.mission_patch) ? (
              <div>
                <img src={item?.links?.mission_patch} alt="patch" />
              </div>
            ) : (
              <div>
                <img
                  src="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
                  alt="not found"
                />
              </div>
            )}

            <div class="flex px-6 py-2 bg-gray-900 justify-between">
              <div class=" font-bold text-xl mb-2 text-slate-300 text-left">
                {item?.rocket?.rocket_name}
              </div>

              <p class="text-gray-500 text-base text-end">
                {item?.launch_year}
              </p>
            </div>
            <div class=" px-3 bg-gray-900 rounded-b-lg">
              <div class=" font-bold text-sm pb-2 text-slate-500 text-left">
                {item?.mission_name}
              </div>
            </div>
          </div>
          <div class="p-2 max-w-2xl">
            {item?.ships?.length > 1 ? (
              <Carousel
                dynamicHeight={true}
                centerMode={true}
                autoFocus={true}
                emulateTouch={true}
                autoPlay
                axis="horizontal"
                interval="5000"
                transitionTime="1000"
                infiniteLoop
              >
                {item?.ships?.map((ship_image) => (
                  <div>
                    <img src={ship_image?.image} alt="rocket" />
                    <p className="legend">{`${ship_image?.name} (${ship_image?.year_built})`}</p>
                  </div>
                ))}
              </Carousel>
            ) : item?.ships?.length === 1 ? (
              item?.ships?.map((ship_image) => (
                <div>
                  <img src={ship_image?.image} alt="rocket" />
                  <p
                    className="legend"
                    class="text-white"
                  >{`${ship_image?.name} (${ship_image?.year_built})`}</p>
                </div>
              ))
            ) : (
              <div>
                <img
                  src="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
                  alt="not found"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
