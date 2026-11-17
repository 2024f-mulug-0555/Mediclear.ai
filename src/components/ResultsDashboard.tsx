import React from 'react';
import { AnalysisResult, LanguageMode } from '../types/medical';
import { SummaryCard } from './SummaryCard';
import { BiomarkerCharts } from './BiomarkerCharts';
import { FindingsList } from './FindingsList';
import { DoctorPrepSheet } from './DoctorPrepSheet';
import { FollowUpChat } from './FollowUpChat';

interface ResultsDashboardProps {
  result: AnalysisResult;
  language: LanguageMode;
  onPrintRequest: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  language,
  onPrintRequest,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* 1. Top Alert / Summary Card */}
      <SummaryCard result={result} language={language} />

      {/* 2. Interactive Health Graphs (Recharts) */}
      <BiomarkerCharts result={result} language={language} />

      {/* 3. Detailed Parameter Breakdown Cards */}
      <FindingsList findings={result.keyFindings} language={language} />

      {/* 4. Doctor Visit Prep Checklist & Lifestyle Notes */}
      <DoctorPrepSheet
        result={result}
        language={language}
        onPrintRequest={onPrintRequest}
      />

      {/* 5. Follow-up AI Health Assistant Contextual Chat */}
      <FollowUpChat
        result={result}
        language={language}
      />
    </div>
  );
};
