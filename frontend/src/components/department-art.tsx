import { cn } from "@/lib/utils";

const DEPARTMENT_IMAGES: Record<string, string> = {
  finance: "/uploads/abc-images/department-finance.jpg",
  "externals-collaborations": "/uploads/abc-images/department-externals.jpg",
  "industry-collaborations": "/uploads/abc-images/department-industry.jpg",
  "learning-development": "/uploads/abc-images/department-learning.jpg",
  marketing: "/uploads/abc-images/department-marketing.jpg",
  "ashoka-business-review": "/uploads/abc-images/department-abr.jpg",
};

export function DepartmentArt({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const src = DEPARTMENT_IMAGES[slug] ?? DEPARTMENT_IMAGES.finance;

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className={cn("h-full w-full object-cover", className)}
      aria-hidden="true"
    />
  );
}
