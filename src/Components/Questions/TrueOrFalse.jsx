import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import styles from "./Questions.module.css";

const TrueOrFalse = (questionData) => {
  const { question } = questionData;
  const [questionText, setQuestionText] = useState(question);
  return (
    <Box>
      <TextField
        className={styles.questionInput}
        variant="standard"
        value={questionText}
        placeholder="Enter Question"
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <RadioGroup name="row-radio-buttons-group">
        <FormControlLabel value="true" control={<Radio />} label="True" />
        <FormControlLabel value="false" control={<Radio />} label="False" />
      </RadioGroup>
    </Box>
  );
};
export default TrueOrFalse;
