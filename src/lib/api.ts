
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Source {
  document: string;
  chunk_index: number;
}

export interface AskResponse {
  question: string;
  answer: string;
  sources: Source[];
}


export interface KnowledgeDocument {
  name: string;
  type: string;
  size: string;
}


export const askQuestion = async (
  question: string
): Promise<AskResponse> => {
  const response = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Failed to get an answer. Please try again.");
  }

  return response.json();
};


export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/documents/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Document upload failed.");
  }

  return response.json();
};


export const getDocuments = async (): Promise<{
  documents: KnowledgeDocument[];
  total: number;
}> => {
  const response = await fetch(`${API_URL}/documents`);

  if (!response.ok) {
    throw new Error("Failed to load documents.");
  }

  return response.json();
};