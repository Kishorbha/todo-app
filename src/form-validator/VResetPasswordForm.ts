import { IsNotEmpty, MinLength } from 'class-validator'
import { Match } from '@/validators/Match'

export class VResetPasswordForm {
  @MinLength(6, {})
  @IsNotEmpty({})
  password: string

  @Match('password', { message: 'password is not same' })
  @IsNotEmpty({})
  confirmPassword: string
}
