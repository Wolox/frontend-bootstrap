<template lang="pug">
  .example
    p
      | This is {{name}}.
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
  padding-top: 30px;
  text-align: center;
}
</style>
