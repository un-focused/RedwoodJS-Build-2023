export const schema = gql`
  type JournalPrompt {
    id: Int!
    prompt: String!
    thoughts: [JournalThought]!
  }

  type Query {
    journalPrompts: [JournalPrompt!]! @requireAuth
    journalPrompt(id: Int!): JournalPrompt @requireAuth
  }

  input CreateJournalPromptInput {
    prompt: String!
  }

  input UpdateJournalPromptInput {
    prompt: String
  }

  type Mutation {
    createJournalPrompt(input: CreateJournalPromptInput!): JournalPrompt!
      @requireAuth
    updateJournalPrompt(
      id: Int!
      input: UpdateJournalPromptInput!
    ): JournalPrompt! @requireAuth
    deleteJournalPrompt(id: Int!): JournalPrompt! @requireAuth
  }
`
