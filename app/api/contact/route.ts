import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { message: "Kaikki pakolliset kentät tulee täyttää." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Kiitos yhteydenotostasi. Otamme sinuun yhteyttä pian.",
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Tapahtui odottamaton virhe." },
      { status: 500 },
    );
  }
}
