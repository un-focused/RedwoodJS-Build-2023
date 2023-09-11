import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/JournalPrompt/JournalPromptsCell'
import { truncate } from 'src/lib/formatters'

import type {
  DeleteJournalPromptMutationVariables,
  FindJournalPrompts,
} from 'types/graphql'

const DELETE_JOURNAL_PROMPT_MUTATION = gql`
  mutation DeleteJournalPromptMutation($id: Int!) {
    deleteJournalPrompt(id: $id) {
      id
    }
  }
`

const JournalPromptsList = ({ journalPrompts }: FindJournalPrompts) => {
  const [deleteJournalPrompt] = useMutation(DELETE_JOURNAL_PROMPT_MUTATION, {
    onCompleted: () => {
      toast.success('JournalPrompt deleted')
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

  const onDeleteClick = (id: DeleteJournalPromptMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete journalPrompt ' + id + '?')) {
      deleteJournalPrompt({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Prompt</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {journalPrompts.map((journalPrompt) => (
            <tr key={journalPrompt.id}>
              <td>{truncate(journalPrompt.id)}</td>
              <td>{truncate(journalPrompt.prompt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.journalPrompt({ id: journalPrompt.id })}
                    title={'Show journalPrompt ' + journalPrompt.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editJournalPrompt({ id: journalPrompt.id })}
                    title={'Edit journalPrompt ' + journalPrompt.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete journalPrompt ' + journalPrompt.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(journalPrompt.id)}
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

export default JournalPromptsList
