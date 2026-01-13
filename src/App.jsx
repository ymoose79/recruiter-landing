import './App.css'

function App() {
  return (
    <div className="page">
      <div className="container">
        <header className="hero">
          <nav className="top-nav">
            <div className="nav-links">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
            </div>
            <div className="nav-socials">
              <a href="mailto:justin.r.stock@gmail.com">Email</a>
              <a href="https://github.com/jrstock79" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com/in/placeholder" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="/resume.pdf">Resume</a>
            </div>
          </nav>

          <div className="hero-content">
            <p className="eyebrow">St Marys, GA · Remote-friendly</p>
            <h1>Justin R. Stock</h1>
            <h2>Application Manager / Software Developer — SaaS Ops + AWS</h2>
            <p className="tagline">
              I keep SaaS platforms reliable, shorten diagnosis time, and bring
              cost discipline to cloud operations.
            </p>
            <a className="hire-me" href="mailto:justin.r.stock@gmail.com">
              Hire me
            </a>
          </div>
        </header>

        <main className="content">
          <section className="content-section" id="about">
            <h2>About</h2>
            <h3>Proof of impact</h3>
            <ul>
              <li>
                Helped teams move from long incident hunts to faster, clearer
                diagnosis with consistent checks and notes.
              </li>
              <li>
                Steadied critical data flows by fixing weak spots and clarifying
                handoffs.
              </li>
              <li>
                Flagged avoidable cloud spend and proposed practical ways to
                reduce idle usage.
              </li>
              <li>
                Simplified secure file handoff so clients could deliver data
                without shared access.
              </li>
            </ul>
            <h3>What I do</h3>
            <p>
              I keep SaaS platforms steady and responsive when things go wrong,
              and help teams make careful improvements without disrupting
              production. My focus is support, operations, and practical
              automation that reduces manual effort.
            </p>
            <ul>
              <li>Restore service quickly and keep follow-up work calm and clear.</li>
              <li>Set up safe ways for clients to deliver files without extra access.</li>
              <li>Reduce manual work with simple scripts and repeatable checks.</li>
              <li>Improve data flow reliability through careful review and tuning.</li>
            </ul>
            <h3>How I work</h3>
            <ul>
              <li>Questions unnecessary complexity and always-on cost.</li>
              <li>Prefers simple, contained solutions over broad access.</li>
              <li>Is deliberate about permissions and operational risk.</li>
              <li>Documents decisions so others aren’t left guessing.</li>
            </ul>
            <h3>How I use AI</h3>
            <ul>
              <li>Uses AI to explore options, draft scripts, and think through issues.</li>
              <li>Looks for outside-the-box ways to save time and reduce manual effort.</li>
              <li>Treats AI as support for judgment, not a replacement for it.</li>
            </ul>
          </section>

          <section className="content-section" id="experience">
            <h2>Experience</h2>
            <p>
              [Company] — Application Manager / Software Developer — [Timeframe]
            </p>
            <p>
              Own day-to-day reliability and improvement for a SaaS platform,
              spanning application support, data pipelines, and AWS operations.
              Partner with product and engineering to keep production stable
              while shipping incremental improvements.
            </p>
            <ul>
              <li>Incident response, root-cause analysis, and durable fixes.</li>
              <li>AWS: file storage, compute, and ongoing cost reviews.</li>
              <li>SQL, CloverETL, Linux/Bash, and Tomcat service management.</li>
            </ul>
          </section>

          <section className="content-section" id="projects">
            <h2>Projects</h2>
            <div className="project-grid">
              <article className="project-card">
                <h3>Secure client file ingestion</h3>
                <p>
                  Problem: Clients needed a safe way to transfer large files
                  without exposing internal storage.
                </p>
                <p>
                  Design choice: Keep access requests separate from storage so
                  file delivery stays simple and contained.
                </p>
                <p>
                  How it works: A lightweight service issues time-limited upload
                  links after approval. Clients upload directly without account
                  access. A follow-up process validates and routes files into
                  the processing path. The goal is secure handoff, not shared
                  browsing.
                </p>
                <ul>
                  <li>Reduced exposure risk by eliminating shared credentials.</li>
                  <li>Improved intake reliability with auditable access flow.</li>
                </ul>
              </article>
              <article className="project-card">
                <h3>AWS cost optimization</h3>
                <p>
                  Problem: Idle compute was inflating monthly spend without
                  adding reliability.
                </p>
                <p>
                  Design choice: Prefer on-demand use over always-on capacity.
                </p>
                <p>
                  How it works: I mapped workloads and identified where
                  scheduled or conditional startup could cut idle time without
                  risking stability. In some cases, this remained a proposal
                  due to priority and change-risk constraints.
                </p>
                <ul>
                  <li>Clearer view of what could safely be turned off.</li>
                  <li>Documented tradeoffs between cost and reliability.</li>
                </ul>
              </article>
              <article className="project-card">
                <h3>AI-assisted Bash/CLI automation</h3>
                <p>
                  Problem: Repeated diagnostic tasks slowed incident response
                  and created inconsistent results.
                </p>
                <p>
                  Design choice: Use AI to support thinking and preparation, not
                  to replace operational judgment.
                </p>
                <p>
                  How it works: Simple CLI scripts bundle common checks and log
                  pulls. AI helps draft and refine scripts and queries, but
                  humans review and own the final runbooks.
                </p>
                <ul>
                  <li>Clearer diagnostics and fewer repetitive steps.</li>
                  <li>Better consistency in how issues are investigated.</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="content-section" id="looking-for">
            <h2>What I’m looking for</h2>
            <ul>
              <li>Roles: Application Manager, Production Support Engineer, or SaaS Ops Engineer.</li>
              <li>Environments: SaaS, production systems, AWS-based platforms.</li>
              <li>Not targeting: frontend-heavy roles or ML research.</li>
            </ul>
          </section>

          <section className="content-section" id="contact">
            <h2>Contact</h2>
            <p>
              Email: <a href="mailto:justin.r.stock@gmail.com">justin.r.stock@gmail.com</a>
            </p>
            <p>
              LinkedIn:{' '}
              <a href="https://linkedin.com/in/placeholder" target="_blank" rel="noreferrer">
                linkedin.com/in/placeholder
              </a>
            </p>
            <p>
              GitHub:{' '}
              <a href="https://github.com/jrstock79" target="_blank" rel="noreferrer">
                github.com/jrstock79
              </a>
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
