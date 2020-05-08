<template>
    <div id="cours">
        <meta charset="utf-8">
        <router-link :to="'/cours/' + cours.annee + '/' + cours.code">{{cours.code}} - {{cours.titre}}</router-link>
        <a class="year">{{cours.annee}}</a>
    </div>
</template>

<script>
export default {
    name:'Cours',
    components:{
    },
    props: {
        cours: Object
    }
}
</script>

<style scoped>
#cours{
    width:100%;
}

a{
    text-decoration: none;
    color:teal;
    vertical-align: middle
}

.year{
    float:right;
    margin-right: 5%;
}
</style>