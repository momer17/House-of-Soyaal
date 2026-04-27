import Link from "next/link";
import { PublicShell } from "@/components/soyaal/public-shell";

export default async function NotFound() {
  return (
    <PublicShell footer={false}>
      <section className="section-space">
        <div className="content-narrow px-4 text-center">
          <p className="eyebrow mx-auto w-fit">Not found</p>
          <h1 className="section-title mt-5">That page is not part of the pilot scaffold</h1>
          <p className="section-subtitle mx-auto mt-6">
            The route either does not exist yet or the content has not been seeded into the demo data.
          </p>
          <div className="mt-8 flex justify-center">
            <Link className="button-primary warm" href="/">
              Return home
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
