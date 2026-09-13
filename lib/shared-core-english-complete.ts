import { californiaCoreEnglishById } from './california-english-core'
import { sharedCoreEnglish } from './shared-core-english'

export const sharedCoreEnglishComplete = {
  ...californiaCoreEnglishById,
  ...sharedCoreEnglish,
}
