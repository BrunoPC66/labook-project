import { UserDatabase } from "../database/UserDatabase";
import { DeleteUserInputDTO, DeleteUserOutputDTO } from "../dtos/dto-user/deleteUser.dto";
import { GetUserInputDTO } from "../dtos/dto-user/getUser.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/dto-user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/dto-user/signup.dto";
import { UpdateUserInputDTO, UpdateUserOutputDTO } from "../dtos/dto-user/updateUser.dto";
import { BadRequest } from "../errors/BadRequest";
import { User, UserDB } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { Payload, TokenManager, USER_ROLES } from "../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public getUser = async (input: GetUserInputDTO): Promise<UserDB[]> => {
        const { q, token } = input

        const userDB = await this.userDatabase.findUser(q)

        const payload = await this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequest("Token inválido")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new BadRequest("Ação não autorizada")
        }

        const users: User[] = userDB.map((user: any) => new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.created_at
        ))

        const output = users.map((user) => ({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            created_at: user.getCreatedAt()
        }))

        return output
    }

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const {
            name,
            email,
            password,
        } = input

        const hashedPassword = await this.hashManager.hash(password)

        const id = IdGenerator.generator()

        const idExist = await this.userDatabase.findUserById(id)
        const emailExist = await this.userDatabase.findUserByEmail(email)

        if (idExist) {
            throw new BadRequest("Erro incomum, por favor tente novamente")
        }
        if (emailExist) {
            throw new BadRequest("Email já cadastrado, faça o login ou cadastre um novo email")
        }

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.STANDARD,
            new Date().toISOString()
        )

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getCreatedAt()
        }

        await this.userDatabase.insertUser(newUserDB)

        const payload: Payload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: USER_ROLES.STANDARD
        }

        const token = await this.tokenManager.createToken(payload)

        const output = {
            message: "Conta criada com sucesso",
            token
        }

        return output
    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        const userDB = await this.userDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new BadRequest("Email ou senha incorreto")
        }

        const isPasswordCorrect = await this.hashManager.compare(password, userDB.password)

        if (!isPasswordCorrect) {
            throw new BadRequest("Email ou senha incorreto")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const payload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = await this.tokenManager.createToken(payload)

        const output = {
            message: "Login efetuado com sucesso. Bem vindo(a) de volta!",
            token
        }

        return output
    }

    public updateUser = async (input: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> => {
        const {
            email,
            password,
            update: {
                newName,
                newEmail,
                newPassword
            }
        } = input

        const userDB = await this.userDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new BadRequest("Email incorreto")
        }

        const isPasswordCorrect = await this.hashManager.compare(password, userDB.password)

        if (!isPasswordCorrect) {
            throw new BadRequest("Senha incorreta")
        }

        const newHashedPassword = await this.hashManager.hash(newPassword as string)

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        if (newName) {
            user.setName(newName)
        }

        if (newEmail) {
            user.setEmail(newEmail)
        }

        if (newPassword) {
            user.setPassword(newHashedPassword)
        }

        const updatedUser: UserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            created_at: user.getCreatedAt()
        }

        await this.userDatabase.updateUser(userDB.id, updatedUser)

        const output = {
            message: "Dados atualizados com sucesso"
        }

        return output
    }

    public deleteUser = async (input: DeleteUserInputDTO): Promise<DeleteUserOutputDTO> => {
        const { email, password } = input

        const userDB = await this.userDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new BadRequest("Email incorreto")
        }

        const isPasswordCorrect = await this.hashManager.compare(password, userDB.password)

        if (!isPasswordCorrect) {
            throw new BadRequest("Senha incorreta")
        }

        await this.userDatabase.deleteUser(userDB.id)

        const output = {
            message: "Conta deletada com sucesso"
        }

        return output
    }

}