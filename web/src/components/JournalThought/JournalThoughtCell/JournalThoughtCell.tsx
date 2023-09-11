import type { FindJournalThoughtById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import JournalThought from 'src/components/JournalThought/JournalThought'

export const QUERY = gql`
  query FindJournalThoughtById($id: Int!) {
    journalThought: journalThought(id: $id) {
      id
      value
      promptID
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>JournalThought not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  journalThought,
}: CellSuccessProps<FindJournalThoughtById>) => {
  return <JournalThought journalThought={journalThought} />
}
