import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const res = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2025-06-03"
      })
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    const clientSecret = data.client_secret?.value;

    if (!clientSecret) {
      return NextResponse.json({ error: "Client secret missing from response." }, { status: 500 });
    }

    return NextResponse.json({ clientSecret });
  } catch (err) {
    console.error("Session creation failed", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
