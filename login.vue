<template>
  <div class="loginBox">
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
    </date-picker>
  </div>
</template>
<script>
import DatePicker from '@/components/my-datepicker/src/index.vue'
import mixdate from '@/components/my-datepicker/mixdatepicker.js'
export default {
  mixins: [mixdate],
  components: {
    DatePicker,
  }
}
</script>
