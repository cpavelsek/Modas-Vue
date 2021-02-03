<template>
  <div id="app">
    <div>
        <b-nav tabs fill justified >
          <b-nav-item >Home</b-nav-item>
          <b-nav-item>Link</b-nav-item>
          <b-nav-item>Another Link</b-nav-item>
          <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
    </div>
    <br>
    <EventListing/>
    

  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import EventListing from './components/EventListing.vue'
//import TotalEvents from './components/TotalEvents.vue'



export default {
  name: 'App',
  components: {
    // HelloWorld,
    EventListing
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


</style>
