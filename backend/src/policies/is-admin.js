module.exports = async (ctx, next) => {
  // Policy removed — no-op
  await next();
};
