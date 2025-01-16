import * as fs from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const filePath = path.resolve(process.cwd(), 'app/lib/users.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const users = JSON.parse(fileContent)

    return NextResponse.json(users)
  }
  catch {
    return NextResponse.json({ message: 'Error loading users' }, { status: 500 })
  }
}
