import React from "react";
import { Col, Image } from "react-bootstrap";
import { buildableOutfits } from "../data";

const OverlayImage = ({ src, top, start, isSmallScreen }) => {
  const overlayImageStyle = {
    top,
    left: start,
    width: 280,
    display: isSmallScreen ? "none" : "block",
  };

  const overlayImageClassName = isSmallScreen
    ? "d-none"
    : "position-absolute top-50 start-50 translate-middle";

  return (
    <Image
      className={overlayImageClassName}
      src={src}
      style={overlayImageStyle}
      alt="Overlay Image"
    />
  );
};

const OutfitImage = ({
  images,
  headIndex,
  clothingIndex,
  accessoriesIndex,
  isSmallScreen,
}) => {
  const { head, clothing, accessories } = buildableOutfits;

  return (
    <Col>
      <div className="position-relative">
        <Image
          className="d-block m-auto"
          src={images[0]}
          style={{ height: 500 }}
          alt="Outfit Image"
        />
        {headIndex !== null && (
          <OverlayImage
            src={head[headIndex]}
            top="-75%"
            // start="-25%"
            isSmallScreen={isSmallScreen}
          />
        )}
        {clothingIndex !== null && (
          <OverlayImage
            src={clothing[clothingIndex]}
            top="0"
            // start="-25%"
            isSmallScreen={isSmallScreen}
          />
        )}
        {accessoriesIndex !== null && (
          <OverlayImage
            src={accessories[accessoriesIndex]}
            top="75%"
            // start="-25%"
            isSmallScreen={isSmallScreen}
          />
        )}
      </div>
    </Col>
  );
};

export default OutfitImage;
