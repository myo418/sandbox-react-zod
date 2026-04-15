import type { FC, ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'

export type FieldWrapperPassThroughProps = {
  label?: string
  error?: FieldError
  isRequired?: boolean
}

type FieldWrapperProps = FieldWrapperPassThroughProps & {
  children: ReactNode
}

export const FieldWrapper: FC<FieldWrapperProps> = (props) => {
  const { label, error, children, isRequired } = props

  return (
    <div className="field">
      {label && (
        <label className="field-label">
          {label}
          {isRequired && <span className="required">*</span>}
        </label>
      )}
      <div>
        {children}
        {error?.message && <p className="error">{error.message}</p>}
      </div>
    </div>
  )
}
