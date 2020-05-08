<template>
    <div>
        <div v-if="!loading">
            <div id="competenceHead">
                <h5>{{competence.codeCompetence}}</h5>
                <h3>{{competence.enonce}}</h3>
            </div>
            <div class="section-header">
                <p class="title">CONTEXTES DE RÉALISATIONS</p>
            </div>
            <div>
                <ul>
                    <li v-for="contexte in competence.contextes" :key="contexte">{{contexte}}</li>
                </ul>
            </div>

            <div>        
                <div class="section-header">
                    <p class="title">ÉLÉMENTS DE LA COMPÉTENCE</p>
                </div>
                <table align="center" v-if="competence.elements !== null && competence.elements.length > 0">
                    <tr v-for="element in competence.elements" :key="element.description">
                        <td colspan="1">
                            <b>{{element.id}}. {{element.description}}</b>
                        </td>
                        <td colspan="1">
                            <ul>
                                <li v-for="critere in element.criteres" :key="critere">{{critere}}</li>
                            </ul>
                        </td>
                    </tr>
                </table>
                <pre id="empty" v-else>Aucun élément.</pre>
            </div>
        </div>
        <div v-else class="loading">
            <cube-shadow background="indianred" size="50px"/>
        </div>
    </div>
</template>

<script>
import CubeShadow from 'vue-loading-spinner/src/components/CubeShadow'
import axios from 'axios'
import {ServerIP} from "../config"
export default {
    name:"CompetencePage",
    data(){
        return{
            competence: Object,
            loading: true
        }
    },
    components: {
        CubeShadow
    },
    watch: {
        '$route.query.cours': function(cours){
            if(cours === undefined)
                this.getCompetence();
            else
                this.getCompetenceFromCours();
        }
    },
    mounted(){
        this.loading= true;
        if(this.$route.query.cours=== undefined)
            this.getCompetence();
        else
            this.getCompetenceFromCours();
    },
    methods: {
        getCompetence(){
            axios.get(`${ServerIP}/competences/${this.$route.params.code}`)
            .then(res => {
                this.competence = res.data;
                setTimeout(() => this.loading = false, 500);
            })
            .catch(() => {
                this.$router.push("/404");
            })
        },
        getCompetenceFromCours(){
            axios.get(`${ServerIP}/cours/competence/${this.$route.params.code}/${this.$route.query.cours}`)
            .then(res => {
                this.competence = res.data;
                setTimeout(() => this.loading = false, 500);
            }).catch((err) => {
                if(err.response.status === 404)
                    this.$router.push('/404')
                else
                    this.$router.push('/timeout')
            })
        }
    }
}
</script>

<style scoped>
#competenceHead{
    text-align: center;
}

table{
    border:1px solid black;
    margin: 1% auto 1% auto;
    border-collapse: collapse; 
}

tr {
  border-bottom:1pt solid black;
    padding: 2%;
}

.tableContainer{
    text-align: center;
}
</style>