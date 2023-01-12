import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

export default function BasicRating() {
  const [value, setValue] = React.useState(3);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend"></Typography>
      <Rating
        name="simple-controlled"
        value={value}
        icon={
          <StarRateRoundedIcon
            style={{ color: "#e9d9c6" }}
            fontSize="inherit"
          />
        }
        emptyIcon={
          <StarRateRoundedIcon
            style={{ color: "#757575" }}
            fontSize="inherit"
          />
        }
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
}
