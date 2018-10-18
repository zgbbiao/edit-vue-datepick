import Vue from 'vue'
// import DatePicker from '@/index'
import DatePicker from '../lib/index.js'
import { formatDate } from '@/utils/index.js'
Vue.use(DatePicker)

new Vue({  // eslint-disable-line
  el: '#app',
  data () {
    return {
      value1: new Date(),
      value2: '',
      value3: new Date(),
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: new Date(),
      value11: new Date(),
      value12: ''
    }
  },
    created () {

    },
  methods: {
    getD(a) {
        a.confirm()
        this.value7 = formatDate(new Date(), 'YYYY-MM-DD hh:mm:ss')
    },
    getSource (obj) {
      return Object.keys(obj).map(key => {
        const value = obj[key]
        return (
          <section class="source">
            <label class="label">{key} : </label>
            {Vue.compile(value).render.call(this)}
          </section>
        )
      })
    },
    getPre (obj) {
      return Object.keys(obj).map(key => {
        const value = obj[key].replace(/\n/g, '').replace(/\s+/g, ' ')
        return (
          <pre class="pre">
            <code class="language-html">{value}</code>
          </pre>
        )
      })
    }
  },
  render (h) {
    const example1 = {
      'base': '<date-picker v-model="value1" lang="en" :not-before="new Date()"></date-picker>',
      'range': '<date-picker v-model="value2" range appendToBody></date-picker>',
      'month': '<date-picker v-model="value10" lang="en" type="month" format="YYYY-MM"></date-picker>',
      'year': '<date-picker v-model="value11" lang="en" type="year" format="YYYY"></date-picker>',
      'time': '<date-picker v-model="value12" lang="en" type="time" format="HH:mm:ss" placeholder="Select Time"></date-picker>'
    }
    const example2 = {
      'datetime': `
        <date-picker
          v-model="value3"
          lang="en"
          type="datetime"
          format="[on] MM-DD-YYYY [at] HH:mm"></date-picker>`,
      'datetime with time-picker-options': `
        <date-picker
          v-model="value4"
          lang="en"
          type="datetime"
          appendToBody
          :time-picker-options="{
            start: '00:00',
            step: '00:30',
            end: '23:30'
          }"></date-picker>`,
      'datetime with minute-step': `
        <date-picker
          v-model="value9"
          lang="en"
          type="datetime"
          format="YYYY-MM-DD hh:mm:ss a"
          :minute-step="10"
          ></date-picker>`,
      'datetime range': `
        <date-picker
          v-model="value5"
          range
          type="datetime"
          lang="en"
          format="YYYY-MM-DD HH:mm:ss"></date-picker>`
    }
    const example3 = {
      'with confirm': `
        <date-picker
          v-model="value6"
          format="YYYY-MM-DD"
          lang="en"
          confirm></date-picker>`,
      'datetime with confirm': `
        <date-picker
          v-model="value7"
          type="datetime"
          lang="en"
      :editable="false"
             format="YYYY-MM-DD HH:mm:ss"
          :time-picker-options="{
          start: '00:00',
          step: '00:60',
          end: '23:00',
          userDefined: [
                '23:59:59'
            ]
          }"
          confirm>
          <template slot="footer" slot-scope="slotFooter">
                  <div class="mx-datepicker-footer">
                  <button type="button"  class="mx-datepicker-btn mx-datepicker-btn-confirm" @click="getD(slotFooter)" >此刻</button>
                  <button type="button" v-if="slotFooter.isconfirm" class="mx-datepicker-btn mx-datepicker-btn-confirm"  @click="slotFooter.confirm">{{slotFooter.confirmText}}</button>
                  </div>
          </template>
          
</date-picker>`,
      'range width confirm': `
        <date-picker
          v-model="value8"
          range
          lang="en"
          format="YYYY-MM-DD"
          confirm></date-picker>`
    }
    const arr = [
      {
        exam: example1
      },
      {
        exam: example2,
        tips: 'if you use the datetime, you should set the format to "YYYY-MM-DD HH:mm:ss" which default is "YYY-MM-DD'
      },
      {
        exam: example3,
        tips: 'Recommend to use the confirm option when the type is "datetime" or "range" is true'
      }
    ]
    return (
      <div id="app">
        {arr.map(obj => (
          <div class="example">
            {this.getSource(obj.exam)}
            {
              obj.tips
                ? <blockquote class="tips">{obj.tips}</blockquote>
                : ''
            }
            {this.getPre(obj.exam)}
          </div>
        ))}
      </div>
    )
  }
})
