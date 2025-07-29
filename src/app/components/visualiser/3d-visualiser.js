import * as THREE from "three";

export function Visualiser(container) {
  if (!container) return;

  // Clear container if needed
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const scene = new THREE.Scene();
  
  // Softer, more atmospheric fog
  scene.fog = new THREE.Fog(0x0f0f1a, 600, 3000);
  
  const width = container.clientWidth;
  const height = container.clientHeight;

  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 5000);
  camera.position.z = 1400;

  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Relaxing orb parameters - more spherical and contained
  const outerRadius = 350;
  const innerRadius = 280;
  const coreRadius = 220;
  const numPoints = 8000;
  const corePoints = 4000;

  // Outer layer - soft blue-white glow
  const outerGeometry = generateSmoothParticleSphere(numPoints, outerRadius);
  const outerMaterial = new THREE.PointsMaterial({
    color: 0x87ceeb, // Soft sky blue
    size: 3,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.4,
    sizeAttenuation: true
  });

  const outerPoints = new THREE.Points(outerGeometry, outerMaterial);
  scene.add(outerPoints);

  const outerPositions = outerGeometry.attributes.position.array;
  const outerBasePositions = new Float32Array(outerPositions.length);
  outerBasePositions.set(outerPositions);

  // Inner layer - warm purple glow
  const innerGeometry = generateSmoothParticleSphere(numPoints, innerRadius);
  const innerMaterial = new THREE.PointsMaterial({ 
    color: 0x9370db, // Medium slate blue
    size: 2.2,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.6,
    sizeAttenuation: true
  });
  const innerPoints = new THREE.Points(innerGeometry, innerMaterial);
  scene.add(innerPoints);

  const innerPositions = innerGeometry.attributes.position.array;
  const innerBasePositions = new Float32Array(innerPositions.length);
  innerBasePositions.set(innerPositions);

  // Core - gentle pink center
  const coreGeometry = generateSmoothParticleSphere(corePoints, coreRadius);
  const coreMaterial = new THREE.PointsMaterial({
    color: 0xdda0dd, // Soft plum
    size: 1.8,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.8,
    sizeAttenuation: true
  });
  const coreParticles = new THREE.Points(coreGeometry, coreMaterial);
  scene.add(coreParticles);

  const corePositions = coreGeometry.attributes.position.array;
  const coreBasePositions = new Float32Array(corePositions.length);
  coreBasePositions.set(corePositions);

  // Subtle ambient lighting for depth
  const ambientLight = new THREE.AmbientLight(0x404060, 0.2);
  scene.add(ambientLight);

  // Declare audio variables in outer scope
  let audioCtx = null;
  let source = null;
  let analyser = null;
  let dataArray = null;
  let mediaStream = null;

  function animate() {
    requestAnimationFrame(animate);
  
    const time = performance.now() * 0.0006; // Slower, more meditative timing
    const gentleRipple = 40; // Much gentler ripple effects
    const softPulse = 25;
  
    // Use real data if available, else fallback to very gentle defaults
    let avg = 8;
    let bassLevel = 5;
    let trebleLevel = 4;
    
    if (analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);
      
      // Calculate different frequency ranges with smoothing
      const bassRange = Math.floor(dataArray.length * 0.15);
      const trebleRange = Math.floor(dataArray.length * 0.75);
      
      let sum = 0, bassSum = 0, trebleSum = 0;
      
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
        if (i < bassRange) bassSum += dataArray[i];
        if (i > trebleRange) trebleSum += dataArray[i];
      }
      
      // Smooth and limit the audio response for relaxation
      avg = Math.min(sum / dataArray.length, 60);
      bassLevel = Math.min(bassSum / bassRange, 50);
      trebleLevel = Math.min(trebleSum / (dataArray.length - trebleRange), 40);
    }
  
    // Very subtle scaling for a contained orb feel
    const outerScale = 1 + avg / 400;
    const innerScale = 1 + bassLevel / 300;
    const coreScale = 1 + trebleLevel / 350;
    
    // Gentle opacity breathing effect
    const breathe = Math.sin(time * 1.5) * 0.15 + 0.85;
    outerMaterial.opacity = (0.3 + (avg / 400)) * breathe;
    innerMaterial.opacity = (0.5 + (bassLevel / 300)) * breathe;
    coreMaterial.opacity = (0.7 + (trebleLevel / 350)) * breathe;
    
    // Animate outer particles with gentle flowing waves
    for (let i = 0; i < outerPositions.length; i += 3) {
      const baseX = outerBasePositions[i];
      const baseY = outerBasePositions[i + 1];
      const baseZ = outerBasePositions[i + 2];
  
      const length = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ);
      const dirX = baseX / length;
      const dirY = baseY / length;
      const dirZ = baseZ / length;
  
      // Gentle wave motion like breathing
      const gentleWave = Math.sin(time + i * 0.003) * gentleRipple;
      const breathingPulse = Math.sin(time * 2 + length * 0.002) * softPulse;
  
      outerPositions[i] = (baseX + dirX * (gentleWave + breathingPulse * avg / 200)) * outerScale;
      outerPositions[i + 1] = (baseY + dirY * (gentleWave + breathingPulse * avg / 200)) * outerScale;
      outerPositions[i + 2] = (baseZ + dirZ * (gentleWave + breathingPulse * avg / 200)) * outerScale;
    }
    outerGeometry.attributes.position.needsUpdate = true;
  
    // Animate inner particles with subtle bass response
    for (let i = 0; i < innerPositions.length; i += 3) {
      const baseX = innerBasePositions[i];
      const baseY = innerBasePositions[i + 1];
      const baseZ = innerBasePositions[i + 2];
      
      const length = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ);
      const dirX = baseX / length;
      const dirY = baseY / length;
      const dirZ = baseZ / length;
      
      // Soft bass wave, like a gentle heartbeat
      const bassHeartbeat = Math.sin(time * 0.8 + i * 0.004) * (bassLevel * 0.8);
      
      innerPositions[i] = (baseX + dirX * bassHeartbeat) * innerScale;
      innerPositions[i + 1] = (baseY + dirY * bassHeartbeat) * innerScale;
      innerPositions[i + 2] = (baseZ + dirZ * bassHeartbeat) * innerScale;
    }
    innerGeometry.attributes.position.needsUpdate = true;

    // Animate core particles with gentle treble shimmer
    for (let i = 0; i < corePositions.length; i += 3) {
      const baseX = coreBasePositions[i];
      const baseY = coreBasePositions[i + 1];
      const baseZ = coreBasePositions[i + 2];
      
      const length = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ);
      const dirX = baseX / length;
      const dirY = baseY / length;
      const dirZ = baseZ / length;
      
      // Delicate treble shimmer
      const shimmer = Math.sin(time * 2.5 + i * 0.008) * (trebleLevel * 0.6);
      
      corePositions[i] = (baseX + dirX * shimmer) * coreScale;
      corePositions[i + 1] = (baseY + dirY * shimmer) * coreScale;
      corePositions[i + 2] = (baseZ + dirZ * shimmer) * coreScale;
    }
    coreGeometry.attributes.position.needsUpdate = true;
  
    // Very slow, meditative rotation
    const rotationSpeed = 0.0002 + (avg / 5000);
    outerPoints.rotation.y += rotationSpeed;
    outerPoints.rotation.x += rotationSpeed * 0.6;
    
    innerPoints.rotation.y -= rotationSpeed * 0.7;
    innerPoints.rotation.x += rotationSpeed * 0.4;
    
    coreParticles.rotation.y += rotationSpeed * 0.9;
    coreParticles.rotation.z += rotationSpeed * 0.2;
  
    renderer.render(scene, camera);
  }

  // Handle window resize
  function handleResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  
  window.addEventListener('resize', handleResize);

  animate(); // Always run animation loop

  function startListening() {
    if (analyser) return; // already started

    navigator.mediaDevices.getUserMedia({ 
      audio: { 
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      } 
    }).then((stream) => {
      mediaStream = stream;
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      source = audioCtx.createMediaStreamSource(stream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.85; // Higher smoothing for gentler response
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

function generateSmoothParticleSphere(count, radius) {
  const positions = [];

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    // More even distribution for a smoother orb appearance
    const r = radius * (0.85 + 0.15 * Math.random());

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions.push(x, y, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}