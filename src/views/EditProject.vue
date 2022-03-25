<template>
    <div>
        <form @submit.prevent="handleSubmit">
        <label >Title:</label>
        <input type="text" required v-model="title">
        <label >Details</label>

        <input type="text" required v-model="details">
        <button >Update Project</button>
    </form>

    </div>
</template>

<script>
import { db, updateDoc, doc,  } from "@/Firebase/firebase"
export default {
    props: ['id'],
    data(){
        return{
            details: '',
            title: '',
            uri: 'http://localhost:3000/projects/' + this.id
        }
    },
    mounted(){
        // fetch(this.uri)
        // .then(res => res.json())
        // .then(data => {
        //     this.details = data.details,
        // this.title = data.title
        // })
    },
    methods: {
      async handleSubmit(){
            // fetch(this.uri, {
            //     method: "PATCH",
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify( {title: this.title, details: this.details})
            // }).then(() => {
            //     this.$router.push('/')
            // }).catch(err => console.log(err.message))
            const upCollection = await doc(db, 'planning', this.$route.params.id )
            await updateDoc(upCollection, {
                title: this.title,
                details: this.details
            })
            // await getDocs(collection(db, 'planning'))
            this.$router.push('/')
        
            }
            //  catch (error) {
                
            // console.log(error);


        },
    }

</script>



<style scoped>
    form {
        background: white;
        padding: 20px;
        border-radius: 10px;
    }
    label{
        display: block;
        color: #bbb;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 1px;
        margin: 20px 0 10px 0;
    }
    input{
        padding: 10px;
        border: 0;
        border-bottom: 1px solid #ddd;
        width: 100%;
        box-sizing: border-box;
    }
    textarea{
        border: 1px solid #ddd;
        padding: 10px;
        width: 100%;
        box-sizing: border-box; 
        height: 100px;
    }
    form button {
        display: block;
        margin: 20px auto 0;
        background: #00ce89;
        color: white;
        padding: 10px;
        border: 0;
        border-radius: 6px;
        font-size: 16px;
    }
</style>
