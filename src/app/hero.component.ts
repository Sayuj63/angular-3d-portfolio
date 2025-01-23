import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <canvas #canvas class="webgl"></canvas>
      <div class="hero-content">
        <h1>Hi, I'm Sayuj</h1>
        <p class="subtitle">Shopify Theme Developer & Designer</p>
        <p class="description">
          I create custom Shopify experiences and modern e-commerce solutions
        </p>
        <div class="cta-buttons">
          <button class="primary-btn">View My Work</button>
          <button class="secondary-btn">Start a Project</button>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private geometry!: THREE.TorusGeometry;
  private material!: THREE.MeshStandardMaterial;
  private mesh!: THREE.Mesh;

  ngOnInit() {
    this.initScene();
    this.animate();
  }

  private initScene() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Create Shopify-inspired floating torus
    this.geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    this.material = new THREE.MeshStandardMaterial({ 
      color: '#95BF47',
      metalness: 0.7,
      roughness: 0.2
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // Add lights
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    
    this.scene.add(this.mesh, pointLight, ambientLight);
    this.camera.position.z = 30;

    // Animation
    gsap.to(this.mesh.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 8,
      ease: "none",
      repeat: -1
    });
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}