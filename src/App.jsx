import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Dash from "./components/Dash";
import FolderDetails from "./components/FolderDetails";
import FormPage from "./components/FormPage";
import Response from "./components/Response";
import Settings from "./components/Settings";
import WhiteRes from "./components/WhiteRes";
import Result from "./components/Result";

function App() {
  return (
    <Router>
      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard and Related Routes */}
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/folders/:id" element={<FolderDetails />} />

        <Route path="/form/:id" element={<FormPage />} /> {/* FormPage should handle form rendering */}
        <Route path="/result/:id" element={<Result/>}/>

        <Route path="/response" element={<Response/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/WhiteRes/:formId" element={<WhiteRes/>} />


        {/* Fallback Route for Undefined Paths */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
