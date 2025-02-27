import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ApplicationPostSchemasPostReadSchema, PostService } from '../../data/services/rest';
import { Profile, ProfileService } from '../../data/services/profile.service';
import { debounceTime, map, mergeMap, Observable, Subscription, zip } from 'rxjs';
import { AvatarFullUrlPipe } from "../../pipes/avatar-full-url.pipe";
import { ProfileAvatarComponent } from "../../common-ui/profile-avatar/profile-avatar.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-page',
  imports: [PostComponent, MaterialModule, 
    ReactiveFormsModule, MatButtonModule, AvatarFullUrlPipe,
     ProfileAvatarComponent, MatMenuModule, MatRadioModule],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss'
})
export class BlogPageComponent implements OnInit, OnDestroy {
  subscription: Subscription | null = null;
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

  profile: Profile | null = null;

  postFilter = new FormControl<string>('allPosts');

  constructor() {
        
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void { 
    this.subscription = this.profileService.getMyProfile()
      //.pipe(takeUntilDestroyed())
      .subscribe(p => {
        this.me = p;
        if (!this.profileId) {
          this.profile = p;
        }
        this.loadPosts();        
      });    

    this.postFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(x => {
        this.loadPosts();
      });
         
    if (this.profileId) {      
      this.profileService.getProfileById(this.profileId)
      .subscribe(x=>this.profile = x);
    }    
  }
  

  loadPosts() {

    let myPosts$ = this.postService.getPostsPostGet(this.profileIdNum());
    if (this.postFilter.value === 'allPosts' && !this.profileId) {
      let mySubscriptionPosts$ = this.postService.getMySubscriptionsPostPostMySubscriptionsGet();
      myPosts$ = zip(myPosts$, mySubscriptionPosts$)
                .pipe(
                  map(([myPosts, mySubscriptionPosts]) => {
                    return [...myPosts, ...mySubscriptionPosts];
                  
                }));
      
    }

    myPosts$.subscribe(p => this.posts = p.sort((a, b) => (a.updatedAt ?? a.createdAt) < (b.updatedAt ?? b.createdAt) ? 1 : -1));
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