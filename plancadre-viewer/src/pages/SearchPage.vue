<template>
<div>
    <div v-if="!loading">
        <h2>Résultats de la recherche:</h2>
        <Search />
        <div v-for="element in elements" :key="element.id">
            <a class="link" @click="goto(element)">{{element.code}} - {{element.titre}}</a>
        </div>
    </div>
    <div v-else class="loading">
        <cube-shadow background="indianred" size="50px"/>
    </div>
</div>
</template>

<script>
import CubeShadow from 'vue-loading-spinner/src/components/CubeShadow'
import Search from "../components/Search"
import {ServerIP} from "../config"
import axios from 'axios'
export default {
    name:'SearchPage',
    data(){
        return{
            loading:true,
            elements: [],
            term: ""
        }
    },
    watch: {
        '$route.query.term': function(term){
            this.term = term;
            this.getData();
        }
    },
    methods:{
        getData(){
            this.term = this.$route.query.term;
            axios.get(`${ServerIP}/search/${this.term}`)
            .then(res => {
                this.elements = res.data;
                setTimeout(() => this.loading = false, 500);
            })
            .catch(() => this.$router.push('/timeout'));
        },
        goto(element){
            if(element.type === "cours"){
                let route = `/cours/${element.annee}/${element.code}`;
                if(this.$route !== route)
                    this.$router.push(route)
            }
            else
                this.$router.push(`/competences/${element.code}`)
        }
    },
    components:{
        CubeShadow,
        Search
    },
    mounted(){
        this.getData();
    }
}
</script>

<style>

</style>