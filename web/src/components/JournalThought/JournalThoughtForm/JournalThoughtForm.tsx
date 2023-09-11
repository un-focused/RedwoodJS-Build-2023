import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditJournalThoughtById,
  UpdateJournalThoughtInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormJournalThought = NonNullable<EditJournalThoughtById['journalThought']>

interface JournalThoughtFormProps {
  journalThought?: EditJournalThoughtById['journalThought']
  onSave: (
    data: UpdateJournalThoughtInput,
    id?: FormJournalThought['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const JournalThoughtForm = (props: JournalThoughtFormProps) => {
  const onSubmit = (data: FormJournalThought) => {
    props.onSave(data, props?.journalThought?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormJournalThought> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="value"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Value
        </Label>

        <TextField
          name="value"
          defaultValue={props.journalThought?.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="value" className="rw-field-error" />

        <Label
          name="promptID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Prompt id
        </Label>

        <NumberField
          name="promptID"
          defaultValue={props.journalThought?.promptID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="promptID" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default JournalThoughtForm
