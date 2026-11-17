import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ReferenceLine,
  CartesianGrid
} from 'recharts';
import { 
  BarChart3, 
  Clock, 
  Calendar, 
  Activity, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { AnalysisResult, LanguageMode, VisualChartItem } from '../types/medical';
import { getStatusColor } from '../utils/formatters';
import { TRANSLATIONS } from '../utils/translations';

interface BiomarkerChartsProps {
  result: AnalysisResult;
  language: LanguageMode;
}

export const BiomarkerCharts: React.FC<BiomarkerChartsProps> = ({ result, language }) => {
  const t = TRANSLATIONS[language];
  const [selectedChartFilter, setSelectedChartFilter] = useState<'all' | 'attention'>('all');

  const chartData: VisualChartItem[] = result.visualChartData || [];

  const filteredData = selectedChartFilter === 'attention'
    ? chartData.filter(d => d.status !== 'Normal')
    : chartData;

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: VisualChartItem = payload[0].payload;
      const statusStyle = getStatusColor(data.status);

      return (
        <div className="bg-white p-3.5 rounded-xl shadow-xl border border-slate-200 text-xs min-w-[200px] z-50">
          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-slate-100">
            <span className="font-bold text-slate-900">{data.name}</span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${statusStyle.badge}`}>
              {data.status}
            </span>
          </div>
          <div className="space-y-1 text-slate-600">
            <div className="flex justify-between">
              <span>Patient Value:</span>
              <span className="font-bold text-slate-900">{data.value} {data.unit}</span>
            </div>
            {data.normalMin !== undefined && data.normalMax !== undefined && (
              <div className="flex justify-between text-slate-500">
                <span>Healthy Range:</span>
                <span>{data.normalMin} - {data.normalMax} {data.unit}</span>
              </div>
            )}
            {data.dosageTime && (
              <div className="flex justify-between text-slate-500">
                <span>Scheduled Time:</span>
                <span className="font-medium text-teal-700">{data.dosageTime}</span>
              </div>
            )}
            {data.notes && (
              <p className="text-[11px] text-slate-500 mt-1 italic border-t border-slate-100 pt-1">
                {data.notes}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-6">
      {/* Chart Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {result.documentType === 'Prescription / Receipt' 
                ? 'Daily Medication Schedule & Dosage Breakdown' 
                : result.documentType === 'Medical Imaging / X-Ray'
                ? 'Radiological Observation & Clarity Metrics'
                : t.visualChartsTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {result.documentType === 'Prescription / Receipt'
              ? 'Visual timeline of prescribed medicines to avoid missed or conflicting doses'
              : 'Interactive normalized comparison against healthy clinical benchmarks'}
          </p>
        </div>

        {/* Legend Pills */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Normal
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Borderline
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Needs Attention
          </span>
        </div>
      </div>

      {/* Main Bar Chart Container */}
      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData}
            margin={{ top: 15, right: 20, left: -10, bottom: 45 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="name"
              angle={-25}
              textAnchor="end"
              interval={0}
              height={55}
              tick={{ fontSize: 11, fill: '#475569' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748B' }}
              domain={[0, (dataMax: number) => Math.max(100, Math.ceil(dataMax * 1.15))]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={100} stroke="#94A3B8" strokeDasharray="3 3" label={{ value: 'Reference Standard', fill: '#94A3B8', fontSize: 10, position: 'insideTopRight' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={45}>
              {filteredData.map((entry, index) => {
                const color = getStatusColor(entry.status).chartFill;
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Prescription Specific Schedule Timeline Component */}
      {result.documentType === 'Prescription / Receipt' && result.medicationSchedule && result.medicationSchedule.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Prescription Daily Timing Matrix</span>
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Medication</th>
                  <th className="p-3 text-center">Morning (08:00)</th>
                  <th className="p-3 text-center">Afternoon (13:00)</th>
                  <th className="p-3 text-center">Evening (19:00)</th>
                  <th className="p-3 text-center">Bedtime (22:00)</th>
                  <th className="p-3">Meal / Safety Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.medicationSchedule.map((med, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="p-3 font-semibold text-slate-900">
                      <div>{med.medicationName}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{med.purpose}</div>
                    </td>
                    <td className="p-3 text-center">
                      {med.morning ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold">✓</span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {med.afternoon ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold">✓</span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {med.evening ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold">✓</span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {med.bedtime ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 font-bold">✓</span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-600 font-medium">
                      {med.instructions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bottom Chart Note */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Values normalized for visual health literacy comparison. Refer to table below for exact units.</span>
        </span>
        <span className="font-semibold text-slate-600">Recharts Visualization Engine</span>
      </div>
    </div>
  );
};
