module.exports = async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err == null) {
      err = new Error('Null or undefined error');
    }
    // some errors will have .status
    // however this is not a guarantee
    ctx.status = err.status || 500;
    ctx.type = 'application/json';
    ctx.body = {
      success: false,
      message: err.stack
    };
    ctx.app.emit('error', err, this);
  }
};
