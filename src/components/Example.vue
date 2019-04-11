<template lang="pug">
  p.example
    | This is {{ name }}.
</template>
<script>
export default {
  data() {
    return {
      name: 'Vue single file component'
    }
  }
}
</script>
<style lang="scss" scoped>
.example {
  display: block;
  padding-top: 30px;
  text-align: center;
}
</style>
