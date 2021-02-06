<template>
  <div>
    <!-- TODO: reconfigur placeholder to ' ' and value to vuex getter if !== ' ' else '' -->
    <form @submit.prevent="calculatePaymentAmounts">
        <div class="mx-6 md:mx-0">
          <div class="form-float-div">
            <input type="number" v-model.number="loanAmount" ref="loanAmount" name="loanAmount" :placeholder="getLoanAmount" min="1" step=".01" class="form-float-input" required/>
            <label for="loanAmount" @click="$refs.loanAmount.focus()" class="form-float-label">Loan Amount</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="interestRate" ref="annualInterestRate" name="annualInterestRate" :placeholder="getAnnualInterestRate" min="1" step=".01" class="form-float-input" required/>
            <label for="annualInterestRate" @click="$refs.annualInterestRate.focus()" class="form-float-label">Annual Interest Rate</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="loanPeriod" ref="loanPeriod" name="loanPeriod" :placeholder="getLoanPeriod" min="1" step="1" class="form-float-input" required/>
            <label for="loanPeriod" @click="$refs.loanPeriod.focus()" class="form-float-label">Loan Period in Years</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="numberOfPayments" ref="numberOfPayments" name="numberOfPayments" :placeholder="getNumberOfPayments" min="1" step="1" max="12" class="form-float-input" required/>
            <label for="numberOfPayments" @click="$refs.numberOfPayments.focus()" class="form-float-label">Number of Payments Per Year</label>
          </div>
          <div class="form-float-div">
            <input type="text" v-model="startDate" ref="loanStartDate" name="loanStartDate" :placeholder="getLoanStartDate" class="form-float-input" onfocus="(this.type='date')" onfocusout="(this.type='text')" required/>
            <label for="loanStartDate" @click="$refs.loanStartDate.focus()" class="form-float-label">Loan Start Date</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="extraPaymentAmount" ref="optionalExtraPayments" name="optionalExtraPayments" :placeholder="getOptionalExtraPayments" min="1" step="any" class="form-float-input"/>
            <label for="optionalExtraPayments" @click="$refs.optionalExtraPayments.focus()" class="form-float-label">Optional Extra Payments</label>
          </div>
        </div>
        <input
          type="submit"
          value="Calculate"
          class="rounded-full bg-blue-600 font-bold text-white px-8 py-3 transition duration-300 ease-in-out hover:bg-blue-700 mr-6"
        >
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Form',
  data () {
    return {
      loanAmount: null,
      interestRate: null,
      loanPeriod: null,
      numberOfPayments: null,
      startDate: null,
      extraPaymentAmount: null,
      payments: []
    }
  },
  computed: {
    ...mapGetters([
      'getLoanAmount',
      'getAnnualInterestRate',
      'getLoanPeriod',
      'getNumberOfPayments',
      'getLoanStartDate',
      'getOptionalExtraPayments'
    ]),
    calculatedPayments: function () {
      if (this.payments) {
        return this.payments
      }
      return [{
        'Payment No.': 1,
        'Payment Date': '1970-01-01',
        'Beginning Balance': 0,
        'Scheduled Payment': 0,
        'Extra Payment': 0,
        'Total Payment': 0,
        Principal: 0,
        Interest: 0,
        'Ending Balance': 0,
        'Cumulative Interest': 0
      }]
    }
  },
  methods: {
    ...mapActions([
      'setLoanAmount',
      'setAnnualInterestRate',
      'setLoanPeriod',
      'setNumberOfPayments',
      'setLoanStartDate',
      'setOptionalExtraPayments',
      'setPayments',
      'setScheduledPayment',
      'setScheduledNumberOfPayments',
      'setActualNumberOfPayments',
      'setTotalEarlyPayments',
      'setTotalInterest']),
    calculatePaymentAmounts: function () {
      this.setLoanAmount({ loanAmount: this.loanAmount })
      this.setAnnualInterestRate({ annualInterestRate: this.interestRate })
      this.setLoanPeriod({ loanPeriod: this.loanPeriod })
      this.setNumberOfPayments({ numberOfPayments: this.numberOfPayments })
      this.setLoanStartDate({ loanStartDate: this.startDate })
      this.setOptionalExtraPayments({ optionalExtraPayments: this.extraPaymentAmount })
      const payments = []
      const interestRate = this.interestRate / 100
      const rate = interestRate / this.numberOfPayments
      const totalNumberOfPayments = this.loanPeriod * this.numberOfPayments
      this.setScheduledNumberOfPayments({ scheduledNumberOfPayments: totalNumberOfPayments })
      const monthlyPayment = (this.loanAmount * rate) / (1 - ((1 + rate) ** (-1 * totalNumberOfPayments)))
      this.setScheduledPayment({ scheduledPayment: monthlyPayment })
      const splitDates = this.startDate.split('-')
      const year = parseInt(splitDates[0])
      const month = parseInt(splitDates[1])
      const day = parseInt(splitDates[2])
      let currentBalance = this.loanAmount
      const extraPayment = this.extraPaymentAmount
      let totalPayment = monthlyPayment
      let currentYear = year
      let cumulativeInterest = 0
      let rowNum = 1
      while (currentBalance > 0) {
        let currentMonth = Math.floor(month + (rowNum * (12 / this.numberOfPayments)))
        // console.log('currentMonth: ', currentMonth)
        let yearAddition = 0
        if (currentMonth >= 13) {
          yearAddition = Math.floor(currentMonth / 12)
          yearAddition = currentMonth % 12 === 0 ? yearAddition - 1 : yearAddition
        }
        // const yearAddition = Math.floor(currentMonth) % 12 === 0 ? 0 : Math.floor(currentMonth / 12)
        // const yearAddition = currentMonth >= 13 ? Math.floor(currentMonth / 12) : 0
        // console.log('yearAddition: ', yearAddition)
        currentYear = (year + yearAddition) === currentYear ? currentYear : year + yearAddition
        currentMonth = currentMonth >= 13 ? currentMonth % 12 : currentMonth
        currentMonth = currentMonth === 0 ? 12 : currentMonth
        let currentExtraPayment = 0
        if (extraPayment && (extraPayment + monthlyPayment) < currentBalance) {
          currentExtraPayment = extraPayment
        } else if (extraPayment && (currentBalance - monthlyPayment) > 0) {
          currentExtraPayment = currentBalance - monthlyPayment
        }
        totalPayment = (extraPayment + monthlyPayment) < currentBalance ? monthlyPayment + extraPayment : currentBalance
        const interest = currentBalance * interestRate / this.numberOfPayments
        const principal = totalPayment - interest
        const endingBalance = (monthlyPayment + extraPayment) < currentBalance ? currentBalance - principal : 0
        cumulativeInterest += interest
        payments.push({
          'Payment No.': rowNum,
          'Payment Date': `${currentYear}-${currentMonth}-${day}`,
          'Beginning Balance': currentBalance,
          'Scheduled Payment': monthlyPayment,
          'Extra Payment': currentExtraPayment,
          'Total Payment': totalPayment,
          Principal: principal,
          Interest: interest,
          'Ending Balance': endingBalance,
          'Cumulative Interest': cumulativeInterest
        })
        currentBalance = endingBalance
        rowNum++
      }
      this.setActualNumberOfPayments({ actualNumberOfPayments: rowNum - 1 })
      console.table(payments)
      this.payments = payments
      this.setPayments({ payments: payments })
      const totalEarlyPayments = payments.reduce((acc, paymentRow) => {
        acc += paymentRow['Extra Payment']
        return acc
      }, 0)
      const totalInterest = payments.reduce((acc, paymentRow) => {
        acc += paymentRow.Interest
        return acc
      }, 0)
      this.setTotalEarlyPayments({ totalEarlyPayments: totalEarlyPayments })
      this.setTotalInterest({ totalInterest: totalInterest })
    }
  }
}
</script>
