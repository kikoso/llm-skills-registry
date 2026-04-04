import '../styles/globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        id="firebase-analytics"
        type="module"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
            import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

            const firebaseConfig = {
              apiKey: "AIzaSyDCt_H4sxMOav_GwzkbWW_rQyczjl19-B8",
              authDomain: "find-skills.firebaseapp.com",
              projectId: "find-skills",
              storageBucket: "find-skills.firebasestorage.app",
              messagingSenderId: "538719779408",
              appId: "1:538719779408:web:1e33469820ae1ecc9b6f55",
              measurementId: "G-2H1RS0BZ3H"
            };

            const app = initializeApp(firebaseConfig);
            const analytics = getAnalytics(app);
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
