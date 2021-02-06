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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Summary',
  computed: {
    ...mapGetters([
      'getScheduledPayment',
      'getScheduledNumberOfPayments',
      'getActualNumberOfPayments',
      'getTotalEarlyPayments',
      'getTotalInterest'
    ])
  }
}
</script>
