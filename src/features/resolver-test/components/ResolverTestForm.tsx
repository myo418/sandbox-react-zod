import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, InputField } from '@/components/Form'
import type { ResolverTestFormValues } from '../lib/zodSchema'
import { looseSchema, strictSchema } from '../lib/zodSchema'

export const ResolverTestForm = () => {
  const [useStrict, setUseStrict] = useState(false)
  const schema = useStrict ? strictSchema : looseSchema

  return (
    <div className="test-card">
      <div className="schema-toggle">
        <button
          type="button"
          className={!useStrict ? 'active' : ''}
          onClick={() => setUseStrict(false)}
        >
          ゆるいResolver
        </button>
        <button
          type="button"
          className={useStrict ? 'active strict' : ''}
          onClick={() => setUseStrict(true)}
        >
          厳しいResolver
        </button>
      </div>

      <div className={`schema-info ${useStrict ? 'strict' : 'loose'}`}>
        <p>
          <strong>現在: {useStrict ? '厳しいスキーマ' : 'ゆるいスキーマ'}</strong>
        </p>
        {useStrict ? (
          <ul>
            <li>name: 5文字以上</li>
            <li>email: メール形式必須</li>
            <li>code: ABC-1234 形式</li>
          </ul>
        ) : (
          <ul>
            <li>name: 1文字以上でOK</li>
            <li>email: 1文字以上でOK</li>
            <li>code: 1文字以上でOK</li>
          </ul>
        )}
      </div>

      <Form<ResolverTestFormValues>
        resolver={zodResolver(schema)}
        options={{
          mode: 'onChange',
          defaultValues: { name: 'test', email: 'test', code: 'test' },
        }}
        onSubmit={(data) => console.log('submit:', data)}
        validateOnMount
      >
        {({ register, formState, trigger }) => (
          <ResolverTestFormInner
            register={register}
            formState={formState}
            trigger={trigger}
            useStrict={useStrict}
          />
        )}
      </Form>
    </div>
  )
}

type ResolverTestFormInnerProps = {
  register: ReturnType<typeof import('react-hook-form').useForm<ResolverTestFormValues>>['register']
  formState: ReturnType<typeof import('react-hook-form').useForm<ResolverTestFormValues>>['formState']
  trigger: ReturnType<typeof import('react-hook-form').useForm<ResolverTestFormValues>>['trigger']
  useStrict: boolean
}

const ResolverTestFormInner = ({ register, formState, trigger, useStrict }: ResolverTestFormInnerProps) => {
  useEffect(() => {
    void trigger()
  }, [useStrict, trigger])

  const errorCount = Object.keys(formState.errors).length

  return (
    <>
      <InputField
        label="名前"
        error={formState.errors.name}
        registration={register('name')}
        placeholder="山田太郎"
      />
      <InputField
        type="email"
        label="メール"
        error={formState.errors.email}
        registration={register('email')}
        placeholder="例）yamada@example.com"
      />
      <InputField
        label="コード"
        error={formState.errors.code}
        registration={register('code')}
        placeholder="ABC-1234"
      />
      <button type="submit">送信して検証</button>
      <div className={`result ${errorCount > 0 ? 'has-errors' : 'no-errors'}`}>
        {errorCount > 0 ? (
          <span>エラー {errorCount}件</span>
        ) : (
          <span>バリデーション通過</span>
        )}
      </div>
    </>
  )
}
