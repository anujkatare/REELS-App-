export default function AppInfo() {
  return (
    <div className="min-h-screen bg-black text-white px-6 pt-8 pb-28">

      {/* APP TITLE */}
      <div className="mb-14 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Anonymous
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Reels & Public Chat
        </p>
      </div>

      <Section
        title="What this app is"
        text={[
          "A simple platform to watch short videos and join public chats without creating an account.",
          "No profiles, no followers, no pressure — just content and conversations."
        ]}
      />

      <Divider />

      <Section
        title="How it works"
        text={[
          "Open the app and start watching reels instantly.",
          "Join public chats using any temporary username.",
          "Usernames can be changed and messages may disappear."
        ]}
      />

      <Divider />

      <Section
        title="Safety"
        text={[
          "Do not share personal information with anyone.",
          "Offline meetings are strictly not allowed.",
          "Report abusive or harmful behavior when needed."
        ]}
      />

      <Divider />

      <Section
        title="Privacy"
        text={[
          "No sign-up is required to use the app.",
          "We do not intentionally collect personal data.",
          "This platform is meant for casual and public interaction only."
        ]}
      />

      <Divider />

      <Section
        title="Contact"
        text={[
          "For feedback, issues, or reports:"
        ]}
      >
        <p className="mt-3 text-sm text-pink-400 text-center">
          support@anonymousapp.com
        </p>
      </Section>

      <Divider />

      <Section
        title="Terms"
        text={[
          "By using this app, you agree to follow community rules.",
          "Misuse of the platform may result in access restrictions."
        ]}
      />

      {/* FOOTER */}
      <div className="mt-16 text-center text-xs text-zinc-600">
        Version 1.0 · Built for open expression
      </div>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Section({ title, text, children }) {
  return (
    <div className="mb-12">
      <h2 className="text-sm font-medium text-zinc-200 text-center mb-4">
        {title}
      </h2>

      <div className="space-y-3">
        {text.map((line, i) => (
          <p
            key={i}
            className="text-sm text-zinc-400 leading-relaxed text-center"
          >
            {line}
          </p>
        ))}
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-px w-12 mx-auto bg-zinc-800 mb-12" />
  );
}
