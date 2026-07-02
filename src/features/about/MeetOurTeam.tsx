import Button from "@/src/components/ui/Button/Button";

export default function MeetOurTeam() {
  return (
    <section>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <div className="tracking-wide">
          <span className="font-normal text-base leading-5 capitalize text-accent-300">
            The people behind it
          </span>
          <h2 className=" text-4xl lg:text-5xl capitalize font-semibold  leading-10 text-neutral-50 mb-2">
            Meet our <span className="text-accent-400">teams</span>
          </h2>
          <p className="text-neutral-100 text-lg max-w-2xl">
            Three specialized teams. One shared mission — bridging academia,
            industry, and the web.
          </p>
        </div>
        <div className="text-center grid grid-cols-2 gap-5">
          <div className="border border-accent-300 rounded-xl p-2.5 bg-linear-to-b from-primary-300/30 to-accent-400/10">
            <p className="text-[32px] text-neutral-50 font-normal tracking-wider">
              3
            </p>
            <p className="text-2xl text-accent-300 font-normal tracking-wider capitalize">
              Teams
            </p>
          </div>
          <div className="border border-accent-300 rounded-xl p-2.5 bg-linear-to-b from-primary-300/30 to-accent-400/10">
            <p className="text-[32px] text-neutral-50 font-normal tracking-wider">
              17
            </p>
            <p className="text-2xl text-accent-300 font-normal tracking-wider capitalize">
              Members
            </p>
          </div>
          <div className="col-span-2">
            <Button
              variant="outlined"
              intent="accent"
              size="2xl"
              className="w-full"
            >
              Join the Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
