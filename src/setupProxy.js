// src/setupProxy.js
import proxy from 'http-proxy-middleware';

export default app => {
  console.log("====================");
  const basePath = '/.netlify/functions';

  app.use(
    proxy(basePath, {
      target: 'http://localhost:9000',
      pathRewrite: {
        '^/\\.netlify/functions': '',
      },
    }),
  );
};