import { Component, inject } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-blog-page',
  imports: [PostComponent, MaterialModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss'
})
export class BlogPageComponent {
  
  public static readonly PATH = ''

  fb = inject(FormBuilder);

  form = this.fb.group({
    postText: ['', Validators.minLength(3)]
  })

  canSend() {
    return this.form.valid;
  }

  snePost() {

  }

  postTextInvalid() {
    return this.form.touched && this.form.value.postText && this.form.value.postText.length < 3
  }




}
