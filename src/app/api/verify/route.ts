import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing token' }), { status: 400 });
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { email: string, firstName: string };

    return new Response(JSON.stringify({ success: true, email: decoded.email }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid or expired token' + error }), { status: 400 });
  }
}
