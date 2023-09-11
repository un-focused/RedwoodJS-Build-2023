import type {
  QueryResolvers,
  MutationResolvers,
  JournalPromptRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const journalPrompts: QueryResolvers['journalPrompts'] = () => {
  return db.journalPrompt.findMany()
}

export const journalPrompt: QueryResolvers['journalPrompt'] = ({ id }) => {
  return db.journalPrompt.findUnique({
    where: { id },
  })
}

export const createJournalPrompt: MutationResolvers['createJournalPrompt'] = ({
  input,
}) => {
  return db.journalPrompt.create({
    data: input,
  })
}

export const updateJournalPrompt: MutationResolvers['updateJournalPrompt'] = ({
  id,
  input,
}) => {
  return db.journalPrompt.update({
    data: input,
    where: { id },
  })
}

export const deleteJournalPrompt: MutationResolvers['deleteJournalPrompt'] = ({
  id,
}) => {
  return db.journalPrompt.delete({
    where: { id },
  })
}

export const JournalPrompt: JournalPromptRelationResolvers = {
  thoughts: (_obj, { root }) => {
    return db.journalPrompt.findUnique({ where: { id: root?.id } }).thoughts()
  },
}
