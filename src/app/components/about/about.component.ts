import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  skills: string[] = [
    'Shopify Liquid',
    'Theme Development',
    'Store Setup',
    'Custom Apps',
    'JavaScript',
    'HTML/CSS',
    'React',
    'UI/UX Design',
    'Theme Customization',
    'E-commerce',
    'Performance Optimization',
    'Responsive Design'
  ];
}