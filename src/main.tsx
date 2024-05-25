import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

let deferredPrompt: any;
const btnAdd = document.getElementById('pwa')

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    if (btnAdd) {
        btnAdd.style.display = 'block';
    }
});

if (btnAdd) {
    btnAdd.addEventListener('click', (e: any) => {
        // hide our user interface that shows our A2HS button
        console.log(e)
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


