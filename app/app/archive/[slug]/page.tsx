import { notFound } from "next/navigation";
import { ArchiveWorkspace } from "@/components/soyaal/archive-workspace";
import { getArchiveItemBySlug } from "@/lib/site-data";
import { requireMember } from "@/lib/session";

export default async function ArchiveDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireMember();
  const { slug } = await params;
  const item = getArchiveItemBySlug(slug);

  if (!item || item.access !== "members") {
    notFound();
  }

  return <ArchiveWorkspace item={item} />;
}
