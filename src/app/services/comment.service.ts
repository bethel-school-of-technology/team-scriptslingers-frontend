import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseURL: string = "https://localhost:7197/api/Comment";
  authURL: string = "https://localhost:7197/api/auth";
  tokenKey: string = "MoWildToken"

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseURL);
  }

  getCommentById(commentId: number): Observable<Comment> {
    return this.http.get<Comment>(this.baseURL + "/" + commentId)
  }

  createComment(newComment: Comment) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.post(this.baseURL, newComment, { headers: reqHeaders });
  }

  editComment(commentId: number, editedComment: Comment) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.put(this.baseURL + "/" + commentId, editedComment, { headers: reqHeaders });
  }

  deleteComment(commentId: number) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.delete(this.baseURL + "/" + commentId, { headers: reqHeaders })
  }
  
}
