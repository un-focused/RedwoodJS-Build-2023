export const schema = gql`
  type JournalThought {
    id: Int!
    value: String!
    prompt: JournalPrompt!
    user: User!
    promptID: Int!
    userID: Int!
    createdAt: DateTime!
  }

  type Query {
    journalThoughts: [JournalThought!]! @requireAuth
    journalThought(id: Int!): JournalThought @requireAuth
  }

  input CreateJournalThoughtInput {
    value: String!
    promptID: Int!
    userID: Int!
  }

  input UpdateJournalThoughtInput {
    value: String
    promptID: Int
    userID: Int
  }

  type Mutation {
    createJournalThought(input: CreateJournalThoughtInput!): JournalThought!
      @requireAuth
    updateJournalThought(
      id: Int!
      input: UpdateJournalThoughtInput!
    ): JournalThought! @requireAuth
    deleteJournalThought(id: Int!): JournalThought! @requireAuth
  }
`
