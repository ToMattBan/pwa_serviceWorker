var promptInstall;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    promptInstall = e;
})

function teste() {
    if (promptInstall) {
        promptInstall.prompt();
        promptInstall.userChoice.then((escolha) => {
            if (escolha.outcome == "acepted") {
                console.log('Instalando');
            } else {
                console.log('User não quis');
            }

            promptInstall = null;
        });
    };
};