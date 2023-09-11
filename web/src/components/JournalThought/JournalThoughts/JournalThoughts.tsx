import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/JournalThought/JournalThoughtsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteJournalThoughtMutationVariables,
  FindJournalThoughts,
} from 'types/graphql'

const DELETE_JOURNAL_THOUGHT_MUTATION = gql`
  mutation DeleteJournalThoughtMutation($id: Int!) {
    deleteJournalThought(id: $id) {
      id
    }
  }
`

const JournalThoughtsList = ({ journalThoughts }: FindJournalThoughts) => {
  const [deleteJournalThought] = useMutation(DELETE_JOURNAL_THOUGHT_MUTATION, {
    onCompleted: () => {
      toast.success('JournalThought deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteJournalThoughtMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete journalThought ' + id + '?')) {
      deleteJournalThought({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Value</th>
            <th>Prompt id</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {journalThoughts.map((journalThought) => (
            <tr key={journalThought.id}>
              <td>{truncate(journalThought.id)}</td>
              <td>{truncate(journalThought.value)}</td>
              <td>{truncate(journalThought.promptID)}</td>
              <td>{timeTag(journalThought.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.journalThought({ id: journalThought.id })}
                    title={
                      'Show journalThought ' + journalThought.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editJournalThought({ id: journalThought.id })}
                    title={'Edit journalThought ' + journalThought.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete journalThought ' + journalThought.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(journalThought.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JournalThoughtsList
