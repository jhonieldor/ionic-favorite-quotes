import { Quote } from '../data/quote.interface'

export class QuotesService {
    private favoriteQuotes: Quote[] = []

    addQuoteToFavorites(quote: Quote){
        this.favoriteQuotes.push(quote)
        console.log(this.favoriteQuotes)
    }

    removeQuoteFromFavorites(quote: Quote){
        const pos = this.favoriteQuotes.findIndex((q: Quote)=> {
            return q.id === quote.id
        })
        this.favoriteQuotes.splice(pos, 1)
    }

    getFavoriteQuotes(){
        return this.favoriteQuotes.slice();
    }

    isQuoteFavorite(quote: Quote){
        return this.favoriteQuotes.find((q: Quote) => {
            return q.id === quote.id
        })
    }
}