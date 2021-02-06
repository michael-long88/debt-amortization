<template>
  <div class="container mx-auto">
    <form @submit.prevent="calculatePaymentAmounts">
        <div class="col-span-12 mx-6 md:mx-0">
          <div class="form-float-div">
            <input type="number" v-model.number="loanAmount" name="loanAmount" :placeholder="getLoanAmount" min="1" step=".01" class="form-float-input" required/>
            <label for="loanAmount" class="form-float-label">Loan Amount</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="interestRate" name="annualInterestRate" :placeholder="getAnnualInterestRate" min="1" step=".01" class="form-float-input" required/>
            <label for="annualInterestRate" class="form-float-label">Annual Interest Rate</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="loanPeriod" name="loanPeriod" :placeholder="getLoanPeriod" min="1" step="1" class="form-float-input" required/>
            <label for="loanPeriod" class="form-float-label">Loan Period in Years</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="numberOfPayments" name="numberOfPayments" :placeholder="getNumberOfPayments" min="1" step="1" max="12" class="form-float-input" required/>
            <label for="numberOfPayments" class="form-float-label">Number of Payments Per Year</label>
          </div>
          <div class="form-float-div">
            <input type="text" v-model="startDate" name="loanStartDate" :placeholder="getLoanStartDate" class="form-float-input" onfocus="(this.type='date')" onfocusout="(this.type='text')" required/>
            <label for="loanStartDate" class="form-float-label">Loan Start Date</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="extraPaymentAmount" name="optionalExtraPayments" :placeholder="getOptionalExtraPayments" min="1" step="any" class="form-float-input"/>
            <label for="optionalExtraPayments" class="form-float-label">Optional Extra Payments</label>
          </div>
        </div>
        <input type="submit" value="Submit">
    </form>
    <!-- <table v-if="payments">
      <thead>
        <tr v-for="header in Object.keys(calculatedPayments[0])" :key="header">
          <th>
            {{ header }}
          </th>
        </tr>
      </thead>
    </table> -->
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
          'Beginning Balance': currentBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          'Scheduled Payment': monthlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          'Extra Payment': currentExtraPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          'Total Payment': totalPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          Principal: principal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          Interest: interest.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          'Ending Balance': endingBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          'Cumulative Interest': cumulativeInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        })
        currentBalance = endingBalance
        rowNum++
      }
      this.setActualNumberOfPayments({ actualNumberOfPayments: rowNum })
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
