import { PageHeader } from "@/components/PageHeader";
import avinashRaiImage from "@/assets/avinash-rai.jpg";
import swastikaAroraImage from "@/assets/swastika-arora.jpg";
import avekaJainImage from "@/assets/aveka-jain.jpeg";
import gahanNarenImage from "@/assets/gahan-naren.jpeg";
import vaaruniSwaroopImage from "@/assets/vaaruni-swaroop.jpeg";

interface TeamMember {
  name: string;
  role: "President" | "Vice President";
  image: string;
}

const CORE_MEMBERS: TeamMember[] = [
  {
    name: "Avinash Rai",
    role: "President",
    image: avinashRaiImage,
  },
  {
    name: "Swastika Arora",
    role: "President",
    image: swastikaAroraImage,
  },
  {
    name: "Aveka Jain",
    role: "Vice President",
    image: avekaJainImage,
  },
  {
    name: "Gahan Naren",
    role: "Vice President",
    image: gahanNarenImage,
  },
  {
    name: "Vaaruni Swaroop",
    role: "Vice President",
    image: vaaruniSwaroopImage,
  },
];

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-ambient)]">
      <div className="aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h2 className="font-display text-xl font-semibold text-foreground">{member.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
      </div>
    </article>
  );
}

export default function Team() {
  const presidents = CORE_MEMBERS.filter((member) => member.role === "President");
  const vicePresidents = CORE_MEMBERS.filter((member) => member.role === "Vice President");

  return (
    <>
      <PageHeader title="ABC Core 2026-27" />

      <section className="container-abc py-14 md:py-20">
        <div className="space-y-12">
          <div>
            <h2 className="font-display text-3xl font-semibold text-foreground">Presidents</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {presidents.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold text-foreground">Vice Presidents</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {vicePresidents.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
