import { Component, inject, Input, OnInit } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ApplicationPostSchemasPostReadSchema, PostService } from '../../data/services/rest';
import { AsyncPipe } from '@angular/common';
import { Profile, ProfileService } from '../../data/services/profile.service';
import { Subscription } from 'rxjs';
import { AvatarFullUrlPipe } from "../../pipes/avatar-full-url.pipe";
import { AvatarImageComponent } from "../profile-edit-page/avatar-image/avatar-image.component";
import { ProfileAvatarComponent } from "../../common-ui/profile-avatar/profile-avatar.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-blog-page',
  imports: [PostComponent, MaterialModule, 
    ReactiveFormsModule, MatButtonModule, AvatarFullUrlPipe,
     ProfileAvatarComponent, MatMenuModule, MatRadioModule],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss'
})
export class BlogPageComponent implements OnInit {
  profileIdNum() {
    if (this.profileId) {
      return parseInt(this.profileId);
    }
    return undefined;
  }

  @Input() profileId: string | null = null;

  profileService = inject(ProfileService);
  posts: ApplicationPostSchemasPostReadSchema[] = [];
  me: Profile | null = null;
  subscription: Subscription | null = null;

  profile: Profile | null = null;

  ngOnInit(): void {

    this.subscription = this.profileService.getMyProfile()
      .subscribe(p => {
        this.me = p;
        if (!this.profileId) {
          this.profile = p;
        }
        this.subscription?.unsubscribe();
      });

    let profileIdNum: number | undefined = undefined;
    if (this.profileId) {
      profileIdNum = parseInt(this.profileId);
      this.profileService.getProfileById(this.profileId)
      .subscribe(x=>this.profile = x);
    } 

    this.postService.getPostsPostGet(profileIdNum)
      .subscribe(p => this.posts = p);
  }

  public static readonly PATH = ''

  fb = inject(FormBuilder);
  postService = inject(PostService);

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
      this.posts = this.posts.filter(x => x.id !== $event);
    }
  }
}
