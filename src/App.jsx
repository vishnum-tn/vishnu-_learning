import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Github, Linkedin, Instagram, Mail,
  ExternalLink, Code2, Brain, Server, Sparkles,
  Rocket, Zap, ChevronDown, Menu, X
} from "lucide-react";

// ── data ────────────────────────────────────────────────────────────────────

const navLinks = ["Skills", "Projects", "Contact"];

const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "4+", label: "Tech Domains" },
  { value: "100%", label: "Dedication" },
];

const skills = [
  { name: "Python", level: 82, icon: Code2, color: "from-blue-500 to-cyan-500" },
  { name: "Java Backend", level: 68, icon: Server, color: "from-cyan-500 to-teal-500" },
  { name: "HTML / CSS / JS", level: 86, icon: Code2, color: "from-sky-500 to-blue-500" },
  { name: "AI / Gen AI", level: 74, icon: Brain, color: "from-teal-500 to-emerald-500" },
];

const projects = [
  {
    title: "Snake Game",
    desc: "Classic snake game with game loops, collision logic and score tracking.",
    tech: ["Python", "Pygame"],
    github: "https://github.com",
    live: "https://example.com",
    color: "from-blue-600 to-cyan-600",
  },
  {
    title: "AI Chatbot",
    desc: "Intent-based chatbot with clean chat UI and smart responses.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com",
    live: "https://example.com",
    color: "from-cyan-600 to-teal-600",
  },
  {
    title: "AI Product (Soon)",
    desc: "A serious AI-powered product focused on solving real-world problems.",
    tech: ["Gen AI", "React", "API"],
    github: "https://github.com",
    live: "https://example.com",
    color: "from-teal-600 to-sky-600",
  },
];

// ── tiny helpers ─────────────────────────────────────────────────────────────

function AnimatedCounter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 50;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.floor((frame / total) * end));
      if (frame >= total) { setCount(end); clearInterval(timer); }
    }, 20);
    return () => clearInterval(timer);
  }, [started, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── main component ────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 25 });

  return (
    <div className="min-h-screen bg-[#0a1210] text-white overflow-x-hidden">
      {/* scroll progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
        style={{ scaleX, background: "linear-gradient(90deg,#06b6d4,#14b8a6,#0ea5e9,#0d9488)" }} />

      {/* grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: "linear-gradient(rgba(6,182,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,.04) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a1210]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.a href="#home" className="flex items-center gap-2 text-lg font-bold"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-xs font-black">V</span>
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Vishnu</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            {navLinks.map((n, i) => (
              <motion.a key={n} href={`#${n.toLowerCase()}`}
                className="relative hover:text-white transition-colors"
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} whileHover={{ y: -2 }}>
                {n}
                <motion.span className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-cyan-500 to-teal-500"
                  initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.25 }} />
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.a href="mailto:vishnums775@gmail.com"
              className="rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,.5)" }}
              whileTap={{ scale: 0.95 }}>
              Hire Me
            </motion.a>
          </div>

          <button className="md:hidden text-slate-300" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div className="md:hidden border-t border-white/5 bg-[#0a1210] px-6 py-4 space-y-3"
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}>
              {navLinks.map((n) => (
                <a key={n} href={`#${n.toLowerCase()}`} className="block text-slate-300 hover:text-white py-1"
                  onClick={() => setMenuOpen(false)}>{n}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 min-h-[92vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* left */}
          <div>
            <motion.div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, boxShadow: ["0 0 0 0 rgba(6,182,212,0)", "0 0 0 12px rgba(6,182,212,.1)", "0 0 0 0 rgba(6,182,212,0)"] }}
              transition={{ duration: 1.5, repeat: Infinity }}>
              <Sparkles className="h-4 w-4" />
              Trusted learner &amp; AI enthusiast
            </motion.div>

            <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <span className="text-white">Build The</span><br />
              <span className="text-white">Future</span><br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% auto", animation: "gradShift 4s linear infinite" }}>
                With Code.
              </span>
            </motion.h1>

            <motion.p className="mt-6 max-w-lg text-slate-400 text-lg leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Student developer &amp; AI engineer building real projects from scratch.
              Focused on mastering fundamentals and creating technology that matters.
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <motion.a href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/40"
                whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(6,182,212,.6)" }}
                whileTap={{ scale: 0.95 }}>
                <Rocket className="h-4 w-4" /> View Projects
              </motion.a>
              <motion.a href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur"
                whileHover={{ scale: 1.06, borderColor: "rgba(6,182,212,.6)", backgroundColor: "rgba(6,182,212,.12)" }}
                whileTap={{ scale: 0.95 }}>
                Contact Me <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>

            {/* stats row */}
            <motion.div className="mt-12 flex gap-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              {stats.map((s, i) => (
                <div key={s.label}>
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    {s.value.replace(/\d+/, "")==="+" ? <><AnimatedCounter end={parseInt(s.value)} suffix="+" /></> :
                      s.value.includes("%") ? <><AnimatedCounter end={parseInt(s.value)} suffix="%" /></> : s.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* right — mock dashboard card */}
          <motion.div className="relative hidden lg:block"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d1a16] to-[#0e1d18] p-6 shadow-2xl shadow-cyan-900/40">
              {/* fake window bar */}
              <div className="flex items-center gap-2 mb-5">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 flex-1 h-5 rounded bg-white/5 text-[10px] text-slate-500 flex items-center px-2">vishnu.dev/portfolio</span>
              </div>
              {/* fake code lines */}
              {[
                { w: "w-3/4", c: "bg-cyan-500/60" },
                { w: "w-1/2", c: "bg-teal-500/40" },
                { w: "w-5/6", c: "bg-blue-500/50" },
                { w: "w-2/3", c: "bg-sky-500/40" },
                { w: "w-3/5", c: "bg-emerald-500/40" },
                { w: "w-4/5", c: "bg-cyan-500/30" },
                { w: "w-1/3", c: "bg-teal-500/50" },
              ].map((l, i) => (
                <motion.div key={i} className={`h-2.5 rounded-full mb-3 ${l.w} ${l.c}`}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }} />
              ))}
              {/* stat chips */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Commits", val: "142", c: "from-cyan-500/20 to-teal-500/20 border-cyan-500/30" },
                  { label: "Projects", val: "10+", c: "from-teal-500/20 to-blue-500/20 border-teal-500/30" },
                  { label: "Skills", val: "15+", c: "from-sky-500/20 to-cyan-500/20 border-sky-500/30" },
                ].map((c) => (
                  <div key={c.label} className={`rounded-xl border bg-gradient-to-br ${c.c} p-3 text-center`}>
                    <div className="text-lg font-bold text-white">{c.val}</div>
                    <div className="text-[10px] text-slate-400">{c.label}</div>
                  </div>
                ))}
              </div>
              {/* glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-teal-500/10 pointer-events-none" />
            </motion.div>
            {/* floating accent orbs */}
            <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }} transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-teal-500/30 blur-2xl" />
            <motion.div animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/25 to-cyan-500/25 blur-2xl" />
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600">
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="mx-auto max-w-7xl px-6 py-24">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Core tools I grow with</h2>
        </motion.div>
        <div className="grid md:grid-cols-1 gap-5">
          {skills.map((sk, i) => (
            <motion.div key={sk.name}
              className="rounded-2xl border border-white/8 bg-white/3 p-6 relative overflow-hidden group cursor-pointer backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, borderColor: "rgba(6,182,212,.4)", boxShadow: "0 20px 50px rgba(6,182,212,.2)" }}>
              <motion.div className={`absolute inset-0 bg-gradient-to-br ${sk.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${sk.color} flex items-center justify-center`}>
                    <sk.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-white">{sk.name}</span>
                </div>
                <span className={`text-sm font-bold bg-gradient-to-r ${sk.color} bg-clip-text text-transparent`}>{sk.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/8 overflow-hidden relative z-10">
                <motion.div className={`h-full rounded-full bg-gradient-to-r ${sk.color} relative`}
                  initial={{ width: 0 }} whileInView={{ width: `${sk.level}%` }}
                  viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.08 }}>
                  <motion.div className="absolute inset-0 bg-white/40"
                    animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-3">Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Proof of learning</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.title}
              className="group rounded-2xl border border-white/8 bg-white/3 p-6 relative overflow-hidden cursor-pointer backdrop-blur-sm flex flex-col"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.13 }}
              whileHover={{ y: -10, borderColor: "rgba(6,182,212,.5)", boxShadow: "0 30px 60px rgba(6,182,212,.25)" }}>
              {/* top gradient bar */}
              <div className={`h-1 w-full rounded-full bg-gradient-to-r ${p.color} mb-5`} />
              <motion.div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed relative z-10 flex-1">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2 relative z-10">
                {p.tech.map((t) => (
                  <motion.span key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(6,182,212,.2)" }}>{t}</motion.span>
                ))}
              </div>
              <div className="mt-5 flex gap-3 relative z-10">
                <motion.a href={p.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs text-slate-300"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,.05)" }} whileTap={{ scale: 0.95 }}>
                  <Github className="h-3.5 w-3.5" /> GitHub
                </motion.a>
                <motion.a href={p.live} target="_blank" rel="noreferrer"
                  className={`flex items-center gap-1.5 rounded-full bg-gradient-to-r ${p.color} px-4 py-2 text-xs font-semibold text-white`}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(6,182,212,.4)" }} whileTap={{ scale: 0.95 }}>
                  <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-3">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Let's build together</h2>
        </motion.div>

        <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-6">
          {/* form */}
          <motion.form className="rounded-2xl border border-white/8 bg-white/3 p-7 backdrop-blur-sm space-y-4 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            whileHover={{ borderColor: "rgba(6,182,212,.3)" }}>
            <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            {[
              { label: "Name", type: "text", placeholder: "Your name" },
              { label: "Email", type: "email", placeholder: "you@example.com" },
            ].map((f) => (
              <label key={f.label} className="block text-sm text-slate-300 relative z-10">
                {f.label}
                <input type={f.type} placeholder={f.placeholder}
                  className="mt-2 w-full rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30" />
              </label>
            ))}
            <label className="block text-sm text-slate-300 relative z-10">
              Message
              <textarea rows={5} placeholder="Tell me about your idea..."
                className="mt-2 w-full resize-none rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30" />
            </label>
            <motion.button type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 px-7 py-3 text-sm font-bold text-white relative z-10"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,.5)" }}
              whileTap={{ scale: 0.95 }}>
              <Mail className="h-4 w-4" /> Send Message
            </motion.button>
          </motion.form>

          {/* socials */}
          <motion.div className="rounded-2xl border border-white/8 bg-white/3 p-7 backdrop-blur-sm space-y-4"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-5">Find me on</p>
            {[
              { icon: Linkedin, label: "LinkedIn", sub: "vishnumsofficial", url: "https://www.linkedin.com/in/vishnumsofficial", c: "from-blue-600 to-blue-700" },
              { icon: Github, label: "GitHub", sub: "github.com/vishnu", url: "https://github.com", c: "from-slate-700 to-slate-800" },
              { icon: Instagram, label: "Instagram", sub: "@vishnu", url: "https://instagram.com", c: "from-sky-500 to-cyan-600" },
              { icon: Mail, label: "Email", sub: "vishnums775@gmail.com", url: "mailto:vishnums775@gmail.com", c: "from-cyan-600 to-teal-600" },
            ].map((s) => (
              <motion.a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 rounded-xl border border-white/8 p-4 group transition-all"
                whileHover={{ scale: 1.04, borderColor: "rgba(6,182,212,.4)", backgroundColor: "rgba(6,182,212,.08)" }}
                whileTap={{ scale: 0.97 }}>
                <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${s.c} flex items-center justify-center flex-shrink-0`}>
                  <s.icon className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">{s.label}</div>
                  <div className="text-xs text-slate-500 truncate">{s.sub}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 ml-auto transition-colors flex-shrink-0" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 text-center">
        <motion.p className="text-sm text-slate-600"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Built with ❤️ by{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent font-semibold">Vishnu M S</span>
          {" "}— Started from zero, building towards infinity.
        </motion.p>
        <motion.div className="mt-4 flex justify-center gap-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          {[Zap, Rocket, Sparkles].map((Icon, i) => (
            <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}>
              <Icon className="h-4 w-4 text-cyan-500/50" />
            </motion.div>
          ))}
        </motion.div>
      </footer>

      {/* inline keyframe for gradient shift */}
      <style>{`
        @keyframes gradShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}
