import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import JournalThoughtForm from 'src/components/JournalThought/JournalThoughtForm'

import type { CreateJournalThoughtInput } from 'types/graphql'

const CREATE_JOURNAL_THOUGHT_MUTATION = gql`
  mutation CreateJournalThoughtMutation($input: CreateJournalThoughtInput!) {
    createJournalThought(input: $input) {
      id
    }
  }
`

const NewJournalThought = () => {
  const [createJournalThought, { loading, error }] = useMutation(
    CREATE_JOURNAL_THOUGHT_MUTATION,
    {
      onCompleted: () => {
        toast.success('JournalThought created')
        navigate(routes.journalThoughts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateJournalThoughtInput) => {
    createJournalThought({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New JournalThought</h2>
      </header>
      <div className="rw-segment-main">
        <JournalThoughtForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewJournalThought
