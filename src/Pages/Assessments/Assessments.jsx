import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./Assessments.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Assessments = () => {
  const navigation = useNavigate();
  return (
    <Box className={styles.container}>
      <Box className={styles.headerContainer}>
        <Typography variant="h4">My Assessments</Typography>
        <Button
          onClick={() => navigation("/createAssessment")}
          variant="contained"
        >
          Add New Assessment
        </Button>
      </Box>
    </Box>
  );
};
export default Assessments;
