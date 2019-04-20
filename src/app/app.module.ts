import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './reducers';
import {RevenuComponent} from './revenu/revenu.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        RevenuComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, {metaReducers})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
