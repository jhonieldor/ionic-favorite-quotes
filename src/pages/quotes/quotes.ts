import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface'
import { QuotesService } from '../../services/quotes.service';

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {

  quoteGroup: { category: string, quotes: Quote[], icon: string };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtr: AlertController, private quoteService: QuotesService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesPage');
    this.quoteGroup = this.navParams.data
  }

  onAddToFavorites(quote: Quote) {
    const alert = this.alertCtr.create({
      title: 'Add Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the quote?',
      buttons: [
        {
          text: 'No, I changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled!')
          }
        },
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.quoteService.addQuoteToFavorites(quote)
          }
        }
      ]
    })

    alert.present();

    
  }

  onRemoveFromFavorites(quote: Quote){
      this.quoteService.removeQuoteFromFavorites(quote)
  }

  isFavorite(quote: Quote){
    return this.quoteService.isQuoteFavorite(quote)
  }

}
