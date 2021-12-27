var promptInstall;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    promptInstall = e;
})

function teste() {
    promptInstall.prompt();
}