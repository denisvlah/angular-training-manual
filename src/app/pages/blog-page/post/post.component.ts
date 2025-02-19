import { Component, inject, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ApplicationPostSchemasPostReadSchema, CommentService, PostService } from '../../../data/services/rest';
import { AvatarFullUrlPipe } from "../../../pipes/avatar-full-url.pipe";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  imports: [MaterialModule, AvatarFullUrlPipe, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post!: ApplicationPostSchemasPostReadSchema;

  fb = inject(FormBuilder);
  commentService = inject(CommentService);

  form = this.fb.group({
    commentText: ['', Validators.minLength(3)]
  });

  sendComment() {
    if (this.form.valid) {
      this.commentService.createCommentCommentPost({
        text: this.form.value.commentText!,
        postId: this.post.id,        
      })
        .subscribe(c=>{
          this.post.comments?.push({
            id: c.id,
            text: c.text,
            createdAt : c.createdAt,
            updatedAt : c.updatedAt,
            commentId: c.commentId,
            author: c.author,
            postId: c.postId,
            comments: []
          });
          this.form.reset();
        });
    }
  }

}
