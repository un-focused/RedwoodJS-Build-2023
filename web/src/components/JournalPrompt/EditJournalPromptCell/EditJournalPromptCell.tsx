import type {
  EditJournalPromptById,
  UpdateJournalPromptInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import JournalPromptForm from 'src/components/JournalPrompt/JournalPromptForm'

export const QUERY = gql`
  query EditJournalPromptById($id: Int!) {
    journalPrompt: journalPrompt(id: $id) {
      id
      prompt
    }
  }
`
const UPDATE_JOURNAL_PROMPT_MUTATION = gql`
  mutation UpdateJournalPromptMutation(
    $id: Int!
    $input: UpdateJournalPromptInput!
  ) {
    updateJournalPrompt(id: $id, input: $input) {
      id
      prompt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  journalPrompt,
}: CellSuccessProps<EditJournalPromptById>) => {
  const [updateJournalPrompt, { loading, error }] = useMutation(
    UPDATE_JOURNAL_PROMPT_MUTATION,
    {
      onCompleted: () => {
        toast.success('JournalPrompt updated')
        navigate(routes.journalPrompts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateJournalPromptInput,
    id: EditJournalPromptById['journalPrompt']['id']
  ) => {
    updateJournalPrompt({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit JournalPrompt {journalPrompt?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <JournalPromptForm
          journalPrompt={journalPrompt}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
