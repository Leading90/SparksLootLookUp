import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataDisplayComponent} from './components/data-display/data-display.component';
import {PlayerDataComponent} from './components/player-data/player-data.component';


const routes: Routes = [
  {path: 'item', component: DataDisplayComponent},
  {path: 'player', component: PlayerDataComponent},
  { path: '**', redirectTo: '/item', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
