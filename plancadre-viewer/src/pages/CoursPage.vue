<template>
    <div>
        <div v-if="!loading" :key="cours.code">
            <div class="head">
                <p class="title">PLAN-CADRE</p>
                <p>Enseignement régulier</p>
                <i>{{cours.programme.nom}} ({{cours.programme.code}})</i>
            </div>
            <div>
                <div class="section-header">
                    <pre class="title">TITRE ET CODE DU (OU DES) COURS</pre>
                </div>
                <div class="cours ">
                    <div class="firstCol"><p>{{cours.code}} <i>{{cours.titre}}</i></p><p>Année: {{cours.annee}}</p></div>
                    <div class="secondCol"><p>Pondération: {{cours.nbHeureTheorie}}-{{cours.nbHeurePratique}}-{{cours.nbHeurePersonnel}}</p><p>Session: {{cours.session}}</p></div>
                </div>
            </div>
            <div v-if="cours.successeurs !== null && cours.successeurs.length > 0">
                <div class="section-header">
                    <pre class="title">SUCCESSEURS</pre>
                </div>
                <div>
                    <ul>
                        <div>
                            <li v-bind:key="succ.codeCours" v-for="succ in cours.successeurs">
                                <a class="link" @click="changePage(succ.codeCours)">{{succ.codeCours}}</a><span> {{succ.commentaire}}</span>
                            </li>
                        </div>      
                    </ul>
                </div>
            </div>
            <div v-if="cours.prealables !== null && cours.prealables.length > 0">
                <div class="section-header">
                    <pre class="title">PRÉALABLES</pre>
                </div>
                <div>
                    <ul>
                        <div>
                            <li v-bind:key="preal.codeCours" v-for="preal in cours.prealables">
                                <a class="link" @click="changePage(preal.codeCours)">{{preal.codeCours}}</a><span> {{preal.commentaire}}</span>
                            </li>
                        </div>
                    </ul>
                </div>
            </div> 
            <div>
                <div class="section-header">
                    <pre class="title">PRÉSENTATION DU (OU DES) COURS</pre>
                </div>
                <div>
                    <pre>{{cours.presentation}}</pre>
                </div>
            </div>
            <div>
                <div class="section-header">
                    <pre class="title">ÉNONCÉ DE LA (OU DES) COMPÉTENCE(S) DU DEVIS MINISTÉRIEL ET IDENTIFICATION DES ÉLÉMENTS DE COMPÉTENCES ET CRITÈRES DE PERFORMANCE S'APPLIQUANT AU COURS</pre>
                </div>
                <div>
                    <pre>Le cours permet le développement complet de la ou les compétence(s) suivante(s):</pre>
                    <ul>
                       <li v-for="comp in cours.competences" :key="comp.id">
                           <a class="link" @click="gotoCompetence(comp.id)">{{comp.id}} - {{comp.enonce}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <div class="section-header">
                    <pre class="title">OBJECTIF D'INTÉGRATION</pre>
                </div>
                <div>
                    <pre>{{cours.objectifIntegrateur}}</pre>
                </div>
            </div>
            <div v-if="cours.evaluationApprentissage">
                <div class="section-header">
                    <pre class="title">ÉVALUATION DES APPRENTISSAGES</pre>
                </div>
                <div>
                    <div>
                        <p v-if="cours.evaluationApprentissage.titre" class="title">{{cours.evaluationApprentissage.titre}}</p>
                    </div>
                    <div v-if="cours.evaluationApprentissage.elements && cours.evaluationApprentissage.elements.length > 0">
                        <p class="title">Évaluations</p>
                        <ol type="1">
                            <li v-for="element in cours.evaluationApprentissage.elements" :key="element.id">
                                <p>{{element.description}}</p>
                                <ul>
                                   <li v-for="detail in element.details" :key="detail">{{detail}}</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <div v-if="cours.evaluationApprentissage.criteres && cours.evaluationApprentissage.criteres.length > 0">
                        <p class="title">Critères d'évaluation de la production finale d'intégration</p>
                        <ul>
                            <li v-for="critere in cours.evaluationApprentissage.criteres" :key="critere">
                                <p>{{critere}}</p>
                            </li>
                        </ul>
                    </div>
                    <div v-if="cours.evaluationApprentissage.detailPourcentage">
                        <p class="title">Pourcentage de la production finale d'intégration à l'intérieur de l'évaluation sommative du cours"</p>
                        <p>{{cours.evaluationApprentissage.detailPourcentage}}</p>
                    </div>
                    <div v-if="cours.evaluationApprentissage.detailLangue">
                        <p class="title">Évaluation de la qualité de la langue française</p>
                        <p>{{cours.evaluationApprentissage.detailLangue}}</p>
                    </div>
                    <p v-html="cours.evaluations"></p>
                </div>
            </div>
            <div>
                <div class="section-header">
                    <pre class="title">OBJECTIFS D'APPRENTISSAGES ET CONTENU ESSENTIEL DU (OU DES) COURS</pre>
                </div>
                <div>
                    <ol type="1" v-if="cours.objectifs.length > 0">
                        <li v-for="objectif in cours.objectifs" :key="objectif.competence">
                            {{objectif.competence}}
                            <ol type="a" v-if="objectif.elements">
                                <li v-for="element in objectif.elements" :key="element">
                                    {{element}}
                                </li>
                            </ol>
                        </li>
                    </ol>
                    <pre v-else>Aucun</pre>
                </div>
            </div>
            <div v-if="cours.contribution !== null && cours.contribution !== ''">
                <div class="section-header">
                    <pre class="title">CONTRIBUTION DU (OU DES) COURS AU PROGRAMME</pre>
                </div>
                <div>
                    <pre>{{cours.contribution}}</pre>
                </div>
            </div>
            <div>
                <div class="section-header">
                    <pre class="title">MANUEL OBLIGATOIRE</pre>
                </div>
                <div>
                    <pre v-if="cours.manuelObligatoire !== null">{{cours.manuelObligatoire}}</pre>
                    <pre v-else>Aucun</pre>
                </div>
            </div>
            <div v-if="cours.recommandations !== null && cours.recommandations.length > 0">
                <div class="section-header">
                    <pre class="title">RECOMMANDATIONS</pre>
                </div>
                <div>
                    <p v-for="rec in cours.recommandations" :key="rec">{{rec}}</p>
                </div>
            </div>
        </div>
        <div v-else class="loading">
            <cube-shadow background="indianred" size="50px"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CubeShadow from 'vue-loading-spinner/src/components/CubeShadow'
import {ServerIP} from "../config"
export default {
 name:'CoursPage',
 data(){
     return{
         cours: Object,
         loading: true
     }
 },
 components:{
     CubeShadow
 },
 mounted(){
     this.getCours();
 },
 watch: {
    '$route.params.code': function(code){
        if(code !== this.cours.code)
            this.getCours();
    },
    '$route.params.annee': function(annee){
        if(annee !== this.cours.annee)
            this.getCours();
    }
 },
 methods: {
     getCours(){
        axios.get(`${ServerIP}/cours/${this.$route.params.annee}/${this.$route.params.code}`)
        .then(res => {
            this.cours = res.data;
            setTimeout(() => this.loading = false, 500);
        }).catch((err) =>{
            if(err.response.status === 404)
                this.$router.push('/404');
            else
                this.$router.push('/timeout');
        })
     },
     changePage(code){
         this.loading = true;
         axios.get(`${ServerIP}/cours/${code}`)
         .then(res => {
            if(this.cours.code != code || this.cours.annee != res.data.annee){
                this.$router.push({ name: 'CoursPage', params: {annee: res.data.annee, code: code}});
            }
            this.loading = false;
         }).catch((err) => {
            if(err.response.status === 404)
                this.$router.push('/404');
            else
                this.$router.push('/timeout');
         })
     },
     gotoCompetence(id){
        this.$router.push({ path: `/competences/${id}`, query: {cours: this.cours.code }});
     }
 }   ,

}
</script>

<style>
.section-header{
    background-color:indianred;
    margin: 0 1% 0 1%;
    border: 1px solid black;
}

.link{
    text-decoration: underline;
    color:cornflowerblue;
}

.link:hover{
    cursor: pointer;
}

.title{
    font-weight: bold;
}
</style>

<style scoped>
.head{
    text-align: center;
}

.subtitle{
    font:italic
}

.ponderation{
    margin-right:2%;
    margin-left:auto;
}

div { 
    margin:2% 0 2% 0;
 } 

pre{
    white-space: pre-wrap;
}
.section-header + div{
    margin: 0 2% 0 2%;
}

.cours{
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.loading{
    text-align: center;
    margin: 20% 50%;
}
</style>