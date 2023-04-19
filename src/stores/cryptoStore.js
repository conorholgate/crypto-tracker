import { defineStore } from 'pinia'
import axios from 'axios'
import { showToast } from '../utilities/toast'
import router from '../router/index'

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
      availableCurrencies: ['GBP', 'USD', 'EUR'],
      availableShowQuantities: [25, 50, 100],
      loading: false,
      selectedCoin: {},
      activePage: 1,
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
        showToast('Sorry! Something went wrong', 'error')
      }
    },
    async getCoinMetadata(coin) {
      this.loading = true
      let params = {}
      if (typeof coin === 'string') {
        params = {
          slug: coin,
        }
      } else {
        params = {
          id: coin.id,
        }
      }

      try {
        let {
          data: { data: response },
        } = await axios.get(`${import.meta.env.VITE_API_ROUTE}/metadata`, { params: params })
        this.selectedCoin = await response[Object.keys(response)]
        router.push({ name: 'currencies', params: { name: params.slug ? params.slug : coin.name.toLowerCase() } })
        this.loading = false
      } catch (error) {
        router.push({ name: 'home' })
        this.loading = false
        showToast('Sorry! Something went wrong', 'error')
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
