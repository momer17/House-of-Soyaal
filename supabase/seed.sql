-- House of Soyaal v1 — Seed data
-- Run after schema.sql to populate the flagship course, events, and archive items.

-- ─── Flagship course ──────────────────────────────────────────────────────────

insert into public.courses (
  slug, title, subtitle, hero_quote, description, monthly_price_gbp,
  hero_stats, outcomes, includes, audience, access, published
) values (
  'foundations-of-somali-poetry',
  'Foundations of Somali Poetry',
  'A guided introduction to Somali poetic listening, close reading, and cultural context.',
  'A course shaped like a reading circle: attentive, warm, and grounded in the living oral tradition.',
  'This flagship course introduces learners to Somali poetry through performance, meaning, and close reading. It balances guided video lessons with reflective notes, transcripts, and a small archive of poems that members can revisit over time.',
  19,
  '[{"value": "9", "label": "Lessons in the pilot course"}, {"value": "3", "label": "Live sessions this term"}, {"value": "12", "label": "Archive PDFs at launch"}]',
  ARRAY[
    'Understand the structure of oral performance and poetic repetition.',
    'Read poems with short contextual notes and guided prompts.',
    'Build confidence moving between listening, text, and interpretation.',
    'Prepare for deeper poetry study in later courses and seminars.'
  ],
  ARRAY[
    'Instant access to the flagship course and member archive.',
    'Downloadable lesson notes, worksheets, and transcripts.',
    'Member pricing and priority registration for live events.',
    'A persistent reading workspace for poem annotations and notes.'
  ],
  ARRAY[
    'Learners returning to Somali through culture and literature.',
    'Readers who want guided access to poetic language and context.',
    'Diaspora audiences looking for a warm, structured entry point.'
  ],
  'members',
  true
) on conflict (slug) do nothing;

-- ─── Modules ──────────────────────────────────────────────────────────────────

with course as (select id from public.courses where slug = 'foundations-of-somali-poetry')
insert into public.modules (course_id, title, "order", summary)
select
  course.id,
  m.title,
  m.ord,
  m.summary
from course,
(values
  (1, 'Listening for Form',      'Begin with performance, rhythm, and the social life of Somali poetry before diving into interpretation.'),
  (2, 'Meaning and Context',     'Move from listening to interpretation: social themes, metaphor, and where context sharpens meaning.'),
  (3, 'Response and Reflection', 'Use reflective writing and archive practice to consolidate the course and prepare for live discussion.')
) as m(ord, title, summary)
on conflict do nothing;

-- ─── Lessons (Module 1: Listening for Form) ───────────────────────────────────

with mod as (
  select m.id from public.modules m
  join public.courses c on c.id = m.course_id
  where c.slug = 'foundations-of-somali-poetry' and m."order" = 1
)
insert into public.lessons (module_id, slug, title, "order", duration_minutes, summary, notes_summary, transcript, captions, published)
select
  mod.id, l.slug, l.title, l.ord, l.dur, l.summary, l.notes, l.transcript, l.captions, true
from mod,
(values
  (1, 'listening-for-repetition',  'Listening for Repetition',  18,
   'An introduction to repeated sound, refrain, and how oral performance shapes comprehension.',
   'A short guide to repeated sound, chorus-like structures, and listening cues.',
   'In Somali poetry, repetition is rarely decorative. It carries memory, emphasis, and social weight.',
   ARRAY['English', 'Somali']),
  (2, 'voice-performance-and-memory', 'Voice, Performance, and Memory', 24,
   'Explore how voice, public recitation, and memory hold poems together in lived practice.',
   'Performance framing, listening checklist, and memory cues.',
   'A poem enters the room through voice first. Text helps us return to it, but the performance carries the encounter.',
   ARRAY['English', 'Somali']),
  (3, 'imagery-and-opening-lines', 'Imagery and Opening Lines', 21,
   'Learn how first lines orient a listener and set up imagery, tone, and expectation.',
   'Close reading prompts focused on image clusters and opening moves.',
   'The opening line is both invitation and instruction: it tells the listener how to attend.',
   ARRAY['English'])
) as l(ord, slug, title, dur, summary, notes, transcript, captions)
on conflict (slug) do nothing;

-- ─── Lessons (Module 2: Meaning and Context) ──────────────────────────────────

with mod as (
  select m.id from public.modules m
  join public.courses c on c.id = m.course_id
  where c.slug = 'foundations-of-somali-poetry' and m."order" = 2
)
insert into public.lessons (module_id, slug, title, "order", duration_minutes, summary, notes_summary, transcript, captions, published)
select
  mod.id, l.slug, l.title, l.ord, l.dur, l.summary, l.notes, l.transcript, l.captions, true
from mod,
(values
  (1, 'theme-context-and-address',   'Theme, Context, and Address',     29,
   'Read a poem through its implied audience, public context, and the directness of address.',
   'Framework for theme, occasion, and implied audience.',
   'A poem often announces who it is speaking to, even when it appears to speak in general terms.',
   ARRAY['English', 'Somali']),
  (2, 'metaphor-and-layered-meaning', 'Metaphor and Layered Meaning',    33,
   'A guided reading of metaphor, indirection, and why poems can say several things at once.',
   'Layered meaning, semantic fields, and interpretive caution.',
   'The metaphor does not hide meaning so much as widen it. Several meanings become available together.',
   ARRAY['English', 'Somali']),
  (3, 'dialect-register-and-delivery', 'Dialect, Register, and Delivery', 20,
   'A practical overview of what changes across region, register, and delivery choices.',
   'Short field notes on delivery, vocabulary, and register markers.',
   'Variation matters because it changes texture and emphasis, not because it makes a poem less itself.',
   ARRAY['English'])
) as l(ord, slug, title, dur, summary, notes, transcript, captions)
on conflict (slug) do nothing;

-- ─── Lessons (Module 3: Response and Reflection) ──────────────────────────────

with mod as (
  select m.id from public.modules m
  join public.courses c on c.id = m.course_id
  where c.slug = 'foundations-of-somali-poetry' and m."order" = 3
)
insert into public.lessons (module_id, slug, title, "order", duration_minutes, summary, notes_summary, transcript, captions, published)
select
  mod.id, l.slug, l.title, l.ord, l.dur, l.summary, l.notes, l.transcript, l.captions, true
from mod,
(values
  (1, 'reading-with-the-archive',     'Reading with the Archive',        17,
   'Use the member archive to compare related poems and attach notes to passages that matter to you.',
   'A walkthrough of archive reading habits and note-making.',
   'Archive work is not just collecting texts. It is learning how to return, compare, and annotate with care.',
   ARRAY['English']),
  (2, 'writing-a-short-response',     'Writing a Short Response',        25,
   'Turn listening notes into a short written response that stays close to the poem.',
   'A response-writing template with sentence starters.',
   'The aim is not to write around the poem, but to stay beside it while describing what you hear and notice.',
   ARRAY['English', 'Somali']),
  (3, 'preparing-for-the-live-seminar', 'Preparing for the Live Seminar', 16,
   'A closing session on questions, confidence, and how to bring your notes into the live event.',
   'Seminar prep notes, reflection prompts, and suggested questions.',
   'Bring one line, one question, and one point of uncertainty. That is enough to enter the conversation.',
   ARRAY['English'])
) as l(ord, slug, title, dur, summary, notes, transcript, captions)
on conflict (slug) do nothing;

-- ─── Events ───────────────────────────────────────────────────────────────────

insert into public.events (slug, title, summary, format, datetime_label, location_label, seats_label, price_label, eventbrite_url, event_date, published)
values
  ('april-listening-lab',
   'April Listening Lab',
   'A member-friendly live workshop on repetition, listening cues, and how to read with performance in mind.',
   'Online workshop',
   'Thursday 30 April 2026 · 6:00 PM BST',
   'Zoom', '24 places remaining', '£12',
   'https://www.eventbrite.com/',
   '2026-04-30 18:00:00+01', true),

  ('poetry-and-memory-seminar',
   'Poetry and Memory Seminar',
   'A slower discussion session for members who want more context around oral transmission, memory, and recitation.',
   'Online seminar',
   'Saturday 16 May 2026 · 3:00 PM BST',
   'Zoom', 'Open registration', 'Included for members',
   'https://www.eventbrite.com/',
   '2026-05-16 15:00:00+01', true),

  ('london-reading-circle',
   'London Reading Circle',
   'A small in-person gathering in London for guided reading, listening, and conversation around selected poems.',
   'In-person session',
   'Sunday 14 June 2026 · 2:00 PM BST',
   'Hackney, London', '8 places remaining', '£25',
   'https://www.eventbrite.com/',
   '2026-06-14 14:00:00+01', true)
on conflict (slug) do nothing;

-- ─── Archive items ────────────────────────────────────────────────────────────

insert into public.archive_items (slug, title, poet, era, description, preview, tags, access, editorial_note, passages, published)
values
  ('gabay-on-memory-and-distance',
   'Gabay on Memory and Distance',
   'Selected modern poet', '1980s',
   'A short poem chosen for its layered metaphor, repeated imagery, and usefulness in the pilot course.',
   'A lyrical meditation on absence, distance, and the shapes memory leaves behind in voice.',
   ARRAY['Memory', 'Performance', 'Close reading'],
   'members',
   'This text works especially well for comparing metaphor and address. Use the annotation panel to mark lines that widen in meaning on a second reading.',
   ARRAY[
     'The line returns like footsteps on evening dust, familiar and unsettled at once.',
     'A name carried in the mouth can outlive the road that first taught it to us.',
     'He speaks to the absent as if distance were another room, still close enough to hear.'
   ], true),

  ('recitation-and-public-voice',
   'Recitation and Public Voice',
   'Selected classical source', '1960s',
   'An archive entry used to compare public voice, social occasion, and the rhetorical force of address.',
   'A forceful poem whose address shifts between public declaration and intimate instruction.',
   ARRAY['Public voice', 'Address', 'Context'],
   'members',
   'Try labelling passages by tone: instruction, warning, memory, or declaration. That taxonomy is often more useful than simple theme labels.',
   ARRAY[
     'The city hears him before it understands him; the rhythm arrives first and makes room for the meaning.',
     'The poem names the public, but the force of the address lands on a single listener.',
     'Instruction in verse is still instruction, yet it carries more warmth when voiced in image and echo.'
   ], true),

  ('short-reading-for-teaser',
   'Short Reading for Teaser',
   'Archive preview', 'Preview sample',
   'A publicly visible teaser entry that signals the archive style without exposing the full member workspace.',
   'A short sample poem with a locked prompt inviting readers to join as members for full access.',
   ARRAY['Preview', 'Teaser'],
   'public',
   'This teaser is intentionally light. The full archive includes editable labels, notes, and saved reading sessions.',
   ARRAY[
     'The first page offers enough to invite attention, but the fuller commentary stays inside the member area.',
     'Readers can see the editorial tone before deciding whether the archive is for them.',
     'The preview keeps the archive visible without flattening it into a marketing page.'
   ], true)
on conflict (slug) do nothing;

-- ─── Announcements ────────────────────────────────────────────────────────────

insert into public.announcements (title, body)
values
  ('April seminar booking is open',
   'Reserve a place for the live discussion on oral performance, meter, and how to listen for repetition in Somali verse.'),
  ('Course notes refreshed',
   'Module 2 now includes an expanded reading guide and a clearer glossary for metaphor and theme analysis.')
on conflict do nothing;
