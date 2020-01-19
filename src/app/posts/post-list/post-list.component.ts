import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  // Post = [
  //   { title:'FirstPost' ,content:'This is first post\'s content'},
  //   { title:'SecondPost' ,content:'This is second post\'s content'},
  //   { title:'ThirdPost' ,content:'This is third post\'s content'},
  // ]


  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOption = [1, 2, 3, 5, 10]

  posts:Post[]=[];
  private PostsSub: Subscription;
  private authStatusSub : Subscription;
  userIsAuthenticated = false;


  constructor(public postsService : PostService, private authService: AuthService) { 
  }
  
  ngOnInit() {
    this.isLoading = true;
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
 
      this.PostsSub = this.postsService.getPostUpdateListener()
          .subscribe((postData: {posts:Post[], postCount: number}) => {
            this.isLoading = false;
            this.totalPosts = postData.postCount;
            this.posts = postData.posts;
          });

      this.userIsAuthenticated = this.authService.getIsAuth();

      this.authStatusSub = this.authService.getAuthStatusListener().subscribe( isAuthenticated =>{
        this.userIsAuthenticated = isAuthenticated;
      })
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy(){
    this.PostsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(postId : string){
    // alert(postId);
    this.postsService.deletePosts(postId).subscribe(()=>{
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

}
