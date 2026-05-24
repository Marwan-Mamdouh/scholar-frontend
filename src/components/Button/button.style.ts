import { ButtonIntent, ButtonVariant } from "./button.type";

interface ButtonProps {
  variant: ButtonVariant;
  intent: ButtonIntent;
}

const getButtonClasses = ({ variant, intent }: ButtonProps) => {
  const base =
    "relative group overflow-hidden  font-main  hover:from-20% hover:cursor-pointer py-1 rounded-xl flex items-center justify-center transition-all ease-in-out duration-500  ";

  const variants: Record<ButtonVariant, Record<ButtonIntent, string>> = {
    solid: {
      primary: "bg-primary-500 text-neutral-50 px-3",
      secondary: "bg-neutral-100 text-neutral-900 px-3",
      accent: "bg-accent-600 text-neutral-50 px-3",
      danger: "bg-transparent text-neutral-50 px-3",
    },
    link: {
      primary: "text-primary-500 hover:text-primary-300",
      secondary: "text-neutral-200 hover:text-neutral-100",
      accent: "text-accent-400 hover:text-accent-200",
      danger: "text-danger-300 hover:text-danger-600",
    },
    icon: {
      primary:
        "text-primary-500 hover:text-primary-200 px-1 hover:bg-[radial-gradient(circle_at_center,#B3DAF233_0%,transparent_100%)]",
      secondary:
        "text-neutral-200 hover:text-neutral-100 px-1 hover:bg-[radial-gradient(circle_at_center,#BDC3C733_0%,transparent_100%)]",
      accent:
        "text-accent-400 hover:text-accent-200 px-1 hover:bg-[radial-gradient(circle_at_center,#6FBCB733_0%,transparent_100%)]",
      danger:
        "text-danger-200 hover:text-danger-400 px-1 hover:bg-[radial-gradient(circle_at_center,#FF453833_0%,transparent_100%)]",
    },
    outlined: {
      primary:
        "border-2 border-primary-500 text-primary-500 hover:text-primary-300 hover:border-primary-300 hover:shadow-[0px_0px_10px_#8ED4FF] px-3",
      secondary:
        "border-2 border-neutral-200 text-neutral-200 hover:text-neutral-100 hover:border-neutral-100 hover:shadow-[0px_0px_10px_#BDC3C7] px-3",
      accent:
        "border-2 border-accent-400 text-accent-400 hover:text-accent-200 hover:border-accent-200 hover:shadow-[0px_0px_10px_#B9F1EC] px-3",
      danger:
        "border-2 border-danger-300 text-danger-300 hover:text-danger-400 hover:border-danger-400 hover:shadow-[0px_0px_10px_#F81506] px-3",
    },
  };
  return `${base} ${variants[variant][intent]}`;
};

export default getButtonClasses;

export const getHoverOverlay = (
  intent: ButtonIntent,
  variant: ButtonVariant,
) => {
  const overlays: Partial<Record<ButtonVariant, Record<ButtonIntent, string>>> =
    {
      solid: {
        primary: "from-primary-300 to-primary-700 ",
        secondary: "from-neutral-100 to-neutral-500",
        accent: "from-accent-300 to-accent-800",
        danger: "from-danger-400 to-danger-600",
      },
    };

  return overlays[variant]?.[intent] ?? "";
};
