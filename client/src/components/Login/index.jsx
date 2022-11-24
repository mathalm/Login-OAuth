import React from 'react';
import './styles.css';
import LeftDiv from './LeftDiv';
import RightDiv from './RightDiv/inde';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Login() {



  return (
    <GoogleOAuthProvider clientId='14217658420-992vv5aflqaivlc3fqpf21fn684sd88r.apps.googleusercontent.com'>
      <main className='page-login'>
        <div className='page'>
          <div className='detail'>
            <svg width="6671" height="1929" viewBox="0 0 6671 1929" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1928V84.4997H338C450.333 133.666 702.4 202.5 812 84.4997C921.6 -33.5005 1173.67 35.3329 1286 84.4997C1377.33 130 1610.6 193.7 1813 84.4997C2015.4 -24.7005 2199.33 38.9996 2266 84.4997C2392.5 147.666 2681.3 236.1 2824.5 84.4997C2967.7 -67.1004 3207.17 21.333 3309 84.4997C3414.33 130 3679.8 193.7 3899 84.4997C4118.2 -24.7004 4355.67 38.9997 4447 84.4997C4562.83 130 4834.6 193.7 4995 84.4997C5155.4 -24.7004 5455.17 38.9997 5585 84.4997C5715 140.666 5996 219.3 6080 84.4997C6164 -50.3003 6508.33 28.333 6670 84.4997V1928H1Z" fill="#D9D9D9" stroke="black" strokeOpacity="0.1" />
            </svg>
          </div>
          <LeftDiv />
          <RightDiv />
        </div>
        <footer className='footer-login'>
          <div>
            <span>
              All rights reserved &copy;
            </span>
          </div>
        </footer>
      </main>
    </GoogleOAuthProvider>
  );
}

export default Login;