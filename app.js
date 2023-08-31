const syn = window.speechSynthesis;
const text = document.getElementById('text');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const voice = document.getElementById('select');
const vol = document.getElementById('volume');
const btn = document.getElementById('btn');
const container = document.getElementById('container');

let voices = []

const getvoices = () => {
    voices = syn.getVoices();
    voices.forEach(v => {
        const option = document.createElement('option')
        option.textContent = v.name + '(' + v.lang + ')';
        option.setAttribute('data-lang', v.lang)
        option.setAttribute('data-name', v.name)
        voice.appendChild(option);
    })
};

getvoices();
if (syn.onvoiceschanged !== undefined) {
    syn.onvoiceschanged = getvoices;
}



const speak = () => {
    if (syn.speaking) {
        console.error('Already speaking !!!');
        return
    }
    if (text.value !== "") {
        var x = window.matchMedia("(max-width: 500px)")
        if (x.matches) {
            container.style.background = 'black url(wave4.gif)';
            container.style.backgroundRepeat = 'repeat-x';
            container.style.backgroundPosition = 'center';
            container.style.backgroundSize = "100%";
        } else {
            container.style.background = 'black url(wave4.gif)';
            container.style.backgroundRepeat = 'repeat-x';
            container.style.backgroundPosition = 'center';
            container.style.backgroundSize = '30%';
        }
        const speaktext = new SpeechSynthesisUtterance(text.value); // to speak
        speaktext.onend = end => {
            container.style.background = 'black';
            console.log("Done speaking");
        }
        speaktext.onerror = e => {
            let alert = new SpeechSynthesisUtterance("Something went wrong !!!")
            syn.speak(alert);
        }
        var selectedvoice = select.selectedOptions[0].getAttribute('data-name');
        voices.forEach(vc => {
            if (vc.name === selectedvoice) {
                speaktext.voice = vc;
            }
        })

        speaktext.rate = rate.value;
        speaktext.volume = vol.value;
        speaktext.pitch = pitch.value;
        syn.speak(speaktext)
    } else {
        var x = window.matchMedia("(max-width: 500px)")
        if (x.matches) {
            container.style.background = 'black url(wave4.gif)';
            container.style.backgroundRepeat = 'repeat-x';
            container.style.backgroundPosition = 'center';
            container.style.backgroundSize = "100%";
        } else {
            container.style.background = 'black url(wave4.gif)';
            container.style.backgroundRepeat = 'repeat-x';
            container.style.backgroundPosition = 'center';
            container.style.backgroundSize = '30%';
        }
        let alert = new SpeechSynthesisUtterance("Type something first!!!")
        syn.speak(alert);
        alert.onend = end => {
            container.style.background = 'black';
        }

    }
}

btn.addEventListener('click', () => {
    speak();
    text.blur();
})

pitch.addEventListener('change', () => {
    container.style.background = 'black';
    syn.cancel();
    speak()
})
rate.addEventListener('change', () => {
    container.style.background = 'black';
    syn.cancel();
    speak()
})
select.addEventListener('change', () => {
    container.style.background = 'black';
    syn.cancel();
    speak()
})
vol.addEventListener('change', () => {
    container.style.background = 'black';
    syn.cancel();
    speak();
})