type TimelineItem = {
  id: string;
  idColor: string;
  title: string;
  description: string;
};

const timelineData: TimelineItem[] = [
  {
    id: "01",
    idColor: "text-accent-200",
    title: "Industry Connections",
    description:
      "Bridging graduates with leading companies through curated opportunities, verified profiles, and direct hiring.",
  },
  {
    id: "02",
    idColor: "text-accent-300",
    title: "Academic Research",
    description:
      "Helping researchers discover papers, supervisors, and academic networks through intelligent search tools.",
  },
  {
    id: "03",
    idColor: "text-accent-400",
    title: "Open Platform",
    description:
      "Creating one ecosystem where projects, research data, and opportunities come together seamlessly.",
  },
];

export default function Timeline() {
  return (
    <div className="max-w-4xl mx-auto ">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[59px] top-5 h-full w-[2px] bg-accent-200" />

        <div className="space-y-8">
          {timelineData.map((item) => (
            <div key={item.id} className="relative flex gap-8">
              {/* Number + Dot */}
              <div className="relative min-w-[60px] flex items-start">
                <span
                  className={`text-[40px] font-semibold leading-12 ${item.idColor}`}
                >
                  {item.id}
                </span>

                <div className="absolute right-0 top-2 translate-x-1/2">
                  <div className="w-5 h-5 rounded-full bg-accent-200" />
                </div>
              </div>

              {/* Content */}
              <div className="pb-2">
                <h3 className="text-2xl font-medium mb-2 text-primary-100">
                  {item.title}
                </h3>

                <p className="text-neutral-50 text-lg leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
