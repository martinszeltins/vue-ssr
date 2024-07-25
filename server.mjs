import fs from 'fs'
import path from 'path'
import express from 'express'
import { createServer } from 'vite'
import { renderToString } from 'vue/server-renderer'

const resolve = (filePath) => path.resolve(filePath)

const render = async(url) => {
    const { createApp } = await vite.ssrLoadModule('/src/main.ts')
    const { app, router } = createApp()

    router.push(url)
    await router.isReady()

    const html = await renderToString(app, {})

    return { html }
}

const app = express()

const vite = await createServer({
    root: resolve('.'),
    appType: 'custom',
    server: {
        middlewareMode: true,
    },
})

app.use(vite.middlewares)

app.use('*', async(req, res) => {
    const url = req.originalUrl || req.url

    const template = await vite.transformIndexHtml(url, fs.readFileSync(resolve('index.html'), 'utf-8'))
    const renderRes = await render(url)

    const html = template.replace('<div id="app"></div>', `<div id="app">${renderRes.html}</div>`)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
})


app.listen(3000, () => {
    console.log('http://localhost:3000')
})
