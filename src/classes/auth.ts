import { IsEmail } from "class-validator";
import {
  IsNotEmpty,
  IsString,
} from "class-validator/types/decorator/decorators";

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
