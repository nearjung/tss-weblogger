import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CarLogger } from '../../../../../public/models/car-logger.model';
import { Subscription } from 'rxjs';
import { ApexOptions, ChartComponent, NgxApexchartsModule } from 'ngx-apexcharts';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-logger',
  imports: [ FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule
    , ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule
    , MatToolbarModule, NgxApexchartsModule],
  templateUrl: './logger.component.html',
  styleUrl: './logger.component.scss'
})
export class LoggerComponent implements OnInit , OnDestroy {

  @ViewChild('chart') chart!: ChartComponent;

  showRoutePath: boolean = true;
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  svgPoints = '';
  startPoint = { x: 0, y: 0, lat: 0, long: 0 };
  // endPoint = { x: 0, y: 0, lat: 0, long: 0 };
  hasRouteData = false;
  trackImage: string | null = null;
  pageSize = 10; // จำนวนแถวต่อหน้า
  currentPageData: CarLogger[] = []; // ข้อมูลของหน้าที่กำลังดู
  currentPage = 1; // หน้าปัจจุบัน
  showPageDataOnly = true; // แสดงเฉพาะข้อมูลของหน้าที่เลือก
  private subscriptions: Subscription[] = [];
  areaSmoothChart: Partial<ApexOptions>;
  areaSmoothChartMaps: Partial<ApexOptions>;
  allLogger: CarLogger[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
    // private dataProcessingService: DataProcessingService,
    // private webSocketService: WebSocketService
  ) {
    // const perms = this.authService.getPermissions();
    // this.canEditMatch = perms.canEditMatch;
    // this.canAddRacer = perms.canAddRacer;
    this.areaSmoothChart = {
      series: [
        {
          name: 'series1',
          data: []
        }
      ],
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: []
      },
      tooltip: {
        x: {
          format: 'HH:mm:ss'
        }
      }
    };

    this.areaSmoothChartMaps = {
      series: [
        {
          name: 'Route Path',
          data: []
        }
      ],
      chart: {
        type: 'line',
        height: 400,
        zoom: { enabled: true }
      },
      xaxis: {
        type: 'numeric',
        title: { text: 'Longitude' }
      },
      yaxis: {
        title: { text: 'Latitude' }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      }
    };
  }

  ngOnInit() {
    // this.loadEvent();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
    // this.wsSubscriptions.forEach(sub => sub.unsubscribe());

    // // ปิด WebSocket connection
    // this.webSocketService.disconnect();
  }

  navigateToDashboard(){
    this.router.navigate(['/pages', 'dashboard']);
  }


  // navigateToInsertOrUpdate(){
  //   this.router.navigate(['/pages', 'logger/add-logger']);
  // }

  formatGpsTimeToText(timeStr: string): string {
    const hour = timeStr.slice(0, 2);
    const minute = timeStr.slice(2, 4);
    const secRaw = parseFloat(timeStr.slice(4));
    const second = Math.floor(secRaw).toString().padStart(2, '0');
    const millis = Math.round((secRaw % 1) * 1000).toString().padStart(3, '0');

    return `${hour}:${minute}:${second}:${millis}`;
  }

  formatToTimeLabel(timeStr: string): string {
    const hour = timeStr.slice(0, 2);
    const minute = timeStr.slice(2, 4);
    const second = Math.floor(parseFloat(timeStr.slice(4))).toString().padStart(2, '0');

    return `${hour}:${minute}:${second}`;
  }


  updateChartWithData(logs: CarLogger[]): void {
    // ใช้ข้อมูลเฉพาะ 1000 จุดล่าสุดเพื่อไม่ให้กราฟช้า
    const recentLogs = logs.slice(-1000);

    const dataVelocity = recentLogs.map(log => ({
      x: this.formatGpsTimeToText(log.time),
      y: parseFloat(log.velocity.toString())
    }));

    const dataHeight = recentLogs.map(log => ({
      x: this.formatGpsTimeToText(log.time),
      y: parseFloat(log.height)
    }));

    this.areaSmoothChart.series = [
      {
        name: 'velocity',
        data: dataVelocity
      },
      {
        name: 'height',
        data: dataHeight
      }
    ];


    this.areaSmoothChart.xaxis = {
      categories: recentLogs.map(log => this.formatToTimeLabel(log.time))
    };

    if (this.chart) {
      this.chart.updateOptions({
        series: this.areaSmoothChart.series,
        xaxis: this.areaSmoothChart.xaxis
      });
    }

    // อัพเดทแผนที่ด้วยข้อมูลทั้งหมด
    this.updateMapWithAllData();
  }
    // ฟังก์ชันสำหรับสลับโหมดการแสดงกราฟ
  onToggleChartMode(): void {
    console.log('Toggle chart mode:', this.showPageDataOnly);

    if (this.showPageDataOnly) {
      // แสดงเฉพาะข้อมูลของหน้าที่เลือก
      this.updateChartWithPageData(this.currentPageData);
    } else {
      // แสดงข้อมูลทั้งหมด (1000 จุดล่าสุด)
      if (this.allLogger.length > 0) {
        this.updateChartWithData(this.allLogger);
      }
    }
  }

    // ฟังก์ชันใหม่สำหรับอัพเดทกราฟด้วยข้อมูลของหน้าที่เลือก
  updateChartWithPageData(pageData: CarLogger[]): void {
    if (!pageData || pageData.length === 0) {
      // ถ้าไม่มีข้อมูล ให้ล้างกราฟ
      this.areaSmoothChart.series = [
        { name: 'velocity', data: [] },
        { name: 'height', data: [] }
      ];
      this.areaSmoothChart.xaxis = { categories: [] };

      if (this.chart) {
        this.chart.updateOptions({
          series: this.areaSmoothChart.series,
          xaxis: this.areaSmoothChart.xaxis
        });
      }
      return;
    }

    const dataVelocity = pageData.map(log => ({
      x: this.formatGpsTimeToText(log.time),
      y: parseFloat(log.velocity.toString())
    }));

    const dataHeight = pageData.map(log => ({
      x: this.formatGpsTimeToText(log.time),
      y: parseFloat(log.height)
    }));

    this.areaSmoothChart.series = [
      {
        name: 'velocity',
        data: dataVelocity
      },
      {
        name: 'height',
        data: dataHeight
      }
    ];

    this.areaSmoothChart.xaxis = {
      categories: pageData.map(log => this.formatToTimeLabel(log.time))
    };

    if (this.chart) {
      this.chart.updateOptions({
        series: this.areaSmoothChart.series,
        xaxis: this.areaSmoothChart.xaxis
      });
    }

    // อัพเดทแผนที่ด้วยข้อมูลของหน้าที่เลือก
    this.updateMapWithPageData(pageData);
  }

  // ฟังก์ชันใหม่สำหรับอัพเดทแผนที่ด้วยข้อมูลของหน้าที่เลือก
  updateMapWithPageData(pageData: CarLogger[]): void {
    if (!pageData || pageData.length === 0) {
      // ล้างแผนที่
      this.areaSmoothChartMaps.series = [
        { name: 'Route Path', data: [] }
      ];
      return;
    }

    // สร้างเส้นทางจากข้อมูล GPS
    const pathData = pageData
      .filter(log => log.lat && log.long) // กรองเฉพาะข้อมูลที่มี lat, long
      .map(log => ({
        x: parseFloat(log.long), // longitude
        y: parseFloat(log.lat)   // latitude
      }))
      .filter(point => !isNaN(point.x) && !isNaN(point.y)); // กรองข้อมูลที่ไม่ถูกต้อง

    console.log('GPS Path Data:', pathData);

    this.areaSmoothChartMaps = {
      series: [
        {
          name: 'Route Path',
          data: pathData
        }
      ],
      chart: {
        type: 'line',
        height: 400,
        zoom: { enabled: true }
      },
      xaxis: {
        type: 'numeric',
        title: { text: 'Longitude' }
      },
      yaxis: {
        title: { text: 'Latitude' }
      },
      stroke: {
        curve: 'smooth',
        width: 3,
        colors: ['#007bff']
      },
      markers: {
        size: 4,
        colors: ['#007bff'],
        strokeColors: '#fff',
        strokeWidth: 2
      },
      tooltip: {
        x: {
          formatter: function(val) {
            return 'Longitude: ' + val.toFixed(6);
          }
        },
        y: {
          formatter: function(val) {
            return 'Latitude: ' + val.toFixed(6);
          }
        }
      }
    };
  }

  // ฟังก์ชันสำหรับอัพเดทแผนที่ด้วยข้อมูลทั้งหมด
  updateMapWithAllData(): void {
    if (!this.allLogger || this.allLogger.length === 0) {
      return;
    }

    // ใช้ข้อมูลทั้งหมดหรือ 1000 จุดล่าสุด
    const mapData = this.allLogger.slice(-1000);
    this.updateMapWithPageData(mapData);
  }

  onMouseEnterZoom() {
    document.body.style.overflow = 'hidden';
  }

  onMouseLeaveZoom() {
    document.body.style.overflow = 'auto';
  }


}
