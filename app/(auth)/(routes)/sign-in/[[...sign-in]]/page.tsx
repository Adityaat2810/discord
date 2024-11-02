import { SignIn } from '@clerk/nextjs'
export const runtime = 'experimental-edge'

export default function Page() {
  return <SignIn />
}