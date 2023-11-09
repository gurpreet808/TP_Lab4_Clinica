import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObrasSocialesComponent } from './obras-sociales.component';

const routes: Routes = [{ path: '', component: ObrasSocialesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObrasSocialesRoutingModule { }
