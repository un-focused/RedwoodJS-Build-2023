import type { FindJournalThoughts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import JournalThoughts from 'src/components/JournalThought/JournalThoughts'

export const QUERY = gql`
  query FindJournalThoughts {
    journalThoughts {
      id
      value
      promptID
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No journalThoughts yet. '}
      <Link to={routes.newJournalThought()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  journalThoughts,
}: CellSuccessProps<FindJournalThoughts>) => {
  return <JournalThoughts journalThoughts={journalThoughts} />
}
