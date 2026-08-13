import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, Flame } from 'lucide-react';
import { Button } from '../ui/Button';

interface FocusTimerWidgetProps {
  taskTitle?: string;
  defaultMinutes?: number;
  onTimerComplete?: () => void;
}

export const FocusTimerWidget: React.FC<FocusTimerWidgetProps> = ({
  taskTitle = "Bugünün Odak Görevi",
  defaultMinutes = 25,
  onTimerComplete
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(defaultMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isAmbientSoundOn, setIsAmbientSoundOn] = useState<boolean>(false);
  const [audioRef] = useState<HTMLAudioElement | null>(() => {
    if (typeof window !== 'undefined') {
      const a = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      a.loop = true;
      return a;
    }
    return null;
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (audioRef) audioRef.pause();
      if (onTimerComplete) onTimerComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, audioRef, onTimerComplete]);

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
    if (!isRunning && isAmbientSoundOn && audioRef) {
      audioRef.play().catch(() => {});
    } else if (isRunning && audioRef) {
      audioRef.pause();
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(defaultMinutes * 60);
    if (audioRef) audioRef.pause();
  };

  const toggleSound = () => {
    const nextState = !isAmbientSoundOn;
    setIsAmbientSoundOn(nextState);
    if (audioRef) {
      if (nextState && isRunning) {
        audioRef.play().catch(() => {});
      } else {
        audioRef.pause();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.round(((defaultMinutes * 60 - timeLeft) / (defaultMinutes * 60)) * 100);

  return (
    <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C85A32]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C85A32] animate-ping" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {isRunning ? 'ODAK OTURUMU AKTİF' : 'ODAK ZAMANLAYICI'}
          </span>
        </div>

        <button
          onClick={toggleSound}
          title={isAmbientSoundOn ? 'Odak Sesini Kapat' : 'Odak Sesini Aç (Ambient Yağmur)'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
            isAmbientSoundOn
              ? 'bg-[#C85A32]/20 border-[#C85A32] text-[#C85A32]'
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          {isAmbientSoundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{isAmbientSoundOn ? 'Ambient Açık' : 'Odak Sesi'}</span>
        </button>
      </div>

      <div className="text-center py-2 space-y-2">
        <div className="text-5xl sm:text-6xl font-black font-mono tracking-wider text-white">
          {formatTime(timeLeft)}
        </div>

        <p className="text-xs text-slate-400 line-clamp-1 max-w-sm mx-auto font-medium">
          Hedef: <span className="text-slate-200">{taskTitle}</span>
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-1.5 max-w-xs mx-auto overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#C85A32] to-amber-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <Button
          onClick={toggleTimer}
          size="md"
          className={`px-6 font-bold ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-[#C85A32] hover:bg-[#B04A26] text-white shadow-lg shadow-[#C85A32]/30'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 mr-1.5" />
              Duraklat
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-1.5 fill-white" />
              Oturumu Başlat
            </>
          )}
        </Button>

        <button
          onClick={resetTimer}
          className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          title="Zamanlayıcıyı Sıfırla"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
