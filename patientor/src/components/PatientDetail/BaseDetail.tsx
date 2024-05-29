import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import { Box, Divider, Typography } from "@mui/material";
import { Patient } from "../../types";

interface BaseDetailProp {
  patient: Patient ;
}

const BaseDetail = ({ patient }: BaseDetailProp) => {
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5">{patient.name}</Typography>
        <Box sx={{ marginLeft: "20px" }}>
          {patient.gender.toLowerCase() === "male" && <MaleIcon />}
          {patient.gender.toLowerCase() === "female" && <FemaleIcon />}{" "}
          {patient.gender.toLowerCase() !== "male" &&
            patient.gender.toLowerCase() !== "female" && (
              <TransgenderIcon />
            )}
        </Box>
      </Box>
      <Divider sx={{ marginY: "10px" }} />
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">
        occupation: {patient.occupation}
      </Typography>
    </div>
  );
};

export default BaseDetail;
