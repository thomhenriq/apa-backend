import { IsEmail, IsEnum, Matches } from "class-validator"
import { MemberRole } from "../entities/member.entity"

export class CreateMemberDto {

    name: string

    @IsEmail({ host_whitelist: ["atriajr.com.br"]}, {
        message: "O email deve ser do domínio @atriajr.com.br"
    })
    email: string

    @IsEnum(MemberRole, {
        message: "O cargo deve ser um dos seguintes valores: assessorx, coordenadorx, diretorx"
    })
    role: MemberRole
}