<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://originsyntax.fi" target="_blank">OriginSyntax Oy</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} Tam Nguyen.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://originsyntax.fi" target="_blank">OriginSyntax Oy</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
