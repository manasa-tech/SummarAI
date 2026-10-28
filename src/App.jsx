
import { useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

export default function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const wordCount = (value) =>
    value.trim() ? value.trim().split(/\s+/).length : 0;

  async function summarize() {
    if (!text.trim()) {
      setError("Please enter some text to summarize.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");
    setCopied(false);

    try {
      const response = await fetch(`${API_URL}/api/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "The summarization request failed."
        );
      }

      setSummary(data.summary);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Please start your FastAPI server."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy. Please select and copy the summary manually.");
    }
  }

  function clearAll() {
    setText("");
    setSummary("");
    setError("");
    setCopied(false);
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#home">
          <span className="logo-icon">✦</span> Summar
          <span className="logo-accent">AI</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
        </nav>

        <span className="badge">✧ AI POWERED</span>
      </header>

      <main id="home" className="main">
        <section className="hero">
          <div className="eyebrow">
            <span>✦</span> YOUR SMART READING ASSISTANT
          </div>

          <h1>
            Less reading.
            <br />
            <span>More understanding.</span>
          </h1>

          <p>
            Transform lengthy articles, notes, and documents into
            clear, concise summaries with artificial intelligence.
          </p>

          <div className="hero-tags">
            <span>✧ Hugging Face AI</span>
            <span>⚡ Quick summaries</span>
            <span>◈ Simple and smart</span>
          </div>
        </section>

        <section className="workspace">
          <article className="panel">
            <div className="panel-heading">
              <div className="heading-group">
                <div className="heading-icon input-icon">▤</div>
                <div>
                  <h2>Your text</h2>
                  <p>Paste your article or paragraph</p>
                </div>
              </div>

              <button className="text-button" onClick={clearAll}>
                Clear all
              </button>
            </div>

            <textarea
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                setError("");
              }}
              placeholder="Start typing or paste your text here..."
              aria-label="Text to summarize"
            />

            <div className="meta">
              <span>
                Words <b>{wordCount(text)}</b>
              </span>
              <span>
                Characters <b>{text.length}</b>
              </span>
            </div>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <div className="heading-group">
                <div className="heading-icon output-icon">✧</div>
                <div>
                  <h2>Your summary</h2>
                  <p>Your AI-generated result appears here</p>
                </div>
              </div>

              <span className="result-badge">AI RESULT</span>
            </div>

            <div className={`result ${summary ? "has-result" : ""}`}>
              {loading ? (
                <div className="placeholder">
                  <div className="spinner" />
                  <h3>Creating your summary</h3>
                  <p>The AI is processing your text...</p>
                </div>
              ) : summary ? (
                <p className="summary-text">{summary}</p>
              ) : (
                <div className="placeholder">
                  <div className="sparkle">✧</div>
                  <h3>Your summary starts here</h3>
                  <p>Enter text and click the button below.</p>
                </div>
              )}
            </div>

            <div className="meta">
              <span>
                Words <b>{wordCount(summary)}</b>
              </span>
              <span>
                Characters <b>{summary.length}</b>
              </span>

              <button
                className="text-button"
                onClick={copySummary}
                disabled={!summary}
              >
                {copied ? "✓ Copied" : "▢ Copy summary"}
              </button>
            </div>
          </article>
        </section>

        {error && (
          <div className="error-box" role="alert">
            ⚠ {error}
          </div>
        )}

        <div className="action">
          <button
            className="primary-button"
            onClick={summarize}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="small-spinner" />
                Summarizing...
              </>
            ) : (
              <>✦ &nbsp; Summarize my text &nbsp; →</>
            )}
          </button>

          <p>Powered by Hugging Face Transformers</p>
        </div>

        <section id="features" className="feature-strip">
          <div className="feature">
            <span className="feature-icon">✦</span>
            <div>
              <strong>AI-powered</strong>
              <p>Intelligent text processing</p>
            </div>
          </div>

          <div className="feature">
            <span className="feature-icon">◷</span>
            <div>
              <strong>Save time</strong>
              <p>Read less, learn more</p>
            </div>
          </div>

          <div className="feature">
            <span className="feature-icon">◎</span>
            <div>
              <strong>Easy to use</strong>
              <p>Simple, clean interface</p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <span className="footer-logo">SummarAI ✦</span>
          <span>Built with React, FastAPI and Hugging Face</span>
          <span>Made for smarter reading ♡</span>
        </footer>
      </main>
    </div>
  );
}
