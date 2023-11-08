import * as THREE from "three";

export class Gift {
    mesh: THREE.Mesh;
    geometry: THREE.BufferGeometry;
    material: THREE.MeshBasicMaterial;
    

    constructor() {
        this.geometry = new THREE.BoxGeometry(2, 2);
        this.material = new THREE.MeshBasicMaterial({color:THREE.Color.NAMES.aliceblue});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = 0;
        this.mesh.position.y = 0;
    }
}