import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeGuard} from './guards/home.guard';
import {InquireSkinClinicGuard} from './guards/inquire-skin-clinic.guard';
import {UploadImageGuard} from './guards/upload-image.guard';
import {UserTokenResolver} from "./resolver/userToken.resolver";
import {UserFirstNameResolverResolver} from "./resolver/userFirstName.resolver";

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadChildren: () => import('./login/home.module').then(m => m.HomePageModule)},
    {
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule),
    },
    {
        path: 'upload-image',
        loadChildren: () => import('./upload-image/upload-image.module').then(m => m.UploadImagePageModule),
        // canActivate: [UploadImageGuard]

    },
    {
        path: 'cancer-updates',
        loadChildren: () => import('./cancer-updates/cancer-updates.module').then(m => m.CancerUpdatesPageModule),
        canActivate : [HomeGuard],
        resolve: {
            userToken : UserTokenResolver,
            userFirstName : UserFirstNameResolverResolver
        }
    },
    {
        path: 'inquire-skin-clinic',
        loadChildren: () => import('./inquire-skin-clinic/inquire-skin-clinic.module').then(m => m.InquireSkinClinicPageModule),
        canActivate : [InquireSkinClinicGuard]
    },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
