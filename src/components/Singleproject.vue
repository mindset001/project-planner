<template>
    <div class="project" :class="{ complete: project.complete}">
        <div class="action">
        
        <div><h3 @click="atClick">{{project.title}}</h3></div>
        <div class="icons">


            <span class="material-icons tick" 
            @click="toggleComplete"> done </span>



            <router-link :to= "`/projects/${ project.id }`">
            <span class="material-icons"> edit </span></router-link>


            <span class="material-icons" @click="atDelete(project.id)"> delete </span>
        </div>
        
        </div>
        <div class="details" v-show="detail" >
        <p>{{project.details}}</p>
        </div>
    </div>
</template>

<script>
import { db, updateDoc, doc,  } from "@/Firebase/firebase"
export default {
    props: ['project', 'atDelete', ],
    data (){
        return{
            detail: false,
            uri: 'http://localhost:3000/projects/' + this.project.id
        }
    },
    methods: {
         atClick() {
                this.detail = !this.detail
        },
        
        async toggleComplete(){
            // fetch(this.uri, {
            //     method: "PATCH",
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify(   {complete: !this.project.complete})
            // }).then (() => {
            //     this.$emit('complete', this.project.id)
                
            // }).catch((err) => console.log(err))

            // console.log("function complete");
             const upCollection = doc(db, 'planning', this.project.id)
            await updateDoc(upCollection, {
                complete: !this.project.complete
            })
            this.$router.go('/')
            // await getDocs(collection(db, 'planning'))
            // this.$router.push('/')
        },

    },
    mounted(){
        console.log(this.project);
    }
      
    
}

</script>


<style scoped>
    .project {
        margin: 20px auto;
        background: white;
        padding: 10px 20px;
        border-radius: 4px;
        box-shadow: 1px 2px 3px rgba(0,0,0,0.05);
        border-left: 4px solid #e90074;
    }
    h3{
        cursor: pointer;
    }
    .action{
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
.material-icons{
        font-size: 24px;
        margin-left: 24px;
        color: #bbb;
        cursor: pointer;
    }
    .material-icons:hover{
    color: #777;
    }
    .project.complete {
        border-left: 4px solid #00ce89
    }
    .project.complete .tick {
        color: #00ce89;
    }
</style>
