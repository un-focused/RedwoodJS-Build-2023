import type { Prisma, JournalPrompt } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.JournalPromptCreateArgs>({
  journalPrompt: {
    one: { data: { prompt: 'String9133491' } },
    two: { data: { prompt: 'String7144449' } },
  },
})

export type StandardScenario = ScenarioData<JournalPrompt, 'journalPrompt'>
