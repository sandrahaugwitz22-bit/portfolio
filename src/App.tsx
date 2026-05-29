import { useState, useEffect, useRef } from "react";
import CaseStudyPage from "./CaseStudyPage";

// ── TOKENS ────────────────────────────────────────────────────
const T = {
  ink:       "#1A1A1A",
  warmWhite: "#FAF8F5",
  white:     "#FFFFFF",
  tq:        "#2ABFBF",
  midGrey:   "#8A8A8A",
  lightGrey: "#E8E6E3",
  headline:  "'Bricolage Grotesque', sans-serif",
  body:      "'DM Sans', sans-serif",
};

// ── SCROLL-REVEAL HOOK ────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible");
    } else {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("visible");
            obs.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }
  }, []);
  return ref;
}



// ── DATA ──────────────────────────────────────────────────────
const caseStudies = [
  {
    id: 1,
    title: "From control to conduct",
    subtitle: "How I designed a multi-agent orchestration for marketing strategies",
    client: "Pump Manufacturer",
    description:
      "Human-in-the-loop flow, AI-specific acceptance criteria and a 3-hour prototype to accelerate the pump manufacturer's marketing strategies.",
    image: "/images/case2.jpg",
    tags: ["AI Product Design", "Multi-agent UX", "Advisory"],
    metrics: [
      { value: "3 hrs", label: "First prototype" },
      { value: "3 months", label: "PoC delivered" },
    ],
  },
  {
    id: 2,
    title: "From scattered AI tools to a cohesive vision",
    subtitle: "How I knitted a user-centered flow",
    client: "Healthcare / Pharma",
    description:
      "How I knitted a user-centered flow: User discovery work and flow concept for AI-driven marketing campaign creation tool.",
    image: "/images/case1.jpg",
    tags: ["0→1 UX", "Research-led", "AI Workflow"],
    metrics: [
      { value: "2 days", label: "Saved in planning follow up" },
      { value: "Top", label: "Client NPS score" },
    ],
  },
  {
    id: 3,
    title: "How I researched UX trends to find opportunities",
    subtitle: "And let employees experience the future",
    client: "Asset Manager",
    description:
      "Future foresight research and communication for a leading asset manager — helping decision-makers engage with emerging trends and reduce strategic blind spots.",
    image: "/images/case3.jpg",
    tags: ["Foresight Research", "Strategy", "Stakeholder Alignment"],
    metrics: [
      { value: "27", label: "Trends synthesised" },
      { value: "Improved", label: "Stakeholder alignment" },
    ],
  },
  {
    id: 4,
    title: "How I planned interviews to ensure quality and found engineers affected by their emotions",
    subtitle: "And found engineers affected by their emotions",
    client: "Engineering Association",
    description:
      "User acceptance testing for an AI-supported neural search tool — uncovering trust issues and emotional biases in a sceptical engineering audience.",
    image: "/images/case4.jpg",
    tags: ["User Research", "UAT", "AI Trust"],
    metrics: [
      { value: "2", label: "Interviews conducted" },
      { value: "5", label: "Critical insights identified" },
    ],
  },
];

const principles = [
  {
    icon: "/images/principle1.png",
    title: "Be curious for the future — and design by foresight",
    body: "I design with a future-oriented mindset, using information on users, trends, data and market insights to create resilient, forward-thinking products that use latest AI tech and bring ROI.",
  },
  {
    icon: "/images/principle2.png",
    title: "Create for humans, by humans",
    body: "My experience helps me bring clarity and structure to the table. I love working in teams with strong viewpoints because only the blending of perspectives can bring most value and empathy into complex systems – and make products accessible for everyone.",
  },
  {
    icon: "/images/principle3.png",
    title: "Move fast but bring value",
    body: "One of my powers is adapting to new assignments and delivering discovery plans or product designs very swiftly. But I also believe in taking the time to create narratives around findings that inspire action. That's how I communicate the strategic value of my work and convince stakeholders.",
  },
];

const skills = [
  "End-to-end research-led UX for complex B2B products",
  "AI product design and multi-agent system UX",
  "Future foresight methodology applied to product strategy",
  "Workshop design, moderation, and stakeholder alignment",
  "External lecturing in interaction design (DHBW Ravensburg, since 2018)",
];

const readCaseCtaStyle: React.CSSProperties = {
  height: 40,
  padding: 8,
  border: `1.5px solid ${T.tq}`,
  borderRadius: 8,
  color: T.tq,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: T.body,
  fontWeight: 500,
  fontSize: "0.68rem",
  letterSpacing: "0.14em",
  lineHeight: 1,
  marginTop: "0.5rem", // optional: gives it a bit of breathing room
  width: "fit-content",      // wrap text (nice explicit signal)
  alignSelf: "flex-start",   // left-align within the flex column
};


// ── SECTION LABEL ─────────────────────────────────────────────
function SectionLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p
      className="uppercase tracking-widest"
      style={{
        fontSize: "0.68rem",
        color: T.tq,
        fontFamily: T.body,
        fontWeight: 600,
        letterSpacing: "0.14em",
        margin: 0,
        textAlign: center ? "center" : "left",
      }}
    >
      {children}
    </p>
  );
}

// ── CASE STUDY CARD ───────────────────────────────────────────
function CaseStudyCard({
  cs,
  index,
  onClick,
}: {
  cs: typeof caseStudies[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} className="reveal">
            <button
        onClick={onClick}
        className="text-left w-full group focus:outline-none"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`Read case study: ${cs.title}`}
      >
        <div
  className={`flex flex-col gap-10 md:flex-row md:items-center ${
    index % 2 === 0 ? "md:flex-row-reverse" : ""
  }`}
>

          {/* Image */}
          <div
            style={{
              flex: "1 1 50%",
              borderRadius: "8px",
              overflow: "hidden",
              outline: hovered ? `2px solid ${T.tq}` : "2px solid transparent",
              transition: "outline-color 200ms ease-in-out",
              aspectRatio: "5 / 3",
            }}
          >
            <img
              src={cs.image}
              alt={cs.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-3" style={{ flex: "1 1 50%" }}>
            <div className="flex flex-wrap items-center gap-2">
              <p
                className="uppercase tracking-widest"
                style={{ fontSize: "0.65rem", color: T.tq, fontWeight: 600, margin: 0 }}
              >
                {cs.client}
              </p>
              {cs.tags.map((tag, i) => (
                <span
                  key={i}
                  className="uppercase tracking-widest"
                  style={{
                    fontSize: "0.6rem",
                    color: T.midGrey,
                    borderLeft: `1px solid ${T.lightGrey}`,
                    paddingLeft: "0.5rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3
              className="leading-tight"
              style={{
                fontFamily: T.headline,
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)",
                color: T.ink,
                margin: 0,
              }}
            >
              {cs.title}
            </h3>

            <p
              style={{
                fontSize: "0.9rem",
                color: "#444",
                lineHeight: 1.75,
                fontFamily: T.body,
                fontWeight: 300,
                margin: 0,
              }}
            >
              {cs.description}
            </p>

            <div
              className="flex gap-8 pt-4"
              style={{ borderTop: `1px solid ${T.lightGrey}` }}
            >
              {cs.metrics.map((m, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span
                    style={{
                      fontFamily: T.headline,
                      fontWeight: 700,
                      fontSize: "1.35rem",
                      color: T.tq,
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="uppercase tracking-widest"
                    style={{ fontSize: "0.6rem", color: T.midGrey, fontFamily: T.body }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <span
  className="uppercase tracking-widest group-hover:opacity-70 transition-opacity duration-200"
  style={readCaseCtaStyle}
>
  Read case study →
</span>


          </div>
        </div>
      </button>

    </div>
  );
}


// ── APP ───────────────────────────────────────────────────────
export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const heroRef    = useReveal();
  const aboutRef   = useReveal();
  const contactRef = useReveal();

  if (selectedId !== null) {
    const selected = caseStudies.find((cs) => cs.id === selectedId)!;
    return (
<CaseStudyPage
  title={selected.title}
  client={selected.client}   // ← this line must exist
  onBack={() => setSelectedId(null)}
/>

);

  }

  const navLink: React.CSSProperties = {
    fontSize: "0.7rem",
    color: T.ink,
    fontFamily: T.body,
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  };

  return (
    <div style={{ fontFamily: T.body, backgroundColor: T.warmWhite, color: T.ink }}>

      {/* NAV */}
            <nav
        className="w-full sticky top-0 z-50"
        style={{
          backgroundColor: T.white,
          borderBottom: `1px solid ${T.lightGrey}`,
          padding: "1rem 1.5rem",
        }}
      >
        {/* DESKTOP */}
        <div className="hidden md:grid grid-cols-3 items-center max-w-6xl mx-auto">
          <div className="flex gap-8 justify-start">
            {["work", "about", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="tq-link transition-opacity duration-200 hover:opacity-60"
                style={navLink}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="transition-opacity duration-200 hover:opacity-70"
              style={{
                fontFamily: T.headline,
                fontWeight: 800,
                fontSize: "1rem",
                color: T.ink,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sandra Haugwitz
            </button>
          </div>

          <div className="flex gap-8 justify-end">
            <a
              href="https://docs.google.com/document/d/1hYQqNtR-QyrYAT_kFzo_sRm9KkfPPbv1Ndi8KoTmetY/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="tq-link transition-opacity duration-200 hover:opacity-60"
              style={navLink}
            >
              CV
            </a>
          </div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                fontFamily: T.headline,
                fontWeight: 800,
                fontSize: "0.95rem",
                color: T.ink,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sandra Haugwitz
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="flex flex-col gap-1.5 p-1"
            >
              <span className="block w-6 h-px" style={{ backgroundColor: T.ink }} />
              <span className="block w-6 h-px" style={{ backgroundColor: T.ink }} />
              <span className="block w-6 h-px" style={{ backgroundColor: T.ink }} />
            </button>
          </div>

          {menuOpen && (
            <div className="flex flex-col gap-4 mt-4 pb-2">
              {["work", "about", "contact"].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="uppercase tracking-widest text-left hover:opacity-60 transition-opacity duration-200"
                  style={navLink}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
              <a
                href="https://docs.google.com/document/d/1e4zgJwMuqX9hcVHh0THgA1942bFRD1wXZ7vZb6sJLGQ/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase tracking-widest hover:opacity-60 transition-opacity duration-200"
                style={navLink}
              >
                CV
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
<main
  className="w-full flex items-center justify-center px-6"
  style={{
    minHeight: "67vh",
    backgroundImage: "url('/images/slava-auchynnikau-NK5GSVjFqzk-unsplash.jpg')",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

        <div ref={heroRef} className="reveal max-w-2xl w-full flex flex-col gap-8 py-24">
<SectionLabel center>Senior UX & AI Product Designer · 8+ years · Munich / Remote</SectionLabel>
          <h1
            className="leading-none"
            style={{
              fontFamily: T.headline,
              fontWeight: 800,
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              color: T.ink,
              letterSpacing: "-0.02em",
              margin: 0,
              textAlign: "center",
            }}
          >
            Hi, I'm Sandra.
          </h1>

          <div style={{ width: "3rem", height: "2px", backgroundColor: T.tq, margin: "0 auto" }} />

          <p
            style={{
              fontFamily: T.body,
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              color: "#333",
              lineHeight: 1.7,
              fontWeight: 300,
              margin: 0,
              textAlign: "center",
            }}
          >
            I take on the products that need more than a designer. Complex B2B, uncharted territory — I research, augment with AI, and make the team understand with clarity what they're building better than they did before.
          </p>
        </div>
      </main>

      {/* WORK */}
      <section id="work" className="py-24 px-6" style={{ backgroundColor: T.warmWhite }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-4 mb-16">
          <SectionLabel center>Selected work</SectionLabel>
          <h2
            style={{
              fontFamily: T.headline,
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              color: T.ink,
              letterSpacing: "-0.01em",
              margin: 0,
              textAlign: "center",
            }}
          >
            What I've made recently
          </h2>
          <p
    style={{
      fontFamily: T.body,
      fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
      color: "#333",
      lineHeight: 1.7,
      fontWeight: 300,
      margin: 0,
      textAlign: "center",
      maxWidth: "560px",
      alignSelf: "center",
    }}
  >
    I move between industries and the problems are structurally similar. Cross-pollination is where insights can come from.
  </p>
        </div>

        <div className="py-8 flex flex-col gap-32 max-w-5xl mx-auto">
          {caseStudies.map((cs, index) => (
            <CaseStudyCard
              key={cs.id}
              cs={cs}
              index={index}
              onClick={() => setSelectedId(cs.id)}
            />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6" style={{ backgroundColor: T.white }}>
        <div ref={aboutRef} className="reveal max-w-3xl mx-auto flex flex-col gap-16">

          <div className="flex flex-col gap-6">
            <SectionLabel>About</SectionLabel>
            <h2
              className="leading-tight"
              style={{
                fontFamily: T.headline,
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: T.ink,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              I bring a steady hand<br />and a restless mind.
            </h2>

            <div
              className="flex flex-col gap-4"
              style={{ fontSize: "1rem", color: "#333", lineHeight: 1.8, fontWeight: 300 }}
            >
              <p style={{ margin: 0 }}>
                With over 8 years in digital product design, I've learned that what makes a
                designer truly valuable is clarity and taste. The ability to confidently make
                the right decisions, not just the safe ones. To shape a product's direction with
                both rigor and conviction.
              </p>
              <p style={{ margin: 0 }}>
                I work at the intersection of UX research, AI product design and future
                foresight. I grasp complexity quickly, bring a vision from day one, and have
                a talent for making teams suddenly understand their own product
                better. I shape and curate visual decisions based on
                research and metrics, not instinct alone.
              </p>
              <p style={{ margin: 0 }}>
                I genuinely love getting nerdy with engineers, PMs, and clients who didn't
                expect their UX designer to understand their tech stack. That's usually when
                the best work starts.
              </p>
            </div>
          </div>

          <blockquote
            style={{
              margin: 0,
              padding: "0 0 0 1.25rem",
              borderLeft: `3px solid ${T.tq}`,
              fontFamily: T.body,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              color: T.tq,
              lineHeight: 1.7,
            }}
          >
            Judgment does not live inside prompts. It is built from years of experiencing difficult settings and contradictory constraints — not
            something a model trains its way into. That might be the most defensible territory designers have: human judgment, sharpened in the real world.
          </blockquote>

          <div className="flex flex-col gap-5">
            <SectionLabel>What I bring</SectionLabel>
            <ul className="flex flex-col gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {skills.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{ fontSize: "0.95rem", color: "#333", lineHeight: 1.7 }}
                >
                  <span style={{ color: T.tq, marginTop: "3px", flexShrink: 0 }}>→</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
  <SectionLabel>My principles</SectionLabel>

  <div className="principles">
    {principles.map((p, i) => (
      <div key={i} className="principle">
        <img
          src={p.icon}
          alt=""
          className="principle__icon"
          aria-hidden="true"
        />

        <div className="principle__copy">
          <h4 className="principle__title" style={{ fontFamily: T.headline }}>
            {p.title}
          </h4>

          <p className="principle__body" style={{ fontFamily: T.body }}>
            {p.body}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6" style={{ backgroundColor: T.warmWhite }}>
        <div ref={contactRef} className="reveal max-w-3xl mx-auto flex flex-col gap-8">
          <SectionLabel>Contact</SectionLabel>
          <h2
            style={{
              fontFamily: T.headline,
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: T.ink,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Let's talk.
          </h2>

          <p style={{ fontSize: "1rem", color: "#333", lineHeight: 1.8, maxWidth: "480px", fontWeight: 300, margin: 0 }}>
            If you’re building complex B2B or AI-native products and want a senior IC who can frame the right problem and turn ambiguity into a direction, I’m always happy to connect. Even if it’s just a quick conversation.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:sandrahaugwitz22@gmail.com"
              className="tq-link uppercase tracking-widest hover:opacity-60 transition-opacity duration-200 w-fit"
              style={{ fontSize: "0.78rem", color: T.ink, fontWeight: 500 }}
            >
              → sandrahaugwitz22@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/sandra-haugwitz"
              target="_blank"
              rel="noopener noreferrer"
              className="tq-link uppercase tracking-widest hover:opacity-60 transition-opacity duration-200 w-fit"
              style={{ fontSize: "0.78rem", color: T.ink, fontWeight: 500 }}
            >
              → LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="w-full px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          borderTop: `1px solid ${T.lightGrey}`,
          fontSize: "0.68rem",
          color: T.midGrey,
          backgroundColor: T.white,
        }}
      >
        <span
          className="uppercase"
          style={{ fontFamily: T.headline, fontWeight: 800, color: T.ink, letterSpacing: "0.06em" }}
        >
          Sandra Haugwitz
        </span>
        <span className="uppercase tracking-widest">© 2026</span>
        <div className="flex gap-6">
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/sandra-haugwitz" },
            { label: "CV", href: "https://docs.google.com/document/d/1e4zgJwMuqX9hcVHh0THgA1942bFRD1wXZ7vZb6sJLGQ/edit?usp=sharing" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="tq-link uppercase tracking-widest hover:opacity-60 transition-opacity duration-200"
              style={{ color: T.midGrey }}
            >
              {label}
            </a>
          ))}
        </div>
      </footer>

    </div>
  );
}
