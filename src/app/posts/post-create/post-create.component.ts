import { Component, OnInit } from '@angular/core';
// import{Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent  {
  enteredTitle = "";
  enteredContent = "";
 
//  postCreated = new EventEmitter<Post>();

  constructor(public postService : PostService) { }

 

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    // alert("Hello");
    this.postService.addPosts(form.value.title ,form.value.content);
    form.resetForm();
  }

}
