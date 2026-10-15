"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { contact } from "@/lib/data";

type Values = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = "This field is required";
  if (!v.email.trim()) errors.email = "This field is required";
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = "Enter a valid email address";
  if (!v.message.trim()) errors.message = "This field is required";
  return errors;
}

type FieldProps = {
  label: string;
  name: keyof Values;
  value: string;
  error?: string;
  placeholder: string;
  type?: "text" | "email";
  multiline?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function Field({
  label,
  name,
  value,
  error,
  placeholder,
  type = "text",
  multiline,
  onChange,
}: FieldProps) {
  const id = useId();
  const errId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    placeholder,
    onChange,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
    className:
      "w-full bg-transparent px-4 py-3 font-display text-sm text-white outline-none placeholder:text-white/30",
  } as const;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-sans text-xs font-semibold text-white">
        {label}
      </label>
      <div className="field-ring" data-error={error ? "true" : "false"}>
        {multiline ? (
          <textarea {...shared} rows={4} className={`${shared.className} resize-none`} />
        ) : (
          <input {...shared} type={type} autoComplete={name} />
        )}
      </div>
      {error && (
        <p id={errId} role="alert" className="mt-1 font-sans text-[0.7rem] text-[#ff5c5c]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof Values;
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (sent) setSent(false);
  };

  // No backend: a valid submission opens the visitor's mail client, pre-filled.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const subject = encodeURIComponent(`Portfolio message from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setValues({ name: "", email: "", message: "" });
  };

  const rowClass =
    "group flex items-center gap-4 font-display text-sm text-white/90 transition-colors hover:text-white";
  const iconWrap =
    "flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-neon to-electric text-white";

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:px-12">
      <div className="text-center">
        <SplitHeading text="Contact" />
      </div>

      <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <h3 className="text-gradient font-display text-3xl font-semibold md:text-4xl">
            {contact.heading}
          </h3>
          <ul className="mt-8 space-y-5">
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={rowClass}>
                <span className={iconWrap}>
                  <Phone size={18} />
                </span>
                <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-neon">
                  {contact.phone}
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={rowClass}>
                <span className={iconWrap}>
                  <Mail size={18} />
                </span>
                <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-neon">
                  {contact.email}
                </span>
              </a>
            </li>
            <li className={rowClass}>
              <span className={iconWrap}>
                <MapPin size={18} />
              </span>
              <span>{contact.location}</span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="glass space-y-5 rounded-2xl p-6 shadow-[0_30px_80px_-30px_rgba(127,0,255,0.5)] md:p-8"
        >
          <Field
            label="Name"
            name="name"
            value={values.name}
            error={errors.name}
            placeholder="Insert your name here..."
            onChange={onChange}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={values.email}
            error={errors.email}
            placeholder="Insert your email here..."
            onChange={onChange}
          />
          <Field
            label="Message"
            name="message"
            multiline
            value={values.message}
            error={errors.message}
            placeholder="How can I help?"
            onChange={onChange}
          />
          <MagneticButton type="submit" className="w-full" strength={0.12}>
            Send Message
          </MagneticButton>
          <p role="status" className="min-h-5 text-center font-sans text-xs text-neon">
            {sent ? "Opening your mail app with your message…" : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
