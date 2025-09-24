import { NextApiRequest, NextApiResponse } from 'next';
import { moderateMessage } from '@/lib/geminiModeration';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const profile = await currentProfile();
  if (!profile) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const { content } = await req.json();

  if (!content) {
    return NextResponse.json('Content is required', { status: 400 });
  }

  const moderationResult = await moderateMessage(content);
  console.log(JSON.stringify(moderationResult))

  if (moderationResult.isViolation) {
    return NextResponse.json({
      error: "Message violates community guidelines",
      moderation: moderationResult
    });
  }

  return NextResponse.json({
    error: "Message is clean",
    moderation: moderationResult
  });
}
