# MotionDeck — Route Map

## Marketing (public, no auth)
| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/pricing` | Full pricing comparison |
| `/templates` | Template gallery |
| `/help` | Help Center |

## Auth
| Route | Purpose |
|---|---|
| `/auth/login` | Login |
| `/auth/signup` | Sign up (progressive email→password) |
| `/auth/reset-password` | Password reset request |
| `/auth/onboarding` | Post-signup quiz |

## Import (full-screen, no dashboard chrome)
| Route | Purpose |
|---|---|
| `/import` | Source Selection → AI Parsing → Style Selection |

## Dashboard (sidebar + topbar shell)
| Route | Purpose |
|---|---|
| `/dashboard` | Home — deck grid |
| `/search` | Search experience |
| `/shared` | Shared with me |
| `/activity` | Activity feed |
| `/trash` | Trash |
| `/notifications` | Notifications center |
| `/analytics` | Analytics dashboard |
| `/billing` | Billing |
| `/workspace/[workspaceId]/folders/[folderId]` | Folder detail |
| `/settings` | Profile (default) |
| `/settings/security` | Security |
| `/settings/notifications` | Notification prefs |
| `/settings/workspace` | Workspace general |
| `/settings/members` | Members & roles |
| `/settings/branding` | Branding (live preview) |
| `/settings/integrations` | Connected apps + API keys |
| `/settings/data` | Data & privacy |

## Editor (full-bleed, no dashboard chrome)
| Route | Purpose |
|---|---|
| `/editor/[deckId]` | Scene Navigator + Canvas + Design Panel |

## Present (full-bleed, dark)
| Route | Purpose |
|---|---|
| `/present/[deckId]` | Presenter view |
| `/present/[deckId]/audience` | Audience view (second display) |

## Share (public, no auth)
| Route | Purpose |
|---|---|
| `/s/[shareToken]` | Public deck viewer — also the mobile deck viewer |

## Global
| Route | Purpose |
|---|---|
| `not-found` | 404 |
| `global-error` | 500 / runtime error boundary |
