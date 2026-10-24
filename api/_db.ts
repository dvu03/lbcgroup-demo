import { neon } from '@neondatabase/serverless';

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured on the server');
  }
  return neon(connectionString);
}

export function verifyAdmin(authHeader?: string | string[]): boolean {
  const secret = process.env.ADMIN_SECRET || 'lbc_admin_secret_998877';
  if (!secret) {
    return false;
  }
  
  if (!authHeader) {
    return false;
  }

  const headerStr = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  const token = headerStr.startsWith('Bearer ') ? headerStr.slice(7).trim() : headerStr.trim();
  
  return token === secret;
}
