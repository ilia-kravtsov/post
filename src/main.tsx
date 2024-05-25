import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

let deferredPrompt: any;

const btnAdd = document.getElementById('pwa');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (btnAdd) {
        btnAdd.style.display = 'block';
    }
});

if (btnAdd) {
    console.log('btn found');
    btnAdd.addEventListener('click', (e: any) => {
        console.log(e);
        btnAdd.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
}