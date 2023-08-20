import { IsEmail, IsNotEmpty } from 'class-validator'

export class VForgotPasswordForm {
  @IsEmail({}, { message: 'email must be valid' })
  @IsNotEmpty({})
  email: string
}
