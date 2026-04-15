import { useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  useForm,
  FormProvider,
} from 'react-hook-form'
import type {
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  UseFormProps,
  Resolver,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodType } from 'zod'

type FormPropsWithSchema<TFieldValues extends FieldValues> = {
  schema: ZodType<TFieldValues>
  resolver?: never
}

type FormPropsWithResolver<TFieldValues extends FieldValues> = {
  schema?: never
  resolver: Resolver<TFieldValues>
}

type FormProps<TFieldValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFieldValues>
  children: (methods: UseFormReturn<TFieldValues>) => ReactNode
  options?: Omit<UseFormProps<TFieldValues>, 'resolver'>
  id?: string
  validateOnMount?: boolean
} & (FormPropsWithSchema<TFieldValues> | FormPropsWithResolver<TFieldValues>)

export const Form = <TFieldValues extends FieldValues>(
  props: FormProps<TFieldValues>
) => {
  const { onSubmit, children, options, id, validateOnMount } = props

  const resolver = 'schema' in props && props.schema
    ? zodResolver(props.schema)
    : props.resolver

  const methods = useForm<TFieldValues>({
    ...options,
    resolver,
  })

  useEffect(() => {
    if (validateOnMount) {
      void methods.trigger()
    }
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} id={id}>
        {children(methods)}
      </form>
    </FormProvider>
  )
}
