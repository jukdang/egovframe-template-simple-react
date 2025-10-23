import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";


const pieColors = [
  am5.color("#e47f7a"),
  am5.color("#7086e2"),
  am5.color("#7cdbca"),
  am5.color("#fbcd7b"),
  am5.color("#b5c8f7"),
  am5.color("#efb0ed"),
];

export default function PieChart({ id, data, xKey = "time", loading = false }) {
  const chartDivRef = useRef(null);

  useLayoutEffect(() => {
    if (!chartDivRef.current) return;

    // Create root element
    const root = am5.Root.new(chartDivRef.current);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(90),
        innerRadius: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );

    // Create series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "건수",
        categoryField: xKey,
        alignLabels: false,
      })
    );

    series.labels.template.setAll({
      visible: false,
      fontSize: 12,
      fontFamily: "Pretendard",
    });

    series.ticks.template.set("visible", false);

    // 컬러 세팅
    series.get("colors").set("colors", pieColors.map((c) => am5.color(c)));

    series.data.setAll(data);

    // Legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout,
        paddingLeft: 20,
      })
    );

    legend.labels.template.setAll({
      maxWidth: 140,
      width: 140,
      fontSize: 12,
      oversizedBehavior: "wrap",
      text: "",
      fontFamily: "Pretendard",
    });

    legend.valueLabels.template.setAll({
      visible: true,
      fontSize: 12,
      paddingLeft: 0,
    });

    legend.labels.template.adapters.add("text", (text, target) => {
      const dataItem = target.dataItem;
      if (!dataItem) return text;
      const category = dataItem.get("category");
      const value = dataItem.get("value");
      return category + " : " + value + " 건";
    });

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);


    // Clean up on unmount
    return () => {
      root.dispose();
    };
  }, [data, id, xKey]); // data가 바뀌면 차트 갱신

  return (
    <div ref={chartDivRef} className="graph_area" id={id} style={{ width: "100%", height: "300px", position: "relative" }}>
      {loading && <LoadingSpinner />}
    </div>
  );
}

