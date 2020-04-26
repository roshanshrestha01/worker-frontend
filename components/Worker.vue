<template>
    <div v-if="worker">
        <div class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                    <img :alt="worker.name" :src="worker.image">
                </figure>
            </div>
            <div class="media-content">
                <h4 class="title is-4">{{worker.name}}</h4>
                <p class="subtitle is-6">{{worker.companyName}} | <a :href="`mailto:${worker.email}`">{{ worker.email}}</a></p>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "Worker",
    props: {
      workerId: {
        type: Number
      }
    },
    computed: {
      worker() {
        return this.getWorker(this.workerId)
      },
      ...mapGetters([
        'getWorker',
      ])
    }
  }
</script>

<style scoped>

</style>

