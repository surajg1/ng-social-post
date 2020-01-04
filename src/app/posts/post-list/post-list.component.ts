import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
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

  
  posts:Post[]=[];
  private PostsSub: Subscription;

  constructor(public postsService : PostService ) { 
  }
  
  ngOnInit() {
    this.posts = this.postsService.getPosts();
 
      this.PostsSub = this.postsService.getPostUpdateListener()
          .subscribe((posts:Post[]) => {
            this.posts =posts;
          });
  }

  ngOnDestroy(){
    this.PostsSub.unsubscribe();
  }

}
