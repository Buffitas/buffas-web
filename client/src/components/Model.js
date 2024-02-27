import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';

//     ____  __  __    ____   ____   ____    ____
//    / __ \/\ \ \ \  / ___\ / ___\ / __ \  / ___\
//   /\ \_\ \ \ \ \ \/\ \__//\ \__//\ \_\ \/\ \__/_
//   \ \  __<\ \ \ \ \ \  __\ \  __\ \  __ \ \____ \
//    \ \ \_\ \ \ \_\ \ \ \_/\ \ \_/\ \ \ \ \/____\ \
//     \ \____/\ \____/\ \_\  \ \_\  \ \_\ \_\/\____/
//      \/___/  \/___/  \/_/   \/_/   \/_/\/_/\/___/

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
