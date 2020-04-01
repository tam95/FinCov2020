<template>
    <div>
    <CCard>
      <CCardHeader>
        <h3>Heat map in Finland</h3>
      </CCardHeader>
    </CCard>
    <CCard>
      <CCardBody>
        <CRow>
          <iframe
            style="width:100%; height: 80vh;"
            src="https://koronatartunnat.netlify.com/"
            frameborder="0"
          ></iframe>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  name: "Users",
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
<style lang="css">
.label-padding {
  padding: 15px;
}
.checkbox-custom {
  top: 0px;
  left: 0px;
  height: 24px;
  width: 24px;
  background-color: transparent;
  border-radius: 5px;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  border: 2px solid #ffffff;
}
</style>
