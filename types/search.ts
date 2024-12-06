interface Node{
  content:string;
  source:string;
}
export interface SearchResult {
  query: string;
  response: [Node];
  sources: { score: number; url: string; }[];
} 