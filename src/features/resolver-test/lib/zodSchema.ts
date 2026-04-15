import * as z from 'zod'
import type { ToZod } from '@/utils/misc/zod'

export type ResolverTestFormValues = {
  name: string
  email: string
  code: string
}

// ゆるいスキーマ: "test" で通る
export const looseSchema = z.object<ToZod<ResolverTestFormValues>>({
  name: z.string().min(1, '必須項目です'),
  email: z.string().min(1, '必須項目です'),
  code: z.string().min(1, '必須項目です'),
})

// 厳しいスキーマ: "test" だとエラーになる
export const strictSchema = z.object<ToZod<ResolverTestFormValues>>({
  name: z.string().trim().min(5, '名前は5文字以上必要です'),
  email: z.string().trim().email('正しいメール形式で入力してください').min(1, '必須項目です'),
  code: z.string().regex(/^[A-Z]{3}-\d{4}$/, '形式: ABC-1234（例: XYZ-0001）'),
})
