<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import { ref } from "vue";
export default {
  components: { HelloWorld },
  setup() {
    const hello = ref("hello word!");

    return {
      hello,
    };
  },
};
</script>

<style scoped>
</style>
