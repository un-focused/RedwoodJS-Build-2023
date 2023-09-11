import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditJournalPromptById,
  UpdateJournalPromptInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormJournalPrompt = NonNullable<EditJournalPromptById['journalPrompt']>

interface JournalPromptFormProps {
  journalPrompt?: EditJournalPromptById['journalPrompt']
  onSave: (data: UpdateJournalPromptInput, id?: FormJournalPrompt['id']) => void
  error: RWGqlError
  loading: boolean
}

const JournalPromptForm = (props: JournalPromptFormProps) => {
  const onSubmit = (data: FormJournalPrompt) => {
    props.onSave(data, props?.journalPrompt?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormJournalPrompt> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="prompt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Prompt
        </Label>

        <TextField
          name="prompt"
          defaultValue={props.journalPrompt?.prompt}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="prompt" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default JournalPromptForm
