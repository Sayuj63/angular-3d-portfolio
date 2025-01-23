import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  verificationUrl?: string;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss'
})
export class CertificatesComponent {
  certificates: Certificate[] = [
    {
      title: 'Angular Development',
      issuer: 'Coursera',
      date: 'Jan 2024',
      imageUrl: 'assets/images/cert-angular.jpg',
      verificationUrl: 'https://coursera.org/verify/your-cert'
    },
    {
      title: 'Full Stack Development',
      issuer: 'Udemy',
      date: 'Dec 2023',
      imageUrl: 'assets/images/cert-fullstack.jpg',
      verificationUrl: 'https://udemy.com/certificate/your-cert'
    },
    // Add more certificates as needed
  ];
}