import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // SharedModule, / imported in CoreModule
    CoreModule,
    // AppRoutingModule, //imported and exported in CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
