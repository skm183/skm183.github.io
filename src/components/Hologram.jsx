import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function HologramEffect() {
  const [init, setInit] = useState(false);


  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = {

    fullScreen: { enable: false }, 
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "grab" },
        resize: true,
      },
      modes: {
        grab: { distance: 150, links: { opacity: 1 } },
        push: { quantity: 4 },
      },
    },
    particles: {
      color: { value: "#06b6d4" },
      links: {
        color: "#06b6d4",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 1.5,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 200,
        limit: {mode: "delete", value:300},
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 -z-10" 
    />
  );
}