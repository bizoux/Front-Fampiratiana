                                // ROUTE FAMPIRANTIANA


import { createRouter, createWebHistory } from "vue-router";

import { auth } from "./auth";

import HamiditraAnjaraFamp from "./components/FamenoanaAnjaraFampirantiana.vue";

import FamenoanaNyFanavaozana from "./components/FamenoanaNyFanavaozana.vue";

import LisitraFampirantiana from "./components/HamoakaPdfFampirantiana.vue";

import FanampianaFampiasanaAzy from "./components/FanampianaFampiasanaAzy.vue";

import FanampianaFanavaozana from "./components/FanampianaFanavaozana.vue";

import MpiaraManompo from "./components/MpiaraManompo.vue";

import HampiditraMpiaraManompo from "./components/HampiditraMpiaraManompo.vue";

import HanavaoMpiaraManompo from "./components/FanavaozanaMpiaraManompo.vue";

import AffichageContenu from "./components/AffichageContenu.vue";




const routes = [

    {
        path:"/",
        name:"FamenoanaAnjaraFampirantiana",
        component: HamiditraAnjaraFamp,
        meta:{
            title:"Hampiditra Anjara Fampirantiana",
        }
    },
    {
        path:"/testa",
        name:"AffichageContenu",
        component: AffichageContenu,
        meta:{
            title:"Affichage Contenu",
        }
    },
    {
        path:"/HanavaoAnjara",
        name:"FamenoanaNyFanavaozana",
        component: FamenoanaNyFanavaozana,
        meta:{
            title:"Hanavao anjara fampirantiana",
        }
    },
    {
        path:"/LisitraFampirantiana",
        name:"HamoakaPdfFampirantiana",
        component: LisitraFampirantiana,
        meta:{
            title:"Lisitra anjara fampirantiana",
        }
    },
    {
        path:"/Fanampiana",
        name:"FanampianaFampiasanaAzy",
        component: FanampianaFampiasanaAzy,
        meta:{
            title:"Fanampiana ny fampidirana anjara",
        }
    },
    {
        path:"/FanampianaFanavaozana",
        name:"FanampianaFanavaozana",
        component: FanampianaFanavaozana,
        meta:{
            title:"Fanampiana ny fampiasana ny fanavaozana",
        }
    },
    {
        path:"/MpiaraManompo",
        name:"MpiaraManompo",
        component: MpiaraManompo,
        meta:{
            title:"Mpiara-manompo",
        }
    },
    {
        path:"/HampiditraMpiaraManompo",
        name:"HampiditraMpiaraManompo",
        component: HampiditraMpiaraManompo,
        meta:{
            title:"Hampiditra Mpiara Manompo",
        }
    },
    {
        path:"/HanavaoMpiaraManompo/:idMpiaramanompo",
        name:"FanavaozanaMpiaraManompo",
        component: HanavaoMpiaraManompo,
        meta:{
            title:"Hanavao Mpiara Manompo",
        }
    },
    
    
    
];


const router = createRouter({
    history: createWebHistory(),
    routes: routes
});
export default router;
router.afterEach((to) => (document.title = to.meta.title));
// router.beforeEach((to, from,next) =>{
//     const isAuthenticated = localStorage.getItem('token');//Vérifiez si l'utilisateur est authentifié
//     if(to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated){
//         next('/');
//     }
//     else if(to.matched.some(record => record.meta.guest) && isAuthenticated){
//         next({name : 'Accueil'});
//     }
//     else{
//         next();
//     }
// });


router.beforeEach((to, from,next) =>{
    const isAuthenticated = auth.isAuthenticated;
    const userRole = auth.getRole();
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(!isAuthenticated){
	        next('/');
	    }
        else if(to.meta.role && to.meta.role !== userRole){
            next('/');
        }
    else{
        next();
    }
}
else{
	next();
}
});