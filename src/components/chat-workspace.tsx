"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Icon } from "@/src/components/icons";
import type { ChatMessage, Conversation } from "@/src/components/types";

const suggestions = [
  "How does our expense reimbursement policy work?",
  "What is our process for requesting time off?",
  "Summarize the latest product launch guidelines",
];
const emptyMessages: ChatMessage[] = [];

interface ChatWorkspaceProps {
  conversation: Conversation | null;
  isLoading: boolean;
  onSend: (question: string) => void;
}

function AnswerMessage({ message }: { message: ChatMessage }) {
  const [sourcesOpen, setSourcesOpen] = useState(false);

  if (message.isError) {
    return (
      <div
        role="alert"
        className="mt-4 flex gap-3 rounded-xl border border-[#f0d7d0] bg-[#fff9f7] p-4 text-[13px] leading-6 text-[#8b4e3f]"
      >
        <Icon name="alert" className="mt-0.5 h-[18px] w-[18px] shrink-0" />
        <div>
          <p className="font-semibold">We couldn&apos;t reach the knowledge base</p>
          <p className="mt-0.5 text-[#99685e]">
            {message.content} Check that the FastAPI service is running, then try
            again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-1">
      <div className="space-y-3 text-[14px] leading-[1.8] text-[#424842]">
        {message.content.split(/\n{2,}/).map((paragraph, index) => (
          <p key={`${message.id}-${index}`} className="whitespace-pre-wrap">
            {paragraph}
          </p>
        ))}
      </div>
      
{message.sources?.map((source, index) => (
  <li
    key={`${message.id}-${source.document}-${source.chunk_index}-${index}`}
  >
    <a
      href={`${process.env.NEXT_PUBLIC_API_URL}/documents/${encodeURIComponent(source.document)}/view`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#e7eae5] bg-[#fbfcfa] px-3 py-2.5 transition-colors hover:border-[#cbd8cc] hover:bg-[#f3f7f2]"
      aria-label={`Open ${source.document}, chunk ${source.chunk_index}`}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#e5e8e2] bg-white text-[#7a857a]">
          <Icon name="file" className="h-4 w-4" />
        </span>
        <span className="truncate text-[12px] font-medium text-[#424941]">
          {source.document}
        </span>
      </span>

      <span className="rounded-md bg-[#f0f2ef] px-2 py-1 text-[10px] font-medium text-[#737b72]">
        Chunk {source.chunk_index}
      </span>
    </a>
  </li>
))}

    </div>
  );
}

export function ChatWorkspace({
  conversation,
  isLoading,
  onSend,
}: ChatWorkspaceProps) {
  const [question, setQuestion] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const messages = conversation?.messages ?? emptyMessages;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const submit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setQuestion("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(question);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit(question);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="chat-scroll flex-1 overflow-y-auto px-4 sm:px-7">
        <div className="mx-auto flex min-h-full w-full max-w-[790px] flex-col">
          {messages.length === 0 ? (
            <section className="flex flex-1 flex-col justify-center pb-10 pt-14 sm:pt-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[17px] border border-[#dce5dc] bg-[#edf3ee] text-[#507255]">
                <Icon name="sparkles" className="h-6 w-6" />
              </div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#829083]">
                Your company knowledge, at hand
              </p>
              <h1 className="max-w-[550px] text-[32px] font-semibold leading-[1.18] tracking-[-0.045em] text-[#282e28] sm:text-[42px]">
                What can we help you find?
              </h1>
              <p className="mt-4 max-w-[510px] text-[14px] leading-6 text-[#777e76] sm:text-[15px]">
                Ask a question about your team&apos;s documents, policies, and
                processes. Every answer is grounded in your knowledge base.
              </p>
              <div className="mt-9">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#939a92]">
                  Try asking
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {suggestions.map((suggestion) => (
                    <button
                      type="button"
                      key={suggestion}
                      onClick={() => submit(suggestion)}
                      disabled={isLoading}
                      className="group flex min-h-[56px] items-center justify-between gap-3 rounded-xl border border-[#e5e8e2] bg-white px-4 py-3 text-left text-[12px] leading-5 text-[#555d55] transition-colors hover:border-[#cbd8cc] hover:bg-[#fcfdfb] disabled:opacity-60"
                    >
                      <span>{suggestion}</span>
                      <Icon
                        name="arrow"
                        className="h-4 w-4 shrink-0 text-[#9ba39a] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <div className="space-y-8 pb-8 pt-8 sm:pt-10">
              {messages.map((message) =>
                message.role === "user" ? (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-[88%] rounded-2xl rounded-br-md bg-[#edf1ed] px-4 py-3 text-[14px] leading-6 text-[#343c35] sm:max-w-[76%]">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <article key={message.id} className="flex gap-3.5 sm:gap-4">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] bg-[#e8efe9] text-[#56725a]">
                      <Icon name="sparkles" className="h-[17px] w-[17px]" />
                    </div>
                    <div className="min-w-0 flex-1 pt-1">
                      {!message.isError && (
                        <p className="mb-2 text-[12px] font-semibold text-[#444c44]">
                          Knowbase
                        </p>
                      )}
                      <AnswerMessage message={message} />
                    </div>
                  </article>
                ),
              )}
              {isLoading && (
                <div className="flex gap-3.5" role="status" aria-live="polite">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] bg-[#e8efe9] text-[#56725a]">
                    <Icon name="sparkles" className="h-[17px] w-[17px]" />
                  </div>
                  <div className="pt-1">
                    <p className="mb-2 text-[12px] font-semibold text-[#444c44]">
                      Knowbase is searching
                    </p>
                    <div className="flex items-center gap-1.5 py-2">
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#718674]" />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#718674]" />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#718674]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 px-4 pb-4 pt-3 sm:px-7 sm:pb-6">
        <div className="mx-auto max-w-[790px]">
          <form
            onSubmit={handleSubmit}
            className="soft-shadow rounded-2xl border border-[#e2e6df] bg-white p-2"
          >
            <label htmlFor="question" className="sr-only">
              Ask a question about your company knowledge
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your company..."
              rows={2}
              maxLength={4000}
              className="max-h-36 min-h-[52px] w-full resize-none bg-transparent px-3 pt-2.5 text-[14px] leading-6 text-[#333a33] outline-none placeholder:text-[#a0a59e] focus-visible:ring-0"
            />
            <div className="flex items-center justify-between px-1 pb-0.5">
              <span className="flex items-center gap-1.5 px-2 text-[10px] text-[#929990]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#81a286]" />
                Answers grounded in your documents
              </span>
              <button
                type="submit"
                disabled={!question.trim() || isLoading}
                aria-label={isLoading ? "Waiting for answer" : "Send question"}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-white transition-colors hover:bg-[var(--accent-dark)] disabled:bg-[#dfe4de] disabled:text-[#a2aaa1]"
              >
                <Icon name="send" className="h-[17px] w-[17px]" />
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-[10px] text-[#a0a59e]">
            Knowbase can make mistakes. Verify important information with its source.
          </p>
        </div>
      </div>
    </div>
  );
}
