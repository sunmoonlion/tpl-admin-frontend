import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      surface: 'admin',
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
