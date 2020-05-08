<template>
    <div>
        <div v-if="!loading">
            <div class="containerHeader container">
                <a class="firstCol">Code de la compétence</a>
                <a class="secondCol">Titre de la compétence </a>
            </div>
            <Separator/>
            <div class="searchHead container">
                <input type="text" class="firstCol" v-on:input="filter" v-model="searchCode"/>
                <input type="text" class="secondCol" v-on:input="filter" v-model="searchTerm"/>
            </div>
            <Separator/>
            <div v-if="filteredListeCompetence.length > 0" >
                <div v-for="competence in filteredListeCompetence" :key="competence.codeCompetence">
                    <CompetenceElement v-bind:competence="competence" class="element"/>
                    <Separator/>
                </div>
            </div>
            <div id="empty" v-else>
                    <p>Aucune compétence.</p>
            </div>
        </div>
        <div v-else class="loading">
            <cube-shadow background="indianred" size="50px"/>
        </div>
    </div>
</template>

<script>
import CompetenceElement from './CompetenceElement'
import Separator from './Separator'
import CubeShadow from 'vue-loading-spinner/src/components/CubeShadow'
import axios from 'axios'
import {ServerIP} from "../config"
export default {
    name:"CompetenceContainer",
    data(){
        return {
            listeCompetences: [],
            filteredListeCompetence: [],
            loading: true,
            searchCode: "",
            searchTerm: ""
        }
    },
    components:{
        CubeShadow,
        Separator,
        CompetenceElement
    },
    methods: {
        getCompetences(){
            this.loading = true;
            axios.get(`${ServerIP}/competences/`)
            .then(res => {
                this.listeCompetences = res.data;
                this.filter();
                setTimeout(() => this.loading = false, 500);
            }).catch((err) => {
                if(err.response.status === 404)
                    this.$router.push('/404')
                else
                    this.$router.push('/timeout')
            })
        },
        filter(){
            this.filteredListeCompetence = this.listeCompetences.filter(competence => competence.enonce.toUpperCase().includes(this.searchTerm.toUpperCase())).filter(competence => competence.codeCompetence.toUpperCase().includes(this.searchCode.toUpperCase()));
        }
    },
    mounted(){
        this.getCompetences();
    }
}
</script>

<style scoped>
.firstCol{
    flex:0.5 auto auto;
}
.secondCol{
    flex:0.5 auto auto;
}
</style>