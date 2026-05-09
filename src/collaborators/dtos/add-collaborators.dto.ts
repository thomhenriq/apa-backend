import { ArrayMinSize, IsArray, IsEmail } from 'class-validator';

export class AddCollaboratorsDto {
  @IsArray()
  @IsEmail(
    { host_whitelist: ['atriajr.com.br'] },
    {
      each: true,
      message: 'O email deve ser do domínio @atriajr.com.br',
    },
  )
  @ArrayMinSize(1, {
    message: 'Deve ter ao menos 1 email',
  })
  emails: string[];
}
