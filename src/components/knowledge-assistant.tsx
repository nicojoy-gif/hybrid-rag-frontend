"use client";

import { useMemo, useState } from "react";
import { askQuestion } from "@/src/lib/api";
import { ChatWorkspace } from "@/src/components/chat-workspace";
import { Icon } from "@/src/components/icons";
import { Sidebar } from "@/src/components/sidebar";
import type { ChatMessage, Conversation, View } from "@/src/components/types";
import {
  
  KnowledgeBasePage,
  
} from "@/src/components/workspace-pages";
import { SettingsPage } from "./settings";
import { HistoryPage } from "./history-page";

const viewTitles: Record<View, string> = {
  chat: "Ask Knowbase",
  knowledge: "Knowledge base",
  history: "Conversation history",
  settings: "Settings",
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function conversationTitle(question: string) {
  const firstLine = question.split(/\r?\n/)[0].trim();
  return firstLine.length > 58 ? `${firstLine.slice(0, 55)}…` : firstLine;
}

export function KnowledgeAssistant() {
  const [activeView, setActiveView] = useState<View>("chat");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(
    null,
  );
  const [loadingConversationIds, setLoadingConversationIds] = useState<string[]>(
    [],
  );
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const currentConversation = useMemo(
    () => conversations.find((item) => item.id === currentConversationId) ?? null,
    [conversations, currentConversationId],
  );
  const isLoading =
    currentConversationId !== null &&
    loadingConversationIds.includes(currentConversationId);

  const startNewChat = () => {
    setCurrentConversationId(null);
    setActiveView("chat");
    setMobileSidebarOpen(false);
  };

  const openConversation = (id: string) => {
    setCurrentConversationId(id);
    setActiveView("chat");
    setMobileSidebarOpen(false);
  };

  const sendQuestion = async (question: string) => {
    const conversationId = currentConversationId ?? createId();
    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: question,
    };

    setCurrentConversationId(conversationId);
    setActiveView("chat");
    setLoadingConversationIds((ids) =>
      ids.includes(conversationId) ? ids : [...ids, conversationId],
    );
    setConversations((existing) => {
      const current = existing.find((item) => item.id === conversationId);
      if (current) {
        return existing.map((item) =>
          item.id === conversationId
            ? {
                ...item,
                updatedAt: Date.now(),
                messages: [...item.messages, userMessage],
              }
            : item,
        );
      }

      return [
        {
          id: conversationId,
          title: conversationTitle(question),
          updatedAt: Date.now(),
          messages: [userMessage],
        },
        ...existing,
      ];
    });

    try {
      const response = await askQuestion(question);
      const answerMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: response.answer,
        sources: response.sources,
      };
      setConversations((existing) =>
        existing.map((item) =>
          item.id === conversationId
            ? {
                ...item,
                updatedAt: Date.now(),
                messages: [...item.messages, answerMessage],
              }
            : item,
        ),
      );
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while requesting an answer.",
        isError: true,
      };
      setConversations((existing) =>
        existing.map((item) =>
          item.id === conversationId
            ? {
                ...item,
                updatedAt: Date.now(),
                messages: [...item.messages, errorMessage],
              }
            : item,
        ),
      );
    } finally {
      setLoadingConversationIds((ids) =>
        ids.filter((id) => id !== conversationId),
      );
    }
  };

  return (
    <div className="app-shell flex bg-[var(--background)]">
      <Sidebar
        activeView={activeView}
        conversations={conversations}
        currentConversationId={currentConversationId}
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        onNavigate={setActiveView}
        onNewChat={startNewChat}
        onSelectConversation={openConversation}
      />
      <main className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-[var(--border)] bg-[#fbfcfa] px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e7e9e4] bg-white text-[#666e66] hover:bg-[#f5f7f4] md:hidden"
              aria-label="Open navigation"
              aria-expanded={mobileSidebarOpen}
            >
              <Icon name="menu" className="h-[18px] w-[18px]" />
            </button>
            <span className="truncate text-[12px] font-medium text-[#555d55]">
              {viewTitles[activeView]}
            </span>
          </div>
         
        </header>

        {activeView === "chat" && (
          <ChatWorkspace
            conversation={currentConversation}
            isLoading={isLoading}
            onSend={sendQuestion}
          />
        )}
        {activeView === "knowledge" && <KnowledgeBasePage />}
        {activeView === "history" && (
          <HistoryPage
            conversations={conversations}
            onOpenConversation={openConversation}
            onStartChat={startNewChat}
          />
        )}
        {activeView === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}
