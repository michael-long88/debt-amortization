<template>
  <div class="mt-4 flex flex-col max-h-80 lg:mt-6">
    <div class="flex-grow overflow-auto">
      <!-- Responsive tailwind table: https://tailwindcomponents.com/component/responsive-table -->
      <table class="border-collapse mx-auto">
        <thead>
          <tr class="">
            <th v-for="header in tableHeaders" :key="header" class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell lg:sticky lg:top-0">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index" class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td v-for="header in tableHeaders" :key="header + '-' + index" class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">{{ header }}</span>
              {{ row[header] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
      const payments = this.getPayments.map(payment => {
        return Object.keys(payment).reduce((acc, datum) => {
          acc[datum] = nonCurrencyList.includes(datum) ? payment[datum] : payment[datum].toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          return acc
        }, {})
      }, [])
      return payments
    }
  }
}
</script>
