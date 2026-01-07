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
            <p className="eyebrow">Jacksonville, FL</p>
            <h1>Justin R. Stock</h1>
            <h2>Application Manager / Software Developer</h2>
            <p className="tagline">
              I build reliable, maintainable software and help teams ship calm,
              predictable systems.
            </p>
            <a className="hire-me" href="mailto:justin.r.stock@gmail.com">
              Hire me
            </a>
          </div>
        </header>

        <main className="content">
          <section className="content-section" id="about">
            <h2>About</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              luctus dictum sapien, vitae consequat neque posuere vel. Donec
              tempus auctor turpis, at bibendum justo posuere sed.
            </p>
          </section>

          <section className="content-section" id="experience">
            <h2>Experience</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              tincidunt, risus nec luctus vehicula, sapien nulla placerat
              libero, vel pellentesque arcu velit in velit.
            </p>
          </section>

          <section className="content-section" id="projects">
            <h2>Projects</h2>
            <div className="project-grid">
              <article className="project-card">
                <h3>Platform Modernization</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  posuere quam et ligula faucibus, a cursus ipsum laoreet.
                </p>
              </article>
              <article className="project-card">
                <h3>Workflow Automation</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam consequat, nibh eget placerat lacinia, arcu sapien
                  tempor erat, at feugiat felis magna a erat.
                </p>
              </article>
              <article className="project-card">
                <h3>Observability Toolkit</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  vel sodales velit, vitae dictum nulla.
                </p>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
