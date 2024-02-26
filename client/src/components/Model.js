import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';

const MyModel = () => {
  const { scene } = useGLTF("/Cube-2.glb");
  const modelRef = useRef();

  // Adjust the initial scale of the model
  scene.scale.set(0.5, 0.5, 0.5);

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={2.7} />
      <pointLight position={[10, 10, 10]} intensity={10.0} />
      <primitive object={scene} ref={modelRef} />
      <OrbitControls />
    </Canvas>
  );
};

export default MyModel;
