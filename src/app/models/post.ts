export class Post {
    postId?: number;
    hostName?: string;
    postContent?: string;
    postedAt?: Date;

    constructor(postId?: number, hostName?: string, postContent?: string, postedAt?: Date) {
        this.postId = postId;
        this.hostName = hostName;
        this.postContent = postContent;
        this.postedAt = postedAt;
    }
}
