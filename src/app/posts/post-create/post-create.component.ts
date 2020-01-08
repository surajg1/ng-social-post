import { Component, OnInit } from '@angular/core';
// import{Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { element } from 'protractor';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  private mode = 'create';
  private postId : string;
   post: Post;
//  postCreated = new EventEmitter<Post>();

  constructor(public postService : PostService , public route: ActivatedRoute) { }

 
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap : ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        // console.log(this.postId);
        this.postService.getPost(this.postId).subscribe(post=>{
          this.post={
            id : post._id,
            title: post.title,
            content: post.content
          };
        });
      }else{
        this.mode = 'create';
        this.postId=null;
      }
    });
  }

  onSavePost(form: NgForm){
    if(form.invalid){
      return;
    }
    // alert("Hello");
    if(this.mode == "create"){ 
    this.postService.addPosts(form.value.title ,form.value.content);
    form.resetForm();
    }else{
      this.postService.updatePost(this.postId,form.value.title ,form.value.content);
    form.resetForm();
    }
  }

}
