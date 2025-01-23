import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  projects: Project[] = [
    {
      title: 'Project One',
      description: 'A comprehensive web application that helps users track their daily tasks and manage their time effectively.',
      technologies: ['Angular', 'TypeScript', 'Firebase'],
      imageUrl: 'assets/images/project1.jpg',
      liveUrl: 'https://project1.com',
      githubUrl: 'https://github.com/yourusername/project1'
    },
    {
      title: 'Project Two',
      description: 'An e-commerce platform built with modern web technologies.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      imageUrl: 'assets/images/project2.jpg',
      liveUrl: 'https://project2.com',
      githubUrl: 'https://github.com/yourusername/project2'
    },
    // Add more projects as needed
  ];
}