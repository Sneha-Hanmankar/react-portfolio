import React from "react";

const sample = () => {
  const getData = (indicator) => {
    return indicator === 1 ? "Total" : "TotalMargins";
  };

  return [1, 2, 3].map((item) => {
    return getData(item);
  });
};

export default sample;
