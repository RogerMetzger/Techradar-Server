import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TechnologyAdministrationComponent } from './components/technology-administration/technology-administration.component';
import { TechnologyEditComponent } from './components/technology-edit/technology-edit.component';
import { TechnologyCreateComponent } from './components/technology-create/technology-create.component';
import { TechnologyClassifyComponent } from './components/technology-classify/technology-classify.component';
import { TechnologyPublishComponent } from './components/technology-publish/technology-publish.component';

const routes: Routes = [
  {path: 'administration', component: TechnologyAdministrationComponent},
  {path: 'administration/technologies', component: TechnologyAdministrationComponent},
  {path: 'administration/technology/create', component: TechnologyCreateComponent},
  {path: 'administration/technology/edit/:id', component: TechnologyEditComponent},
  {path: 'administration/technology/classify/:id', component: TechnologyClassifyComponent},
  {path: 'administration/technology/publish/:id', component: TechnologyPublishComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
