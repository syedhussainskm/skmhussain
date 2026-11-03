import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-5 text-center">
      <p className="mb-4 font-mono text-sm text-accent">// 404</p>
      <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
      <p className="mb-8 text-muted-foreground">
        This page doesn&apos;t exist — but the portfolio does.
      </p>
      <Link to="/" className="btn-primary">
        Back to portfolio
      </Link>
    </div>
  )
}
