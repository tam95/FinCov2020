<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <h3>Analysis in Finland</h3>
        </CCardHeader>
      </CCard>
      <CCard>
        <CCardBody>
          <MainChartExample style="height:300px;margin-top:40px;" />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import MainChartExample from "../charts/MainChartExample";

export default {
  name: "Users",
  components: {
    MainChartExample
  },
  data() {
    return {};
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page);
        }
      }
    }
  },
  methods: {}
};
</script>
