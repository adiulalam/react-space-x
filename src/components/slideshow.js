import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const _ = require("lodash");

export const RocketsImages = (links) => (
  <>
    {links?.images?.flickr_images?.length > 1 ? (
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
        {links?.images?.flickr_images?.map((image) => (
          <div>
            <img src={image} alt="rocket" />
          </div>
        ))}
      </Carousel>
    ) : links?.images?.flickr_images?.length === 1 ? (
      links?.images?.flickr_images?.map((image) => (
        <div>
          <img src={image} alt="rocket" />
        </div>
      ))
    ) : !_.isEmpty(links?.images?.mission_patch) ? (
      <div>
        <img src={links?.images?.mission_patch} alt="patch" />
      </div>
    ) : (
      <div>
        <img
          src="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
          alt="not found"
        />
      </div>
    )}
  </>
);

export const ShipsImages = (links) => (
  <>
    {links?.images?.length > 1 ? (
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
        {links?.images?.map((ship_image) => (
          <div>
            <img src={ship_image?.image} alt="rocket" />
            <p className="legend">{`${ship_image?.name} ${
              ship_image?.year_built ? `(${ship_image?.year_built})` : ""
            }`}</p>
          </div>
        ))}
      </Carousel>
    ) : links?.images?.length === 1 ? (
      links?.images?.map((ship_image) => (
        <div>
          <img src={ship_image?.image} alt="rocket" />
          <p className="legend" class="text-white">{`${ship_image?.name} ${
            ship_image?.year_built ? `(${ship_image?.year_built})` : ""
          }`}</p>
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
  </>
);
