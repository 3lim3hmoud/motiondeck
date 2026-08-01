"use client";

import { use, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { EditorTopbar } from "@/features/editor/components/editor-topbar";
import { SceneNavigator } from "@/features/editor/components/scene-navigator";
import { Canvas } from "@/features/editor/components/canvas";
import { DesignPanel } from "@/features/editor/components/design-panel";
import { EditorBottomBar } from "@/features/editor/components/bottom-bar";
import { SpeakerNotesDrawer } from "@/features/editor/components/speaker-notes-drawer";
import { DesktopOnlyNotice } from "@/features/editor/components/desktop-only-notice";

export default function EditorPage({ params }: { params: Promise<{ deckId: string }> }) {
  const { deckId } = use(params);
  const [activeScene, setActiveScene] = useState("s3");
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <>
      <DesktopOnlyNotice deckId={deckId} />

      <div className="hidden sm:flex sm:h-full sm:flex-col">
        <EditorTopbar deckId={deckId} title="Our Approach — Q3" />

        <div className="min-h-0 flex-1">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={16} minSize={12} maxSize={24}>
              <SceneNavigator activeId={activeScene} onSelect={setActiveScene} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60}>
              <Canvas />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={24} minSize={18} maxSize={32}>
              <DesignPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        <SpeakerNotesDrawer open={notesOpen} />
        <EditorBottomBar notesOpen={notesOpen} onToggleNotes={() => setNotesOpen((v) => !v)} />
      </div>
    </>
  );
}
