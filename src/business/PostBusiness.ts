import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO } from "../dtos/dto-post/createPost.dto";
import { DeletePostInputDTO } from "../dtos/dto-post/deletePost.dto";
import { GetPostInputDTO } from "../dtos/dto-post/getPost.dto";
import { EditPostInputDTO, EditPostOuputDTO } from "../dtos/dto-post/updatePost.dto";
import { BadRequest } from "../errors/BadRequest";
import { Post, PostDB, PostModel } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private tokenManager: TokenManager
    ) { }

    public getPost = async (input: GetPostInputDTO): Promise<PostModel[]> => {
        const { q, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequest('Requisição não autorizada')
        }

        const postPlusCreatorName = await this.postDatabase.findPostPlusCreatorName(q)

        const output: PostModel[] = postPlusCreatorName.map((post: any) =>
            new Post(
                post.id,
                post.content,
                post.likes,
                post.dislikes,
                post.created_at,
                post.updated_at,
                post.creator_id,
                post.creator_name
            ).postToBusiness()
        )

        return output
    }

    public createPost = async (input: CreatePostInputDTO): Promise<void> => {
        const { content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequest("Requisição não autorizada")
        }

        const id = IdGenerator.generator()

        const postDB = new Post(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        ).postToDB()

        await this.postDatabase.insertPost(postDB)
    }

    public editPost = async (input: EditPostInputDTO): Promise<EditPostOuputDTO> => {
        const {
            id,
            newContent,
            token
        } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequest()
        }

        const postDB = await this.postDatabase.findPostById(id)

        if (!postDB) {
            throw new BadRequest("Post não encontrado")
        }

        if (postDB.creator_id !== payload.id) {
            throw new BadRequest("Edição não permitida")
        }

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            postDB.creator_name
        )

        if (newContent) {
            post.setContent(newContent)
        }

        const editedPost: PostDB = post.postToDB()

        await this.postDatabase.editPost(editedPost)

        const output = { content: post.getContent() }

        return output
    }

    public deletePost = async (input: DeletePostInputDTO): Promise<void> => {
        const {
            id,
            token
        } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequest()
        }

        const postDB = await this.postDatabase.findPostById(id)

        if (!postDB) {
            throw new BadRequest("Post não encontrado")
        }

        await this.postDatabase.deletePost(id)
    }

}