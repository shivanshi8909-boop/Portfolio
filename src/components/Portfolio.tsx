import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Binary,
  Braces,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Cpu,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Radio,
  Sparkles,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  ["Home", "home"], ["About", "about"], ["Education", "education"],
  ["Experience", "experience"], ["Skills", "skills"], ["Projects", "projects"],
  ["Certificates", "certificates"], ["Career Objective", "objective"], ["Contact", "contact"],
] as const;

const links = {
  github: "https://github.com/shivanshi8909-boop",
  linkedin: "https://www.linkedin.com/in/shivanshi-4a89b4390/?skipRedirect=true",
  blindStick: "https://ai2a.appinventor.mit.edu/b/46vdi",
  graphics: "https://github.com/shivanshi8909-boop/SHIVANSHI_R25EH122.git",
  certificate: "https://acrobat.adobe.com/id/urn:aaid:sc:ap:d3e4a965-5aea-40fb-b123-fde04f3bfed6",
};

function DataField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cyan = getComputedStyle(document.documentElement).getPropertyValue("--data-cyan-canvas").trim();
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationId = 0;
    let points: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(70, Math.max(32, Math.floor(width / 22)));
      points = Array.from({ length: count }, (_, index) => ({
        x: (index * 97) % width,
        y: (index * 173) % height,
        vx: ((index % 5) - 2) * 0.035,
        vy: (((index * 3) % 5) - 2) * 0.025,
        r: index % 9 === 0 ? 1.6 : 0.8,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      points.forEach((point, index) => {
        if (!reduced) {
          point.x = (point.x + point.vx + width) % width;
          point.y = (point.y + point.vy + height) % height;
        }
        context.beginPath();
        context.fillStyle = cyan || "rgba(80,220,255,.55)";
        context.globalAlpha = index % 9 === 0 ? 0.72 : 0.34;
        context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        context.fill();
        for (let j = index + 1; j < points.length; j += 1) {
          const other = points[j];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance < 135) {
            context.beginPath();
            context.globalAlpha = (1 - distance / 135) * 0.12;
            context.strokeStyle = cyan || "rgba(80,220,255,.55)";
            context.lineWidth = 0.6;
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      });
      context.globalAlpha = 1;
      frame += 1;
      if (!reduced) animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="data-field" aria-hidden="true" />;
}

function SectionHeading({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <header className="section-heading reveal">
      <span className="section-index">// {index}</span>
      <div>
        <h2>{title}</h2>
        {note ? <p>{note}</p> : null}
      </div>
      <span className="heading-line" aria-hidden="true" />
    </header>
  );
}

function IconLink({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) {
  return (
    <a className="icon-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Icon size={19} aria-hidden="true" />
    </a>
  );
}

function Navigation({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav className="nav-shell" aria-label="Main navigation">
      <button className="brand-mark" onClick={() => goTo("home")} aria-label="Go to home">S<span>.</span></button>
      <div className="nav-status"><span /> AI &amp; DS</div>
      <div className="desktop-nav">
        {navItems.map(([label, id]) => (
          <button key={id} className={active === id ? "nav-item active" : "nav-item"} onClick={() => goTo(id)}>
            {label}
          </button>
        ))}
      </div>
      <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      <div id="mobile-menu" className={open ? "mobile-nav open" : "mobile-nav"}>
        {navItems.map(([label, id], index) => (
          <button key={id} className={active === id ? "active" : ""} onClick={() => goTo(id)}>
            <span>0{index + 1}</span>{label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-core" aria-hidden="true"><BrainCircuit size={32} /></div>
      <div className="hero-content">
        <div className="signal-line hero-sequence sequence-one"><span /> SYSTEM ONLINE · BENGALURU / INDIA</div>
        <p className="hero-kicker hero-sequence sequence-two">Hello, I&apos;m</p>
        <h1 className="hero-name hero-sequence sequence-three" data-text="SHIVANSHI">SHIVANSHI</h1>
        <p className="hero-role hero-sequence sequence-four">B.Tech Artificial Intelligence &amp; Data Science Student</p>
        <div className="hero-details hero-sequence sequence-five">
          <a href="mailto:shivanshi8909@gmail.com"><Mail size={15} />shivanshi8909@gmail.com</a>
          <span><MapPin size={15} />Bengaluru, Karnataka, India</span>
        </div>
        <div className="hero-actions hero-sequence sequence-six">
          <button className="primary-action" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            View Projects <ArrowDown size={17} />
          </button>
          <button className="secondary-action" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Contact Me <ArrowUpRight size={17} />
          </button>
          <span className="action-divider" />
          <IconLink href={links.github} label="GitHub profile" icon={Github} />
          <IconLink href={links.linkedin} label="LinkedIn profile" icon={Linkedin} />
        </div>
      </div>
      <div className="hero-metric metric-left hero-sequence sequence-six"><span>FOCUS</span><strong>AI · DATA · CODE</strong></div>
      <div className="hero-metric metric-right hero-sequence sequence-six"><span>STATUS</span><strong><i /> CONTINUOUSLY LEARNING</strong></div>
      <button className="scroll-cue hero-sequence sequence-six" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} aria-label="Scroll to About">
        <span>SCROLL TO EXPLORE</span><ArrowDown size={15} />
      </button>
    </section>
  );
}

const experience = [
  { icon: Code2, text: <>Worked on academic and personal projects involving <strong>Python, C, machine learning, IoT, and application development</strong>.</> },
  { icon: Braces, text: <>Gained hands-on experience in designing, developing, testing, and documenting technical projects.</> },
  { icon: Terminal, text: <>Worked with tools and technologies such as <strong>Git, GitHub, VS Code, Antigravity and Flutter</strong></> },
  { icon: Network, text: <>Participated in collaborative project development and technical problem-solving.</> },
];

const skills = [
  { icon: Braces, title: "Programming", value: "C, Python", pos: "skill-north" },
  { icon: Code2, title: "Development", value: "Flutter basic knowledge", pos: "skill-east" },
  { icon: Radio, title: "IoT", value: "Arduino, NodeMCU, Sensors", pos: "skill-south-east" },
  { icon: Terminal, title: "Tools", value: "Git, GitHub, VS Code.", pos: "skill-south-west" },
  { icon: Sparkles, title: "Soft Skills", value: "Problem Solving, Teamwork, Communication, Creativity, Adaptability", pos: "skill-west" },
];

const projects = [
  { number: "01", category: "MACHINE LEARNING", title: "NullSpam – AI SMS Spam Detection Platform", description: "Developed an AI-based platform for detecting and categorizing spam messages using machine learning, with a backend and user dashboard.", icon: BrainCircuit },
  { number: "02", category: "IoT · ASSISTIVE TECH", title: "Smart Blind Stick – IoT-Based Assistive System", description: "Built an assistive device using NodeMCU ESP8266, HC-SR04 ultrasonic sensing, water detection, buzzer alerts, and Bluetooth communication.", icon: Radio, link: links.blindStick },
  { number: "03", category: "SECURITY · COMPUTER VISION", title: "GCS GeoVision – College Security System", description: "Worked on a security solution integrating CCTV, facial recognition, and an administrative dashboard.", icon: Network },
  { number: "04", category: "C · COMPUTER GRAPHICS", title: "2D Graphics Editor", description: "Developed a C-based graphics editor to implement fundamental computer graphics concepts and operations.", icon: Braces, link: links.graphics },
];

export function Portfolio() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    reveals.forEach((element) => revealObserver.observe(element));

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const sectionObserver = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current?.target.id) setActive(current.target.id);
    }, { rootMargin: "-30% 0px -58%", threshold: [0.05, 0.25, 0.5] });
    sections.forEach((section) => sectionObserver.observe(section));
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  return (
    <div className="portfolio-shell">
      <DataField />
      <Navigation active={active} />
      <main>
        <Hero />

        <section className="section about-section" id="about">
          <SectionHeading index="01" title="ABOUT ME" note="THE HUMAN BEHIND THE DATA" />
          <div className="about-layout">
            <div className="about-copy reveal">
              <span className="data-label">PROFILE.LOG</span>
              <p>Motivated and enthusiastic 2nd-year B.Tech Artificial Intelligence &amp; Data Science student with a strong interest in programming, artificial intelligence, machine learning, data science, and software development. Passionate about learning new technologies and applying technical knowledge to real-world problems through practical projects. A dedicated learner with good problem-solving abilities and a continuous desire to improve technical and professional skills.</p>
              <div className="profile-tags"><span>ARTIFICIAL INTELLIGENCE</span><span>DATA SCIENCE</span><span>SOFTWARE DEVELOPMENT</span></div>
            </div>
            <div className="neural-visual reveal" aria-label="Abstract neural network visualization">
              <div className="neural-ring ring-a" /><div className="neural-ring ring-b" />
              <div className="neural-center"><BrainCircuit size={50} /><span>LEARN<br />BUILD<br />EVOLVE</span></div>
              {["01", "10", "11", "AI", "DS", "C"].map((item, index) => <i key={item} className={`neural-node node-${index + 1}`}>{item}</i>)}
            </div>
          </div>
        </section>

        <section className="section education-section" id="education">
          <SectionHeading index="02" title="EDUCATION" note="LEARNING TRAJECTORY" />
          <div className="timeline">
            <div className="timeline-line" aria-hidden="true" />
            {[
              ["01", "B.Tech – Artificial Intelligence & Data Science", "REVA University, Bengaluru", "2026 – Present | 2nd Year"],
              ["02", "Pre-University / 12th Grade", "", "Year: 2024-2025| Percentage: 94.67"],
              ["03", "10th Grade", "", "Year:2022-2023 | Percentage: 95.6"],
            ].map(([number, title, place, date]) => (
              <article className="timeline-entry reveal" key={number}>
                <div className="timeline-node"><span>{number}</span></div>
                <div className="timeline-card">
                  <GraduationCap size={22} />
                  <div><h3>{title}</h3>{place ? <p>{place}</p> : null}<time>{date}</time></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <SectionHeading index="03" title="EXPERIENCE" note="ACADEMIC & PROJECT EXPERIENCE" />
          <div className="experience-grid">
            {experience.map(({ icon: Icon, text }, index) => (
              <article className="experience-module reveal" key={index}>
                <div className="module-top"><span>EXP.0{index + 1}</span><Icon size={23} /></div>
                <p>{text}</p><div className="module-scan" />
              </article>
            ))}
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <SectionHeading index="04" title="SKILLS" note="CONNECTED CAPABILITIES" />
          <div className="skills-network reveal">
            <svg viewBox="0 0 1000 570" preserveAspectRatio="none" aria-hidden="true">
              <path d="M500 285 L500 60 M500 285 L825 180 M500 285 L735 490 M500 285 L265 490 M500 285 L175 180" />
              <circle cx="500" cy="285" r="155" />
            </svg>
            <div className="skills-core"><Cpu size={38} /><strong>SKILLS</strong><span>CORE NODE</span></div>
            {skills.map(({ icon: Icon, title, value, pos }) => (
              <article className={`skill-node ${pos}`} key={title}><Icon size={20} /><div><h3>{title}</h3><p>{value}</p></div></article>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <SectionHeading index="05" title="PROJECTS" note="SELECTED SYSTEMS & EXPERIMENTS" />
          <div className="projects-list">
            {projects.map(({ number, category, title, description, icon: Icon, link }, index) => (
              <article className={`project-row reveal ${index % 2 ? "project-reverse" : ""}`} key={number}>
                <div className="project-visual">
                  <span className="project-number">{number}</span>
                  <div className="visual-grid" />
                  <div className="project-glyph"><Icon size={54} /><span>{category}</span></div>
                  <span className="corner-data">SYS_{number} / READY</span>
                </div>
                <div className="project-copy">
                  <span className="project-category">{category}</span>
                  <h3>{title}</h3><p>{description}</p>
                  {link ? <a className="project-link" href={link} target="_blank" rel="noopener noreferrer">View Project <ArrowUpRight size={17} /></a> : <span className="project-status"><CheckCircle2 size={15} /> PROJECT DOCUMENTED</span>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="certificates">
          <SectionHeading index="06" title="CERTIFICATES" note="VERIFIED LEARNING MILESTONES" />
          <div className="certificate-grid">
            <article className="certificate reveal"><Award size={30} /><span>01 / CERTIFICATE</span><h3>Wadhwani certification 2026</h3><p>2026</p></article>
            <article className="certificate reveal"><Award size={30} /><span>02 / CERTIFICATE</span><h3>Python Certification: IBM Basics of python 2026</h3><p>2026</p></article>
            <a className="certificate reveal" href={links.certificate} target="_blank" rel="noopener noreferrer"><Award size={30} /><span>03 / CERTIFICATE</span><h3>Instagram System design course:</h3><p>View certificate <ArrowUpRight size={15} /></p></a>
          </div>
        </section>

        <section className="objective-section" id="objective">
          <div className="objective-frame reveal">
            <span className="section-index">// 07 — CAREER OBJECTIVE</span>
            <Sparkles size={28} />
            <blockquote>“To build a strong career in Artificial Intelligence, Data Science, and Software Development by continuously expanding my technical knowledge, gaining practical experience, and contributing to innovative technology-driven projects.”</blockquote>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <SectionHeading index="08" title="CONTACT" note="INITIATE A CONNECTION" />
          <div className="contact-layout reveal">
            <div><span className="data-label">OPEN CHANNEL</span><h2>Let&apos;s connect<br />across the network.</h2></div>
            <div className="contact-panel">
              <h3>SHIVANSHI</h3>
              <p>B.Tech Artificial Intelligence &amp; Data Science Student</p>
              <a href="mailto:shivanshi8909@gmail.com"><Mail size={18} /><span><small>EMAIL</small>shivanshi8909@gmail.com</span></a>
              <div className="contact-detail"><MapPin size={18} /><span><small>LOCATION</small>Bengaluru, Karnataka, India</span></div>
              <div className="contact-socials"><IconLink href={links.github} label="GitHub profile" icon={Github} /><IconLink href={links.linkedin} label="LinkedIn profile" icon={Linkedin} /></div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div><strong>SHIVANSHI</strong><span>B.Tech Artificial Intelligence &amp; Data Science Student</span></div>
        <div><a href="mailto:shivanshi8909@gmail.com">shivanshi8909@gmail.com</a><span>Bengaluru, Karnataka, India</span></div>
        <div className="footer-end"><div><IconLink href={links.github} label="GitHub profile" icon={Github} /><IconLink href={links.linkedin} label="LinkedIn profile" icon={Linkedin} /></div><small>© {new Date().getFullYear()} SHIVANSHI</small></div>
      </footer>
    </div>
  );
}
