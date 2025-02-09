import { Component, inject, OnInit } from '@angular/core';
import { ProfilePreviewComponent } from "./profile-preview/profile-preview.component";
import { AccountService } from '../../data/services/rest';
import { Profile } from '../../data/services/profile.service';
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";

@Component({
  selector: 'app-profile-edit-page',
  imports: [ProfilePreviewComponent, ProfileEditComponent],
  templateUrl: './profile-edit-page.component.html',
  styleUrl: './profile-edit-page.component.scss'
})
export class ProfileEditPageComponent implements OnInit {
  
  accountsService = inject(AccountService);
  profile: Profile | null = null;

  ngOnInit(): void {
    this.accountsService.getMeAccountMeGet()
    .subscribe(p=>{
      this.profile = p;
    })
  }

  

}
