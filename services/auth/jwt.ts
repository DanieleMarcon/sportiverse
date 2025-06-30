import crypto from 'crypto';

const DEFAULT_EXPIRATION = 60 * 60; // 1h in seconds
const secret = process.env.JWT_SECRET || 'change-me';

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64url');
}

export function sign(payload: Record<string, any>, expiresIn: number = DEFAULT_EXPIRATION): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresIn;
  const tokenPayload = { ...payload, exp };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(tokenPayload));
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${signature}`;
}

export function verify(token: string): Record<string, any> {
  const [headerB64, payloadB64, signature] = token.split('.');
  if (!headerB64 || !payloadB64 || !signature) {
    throw new Error('INVALID_TOKEN');
  }
  const data = `${headerB64}.${payloadB64}`;
  const expectedSig = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  if (expectedSig !== signature) {
    throw new Error('INVALID_SIGNATURE');
  }
  const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('TOKEN_EXPIRED');
  }
  return payload;
}
