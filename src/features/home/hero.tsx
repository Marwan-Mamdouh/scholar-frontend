import Button from "@/src/components/ui/Button/Button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[715px] overflow-hidden bg-[#0B1A2B]">
      {/* Background waves */}
      <img
        src="/hero_lines.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Text content */}
      <div className="relative z-10 flex flex-col gap-[23px] w-[765px] top-[165px] left-[121px]">
        {/* Eyebrow */}
        <p className="font-kanit font-normal text-[24px] leading-[50px] tracking-[0.20em] capitalize text-accent-400">
          Scholar Nexus
        </p>

        {/* Headline */}
        <h1 className="font-Kanit font-bold text-[48px] leading-[50px] tracking-[0.05em] capitalize text-neutral-50 w-[508px]">
          Join To Connect And Advance Research
        </h1>

        {/* Body */}
        <p className="font-kadwa font-normal text-[20px] leading-[30px] tracking-[0.05em] capitalize text-neutral-100 w-[765px]">
          Bringing Academia And Industry Together. Connect, Explore Projects,
          And Unlock Opportunities.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <Button intent="primary" variant="solid">
            Get Started
          </Button>
          <Button intent="primary" variant="outlined">
            Join Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
