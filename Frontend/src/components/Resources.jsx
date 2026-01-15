 import React, { useState } from "react";
import {
  FileText,
  Code,
  Database,
  Shield,
  Monitor,
  Layout,
  Globe,
  BarChart,
  PenTool,
  Layers,
  Lock,
  Bot,
} from "lucide-react";

const defaultResources = [
  {
    title: "UI/UX Designer",
    description:
      "Discover the principles of user interface and user experience design with guides on wireframing, prototyping, and user testing.",
    link: "https://drive.google.com/file/d/1eAAHctAI7uKYWsia2lA2ZGl7HRt8bBBD/view?usp=drive_link",
    icon: Layers,
  },
  {
    title: "Software Engineer",
    description:
      "Resources for becoming a software engineer, including coding tutorials, project ideas, and interview preparation guides.",
    link: "https://drive.google.com/file/d/1HECT41TMhjKquPoW00xBXj51XZbxhshh/view?usp=drive_link",
    icon: Monitor,
  },
  {
    title: "Full Stack Engineer",
    description:
      "Master both front-end and back-end technologies to build complete web applications from start to finish.",
    link: "https://drive.google.com/file/d/1PjSzGpfGU85sDs_A-ErAEF-H3euRrMB8/view?usp=drive_link",
    icon: Code,
  },
  {
    title: "Frontend Engineer",
    description:
      "Build interactive and visually appealing user interfaces with HTML, CSS, and JavaScript frameworks.",
    link: "https://drive.google.com/file/d/1lqT-nEghVGSYY7GgNihIIYTy2X983znV/view?usp=drive_link",
    icon: Layout,
  },
  {
    title: "Digital Marketing",
    description:
      "Learn strategies for online marketing, social media, and search engine optimization.",
    link: "https://drive.google.com/file/d/1SXSutZO6_CeYdFPM72AYTijoN2qCjjbG/view?usp=drive_link",
    icon: Globe,
  },
  {
    title: "Data Analyst",
    description:
      "Learn to collect, process, and analyze data to help organizations make informed business decisions.",
    link: "https://drive.google.com/file/d/1tmPCF-IVhAZEdqV8h1i3Uz8DG1rjwaEk/view?usp=drive_link",
    icon: FileText,
  },
  {
    title: "Cybersecurity Analyst",
    description:
      "Learn about network security, ethical hacking, and risk management to protect digital assets.",
    link: "https://drive.google.com/file/d/1RzEDXNlh8cx8LH_6iQn6etkMOPrsg8FT/view?usp=drive_link",
    icon: Shield,
  },
  {
    title: "Content Creator",
    description:
      "Find resources for creating engaging digital content across various platforms.",
    link: "https://drive.google.com/file/d/1WbsS2Mu7S43z_xGKFC7l8eu4apoN0KFU/view?usp=drive_link",
    icon: PenTool,
  },
  {
    title: "Business Analyst",
    description:
      "Learn to analyze data and business processes to drive strategic decision-making.",
    link: "https://drive.google.com/file/d/11Wn8EeEytIqv53JP_v1vaPYQ8mzqpFDh/view?usp=drive_link",
    icon: BarChart,
  },
  {
    title: "Blockchain Developer",
    description:
      "Dive into decentralized applications, smart contracts, and cryptographic protocols.",
    link: "https://drive.google.com/file/d/1lLeNML_HiTl9ZOL7YF14vXf9HzWkKEvt/view?usp=drive_link",
    icon: Lock,
  },
  {
    title: "Backend Engineer",
    description:
      "Explore back-end technologies, including server-side logic, databases, and APIs.",
    link: "https://drive.google.com/file/d/1jkykKnCyBp2lAcx_xJUMvPvY7htxIaLH/view?usp=drive_link",
    icon: Database,
  },
].sort((a, b) => a.title.localeCompare(b.title));

const Resources = ({ resources = defaultResources }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleDownload = () => {
    if (!selectedDocument) return;
    const match = selectedDocument.link.match(/\/file\/d\/([^/]+)\//);
    if (match && match[1]) {
      const fileId = match[1];
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      window.open(downloadUrl, "_blank");
    } else {
      alert("Download link could not be generated.");
    }
  };

  return (
    <div className="bg-[#0f0425] min-h-screen px-6 md:px-12 py-16 text-white">
      {/* AI Model Section */}
      <div className="max-w-5xl mx-auto mb-16 bg-[#1a103d] p-8 rounded-xl shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <Bot size={48} className="text-pink-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          AI Softskill Training
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Enhance your communication, confidence, and interview skills with AI-powered personalized training.
Get real-time feedback and practical exercises to excel in professional interactions.
        </p>
        <button className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105">
          Coming Soon
        </button>
      </div>

      {/* Resources Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Career Resources</h1>
        <p className="text-gray-300 text-lg">
          Find curated resources, including videos, books, and blogs, for
          various job roles to help you excel in your career journey.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((doc) => (
          <div
            key={doc.title}
            className="group bg-[#1a103d] p-6 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 cursor-pointer flex flex-col"
          >
            <div className="bg-white/10 rounded-full p-4 flex items-center justify-center w-16 h-16 mx-auto mb-4">
              <doc.icon size={28} />
            </div>
            <h2 className="text-xl font-bold mb-2">{doc.title}</h2>
            <p className="text-sm text-gray-300 mb-4">{doc.description}</p>
            <button
              onClick={() => setSelectedDocument(doc)}
              className="mt-auto bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-full shadow transition-all duration-300 ease-in-out group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-indigo-500 group-hover:scale-105"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* Modern Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a103d] rounded-xl shadow-2xl w-[95vw] max-w-[1200px] h-[90vh] flex flex-col overflow-hidden border border-indigo-700">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-indigo-600">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">
                <selectedDocument.icon size={26} /> {selectedDocument.title}
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transition-all"
                >
                  Download
                </button>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-lg hover:from-red-500 hover:to-red-700 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
            {/* PDF Viewer */}
            <iframe
              title={selectedDocument.title}
              src={selectedDocument.link.replace(
                "/view?usp=drive_link",
                "/preview"
              )}
              className="flex-1 w-full border-0 rounded-b-xl shadow-inner"
              style={{ minHeight: 0 }}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
