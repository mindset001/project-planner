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
  mounted(){
    fetch("http://localhost:3000/projects")
    .then(res => res.json())
    .then(data => this.projects = data)
    .catch(err => console.log(err.message))
  },
  
  methods: {
    atDelete(go){
      const shak = this.projects.filter((comot) => comot.id != go)
      // this.projects = shak
      

      fetch("http://localhost:3000/projects/" + go, {
        method: "DELETE"
      })
      .then(()=> this.projects = shak)
      
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


















