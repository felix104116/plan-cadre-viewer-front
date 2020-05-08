<template>
    <router-link :to="'/competences/' + competence.codeCompetence">
        <div class="container">
            <div id="cours" class="firstCol">
                <span>{{competence.codeCompetence}}</span>
            </div>    
            <div class="secondCol">
                <span>{{competence.enonce}}</span>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name:'Competence',
    components:{
    },
    props: {
        competence: Object
    }
}
</script>

<style scoped>

</style>