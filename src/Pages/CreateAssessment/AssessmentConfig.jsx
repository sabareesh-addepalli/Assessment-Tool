import {
  Box,
  TextField,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./CreateAssessment.module.css";
import { AssessmentContext } from "../../Context/Assessment.context";
import { useContext } from "react";

const AssessmentConfig = () => {
  const {assessment, setTitle, setDescription,isAssessmentSubmitted } = useContext(AssessmentContext);
  const { title, description, questions } = assessment;
  return (
    <Paper className={styles.headerContainer}>
      <TextField
        label="Assessment Title*"
        size="small"
        className={styles.assessmentInput}
        value={title}
        variant="outlined"
        placeholder="Assessment Title"
        error={isAssessmentSubmitted && !title}
        helperText={isAssessmentSubmitted && !title ? "Please enter Assessment Title":""}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Assessment Description"
        className={styles.assessmentInput}
        placeholder="Assessment Description"
        multiline
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimeField"]}>
          <TimeField
            size="small"
            label="Assessment Time(HH:MM)"
            className={styles.assessmentInput}
            defaultValue={dayjs("2022-04-17T00:30")}
            format="HH:mm"
          />
        </DemoContainer>
      </LocalizationProvider>
      <TextField
        label="Assessment Marks"
        size="small"
        className={styles.assessmentInput}
        value={title}
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
      />
      <FormGroup>
        <FormControlLabel
          className={styles.assessmentInput}
          control={<Checkbox />}
          label={
            <Box className={styles.validateCheckbox}>
              <Typography variant="body2">Should Automatic Validate</Typography>
              <Tooltip
                title="Please provide answers for the questions to validate the assessment
      automatically"
              >
                <InfoIcon className={styles.infoIcon} />
              </Tooltip>
            </Box>
          }
        />
      </FormGroup>
      <TextField
        label="Pass Percentage"
        size="small"
        className={styles.assessmentInput}
        value={title}
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          },
        }}
        onChange={(e) => setTitle(e.target.value)}
      /> */}
    </Paper>
  );
};
export default AssessmentConfig;
