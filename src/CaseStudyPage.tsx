import { useEffect } from "react";

// ── DESIGN TOKENS ─────────────────────────────────────────────
// Shared with App.tsx — keep these in sync if you update brand colors or fonts
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

// ── TYPES ─────────────────────────────────────────────────────
// Props passed in from App.tsx when a card is clicked
type CaseStudyPageProps = {
  title: string;
  client: string;
  onBack: () => void;
};

// Shape of each content section (01–05)
type Section = {
  heading: string;
  body: string;
  highlight: string | null;
  businessValue: string | null;
  principles?: string[];
  image: { src: string; alt: string; layout: string };
};

// Shape of the full case study content object
type CaseStudyContent = {
  tagline: string;
  intro: string;
  client: string;
  role: string[];
  sections: Section[];
};

// ── CASE STUDY DATA ───────────────────────────────────────────
// Add new case studies here as additional const objects (e.g. healthcareContent)
// and add a matching condition in the component below (e.g. client === "Healthcare / Pharma")

const pumpmanufacturerContent: CaseStudyContent = {
  tagline: "Human-in-the-loop flow, AI-specific acceptance criteria and a 3-hour prototype to accelerate the pump manufacturer's marketing strategies.",
  intro: "What changes when you stop controlling every step and start orchestrating outcomes? I designed a human-in-the-loop AI system that focussed on speed, trust and insights. I learned how to test a non-deterministic system, build trust through answers and create acceptance criteria for content.",
  client: "A global industrial engineering company that develops and manufactures pumps and valves for moving fluids across sectors like water, energy, building services and industry.",
  role: [
    "Advisory role for concept and discovery workshops with clients",
    "Prototype creation via team hackathon, prompting of multi-agent system in n8n",
    "Design of test cases and testing",
  ],
  sections: [
    {
      heading: "Goal: deliver strategy faster",
      body: "The pump manufacturer's marketing team had the talent — what they lacked was time. Coordination swallowed hours, research data was spread across many sources, strategy waited. We asked: how can a multi-agent setup help the pump manufacturer move faster and think sharper so decisions don't wait on scattered docs? We framed the value challenge: faster answers, clearer evidence, tighter stakeholder agreements. We mapped every moment where the agent could move faster than the human and then we decided, deliberately, where humans needed to stay in control anyway. Speed is not the only success metric for a system people have to trust.\n\nI created the user experience and for the first time did not worry about screen design. The UX was around the perceived transparency and handoffs: what teams give to an agent, what they get back and where they jump in. Less control and processes, more orchestration.",
      highlight: null,
      businessValue: "Increase of productivity and speed, reduction of cost, higher quality through better insights and more transparency, system resilience through scalability.",
      image: { src: "/images/casecontent_ksb1.png", alt: "Multi-agent system concept diagram", layout: "single" },
    },
    {
      heading: "Speeding up our process",
      body: "Our process stayed classic: Discover, Define, Prototype, then a 3-month PoC to test adoption and quality. My focus was ensuring the user's acting capabilities and trust. Through discovery workshops, we identified moments where agents could unlock time and where humans needed to step in. These decisions aligned with responsible AI principles by prioritizing human oversight and clear accountability.\n\nWe built specialist agents on an AI workflow automation platform built on an EU-hosted LLM setup. The Researcher agent group pulled from the client's database, synthesizing what mattered. The Creative Strategist agent turned findings into actionable angles. The Communicator made decisions and communicated with the user.",
      highlight: "We managed to build the first working prototype in just 3 hours — a huge positive surprise.",
      businessValue: null,
      image: { src: "/images/casecontent_ksb2.png", alt: "Process and prototype overview", layout: "single" },
    },
    {
      heading: "Shorter loops, narrowly defined system",
      body: "Testing reframed our approach: non-determinism meant outcomes varied with small changes in prompts. To ensure safety and usability, we shifted to shorter loops with visible reasoning.\n\nWe had to rigidly contain and guardrail the agent's capabilities or they would deliver too much own interpretation and thus lower the output quality, surprisingly similar to human behaviour. Containing the agents was a design decision. We'd learned that over-interpretation erodes trust faster than a slow result does. Our adjustments ensured the system was both intuitive and aligned with user needs.",
      highlight: null,
      businessValue: null,
      image: { src: "/images/casecontent_ksb3.png", alt: "Test and iterate loop diagram", layout: "single" },
    },
    {
      heading: "Testing the content, not just the functionality",
      body: "We shifted our focus to content quality and brought marketing experts in to judge relevance and tone, ensuring outputs met real-world standards. I defined content-specific test cases. The bar here was accountability: making sure that when the system returned an answer, someone had decided what 'good enough' meant and could defend that decision.\n\nWe created AI-specific principles to guide continuous testing:",
      highlight: "Metrics and human knowledge replaced binary pass/fail tests. These decisions balanced automation with human judgement, building trust through transparency and accountability.",
      businessValue: null,
      principles: [
        "Evidence/correctness: traceable sources and confidence cues",
        "Outcome fit: alignment with strategic intent and tone",
        "Efficiency gains: measurable time saved",
        "Resilience: recoverable failures with clear handbacks",
      ],
      image: { src: "/images/casecontent_ksb4.png", alt: "Content testing framework", layout: "single" },
    },
    {
      heading: "From designer to builder: faster experiments and metrics",
      body: "Designing for non-deterministic solutions changes the design process: after the discovery phase we need to quickly start building, experiment continuously, measure what matters, and adapt workflows to real-world behaviors. The bar isn't just usability — it's safety, trust and accountability.\n\nMy key takeaways: my role as a designer is growing into the area of product building and expands my responsibilities on design projects. And measuring outcome quality is no easy task — you need to pair metrics with expert judgement to ensure fairness and relevance.",
      highlight: "And does the agent system save the pump manufacturer time? PoC outcomes informed next-phase decisions.",
      businessValue: null,
      image: { src: "/images/casecontent_ksb5.png", alt: "Agent workflow overview", layout: "single" },
    },
  ],
};

const aimarketingtoolContent: CaseStudyContent = {
  tagline: "End-to-end UX and user flow for an AI-driven internal marketing campaign creation tool — turning fragmented solutions into a scalable, research-backed product.",
  intro: "What happens when a product is built on technical possibilities but lacks understanding of its users? In this case, fragmented solutions and conflicting approaches led to misalignment. My research transformed assumptions into clarity and lay the groundwork for a scalable, AI-driven solution.",
  client: "A multinational holding healthcare company operating worldwide across Pharmaceuticals and Diagnostics.",
  role: [
    "Creation of end-to-end user flow for AI tool, UX and UI",
    "Research methodology setup",
    "Workshop design and moderation",
    "Insight analysis",
  ],
  sections: [
    {
      heading: "Unifying AI tools – but for whom exactly?",
      body: "The client was developing a range of AI tools to support internal creation of marketing materials — an image generator, a medical writing creator, and a search tool. My assignment was to merge these into one cohesive, end-to-end product.\n\nBut early into the concept work I discovered a deeper issue: the product had been shaped by technical possibilities, not user needs. Nobody had systematically asked who would use these tools, how their workflows ran, or what mental model they brought to campaign creation. The result was misalignment — across teams, approaches, and assumptions.",
      highlight: "The starting point was unclear on almost every level: How do tools come together, is user’s mental model working in “tasks” or “files”, how many users work on campaign assets, for how long...",
      businessValue: "Increase of efficiency and speed, reduction of external spending, increased impact through better targeting, system resilience through scalability and agent readiness.",
      image: { src: "/images/casecontent_aimarketingtool1.png", alt: "Fragmented AI tool landscape — starting point overview", layout: "single" },
    },
    {
      heading: "Delivering more than a flow: user discovery work",
      body: "I delivered the UX and UI design for the internal marketing campaign creation tool including two campaign briefing approaches: classical briefing form and AI supported briefing bot with conversational interface. \n\n I combined the client’s existing AI tools with a third party vendor application to create campaign material using the client’s database assets. \n\n I delivered a workshop design and facilitation focused on customer journeys, pain points and AI opportunities, insights analysis and presentation. \n\n And a Figma prototype.",
      highlight: null,
      businessValue: null,
      image: { src: "/images/casecontent_aimarketingtool2.png", alt: "Customer journey mapping workshop artifacts", layout: "single" },
    },
    {
      heading: "Turning assumptions into clarity through UX research",
      body: "I argued for offering both approaches, not choosing one. Power users with structured briefs would find the form faster. Less experienced users or those exploring campaign ideas needed the guided flow of the bot. Forcing a single path would have excluded a significant user segment.\n\nI pushed for the journey mapping workshop before any further concept work. The team wanted to move faster. I held the line: building more of the wrong thing isn't faster. The workshop reduced scope — it didn't add to it.",
      highlight: "I’d love to talk in more detail about this use case, as a lot of companies are facing this kind of challenge at present. If you would like to know more just get in touch!",
      businessValue: null,
      image: { src: "/images/casecontent_aimarketingtool3.png", alt: "UX flow and briefing interface design", layout: "single" },
    },
  ],
};

const trendsContent: CaseStudyContent = {
  tagline: "Future foresight research and communication for an asset managing company.",
  intro: "How are good business decisions made in the financial industry? Decision makers need to be aware of developments in innovation and feel secure in estimating risks. Because bad strategic decisions cost money.",
  client: "Active German asset manager offering a range of investment solutions across asset classes and regions.",
  role: [
    "Planning of research study and outcome in specified time frame",
    "Methodology setup",
    "Research content",
    "Communication and experience concept",
  ],
  sections: [
    {
      heading: "\"We care for innovation, but how to engage our employees?\"",
      body: "The asset manager had an existing tool, that should make employees aware of developments in innovation and give security in making business decisions: the Trend Explorer, an intranet website featuring editorial articles. But its content was outdated and showed solely a single perspective: technology trends.\n\nThe problem: The audience did not find it relevant and did not engage with the content. They were missing a holistic picture of evolving developments and possibly overlooked important aspects when making business decisions.",
      highlight: null,
      businessValue: "Reduction of decision blind spots, aligning leaders on mid/long-term priorities and risk trade-offs, increase of employee engagement by enabling active learning with tools.",
      image: { src: "/images/casecontent_trends1.png", alt: "Trend Explorer intranet tool — existing state", layout: "single" },
    },
    {
      heading: "How can I help Sebastian, Head of Private Client Business Department, act more innovatively while considering future developments shaped by different aspects of change?",
      body: "UI employees in strategic positions are mostly highly analytical and results-driven, prioritizing data and precision to make strategic business decisions or recommendations and maximize ROI while managing risks.\n\nThey have two core needs: confidence for a mid- to long-term view and security, their awareness of risks.",
      highlight: null,
      businessValue: null,
      image: { src: "/images/casecontent_trends2.png", alt: "User persona — UI employee in strategic position", layout: "single" },
    },
    {
      heading: "Trend research using future foresight methodology",
      body: "Exploration within the \"Design futuring\" process focuses on emerging market patterns, providing insights for possible strategy alignment.\n\nTime horizon: 10 years. The process moves through three phases: Exploration, Scenario building, and Strategy planning.",
      highlight: null,
      businessValue: null,
      image: { src: "/images/casecontent_trends3.png", alt: "Design futuring process — Exploration, Scenario building, Strategy planning", layout: "single" },
    },
    {
      heading: "\"STEEP\" – signal and horizon scanning",
      body: "Trends are more than just technology!\n\nUsing the STEEP framework — Social, Technical, Economical, Ecological, Political — signals are scanned across all dimensions of change.\n\nThe \"Verge\" framework adds an ethnological categorisation to identify trends by clustering signals according to their impact on people and society: Define, Relate, Connect, Create, Consume, Destroy.",
      highlight: null,
      businessValue: null,
      image: { src: "/images/casecontent_trends4.png", alt: "STEEP and Verge frameworks for trend identification", layout: "single" },
    },
    {
      heading: "Carve out relevant trends for the asset manager",
      body: "The identified UX trends in the financial sector offer a wide range of opportunities to create personalised, sustainable and inclusive customer experiences. By emphasising transparency, fairness and sustainability, these trends can strengthen customer trust in the long term.",
      highlight: null,
      businessValue: null,
      principles: [
        "Outcome-oriented Design",
        "Hyper-Personalisation",
        "Design for Inclusivity",
        "Eco-conscious UX",
        "Ethical UX",
      ],
      image: { src: "/images/casecontent_trends6.png", alt: "Identified UX trends for asset manager", layout: "single" },
    },
    {
      heading: "The result: Sebastian can learn and actively experience trends by experimenting with tools.",
      body: "The Trend Explorer was updated to give a holistic risk and trend assessment as a basis for innovation. To improve the learning experience and make it more tangible I developed a concept of how these trends could be explored hands-on in the UI innovation space.",
      highlight: null,
      businessValue: null,
      image: { src: "/images/casecontent_trends7.png", alt: "UI innovation space and updated Trend Explorer", layout: "single" },
    },
    {
      heading: "And I gave the asset manager an outlook how to discover future purpose and profit with a future-driven innovation process",
      body: "The future-driven innovation process moves from defining a time horizon and finding relevant trends, through identifying critical uncertainties, creating scenarios, describing possible and plausible futures, and researching other markets — to planning backwards from the future.",
      highlight: null,
      businessValue: null,
      image: { src: "/images/casecontent_trends8.png", alt: "Future-driven innovation process overview", layout: "single" },
    },
  ],
};

const EngineeringAssociationContent: CaseStudyContent = {
  tagline: "Testing an AI-supported neural search to find product opportunities",
  intro: "Scientific work requires meticulously correct information. It is not without reason that engineering researchers are very sceptical about the use of AI. But how much are they guided by their emotions when using this new technology – and how are product usage rates at risk?",
  client: "A German engineering association, network organization for the machinery and equipment manufacturing industry in Germany and Europe",
  role: [
    "Planning setup of user test as focus group interviews",
    "Interview moderation",
    "Documentation, insights discovery and reporting",
  ],
  sections: [
    {
      heading: "Context: searching scientific data sources",
      body: "I researched a database portal for the simple distribution and administration of information and research projects in Mechanical Engineering, operated by the German engineering association. The existing search is cumbersome to use and lacks quality in results. The new AI supported search for the database portal is set up as a Proof of Concept (PoC) and is based on a set of 150 research reports.",
      highlight: null,
      businessValue: "Prove the enhanced efficiency and higher quality of the new search environment to ensure the increase of the tool’s usage and ROI.",
      image: { src: "/images/casecontent_interview1.png", alt: "Neural search chat interface", layout: "single" },
    },
    {
      heading: "Digging for biases",
      body: "My assumption was: user’s emotions will play a significant role in the performance of the PoC. I therefore chose to ask questions towards these emotions BEFORE going into quality assessment to be able to take these answers into account when analysing the outcome of the interview.\n\n Qualitative questions, e.g. „Do you have any particular concerns about data protection or data security?\n\n Questions towards emotions concerning AI: „What expectations do you have of the application? How high is your confidence in AI in general?\n\n Detailed technical questions to assess the quality of the answers from a scientific perspective.",
      highlight: null,
      businessValue: null,
      image: { src: "/images/casecontent_interview2.png", alt: "Chat interface and user reactions", layout: "single" },
    },
    {
      heading: "Results: trust issues and a path forward",
      body: "The interviews revealed contrasting attitudes toward the AI tool. In the first, participants with prior negative experiences tested the tool to its limits, exposing shortcomings and raising concerns about trust and technical failures. To maintain motivation, I shifted the focus to actionable feedback and improved expectation management. \n\n In the second, participants with little AI experience were more open, emphasizing the need for control to build trust. Simpler tasks generated enthusiasm for the tool’s potential to simplify work. These diverse perspectives enabled me to deliver a comprehensive report, highlighting both challenges and authentic “WOW-moments.”",
      highlight: null,
      businessValue: null,
      image: { src: "/images/casecontent_interview3.png", alt: "Bias towards AI slop", layout: "single" },
    },
    {
      heading: "What I learned: the importance of staging",
      body: "I delivered a research report showing mixed conclusions. While some of the advantages of the tool were clearly recognisable and generated enthusiasm, the weaknesses of the tool were just as clearly identifiable. The search has since been improved and implemented into the database portal.",
      highlight: "OUTCOME: I identified trust issues and contrasted user attitudes. I shaped a path forward emphasizing control to build trust with the goal of ensuring stable usage rates.",
      businessValue: null,
      image: { src: "/images/casecontent_interview3.png", alt: "Bias towards AI slop", layout: "single" },
    },
  ],
};



// ── SHARED COMPONENTS ─────────────────────────────────────────
// Small turquoise uppercase label — used for client tags, section numbers, etc.
function SectionLabel({ children }: { children: React.ReactNode }) {
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
      }}
    >
      {children}
    </p>
  );
}

// Reusable nav button style
const navButtonStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  color: T.ink,
  fontFamily: T.body,
  fontWeight: 500,
  letterSpacing: "0.1em",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
};

// ── CASE STUDY PAGE ───────────────────────────────────────────
export default function CaseStudyPage({ title, client, onBack }: CaseStudyPageProps) {

  // Add more conditions here as new case studies are added
const isPumpManufacturer = client === "Pump Manufacturer";
const isAIMarketingTool = client === "Healthcare / Pharma";
const isTrends = client === "Asset Manager";
const isEngineeringAssociation = client === "Engineering Association";
const content = isAIMarketingTool ? aimarketingtoolContent : isTrends ? trendsContent :isEngineeringAssociation ? EngineeringAssociationContent : pumpmanufacturerContent;


  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div style={{ fontFamily: T.body, backgroundColor: T.warmWhite, color: T.ink }}>

      {/* ── NAV ───────────────────────────────────────────────
          Sticky top bar with back button and name.
          Shared visual style with main App nav. */}
      <nav
        className="w-full sticky top-0 z-50"
        style={{
          backgroundColor: T.white,
          borderBottom: `1px solid ${T.lightGrey}`,
          padding: "1rem 1.5rem",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="uppercase tracking-widest hover:opacity-60 transition-opacity duration-200"
            style={navButtonStyle}
          >
            ← Back to work
          </button>
          <span
            className="uppercase"
            style={{
              fontFamily: T.headline,
              fontWeight: 800,
              fontSize: "0.95rem",
              color: T.ink,
              letterSpacing: "0.06em",
            }}
          >
            Sandra Haugwitz
          </span>
        </div>
      </nav>

      {/* ── SECTION 1: TITLE ──────────────────────────────────
          Client tag (turquoise label) + case study title + tagline.
          Uses warmWhite background to match homepage. */}
      <div className="px-6 py-16" style={{ backgroundColor: T.warmWhite }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <SectionLabel>{client}</SectionLabel>
          <h1
            className="leading-tight"
            style={{
              fontFamily: T.headline,
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: T.ink,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {title}
          </h1>
          {(isPumpManufacturer || isAIMarketingTool || isTrends || isEngineeringAssociation) && (
            <p
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                color: "#555",
                lineHeight: 1.7,
                fontWeight: 300,
                margin: 0,
                maxWidth: "640px",
              }}
            >
              {content.tagline}
            </p>
          )}
        </div>
      </div>

      {/* ── SECTION 2: HERO IMAGE + BUSINESS VALUE OVERLAY ───
          Full-width image at 42:9 aspect ratio.
          Business value box sits bottom-right, aligned to the
          1/3 column position of the info box in Section 3 below. */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "42 / 9", overflow: "hidden" }}>
        <img
          src={isPumpManufacturer ? "/images/case2.jpg" : isTrends ? "/images/case3.jpg" : isEngineeringAssociation ? "/images/case4.jpg" : "/images/case1.jpg"}
alt={isPumpManufacturer ? "Multi-agent system prototype" : isTrends ? "Asset Manager trend research" : "Healthcare AI campaign tool"}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
        />
        {(isPumpManufacturer || isAIMarketingTool || isTrends || isEngineeringAssociation) && content.sections[0].businessValue && (
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              right: "1.5rem",
              width: "calc(33.333% - 1.5rem)",
              backgroundColor: T.ink,
              padding: "1.5rem",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <SectionLabel>Business value</SectionLabel>
            <p
              style={{
                fontFamily: T.headline,
                fontWeight: 700,
                fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                color: T.white,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {content.sections[0].businessValue}
            </p>
          </div>
        )}
      </div>

      {/* ── SECTION 3: INTRO + CLIENT/ROLE INFO BOX ──────────
          Two-column grid: intro text takes 2/3, info box takes 1/3.
          Info box has turquoise left border.
          White background to contrast with warmWhite above/below. */}
      {(isPumpManufacturer || isAIMarketingTool || isTrends || isEngineeringAssociation) && (
        <div
          className="px-6 py-16"
          style={{
            backgroundColor: T.white,
            borderTop: `1px solid ${T.lightGrey}`,
            borderBottom: `1px solid ${T.lightGrey}`,
          }}
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start trends-step4-grid">

            {/* Intro text — 2/3 width */}
            <div className="md:col-span-2">
              <p
                style={{
                  fontFamily: T.headline,
                  fontWeight: 300,
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  color: T.tq,
                  lineHeight: 1.65,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                {content.intro}
              </p>
            </div>

            {/* Client + Role info box — 1/3 width */}
            <div
              style={{
                borderLeft: `3px solid ${T.tq}`,
                paddingLeft: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Client */}
              <div className="flex flex-col gap-1">
                <span className="uppercase tracking-widest" style={{ fontSize: "0.6rem", color: T.midGrey, fontWeight: 600 }}>
                  Client
                </span>
                <span style={{ fontFamily: T.headline, fontWeight: 700, fontSize: "0.95rem", color: T.ink }}>
                  {client}
                </span>
               <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.6, margin: "0.4rem 0 0 0", fontWeight: 300 }}>
  {isPumpManufacturer
    ? "Global industrial engineering company that develops and manufactures pumps, valves, and related systems for moving fluids across sectors like water, energy, building services and industry."
    : content.client}
</p>

              </div>

              {/* Role */}
              <div className="flex flex-col gap-2">
                <span className="uppercase tracking-widest" style={{ fontSize: "0.6rem", color: T.midGrey, fontWeight: 600 }}>
                  My Role
                </span>
                {content.role.map((r, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ color: T.tq, flexShrink: 0, marginTop: "2px" }}>→</span>
                    <span style={{ fontSize: "0.85rem", color: "#444", lineHeight: 1.55 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── SECTIONS 01–05: CONTENT SECTIONS ─────────────────
          Each section has:
            - A numbered label (01, 02, ...) + heading
            - Copy and image side by side, alternating left/right per section
            - Optional: principles list (bullet points with → arrow)
            - Optional: highlight quote (turquoise left border, italic)
            - A divider line between sections (except after the last one)

          To add a new section: add an entry to pumpmanufacturerContent.sections above.
          To add a new case study: duplicate the structure and add a client condition. */}
      {(isPumpManufacturer || isAIMarketingTool || isTrends || isEngineeringAssociation) ? (
        <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col gap-24">

          {content.sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-6">

              {/* Section number + heading */}
              <div className="flex flex-col gap-3">
                <SectionLabel>0{i + 1}</SectionLabel>
                <h2
                  style={{
                    fontFamily: T.headline,
                    fontWeight: 800,
                    fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                    color: T.ink,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  {section.heading}
                </h2>
              </div>

              {/* Copy + image row — alternates: even = copy left, odd = copy right */}
{(isAIMarketingTool && i === 0) ? (
  // existing special-case (kept exactly as you have it)
  <div className="flex flex-col gap-8">
    <img
      src={section.image.src}
      alt={section.image.alt}
      loading="lazy"
  decoding="async"
      style={{ width: "100%", borderRadius: "8px", objectFit: "contain", display: "block" }}
    />
    <div className="flex flex-col gap-5">
      {section.body.split("\n\n").map((para, j) => (
        <p key={j} style={{ fontSize: "0.97rem", color: "#333", lineHeight: 1.85, margin: 0 }}>
          {para}
        </p>
      ))}
      {section.highlight && (
        <blockquote
          style={{
            margin: 0,
            padding: "0 0 0 1.25rem",
            borderLeft: `3px solid ${T.tq}`,
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "1rem",
            color: T.tq,
            lineHeight: 1.75,
          }}
        >
          {section.highlight}
        </blockquote>
      )}
    </div>
  </div>
) : (isTrends && i === 3) ? (
  // NEW special-case: Trends Step 4 = text first, then 2 images side-by-side
  <div className="flex flex-col gap-8">
    {/* Text first */}
    <div className="flex flex-col gap-5">
      {section.body.split("\n\n").map((para, j) => (
        <p key={j} style={{ fontSize: "0.97rem", color: "#333", lineHeight: 1.85, margin: 0 }}>
          {para}
        </p>
      ))}

      {section.highlight && (
        <blockquote
          style={{
            margin: 0,
            padding: "0 0 0 1.25rem",
            borderLeft: `3px solid ${T.tq}`,
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "1rem",
            color: T.tq,
            lineHeight: 1.75,
          }}
        >
          {section.highlight}
        </blockquote>
      )}
    </div>

    {/* Two images underneath */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
      }}
    >
      <img
        src="/images/casecontent_trends4.png"
        alt="STEEP and Verge frameworks for trend identification"
        style={{ width: "100%", borderRadius: "8px", objectFit: "contain", display: "block" }}
        loading="lazy"
      />
      <img
        src="/images/casecontent_trends5.png"
        alt="Identified UX trends for asset manager"
        style={{ width: "100%", borderRadius: "8px", objectFit: "contain", display: "block" }}
        loading="lazy"
      />
    </div>

  </div>
) : (
  // default alternating layout (unchanged)
  <div
    className="flex flex-col md:flex-row items-start gap-10"
    style={{ flexDirection: i % 2 === 0 ? undefined : "row-reverse" }}
  >
    <div className="flex flex-col gap-5" style={{ flex: "1 1 50%" }}>
      {section.body.split("\n\n").map((para, j) => (
        <p key={j} style={{ fontSize: "0.97rem", color: "#333", lineHeight: 1.85, margin: 0 }}>
          {para}
        </p>
      ))}
      {"principles" in section && section.principles && (
        <ul className="flex flex-col gap-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {section.principles.map((p, j) => (
            <li key={j} className="flex items-start gap-3" style={{ fontSize: "0.92rem", color: "#333", lineHeight: 1.7 }}>
              <span style={{ color: T.tq, flexShrink: 0, marginTop: "2px" }}>→</span>
              {p}
            </li>
          ))}
        </ul>
      )}
      {section.highlight && (
        <blockquote
          style={{
            margin: 0,
            padding: "0 0 0 1.25rem",
            borderLeft: `3px solid ${T.tq}`,
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "1rem",
            color: T.tq,
            lineHeight: 1.75,
          }}
        >
          {section.highlight}
        </blockquote>
      )}
    </div>
    {section.image && (
      <div style={{ flex: "1 1 50%" }}>
        <img
          src={section.image.src}
          alt={section.image.alt}
          style={{ width: "100%", borderRadius: "8px", objectFit: "contain", display: "block" }}
        />
      </div>
    )}
  </div>
)}


              {/* Divider between sections — not shown after the last one */}
              {i < content.sections.length - 1 && (
                <div style={{ width: "100%", height: "1px", backgroundColor: T.lightGrey, marginTop: "0.5rem" }} />
              )}

            </div>
          ))}

          {/* Back link at the bottom */}
          <div style={{ paddingTop: "2rem", borderTop: `1px solid ${T.lightGrey}` }}>
            <button
              onClick={onBack}
              className="uppercase tracking-widest hover:opacity-60 transition-opacity duration-200"
              style={navButtonStyle}
            >
              ← Back to work
            </button>
          </div>

        </div>

      ) : (

        /* ── PLACEHOLDER ────────────────────────────────────
            Shown for any case study where full content
            hasn't been written yet (all clients except pump manufacturer).
            Replace this with real content as each case study is written. */
        <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-6">
          <SectionLabel>{client}</SectionLabel>
          <h1
            style={{
              fontFamily: T.headline,
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              color: T.ink,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: "1rem", color: "#555", lineHeight: 1.8, fontWeight: 300 }}>
            This case study is coming soon.
          </p>
          <button
            onClick={onBack}
            className="uppercase tracking-widest hover:opacity-60 transition-opacity duration-200 w-fit mt-8"
            style={navButtonStyle}
          >
            ← Back to work
          </button>
        </div>

      )}

    </div>
  );
}
