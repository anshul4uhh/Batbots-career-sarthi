 import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Mic, Briefcase, BarChart, Loader2, CheckCircle, XCircle, User, Mail, Phone, Link, FileText, GraduationCap, Code, HeartHandshake, Award, Plus, Trash2, ChevronRight, ChevronLeft, SendHorizonal, Play, Pause, UserCheck } from "lucide-react";

// Please replace this URL with the actual endpoint of your running backend server.
// If you are running locally, this URL should be the same as your backend.
// Note: You may need to configure CORS on your backend to allow requests from this page.
const BACKEND = "https://ai-mock-interviewer-4wqt.onrender.com";

const input = "w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 outline-none placeholder-gray-400 transition-all duration-300";
const headingStyle = "text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8";
const sectionContainer = "bg-gray-900/50 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-700/50";
const buttonStyle = "py-4 px-8 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center";

// Custom Circular Progressbar Component (SVG-based)
const CircularProgressbarSVG = ({ value, text, color }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="text-gray-700"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className={`text-${color}-500 transition-all duration-500`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <span className="text-white font-semibold">{text}</span>
      </div>
    </div>
  );
};

// Visual Waveform Component
const Waveform = () => (
  <svg className="w-16 h-8 -ml-2 mr-2" viewBox="0 0 100 50" preserveAspectRatio="none">
    {/* Animated waveform bars */}
    <motion.rect x="0" y="25" width="8" height="2" rx="1" fill="#E879F9" animate={{ height: [2, 10, 20, 10, 2], y: [25, 20, 15, 20, 25] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }} />
    <motion.rect x="12" y="25" width="8" height="2" rx="1" fill="#E879F9" animate={{ height: [2, 15, 30, 15, 2], y: [25, 17.5, 10, 17.5, 25] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} />
    <motion.rect x="24" y="25" width="8" height="2" rx="1" fill="#E879F9" animate={{ height: [2, 10, 20, 10, 2], y: [25, 20, 15, 20, 25] }} transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }} />
    <motion.rect x="36" y="25" width="8" height="2" rx="1" fill="#E879F9" animate={{ height: [2, 5, 15, 5, 2], y: [25, 22.5, 17.5, 22.5, 25] }} transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }} />
    <motion.rect x="48" y="25" width="8" height="2" rx="1" fill="#E879F9" animate={{ height: [2, 10, 25, 10, 2], y: [25, 20, 12.5, 20, 25] }} transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }} />
    <motion.rect x="60" y="25" width="8" height="2" rx="1" fill="#E879F9" animate={{ height: [2, 20, 35, 20, 2], y: [25, 15, 7.5, 15, 25] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} />
    <motion.rect x="72" y="25" width="8" height="2" rx="1" fill="#E879F9" animate={{ height: [2, 15, 25, 15, 2], y: [25, 17.5, 12.5, 17.5, 25] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} />
    <motion.rect x="84" y="25" width="8" height="2" rx="1" fill="#E879F9" animate={{ height: [2, 10, 20, 10, 2], y: [25, 20, 15, 20, 25] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }} />
  </svg>
);


export default function App() {
  const [step, setStep] = useState(1);
  const [formStep, setFormStep] = useState('initial');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [job, setJob] = useState(null);
  const [chat, setChat] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(null);
  const [audioFileMap, setAudioFileMap] = useState({});

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: '',
    education: [{ degree: '', field: '', institution: '', year: '' }],
    experience: [{ title: '', company: '', duration: '', responsibilities: '' }],
    projects: [{ name: '', description: '', technologies: '' }],
    skills: '',
    certifications: ''
  });

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = true; // Set to true for continuous capture
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        setInputText(prev => prev + finalTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };
    } else {
      console.error("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  // Scroll to bottom of chat whenever it updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleMicToggle = () => {
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // ================= Resume Upload =================
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch(`${BACKEND}/upload_resume`, { method: "POST", body: form });
      const data = await res.json();
      setProfile(data.candidate_profile);
      setLoading(false);
      setStep(2);
    } catch (error) {
      console.error("Resume upload failed:", error);
      console.log("Please check if the backend server is running and the BACKEND URL is configured correctly.");
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // ================= Handle Form Field Changes =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, arrayName) => {
    const { name, value } = e.target;
    const newArray = [...profileData[arrayName]];
    newArray[index] = { ...newArray[index], [name]: value };
    setProfileData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const addArrayItem = (arrayName) => {
    const newItem = arrayName === 'education'
      ? { degree: '', field: '', institution: '', year: '' }
      : arrayName === 'experience'
      ? { title: '', company: '', duration: '', responsibilities: '' }
      : { name: '', description: '', technologies: '' };
    setProfileData(prev => ({ ...prev, [arrayName]: [...prev[arrayName], newItem] }));
  };

  const removeArrayItem = (index, arrayName) => {
    if (profileData[arrayName].length > 1) {
      const newArray = [...profileData[arrayName]];
      newArray.splice(index, 1);
      setProfileData(prev => ({ ...prev, [arrayName]: newArray }));
    }
  };

  // ================= Submit Profile =================
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Assuming a backend endpoint for manual profile submission if needed
      // const res = await fetch(`${BACKEND}/submit_profile`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(profileData)
      // });
      // const data = await res.json();
      setProfile(profileData);
      setStep(2);
    } catch (error) {
      console.error("Profile submission failed:", error);
      console.log("Please check your input and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= Job Submit =================
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    try {
      const res = await fetch(`${BACKEND}/upload_job`, { method: "POST", body: form });
      const data = await res.json();
      setJob(data.job_context);

      const startRes = await fetch(`${BACKEND}/start_interview`, {
        method: "POST",
        body: new FormData()
      });
      const startData = await startRes.json();
      setChat([{ role: "ai", content: startData.reply }]);
      handlePlayAudio(startData.reply, 0); // Autoplay the first message

      setStep(3);
    } catch (error) {
      console.error("Failed to start interview:", error);
      console.log("Please check if the backend server is running and the BACKEND URL is configured correctly.");
    } finally {
      setLoading(false);
    }
  };

  // ================= Text-to-Speech Functions =================
  const fetchAndSetAudio = async (text, index) => {
    const formData = new FormData();
    formData.append('text', text);

    try {
      const response = await fetch(`${BACKEND}/tts`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        setAudioFileMap(prev => ({ ...prev, [index]: audioUrl }));
        return audioUrl;
      } else {
        console.error('Failed to get audio from TTS service:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error with TTS service:', error);
      console.log("Please check if the backend server is running and the BACKEND URL is configured correctly.");
      return null;
    }
  };

  const handlePlayAudio = async (text, index) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    // If a different audio is playing, stop it.
    if (currentlyPlayingIndex !== null && currentlyPlayingIndex !== index) {
      audioRef.current.pause();
    }

    // If the same audio is already playing, pause it.
    if (currentlyPlayingIndex === index) {
      audioRef.current.pause();
      setCurrentlyPlayingIndex(null);
      return;
    }

    // Play the new audio
    setCurrentlyPlayingIndex(index);
    let audioUrl = audioFileMap[index];
    
    if (!audioUrl) {
      audioUrl = await fetchAndSetAudio(text, index);
    }

    if (audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      audioRef.current.onended = () => {
        setCurrentlyPlayingIndex(null);
      };
    }
  };
  
  // ================= Send Chat =================
  const sendToBackend = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    const form = new FormData();
    form.append("query", text);

    const humanMessageIndex = chat.length;
    
    try {
      const res = await fetch(`${BACKEND}/answer`, { method: "POST", body: form });
      const data = await res.json();
      
      const aiMessageIndex = humanMessageIndex + 1;
      
      setChat(prev => [...prev, { role: "human", content: text }, { role: "ai", content: data.reply }]);
      
      // Autoplay the new AI message
      handlePlayAudio(data.reply, aiMessageIndex);

      // Check for interview completion phrase
      console.log('Backend reply:', data.reply);
      if (data.reply.toLowerCase().includes("the interview is now complete")) {
        setInterviewCompleted(true);
      }
    } catch (error) {
      console.error("Failed to get response from backend:", error);
      console.log("Please check if the backend server is running and the BACKEND URL is configured correctly.");
    } finally {
      setLoading(false);
      setInputText('');
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    sendToBackend(inputText);
  };

  // ================= Evaluate =================
  const evaluateInterview = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/evaluate`, { method: "POST" });
      const data = await res.json();
      console.log("Evaluation data received:", data);
      setEvaluation(data);
      setStep(4);
    } catch (error) {
      console.error("Evaluation failed:", error);
      console.log("Please check if the backend server is running and the BACKEND URL is configured correctly.");
    } finally {
      setLoading(false);
    }
  };

  // ================= Renders =================
  return (
    <div className="min-h-screen w-screen font-inter text-white overflow-auto relative">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-950 to-gray-900 animate-gradient-xy" />
      
      {/* Main content */}
      <div className="h-full w-full relative z-10 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-7xl mx-auto space-y-8"
        >
          {/* Step 1: Profile Form */}
          {step === 1 && (
            <div className={sectionContainer}>
              {loading ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <Loader2 className="animate-spin text-purple-400" size={48} />
                  <p className="text-gray-300 text-lg">Analyzing your resume for a tailored interview...</p>
                </motion.div>
              ) : formStep === 'initial' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center space-y-8">
                  <h2 className={`${headingStyle} flex items-center justify-center`}>
                    <User size={40} className="inline mr-3" /> Build Your Profile
                  </h2>
                  <p className="text-gray-300 text-lg max-w-prose mx-auto">
                    To make your mock interview as realistic as possible, we'll use your profile and a job role to ask relevant questions.
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mt-10">
                    <button
                      onClick={triggerFileInput}
                      className={`${buttonStyle} bg-gradient-to-r from-purple-600 to-pink-600`}
                    >
                      <Upload className="mr-3" /> Upload Resume
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleResumeUpload} className="hidden" />
                    <button
                      onClick={() => setFormStep('profile')}
                      className={`${buttonStyle} bg-gray-700 hover:bg-gray-600`}
                    >
                      Manually Enter Details <ChevronRight className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              ) : formStep === 'profile' ? (
                <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                  <h2 className={`${headingStyle} flex items-center`}>
                    <User size={40} className="inline mr-3" /> Personal Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User size={20} className="text-purple-400" />
                      <input type="text" name="fullName" value={profileData.fullName} onChange={handleChange} placeholder="Full Name" required className={input} />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail size={20} className="text-purple-400" />
                      <input type="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email" required className={input} />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone size={20} className="text-purple-400" />
                      <input type="text" name="phone" value={profileData.phone} onChange={handleChange} placeholder="Phone" required className={input} />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Link size={20} className="text-purple-400" />
                      <input type="url" name="linkedin" value={profileData.linkedin} onChange={handleChange} placeholder="LinkedIn" className={input} />
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText size={20} className="text-purple-400 mt-4" />
                    <textarea name="summary" value={profileData.summary} onChange={handleChange} placeholder="Profile Summary" className={`${input} h-32`} />
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    <button onClick={() => setFormStep('initial')} className="flex items-center text-gray-400 hover:text-white transition-colors">
                      <ChevronLeft size={20} className="mr-2" /> Back
                    </button>
                    <button onClick={() => setFormStep('education')} className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-xl font-bold flex items-center transition-transform duration-300 transform hover:scale-105">
                      Next <ChevronRight className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              ) : formStep === 'education' ? (
                <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                  <h2 className={`${headingStyle} flex items-center`}>
                    <GraduationCap size={40} className="inline mr-3" /> Education
                  </h2>
                  {profileData.education.map((edu, index) => (
                    <div key={index} className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 space-y-4 relative">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="degree" value={edu.degree} onChange={(e) => handleArrayChange(e, index, 'education')} placeholder="Degree" className={input} />
                        <input type="text" name="field" value={edu.field} onChange={(e) => handleArrayChange(e, index, 'education')} placeholder="Field of Study" className={input} />
                        <input type="text" name="institution" value={edu.institution} onChange={(e) => handleArrayChange(e, index, 'education')} placeholder="Institution" className={input} />
                        <input type="text" name="year" value={edu.year} onChange={(e) => handleArrayChange(e, index, 'education')} placeholder="Graduation Year" className={input} />
                      </div>
                      {profileData.education.length > 1 && (
                        <button onClick={() => removeArrayItem(index, 'education')} className="absolute -top-3 -right-3 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors">
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => addArrayItem('education')} className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                    <Plus size={20} className="mr-2" /> Add another education
                  </button>
                  <div className="flex justify-between items-center mt-8">
                    <button onClick={() => setFormStep('profile')} className="flex items-center text-gray-400 hover:text-white transition-colors">
                      <ChevronLeft size={20} className="mr-2" /> Back
                    </button>
                    <button onClick={() => setFormStep('experience')} className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-xl font-bold flex items-center transition-transform duration-300 transform hover:scale-105">
                      Next <ChevronRight className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              ) : formStep === 'experience' ? (
                <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                  <h2 className={`${headingStyle} flex items-center`}>
                    <Code size={40} className="inline mr-3" /> Experience & Projects
                  </h2>
                  {profileData.experience.map((exp, index) => (
                    <div key={index} className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 space-y-4 relative">
                      <h3 className="text-lg font-semibold text-gray-200">Job {index + 1}</h3>
                      <input type="text" name="title" value={exp.title} onChange={(e) => handleArrayChange(e, index, 'experience')} placeholder="Job Title" className={input} />
                      <input type="text" name="company" value={exp.company} onChange={(e) => handleArrayChange(e, index, 'experience')} placeholder="Company" className={input} />
                      <input type="text" name="duration" value={exp.duration} onChange={(e) => handleArrayChange(e, index, 'experience')} placeholder="Duration (e.g., Jan 2020 - Dec 2022)" className={input} />
                      <textarea name="responsibilities" value={exp.responsibilities} onChange={(e) => handleArrayChange(e, index, 'experience')} placeholder="Key Responsibilities" className={`${input} h-24`} />
                      {profileData.experience.length > 1 && (
                        <button onClick={() => removeArrayItem(index, 'experience')} className="absolute -top-3 -right-3 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors">
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => addArrayItem('experience')} className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                    <Plus size={20} className="mr-2" /> Add another experience
                  </button>
                  <hr className="my-8 border-gray-700" />
                  <h3 className="text-2xl font-bold mb-4">Projects</h3>
                  {profileData.projects.map((proj, index) => (
                    <div key={index} className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 space-y-4 relative">
                      <h3 className="text-lg font-semibold text-gray-200">Project {index + 1}</h3>
                      <input type="text" name="name" value={proj.name} onChange={(e) => handleArrayChange(e, index, 'projects')} placeholder="Project Name" className={input} />
                      <input type="text" name="technologies" value={proj.technologies} onChange={(e) => handleArrayChange(e, index, 'projects')} placeholder="Technologies Used (e.g., React, Node.js)" className={input} />
                      <textarea name="description" value={proj.description} onChange={(e) => handleArrayChange(e, index, 'projects')} placeholder="Project Description" className={`${input} h-24`} />
                      {profileData.projects.length > 1 && (
                        <button onClick={() => removeArrayItem(index, 'projects')} className="absolute -top-3 -right-3 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors">
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => addArrayItem('projects')} className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                    <Plus size={20} className="mr-2" /> Add another project
                  </button>

                  <div className="flex justify-between items-center mt-8">
                    <button onClick={() => setFormStep('education')} className="flex items-center text-gray-400 hover:text-white transition-colors">
                      <ChevronLeft size={20} className="mr-2" /> Back
                    </button>
                    <button onClick={() => setFormStep('skills')} className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-xl font-bold flex items-center transition-transform duration-300 transform hover:scale-105">
                      Next <ChevronRight className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                  <h2 className={`${headingStyle} flex items-center`}>
                    <HeartHandshake size={40} className="inline mr-3" /> Skills & Certifications
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <HeartHandshake size={20} className="text-purple-400" />
                      <input type="text" name="skills" value={profileData.skills} onChange={handleChange} placeholder="Skills (comma-separated)" className={input} />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award size={20} className="text-purple-400" />
                      <input type="text" name="certifications" value={profileData.certifications} onChange={handleChange} placeholder="Certifications" className={input} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    <button onClick={() => setFormStep('experience')} className="flex items-center text-gray-400 hover:text-white transition-colors">
                      <ChevronLeft size={20} className="mr-2" /> Back
                    </button>
                    <button onClick={handleProfileSubmit} className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-xl font-bold flex items-center transition-transform duration-300 transform hover:scale-105">
                      Submit Profile <ChevronRight className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Step 2: Job Role */}
          {step === 2 && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className={sectionContainer}>
              <h2 className={`${headingStyle} flex items-center justify-center`}>
                <Briefcase size={40} className="inline mr-3" /> Job Role Details
              </h2>
              <form onSubmit={handleJobSubmit} className="space-y-6">
                <p className="text-gray-400 text-lg text-center mb-8">
                  What job role are you interviewing for?
                </p>
                <input type="text" name="job_role" placeholder="e.g., Software Engineer, Data Scientist" className={input} required />
                <textarea name="job_description" placeholder="Optional: Paste the job description here for a more specific interview." className={`${input} h-32`} />
                <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 py-4 rounded-full font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Start Interview
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 3: Interview */}
          {step === 3 && (
            <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`${sectionContainer} flex flex-col flex-1 min-h-[85vh] h-full w-full`}>
              <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                <Mic size={40} className="inline mr-3" /> Mock Interview
              </h2>
              <div ref={chatContainerRef} className="overflow-y-auto space-y-4 mb-6 pr-4 custom-scrollbar w-full max-h-[60vh]">
                {chat.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-3xl max-w-[80%] ${
                      msg.role === "ai"
                        ? "bg-gray-800 self-start mr-auto flex items-center"
                        : "bg-purple-600/70 self-end ml-auto"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <button
                        onClick={() => handlePlayAudio(msg.content, idx)}
                        className="flex items-center justify-center p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300 mr-4 flex-shrink-0"
                      >
                        {currentlyPlayingIndex === idx ? (
                          <Pause size={24} />
                        ) : (
                          <Play size={24} />
                        )}
                      </button>
                    )}
                    {msg.role === "ai" && currentlyPlayingIndex === idx && <Waveform />}
                    {msg.content}
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex items-center text-gray-400 mt-4 animate-pulse">
                    <Loader2 className="animate-spin mr-2" /> AI is thinking...
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleMicToggle}
                    className={`p-3 rounded-full shadow-lg text-white transition-colors duration-300 ${
                      isRecording ? "bg-red-500 animate-pulse" : "bg-gradient-to-r from-purple-600 to-pink-600"
                    }`}
                  >
                    <Mic size={24} />
                  </motion.button>
                  <form onSubmit={handleTextSubmit} className="flex-1 flex items-center space-x-4">
                    <textarea
                      rows="1"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your answer here..."
                      className="flex-1 bg-gray-800 rounded-xl py-3 px-6 text-white outline-none border border-gray-700 focus:border-purple-500 overflow-hidden resize-none"
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      type="submit"
                      className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transition-transform duration-300 transform hover:scale-105"
                    >
                      <SendHorizonal size={24} />
                    </motion.button>
                  </form>
                </div>

                {/* Evaluate button below input field */}
                <div className="flex justify-center">
                  <button
                    onClick={evaluateInterview}
                    disabled={loading}
                    className={`bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full font-bold flex items-center shadow-lg text-white transition-all duration-300 ${
                      loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-700 hover:to-pink-700'
                    }`}
                  >
                    <BarChart className="mr-2" /> Evaluate
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Evaluation */}
          {step === 4 && evaluation && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className={sectionContainer}>
              <h2 className={headingStyle}>
                <BarChart size={40} className="inline mr-3" /> Interview Evaluation
              </h2>
              <p className="text-lg text-gray-300 text-center mb-8">{evaluation.summary}</p>
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                {Object.entries(evaluation.metrics || {}).map(([metric, score], index) => (
                  <div key={index} className="flex flex-col items-center">
                    <CircularProgressbarSVG value={score} text={`${Math.round(score)}%`} color={score > 70 ? 'green' : score > 40 ? 'yellow' : 'red'} />
                    <p className="mt-4 font-semibold text-gray-300">{metric}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-green-400 flex items-center mb-2"><CheckCircle className="mr-2" /> Strengths</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {evaluation.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-red-400 flex items-center mb-2"><XCircle className="mr-2" /> Weaknesses</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {evaluation.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-yellow-400 flex items-center mb-2"><BarChart className="mr-2" /> Recommendations</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {evaluation.recommendations?.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>
              {evaluation.final_verdict && (
                <div className="mt-8 p-6 bg-gray-800 rounded-2xl border border-gray-700">
                  <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 flex items-center mb-2">
                    <UserCheck size={24} className="mr-2" /> Hiring Summary
                  </h3>
                  <p className="text-gray-300">{evaluation.final_verdict}</p>
                </div>
              )}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setStep(3)}
                  className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
                >
                  <ChevronLeft className="inline mr-2" /> Back to Interview
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}