import {
  IsEmail,
  IsString,
  IsNotEmptyObject,
  IsNotEmpty,
  IsUUID,
  Length,
  ValidateNested,
  IsOptional,
} from 'class-validator';

export class Identifier {
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @IsOptional()
  @IsNotEmpty()
  email?: string;
}

export class CredentialDto {
  @IsNotEmptyObject()
  @ValidateNested()
  identifier!: Identifier;

  @IsNotEmpty()
  password!: string;
}

export class CreateUserDto {
  @Length(1, 32)
  firstname!: string;

  @Length(1, 32)
  lastname!: string;

  @Length(3, 24)
  username!: string;

  @Length(8)
  password!: string;

  @IsEmail(undefined, { message: "You haven't entered a valid $property address" })
  email!: string;
}

export class SessionDto {
  @IsUUID()
  sid!: string;
}
