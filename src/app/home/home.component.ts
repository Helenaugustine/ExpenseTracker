import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearlycardsService, YearlySnapshotDto } from '../services/yearlycards.service';
import { SavingsService, ShowSavings } from '../services/savings.service';
import { ExpenseService } from '../services/expense.service';
import { IncomeService } from '../services/income.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  snapshot: YearlySnapshotDto | null = null;
  savings: ShowSavings[] = [];
  expenses: any[] = [];
  incomes: any[] = [];
  chartInstances: Chart[] = [];
  viewInitialized = false;

  @ViewChild('platformChart') platformChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('typeChart') typeChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('expenseChart') expenseChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('incomeChart') incomeChartRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private yearlycardsService: YearlycardsService,
    private savingsService: SavingsService,
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) { }

  ngOnInit(): void {
    const year = new Date().getFullYear();

    this.yearlycardsService.getSnapshot(year).subscribe({
      next: data => this.snapshot = data,
      error: err => console.error('Snapshot error:', err)
    });

    this.savingsService.getSavings().subscribe({
      next: data => {
        this.savings = data;
        if (this.viewInitialized) this.renderCharts();
      },
      error: err => console.error('Savings error:', err)
    });

    this.expenseService.getExpense().subscribe({
      next: data => {
        this.expenses = data;
        if (this.viewInitialized) this.renderCharts();
      },
      error: err => console.error('Expense error:', err)
    });

    this.incomeService.getIncomes().subscribe({
      next: data => {
        this.incomes = data;
        if (this.viewInitialized) this.renderCharts();
      },
      error: err => console.error('Income error:', err)
    });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.renderCharts();
  }

  renderCharts(): void {
    if (
      !this.platformChartRef ||
      !this.typeChartRef ||
      !this.expenseChartRef ||
      !this.incomeChartRef
    ) return;

    // 🔄 Clear previous chart instances
    this.chartInstances.forEach(chart => chart.destroy());
    this.chartInstances = [];

    
    const colors = [
      '#FF1744', // Fluorescent crimson
      '#00FF00', // Neon green
      '#C300FF', // Electric purple
      '#FFFF00', // Bright yellow
      '#00FFCC', // Aqua neon
      '#FF69B4', // Hot pink
      '#FF9100', // Vibrant orange
      '#FF3D00'  // Fluorescent red-orange
    ];

    const groupDataFrom = (data: any[], field: string) => {
      const map = new Map<string, number>();
      data.forEach(item => {
        const key = item[field] || 'Unknown';
        map.set(key, (map.get(key) || 0) + item.amount);
      });
      return {
        labels: Array.from(map.keys()),
        values: Array.from(map.values())
      };
    };

    const charts = [
      {
        ref: this.platformChartRef,
        title: 'Savings by Platform',
        data: groupDataFrom(this.savings, 'platform')
      },
      {
        ref: this.typeChartRef,
        title: 'Savings by Type',
        data: groupDataFrom(this.savings, 'type')
      },
      {
        ref: this.expenseChartRef,
        title: 'Expenses by Category',
        data: groupDataFrom(this.expenses, 'categoryName')
      },
      {
        ref: this.incomeChartRef,
        title: 'Income by Source',
        data: groupDataFrom(this.incomes, 'source')
      }
    ];

    charts.forEach(chart => {
      if (chart.ref && chart.data.labels.length) {
        const instance = new Chart(chart.ref.nativeElement, {
          type: 'doughnut',
          data: {
            labels: chart.data.labels,
            datasets: [{
              data: chart.data.values,
              backgroundColor: colors,
              hoverOffset: 6
            }]
          },
          options: {
            responsive: true,
            cutout: '75%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  padding: 16,
                  boxWidth: 10
                }
              },
              tooltip: {
                callbacks: {
                  label: (ctx) => `₹ ${ctx.raw}`
                }
              }
            }
          }
        });

        this.chartInstances.push(instance);
      }
    });
  }
}
