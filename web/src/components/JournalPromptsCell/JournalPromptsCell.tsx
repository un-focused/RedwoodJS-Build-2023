import type { JournalPromptsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query JournalPromptsQuery {
    journalPrompts {
      id,
      prompt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  journalPrompts,
}: CellSuccessProps<JournalPromptsQuery>) => {
    const firstPrompt = journalPrompts[0];
  return (
      <div>
          { firstPrompt.prompt }
      </div>
  )
}
