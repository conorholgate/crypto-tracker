import { defineStore } from "pinia";
import axios from 'axios'

export const usePrices = defineStore('prices',{
    state: () => ({
        allCoins: [],
        currency: 'GBP',
    }),
    actions: {
        getPrices() {
            //console.log(this.currency);
            axios.get('http://localhost:8080/latest', {params: {currency: this.currency}}).then(res => {
                //console.log(res.data.data);
                this.allCoins = res.data.data
                console.log(this.allCoins);
            })
            .catch(err => {
                console.log(err)
            }) 
        }
    },
    getters: {
        getAllCoins(state) {
            return state.allCoins
        }
    }
})


export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
