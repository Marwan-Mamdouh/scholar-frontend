"use client";
import Image from "next/image";
import EmailFastOutlineIcon from "@iconify-react/mdi/email-fast-outline";
import TwitterLineIcon from "@iconify-react/si/twitter-line";
// import OutlinePlaceIcon from "@iconify-react/ic/outline-place";
import { Input } from "@/src/components/ui/InputField/Input";
import Button from "@/src/components/ui/Button/Button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ContactData, ContactsList } from "./about.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "./contact.schema";

const contacts: ContactsList[] = [
  {
    icon: EmailFastOutlineIcon,
    title: "info@scholarnexus.ai",
    url: "",
  },
  {
    icon: TwitterLineIcon,
    title: "@ScholarNexus",
    url: "",
  },
  // {
  //   icon: OutlinePlaceIcon,
  //   title: "Cairo, Egypt (Global HQ)",
  //   url: "",
  // },
];

export default function Contact() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const onSubmit: SubmitHandler<ContactData> = (data) => {
    console.log(data);
  };
  return (
    <section>
      <div className="rounded-3xl bg-neutral-50/5 shadow-[0px_2px_5px_0px_#70B5DF] py-10.5 px-6 lg:px-17.5 flex flex-col gap-6 lg:flex-row">
        {/* contact list */}
        <div className="space-y-2.5">
          <Image
            src="/email.gif"
            width={115}
            height={78}
            alt="email icon"
            className=" w-29 h-19.5 flex justify-self-center  md:justify-self-start"
          />
          <h2 className="font-medium text-4xl leading-12.5 capitalize text-neutral-50 text-center md:text-start">
            Start a Conversation
          </h2>
          <p className="font-light text-base leading-6 lowercase text-neutral-100 md:max-w-120 text-center md:text-start">
            Have questions about API integration, enterprise solutions, or
            removing your data? Our team is here to help.
          </p>
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div key={index} className="flex gap-2.5 ">
                <Icon className="w-8 h-8 text-accent-400" strokeWidth={2} />
                <a href={contact.url}>
                  <span className="text-xl leading-7.5 lowercase  text-neutral-50">
                    {contact.title}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2.5 w-full lg:w-1/2"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                label="Name"
                required
                placeholder="enter your name"
                error={errors.message?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                label="Email"
                required
                placeholder="enter your email"
                error={errors.message?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                label="Message"
                required
                placeholder="Write your message here and I’ll get back to you soon."
                error={errors.message?.message}
                {...field}
              />
            )}
          />
          <Button size="2xl" className="w-full" type="submit">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}