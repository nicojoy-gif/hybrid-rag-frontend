import { useMemo } from "react";
import { PageHeading } from "./page-heading";
import { Conversation } from "./types";
import { Icon } from "./icons";

export function HistoryPage({
  conversations,
  onOpenConversation,
  onStartChat,
}: {
  conversations: Conversation[];
  onOpenConversation: (id: string) => void;
  onStartChat: () => void;
}) {
  const orderedConversations = useMemo(
    () => [...conversations].sort((a, b) => b.updatedAt - a.updatedAt),
    [conversations],
  );

  return (
    <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[850px]">
        <PageHeading
          eyebrow="Your workspace"
          title="Conversation history"
          description="Pick up where you left off. Your conversations are saved in this browser session."
          action={
            <button
              type="button"
              onClick={onStartChat}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#e1e5de] bg-white px-4 text-[12px] font-semibold text-[#475247] transition-colors hover:bg-[#f9fbf8]"
            >
              <Icon name="plus" className="h-4 w-4" />
              New chat
            </button>
          }
        />
        <section className="mt-8 overflow-hidden rounded-2xl border border-[#e4e8e1] bg-white">
          {orderedConversations.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf2ed] text-[#607763]">
                <Icon name="history" className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-[14px] font-semibold text-[#414741]">
                No conversations yet
              </h2>
              <p className="mt-1 max-w-[320px] text-[12px] leading-5 text-[#8b928a]">
                Start a chat to ask questions about your company documents.
              </p>
              <button
                type="button"
                onClick={onStartChat}
                className="mt-5 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-[var(--accent-dark)]"
              >
                Start a conversation
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#eff0ed]">
              {orderedConversations.map((conversation) => (
                <li key={conversation.id}>
                  <button
                    type="button"
                    onClick={() => onOpenConversation(conversation.id)}
                    className="group flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-[#fbfcfa] sm:px-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e8ebe6] bg-[#fafbf9] text-[#7d887d]">
                      <Icon name="message" className="h-[17px] w-[17px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-semibold text-[#444a44]">
                        {conversation.title}
                      </span>
                      <span className="mt-1 block text-[10px] text-[#969c95]">
                        {conversation.messages.length} messages
                        <span className="px-1.5">·</span>
                        {new Date(conversation.updatedAt).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </span>
                    <Icon
                      name="chevron"
                      className="h-4 w-4 shrink-0 text-[#a6aba4] transition-transform group-hover:translate-x-0.5 group-hover:text-[#687468]"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}