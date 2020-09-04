import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {DataDisplayComponent} from './components/data-display/data-display.component';
import {PlayerDataComponent} from './components/player-data/player-data.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RaidViewComponent} from './components/raid-view/raid-view.component';
import {DefaultComponent} from './components/default/default.component';

@NgModule({
  declarations: [
    AppComponent,
    DataDisplayComponent,
    PlayerDataComponent,
    RaidViewComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
