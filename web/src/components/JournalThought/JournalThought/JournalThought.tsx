import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type {
  DeleteJournalThoughtMutationVariables,
  FindJournalThoughtById,
} from 'types/graphql'

const DELETE_JOURNAL_THOUGHT_MUTATION = gql`
  mutation DeleteJournalThoughtMutation($id: Int!) {
    deleteJournalThought(id: $id) {
      id
    }
  }
`

interface Props {
  journalThought: NonNullable<FindJournalThoughtById['journalThought']>
}

const JournalThought = ({ journalThought }: Props) => {
  const [deleteJournalThought] = useMutation(DELETE_JOURNAL_THOUGHT_MUTATION, {
    onCompleted: () => {
      toast.success('JournalThought deleted')
      navigate(routes.journalThoughts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteJournalThoughtMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete journalThought ' + id + '?')) {
      deleteJournalThought({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            JournalThought {journalThought.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{journalThought.id}</td>
            </tr>
            <tr>
              <th>Value</th>
              <td>{journalThought.value}</td>
            </tr>
            <tr>
              <th>Prompt id</th>
              <td>{journalThought.promptID}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(journalThought.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editJournalThought({ id: journalThought.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(journalThought.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default JournalThought
