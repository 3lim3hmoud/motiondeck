/**
 * Single source of truth for every internal route. Import ROUTES instead of
 * writing path strings inline — renaming a route becomes a one-line change
 * instead of a repo-wide find/replace.
 */
export const ROUTES = {
  home: "/",
  pricing: "/pricing",
  help: "/help",

  login: "/login",
  signup: "/signup",
  resetPassword: "/reset-password",
  onboarding: "/onboarding",

  dashboard: "/dashboard",
  workspace: (workspaceId: string) => `/workspace/${workspaceId}`,
  folder: (workspaceId: string, folderId: string) =>
    `/workspace/${workspaceId}/folders/${folderId}`,
  deckImport: (workspaceId: string) => `/workspace/${workspaceId}/import`,

  editor: (deckId: string) => `/editor/${deckId}`,
  present: (deckId: string) => `/present/${deckId}`,
  share: (shareToken: string) => `/s/${shareToken}`,

  analytics: (deckId?: string) => (deckId ? `/analytics?deck=${deckId}` : "/analytics"),
  settings: "/settings",
  settingsBranding: "/settings/branding",
  billing: "/billing",
  profile: "/settings/profile",
  notifications: "/notifications",
} as const;
