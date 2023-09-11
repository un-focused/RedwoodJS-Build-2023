import type { Prisma, JournalThought } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.JournalThoughtCreateArgs>({
  journalThought: {
    one: {
      data: {
        value: 'String',
        prompt: { create: { prompt: 'String3680703' } },
        user: {
          create: {
            email: 'String1803330',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        value: 'String',
        prompt: { create: { prompt: 'String8381794' } },
        user: {
          create: {
            email: 'String6789407',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<JournalThought, 'journalThought'>
