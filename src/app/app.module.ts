import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GiftComponent } from './gift/gift.component';
import { GiftCardComponent } from './gift-card/gift-card.component';

@NgModule({
  declarations: [
    AppComponent,
    GiftComponent,
    GiftCardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
