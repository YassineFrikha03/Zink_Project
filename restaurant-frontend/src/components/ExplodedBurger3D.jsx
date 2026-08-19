// src/components/ExplodedBurger3D.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Rotate3d, Award, Loader2 } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// =========================================================================================
// 1. MOTEUR DE BRUIT 3D FRACTAL (FBM) & DÉFORMATIONS ORGANIQUES HAUTE PRÉCISION
// =========================================================================================
const getNoise = (x, y, z, freq) => {
  return Math.sin(x * freq) * Math.cos(z * freq) * 0.5 +
         Math.cos(y * freq * 1.3 + x * freq * 0.9) * 0.3 +
         Math.sin((x + z + y) * freq * 2.1) * 0.2;
};

const getFbm = (x, y, z, octaves = 3, freq = 4) => {
  let value = 0;
  let amplitude = 0.5;
  let frequency = freq;
  for (let i = 0; i < octaves; i++) {
    value += getNoise(x, y, z, frequency) * amplitude;
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
};

// =========================================================================================
// 2. GÉNÉRATEURS DE TEXTURES PROCÉDURALES ULTRA-HD (STUDIO PBR REALITY)
// =========================================================================================
const createProceduralTexture = (drawFn, size = 1024) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  return texture;
};

const getBunTexture = (isBlack = false) => {
  return createProceduralTexture((ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.72);
    if (isBlack) {
      grad.addColorStop(0, '#2a2a2a');
      grad.addColorStop(0.5, '#181818');
      grad.addColorStop(0.9, '#0a0a0a');
      grad.addColorStop(1, '#050505');
    } else {
      grad.addColorStop(0, '#e59a40');
      grad.addColorStop(0.3, '#d68330');
      grad.addColorStop(0.6, '#b05e1b');
      grad.addColorStop(0.85, '#853e0d');
      grad.addColorStop(1, '#542004');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Bake crust texture (pores and imperfections)
    for (let i = 0; i < 40000; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 1.5;
      const alpha = Math.random() * 0.15;
      ctx.fillStyle = isBlack ? `rgba(0,0,0,${alpha})` : (Math.random() > 0.5 ? `rgba(100, 30, 5, ${alpha})` : `rgba(255, 230, 180, ${alpha})`);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 1024);
};

const getMeatTexture = (isPoulet = false, isVeggie = false) => {
  return createProceduralTexture((ctx, w, h) => {
    ctx.fillStyle = isPoulet ? '#c17a15' : (isVeggie ? '#4a3020' : '#2b1408');
    ctx.fillRect(0, 0, w, h);

    // Realistic meat/crust grain
    for (let i = 0; i < 60000; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 2.2;
      const type = Math.random();
      
      if (type > 0.8) {
        // Charred bits
        ctx.fillStyle = 'rgba(15, 5, 2, 0.9)';
      } else if (type > 0.5) {
        // Fat / highlights
        ctx.fillStyle = isPoulet ? 'rgba(255, 210, 140, 0.5)' : 'rgba(180, 90, 50, 0.4)';
      } else {
        // Deep meat tones
        ctx.fillStyle = isPoulet ? 'rgba(140, 80, 10, 0.6)' : 'rgba(30, 10, 5, 0.8)';
      }
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Grill marks
    if (!isPoulet && !isVeggie) {
      ctx.strokeStyle = 'rgba(10, 2, 0, 0.8)';
      ctx.lineWidth = 25;
      ctx.lineCap = 'round';
      for (let i = -w; i < w * 2; i += 130) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + h, h);
        ctx.stroke();
      }
    }
  }, 1024);
};

const getLettuceTexture = () => {
  return createProceduralTexture((ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, w * 0.1, w / 2, h / 2, w * 0.65);
    grad.addColorStop(0, '#66bb6a');
    grad.addColorStop(0.5, '#43a047');
    grad.addColorStop(0.85, '#2e7d32');
    grad.addColorStop(1, '#1b5e20');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(165, 214, 167, 0.35)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(w / 2, h / 2);
      const angle = (i / 20) * Math.PI * 2 + Math.random() * 0.2;
      const dist = w * 0.45;
      ctx.quadraticCurveTo(
        w / 2 + Math.cos(angle + 0.2) * dist * 0.5,
        h / 2 + Math.sin(angle + 0.2) * dist * 0.5,
        w / 2 + Math.cos(angle) * dist,
        h / 2 + Math.sin(angle) * dist
      );
      ctx.stroke();
    }
  }, 512);
};

const getTomatoTexture = () => {
  return createProceduralTexture((ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w * 0.48);
    grad.addColorStop(0, '#ff5252');
    grad.addColorStop(0.65, '#d32f2f');
    grad.addColorStop(0.9, '#b71c1c');
    grad.addColorStop(1, '#7f0000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const center = w / 2;
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const cx = center + Math.cos(angle) * (w * 0.23);
      const cy = center + Math.sin(angle) * (h * 0.23);
      
      ctx.fillStyle = 'rgba(100, 5, 5, 0.88)';
      ctx.beginPath();
      ctx.ellipse(cx, cy, w * 0.11, h * 0.08, angle, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 235, 150, 0.85)';
      for (let j = 0; j < 5; j++) {
        const sx = cx + (Math.random() - 0.5) * w * 0.12;
        const sy = cy + (Math.random() - 0.5) * h * 0.08;
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, 512);
};

// =========================================================================================
// 3. MAILLAGES 3D EXCELLENCE (STUDIO PBR & TRANSLUCIDITÉ)
// =========================================================================================

const createTopBun = (name, gltfMeshes) => {
  const group = new THREE.Group();
  const isBlack = name?.toLowerCase().includes('noir');

  if (gltfMeshes && gltfMeshes.bunTop && !isBlack) {
    const realBun = gltfMeshes.bunTop.clone(true);
    realBun.scale.set(1.15, 1.15, 1.15);
    realBun.position.set(0, 0, 0);
    realBun.traverse((c) => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
    group.add(realBun);
    return group;
  }

  const bunTex = getBunTexture(isBlack);
  const bunGeo = new THREE.SphereGeometry(1.8, 120, 90, 0, Math.PI * 2, 0, Math.PI * 0.53);

  const pos = bunGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    let newY = y;
    if (y > 0.75) {
      newY = y * 0.85 + 0.11;
    }
    // Organic bumps on the bread
    const noise = getFbm(x, y, z, 4, 5) * 0.05;
    const microNoise = getNoise(x, y, z, 30) * 0.01;
    pos.setXYZ(i, x + noise * 0.3, newY + noise + microNoise, z + noise * 0.3);
  }
  bunGeo.computeVertexNormals();

  const bunMat = new THREE.MeshPhysicalMaterial({
    map: bunTex,
    roughness: 0.85, // Bread is very rough, not shiny like plastic
    metalness: 0.0,
    bumpMap: bunTex,
    bumpScale: 0.08,
    clearcoat: 0.05, // Very slight egg wash glaze
    clearcoatRoughness: 0.9,
    sheen: 0.8,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color(isBlack ? 0x222222 : 0xffe8c0)
  });
  const bunMesh = new THREE.Mesh(bunGeo, bunMat);
  bunMesh.castShadow = true;
  bunMesh.receiveShadow = true;
  group.add(bunMesh);

  const baseGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.06, 80);
  const baseMat = new THREE.MeshStandardMaterial({ color: isBlack ? 0x1c1c20 : 0xe3cc9a, roughness: 0.9, bumpMap: bunTex, bumpScale: 0.02 });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.rotation.x = Math.PI;
  group.add(baseMesh);

  const seedGeo = new THREE.CapsuleGeometry(0.042, 0.09, 8, 16);
  const seedMat = new THREE.MeshPhysicalMaterial({
    color: 0xfff0c2,
    roughness: 0.7,
    clearcoat: 0.1,
    clearcoatRoughness: 0.8
  });

  for (let i = 0; i < 48; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 0.43;
    const r = 1.81;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = (r * Math.cos(phi)) * (phi < 0.28 ? 0.86 : 0.95);
    const z = r * Math.sin(phi) * Math.sin(theta);

    const seed = new THREE.Mesh(seedGeo, seedMat);
    seed.position.set(x, y, z);
    seed.lookAt(0, 0, 0);
    seed.rotateX(Math.PI / 2 + (Math.random() - 0.5) * 0.35);
    seed.rotateZ((Math.random() - 0.5) * 0.6);
    seed.castShadow = true;
    group.add(seed);
  }

  return group;
};

const createMeatPatty = (name, gltfMeshes) => {
  const group = new THREE.Group();
  const lower = name?.toLowerCase() || '';
  const isPoulet = lower.includes('poulet');
  const isVeggie = lower.includes('veggie');

  if (gltfMeshes && gltfMeshes.meat && !isPoulet && !isVeggie) {
    const realMeat = gltfMeshes.meat.clone(true);
    realMeat.scale.set(1.15, 1.15, 1.15);
    realMeat.position.set(0, 0, 0);
    realMeat.traverse((c) => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
    group.add(realMeat);
    return group;
  }

  const meatTex = getMeatTexture(isPoulet, isVeggie);
  const pattyGeo = new THREE.CylinderGeometry(1.72, 1.72, 0.46, 120, 30);

  const pos = pattyGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const dist = Math.sqrt(x * x + z * z);

    // Highly irregular edges for realistic ground beef
    if (dist > 1.0) {
      const noise = getFbm(x, y, z, 5, 8) * 0.15;
      pos.setXYZ(i, x + noise * (x / dist), y + noise * 0.8, z + noise * (z / dist));
    } else {
      const microNoise = getNoise(x, y, z, 20) * 0.06;
      pos.setY(i, y + microNoise);
    }
  }
  pattyGeo.computeVertexNormals();

  const pattyMat = new THREE.MeshPhysicalMaterial({
    map: meatTex,
    roughness: isPoulet ? 0.75 : 0.6,
    metalness: isPoulet ? 0.0 : 0.05,
    bumpMap: meatTex,
    bumpScale: 0.25,
    clearcoat: isVeggie ? 0.1 : 0.5, // Meat grease
    clearcoatRoughness: 0.35,
    specularIntensity: 0.8,
    specularColor: new THREE.Color(0xffdda0)
  });
  const pattyMesh = new THREE.Mesh(pattyGeo, pattyMat);
  pattyMesh.castShadow = true;
  pattyMesh.receiveShadow = true;
  group.add(pattyMesh);

  return group;
};

const createCheeseSlice = (name, gltfMeshes) => {
  const group = new THREE.Group();
  const isChevre = name?.toLowerCase().includes('chèvre');

  if (gltfMeshes && gltfMeshes.cheese && !isChevre) {
    const realCheese = gltfMeshes.cheese.clone(true);
    realCheese.scale.set(1.15, 1.15, 1.15);
    realCheese.position.set(0, 0, 0);
    realCheese.traverse((c) => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
    group.add(realCheese);
    return group;
  }

  const cheeseColor = isChevre ? 0xfff8dc : 0xff9f00;
  const cheeseGeo = new THREE.BoxGeometry(2.48, 0.04, 2.48, 60, 1, 60);

  const pos = cheeseGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const distFromCenter = Math.max(Math.abs(x), Math.abs(z));

    // Realistic drooping cheese with organic melting
    if (distFromCenter > 1.1) {
      const drop = Math.pow((distFromCenter - 1.1) * 1.9, 2) * -0.55;
      const noise = getFbm(x, 0, z, 3, 5) * 0.08;
      pos.setY(i, pos.getY(i) + drop + noise);
    }
  }
  cheeseGeo.computeVertexNormals();

  const cheeseMat = new THREE.MeshPhysicalMaterial({
    color: cheeseColor,
    roughness: 0.45,
    metalness: 0.0,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
    transmission: 0.15, // Slight translucency for cheese
    thickness: 0.2,
    ior: 1.4,
    bumpMap: getBunTexture(), // reuse noise texture for micro bumps
    bumpScale: 0.005
  });
  const cheeseMesh = new THREE.Mesh(cheeseGeo, cheeseMat);
  cheeseMesh.castShadow = true;
  cheeseMesh.receiveShadow = true;
  group.add(cheeseMesh);

  return group;
};

const createLettuceLeaf = (gltfMeshes) => {
  const group = new THREE.Group();

  if (gltfMeshes && gltfMeshes.lettuce) {
    const realLettuce = gltfMeshes.lettuce.clone(true);
    realLettuce.scale.set(1.15, 1.15, 1.15);
    realLettuce.position.set(0, 0, 0);
    realLettuce.traverse((c) => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
    group.add(realLettuce);
    return group;
  }

  const lettuceTex = getLettuceTexture();
  const lettuceGeo = new THREE.CylinderGeometry(2.3, 1.8, 0.02, 180, 40);

  const pos = lettuceGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const dist = Math.sqrt(x * x + z * z);

    // Highly crinkled lettuce leaves
    const angle = Math.atan2(z, x);
    const bigLobes = Math.sin(angle * 7 + Math.cos(angle * 3)) * 0.18;
    const crispEdge = getFbm(x, 0, z, 4, 12) * 0.15 * Math.pow(dist / 2.3, 2);
    const microCrinkles = getNoise(x, 0, z, 25) * 0.03;
    
    pos.setY(i, pos.getY(i) + bigLobes * (dist / 2.3) + crispEdge + microCrinkles);
    
    if (dist > 0.8) {
      const radialPush = (Math.sin(angle * 10) * 0.12 + getNoise(x, 0, z, 15) * 0.1);
      pos.setX(i, x + (x / dist) * radialPush);
      pos.setZ(i, z + (z / dist) * radialPush);
    }
  }
  lettuceGeo.computeVertexNormals();

  const lettuceMat = new THREE.MeshPhysicalMaterial({
    map: lettuceTex,
    roughness: 0.6,
    metalness: 0.0,
    clearcoat: 0.1, // Lettuce is not extremely glossy
    clearcoatRoughness: 0.8,
    transmission: 0.6, // Light passes through thin leaves
    thickness: 0.1,
    side: THREE.DoubleSide
  });
  const leafMesh = new THREE.Mesh(lettuceGeo, lettuceMat);
  leafMesh.castShadow = true;
  leafMesh.receiveShadow = true;
  group.add(leafMesh);

  return group;
};

const createTomatoSlices = (gltfMeshes) => {
  const group = new THREE.Group();

  if (gltfMeshes && gltfMeshes.tomato) {
    const realTomato = gltfMeshes.tomato.clone(true);
    realTomato.scale.set(1.15, 1.15, 1.15);
    realTomato.position.set(0, 0, 0);
    realTomato.traverse((c) => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
    group.add(realTomato);
    return group;
  }

  const tomatoTex = getTomatoTexture();
  const tomatoGeo = new THREE.CylinderGeometry(0.88, 0.88, 0.12, 100, 16);
  
  const pos = tomatoGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const noise = getFbm(pos.getX(i), pos.getY(i), pos.getZ(i), 3, 8) * 0.025;
    pos.setY(i, pos.getY(i) + noise);
  }
  tomatoGeo.computeVertexNormals();

  const tomatoMat = new THREE.MeshPhysicalMaterial({
    map: tomatoTex,
    roughness: 0.15,
    metalness: 0.0,
    clearcoat: 1.0, // Tomatoes are very wet/juicy
    clearcoatRoughness: 0.05,
    transmission: 0.4, // Tomatoes are fleshy and translucent
    thickness: 0.5,
    ior: 1.35
  });

  [-0.6, 0.6].forEach((x, i) => {
    const slice = new THREE.Mesh(tomatoGeo, tomatoMat);
    slice.position.set(x, 0, i === 0 ? 0.12 : -0.12);
    slice.rotation.y = i * Math.PI;
    slice.castShadow = true;
    slice.receiveShadow = true;
    group.add(slice);
  });

  return group;
};

const createOnionRings = () => {
  const group = new THREE.Group();
  const ringData = [
    [0, 0, 0, 0.72, 0x8e24aa],
    [-0.52, 0.05, 0.42, 0.54, 0xab47bc],
    [0.52, -0.05, -0.42, 0.58, 0x7b1fa2]
  ];
  ringData.forEach(([x, y, z, radius, color]) => {
    const torusGeo = new THREE.TorusGeometry(radius, 0.07, 28, 80);
    const pos = torusGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(i, pos.getX(i) + getNoise(pos.getX(i), 0, pos.getZ(i), 10) * 0.02, pos.getY(i), pos.getZ(i));
    }
    torusGeo.computeVertexNormals();
    const torusMat = new THREE.MeshPhysicalMaterial({ color, roughness: 0.1, clearcoat: 0.6, transmission: 0.3, thickness: 0.2 });
    const ring = new THREE.Mesh(torusGeo, torusMat);
    ring.position.set(x, y, z);
    ring.rotation.x = Math.PI / 2;
    ring.castShadow = true;
    group.add(ring);
  });
  return group;
};

const createPickleSlices = (name) => {
  const group = new THREE.Group();
  const isJalapeno = name?.toLowerCase().includes('jalapeño');
  const color = isJalapeno ? 0x1b5e20 : 0x2e7d32;
  const pickleGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.08, 50, 12);
  
  const pos = pickleGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const noise = getNoise(pos.getX(i), 0, pos.getZ(i), 16) * 0.022;
    pos.setY(i, pos.getY(i) + noise);
  }
  pickleGeo.computeVertexNormals();
  
  const pickleMat = new THREE.MeshPhysicalMaterial({ color, roughness: 0.15, clearcoat: 0.7, clearcoatRoughness: 0.1, transmission: 0.2, thickness: 0.15 });

  [-0.65, 0.65].forEach((x) => {
    [-0.65, 0.65].forEach((z) => {
      const slice = new THREE.Mesh(pickleGeo, pickleMat);
      slice.position.set(x, 0, z);
      slice.rotation.y = Math.PI / 4;
      slice.castShadow = true;
      slice.receiveShadow = true;
      group.add(slice);
    });
  });
  return group;
};

const createSauceLayer = (name) => {
  const group = new THREE.Group();
  const lower = name?.toLowerCase() || '';
  let color = 0xd32f2f;
  let isDuo = true;
  if (lower.includes('mayo')) { color = 0xfffdd0; isDuo = false; }
  if (lower.includes('bbq')) { color = 0x3e1404; isDuo = false; }
  if (lower.includes('cheddar') || lower.includes('fromag')) { color = 0xffb300; isDuo = false; }

  const sauceGeo = new THREE.CylinderGeometry(1.64, 1.64, 0.09, 70, 12);
  const pos = sauceGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, pos.getY(i) + getNoise(pos.getX(i), 0, pos.getZ(i), 8) * 0.03);
  }
  sauceGeo.computeVertexNormals();

  const sauceMat = new THREE.MeshPhysicalMaterial({ color, roughness: 0.02, metalness: 0.15, clearcoat: 0.95, clearcoatRoughness: 0.03 });
  const mainSauce = new THREE.Mesh(sauceGeo, sauceMat);
  mainSauce.castShadow = true;
  group.add(mainSauce);

  if (isDuo) {
    const mustardMat = new THREE.MeshPhysicalMaterial({ color: 0xfbc02d, roughness: 0.05, clearcoat: 0.8 });
    const mustardGeo = new THREE.TorusGeometry(1.14, 0.08, 24, 70);
    const mPos = mustardGeo.attributes.position;
    for (let i = 0; i < mPos.count; i++) {
      mPos.setY(i, mPos.getY(i) + getNoise(mPos.getX(i), 0, mPos.getZ(i), 10) * 0.02);
    }
    mustardGeo.computeVertexNormals();
    const mustard = new THREE.Mesh(mustardGeo, mustardMat);
    mustard.rotation.x = Math.PI / 2;
    mustard.position.y = 0.05;
    group.add(mustard);
  }

  const drop1 = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 24), sauceMat);
  drop1.position.set(-1.5, -0.12, 0.5);
  group.add(drop1);

  const drop2 = new THREE.Mesh(new THREE.SphereGeometry(0.27, 24, 24), isDuo ? new THREE.MeshPhysicalMaterial({ color: 0xfbc02d, roughness: 0.05, clearcoat: 0.8 }) : sauceMat);
  drop2.position.set(1.42, -0.14, -0.6);
  group.add(drop2);

  return group;
};

const createBaconStrips = () => {
  const group = new THREE.Group();
  const baconGeo = new THREE.BoxGeometry(2.5, 0.06, 0.62, 50, 1, 12);
  const pos = baconGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    pos.setY(i, pos.getY(i) + Math.sin(x * 5) * 0.065 + getNoise(x, 0, pos.getZ(i), 12) * 0.025);
  }
  baconGeo.computeVertexNormals();

  const baconMat = new THREE.MeshPhysicalMaterial({ color: 0x8d3628, roughness: 0.22, clearcoat: 0.6, clearcoatRoughness: 0.15 });
  [-0.36, 0.36].forEach((z, i) => {
    const strip = new THREE.Mesh(baconGeo, baconMat);
    strip.position.set(0, 0, z);
    strip.rotation.y = i === 0 ? Math.PI / 6 : -Math.PI / 6;
    strip.castShadow = true;
    group.add(strip);
  });
  return group;
};

const createFriedEgg = () => {
  const group = new THREE.Group();
  const whiteGeo = new THREE.CylinderGeometry(1.72, 1.72, 0.06, 70, 12);
  const pos = whiteGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, pos.getY(i) + getNoise(pos.getX(i), 0, pos.getZ(i), 8) * 0.022);
  }
  whiteGeo.computeVertexNormals();

  const whiteMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.12, clearcoat: 0.5 });
  const whiteMesh = new THREE.Mesh(whiteGeo, whiteMat);
  whiteMesh.castShadow = true;
  group.add(whiteMesh);

  const yolkGeo = new THREE.SphereGeometry(0.64, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const yolkMat = new THREE.MeshPhysicalMaterial({ color: 0xffa000, roughness: 0.03, clearcoat: 0.9, transmission: 0.1, thickness: 0.3 });
  const yolkMesh = new THREE.Mesh(yolkGeo, yolkMat);
  yolkMesh.position.set(0, 0.15, 0);
  yolkMesh.castShadow = true;
  group.add(yolkMesh);

  return group;
};

const createBottomBun = (name, gltfMeshes) => {
  const group = new THREE.Group();
  const isBlack = name?.toLowerCase().includes('noir');

  if (gltfMeshes && gltfMeshes.bunBottom && !isBlack) {
    const realBun = gltfMeshes.bunBottom.clone(true);
    realBun.scale.set(1.15, 1.15, 1.15);
    realBun.position.set(0, 0, 0);
    realBun.traverse((c) => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
    group.add(realBun);
    return group;
  }

  const bunColor = isBlack ? 0x222224 : 0xb86b2b;
  const bunGeo = new THREE.CylinderGeometry(1.8, 1.58, 0.46, 80, 20);
  const pos = bunGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const noise = getFbm(pos.getX(i), pos.getY(i), pos.getZ(i), 3, 6) * 0.03;
    pos.setXYZ(i, pos.getX(i) + noise * 0.2, pos.getY(i) + noise, pos.getZ(i) + noise * 0.2);
  }
  bunGeo.computeVertexNormals();

  const bunMat = new THREE.MeshPhysicalMaterial({ color: bunColor, roughness: 0.38, clearcoat: 0.2 });
  const bunMesh = new THREE.Mesh(bunGeo, bunMat);
  bunMesh.castShadow = true;
  bunMesh.receiveShadow = true;
  group.add(bunMesh);

  const crumbGeo = new THREE.CylinderGeometry(1.78, 1.78, 0.02, 80);
  const crumbMat = new THREE.MeshStandardMaterial({ color: isBlack ? 0x18181a : 0xf9edd6, roughness: 0.88 });
  const crumbMesh = new THREE.Mesh(crumbGeo, crumbMat);
  crumbMesh.position.set(0, 0.23, 0);
  group.add(crumbMesh);

  return group;
};

const createServingBoard = () => {
  const group = new THREE.Group();
  const boardGeo = new THREE.CylinderGeometry(3.4, 3.6, 0.32, 100);
  const boardMat = new THREE.MeshPhysicalMaterial({
    color: 0x14100e,
    roughness: 0.35,
    metalness: 0.2,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2
  });
  const boardMesh = new THREE.Mesh(boardGeo, boardMat);
  boardMesh.receiveShadow = true;
  boardMesh.castShadow = true;
  group.add(boardMesh);

  const rimGeo = new THREE.CylinderGeometry(3.64, 3.64, 0.04, 100);
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8 });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  rimMesh.position.set(0, -0.16, 0);
  group.add(rimMesh);

  group.position.set(0, -2.32, 0);
  return group;
};

const createGourmetParticles = () => {
  const count = 45;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6 + 1;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    scales[i] = Math.random() * 0.08 + 0.03;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const mat = new THREE.PointsMaterial({
    color: 0xfbbf24,
    size: 0.08,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geo, mat);
  return points;
};

const buildLayer3D = (layer, gltfMeshes = null) => {
  const name = layer.name || '';
  const id = layer.id || '';
  const lower = name.toLowerCase();

  const isTopBun = layer.isTopBun || id === 'bun-top' || (layer.isBun && (id.includes('top') || lower.includes('haut')));
  const isBottomBun = layer.isBottomBun || id === 'bun-bottom' || (layer.isBun && (id.includes('bot') || lower.includes('bas')));
  const isBun = layer.isBun || isTopBun || isBottomBun || lower.includes('pain');
  const isMeat = lower.includes('steak') || lower.includes('poulet') || lower.includes('galette') || lower.includes('viande');
  const isCheese = lower.includes('cheddar') || lower.includes('raclette') || lower.includes('chèvre') || lower.includes('fromage') || lower.includes('américain');
  const isTomato = lower.includes('tomate');
  const isOnion = lower.includes('oignon');
  const isLettuce = lower.includes('laitue') || lower.includes('salade');
  const isPickle = lower.includes('cornichon') || lower.includes('jalapeño') || lower.includes('avocat') || lower.includes('pickle');
  const isBacon = lower.includes('bacon');
  const isEgg = lower.includes('œuf');

  if (isTopBun || (isBun && !isBottomBun)) return createTopBun(name, gltfMeshes);
  if (isBottomBun || isBun) return createBottomBun(name, gltfMeshes);
  if (isMeat) return createMeatPatty(name, gltfMeshes);
  if (isCheese) return createCheeseSlice(name, gltfMeshes);
  if (isTomato) return createTomatoSlices(gltfMeshes);
  if (isLettuce) return createLettuceLeaf(gltfMeshes);
  if (isOnion) return createOnionRings();
  if (isPickle) return createPickleSlices(name);
  if (isBacon) return createBaconStrips();
  if (isEgg) return createFriedEgg();
  return createSauceLayer(name);
};

// =========================================================================================
// COMPOSANT PRINCIPAL : EXPLODED BURGER 3D (ESPACE AGRANDI & ZÉRO NOM D'INGRÉDIENT SUR SURVOL)
// =========================================================================================
const ExplodedBurger3D = ({
  layers = [],
  isExploded = false,
  setIsExploded,
  onRemoveLayer,
  hoveredLayerIndex = null,
  setHoveredLayerIndex = () => {},
  isInteractiveBuilder = false,
  onBurgerClick = () => {},
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const burgerGroupRef = useRef(null);
  const layerGroupsRef = useRef([]);
  const gltfMeshesRef = useRef(null);
  const particlesRef = useRef(null);
  
  const [isModelLoading, setIsModelLoading] = useState(true);
  
  const isExplodedRef = useRef(isExploded);
  const hoveredIdxRef = useRef(hoveredLayerIndex);
  const layersRef = useRef(layers);

  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

  useEffect(() => {
    hoveredIdxRef.current = hoveredLayerIndex;
  }, [hoveredLayerIndex]);

  useEffect(() => {
    layersRef.current = layers;
  }, [layers]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.minDistance = 3.5;
    controls.maxDistance = 14;

    const ambientLight = new THREE.AmbientLight(0xfff8e7, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xffffff, 5.0);
    keyLight.position.set(10, 18, 10);
    keyLight.angle = Math.PI / 4;
    keyLight.penumbra = 0.85;
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xf59e0b, 2.2, 25);
    fillLight.position.set(-10, -3, -8);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(0, 10, -10);
    scene.add(rimLight);

    const bounceLight = new THREE.DirectionalLight(0xffb300, 1.2);
    bounceLight.position.set(0, -10, 5);
    scene.add(bounceLight);

    const burgerGroup = new THREE.Group();
    burgerGroup.position.set(0, 0.2, 0);
    scene.add(burgerGroup);
    burgerGroupRef.current = burgerGroup;

    const board = createServingBoard();
    burgerGroup.add(board);

    const particles = createGourmetParticles();
    scene.add(particles);
    particlesRef.current = particles;

    const gltfLoader = new GLTFLoader();
    const externalGltfUrl = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/hamburger/model.gltf';

    gltfLoader.load(
      externalGltfUrl,
      (gltf) => {
        const loadedMeshes = {};
        gltf.scene.traverse((child) => {
          if (child.isMesh || child.isGroup) {
            const n = child.name.toLowerCase();
            if (n.includes('buntop') || n.includes('topbun')) loadedMeshes.bunTop = child;
            else if (n.includes('bunbottom') || n.includes('bottombun')) loadedMeshes.bunBottom = child;
            else if (n.includes('meat') || n.includes('patty')) loadedMeshes.meat = child;
            else if (n.includes('cheese')) loadedMeshes.cheese = child;
            else if (n.includes('lettuce') || n.includes('salad')) loadedMeshes.lettuce = child;
            else if (n.includes('tomato') || n.includes('slice')) loadedMeshes.tomato = child;
          }
        });
        gltfMeshesRef.current = loadedMeshes;
        setIsModelLoading(false);
        rebuildBurgerScene();
      },
      undefined,
      (err) => {
        console.warn('Utilisation du moteur de sculpture organique PBR excellence !', err);
        setIsModelLoading(false);
        rebuildBurgerScene();
      }
    );

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 700;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // REMARQUE : Détection de pointeur simplifiée SANS affichage ni mise à jour des noms d'ingrédients !
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isExplodedRef.current && hoveredIdxRef.current === null) {
        burgerGroup.rotation.y += 0.006;
      } else if (isExplodedRef.current) {
        burgerGroup.rotation.y += (0 - burgerGroup.rotation.y) * 0.1;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.002;
        const pos = particlesRef.current.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          let y = pos.getY(i);
          y += 0.008;
          if (y > 4) y = -2;
          pos.setY(i, y);
        }
        pos.needsUpdate = true;
      }

      const currentExploded = isExplodedRef.current;
      const currentHovered = hoveredIdxRef.current;
      const totalLayers = layersRef.current.length;
      const centerIdx = (totalLayers - 1) / 2;

      layerGroupsRef.current.forEach((group, idx) => {
        if (!group) return;
        const dist = idx - centerIdx;
        const targetY = currentExploded ? dist * 0.98 : dist * -0.28;
        group.position.y += (targetY - group.position.y) * 0.15;

        const targetRotZ = currentExploded && (idx % 2 === 0) ? -0.05 : (currentExploded ? 0.05 : 0);
        group.rotation.z += (targetRotZ - group.rotation.z) * 0.15;

        const targetScale = currentHovered === idx ? 1.08 : 1.0;
        group.scale.set(
          group.scale.x + (targetScale - group.scale.x) * 0.2,
          group.scale.y + (targetScale - group.scale.y) * 0.2,
          group.scale.z + (targetScale - group.scale.z) * 0.2
        );
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const rebuildBurgerScene = () => {
    const burgerGroup = burgerGroupRef.current;
    if (!burgerGroup) return;

    const toRemove = [];
    burgerGroup.children.forEach((child) => {
      if (child.userData && typeof child.userData.layerIdx === 'number') {
        toRemove.push(child);
      }
    });
    toRemove.forEach((child) => burgerGroup.remove(child));

    layerGroupsRef.current = [];
    const centerIdx = (layersRef.current.length - 1) / 2;

    layersRef.current.forEach((layer, idx) => {
      const layerMeshGroup = buildLayer3D(layer, gltfMeshesRef.current);
      layerMeshGroup.userData = { layerIdx: idx, layerName: layer.name };

      const dist = idx - centerIdx;
      const initialY = isExplodedRef.current ? dist * 0.98 : dist * -0.28;
      layerMeshGroup.position.set(0, initialY, 0);

      burgerGroup.add(layerMeshGroup);
      layerGroupsRef.current.push(layerMeshGroup);
    });
  };

  useEffect(() => {
    rebuildBurgerScene();
  }, [layers]);

  return (
    <div className="w-full h-full min-h-[560px] sm:min-h-[660px] flex flex-col items-center justify-between relative select-none py-2 overflow-visible font-body">
      
      {/* Arrière-plan lumineux studio 3D cinématique */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F59E0B]/20 via-transparent to-black/90 rounded-3xl blur-3xl -z-20 pointer-events-none animate-pulse" />
      
      {/* ZÉRO NOM D'INGRÉDIENT AFFICHÉ LORS DU SURVOL DU CURSEUR (Comme demandé !) */}
      {!isInteractiveBuilder && (
        <div className="w-full flex flex-col items-center gap-2 mb-1 z-50 px-2 min-h-[32px]">
          <div className="bg-[#181820]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-xs font-bold text-gray-200 flex items-center gap-2 shadow-2xl text-center pointer-events-none">
            <Award size={15} className="text-[#F59E0B]" />
            <span>
              {isExploded 
                ? `🔥 VUE ÉCLATÉE : ${layers.length} couches 3D • Cliquez pour refermer !`
                : `⭐ MODÈLE 3D EXCELLENCE : Tournez à 360° avec la souris !`}
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          CONTENEUR WEBGL THREE.JS PUR (ESPACE AGRANDI & ÉPURÉ)
      ========================================================================= */}
      <div
        ref={mountRef}
        onClick={onBurgerClick}
        title={isInteractiveBuilder ? "Cliquez pour basculer en vue éclatée 3D" : "Tournez le burger 3D à 360°"}
        className="flex-1 w-full overflow-visible flex flex-col items-center justify-center py-2 px-2 cursor-grab active:cursor-grabbing relative min-h-[480px]"
      >
        {/* Indicateur de chargement initial */}
        <AnimatePresence>
          {isModelLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-40 rounded-2xl gap-3"
            >
              <Loader2 size={36} className="text-[#F59E0B] animate-spin" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-200 font-heading">
                Chargement du Moteur 3D Excellence...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOUTON DE TÉLÉCHARGEMENT RETIRÉ ! Uniquement l'indicateur discret de rotation 360° */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none z-30 px-2">
          <div className="bg-black/70 backdrop-blur-md border border-white/10 text-gray-300 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
            <Rotate3d size={14} className="text-[#F59E0B] animate-spin" />
            <span>Tournez à 360° avec la souris • Rendu Excellence Studio</span>
          </div>
        </div>
      </div>

      {/* Bouton de bascule si pas mode constructeur */}
      {!isInteractiveBuilder && setIsExploded && (
        <div className="mt-2 z-50 flex flex-col sm:flex-row items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: isExploded ? '#D97706' : '#F59E0B', color: '#000' }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExploded(!isExploded);
            }}
            className={`px-6 py-2 rounded-full font-heading font-black text-xs uppercase tracking-wider shadow-xl flex items-center gap-2 transition-all border ${
              isExploded 
                ? 'bg-[#F59E0B] text-black border-[#F59E0B] shadow-[#F59E0B]/30' 
                : 'bg-[#181820] text-white border-white/20 hover:border-[#F59E0B]'
            }`}
          >
            <Flame size={16} className={isExploded ? 'animate-bounce text-black' : 'text-[#F59E0B]'} />
            <span>{isExploded ? '💥 FERMER LE BURGER (VUE COMPACTE)' : '💥 VOIR LE BURGER EN VUE ÉCLATÉE 3D'}</span>
          </motion.button>
        </div>
      )}

    </div>
  );
};

export default ExplodedBurger3D;
