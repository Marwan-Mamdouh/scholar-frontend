import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { FaFireFlameCurved } from "react-icons/fa6";

const industryCards = [
  {
    title: "Card Title",
    description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
    badge: "Trending",
    icon: "/Vector (2).svg",
    borderClass: "border-primary-500",
    linkClass: "text-primary-500",
    badgeClass: "bg-primary-100 text-neutral-900",
  },
  {
    title: "Card Title",
    description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
    badge: "Badge Content",
    icon: "/Vector (1).svg",
    borderClass: "border-accent-400",
    linkClass: "text-accent-400",
    badgeClass: "bg-accent-100 text-neutral-900",
  },
];

export default function IndustryExplore() {
  return (
    <section className="relative z-10 mx-auto flex h-auto lg:h-[518px] w-full max-w-[1265px] flex-col gap-[10px] bg-transparent px-5 pb-[54px] pt-[60px] sm:px-12">
      <div className="w-full">
        <div className="mb-8">
          <h2 className="font-kanit text-[28px] font-normal leading-[1.2] tracking-[0.08em] text-primary-200 sm:text-[26px]">
            Explore The Industry
          </h2>
          <p className="mt-1 max-w-[735px] font-kanit text-[24px] font-normal leading-[1.35] tracking-[0.02em] text-neutral-100 sm:text-[17px]">
            discover companies and find the right opportunity to start your
            career.
          </p>
        </div>

        <div className="grid gap-3 sm:gap-11 lg:grid-cols-2">
          {industryCards.map((card) => (
            <article
              key={card.badge}
              className={`relative flex h-[254px] w-full flex-col gap-[10px] justify-end overflow-hidden rounded-[24px] border bg-neutral-900/20 px-[33px] py-[37px] ${card.borderClass}`}
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <Image
                  src={card.icon}
                  alt=""
                  width={57}
                  height={51}
                  className="h-[51px] w-[57px]"
                  aria-hidden="true"
                />
                <span
                  className={`mt-1 inline-flex h-6 min-w-[89px] items-center justify-center gap-1 rounded-full px-3 font-kanit text-[12px] font-normal leading-none tracking-normal ${card.badgeClass}`}
                >
                  <FaFireFlameCurved className="h-3 w-3" aria-hidden="true" />
                  {card.badge}
                </span>
              </div>

              <h3 className="font-kanit text-[18px] font-normal leading-[1.2] tracking-normal text-neutral-50">
                {card.title}
              </h3>
              <p className="mt-1 max-w-[340px] font-kanit text-[15px] font-normal leading-[1.15] tracking-normal text-neutral-100 sm:max-w-none">
                {card.description}
              </p>
              <Link
                href="/jobs"
                className={`mt-3 inline-flex w-max items-center gap-1 font-kanit text-[15px] font-normal leading-none tracking-normal ${card.linkClass}`}
              >
                Browse Companies
                <FiChevronRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
