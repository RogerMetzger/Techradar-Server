import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TechnologyAdministrationComponent } from './components/technology-administration/technology-administration.component';
import { TechnologyEditComponent } from './components/technology-edit/technology-edit.component';
import { TechnologyCreateComponent } from './components/technology-create/technology-create.component';
import { TechnologyClassifyComponent } from './components/technology-classify/technology-classify.component';
import { TechnologyPublishComponent } from './components/technology-publish/technology-publish.component';
import { TechnologyViewerComponent } from './components/technology-viewer/technology-viewer.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { Permission } from './models/permission.model';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'viewer', component: TechnologyViewerComponent, canActivate: [AuthGuard]},
  {path: 'administration', component: TechnologyAdministrationComponent, canActivate: [AuthGuard], data: {perm: Permission.READ}},
  {path: 'administration/technologies', component: TechnologyAdministrationComponent, data: {perm: Permission.READ}},
  {path: 'administration/technology/create', component: TechnologyCreateComponent, canActivate: [AuthGuard], data: {perm: Permission.CREATE}},
  {path: 'administration/technology/edit/:id', component: TechnologyEditComponent, canActivate: [AuthGuard], data: {perm: Permission.UPDATE}},
  {path: 'administration/technology/classify/:id', component: TechnologyClassifyComponent, canActivate: [AuthGuard], data: {perm: Permission.UPDATE}},
  {path: 'administration/technology/publish/:id', component: TechnologyPublishComponent, canActivate: [AuthGuard], data: {perm: Permission.PUBLISH}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
