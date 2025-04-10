import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Layout from "./Components/Layout/Layout";
import Assessments from "./Pages/Assessments/Assessments";
import CreateAssessment from "./Pages/CreateAssessment/CreateAssessment";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/createAssessment" element={<CreateAssessment />} />
      </Route>
    </>
  )
);
