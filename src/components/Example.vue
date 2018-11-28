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
    };
  }
};
</script>

<style lang="scss" scoped>
$gray: #3B3B3B4F;

.decolored {
  color: $gray;
}
</style>
