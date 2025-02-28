import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LanguageDistribution } from '../types';

interface LanguageDistributionChartProps {
  data: LanguageDistribution[];
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

const LanguageDistributionChart: React.FC<LanguageDistributionChartProps> = ({
  data,
  width = 300,
  height = 300,
  innerRadius = 60,
  outerRadius = 120,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<LanguageDistribution>().value(d => d.count);
    const arc = d3.arc<d3.PieArcDatum<LanguageDistribution>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.language))
      .range(['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#a855f7']);

    const arcs = svg
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Add colored segments
    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(d.data.language))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.8)
      .on('mouseover', function() {
        d3.select(this).style('opacity', 1);
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 0.8);
      });

    // Add percentage labels
    arcs
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', 'white')
      .attr('font-weight', 'bold')
      .text(d => `${d.data.percentage}%`);

    // Add center text
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('fill', '#374151')
      .text('Language');

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('fill', '#374151')
      .attr('y', 20)
      .text('Distribution');

    // Add legend
    const legend = svg
      .selectAll('.legend')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${outerRadius + 20}, ${-outerRadius + 20 + i * 20})`);

    legend
      .append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', d => colorScale(d.language));

    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 10)
      .attr('font-size', '12px')
      .attr('fill', '#374151')
      .text(d => `${d.language} (${d.percentage}%)`);

  }, [data, width, height, innerRadius, outerRadius]);

  return <svg ref={svgRef} />;
};

export default LanguageDistributionChart;