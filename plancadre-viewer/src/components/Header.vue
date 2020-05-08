<template>
    <div id="head">
        <router-link to="/">
            <img class="logo" src='../assets/CollegeLionelGroulx.jpg'/>
        </router-link>
        <router-link class="header-item item" to="/">Cours</router-link>
        <router-link class="header-item item" to="/competences">Compétences</router-link>
        <Search class="header-item"/>
    </div>
</template>

<script>
import Search from './Search'
export default {
    name: 'Header',
    components: {
        Search
    }
}
</script>

<style>
#head{
    width:100%;
    border: 1px solid rgba(230, 230, 230, 1);
    align-items: center;
    display: flex;
}

.header-item{
    text-decoration: none;
    color:rgb(0, 0, 100);
    padding: 0% 2% 0% 2%;
    display:flex;
    align-content: space-around;
    flex-direction: row;
}

.item:hover{
    background-color: rgb(250, 250, 250);
}

.logo{
    height:3em;
}

.links{
    text-align: center;
    position:relative;
    height:100%;
}

#head > a{
    display: inline-block;
}
</style>