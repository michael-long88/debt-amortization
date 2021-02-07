<template>
  <div>
    <table class="shadow-lg bg-white">
      <thead>
        <tr>
          <th v-for="header in tableHeaders" :key="header" class="bg-blue-100 border text-left px-8 py-4">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <td v-for="(value, subIndex) in row" :key="index + '-' + subIndex" class="border px-8 py-4">
            {{ value }}
          </td>
          <!-- <td>{{ row['Payment No.'] }}</td>
          <td>{{ row['Payment Date'] }}</td>
          <td>{{ row['Beginning Balance'] }}</td>
          <td>{{ row['Scheduled Payment'] }}</td>
          <td>{{ row['Extra Payment'] }}</td>
          <td>{{ row['Total Payment'] }}</td>
          <td>{{ row['Principal'] }}</td>
          <td>{{ row['Interest'] }}</td>
          <td>{{ row['Ending Balance'] }}</td>
          <td>{{ row['Cumulative Interest'] }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SummaryTable',
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
      return this.getPayments.map(payment => Object.keys(payment).map(header => {
        if (nonCurrencyList.includes(header)) {
          return payment[header]
        } else {
          return payment[header].toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        }
      }))
    }
  }
}
</script>
