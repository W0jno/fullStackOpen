import { Box } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
function HealthCheck(entry: any): JSX.Element {
  let entryObject = entry.entry;
  const healthCheckEntry = (entryObject: any): JSX.Element => {
    switch (entryObject.healthCheckRating) {
      case 0:
        return <FavoriteIcon sx={{ color: "blue" }} />;
      case 1:
        return <FavoriteIcon sx={{ color: "green" }} />;
      case 2:
        return <FavoriteIcon sx={{ color: "red" }} />;
      case 3:
        return <FavoriteIcon sx={{ color: "black" }} />;
      default:
        return <></>;
    }
  };
  return (
    <Box
      sx={{
        border: 1,
        borderRadius: "10px",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <Box>
        {entryObject.date} <LocalHospitalIcon sx={{ color: "red" }} />
      </Box>
      {healthCheckEntry(entryObject)}
      <i>{entryObject.description}</i>
      <b>diagnose by {entryObject.specialist}</b>
    </Box>
  );
}

export default HealthCheck;
