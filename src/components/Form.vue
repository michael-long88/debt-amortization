<template>
  <div class="container mx-auto">
    <form action="#" method="POST">
        <div class="col-span-12 mx-6 md:mx-0">
          <div class="form-float-div">
            <input type="number" v-model.number="loanAmount" name="loanAmount" placeholder=" " min="1" step=".01" class="form-float-input" required/>
            <label for="loanAmount" class="form-float-label">Loan Amount</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="interestRate" name="annualInterestRate" placeholder=" " min="1" step=".01" class="form-float-input" required/>
            <label for="annualInterestRate" class="form-float-label">Annual Interest Rate</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="loanPeriod" name="loanPeriod" placeholder=" " min="1" step="1" class="form-float-input" required/>
            <label for="loanPeriod" class="form-float-label">Loan Period in Years</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="numberOfPayments" name="numberOfPayments" placeholder=" " min="1" step="1" max="12" class="form-float-input" required/>
            <label for="numberOfPayments" class="form-float-label">Number of Payments Per Year</label>
          </div>
          <div class="form-float-div">
            <input type="text" v-model="startDate" name="loanStartDate" placeholder=" " class="form-float-input" onfocus="(this.type='date')" onfocusout="(this.type='text')" required/>
            <label for="loanStartDate" class="form-float-label">Loan Start Date</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="extraPaymentAmount" name="optionalExtraPayments" placeholder=" " min="1" step="any" class="form-float-input"/>
            <label for="optionalExtraPayments" class="form-float-label">Optional Extra Payments</label>
          </div>
        </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Form',
  data () {
    return {
      loanAmount: null,
      interestRate: null,
      loanPeriod: null,
      numberOfPayments: null,
      startDate: null,
      extraPaymentAmount: null
    }
  }
}
</script>
