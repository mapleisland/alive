const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const staticfile = require('koa-static')
const axios = require('axios')
const bodyParser = require('koa-bodyparser')
const router = new Router()
const fs = require('fs')

app.use(bodyParser())
app.use(staticfile('./public'))

router.get('/', async (ctx) => {
  let content = fs.readFileSync("./index.html").toString()
  return ctx.body = content;
});

router.post("/alive", async (ctx) => {
  let {url} = ctx.request.body;
  
  try {
    var res = await axios.get(url);
  }
  catch(e) {
    if(e.response) {
      return ctx.body = e.response.status;
    }
    else {
      return ctx.body = e.code;
    }
  }
  return ctx.body = res.status;
})

app.use(router.routes(), router.allowedMethods())

app.listen(10002, () => {
  console.log('10002');
})