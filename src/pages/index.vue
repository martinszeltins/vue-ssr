<template>
    <div>
        <RouterLink to="/about">About</RouterLink>
        
        <h1>Index</h1>
        <button @click="times++">clicked {{ times }} times</button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const times = ref(0)
</script>
