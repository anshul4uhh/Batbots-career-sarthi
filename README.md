<h1 align="center">CAREER-SARTHI</h1>
<p align="center"><em>Your mentor in the journey of skills, interviews, and career growth</em></p>

---

## 📍 Overview

**Career-Sarthi** is a one-stop AI-powered career and skills advisor that helps students and early professionals navigate their career journey.  
The platform combines **career roadmaps, resume guidance, mock interviews, hackathon tracking, and job discovery** into a single dashboard — eliminating the need to juggle multiple websites.

🌐 **Live Prototype**: [batbots-career-sarthi.vercel.app](https://batbots-career-sarthi.vercel.app/)

---

## 👾 Features

- **Career Roadmaps** → Guided step-by-step learning paths (Web Dev, Data Science, Cloud, etc.)
- **Courses & Resources** → Curated free & paid courses for upskilling
- **Resume Guidance** → ATS-friendly analysis & actionable feedback
- **Hackathon Tracker** → Find upcoming contests, deadlines, and registrations
- **Mock Interviews** → AI-powered technical & HR interview practice with feedback
- **Job & Internship Finder** → Personalized listings based on skills & interests
- **Mentorship & Guidance** → AI mentor to resolve doubts and provide career advice

---

## 👨‍💻 Developer-Team
This project is collaboratively built and maintained by a passionate development team:

🔹 **Taniya — Team Leader**

- Overall project planning and coordination
- Requirement analysis and task distribution
- Ensuring smooth collaboration between frontend, backend, and AI modules
- Final review and integration oversight

🔹 **Anshul Shrivastava — Backend & GenAI Developer**

- Backend architecture and API development
- Database design and server-side logic
- Integration of Generative AI features for career guidance and analysis
- Performance optimization and secure data handling

🔹 **Anshika — React & Backend Developer**

- Development of dynamic UI components using React
- Frontend–backend integration
- API handling and state management
- Contribution to backend features and business logic

🔹 **Ansh — Frontend Developer**

- User interface design and implementation
- Responsive and accessible layouts
- Styling and UI consistency across the platform
- Enhancing user experience and performance


## 🏗 Architecture

The system is divided into modular **frontend and backend services**:

- **Frontend**: React + Tailwind, deployed on Vercel  
- **Backend Microservices**: Python (FastAPI), each serving a module:
  - `backend-chatapp` → AI career mentor chatbot  
  - `backend-mock` → Mock interview engine with resume parser  
  - `Backend_resume_analyzer` → Resume analysis and scoring  
  - `Backend_Hackathon_tracker` → Hackathon and contest tracking  
  - `backend_job_finder` → Personalized job/internship search  

The architecture ensures **scalability** with independent services, cloud-friendly hosting, and modular APIs.

**For tech stack**, please refer to the requirements.txt files for the backend services

---

## 📁 Project Structure

```sh
└── career-sarthi/
    ├── Frontend
    │   ├── .gitignore
    │   ├── README.md
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   │   ├── _redirects
    │   │   ├── data
    │   │   │   └── locations.json
    │   │   ├── logo.svg
    │   │   └── vite.svg
    │   ├── src
    │   │   ├── App.css
    │   │   ├── App.jsx
    │   │   ├── assets
    │   │   │   ├── fonts
    │   │   │   │   ├── FiraCode-Bold.ttf
    │   │   │   │   ├── FiraCode-Light.ttf
    │   │   │   │   ├── FiraCode-Medium.ttf
    │   │   │   │   ├── FiraCode-Regular.ttf
    │   │   │   │   ├── FiraCode-SemiBold.ttf
    │   │   │   │   ├── Orbitron-Bold.ttf
    │   │   │   │   ├── Orbitron-Regular.ttf
    │   │   │   │   └── Orbitron-SemiBold.ttf
    │   │   │   ├── hero.webp
    │   │   │   └── logo.webp
    │   │   ├── components
    │   │   │   ├── AuthModal.jsx
    │   │   │   ├── ChatApp.jsx
    │   │   │   ├── ChatWidget.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Mock.jsx
    │   │   │   ├── NavbarMain.jsx
    │   │   │   ├── PasswordInput.jsx
    │   │   │   ├── RequestDemo.jsx
    │   │   │   └── Resources.jsx
    │   │   ├── context
    │   │   │   └── AuthContext.jsx
    │   │   ├── fonts.css
    │   │   ├── index.css
    │   │   ├── main.jsx
    │   │   └── pages
    │   │       ├── ChattApp.jsx
    │   │       ├── Courses.jsx
    │   │       ├── Dashboard.jsx
    │   │       ├── Hack.jsx
    │   │       ├── Home.jsx
    │   │       ├── InternshipsJobs.jsx
    │   │       ├── MockInterview.jsx
    │   │       └── ResumeGuide.jsx
    │   ├── tailwind.config.js
    │   ├── vercel.json
    │   └── vite.config.js
    └── backend-overall
        ├── Backend_Hackathon_tracker
        │   ├── main.py
        │   ├── requirements.txt
        │   └── unstop_hackathons.csv
        ├── Backend_resume_analyzer
        │   ├── __init__.py
        │   ├── analyze_pdf.py
        │   └── main.py
        ├── backend-chatapp
        │   ├── __pycache__
        │   ├── app.py
        │   ├── chat.py
        │   ├── requirements.txt
        │   └── session_store.py
        ├── backend-mock
        │   ├── __pycache__        
        │   ├── app.py
        │   ├── interview.py
        │   ├── prompts.py
        │   ├── requirements.txt
        │   ├── resume_parser.
        │   ├── session_store.py
        │   └── talk.py
        └── backend_job_finder
            ├── main.py
            └── requirements.txt
```


### 📂 Project Index

<details open>
<summary><b><code>CAREER-SARTHI/</code></b></summary>
<blockquote>
<table>
</table>
</blockquote>
</details>
<details> <summary><b>Frontend</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/package-lock.json'>package-lock.json</a></b></td>
<td>This file is automatically generated for any operations where npm modifies either the node_modules tree or package.json.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/vercel.json'>vercel.json</a></b></td>
<td>Configuration file for deploying the project to Vercel.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/tailwind.config.js'>tailwind.config.js</a></b></td>
<td>Configuration file for Tailwind CSS, a utility-first CSS framework used for styling.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/vite.config.js'>vite.config.js</a></b></td>
<td>Configuration file for Vite, a build tool for modern web development.</td>
</tr>
<tr>
<td><b><a href='https://github.com/Amitrajpoot92/career-sarthi/blob/master/Frontend/package.json'>package.json</a></b></td>
<td>This file lists the project's dependencies, scripts, and other metadata.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/package.json'>index.html</a></b></td>
<td>The main HTML entry point for the frontend application.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/eslint.config.js'>eslint.config.js</a></b></td>
<td>Configuration file for ESLint, a tool for identifying and reporting on patterns in JavaScript code.</td>
</tr>
</table>
<details>
<summary><b>src</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/index.css'>index.css</a></b></td>
<td>The main CSS file for global styles in the application.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/App.css'>App.css</a></b></td>
<td>CSS file for styling the main App component.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/fonts.css'>fonts.css</a></b></td>
<td>CSS file for importing and defining custom fonts.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/App.jsx'>App.jsx</a></b></td>
<td>The main component file for the React application, which handles routing and component rendering.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/main.jsx'>main.jsx</a></b></td>
<td>The entry point for the React application, where the App component is rendered to the DOM.</td>
</tr>
</table>
<details>
<summary><b>components</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/components/RequestDemo.jsx'>RequestDemo.jsx</a></b></td>
<td>A reusable component for a demo request form.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/components/Mock.jsx'>Mock.jsx</a></b></td>
<td>A component related to the mock interview feature.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/components/NavbarMain.jsx'>NavbarMain.jsx</a></b></td>
<td>The main navigation bar component for the application.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/components/PasswordInput.jsx'>PasswordInput.jsx</a></b></td>
<td>A reusable component for a password input field.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/components/Footer.jsx'>Footer.jsx</a></b></td>
<td>The footer component of the application.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/components/AuthModal.jsx'>AuthModal.jsx</a></b></td>
<td>A component for user authentication (login/signup) modal.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/components/Resources.jsx'>Resources.jsx</a></b></td>
<td>A component for displaying career and learning resources.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/components/ChatApp.jsx'>ChatApp.jsx</a></b></td>
<td>The main component for the career guidance chatbot.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/components/ChatWidget.jsx'>ChatWidget.jsx</a></b></td>
<td>A smaller, embeddable component for the chatbot.</td>
</tr>
</table>
</blockquote>
</details>
<details>
<summary><b>pages</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/pages/ResumeGuide.jsx'>ResumeGuide.jsx</a></b></td>
<td>Page component for the resume guidance feature.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/pages/MockInterview.jsx'>MockInterview.jsx</a></b></td>
<td>Page component for the mock interview feature.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/pages/Hack.jsx'>Hack.jsx</a></b></td>
<td>Page component for the hackathon tracker.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/pages/Dashboard.jsx'>Dashboard.jsx</a></b></td>
<td>Page component for the user's dashboard.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/pages/InternshipsJobs.jsx'>InternshipsJobs.jsx</a></b></td>
<td>Page component for the internships and jobs finder.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/pages/Courses.jsx'>Courses.jsx</a></b></td>
<td>Page component for the courses and learning resources.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/pages/ChattApp.jsx'>ChattApp.jsx</a></b></td>
<td>Page component for the full chat application interface.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/pages/Home.jsx'>Home.jsx</a></b></td>
<td>The main landing page component of the application.</td>
</tr>
</table>
</blockquote>
</details>
<details>
<summary><b>context</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/src/context/AuthContext.jsx'>AuthContext.jsx</a></b></td>
<td>A React Context file for managing user authentication state across the application.</td>
</tr>
</table>
</blockquote>
</details>
</blockquote>
</details>
<details>
<summary><b>public</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/Frontend/public/_redirects'>_redirects</a></b></td>
<td>A Vercel configuration file for managing URL redirects.</td>
</tr>
</table>
</blockquote>
</details>
</blockquote>
</details>
<details> <summary><b>backend-overall</b></summary>
<blockquote>
<details>
<summary><b>Backend_resume_analyzer</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/Backend_resume_analyzer/main.py'>main.py</a></b></td>
<td>The main entry point for the resume analyzer service.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/Backend_resume_analyzer/analyze_pdf.py'>analyze_pdf.py</a></b></td>
<td>Contains logic for analyzing a PDF resume.</td>
</tr>
</table>
</blockquote>
</details>
<details>
<summary><b>Backend_Hackathon_tracker</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/Backend_Hackathon_tracker/main.py'>main.py</a></b></td>
<td>The main entry point for the hackathon tracker service.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/Backend_Hackathon_tracker/requirements.txt'>requirements.txt</a></b></td>
<td>A file that lists the Python dependencies required for the hackathon tracker service.</td>
</tr>
</table>
</blockquote>
</details>
<details>
<summary><b>backend-chatapp</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend-chatapp/chat.py'>chat.py</a></b></td>
<td>Contains the core logic for the chat application, including handling conversations.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend-chatapp/session_store.py'>session_store.py</a></b></td>
<td>Manages session data for the chatbot to maintain conversational context.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend-chatapp/app.py'>app.py</a></b></td>
<td>The main FastAPI application file for the chatbot service.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend-chatapp/requirements.txt'>requirements.txt</a></b></td>
<td>A file that lists the Python dependencies required for the chatbot service.</td>
</tr>
</table>
</blockquote>
</details>
<details>
<summary><b>backend-mock</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend-mock/interview.py'>interview.py</a></b></td>
<td>Contains the main logic for the mock interview process.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend-mock/talk.py'>talk.py</a></b></td>
<td>Handles the audio-based interaction and conversation flow for the mock interviews.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend-mock/session_store.py'>session_store.py</a></b></td>
<td>Manages session state for mock interviews, storing user and interview data.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend-mock/app.py'>app.py</a></b></td>
<td>The main FastAPI application file for the mock interview service.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend-mock/resume_parser.py'>resume_parser.py</a></b></td>
<td>Parses resume data to extract key information for mock interviews.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend-mock/requirements.txt'>requirements.txt</a></b></td>
<td>A file that lists the Python dependencies required for the mock interview service.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend-mock/prompts.py'>prompts.py</a></b></td>
<td>Contains the pre-defined prompts used for AI-powered mock interviews.</td>
</tr>
</table>
</blockquote>
</details>
<details>
<summary><b>backend_job_finder</b></summary>
<blockquote>
<table>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend_job_finder/main.py'>main.py</a></b></td>
<td>The main entry point for the job finder service.</td>
</tr>
<tr>
<td><b><a href='https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/backend-overall/backend_job_finder/requirements.txt'>requirements.txt</a></b></td>
<td>A file that lists the Python dependencies required for the job finder service.</td>
</tr>
</table>
</blockquote>
</details>
</blockquote>
</details>
</details>

---

## 🚀 Getting Started

### ☑️ Prerequisites

Ensure your system has the following installed:

- **Node.js & npm**: For the frontend.
- **Python & pip**: For the backend services.

---

### ⚙️ Installation

Install career-sarthi using one of the following methods:

**Build from source:**

1. Clone the Batbots-career-sarthi repository:
```sh
❯ git clone https://github.com/anshul4uhh/Batbots-career-sarthi/
```

2. Navigate to the project directory:
```sh
❯ cd Batbots-career-sarthi
```

3. Install the frontend dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ cd Frontend
❯ npm install
```

4. Install backend dependencies for each service:

- **Backend_Hackathon_tracker**
- **Backend_resume_analyzer**
- **backend-chatapp**
- **backend-mock**
- **backend_job_finder**

Have the .env file initialized with following API keys:

```sh
❯ LANGCHAIN_API_KEY = ""
❯ GEMINI_API_KEY = ""
❯ GCP_PROJECT_ID = ""
❯ GOOGLE_APPLICATION_CREDENTIALS = ""
```

*Create them on **LangChain** and **Google Cloud Platform**.

For each backend service, run:

**Using `pip`** 

```sh
❯ pip install -r requirements.txt
```

---

### 🤖 Usage

Run career-sarthi using the following command:

**Using `npm` for frontend** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ cd Frontend
❯ npm run dev
```

**Using `pip` for backend** 

```sh
❯ cd backend-overall/backend-chatapp
❯ uvicorn app:app --reload
```

Repeat above for each service.

---

## 🔰 Contributing

- **💬 [Join the Discussions](https://github.com/anshul4uhh/Batbots-career-sarthi/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/anshul4uhh/Batbots-career-sarthi/issues)**: Submit bugs found or log feature requests for the `career-sarthi` project.
- **💡 [Submit Pull Requests](https://github.com/anshul4uhh/Batbots-career-sarthi/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/anshul4uhh/Batbots-career-sarthi/
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

---

## 🙌 Acknowledgments

We would like to thank 

**Google Cloud** and **TechSprint Hackathon** for providing the platform and opportunity for this project.

- *Vercel*
 for free frontend hosting

- *Render*
 for backend deployments

- *Google VertexAI & Gemini APIs and TTS API*
 for AI support

Inspiration from student struggles in career navigation

---
