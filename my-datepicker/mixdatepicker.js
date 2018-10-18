import { formatDate } from './src/utils/index.js'
export default {
  data () {
    return {
      value7: '',
    }
  },
  methods: {
    getD(a) {
      a.confirm()
      console.log(1)
      this.value7 = formatDate(new Date(), 'YYYY-MM-DD hh:mm:ss')
    },
  }
}
