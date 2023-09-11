import type { FindJournalPromptById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import JournalPrompt from 'src/components/JournalPrompt/JournalPrompt'

export const QUERY = gql`
  query FindJournalPromptById($id: Int!) {
    journalPrompt: journalPrompt(id: $id) {
      id
      prompt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>JournalPrompt not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  journalPrompt,
}: CellSuccessProps<FindJournalPromptById>) => {
  return <JournalPrompt journalPrompt={journalPrompt} />
}
