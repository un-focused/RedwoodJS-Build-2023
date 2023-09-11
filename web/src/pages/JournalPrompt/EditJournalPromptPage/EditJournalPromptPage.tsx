import EditJournalPromptCell from 'src/components/JournalPrompt/EditJournalPromptCell'

type JournalPromptPageProps = {
  id: number
}

const EditJournalPromptPage = ({ id }: JournalPromptPageProps) => {
  return <EditJournalPromptCell id={id} />
}

export default EditJournalPromptPage
