export interface Node {
  content: string;
  source: string;
}

export interface SearchResult {
  query: string;
  response: Node[];
  sources: { score: number; url: string }[];
  valid_sources: { doc_type: string; url: string }[];
  invalid_sources: { doc_type: string; url: string }[];
}
