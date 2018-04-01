<template>
  <div>
    <button>greetings</button>
    <div>{{greetings}}</div>
  </div>
</template>
ß
<script>
  import fetch from "fetch";
  export default {
    name: 'HelloWorld',
    data() {
      return {
        greetings: "",
      }
    },
    methods:{
      getGreetings(){
        
      }
    }
  }

</script>
<style>

</style>
