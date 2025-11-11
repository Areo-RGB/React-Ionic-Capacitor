import { useState, useRef, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonRange,
  IonLabel,
  IonItem,
  IonToggle,
} from '@ionic/react';
import { camera, play, stop, settings, arrowBack } from 'ionicons/icons';
import { CameraPreview } from '@capacitor-community/camera-preview';
import './Sprints.css';

interface DetectionZone {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Sprints: React.FC = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [detectionActive, setDetectionActive] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finalTime, setFinalTime] = useState<number | null>(null);
  const [detectionCount, setDetectionCount] = useState(0);
  const [sensitivity, setSensitivity] = useState(30);
  const [showSettings, setShowSettings] = useState(false);
  const [detectionZone, setDetectionZone] = useState<DetectionZone>({
    x: 20,
    y: 40,
    width: 60,
    height: 20,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousFrameRef = useRef<ImageData | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      stopCamera();
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      await CameraPreview.start({
        position: 'rear',
        parent: 'camera-preview',
        className: 'camera-preview',
        toBack: false,
        width: window.innerWidth,
        height: window.innerHeight * 0.6,
      });
      setCameraActive(true);
    } catch (error) {
      console.error('Error starting camera:', error);
      alert('Failed to start camera. Please check permissions.');
    }
  };

  const stopCamera = async () => {
    try {
      await CameraPreview.stop();
      setCameraActive(false);
      setDetectionActive(false);
      stopTimer();
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    } catch (error) {
      console.error('Error stopping camera:', error);
    }
  };

  const captureFrame = async (): Promise<ImageData | null> => {
    try {
      const result = await CameraPreview.captureSample({
        quality: 50,
      });

      const canvas = canvasRef.current;
      if (!canvas) return null;

      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          resolve(imageData);
        };
        img.onerror = () => resolve(null);
        img.src = `data:image/jpeg;base64,${result.value}`;
      });
    } catch (error) {
      console.error('Error capturing frame:', error);
      return null;
    }
  };

  const detectMotion = (currentFrame: ImageData, previousFrame: ImageData): boolean => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const zoneX = Math.floor((detectionZone.x / 100) * canvas.width);
    const zoneY = Math.floor((detectionZone.y / 100) * canvas.height);
    const zoneWidth = Math.floor((detectionZone.width / 100) * canvas.width);
    const zoneHeight = Math.floor((detectionZone.height / 100) * canvas.height);

    let diffPixels = 0;
    let totalPixels = 0;

    for (let y = zoneY; y < zoneY + zoneHeight && y < canvas.height; y++) {
      for (let x = zoneX; x < zoneX + zoneWidth && x < canvas.width; x++) {
        const idx = (y * canvas.width + x) * 4;

        const rDiff = Math.abs(currentFrame.data[idx] - previousFrame.data[idx]);
        const gDiff = Math.abs(currentFrame.data[idx + 1] - previousFrame.data[idx + 1]);
        const bDiff = Math.abs(currentFrame.data[idx + 2] - previousFrame.data[idx + 2]);

        const avgDiff = (rDiff + gDiff + bDiff) / 3;

        if (avgDiff > sensitivity) {
          diffPixels++;
        }
        totalPixels++;
      }
    }

    const motionPercentage = (diffPixels / totalPixels) * 100;
    return motionPercentage > 5; // Motion detected if 5% of pixels changed
  };

  const startDetection = () => {
    if (!cameraActive) {
      alert('Please start the camera first');
      return;
    }

    setDetectionActive(true);
    setDetectionCount(0);
    setFinalTime(null);
    previousFrameRef.current = null;

    detectionIntervalRef.current = setInterval(async () => {
      const currentFrame = await captureFrame();
      if (!currentFrame) return;

      if (previousFrameRef.current) {
        const motionDetected = detectMotion(currentFrame, previousFrameRef.current);

        if (motionDetected) {
          setDetectionCount((count) => {
            const newCount = count + 1;

            if (newCount === 1) {
              // First detection - start timer
              startTimer();
            } else if (newCount === 2) {
              // Second detection - stop timer
              stopTimer();
              stopDetection();
            }

            return newCount;
          });

          // Brief pause after detection to avoid multiple triggers
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      previousFrameRef.current = currentFrame;
    }, 100); // Check every 100ms
  };

  const stopDetection = () => {
    setDetectionActive(false);
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }
  };

  const startTimer = () => {
    startTimeRef.current = Date.now();
    setTimerRunning(true);
    setElapsedTime(0);

    timerIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setElapsedTime(elapsed);
    }, 10); // Update every 10ms for precision
  };

  const stopTimer = () => {
    setTimerRunning(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setFinalTime(elapsedTime);
  };

  const resetTimer = () => {
    stopTimer();
    setElapsedTime(0);
    setFinalTime(null);
    setDetectionCount(0);
    previousFrameRef.current = null;
  };

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}s`;
  };

  const handleZoneTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const touch = 'touches' in e ? e.touches[0] : e;
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleZoneTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const touch = 'touches' in e ? e.touches[0] : e;
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;

    const container = document.getElementById('camera-preview');
    if (!container) return;

    const percentDeltaX = (deltaX / container.offsetWidth) * 100;
    const percentDeltaY = (deltaY / container.offsetHeight) * 100;

    setDetectionZone((zone) => ({
      ...zone,
      x: Math.max(0, Math.min(100 - zone.width, zone.x + percentDeltaX)),
      y: Math.max(0, Math.min(100 - zone.height, zone.y + percentDeltaY)),
    }));

    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleZoneTouchEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gradient-to-r from-orange-600 to-red-600">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" icon={arrowBack} />
          </IonButtons>
          <IonTitle className="text-white font-bold">Sprint Timer</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowSettings(!showSettings)}>
              <IonIcon icon={settings} className="text-white" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-gray-50">
        <div className="flex flex-col h-full">
          {/* Camera Preview Container */}
          <div className="relative bg-black" style={{ height: '60vh' }}>
            <div
              id="camera-preview"
              className="w-full h-full"
              style={{ position: 'relative' }}
            >
              {!cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <IonIcon icon={camera} className="text-6xl mb-4 opacity-50" />
                    <p className="text-lg opacity-75">Camera not started</p>
                  </div>
                </div>
              )}

              {/* Detection Zone Overlay */}
              {cameraActive && (
                <div
                  className="detection-zone"
                  style={{
                    position: 'absolute',
                    left: `${detectionZone.x}%`,
                    top: `${detectionZone.y}%`,
                    width: `${detectionZone.width}%`,
                    height: `${detectionZone.height}%`,
                    border: `3px ${detectionActive ? 'solid' : 'dashed'} ${
                      detectionCount === 0
                        ? '#ff9800'
                        : detectionCount === 1
                        ? '#4caf50'
                        : '#f44336'
                    }`,
                    backgroundColor: `${
                      detectionCount === 0
                        ? 'rgba(255, 152, 0, 0.2)'
                        : detectionCount === 1
                        ? 'rgba(76, 175, 80, 0.2)'
                        : 'rgba(244, 67, 54, 0.2)'
                    }`,
                    cursor: 'move',
                    touchAction: 'none',
                  }}
                  onTouchStart={handleZoneTouchStart}
                  onTouchMove={handleZoneTouchMove}
                  onTouchEnd={handleZoneTouchEnd}
                  onMouseDown={handleZoneTouchStart}
                  onMouseMove={handleZoneTouchMove}
                  onMouseUp={handleZoneTouchEnd}
                  onMouseLeave={handleZoneTouchEnd}
                >
                  <div className="text-white text-center text-sm font-bold mt-2">
                    {detectionCount === 0 && 'Detection Zone'}
                    {detectionCount === 1 && 'Started!'}
                    {detectionCount === 2 && 'Stopped!'}
                  </div>
                </div>
              )}
            </div>

            {/* Hidden canvas for frame processing */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <IonCard className="m-2">
              <IonCardHeader>
                <IonCardTitle>Detection Settings</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonLabel>Sensitivity</IonLabel>
                  <IonRange
                    min={10}
                    max={100}
                    value={sensitivity}
                    onIonChange={(e) => setSensitivity(e.detail.value as number)}
                    pin
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>Zone Width</IonLabel>
                  <IonRange
                    min={20}
                    max={80}
                    value={detectionZone.width}
                    onIonChange={(e) =>
                      setDetectionZone({ ...detectionZone, width: e.detail.value as number })
                    }
                    pin
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>Zone Height</IonLabel>
                  <IonRange
                    min={10}
                    max={50}
                    value={detectionZone.height}
                    onIonChange={(e) =>
                      setDetectionZone({ ...detectionZone, height: e.detail.value as number })
                    }
                    pin
                  />
                </IonItem>
              </IonCardContent>
            </IonCard>
          )}

          {/* Timer Display */}
          <div className="flex-1 p-4">
            <IonCard className="bg-gradient-to-br from-orange-600 to-red-600 text-white">
              <IonCardContent className="text-center py-6">
                <div className="text-5xl font-bold mb-2">
                  {formatTime(finalTime !== null ? finalTime : elapsedTime)}
                </div>
                <div className="text-lg opacity-90">
                  {detectionCount === 0 && 'Waiting for start...'}
                  {detectionCount === 1 && timerRunning && 'Timer Running!'}
                  {detectionCount === 2 && 'Sprint Complete!'}
                </div>
              </IonCardContent>
            </IonCard>

            {/* Control Buttons */}
            <div className="flex gap-2 mt-4">
              {!cameraActive ? (
                <IonButton expand="block" onClick={startCamera} className="flex-1">
                  <IonIcon icon={camera} slot="start" />
                  Start Camera
                </IonButton>
              ) : (
                <IonButton expand="block" onClick={stopCamera} color="danger" className="flex-1">
                  <IonIcon icon={stop} slot="start" />
                  Stop Camera
                </IonButton>
              )}

              {cameraActive && !detectionActive && (
                <IonButton expand="block" onClick={startDetection} color="success" className="flex-1">
                  <IonIcon icon={play} slot="start" />
                  Start Detection
                </IonButton>
              )}

              {detectionActive && (
                <IonButton expand="block" onClick={stopDetection} color="warning" className="flex-1">
                  <IonIcon icon={stop} slot="start" />
                  Stop Detection
                </IonButton>
              )}

              {(finalTime !== null || elapsedTime > 0) && (
                <IonButton expand="block" onClick={resetTimer} color="medium" className="flex-1">
                  Reset
                </IonButton>
              )}
            </div>

            {/* Instructions */}
            <IonCard className="mt-4">
              <IonCardHeader>
                <IonCardTitle className="text-lg">How to Use</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <ol className="list-decimal list-inside text-sm space-y-2">
                  <li>Start the camera</li>
                  <li>Adjust the detection zone by dragging it</li>
                  <li>Fine-tune sensitivity in settings if needed</li>
                  <li>Start detection</li>
                  <li>Timer starts when motion is detected in the zone</li>
                  <li>Timer stops on second detection</li>
                </ol>
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Sprints;
