<template>
    <div>
        <div v-if="!loading">
            <div class="containerHeader container">
                <a class="firstCol">
                    Titre du cours
                </a>
                <a class="secondCol">
                    Année
                </a>
            </div>
            <Separator/>
            <div class="searchHead container">
                <input type="text" class="firstCol" v-on:input="filter" v-model="searchTerm"/>
                <div class="secondCol">
                    <select v-model="selectYearOption" v-on:change="filter">
                        <option value="recent">Plus récents</option>
                        <option value="annee">Par année</option>
                    </select>
                    <input v-if="selectYearOption === 'annee'" type="number" class="numberInput" v-on:input="filter" v-model="searchYear" />
                </div>
            </div>
            <Separator/>
            <div v-if="filteredListeCours.length > 0" >
                <div v-for="cours in filteredListeCours" :key="cours.id" >
                    <CoursElement class="element" v-bind:cours="cours"/>
                    <Separator/>
                </div>
            </div>
            <div id="empty" v-else>
                    <p>Aucun cours.</p>
            </div>
        </div>
        <div v-else class="loading">
            <cube-shadow background="indianred" size="50px"/>
        </div>
    </div>
</template>

<script>
import CoursElement from './CoursElement'
import Separator from './Separator'
import CubeShadow from 'vue-loading-spinner/src/components/CubeShadow'
import {ServerIP} from "../config"
import axios from 'axios'

export default {
    data(){
        return{
            listeCours: [],
            filteredListeCours: [],
            loading: false,
            searchTerm: "",
            searchYear: "",
            selectYearOption: "recent"
        }
    },
    name:'CoursContainer',
    components:{
        CoursElement,
        Separator,
        CubeShadow
    },
    props:{
    },
    methods:{
        getCours(){
           this.loading = true;
             axios.get(`${ServerIP}/cours`)
            .then(res => {
                this.listeCours = res.data;
                setTimeout(() => this.loading = false, 500);
                this.filterMostRecent();
            }).catch((err) => {
                if(err.response.status === 404)
                    this.$router.push('/404')
                else
                    this.$router.push('/timeout')
            })
        },
        filterMostRecent(){
            axios.get(`${ServerIP}/cours/recent`)
            .then(res => {
                this.filteredListeCours = res.data;
            }).catch((err) => {
                if(err.response.status === 404)
                    this.$router.push('/404')
                else
                    this.$router.push('/timeout')
            })
        },
        getRecentCours(code){
            let tmp = this.listeCours.filter(c => c.code === code);
            let cours = tmp.map(cours => cours.annee);
            let annee = Math.max(...cours);
            return tmp.find(cours => cours.annee == annee);
        },
        filter(){
            this.filteredListeCours = [];
            let tmpList = this.selectYearOption === "recent" ? this.listeCours.map(c => c.code).filter((v,i,a) => a.indexOf(v) === i).map(cours => this.getRecentCours(cours)) : this.listeCours;
            if(this.selectYearOption === "recent")
                this.searchYear = ""

            this.filteredListeCours = tmpList.filter(cours => cours.titre.toUpperCase().includes(this.searchTerm.toUpperCase())).filter(cours => cours.annee.toString().includes(this.searchYear))
        }
    },
    mounted() {
        this.getCours(this);
    }
}
</script>

<style>
#empty{
    color:gray;
    text-align: center;
}

.firstCol{
    flex:0.5 auto auto;
    order:0;
    align-self: auto;
}

.secondCol{
    flex:0.5 auto auto;
}

.containerHeader{
    background-color:rgb(252, 252, 252);
}

.container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: center;
    justify-content: space-between;
    margin: 0 5% 0 5%;
}

.loading{
    text-align: center;
    margin: 20% 50%;
}
.numberInput{
    width: 15%;
}

.element:hover{
    background-color:rgb(252, 252, 252);
}

input{
    border-radius: 4px;
    border:solid 1px black;
}
</style>