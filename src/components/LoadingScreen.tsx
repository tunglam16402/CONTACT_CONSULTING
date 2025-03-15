"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Xử lý loading progress
  useEffect(() => {
    const splashDisplayed = sessionStorage.getItem("splashDisplayed");
    if (splashDisplayed) {
      return;
    }
    const startTime = Date.now();
    const duration = 2500; // 2.5 giây

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          sessionStorage.setItem("splashDisplayed", "true");
        }, 500);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // WebGL Effect
  useEffect(() => {
    const canvas = document.getElementById(
      "webgl-background"
    ) as HTMLCanvasElement;
    const gl = canvas.getContext("webgl");

    if (!gl) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;

    gl.shaderSource(
      vertexShader,
      `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `
    );

    gl.shaderSource(
      fragmentShader,
      `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;
      uniform vec2 mouse;
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv;
        float t = time * 0.5;
        
        // Mouse interaction
        vec2 mousePos = mouse * 0.5 + 0.5;
        float dist = length(uv - mousePos);
        
        // Dynamic pattern
        vec3 color = vec3(0.0);
        for(float i = 1.0; i < 5.0; i++) {
          float scale = i * 10.0;
          vec2 q = vec2(
            cos(uv.x * scale + t) * 0.5 + 0.5,
            sin(uv.y * scale + t) * 0.5 + 0.5
          );
          
          // Mouse influence
          float influence = smoothstep(1.0, 0.0, dist * 2.0);
          q += vec2(mouse.x, mouse.y) * influence * 0.2;
          
          // Color mixing
          vec3 c = vec3(q.x, q.y, 0.5) * (1.0 / i);
          c *= 1.0 + influence * 0.5;
          color += c;
        }
        
        // Add glow effect
        float glow = smoothstep(1.0, 0.0, dist * 3.0);
        color += vec3(0.5, 0.8, 1.0) * glow * 0.5;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
    );

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const startTime = Date.now();
    const animate = () => {
      const time = (Date.now() - startTime) * 0.001;
      gl.uniform1f(gl.getUniformLocation(program, "time"), time);
      gl.uniform2f(
        gl.getUniformLocation(program, "resolution"),
        canvas.width,
        canvas.height
      );
      gl.uniform2f(
        gl.getUniformLocation(program, "mouse"),
        mousePosition.x,
        mousePosition.y
      );

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      gl.deleteProgram(program);
    };
  }, [mousePosition]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#0D0D1F] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3, duration: 1.5 }}
    >
      {/* WebGL Background */}
      <canvas
        id="webgl-background"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Loading Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* 3D Progress Ring */}
        <div className="relative w-40 h-40 perspective-1000">
          <motion.div
            className="absolute inset-0"
            animate={{
              rotateY: 360,
              rotateX: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <circle
                className="text-gray-700"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
              />
              <motion.circle
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              />
            </svg>
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        </div>

        {/* Loading Text */}
        <motion.div
          className="mt-8 text-2xl font-medium text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Đ
          </motion.span>
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1,
            }}
          >
            a
          </motion.span>
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            n
          </motion.span>
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            g
          </motion.span>
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            t
          </motion.span>
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            ả
          </motion.span>
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            i
          </motion.span>
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          >
            .
          </motion.span>
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            .
          </motion.span>
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9,
            }}
          >
            .
          </motion.span>
        </motion.div>
      </div>

      {/* Glowing Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/10 via-purple-500/10 to-pink-500/10" />
    </motion.div>
  );
}
