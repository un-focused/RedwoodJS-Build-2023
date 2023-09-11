import type { JournalThought } from '@prisma/client'

import {
  journalThoughts,
  journalThought,
  createJournalThought,
  updateJournalThought,
  deleteJournalThought,
} from './journalThoughts'
import type { StandardScenario } from './journalThoughts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('journalThoughts', () => {
  scenario(
    'returns all journalThoughts',
    async (scenario: StandardScenario) => {
      const result = await journalThoughts()

      expect(result.length).toEqual(Object.keys(scenario.journalThought).length)
    }
  )

  scenario(
    'returns a single journalThought',
    async (scenario: StandardScenario) => {
      const result = await journalThought({
        id: scenario.journalThought.one.id,
      })

      expect(result).toEqual(scenario.journalThought.one)
    }
  )

  scenario('creates a journalThought', async (scenario: StandardScenario) => {
    const result = await createJournalThought({
      input: {
        value: 'String',
        promptID: scenario.journalThought.two.promptID,
        userID: scenario.journalThought.two.userID,
      },
    })

    expect(result.value).toEqual('String')
    expect(result.promptID).toEqual(scenario.journalThought.two.promptID)
    expect(result.userID).toEqual(scenario.journalThought.two.userID)
  })

  scenario('updates a journalThought', async (scenario: StandardScenario) => {
    const original = (await journalThought({
      id: scenario.journalThought.one.id,
    })) as JournalThought
    const result = await updateJournalThought({
      id: original.id,
      input: { value: 'String2' },
    })

    expect(result.value).toEqual('String2')
  })

  scenario('deletes a journalThought', async (scenario: StandardScenario) => {
    const original = (await deleteJournalThought({
      id: scenario.journalThought.one.id,
    })) as JournalThought
    const result = await journalThought({ id: original.id })

    expect(result).toEqual(null)
  })
})
