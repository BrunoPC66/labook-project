export interface LikeDislikeDB {
  user_id: string,
  post_id: string,
  like: number
}

export enum POST_LIKE {
  LIKED = 'LIKED',
  DISLIKED = 'DISLIKED'
}

export class LikeDislike {
  constructor(
    private userId: string,
    private postId: string,
    private like: boolean
  ) { }


}
