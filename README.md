# Knowbase – AI-Powered Internal Knowledge Assistant

Knowbase is an AI-powered internal knowledge assistant that helps employees find information from company documents through natural language questions.

The application combines a Next.js frontend with a FastAPI backend powered by Retrieval-Augmented Generation (RAG) and hybrid search.

## Features

- **AI-powered chat:** Ask questions about company knowledge using natural language.
- **Knowledge base:** View and manage uploaded company documents.
- **Document uploads:** Upload PDF, DOCX, and TXT files.
- **Source references:** View the documents and text chunks used to generate answers.
- **Document preview:** Open referenced documents directly from chat responses.
- **Chat interface:** Interact with the knowledge assistant through a clean dashboard.
- **API integration:** Communicate with the FastAPI backend.
- **Responsive design:** Access the application across desktop and mobile screens.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- FastAPI (backend integration)

## Project Structure

```text
knowbase-frontend/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

*Note: The structure above is a simplified overview.*

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nicojoy-gif/hybrid-rag-frontend
cd hybrid-rag-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

This points the frontend to the local FastAPI backend.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend Integration

The frontend communicates with the Knowbase FastAPI backend.

Backend repository: **<your-backend-repository-url>**

The backend provides endpoints for:

- Asking questions.
- Uploading documents.
- Retrieving knowledge base documents.
- Opening source documents.

Ensure the backend and Ollama are running before using the application.

## Application Workflow

1. Upload company documents through the Knowledge Base.
2. The backend extracts and processes the document content.
3. The RAG pipeline generates embeddings and indexes document chunks.
4. Ask questions through the chat interface.
5. The backend retrieves relevant context using hybrid search.
6. The language model generates an answer based on the retrieved information.
7. Relevant document references are displayed alongside the answer.

## Future Improvements

- Chat history persistence.
- User authentication and access control.
- Improved document search and filtering.
- Production deployment.
- Enhanced AI response evaluation.

## Author

Built as a practical AI Engineering project exploring RAG, hybrid retrieval, embeddings, and local language models.