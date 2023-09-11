import type { FindJournalPrompts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import JournalPrompts from 'src/components/JournalPrompt/JournalPrompts'

export const QUERY = gql`
  query FindJournalPrompts {
    journalPrompts {
      id
      prompt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No journalPrompts yet. '}
      <Link to={routes.newJournalPrompt()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  journalPrompts,
}: CellSuccessProps<FindJournalPrompts>) => {
  return <JournalPrompts journalPrompts={journalPrompts} />
}
