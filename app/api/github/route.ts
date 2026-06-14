// app/api/github/route.ts
import { NextResponse } from 'next/server'

const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'mangeldevs'

export async function GET() {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'GitHub API error' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json({
    public_repos: data.public_repos,
    followers: data.followers,
    following: data.following,
  })
}
