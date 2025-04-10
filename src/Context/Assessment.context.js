import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
export const AssessmentContext = createContext();

export const AssessmentProvider = ({ children }) => {
  const [assessmentList, setAssessmentList] = useState([]);
  const [isAssessmentSubmitted, setIsAssessmentSubmitted] = useState(false);

  const defaultAssessment = {
    title: "",
    description: "",
    questions: [],
  };
  const [assessment, setAssessment] = useState(defaultAssessment);

  const setTitle = (title) => {
    setAssessment({ ...assessment, title: title });
  };
  const setDescription = (description) => {
    setAssessment({ ...assessment, description: description });
  };
  const setQuestions = (questions) => {
    setAssessment({ ...assessment, questions: questions });
  };

  const resetAssessment = () => {
    setAssessment(defaultAssessment);
    setIsAssessmentSubmitted(false);
  };

  const updateQuestion = (question) => {
    const index = assessment.questions.findIndex(
      (e) => e.questionId === question.questionId
    );
    let newAsssessment = { ...assessment };
    assessment.questions[index] = question;
    setAssessment(newAsssessment);
  };

  const createAssessment = () => {
    if(assessment.questions.length===0){
      toast.error('Please add atleast one question')
      setIsAssessmentSubmitted(true);
      return
    }
    setIsAssessmentSubmitted(true);
    console.log(assessment);
  };

  return (
    <AssessmentContext.Provider
      value={{
        assessmentList,
        assessment,
        isAssessmentSubmitted,
        setTitle,
        setDescription,
        setQuestions,
        updateQuestion,
        createAssessment,
        resetAssessment,
        setIsAssessmentSubmitted
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};
