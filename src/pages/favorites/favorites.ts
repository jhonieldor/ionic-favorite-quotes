import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuClose, MenuController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes.service';
import { QuotePage } from '../quote/quote';
import { SettingsService } from '../../services/settings.service';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  quotes: Quote[]

  constructor(private quoteService: QuotesService,
    private modalCtrl: ModalController, 
    private menuCtrl: MenuController, 
    private settingsService: SettingsService) {
  }

  ionViewWillEnter() {
    this.quotes = this.quoteService.getFavoriteQuotes()
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote)
    modal.present()
    modal.onDidDismiss((remove: boolean) => {
      if(remove){
        this.onRemoveFromFavorites(quote)
      }
    })
    
    // modal.willLeave.subscribe()
  }

  onRemoveFromFavorites(quote: Quote){
    this.quoteService.removeQuoteFromFavorites(quote)
    const pos = this.quotes.findIndex((q: Quote) => {
      return q.id === quote.id
    })
    this.quotes.splice(pos, 1)
  }

  onOpenMenu(){
    this.menuCtrl.open()
  }

  getBackground(){
    return this.settingsService.isAltBackground() ? 'primary' : 'altQuoteBackground'
  }

  isAltBackground(){
    return this.settingsService.isAltBackground()
  }

}
