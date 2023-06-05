export interface UserDB {
  id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  created_at: string
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: string,
    private createdAt: string
  ) {}

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public setName(name: string): void {
    this.name = name
  }

  public getEmail(): string {
    return this.email
  }

  public setEmail(email: string): void {
    this.email = email
  }

  public getPassword(): string {
    return this.password
  }

  public setPassword(password: string): void {
    this.password = password
  }

  public getRole(): string {
    return this.role
  }
  
  public getCreatedAt(): string {
    return this.createdAt
  }
}
