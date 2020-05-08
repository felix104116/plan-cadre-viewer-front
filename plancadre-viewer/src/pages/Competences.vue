<template>
    <div>
        <p>Compétences</p>
        <Separator/>
        <CompetenceContainer/>
    </div>
</template>

<script>
import Separator from "../components/Separator"
import CompetenceContainer from "../components/CompetenceContainer"
export default {
    name: 'Competences',
    components: {
        Separator,
        CompetenceContainer
    }
}
</script>

<style scoped>
</style>