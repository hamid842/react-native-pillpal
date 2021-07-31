import React from 'react';
import {Image, View} from 'react-native';

const RenderImage = ({image, imageStyle, containerStyle}) => {
  return (
    <>
      {image ? (
        <Image source={{uri: image}} style={imageStyle} />
      ) : (
        <View style={containerStyle}></View>
      )}
    </>
  );
};

export default RenderImage;
