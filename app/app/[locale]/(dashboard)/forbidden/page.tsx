import Link from 'next/link'

export default async function ForbiddenPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <div className="center-page">
      <h1>Access denied</h1>
      <p>Your authenticated role does not allow this administration capability.</p>
      <Link href={`/${locale}/dashboard`} className="primary-button">Return to dashboard</Link>
    </div>
  )
}
