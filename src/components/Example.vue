<template lang="pug">
  div
    p.decolored
      | Welcome to {{name}}
</template>

<script>
export default {
  data() {
    return {
      name: 'Vue single file components'
    }
  }
}
</script>

<style lang="scss" scoped>
$gray: #3b3b3b4f;

.decolored {
  color: $gray;
}
</style>
