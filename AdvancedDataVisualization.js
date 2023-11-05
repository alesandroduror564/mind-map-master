/* 
  File Name: AdvancedDataVisualization.js
  
  Description:
  This code demonstrates advanced data visualization techniques using D3.js library.
  It generates an interactive and animated bubble chart representing fictional sales data.
  
  Author: John Doe
  Date: 2022-01-01
*/

// Import necessary modules
import * as d3 from 'd3';
import { select, json, scaleLinear, scaleOrdinal } from 'd3';

// Define global variables
const width = 800;
const height = 600;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };

// Load data from external JSON file
json('sales_data.json').then(data => {
  // Data preprocessing
  const salesByRegion = d3.nest()
    .key(d => d.region)
    .rollup(d => d3.sum(d, v => v.sales))
    .entries(data);

  // Configure scales
  const salesExtent = d3.extent(salesByRegion, d => d.value);
  const radiusScale = scaleLinear()
    .domain(salesExtent)
    .range([5, 40]);

  const colorScale = scaleOrdinal(d3.schemeCategory10);

  // Create SVG container
  const svg = select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Create tooltip
  const tooltip = select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  // Draw bubbles
  const bubbles = svg.selectAll('.bubble')
    .data(salesByRegion)
    .enter()
    .append('circle')
    .attr('class', 'bubble')
    .attr('cx', d => Math.random() * (width - margin.left - margin.right) + margin.left)
    .attr('cy', d => Math.random() * (height - margin.top - margin.bottom) + margin.top)
    .attr('r', d => radiusScale(d.value))
    .style('fill', d => colorScale(d.key))
    .on('mouseover', (event, d) => {
      tooltip.transition().duration(200).style('opacity', 0.9);
      tooltip.html(`<strong>${d.key}</strong><br>Sales: ${d.value}`)
        .style('left', `${event.pageX}px`)
        .style('top', `${event.pageY}px`);
    })
    .on('mouseout', () => tooltip.transition().duration(200).style('opacity', 0));

  // Add animation on bubble position
  const simulation = d3.forceSimulation(salesByRegion)
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => radiusScale(d.value) + 2))
    .on('tick', () => {
      bubbles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

  // Add chart title
  svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', margin.top / 2)
    .attr('text-anchor', 'middle')
    .text('Sales by Region');

  // Add legend
  const legend = svg.selectAll('.legend')
    .data(colorScale.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => `translate(${width - margin.left - margin.right}, ${i * 20 + margin.top})`);

  legend.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', colorScale);

  legend.append('text')
    .attr('x', 15)
    .attr('y', 5)
    .style('font-size', '12px')
    .text(d => d);
});