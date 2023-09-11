import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

import type {
  DeleteJournalPromptMutationVariables,
  FindJournalPromptById,
} from 'types/graphql'

const DELETE_JOURNAL_PROMPT_MUTATION = gql`
  mutation DeleteJournalPromptMutation($id: Int!) {
    deleteJournalPrompt(id: $id) {
      id
    }
  }
`

interface Props {
  journalPrompt: NonNullable<FindJournalPromptById['journalPrompt']>
}

const JournalPrompt = ({ journalPrompt }: Props) => {
  const [deleteJournalPrompt] = useMutation(DELETE_JOURNAL_PROMPT_MUTATION, {
    onCompleted: () => {
      toast.success('JournalPrompt deleted')
      navigate(routes.journalPrompts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteJournalPromptMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete journalPrompt ' + id + '?')) {
      deleteJournalPrompt({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            JournalPrompt {journalPrompt.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{journalPrompt.id}</td>
            </tr>
            <tr>
              <th>Prompt</th>
              <td>{journalPrompt.prompt}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editJournalPrompt({ id: journalPrompt.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(journalPrompt.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default JournalPrompt
