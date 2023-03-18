<template>
  <div v-if="props.loading" class="loading w-full bg-purple-300 ">
    <div class="loading bg-purple-700 top-0 bar" ></div>
  </div>


</template>

<script setup>
let progress = reactive({
  value: 0,

})
const props = defineProps(['loading'])
console.log(props.loading)

</script>

<style scoped>
.loading{
  @apply  h-1 absolute top-0
}
.bar{
  animation-duration: 2s;
  animation-name: slidein;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-timing-function: linear;
}


@keyframes slidein {
  from {
    left: 0;
    width: 5%;
  }
  /*5%{*/
  /*  left: 0;*/
  /*  width: 10%;*/
  /*}*/
  /*10%{*/
  /*  left: 0;*/
  /*  width: 20%;*/
  /*}*/
  20%{
    left: 10%;
    width: 20%;
  }
  /*30%{*/
  /*  left: 20%;*/
  /*  width: 20%;*/
  /*}*/
  /*40%{*/
  /*  left: 30%;*/
  /*  width: 20%;*/
  /*}*/
  50%{
    left: 40%;
    width: 20%;
  }
  /*60%{*/
  /*  left: 50%;*/
  /*  width: 20%;*/
  /*}*/
  70%{
    left: 60%;
    width: 20%;
  }
  /*80%{*/
  /*  left: 70%;*/
  /*  width: 20%;*/
  /*}*/
  90%{
    left: 80%;
    width: 20%;
  }
  /*95%{*/
  /*  left: 90%;*/
  /*  width: 10%;*/
  /*}*/


  to {
    left: 95%;
    width: 5%;
  }
}

</style>