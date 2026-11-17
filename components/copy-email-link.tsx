'use client'

import { Check, Copy, Mail } from 'lucide-react'
import { useState } from 'react'

export const PUBLIC_DISPLAY_EMAIL = 'admin@soletrustmedia.agency'

interface CopyEmailLinkProps {
  tone?: 'light' | 'dark'
  size?: 'sm' | 'md'
}

export default function CopyEmailLink({ tone = 'dark', size = 'md' }: CopyEmailLinkProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(PUBLIC_DISPLAY_EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback copy via temporary input
      try {
        const input = document.createElement('input')
        input.value = PUBLIC_DISPLAY_EMAIL
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
      } catch {
        // noop
      }
    }
  }

  const textColor = tone === 'dark' ? 'var(--accent-gold)' : 'var(--text-ink)'
  const borderColor = tone === 'dark' ? 'var(--border-hairline-dark)' : 'var(--border-hairline)'
  const fontSize = size === 'sm' ? '12px' : '13px'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      <a
        href={`mailto:${PUBLIC_DISPLAY_EMAIL}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          color: textColor,
          textDecoration: 'none',
          fontSize,
          fontFamily: 'var(--font-utility)',
        }}
      >
        <Mail size={13} />
        <span>{PUBLIC_DISPLAY_EMAIL}</span>
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${PUBLIC_DISPLAY_EMAIL} to clipboard`}
        title={copied ? 'Copied!' : 'Copy email'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '3px 8px',
          borderRadius: '999px',
          border: `1px solid ${borderColor}`,
          background: copied
            ? 'var(--accent-terracotta)'
            : tone === 'dark'
            ? 'rgba(246, 241, 233, 0.06)'
            : 'rgba(36, 25, 20, 0.05)',
          color: copied ? 'var(--text-cream)' : textColor,
          fontSize: '9.5px',
          fontFamily: 'var(--font-utility)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {copied ? <Check size={10} /> : <Copy size={10} />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </span>
  )
}
