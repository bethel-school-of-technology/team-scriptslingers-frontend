import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseURL: string = "https://localhost:7197/api/post";
  authURL: string = "https://localhost:7197/api/auth";
  tokenKey: string = "MoWildToken"

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseURL);
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(this.baseURL + "/" + postId)
  }

  createPosts(newPost: Post) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.post(this.baseURL, newPost, { headers: reqHeaders });
  }

  editPost(postId: number, editedPost: Post) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.put(this.baseURL + "/" + postId, editedPost, { headers: reqHeaders });
  }

  deletePost(postId: number) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.delete(this.baseURL + "/" + postId, { headers: reqHeaders })
  }

}
