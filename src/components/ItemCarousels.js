import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { buildableOutfits } from "../data";
import styles from "../styles/ItemCarousels.module.css";
import ItemCarousel from "./ItemCarousel";
import OutfitImage from "./OutfitImage";

const ItemCarousels = ({ isSmallScreen }) => {
  const headImages = buildableOutfits.head;
  const clothingImages = buildableOutfits.clothing;
  const accessoriesImages = buildableOutfits.accessories;
  const outfitImages = buildableOutfits.outfits;

  const [headOverlayIndex, setHeadOverlayIndex] = useState(null);
  const [clothingOverlayIndex, setClothingOverlayIndex] = useState(null);
  const [accessoriesOverlayIndex, setAccessoriesOverlayIndex] = useState(null);

  // const topOverlayStyle = {
  //   top: "-75%",
  //   left: "-25%",
  //   width: 50,
  //   display: isSmallScreen ? "block" : "none",
  //   zIndex: isSmallScreen ? 1 : 0,
  // };

  // const bottomOverlayStyle = {
  //   // top: "-75%",
  //   // left: "-25%",
  //   width: 0,
  //   display: isSmallScreen ? "block" : "none",
  //   zIndex: isSmallScreen ? 1 : 0,
  // };

  return (
    <Container className={styles.Section}>
      <Row className="align-items-center justify-content-center">
        <Col md={5} className="d-flex flex-column align-items-center p-0">
          <ItemCarousel
            images={headImages}
            onItemSelected={setHeadOverlayIndex}
            isSmallScreen={isSmallScreen}
            // style={topOverlayStyle}
          />
          <ItemCarousel
            images={clothingImages}
            onItemSelected={setClothingOverlayIndex}
            isSmallScreen={isSmallScreen}
            // style={bottomOverlayStyle}
          />
          <ItemCarousel
            images={accessoriesImages}
            onItemSelected={setAccessoriesOverlayIndex}
            isSmallScreen={isSmallScreen}
            // style={bottomOverlayStyle}
          />
        </Col>
        <Col md={7} className="d-flex flex-column align-items-center p-0">
          <OutfitImage
            images={outfitImages}
            headIndex={headOverlayIndex}
            clothingIndex={clothingOverlayIndex}
            accessoriesIndex={accessoriesOverlayIndex}
            isSmallScreen={isSmallScreen}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ItemCarousels;
