import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Componets/Navbar/Header";
import Footer from "./Componets/Navbar/Footer";
import Login from "./Pages/Login";
import Doctors from "./Pages/Doctors";
import Appoiment from "./Pages/Appoiment";
import Contact from "./Pages/Contact";
import MyProfile from "./Pages/MyProfile";
import MyAppoiment from "./Pages/UserAppoiment";
import AboutUs from "./Componets/Home/AboutUs";
import Register from "./Componets/LoginOrReg/Register";
import LoginForm from "./Componets/LoginOrReg/LoginForm";
import AdminApp from "./AdminDash/Admin-App";
import AllAppoimnets from "./AdminDash/Componets/AllAppoimnets";
import DoctorsList from "./AdminDash/Componets/DoctorsList";
import AdminDashboad from "./AdminDash/Componets/AdminDashboad";
import AddDoctors from "./AdminDash/Componets/AddDoctors";
import DoctorApply from "./Pages/DoctorApply";
import DoctorLogin from "./DoctorDash/DocComponets/DoctorLogin";
import DoctorApp from "./DoctorDash/DoctorApp";
import DoctorDashboad from "./DoctorDash/DocComponets/DoctorDashboad";
import DoctorAllAppoimnets from "./DoctorDash/DocComponets/DoctorAllAppoimnets";
import DoctorProfile from "./DoctorDash/DocComponets/DoctorProfile";
import UserList from "./AdminDash/Componets/UserList";
import UserDetailsPage from "./AdminDash/Componets/UserDetailsPage";
import DocPatiens from "./DoctorDash/DocComponets/DocPatiens";
import ReviewList from "./AdminDash/Componets/ReviewList";
import Loader from "./Componets/Loader";
import EmailOtpVerfication from "./Componets/LoginOrReg/EmailOtpVerfication";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ChatDoctor from "./Pages/ChatDoctor";
import DocChat from "./DoctorDash/DocComponets/DocChat";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="665747359516-ivq9i0ti0r5fvng2bjl31ocktlmhldcr.apps.googleusercontent.com">
        <Router>
          <Header />
          <Loader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:specialty" element={<Doctors />} />
            <Route path="/appoiment/:docId" element={<Appoiment />} />
            <Route path="/contactUs" element={<Contact />} />
            <Route path="/userProfile" element={<MyProfile />} />
            <Route path="/userAppoiments" element={<MyAppoiment />} />
            <Route path="/reg" element={<Register />} />
            <Route path="/log" element={<LoginForm />} />
            <Route path="/chat/:id" element={<ChatDoctor />} />
            <Route path="/email-verfiey" element={<EmailOtpVerfication />} />
            {/* admin route */}
            <Route path="/admin" element={<AdminApp />}>
              <Route path="dashboard" element={<AdminDashboad />} />
              <Route path="all-appoiment" element={<AllAppoimnets />} />
              <Route path="add-doctors" element={<AddDoctors />} />
              <Route path="doctors-list" element={<DoctorsList />} />
              <Route path="user-list" element={<UserList />} />
              <Route path="review-list" element={<ReviewList />} />
              <Route
                path="/admin/user-list/:uid"
                element={<UserDetailsPage />}
              />
            </Route>
            {/* doctor Apply */}
            <Route path="/doctor-Apply" element={<DoctorApply />} />
            <Route path="/docLogin" element={<DoctorLogin />} />
            {/* doctor dashBoard */}
            <Route path="/doctor" element={<DoctorApp />}>
              <Route path="dashboard" element={<DoctorDashboad />} />
              <Route path="doc-appoiment" element={<DoctorAllAppoimnets />} />
              <Route path="doc-patiens" element={<DocPatiens />} />
              <Route path="doc-chat/:uId" element={<DocChat />} />
              <Route
                path="doc-appoiment/:status"
                element={<DoctorAllAppoimnets />}
              />
              <Route path="doctors-profile" element={<DoctorProfile />} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
