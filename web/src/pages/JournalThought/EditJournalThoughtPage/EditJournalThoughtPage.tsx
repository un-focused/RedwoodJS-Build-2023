import EditJournalThoughtCell from 'src/components/JournalThought/EditJournalThoughtCell'

type JournalThoughtPageProps = {
  id: number
}

const EditJournalThoughtPage = ({ id }: JournalThoughtPageProps) => {
  return <EditJournalThoughtCell id={id} />
}

export default EditJournalThoughtPage
