# Unified DMV exam architecture

- Question source remains shared/common questions plus state-specific questions through `getStateQuestions(stateSlug)`.
- Exam UI is shared across states.
- State-specific question count, pass rule and category quotas live in `lib/exam/exam-config.ts`.
- Exam assembly lives in `lib/exam/exam-engine.ts`.
- Versioned resume data and storage keys are standardized under `openaa-dmv:{state}:exam:*`.
- Traffic-sign pages should continue to derive their questions from the state question bank rather than maintain a second sign-question list.
