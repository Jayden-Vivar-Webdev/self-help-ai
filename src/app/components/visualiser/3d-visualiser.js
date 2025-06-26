import * as THREE from "three";

export function Visualiser(container) {
  if (!container) return;

  // Clear container if needed
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const scene = new THREE.Scene();
  const width = container.clientWidth;
  const height = container.clientHeight;

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
  camera.position.z = 1000;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  const outerRadius = 340;
  const innerRadius = 300;
  const numPoints = 10000;

  const outerGeometry = generateParticleSphere(numPoints, outerRadius);
  const outerMaterial = new THREE.PointsMaterial({
    color: 0x155dfc,
    size: 5,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const outerPoints = new THREE.Points(outerGeometry, outerMaterial);
  scene.add(outerPoints);

  const outerPositions = outerGeometry.attributes.position.array;
  const outerBasePositions = new Float32Array(outerPositions.length);
  outerBasePositions.set(outerPositions);

  const innerGeometry = generateParticleSphere(numPoints, innerRadius);
  const innerMaterial = new THREE.PointsMaterial({ color: 0x9d00ff, size: 2 });
  const innerPoints = new THREE.Points(innerGeometry, innerMaterial);
  scene.add(innerPoints);

  const innerPositions = innerGeometry.attributes.position.array;
  const innerBasePositions = new Float32Array(innerPositions.length);
  innerBasePositions.set(innerPositions);

  // Declare these in outer scope so both startListening and stop can access them
  let audioCtx = null;
  let source = null;
  let analyser = null;
  let dataArray = null;
  let mediaStream = null;

  function animate() {
    requestAnimationFrame(animate);
  
    const time = performance.now() * 0.002;
    const rippleAmplitude = 100;
  
    // Use real data if available, else fallback to soft default
    let avg = 10;
    if (analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      avg = sum / dataArray.length;
    }
  
    const outerScale = 1 + avg / 300;
    const innerScale = 1 + avg / 330;
  
    for (let i = 0; i < outerPositions.length; i += 3) {
      const baseX = outerBasePositions[i];
      const baseY = outerBasePositions[i + 1];
      const baseZ = outerBasePositions[i + 2];
  
      const length = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ);
      const dirX = baseX / length;
      const dirY = baseY / length;
      const dirZ = baseZ / length;
  
      const offset = Math.sin(time + i) * rippleAmplitude;
  
      outerPositions[i] = (baseX + dirX * offset) * outerScale;
      outerPositions[i + 1] = (baseY + dirY * offset) * outerScale;
      outerPositions[i + 2] = (baseZ + dirZ * offset) * outerScale;
    }
    outerGeometry.attributes.position.needsUpdate = true;
  
    for (let i = 0; i < innerPositions.length; i += 3) {
      innerPositions[i] = innerBasePositions[i] * innerScale;
      innerPositions[i + 1] = innerBasePositions[i + 1] * innerScale;
      innerPositions[i + 2] = innerBasePositions[i + 2] * innerScale;
    }
    innerGeometry.attributes.position.needsUpdate = true;
  
    outerPoints.rotation.y += 0.001;
    outerPoints.rotation.x += 0.001;
    innerPoints.rotation.y += 0.001;
    innerPoints.rotation.x += 0.001;
  
    renderer.render(scene, camera);
  }
  

  animate(); // Always run animation loop

  function startListening() {
    if (analyser) return; // already started

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaStream = stream;
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      source = audioCtx.createMediaStreamSource(stream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    }).catch((e) => {
      console.error("Audio permission error:", e);
    });
  }

  function stop() {
    if (source) {
      source.disconnect();
      source = null;
    }
  
    if (analyser) {
      analyser.disconnect();
      analyser = null;
    }
  
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
  
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }

    dataArray = null;
  }

  return {
    startListening,
    stop,
  };
}

function generateParticleSphere(count, radius) {
  const positions = [];

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions.push(x, y, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}
