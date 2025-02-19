import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { AjoutSprintBacklogComponent } from "./ajouter-sprint-backlog.component";
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {path: 'AjouterSprintBacklog',component: AjoutSprintBacklogComponent,data: { animation: 'layout' }}
  ];
  
  @NgModule({
    declarations: [AjoutSprintBacklogComponent],
    imports: [RouterModule.forChild(routes), ContentHeaderModule, CardSnippetModule,ReactiveFormsModule, FormsModule, CoreCommonModule]
  })
  export class AjouterSprintBacklogModule {}