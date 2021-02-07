import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: {},
    loanAmount: ' ',
    annualInterestRate: ' ',
    loanPeriodInYears: ' ',
    numberOfPayments: ' ',
    loanStartDate: ' ',
    optionalExtraPayments: ' ',
    payments: [{
      'Payment No.': '-',
      'Payment Date': '-',
      'Beginning Balance': '-',
      'Scheduled Payment': '-',
      'Extra Payment': '-',
      'Total Payment': '-',
      Principal: '-',
      Interest: '-',
      'Ending Balance': '-',
      'Cumulative Interest': '-'
    }],
    scheduledPayment: 0,
    scheduledNumberOfPayments: 0,
    actualNumberOfPayments: 0,
    totalEarlyPayments: 0,
    totalInterest: 0,
    paymentsCalculated: false
  },
  mutations: {
    SET_THEME (state, theme) {
      state.theme = theme
      localStorage.theme = theme
    },
    SET_LOAN_AMOUNT (state, loanAmount) {
      state.loanAmount = loanAmount
    },
    SET_ANNUAL_INTEREST_RATE (state, annualInterestRate) {
      state.annualInterestRate = annualInterestRate
    },
    SET_LOAN_PERIOD (state, loanPeriodInYears) {
      state.loanPeriodInYears = loanPeriodInYears
    },
    SET_NUMBER_OF_PAYMENTS (state, numberOfPayments) {
      state.numberOfPayments = numberOfPayments
    },
    SET_LOAN_START_DATE (state, loanStartDate) {
      state.loanStartDate = loanStartDate
    },
    SET_OPTIONAL_EXTRA_PAYMENTS (state, optionalExtraPayments) {
      state.optionalExtraPayments = optionalExtraPayments
    },
    SET_PAYMENTS (state, payments) {
      state.payments = payments
    },
    SET_SCHEDULED_PAYMENT (state, scheduledPayment) {
      state.scheduledPayment = scheduledPayment
    },
    SET_SCHEDULED_NUMBER_OF_PAYMENTS (state, scheduledNumberOfPayments) {
      state.scheduledNumberOfPayments = scheduledNumberOfPayments
    },
    SET_ACTUAL_NUMBER_OF_PAYMENTS (state, actualNumberOfPayments) {
      state.actualNumberOfPayments = actualNumberOfPayments
    },
    SET_TOTAL_EARLY_PAYMENTS (state, totalEarlyPayments) {
      state.totalEarlyPayments = totalEarlyPayments
    },
    SET_TOTAL_INTEREST (state, totalInterest) {
      state.totalInterest = totalInterest
    },
    SET_PAYMENTS_CALCULATED (state, paymentsCalculated) {
      state.paymentsCalculated = paymentsCalculated
    }
  },
  actions: {
    initTheme ({ commit }) {
      const cachedTheme = localStorage.theme ? localStorage.theme : false
      //  `true` if the user has set theme to `dark` on browser/OS
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      if (cachedTheme) {
        commit('SET_THEME', cachedTheme)
      } else if (userPrefersDark) {
        commit('SET_THEME', 'dark')
      } else {
        commit('SET_THEME', 'light')
      }
    },
    toggleTheme ({ commit }) {
      switch (localStorage.theme) {
        case 'light':
          commit('SET_THEME', 'dark')
          break
        default:
          commit('SET_THEME', 'light')
          break
      }
    },
    setLoanAmount ({ commit }, payload) {
      commit('SET_LOAN_AMOUNT', payload.loanAmount)
    },
    setAnnualInterestRate ({ commit }, payload) {
      commit('SET_ANNUAL_INTEREST_RATE', payload.annualInterestRate)
    },
    setLoanPeriod ({ commit }, payload) {
      commit('SET_LOAN_PERIOD', payload.loanPeriod)
    },
    setNumberOfPayments ({ commit }, payload) {
      commit('SET_NUMBER_OF_PAYMENTS', payload.numberOfPayments)
    },
    setLoanStartDate ({ commit }, payload) {
      commit('SET_LOAN_START_DATE', payload.loanStartDate)
    },
    setOptionalExtraPayments ({ commit }, payload) {
      commit('SET_OPTIONAL_EXTRA_PAYMENTS', payload.optionalExtraPayments)
    },
    setPayments ({ commit }, payload) {
      commit('SET_PAYMENTS', payload.payments)
    },
    setScheduledPayment ({ commit }, payload) {
      commit('SET_SCHEDULED_PAYMENT', payload.scheduledPayment)
    },
    setScheduledNumberOfPayments ({ commit }, payload) {
      commit('SET_SCHEDULED_NUMBER_OF_PAYMENTS', payload.scheduledNumberOfPayments)
    },
    setActualNumberOfPayments ({ commit }, payload) {
      commit('SET_ACTUAL_NUMBER_OF_PAYMENTS', payload.actualNumberOfPayments)
    },
    setTotalEarlyPayments ({ commit }, payload) {
      commit('SET_TOTAL_EARLY_PAYMENTS', payload.totalEarlyPayments)
    },
    setTotalInterest ({ commit }, payload) {
      commit('SET_TOTAL_INTEREST', payload.totalInterest)
    },
    setPaymentsCalculated ({ commit }, payload) {
      commit('SET_PAYMENTS_CALCULATED', payload.paymentsCalculated)
    }
  },
  getters: {
    getTheme: (state) => {
      return state.theme
    },
    getLoanAmount: state => {
      return state.loanAmount
    },
    getAnnualInterestRate: state => {
      return state.annualInterestRate
    },
    getLoanPeriod: state => {
      return state.loanPeriodInYears
    },
    getNumberOfPayments: state => {
      return state.numberOfPayments
    },
    getLoanStartDate: state => {
      return state.loanStartDate
    },
    getOptionalExtraPayments: state => {
      return state.optionalExtraPayments
    },
    getPayments: state => {
      return state.payments
    },
    getScheduledPayment: state => {
      return state.scheduledPayment === 0 ? '-' : state.scheduledPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    },
    getScheduledNumberOfPayments: state => {
      return state.scheduledNumberOfPayments === 0 ? '-' : state.scheduledNumberOfPayments
    },
    getActualNumberOfPayments: state => {
      return state.actualNumberOfPayments === 0 ? '-' : state.actualNumberOfPayments
    },
    getTotalEarlyPayments: state => {
      return state.totalEarlyPayments === 0 ? '-' : state.totalEarlyPayments.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    },
    getTotalInterest: state => {
      return state.totalInterest === 0 ? '-' : state.totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    },
    arePaymentsCalculated: state => {
      return state.paymentsCalculated
    }
  },
  modules: {
  }
})
