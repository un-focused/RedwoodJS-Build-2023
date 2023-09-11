import type { JournalPrompt } from '@prisma/client'

import {
  journalPrompts,
  journalPrompt,
  createJournalPrompt,
  updateJournalPrompt,
  deleteJournalPrompt,
} from './journalPrompts'
import type { StandardScenario } from './journalPrompts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('journalPrompts', () => {
  scenario('returns all journalPrompts', async (scenario: StandardScenario) => {
    const result = await journalPrompts()

    expect(result.length).toEqual(Object.keys(scenario.journalPrompt).length)
  })

  scenario(
    'returns a single journalPrompt',
    async (scenario: StandardScenario) => {
      const result = await journalPrompt({ id: scenario.journalPrompt.one.id })

      expect(result).toEqual(scenario.journalPrompt.one)
    }
  )

  scenario('creates a journalPrompt', async () => {
    const result = await createJournalPrompt({
      input: { prompt: 'String8889636' },
    })

    expect(result.prompt).toEqual('String8889636')
  })

  scenario('updates a journalPrompt', async (scenario: StandardScenario) => {
    const original = (await journalPrompt({
      id: scenario.journalPrompt.one.id,
    })) as JournalPrompt
    const result = await updateJournalPrompt({
      id: original.id,
      input: { prompt: 'String92952382' },
    })

    expect(result.prompt).toEqual('String92952382')
  })

  scenario('deletes a journalPrompt', async (scenario: StandardScenario) => {
    const original = (await deleteJournalPrompt({
      id: scenario.journalPrompt.one.id,
    })) as JournalPrompt
    const result = await journalPrompt({ id: original.id })

    expect(result).toEqual(null)
  })
})
