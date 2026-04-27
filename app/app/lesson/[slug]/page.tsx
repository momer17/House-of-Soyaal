import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/soyaal/lesson-player";
import { getCourseBySlug, getLessonSequence } from "@/lib/site-data";
import { requireMember } from "@/lib/session";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireMember();
  const { slug } = await params;
  const sequence = getLessonSequence(slug);
  const course = getCourseBySlug("foundations-of-somali-poetry");

  if (!sequence || !course) {
    notFound();
  }

  return (
    <LessonPlayer
      courseTitle={course.title}
      moduleTitle={sequence.current.moduleTitle}
      lesson={sequence.current}
      previousLessonSlug={sequence.previous?.slug}
      nextLessonSlug={sequence.next?.slug}
    />
  );
}
