import type {
  QueryResolvers,
  MutationResolvers,
  JournalThoughtRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const journalThoughts: QueryResolvers['journalThoughts'] = () => {
  return db.journalThought.findMany()
}

export const journalThought: QueryResolvers['journalThought'] = ({ id }) => {
  return db.journalThought.findUnique({
    where: { id },
  })
}

export const createJournalThought: MutationResolvers['createJournalThought'] =
  ({ input }) => {
    return db.journalThought.create({
      data: input,
    })
  }

export const updateJournalThought: MutationResolvers['updateJournalThought'] =
  ({ id, input }) => {
    return db.journalThought.update({
      data: input,
      where: { id },
    })
  }

export const deleteJournalThought: MutationResolvers['deleteJournalThought'] =
  ({ id }) => {
    return db.journalThought.delete({
      where: { id },
    })
  }

export const JournalThought: JournalThoughtRelationResolvers = {
  prompt: (_obj, { root }) => {
    return db.journalThought.findUnique({ where: { id: root?.id } }).prompt()
  },
  user: (_obj, { root }) => {
    return db.journalThought.findUnique({ where: { id: root?.id } }).user()
  },
}
