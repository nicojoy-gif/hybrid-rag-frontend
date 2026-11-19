"use client";

import { Icon, type IconName } from "@/src/components/icons";
import type { Conversation, View } from "@/src/components/types";

interface SidebarProps {
  activeView: View;
  conversations: Conversation[];
  currentConversationId: string | null;
  mobileOpen: boolean;
  onClose: () => void;
  onNavigate: (view: View) => void;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
}

const navigation: { view: View; label: string; icon: IconName }[] = [
  { view: "knowledge", label: "Knowledge base", icon: "book" },
  { view: "history", label: "History", icon: "history" },
];

function SidebarContent({
  activeView,
  conversations,
  currentConversationId,
  onClose,
  onNavigate,
  onNewChat,
  onSelectConversation,
}: Omit<SidebarProps, "mobileOpen">) {
  const recentConversations = [...conversations]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 5);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[76px] items-center justify-between border-b border-[var(--border)] px-5">
        <button
          type="button"
          onClick={() => {
            onNavigate("chat");
            onClose();
          }}
          className="flex items-center gap-3 rounded-lg text-left"
          aria-label="Knowbase AI home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e6ede7] text-[var(--accent-dark)]">
            <Icon name="sparkles" className="h-[19px] w-[19px]" />
          </span>
          <span>
            <span className="block text-[15px] font-semibold tracking-[-0.03em] text-[#252a25]">
              Knowbase <span className="font-medium text-[#68736a]">AI</span>
            </span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.13em] text-[#929890]">
              Company workspace
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-[#7b817a] hover:bg-[#f1f3f0] md:hidden"
          aria-label="Close navigation"
        >
          <Icon name="close" className="h-5 w-5" />
        </button>
      </div>

      <div className="px-3 pt-5">
        <button
          type="button"
          onClick={onNewChat}
          className="flex h-10 w-full items-center gap-2.5 rounded-lg bg-[var(--accent)] px-3.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[var(--accent-dark)]"
        >
          <Icon name="plus" className="h-[17px] w-[17px]" />
          New chat
          <span className="ml-auto rounded border border-white/20 px-1.5 py-0.5 text-[10px] font-medium text-white/75">
            N
          </span>
        </button>
      </div>

      <nav className="space-y-1 px-3 pt-5" aria-label="Main navigation">
        {navigation.map((item) => {
          const active = activeView === item.view;
          return (
            <button
              key={item.view}
              type="button"
              onClick={() => {
                onNavigate(item.view);
                onClose();
              }}
              aria-current={active ? "page" : undefined}
              className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium transition-colors ${
                active
                  ? "bg-[#edf2ed] text-[#3d5d45]"
                  : "text-[#686f68] hover:bg-[#f0f2ef] hover:text-[#313731]"
              }`}
            >
              <Icon name={item.icon} className="h-[17px] w-[17px]" />
              {item.label}
              {item.view === "history" && conversations.length > 0 && (
                <span className="ml-auto text-[11px] text-[#9a9f98]">
                  {conversations.length}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mx-5 mt-7 border-t border-[var(--border)]" />
      <div className="flex items-center justify-between px-5 pb-2 pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#989e96]">
          Recent conversations
        </p>
        {conversations.length > 5 && (
          <button
            type="button"
            onClick={() => {
              onNavigate("history");
              onClose();
            }}
            className="text-[11px] font-medium text-[#6e796f] hover:text-[#354b39]"
          >
            View all
          </button>
        )}
      </div>
      <div className="sidebar-scroll min-h-0 flex-1 overflow-y-auto px-3">
        {recentConversations.length === 0 ? (
          <p className="px-2 py-2 text-[12px] leading-5 text-[#a0a59e]">
            Your conversations will appear here.
          </p>
        ) : (
          <div className="space-y-1">
            {recentConversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => {
                  onSelectConversation(conversation.id);
                  onClose();
                }}
                aria-current={
                  currentConversationId === conversation.id ? "page" : undefined
                }
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[12px] transition-colors ${
                  currentConversationId === conversation.id
                    ? "bg-[#f0f2ef] text-[#3b473d]"
                    : "text-[#737970] hover:bg-[#f0f2ef] hover:text-[#343a34]"
                }`}
              >
                <Icon name="message" className="h-4 w-4 shrink-0 text-[#9aa098]" />
                <span className="truncate">{conversation.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[var(--border)] px-4 py-4">
        <div className="flex items-center gap-3 rounded-lg px-1 py-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e6ebe7] text-[11px] font-semibold text-[#526455]">
            AC
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-[#383d38]">
              Acme Company
            </p>
            <p className="mt-0.5 text-[10px] text-[#929890]">Internal workspace</p>
          </div>
          <span className="h-2 w-2 rounded-full bg-[#75a27d]" aria-label="Workspace active" />
        </div>
      </div>
    </div>
  );
}

export function Sidebar(props: SidebarProps) {
  return (
    <>
      <aside className="hidden h-screen w-[254px] shrink-0 border-r border-[var(--border)] bg-[#fbfcfa] md:block">
        <SidebarContent {...props} />
      </aside>
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          props.mobileOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!props.mobileOpen}
        inert={!props.mobileOpen}
      >
        <button
          type="button"
          onClick={props.onClose}
          className={`absolute inset-0 bg-[#1f261f]/30 transition-opacity ${
            props.mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close navigation"
          tabIndex={props.mobileOpen ? 0 : -1}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-[min(84vw,300px)] border-r border-[var(--border)] bg-[#fbfcfa] shadow-xl transition-transform ${
            props.mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent {...props} />
        </aside>
      </div>
    </>
  );
}
