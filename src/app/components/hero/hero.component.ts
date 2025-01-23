import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <canvas #canvas class="webgl"></canvas>
      <div class="hero-content">
        <h1>Hi, I'm Sayuj</h1>
        <p class="subtitle">Shopify Theme Developer</p>
        <p class="description">
          Crafting beautiful & high-converting Shopify stores
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
export class HeroComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private geometry!: THREE.TorusGeometry;
  private material!: THREE.MeshStandardMaterial;
  private mesh!: THREE.Mesh;

  constructor() {}

  ngOnInit(): void {
    // Initialize non-DOM related stuff
  }

  ngAfterViewInit(): void {
    // Wait for next tick to ensure canvas is available
    setTimeout(() => {
      this.createScene();
      this.animate();
    }, 0);
  }

  private createScene(): void {
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Torus
    this.geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x95BF47,
      metalness: 0.7,
      roughness: 0.2
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.scene.add(this.mesh);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = false;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 2;

    // Environment and Lights
    this.addEnvironment();
    this.addLights();

    // Animation
    gsap.to(this.mesh.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 8,
      ease: "none",
      repeat: -1
    });

    // Resize handler
    window.addEventListener('resize', () => this.onWindowResize());
  }

  private addEnvironment(): void {
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x002E25,
      metalness: 0.5,
      roughness: 0.1
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -5;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Environment map
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const environmentMap = cubeTextureLoader.load([
      'assets/envmap/px.png',
      'assets/envmap/nx.png',
      'assets/envmap/py.png',
      'assets/envmap/ny.png',
      'assets/envmap/pz.png',
      'assets/envmap/nz.png'
    ]);
    this.scene.environment = environmentMap;
    this.scene.background = new THREE.Color(0x002E25);
  }

  private addLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(10, 10, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    this.scene.add(mainLight);

    const colors = [0x95BF47, 0x5E8E3E, 0xffffff];
    colors.forEach((color, index) => {
      const light = new THREE.PointLight(color, 1, 20);
      light.position.set(
        Math.cos(index * Math.PI * 2 / 3) * 5,
        2,
        Math.sin(index * Math.PI * 2 / 3) * 5
      );
      this.scene.add(light);
    });
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    
    if (this.controls) {
      this.controls.update();
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  private onWindowResize(): void {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}