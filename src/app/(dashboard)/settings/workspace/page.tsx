import { requireWorkspaceContext } from "@/server/workspace/context";
import { WorkspaceGeneralSettingsView } from "@/features/settings/components/workspace-general-settings-view";

export default async function WorkspaceGeneralSettingsPage() {
  const ctx = await requireWorkspaceContext();
  return <WorkspaceGeneralSettingsView initialName={ctx.workspaceName} slug={ctx.workspaceSlug} />;
}
