<template>
    <div id="nav">
      <div class="container" id="main">
      <Nav />
    </div>
    <router-view/>
  </div>
</template>

<script>
import Nav from "@/components/Nav";

export default {
  components: {
    Nav
  }
}
</script>

<style lang="scss">

</style>
