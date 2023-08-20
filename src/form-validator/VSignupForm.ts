import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { Match } from '@/validators/Match'

export class VSignupForm {
  @IsNotEmpty({})
  fullname: string

  @IsEmail({}, { message: 'email must be valid' })
  email: string

  @MinLength(6, {})
  @IsNotEmpty({})
  password: string

  @Match('password', {})
  @IsNotEmpty({ message: 'confirm password should not be empty' })
  confirmPassword: string
}
