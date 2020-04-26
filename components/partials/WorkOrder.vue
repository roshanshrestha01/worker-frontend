<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <h3 class="text-center">{{ value.name }}</h3>
                    {{ value.description }}
                </div>

                <worker :worker-id="value.workerId"/>

                <div class="content time">
                    <time datetime="2016-1-1">{{datetime}}</time>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Worker from '~/components/Worker'


  export default {
    name: "WorkOrder",
    props: {
      value: {
        type: Object
      }
    },
    computed: {
      datetime() {
        const date = new Date(this.value.deadline);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      }
    },
    components: {Worker}
  }
</script>

<style scoped>
    .card {
        margin: 1em;
    }

    .text-center {
        text-align: center;
    }

    .content {
        width: 23em
    }

    .time {
        margin-top: .8em;
    }
</style>
