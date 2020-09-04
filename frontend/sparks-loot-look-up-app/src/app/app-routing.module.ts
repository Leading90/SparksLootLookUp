import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DataDisplayComponent} from './components/data-display/data-display.component';
import {PlayerDataComponent} from './components/player-data/player-data.component';
import {RaidViewComponent} from './components/raid-view/raid-view.component';
import {DefaultComponent} from './components/default/default.component';


const routes: Routes = [
  {path: 'item', component: DataDisplayComponent},
  {path: 'player', component: PlayerDataComponent},
  {path: 'raid', component: RaidViewComponent},
  {path: 'home', component: DefaultComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
