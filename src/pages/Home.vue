<script setup>

    import { reactive } from 'vue'
    import {useRouter} from 'vue-router'
    import axios from 'axios'
    import {useUserStore} from '@/stores/userStore'
    const router = useRouter()
    const state = reactive({
        form: {
            username: '',
            password: '',
        },
        loading: false,
        error: false
    })

    function submit() {
        if(!state.form.username || !state.form.password) {
            alert('Veuillez remplir tout les champs du formulaire') 
        }
        else {
            state.loading = true
            axios.post('http://localhost:8000/api/.user/login', state.form)
                .then( (res) => {
                    useUserStore().token = res.data.token
                    state.loading = false
                    router.push('/car-list')
                })
                .catch( (error) => {
                    state.error = error
                })
        }
    }

</script>

<template>
    <div>
        <div class="header">
            <img src="@/assets/logo.png" alt="Logo">
        </div>
        <div class="container">
            <h1 className="formcontentTitle">Connexion</h1>
            <p>Connectez-vous à l’aide des identifiants reçus dans votre mail d’activation.</p>
            <form className="formcontent">
                <input placeholder='Identifiant' v-model="state.form.username"/>
                <input placeholder='Mot de passe' type="password" v-model="state.form.password"/>
                <button @click.prevent="submit">
                    Connexion
                    <img src="@/assets/loading.svg" v-if="state.loading" class="loading" alt="Chargement en cours" />
                </button>
                <span v-if="state.error">{{state.error}}</span>
            </form>
        </div>
    </div>
  
</template>


<style scoped>

    .header {
        height: 500px;
        background: url('@/assets/bg-cars.png');
    }

    .header > img {
        margin: 2rem;
    }

    input {
        background-color: #F9F9F9;
        border: none;
        height: 50px;
        margin: 0.25rem 0;
        width: calc(100% - 2rem);
        padding: 1rem;
    }

    button {
        display: block;
        width: 100%;
        background-color:red;
        color: white;
        border: none;
        padding: 1rem;
        font-weight: bold;
    }

    .container {
        padding: 1rem;
    }

</style>