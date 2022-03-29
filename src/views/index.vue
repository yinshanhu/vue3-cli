<template>
  <HelloWorld />
</template>

<script>
import storage from "../util/storage";
import HelloWorld from "../components/HelloWorld.vue";
import { ref, getCurrentInstance } from "vue";
export default {
  components: { HelloWorld },
  setup() {
    const hello = ref("hello word!");
    const {
      appContext: {
        app: { axios },
      },
    } = getCurrentInstance();

    // 过期缓存
    storage.set('key', 'data', 5);
    storage.get('key');

    // 网络请求
    axios.get('xxx.xxxx.com/api?id=123')
      .then((rsp) => {
        console.log(rsp)
      })
      .catch((err) => {
        console.log(err);
      });

    return {
      hello,
    };
  },
};
</script>

<style scoped>
</style>
