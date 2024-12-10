export interface Node{
  content:string;
  source:string;
}

export interface SearchResult {
  query: string;
  response: [Node];
  sources: { score: number; url: string; }[];
  valid_sources: string[];
  invalid_sources: string[];
} 