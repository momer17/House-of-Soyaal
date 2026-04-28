import Link from "next/link";
import { PublicShell } from "@/components/soyaal/public-shell";
import { ProgressBar } from "@/components/soyaal/progress-bar";
import { getFlagshipCourse } from "@/lib/data/courses";
import { getPublishedEvents } from "@/lib/data/events";
import { getPublishedArchiveItems } from "@/lib/data/archive";

export default async function HomePage() {
  const [course, events, archiveItems] = await Promise.all([
    getFlagshipCourse(),
    getPublishedEvents(),
    getPublishedArchiveItems(),
  ]);

  const courseTitle = course?.title ?? "Foundations of Somali Poetry";
  const courseSlug = course?.slug ?? "foundations-of-somali-poetry";
  const heroQuote =
    course?.hero_quote ??
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.";

  const nextEvent = events[0] ?? null;

  return (
    <PublicShell>

      {/* Announcement strip */}
      {nextEvent && (
        <div className="bg-[var(--br)] py-2 text-center text-[11px] text-[var(--cr)]">
          <span className="mr-2 opacity-70">New workshop</span>
          <span className="font-medium text-[var(--am3)]">{nextEvent.title}</span>
          {nextEvent.datetime_label && (
            <span className="mx-2 opacity-50">·</span>
          )}
          {nextEvent.datetime_label && (
            <span className="opacity-70">{nextEvent.datetime_label.split(",")[0]}</span>
          )}
          <Link
            href={`/events/${nextEvent.slug}`}
            className="ml-3 font-medium text-[var(--am3)] underline underline-offset-2 hover:text-white"
          >
            Book now
          </Link>
        </div>
      )}

      {/* Hero */}
      <section className="py-12 md:py-16">
        <div className="content-width grid gap-6 px-4 lg:grid-cols-[minmax(0,1.1fr)_24rem] lg:items-start">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--am)]">Language and poetry</p>
            <h1 className="font-serif mt-4 text-[28px] leading-[1.15] text-[var(--br)] md:text-[34px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
            </h1>
            <p className="mt-4 max-w-md text-[13px] leading-[1.7] text-[var(--tx2)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link className="px-4 py-2 text-[12px] font-medium bg-[var(--am)] text-white rounded-md hover:bg-[var(--am2)] transition-colors" href="/pricing">
                Get started
              </Link>
              <Link className="px-4 py-2 text-[12px] font-medium border border-[var(--soy-border)] text-[var(--tx2)] rounded-md hover:bg-[var(--cr)] transition-colors" href={`/course/${courseSlug}`}>
                Explore course
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="px-2 py-1 text-[10px] bg-[var(--cr)] text-[var(--tx3)] rounded">Tag one</span>
              <span className="px-2 py-1 text-[10px] bg-[var(--cr)] text-[var(--tx3)] rounded">Tag two</span>
              <span className="px-2 py-1 text-[10px] bg-[var(--cr)] text-[var(--tx3)] rounded">Tag three</span>
            </div>
          </div>

          <aside className="space-y-3">
            <div className="bg-[var(--cr)] rounded-lg p-5 border border-[var(--soy-border)]">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--tx3)]">Flagship course</p>
              <h2 className="font-serif mt-2 text-[20px] text-[var(--br)]">{courseTitle}</h2>
              <p className="mt-2 text-[12px] leading-[1.6] text-[var(--tx2)]">{heroQuote}</p>
              <div className="mt-4 grid grid-cols-3 divide-x divide-[var(--soy-border)]">
                {[
                  { value: "9", label: "Lessons" },
                  { value: "3", label: "Sessions" },
                  { value: "12", label: "PDFs" },
                ].map((stat) => (
                  <div key={stat.label} className="px-2 first:pl-0 last:pr-0 text-center">
                    <div className="font-serif text-[20px] text-[var(--br)]">{stat.value}</div>
                    <div className="mt-0.5 text-[10px] text-[var(--tx3)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-lg p-5 text-[var(--cr)]"
              style={{ background: "linear-gradient(135deg, #1a0f08, #2e1c0e 52%, #3d2918)" }}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--am3)]">From the archive</p>
              <p className="font-serif mt-2 text-[16px] leading-[1.5] italic">
                &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&rdquo;
              </p>
              <p className="mt-3 text-[11px] text-white/50">— [Author Name]</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Metrics */}
      <section className="content-width px-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-[var(--cr)] rounded-lg p-4 text-center border border-[var(--soy-border)]">
            <div className="font-serif text-[28px] text-[var(--br)]">1</div>
            <p className="mt-1 text-[11px] text-[var(--tx3)]">Flagship course</p>
          </div>
          <div className="bg-[var(--cr)] rounded-lg p-4 text-center border border-[var(--soy-border)]">
            <div className="font-serif text-[28px] text-[var(--br)]">9</div>
            <p className="mt-1 text-[11px] text-[var(--tx3)]">Structured lessons</p>
          </div>
          <div className="bg-[var(--cr)] rounded-lg p-4 text-center border border-[var(--soy-border)]">
            <div className="font-serif text-[28px] text-[var(--br)]">{events.length || 3}</div>
            <p className="mt-1 text-[11px] text-[var(--tx3)]">Live events</p>
          </div>
          <div className="bg-[var(--cr)] rounded-lg p-4 text-center border border-[var(--soy-border)]">
            <div className="font-serif text-[28px] text-[var(--br)]">12</div>
            <p className="mt-1 text-[11px] text-[var(--tx3)]">Archive PDFs</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 bg-[var(--cr)]">
        <div className="content-width px-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--am)]">What membership unlocks</p>
              <h2 className="font-serif mt-3 text-[22px] text-[var(--br)]">Lorem ipsum dolor sit amet</h2>
            </div>
            <Link className="text-[12px] font-medium text-[var(--am)] hover:underline" href="/pricing">
              See pricing
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-8">
            {[
              {
                title: "Feature One",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
              },
              {
                title: "Feature Two",
                body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
              },
              {
                title: "Feature Three",
                body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-[var(--wh)] rounded-lg p-5 border border-[var(--soy-border)]">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--tx3)]">{feature.title}</p>
                <p className="mt-3 text-[12px] leading-[1.7] text-[var(--tx2)]">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learner view + events */}
      <section className="py-10">
        <div className="content-width grid gap-4 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div className="bg-[var(--cr)] rounded-lg p-5 border border-[var(--soy-border)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--am)]">Learner view</p>
                <h2 className="font-serif mt-2 text-[20px] text-[var(--br)]">Continue where you left off</h2>
              </div>
              <span className="px-2 py-1 text-[10px] bg-[var(--gn2)] text-[var(--gn)] rounded">Dashboard</span>
            </div>
            <p className="mt-3 text-[12px] leading-[1.6] text-[var(--tx2)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt.
            </p>
            <div className="bg-[var(--wh)] rounded-lg mt-4 p-4 border border-[var(--soy-border)]">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--tx3)]">Module Three</p>
                  <h3 className="font-serif mt-1 text-[16px] text-[var(--br)]">Lesson Title Here</h3>
                </div>
                <span className="px-2 py-1 text-[10px] bg-[var(--cr)] text-[var(--tx3)] rounded">44%</span>
              </div>
              <div className="mt-3">
                <ProgressBar value={44} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link className="px-3 py-[6px] text-[11px] font-medium bg-[var(--am)] text-white rounded-md hover:bg-[var(--am2)] transition-colors" href="/signup">
                  Start membership
                </Link>
                <Link className="px-3 py-[6px] text-[11px] font-medium border border-[var(--soy-border)] text-[var(--tx2)] rounded-md hover:bg-[var(--cr)] transition-colors" href="/signin">
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {events.slice(0, 2).map((event) => (
              <div key={event.id} className="bg-[var(--cr)] rounded-lg p-5 border border-[var(--soy-border)]">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--tx3)]">{event.format}</p>
                <h3 className="font-serif mt-2 text-[18px] text-[var(--br)]">{event.title}</h3>
                <p className="mt-2 text-[12px] leading-[1.6] text-[var(--tx2)]">{event.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-[10px] bg-[var(--wh)] text-[var(--tx3)] rounded">{event.datetime_label}</span>
                  <span className="px-2 py-1 text-[10px] bg-[var(--wh)] text-[var(--tx3)] rounded">{event.price_label}</span>
                </div>
                <Link className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-[var(--am)] hover:underline" href={`/events/${event.slug}`}>
                  View details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive preview */}
      <section className="py-10 bg-[var(--cr)]">
        <div className="content-width px-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--am)]">Archive preview</p>
              <h2 className="font-serif mt-3 text-[22px] text-[var(--br)]">Lorem ipsum dolor sit amet</h2>
            </div>
            <Link className="text-[12px] font-medium text-[var(--am)] hover:underline" href="/archive">
              Browse archive
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-8">
            {archiveItems.slice(0, 3).map((item) => (
              <article key={item.id} className="bg-[var(--wh)] rounded-lg p-5 border border-[var(--soy-border)]">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--am)]">
                  {item.poet} · {item.era}
                </p>
                <h3 className="font-serif mt-2 text-[17px] text-[var(--br)]">{item.title}</h3>
                <p className="mt-2 text-[12px] leading-[1.6] text-[var(--tx2)]">{item.preview}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-[9px] bg-[var(--cr)] text-[var(--tx3)] rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
