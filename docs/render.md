// marko render
// http://psteeleidem.com/marko-versus-dust/
const marko = require('marko');

router.get('/marko', (ctx, next) => {
    let ip = ctx.ip;

    let data = {
        ip: ip,
        ip2: co(function *() {
            yield Promise.delay(3000);
            return '3 seconds';
        })(),
        ip3: co(function *() {
            yield Promise.delay(5000);
            return '5 seconds';
        })(),
    };

    // When body is a stream, Koa automatically streams it to the client.
    ctx.body = marko.load(require.resolve('./view/ip.marko.html')).stream(data);
    ctx.type = 'text/html; charset=utf-8';
});