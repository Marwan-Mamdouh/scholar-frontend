"use client";

import Badge from "@/src/components/ui/Badge/Badge";
import Card from "@/src/components/ui/Card/Card";
import CompanyIcon from "@iconify-react/mdi/company";
import FireIcon from "@iconify-react/mdi/fire";

const cards = [
  {
    badgeString: "trindeing",
    title: "lorem",
    description: "lorem ipsum dolor sit amet",
    icon: <CompanyIcon />,
    intent: "primary",
    cardAction: "browse companies",
  },
  {
    badgeString: "explore the news",
    title: "lorem",
    description: "lorem ipsum dolor sit amet",
    icon: <CompanyIcon />,
    intent: "accent",
    cardAction: "browse companies",
  },
];

const Industry = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 lg:items-start lg:pt-25 lg:pb-13.5 lg:px-30.25 gap-2.5">
      <div className="flex flex-col gap-2.5 max-w-316.25">
        <p className="font-main text-primary-200 text-h2 capitalize tracking-eyebrow">
          expolre the industry
        </p>
        <p className="font-main font-normal capitalize text-neutral-100 text-eyebrow lg:text-[24px]">
          Discover companies and find the right opportunity to start your
          career.
        </p>
      </div>
      <div className="flex flex-col justify-around mx-auto lg:flex-row gap-15 max-w-316.25 p-2.5">
        {cards.map((card, index) => (
          <Card
            key={index}
            badge={
              <Badge
                variant="solid"
                intent={card.intent as "primary" | "accent"}
                leftIcon={<FireIcon height="24" />}
              >
                {card.badgeString}
              </Badge>
            }
            icon={<CompanyIcon />}
            align="start"
            intent={card.intent as "primary" | "accent"}
            variant="outlined"
            title={card.title}
            description={card.description}
            clickable
            callToAction={"lorem"}
            className="flex-1 w-full items-start border!"
          />
        ))}
      </div>
    </div>
  );
};

export default Industry;
