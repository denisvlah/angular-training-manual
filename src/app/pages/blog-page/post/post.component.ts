import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AccountService, ApplicationPostSchemasPostReadSchema, CommentService, PostService } from '../../../data/services/rest';
import { AvatarFullUrlPipe } from "../../../pipes/avatar-full-url.pipe";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileService } from '../../../data/services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  imports: [MaterialModule, AvatarFullUrlPipe, ReactiveFormsModule, MatMenuModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  startEditPost() {
    this.postEditMode = true;
  }
  updatePost() {
    this.postService.updatePostPostPostIdPatch(this.post.id, {
      title: this.editPostcontrol.value,
      content: this.post.content
    })
    .subscribe(x=>{
      this.post.title = x.title;
      this.cancellEditPost();
    })
  }
  cancellEditPost() {
    this.postEditMode = false;
    this.editPostcontrol.reset();
    this.editPostcontrol.setValue(this.post.title);
  }

  @Input() post!: ApplicationPostSchemasPostReadSchema;

  @Output() postDeleted = new EventEmitter<number>();

  myProfileDescription: Subscription | null = null;

  fb = inject(FormBuilder);

  commentService = inject(CommentService);
  postService = inject(PostService);
  profileService = inject(ProfileService);

  form = this.fb.group({
    commentText: ['', Validators.minLength(3)]
  });
  likesForm = this.fb.group({

  });
  canEditPost = false;

  postEditMode = false;
  editPostcontrol = new FormControl<string>('');

  sendComment() {
    if (this.form.valid) {
      this.commentService.createCommentCommentPost({
        text: this.form.value.commentText!,
        postId: this.post.id,
      })
        .subscribe(c => {
          this.refreshPost();
          this.form.reset();
        });
    }
  }

  refreshPost() {
    this.postService.getPostPostPostIdGet(this.post.id)
      .subscribe(p => {
        this.post = p;
      });
  }

  likePost() {

    this.postService.createLikePostLikePostIdPost(this.post.id)
      .subscribe(x => this.refreshPost());
  }

  removePost() {
    this.postService.deletePostPostPostIdDelete(this.post.id)
      .subscribe(x => {
        this.postDeleted.emit(this.post.id);
      });
  }

  ngOnInit(): void {
    this.myProfileDescription = this.profileService.getMyProfile().subscribe(p => {
      this.canEditPost = p.id === this.post.author.id;
      this.myProfileDescription?.unsubscribe();
    })
  }

}
