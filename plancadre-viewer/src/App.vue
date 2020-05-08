<template>
  <div id="main-app">
    <Header/>
    <div id="router">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#main-app{
  padding:0 5% 0 5%;
  min-height: 50sp;
}

#router{
  width:100%;
  border: 1px solid rgba(230, 230, 230, 1);
  min-height: 500px;
}
</style>
