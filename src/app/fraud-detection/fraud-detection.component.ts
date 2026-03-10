import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FraudDetectionService, Transaction, FraudAlert } from '../Services/fraud-detection.service';

@Component({
  selector: 'app-fraud-detection',
  templateUrl: './fraud-detection.component.html',
  styleUrls: ['./fraud-detection.component.css']
})
export class FraudDetectionComponent implements OnInit {
  suspiciousTransactions: Transaction[] = [];
  fraudAlerts: FraudAlert[] = [];
  statistics: any = {};
  user: any;
  selectedTab: string = 'overview';

  constructor(
    private fraudService: FraudDetectionService,
    private router: Router
  ) {
    this.user = localStorage.getItem("currentUser");
  }

  ngOnInit(): void {
    if (!localStorage.getItem("currentAcno")) {
      alert("Please login to access fraud detection dashboard");
      this.router.navigateByUrl("");
      return;
    }
    this.loadFraudData();
  }

  loadFraudData() {
    this.fraudService.getSuspiciousTransactions().subscribe(
      (transactions) => {
        this.suspiciousTransactions = transactions;
      }
    );

    this.fraudService.getFraudAlerts().subscribe(
      (alerts) => {
        this.fraudAlerts = alerts;
      }
    );

    this.fraudService.getFraudStatistics().subscribe(
      (stats) => {
        this.statistics = stats;
      }
    );
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  resolveAlert(alertId: string) {
    if (confirm('Are you sure you want to resolve this alert?')) {
      this.fraudService.resolveAlert(alertId).subscribe(
        (result) => {
          alert('Alert resolved successfully');
          this.loadFraudData();
        }
      );
    }
  }

  getSeverityClass(severity: string): string {
    switch(severity) {
      case 'critical': return 'severity-critical';
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      default: return 'severity-low';
    }
  }

  getRiskClass(score?: number): string {
    if (!score) return 'risk-low';
    if (score >= 85) return 'risk-critical';
    if (score >= 70) return 'risk-high';
    if (score >= 50) return 'risk-medium';
    return 'risk-low';
  }

  goToDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentAcno");
    localStorage.removeItem("token");
    this.router.navigateByUrl("");
  }
}
