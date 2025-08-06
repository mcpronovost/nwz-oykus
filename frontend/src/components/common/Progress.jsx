import { useEffect, useRef } from "react";

export default function OykProgress({
  children,
  value = 0,
  values = null,
  max = 100,
  size = 48,
  borderSize = 4,
  colours = ["var(--oyk-c-primary)"],
  bgColour = "var(--oyk-card-fg)",
  className = "",
}) {
  const canvasRef = useRef(null);
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Convert CSS variables to actual colours
  const getComputedColour = (colour) => {
    if (colour.startsWith("var(--")) {
      // Extract the CSS variable name
      const varName = colour.match(/var\(([^)]+)\)/)[1];
      // Get the computed value from the document
      const computedValue = getComputedStyle(document.documentElement).getPropertyValue(varName);
      return computedValue.trim();
    }
    return colour;
  };

  // Convert CSS variables to actual colours
  const getComputedColours = () => {
    return colours.map((colour) => {
      return getComputedColour(colour);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size - borderSize) / 2;
    const computedColours = getComputedColours();

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = getComputedColour(bgColour);
    ctx.globalAlpha = 0.05;
    ctx.lineWidth = borderSize;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Draw progress segments
    if (computedColours.length === 1) {
      // Single colour - use the value prop
      const startAngle = -Math.PI / 2; // Start from top (12 o'clock)
      const endAngle = startAngle + (percentage / 100) * 2 * Math.PI;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = computedColours[0];
      ctx.lineWidth = borderSize;
      ctx.stroke();
    } else {
      // Multiple colours - use values array if provided, otherwise distribute evenly
      if (values && values.length === computedColours.length) {
        // Use provided values array - each value represents its percentage of the circle
        let currentAngle = -Math.PI / 2; // Start from top (12 o'clock)

        computedColours.forEach((colour, index) => {
          const segmentPercentage = values[index];

          if (segmentPercentage > 0) {
            const startAngle = currentAngle;
            const endAngle = startAngle + (segmentPercentage / 100) * 2 * Math.PI;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.strokeStyle = colour;
            ctx.lineWidth = borderSize;
            ctx.stroke();

            currentAngle = endAngle;
          }
        });
      } else {
        // Fallback to original logic - distribute evenly based on single value
        const segmentSize = 100 / computedColours.length;

        computedColours.forEach((colour, index) => {
          const segmentStart = index * segmentSize;
          const segmentEnd = (index + 1) * segmentSize;

          // Calculate how much of this segment should be filled
          let segmentPercentage = 0;

          if (percentage > segmentStart) {
            if (percentage >= segmentEnd) {
              // This segment is completely filled
              segmentPercentage = segmentSize;
            } else {
              // This segment is partially filled
              segmentPercentage = percentage - segmentStart;
            }
          }

          if (segmentPercentage > 0) {
            const startAngle = -Math.PI / 2 + (segmentStart / 100) * 2 * Math.PI;
            const endAngle = startAngle + (segmentPercentage / 100) * 2 * Math.PI;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.strokeStyle = colour;
            ctx.lineWidth = borderSize;
            ctx.stroke();
          }
        });
      }
    }
  }, [value, max, size, borderSize, colours, values, percentage]);

  return (
    <div
      className={`oyk-progress ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <canvas ref={canvasRef} width={size} height={size} className="oyk-progress-canvas" />

      {/* Children content */}
      {children && <div className="oyk-progress-content">{children}</div>}
    </div>
  );
}
