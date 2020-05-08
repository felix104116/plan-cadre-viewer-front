import Vue from 'vue'
import Router from 'vue-router'
import Cours from '../pages/Cours.vue'
import CoursPage from '../pages/CoursPage.vue'
import Competences from '../pages/Competences.vue'
import CompetencePage from '../pages/CompetencePage.vue'
import Timeout from '../pages/Timeout.vue'
import SearchPage from '../pages/SearchPage.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'Cours', component: Cours },
        { path: '/competences', name: 'Competences', component: Competences },
        { path: '/cours/:annee/:code', name: 'CoursPage', component: CoursPage, props: true},
        { path: '/competences/:code', name: 'CompetencePage', component: CompetencePage },
        { path: '/search', name: 'Search', component: SearchPage},
        { path: '/timeout', name: 'Timeout', component: Timeout}
    ]
})