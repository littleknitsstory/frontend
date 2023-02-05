import React, { useState } from "react";

const Stars = (props) => {
  const [rating, setRating] = useState(props.rating);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#e9d9c6" : "#757575",
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default Stars;
