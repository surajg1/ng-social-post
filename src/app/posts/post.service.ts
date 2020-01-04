import {Post} from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class PostService{
    private posts:Post[]=[];
    private postsUpdated = new Subject<Post[]>();

    getPosts(){
        return [...this.posts];
    }
    
        getPostUpdateListener(){
            return this.postsUpdated.asObservable();
        }

    addPosts(title:String ,content:String){
        const post:Post = {title : title , content :content};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }

}