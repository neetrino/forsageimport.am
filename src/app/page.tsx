export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <p className="font-mono text-sm tracking-[0.2em] text-zinc-500 uppercase">
        Forsage
      </p>
      <h1 className="mt-4 max-w-xl text-center text-4xl font-semibold tracking-tight text-zinc-950">
        Next.js + pnpm + Turbopack
      </h1>
      <p className="mt-4 max-w-md text-center text-base leading-7 text-zinc-600">
        Project scaffold is ready. Start the app with{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-900">
          pnpm dev
        </code>
        .
      </p>
    </main>
  );
}
