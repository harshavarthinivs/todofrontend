import { FilterComponent } from "../../components/TodoFilters";
import "./experiment.css";
import AuthProvider from "../ContextTest/AuthProvider"
import Login from "../ContextTest/Login";
const Experiment = () => {
  return <AuthProvider><Login/></AuthProvider>
};

export default Experiment;
