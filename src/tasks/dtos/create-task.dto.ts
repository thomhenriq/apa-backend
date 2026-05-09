import { IsEnum, IsString, Length, MinLength } from "class-validator"
import { TaskPriority } from "../entities/task.entity";

export class CreateTaskDto {

    @IsString({
        message: 'O nome deve ser do tipo string',
    })
    @MinLength(4, { message: 'O nome deve ter ao menos 4 caractere' })
    name: string;

    @IsString({
        message: 'A descrição deve ser do tipo string',
    })
    @Length(10, 140, {
        message: 'A descrição deve ter entre 10 à 140 caracteres',
    })
    description: string;

    @IsEnum(TaskPriority, {
        message:
            'A prioridade deve ser um dos seguintes valores: high, normal, low',
    })
    priority: string
}