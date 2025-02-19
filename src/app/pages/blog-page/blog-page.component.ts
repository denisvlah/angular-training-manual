import { Component, inject, OnInit } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AccountService, ApplicationPostSchemasPostReadSchema, PostService } from '../../data/services/rest';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blog-page',
  imports: [PostComponent, MaterialModule, ReactiveFormsModule, MatButtonModule, AsyncPipe],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss'
})
export class BlogPageComponent implements OnInit {
  
  posts: ApplicationPostSchemasPostReadSchema[] = [];
  ngOnInit(): void {
    this.postService.getPostsPostGet()
      .subscribe(p => this.posts = p);

  }

  public static readonly PATH = ''

  fb = inject(FormBuilder);
  postService = inject(PostService);
  accountService = inject(AccountService);

  form = this.fb.group({
    postText: ['', Validators.minLength(3)]
  })

  canSend() {
    return this.form.valid;
  }

  sendPost() {
    if (this.form.valid) {
      this.postService.createPostPostPost({
        title: this.form.value.postText!,
      })
        .subscribe(p => {
          this.posts.unshift(p);
          this.form.reset();
        });
    }
  }

  postTextInvalid() {
    return this.form.touched && this.form.value.postText && this.form.value.postText.length < 3
  }

  removePost($event: number) {
    if (this.posts) {
      this.posts = this.posts.filter(x => x.id !== $event)
    }
  }
}
