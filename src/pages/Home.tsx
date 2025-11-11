import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonLabel } from '@ionic/react';
import { camera, bluetooth, analytics, phonePortrait, timer } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mobile App Features</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>

          {/* Camera Preview Card */}
          <IonCard>
            <IonCardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <IonIcon icon={camera} style={{ fontSize: '48px' }} color="primary" />
                <IonCardTitle>Camera Preview</IonCardTitle>
              </div>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Access real-time camera preview functionality with advanced controls.
                Capture, analyze, and process images directly from your device's camera.
              </p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <IonChip color="primary">
                  <IonLabel>Real-time</IonLabel>
                </IonChip>
                <IonChip color="primary">
                  <IonLabel>High-res</IonLabel>
                </IonChip>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Bluetooth LE Card */}
          <IonCard>
            <IonCardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <IonIcon icon={bluetooth} style={{ fontSize: '48px' }} color="secondary" />
                <IonCardTitle>Bluetooth LE</IonCardTitle>
              </div>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Connect to Bluetooth Low Energy devices with ease. Scan, pair, and
                communicate with IoT devices and sensors for seamless integration.
              </p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <IonChip color="secondary">
                  <IonLabel>Low Energy</IonLabel>
                </IonChip>
                <IonChip color="secondary">
                  <IonLabel>IoT Ready</IonLabel>
                </IonChip>
              </div>
            </IonCardContent>
          </IonCard>

          {/* TensorFlow Card */}
          <IonCard>
            <IonCardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <IonIcon icon={analytics} style={{ fontSize: '48px' }} color="success" />
                <IonCardTitle>TensorFlow AI</IonCardTitle>
              </div>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Leverage machine learning capabilities powered by TensorFlow.js.
                Run AI models directly in the browser for intelligent features.
              </p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <IonChip color="success">
                  <IonLabel>ML Powered</IonLabel>
                </IonChip>
                <IonChip color="success">
                  <IonLabel>On-device</IonLabel>
                </IonChip>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Sprints Card */}
          <IonCard button onClick={() => history.push('/sprints')}>
            <IonCardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <IonIcon icon={timer} style={{ fontSize: '48px' }} color="warning" />
                <IonCardTitle>Sprints.</IonCardTitle>
              </div>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Camera-based sprint timer using motion detection. Works as an alternative
                to light barriers for measuring sprint times with customizable detection zones.
              </p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <IonChip color="warning">
                  <IonLabel>Motion Detection</IonLabel>
                </IonChip>
                <IonChip color="warning">
                  <IonLabel>Timer</IonLabel>
                </IonChip>
              </div>
            </IonCardContent>
          </IonCard>

          {/* App Info Card */}
          <IonCard color="tertiary">
            <IonCardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <IonIcon icon={phonePortrait} style={{ fontSize: '48px', color: 'white' }} />
                <IonCardTitle style={{ color: 'white' }}>Mobile First</IonCardTitle>
              </div>
            </IonCardHeader>
            <IonCardContent style={{ color: 'white' }}>
              <p>
                Built with React, Ionic, and Capacitor for a native mobile experience.
                Optimized for performance and designed with mobile-first principles.
              </p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <IonChip style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
                  <IonLabel style={{ color: 'white' }}>React</IonLabel>
                </IonChip>
                <IonChip style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
                  <IonLabel style={{ color: 'white' }}>Ionic</IonLabel>
                </IonChip>
                <IonChip style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
                  <IonLabel style={{ color: 'white' }}>Capacitor</IonLabel>
                </IonChip>
              </div>
            </IonCardContent>
          </IonCard>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
