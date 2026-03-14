"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const steps = [
  {
    id: "fork",
    num: "01",
    title: "Fork & Clone the Repository",
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-dp-text2">
          Start by forking the DrivePool repository on GitHub so you have your own copy to work with.
        </p>
        <div className="rounded-xl border border-dp-border bg-dp-bg p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dp-text3">Clone your fork</p>
          <pre className="overflow-x-auto text-sm text-emerald-400"><code>{`git clone https://github.com/YOUR_USERNAME/DriveCloud.git
cd DriveCloud`}</code></pre>
        </div>
        <div className="rounded-xl border border-dp-border bg-dp-bg p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dp-text3">Project structure</p>
          <pre className="overflow-x-auto text-xs text-dp-text2"><code>{`DriveCloud/
├── backend/          ← FastAPI Python app
│   ├── main.py
│   ├── routes/
│   ├── services/
│   └── models/
├── frontend/         ← Next.js app
│   ├── app/
│   └── components/
├── config/           ← Place your credentials here
│   └── credentials_1.json
├── .env              ← Secrets (you create this)
└── requirements.txt`}</code></pre>
        </div>
      </div>
    ),
  },
  {
    id: "google-cloud",
    num: "02",
    title: "Create a Google Cloud Project",
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-dp-text2">
          Each Google Drive account needs its own OAuth credentials. Repeat this process for every account you want to add to the pool.
        </p>
        <ol className="space-y-3 text-sm text-dp-text2">
          {[
            <>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 underline">console.cloud.google.com</a> and create a new project.</>,
            <>Navigate to <strong className="text-dp-text">APIs & Services → Library</strong>, search for <strong className="text-dp-text">Google Drive API</strong>, and enable it.</>,
            <>Go to <strong className="text-dp-text">APIs & Services → OAuth consent screen</strong>. Choose <strong className="text-dp-text">External</strong>, fill in the app name (e.g. "DrivePool"), and add your own Google account as a <strong className="text-dp-text">test user</strong>.</>,
            <>Go to <strong className="text-dp-text">APIs & Services → Credentials → Create Credentials → OAuth client ID</strong>. Choose <strong className="text-dp-text">Desktop app</strong> as the application type.</>,
            <>Download the JSON credentials file. Rename it to <code className="rounded bg-dp-s2 px-1.5 py-0.5 text-xs text-orange-400">credentials_1.json</code> for the first account, <code className="rounded bg-dp-s2 px-1.5 py-0.5 text-xs text-orange-400">credentials_2.json</code> for the second, etc.</>,
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-dp-s2 text-[10px] font-bold text-dp-text3 mt-0.5">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold text-amber-400">⚠ One project per account</p>
          <p className="mt-1 text-xs text-dp-text2">
            Create a separate Google Cloud project for each Drive account. Each project gets its own <code className="text-amber-400">credentials_N.json</code> file.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "config",
    num: "03",
    title: "Place Credentials in /config",
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-dp-text2">
          Place all your downloaded credential files in the <code className="rounded bg-dp-s2 px-1.5 py-0.5 text-xs text-emerald-400">config/</code> folder at the project root. DrivePool auto-discovers them by number.
        </p>
        <div className="rounded-xl border border-dp-border bg-dp-bg p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dp-text3">Example with 3 accounts</p>
          <pre className="text-sm text-emerald-400"><code>{`config/
├── credentials_1.json   ← Account #1
├── credentials_2.json   ← Account #2
└── credentials_3.json   ← Account #3`}</code></pre>
        </div>
        <p className="text-sm text-dp-text2">
          Any <code className="rounded bg-dp-s2 px-1.5 py-0.5 text-xs text-dp-text">credentials_*.json</code> file in this folder is picked up automatically on backend startup. Add or remove files and restart to scale your pool.
        </p>
      </div>
    ),
  },
  {
    id: "secrets",
    num: "04",
    title: "Generate Secrets & Configure .env",
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-dp-text2">
          Run the included helper script to generate your PIN hash, JWT secret, and encryption key.
        </p>
        <div className="rounded-xl border border-dp-border bg-dp-bg p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dp-text3">Install Python deps first</p>
          <pre className="overflow-x-auto text-sm text-emerald-400"><code>{`pip install -r requirements.txt`}</code></pre>
        </div>
        <div className="rounded-xl border border-dp-border bg-dp-bg p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dp-text3">Run the secrets generator</p>
          <pre className="overflow-x-auto text-sm text-emerald-400"><code>{`python backend/scripts/generate_secrets.py`}</code></pre>
          <p className="mt-2 text-xs text-dp-text3">Enter a PIN when prompted. The script prints three values — copy them.</p>
        </div>
        <div className="rounded-xl border border-dp-border bg-dp-bg p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dp-text3">Create .env in the project root</p>
          <pre className="overflow-x-auto text-sm text-dp-text2"><code>{`DASHBOARD_PIN_HASH=<paste from script>
JWT_SECRET=<paste from script>
ENCRYPTION_KEY=<paste from script>
FRONTEND_URL=http://localhost:3000`}</code></pre>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-xs font-semibold text-red-400">🔒 Never commit .env</p>
          <p className="mt-1 text-xs text-dp-text2">
            The <code className="text-red-400">.env</code> file is in <code className="text-red-400">.gitignore</code>. Never push it — it contains your PIN hash and encryption key.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "backend",
    num: "05",
    title: "Start the Backend",
    color: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-dp-text2">
          The backend is a FastAPI app served by Uvicorn. It creates the SQLite database, runs migrations, and discovers your credential files on startup.
        </p>
        <div className="rounded-xl border border-dp-border bg-dp-bg p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dp-text3">From the project root</p>
          <pre className="overflow-x-auto text-sm text-emerald-400"><code>{`uvicorn backend.main:app --reload --port 8000`}</code></pre>
        </div>
        <div className="rounded-xl border border-dp-border bg-dp-bg p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dp-text3">Verify it works</p>
          <p className="text-sm text-dp-text2">Open <span className="text-orange-400">http://localhost:8000/docs</span> — you should see the Swagger UI with all API routes.</p>
        </div>
        <p className="text-sm text-dp-text2">
          The backend serves the API at <code className="rounded bg-dp-s2 px-1.5 py-0.5 text-xs text-dp-text">/api/*</code>. The frontend proxies requests to it automatically via Next.js rewrites.
        </p>
      </div>
    ),
  },
  {
    id: "frontend",
    num: "06",
    title: "Start the Frontend",
    color: "text-pink-400",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-dp-text2">
          The frontend is a Next.js app. Install dependencies and start the dev server.
        </p>
        <div className="rounded-xl border border-dp-border bg-dp-bg p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dp-text3">Install and start</p>
          <pre className="overflow-x-auto text-sm text-emerald-400"><code>{`cd frontend
npm install
npm run dev`}</code></pre>
        </div>
        <div className="rounded-xl border border-dp-border bg-dp-bg p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dp-text3">next.config.ts — API proxy</p>
          <p className="text-sm text-dp-text2">
            The Next.js config rewrites <code className="rounded bg-dp-s2 px-1.5 py-0.5 text-xs text-dp-text">/api/*</code> to <code className="rounded bg-dp-s2 px-1.5 py-0.5 text-xs text-dp-text">http://localhost:8000/api/*</code>. Both servers must be running simultaneously.
          </p>
        </div>
        <p className="text-sm text-dp-text2">
          Visit <span className="text-orange-400">http://localhost:3000</span> — the landing page should appear.
        </p>
      </div>
    ),
  },
  {
    id: "oauth",
    num: "07",
    title: "Connect Your Drive Accounts",
    color: "text-yellow-400",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-dp-text2">
          Each Drive account must be authorized via OAuth before DrivePool can access it. This only needs to be done once per account.
        </p>
        <ol className="space-y-3 text-sm text-dp-text2">
          {[
            <>Go to <span className="text-orange-400">http://localhost:3000/login</span> and enter your PIN.</>,
            <>Navigate to <strong className="text-dp-text">Settings</strong> in the sidebar. You'll see all discovered accounts (one per credentials file).</>,
            <>Click <strong className="text-dp-text">Connect Account</strong> on each disconnected account. You'll be redirected to Google's OAuth consent screen.</>,
            <>Sign in with the corresponding Google account and grant Drive access. You'll be redirected back to the dashboard.</>,
            <>The account status changes to <strong className="text-emerald-400">Connected</strong> and its storage quota is displayed.</>,
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-dp-s2 text-[10px] font-bold text-dp-text3 mt-0.5">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="text-xs font-semibold text-emerald-400">✓ Tokens are encrypted</p>
          <p className="mt-1 text-xs text-dp-text2">
            Refresh tokens are encrypted with Fernet using your <code className="text-emerald-400">ENCRYPTION_KEY</code> before being stored in the local SQLite database.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "use",
    num: "08",
    title: "Start Using DrivePool",
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-dp-text2">
          With accounts connected, DrivePool is ready. Files are automatically routed to the account with the most free space.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "⬆", title: "Upload Files", desc: "Drag & drop or click to browse in the Files page. DrivePool picks the best account automatically." },
            { icon: "📁", title: "Browse Folders", desc: "Click any folder to navigate into it. Use the breadcrumb bar to go back." },
            { icon: "⬇", title: "Download", desc: "Hover any file and click the download icon. The file streams directly from Drive." },
            { icon: "✏️", title: "Rename", desc: "Click any filename to rename it inline. Changes sync to Google Drive instantly." },
            { icon: "🔄", title: "Sync", desc: "Click Sync to pull in files added directly in Google Drive." },
            { icon: "📊", title: "Analytics", desc: "Visit the Analytics page for upload history, storage breakdown, and file type charts." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-dp-border bg-dp-bg p-4">
              <p className="mb-1 text-sm font-medium text-dp-text">{item.icon} {item.title}</p>
              <p className="text-xs text-dp-text2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "scaling",
    num: "09",
    title: "Adding More Accounts Later",
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-dp-text2">
          Adding more storage is as simple as adding more credential files. No configuration file changes required.
        </p>
        <ol className="space-y-3 text-sm text-dp-text2">
          {[
            "Create a new Google Cloud project and repeat Step 02.",
            <>Download the credentials JSON and save it as <code className="rounded bg-dp-s2 px-1.5 py-0.5 text-xs text-dp-text">credentials_N.json</code> in the config/ folder (use the next number in sequence).</>,
            "Restart the backend. The new account appears in Settings as 'Disconnected'.",
            "Click Connect Account and authorize it via OAuth.",
            "Done — your storage pool just grew by 15 GB.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-dp-s2 text-[10px] font-bold text-dp-text3 mt-0.5">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold text-orange-400">♾ Unlimited scaling</p>
          <p className="mt-1 text-xs text-dp-text2">
            There is no hard limit on the number of accounts. Each free Google account adds 15 GB. 10 accounts = 150 GB of free cloud storage.
          </p>
        </div>
      </div>
    ),
  },
];

function StepCard({ step, isOpen, onToggle }: { step: typeof steps[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`rounded-2xl border transition-all duration-200 ${isOpen ? step.border + " bg-dp-s1" : "border-dp-border bg-dp-s1 hover:border-dp-text3/30"}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
      >
        <span className={`flex-shrink-0 text-xs font-bold tabular-nums ${step.color}`}>{step.num}</span>
        <span className="flex-1 text-sm font-medium text-dp-text">{step.title}</span>
        <svg
          className={`h-4 w-4 flex-shrink-0 text-dp-text3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="border-t border-dp-border px-6 pb-6 pt-5">
          {step.content}
        </div>
      )}
    </div>
  );
}

export default function DocsPage() {
  const { theme, toggle } = useTheme();
  const [openStep, setOpenStep] = useState<string>("fork");

  function toggleStep(id: string) {
    setOpenStep((prev) => (prev === id ? "" : id));
  }

  return (
    <div className="min-h-screen bg-dp-bg">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-dp-border bg-dp-sidebar/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-orange-500/20 bg-orange-500/10">
              <svg className="h-3.5 w-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-dp-text">DrivePool</span>
            <span className="rounded-full border border-dp-border px-2 py-0.5 text-[10px] text-dp-text3">Docs</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-dp-text3 transition hover:bg-dp-hover hover:text-dp-text"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>
            <Link
              href="/login"
              className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-400"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            <span className="text-xs font-medium text-orange-400">Setup Guide</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-dp-text">
            Get Started with <span className="gradient-text">DrivePool</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-dp-text2">
            Follow these steps to deploy your own unified Google Drive storage pool. From zero to a fully working multi-account dashboard in under 15 minutes.
          </p>

          {/* Quick prereqs */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { label: "Python 3.10+", icon: "🐍" },
              { label: "Node.js 18+", icon: "🟢" },
              { label: "Google Account(s)", icon: "📧" },
              { label: "Git", icon: "🌿" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-1.5 rounded-lg border border-dp-border bg-dp-s1 px-3 py-1.5 text-xs text-dp-text2">
                <span>{p.icon}</span>
                {p.label}
              </div>
            ))}
          </div>
        </div>

        {/* Steps — accordion */}
        <div className="space-y-3">
          {steps.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              isOpen={openStep === step.id}
              onToggle={() => toggleStep(step.id)}
            />
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-semibold text-dp-text">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Is my data safe?",
                a: "Yes. DrivePool runs entirely on your local machine. Your files are stored in your own Google Drive accounts — not on any DrivePool server. OAuth refresh tokens are encrypted with AES-256 (Fernet) before being written to the local database.",
              },
              {
                q: "How many accounts can I add?",
                a: "There is no limit. Each account contributes its full storage quota (typically 15 GB for free accounts). The more credentials files you place in config/, the larger your pool.",
              },
              {
                q: "What happens if an account runs out of space?",
                a: "DrivePool always routes new uploads to the account with the most free space (least-used-space strategy). If all accounts are full, the upload will fail with a 503 error.",
              },
              {
                q: "Can I access files I added directly in Google Drive?",
                a: "Yes. Click the Sync button in the Files page to pull in any files or folders that were added directly in Drive. DrivePool syncs metadata — not file content — so syncing is fast.",
              },
              {
                q: "Does it work on Windows / Mac / Linux?",
                a: "Yes. Both Python (backend) and Node.js (frontend) are cross-platform. The only requirement is that both servers can communicate on localhost.",
              },
              {
                q: "Can I run it in production / on a server?",
                a: "DrivePool is designed for local/self-hosted use. You can expose it through a reverse proxy (nginx/caddy) with HTTPS, but you're responsible for securing the OAuth callback URL and updating FRONTEND_URL in .env accordingly.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-dp-border bg-dp-s1 p-5">
                <p className="text-sm font-medium text-dp-text">{faq.q}</p>
                <p className="mt-2 text-sm text-dp-text2 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-10 text-center">
          <h2 className="text-2xl font-bold text-dp-text">Ready to go?</h2>
          <p className="mt-2 text-dp-text2">Open the dashboard and start managing your unified storage pool.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow shadow-orange-500/25 transition hover:bg-orange-400"
            >
              Open Dashboard
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-dp-border bg-dp-s1 px-6 py-3 font-semibold text-dp-text transition hover:border-orange-500/30"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-dp-text3">
          DrivePool is open source and free forever. Contribute on{" "}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">GitHub</a>.
        </p>
      </div>
    </div>
  );
}
