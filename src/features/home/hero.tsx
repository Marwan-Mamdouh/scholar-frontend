import Button from "@/src/components/ui/Button/Button";
import LightingGlow from "@/src/components/ui/LightingGlow/LightingGlow";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-neutral-50 w-full min-h-130 lg:min-h-screen pt-6 pb-25 lg:pt-0 lg:pb-0">
      {/* Desktop SVG waves - hidden on mobile */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute -inset-2 pointer-events-none bg-no-repeat bg-center bg-contain opacity-50"
        style={{
          backgroundImage: "url('/hero_lines.svg')",
        }}
      />
      {/* Mobile glows - hidden on desktop */}
      <div className="lg:hidden">
        {/* Left glow */}
        <div className="absolute bottom-78 -left-6 w-34 h-16.25">
          <LightingGlow
            variant="primary"
            className="blur-[90px]"
          ></LightingGlow>
        </div>
        {/* Right glow */}
        <div className="absolute bottom-67 -right-5 w-36.75 h-16.75">
          <LightingGlow variant="accent" className="blur-[90px]"></LightingGlow>
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col px-5 lg:px-0 gap-2.5 w-full lg:gap-5.75 lg:w-191.25 lg:top-41.25 lg:left-30.25 lg:absolute">
        {/* Eyebrow */}
        <p className="font-[kadwa] font-normal capitalize text-accent-400 text-[20px] leading-12.5 tracking-[0.20em] lg:text-[24px]">
          Scholar Nexus
        </p>

        {/* Headline */}
        <h1 className="font-[kanit] font-bold capitalize text-neutral-50 text-[40px] leading-12.5 tracking-[0.05em] w-full lg:text-[48px] lg:w-127">
          Join To Connect And Advance Research
        </h1>

        {/* Body */}
        <p className="font-[kadwa] font-normal capitalize text-neutral-100 text-[16px] leading-7.5 tracking-[0.05em] w-full lg:text-[20px]">
          Bringing Academia And Industry Together. Connect, Explore Projects,
          And Unlock Opportunities.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3 lg:gap-9">
          <Button intent="primary" variant="solid" size="2xl">
            Get Started
          </Button>
          <Button intent="primary" variant="outlined" size="2xl">
            Join Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
