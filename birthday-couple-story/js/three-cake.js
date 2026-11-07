/**
 * ThreeCake - 3D Korean Bento Cake with Romantic Pastel Styling (Slide 3)
 */

class CoupleCakeScene {
    constructor(containerId = 'couple-cake-viewport') {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cakeGroup = null;
        this.flameMesh = null;
        this.candleLight = null;
        this.smokeParticles = [];
        this.isBlown = false;

        this.isDragging = false;
        this.prevMouse = { x: 0, y: 0 };
        this.autoRotateSpeed = 0.0035;

        this.init();
    }

    init() {
        if (!this.container) return;

        this.scene = new THREE.Scene();

        const w = this.container.clientWidth || 320;
        const h = this.container.clientHeight || 280;
        this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
        this.camera.position.set(0, 3.4, 7.2);
        this.camera.lookAt(0, 0.4, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        const amb = new THREE.AmbientLight(0xffffff, 0.9);
        this.scene.add(amb);

        const dir = new THREE.DirectionalLight(0xffffff, 0.7);
        dir.position.set(4, 9, 6);
        this.scene.add(dir);

        const softPink = new THREE.DirectionalLight(0xfbcfe8, 0.45);
        softPink.position.set(-5, -2, -3);
        this.scene.add(softPink);

        this.buildCake();
        this.bindEvents();

        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    buildCake() {
        this.cakeGroup = new THREE.Group();
        this.scene.add(this.cakeGroup);

        // Piring Keramik Putih
        const plateGeo = new THREE.CylinderGeometry(2.4, 2.2, 0.15, 48);
        const plateMat = new THREE.MeshStandardMaterial({ color: 0xfafcff, roughness: 0.2 });
        const plate = new THREE.Mesh(plateGeo, plateMat);
        plate.position.y = -0.05;
        this.cakeGroup.add(plate);

        // Cake Tier (Soft Pastel Baby Blue)
        const cakeGeo = new THREE.CylinderGeometry(1.85, 1.85, 1.4, 48);
        const cakeMat = new THREE.MeshStandardMaterial({
            color: 0x93c5fd, // Soft powder blue
            roughness: 0.45,
            metalness: 0.05
        });
        const cake = new THREE.Mesh(cakeGeo, cakeMat);
        cake.position.y = 0.7;
        this.cakeGroup.add(cake);

        // Top Cream Frosting (Milk White)
        const topCreamGeo = new THREE.CylinderGeometry(1.88, 1.88, 0.16, 48);
        const topCreamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
        const topCream = new THREE.Mesh(topCreamGeo, topCreamMat);
        topCream.position.y = 1.45;
        this.cakeGroup.add(topCream);

        // Swirls Buttercream Pinggiran & Mutiara Hati Pink
        const swirls = 10;
        const rad = 1.55;
        for (let i = 0; i < swirls; i++) {
            const angle = (i / swirls) * Math.PI * 2;
            const swirlGeo = new THREE.SphereGeometry(0.16, 16, 16);
            swirlGeo.scale(1, 1.25, 1);
            const swirlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 });
            const swirl = new THREE.Mesh(swirlGeo, swirlMat);
            swirl.position.set(Math.cos(angle) * rad, 1.55, Math.sin(angle) * rad);
            this.cakeGroup.add(swirl);

            if (i % 2 === 0) {
                const heartPearlGeo = new THREE.SphereGeometry(0.08, 12, 12);
                const heartPearlMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.2 });
                const heartPearl = new THREE.Mesh(heartPearlGeo, heartPearlMat);
                heartPearl.position.set(Math.cos(angle) * (rad - 0.25), 1.58, Math.sin(angle) * (rad - 0.25));
                this.cakeGroup.add(heartPearl);
            }
        }

        // Lilin Pastel Kuning Hangat
        const candleGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.85, 24);
        const candleMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.3 });
        const candle = new THREE.Mesh(candleGeo, candleMat);
        candle.position.y = 1.95;
        this.cakeGroup.add(candle);

        // Sumbu Lilin
        const wickGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.1, 8);
        const wickMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
        const wick = new THREE.Mesh(wickGeo, wickMat);
        wick.position.y = 2.42;
        this.cakeGroup.add(wick);

        // Api Lilin (Teardrop Cone)
        const flameGeo = new THREE.ConeGeometry(0.08, 0.24, 16);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0xffa502, transparent: true, opacity: 0.95 });
        this.flameMesh = new THREE.Mesh(flameGeo, flameMat);
        this.flameMesh.position.y = 2.56;
        this.cakeGroup.add(this.flameMesh);

        // Cahaya Lilin (Point Light)
        this.candleLight = new THREE.PointLight(0xffb142, 1.2, 5);
        this.candleLight.position.set(0, 2.65, 0);
        this.cakeGroup.add(this.candleLight);
    }

    bindEvents() {
        const dom = this.renderer.domElement;

        const onDown = (cx, cy) => {
            this.isDragging = true;
            this.prevMouse = { x: cx, y: cy };
        };

        const onMove = (cx, cy) => {
            if (!this.isDragging || !this.cakeGroup) return;
            const deltaX = cx - this.prevMouse.x;
            this.cakeGroup.rotation.y += deltaX * 0.008;
            this.prevMouse = { x: cx, y: cy };
        };

        const onUp = () => {
            this.isDragging = false;
        };

        dom.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
        window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
        window.addEventListener('mouseup', onUp);

        dom.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) onDown(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) onMove(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });

        window.addEventListener('touchend', onUp);

        dom.addEventListener('click', () => {
            if (!this.isBlown && window.triggerCoupleCandleBlow) {
                window.triggerCoupleCandleBlow();
            }
        });
    }

    onResize() {
        if (!this.container || !this.renderer || !this.camera) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        if (w === 0 || h === 0) return;

        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    blowCandle(callback) {
        if (this.isBlown) return;
        this.isBlown = true;

        if (this.flameMesh && this.candleLight) {
            const startTime = performance.now();
            const dur = 400;

            const shrink = (now) => {
                const p = Math.min((now - startTime) / dur, 1);
                const s = 1 - p;
                this.flameMesh.scale.set(s, s, s);
                this.candleLight.intensity = 1.2 * (1 - p);

                if (p < 1) {
                    requestAnimationFrame(shrink);
                } else {
                    this.flameMesh.visible = false;
                    this.candleLight.visible = false;
                    this.spawnSmoke();
                    if (callback) callback();
                }
            };
            requestAnimationFrame(shrink);
        } else {
            if (callback) callback();
        }
    }

    spawnSmoke() {
        for (let i = 0; i < 10; i++) {
            const smokeGeo = new THREE.SphereGeometry(0.04 + Math.random() * 0.04, 8, 8);
            const smokeMat = new THREE.MeshBasicMaterial({ color: 0xf1f5f9, transparent: true, opacity: 0.6 });
            const s = new THREE.Mesh(smokeGeo, smokeMat);
            s.position.set((Math.random() - 0.5) * 0.05, 2.5 + Math.random() * 0.1, (Math.random() - 0.5) * 0.05);
            s.userData = {
                vx: (Math.random() - 0.5) * 0.006,
                vy: 0.015 + Math.random() * 0.012,
                vz: (Math.random() - 0.5) * 0.006,
                life: 1.0
            };
            this.cakeGroup.add(s);
            this.smokeParticles.push(s);
        }
    }

    animate(timestamp) {
        requestAnimationFrame(this.animate);

        if (!this.isDragging && this.cakeGroup) {
            this.cakeGroup.rotation.y += this.autoRotateSpeed;
        }

        if (!this.isBlown && this.flameMesh && this.candleLight) {
            const t = timestamp * 0.006;
            const flicker = Math.sin(t) * 0.15;
            this.flameMesh.scale.x = 1 + flicker * 0.4;
            this.flameMesh.scale.z = 1 + flicker * 0.4;
            this.flameMesh.scale.y = 1 + Math.sin(t * 2) * 0.12;
            this.candleLight.intensity = 1.1 + flicker * 0.25;
        }

        if (this.smokeParticles.length > 0) {
            for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
                const s = this.smokeParticles[i];
                s.position.x += s.userData.vx;
                s.position.y += s.userData.vy;
                s.position.z += s.userData.vz;
                s.scale.multiplyScalar(1.02);
                s.userData.life -= 0.015;
                s.material.opacity = s.userData.life * 0.6;

                if (s.userData.life <= 0) {
                    this.cakeGroup.remove(s);
                    this.smokeParticles.splice(i, 1);
                }
            }
        }

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
}

window.initCoupleCake = () => {
    window.coupleCake = new CoupleCakeScene('couple-cake-viewport');
};
