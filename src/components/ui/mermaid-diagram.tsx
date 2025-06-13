'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Copy, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface MermaidDiagramProps {
  diagram: string;
  title: string;
  description?: string;
}

export function MermaidDiagram({ diagram, title, description }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(diagram.includes('sequenceDiagram') ? 0.7 : 1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadMermaid = async () => {
      const mermaid = (await import('mermaid')).default;

      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        themeVariables: {
          primaryColor: '#0f172a',
          primaryTextColor: '#f8fafc',
          primaryBorderColor: '#334155',
          lineColor: '#64748b',
          secondaryColor: '#f1f5f9',
          tertiaryColor: '#e2e8f0',
          background: '#ffffff',
          mainBkg: '#ffffff',
          secondBkg: '#f8fafc',
          tertiaryBkg: '#f1f5f9',
        },
        securityLevel: 'loose',
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true,
          padding: 10,
        },
        sequence: {
          useMaxWidth: false,
          wrap: true,
          width: 1200,
          height: 600,
          actorMargin: 50,
          boxMargin: 10,
          messageMargin: 35,
          mirrorActors: true,
        },
        gantt: {
          useMaxWidth: false,
        },
      });

      if (containerRef.current) {
        try {
          const { svg } = await mermaid.render(`mermaid-${Date.now()}`, diagram);
          containerRef.current.innerHTML = svg;

          // Add click handlers to SVG elements for interactivity
          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.cursor = 'grab';
            svgElement.style.maxWidth = 'none';
            svgElement.style.height = 'auto';
            svgElement.style.display = 'block';
            svgElement.style.margin = '0 auto';
            
            // Ensure SVG has proper dimensions
            const bbox = svgElement.getBBox();
            if (bbox.width > 0 && bbox.height > 0) {
              svgElement.setAttribute('width', bbox.width.toString());
              svgElement.setAttribute('height', bbox.height.toString());
            }
          }
        } catch (error) {
          console.error('Error rendering Mermaid diagram:', error);
          containerRef.current.innerHTML = `
            <div class="text-destructive p-4">
              <p>Error rendering diagram: ${error}</p>
              <pre class="text-sm mt-2 bg-muted p-2 rounded">${diagram}</pre>
            </div>
          `;
        }
      }
    };

    loadMermaid();
  }, [diagram]);

  // Add non-passive wheel event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.max(0.3, Math.min(3, prev * delta)));
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(diagram);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy diagram:', error);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.3));
  };

  const handleReset = () => {
    setZoom(diagram.includes('sequenceDiagram') ? 0.7 : 1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 0.3}
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              title="Reset View"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              title="Copy Diagram Code"
            >
              <Copy className="h-4 w-4" />
              {copied && <span className="ml-1 text-xs">Copied!</span>}
            </Button>
          </div>
        </div>

        <div className="border rounded-lg bg-background overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="overflow-auto relative h-96 md:h-[600px]"
          >
            <div
              ref={containerRef}
              className="mermaid-container"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: '0 0',
                cursor: isDragging ? 'grabbing' : 'grab',
                width: 'fit-content',
                height: 'fit-content',
                minWidth: '100%',
                minHeight: '100%',
                padding: '20px',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-2">
          Use mouse wheel to zoom, drag to pan, or use the controls above
        </div>
      </CardContent>
    </Card>
  );
}
