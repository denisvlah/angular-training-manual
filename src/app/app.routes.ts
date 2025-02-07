import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { canActivateAuthGuard } from './data/services/access.guard';
import { ProfileEditPageComponent } from './pages/profile-edit-page/profile-edit-page.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent, children: [
            {
                path: '',
                component: SearchPageComponent
            },
            {
                path: 'edit-my-profile',
                component: ProfileEditPageComponent
            }
        ],
        canActivate: [canActivateAuthGuard]
    },
    {
        path: 'login',
        component: LoginPageComponent
    }
];
