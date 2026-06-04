import Button from "@/src/components/ui/Button/Button";
import LightingGlow from "@/src/components/ui/LightingGlow/LightingGlow";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#05182A] w-full h-[520px] pt-6 pb-[100px] lg:h-[715px] lg:pt-0 lg:pb-0">
      {/* Desktop SVG waves - hidden on mobile */}
      <img
        src="/hero_lines.svg"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Mobile glows - hidden on desktop */}
      <div className="lg:hidden">
        {/* Left glow */}
        <div className="absolute bottom-78 -left-6 w-[136px] h-[65px]">
          <LightingGlow variant="primary"></LightingGlow>
        </div>
        {/* Right glow */}
        <div className="absolute bottom-67 -right-5 w-[147px] h-[67px]">
          <LightingGlow variant="accent"></LightingGlow>
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col px-5 lg:px-0 gap-[10px] w-full lg:gap-[23px] lg:w-[765px] lg:top-[165px] lg:left-[121px] lg:absolute">
        {/* Eyebrow */}
        <p className="font-kadwa font-normal capitalize text-accent-400 text-[20px] leading-[50px] tracking-[0.20em] lg:text-[24px]">
          Scholar Nexus
        </p>

        {/* Headline */}
        <h1 className="font-kanit font-bold capitalize text-neutral-50 text-[40px] leading-[50px] tracking-[0.05em] w-full lg:text-[48px] lg:w-[508px]">
          Join To Connect And Advance Research
        </h1>

        {/* Body */}
        <p className="font-kadwa font-normal capitalize text-neutral-100 text-[16px] leading-[30px] tracking-[0.05em] w-full lg:text-[20px]">
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
