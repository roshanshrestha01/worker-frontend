<template>
  <div class="container">
    <work-orders/>
  </div>
</template>

<script>
  import WorkOrders from '~/components/WorkOrders.vue'

  export default {
    components: {
      WorkOrders
    }
  }
</script>

<style>
  .container {
    margin: 2em auto;
    min-height: 100vh;
  }
</style>
