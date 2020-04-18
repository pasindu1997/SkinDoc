import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeGuard} from './guards/home.guard';

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

    },
    {
        path: 'cancer-updates',
        loadChildren: () => import('./cancer-updates/cancer-updates.module').then(m => m.CancerUpdatesPageModule),
        canActivate : [HomeGuard]
    },
    {
        path: 'inquire-skin-clinic',
        loadChildren: () => import('./inquire-skin-clinic/inquire-skin-clinic.module').then(m => m.InquireSkinClinicPageModule)
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
