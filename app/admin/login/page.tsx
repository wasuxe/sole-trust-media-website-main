"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Lock, Mail, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    async function checkExistingSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.replace("/admin/dashboard")
          return
        }
      } catch (err) {
        console.error("Session verification error:", err)
      } finally {
        setCheckingSession(false)
      }
    }

    checkExistingSession()
  }, [router])

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const cleanEmail = email.trim()
    if (!cleanEmail || !password) {
      setError("Please provide both email and password.")
      return
    }

    setLoading(true)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      })

      if (authError) {
        setError(authError.message || "Invalid login credentials. Please try again.")
        setLoading(false)
        return
      }

      if (data?.session) {
        router.push("/admin/dashboard")
      } else {
        setError("Unable to initialize session. Please try again.")
        setLoading(false)
      }
    } catch (err) {
      console.error("Login unexpected error:", err)
      setError("An unexpected error occurred while logging in. Please check your network and credentials.")
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--cream, #f2ece3)",
          fontFamily: "'Manrope', sans-serif",
          color: "var(--dark, #302219)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <Loader2 className="animate-spin" size={28} style={{ color: "var(--brown, #4b3528)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Verifying access…
          </span>
        </div>
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--cream, #f2ece3)",
        padding: "24px",
        fontFamily: "'Manrope', sans-serif",
        color: "var(--dark, #302219)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "44px 36px",
          border: "1px solid rgba(75, 53, 40, 0.18)",
          boxShadow: "0 12px 35px rgba(48, 34, 25, 0.06)",
        }}
      >
        {/* Header Branding */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div className="wordmark" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "30px", letterSpacing: "-0.11em", fontWeight: 800, color: "var(--dark, #302219)" }}>
              STM
            </span>
            <small style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.14em", marginTop: "6px", color: "var(--muted, #806a58)" }}>
              SOLE TRUST MEDIA
            </small>
          </div>

          <div
            style={{
              display: "inline-block",
              marginTop: "18px",
              padding: "4px 12px",
              borderRadius: "999px",
              backgroundColor: "rgba(75, 53, 40, 0.08)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--brown, #4b3528)",
              fontWeight: 600,
            }}
          >
            Admin Access
          </div>

          <h1
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              marginTop: "16px",
              marginBottom: "6px",
              color: "var(--dark, #302219)",
            }}
          >
            Portal Authentication
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--muted, #806a58)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Sign in with authorized agency credentials.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div
            role="alert"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              backgroundColor: "rgba(220, 38, 38, 0.08)",
              border: "1px solid rgba(220, 38, 38, 0.25)",
              color: "#991b1b",
              borderRadius: "10px",
              padding: "12px 14px",
              fontSize: "13px",
              lineHeight: 1.45,
              marginBottom: "22px",
            }}
          >
            <AlertCircle size={17} style={{ flexShrink: 0, marginTop: "2px" }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label
              htmlFor="admin-email"
              style={{
                display: "block",
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--brown, #4b3528)",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--muted, #806a58)",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <Mail size={15} />
              </span>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@soletrustmedia.agency"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 12px 11px 36px",
                  borderRadius: "8px",
                  border: "1px solid rgba(75, 53, 40, 0.24)",
                  backgroundColor: "#ffffff",
                  fontSize: "14px",
                  color: "var(--dark, #302219)",
                  fontFamily: "'Manrope', sans-serif",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--dark, #302219)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(75, 53, 40, 0.24)")}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              style={{
                display: "block",
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--brown, #4b3528)",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--muted, #806a58)",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <Lock size={15} />
              </span>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 40px 11px 36px",
                  borderRadius: "8px",
                  border: "1px solid rgba(75, 53, 40, 0.24)",
                  backgroundColor: "#ffffff",
                  fontSize: "14px",
                  color: "var(--dark, #302219)",
                  fontFamily: "'Manrope', sans-serif",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--dark, #302219)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(75, 53, 40, 0.24)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--muted, #806a58)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              backgroundColor: "var(--dark, #302219)",
              color: "var(--cream, #f2ece3)",
              border: "none",
              borderRadius: "999px",
              padding: "14px 20px",
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s, opacity 0.2s",
              opacity: loading ? 0.75 : 1,
              width: "100%",
            }}
            onMouseOver={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "var(--brown, #4b3528)"
            }}
            onMouseOut={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "var(--dark, #302219)"
            }}
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: "28px", textAlign: "center" }}>
          <a
            href="/"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted, #806a58)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(128, 106, 88, 0.4)",
              paddingBottom: "2px",
            }}
          >
            ← Back to public website
          </a>
        </div>
      </div>
    </main>
  )
}
