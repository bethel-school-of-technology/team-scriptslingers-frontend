
export class Comment {
    commentId?: number;
    commenter?: string;
    commentContent?: string;
    postedAt?: Date;
    postId?: number;

    constructor(commentId?: number, commenter?: string, commentContent?: string, postedAt?: Date, postId?: number) {
        this.commentId = commentId;
        this.commenter = commenter;
        this.commentContent = commentContent;
        this.postedAt = postedAt;
        this.postId = postId;
    }
}
