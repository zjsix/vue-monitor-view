
<template>
  <footer>
    <a class="copy-right" href="https://github.com/zjsix">© code by zjsix</a>
  </footer>
</template>

<script>
export default {
  name: "Foot",
  data() {
    return {};
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
footer {
  margin-top: 88px;
  padding-bottom: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  .copy-right {
    font-size: 14px;
    color: #333;
  }
  a {
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
    color: #e19ca7;
  }
}
</style>