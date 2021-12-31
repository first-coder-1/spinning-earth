import React, { useRef } from 'react';
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Stars } from "@react-three/drei";


import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import { TextureLoader } from "three";

export function Earth(props){

    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]);

    const earthRef = useRef();
    const cloudRef = useRef();
    // do this at frame refresh
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        earthRef.current.rotation.y = elapsedTime / 6;
        cloudRef.current.rotation.y = elapsedTime / 6;
    });

    return <>
        {/* <ambientLight intensity={0.7}/> */}
        <pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={1.2} />
        <Stars radius={300} depth={10} count={10000} factor={7} saturation={0} fade={true}/>
        <mesh ref={cloudRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial 
                map={cloudsMap} 
                opacity={0.5} 
                depthWrite={true} 
                transparent={true}
                side={THREE.DoubleSide}
            />
        </mesh>
        <mesh ref={earthRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial 
                map={colorMap} 
                normalMap={normalMap} 
                metalness={0.4} 
                roughness={0.6} 
            />
            <meshPhongMaterial specularMap={specularMap}/>
            <meshStandardMaterial map={colorMap} normalMap={normalMap}/>
            <OrbitControls 
                enableZoom={true} 
                enablePan={true} 
                enableRotate={true}
                zoomSpeed={0.6} 
                panSpeed={0.5} 
                rotateSpeed={0.4}
            />
        </mesh>
    </>
}