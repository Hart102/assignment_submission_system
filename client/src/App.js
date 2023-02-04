import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// CSS 
import '../src/asserts/CSS/bootstrap.min.css'
import './asserts/CSS/font-awesome-4.7.0/css/font-awesome.min.css'

// PAGES 
import Cover from "./pages/Cover_Page/Cover";
import Assignment_menu from "./pages/Assignment/Assignment_menu";
import Assignment_page from "./pages/Assignment/Assignment_page";
import Admin from "./pages/Admin/Admin";
import Obj_results from "./pages/Obj_results";
import Read_assessment_file from "./pages/Assignment/Read_assessment_file";
import Lecturer_login from "./pages/Admin/Lecturer_login";

// Components 
import SetTheory_quest from "./components/SetTheory_quest";
import SetObjQuestion from "./components/SetObjQuestion";
import ReadQuestions from "./pages/Admin/ReadQuestions";
import Level from "./pages/Level";

import Sign_in from "./components/Cover_components/Form/Sign_in";
import Sign_up from "./components/Cover_components/Form/Sign_up";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/assignment/menu" element={<Assignment_menu />} />
        <Route path="/level" element={<Level />} />
        <Route path="/assignment" element={<Assignment_page />} />

        <Route path="/admin" element={<Admin />} >
          <Route path="/admin/setTheory" element={<SetTheory_quest />} />
          <Route path="/admin/obj" element={<SetObjQuestion />} />
        </Route>
        
        <Route path="/admin/results" element={<Obj_results />} />
        <Route path="/admin/read_assessment" element={<Read_assessment_file />} />
        <Route path="/lecturer_login" element={<Lecturer_login />} />
        <Route path="/admin/readquestions" element={<ReadQuestions />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 