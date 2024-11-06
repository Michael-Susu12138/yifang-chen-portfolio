import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import "./ParticlesComponent.css";
import particlesOptions from "./particles.json";

function ParticlesComponent() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div className="Particle">
      {init && <Particles options={particlesOptions} />}
    </div>
  );
}

export default ParticlesComponent;
