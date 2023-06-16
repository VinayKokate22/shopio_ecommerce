import React from "react";

const ConformOrder = ({ setActiveStep }) => {
  return (
    <div>
      <button
        onClick={() => {
          setActiveStep((prev) => prev + 1);
        }}
      >
        next
      </button>
    </div>
  );
};

export default ConformOrder;
