import { Button, Card, Separator, Link } from "@heroui/react";

const features = [
  {
    num: "01",
    title: "Yours alone",
    desc: "The boat sails reserved exclusively for you and your party — never a shared sauna.",
  },
  {
    num: "02",
    title: "Hot, then cold",
    desc: "Eighty-five degrees inside, the lake at ten outside. Step between them as often as you like.",
  },
  {
    num: "03",
    title: "Silent passage",
    desc: "Electric propulsion. No engine noise, no fumes, no wake. Just the sound of water on the hull.",
  },
  {
    num: "04",
    title: "Every season",
    desc: "Steam rises higher in winter. Open in fog, snow, sun and starlight.",
  },
];

const addOns = [
  { label: "Bath linens", price: "CHF 12 / set" },
  { label: "Bathrobes", price: "CHF 18 / set" },
  { label: "Charcuterie", price: "CHF 38 / board" },
  { label: "Beverages", price: "from CHF 8" },
];

const locations = [
  { name: "Lake Thun", status: "Operating since 2024" },
  { name: "Lake Zurich", status: "Opening summer 2025" },
  { name: "Lake Lucerne", status: "Operating since 2025" },
];

const navLinks = ["The Experience", "The Boat", "Gift Vouchers", "Journal"];

export function SaunaBoatPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-5">
        <div>
          <span className="block text-base font-semibold leading-none text-white tracking-wide">
            SaunaBoat
          </span>
          <span className="block text-[10px] tracking-[0.22em] uppercase text-white/60">
            Geneva
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item}
              href="#"
              className="text-[11px] tracking-[0.18em] uppercase text-white/80 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <a href="#" className="text-[11px] tracking-[0.18em] uppercase text-white/80 hover:text-white transition-colors">
            FR
          </a>
          <Button size="sm" className="text-[11px] tracking-[0.12em] uppercase">
            Reserve
          </Button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen flex-col justify-end pb-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.42 0.1 48) 0%, oklch(0.34 0.05 220) 48%, oklch(0.24 0.03 245) 100%)",
        }}
      >
        {/* warm glow top-right */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-amber-600/30 via-transparent to-transparent" />
        {/* dark vignette bottom */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="relative z-10 px-8 md:px-16 max-w-3xl">
          <p className="mb-8 text-[11px] tracking-[0.28em] uppercase text-white/55">
            Lake Geneva · Switzerland
          </p>
          <h1 className="mb-6 text-5xl md:text-7xl font-light text-white leading-[1.05]">
            Your <em className="font-normal italic font-serif">private</em>
            <br />sauna on the lake
          </h1>
          <p className="mb-10 max-w-sm text-sm leading-relaxed text-white/75">
            A floating wellness retreat for two — or six. Warmth from the wood-fired stove,
            cold from the water, silence everywhere in between.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-white/60 text-white hover:bg-white/10 hover:border-white text-[12px] tracking-wider"
            >
              Reserve your slot
            </Button>
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 text-[12px] tracking-wider"
            >
              Explore the experience
            </Button>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────── */}
      <section className="py-28 px-8 md:px-16 max-w-5xl mx-auto">
        <p className="mb-10 text-[10px] tracking-[0.28em] uppercase text-muted">
          The Experience
        </p>
        <h2 className="mb-20 text-4xl md:text-[2.75rem] font-light text-foreground leading-snug">
          A wellness ritual,{" "}
          <em className="font-normal italic font-serif">drawn from the lake.</em>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f) => (
            <div key={f.num} className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.22em] text-muted">{f.num}</span>
              <Separator />
              <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────── */}
      <section className="py-28 px-8 md:px-16 max-w-5xl mx-auto">
        <p className="mb-10 text-center text-[10px] tracking-[0.28em] uppercase text-muted">
          Pricing
        </p>
        <h2 className="mb-16 text-center text-4xl md:text-[2.75rem] font-light leading-snug">
          Simple. Two hours,{" "}
          <em className="font-normal italic font-serif">all yours.</em>
        </h2>

        <Card className="mx-auto max-w-2xl">
          <Card.Content className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10 md:gap-14">
              {/* price */}
              <div className="flex flex-col gap-4 md:flex-1">
                <p className="text-[10px] tracking-[0.22em] uppercase text-muted">From</p>
                <p className="text-6xl font-extralight text-foreground tracking-tight">CHF 250</p>
                <p className="text-sm text-muted leading-relaxed">
                  Up to six guests · towels, robes & beverages available on request.
                </p>
                <div className="mt-2">
                  <Button className="text-[12px] tracking-wider">
                    Check availability
                  </Button>
                </div>
              </div>

              <Separator orientation="vertical" className="hidden md:block self-stretch" />
              <Separator className="md:hidden" />

              {/* add-ons */}
              <div className="flex flex-col gap-5 md:flex-1">
                <p className="text-[10px] tracking-[0.22em] uppercase text-muted">Add-ons</p>
                {addOns.map((a) => (
                  <div key={a.label} className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-foreground">{a.label}</span>
                    <span className="text-sm text-muted whitespace-nowrap">{a.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card.Content>
        </Card>
      </section>

      {/* ── Gift Voucher ───────────────────────────────────────── */}
      <section className="py-28 px-8 md:px-16 max-w-5xl mx-auto text-center">
        <p className="mb-10 text-[10px] tracking-[0.28em] uppercase text-muted">
          Gift Voucher
        </p>
        <h2 className="mb-6 text-4xl md:text-[2.75rem] font-light leading-snug">
          Offer a moment,{" "}
          <em className="font-normal italic font-serif">not an object.</em>
        </h2>
        <p className="mx-auto mb-12 max-w-md text-sm text-muted leading-relaxed">
          An hour of warmth and lake water on a date of their choosing. Vouchers are
          valid twelve months and may be applied to any slot.
        </p>
        <Link
          href="#"
          className="border-b border-foreground pb-px text-sm text-foreground no-underline hover:text-muted transition-colors"
        >
          Purchase a voucher
        </Link>
      </section>

      {/* ── Locations ──────────────────────────────────────────── */}
      <section className="py-28 px-8 md:px-16 max-w-5xl mx-auto">
        <p className="mb-10 text-[10px] tracking-[0.28em] uppercase text-muted">
          Across Switzerland
        </p>
        <h2 className="mb-20 text-4xl md:text-[2.75rem] font-light leading-snug">
          Three lakes,{" "}
          <em className="font-normal italic font-serif">one ritual.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {locations.map((loc, i) => (
            <div
              key={loc.name}
              className={[
                "flex flex-col gap-2 py-10 md:py-0",
                i !== 0 && "border-t md:border-t-0 md:border-l md:pl-10",
                i === 0 ? "md:pr-10" : "md:px-10",
                i === locations.length - 1 && "md:pr-0",
                "border-border",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <h3 className="text-xl font-light text-foreground">{loc.name}</h3>
              <p className="text-xs text-muted">{loc.status} ·</p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-xs text-muted leading-relaxed max-w-xl">
          Sauna boats are operated by independent partners under shared standards.
          Bookings and vouchers are not transferable between locations.
        </p>
      </section>

      {/* ── Testimonial ────────────────────────────────────────── */}
      <section className="py-36 px-8 text-center">
        <blockquote className="mx-auto max-w-2xl text-2xl md:text-3xl font-light italic font-serif text-foreground leading-relaxed mb-6">
          "A moment out of time. We left lighter than we arrived."
        </blockquote>
        <p className="text-[10px] tracking-[0.28em] uppercase text-muted">
          — Lea V., Genève
        </p>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-border py-8 px-8">
        <div className="flex justify-center gap-12">
          {["Reserve", "Discover", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[10px] tracking-[0.28em] uppercase text-muted hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
