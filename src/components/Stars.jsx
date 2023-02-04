import React, { useState } from "react";

const Stars = () => {
  const [rating, setRating] = useState(3);

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
