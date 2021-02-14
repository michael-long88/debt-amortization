<template>
  <div ref="chartDiv" class="h-72 lg:mt-6 lg:h-80"></div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
// import * as $type from '@amcharts/amcharts4/.internal/core/utils/Type'
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
// eslint-disable-next-line camelcase
// import am4themes_dark from '@amcharts/amcharts4/themes/dark'
am4core.useTheme(am4themes_animated)
am4core.options.autoDispose = true
// am4core.useTheme(am4themes_dark)

export default {
  name: 'DebtChart',
  computed: {
    ...mapGetters([
      'getPayments',
      'arePaymentsCalculated'
    ])
  },
  methods: {
    renderChart () {
      if (this.chart) {
        this.chart.dispose()
      }
      if (this.arePaymentsCalculated) {
        const chart = am4core.create(this.$refs.chartDiv, am4charts.XYChart)
        chart.colors.list = [am4core.color('#028FDB'), am4core.color('#A813F2'), am4core.color('#D96B52')]
        chart.data = this.getPayments

        // create axes
        const paymentAxis = chart.xAxes.push(new am4charts.ValueAxis())
        paymentAxis.renderer.minGridDistance = 50
        paymentAxis.min = 1
        paymentAxis.max = chart.data.length
        paymentAxis.strictMinMax = true
        const amountAxis = chart.yAxes.push(new am4charts.ValueAxis())

        // Create series
        const series = chart.series.push(new am4charts.LineSeries())
        series.dataFields.valueY = 'Beginning Balance'
        series.dataFields.valueX = 'Payment No.'
        series.dataFields.value = 'Beginning Balance'
        series.strokeWidth = 2
        series.name = 'Beginning Balance'
        series.minBulletDistance = 10
        // eslint-disable-next-line no-template-curly-in-string
        series.tooltipText = '[bold]Payment Number: {Payment No.}\n[bold]Balance: ${Beginning Balance.formatNumber("#,###.##")}\n[bold]Principal: ${Principal.formatNumber("#,###.##")}\n[bold]Cumulative Interest: ${Cumulative Interest.formatNumber("#,###.##")}'
        series.tooltip.pointerOrientation = 'vertical'

        // Create series
        const series2 = chart.series.push(new am4charts.LineSeries())
        series2.dataFields.valueY = 'Principal'
        series2.dataFields.valueX = 'Payment No.'
        series.dataFields.value = 'Principal'
        series2.strokeWidth = 2
        series2.name = 'Principal'
        // eslint-disable-next-line no-template-curly-in-string
        series.tooltipText = '[bold]Payment Number: {Payment No.}\n[bold]Balance: ${Beginning Balance.formatNumber("#,###.##")}\n[bold]Principal: ${Principal.formatNumber("#,###.##")}\n[bold]Cumulative Interest: ${Cumulative Interest.formatNumber("#,###.##")}'
        series.tooltip.pointerOrientation = 'vertical'

        const series3 = chart.series.push(new am4charts.LineSeries())
        series3.dataFields.valueY = 'Cumulative Interest'
        series3.dataFields.valueX = 'Payment No.'
        series.dataFields.value = 'Cumulative Interest'
        series3.strokeWidth = 2
        series3.name = 'Cumulative Interest'
        // eslint-disable-next-line no-template-curly-in-string
        series.tooltipText = '[bold]Payment Number: {Payment No.}\n[bold]Balance: ${Beginning Balance.formatNumber("#,###.##")}\n[bold]Principal: ${Principal.formatNumber("#,###.##")}\n[bold]Cumulative Interest: ${Cumulative Interest.formatNumber("#,###.##")}'
        series.tooltip.pointerOrientation = 'vertical'

        chart.legend = new am4charts.Legend()

        // Add cursor
        chart.cursor = new am4charts.XYCursor()
        chart.cursor.xAxis = amountAxis

        am4charts.ValueAxis.prototype.getSeriesDataItem = function (series, position) {
          const key = this.axisFieldName + this.axisLetter
          const value = this.positionToValue(position)
          const dataItem = series.dataItems.getIndex(series.dataItems.findClosestIndex(value, function (x) {
            return x[key] ? x[key] : undefined
          }, 'any'))
          return dataItem
        }
      }
    }
  },
  watch: {
    getPayments: {
      handler: 'renderChart',
      deep: true
    }
  },
  mounted () {
    this.renderChart()
  },
  beforeDestroy () {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>
