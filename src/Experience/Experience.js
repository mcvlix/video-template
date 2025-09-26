import * as THREE from "three";
import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from './Utils/Time.js'
import Resources from "./Utils/Resources.js";
import Mouse from "./Utils/Mouse.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import sources from "./sources.js";

import Controllers from "./Controllers.js";


let instance = null;

export default class Experience {

  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;
    // Global access
    window.experience = this;
    this.canvas = canvas;
    
    this.sampleBoolean = true;
    this.sampleNumber = 5;

    // this.debug = new Debug();
    // if (this.debug.active) {
    //   this.debugFolder = this.debug.ui.addFolder("experience");
    //   const debugObject = {
    //     sampleBoolean: this.sampleBoolean,
    //     sampleNumber: this.sampleNumber,
    //   };
    //   this.debugFolder.add(debugObject, "sampleBoolean").onChange((value) => {
    //     this.sampleBoolean = value;
    //     console.log(this.sampleBoolean);
    //   });
    //   this.debugFolder
    //     .add(debugObject, "sampleNumber")
    //     .min(0.5)
    //     .max(15)
    //     .onChange((value) => {
    //       this.sampleNumber = value;
    //       console.log(this.sampleNumber);
    //     });
    // }

    this.time = new Time();
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.world = new World();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.mouse = new Mouse();

    /**
     * Clock
     */
    this.clock = new THREE.Clock();
    this.clock.start();

    this.renderer.instance.setAnimationLoop(() => {
      this.time.tick();
      this.world.update();
      this.renderer.instance.render(this.scene, this.camera.instance);
    });

    this.controllers = new Controllers();

    window.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
    });

    

    this.sizes.on("resize", () => {
      this.resize();
      this.camera.resize();
      this.renderer.resize();
    });
    this.time.on("tick", () => {
      this.update();
    });

    /**
     * Raycaster
     */

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  
    this.scene.traverse((child) =>{
      if (child.name === "Dini") {
        this.dini = child;
        // Move dini to foreground by setting high renderOrder and disabling depth test
        this.dini.renderOrder = 999;
        this.dini.material.depthTest = false;
        this.dini.material.depthWrite = false;
        
        // Optional: Make it always face camera
        this.dini.lookAt(this.camera.instance.position);
        console.log("Found Dini object:", this.dini);
      }
      if (child.name === "Floor") {
        this.floor = child;
        console.log("Found Floor object:", this.floor);
      }
    })
    
    this.currentIntersect = null;

    this.rotationStartTime = null;
    this.rotationDuration = 3000; // 3 seconds to slow down (in milliseconds)
    this.initialRotationSpeed = -0.02; // Fast initial speed
    this.targetRotationSpeed = -0.0001; // Slow target speed
    this.initRadius = 10;
    this.radius = this.initRadius;
    
    // Separate rotation angle for floor
    this.floorAngle = 0;
    this.floorRotationSpeed = -0.0001; // Increased speed to make rotation more visible
  }

  resize() {
    console.log("resized occured");
    this.camera.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
  
    // Initialize once
    if (this.angle === undefined) this.angle = 0;
    if (this.rotationStartTime === null) {
      this.rotationStartTime = this.time.elapsed;
    }

    const elapsed = this.time.elapsed - this.rotationStartTime;
    const progress = Math.min(elapsed / this.rotationDuration, 1);

    // Ease-out cubic
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);

    // Rotation speed this frame for dini (if you still want it to rotate)
    const speed = this.initialRotationSpeed +
      (this.targetRotationSpeed - this.initialRotationSpeed) * easeOutCubic;

    // Accumulate angle (use delta time, not elapsed)
    this.angle += speed * this.time.delta;
    
    // Floor rotation (constant speed)
    this.floorAngle += this.floorRotationSpeed * this.time.delta;

    // Apply rotations
    if (this.dini) {
      // Desired screen position in NDC (x, y, z)
      const ndcPos = new THREE.Vector3(0.65, -0.2, 0); // 0.8 = near right edge, y=0 = middle
    
      // Unproject from NDC to world space
      ndcPos.unproject(this.camera.instance);
    
      // Move Dini toward the camera direction so it’s always visible
      const dir = ndcPos.sub(this.camera.instance.position).normalize();
      const distance = 5; // how far in front of the camera
      const worldPos = this.camera.instance.position.clone().add(dir.multiplyScalar(distance));
    
      // Apply position
      this.dini.position.copy(worldPos);
    
      // Scale relative to camera distance
      const baseScale = 0.3;
  const scaleFactor = baseScale * Math.max((window.innerWidth / 1920) * 1.2, 1);
      this.dini.scale.setScalar(scaleFactor);
    
      // Optionally face camera
      this.dini.lookAt(this.camera.instance.position);
    }
    
    
    if (this.floor) {
      this.floor.rotation.z = this.floorAngle;
      // Debug: Log rotation value occasionally
      if (Math.floor(this.time.elapsed) % 2 === 0 && Math.floor(this.time.elapsed * 10) % 10 === 0) {
        // console.log("Floor rotation:", this.floorAngle);
      }
    } else {
      // Try to find floor if not found yet
      this.scene.traverse((child) => {
        if (child.name === "Floor" || (child.isMesh && child.geometry.type === "PlaneGeometry")) {
          this.floor = child;
          // console.log("Floor found via traversal:", this.floor);
        }
      });
    }

    // const offset = new THREE.Vector3(
    //   Math.cos(this.angle) * this.radius, // X
    //   this.camera.instance.position.y,    // keep current camera height
    //   Math.sin(this.angle) * this.radius  // Z
    // );
    
    // // Set camera position relative to target
    // this.camera.instance.position.copy(this.camera.controls.target).add(offset);
    // this.camera.instance.lookAt(this.camera.controls.target);



    //change this to be controller if controller is active
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);

    this.intersects = this.raycaster.intersectObjects( this.dini );
    if(this.intersects.length)
      {
          if(!this.currentIntersect)
          {
              console.log('mouse enter')
          }
          this.currentIntersect = this.intersects[0]
      }
      else
      {
          if(this.currentIntersect)
          {
              console.log('mouse leave')
          }
          this.currentIntersect = null
      }
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();
    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
  getCamera(){
    return this.camera
  }
}