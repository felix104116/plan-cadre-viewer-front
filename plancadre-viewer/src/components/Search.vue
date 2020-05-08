<template>
  <div>
      <form v-on:submit.prevent="searchSubmit">
        <input type="text" class="box" v-model="term"/>
        <input type="submit" class="btn" value="Search"/>
      </form>
  </div>
</template>

<script>
export default {
    name: 'Search',
    data(){
        return{
            term: ""
        }
    },
    methods: {
        searchSubmit(){
            if(this.$route.query.term !== this.term){
                this.$router.push({ name:'Search', query: { term:this.term}})
                this.term = "";
            }
        }
    }
}
</script>

<style scoped>
.btn{
    background-color:white;
    border-color: indianred;
}

.box{
    border-color: indianred;
}
</style>