// components/main/Diagrams.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Diagram {
  type: string;
  title: string;
  description: string;
  elements: string[];
  connections: string[];
  svg_code: string;
}

interface ChartConfig {
  chart_id?: string;
  chart_type: string;
  title: string;
  description?: string;
  data_format?: string;
  data?: {
    points?: Array<{
      x: number;
      y: number;
      label?: string;
    }>;
    labels?: string[];
    values?: number[];
  };
  axes?: {
    x_axis: string;
    y_axis: string;
    x_unit?: string;
    y_unit?: string;
  };
  annotations?: Array<{
    type: string;
    coordinates?: any;
    label?: string | null;
    style?: any;
  }>;
  styling?: {
    colors?: string[];
    line_style?: string;
    point_size?: number;
  };
}

interface DiagramsData {
  diagrams?: Diagram[];
  chart_configs?: ChartConfig[];
  visual_metaphors?: string | string[];
  agent?: string;
  schema_version?: string;
}

interface DiagramsProps {
  data: DiagramsData | null;
}

const Diagrams: React.FC<DiagramsProps> = ({ data }) => {
  // Debug logging
  console.log('Diagrams component data:', data);

  if (!data) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Diagrams</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">No diagram data available.</p>
        </div>
      </div>
    );
  }

  const hasContent = data.diagrams?.length || data.chart_configs?.length || data.visual_metaphors;

  if (!hasContent) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Diagrams</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">No visual content available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Visual Diagrams</h2>
          </div>
          <p className="text-gray-600">
            Interactive charts and visual representations to understand chemical bonding concepts
          </p>
        </div>

        {/* Main Diagrams Section */}
        {data.diagrams && data.diagrams.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Concept Diagrams ({data.diagrams.length})
            </h3>
            <div className="space-y-6">
              {data.diagrams.map((diagram, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {diagram.type}
                      </span>
                      <h4 className="text-lg font-semibold text-gray-800">{diagram.title}</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{diagram.description}</p>
                  </div>

                  {/* SVG Diagram */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6 flex justify-center overflow-x-auto">
                    <div
                      className="max-w-full min-w-0"
                      dangerouslySetInnerHTML={{ __html: diagram.svg_code }}
                    />
                  </div>

                  {/* Diagram Elements and Connections */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-violet-50 rounded-lg p-4">
                      <h5 className="text-md font-semibold text-violet-800 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Key Elements
                      </h5>
                      <div className="space-y-2">
                        {diagram.elements.map((element, elemIndex) => (
                          <div key={elemIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-violet-700 text-sm leading-relaxed">{element}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="text-md font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Relationships
                      </h5>
                      <div className="space-y-2">
                        {diagram.connections.map((connection, connIndex) => (
                          <div key={connIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-blue-700 text-sm leading-relaxed">{connection}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chart Configurations Section */}
        {data.chart_configs && data.chart_configs.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Interactive Charts ({data.chart_configs.length})
            </h3>
            <div className="space-y-6">
              {data.chart_configs.map((chart, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium capitalize">
                      {chart.chart_type} Chart
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">{chart.title}</h4>
                  </div>

                  {chart.description && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">{chart.description}</p>
                    </div>
                  )}

                  {/* Interactive Chart Visualization */}
                  {chart.data && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                      <div className="h-80 w-full">
                        <ChartRenderer chart={chart} />
                      </div>
                    </div>
                  )}

                  {/* Chart Specifications Grid */}
                  <div className="grid gap-4 mb-6">
                    {/* Axes Information */}
                    {chart.axes && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-400">
                          <h5 className="text-md font-semibold text-orange-800 mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            X-Axis
                          </h5>
                          <p className="text-orange-700 text-sm font-medium">
                            {chart.axes.x_axis}
                            {chart.axes.x_unit && <span className="text-orange-600"> ({chart.axes.x_unit})</span>}
                          </p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
                          <h5 className="text-md font-semibold text-purple-800 mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Y-Axis
                          </h5>
                          <p className="text-purple-700 text-sm font-medium">
                            {chart.axes.y_axis}
                            {chart.axes.y_unit && <span className="text-purple-600"> ({chart.axes.y_unit})</span>}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Data Format */}
                    {chart.data_format && (
                      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                        <h5 className="text-md font-semibold text-blue-800 mb-2">Data Format</h5>
                        <p className="text-blue-700 text-sm">{chart.data_format}</p>
                      </div>
                    )}
                  </div>

                  {/* Collapsible Chart Data Details */}
                  {chart.data && (
                    <details className="bg-gray-50 rounded-lg">
                      <summary className="p-4 cursor-pointer text-gray-700 font-medium hover:bg-gray-100 rounded-lg">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          View Raw Chart Data
                        </span>
                      </summary>
                      <div className="p-4 pt-0">
                        {/* Points Data */}
                        {chart.data.points && chart.data.points.length > 0 && (
                          <div className="mb-4">
                            <h6 className="text-sm font-medium text-gray-700 mb-3">Data Points ({chart.data.points.length} total):</h6>
                            <div className="bg-white rounded border p-4 max-h-64 overflow-y-auto">
                              <div className="grid gap-2">
                                {chart.data.points.slice(0, 15).map((point, idx) => (
                                  <div key={idx} className="flex items-center justify-between py-1 px-2 rounded text-sm border-b border-gray-100 last:border-b-0">
                                    <div className="flex items-center gap-4">
                                      <span className="text-gray-500 font-mono">#{idx + 1}</span>
                                      <span className="text-blue-600 font-medium">x: {point.x}</span>
                                      <span className="text-green-600 font-medium">y: {point.y}</span>
                                    </div>
                                    {point.label && (
                                      <span className="text-purple-600 text-xs font-medium bg-purple-50 px-2 py-1 rounded">
                                        {point.label}
                                      </span>
                                    )}
                                  </div>
                                ))}
                                {chart.data.points.length > 15 && (
                                  <div className="text-center py-2 text-gray-500 text-sm">
                                    ... and {chart.data.points.length - 15} more points
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Categories and Values Data */}
                        {chart.data.labels && chart.data.values && (
                          <div>
                            <h6 className="text-sm font-medium text-gray-700 mb-3">Categories & Values:</h6>
                            <div className="bg-white rounded border p-4">
                              <div className="grid gap-2">
                                {chart.data.labels.map((label, idx) => (
                                  <div key={idx} className="flex items-center justify-between py-2 px-3 rounded hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                                    <span className="text-gray-700 font-medium">{label}</span>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-4 h-4 rounded"
                                        style={{
                                          backgroundColor: chart.styling?.colors?.[idx] || '#6366f1'
                                        }}
                                      ></div>
                                      <span className="text-gray-800 font-bold">{chart.data?.values?.[idx]}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </details>
                  )}

                  {/* Annotations */}
                  {chart.annotations && chart.annotations.filter(a => a.label).length > 0 && (
                    <div className="bg-yellow-50 rounded-lg p-4 mt-4 border-l-4 border-yellow-400">
                      <h5 className="text-md font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                        </svg>
                        Chart Annotations
                      </h5>
                      <div className="space-y-2">
                        {chart.annotations
                          .filter(annotation => annotation.label)
                          .map((annotation, annIndex) => (
                            <div key={annIndex} className="flex items-start gap-3 p-2 bg-white rounded">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <span className="text-yellow-800 text-sm font-medium">
                                  {annotation.type}:
                                </span>
                                <span className="text-yellow-700 text-sm ml-2">
                                  {annotation.label}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visual Metaphors Section */}
        {data.visual_metaphors && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Visual Metaphors
            </h3>
            <div className="bg-violet-50 rounded-xl p-6 border border-violet-200">
              <p className="text-violet-700 mb-4 font-medium">
                These everyday examples help visualize chemical bonding concepts:
              </p>
              <div className="grid gap-4">
                {(typeof data.visual_metaphors === 'string'
                  ? data.visual_metaphors.split(/\d+\.\s+/).filter(item => item.trim() !== '')
                  : data.visual_metaphors
                ).map((metaphor, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-violet-100 shadow-sm">
                    <div className="w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-violet-700 font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-violet-800 text-sm leading-relaxed">{metaphor.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200">
          <button className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Diagrams
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Interactive
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Visualizations
          </button>
        </div>
      </div>
    </div>
  );
};

// Chart Renderer Component
const ChartRenderer: React.FC<{ chart: ChartConfig }> = ({ chart }) => {
  const getChartData = () => {
    const baseColor = chart.styling?.colors?.[0] || '#6366f1';
    const colors = chart.styling?.colors || [baseColor];

    if (chart.data?.points) {
      // Line chart data from points
      return {
        labels: chart.data.points.map(point => point.x.toString()),
        datasets: [{
          label: chart.title,
          data: chart.data.points.map(point => point.y),
          borderColor: baseColor,
          backgroundColor: baseColor + '20',
          fill: chart.chart_type === 'line',
          tension: 0.4,
          pointRadius: chart.styling?.point_size || 4,
          pointHoverRadius: (chart.styling?.point_size || 4) + 2,
          borderWidth: 2,
        }]
      };
    }
    else if ((chart.data?.labels && chart.data?.values) || (chart.data?.categories?.labels && chart.data?.categories?.values)) {
      const labels = chart.data?.labels || chart.data?.categories?.labels;
      const values = chart.data?.values || chart.data?.categories?.values;

      if (!labels.length || !values.length) {
        return { labels: [], datasets: [] };
      }
      // Bar chart data from labels/values
      return {
        labels: chart.data.labels,
        datasets: [{
          label: chart.title,
          data: chart.data.values,
          backgroundColor: colors.map((color, idx) =>
            colors[idx % colors.length] || baseColor
          ),
          borderColor: colors.map((color, idx) =>
            colors[idx % colors.length] || baseColor
          ),
          borderWidth: 1,
        }]
      };
    }

    return { labels: [], datasets: [] };
  };

  const getChartOptions = () => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            font: {
              size: 12,
              family: 'Inter, system-ui, sans-serif'
            }
          }
        },
        title: {
          display: false, // We show title separately
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: '#6366f1',
          borderWidth: 1,
        }
      },
      scales: {
        x: {
          title: {
            display: !!chart.axes?.x_axis,
            text: chart.axes?.x_axis + (chart.axes?.x_unit ? ` (${chart.axes.x_unit})` : ''),
            font: {
              size: 12,
              weight: 'bold' as const
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            font: {
              size: 11
            }
          }
        },
        y: {
          title: {
            display: !!chart.axes?.y_axis,
            text: chart.axes?.y_axis + (chart.axes?.y_unit ? ` (${chart.axes.y_unit})` : ''),
            font: {
              size: 12,
              weight: 'bold' as const
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            font: {
              size: 11
            }
          }
        }
      },
      elements: {
        point: {
          hoverBackgroundColor: '#6366f1',
          hoverBorderColor: '#4f46e5',
        }
      }
    };

    return baseOptions;
  };

  const chartData = getChartData();
  const chartOptions = getChartOptions();

  if (!chartData.labels || !chartData.labels.length) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-gray-500 text-sm">No chart data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      {chart.chart_type === 'line' ? (
        <Line data={chartData} options={chartOptions} />
      ) : chart.chart_type === 'bar' ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default Diagrams;