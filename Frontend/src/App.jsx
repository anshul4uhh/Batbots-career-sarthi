 import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import NavbarMain from "./components/NavbarMain";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

import Home from "./pages/Home";
import MockInterview from "./pages/MockInterview.jsx";
import Courses from "./pages/Courses.jsx";
import ResumeGuide from "./pages/ResumeGuide.jsx";
import InternshipsJobs from "./pages/InternshipsJobs.jsx";
import ChattApp from "./pages/ChattApp";
import Hack from "./pages/Hack";
import { AuthProvider } from "./context/AuthContext";

// 👇 ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Route change hone par top pe le aayega
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <div className="bg-[#0f0425] min-h-screen flex flex-col font-inter">
        <NavbarMain />

        <main className="flex-1 font-serif">
          {/* 👇 ScrollToTop ko yaha lagana zaruri hai */}
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume-guidance" element={<ResumeGuide />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/internships-jobs" element={<InternshipsJobs />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/chattapp" element={<ChattApp />} />
            <Route path="/hack" element={<Hack />} />
          </Routes>

          <ChatWidget />
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
