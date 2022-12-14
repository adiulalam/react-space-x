import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const _ = require("lodash");

export const RocketSlideshow = (links: any) => (
  <>
    {links?.images?.flickr_images?.length > 1 ? (
      <Carousel
        dynamicHeight={true}
        centerMode={true}
        autoFocus={true}
        emulateTouch={true}
        autoPlay
        axis="horizontal"
        interval={5000}
        transitionTime={1000}
        infiniteLoop
      >
        {links?.images?.flickr_images?.map((image: any) => (
          <div>
            <img src={image} alt="rocket" />
          </div>
        ))}
      </Carousel>
    ) : links?.images?.flickr_images?.length === 1 ? (
      links?.images?.flickr_images?.map((image: any) => (
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
          src={require("../assets/images/image_not_available.png")}
          alt="not found"
        />
      </div>
    )}
  </>
);

export const ShipSlideshow = (links: any) => (
  <>
    {links?.images?.length > 1 ? (
      <Carousel
        dynamicHeight={true}
        centerMode={true}
        autoFocus={true}
        emulateTouch={true}
        autoPlay
        axis="horizontal"
        interval={5000}
        transitionTime={1000}
        infiniteLoop
      >
        {links?.images?.map((ship_image: any) => (
          <div>
            <img src={ship_image?.image} alt="rocket" />
            <p className="legend">{`${ship_image?.name} ${
              ship_image?.year_built ? `(${ship_image?.year_built})` : ""
            }`}</p>
          </div>
        ))}
      </Carousel>
    ) : links?.images?.length === 1 ? (
      links?.images?.map((ship_image: any) => (
        <div>
          <img src={ship_image?.image} alt="rocket" />
          <p className="legend text-white">{`${ship_image?.name} ${
            ship_image?.year_built ? `(${ship_image?.year_built})` : ""
          }`}</p>
        </div>
      ))
    ) : (
      <div>
        <img
          src={require("../assets/images/image_not_available.png")}
          alt="not found"
        />
      </div>
    )}
  </>
);
