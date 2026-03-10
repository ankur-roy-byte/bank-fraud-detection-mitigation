import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Transaction {
  id: string;
  acno: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  timestamp: Date;
  location?: string;
  riskScore?: number;
  status?: 'normal' | 'suspicious' | 'blocked';
}

export interface FraudAlert {
  id: string;
  acno: string;
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  transaction?: Transaction;
}

@Injectable({
  providedIn: 'root'
})
export class FraudDetectionService {
  private suspiciousTransactions: Transaction[] = [];
  private fraudAlerts: FraudAlert[] = [];

  constructor(private http: HttpClient) {
    this.initializeDemoData();
  }

  // Initialize demo data for fraud detection feature
  private initializeDemoData() {
    const demoTransactions: Transaction[] = [
      {
        id: 'txn001',
        acno: '1000',
        amount: 25000,
        type: 'withdraw',
        timestamp: new Date(Date.now() - 3600000),
        location: 'Unknown',
        riskScore: 85,
        status: 'suspicious'
      },
      {
        id: 'txn002',
        acno: '1001',
        amount: 50000,
        type: 'withdraw',
        timestamp: new Date(Date.now() - 7200000),
        location: 'Foreign',
        riskScore: 92,
        status: 'suspicious'
      },
      {
        id: 'txn003',
        acno: '1002',
        amount: 15000,
        type: 'withdraw',
        timestamp: new Date(Date.now() - 10800000),
        location: 'Local',
        riskScore: 45,
        status: 'normal'
      }
    ];

    const demoAlerts: FraudAlert[] = [
      {
        id: 'alert001',
        acno: '1000',
        reason: 'Large withdrawal from unusual location',
        severity: 'high',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: 'alert002',
        acno: '1001',
        reason: 'Multiple rapid transactions detected',
        severity: 'critical',
        timestamp: new Date(Date.now() - 7200000)
      },
      {
        id: 'alert003',
        acno: '1003',
        reason: 'Transaction pattern deviation detected',
        severity: 'medium',
        timestamp: new Date(Date.now() - 14400000)
      }
    ];

    this.suspiciousTransactions = demoTransactions;
    this.fraudAlerts = demoAlerts;
  }

  // Calculate risk score for a transaction
  calculateRiskScore(transaction: any): number {
    let riskScore = 0;

    // High amount transactions
    if (transaction.amount > 20000) {
      riskScore += 30;
    } else if (transaction.amount > 10000) {
      riskScore += 15;
    }

    // Withdrawal is riskier than deposit
    if (transaction.type === 'withdraw') {
      riskScore += 20;
    }

    // Time-based risk (late night transactions)
    const hour = new Date().getHours();
    if (hour >= 0 && hour <= 5) {
      riskScore += 25;
    }

    // Random factors for demo
    riskScore += Math.floor(Math.random() * 20);

    return Math.min(riskScore, 100);
  }

  // Analyze transaction for fraud
  analyzeTransaction(transaction: any): Observable<any> {
    const riskScore = this.calculateRiskScore(transaction);
    const status = riskScore > 70 ? 'suspicious' : 'normal';

    const analyzedTransaction: Transaction = {
      id: `txn${Date.now()}`,
      acno: transaction.acno,
      amount: transaction.amount,
      type: transaction.type,
      timestamp: new Date(),
      riskScore: riskScore,
      status: status
    };

    if (status === 'suspicious') {
      this.suspiciousTransactions.unshift(analyzedTransaction);

      const alert: FraudAlert = {
        id: `alert${Date.now()}`,
        acno: transaction.acno,
        reason: `High risk transaction detected (Risk Score: ${riskScore})`,
        severity: riskScore > 85 ? 'critical' : 'high',
        timestamp: new Date(),
        transaction: analyzedTransaction
      };
      this.fraudAlerts.unshift(alert);
    }

    return of({
      transaction: analyzedTransaction,
      riskScore: riskScore,
      status: status
    });
  }

  // Get all suspicious transactions
  getSuspiciousTransactions(): Observable<Transaction[]> {
    return of(this.suspiciousTransactions);
  }

  // Get all fraud alerts
  getFraudAlerts(): Observable<FraudAlert[]> {
    return of(this.fraudAlerts);
  }

  // Get fraud statistics
  getFraudStatistics(): Observable<any> {
    const totalAlerts = this.fraudAlerts.length;
    const criticalAlerts = this.fraudAlerts.filter(a => a.severity === 'critical').length;
    const highAlerts = this.fraudAlerts.filter(a => a.severity === 'high').length;
    const mediumAlerts = this.fraudAlerts.filter(a => a.severity === 'medium').length;
    const totalSuspiciousAmount = this.suspiciousTransactions
      .reduce((sum, txn) => sum + txn.amount, 0);

    return of({
      totalAlerts,
      criticalAlerts,
      highAlerts,
      mediumAlerts,
      totalSuspiciousAmount,
      averageRiskScore: this.suspiciousTransactions.length > 0
        ? this.suspiciousTransactions.reduce((sum, txn) => sum + (txn.riskScore || 0), 0) / this.suspiciousTransactions.length
        : 0
    });
  }

  // Mark alert as resolved
  resolveAlert(alertId: string): Observable<any> {
    this.fraudAlerts = this.fraudAlerts.filter(a => a.id !== alertId);
    return of({ message: 'Alert resolved successfully' });
  }
}
