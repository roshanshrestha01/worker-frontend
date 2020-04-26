<template>
    <div>
        <div class="control mb-2">
            <input class="input" placeholder="Filter by workder name..." type="text" v-model="searchWord">
        </div>
        <div class="field sort-switch">
            <label for="sortSwitch">Earliest First</label>
            <input checked="checked" class="switch" id="sortSwitch" name="sortSwitch" type="checkbox"
                   v-model="isLatest">
            <label for="sortSwitch">Latest First</label>
        </div>
        <div class="work-orders-container">
            <div v-for="workOrder in filteredOrders">
                <work-order :value="workOrder"/>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import WorkOrder from './partials/WorkOrder'

  export default {
    name: 'WorkOrders',
    data() {
      return {
        isLatest: false,
      }
    },
    components: {WorkOrder},
    created() {
      this.getWorkOrder()
    },
    methods: {
      compare(a, b) {
        const genreA = a.deadline;
        const genreB = b.deadline;

        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      },
      sortOrder(data) {
        return data.sort(this.compare)
      },
      async addWorker(orders) {
        // TODO set as env variable
        const baseURL = 'https://www.hatchways.io/api/assessment'
        let workers = []
        for (let i = 0; i < orders.length; i++) {
          const order = orders[i]
          const {workerId} = order
          const workerExists = workers.includes(workerId)
          if (!workerExists) {
            const result = await this.$axios.$get(`${baseURL}/workers/${workerId}`)
            this.setWorker(result.worker)
            workers.push(workerId)
          }
        }
      },
      async getWorkOrder() {
        // TODO set as env variable
        const baseURL = 'https://www.hatchways.io/api/assessment'
        const workOrders = await this.$axios.$get(`${baseURL}/work_orders`)
        const {orders} = workOrders
        const sortedWorkOrders = this.sortOrder(orders)
        this.addWorker(sortedWorkOrders)
        this.setWorkOrders(sortedWorkOrders)
      },
      ...mapActions([
        'setWorkOrders',
        'setWorker',
        'reverseWorkOrders',
        'filteredWorkOrders'
      ]),
    },
    computed: {
      filteredOrders() {
        try {
          return (this.getFilteredWorkOrders || this.getWorkOrders)
        } catch (e) {
          console.log(e)
        }
      },
      searchWord: {
        get() {
          return this.$store.state.searchWord
        },
        set(value) {
          this.filteredWorkOrders(value)
        }
      },
      ...mapGetters([
        'getWorkOrders',
        'getFilteredWorkOrders'
      ])
    },
    watch: {
      isLatest: function (val) {
        this.reverseWorkOrders()
      },
    }
  }
</script>

<style scoped>
    .sort-switch {
        margin: 1em auto;
        display: inherit;
        width: 20em;
    }
    .work-orders-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
