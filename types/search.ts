export interface Node {
  content: string;
  title: string;
  source: string;
  doc_type: string;
  node_id: string;
}

export interface Source {
  doc_type: string;
  title: string;
  url: string;
}

export interface ApiResponse {
  response: Node[];
  sources: Array<{
    score: number;
    url: string;
  }>;
  valid_sources: Source[];
  invalid_sources: Source[];
}

export interface SearchContextType {
  currentQuery: string;
  setCurrentQuery: (query: string) => void;
}

