import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { BiomarkerFinding, FindingStatus, LanguageMode } from '../types/medical';
import { getStatusColor } from '../utils/formatters';
import { TRANSLATIONS } from '../utils/translations';

interface FindingsListProps {
  findings: BiomarkerFinding[];
  language: LanguageMode;
}

export const FindingsList: React.FC<FindingsListProps> = ({ findings, language }) => {
  const t = TRANSLATIONS[language];
  const isUrdu = language === 'ur';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | FindingStatus>('All');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    findings.forEach(f => { all[f.id] = true; });
    setExpandedIds(all);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const filteredFindings = findings.filter(f => {
    const matchesStatus = selectedStatus === 'All' || f.status === selectedStatus;
    const matchesSearch = 
      f.parameterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.simpleExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const countNeedsAttention = findings.filter(f => f.status === 'Needs Attention').length;
  const countBorderline = findings.filter(f => f.status === 'Borderline').length;
  const countNormal = findings.filter(f => f.status === 'Normal').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {t.keyFindingsTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Expand any biomarker to translate clinical abbreviations into everyday words
          </p>
        </div>

        {/* Search & Collapse Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search biomarker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>
          <button
            onClick={Object.keys(expandedIds).length === findings.length ? collapseAll : expandAll}
            className="text-xs px-2.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-medium text-slate-600 transition-colors whitespace-nowrap"
          >
            {Object.keys(expandedIds).length === findings.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Filter Status Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <button
          onClick={() => setSelectedStatus('All')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            selectedStatus === 'All'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.allFilter} ({findings.length})
        </button>

        <button
          onClick={() => setSelectedStatus('Needs Attention')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            selectedStatus === 'Needs Attention'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          {t.attentionFilter} ({countNeedsAttention})
        </button>

        <button
          onClick={() => setSelectedStatus('Borderline')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            selectedStatus === 'Borderline'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          {t.borderlineFilter} ({countBorderline})
        </button>

        <button
          onClick={() => setSelectedStatus('Normal')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            selectedStatus === 'Normal'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {t.normalFilter} ({countNormal})
        </button>
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        {filteredFindings.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No biomarkers found matching your filter criteria.
          </div>
        ) : (
          filteredFindings.map((finding) => {
            const isExpanded = Boolean(expandedIds[finding.id]);
            const statusStyle = getStatusColor(finding.status);

            return (
              <div
                key={finding.id}
                className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-teal-300 ring-2 ring-teal-500/10 bg-white'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {/* Card Summary Header */}
                <div
                  onClick={() => toggleExpand(finding.id)}
                  className="p-4 flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none hover:bg-slate-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-10 rounded-full shrink-0 ${
                      finding.status === 'Normal' ? 'bg-emerald-500' : finding.status === 'Borderline' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {finding.parameterName}
                        </span>
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                          {finding.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Target Range: <span className="font-medium text-slate-700">{finding.referenceRangeText}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* User Value Badge */}
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-slate-900">
                        {finding.value} <span className="text-xs font-normal text-slate-500">{finding.unit}</span>
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border mt-0.5 ${statusStyle.badge}`}>
                        {finding.status}
                      </span>
                    </div>

                    <button
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      aria-label="Expand details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expandable Explanation Body */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      {/* Everyday Translation */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-1.5 font-bold text-teal-800 mb-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                          <span>In Everyday Language:</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-normal">
                          {finding.simpleExplanation}
                        </p>
                        {isUrdu && finding.simpleExplanationUrdu && (
                          <p className="text-teal-900 mt-2 pt-2 border-t border-slate-100 font-medium leading-relaxed font-urdu text-sm">
                            {finding.simpleExplanationUrdu}
                          </p>
                        )}
                      </div>

                      {/* Clinical Context & Reference Comparison */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                            <span>Why This Marker Matters:</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            {finding.clinicalContext || 'Monitored routinely as part of standard metabolic, cardiovascular, or diagnostic assessments.'}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500">
                          <span>Standard Reference Target:</span>
                          <span className="font-semibold text-slate-800">{finding.referenceRangeText}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
