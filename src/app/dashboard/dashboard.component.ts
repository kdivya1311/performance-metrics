import { Component } from "@angular/core";
import { ChartData, ChartOptions } from "chart.js";
import { Perfomance } from "../types";
import { APIService } from "../services/api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  public barChartData?: ChartData<"bar">;

  public barChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Employees Bar chart",
      },
      legend: {
        position: "top",
      },
    },
  };

  // Pie chart properties
  public pieChartData?: ChartData<"pie", number[], string>;
  public pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Performance metrics of Employees",
      },
      legend: {
        position: "top",
      },
    },
  };

  constructor(private readonly apiService: APIService) {
    this.apiService.getPerformace().subscribe((data) => {
      this.pieChartData = this.mapPieData(data);
      this.barChartData = this.mapBarChart(data);
    });
  }

  mapBarChart = (performance: Perfomance) => {
    const { labels, values: data } = performance.bar;
    const colors = this.colorGen(data.length);
    return {
      labels,
      datasets: data.map((value, index) => {
        return {
          label: value.label,
          data: value.data,
          backgroundColor: `rgba(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]}, 0.5)`,
          borderColor: `rgba(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]}, 1)`,
          borderWidth: 1,
        };
      }),
    };
  };

  mapPieData = (performance: Perfomance) => {
    const { labels, values: data } = performance.pie;
    const colors = this.colorGen(labels.length);
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: this.colorWithAlpha(colors, 0.6),
          borderColor: this.colorWithAlpha(colors, 1),
          borderWidth: 1,
        },
      ],
    };
  };

  colorGen = (total: number) => {
    const result = [];
    for (let i = 0; i < total; i++) {
      result.push([
        Math.random() * 255,
        Math.random() * 255,
        Math.random() * 255,
      ]);
    }
    return result;
  };

  colorWithAlpha = (colors: number[][], alpha: number) => {
    return colors.map(
      (color) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`
    );
  };
}
