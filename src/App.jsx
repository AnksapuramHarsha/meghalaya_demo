import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./applayout/AppLayout";
import RegisterPatient from "./Components/RegisterPatient";
import PatientList from "./Components/PatientList";
import RegisterOPD from "./Components/RegisterOPD";
import HospitalDetails from "./Components/HospitalDetails";
import OpdList from "./Components/OpdList";
import AddPrescription from "./Components/AddPrescription";
import PrescriptionList from "./Components/PrescriptionList";
import Home from "./Components/Home";
import Login from "./Components/LogInPage";
import HospitalBranches from "./Components/HospitalBranches";
// import PrivateRoute from "./Components/PrivateRoute";
import { Toaster } from "react-hot-toast";

// import toast from "react-hot-toast";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    
    <Router>
       <Toaster position="top-right" reverseOrder={false} />
      <Routes>
     

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route path="/" element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />}>
          <Route index element={<Home />} />
          <Route path="register-patient" element={<RegisterPatient />} />
          <Route path="hospital-details" element={<HospitalDetails />} />
          <Route path="patient-list" element={<PatientList />} />
          <Route path="register-opd" element={<RegisterOPD />} />
          <Route path="opd-list" element={<OpdList />} />
          <Route path="register-prescription" element={<AddPrescription />} />
          <Route path="prescription-list" element={<PrescriptionList />} />
          <Route path="hospital-branches" element={<HospitalBranches />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
