import type { FC } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { FieldWrapper } from './FieldWrapper'
import type { FieldWrapperPassThroughProps } from './FieldWrapper'

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel'
  registration?: Partial<UseFormRegisterReturn>
  placeholder?: string
}

export const InputField: FC<InputFieldProps> = (props) => {
  const { type = 'text', registration, label, error, isRequired, placeholder } = props

  return (
    <FieldWrapper label={label} error={error} isRequired={isRequired}>
      <input type={type} placeholder={placeholder} {...registration} />
    </FieldWrapper>
  )
}
