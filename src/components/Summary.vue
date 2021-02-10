<template>
  <div>
    <div class="mx-6 md:mx-0">
      <div class="form-float-div">
        <input type="text" name="scheduledPayment" :value="getScheduledPayment" class="form-float-input" disabled/>
        <label for="scheduledPayment" class="form-float-label">Scheduled Payment</label>
      </div>
      <div class="form-float-div">
        <input type="text" name="scheduledNumberOfPayments" :value="getScheduledNumberOfPayments" class="form-float-input" disabled/>
        <label for="scheduledNumberOfPayments" class="form-float-label">Scheduled Number Of Payments</label>
      </div>
      <div class="form-float-div">
        <input type="text" name="actualNumberOfPayments" :value="getActualNumberOfPayments" class="form-float-input" disabled/>
        <label for="actualNumberOfPayments" class="form-float-label">Actual Number Of Payments</label>
      </div>
      <div class="form-float-div">
        <input type="text" name="totalEarlyPayments" :value="getTotalEarlyPayments" class="form-float-input" disabled/>
        <label for="totalEarlyPayments" class="form-float-label">Total Early Payments</label>
      </div>
      <div class="form-float-div">
        <input type="text" name="totalInterest" :value="getTotalInterest" class="form-float-input" disabled/>
        <label for="totalInterest" class="form-float-label">Total Interest</label>
      </div>
    </div>
    <div class="flex items-center justify-center h-full w-full">
      <button @click="downloadCSV()" type="button" class="rounded-full bg-blue-600 font-bold text-white px-8 py-3 transition duration-300 ease-in-out hover:bg-blue-700 mr-6 lg:absolute lg:bottom-0">
        Download CSV
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { saveAs } from 'file-saver'
export default {
  name: 'Summary',
  computed: {
    ...mapGetters([
      'getScheduledPayment',
      'getScheduledNumberOfPayments',
      'getActualNumberOfPayments',
      'getTotalEarlyPayments',
      'getTotalInterest',
      'getPayments'
    ]),
    tableHeaders () {
      return Object.keys(this.getPayments[0])
    },
    tableData () {
      const nonCurrencyList = ['Payment No.', 'Payment Date']
      const payments = this.getPayments.map(payment => {
        return Object.keys(payment).reduce((acc, datum) => {
          acc[datum] = nonCurrencyList.includes(datum) ? payment[datum] : payment[datum].toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          return acc
        }, {})
      }, [])
      return payments
    }
  },
  methods: {
    downloadCSV () {
      const headerKeys = Object.keys(this.tableData[0])
      const rows = []
      this.tableData.forEach(datum => {
        const row = []
        headerKeys.forEach(header => {
          row.push('"' + String(datum[header]) + '"')
        })
        rows.push(row)
      })
      let csv = headerKeys.join(',')
      rows.forEach(row => {
        csv += '\n'
        csv += row.join(',')
      })
      const csvBlob = new Blob([csv], { type: 'data:text/csv;charset=utf-8' })
      saveAs(csvBlob, 'payments.csv')
    }
  }
}
</script>
