import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'

const pages = import.meta.glob('./pages/*.vue')

const routes = Object.keys(pages).map(filePath => {
    const route = filePath.match(/\.\/pages(.*)\.vue$/)[1]
    
    return {
        path: route === '/index' ? '/' : route,
        component: pages[filePath],
    }
})

export function createRouter() {
    return _createRouter({
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes,
    })
}
