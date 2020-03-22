<template>
  <CRow>
    <CCol col="12" xl="8">
      <CCard>
        <CCardHeader>
          Report
        </CCardHeader>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page)
        }
      }
    }
  },
  methods: {
  }
}
</script>
