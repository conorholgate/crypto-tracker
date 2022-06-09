import { defineStore } from "pinia";
import axios from 'axios'

export const useCryptoStore = defineStore('crypto',{
    state: () => {
        return {
            allCoins: [],
            search: '',
            sort: {
                currency: 'GBP',
                selectedLimit: '50',
                activeSort: 'market_cap',
                sortDir: 'desc'
            }
            
        }
    },
    actions: {
        getPrices() {
            axios.get('http://api/latest', {params: this.sort}).then(res => {
                this.allCoins = res.data.data
            })
            .catch(err => {
                console.log(err)
            }) 
        },
        sortByName() {
            if (this.sort.name === '') {
                this.sort.name = 'asc'
            } else if (this.sort.name === 'asc') {
                this.sort.name = 'desc'
            } else if (this.sort.name === 'desc') {
                this.sort.name = 'asc'
            }
            axios.get('http://api/latest/sort', {params: {currency: this.currency, type: 'name', direction: this.sort.name}}).then(res => {
                this.allCoins = res.data.data
            })
            .catch(err => {
                console.log(err)
            }) 
        },
        sortByPrice() {
            if (this.sort.price === '') {
                this.sort.price = 'asc'
            } else if (this.sort.price === 'asc') {
                this.sort.price = 'desc'
            } else if (this.sort.price === 'desc') {
                this.sort.price = 'asc'
            }
            console.log(this.sort.price);
            axios.get('http://api/latest/sort', {params: {currency: this.currency, type: 'price', direction: this.sort.price }}).then(res => {
                this.allCoins = res.data.data
            })
            .catch(err => {
                console.log(err)
            }) 
        },
        setCurrency(currency) {
            if (this.currency === currency) {
                return
            }
            this.sort.currency = currency
            this.getPrices()
        },
        setLimit(limit){
            this.sort.selectedLimit = limit
            this.getPrices()
        }
    }
})

	
// string
// "market_cap"
// "name""symbol""date_added""market_cap""market_cap_strict""price""circulating_supply""total_supply""max_supply""num_market_pairs""volume_24h""percent_change_1h""percent_change_24h""percent_change_7d""market_cap_by_total_supply_strict""volume_7d""volume_30d"
