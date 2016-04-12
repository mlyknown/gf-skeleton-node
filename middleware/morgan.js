var Morgan = require('koa-morgan'), logger;

// https://github.com/expressjs/morgan
Morgan.token('gfUid', (req, res)=> req.headers['UserId']);
logger = Morgan(':remote-addr [:date[iso]] ":method :url" :status :res[content-length] :response-time ms gfUid: :gfUid ":referrer" ":user-agent"');
// const logger = Morgan('combined');

module.exports = logger;
