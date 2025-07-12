import React from 'react';
import { Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const InsightsPanel = ({ insights }) => {
  if (!insights) {
    return null;
  }

  return (
    // Responsive Height
    <div className="bg-brand-light p-4 rounded-lg shadow-lg flex flex-col h-[400px] lg:h-[70vh]">
      <h2 className="text-lg font-bold text-brand-dark mb-3 flex items-center flex-shrink-0">
        <Lightbulb className="mr-2 h-5 w-5 text-brand-secondary" />
        AI Market Summary
      </h2>
      <div className="overflow-y-auto flex-grow">
        <div className="prose prose-sm  max-w-none text-xs prose-headings:font-bold prose-headings:text-brand-dark">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {insights}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
