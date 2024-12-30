import { z } from 'zod'

export const FormSchema = z
  .object({
    name: z.string().nonempty(),
    email: z
      .string()
      .nonempty()
      .email({ message: '正しいメールアドレスを入力してください' }),
    zip: z
      .string()
      .nonempty(),
    prefecture: z.string().nonempty(),
    address1: z.string().nonempty(),
    address2: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.zip.includes('-')) {
      ctx.addIssue({
        message: 'ハイフンを含めず半角数字で入力してください',
        path: ['zip'],
        code: z.ZodIssueCode.custom
      })
    }
    if (data.zip.length !== 7) {
      ctx.addIssue({
        message: '郵便番号は7桁で入力してください',
        path: ['zip'],
        code: z.ZodIssueCode.custom
      })
    }
  })

export type FormType = z.infer<typeof FormSchema>

