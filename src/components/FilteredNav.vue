<template>
    <div>
        <nav class="filter-nav">
            <button @click="updateFilter('all')"
            :class="{ active: current === 'all'}"
            >View All</button>

            <button @click="updateFilter('completed')" 
             :class="{ active: current === 'completed'}"
            >Completed</button>

            <button 
            @click="updateFilter('onGoing')"  
            :class="{ active: current === 'onGoing'}">
            Ongoing</button>
        </nav>
    </div>
</template>

<script>
export default {
    props: ['current'],
    methods: {
        updateFilter(by){
            this.$emit('filterChange', by)
        }
    }
}
</script>

<style scoped>
.filter-nav button{
    background: none;
    border: none;
    color: #bbb;
    outline: none;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
    cursor: pointer;
    letter-spacing: 1px;
    font-weight: bold;


}
    .filter-nav button.active{
        color: #555;
    }
</style>
