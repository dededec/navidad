import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Gift } from './gift';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit, AfterViewInit {

  // Canvas
  @ViewChild('div')
  private divRef: ElementRef;
  private get div(): HTMLCanvasElement {
    return this.divRef.nativeElement;
  }

  // Canvas
  @ViewChild('canvas')
  private canvasRef: ElementRef;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  // Scene
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  loader!: GLTFLoader;
  light!: THREE.AmbientLight;

  // Camera
  camera!: THREE.PerspectiveCamera;
  cameraZ: number = 2;
  cameraY: number = 0.1;
  cameraX: number = 0;
  fov = 20;
  near = 1.0;
  far = 1000.0;

  constructor() {
    this.loader = new GLTFLoader();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

  private createScene() {
    this.scene = new THREE.Scene();

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(this.fov, aspectRatio, this.near, this.far);
    this.camera.position.x = this.cameraX;
    this.camera.position.y = this.cameraY;
    this.camera.position.z = this.cameraZ;


    this.loader.load('assets/gift/scene.gltf', (gltf) => {

      this.scene.add(gltf.scene);

    }, undefined, function (error) {

      console.error(error);

    });

    this.light = new THREE.AmbientLight(THREE.Color.NAMES.white, 15);
    this.light.rotateOnAxis(new THREE.Vector3(1, 0, 0), 10);
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
    this.renderer.setClearColor(0x00000, 0);
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', () => this.onWindowResize());
  }

  private startRenderingLoop() {
    this.renderer.setAnimationLoop(() => {
      this.scene.rotateY(0.05);
      this.renderer.render(this.scene, this.camera);
    });
  }

  private getAspectRatio() {
    return window.innerWidth / window.innerHeight;
  }

  private onWindowResize() {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}
