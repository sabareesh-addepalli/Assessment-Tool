import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "./Questions.module.css";
import EditIcon from "@mui/icons-material/Edit";
import Close from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { AssessmentContext } from "../../Context/Assessment.context";

const MultipleChoice = (questionData) => {
  const { updateQuestion, isAssessmentSubmitted } =
    useContext(AssessmentContext);
  const [question, setQuestion] = useState(questionData);

  useEffect(() => {
    updateQuestion(question);
  }, [question]);

  const setOptions = (options) => {
    setQuestion({ ...question, options: options });
  };

  const setQuestionText = (text) => {
    setQuestion({ ...question, question: text });
  };

  const addOption = () => {
    let newOptions = [...question.options];
    newOptions.push("");
    setOptions(newOptions);
  };
  const editOption = (index, newValue) => {
    let newOptions = [...question.options];
    newOptions[index] = newValue;
    setOptions(newOptions);
  };
  const deleteOption = (index) => {
    let newOptions = [...question.options];
    newOptions = newOptions.filter((v, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <Box>
      <TextField
        className={styles.questionInput}
        variant="standard"
        value={question.question}
        placeholder="Enter Question"
        error={isAssessmentSubmitted && !question.question}
        helperText={
          isAssessmentSubmitted && !question.question
            ? "Please Enter Question"
            : ""
        }
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <RadioGroup name="row-radio-buttons-group">
        {question.options.map((option, index) => (
          <Option
            key={index}
            index={index}
            option={option}
            editOption={editOption}
            deleteOption={deleteOption}
          />
        ))}
      </RadioGroup>
      <Button
        onClick={addOption}
        className={styles.addNewOption}
        variant="outlined"
      >
        Add Option
      </Button>
      <Box>
        {isAssessmentSubmitted &&
          question.options.filter(Boolean).length < 2 && (
            <Typography variant="caption" color="secondary">
              Please add atlest 2 options
            </Typography>
          )}
      </Box>
    </Box>
  );
};

export const Option = ({ index, option, editOption, deleteOption }) => {
  const [showActionsButtons, setShowActionButtons] = useState(false);
  const [edit, setEdit] = useState(option ? false : true);
  const [optionValue, setOptionValue] = useState(option);
  const [optionError, setOptionError] = useState("");

  const close = () => {
    if (edit) {
      if (option) {
        setEdit(false);
        setOptionValue(option);
      } else {
        deleteOption(index);
      }
    } else {
      deleteOption(index);
    }
  };
  return (
    <Box
      className={styles.optionContainer}
      onMouseOver={() => setShowActionButtons(true)}
      onMouseLeave={() => setShowActionButtons(false)}
    >
      {edit ? (
        <TextField
          value={optionValue}
          error={optionError}
          helperText={optionError}
          onChange={(e) => setOptionValue(e.target.value)}
          className={styles.editOption}
        />
      ) : (
        <FormControlLabel
          onMouseLeave={() => {
            console.log("called");
            editOption(index, optionValue);
            setEdit(false);
          }}
          value={option}
          control={<Radio />}
          label={option}
        />
      )}
      {showActionsButtons && (
        <>
          {edit ? (
            <IconButton
              onClick={() => {
                if (optionValue) {
                  editOption(index, optionValue);
                  setEdit(false);
                  setOptionError(null);
                } else {
                  setOptionError("Please enter option");
                }
              }}
            >
              <CheckIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setEdit(true)}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton onClick={close}>
            <Close />
          </IconButton>
        </>
      )}
    </Box>
  );
};
export default MultipleChoice;
