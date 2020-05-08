<template>
    <div>
        <p>Cours</p>
        <Separator/>
        <CoursContainer />
    </div>
</template>

<script>
import CoursContainer from '../components/CoursContainer'
import Separator from '../components/Separator'
export default {
    name: 'Cours',
    components: {
        CoursContainer,
        Separator
    }
}
</script>

<style scoped>
</style>