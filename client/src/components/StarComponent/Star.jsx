import React from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

const CustomRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FFD60A', // Change this to the desired fill color
  },"& .MuiRating-iconEmpty": {
    color: "#838894", // Change the empty star color to white
  },
});

export const StarRating = ({ rating }) => {
  return <CustomRating name="read-only" value={rating} readOnly />;
};
