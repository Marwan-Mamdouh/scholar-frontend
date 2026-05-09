import React from "react";
import Button from "./Button";
import { IoIosArrowForward } from "react-icons/io";
import CustomLink from "./CustomLink";
import IconButton from "./IconButton";

export default function Colors() {
  const colors = {
    primary: [
      { name: "100", class: "bg-primary-100" },
      { name: "200", class: "bg-primary-200" },
      { name: "300", class: "bg-primary-300" },
      { name: "400", class: "bg-primary-400" },
      { name: "500", class: "bg-primary-500" },
      { name: "600", class: "bg-primary-600" },
      { name: "700", class: "bg-primary-700" },
    ],
    Neutral: [
      { name: "50", class: "bg-neutral-50" },
      { name: "100", class: "bg-neutral-100" },
      { name: "200", class: "bg-neutral-200" },
      { name: "300", class: "bg-neutral-300" },
      { name: "400", class: "bg-neutral-400" },
      { name: "500", class: "bg-neutral-500" },
      { name: "600", class: "bg-neutral-600" },
      { name: "700", class: "bg-neutral-700" },
      { name: "800", class: "bg-neutral-800" },
      { name: "900", class: "bg-neutral-900" },
    ],
    accent: [
      { name: "100", class: "bg-accent-100" },
      { name: "200", class: "bg-accent-200" },
      { name: "300", class: "bg-accent-300" },
      { name: "400", class: "bg-accent-400" },
      { name: "600", class: "bg-accent-600" },
      { name: "700", class: "bg-accent-700" },
    ],
    danger:[
      { name: "100", class: "bg-danger-100" },
      { name: "200", class: "bg-danger-200" },
      { name: "300", class: "bg-danger-300" },
      { name: "400", class: "bg-danger-400" },
      { name: "600", class: "bg-danger-600" },
      { name: "700", class: "bg-danger-700" },
    ]
  };
  return (
    <div className="p-8 space-y-12 bg-background font-ui text-foreground">
      {/* Buttons */}
      <h2 className="text-h2-sm mb-6">Project Buttons Theme Palette</h2>
      <div className="flex flex-col gap-4">
        <h3 className="text-h4 capitalize">Buttons</h3>
        <div className="flex gap-5">
          <Button variant="primary">Primary Button</Button>
          <Button variant="accent">Accent Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="danger">Danger Button</Button>
        </div>
        <h3 className="text-h4 capitalize">Buttons with icons</h3>
        <div className="flex gap-5">
          <Button variant="primary">
            Primary Button <IoIosArrowForward />
          </Button>
          <Button variant="accent">
            Accent Button <IoIosArrowForward />
          </Button>
          <Button variant="secondary">
            Secondary Button <IoIosArrowForward />
          </Button>
          <Button variant="danger">
            Danger Button <IoIosArrowForward />
          </Button>
        </div>
      </div>
      {/* Custom Links */}
      <h2 className="text-h2-sm mb-6">Project Custom Links Theme Palette</h2>
      <div className="flex flex-col gap-4">
        <h3 className="text-h4 capitalize">Custom Links</h3>
        <div className="flex gap-5">
          <CustomLink href="/" variant="primary">Primary Button</CustomLink>
          <CustomLink href="/" variant="accent">Accent CustomLink</CustomLink>
          <CustomLink href="/" variant="secondary">Secondary CustomLink</CustomLink>
          <CustomLink href="/" variant="danger">Danger CustomLink</CustomLink>
        </div>
        <h3 className="text-h4 capitalize">Custom Links with icons</h3>
        <div className="flex gap-5">
          <CustomLink href="/" variant="primary">Primary Button <IoIosArrowForward /></CustomLink>
          <CustomLink href="/" variant="accent">Accent CustomLink <IoIosArrowForward /></CustomLink>
          <CustomLink href="/" variant="secondary">Secondary CustomLink <IoIosArrowForward /></CustomLink>
          <CustomLink href="/" variant="danger">Danger CustomLink <IoIosArrowForward /></CustomLink>
        </div>
        <h3 className="text-h4 capitalize">Custom Links with outline</h3>
        <div className="flex gap-5">
          <CustomLink href="/" variant="primary" outlined>
            Primary Button <IoIosArrowForward />
          </CustomLink>
          <CustomLink href="/" variant="accent" outlined>
            Accent Button <IoIosArrowForward />
          </CustomLink>
          <CustomLink href="/" variant="secondary" outlined>
            Secondary Button <IoIosArrowForward />
          </CustomLink>
          <CustomLink href="/" variant="danger" outlined>
            Danger Button <IoIosArrowForward />
          </CustomLink>
        </div>
      </div>
      {/* Custom Icon */}
      <h2 className="text-h2-sm mb-6">Project Custom Icon Theme Palette</h2>
      <div className="flex gap-30">
        <div className="flex flex-col gap-10">
          <h3 className="text-h4 capitalize">small icons</h3>
          <div className="flex gap-10">
            <IconButton icon={IoIosArrowForward} variant="primary" size="sm" />
            <IconButton icon={IoIosArrowForward} variant="accent" size="sm" />
            <IconButton icon={IoIosArrowForward} variant="secondary" size="sm" />
            <IconButton icon={IoIosArrowForward} variant="danger" size="sm" />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h3 className="text-h4 capitalize">medium icons</h3>
          <div className="flex gap-10">
            <IconButton icon={IoIosArrowForward} variant="primary" size="md" />
            <IconButton icon={IoIosArrowForward} variant="accent" size="md" />
            <IconButton icon={IoIosArrowForward} variant="secondary" size="md" />
            <IconButton icon={IoIosArrowForward} variant="danger" size="md" />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h3 className="text-h4 capitalize">large icons</h3>
          <div className="flex gap-10">
            <IconButton icon={IoIosArrowForward} variant="primary" size="lg" />
            <IconButton icon={IoIosArrowForward} variant="accent" size="lg" />
            <IconButton icon={IoIosArrowForward} variant="secondary" size="lg" />
            <IconButton icon={IoIosArrowForward} variant="danger" size="lg" />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h3 className="text-h4 capitalize">X large icons</h3>
          <div className="flex gap-10">
            <IconButton icon={IoIosArrowForward} variant="primary" size="xl" />
            <IconButton icon={IoIosArrowForward} variant="accent" size="xl" />
            <IconButton icon={IoIosArrowForward} variant="secondary" size="xl" />
            <IconButton icon={IoIosArrowForward} variant="danger" size="xl" />
          </div>
        </div>
      </div>
      {/* Colors */}
      <h2 className="text-h2-sm mb-6">Project Theme Palette</h2>
      <h3 className="text-h4 capitalize mb-4">primary Colors</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {colors.primary.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            <div className={`h-20 w-full rounded ${item.class}`} />
            <span className="text-caption">Primary {item.name}</span>
          </div>
        ))}
      </div>
      <h3 className="text-h4 capitalize mb-4">Neutral Colors</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {colors.Neutral.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            <div className={`h-20 w-full rounded ${item.class}`} />
            <span className="text-caption">Neutral {item.name}</span>
          </div>
        ))}
      </div>
      <h3 className="text-h4 capitalize mb-4">accent Colors</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {colors.accent.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            <div className={`h-20 w-full rounded ${item.class}`} />
            <span className="text-caption">accent {item.name}</span>
          </div>
        ))}
      </div>
      <h3 className="text-h4 capitalize mb-4">Danger Colors</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {colors.danger.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            <div className={`h-20 w-full rounded ${item.class}`} />
            <span className="text-caption">danger {item.name}</span>
          </div>
        ))}
      </div>
      {/* Special Colors Section */}
      <div className="space-y-4">
        <h3 className="text-h4">Special Utilities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-24 w-full rounded-lg border bg-white-surface" />
            <p className="text-caption">White Surface</p>
          </div>
        </div>
      </div>
    </div>
  );
}
