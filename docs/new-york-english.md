# New York English coverage

The New York experience keeps the audited OpenAA Chinese source unchanged and adds English as a separate presentation layer.

- Source IDs: `ny-openaa-1` through `ny-openaa-150`
- Required English coverage: 150/150
- Every English entry has a question, four aligned choices, and an explanation.
- Answer indices remain owned by the Chinese source and are never translated or reordered here.
- The legacy 150-item source contains review/practice variants of a 59-question semantic base. English text is maintained once per semantic base item and mapped to every stable source ID.
- Chinese, English, and bilingual UI modes use the common DMV language layer.
- `auditNewYorkEnglish()` fails if the NY bank does not expose 150 IDs, English coverage is below 150, or choice counts do not match.

Future content expansion should replace repeated Chinese review variants with genuinely distinct NY DMV study questions in the source bank while preserving stable IDs where practical.