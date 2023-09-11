import JournalPromptCell from 'src/components/JournalPrompt/JournalPromptCell'

type JournalPromptPageProps = {
  id: number
}

const JournalPromptPage = ({ id }: JournalPromptPageProps) => {
  return <JournalPromptCell id={id} />
}

export default JournalPromptPage
