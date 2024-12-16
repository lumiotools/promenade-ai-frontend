import React from 'react';
import { Loader2 } from 'lucide-react';

export function AiThinkingLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className="animate-pulse">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Assistant is thinking...
        </h3>
        <p className="text-sm text-gray-500">
          Generating an insightful summary for you
        </p>
      </div>
    </div>
  );
}