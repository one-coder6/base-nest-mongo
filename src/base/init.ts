function Start() {
  const env = process.env.NODE_ENV;
  global.isDev = ['development'].find(item => item === env) ? true : false;
}
export { Start };
