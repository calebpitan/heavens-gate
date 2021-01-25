export class Identifier {
  username?: string;
  email?: string;
}

export class CredentialDto {
  identifier!: Identifier;
  password!: string;
}

export class CreateUserDto {
  firstname!: string;
  lastname!: string;
  username!: string;
  email!: string;
  password!: string;
}

export class SessionDto {
  sid!: string
}
