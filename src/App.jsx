import SignInSide from './pages/SignInSide'
import SignupMentee1 from './pages/SignupMentee1'
import SignupMentee2 from './pages/SignupMentee2'
import SignupMentee3 from './pages/SignupMentee3'
import SignupMentee4 from './pages/SignupMentee4'
import SignupMentor1 from './pages/SignupMentor1'
import SignupMentor2 from './pages/SignupMentor2'
import SignupMentor3 from './pages/SignupMentor3'
import SignupMentor4 from './pages/SignupMentor4'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Signup from './pages/Signup';
import FindMentor from "./pages/FindMentor.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext"
import Profile from './pages/ProfilePage'
import EventPage from './pages/EventsPage.jsx'
import ViewEventPage from "./pages/ViewEventPage.jsx";
import TestHome from "./pages/TestHome.jsx";
import WebDevelopment from './pages/WebDevelopment.jsx';
import DataScience from './pages/DataScience.jsx';
import Fintech from './pages/FinTech.jsx';
import MachineLearning from './pages/MachineLearning.jsx';
import UXDesign from './pages/UXDesign.jsx';
import AI from './pages/AI.jsx';
import ProgressPage from './pages/ProgressPage'; 
import MessagesPage from './pages/MessagesPage'; 
import CreateEventPage from "./pages/CreateEventPage";
import EditProfilePage from "./pages/EditProfilePage";


function App() {
  return (
    <>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/signin" element={<SignInSide />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup-mentee-1" element={<SignupMentee1 />} />
            <Route path="/signup-mentee-2" element={<SignupMentee2 />} />
            <Route path="/signup-mentee-3" element={<SignupMentee3 />} />
            <Route path="/signup-mentee-4" element={<SignupMentee4 />} />
            <Route path="/signup-mentor-1" element={<SignupMentor1 />} />
            <Route path="/signup-mentor-2" element={<SignupMentor2 />} />
            <Route path="/signup-mentor-3" element={<SignupMentor3 />} />
            <Route path="/signup-mentor-4" element={<SignupMentor4 />} />
            <Route path="/find-mentor" element={<FindMentor />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/event/:id" element={<ViewEventPage />} />
            <Route path="/test-home" element={<TestHome />} />
            <Route path="/web-development" element={<WebDevelopment />} />
            <Route path="/data-science" element={<DataScience />} />
            <Route path="/fintech" element={<Fintech />} />
            <Route path="/machine-learning" element={<MachineLearning />} />
            <Route path="/ux-design" element={<UXDesign />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App
