 import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Mic,
  Rocket,
  MapPin,
  Calendar,
  Star,
  AlertTriangle,
  Search,
} from "lucide-react";

// 🌐 API Base URL setup
const API_BASE = "https://joblogy.onrender.com";

const InternshipsJobs = () => {
  const [locations, setLocations] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [description, setDescription] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState("");

  // ✅ Load locations.json + Setup Speech Recognition
  useEffect(() => {
    fetch("/data/locations.json")
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [data];
        setLocations(arr);
      });

    if ("webkitSpeechRecognition" in window) {
      const recog = new window.webkitSpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-US";
      recog.onresult = (event) => {
        setDescription(event.results[0][0].transcript);
      };
      recog.onerror = () => {
        setErrorPopup("🎤 Voice recognition failed. Try again.");
      };
      setRecognition(recog);
    }
  }, []);

  // 🎤 Mic handler
  const handleMicClick = () => {
    if (!recognition) {
      setErrorPopup("⚠️ Voice recognition not supported in this browser.");
      return;
    }
    recognition.start();
  };

  // 📡 Fetch jobs (using deployed backend API)
  const handleSearch = async () => {
    if (!description) {
      setErrorPopup("⚠️ Please enter a job description.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          country: selectedCountry,
          state: selectedState,
          city: selectedCity,
        }),
      });

      const data = await res.json();
      if (!data.results || data.results.length === 0) {
        setErrorPopup(
          "🚫 No opportunities found. Try refining your search filters."
        );
        setJobs([]);
      } else {
        setJobs(data.results);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setErrorPopup(
        "Something went wrong while fetching jobs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const states = locations.find((c) => c.name === selectedCountry)?.states || [];
  const cities = states.find((s) => s.name === selectedState)?.cities || [];

  return (
    <motion.div
      className="bg-[#0f0425] min-h-screen px-6 md:px-12 py-16 flex flex-col items-center text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title Section */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center flex items-center justify-center gap-3">
        <Briefcase className="text-pink-500" size={40} />
        Internship & Job Finder
      </h1>
      <p className="text-gray-400 max-w-2xl text-center mb-12">
        Find <span className="text-pink-400">personalized internships</span> and{" "}
        <span className="text-indigo-400">job opportunities</span> tailored to
        your skills, location, and interests.
      </p>

      {/* Search Form */}
      <div className="bg-[#1a103d] p-8 rounded-2xl shadow-lg max-w-3xl w-full space-y-8 border border-gray-700">
        <h2 className="text-2xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
          <Search className="text-indigo-400" /> Search Filters
        </h2>
        <hr className="border-gray-700" />

        {/* Job Description */}
        <div>
          <label className="block mb-2 font-semibold">Job Description</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-[#0f0425] border border-gray-600 text-white focus:outline-none focus:border-pink-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g. Python Developer, React Intern..."
            />
            {recognition && (
              <button
                onClick={handleMicClick}
                className="px-4 py-2 bg-green-500 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center"
              >
                <Mic size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Location Filters */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Country */}
          <div>
            <label className="block mb-2 font-semibold">Country</label>
            <select
              className="w-full p-3 rounded-lg bg-[#0f0425] border border-gray-600 text-white focus:outline-none focus:border-pink-500"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedState("");
                setSelectedCity("");
              }}
            >
              <option value="">Select Country</option>
              {locations.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block mb-2 font-semibold">State</label>
            <select
              className="w-full p-3 rounded-lg bg-[#0f0425] border border-gray-600 text-white focus:outline-none focus:border-pink-500"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity("");
              }}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block mb-2 font-semibold">City</label>
            <select
              className="w-full p-3 rounded-lg bg-[#0f0425] border border-gray-600 text-white focus:outline-none focus:border-pink-500"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold w-full transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2"
        >
          {loading ? "🔄 Searching..." : <><Rocket size={20} /> Find Opportunities</>}
        </button>
      </div>

      {/* Results */}
      <div className="mt-14 w-full max-w-6xl text-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <motion.div
              className="w-16 h-16 border-4 border-gray-700 border-t-indigo-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-300 text-lg font-semibold mt-6">Searching opportunities...</p>
            <p className="text-gray-500 text-sm mt-2">This may take 2-3 minutes as we collect data from various sites</p>
          </div>
        ) : (
          jobs.length > 0 && (
            <>
              <h2 className="text-3xl font-semibold text-center mb-8 flex items-center justify-center gap-2">
                <Briefcase className="text-pink-400" /> Matching Opportunities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map((job, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#1a103d] p-6 rounded-xl shadow-lg transition-transform hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500"
                  >
                    <h3 className="text-xl font-bold">
                      {job.job_title || "Untitled"}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {job.employer_name || "N/A"}
                    </p>
                    <p className="text-sm flex items-center justify-center gap-1">
                      <MapPin size={16} /> {job.job_city || ""},{" "}
                      {job.job_state || ""}, {job.job_country || ""}
                    </p>
                    <p className="text-xs mt-2 flex items-center justify-center gap-1">
                      <Calendar size={14} /> Posted:{" "}
                      <span className="text-pink-300">
                        {job.date_posted || "N/A"}
                      </span>
                    </p>
                    <p className="text-xs flex items-center justify-center gap-1">
                      <Star size={14} /> Match Score:{" "}
                      <span className="text-indigo-300">
                        {job.match_score || 0}%
                      </span>
                    </p>
                    <a
                      href={job.job_apply_link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-pink-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition"
                    >
                      Apply Now →
                    </a>
                  </motion.div>
                ))}
              </div>
            </>
          )
        )}
      </div>

      {/* ✅ Error Popup */}
      <AnimatePresence>
        {errorPopup && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={() => setErrorPopup("")}
          >
            <div
              className="bg-[#1a103d] text-white p-6 rounded-2xl shadow-2xl max-w-md w-[92%] text-center border border-pink-500"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-pink-400 mb-3 flex items-center justify-center gap-2">
                <AlertTriangle className="text-red-400" /> Oops!
              </h2>
              <p className="text-gray-300 mb-6">{errorPopup}</p>
              <button
                onClick={() => setErrorPopup("")}
                className="bg-gradient-to-r from-pink-500 to-indigo-500 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Got it 👍
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InternshipsJobs;
