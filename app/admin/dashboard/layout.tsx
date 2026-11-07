import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard — Sole Trust Media',
  description: 'Manage projects, case studies, and enquiries for Sole Trust Media',
}

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
