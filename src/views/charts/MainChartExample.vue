<template>
  <CChartLine
    :datasets="defaultDatasets"
    :options="defaultOptions"
    :labels="['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']"
  />
</template>

<script>
import { CChartLine } from "@coreui/vue-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import axios from "axios";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default {
  name: "MainChartExample",
  components: {
    CChartLine
  },
  data() {
    return {
      labels: [],
      fetchedData: []
    };
  },
  mounted(){
    this.getData().then(res => (this.fetchedData = res));
  },
  computed: {
    defaultDatasets() {
      const brandSuccess = getStyle("success2") || "#4dbd74";
      const brandInfo = getStyle("info") || "#20a8d8";
      const brandDanger = getStyle("danger") || "#f86c6b";
      let startDate = new Date("2020-01-29"),
        endDate = new Date();
      this.labels = this.getDateArray(startDate, endDate);
      // console.log(this.labels);
      let elements = 27;
      const data1 = [];
      const data2 = [];
      const data3 = [];

      for (let i = 0; i <= elements; i++) {
        data1.push(random(50, 200));
        data2.push(random(80, 100));
        data3.push(65);
      }
      return [
        {
          label: "My First dataset",
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: brandInfo,
          borderWidth: 2,
          data: data1
        },
        {
          label: "My Second dataset",
          backgroundColor: "transparent",
          borderColor: brandSuccess,
          pointHoverBackgroundColor: brandSuccess,
          borderWidth: 2,
          data: data2
        },
        {
          label: "My Third dataset",
          backgroundColor: "transparent",
          borderColor: brandDanger,
          pointHoverBackgroundColor: brandDanger,
          borderWidth: 1,
          borderDash: [8, 5],
          data: data3
        }
      ];
    },
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
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
                max: 250
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
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }

      return arr;
    },
    getData() {
      try {
        let data = axios.get(
          "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData"
        );
        return data;
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>
