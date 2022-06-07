import { defineStore } from "pinia";
import axios from 'axios'

export const usePricesStore = defineStore('prices',{
    state: () => {
        return {
            allCoins: [],
            search: '',
            currency: 'GBP',
            sort: 'asc'
        }
    },
    actions: {
        getPrices() {
            axios.get('http://localhost:8080/latest', {params: {currency: this.currency}}).then(res => {
                this.allCoins = res.data.data
            })
            .catch(err => {
                console.log(err)
            }) 
        },
        sortByName() {
            axios.get('http://localhost:8080/latest/sort', {params: {currency: this.currency, type: 'name', direction: this.sort}}).then(res => {
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
            this.currency = currency
            this.getPrices()
        }
    }
})
