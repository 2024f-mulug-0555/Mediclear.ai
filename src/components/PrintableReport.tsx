import React from 'react';
import { AnalysisResult } from '../types/medical';

interface PrintableReportProps {
  result: AnalysisResult | null;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({ result }) => {
  if (!result) return null;

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div id="printable-doctor-sheet" className="hidden print:block p-8 bg-white text-black font-sans text-xs">
      {/* Clinic / Patient Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-5 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-slate-950">
              MEDICLEAR AI (SehatLens)
            </span>
            <span className="text-xs px-2 py-0.5 border border-slate-800 rounded font-bold">
              DOCTOR VISIT PREP HANDOUT
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            UN SDG 3: AI for Accessible Healthcare & Well-Being • Patient Empowerment Sheet
          </p>
        </div>
        <div className="text-right text-xs text-slate-600">
          <div><strong>Date:</strong> {dateStr}</div>
          <div><strong>Document:</strong> {result.documentType}</div>
          <div><strong>Source File:</strong> {result.sourceFileName}</div>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="border-2 border-amber-600 bg-amber-50 p-3 rounded mb-5 text-[11px] leading-relaxed text-amber-950">
        <strong>CLINICAL & COMPLIANCE DISCLAIMER:</strong> This handout is generated for informational and health literacy purposes only. It is not a clinical diagnosis or treatment prescription. It is designed to assist the patient in discussing their test results and medical documents with their licensed physician.
      </div>

      {/* Section 1: Summary */}
      <div className="mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1 mb-2 text-slate-900">
          1. Plain-Language Summary
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-slate-800 leading-normal">
          {result.plainLanguageSummary.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      </div>

      {/* Section 2: Key Findings Table */}
      <div className="mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1 mb-2 text-slate-900">
          2. Extracted Biomarkers & Clinical Observations
        </h2>
        <table className="w-full border-collapse border border-slate-300 text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-900 font-bold">
              <th className="border border-slate-300 p-1.5">Parameter</th>
              <th className="border border-slate-300 p-1.5">Patient Result</th>
              <th className="border border-slate-300 p-1.5">Standard Reference Range</th>
              <th className="border border-slate-300 p-1.5">Status</th>
              <th className="border border-slate-300 p-1.5">Everyday Explanation</th>
            </tr>
          </thead>
          <tbody>
            {result.keyFindings.map((finding) => (
              <tr key={finding.id} className="border-b border-slate-200">
                <td className="border border-slate-300 p-1.5 font-semibold text-slate-950">
                  {finding.parameterName}
                </td>
                <td className="border border-slate-300 p-1.5 font-bold">
                  {finding.value} {finding.unit}
                </td>
                <td className="border border-slate-300 p-1.5 text-slate-700">
                  {finding.referenceRangeText}
                </td>
                <td className="border border-slate-300 p-1.5 font-bold">
                  {finding.status}
                </td>
                <td className="border border-slate-300 p-1.5 text-slate-600 text-[10px]">
                  {finding.simpleExplanation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: Prepared Questions for Doctor */}
      <div className="mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-1 mb-2 text-slate-900">
          3. Questions Prepared for the Physician
        </h2>
        <div className="space-y-2">
          {result.questionsForDoctor.map((q, idx) => (
            <div key={q.id} className="flex items-start gap-2">
              <span className="font-bold text-slate-900">[ {q.checked ? 'X' : ' '} ]</span>
              <div>
                <span className="font-semibold text-slate-900">Q{idx + 1}: {q.question}</span>
                <span className="block text-[10px] text-slate-500 italic">Purpose: {q.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Doctor Notes / Clinical Plan Box */}
      <div className="border border-slate-400 rounded p-3 mb-4">
        <h3 className="font-bold text-xs uppercase text-slate-800 mb-2">
          Physician Clinical Notes & Next Appointment Plan:
        </h3>
        <div className="h-20 border-b border-dashed border-slate-300" />
        <div className="h-10 flex justify-between items-end text-[10px] text-slate-500 pt-2">
          <span>Physician Signature: __________________________________</span>
          <span>Next Follow-up Date: _________________</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-slate-500 pt-2 border-t border-slate-200">
        MediClear AI (SehatLens) • UN Sustainable Development Goal 3 (Health Literacy & Patient Empowerment) • Printed by Patient
      </div>
    </div>
  );
};
