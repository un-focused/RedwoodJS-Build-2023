import JournalThoughtCell from 'src/components/JournalThought/JournalThoughtCell'

type JournalThoughtPageProps = {
  id: number
}

const JournalThoughtPage = ({ id }: JournalThoughtPageProps) => {
  return <JournalThoughtCell id={id} />
}

export default JournalThoughtPage
