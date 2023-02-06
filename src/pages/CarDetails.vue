<script setup>
    import axios from 'axios'
    import {onMounted, reactive} from 'vue'
    import {useUserStore} from '@/stores/userStore'
    import {useRouter, useRoute} from 'vue-router'
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
        car: {}
    })

    onMounted( () => {
        axios.get('http://localhost:5000/car/'+route.query.q, { headers: { Authorization: useUserStore().token } })
            .then( (res) => {
                state.car = res.data.car
            })
    })
</script>

<template>
    <div class="container">
        <div class="back" @click="router.back()">
            <img src="@/assets/back.svg" alt="Retour">
            <span>Retour à la liste des véhicules</span>
        </div>
        <div v-if="state.car" class="car">
            <h1>{{state.car.name}}</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, enim quos modi porro aspernatur dolorem, obcaecati veniam asperiores voluptate natus odit quidem quaerat dolor nihil atque ad repudiandae quis error?</p>
            <img :src="state.car.image" alt="Car image">
            <div class="information">
                <table>
                    <tbody>
                        <tr>
                            <td>1-3 jours</td>
                            <td>1000 €</td>
                        </tr>
                        <tr>
                            <td>4-7 jours</td>
                            <td>950 €</td>
                        </tr>
                        <tr>
                            <td>+8 jours</td>
                            <td>900 €</td>
                        </tr>
                        <tr>
                            <td>Extra kms</td>
                            <td>5 €</td>
                        </tr>
                        <tr>
                            <td>Franchise</td>
                            <td>15 000€</td>
                        </tr>
                        <tr>
                            <td>Km inclus / jour</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>Nb de places</td>
                            <td>7</td>
                        </tr>
                        <tr>
                            <td>Spécifications</td>
                            <td>V8/585 ch/4X4</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .container {
        padding: 1rem;
    }
    .back {
        margin-bottom: 4rem;
        cursor: pointer;
    }
    .back img {
        width: 18px;
        height: 18px;
        margin-right: 0.5rem;
    }
    .back span {
        text-decoration: underline;
        text-underline-offset: 0.25rem;
    }
    .back * {
        vertical-align: middle;
    }

    .car img {
        width: 100%;
    }

    table {
        width: 100%;
        border: 1px solid black;
        border-radius: 3px;
    }

    td {
        padding: 0.5rem 0;
    }

    tr:nth-child(even) {background-color: #f2f2f2;}

</style>