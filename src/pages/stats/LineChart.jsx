import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useLayoutEffect, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

const lineColors = [
  am5.color("#d3584e"),
  am5.color("#5d71cd"),
  am5.color("#45B7D1"), // 파랑
  am5.color("#96CEB4"), // 초록
  am5.color("#DDA0DD"), // 연보라
  am5.color("#98D8C8"), // 민트
  am5.color("#F7DC6F")  // 금색
];


export default function LineChart({ id, data, xKey = 'time', loading = false }) {

  const chartDivRef = useRef(null);

  useLayoutEffect(() => {
    if (!chartDivRef.current) return;

    // Root 생성
    const root = am5.Root.new(chartDivRef.current);

    // 테마 설정
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      paddingLeft: 0,
      layout: root.verticalLayout
    }));

    // 데이터 변환 및 시리즈 정보 수집
    let processedData = [];
    let seriesInfo = new Set();

    data.forEach(item => {
      let dataPoint = { category: item[xKey] };

      // time을 제외한 나머지 속성들을 시리즈로 추가
      Object.keys(item).forEach(key => {
        if (key !== xKey) {
          dataPoint[key] = parseFloat(item[key]) || null;
          seriesInfo.add(key);
        }
      });

      processedData.push(dataPoint);
    });

    // X축 (카테고리축) 생성
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 50
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    // X축 라벨 회전 및 크기 설정
    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
      fontFamily: "Pretendard"
    });

    let colorIndex = 0;
    let seriesArray = [];

    // 각 센서별로 Y축과 시리즈 생성
    seriesInfo.forEach(sensorKey => {
      // 현재 색상을 변수에 저장 (클로저 문제 해결)
      let currentColor = lineColors[colorIndex % lineColors.length];

      // 각 시리즈마다 별도의 Y축 생성
      let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));

      // Y축 색상을 라인과 동일하게 설정 및 크기 설정
      yAxis.get("renderer").labels.template.setAll({
        fill: currentColor,
        fontSize: 12,
        fontFamily: "Pretendard"
      });

      // Y축 그리드 제거
      yAxis.get("renderer").grid.template.setAll({
        visible: false
      });

      let series = chart.series.push(am5xy.LineSeries.new(root, {
        name: sensorKey,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: sensorKey,
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{name}: {valueY}"
        })
      }));

      // 라인 스타일 및 색상 설정
      series.strokes.template.setAll({
        strokeWidth: 1.5,
        stroke: currentColor
      });

      // 시리즈의 fill과 stroke 속성 설정 (범례 색상을 위해 필요)
      series.set("fill", currentColor);
      series.set("stroke", currentColor);

      seriesArray.push(series);
      colorIndex++;

      // 첫 번째 라벨 숨기기 (데이터 설정 후)
      yAxis.get("renderer").labels.template.adapters.add("visible", function (visible, target) {
        const dataItem = target.dataItem;
        if (dataItem && dataItem.get("value") === 0) {
          return false; // ✅ Y축 0 값 숨김
        }
        return visible;
      });
    });

    // X축에 데이터 설정
    xAxis.data.setAll(processedData);

    // 각 시리즈에 데이터 설정
    seriesArray.forEach(series => {
      series.data.setAll(processedData);
    });

    // 커서 추가
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomX"
    }));
    cursor.lineY.set("visible", false);

    // 애니메이션 시작
    seriesArray.forEach(series => {
      series.appear(1000);
    });

    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50,
    }));

    legend.data.setAll(chart.series.values);

    legend.labels.template.setAll({
      fontSize: 14,
      fontFamily: "Pretendard"
    });
    chart.appear(1000, 100);

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