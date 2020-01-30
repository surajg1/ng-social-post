import { map } from 'rxjs/operators';
import {Post} from './post.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl+"/posts/";



@Injectable({providedIn:'root'})
export class PostService{
    private posts:Post[]=[];
    private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

    constructor(private http:HttpClient, private router : Router){}

    getPosts(postsPerPage : number, currentPage: number){
        const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
        // return [...this.posts];
        return this.http.get<{message: string , posts: any, maxPosts: number}>
        (BACKEND_URL + queryParams)
        .pipe(map((postData)=>{
            return {posts: postData.posts.map(post =>{
                return{ title: post.title,
                 content : post.content,
                 id: post._id,
                 imagePath : post.imagePath,
                 creator : post.creator
                };   
            }),
             maxPosts: postData.maxPosts};
        }))
        .subscribe((TransformedpostsData)=>{
            console.log(TransformedpostsData);
           this.posts = TransformedpostsData.posts;
           this.postsUpdated.next({
                        posts:[...this.posts],
                      postCount:+TransformedpostsData.maxPosts
                    });
        });
    }
    
    updatePost(id : string, title : string, content : string, image: any ){
        // const post: Post = { id: id, title : title, content:content, imagePath : null };
        let postData: Post | FormData;
        if(typeof(image) === 'object'){
            postData = new FormData();
            postData.append("id" ,id);
            postData.append("title", title);
            postData.append("content" , content);
            postData.append("image",image,title);
        }else{
             postData = {
                 id:id, title:title, content:content, imagePath:image, creator: null};
        }

        this.http.put(BACKEND_URL+id,postData)
        .subscribe(response => {
          
            this.router.navigate(["/"]);

        })
    }
    
    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    getPost(id:string){

        return this.http.get<{_id:string, title:string, content:string, imagePath: string, creator: string}>(BACKEND_URL+id);

    }

    addPosts(title:any ,content:any , image: File){
        // const post:Post = {id:null,title : title , content :content};
        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);
        
        this.http
        .post<{message : string, post: Post}>(BACKEND_URL,postData)
        .subscribe(responseData => {
           
        this.router.navigate(["/"]);
        });
    }

    deletePosts(postId : string){
        // alert(postId);
        
        return this.http.delete(BACKEND_URL+postId);
       
    }

}