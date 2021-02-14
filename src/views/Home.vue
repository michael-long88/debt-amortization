<template>
  <div class="md:grid grid-cols-8">
    <div class="col-start-2 col-span-2">
      <Form />
    </div>
    <div class="lg:relative col-end-8 col-span-2">
      <Summary />
    </div>
    <div class="col-start-3 col-span-4">
      <DebtChart v-show="arePaymentsCalculated" />
    </div>
    <div class="col-span-8">
      <SummaryTable v-show="arePaymentsCalculated" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form'
import Summary from '@/components/Summary'
import SummaryTable from '@/components/SummaryTable'
import DebtChart from '@/components/DebtChart'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    Form,
    Summary,
    SummaryTable,
    DebtChart
  },
  computed: {
    ...mapGetters([
      'arePaymentsCalculated'
    ])
  }
}
</script>
