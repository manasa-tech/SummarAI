# 🧠 SummarAI — AI-Powered Text Summarization

SummarAI is an AI-powered text summarization application that transforms lengthy articles, paragraphs, and text documents into concise, meaningful summaries. Built using Python and Hugging Face Transformers, it uses a pretrained BART model to identify important information and generate shorter versions of the original text.

The project aims to make information easier to understand, save reading time, and demonstrate how pretrained NLP models can be integrated into real-world applications.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation and Setup](#-installation-and-setup)
- [Running the Application](#-running-the-application)
- [Example](#-example)
- [API Endpoints](#-api-endpoints)
- [Future Enhancements](#-future-enhancements)
- [Learning Outcomes](#-learning-outcomes)
- [Limitations](#-limitations)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Reading lengthy articles, research material, and technical documents can be time-consuming. SummarAI addresses this challenge by using an AI model to produce shorter versions of text while preserving its main ideas.

The application uses **BART (`facebook/bart-large-cnn`)**, a pretrained sequence-to-sequence model available through Hugging Face.

The initial version runs the model locally, avoiding the need for a paid inference API.

The project can be extended into a complete web application with a React frontend and FastAPI backend.

---

## ✨ Features

- **Automatic Text Summarization:** Converts long text into concise summaries.
- **Pretrained AI Model:** Uses a BART model fine-tuned for summarization.
- **Local Model Inference:** Runs the model on your own machine.
- **Simple Input:** Accepts articles and paragraphs directly from the user.
- **Readable Output:** Displays the generated summary.
- **FastAPI Integration:** Supports building a REST API for the frontend.
- **React Frontend:** Can provide an interactive interface for submitting text and viewing summaries.
- **Extensible Architecture:** Can be enhanced with document uploads, summary length controls, and additional models.

---

## ⚙️ How It Works

SummarAI follows these steps:

1. **Text Input:** The user provides an article or paragraph.
2. **Tokenization:** The tokenizer converts the input text into tokens that the model can process.
3. **Model Processing:** The pretrained BART model analyzes the input.
4. **Summary Generation:** The model generates a shorter version of the input.
5. **Text Decoding:** The generated tokens are converted back into readable text.
6. **Result Display:** The summary is returned to the user.

### Workflow

```text
User Input
    |
    v
Text Preprocessing
    |
    v
Hugging Face Tokenizer
    |
    v
BART Summarization Model
    |
    v
Generated Summary
    |
    v
Display Result
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Python | Core programming language |
| Hugging Face Transformers | Access and run pretrained models |
| BART | Generate text summaries |
| PyTorch | Execute model inference |
| SentencePiece | Tokenization support |
| FastAPI | Backend API development |
| Uvicorn | Run the FastAPI application |
| React | Build the user interface |
| Vite | Frontend development server |
| Git and GitHub | Version control and project hosting |

**Note:** The initial command-line version only requires the Python summarization dependencies. FastAPI and React are used when implementing the web application.

---

## 🏗️ Project Architecture

The planned full-stack application consists of three main components.

### 1. Frontend

The React interface allows users to:
- Enter or paste text.
- Submit a summarization request.
- View the generated summary.
- Compare the original text with the summary.

### 2. Backend

The FastAPI backend:
- Receives text from the frontend.
- Validates incoming requests.
- Passes text to the summarization function.
- Returns the generated summary as JSON.

### 3. AI Model

The Hugging Face BART model:
- Tokenizes and processes the text.
- Generates a summary using pretrained language representations.
- Returns the summary to the backend.

### Architecture Diagram

```text
+--------------------------+
|     React Frontend       |
|                          |
|  Text Input and Results  |
+------------+-------------+
             |
             | HTTP POST
             v
+--------------------------+
|     FastAPI Backend      |
|                          |
|  Request Validation      |
|  Summarization Endpoint  |
+------------+-------------+
             |
             v
+--------------------------+
| Hugging Face Transformers|
|                          |
|  BART Model + Tokenizer  |
+------------+-------------+
             |
             v
+--------------------------+
|   Generated Summary     |
+--------------------------+
```

---

## 📁 Project Structure

The planned full-stack structure is:

```text
SummarAI/
│
├── backend/
│   ├── .venv/
│   ├── main.py
│   ├── summarizer.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── .gitignore
└── README.md
```

The `.venv` directory is created locally and should not be committed to GitHub.

---

## 📋 Prerequisites

Before starting, ensure you have installed:

- Python 3.10 or a compatible version supported by the installed packages.
- Node.js and npm for the React frontend.
- Visual Studio Code or another code editor.
- Git for version control.
- An internet connection for the initial model download.

The first model download may require significant disk space and can take time.

---

## 🚀 Installation and Setup

### Step 1: Clone the Repository

If the project is already on your computer, open its directory in the terminal instead.

```bash
git clone <your-repository-url>
cd SummarAI
```

Replace `<your-repository-url>` with your actual GitHub repository URL.

### Step 2: Create a Python Virtual Environment

```bash
cd backend
python -m venv .venv
```

Activate it on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### Step 3: Install Backend Dependencies

Install the core summarization packages:

```bash
python -m pip install --upgrade pip
pip install transformers torch sentencepiece
```

When adding the FastAPI backend, install:

```bash
pip install fastapi uvicorn
```

Save the installed dependencies:

```bash
pip freeze > requirements.txt
```

### Step 4: Download the Pretrained Model

The application uses:

`facebook/bart-large-cnn`

The model and tokenizer are downloaded automatically when the application first executes:

```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

model_name = "facebook/bart-large-cnn"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
```

You do not need a Hugging Face API token to download this public model under normal access conditions.

### Step 5: Run the Summarization Program

From the backend directory:

```bash
python summarizer.py
```

Paste your text when prompted. The generated summary will appear in the terminal.

---

## 💻 Running the Web Application

The command-line version can run independently. The full-stack version requires both the backend and frontend to be implemented.

### Start the Backend

Open a terminal in the backend directory, activate the virtual environment, and run:

```bash
uvicorn main:app --reload
```

The API should be available at:

```text
http://127.0.0.1:8000
```

FastAPI interactive documentation should be available at:

```text
http://127.0.0.1:8000/docs
```

### Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

**Important:** These web commands assume you have implemented `backend/main.py` with a FastAPI application and created the React frontend. They will not work until those files are present.

---

## 📝 Example

### Input

```text
Artificial intelligence is transforming many industries,
including healthcare, education, transportation, and finance.
Machine learning models can analyze large amounts of data
and identify patterns that help people make better decisions.
Natural language processing enables computers to understand
and generate human language. These technologies continue to
evolve and create new opportunities for automation and innovation.
```

### Example Summary

```text
Artificial intelligence is transforming industries through
machine learning and natural language processing, enabling
data analysis, improved decisions, automation, and innovation.
```

*The output above is illustrative. Actual summaries depend on the input and model generation settings.*

---

## 🔌 API Endpoints

The following endpoints are planned for the FastAPI web application.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check whether the backend is running |
| GET | `/api/health` | Check application health |
| POST | `/api/summarize` | Generate a summary of submitted text |

### Example Request

**Endpoint:**

```text
POST http://127.0.0.1:8000/api/summarize
```

**Request body:**

```json
{
  "text": "Enter the long article you want to summarize."
}
```

### Example Response

```json
{
  "summary": "A concise summary of the submitted article."
}
```

These endpoints describe the intended API contract. They must be implemented in `main.py` before they can be used.

---

## 🔮 Future Enhancements

Planned improvements include:

- PDF and DOCX document summarization.
- Adjustable summary length.
- Support for multiple languages.
- Summary history.
- Word and character counters.
- Copy and download summary options.
- Batch summarization.
- Model selection from Hugging Face.
- GPU acceleration where supported.
- Hosted inference using Hugging Face Inference Providers.
- Evaluation using ROUGE or other suitable metrics.
- Docker-based deployment.
- Cloud hosting.

---

## 🎓 Learning Outcomes

This project provides practical experience with:

- Pretrained transformer models.
- Natural language processing.
- Tokenization and text generation.
- Hugging Face model loading.
- PyTorch inference.
- REST API development.
- React-to-FastAPI communication.
- Model integration in a real application.
- Git and GitHub workflows.

---

## ⚠️ Limitations

- BART-large-CNN is primarily designed for English news-style summarization.
- Very long inputs may be truncated by the model's input limit.
- CPU inference may be slow on lower-powered computers.
- Generated summaries can omit details or contain inaccuracies.
- The model may not perform equally well on every document type.
- The application should not be treated as a substitute for reading critical source material.

For important information, verify the summary against the original text.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Test the application.
5. Submit a pull request.

---

## 📄 License

Choose a license before publishing the project. Check the license terms of the pretrained model and all dependencies separately.

---

## 👩‍💻 Author

**Manasa**

AI Engineering Project — SummarAI

Built to explore Hugging Face Transformers, NLP, and full-stack AI application development.

---

⭐ If you find this project useful, consider starring the repository on GitHub.
