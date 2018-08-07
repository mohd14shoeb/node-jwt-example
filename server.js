const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const { makeJWT, checkJWT } = require('./jwt')

const app = new Koa()
const router = new Router()

// html template: xtemplate
const xtpl = require('xtpl/lib/koa2')
xtpl(app, {
  views: './views',
})

router.get('/', async (ctx, next) => {
  const token = makeJWT()
  ctx.body = await ctx.render('jwt', { token: token })
})

router.post('/', (ctx, next) => {
  const token = ctx.request.body.token
  if (checkJWT(token)) {
    ctx.response.status = 200
    ctx.body = 'success!'
  } else {
    ctx.response.status = 500
    ctx.body = 'fail!'
  }
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
console.log('open: http://localhost:3000')
