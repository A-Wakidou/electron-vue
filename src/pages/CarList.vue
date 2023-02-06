<script setup>
    import axios from 'axios'
    import {onMounted, reactive} from 'vue'
    import {useUserStore} from '@/stores/userStore'
    import {useRouter} from 'vue-router'
    const router = useRouter()
    const state = reactive({
        cars: [],
        toogle: false,
        legalNotice: false
    })

    onMounted( () => {
        axios.get('http://localhost:5000/car', { headers: { Authorization: useUserStore().token } })
            .then( (res) => {
                state.cars = res.data.cars
            })
    })

    function logOut() {
        useUserStore().$reset()
        router.push('/')
    }

</script>

<template>
    <div class="container">
        <div v-if="state.toogle" class="toogle">
            <img @click="state.toogle = false" src="@/assets/close.svg" alt="Close">
            <div class="legal-notice" v-if="state.legalNotice">
                <h2>Mentions légales</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, dicta! Eligendi suscipit obcaecati libero? Nisi, rem asperiores. Quisquam fugit debitis nisi reiciendis tenetur voluptate odit nam corporis rerum at. Excepturi?</p>
            </div>
            <div class="buttons">
                <button @click="state.legalNotice = !state.legalNotice">Mentions légales</button>
                <button @click="logOut">Se déconnecter</button>
            </div>
        </div>
        <img @click="state.toogle = true" src="@/assets/toogle.svg" alt="Toogle">
        <h1>Nos véhicules</h1>
        <p>Choisissez un véhicule pour consulter les détails du modèle et les tarifs.</p>
        <div class="car" v-for="item in state.cars" :key="item.id">
            <Router-Link :to="'/car-details?q='+item.id">
            <img :src="item.image" :alt="item.name">
            <div>
                <span>{{item.name}}</span>
                <span class="price">à partir de <span>{{item.price}}€</span></span>
            </div>
            </Router-Link>
        </div>
    </div>
</template>


<style scoped>
    .container {
        padding: 1rem;
    }

    .car {
        box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
        border-radius: 5px;
        margin: 1rem 0;
        padding: 1rem;
    }

    .car img {
        width: 100%
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    .car > a > div {
        display: grid;
        grid-template-columns: 50% 50%;
        font-weight: bold;
    }

    .car > a > div .price {
        text-align: right;
    }
    .car > a > div .price > span {
        color: red;
    }

    .toogle {
        background: rgba(0, 0, 0, 0.8);
        position: absolute;
        height: calc(100vh - 2rem);
        width: calc(100vw - 2rem);
        color: white;
    }

    .toogle img {
        padding: 1rem;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .toogle .buttons {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 60%;
    }

    .toogle .buttons button:first-child {
        background: rgba(255, 255, 255, 0.2);
        border:none;
        font-weight: bold;
        color: white;
        padding: 0.75rem;
        margin: 1rem;
    }
    .toogle .buttons button:last-child {
        background: red;
        border:none;
        font-weight: bold;
        color: white;
        padding: 0.75rem;
        margin: 1rem;
    }

    .legal-notice {
        padding: 0 1rem;
    }

</style>