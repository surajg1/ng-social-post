import { Component, OnInit } from '@angular/core';
// import{Post} from '../post.model';
import {  FormGroup, FormControl, Validators} from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { element } from 'protractor';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';

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
  form: FormGroup;
  imagePrevie:string;
  post: Post;
  isLoading = false;
//  postCreated = new EventEmitter<Post>();

  constructor(public postService : PostService , public route: ActivatedRoute) { }

 
  ngOnInit(){
    this.form = new FormGroup({
      title : new FormControl(null, {
        validators : [ Validators.required, Validators.minLength(3)]
      }),
      content : new FormControl(null, { 
        validators : [Validators.required]
      }),
       image : new FormControl(null, { 
        validators : [Validators.required],
        asyncValidators : [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap : ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        // console.log(this.postId);
        this.postService.getPost(this.postId).subscribe(post=>{
          this.isLoading = false;
          this.post = {
            id : post._id,
            title: post.title,
            content: post.content,
            imagePath: post.imagePath,
            creator: post.creator
          };
          this.form.setValue({
             title : this.post.title ,
             content : this.post.content,
             image : this.post.imagePath
            });
        });
      }else{
        this.mode = 'create';
        this.postId=null;
      }
    });
  }

  onImagePicked(event : Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrevie = <string>reader.result;
    };  
    reader.readAsDataURL(file);
 }

  onSavePost(){
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    // alert("Hello");
    if(this.mode == "create"){ 
    this.postService.addPosts(this.form.value.title ,this.form.value.content, this.form.value.image);
 
    }else{
      this.postService.updatePost(this.postId,this.form.value.title ,this.form.value.content, this.form.value.image);
    }
    this.form.reset();
  }

}
