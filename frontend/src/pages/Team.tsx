import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FolderGit2, Users, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  initials: string;
}

interface BatchTimeline {
  year: string;
  period: string;
  memberCount: number;
  projectCount: number;
  summary: string;
  accomplishments: string[];
  leadership: TeamMember[];
  core: TeamMember[];
}

const BATCH_TIMELINE: BatchTimeline[] = [
  {
    year: "2024–25",
    period: "Current Administration",
    memberCount: 65,
    projectCount: 14,
    summary:
      "A year defined by scaling student-run business ventures, expanding inter-college competitive flagships, and publishing long-form market research.",
    accomplishments: [
      "Scaled nibbl. dessert venture across campus with 14 new menu SKUs and sustained profit margins.",
      "Published 3 editions of the Ashoka Business Review and launched the Monocle research newsletter.",
      "Staged 4 flagship campus tournaments and corporate speaker panels with 500+ attendees.",
      "Expanded industry partner network to 19 sponsors and live-project collaborators.",
    ],
    leadership: [
      {
        name: "Manav Agrawal",
        role: "President",
        initials: "MA",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      },
      {
        name: "Anoushka Bajaj",
        role: "Vice President",
        initials: "AB",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
      },
    ],
    core: [
      {
        name: "Himanshi Beri",
        role: "Head of Operations",
        initials: "HB",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      },
      {
        name: "Kavya Grover",
        role: "Head of Strategy",
        initials: "KG",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80",
      },
      {
        name: "Suhani Goel",
        role: "Head of Communications",
        initials: "SG",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
      },
      {
        name: "Swastika Arora",
        role: "nibbl. Co-Lead",
        initials: "SA",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
      },
      {
        name: "Arushi Mantri",
        role: "nibbl. Co-Lead",
        initials: "AM",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
      },
      {
        name: "Aryaman Sen",
        role: "Finance Lead",
        initials: "AS",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    year: "2023–24",
    period: "Previous Administration",
    memberCount: 45,
    projectCount: 9,
    summary:
      "Focused on formalising student business research, establishing long-term corporate sponsorships, and structuring the club's 6 core verticals.",
    accomplishments: [
      "Shipped the inaugural print issue of the Ashoka Business Review.",
      "Organised the flagship speaker series featuring startup founders and industry executives.",
      "Formed foundational corporate sponsorship pipelines supporting club operations.",
    ],
    leadership: [
      {
        name: "Kabir Kedia",
        role: "President",
        initials: "KK",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
      },
      {
        name: "Manav Agrawal",
        role: "Vice President",
        initials: "MA",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      },
    ],
    core: [
      {
        name: "Anoushka Bajaj",
        role: "Head of Collaborations",
        initials: "AB",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
      },
      {
        name: "Himanshi Beri",
        role: "Head of Marketing",
        initials: "HB",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    year: "2022–23",
    period: "Founding Administration",
    memberCount: 18,
    projectCount: 5,
    summary:
      "The founding cohort that chartered ABC at Ashoka University, setting up foundational bylaws, vertical structures, and initial campus initiatives.",
    accomplishments: [
      "Chartered the club with student government and university administration.",
      "Designed the 6 core vertical frameworks governing research, marketing, and external affairs.",
      "Hosted the first campus business analysis symposium.",
    ],
    leadership: [
      {
        name: "Aarush Choudhary",
        role: "Founding President",
        initials: "AC",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
      },
      {
        name: "Kabir Kedia",
        role: "Co-Founder & VP",
        initials: "KK",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
      },
    ],
    core: [
      {
        name: "Manav Agrawal",
        role: "Founding Member",
        initials: "MA",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      },
    ],
  },
];

function MemberCard({ member, highlight = false }: { member: TeamMember; highlight?: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group flex items-center gap-3.5 rounded-xl border p-3.5 transition-all duration-200 ${
        highlight
          ? "border-primary/40 bg-card shadow-sm hover:border-primary"
          : "border-border bg-card/60 hover:border-border hover:bg-card"
      }`}
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-secondary">
        {member.image && !imgError ? (
          <img
            src={member.image}
            alt={member.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-display text-sm font-bold text-foreground/60">
            {member.initials}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {member.name}
        </p>
        <p className="truncate text-xs text-muted-foreground">{member.role}</p>
      </div>
    </div>
  );
}

export default function Team() {
  const [selectedBatch, setSelectedBatch] = useState<string>("All");

  const visibleBatches =
    selectedBatch === "All"
      ? BATCH_TIMELINE
      : BATCH_TIMELINE.filter((b) => b.year === selectedBatch);

  return (
    <>
      <PageHeader
        title="The leadership and people who built ABC."
        intro="A chronological record of student leadership, core teams, member scale, and major accomplishments across every administration."
      />

      {/* Filter Tabs */}
      <section className="container-abc pt-10">
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
          {["All", ...BATCH_TIMELINE.map((b) => b.year)].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedBatch(tab)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-fast ${
                selectedBatch === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {tab === "All" ? "All Administrations" : `Batch ${tab}`}
            </button>
          ))}
        </div>
      </section>

      {/* Timeline List */}
      <section className="container-abc py-14 md:py-20">
        <div className="space-y-16 md:space-y-24">
          {visibleBatches.map((batch) => (
            <div
              key={batch.year}
              className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-[var(--shadow-ambient)]"
            >
              {/* Batch Top Bar */}
              <Reveal y={16}>
                <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Batch {batch.year}
                      </h2>
                      <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {batch.period}
                      </span>
                    </div>
                  </div>

                  {/* Minimal Stats (Member Count & Project Count) */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3.5 py-2">
                      <Users className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-display text-sm font-bold text-foreground leading-none">
                          {batch.memberCount}
                        </p>
                        <p className="text-[0.62rem] uppercase tracking-wider text-muted-foreground mt-0.5">
                          Members
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3.5 py-2">
                      <FolderGit2 className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-display text-sm font-bold text-foreground leading-none">
                          {batch.projectCount}
                        </p>
                        <p className="text-[0.62rem] uppercase tracking-wider text-muted-foreground mt-0.5">
                          Projects
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Accomplishments Text Description */}
              <Reveal y={16} delay={0.06}>
                <div className="pt-6">
                  <p className="text-sm font-medium leading-relaxed text-foreground/80 md:text-base">
                    {batch.summary}
                  </p>

                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {batch.accomplishments.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-secondary/20 p-3 text-xs leading-relaxed text-foreground/70"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Leadership & Core Members with Images */}
              <div className="mt-8 pt-8 border-t border-border">
                {/* Executive Leadership */}
                <Reveal y={16} delay={0.1}>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Executive Leadership
                    </h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {batch.leadership.map((leader) => (
                        <MemberCard key={leader.name} member={leader} highlight />
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Core Team */}
                {batch.core.length > 0 && (
                  <Reveal y={16} delay={0.14}>
                    <div className="mt-6">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Core Team
                      </h3>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {batch.core.map((coreMember) => (
                          <MemberCard key={coreMember.name} member={coreMember} />
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Callout */}
      <section className="border-t border-border bg-card py-16">
        <div className="container-abc flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Want to join the next cohort?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Applications open every semester for student verticals and ventures.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              <Link to="/what-awaits-you">Join the club</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
