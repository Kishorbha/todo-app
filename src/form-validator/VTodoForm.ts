import { IsNotEmpty } from 'class-validator'

export class VTodoForm {
  @IsNotEmpty({})
  title: string

  @IsNotEmpty({})
  description: string
}
