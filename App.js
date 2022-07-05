import './App.scss';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three'

const SpinningBox = (props) => {
  const mesh = useRef(null)
  useFrame(()=> mesh.current.rotation.x = mesh.current.rotation.y += 0.01)

  const [expand, setExpand] = useState(false)
  const springProps = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1,1,1]
  })


  return(
    <animated.mesh onDoubleClick={() => setExpand(!expand)} scale={springProps.scale} castShadow position={props.position} ref={mesh}>
          <boxBufferGeometry attach='geometry' args={props.args}/>
          <MeshWobbleMaterial attach='material' color={props.color} speed={props.factor} factor='0.6'/>
    </animated.mesh>
  )
}
function App() {
  
  return (
    <div className="App">
      <Canvas shadows legacy='true' camera={{position: [-5,2,10], fov:60}}>
        <ambientLight intensity={0.3} />
        <pointLight position={[-10,0,-20]} intensity='0.5'/>
        <pointLight position={[0,-10,0]} intensity='1.5'/>\
        <directionalLight castShadow position={[0,10,0]} 
                          intensity='1.5'
                          shadowMapWidth='1024'
                          shadowMapHeight='1024'
                          shadowCameraFar='50'
                          shadowCameraBottom='-10'
                          shadowCameraTop='10'
                          shadowCameraRight='10'
                          shadowCameraLeft='-10'/>
        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0,-5,0]}>
            <planeBufferGeometry attach='geometry' args={[100,100]}/>
            <shadowMaterial attach='material' opacity='0.6'/>
          </mesh>
        </group>
        <SpinningBox position={[0,1,0]} args={[3,2,1]} color = 'pink' speed='2'/>
        <SpinningBox position={[-3,1,-5]} color='lightblue' speed='6'/>
        <SpinningBox position={[5,1,-2]} color='lightgreen'speed='6'/>
        <OrbitControls/>
      </Canvas>
    </div>
  );
}

export default App;
