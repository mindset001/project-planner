<template>
  <div class="home">
    <FilteredNav @filterChange = "current = $event" :current = "current"/>
    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id">
    <Singleproject :project = "project" :atDelete = "atDelete" @complete= "handleComplete "/>
    </div>
  </div>
   
  </div>
</template>

<script>
// @ is an alias to /src
import Singleproject from "@/components/Singleproject"
import FilteredNav from "@/components/FilteredNav"
import { db, collection, getDocs, deleteDoc, doc } from "@/Firebase/firebase"




export default {

  name: 'Home',
  components: {
    Singleproject,
    FilteredNav
  },
  data () {
    return{
      projects:[],
      current: 'all'
    }
  },
  async mounted(){
    // fetch("http://localhost:3000/projects")

    const getCollection = collection( db, 'planning')
    await getDocs(getCollection)

    .then(res => res.forEach(data => {
      this.projects.push({...data.data(), id:data.id})
    }))
    // .then(data => this.projects = data)
    .catch(err => console.log(err.message))
  },



  
  methods: {
    async atDelete(go){
      // const shak = this.projects.filter((comot) => comot.id != go)
      // this.projects = shak
      

      // fetch("http://localhost:3000/projects/" + go, {
      //   method: "DELETE"
      // })
     const temData = []

      const delCollection = await doc(db, 'planning', go)
            await deleteDoc(delCollection )
            await getDocs(collection(db, 'planning'))
      // .then(()=> this.projects = shak)
      .then(res => {
        res.forEach(data => {
      temData.push({...data.data(), id:data.id})
    })
    this.projects = temData
      })
    // .then(data => this.projects = data)
    .catch(err => console.log(err.message))
      
    },




    handleComplete(id) {
      let p = this.projects.find(project => {
        return project.id === id
      })
        p.complete = !p.complete
    }
  

  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    filteredProjects(){
      if (this.current === 'completed') {
        return this.projects.filter( project => project.complete)
      }
       if (this.current === 'onGoing') {
        return this.projects.filter( project => !project.complete)
      }
      return this.projects
    }
  }
  
} 
</script>


















