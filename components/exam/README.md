# Unified DMV exam architecture

- Question source remains shared/common questions plus state-specific questions through `getStateQuestions(stateSlug)`.
- Progress cards, question cards, result cards, language selectors, and mobile exam actions are shared across states.
- State-specific question count, pass rule and category quotas live in `lib/exam/exam-config.ts`.
- Exam assembly lives in `lib/exam/exam-engine.ts`.
- Mock tests keep unfinished answers in memory only. Refreshing, leaving, or closing the page abandons the exam; only submitted scores and wrong answers are stored.
- New York keeps its independent question bank, exam assembly, and dual pass rule even though it shares the exam UI.
- Traffic-sign pages should continue to derive their questions from the state question bank rather than maintain a second sign-question list.
