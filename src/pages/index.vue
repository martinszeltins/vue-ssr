<template>
    <h1>Index <button @click="times++">clicked {{ times }} times</button></h1>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const times = ref(0)
</script>
