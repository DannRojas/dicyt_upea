import { RegisterComponent } from './components/user/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IdentidadComponent } from './components/dicyt/identity/identidad.component';
import { VicerrectoradoComponent } from './components/vicerrectorado/vicerrectorado.component';
import { DirectorComponent } from './components/dicyt/director/director.component';
import { PersonalComponent } from './components/dicyt/personal/personal.component';
import { DetailsInvestigationComponent } from './components/projects/details-investigation/details-investigation.component';
import { DetailsProjectsComponent } from './components/projects/details-projects/details-projects.component';
import { IdhProjectsComponent } from './components/projects/idh-projects/idh-projects.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { InstituteComponent } from './components/institute/institute.component';
import { InstituteDetailComponent } from './components/institute-detail/institute-detail.component';
import { InvestigationProjectsComponent } from './components/projects/investigation-projects/investigation-projects.component';
import { IdhReceptionComponent } from './components/projects/idh-reception/idh-reception.component';
import { InvestigationReceptionComponent } from './components/projects/investigation-reception/investigation-reception.component';
import { FormProjectComponent } from './components/projects/investigation-projects/form-project/form-project.component';
import { InvestigationDetailComponent } from './components/projects/investigation-projects/investigation-detail/investigation-detail.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'identity', component: IdentidadComponent},
  {path: 'vicerrectorado', component: VicerrectoradoComponent},
  {path: 'director', component: DirectorComponent},
  {path: 'personal', component: PersonalComponent},
  {path: 'details/investigation', component: DetailsInvestigationComponent},
  {path: 'project/idh', component: IdhProjectsComponent},
  {path: 'investigations/:id', component: InvestigationProjectsComponent},
  {path: 'investigation/:id', component: FormProjectComponent},
  {path: 'investigation-detail/:id', component: InvestigationDetailComponent},
  {path: 'user/user-list', component: UserListComponent},
  {path: 'user/register/:id', component: RegisterComponent},
  {path: 'details/project/:id', component: DetailsProjectsComponent},
  {path: 'institute', component: InstituteComponent},
  {path: 'institute/:code', component: InstituteDetailComponent},
  {path: 'idhreception/:id', component: IdhReceptionComponent},
  {path: 'investigationreception/:id', component: InvestigationReceptionComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
