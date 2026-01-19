 import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeGuide() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorPopup, setErrorPopup] = useState("");
  const [fileName, setFileName] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorPopup("");
    setResult(null);

    const formData = new FormData();
    const fileInput = document.getElementById("resume");
    if (!fileInput.files[0]) {
      setErrorPopup("Please select a resume file!");
      setLoading(false);
      return;
    }
    
    formData.append("resume", fileInput.files[0]);
    formData.append(
      "job_description",
      document.getElementById("job_description").value
    );

    try {
      const response = await fetch(
        "https://resume-screener-dummy.onrender.com/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        setResult(data.data);
      } else {
        setErrorPopup(data.message || "Something went wrong!");
      }
    } catch (err) {
      setErrorPopup("⚠️ Failed to connect: " + err.message);
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <motion.div
      className="bg-[#0f0425] min-h-screen px-6 md:px-12 py-16 flex flex-col items-center text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title Section */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        📄 AI Resume Analyzer
      </h1>
      <p className="text-gray-400 max-w-2xl text-center mb-12">
        Upload your <span className="text-pink-400">resume</span> and compare it
        with a <span className="text-indigo-400">job description</span> to get
        insights & match score.
      </p>

      {/* Form Card */}
      <div className="bg-[#1a103d] p-8 rounded-2xl shadow-lg max-w-3xl w-full space-y-8 border border-gray-700">
        <h2 className="text-2xl font-semibold text-center mb-4">
          🔎 Upload & Analyze
        </h2>
        <hr className="border-gray-700" />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume Upload */}
          <div>
            <label className="block mb-2 font-semibold">
              Upload Resume (PDF)
            </label>
            <div className="relative">
              <input
                type="file"
                id="resume"
                accept="application/pdf"
                required
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full p-8 rounded-lg bg-gradient-to-br from-[#0f0425] to-[#1a103d] border-2 border-dashed border-gray-600 hover:border-pink-500 hover:bg-opacity-80 transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer">
                <svg
                  className="w-12 h-12 text-gray-400 hover:text-pink-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div className="text-center">
                  <p className="text-gray-300 font-semibold">
                    {fileName ? (
                      <span className="text-pink-400">✓ {fileName}</span>
                    ) : (
                      <span>Click to upload or drag and drop</span>
                    )}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">PDF files only (Max 10MB)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block mb-2 font-semibold">
              Paste Job Description
            </label>
            <textarea
              id="job_description"
              rows="6"
              required
              className="w-full p-3 rounded-lg bg-[#0f0425] border border-gray-600 text-white focus:outline-none focus:border-pink-500"
              placeholder="E.g. React Developer role requiring frontend skills..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold w-full transition-transform duration-300 hover:scale-105"
          >
            {loading ? "🔄 Analyzing..." : " Analyze Resume"}
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="mt-14 w-full max-w-4xl text-left">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <motion.div
              className="w-16 h-16 border-4 border-gray-700 border-t-pink-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-300 text-lg font-semibold mt-6">Analyzing your resume...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait while we match your profile</p>
          </div>
        )}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a103d] p-8 rounded-2xl shadow-lg border border-gray-700 space-y-6"
          >
            {/* Match Score */}
            <h2 className="text-2xl font-bold text-pink-400">✅ Match Score</h2>
            <div className="w-full bg-gray-700 rounded-full h-5">
              <div
                className="h-5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
                style={{ width: `${parseInt(result.match_score)}%` }}
              ></div>
            </div>
            <p className="text-lg font-semibold">
              {result.match_score}% Match
            </p>

            {/* Missing Skills */}
            <h3 className="text-xl font-semibold text-indigo-400">
              ❌ Missing Skills
            </h3>
            <ul className="list-disc pl-6 text-gray-300">
              {result.missing_skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            {/* Suggestions */}
            <h3 className="text-xl font-semibold text-pink-400">
              💡 Suggestions
            </h3>
            <ul className="list-disc pl-6 text-gray-300">
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            {/* Summary */}
            <h3 className="text-xl font-semibold text-indigo-400">📝 Summary</h3>
            <p className="text-gray-300">{result.summary}</p>
          </motion.div>
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
              <h2 className="text-2xl font-bold text-pink-400 mb-3">🚫 Oops!</h2>
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
}
