import MultipleChoice from "../Components/Questions/MultipleChoice";
import TrueOrFalse from "../Components/Questions/TrueOrFalse";

export const questionGenerator = (question) => {
  switch (question.id) {
    case 1:
      return <MultipleChoice {...question} />;
    case 2:
      return <TrueOrFalse {...question} />;

    default:
      return <MultipleChoice {...question} />;
  }
};
