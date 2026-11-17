import { FindingStatus } from '../types/medical';

export function getStatusColor(status: FindingStatus): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  chartFill: string;
  ring: string;
} {
  switch (status) {
    case 'Normal':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        chartFill: '#10B981', // Emerald 500
        ring: 'ring-emerald-400'
      };
    case 'Borderline':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-800 border-amber-300',
        chartFill: '#F59E0B', // Amber 500
        ring: 'ring-amber-400'
      };
    case 'Needs Attention':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        badge: 'bg-rose-100 text-rose-800 border-rose-300',
        chartFill: '#F43F5E', // Rose 500
        ring: 'ring-rose-400'
      };
    default:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
        badge: 'bg-slate-100 text-slate-800 border-slate-300',
        chartFill: '#64748B',
        ring: 'ring-slate-400'
      };
  }
}

export function formatDoctorVisitSheetText(result: import('../types/medical').AnalysisResult): string {
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const lines = [
    '======================================================',
    '       MEDICLEAR AI - DOCTOR VISIT PREP SHEET         ',
    '       Empowering Informed Healthcare Conversations    ',
    '======================================================',
    `Date Generated: ${dateStr}`,
    `Document Type:  ${result.documentType}`,
    `Source File:    ${result.sourceFileName}`,
    '',
    '------------------------------------------------------',
    '1. PLAIN-LANGUAGE SUMMARY',
    '------------------------------------------------------',
    ...result.plainLanguageSummary.map((s, i) => `  ${i + 1}. ${s}`),
    '',
    '------------------------------------------------------',
    '2. KEY FINDINGS & BIOMARKERS',
    '------------------------------------------------------',
    ...result.keyFindings.map(
      (f) =>
        `  * ${f.parameterName}: ${f.value} ${f.unit} [${f.status.toUpperCase()}]\n    Reference Target: ${f.referenceRangeText}\n    Context: ${f.simpleExplanation}`
    ),
    '',
    '------------------------------------------------------',
    '3. QUESTIONS PREPARED FOR MY DOCTOR',
    '------------------------------------------------------',
    ...result.questionsForDoctor.map(
      (q, i) =>
        `  [${q.checked ? 'X' : ' '}] Q${i + 1}: ${q.question}\n      Purpose: ${q.reason}`
    ),
    '',
    '------------------------------------------------------',
    '4. GENERAL LIFESTYLE & WELLNESS NOTES',
    '------------------------------------------------------',
    ...result.nextStepsAndLifestyle.map((n) => `  * ${n}`),
    '',
    '======================================================',
    'LEGAL & CLINICAL DISCLAIMER:',
    result.disclaimer,
    '======================================================'
  ];

  return lines.join('\n');
}
