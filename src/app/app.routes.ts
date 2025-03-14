import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { canActivateAuthGuard } from './data/services/access.guard';
import { ProfileEditPageComponent } from './pages/profile-edit-page/profile-edit-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent, children: [
            {
                path: '',
                component: BlogPageComponent
            },
            {
                path: SearchPageComponent.PATH,
                component: SearchPageComponent
            },
            {
                path: ProfileEditPageComponent.PATH,
                component: ProfileEditPageComponent
            },
            {
                path: 'chats',
                component: ChatPageComponent
            },
            {
                path: 'blogs/:profileId',
                component: BlogPageComponent                
            }
        ],
        canActivate: [canActivateAuthGuard]
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'about',
        component: AboutPageComponent
    }
];
