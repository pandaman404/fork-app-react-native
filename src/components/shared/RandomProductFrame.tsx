import { Image } from "react-native";
import React, { useEffect, useState } from "react";
import Frame1 from "../../../src/assets/frame_1_v2.png";
import Frame2 from "../../../src/assets/frame_2_v2.png";
import Frame3 from "../../../src/assets/frame_3_v2.png";
import Frame4 from "../../../src/assets/frame_4_v2.png";
import Frame1Slider from "../../../src/assets/frame_1_slider.png";
import Frame2Slider from "../../../src/assets/frame_2_slider.png";
import Frame3Slider from "../../../src/assets/frame_3_slider.png";
import Frame4Slider from "../../../src/assets/frame_4_slider.png";
import { generateRandomFrame } from "../../utils/generateRandomFrame";

const RandomProductFrame = ({ imageStyles, slider = false }: any) => {
  const [frameNumber, setframeNumber] = useState(1);

  useEffect(() => {
    setframeNumber(generateRandomFrame());
  }, []);

  if (slider) {
    return frameNumber === 1 ? (
      <Image source={Frame1Slider} style={imageStyles} />
    ) : frameNumber === 2 ? (
      <Image source={Frame2Slider} style={imageStyles} />
    ) : frameNumber === 3 ? (
      <Image source={Frame3Slider} style={imageStyles} />
    ) : (
      <Image source={Frame4Slider} style={imageStyles} />
    );
  }

  return frameNumber === 1 ? (
    <Image source={Frame1} style={imageStyles} />
  ) : frameNumber === 2 ? (
    <Image source={Frame2} style={imageStyles} />
  ) : frameNumber === 3 ? (
    <Image source={Frame3} style={imageStyles} />
  ) : (
    <Image source={Frame4} style={imageStyles} />
  );
};

export default RandomProductFrame;
