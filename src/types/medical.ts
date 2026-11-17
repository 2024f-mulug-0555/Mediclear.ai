export type DocumentType = 
  | 'Lab Report' 
  | 'Medical Imaging / X-Ray' 
  | 'Prescription / Receipt';

export type LanguageMode = 'en' | 'ur';

export type FindingStatus = 'Normal' | 'Borderline' | 'Needs Attention';

export interface BiomarkerFinding {
  id: string;
  parameterName: string;
  value: string | number;
  unit: string;
  normalRangeMin?: number;
  normalRangeMax?: number;
  referenceRangeText: string;
  status: FindingStatus;
  simpleExplanation: string;
  simpleExplanationUrdu?: string;
  clinicalContext?: string;
  category: string;
}

export interface VisualChartItem {
  name: string;
  value: number;
  unit: string;
  normalMin?: number;
  normalMax?: number;
  status: FindingStatus;
  scorePercent: number; // 0 to 100 for normalized visualization
  dosageTime?: string;  // e.g., 'Morning', 'Afternoon', 'Evening', 'Bedtime'
  category?: string;
  notes?: string;
}

export interface DoctorQuestion {
  id: string;
  question: string;
  questionUrdu?: string;
  reason: string;
  checked?: boolean;
}

export interface MedicationScheduleItem {
  medicationName: string;
  dosage: string;
  frequency: string;
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  bedtime: boolean;
  instructions: string;
  purpose: string;
}

export interface AnalysisResult {
  documentType: DocumentType;
  patientContext: string;
  plainLanguageSummary: string[];
  plainLanguageSummaryUrdu?: string[];
  keyFindings: BiomarkerFinding[];
  visualChartData: VisualChartItem[];
  chartType: 'biomarker_ranges' | 'medication_schedule' | 'imaging_observations';
  medicationSchedule?: MedicationScheduleItem[];
  questionsForDoctor: DoctorQuestion[];
  nextStepsAndLifestyle: string[];
  nextStepsAndLifestyleUrdu?: string[];
  urgentAttentionRequired: boolean;
  urgentReason?: string;
  disclaimer: string;
  analyzedAt: string;
  sourceFileName: string;
  fileType: string;
  filePreviewUrl?: string;
  rawTextPreview?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

export interface DemoSampleScenario {
  id: string;
  title: string;
  titleUrdu: string;
  subtitle: string;
  documentType: DocumentType;
  description?: string;
  badge: string;
  iconName: 'FileSpreadsheet' | 'Activity' | 'Pill';
  mockFile: {
    name: string;
    type: string;
    size: string;
  };
  sampleResult: AnalysisResult;
}
