import { NextResponse } from 'next/server';

/**
 * This API call processed the start of an OPEN AI 
 * Session for the realtime chat agents.
 * 
 * @returns The clientSecret
 */
export async function POST() {
  try {
    //Request an api fetch from the api
    const res = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        //Hide api key in .env.local
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      //Body for model
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2025-06-03"
      })
    });

    //If no response return
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err + 'No response from api check balance.' }, { status: res.status });
    }

    //Await the res.json data
    const data = await res.json();
    //Extract client key for frontend interactions
    const clientSecret = data.client_secret?.value;

    //If no clientSecret found return
    if (!clientSecret) {
      return NextResponse.json({ error: "Client secret missing from response." }, { status: 500 });
    }

    //return clientSecrent
    return NextResponse.json({ clientSecret });
    
  } catch (err) {
    console.error("Session creation failed", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
