import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import healthHandler from './api/health';
import contentHandler from './api/content';
import mediaHandler from './api/media';
import leadsHandler from './api/leads';
import authHandler from './api/auth';

function localApiPlugin(env: Record<string, string>) {
  Object.assign(process.env, env);

  const handlers: Record<string, (req: any, res: any) => Promise<any>> = {
    '/api/health': healthHandler,
    '/api/content': contentHandler,
    '/api/media': mediaHandler,
    '/api/leads': leadsHandler,
    '/api/auth': authHandler,
  };

  return {
    name: 'local-vercel-functions-middleware',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const urlObj = new URL(req.url, 'http://localhost:3000');
        const pathname = urlObj.pathname;
        const handler = handlers[pathname];

        if (!handler) {
          return next();
        }

        // Add helper methods matching Vercel Serverless Function response
        res.status = function (code: number) {
          this.statusCode = code;
          return this;
        };
        res.json = function (data: any) {
          this.setHeader('Content-Type', 'application/json');
          this.end(JSON.stringify(data));
        };

        // Attach parsed query
        req.query = Object.fromEntries(urlObj.searchParams.entries());

        // Parse JSON body if POST/PUT/PATCH
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch {
              req.body = {};
            }
            try {
              await handler(req, res);
            } catch (err: any) {
              res.status(500).json({ error: 'Server error', message: err?.message });
            }
          });
        } else {
          try {
            await handler(req, res);
          } catch (err: any) {
            res.status(500).json({ error: 'Server error', message: err?.message });
          }
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      localApiPlugin(env)
    ],
    server: {
      port: 3000,
      open: false
    }
  };
});

