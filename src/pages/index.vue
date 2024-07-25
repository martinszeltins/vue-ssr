<template>
    <div>
        <RouterLink to="/about">About</RouterLink>
        
        <h1>Index <button @click="times++">clicked {{ times }} times</button></h1>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const times = ref(0)
</script>
