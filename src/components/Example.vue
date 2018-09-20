<template lang="pug">
  div
    p
      | asd
    p.asd
      | hello {{name}}
</template>

<script>
  export default {
    data() {
      return {
        name: 'asd'
      }
    }
  }
</script>

<style lang="scss" scoped>
  $red: #ff0000;

  .asd {
    font-size: 30px;
    color: $red;
  }
</style>
