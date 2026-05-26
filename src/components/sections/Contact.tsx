// components/sections/Contact.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────

type FormState = {
  name:    string;
  email:   string;
  subject: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

// ─── Constants ────────────────────────────────────────────────────

const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".gif", ".doc", ".docx", ".txt"];
const MAX_FILES     = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024;  // 5MB

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/yourusername"      },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
  { label: "Twitter",  href: "https://twitter.com/yourusername"     },
  { label: "Email",    href: "mailto:you@youremail.com"             },
];

// ─── File Upload Zone ─────────────────────────────────────────────

function FileUploadZone({
  files,
  onAdd,
  onRemove,
}: {
  files: File[];
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
}) {
  const inputRef   = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const dropped = Array.from(e.dataTransfer.files);
      onAdd(dropped);
    },
    [onAdd]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) onAdd(Array.from(e.target.files));
    e.target.value = ""; // reset so same file can be re-added
  };

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  }

  function fileIcon(name: string): string {
    const ext = name.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext ?? "")) return "🖼️";
    if (ext === "pdf") return "📄";
    if (["doc", "docx"].includes(ext ?? "")) return "📝";
    return "📎";
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-white/40">
        Attachments
        <span className="ml-1 text-white/20">
          (optional — max {MAX_FILES} files, 5MB each)
        </span>
      </label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed px-4 py-6 text-center transition-all duration-200 ${
          dragging
            ? "border-emerald-500/60 bg-emerald-500/8"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
        } ${files.length >= MAX_FILES ? "pointer-events-none opacity-40" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          name="attachments"
          multiple
          accept={ALLOWED_EXTENSIONS.join(",")}
          onChange={handleChange}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/25">
            <path d="M10 3v10M6 7l4-4 4 4M3 14v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-sm text-white/35">
            {dragging ? "Drop files here" : "Drag & drop or click to upload"}
          </p>
          <p className="text-xs text-white/20">
            PDF, images, Word docs, text files
          </p>
        </div>
      </div>

      {/* File list */}
      <AnimatePresence>
        {files.map((file, i) => (
          <motion.div
            key={`${file.name}-${i}`}
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5"
          >
            <span className="text-base">{fileIcon(file.name)}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-white/70">{file.name}</p>
              <p className="text-xs text-white/25">{formatSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-white/25 transition-colors hover:bg-white/8 hover:text-white/70"
              aria-label="Remove file"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", subject: "", message: "",
  });
  const [files, setFiles]     = useState<File[]>([]);
  const [status, setStatus]   = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleAddFiles = (incoming: File[]) => {
    const valid: File[] = [];
    for (const file of incoming) {
      if (files.length + valid.length >= MAX_FILES) break;
      if (file.size > MAX_FILE_SIZE) {
        setErrorMsg(`${file.name} is too large (max 5MB).`);
        continue;
      }
      valid.push(file);
    }
    setFiles((prev) => [...prev, ...valid]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      // Use FormData to support file uploads
      const fd = new FormData();
      fd.append("name",    form.name);
      fd.append("email",   form.email);
      fd.append("subject", form.subject);
      fd.append("message", form.message);
      fd.append("honeypot", ""); // hidden anti-spam field

      for (const file of files) {
        fd.append("attachments", file);
      }

      const res  = await fetch("/api/contact", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setFiles([]);
    } catch {
      setErrorMsg("Network error — please try again.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/8 focus:ring-1 focus:ring-emerald-500/30";

  return (
    <section className="min-h-screen bg-[#080808] px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/30">Contact</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Get in touch</h1>
          <p className="max-w-xl text-base leading-relaxed text-white/45">
            I&apos;m open to freelance projects, full-time opportunities, and interesting conversations.
            Feel free to attach any briefs, specs, or design files.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-8 py-16 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-2xl">
                  ✓
                </div>
                <h2 className="text-xl font-bold text-white">Message sent!</h2>
                <p className="text-sm text-white/45">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Honeypot */}
                <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/>

                {/* Name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/40">
                      Name <span className="text-emerald-500">*</span>
                    </label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass}/>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/40">
                      Email <span className="text-emerald-500">*</span>
                    </label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass}/>
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/40">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" className={inputClass}/>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/40">
                    Message <span className="text-emerald-500">*</span>
                  </label>
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." className={`${inputClass} resize-none`}/>
                  <span className="text-right text-xs text-white/20">{form.message.length} / 2000</span>
                </div>

                {/* File upload */}
                <FileUploadZone
                  files={files}
                  onAdd={handleAddFiles}
                  onRemove={handleRemoveFile}
                />

                {/* Error */}
                {status === "error" && (
                  <p className="rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-400">
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="22" strokeDashoffset="10" strokeLinecap="round"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      {files.length > 0 && (
                        <span className="rounded-full bg-black/15 px-1.5 py-0.5 text-xs">
                          {files.length} file{files.length > 1 ? "s" : ""}
                        </span>
                      )}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M8.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {/* Availability */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"/>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"/>
                </span>
                <span className="text-sm font-medium text-emerald-400">Available for work</span>
              </div>
              <p className="text-sm leading-relaxed text-white/45">
                Open to freelance projects and full-time opportunities. Response time within 24 hours.
              </p>
            </div>

            {/* Socials */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/30">Find me on</p>
              <div className="flex flex-col gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition-all hover:bg-white/5 hover:text-white"
                  >
                    {s.label}
                    <span className="ml-auto text-white/20">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* What to attach info box */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/30">Attachments</p>
              <ul className="flex flex-col gap-2 text-sm text-white/40">
                <li className="flex items-center gap-2"><span>📄</span> Project briefs or specs</li>
                <li className="flex items-center gap-2"><span>🖼️</span> Design mockups or wireframes</li>
                <li className="flex items-center gap-2"><span>📝</span> Word docs or text files</li>
              </ul>
              <p className="mt-3 text-xs text-white/25">Max 3 files · 5MB each · 10MB total</p>
            </div>

            {/* Resume */}
            <a
              href="/resume.pdf"
              download="Resume.pdf"
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/4 px-5 py-4 text-sm font-medium text-white/50 transition-all hover:border-white/22 hover:bg-white/8 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download my résumé
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}