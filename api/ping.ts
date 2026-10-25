export default async function handler(req: any, res: any) {
  res.status(200).json({
    status: 'ok',
    message: 'Pong from Vercel Serverless Function',
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    hasAdminSecret: Boolean(process.env.ADMIN_SECRET),
    usingFallbackSecret: !process.env.ADMIN_SECRET,
    hasBlobStorage: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    nodeVersion: process.version,
    env: process.env.VERCEL_ENV || 'development',
    region: process.env.VERCEL_REGION || 'unknown',
    timestamp: new Date().toISOString()
  });
}
