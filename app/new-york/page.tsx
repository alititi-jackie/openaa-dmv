import { redirect } from 'next/navigation'
import { OPENAA_DMV_URL } from '@/lib/site'

export default function NewYorkPage() {
  redirect(OPENAA_DMV_URL)
}
