import { useEffect, useRef } from "react";
import ChartJS from "chart.js/auto";

export default function Chart() {
  const canvasRef = useRef();
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: ["Rent", "Groceries", "Utilities", "Entertainment"],
        datasets: [{ label: "Amount", data: [1200, 350, 150, 200] }],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, []);

  return (
    <div className="w-full h-64 relative">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}