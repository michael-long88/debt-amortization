<template>
  <div>
    <form @submit.prevent="calculatePaymentAmounts">
        <div class="mx-6 md:mx-0">
          <div class="form-float-div">
            <input type="number" v-model.number="loanAmount" ref="loanAmount" name="loanAmount" placeholder=' ' min="1" step=".01" class="form-float-input" required/>
            <label for="loanAmount" @click="$refs.loanAmount.focus()" class="form-float-label">Loan Amount</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="interestRate" ref="annualInterestRate" name="annualInterestRate" :placeholder="getAnnualInterestRate" min="1" step=".01" class="form-float-input" required/>
            <label for="annualInterestRate" @click="$refs.annualInterestRate.focus()" class="form-float-label">Annual Interest Rate</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="loanPeriodYears" ref="loanPeriodYears" name="loanPeriodYears" :placeholder="getLoanPeriodYears" min="1" step="1" class="form-float-input" required/>
            <label for="loanPeriodYears" @click="$refs.loanPeriodYears.focus()" class="form-float-label">Loan Period in Years</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="loanPeriodMonths" ref="loanPeriodMonths" name="loanPeriodMonths" :placeholder="getLoanPeriodMonths" min="0" max="11" step="1" class="form-float-input"/>
            <label for="loanPeriodMonths" @click="$refs.loanPeriodMonths.focus()" class="form-float-label">Loan Period in Months</label>
          </div>
          <div class="form-float-div">
            <input type="number" v-model.number="numberOfPayments" ref="numberOfPayments" name="numberOfPayments" :placeholder="getNumberOfPayments" min="1" step="1" max="12" class="form-float-input" required/>
            <label for="numberOfPayments" @click="$refs.numberOfPayments.focus()" class="form-float-label">Number of Payments Per Year</label>
          </div>
          <div class="form-float-div">
            <input type="date" v-model="startDate" ref="loanStartDate" name="loanStartDate" :placeholder="getLoanStartDate" class="form-float-input" required/>
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
      loanAmount: this.getLoanAmount === ' ' ? null : this.getLoanAmount,
      interestRate: this.getAnnualInterestRate === ' ' ? null : this.getAnnualInterestRate,
      loanPeriodYears: this.getLoanPeriodYears === ' ' ? null : this.getLoanPeriodYears,
      loanPeriodMonths: this.getLoanPeriodMonths === ' ' ? null : this.getLoanPeriodMonths,
      numberOfPayments: this.getNumberOfPayments === ' ' ? null : this.getNumberOfPayments,
      startDate: this.getLoanStartDate === ' ' ? null : this.getLoanStartDate,
      extraPaymentAmount: this.getOptionalExtraPayments === ' ' ? null : this.getOptionalExtraPayments,
      payments: []
    }
  },
  computed: {
    ...mapGetters([
      'getLoanAmount',
      'getAnnualInterestRate',
      'getLoanPeriodYears',
      'getLoanPeriodMonths',
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
      'setLoanPeriodYears',
      'setLoanPeriodMonths',
      'setNumberOfPayments',
      'setLoanStartDate',
      'setOptionalExtraPayments',
      'setPayments',
      'setScheduledPayment',
      'setScheduledNumberOfPayments',
      'setActualNumberOfPayments',
      'setTotalEarlyPayments',
      'setTotalInterest',
      'setPaymentsCalculated']),
    calculatePaymentAmounts: function () {
      this.setLoanAmount({ loanAmount: this.loanAmount })
      this.setAnnualInterestRate({ annualInterestRate: this.interestRate })
      this.setLoanPeriodYears({ loanPeriodYears: this.loanPeriodYears })
      this.setLoanPeriodMonths({ loanPeriodMonths: this.loanPeriodMonths })
      this.setNumberOfPayments({ numberOfPayments: this.numberOfPayments })
      this.setLoanStartDate({ loanStartDate: this.startDate })
      this.setOptionalExtraPayments({ optionalExtraPayments: this.extraPaymentAmount })
      const payments = []
      const interestRate = this.interestRate / 100
      const rate = interestRate / this.numberOfPayments
      const loanPeriodMonths = this.loanPeriodMonths ? this.loanPeriodMonths : 0
      const loanPeriod = (loanPeriodMonths + (this.loanPeriodYears * 12)) / 12
      const totalNumberOfPayments = Math.ceil(loanPeriod * this.numberOfPayments)
      this.setScheduledNumberOfPayments({ scheduledNumberOfPayments: totalNumberOfPayments })
      const monthlyPayment = (this.loanAmount * rate) / (1 - ((1 + rate) ** (-1 * totalNumberOfPayments)))
      this.setScheduledPayment({ scheduledPayment: monthlyPayment })
      const splitDates = this.startDate.split('-')
      const year = parseInt(splitDates[0])
      const month = parseInt(splitDates[1])
      const day = parseInt(splitDates[2])
      let currentBalance = this.loanAmount
      let extraPayment = this.extraPaymentAmount
      let totalPayment = monthlyPayment
      let currentYear = year
      let cumulativeInterest = 0
      let rowNum = 1
      while (currentBalance > 0) {
        let currentMonth = Math.floor(month + (rowNum * (12 / this.numberOfPayments)))
        let yearAddition = 0
        if (currentMonth >= 13) {
          yearAddition = Math.floor(currentMonth / 12)
          yearAddition = currentMonth % 12 === 0 ? yearAddition - 1 : yearAddition
        }
        currentYear = (year + yearAddition) === currentYear ? currentYear : year + yearAddition
        currentMonth = currentMonth >= 13 ? currentMonth % 12 : currentMonth
        currentMonth = currentMonth === 0 ? 12 : currentMonth
        let currentExtraPayment = 0
        if (!extraPayment) {
          extraPayment = 0
        }
        if (extraPayment + monthlyPayment < currentBalance) {
          currentExtraPayment = extraPayment
        } else if (currentBalance - monthlyPayment > 0) {
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
      this.payments = payments
      this.setPayments({ payments: payments })
      this.setPaymentsCalculated({ paymentsCalculated: true })
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
