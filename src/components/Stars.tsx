import { nanoid } from "@reduxjs/toolkit";

const Stars = (props: {rating: number}) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={nanoid()}
          style={{
            cursor: "pointer",
            color: star <= props.rating ? "#e9d9c6" : "#757575",
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default Stars;
