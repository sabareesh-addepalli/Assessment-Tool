import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { useContext, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import styles from "./CreateAssessment.module.css";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  MultipleChoiceSchema,
  TrueOrFalseSchema,
} from "../../Schema/questionSchema";
import { questionGenerator } from "../../Utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AssessmentContext } from "../../Context/Assessment.context";
import { useNavigate } from "react-router-dom";

import AssessmentConfig from "./AssessmentConfig";

const CreateAssessment = () => {
  const navigation = useNavigate();
  const {
    assessment,
    setQuestions,
    createAssessment,
    resetAssessment,
    setIsAssessmentSubmitted,
  } = useContext(AssessmentContext);
  const { questions } = assessment;
  const [openSelection, setOpenSelection] = useState(false);
  const questionTypes = [
    { label: "Multiple Choices", id: 1 },
    { label: "True Or False", id: 2 },
    { label: "Fill in the blank", id: 3 },
    { label: "Open Question", id: 4 },
  ];

  const cancel = () => {
    resetAssessment();
    navigation("/assessments");
  };

  const getQuestionSchema = (id) => {
    switch (id) {
      case 1:
        return MultipleChoiceSchema;
      case 2:
        return TrueOrFalseSchema;
      default:
        return MultipleChoiceSchema;
    }
  };

  const deleteQuestion = (index) => {
    let newQuestions = [...questions];
    newQuestions = newQuestions.filter((q, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleCancel = () => setOpenSelection(false);
  const handleOk = (id) => {
    const newQuestions = [...questions];
    const newQuestion = getQuestionSchema(id);
    newQuestions.push({
      ...newQuestion,
      questionId: `q-${questions.length + 1}`,
    });
    setQuestions(newQuestions);
    setOpenSelection(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newQuestions = reorder(
      questions,
      result.source.index,
      result.destination.index
    );
    setQuestions(newQuestions);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "0",
    margin: `0`,
    marginTop: "15px",
    background: isDragging ? "lightgrey" : "transparent",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "whitesmoke" : "transparent",
    padding: 0,
    width: "100%",
  });

  return (
    <Box className={styles.container}>
      <AssessmentConfig />
      <Box className={styles.questionsContainer}>
        <Box className={styles.questionListContainer}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {questions.map((question, index) => (
                    <Draggable
                      key={question.questionId}
                      draggableId={question.questionId}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <Paper
                            elevation={4}
                            className={styles.questionWrapper}
                          >
                            {questionGenerator(question)}
                            <IconButton
                              onClick={() => deleteQuestion(index)}
                              className={styles.closeQuestionBtn}
                            >
                              <CancelIcon color="secondary" />
                            </IconButton>
                          </Paper>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Box className={styles.addQuestionBtn}>
            <Button
              onClick={() => {
                setOpenSelection(true);
                setIsAssessmentSubmitted(false);
              }}
              variant="outlined"
            >
              <AddIcon /> Add Question
            </Button>
          </Box>
        </Box>

        <Box className={styles.footerActions}>
          <Button
            onClick={createAssessment}
            className={styles.createBtn}
            variant="contained"
          >
            Create Assessment
          </Button>
          <Button onClick={cancel} color="secondary" variant="contained">
            Cancel
          </Button>
        </Box>
      </Box>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={openSelection}
      >
        <DialogTitle>Select Question Type</DialogTitle>
        <DialogContent dividers sx={{ padding: 0 }}>
          <List>
            {questionTypes.map((question) => (
              <ListItem key={question.id} disablePadding>
                <ListItemButton onClick={() => handleOk(question.id)}>
                  <ListItemText primary={question.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default CreateAssessment;
