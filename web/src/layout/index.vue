
<template>
  <div class="con">
    <Head />
    <div class="content">
      <router-view />
    </div>
    <Foot />
  </div>
</template>

<script>
import Head from "@/components/head";
import Foot from "@/components/foot";
export default {
  name: "Index",
  components: {
    Head,
    Foot,
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.con {
  width: 1500px;
  margin: 0 auto;
  .content{
    margin: 10px auto;
  }
}
</style>