import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { camera, bluetooth, analytics, phonePortrait } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gradient-to-r from-blue-600 to-purple-600">
          <IonTitle className="text-white font-bold">Mobile App Features</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="bg-gray-50">
        <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">

          {/* Camera Preview Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <IonIcon icon={camera} className="text-4xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Camera Preview</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Access real-time camera preview functionality with advanced controls.
              Capture, analyze, and process images directly from your device's camera.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Real-time
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                High-res
              </span>
            </div>
          </div>

          {/* Bluetooth LE Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <IonIcon icon={bluetooth} className="text-4xl text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Bluetooth LE</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Connect to Bluetooth Low Energy devices with ease. Scan, pair, and
              communicate with IoT devices and sensors for seamless integration.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                Low Energy
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                IoT Ready
              </span>
            </div>
          </div>

          {/* TensorFlow Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <IonIcon icon={analytics} className="text-4xl text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">TensorFlow AI</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Leverage machine learning capabilities powered by TensorFlow.js.
              Run AI models directly in the browser for intelligent features.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                ML Powered
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                On-device
              </span>
            </div>
          </div>

          {/* App Info Card */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white transform transition-all hover:scale-105">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <IonIcon icon={phonePortrait} className="text-4xl text-white" />
              </div>
              <h2 className="text-2xl font-bold">Mobile First</h2>
            </div>
            <p className="leading-relaxed opacity-90">
              Built with React, Ionic, and Capacitor for a native mobile experience.
              Optimized for performance and designed with mobile-first principles.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                React
              </span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                Ionic
              </span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                Capacitor
              </span>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
