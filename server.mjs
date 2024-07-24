import fs from 'fs'
import path from 'path'
import express from 'express'
import { createServer } from 'vite'

const resolve = (filePath) => path.resolve(filePath)

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
    const { render } = await vite.ssrLoadModule('/src/entry-server.ts')
    const renderRes = await render(url)

    const html = template.replace(`<!-- app -->`, renderRes.html)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
})


app.listen(3000, () => {
    console.log('http://localhost:3000')
})
