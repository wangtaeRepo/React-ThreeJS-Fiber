import React, { useRef } from 'react'
import './styles.css'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function App() {
  // Sphere 스타일 지정
  const globalGeometry = new THREE.SphereGeometry(1, 6, 6)

  // Moon Object 정의
  const MoonMesh = () => {
    const moonRotate = useRef()
    useFrame(() => {
      moonRotate.current.rotation.y += 0.04
    })
    return (
      <>
        <mesh
          geometry={globalGeometry}
          ref={moonRotate}
          scale={[0.5, 0.5, 0.5]}
          position={[2, 0, 0]}
        >
          <meshPhongMaterial color={0x888888} emissive={0x222222} />
          <primitive object={new THREE.AxesHelper(2)} />
        </mesh>
      </>
    )
  }

  // Earth Object 정의
  const EarthMesh = () => {
    const earthRotate = useRef()
    useFrame(() => {
      earthRotate.current.rotation.y += 0.03
    })
    return (
      <group ref={earthRotate} position={[10, 0, 0]}>
        <mesh geometry={globalGeometry}>
          <meshPhongMaterial color={0x2233ff} emissive={0x112244} />
          <primitive object={new THREE.AxesHelper(2)} />
        </mesh>
        <MoonMesh />
      </group>
    )
  }

  // Sun Object 정의
  const SunMesh = () => {
    const sunRotate = useRef()
    useFrame(() => {
      sunRotate.current.rotation.y += 0.02
    })
    return (
      <group ref={sunRotate} position={[0, 0, 0]}>
        <mesh scale={[5, 5, 5]}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshPhongMaterial emissive={0xffff00} />
          <primitive object={new THREE.AxesHelper(1.5)} />
        </mesh>
        <EarthMesh />
      </group>
    )
  }

  return (
    <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
      <SunMesh />
      <pointLight color={0xffffff} intensity={3} position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  )
}

export default App
