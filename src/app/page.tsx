import { SearchInput } from "@/components/SearchInput"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* Header/Nav placeholder */}
      </div>

      <div className="relative flex flex-col items-center justify-center gap-8 text-center z-20">
        <h1 className="text-6xl font-extrabold tracking-tight lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          SEO Tool
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          The most powerful keyword research tool for modern marketers, built with precision and speed.
        </p>

        <div className="w-full max-w-2xl mt-8">
          <SearchInput />
        </div>

        <div className="mt-12 flex gap-4 text-xs text-muted-foreground uppercase tracking-widest">
          <span>Volume</span> • <span>Difficulty</span> • <span>SERP Analysis</span>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </main>
  )
}
