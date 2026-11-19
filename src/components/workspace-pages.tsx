"use client";

import { Icon } from "@/src/components/icons";
import {
  getDocuments,
  uploadDocument,
  type KnowledgeDocument as ApiKnowledgeDocument,
} from "@/src/lib/api";
import { PageHeading } from "./page-heading";
import { useEffect, useMemo, useRef, useState } from "react";
type DocumentStatus = "Indexed" | "Processing";
type DocumentType = "PDF" | "DOCX" | "TXT";

interface KnowledgeDocument extends ApiKnowledgeDocument {
  status: DocumentStatus;
  updated: string;
}


export function KnowledgeBasePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
const [uploadMessage, setUploadMessage] = useState("");
const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  getDocuments()
    .then(({ documents }) => {
      setDocuments(
        documents.map((document) => ({
          ...document,
          status: "Indexed",
          updated: "Available",
        }))
      );
    })
    .catch((error) => {
      setUploadMessage(error.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
}, []);
  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return documents;
    return documents.filter((document) =>
      document.name.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

const refreshDocuments = async () => {
  try {
    const result = await getDocuments();

    setDocuments(
      result.documents.map((document) => ({
        ...document,
        status: "Indexed",
        updated: "Available",
      }))
    );
  } catch (error) {
    setUploadMessage(
      error instanceof Error ? error.message : "Could not refresh documents."
    );
  }
};
const onFilesSelected = async (files: FileList | null) => {
  if (!files || files.length === 0) return;

  setIsUploading(true);
  setUploadMessage("");

  try {
    for (const file of Array.from(files)) {
      await uploadDocument(file);
    }

    setUploadMessage("Documents uploaded successfully.");
    setSelectedFiles([]);
    await refreshDocuments();
  } catch (error) {
    setUploadMessage(
      error instanceof Error ? error.message : "Upload failed."
    );
  } finally {
    setIsUploading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }
};


useEffect(() => {
  refreshDocuments().finally(() => setIsLoading(false));
}, []);
  return (
    <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1040px]">
        <PageHeading
          eyebrow="Workspace"
          title="Knowledge base"
          description="Browse the documents that power grounded answers across your workspace."
          action={
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--accent)] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
            >
              <Icon name="plus" className="h-4 w-4" />
              Add documents
            </button>
          }
        />

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt,application/pdf,text/plain"
          onChange={(event) => onFilesSelected(event.currentTarget.files)}
          className="sr-only"
          aria-label="Choose PDF, DOCX, or TXT documents"
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[#e6e9e3] bg-white px-4 py-4">
            <p className="text-[11px] font-medium text-[#899087]">Documents</p>
            <p className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-[#303730]">
              {documents.length}
            </p>
          </div>
          <div className="rounded-xl border border-[#e6e9e3] bg-white px-4 py-4">
            <p className="text-[11px] font-medium text-[#899087]">Ready to search</p>
            <p className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-[#303730]">
              {documents.filter((document) => document.status === "Indexed").length}
            </p>
          </div>
          <div className="rounded-xl border border-[#e6e9e3] bg-white px-4 py-4">
            <p className="text-[11px] font-medium text-[#899087]">File types</p>
            <p className="mt-2 text-[13px] font-semibold text-[#414941]">
              PDF <span className="px-1 text-[#b8bdb6]">·</span> DOCX{" "}
              <span className="px-1 text-[#b8bdb6]">·</span> TXT
            </p>
          </div>
        </div>

        <section className="mt-7 rounded-2xl border border-[#e4e8e1] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eceee9] px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-[13px] font-semibold text-[#353b35]">
                All documents
              </h2>
              <p className="mt-1 text-[11px] text-[#8c938b]">
                {filteredDocuments.length} documents in this workspace
              </p>
            </div>
            <label className="flex h-9 w-full items-center gap-2 rounded-lg border border-[#e6e9e3] bg-[#fcfcfb] px-3 sm:w-[230px]">
              <Icon name="search" className="h-4 w-4 shrink-0 text-[#9ba198]" />
              <span className="sr-only">Search documents</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search documents"
                className="min-w-0 flex-1 bg-transparent text-[12px] text-[#454b45] outline-none placeholder:text-[#a3a8a1]"
              />
            </label>
          </div>

          <div className="hidden grid-cols-[minmax(0,1fr)_100px_125px_100px] gap-3 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#969d95] sm:grid">
            <span>Document</span>
            <span>Type</span>
            <span>Status</span>
            <span>Updated</span>
          </div>
          <div className="divide-y divide-[#eff0ed]">
            {filteredDocuments.map((document) => (
              <div
                key={document.name}
                className="grid gap-3 px-4 py-3.5 sm:grid-cols-[minmax(0,1fr)_100px_125px_100px] sm:items-center sm:px-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e9ebe7] bg-[#fafbf9] text-[#7d887d]">
                    <Icon name="file" className="h-[17px] w-[17px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium text-[#424841]">
                      {document.name}
                    </p>
                    <p className="mt-1 text-[10px] text-[#9a9f98]">
                      {document.size}
                    </p>
                  </div>
                  <span className="ml-auto text-[10px] text-[#9a9f98] sm:hidden">
                    {document.updated}
                  </span>
                </div>
                <span className="hidden text-[11px] text-[#70786f] sm:block">
                  {document.type}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-[#70786f]">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      document.status === "Indexed"
                        ? "bg-[#7b9b7e]"
                        : "bg-[#c89f5b]"
                    }`}
                  />
                  {document.status}
                </span>
                <span className="hidden text-[11px] text-[#858c83] sm:block">
                  {document.updated}
                </span>
                <span className="text-[10px] text-[#989e96] sm:hidden">
                  {document.type}
                </span>
              </div>
            ))}
            {filteredDocuments.length === 0 && (
              <div className="px-5 py-12 text-center">
                <p className="text-[13px] font-medium text-[#555d55]">
                  No documents found
                </p>
                <p className="mt-1 text-[11px] text-[#939a92]">
                  Try a different filename.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-dashed border-[#dce2da] bg-[#fbfcfa] p-5 sm:p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#edf2ed] text-[#607763]">
                <Icon name="upload" className="h-[18px] w-[18px]" />
              </span>
              <div>
                <h2 className="text-[12px] font-semibold text-[#414841]">
                  Add documents to your knowledge base
                </h2>
                <p className="mt-1 max-w-[490px] text-[11px] leading-5 text-[#838a82]">
                  PDF, DOCX, or TXT files. File selection is available, but document
                  uploads are not connected until the backend endpoint is implemented.
                </p>
              </div>
            </div>
           
<button
  type="button"
  onClick={() => fileInputRef.current?.click()}
  disabled={isUploading}
  className="h-9 shrink-0 rounded-lg bg-[var(--accent)] px-4 text-[11px] font-semibold text-white transition-colors hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-50"
>
  {isUploading ? "Uploading..." : "Upload documents"}
</button>
{uploadMessage && (
  <p className="mt-3 text-[12px] text-[#607763]" role="status">
    {uploadMessage}
  </p>
)}
          </div>
          {selectedFiles.length > 0 && (
            <div className="mt-4 border-t border-[#e9ece7] pt-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9289]">
                Selected locally · not uploaded
              </p>
              <ul className="flex flex-wrap gap-2">
                {selectedFiles.map((name) => (
                  <li
                    key={name}
                    className="flex max-w-full items-center gap-2 rounded-md border border-[#e7eae5] bg-white px-2.5 py-1.5 text-[10px] text-[#626a61]"
                  >
                    <Icon name="file" className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
