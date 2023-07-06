import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postId: number = 0;
  currentPost: Post = new Post(this.postId);
  commentList: Comment[] = [];

  constructor(private postService: PostService, private commentService: CommentService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    

    const routeId = this.actRoute.snapshot.paramMap.get("id") ?? "";
    console.log('routeId', routeId)
    this.postId = parseInt(routeId);
    this.postService.getPostById(this.postId).subscribe(foundPost => {
      console.log(foundPost);
      this.currentPost = foundPost;
    });

    this.commentService.getAllComments().subscribe((foundComments: Comment[]) => {
      console.log(foundComments);
      this.commentList = foundComments.filter(comment => comment.postId === this.postId);
    });

  }

}
