export type AccessState = "public" | "members";
export type ViewerRole = "guest" | "member" | "admin";

export interface Announcement {
  title: string;
  body: string;
}

export interface LessonResource {
  title: string;
  type: "PDF" | "Transcript" | "Worksheet" | "Link";
  href: string;
  description: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  order: number;
  durationMinutes: number;
  summary: string;
  transcriptExcerpt: string;
  notesSummary: string;
  captions: string[];
  resources: LessonResource[];
}

export interface Module {
  id: string;
  title: string;
  order: number;
  summary: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroQuote: string;
  description: string;
  monthlyPriceGbp: number;
  heroStats: Array<{ value: string; label: string }>;
  outcomes: string[];
  includes: string[];
  audience: string[];
  modules: Module[];
  access: AccessState;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  format: "Online workshop" | "Online seminar" | "In-person session";
  datetimeLabel: string;
  locationLabel: string;
  seatsLabel: string;
  priceLabel: string;
  eventbriteUrl: string;
}

export interface ArchiveItem {
  id: string;
  slug: string;
  title: string;
  poet: string;
  era: string;
  description: string;
  preview: string;
  tags: string[];
  access: AccessState;
  pdfName: string;
  editorialNote: string;
  passages: string[];
}

export interface SeedUser {
  name: string;
  role: ViewerRole;
  subscriptionStatus: "inactive" | "active";
}

export const announcements: Announcement[] = [
  {
    title: "April seminar booking is open",
    body: "Reserve a place for the live discussion on oral performance, meter, and how to listen for repetition in Somali verse.",
  },
  {
    title: "Course notes refreshed",
    body: "Module 2 now includes an expanded reading guide and a clearer glossary for metaphor and theme analysis.",
  },
];

export const flagshipCourse: Course = {
  id: "course-1",
  slug: "foundations-of-somali-poetry",
  title: "Foundations of Somali Poetry",
  subtitle:
    "A guided introduction to Somali poetic listening, close reading, and cultural context.",
  heroQuote:
    "A course shaped like a reading circle: attentive, warm, and grounded in the living oral tradition.",
  description:
    "This flagship course introduces learners to Somali poetry through performance, meaning, and close reading. It balances guided video lessons with reflective notes, transcripts, and a small archive of poems that members can revisit over time.",
  monthlyPriceGbp: 19,
  heroStats: [
    { value: "9", label: "Lessons in the pilot course" },
    { value: "3", label: "Live sessions this term" },
    { value: "12", label: "Archive PDFs at launch" },
  ],
  outcomes: [
    "Understand the structure of oral performance and poetic repetition.",
    "Read poems with short contextual notes and guided prompts.",
    "Build confidence moving between listening, text, and interpretation.",
    "Prepare for deeper poetry study in later courses and seminars.",
  ],
  includes: [
    "Instant access to the flagship course and member archive.",
    "Downloadable lesson notes, worksheets, and transcripts.",
    "Member pricing and priority registration for live events.",
    "A persistent reading workspace for poem annotations and notes.",
  ],
  audience: [
    "Learners returning to Somali through culture and literature.",
    "Readers who want guided access to poetic language and context.",
    "Diaspora audiences looking for a warm, structured entry point.",
  ],
  access: "members",
  modules: [
    {
      id: "module-1",
      title: "Listening for Form",
      order: 1,
      summary:
        "Begin with performance, rhythm, and the social life of Somali poetry before diving into interpretation.",
      lessons: [
        {
          id: "lesson-1",
          slug: "listening-for-repetition",
          title: "Listening for Repetition",
          order: 1,
          durationMinutes: 18,
          summary:
            "An introduction to repeated sound, refrain, and how oral performance shapes comprehension.",
          transcriptExcerpt:
            "In Somali poetry, repetition is rarely decorative. It carries memory, emphasis, and social weight.",
          notesSummary:
            "A short guide to repeated sound, chorus-like structures, and listening cues.",
          captions: ["English", "Somali"],
          resources: [
            {
              title: "Lesson notes",
              type: "PDF",
              href: "/placeholder.svg",
              description: "Two-page listening guide with reflection prompts.",
            },
            {
              title: "Transcript excerpt",
              type: "Transcript",
              href: "/placeholder.svg",
              description: "Clean transcript with highlighted terminology.",
            },
          ],
        },
        {
          id: "lesson-2",
          slug: "voice-performance-and-memory",
          title: "Voice, Performance, and Memory",
          order: 2,
          durationMinutes: 24,
          summary:
            "Explore how voice, public recitation, and memory hold poems together in lived practice.",
          transcriptExcerpt:
            "A poem enters the room through voice first. Text helps us return to it, but the performance carries the encounter.",
          notesSummary:
            "Performance framing, listening checklist, and memory cues.",
          captions: ["English", "Somali"],
          resources: [
            {
              title: "Performance worksheet",
              type: "Worksheet",
              href: "/placeholder.svg",
              description: "Prompt sheet for comparing two recitations.",
            },
          ],
        },
        {
          id: "lesson-3",
          slug: "imagery-and-opening-lines",
          title: "Imagery and Opening Lines",
          order: 3,
          durationMinutes: 21,
          summary:
            "Learn how first lines orient a listener and set up imagery, tone, and expectation.",
          transcriptExcerpt:
            "The opening line is both invitation and instruction: it tells the listener how to attend.",
          notesSummary:
            "Close reading prompts focused on image clusters and opening moves.",
          captions: ["English"],
          resources: [
            {
              title: "Close reading notes",
              type: "PDF",
              href: "/placeholder.svg",
              description: "Annotated prompt sheet for the lesson poem.",
            },
          ],
        },
      ],
    },
    {
      id: "module-2",
      title: "Meaning and Context",
      order: 2,
      summary:
        "Move from listening to interpretation: social themes, metaphor, and where context sharpens meaning.",
      lessons: [
        {
          id: "lesson-4",
          slug: "theme-context-and-address",
          title: "Theme, Context, and Address",
          order: 1,
          durationMinutes: 29,
          summary:
            "Read a poem through its implied audience, public context, and the directness of address.",
          transcriptExcerpt:
            "A poem often announces who it is speaking to, even when it appears to speak in general terms.",
          notesSummary:
            "Framework for theme, occasion, and implied audience.",
          captions: ["English", "Somali"],
          resources: [
            {
              title: "Theme guide",
              type: "PDF",
              href: "/placeholder.svg",
              description: "Lesson notes with a context checklist and prompts.",
            },
            {
              title: "Glossary",
              type: "PDF",
              href: "/placeholder.svg",
              description: "Key terms used across Module 2.",
            },
          ],
        },
        {
          id: "lesson-5",
          slug: "metaphor-and-layered-meaning",
          title: "Metaphor and Layered Meaning",
          order: 2,
          durationMinutes: 33,
          summary:
            "A guided reading of metaphor, indirection, and why poems can say several things at once.",
          transcriptExcerpt:
            "The metaphor does not hide meaning so much as widen it. Several meanings become available together.",
          notesSummary:
            "Layered meaning, semantic fields, and interpretive caution.",
          captions: ["English", "Somali"],
          resources: [
            {
              title: "Metaphor worksheet",
              type: "Worksheet",
              href: "/placeholder.svg",
              description: "A one-page exercise for identifying image chains.",
            },
            {
              title: "Transcript excerpt",
              type: "Transcript",
              href: "/placeholder.svg",
              description: "Selected paragraphs from the guided reading.",
            },
          ],
        },
        {
          id: "lesson-6",
          slug: "dialect-register-and-delivery",
          title: "Dialect, Register, and Delivery",
          order: 3,
          durationMinutes: 20,
          summary:
            "A practical overview of what changes across region, register, and delivery choices.",
          transcriptExcerpt:
            "Variation matters because it changes texture and emphasis, not because it makes a poem less itself.",
          notesSummary:
            "Short field notes on delivery, vocabulary, and register markers.",
          captions: ["English"],
          resources: [
            {
              title: "Reference sheet",
              type: "PDF",
              href: "/placeholder.svg",
              description: "Delivery cues and listening notes.",
            },
          ],
        },
      ],
    },
    {
      id: "module-3",
      title: "Response and Reflection",
      order: 3,
      summary:
        "Use reflective writing and archive practice to consolidate the course and prepare for live discussion.",
      lessons: [
        {
          id: "lesson-7",
          slug: "reading-with-the-archive",
          title: "Reading with the Archive",
          order: 1,
          durationMinutes: 17,
          summary:
            "Use the member archive to compare related poems and attach notes to passages that matter to you.",
          transcriptExcerpt:
            "Archive work is not just collecting texts. It is learning how to return, compare, and annotate with care.",
          notesSummary:
            "A walkthrough of archive reading habits and note-making.",
          captions: ["English"],
          resources: [
            {
              title: "Archive checklist",
              type: "PDF",
              href: "/placeholder.svg",
              description: "A short companion for annotation and note review.",
            },
          ],
        },
        {
          id: "lesson-8",
          slug: "writing-a-short-response",
          title: "Writing a Short Response",
          order: 2,
          durationMinutes: 25,
          summary:
            "Turn listening notes into a short written response that stays close to the poem.",
          transcriptExcerpt:
            "The aim is not to write around the poem, but to stay beside it while describing what you hear and notice.",
          notesSummary:
            "A response-writing template with sentence starters.",
          captions: ["English", "Somali"],
          resources: [
            {
              title: "Writing template",
              type: "Worksheet",
              href: "/placeholder.svg",
              description: "Structured prompts for a short critical response.",
            },
          ],
        },
        {
          id: "lesson-9",
          slug: "preparing-for-the-live-seminar",
          title: "Preparing for the Live Seminar",
          order: 3,
          durationMinutes: 16,
          summary:
            "A closing session on questions, confidence, and how to bring your notes into the live event.",
          transcriptExcerpt:
            "Bring one line, one question, and one point of uncertainty. That is enough to enter the conversation.",
          notesSummary:
            "Seminar prep notes, reflection prompts, and suggested questions.",
          captions: ["English"],
          resources: [
            {
              title: "Seminar brief",
              type: "PDF",
              href: "/placeholder.svg",
              description: "A short brief and prep list for the upcoming session.",
            },
            {
              title: "Event link",
              type: "Link",
              href: "https://www.eventbrite.com/",
              description: "Register externally via Eventbrite.",
            },
          ],
        },
      ],
    },
  ],
};

export const events: EventItem[] = [
  {
    id: "event-1",
    slug: "april-listening-lab",
    title: "April Listening Lab",
    summary:
      "A member-friendly live workshop on repetition, listening cues, and how to read with performance in mind.",
    format: "Online workshop",
    datetimeLabel: "Thursday 30 April 2026 · 6:00 PM BST",
    locationLabel: "Zoom",
    seatsLabel: "24 places remaining",
    priceLabel: "£12",
    eventbriteUrl: "https://www.eventbrite.com/",
  },
  {
    id: "event-2",
    slug: "poetry-and-memory-seminar",
    title: "Poetry and Memory Seminar",
    summary:
      "A slower discussion session for members who want more context around oral transmission, memory, and recitation.",
    format: "Online seminar",
    datetimeLabel: "Saturday 16 May 2026 · 3:00 PM BST",
    locationLabel: "Zoom",
    seatsLabel: "Open registration",
    priceLabel: "Included for members",
    eventbriteUrl: "https://www.eventbrite.com/",
  },
  {
    id: "event-3",
    slug: "london-reading-circle",
    title: "London Reading Circle",
    summary:
      "A small in-person gathering in London for guided reading, listening, and conversation around selected poems.",
    format: "In-person session",
    datetimeLabel: "Sunday 14 June 2026 · 2:00 PM BST",
    locationLabel: "Hackney, London",
    seatsLabel: "8 places remaining",
    priceLabel: "£25",
    eventbriteUrl: "https://www.eventbrite.com/",
  },
];

export const archiveItems: ArchiveItem[] = [
  {
    id: "archive-1",
    slug: "gabay-on-memory-and-distance",
    title: "Gabay on Memory and Distance",
    poet: "Selected modern poet",
    era: "1980s",
    description:
      "A short poem chosen for its layered metaphor, repeated imagery, and usefulness in the pilot course.",
    preview:
      "A lyrical meditation on absence, distance, and the shapes memory leaves behind in voice.",
    tags: ["Memory", "Performance", "Close reading"],
    access: "members",
    pdfName: "memory-distance.pdf",
    editorialNote:
      "This text works especially well for comparing metaphor and address. Use the annotation panel to mark lines that widen in meaning on a second reading.",
    passages: [
      "The line returns like footsteps on evening dust, familiar and unsettled at once.",
      "A name carried in the mouth can outlive the road that first taught it to us.",
      "He speaks to the absent as if distance were another room, still close enough to hear.",
    ],
  },
  {
    id: "archive-2",
    slug: "recitation-and-public-voice",
    title: "Recitation and Public Voice",
    poet: "Selected classical source",
    era: "1960s",
    description:
      "An archive entry used to compare public voice, social occasion, and the rhetorical force of address.",
    preview:
      "A forceful poem whose address shifts between public declaration and intimate instruction.",
    tags: ["Public voice", "Address", "Context"],
    access: "members",
    pdfName: "public-voice.pdf",
    editorialNote:
      "Try labelling passages by tone: instruction, warning, memory, or declaration. That taxonomy is often more useful than simple theme labels.",
    passages: [
      "The city hears him before it understands him; the rhythm arrives first and makes room for the meaning.",
      "The poem names the public, but the force of the address lands on a single listener.",
      "Instruction in verse is still instruction, yet it carries more warmth when voiced in image and echo.",
    ],
  },
  {
    id: "archive-3",
    slug: "short-reading-for-teaser",
    title: "Short Reading for Teaser",
    poet: "Archive preview",
    era: "Preview sample",
    description:
      "A publicly visible teaser entry that signals the archive style without exposing the full member workspace.",
    preview:
      "A short sample poem with a locked prompt inviting readers to join as members for full access.",
    tags: ["Preview", "Teaser"],
    access: "public",
    pdfName: "preview.pdf",
    editorialNote:
      "This teaser is intentionally light. The full archive includes editable labels, notes, and saved reading sessions.",
    passages: [
      "The first page offers enough to invite attention, but the fuller commentary stays inside the member area.",
      "Readers can see the editorial tone before deciding whether the archive is for them.",
      "The preview keeps the archive visible without flattening it into a marketing page.",
    ],
  },
];

export const seedUsers: SeedUser[] = [
  { name: "Asha", role: "member", subscriptionStatus: "active" },
  { name: "Ubah", role: "member", subscriptionStatus: "active" },
  { name: "Hodan", role: "member", subscriptionStatus: "active" },
  { name: "Admin", role: "admin", subscriptionStatus: "active" },
];

export function getCourseBySlug(slug: string) {
  return slug === flagshipCourse.slug ? flagshipCourse : undefined;
}

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function getArchiveItemBySlug(slug: string) {
  return archiveItems.find((item) => item.slug === slug);
}

export const allLessons = flagshipCourse.modules.flatMap((module) =>
  module.lessons.map((lesson) => ({
    ...lesson,
    moduleTitle: module.title,
    moduleOrder: module.order,
  })),
);

export function getLessonBySlug(slug: string) {
  return allLessons.find((lesson) => lesson.slug === slug);
}

export function getLessonSequence(slug: string) {
  const index = allLessons.findIndex((lesson) => lesson.slug === slug);
  if (index === -1) {
    return undefined;
  }

  return {
    previous: index > 0 ? allLessons[index - 1] : undefined,
    current: allLessons[index],
    next: index < allLessons.length - 1 ? allLessons[index + 1] : undefined,
  };
}

export function getCourseProgressSnapshot() {
  return {
    completedLessons: 4,
    currentLessonSlug: "metaphor-and-layered-meaning",
    currentModuleTitle: "Meaning and Context",
    currentLessonTitle: "Metaphor and Layered Meaning",
    percentComplete: 44,
  };
}
