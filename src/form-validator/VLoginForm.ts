import { IsEmail, IsNotEmpty } from 'class-validator'

export class VLoginForm {
  @IsEmail({}, { message: 'email must be valid' })
  @IsNotEmpty({})
  email: string

  @IsNotEmpty({})
  password: string
}
