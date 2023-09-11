import type {
  EditJournalThoughtById,
  UpdateJournalThoughtInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import JournalThoughtForm from 'src/components/JournalThought/JournalThoughtForm'

export const QUERY = gql`
  query EditJournalThoughtById($id: Int!) {
    journalThought: journalThought(id: $id) {
      id
      value
      promptID
      createdAt
    }
  }
`
const UPDATE_JOURNAL_THOUGHT_MUTATION = gql`
  mutation UpdateJournalThoughtMutation(
    $id: Int!
    $input: UpdateJournalThoughtInput!
  ) {
    updateJournalThought(id: $id, input: $input) {
      id
      value
      promptID
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  journalThought,
}: CellSuccessProps<EditJournalThoughtById>) => {
  const [updateJournalThought, { loading, error }] = useMutation(
    UPDATE_JOURNAL_THOUGHT_MUTATION,
    {
      onCompleted: () => {
        toast.success('JournalThought updated')
        navigate(routes.journalThoughts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateJournalThoughtInput,
    id: EditJournalThoughtById['journalThought']['id']
  ) => {
    updateJournalThought({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit JournalThought {journalThought?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <JournalThoughtForm
          journalThought={journalThought}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
