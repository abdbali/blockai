// Core application logic

let workspace = null;
let currentLesson = 1;
let videoElement = null;
let canvasElement = null;
let stream = null;
let faceTracker = null;
let handTracker = null;

// The AI API exposed to the generated code
window.aiAPI = {
    log: function(msg) {
        const consoleDiv = document.getElementById('outputConsole');
        const line = document.createElement('div');
        line.textContent = '> ' + msg;
        consoleDiv.appendChild(line);
        consoleDiv.scrollTop = consoleDiv.scrollHeight;
    },
    
    startCamera: async function() {
        this.log('Kamera başlatılıyor...');
        const mediaArea = document.getElementById('mediaArea');
        mediaArea.style.display = 'flex';
        document.getElementById('mediaPlaceholder').style.display = 'none';
        
        if (!videoElement) {
            // Container for overlapping video and canvas
            const container = document.createElement('div');
            container.style.position = 'relative';
            container.style.display = 'inline-block';
            
            videoElement = document.createElement('video');
            videoElement.setAttribute('autoplay', '');
            videoElement.setAttribute('playsinline', '');
            videoElement.style.transform = 'scaleX(-1)'; // Mirror
            videoElement.style.display = 'block'; // Remove inline spacing
            
            canvasElement = document.createElement('canvas');
            canvasElement.style.position = 'absolute';
            canvasElement.style.top = '0';
            canvasElement.style.left = '0';
            canvasElement.style.transform = 'scaleX(-1)'; // Mirror to match video
            
            container.appendChild(videoElement);
            container.appendChild(canvasElement);
            mediaArea.appendChild(container);
        }
        
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            videoElement.srcObject = stream;
            
            return new Promise((resolve) => {
                videoElement.onloadedmetadata = () => {
                    // Set explicit dimensions for ML models to avoid 0x0 errors
                    videoElement.width = videoElement.videoWidth;
                    videoElement.height = videoElement.videoHeight;
                    canvasElement.width = videoElement.videoWidth;
                    canvasElement.height = videoElement.videoHeight;
                    this.log('Kamera başarıyla açıldı.');
                    resolve();
                };
            });
        } catch (err) {
            this.log('Kamera hatası: ' + err.message);
        }
    },
    
    stopCamera: function() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
        if (videoElement) {
            videoElement.srcObject = null;
        }
        if (canvasElement) {
            const ctx = canvasElement.getContext('2d');
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        }
        document.getElementById('mediaPlaceholder').style.display = 'block';
        document.getElementById('mediaArea').style.display = 'none';
        this.log('Kamera kapatıldı.');
    },

    applyColorFilter: function(color) {
        if (!videoElement) {
            this.log('Hata: Önce kamerayı açmalısınız.');
            return;
        }
        
        let filterCSS = '';
        switch(color) {
            case 'red':
                filterCSS = 'sepia(100%) hue-rotate(-50deg) saturate(500%) brightness(80%)';
                this.log('Kırmızı renk filtresi uygulandı.');
                break;
            case 'green':
                filterCSS = 'sepia(100%) hue-rotate(50deg) saturate(500%) brightness(80%)';
                this.log('Yeşil renk filtresi uygulandı.');
                break;
            case 'blue':
                filterCSS = 'sepia(100%) hue-rotate(150deg) saturate(500%) brightness(80%)';
                this.log('Mavi renk filtresi uygulandı.');
                break;
            case 'none':
            default:
                filterCSS = 'none';
                this.log('Renk filtresi temizlendi.');
                break;
        }
        
        videoElement.style.filter = filterCSS;
    },

    speakText: function(text) {
        this.log('Seslendiriliyor: "' + text + '"');
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'tr-TR';
            window.speechSynthesis.speak(utterance);
        } else {
            this.log('Hata: Tarayıcınız metin okumayı desteklemiyor.');
        }
    },

    listenToSpeech: async function() {
        // Request persistent mic permission to avoid spamming the prompt on file:// protocols
        try { await navigator.mediaDevices.getUserMedia({ audio: true }); } catch(e) {}
        
        return new Promise((resolve) => {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                this.log("Hata: Tarayıcınız ses tanımayı desteklemiyor.");
                resolve("");
                return;
            }
            const recognition = new SpeechRecognition();
            recognition.lang = 'tr-TR';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = (event) => {
                let transcript = event.results[0][0].transcript;
                // Strip punctuation so strict equality checks work in Blockly
                transcript = transcript.toLowerCase().replace(/[.,!?]/g, '').trim();
                this.log("Duyulan ses: " + transcript);
                resolve(transcript);
            };
            
            recognition.onerror = (event) => {
                this.log("Ses anlaşılamadı veya hata: " + event.error);
                resolve("");
            };

            this.log("🎤 Sizi dinliyorum...");
            recognition.start();
        });
    },

    listenSpeech: async function() {
        return this.listenToSpeech();
    },

    startFaceTracking: async function() {
        await this.startCamera();
        this.log('Yüz tespiti modeli yükleniyor... Lütfen bekleyin.');
        return new Promise((resolve) => {
            const faceapi = ml5.faceApi(videoElement, { withLandmarks: true, withDescriptors: false }, () => {
                this.log('Yüz tespiti modeli yüklendi! Yüzler aranıyor...');
                const ctx = canvasElement.getContext('2d');
                
                const detectFace = () => {
                    faceapi.detect((err, results) => {
                        if (err) return;
                        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                        if (results && results.length > 0) {
                            if (!this._lastFaceLog || Date.now() - this._lastFaceLog > 3000) {
                                this.log(`Yüz tespit edildi! (${results.length} kişi)`);
                                this._lastFaceLog = Date.now();
                            }
                            ctx.strokeStyle = '#00FF00';
                            ctx.lineWidth = 4;
                            results.forEach(res => {
                                const box = res.detection.box;
                                ctx.strokeRect(box.x, box.y, box.width, box.height);
                            });
                        }
                        requestAnimationFrame(detectFace);
                    });
                };
                detectFace();
                resolve();
            });
        });
    },

    startHandTracking: async function() {
        await this.startCamera();
        this.log('El tespiti modeli (Handpose) yükleniyor...');
        return new Promise((resolve) => {
            handTracker = ml5.handpose(videoElement, () => {
                this.log('El modeli yüklendi! Eller aranıyor...');
                const ctx = canvasElement.getContext('2d');
                
                handTracker.on('predict', results => {
                    this._latestHandResults = results; // Cache for other functions
                    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                    if (results && results.length > 0) {
                        if (!this._lastHandLog || Date.now() - this._lastHandLog > 3000) {
                            this.log(`El tespit edildi! (Güven skoru: ${Math.round(results[0].handInViewConfidence * 100)}%)`);
                            this._lastHandLog = Date.now();
                        }
                        
                        // Check virtual mouse / drag logic
                        if (this._virtualMouseEnabled) {
                            const indexTip = results[0].landmarks[8];
                            const thumbTip = results[0].landmarks[4];
                            
                            // Map canvas coordinates to screen window coordinates
                            // Canvas is 640x480. We map this to window.innerWidth / window.innerHeight
                            const screenX = (indexTip[0] / 640) * window.innerWidth;
                            const screenY = (indexTip[1] / 480) * window.innerHeight;
                            
                            this.moveVirtualCursor(screenX, screenY);

                            // Calculate pinch distance
                            const dx = indexTip[0] - thumbTip[0];
                            const dy = indexTip[1] - thumbTip[1];
                            const distance = Math.sqrt(dx*dx + dy*dy);
                            
                            // If pinched (distance < 30), simulate mousedown
                            if (distance < 30) {
                                if (!this._isPinched) {
                                    this._isPinched = true;
                                    this.simulateMouseEvent('mousedown', screenX, screenY);
                                    this.log("El ile Tıklama/Tutma (Pinch) algılandı!");
                                } else {
                                    this.simulateMouseEvent('mousemove', screenX, screenY);
                                }
                            } else {
                                if (this._isPinched) {
                                    this._isPinched = false;
                                    this.simulateMouseEvent('mouseup', screenX, screenY);
                                    this.log("El ile Bırakma algılandı!");
                                }
                            }
                        }

                        // Draw hand keypoints
                        ctx.fillStyle = '#FF0000';
                        ctx.strokeStyle = '#00FF00';
                        ctx.lineWidth = 2;
                        for (let i = 0; i < results.length; i += 1) {
                            const hand = results[i];
                            for (let j = 0; j < hand.landmarks.length; j += 1) {
                                const keypoint = hand.landmarks[j];
                                ctx.beginPath();
                                ctx.arc(keypoint[0], keypoint[1], 5, 0, 2 * Math.PI);
                                ctx.fill();
                            }
                        }
                    }
                });
                resolve();
            });
        });
    },

    // --- Virtual Mouse / Pointer Functions ---
    enableVirtualCursor: function() {
        this._virtualMouseEnabled = true;
        if (!this._cursorEl) {
            this._cursorEl = document.createElement('div');
            this._cursorEl.style.position = 'fixed';
            this._cursorEl.style.width = '20px';
            this._cursorEl.style.height = '20px';
            this._cursorEl.style.borderRadius = '50%';
            this._cursorEl.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
            this._cursorEl.style.border = '2px solid white';
            this._cursorEl.style.zIndex = '999999';
            this._cursorEl.style.pointerEvents = 'none'; // so it doesn't block clicks
            this._cursorEl.style.transition = 'transform 0.1s';
            this._cursorEl.style.transform = 'translate(-50%, -50%)';
            document.body.appendChild(this._cursorEl);
            
            // Initial position
            this._cursorX = window.innerWidth / 2;
            this._cursorY = window.innerHeight / 2;
            this.moveVirtualCursor(this._cursorX, this._cursorY);
        }
        this.log("Sanal İmleç (Mouse) aktif edildi.");
    },

    moveVirtualCursor: function(x, y) {
        if (!this._cursorEl) return;
        this._cursorX = Math.max(0, Math.min(x, window.innerWidth));
        this._cursorY = Math.max(0, Math.min(y, window.innerHeight));
        this._cursorEl.style.left = this._cursorX + 'px';
        this._cursorEl.style.top = this._cursorY + 'px';
    },

    moveVirtualCursorByVoice: function(direction, amount = 50) {
        if (!this._virtualMouseEnabled) this.enableVirtualCursor();
        let newX = this._cursorX;
        let newY = this._cursorY;
        if (direction === 'yukarı' || direction === 'yukari') newY -= amount;
        else if (direction === 'aşağı' || direction === 'asagi') newY += amount;
        else if (direction === 'sol') newX -= amount;
        else if (direction === 'sağ' || direction === 'sag') newX += amount;
        this.moveVirtualCursor(newX, newY);
        this.log(`İmleç sesle hareket ettirildi: ${direction}`);
    },

    simulateMouseEvent: function(type, x, y) {
        const el = document.elementFromPoint(x, y);
        if (el) {
            const ev = new MouseEvent(type, {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y
            });
            el.dispatchEvent(ev);
        }
    },

    clickVirtualCursor: function() {
        if (!this._virtualMouseEnabled) return;
        this.simulateMouseEvent('mousedown', this._cursorX, this._cursorY);
        setTimeout(() => {
            this.simulateMouseEvent('mouseup', this._cursorX, this._cursorY);
            this.simulateMouseEvent('click', this._cursorX, this._cursorY);
            this.log("Ses ile tıklama yapıldı!");
        }, 100);
    },
    // -----------------------------------------

    classifyImage: function(imageUrl) {
        this.log('Görsel sınıflandırma modeli (MobileNet) yükleniyor...');
        return new Promise((resolve) => {
            const classifier = ml5.imageClassifier('MobileNet', () => {
                this.log('Model yüklendi. Resim analiz ediliyor...');
                
                // Create a temporary image element
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    classifier.classify(img, (err, results) => {
                        if (err) {
                            this.log('Hata: Görsel okunamadı.');
                            resolve("Hata");
                            return;
                        }
                        const label = results[0].label;
                        const conf = Math.round(results[0].confidence * 100);
                        this.log(`Tahmin: ${label} (%${conf} emin)`);
                        resolve(label);
                    });
                };
                img.onerror = () => {
                    this.log('Hata: Görsel adresi geçersiz veya yüklenemedi.');
                    resolve("Hata");
                }
                img.src = imageUrl;
            });
        });
    },

    wait: function(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    },

    setBackgroundColor: function(color) {
        document.getElementById('mediaArea').style.backgroundColor = color;
        document.getElementById('mediaArea').style.display = 'flex';
        this.log('Arka plan rengi değiştirildi: ' + color);
    },

    getAudioLevel: async function() {
        if (!navigator.mediaDevices) return 0;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);

            return new Promise((resolve) => {
                scriptProcessor.onaudioprocess = function() {
                    const array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    let values = 0;
                    const length = array.length;
                    for (let i = 0; i < length; i++) {
                        values += (array[i]);
                    }
                    const average = values / length;
                    
                    // Cleanup
                    scriptProcessor.disconnect();
                    analyser.disconnect();
                    microphone.disconnect();
                    audioContext.close();
                    stream.getTracks().forEach(t => t.stop());

                    resolve(Math.round(average));
                };
            });
        } catch (e) {
            this.log("Mikrofon hatası: " + e.message);
            return 0;
        }
    },

    countFingers: async function() {
        // We wait a tiny bit to let the camera/prediction catch up if it's running in a fast loop
        await this.wait(0.2); 
        
        return new Promise((resolve) => {
            if (!handTracker) {
                this.log('Hata: Önce "El Hareketlerini İzle" bloğunu çalıştırmalısınız!');
                resolve(0);
                return;
            }
            
            const results = this._latestHandResults;
            if (results && results.length > 0) {
                const landmarks = results[0].landmarks;
                let count = 0;
                
                // Check if fingers are extended (tip Y < pip Y)
                if (landmarks[8][1] < landmarks[6][1]) count++;   // Index
                if (landmarks[12][1] < landmarks[10][1]) count++; // Middle
                if (landmarks[16][1] < landmarks[14][1]) count++; // Ring
                if (landmarks[20][1] < landmarks[18][1]) count++; // Pinky
                
                // Thumb (simple horizontal distance check)
                const distTip = Math.abs(landmarks[4][0] - landmarks[5][0]);
                const distKnuckle = Math.abs(landmarks[3][0] - landmarks[5][0]);
                if (distTip > distKnuckle + 15) count++;
                
                // Only log if the count changed to avoid console flooding
                if (this._lastFingerCount !== count) {
                    this.log('Görülen Parmak Sayısı: ' + count);
                    this._lastFingerCount = count;
                }
                resolve(count);
            } else {
                resolve(0);
            }
        });
    }
};

// Initialize UI
function init() {
    renderLessonList();
    initBlockly();
    loadLesson(1);

    document.getElementById('runBtn').addEventListener('click', runCode);
    document.getElementById('clearBtn').addEventListener('click', clearOutput);
}

function renderLessonList() {
    const listDiv = document.getElementById('lessonList');
    listDiv.innerHTML = '';
    
    lessons.forEach(lesson => {
        const li = document.createElement('li');
        li.className = `lesson-item p-4 flex items-start gap-3 hover:bg-indigo-50 border-l-4 border-transparent`;
        li.id = `lesson-item-${lesson.id}`;
        li.onclick = () => loadLesson(lesson.id);
        
        li.innerHTML = `
            <div class="lesson-icon text-indigo-400 mt-1">
                <i class="fa-solid ${lesson.icon} text-lg"></i>
            </div>
            <div>
                <h3 class="font-semibold text-gray-800">${lesson.title}</h3>
                <p class="text-xs text-gray-500 mt-1">${lesson.description}</p>
            </div>
        `;
        listDiv.appendChild(li);
    });
}

function initBlockly() {
    workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: true,
        trashcan: true,
        theme: Blockly.Themes.Classic
    });
    
    // Override default alert/prompt to not use browser popups
    window.alert = function(msg) { window.aiAPI.log(msg); };
}

function loadLesson(id) {
    currentLesson = id;
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) return;
    
    // Update active class
    document.querySelectorAll('.lesson-item').forEach(el => {
        el.classList.remove('active');
        el.style.borderLeftColor = 'transparent';
    });
    const activeItem = document.getElementById(`lesson-item-${id}`);
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.style.borderLeftColor = '#312e81';
    }

    // Update Header
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonDesc').textContent = lesson.description;

    // Reset Workspace
    workspace.clear();
    
    // Customize toolbox for this lesson (filtering blocks)
    // For simplicity in this demo, we keep all blocks but you could dynamically generate XML here.
}

async function runCode() {
    clearOutput();
    window.aiAPI.log("Kod çalıştırılıyor...");
    
    // Make sure JavaScript generation is configured
    // Support both older and newer Blockly versions
    const generator = window.javascript ? window.javascript.javascriptGenerator : Blockly.JavaScript;
    generator.STATEMENT_PREFIX = '';
    
    // Generate code
    const code = generator.workspaceToCode(workspace);
    
    if (code.trim() === '') {
        window.aiAPI.log("Uyarı: Çalışma alanı boş, lütfen blok ekleyin.");
        return;
    }

    // Execute code
    try {
        // We use an AsyncFunction to support await inside the generated code
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const runFn = new AsyncFunction(code);
        await runFn();
        window.aiAPI.log("Kod başarıyla tamamlandı.");
    } catch (e) {
        window.aiAPI.log("Hata: " + e.message);
        console.error(e);
    }
}

function clearOutput() {
    const consoleDiv = document.getElementById('outputConsole');
    consoleDiv.innerHTML = '';
}

// Start
window.onload = init;
