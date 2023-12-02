import { Box } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
function Hospital(entry: any): JSX.Element {
  let entryObject = entry.entry;
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
        {entryObject.date} <WorkIcon /> {entryObject.employerName}
      </Box>
      <br />
      <i>{entryObject.description}</i>
      <b>diagnose by {entryObject.specialist}</b>
    </Box>
  );
}

export default Hospital;
