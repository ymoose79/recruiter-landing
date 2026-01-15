import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [showContactButton, setShowContactButton] = useState(false);
  const [showMobileTopbar, setShowMobileTopbar] = useState(true);
  const [showMobileBottomBar, setShowMobileBottomBar] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isSocialDrawerOpen, setIsSocialDrawerOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const rafRef = useRef(null);
  const hideBottomTimerRef = useRef(null);

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const smoothScrollTo = (targetY) => {
    if (prefersReducedMotion()) {
      window.scrollTo(0, targetY);
      return;
    }

    const start = window.scrollY;
    const distance = targetY - start;
    const baseDuration = 700;
    const duration = baseDuration * 1.3;
    let startTime = null;

    const step = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, start + distance * eased);

      if (elapsed < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const handleNavClick = (event, sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    event.preventDefault();
    setIsNavDrawerOpen(false);
    setIsSocialDrawerOpen(false);
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(targetY);
  };

  const handleTopClick = (event) => {
    event.preventDefault();
    smoothScrollTo(0);
  };

  const handleMobileTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const handleMobileContactClick = () => {
    const target = document.getElementById("contact");
    if (!target) {
      return;
    }

    const targetY = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const handleNavToggle = () => {
    setIsNavDrawerOpen((prev) => !prev);
    setIsSocialDrawerOpen(false);
  };

  const handleSocialToggle = () => {
    setIsSocialDrawerOpen((prev) => !prev);
    setIsNavDrawerOpen(false);
  };

  const handleOverlayClick = () => {
    setIsNavDrawerOpen(false);
    setIsSocialDrawerOpen(false);
  };

  useEffect(() => {
    const sections = ["about", "experience", "projects"];

    const updateVisibility = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      const isPastSection = sections.some((id) => {
        const section = document.getElementById(id);
        if (!section) {
          return false;
        }
        const sectionBottom = section.offsetTop + section.offsetHeight;
        return scrollPosition >= sectionBottom;
      });

      setShowTopButton(isPastSection);
      setShowContactButton(window.scrollY > 40);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const deadZone = 6;
    lastScrollYRef.current = window.scrollY;

    const updateScrollState = () => {
      if (rafRef.current) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const currentY = window.scrollY;
        const lastY = lastScrollYRef.current;
        const delta = currentY - lastY;
        const atTop = currentY < 12;
        const scrollingDown = delta > deadZone;
        const scrollingUp = delta < -deadZone;

        if (atTop) {
          if (hideBottomTimerRef.current) {
            window.clearTimeout(hideBottomTimerRef.current);
            hideBottomTimerRef.current = null;
          }
          setShowMobileTopbar(true);
          setShowMobileBottomBar(false);
        } else if (scrollingDown) {
          if (hideBottomTimerRef.current) {
            window.clearTimeout(hideBottomTimerRef.current);
            hideBottomTimerRef.current = null;
          }
          setShowMobileTopbar(false);
          setShowMobileBottomBar(true);
          setIsNavDrawerOpen(false);
          setIsSocialDrawerOpen(false);
        } else if (scrollingUp) {
          setShowMobileTopbar(true);
          if (!hideBottomTimerRef.current) {
            hideBottomTimerRef.current = window.setTimeout(() => {
              setShowMobileBottomBar(false);
              hideBottomTimerRef.current = null;
            }, 220);
          }
        }

        lastScrollYRef.current = currentY;
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      if (hideBottomTimerRef.current) {
        window.clearTimeout(hideBottomTimerRef.current);
        hideBottomTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const isDrawerOpen = isNavDrawerOpen || isSocialDrawerOpen;
    if (!isDrawerOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isNavDrawerOpen, isSocialDrawerOpen]);

  useEffect(() => {
    const isDrawerOpen = isNavDrawerOpen || isSocialDrawerOpen;
    if (!isDrawerOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsNavDrawerOpen(false);
        setIsSocialDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isNavDrawerOpen, isSocialDrawerOpen]);

  return (
    <div className="page">
      <div
        className={`mobile-topbar ${showMobileTopbar ? "" : "is-hidden"}`}
      >
        <button
          type="button"
          className="mobile-topbar-button"
          aria-label="Open navigation"
          aria-expanded={isNavDrawerOpen}
          onClick={handleNavToggle}
        >
          Menu
        </button>
        <span className="mobile-topbar-title">JRS</span>
        <button
          type="button"
          className="mobile-topbar-button"
          aria-label="Open social links"
          aria-expanded={isSocialDrawerOpen}
          onClick={handleSocialToggle}
        >
          Social
        </button>
      </div>
      <div
        className={`drawer-overlay ${
          isNavDrawerOpen || isSocialDrawerOpen ? "is-open" : ""
        }`}
        onClick={handleOverlayClick}
      />
      <aside
        className={`drawer drawer-left ${
          isNavDrawerOpen ? "is-open" : ""
        }`}
        aria-hidden={!isNavDrawerOpen}
      >
        <div className="drawer-content">
          <h3>Navigate</h3>
          <a href="#about" onClick={(event) => handleNavClick(event, "about")}>
            About
          </a>
          <a
            href="#experience"
            onClick={(event) => handleNavClick(event, "experience")}
          >
            Experience
          </a>
          <a
            href="#projects"
            onClick={(event) => handleNavClick(event, "projects")}
          >
            Projects
          </a>
        </div>
      </aside>
      <aside
        className={`drawer drawer-right ${
          isSocialDrawerOpen ? "is-open" : ""
        }`}
        aria-hidden={!isSocialDrawerOpen}
      >
        <div className="drawer-content">
          <h3>Social</h3>
          <a href="mailto:jrstock@duck.com">Email</a>
          <a href="https://github.com/jrstock79" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jr-stock/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="/Justin_Stock_res.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </aside>
      <div className="container">
        <header className="hero">
          <nav className="top-nav">
            <div className="nav-links">
              <a href="#about" onClick={(event) => handleNavClick(event, 'about')}>
                About
              </a>
              <a
                href="#experience"
                onClick={(event) => handleNavClick(event, 'experience')}
              >
                Experience
              </a>
              <a
                href="#projects"
                onClick={(event) => handleNavClick(event, 'projects')}
              >
                Projects
              </a>
            </div>
            <div className="nav-socials">
          <a href="mailto:jrstock@duck.com">Email</a>
          <a
            href="https://github.com/ymoose79"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jr-stock/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
              </a>
          <a href="/Justin_Stock_res.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
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
            <a className="hire-me" href="mailto:jrstock@duck.com">
              Contact me
            </a>
          </div>
        </header>

        <main className="content">
          <section className="content-section" id="about">
            <h2>About</h2>
            <h3>Proof of impact</h3>
            <ul>
              <li>
                Improved maintainability by refactoring hard-to-read JavaScript
                in data transformations.
              </li>
              <li>
                Helped customer-facing teams set accurate expectations by
                explaining issues and timelines clearly.
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
              <li>
                Restore service quickly and keep follow-up work calm and clear.
              </li>
              <li>
                Set up safe ways for clients to deliver files without extra
                access.
              </li>
              <li>
                Reduce manual work with simple scripts and repeatable checks.
              </li>
              <li>
                Improve data flow reliability through careful review and tuning.
              </li>
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
              <li>
                Uses AI to explore options, draft scripts, and think through
                issues.
              </li>
              <li>
                Looks for outside-the-box ways to save time and reduce manual
                effort.
              </li>
              <li>
                Treats AI as support for judgment, not a replacement for it.
              </li>
            </ul>
          </section>

          <section className="content-section" id="experience">
            <h2>Experience</h2>
            <p>
              epaCUBE — Application Manager / Software Developer — Aug,
              2022–Present
            </p>
            <p>
              Own day-to-day reliability and improvement for a SaaS platform,
              spanning application support, data pipelines, and AWS operations.
              Partner with product and engineering to keep production stable
              while shipping incremental improvements.
            </p>
            <ul>
              <li>
                Incident response, root-cause analysis, and durable fixes.
              </li>
              <li>AWS: file storage, compute, and ongoing cost reviews.</li>
              <li>
                SQL, CloverETL, Linux/Bash, and Tomcat service management.
              </li>
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
                  <li>
                    Reduced exposure risk by eliminating shared credentials.
                  </li>
                  <li>
                    Improved intake reliability with auditable access flow.
                  </li>
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
                  risking stability. In some cases, this remained a proposal due
                  to priority and change-risk constraints.
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
              <li>
                Roles: Application Manager, Production Support Engineer, or SaaS
                Ops Engineer.
              </li>
              <li>
                Environments: SaaS, production systems, AWS-based platforms.
              </li>
              <li>Not targeting: frontend-heavy roles or ML research.</li>
            </ul>
          </section>

          <section className="content-section" id="contact">
            <h2>Contact</h2>
            <p>
              Email:{" "}
              <a href="mailto:jrstock@duck.com">
                jrstock@duck.com
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/jr-stock/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/jr-stock
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/ymoose79"
                target="_blank"
                rel="noreferrer"
              >
                github.com/ymoose79
              </a>
            </p>
          </section>
        </main>
      </div>
      <div className="floating-actions">
        <a
          className={`floating-button contact-button ${
            showContactButton ? "" : "is-hidden"
          }`}
          href="mailto:jrstock@duck.com"
        >
          Contact me
        </a>
        <button
          className={`floating-button top-button ${
            showTopButton ? "" : "is-hidden"
          }`}
          type="button"
          onClick={handleTopClick}
        >
          Up Top
        </button>
      </div>
      <div
        className={`mobile-bottom-bar ${
          showMobileBottomBar ? "" : "is-hidden"
        }`}
      >
        <button
          type="button"
          className="mobile-bottom-button"
          onClick={handleMobileTopClick}
        >
          Up Top
        </button>
        <button
          type="button"
          className="mobile-bottom-button"
          onClick={handleMobileContactClick}
        >
          Contact Me
        </button>
      </div>
    </div>
  );
}

export default App;
