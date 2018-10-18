import { formatTime, parseTime } from '@/utils/index'

export default {
  name: 'panelTime',
  props: {
    timePickerOptions: {
      type: [Object, Function],
      default () {
        return null
      }
    },
    minuteStep: {
      type: Number,
      default: 0,
      validator: val => val >= 0 && val <= 60
    },
    value: null,
    timeType: {
      type: Array,
      default () {
        return ['24', 'a']
      }
    },
    disabledTime: Function
  },
  computed: {
    currentHours () {
      return this.value ? new Date(this.value).getHours() : 0
    },
    currentMinutes () {
      return this.value ? new Date(this.value).getMinutes() : 0
    },
    currentSeconds () {
      return this.value ? new Date(this.value).getSeconds() : 0
    }
  },
  methods: {
    stringifyText (value) {
      return ('00' + value).slice(String(value).length)
    },
    selectTime (time) {
      if (typeof this.disabledTime === 'function' && this.disabledTime(time)) {
        return
      }
      this.$emit('select', new Date(time))
    },
    pickTime (time) {
      if (typeof this.disabledTime === 'function' && this.disabledTime(time)) {
        return
      }
      this.$emit('pick', new Date(time))
    },
    getTimeSelectOptions () {
      const result = []
      const options = this.timePickerOptions
      if (!options) {
        return []
      }
      if (typeof options === 'function') {
        return options() || []
      }
      const start = parseTime(options.start)
      const end = parseTime(options.end)
      const step = parseTime(options.step)
      if (start && end && step) {
        const startMinutes = start.minutes + start.hours * 60
        const endMinutes = end.minutes + end.hours * 60
        const stepMinutes = step.minutes + step.hours * 60
        const len = Math.floor((endMinutes - startMinutes) / stepMinutes)
        for (let i = 0; i <= len; i++) {
          let timeMinutes = startMinutes + i * stepMinutes
          let hours = Math.floor(timeMinutes / 60)
          let minutes = timeMinutes % 60
          let value = {
            hours, minutes
          }
          result.push({
            value,
            label: formatTime(value, ...this.timeType)
          })
        }
        let userDefined = options.userDefined
        if (Array.isArray(userDefined) && userDefined.length) {
          for (let i = 0, userDefinedLen = userDefined.length; i < userDefinedLen; i++) {
            var userArr = userDefined[i].split(':')
            let hours = userArr[0]
            let minutes = userArr[1]
            let seconds = userArr[2] ? userArr[2] : ''
            let value = {
              hours, minutes, seconds
            }
            result.push({
              value,
              label: formatTime(value, ...this.timeType)
            })
          }
        }
      }
      return result
    }

  },
  render (h) {
    const date = new Date(this.value)
    const disabledTime = typeof this.disabledTime === 'function' && this.disabledTime
    let pickers = this.getTimeSelectOptions()
    if (Array.isArray(pickers) && pickers.length) {
      pickers = pickers.map(picker => {
        const pickHours = picker.value.hours
        const pickMinutes = picker.value.minutes
        const pickSeconds = picker.value.seconds ? picker.value.seconds : 0
        const time = new Date(date).setHours(pickHours, pickMinutes, pickSeconds)
        return (
          <li
            class={{
              'mx-time-picker-item': true,
              'cell': true,
              'actived': pickHours.toString() === this.currentHours.toString() && pickMinutes.toString() === this.currentMinutes.toString(),
              'disabled': disabledTime && disabledTime(time)
            }}
            onClick={this.pickTime.bind(this, time)}>{picker.label}</li>
        )
      })
      return (
        <div class="mx-panel mx-panel-time">
          <ul class="mx-time-list">
            {pickers}
          </ul>
        </div>
      )
    }

    const hours = Array.apply(null, { length: 24 }).map((_, i) => {
      const time = new Date(date).setHours(i)
      return <li
        class={{
          'cell': true,
          'actived': i === this.currentHours,
          'disabled': disabledTime && disabledTime(time)
        }}
        onClick={this.selectTime.bind(this, time)}
      >{this.stringifyText(i)}</li>
    })

    const step = this.minuteStep || 1
    const length = parseInt(60 / step)
    const minutes = Array.apply(null, { length }).map((_, i) => {
      const value = i * step
      const time = new Date(date).setMinutes(value)
      return <li
        class={{
          'cell': true,
          'actived': value === this.currentMinutes,
          'disabled': disabledTime && disabledTime(time)
        }}
        onClick={this.selectTime.bind(this, time)}
      >{this.stringifyText(value)}</li>
    })

    const seconds = Array.apply(null, { length: 60 }).map((_, i) => {
      const time = new Date(date).setSeconds(i)
      return <li
        class={{
          'cell': true,
          'actived': i === this.currentSeconds,
          'disabled': disabledTime && disabledTime(time)
        }}
        onClick={this.selectTime.bind(this, time)}
      >{this.stringifyText(i)}</li>
    })

    let times = [hours, minutes]
    if (this.minuteStep === 0) {
      times.push(seconds)
    }

    times = times.map(list => (
      <ul class="mx-time-list"
        style={{ width: 100 / times.length + '%' }}>
        {list}
      </ul>
    ))

    return (
      <div class="mx-panel mx-panel-time">
        {times}
      </div>
    )
  }
}
