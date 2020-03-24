<template>
  <div>
    <CChartLine style="height: 50vh" :datasets="dataset" :options="defaultOptions" :labels="labels" />
    <CRow>
      <CCol col="12" sm="2"></CCol>
      <CCol col="12" sm="1">
        <CCallout color="info">
          <small class="text-muted">New Cases</small>
          <br />
          <strong class="h4">{{numbers.confirmed}}</strong>
        </CCallout>
      </CCol>
      <CCol col="12" sm="1">
        <CCallout color="success">
          <small class="text-muted">Recovered</small>
          <br />
          <strong class="h4">{{numbers.recovered}}</strong>
        </CCallout>
      </CCol>
      <CCol col="12" sm="1">
        <CCallout color="danger">
          <small class="text-muted">Dead</small>
          <br />
          <strong class="h4">{{numbers.dead}}</strong>
        </CCallout>
      </CCol>
    </CRow>
    <b>Data is fetched at:</b> {{fetchedDate}}
  </div>
</template>

<script>
import { CChartLine } from "@coreui/vue-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import axios from "axios";

export default {
  name: "MainChartExample",
  components: {
    CChartLine
  },
  data() {
    return {
      labels: [],
      fetchedData: [],
      dataset: [],
      maxCases: 700,
      numbers: {
        confirmed: 0,
        recovered: 0,
        dead: 0
      },
      fetchedDate: new Date()
    };
  },
  async mounted() {
    let response = await this.getData();
    this.fetchedData = response.data;
    let startDate = new Date("2020-01-29"),
      endDate = new Date();
    this.labels = this.getDateArray(startDate, endDate);
    const brandRecovered = getStyle("success2") || "#4dbd74";
    const brandInfected = getStyle("info") || "#20a8d8";
    const brandDead = getStyle("danger") || "#f86c6b";
    const data1 = [];
    const data2 = [];
    const data3 = [];
    let confirmedCases = this.mappingDataByDate(
      this.fetchedData.confirmed,
      this.labels
    );

    let recoveredCases = this.mappingDataByDate(
      this.fetchedData.recovered,
      this.labels
    );
    let deadCases = this.mappingDataByDate(
      this.fetchedData.deaths,
      this.labels
    );
    this.numbers.confirmed = this.maxCases =
      confirmedCases[confirmedCases.length - 1];
    this.numbers.recovered = recoveredCases[recoveredCases.length - 1];
    this.numbers.dead = deadCases[deadCases.length - 1];
    this.dataset = [
      {
        label: "Confirmed",
        backgroundColor: hexToRgba(brandInfected, 10),
        borderColor: brandInfected,
        pointHoverBackgroundColor: brandInfected,
        borderWidth: 2,
        data: confirmedCases
      },
      {
        label: "Recovered",
        backgroundColor: "transparent",
        borderColor: brandRecovered,
        pointHoverBackgroundColor: brandRecovered,
        borderWidth: 2,
        data: recoveredCases
      },
      {
        label: "Dead",
        backgroundColor: "transparent",
        borderColor: brandDead,
        pointHoverBackgroundColor: brandDead,
        borderWidth: 1,
        data: deadCases
      }
    ];
  },
  computed: {
    defaultOptions() {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 1,
                stepSize: Math.ceil(250 / 5),
                max: this.maxCases
              },
              gridLines: {
                display: true
              }
            }
          ]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      };
    }
  },
  methods: {
    getDateArray(start, end) {
      var arr = new Array(),
        dt = new Date(start);

      while (dt <= end) {
        arr.push(this.formatDate(new Date(dt)));
        dt.setDate(dt.getDate() + 1);
      }
      return arr;
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate();
      if (month.length < 2) month = month;
      if (day.length < 2) day = day;

      return [day, month].join(".");
    },
    async getData() {
      try {
        let data = await axios.get(
          "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData"
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
    mappingDataByDate(data, dates) {
      let finalResult = [];
      let numberToAccumulate = 0;
      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        let numberPerDate = 0;
        for (let j = 0; j < data.length; j++) {
          const datum = data[j];
          if (date === this.formatDate(datum.date)) {
            numberToAccumulate++;
            numberPerDate++;
          }
        }
        finalResult.push(numberToAccumulate);
      }
      return finalResult;
    }
  }
};
</script>
