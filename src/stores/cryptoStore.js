import { defineStore } from 'pinia'
import axios from 'axios'
import { showToast } from '../utilities/toast'

export const useCryptoStore = defineStore('crypto', {
  state: () => {
    return {
      allCoins: [],
      search: '',
      sort: {
        currency: 'GBP',
        selectedLimit: 50,
        activeSort: 'market_cap',
        sortDir: 'desc',
        start: 1,
      },
      loading: false,
    }
  },
  actions: {
    async getPrices() {
      this.loading = true
      try {
        let {
          data: { data: response },
        } = await axios.get(`${import.meta.env.VITE_API_ROUTE}/latest`, { params: this.sort })
        this.allCoins = await response
        this.loading = false
      } catch (error) {
        this.loading = false
        showToast(error.message, 'error')
      }
    },
    nextPage() {
      this.sort.start = this.sort.start + this.sort.selectedLimit
      this.getPrices()
    },
    previousPage() {
      if (this.sort.start > this.sort.selectedLimit) {
        this.sort.start = this.sort.start - this.sort.selectedLimit
        this.getPrices()
      }
    },
    goToPage(index) {
      if (index === 0) {
        this.sort.start = 1
      } else {
        this.sort.start = index * this.sort.selectedLimit + 1
      }
      this.getPrices()
    },
    sortBy(value) {
      if (this.sort.activeSort === value) {
        if (this.sort.sortDir === 'desc') {
          this.sort.sortDir = 'asc'
        } else {
          this.sort.sortDir = 'desc'
        }
      }
      this.sort.activeSort = value
      this.getPrices()
    },
    onSearch() {
      axios
        .get(`${import.meta.env.VITE_API_ROUTE}/search`, { params: { search: this.search } })
        .then(res => {
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
    setLimit(limit) {
      this.sort.selectedLimit = limit
      this.getPrices()
    },
  },
})

// string
// "market_cap"
// "name""symbol""date_added""market_cap""market_cap_strict""price""circulating_supply""total_supply""max_supply""num_market_pairs""volume_24h""percent_change_1h""percent_change_24h""percent_change_7d""market_cap_by_total_supply_strict""volume_7d""volume_30d"
