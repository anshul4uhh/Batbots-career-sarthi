 import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Calendar, Star, MapPin } from "lucide-react";

const Hack = () => {
  const [contests, setContests] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Fetch contests from API
  const fetchContests = async () => {
    setLoading(true);
    setShowResults(true);
    try {
      let url = "https://contest-hackathon-tracker-6j7r.onrender.com/api/all";
      const params = [];
      if (type) params.push(`type=${type}`);
      if (status) params.push(`status=${status}`);
      if (params.length) url += `?${params.join("&")}`;

      const res = await fetch(url);
      const data = await res.json();

      const filtered = data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase()) ||
          item.platform.toLowerCase().includes(searchText.toLowerCase())
      );

      setContests(filtered);
      if (filtered.length === 0) setErrorPopup("🚫 No contests found.");
    } catch (err) {
      console.error("Error fetching contests:", err);
      setContests([]);
      setErrorPopup("Something went wrong while fetching contests.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all contests on component mount
  useEffect(() => {
    fetchContests();
  }, []);

  return (
    <motion.div
      className="bg-[#0f0425] min-h-screen px-6 md:px-12 py-16 flex flex-col items-center text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Hackathon & Contest Tracker
      </h1>

      {/* Filters */}
      <div className="bg-[#1a103d] p-6 rounded-2xl shadow-lg w-full max-w-3xl flex flex-wrap gap-4 items-center border border-gray-700 mb-12">
        <input
          type="text"
          placeholder="Search by title or platform..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-[#0f0425] border border-gray-600 text-white focus:outline-none focus:border-pink-500"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 rounded-lg bg-[#0f0425] border border-gray-600 text-white focus:outline-none focus:border-pink-500"
        >
          <option value="">All Types</option>
          <option value="hackathon">Hackathon</option>
          <option value="contest">Contest</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-3 rounded-lg bg-[#0f0425] border border-gray-600 text-white focus:outline-none focus:border-pink-500"
        >
          <option value="">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="live">Live</option>
          <option value="past">Past</option>
        </select>
        <button
          onClick={fetchContests}
          className="bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <motion.div
                className="w-16 h-16 border-4 border-gray-700 border-t-pink-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-gray-300 text-lg font-semibold mt-6">Loading contests...</p>
              <p className="text-gray-500 text-sm mt-2">This may take 2-3 minutes as we scrape data from various sites</p>
            </div>
          ) : contests.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center">
              No contests found.
            </p>
          ) : (
            contests.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-[#1a103d] p-6 rounded-xl shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 transition-transform"
              >
                <h3 className="text-xl font-bold mb-2 text-pink-400">
                  {item.title}
                </h3>
                <p className="text-gray-300">
                  <strong>Platform:</strong> {item.platform}
                </p>
                <p className="text-gray-300 flex items-center gap-1">
                  <Calendar size={14} /> <strong>Start:</strong>{" "}
                  {item.start_date || "N/A"}
                </p>
                <p className="text-gray-300 flex items-center gap-1">
                  <Calendar size={14} /> <strong>End:</strong>{" "}
                  {item.end_date || "N/A"}
                </p>
                <p className="text-gray-300 flex items-center gap-1">
                  <Star size={14} /> <strong>Status:</strong>{" "}
                  {item.status || item.phase || "N/A"}
                </p>
                <p className="text-gray-300 flex items-center gap-1">
                  <MapPin size={14} /> {item.location || "Remote"}
                </p>
                <a
                  href={item.apply_link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block w-full text-center bg-pink-500 px-4 py-2 rounded-full hover:bg-pink-600 font-semibold transition"
                >
                  Apply / Open
                </a>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Error Popup */}
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
    </motion.div>
  );
};

export default Hack;
