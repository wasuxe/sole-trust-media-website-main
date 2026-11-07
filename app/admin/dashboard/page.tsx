"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  LogOut,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  X,
  Mail,
  Phone,
  Building,
  DollarSign,
  Calendar,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Eye,
} from "lucide-react"
import { supabase } from "@/lib/supabase/client"

// ============================================================================
// Types & Interfaces
// ============================================================================

export type ProjectStatus = "draft" | "published"

export interface Project {
  id: string
  title: string
  slug: string
  client_name?: string | null
  category: string
  short_description?: string | null
  cover_image?: string | null
  featured: boolean
  status: ProjectStatus
  display_order: number
  created_at?: string
  updated_at?: string
}

export interface CaseStudyData {
  id?: string
  project_id: string
  client_introduction: string
  business_challenge: string
  objectives: string
  strategy: string
  creative_direction: string
  execution: string
  services_delivered: string[]
  results: string
}

export type EnquiryStatus = "new" | "contacted" | "in_discussion" | "converted" | "closed"

export interface Enquiry {
  id: string
  name?: string | null
  full_name?: string | null
  company?: string | null
  email: string
  phone?: string | null
  services?: string | string[] | null
  budget?: string | null
  message?: string | null
  status: EnquiryStatus
  internal_notes?: string | null
  created_at?: string
  updated_at?: string
}

const CATEGORIES = [
  "Branding & Identity",
  "Website Development",
  "Application Development",
  "Digital Marketing",
  "Creative & Content",
  "Technology & Automation",
]

const ENQUIRY_STATUSES: { value: EnquiryStatus; label: string; bg: string; color: string; border: string }[] = [
  { value: "new", label: "New", bg: "#fef3c7", color: "#92400e", border: "rgba(146, 64, 14, 0.25)" },
  { value: "contacted", label: "Contacted", bg: "#e0e7ff", color: "#3730a3", border: "rgba(55, 48, 163, 0.25)" },
  { value: "in_discussion", label: "In Discussion", bg: "#ffedd5", color: "#9a3412", border: "rgba(154, 52, 18, 0.25)" },
  { value: "converted", label: "Converted", bg: "#dcfce7", color: "#166534", border: "rgba(22, 101, 52, 0.25)" },
  { value: "closed", label: "Closed", bg: "#f3f4f6", color: "#4b5563", border: "rgba(75, 85, 99, 0.25)" },
]

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

export default function AdminDashboardPage() {
  const router = useRouter()

  // Auth State
  const [sessionLoading, setSessionLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  // Navigation State
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "enquiries">("overview")

  // Data States
  const [projects, setProjects] = useState<Project[]>([])
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loadingData, setLoadingData] = useState(false)
  const [actionMessage, setActionMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  // Overview Counts
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
  })

  // Projects State
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
  const [projectSaving, setProjectSaving] = useState(false)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  // Project Form Fields
  const [formTitle, setFormTitle] = useState("")
  const [formSlug, setFormSlug] = useState("")
  const [formClientName, setFormClientName] = useState("")
  const [formCategory, setFormCategory] = useState(CATEGORIES[0])
  const [formShortDescription, setFormShortDescription] = useState("")
  const [formCoverImageUrl, setFormCoverImageUrl] = useState("")
  const [formFeatured, setFormFeatured] = useState(false)
  const [formStatus, setFormStatus] = useState<ProjectStatus>("draft")
  const [formDisplayOrder, setFormDisplayOrder] = useState(0)

  // Case Study Form Fields (shown when editing project)
  const [csClientIntro, setCsClientIntro] = useState("")
  const [csBusinessChallenge, setCsBusinessChallenge] = useState("")
  const [csObjectives, setCsObjectives] = useState("")
  const [csStrategy, setCsStrategy] = useState("")
  const [csCreativeDirection, setCsCreativeDirection] = useState("")
  const [csExecution, setCsExecution] = useState("")
  const [csServicesDelivered, setCsServicesDelivered] = useState("")
  const [csResults, setCsResults] = useState("")
  const [loadingCaseStudy, setLoadingCaseStudy] = useState(false)

  // Enquiries State
  const [enquirySearchQuery, setEnquirySearchQuery] = useState("")
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>("all")
  const [expandedEnquiryId, setExpandedEnquiryId] = useState<string | null>(null)
  const [enquiryNoteDrafts, setEnquiryNoteDrafts] = useState<Record<string, string>>({})
  const [enquiryStatusDrafts, setEnquiryStatusDrafts] = useState<Record<string, EnquiryStatus>>({})
  const [enquiryUpdatingId, setEnquiryUpdatingId] = useState<string | null>(null)

  // Auto-dismiss feedback message after 4.5 seconds
  useEffect(() => {
    if (actionMessage) {
      const timer = setTimeout(() => setActionMessage(null), 4500)
      return () => clearTimeout(timer)
    }
  }, [actionMessage])

  // --------------------------------------------------------------------------
  // Authentication Protection
  // --------------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true

    async function verifyAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.replace("/admin/login")
          return
        }

        if (isMounted) {
          setUserEmail(session.user?.email ?? null)
          setSessionLoading(false)
        }
      } catch (err) {
        console.error("Auth check failed:", err)
        if (isMounted) router.replace("/admin/login")
      }
    }

    verifyAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && isMounted) {
        router.replace("/admin/login")
      } else if (session && isMounted) {
        setUserEmail(session.user?.email ?? null)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [router])

  // --------------------------------------------------------------------------
  // Data Fetching
  // --------------------------------------------------------------------------
  const fetchDashboardData = useCallback(async () => {
    setLoadingData(true)
    try {
      // 1. Fetch Projects & Counts
      const { data: projectsData, error: projError, count: _projCount } = await supabase
        .from("projects")
        .select("id, title, slug, client_name, category, short_description, cover_image, featured, status, display_order, created_at, updated_at", {
          count: "exact",
        })
        .order("display_order", { ascending: true })

      if (projError) {
        console.warn("Could not load projects:", projError.message)
      }

      const loadedProjects: Project[] = (projectsData as Project[]) || []
      setProjects(loadedProjects)

      // 2. Fetch Enquiries & Counts
      const { data: enquiriesData, error: enqError, count: _enqCount } = await supabase
        .from("enquiries")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })

      if (enqError) {
        console.warn("Could not load enquiries:", enqError.message)
      }

      const loadedEnquiries: Enquiry[] = (enquiriesData as Enquiry[]) || []
      setEnquiries(loadedEnquiries)

      // Calculate overview stats
      const totalProjects = loadedProjects.length
      const publishedProjects = loadedProjects.filter((p) => p.status === "published").length
      const draftProjects = loadedProjects.filter((p) => p.status === "draft").length
      const totalEnquiries = loadedEnquiries.length
      const newEnquiries = loadedEnquiries.filter((e) => e.status === "new").length

      setStats({
        totalProjects,
        publishedProjects,
        draftProjects,
        totalEnquiries,
        newEnquiries,
      })

      // Seed enquiry drafts for inline edit
      const noteMap: Record<string, string> = {}
      const statusMap: Record<string, EnquiryStatus> = {}
      loadedEnquiries.forEach((item) => {
        noteMap[item.id] = item.internal_notes || ""
        statusMap[item.id] = item.status || "new"
      })
      setEnquiryNoteDrafts(noteMap)
      setEnquiryStatusDrafts(statusMap)
    } catch (err) {
      console.error("Dashboard fetch error:", err)
      setActionMessage({ text: "Failed to load dashboard data. Please try again.", type: "error" })
    } finally {
      setLoadingData(false)
    }
  }, [])

  useEffect(() => {
    if (!sessionLoading) {
      fetchDashboardData()
    }
  }, [sessionLoading, fetchDashboardData])

  // --------------------------------------------------------------------------
  // Logout
  // --------------------------------------------------------------------------
  async function handleLogout() {
    try {
      await supabase.auth.signOut()
      router.replace("/admin/login")
    } catch (err) {
      console.error("Logout error:", err)
      router.replace("/admin/login")
    }
  }

  // --------------------------------------------------------------------------
  // Project Actions: Add / Edit / Save / Delete
  // --------------------------------------------------------------------------
  function resetProjectForm() {
    setShowProjectForm(false)
    setEditingProjectId(null)
    setSlugManuallyEdited(false)
    setFormTitle("")
    setFormSlug("")
    setFormClientName("")
    setFormCategory(CATEGORIES[0])
    setFormShortDescription("")
    setFormCoverImageUrl("")
    setFormFeatured(false)
    setFormStatus("draft")
    setFormDisplayOrder(0)

    // Reset case study
    setCsClientIntro("")
    setCsBusinessChallenge("")
    setCsObjectives("")
    setCsStrategy("")
    setCsCreativeDirection("")
    setCsExecution("")
    setCsServicesDelivered("")
    setCsResults("")
    setLoadingCaseStudy(false)
  }

  function handleStartAddProject() {
    resetProjectForm()
    setShowProjectForm(true)
  }

  async function handleStartEditProject(project: Project) {
    setEditingProjectId(project.id)
    setShowProjectForm(true)
    setSlugManuallyEdited(true)

    setFormTitle(project.title || "")
    setFormSlug(project.slug || "")
    setFormClientName(project.client_name || "")
    setFormCategory(project.category || CATEGORIES[0])
    setFormShortDescription(project.short_description || "")
    setFormCoverImageUrl(project.cover_image || "")
    setFormFeatured(Boolean(project.featured))
    setFormStatus(project.status || "draft")
    setFormDisplayOrder(project.display_order ?? 0)

    // Fetch associated case study
    setLoadingCaseStudy(true)
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("project_id", project.id)
        .maybeSingle()

      if (!error && data) {
        setCsClientIntro(data.client_introduction || "")
        setCsBusinessChallenge(data.business_challenge || "")
        setCsObjectives(data.objectives || "")
        setCsStrategy(data.strategy || "")
        setCsCreativeDirection(data.creative_direction || "")
        setCsExecution(data.execution || "")
        setCsServicesDelivered(
          Array.isArray(data.services_delivered)
            ? data.services_delivered.join(", ")
            : data.services_delivered || ""
        )
        setCsResults(data.results || "")
      } else {
        setCsClientIntro("")
        setCsBusinessChallenge("")
        setCsObjectives("")
        setCsStrategy("")
        setCsCreativeDirection("")
        setCsExecution("")
        setCsServicesDelivered("")
        setCsResults("")
      }
    } catch (err) {
      console.warn("Could not fetch case study:", err)
    } finally {
      setLoadingCaseStudy(false)
    }
  }

  async function handleSaveProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formTitle.trim()) {
      setActionMessage({ text: "Please enter a project title.", type: "error" })
      return
    }

    const finalSlug = formSlug.trim() ? slugify(formSlug) : slugify(formTitle)
    if (!finalSlug) {
      setActionMessage({ text: "Please enter a valid slug.", type: "error" })
      return
    }

    setProjectSaving(true)

    const projectPayload = {
      title: formTitle.trim(),
      slug: finalSlug,
      client_name: formClientName.trim() || null,
      category: formCategory,
      short_description: formShortDescription.trim() || null,
      cover_image: formCoverImageUrl.trim() || null,
      featured: Boolean(formFeatured),
      status: formStatus,
      display_order: Number(formDisplayOrder) || 0,
      updated_at: new Date().toISOString(),
    }

    try {
      let savedProjectId = editingProjectId

      if (editingProjectId) {
        // UPDATE existing project
        const { error: updateErr } = await supabase
          .from("projects")
          .update(projectPayload)
          .eq("id", editingProjectId)

        if (updateErr) throw updateErr
      } else {
        // INSERT new project
        const { data: insertData, error: insertErr } = await supabase
          .from("projects")
          .insert(projectPayload)
          .select("id")
          .single()

        if (insertErr) throw insertErr
        savedProjectId = insertData?.id
      }

      // If we are editing, or if a case study entry is desired
      if (savedProjectId && editingProjectId) {
        const servicesArray = csServicesDelivered
          ? csServicesDelivered
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : []

        const caseStudyPayload = {
          project_id: savedProjectId,
          client_introduction: csClientIntro.trim() || null,
          business_challenge: csBusinessChallenge.trim() || null,
          objectives: csObjectives.trim() || null,
          strategy: csStrategy.trim() || null,
          creative_direction: csCreativeDirection.trim() || null,
          execution: csExecution.trim() || null,
          services_delivered: servicesArray,
          results: csResults.trim() || null,
          updated_at: new Date().toISOString(),
        }

        // Check if case study exists
        const { data: existingCs } = await supabase
          .from("case_studies")
          .select("id")
          .eq("project_id", savedProjectId)
          .maybeSingle()

        if (existingCs?.id) {
          await supabase
            .from("case_studies")
            .update(caseStudyPayload)
            .eq("id", existingCs.id)
        } else {
          await supabase.from("case_studies").insert(caseStudyPayload)
        }
      }

      setActionMessage({
        text: editingProjectId ? "Project updated successfully." : "Project created successfully.",
        type: "success",
      })
      resetProjectForm()
      await fetchDashboardData()
    } catch (err: any) {
      console.error("Save project error:", err)
      setActionMessage({
        text: err?.message || "Failed to save project. Please check fields.",
        type: "error",
      })
    } finally {
      setProjectSaving(false)
    }
  }

  async function handleDeleteProject(project: Project) {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${project.title}"? This cannot be undone.`
    )
    if (!confirmed) return

    try {
      // First delete associated case study if any
      await supabase.from("case_studies").delete().eq("project_id", project.id)

      const { error } = await supabase.from("projects").delete().eq("id", project.id)
      if (error) throw error

      setActionMessage({ text: `Project "${project.title}" deleted.`, type: "success" })
      if (editingProjectId === project.id) {
        resetProjectForm()
      }
      await fetchDashboardData()
    } catch (err: any) {
      console.error("Delete project error:", err)
      setActionMessage({ text: err?.message || "Failed to delete project.", type: "error" })
    }
  }

  // --------------------------------------------------------------------------
  // Enquiry Actions: Update Notes/Status, Delete
  // --------------------------------------------------------------------------
  async function handleSaveEnquiry(enquiryId: string) {
    const newStatus = enquiryStatusDrafts[enquiryId] || "new"
    const newNotes = enquiryNoteDrafts[enquiryId] || ""

    setEnquiryUpdatingId(enquiryId)
    try {
      const { error } = await supabase
        .from("enquiries")
        .update({
          status: newStatus,
          internal_notes: newNotes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", enquiryId)

      if (error) throw error

      setActionMessage({ text: "Enquiry updated successfully.", type: "success" })
      // Update local state
      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === enquiryId
            ? { ...item, status: newStatus, internal_notes: newNotes }
            : item
        )
      )

      // Refresh stats
      const updatedEnquiries = enquiries.map((item) =>
        item.id === enquiryId ? { ...item, status: newStatus } : item
      )
      setStats((prev) => ({
        ...prev,
        newEnquiries: updatedEnquiries.filter((e) => e.status === "new").length,
      }))
    } catch (err: any) {
      console.error("Save enquiry error:", err)
      setActionMessage({ text: err?.message || "Failed to update enquiry.", type: "error" })
    } finally {
      setEnquiryUpdatingId(null)
    }
  }

  async function handleDeleteEnquiry(enquiryId: string, clientName: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete the enquiry from "${clientName}"? This action cannot be undone.`
    )
    if (!confirmed) return

    setEnquiryUpdatingId(enquiryId)
    try {
      const { error } = await supabase.from("enquiries").delete().eq("id", enquiryId)
      if (error) throw error

      setActionMessage({ text: "Enquiry deleted successfully.", type: "success" })
      setEnquiries((prev) => prev.filter((item) => item.id !== enquiryId))
      setStats((prev) => ({
        ...prev,
        totalEnquiries: Math.max(0, prev.totalEnquiries - 1),
      }))
      if (expandedEnquiryId === enquiryId) {
        setExpandedEnquiryId(null)
      }
    } catch (err: any) {
      console.error("Delete enquiry error:", err)
      setActionMessage({ text: err?.message || "Failed to delete enquiry.", type: "error" })
    } finally {
      setEnquiryUpdatingId(null)
    }
  }

  // --------------------------------------------------------------------------
  // Filtered Enquiries
  // --------------------------------------------------------------------------
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      // Status filter
      if (enquiryStatusFilter !== "all" && item.status !== enquiryStatusFilter) {
        return false
      }

      // Search query filter (name, email, company)
      if (enquirySearchQuery.trim()) {
        const query = enquirySearchQuery.toLowerCase()
        const nameMatch = (item.full_name || item.name || "").toLowerCase().includes(query)
        const emailMatch = (item.email || "").toLowerCase().includes(query)
        const companyMatch = (item.company || "").toLowerCase().includes(query)
        if (!nameMatch && !emailMatch && !companyMatch) {
          return false
        }
      }

      return true
    })
  }, [enquiries, enquiryStatusFilter, enquirySearchQuery])

  // --------------------------------------------------------------------------
  // Loading Screen for Auth Check
  // --------------------------------------------------------------------------
  if (sessionLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--cream, #f2ece3)",
          color: "var(--dark, #302219)",
          fontFamily: "'Manrope', sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <Loader2 className="animate-spin" size={32} style={{ color: "var(--brown, #4b3528)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Authorizing session…
          </span>
        </div>
      </div>
    )
  }

  // --------------------------------------------------------------------------
  // Main Render
  // --------------------------------------------------------------------------
  return (
    <div className="site-shell admin-container">
      {/* Dynamic Scoped Styles */}
      <style>{`
        .admin-container {
          min-height: 100vh;
          background-color: var(--cream, #f2ece3);
          color: var(--dark, #302219);
          font-family: 'Manrope', sans-serif;
          display: flex;
          flex-direction: column;
        }

        .admin-header {
          background-color: var(--dark, #302219);
          color: var(--cream, #f2ece3);
          padding: 18px 4vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(242, 236, 227, 0.15);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .admin-nav-tabs {
          display: flex;
          gap: 6px;
          background-color: rgba(48, 34, 25, 0.05);
          padding: 6px;
          border-radius: 999px;
          border: 1px solid rgba(75, 53, 40, 0.15);
        }

        .admin-tab-btn {
          border: none;
          background: transparent;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted, #806a58);
          padding: 8px 18px;
          border-radius: 999px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .admin-tab-btn:hover {
          color: var(--dark, #302219);
          background-color: rgba(255, 255, 255, 0.6);
        }

        .admin-tab-btn.active {
          background-color: var(--dark, #302219);
          color: var(--cream, #f2ece3);
          font-weight: 600;
        }

        .admin-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 2px 7px;
          border-radius: 999px;
          font-size: 9px;
          font-family: 'DM Mono', monospace;
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background-color: #ffffff;
          border: 1px solid rgba(75, 53, 40, 0.18);
          border-radius: 14px;
          padding: 22px 20px;
          box-shadow: 0 4px 20px rgba(48, 34, 25, 0.04);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(48, 34, 25, 0.07);
        }

        .admin-table-container {
          background-color: #ffffff;
          border: 1px solid rgba(75, 53, 40, 0.18);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(48, 34, 25, 0.04);
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          background-color: #faf7f2;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted, #806a58);
          padding: 14px 18px;
          border-bottom: 1px solid rgba(75, 53, 40, 0.12);
        }

        .admin-table td {
          padding: 16px 18px;
          font-size: 13px;
          border-bottom: 1px solid rgba(75, 53, 40, 0.08);
          vertical-align: middle;
        }

        .admin-table tr:hover td {
          background-color: #fdfbf7;
        }

        .admin-input, .admin-select, .admin-textarea {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid rgba(75, 53, 40, 0.25);
          background-color: #ffffff;
          font-family: 'Manrope', sans-serif;
          font-size: 13px;
          color: var(--dark, #302219);
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .admin-input:focus, .admin-select:focus, .admin-textarea:focus {
          border-color: var(--dark, #302219);
          box-shadow: 0 0 0 3px rgba(48, 34, 25, 0.08);
        }

        .admin-label {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--brown, #4b3528);
          font-weight: 600;
          margin-bottom: 6px;
        }

        .admin-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 999px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }

        .admin-btn-dark {
          background-color: var(--dark, #302219);
          color: var(--cream, #f2ece3);
        }

        .admin-btn-dark:hover {
          background-color: var(--brown, #4b3528);
        }

        .admin-btn-outline {
          background-color: transparent;
          color: var(--dark, #302219);
          border: 1px solid rgba(75, 53, 40, 0.28);
        }

        .admin-btn-outline:hover {
          background-color: rgba(75, 53, 40, 0.06);
        }

        .admin-btn-danger {
          background-color: transparent;
          color: #dc2626;
          border: 1px solid rgba(220, 38, 38, 0.3);
        }

        .admin-btn-danger:hover {
          background-color: rgba(220, 38, 38, 0.08);
        }

        @media (max-width: 820px) {
          .admin-header {
            flex-direction: column;
            gap: 14px;
            align-items: flex-start;
          }
          .admin-nav-tabs {
            width: 100%;
            overflow-x: auto;
          }
          .admin-table th:nth-child(2),
          .admin-table td:nth-child(2),
          .admin-table th:nth-child(4),
          .admin-table td:nth-child(4) {
            display: none;
          }
        }
      `}</style>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1: HEADER */}
      {/* ------------------------------------------------------------------ */}
      <header className="admin-header">
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {/* Brand Wordmark */}
          <div className="wordmark" style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "24px", letterSpacing: "-0.11em", fontWeight: 800 }}>STM</span>
            <small style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", letterSpacing: "0.14em", marginTop: "4px", color: "var(--beige, #b9a38c)" }}>
              SOLE TRUST MEDIA
            </small>
          </div>

          <div style={{ width: "1px", height: "32px", backgroundColor: "rgba(242, 236, 227, 0.2)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.01em" }}>
              Admin Dashboard
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: "999px",
                backgroundColor: "rgba(242, 236, 227, 0.12)",
                color: "var(--beige, #b9a38c)",
              }}
            >
              v2.0
            </span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {userEmail && (
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                color: "var(--beige, #b9a38c)",
                display: "none",
              }}
              className="user-email-display"
            >
              {userEmail}
            </span>
          )}

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: "var(--cream, #f2ece3)",
              textDecoration: "none",
              padding: "7px 14px",
              borderRadius: "999px",
              backgroundColor: "rgba(242, 236, 227, 0.1)",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(242, 236, 227, 0.2)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(242, 236, 227, 0.1)")}
          >
            Live Site
            <ExternalLink size={12} />
          </a>

          <button
            onClick={handleLogout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: "var(--cream, #f2ece3)",
              backgroundColor: "rgba(239, 68, 68, 0.18)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              padding: "7px 14px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.32)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.18)")}
          >
            <LogOut size={13} />
            Logout
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* NOTIFICATION BANNER */}
      {/* ------------------------------------------------------------------ */}
      {actionMessage && (
        <div
          style={{
            margin: "18px 4vw 0",
            padding: "12px 18px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor:
              actionMessage.type === "success" ? "rgba(22, 101, 52, 0.1)" : "rgba(220, 38, 38, 0.1)",
            border:
              actionMessage.type === "success"
                ? "1px solid rgba(22, 101, 52, 0.3)"
                : "1px solid rgba(220, 38, 38, 0.3)",
            color: actionMessage.type === "success" ? "#166534" : "#991b1b",
            fontSize: "13px",
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {actionMessage.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{actionMessage.text}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT AREA */}
      {/* ------------------------------------------------------------------ */}
      <main style={{ flex: 1, padding: "28px 4vw 80px" }}>
        {/* Navigation & Actions Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          {/* TABS: Overview | Projects | Enquiries */}
          <div className="admin-nav-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === "overview"}
              className={`admin-tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard size={14} />
              Overview
            </button>

            <button
              role="tab"
              aria-selected={activeTab === "projects"}
              className={`admin-tab-btn ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              <FolderKanban size={14} />
              Projects
              <span
                className="admin-badge"
                style={{
                  backgroundColor: activeTab === "projects" ? "rgba(255,255,255,0.2)" : "rgba(75,53,40,0.12)",
                  color: activeTab === "projects" ? "var(--cream, #f2ece3)" : "var(--dark, #302219)",
                }}
              >
                {stats.totalProjects}
              </span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === "enquiries"}
              className={`admin-tab-btn ${activeTab === "enquiries" ? "active" : ""}`}
              onClick={() => setActiveTab("enquiries")}
            >
              <Inbox size={14} />
              Enquiries
              {stats.newEnquiries > 0 && (
                <span
                  className="admin-badge"
                  style={{
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                  }}
                >
                  {stats.newEnquiries} new
                </span>
              )}
            </button>
          </div>

          {/* Secondary Refresh / Action */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              className="admin-btn admin-btn-outline"
              onClick={() => fetchDashboardData()}
              disabled={loadingData}
              title="Refresh all data"
            >
              <RefreshCw size={13} className={loadingData ? "animate-spin" : ""} />
              {loadingData ? "Syncing…" : "Refresh"}
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW */}
        {/* ---------------------------------------------------------------- */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted, #806a58)" }}>
                  Total Projects
                </span>
                <div style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--dark, #302219)", marginTop: "8px" }}>
                  {stats.totalProjects}
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted, #806a58)", marginTop: "4px" }}>
                  Active portfolio items
                </div>
              </div>

              <div className="stat-card">
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted, #806a58)" }}>
                  Published Projects
                </span>
                <div style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.04em", color: "#166534", marginTop: "8px" }}>
                  {stats.publishedProjects}
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted, #806a58)", marginTop: "4px" }}>
                  Visible to the public
                </div>
              </div>

              <div className="stat-card">
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted, #806a58)" }}>
                  Draft Projects
                </span>
                <div style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--brown, #4b3528)", marginTop: "8px" }}>
                  {stats.draftProjects}
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted, #806a58)", marginTop: "4px" }}>
                  Unpublished work
                </div>
              </div>

              <div className="stat-card">
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted, #806a58)" }}>
                  Total Enquiries
                </span>
                <div style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--dark, #302219)", marginTop: "8px" }}>
                  {stats.totalEnquiries}
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted, #806a58)", marginTop: "4px" }}>
                  Client leads received
                </div>
              </div>

              <div className="stat-card" style={{ borderColor: stats.newEnquiries > 0 ? "rgba(180, 83, 9, 0.4)" : "rgba(75, 53, 40, 0.18)" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#b45309" }}>
                  New Enquiries
                </span>
                <div style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.04em", color: "#b45309", marginTop: "8px" }}>
                  {stats.newEnquiries}
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted, #806a58)", marginTop: "4px" }}>
                  Awaiting agency follow-up
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Enquiries */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", marginTop: "36px" }}>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
                  Recent Enquiries
                </h2>
                <p style={{ fontSize: "13px", color: "var(--muted, #806a58)", margin: "4px 0 0" }}>
                  Latest contact submissions from website visitors.
                </p>
              </div>

              <button
                className="admin-btn admin-btn-dark"
                onClick={() => setActiveTab("enquiries")}
              >
                View All Enquiries
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="admin-table-container">
              {enquiries.length === 0 ? (
                <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--muted, #806a58)" }}>
                  <Inbox size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                  <p style={{ margin: 0, fontSize: "14px" }}>No enquiries recorded yet.</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Budget</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.slice(0, 5).map((enq) => {
                      const clientName = enq.full_name || enq.name || "Anonymous"
                      const statusConfig =
                        ENQUIRY_STATUSES.find((s) => s.value === enq.status) || ENQUIRY_STATUSES[0]

                      return (
                        <tr key={enq.id}>
                          <td style={{ fontWeight: 600 }}>{clientName}</td>
                          <td style={{ color: "var(--muted, #806a58)" }}>{enq.company || "—"}</td>
                          <td>
                            <a
                              href={`mailto:${enq.email}`}
                              style={{ color: "var(--brown, #4b3528)", textDecoration: "underline" }}
                            >
                              {enq.email}
                            </a>
                          </td>
                          <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
                            {enq.budget || "—"}
                          </td>
                          <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--muted, #806a58)" }}>
                            {enq.created_at ? new Date(enq.created_at).toLocaleDateString() : "—"}
                          </td>
                          <td>
                            <span
                              className="admin-badge"
                              style={{
                                backgroundColor: statusConfig.bg,
                                color: statusConfig.color,
                                border: `1px solid ${statusConfig.border}`,
                              }}
                            >
                              {statusConfig.label}
                            </span>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <button
                              className="admin-btn admin-btn-outline"
                              style={{ padding: "5px 12px", fontSize: "10px" }}
                              onClick={() => {
                                setActiveTab("enquiries")
                                setExpandedEnquiryId(enq.id)
                              }}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* TAB 2: PROJECTS */}
        {/* ---------------------------------------------------------------- */}
        {activeTab === "projects" && (
          <div>
            {/* Top Toolbar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
                  Case Studies & Projects
                </h2>
                <p style={{ fontSize: "13px", color: "var(--muted, #806a58)", margin: "4px 0 0" }}>
                  Manage public portfolio items, case studies, and display positions.
                </p>
              </div>

              {!showProjectForm && (
                <button className="admin-btn admin-btn-dark" onClick={handleStartAddProject}>
                  <Plus size={14} />
                  Add Project
                </button>
              )}
            </div>

            {/* INLINE / EXPANDABLE PROJECT FORM */}
            {showProjectForm && (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(75, 53, 40, 0.2)",
                  borderRadius: "16px",
                  padding: "32px 28px",
                  marginBottom: "32px",
                  boxShadow: "0 10px 30px rgba(48, 34, 25, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(75, 53, 40, 0.12)",
                    paddingBottom: "18px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--brown, #4b3528)",
                        fontWeight: 600,
                      }}
                    >
                      {editingProjectId ? "Editing Project & Case Study" : "New Portfolio Project"}
                    </span>
                    <h3 style={{ fontSize: "20px", fontWeight: 600, margin: "4px 0 0" }}>
                      {editingProjectId ? `Edit: ${formTitle || "Project"}` : "Add Project Details"}
                    </h3>
                  </div>

                  <button
                    onClick={resetProjectForm}
                    style={{
                      background: "none",
                      border: "1px solid rgba(75, 53, 40, 0.2)",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--muted, #806a58)",
                    }}
                    title="Close form"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSaveProject}>
                  {/* General Project Fields */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "20px",
                    }}
                  >
                    {/* Title */}
                    <div>
                      <label className="admin-label">
                        Title <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input
                        className="admin-input"
                        required
                        placeholder="e.g. Lumora Beauty Brand System"
                        value={formTitle}
                        onChange={(e) => {
                          const val = e.target.value
                          setFormTitle(val)
                          if (!slugManuallyEdited) {
                            setFormSlug(slugify(val))
                          }
                        }}
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="admin-label">
                        Slug (URL identifier) <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input
                        className="admin-input"
                        required
                        placeholder="e.g. lumora-beauty"
                        value={formSlug}
                        onChange={(e) => {
                          setSlugManuallyEdited(true)
                          setFormSlug(slugify(e.target.value))
                        }}
                      />
                      <span style={{ fontSize: "11px", color: "var(--muted, #806a58)", marginTop: "4px", display: "block" }}>
                        Will resolve to /work/{formSlug || "slug"}
                      </span>
                    </div>

                    {/* Client Name */}
                    <div>
                      <label className="admin-label">Client Name</label>
                      <input
                        className="admin-input"
                        placeholder="e.g. Lumora Botanicals Ltd."
                        value={formClientName}
                        onChange={(e) => setFormClientName(e.target.value)}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="admin-label">Category</label>
                      <select
                        className="admin-select"
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="admin-label">Publication Status</label>
                      <select
                        className="admin-select"
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as ProjectStatus)}
                      >
                        <option value="draft">Draft (Hidden)</option>
                        <option value="published">Published (Visible on site)</option>
                      </select>
                    </div>

                    {/* Display Order */}
                    <div>
                      <label className="admin-label">Display Order (Sort index)</label>
                      <input
                        className="admin-input"
                        type="number"
                        value={formDisplayOrder}
                        onChange={(e) => setFormDisplayOrder(Number(e.target.value))}
                        placeholder="0"
                      />
                      <span style={{ fontSize: "11px", color: "var(--muted, #806a58)", marginTop: "4px", display: "block" }}>
                        Lower numbers appear first (e.g. 1, 2, 3...)
                      </span>
                    </div>
                  </div>

                  {/* Cover Image URL */}
                  <div style={{ marginTop: "20px" }}>
                    <label className="admin-label">Cover Image URL</label>
                    <input
                      className="admin-input"
                      type="url"
                      placeholder="https://images.unsplash.com/... or Supabase storage public URL"
                      value={formCoverImageUrl}
                      onChange={(e) => setFormCoverImageUrl(e.target.value)}
                    />
                    <span style={{ fontSize: "11px", color: "var(--muted, #806a58)", marginTop: "4px", display: "block" }}>
                      Note: Enter direct image URL or use Supabase Storage URL.
                    </span>
                    {formCoverImageUrl && (
                      <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "70px",
                            height: "50px",
                            borderRadius: "6px",
                            overflow: "hidden",
                            backgroundColor: "#eee",
                          }}
                        >
                          <img
                            src={formCoverImageUrl}
                            alt="Preview"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).style.display = "none"
                            }}
                          />
                        </div>
                        <span style={{ fontSize: "12px", color: "var(--muted, #806a58)" }}>
                          Cover Preview
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Short Description */}
                  <div style={{ marginTop: "20px" }}>
                    <label className="admin-label">Short Description</label>
                    <textarea
                      className="admin-textarea"
                      rows={3}
                      placeholder="Concise summary for project cards and previews..."
                      value={formShortDescription}
                      onChange={(e) => setFormShortDescription(e.target.value)}
                    />
                  </div>

                  {/* Featured Checkbox */}
                  <div style={{ marginTop: "18px" }}>
                    <label
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--dark, #302219)",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formFeatured}
                        onChange={(e) => setFormFeatured(e.target.checked)}
                        style={{ width: "16px", height: "16px", accentColor: "var(--dark, #302219)" }}
                      />
                      <span>Featured Project (Highlighted in priority hero sections)</span>
                    </label>
                  </div>

                  {/* CASE STUDY FIELDS (Shown when editing a project) */}
                  {editingProjectId && (
                    <div
                      style={{
                        marginTop: "32px",
                        paddingTop: "28px",
                        borderTop: "1px dashed rgba(75, 53, 40, 0.2)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                        <Sparkles size={16} style={{ color: "var(--brown, #4b3528)" }} />
                        <h4 style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>
                          Case Study Narrative Fields
                        </h4>
                        {loadingCaseStudy && (
                          <span style={{ fontSize: "11px", color: "var(--muted, #806a58)", display: "flex", alignItems: "center", gap: "6px" }}>
                            <Loader2 size={12} className="animate-spin" /> Loading case study…
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "12px", color: "var(--muted, #806a58)", margin: "0 0 20px" }}>
                        These sections populate the full-length case study page (/work/{formSlug}).
                      </p>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                          gap: "20px",
                        }}
                      >
                        <div>
                          <label className="admin-label">Client Introduction</label>
                          <textarea
                            className="admin-textarea"
                            rows={3}
                            placeholder="Background story of the client company..."
                            value={csClientIntro}
                            onChange={(e) => setCsClientIntro(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="admin-label">Business Challenge</label>
                          <textarea
                            className="admin-textarea"
                            rows={3}
                            placeholder="The obstacles or market shift they were facing..."
                            value={csBusinessChallenge}
                            onChange={(e) => setCsBusinessChallenge(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="admin-label">Objectives</label>
                          <textarea
                            className="admin-textarea"
                            rows={3}
                            placeholder="Target metrics, positioning goals, outcomes..."
                            value={csObjectives}
                            onChange={(e) => setCsObjectives(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="admin-label">Strategy</label>
                          <textarea
                            className="admin-textarea"
                            rows={3}
                            placeholder="Strategic approach and market angle devised..."
                            value={csStrategy}
                            onChange={(e) => setCsStrategy(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="admin-label">Creative Direction</label>
                          <textarea
                            className="admin-textarea"
                            rows={3}
                            placeholder="Visual language, aesthetic decisions, mood..."
                            value={csCreativeDirection}
                            onChange={(e) => setCsCreativeDirection(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="admin-label">Execution</label>
                          <textarea
                            className="admin-textarea"
                            rows={3}
                            placeholder="Deliverables rolled out, technology used..."
                            value={csExecution}
                            onChange={(e) => setCsExecution(e.target.value)}
                          />
                        </div>
                      </div>

                      <div style={{ marginTop: "20px" }}>
                        <label className="admin-label">Services Delivered (Comma-separated text)</label>
                        <input
                          className="admin-input"
                          placeholder="e.g. Brand Identity, Packaging Design, Custom Next.js Platform, Art Direction"
                          value={csServicesDelivered}
                          onChange={(e) => setCsServicesDelivered(e.target.value)}
                        />
                        <span style={{ fontSize: "11px", color: "var(--muted, #806a58)", marginTop: "4px", display: "block" }}>
                          Comma-separated values are parsed into an array on save.
                        </span>
                      </div>

                      <div style={{ marginTop: "20px" }}>
                        <label className="admin-label">Results & Impact</label>
                        <textarea
                          className="admin-textarea"
                          rows={3}
                          placeholder="Quantitative and qualitative results achieved..."
                          value={csResults}
                          onChange={(e) => setCsResults(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "12px",
                      marginTop: "32px",
                      paddingTop: "20px",
                      borderTop: "1px solid rgba(75, 53, 40, 0.12)",
                    }}
                  >
                    <button
                      type="button"
                      className="admin-btn admin-btn-outline"
                      onClick={resetProjectForm}
                      disabled={projectSaving}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="admin-btn admin-btn-dark"
                      disabled={projectSaving}
                    >
                      {projectSaving ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          Saving…
                        </>
                      ) : (
                        <>
                          {editingProjectId ? "Update Project" : "Publish Project"}
                          <ArrowRight size={13} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* PROJECTS TABLE */}
            <div className="admin-table-container">
              {projects.length === 0 ? (
                <div style={{ padding: "50px 20px", textAlign: "center", color: "var(--muted, #806a58)" }}>
                  <FolderKanban size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                  <p style={{ margin: 0, fontSize: "14px" }}>No projects configured yet.</p>
                  <button
                    className="admin-btn admin-btn-dark"
                    style={{ marginTop: "16px" }}
                    onClick={handleStartAddProject}
                  >
                    <Plus size={14} /> Add First Project
                  </button>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Featured</th>
                      <th>Order</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {project.cover_image ? (
                              <img
                                src={project.cover_image}
                                alt={project.title}
                                style={{
                                  width: "42px",
                                  height: "32px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                  backgroundColor: "#eee",
                                  flexShrink: 0,
                                }}
                                onError={(e) => {
                                  ;(e.target as HTMLImageElement).style.display = "none"
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "42px",
                                  height: "32px",
                                  borderRadius: "4px",
                                  backgroundColor: "rgba(75, 53, 40, 0.08)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "10px",
                                  fontFamily: "'DM Mono', monospace",
                                  color: "var(--muted, #806a58)",
                                }}
                              >
                                IMG
                              </div>
                            )}
                            <div>
                              <div style={{ fontWeight: 600 }}>{project.title}</div>
                              <div
                                style={{
                                  fontFamily: "'DM Mono', monospace",
                                  fontSize: "11px",
                                  color: "var(--muted, #806a58)",
                                }}
                              >
                                /{project.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "11px",
                              color: "var(--brown, #4b3528)",
                            }}
                          >
                            {project.category}
                          </span>
                        </td>
                        <td>
                          <span
                            className="admin-badge"
                            style={{
                              backgroundColor:
                                project.status === "published" ? "#dcfce7" : "rgba(75, 53, 40, 0.08)",
                              color: project.status === "published" ? "#166534" : "var(--muted, #806a58)",
                              border:
                                project.status === "published"
                                  ? "1px solid rgba(22, 101, 52, 0.25)"
                                  : "1px solid rgba(75, 53, 40, 0.15)",
                            }}
                          >
                            {project.status === "published" ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td>
                          {project.featured ? (
                            <span
                              className="admin-badge"
                              style={{
                                backgroundColor: "#fef3c7",
                                color: "#92400e",
                                border: "1px solid rgba(146, 64, 14, 0.25)",
                              }}
                            >
                              ★ Featured
                            </span>
                          ) : (
                            <span style={{ color: "var(--muted, #806a58)", fontSize: "12px" }}>—</span>
                          )}
                        </td>
                        <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
                          {project.display_order ?? 0}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <a
                              href={`/work/${project.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="admin-btn admin-btn-outline"
                              style={{ padding: "6px 10px" }}
                              title="Preview Live"
                            >
                              <Eye size={12} />
                            </a>

                            <button
                              className="admin-btn admin-btn-outline"
                              style={{ padding: "6px 12px" }}
                              onClick={() => handleStartEditProject(project)}
                              title="Edit project"
                            >
                              <Edit2 size={12} />
                              Edit
                            </button>

                            <button
                              className="admin-btn admin-btn-danger"
                              style={{ padding: "6px 10px" }}
                              onClick={() => handleDeleteProject(project)}
                              title="Delete project"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* TAB 3: ENQUIRIES */}
        {/* ---------------------------------------------------------------- */}
        {activeTab === "enquiries" && (
          <div>
            {/* Top Toolbar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
                  Client Enquiries & Leads
                </h2>
                <p style={{ fontSize: "13px", color: "var(--muted, #806a58)", margin: "4px 0 0" }}>
                  Filter, manage pipeline status, and keep internal notes on proposals.
                </p>
              </div>

              {/* Search Bar */}
              <div style={{ position: "relative", minWidth: "260px", maxWidth: "340px", width: "100%" }}>
                <Search
                  size={14}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted, #806a58)",
                  }}
                />
                <input
                  className="admin-input"
                  style={{ paddingLeft: "34px", paddingRight: enquirySearchQuery ? "32px" : "12px" }}
                  placeholder="Filter by name, email, company…"
                  value={enquirySearchQuery}
                  onChange={(e) => setEnquirySearchQuery(e.target.value)}
                />
                {enquirySearchQuery && (
                  <button
                    onClick={() => setEnquirySearchQuery("")}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "var(--muted, #806a58)",
                      cursor: "pointer",
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills for Status */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
              <button
                className={`admin-btn ${enquiryStatusFilter === "all" ? "admin-btn-dark" : "admin-btn-outline"}`}
                style={{ padding: "6px 14px", fontSize: "10px" }}
                onClick={() => setEnquiryStatusFilter("all")}
              >
                All ({enquiries.length})
              </button>
              {ENQUIRY_STATUSES.map((st) => {
                const count = enquiries.filter((e) => e.status === st.value).length
                const isActive = enquiryStatusFilter === st.value
                return (
                  <button
                    key={st.value}
                    className={`admin-btn ${isActive ? "admin-btn-dark" : "admin-btn-outline"}`}
                    style={{ padding: "6px 14px", fontSize: "10px" }}
                    onClick={() => setEnquiryStatusFilter(st.value)}
                  >
                    {st.label} ({count})
                  </button>
                )
              })}
            </div>

            {/* Enquiries Table */}
            <div className="admin-table-container">
              {filteredEnquiries.length === 0 ? (
                <div style={{ padding: "50px 20px", textAlign: "center", color: "var(--muted, #806a58)" }}>
                  <Inbox size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                  <p style={{ margin: 0, fontSize: "14px" }}>
                    {enquiries.length === 0 ? "No enquiries in database." : "No enquiries match the filter criteria."}
                  </p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: "24px" }} />
                      <th>Full Name</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Services</th>
                      <th>Budget</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map((enq) => {
                      const isExpanded = expandedEnquiryId === enq.id
                      const clientName = enq.full_name || enq.name || "Anonymous"
                      const currentStatus = enquiryStatusDrafts[enq.id] ?? enq.status ?? "new"
                      const currentNotes = enquiryNoteDrafts[enq.id] ?? enq.internal_notes ?? ""
                      const statusConfig =
                        ENQUIRY_STATUSES.find((s) => s.value === currentStatus) || ENQUIRY_STATUSES[0]
                      const isUpdating = enquiryUpdatingId === enq.id

                      return (
                        <React.Fragment key={enq.id}>
                          <tr
                            onClick={() => setExpandedEnquiryId(isExpanded ? null : enq.id)}
                            style={{
                              cursor: "pointer",
                              backgroundColor: isExpanded ? "#faf7f2" : undefined,
                            }}
                          >
                            <td style={{ textAlign: "center", color: "var(--muted, #806a58)" }}>
                              {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                            </td>
                            <td style={{ fontWeight: 600 }}>{clientName}</td>
                            <td style={{ color: "var(--muted, #806a58)" }}>{enq.company || "—"}</td>
                            <td>
                              <span style={{ color: "var(--brown, #4b3528)" }}>{enq.email}</span>
                            </td>
                            <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
                              {enq.phone || "—"}
                            </td>
                            <td style={{ fontSize: "12px", color: "var(--muted, #806a58)", maxWidth: "160px" }}>
                              {Array.isArray(enq.services)
                                ? enq.services.join(", ")
                                : enq.services || "—"}
                            </td>
                            <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
                              {enq.budget || "—"}
                            </td>
                            <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--muted, #806a58)" }}>
                              {enq.created_at ? new Date(enq.created_at).toLocaleDateString() : "—"}
                            </td>
                            <td>
                              <span
                                className="admin-badge"
                                style={{
                                  backgroundColor: statusConfig.bg,
                                  color: statusConfig.color,
                                  border: `1px solid ${statusConfig.border}`,
                                }}
                              >
                                {statusConfig.label}
                              </span>
                            </td>
                          </tr>

                          {/* EXPANDED DETAILS ACCORDION ROW */}
                          {isExpanded && (
                            <tr>
                              <td colSpan={9} style={{ padding: 0, backgroundColor: "#faf7f2" }}>
                                <div
                                  style={{
                                    padding: "24px 28px",
                                    borderTop: "1px dashed rgba(75, 53, 40, 0.15)",
                                    borderBottom: "1px solid rgba(75, 53, 40, 0.15)",
                                  }}
                                >
                                  {/* Grid of contact information */}
                                  <div
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                      gap: "18px",
                                      marginBottom: "20px",
                                      paddingBottom: "18px",
                                      borderBottom: "1px solid rgba(75, 53, 40, 0.1)",
                                    }}
                                  >
                                    <div>
                                      <span className="admin-label">Email Address</span>
                                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                                        <Mail size={13} style={{ color: "var(--muted, #806a58)" }} />
                                        <a
                                          href={`mailto:${enq.email}`}
                                          style={{ color: "var(--brown, #4b3528)", textDecoration: "underline" }}
                                        >
                                          {enq.email}
                                        </a>
                                      </div>
                                    </div>

                                    <div>
                                      <span className="admin-label">Phone</span>
                                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                                        <Phone size={13} style={{ color: "var(--muted, #806a58)" }} />
                                        {enq.phone ? (
                                          <a href={`tel:${enq.phone}`} style={{ color: "var(--brown, #4b3528)" }}>
                                            {enq.phone}
                                          </a>
                                        ) : (
                                          <span style={{ color: "var(--muted, #806a58)" }}>Not provided</span>
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <span className="admin-label">Company / Brand</span>
                                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                                        <Building size={13} style={{ color: "var(--muted, #806a58)" }} />
                                        <span>{enq.company || "Not provided"}</span>
                                      </div>
                                    </div>

                                    <div>
                                      <span className="admin-label">Budget</span>
                                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                                        <DollarSign size={13} style={{ color: "var(--muted, #806a58)" }} />
                                        <span>{enq.budget || "Flexible / Not specified"}</span>
                                      </div>
                                    </div>

                                    <div>
                                      <span className="admin-label">Submission Date</span>
                                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                                        <Calendar size={13} style={{ color: "var(--muted, #806a58)" }} />
                                        <span>
                                          {enq.created_at
                                            ? new Date(enq.created_at).toLocaleString()
                                            : "Unknown"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Client Project Message */}
                                  <div style={{ marginBottom: "22px" }}>
                                    <span className="admin-label">Client Message / Project Brief</span>
                                    <div
                                      style={{
                                        backgroundColor: "#ffffff",
                                        padding: "16px",
                                        borderRadius: "8px",
                                        border: "1px solid rgba(75, 53, 40, 0.15)",
                                        fontSize: "13px",
                                        lineHeight: 1.6,
                                        whiteSpace: "pre-wrap",
                                        color: "var(--dark, #302219)",
                                      }}
                                    >
                                      {enq.message || "No project description provided."}
                                    </div>
                                  </div>

                                  {/* Status dropdown & Internal Notes */}
                                  <div
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "220px 1fr",
                                      gap: "20px",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <div>
                                      <label className="admin-label">Pipeline Status</label>
                                      <select
                                        className="admin-select"
                                        value={currentStatus}
                                        onChange={(e) => {
                                          const val = e.target.value as EnquiryStatus
                                          setEnquiryStatusDrafts((prev) => ({ ...prev, [enq.id]: val }))
                                        }}
                                      >
                                        {ENQUIRY_STATUSES.map((st) => (
                                          <option key={st.value} value={st.value}>
                                            {st.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    <div>
                                      <label className="admin-label">Internal Agency Notes</label>
                                      <textarea
                                        className="admin-textarea"
                                        rows={3}
                                        placeholder="Add private agency notes, call logs, next steps or proposal values..."
                                        value={currentNotes}
                                        onChange={(e) => {
                                          const val = e.target.value
                                          setEnquiryNoteDrafts((prev) => ({ ...prev, [enq.id]: val }))
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* Save & Delete Buttons */}
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      marginTop: "20px",
                                      paddingTop: "16px",
                                      borderTop: "1px solid rgba(75, 53, 40, 0.1)",
                                    }}
                                  >
                                    <button
                                      className="admin-btn admin-btn-danger"
                                      disabled={isUpdating}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteEnquiry(enq.id, clientName)
                                      }}
                                    >
                                      <Trash2 size={13} />
                                      Delete Enquiry
                                    </button>

                                    <button
                                      className="admin-btn admin-btn-dark"
                                      disabled={isUpdating}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleSaveEnquiry(enq.id)
                                      }}
                                    >
                                      {isUpdating ? (
                                        <>
                                          <Loader2 size={13} className="animate-spin" />
                                          Saving…
                                        </>
                                      ) : (
                                        <>
                                          <CheckCircle2 size={13} />
                                          Save Changes
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
