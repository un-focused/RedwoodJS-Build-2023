import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import JournalPromptForm from 'src/components/JournalPrompt/JournalPromptForm'

import type { CreateJournalPromptInput } from 'types/graphql'

const CREATE_JOURNAL_PROMPT_MUTATION = gql`
  mutation CreateJournalPromptMutation($input: CreateJournalPromptInput!) {
    createJournalPrompt(input: $input) {
      id
    }
  }
`

const NewJournalPrompt = () => {
  const [createJournalPrompt, { loading, error }] = useMutation(
    CREATE_JOURNAL_PROMPT_MUTATION,
    {
      onCompleted: () => {
        toast.success('JournalPrompt created')
        navigate(routes.journalPrompts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateJournalPromptInput) => {
    createJournalPrompt({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New JournalPrompt</h2>
      </header>
      <div className="rw-segment-main">
        <JournalPromptForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewJournalPrompt
