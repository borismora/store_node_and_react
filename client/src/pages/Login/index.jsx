import { useState } from 'react';
import './Login.css';
import SignIn from '../../components/modules/SignIn';
import SignUp from '../../components/modules/SignUp';

export default function Login () {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="tabs-container">
      <div className="tabs">
        <button
          className={activeTab === 'signin' ? 'active' : ''}
          onClick={() => setActiveTab('signin')}
        >
          Iniciar Sesión
        </button>
        <button
          className={activeTab === 'signup' ? 'active' : ''}
          onClick={() => setActiveTab('signup')}
        >
          Registrarse
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'signin' && <SignIn />}
        {activeTab === 'signup' && <SignUp />}
      </div>
    </div>
  );
}