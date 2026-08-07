import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type CeremonyStage = "sign" | "transition" | "ribbon" | "complete";

const MIN_SIGNATURE_LENGTH = 180;
const SIGN_HOLD_MS = 1400;

function SignaturePad({
  onSigned,
}: {
  onSigned: (dataUrl: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const strokeLength = useRef(0);
  const [hasInk, setHasInk] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const confirmTimer = useRef<number | null>(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = parent.getBoundingClientRect();
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1e1b4b";
    ctx.lineWidth = 3.2;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  function getPoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function clearConfirmTimer() {
    if (confirmTimer.current !== null) {
      window.clearTimeout(confirmTimer.current);
      confirmTimer.current = null;
    }
  }

  function onPointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    if (isConfirming) return;
    clearConfirmTimer();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(event.pointerId);
    drawing.current = true;
    last.current = getPoint(event);
  }

  function onPointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || isConfirming) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !last.current) return;

    const point = getPoint(event);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    const dx = point.x - last.current.x;
    const dy = point.y - last.current.y;
    strokeLength.current += Math.hypot(dx, dy);
    last.current = point;
    if (!hasInk) setHasInk(true);
  }

  function finishStroke() {
    drawing.current = false;
    last.current = null;
    if (strokeLength.current < MIN_SIGNATURE_LENGTH || isConfirming) return;

    setIsConfirming(true);
    confirmTimer.current = window.setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      onSigned(canvas.toDataURL("image/png"));
    }, SIGN_HOLD_MS);
  }

  function clearPad() {
    clearConfirmTimer();
    setIsConfirming(false);
    strokeLength.current = 0;
    setHasInk(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resizeCanvas();
  }

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl shadow-black/30">
        <div
          className="pointer-events-none absolute inset-x-10 bottom-16 border-b border-dashed border-slate-300"
          aria-hidden="true"
        />
        <div className="h-[280px] touch-none sm:h-[340px] md:h-[380px]">
          <canvas
            ref={canvasRef}
            className="h-full w-full cursor-crosshair touch-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishStroke}
            onPointerCancel={finishStroke}
            onPointerLeave={() => {
              if (drawing.current) finishStroke();
            }}
          />
        </div>
        {!hasInk && (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium tracking-wide text-slate-400 sm:text-base">
            Sign here with your finger or stylus
          </p>
        )}
        {isConfirming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm"
          >
            <div className="text-center">
              <p className="text-lg font-display font-bold text-primary sm:text-xl">
                Signature received
              </p>
              <p className="mt-1 text-sm text-slate-500">Preparing the ribbon…</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-white/55 sm:text-sm">
          After signing, the ceremony advances automatically.
        </p>
        <button
          type="button"
          onClick={clearPad}
          disabled={isConfirming || !hasInk}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 transition enabled:hover:bg-white/20 disabled:opacity-40 sm:text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function ScissorsIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="18" cy="46" r="8" stroke="currentColor" strokeWidth="3.5" />
      <path
        d="M24 22 L52 48 M24 42 L52 16"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="28" cy="32" r="3" fill="currentColor" />
    </svg>
  );
}

/** Lightweight ceremony SFX via Web Audio (no external files). */
function createAudioContext() {
  const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  return new AudioCtx();
}

function playScissorSnip(ctx: AudioContext) {
  const now = ctx.currentTime;
  const bufferSize = Math.floor(ctx.sampleRate * 0.08);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2800;
  filter.Q.value = 4;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.55, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.1);

  // Metallic click
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(1800, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);
  oscGain.gain.setValueAtTime(0.2, now);
  oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.08);
}

function playClapping(ctx: AudioContext) {
  const now = ctx.currentTime;
  for (let clap = 0; clap < 14; clap++) {
    const t = now + clap * 0.11 + Math.random() * 0.03;
    const bufferSize = Math.floor(ctx.sampleRate * 0.045);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 900;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.22 + Math.random() * 0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(t);
    source.stop(t + 0.06);
  }
}

function playCelebrationChime(ctx: AudioContext) {
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = now + i * 0.12;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.18, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.5);
  });
}

function playCrowdCheer(ctx: AudioContext) {
  const now = ctx.currentTime;
  const bufferSize = Math.floor(ctx.sampleRate * 1.8);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const env = Math.sin((i / bufferSize) * Math.PI);
    data[i] = (Math.random() * 2 - 1) * env * 0.35;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1600;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.28, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 1.8);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + 1.85);
}

const CELEBRATION_MESSAGES = [
  "Congratulations!",
  "Best of luck!",
  "LumbiniX has started!",
  "Innovate boldly!",
  "All the best!",
];

const CONFETTI_COLORS = ["#F9D423", "#7E4A9E", "#FFFFFF", "#FF6B6B", "#9B6BBA", "#D4AF37"];

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotate: number;
}

interface FloatMessage {
  id: number;
  text: string;
  x: number;
  delay: number;
}

function RibbonCutStage({ onCutComplete }: { onCutComplete: () => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const [scissors, setScissors] = useState({ x: 50, y: 50, visible: false, open: false });
  const [cutting, setCutting] = useState(false);
  const [cutDone, setCutDone] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [messages, setMessages] = useState<FloatMessage[]>([]);
  const lastTap = useRef(0);
  const drag = useRef<{
    active: boolean;
    startX: number;
    crossed: number;
    lastX: number;
  } | null>(null);

  function ensureAudio() {
    if (!audioCtx.current) {
      audioCtx.current = createAudioContext();
    }
    if (audioCtx.current?.state === "suspended") {
      void audioCtx.current.resume();
    }
    return audioCtx.current;
  }

  function spawnCelebrationFx() {
    const pieces: ConfettiPiece[] = Array.from({ length: 48 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.45,
      duration: 1.8 + Math.random() * 1.4,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 6 + Math.random() * 10,
      rotate: Math.random() * 360,
    }));
    setConfetti(pieces);

    const floats: FloatMessage[] = CELEBRATION_MESSAGES.map((text, i) => ({
      id: i,
      text,
      x: 12 + i * 18,
      delay: 0.15 + i * 0.18,
    }));
    setMessages(floats);
  }

  function playCutSounds() {
    const ctx = ensureAudio();
    if (!ctx) return;
    playScissorSnip(ctx);
    window.setTimeout(() => playCelebrationChime(ctx), 180);
    window.setTimeout(() => playClapping(ctx), 320);
    window.setTimeout(() => playCrowdCheer(ctx), 400);
  }

  function updateScissors(clientX: number, clientY: number, open: boolean) {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setScissors({ x, y, visible: true, open });
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (cutting || cutDone) return;
    ensureAudio();
    const stage = stageRef.current;
    if (!stage) return;
    stage.setPointerCapture(event.pointerId);
    drag.current = {
      active: true,
      startX: event.clientX,
      lastX: event.clientX,
      crossed: 0,
    };
    updateScissors(event.clientX, event.clientY, true);

    // Double-tap support (mobile)
    const now = Date.now();
    if (now - lastTap.current < 320) {
      triggerCut();
      lastTap.current = 0;
      return;
    }
    lastTap.current = now;
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current?.active || cutting || cutDone) return;
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const ribbonTop = rect.top + rect.height * 0.42;
    const ribbonBottom = rect.top + rect.height * 0.58;
    const inBand = event.clientY >= ribbonTop && event.clientY <= ribbonBottom;

    updateScissors(event.clientX, event.clientY, true);

    if (inBand) {
      const dx = Math.abs(event.clientX - drag.current.lastX);
      drag.current.crossed += dx;
      drag.current.lastX = event.clientX;
    }

    const travel = Math.abs(event.clientX - drag.current.startX);
    const needed = rect.width * 0.28;
    if (inBand && (drag.current.crossed > needed || travel > needed)) {
      triggerCut();
    }
  }

  function onPointerUp() {
    if (drag.current) drag.current.active = false;
    setScissors((prev) => ({ ...prev, open: false }));
  }

  function onRibbonDoubleClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    triggerCut();
  }

  function triggerCut() {
    if (cutting || cutDone) return;
    drag.current = null;
    setCutting(true);
    setScissors((prev) => ({ ...prev, open: true, x: 50, y: 50, visible: true }));
    playCutSounds();

    window.setTimeout(() => {
      setCutDone(true);
      setCutting(false);
      spawnCelebrationFx();
      window.setTimeout(onCutComplete, 3200);
    }, 700);
  }

  return (
    <div
      ref={stageRef}
      className="relative flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center touch-none select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <p className="mb-10 max-w-lg text-center text-sm text-white/70 sm:text-base">
        {cutDone
          ? "The ribbon has been cut — LumbiniX has started!"
          : "Double-click the ribbon to cut, or drag scissors across it."}
      </p>

      {/* Poles + ribbon */}
      <div className="relative flex w-full items-center px-2 sm:px-6">
        <div className="h-28 w-3 rounded-full bg-gradient-to-b from-amber-200 to-amber-600 shadow-lg sm:h-36 sm:w-4" />

        <div className="relative mx-1 flex-1 overflow-visible sm:mx-3">
          {!cutDone && (
            <motion.div
              role="button"
              tabIndex={0}
              aria-label="Double-click to cut the ribbon"
              onDoubleClick={onRibbonDoubleClick}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") triggerCut();
              }}
              className="relative h-14 w-full cursor-pointer overflow-hidden rounded-sm outline-none ring-accent/40 focus-visible:ring-2 sm:h-16"
              animate={cutting ? { scaleY: [1, 1.08, 1] } : undefined}
              transition={{ duration: 0.35 }}
            >
              {/* Brand purple → gold ceremonial ribbon */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#b57ad4] via-primary to-[#4a2864] shadow-[0_8px_30px_rgba(126,74,158,0.55)]" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-transparent to-accent/30" />
              <div className="absolute inset-y-0 left-0 w-full bg-[repeating-linear-gradient(90deg,rgba(249,212,35,0.35)_0_10px,transparent_10px_26px)]" />
              <div className="absolute inset-x-0 top-1 h-2 bg-white/30" />
              <div className="absolute inset-x-0 bottom-1 h-1.5 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white drop-shadow sm:text-xs">
                  LumbiniX 2026
                </span>
              </div>

              {cutting && (
                <motion.div
                  className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 bg-accent"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.45 }}
                />
              )}
            </motion.div>
          )}

          {cutDone && (
            <div className="relative h-28 w-full sm:h-32">
              <motion.div
                className="absolute left-0 top-0 h-14 w-[48%] overflow-hidden rounded-sm sm:h-16"
                initial={{ x: 0, rotate: 0, y: 0 }}
                animate={{ x: "-10%", rotate: -22, y: 80, opacity: 0.9 }}
                transition={{ type: "spring", stiffness: 70, damping: 12 }}
              >
                <div className="h-full w-full bg-gradient-to-b from-[#b57ad4] via-primary to-[#4a2864]" />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(249,212,35,0.3)_0_10px,transparent_10px_26px)]" />
                <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/25 to-transparent" />
              </motion.div>
              <motion.div
                className="absolute right-0 top-0 h-14 w-[48%] overflow-hidden rounded-sm sm:h-16"
                initial={{ x: 0, rotate: 0, y: 0 }}
                animate={{ x: "10%", rotate: 22, y: 80, opacity: 0.9 }}
                transition={{ type: "spring", stiffness: 70, damping: 12 }}
              >
                <div className="h-full w-full bg-gradient-to-b from-[#b57ad4] via-primary to-[#4a2864]" />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(249,212,35,0.3)_0_10px,transparent_10px_26px)]" />
                <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/25 to-transparent" />
              </motion.div>
            </div>
          )}
        </div>

        <div className="h-28 w-3 rounded-full bg-gradient-to-b from-amber-200 to-amber-600 shadow-lg sm:h-36 sm:w-4" />
      </div>

      {/* Scissors follower */}
      <AnimatePresence>
        {scissors.visible && !cutDone && (
          <motion.div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 text-accent drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
            style={{ left: `${scissors.x}%`, top: `${scissors.y}%` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: cutting ? [1, 1.2, 1] : 1,
              rotate: scissors.open ? -14 : 8,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ScissorsIcon className="h-16 w-16 sm:h-20 sm:w-20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.span
            key={piece.id}
            className="pointer-events-none absolute z-30 rounded-sm"
            style={{
              left: `${piece.x}%`,
              top: "35%",
              width: piece.size,
              height: piece.size * 0.6,
              backgroundColor: piece.color,
            }}
            initial={{ y: 0, opacity: 1, rotate: piece.rotate, scale: 1 }}
            animate={{
              y: 280 + Math.random() * 120,
              x: (Math.random() - 0.5) * 120,
              opacity: [1, 1, 0],
              rotate: piece.rotate + 220,
              scale: [1, 1.1, 0.7],
            }}
            transition={{ duration: piece.duration, delay: piece.delay, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Floating celebration messages */}
      <AnimatePresence>
        {messages.map((msg) => (
          <motion.p
            key={msg.id}
            className="pointer-events-none absolute z-40 whitespace-nowrap font-display text-lg font-bold text-accent drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] sm:text-2xl"
            style={{ left: `${msg.x}%`, top: "22%" }}
            initial={{ opacity: 0, y: 24, scale: 0.85 }}
            animate={{ opacity: [0, 1, 1, 0], y: -80, scale: 1 }}
            transition={{ duration: 2.4, delay: msg.delay, ease: "easeOut" }}
          >
            {msg.text}
          </motion.p>
        ))}
      </AnimatePresence>

      {cutting && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-48 w-48 rounded-full bg-accent/25 blur-3xl" />
        </motion.div>
      )}

      {cutDone && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="rounded-3xl border border-accent/30 bg-black/35 px-8 py-5 text-center backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">Celebration</p>
            <p className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Congratulations!
            </p>
            <p className="mt-1 text-sm text-white/75 sm:text-base">Best of luck to every team</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function DigitalOpeningCeremony() {
  const [stage, setStage] = useState<CeremonyStage>("sign");
  const [signature, setSignature] = useState<string | null>(null);

  function handleSigned(dataUrl: string) {
    setSignature(dataUrl);
    setStage("transition");
    window.setTimeout(() => setStage("ribbon"), 900);
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-primary-dark to-slate-900 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/40 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/20 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <img src="/finallogo.png" alt="LumbiniX" className="h-10 w-10 rounded-xl object-contain sm:h-12 sm:w-12" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent sm:text-xs">
              LumbiniX 2026
            </p>
            <p className="text-sm font-display font-bold text-white sm:text-base">
              Digital Opening Ceremony
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-xs text-white/50 sm:flex">
          <span className={stage === "sign" || stage === "transition" ? "text-accent" : ""}>1. Sign</span>
          <span aria-hidden="true">→</span>
          <span className={stage === "ribbon" || stage === "complete" ? "text-accent" : ""}>2. Ribbon Cut</span>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-12 pt-4 sm:px-8">
        <AnimatePresence mode="wait">
          {(stage === "sign" || stage === "transition") && (
            <motion.div
              key="sign"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="flex w-full flex-col items-center"
            >
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Official Guest
              </p>
              <h1 className="mb-3 text-center font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                Sign to open <span className="text-accent">LumbiniX</span>
              </h1>
              <p className="mb-8 max-w-xl text-center text-sm text-white/70 sm:text-base">
                Honored guest — please place your signature below. When complete, the ceremony continues to the ribbon cutting.
              </p>
              <SignaturePad onSigned={handleSigned} />
            </motion.div>
          )}

          {stage === "ribbon" && (
            <motion.div
              key="ribbon"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              className="flex w-full flex-col items-center"
            >
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Ribbon Cutting
              </p>
              <h1 className="mb-2 text-center font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                Cut the ribbon
              </h1>
              {signature && (
                <div className="mb-4 flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                  <img src={signature} alt="Guest signature" className="h-8 w-20 rounded bg-white object-contain px-1" />
                  <span className="text-xs text-white/60">Signed & verified</span>
                </div>
              )}
              <RibbonCutStage onCutComplete={() => setStage("complete")} />
            </motion.div>
          )}

          {stage === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                className="mb-6 h-24 w-24 rounded-full bg-accent/20 blur-xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                It has begun
              </p>
              <h1 className="font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                LumbiniX has <span className="text-accent">started</span>
              </h1>
              <p className="mt-4 max-w-lg text-base text-white/70 sm:text-lg">
                Where spirituality meets innovation — let’s build.
              </p>
              {signature && (
                <img
                  src={signature}
                  alt="Official signature"
                  className="mt-8 h-16 w-44 rounded-xl border border-white/15 bg-white object-contain p-2"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
