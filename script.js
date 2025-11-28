// script.js - TransCoope (Versión Completa Mejorada)
document.addEventListener('DOMContentLoaded', function() {
    // Estado de la aplicación
    const appState = {
        currentUser: null,
        userGenres: [],
        isLoggedIn: false,
        currentSection: 'transcripcion',
        posts: [],
        projects: [],
        library: [],
        courses: [],
        practiceTools: {
            metronome: { active: false, bpm: 120, interval: null },
            tuner: { active: false },
            rhythm: { active: false, pattern: 'basic', interval: null }
        },
        rankings: {
            weekly: [],
            monthly: [],
            alltime: []
        }
    };

    // Partituras de ejemplo para "Come As You Are"
    const comeAsYouAreSheets = {
        guitarra: {
            title: "Guitarra Principal - Come As You Are",
            content: `
                <div class="sheet-music">
                    <div class="sheet-header">
                        <h4>Come As You Are - Guitarra Principal</h4>
                        <div class="sheet-meta">
                            <span><strong>Artista:</strong> Nirvana</span>
                            <span><strong>Álbum:</strong> Nevermind (1991)</span>
                            <span><strong>Afinción:</strong> Drop D</span>
                        </div>
                    </div>
                    
                    <div class="tablature">
                        <div class="tab-section">
                            <h5>Intro/Riff Principal</h5>
                            <pre class="guitar-tab">
e|-----------------|
B|-----------------|
G|-----------------|
D|--4---4---2---2--|
A|--4---4---2---2--|
D|--4---4---2---2--|

<span class="tab-note">// Repetir 4 veces - Toca con distorsión y palm mute</span>
                            </pre>
                        </div>
                        
                        <div class="tab-section">
                            <h5>Verso</h5>
                            <pre class="guitar-tab">
e|---------------------|
B|---------------------|
G|---------------------|
D|--2---2---4---4------|
A|--2---2---4---4------|
D|--2---2---4---4------|

<span class="tab-note">// "Come as you are, as you were..."</span>
                            </pre>
                        </div>
                        
                        <div class="tab-section">
                            <h5>Pre-Coro</h5>
                            <pre class="guitar-tab">
e|-----------------------|
B|-----------------------|
G|-----------------------|
D|--0---0---2---2---4----|
A|--0---0---2---2---4----|
D|--0---0---2---2---4----|
                            </pre>
                        </div>

                        <div class="tab-section">
                            <h5>Estribillo</h5>
                            <pre class="guitar-tab">
e|-------------------------|
B|-------------------------|
G|-------------------------|
D|--4---4---2---2---0---0--|
A|--4---4---2---2---0---0--|
D|--4---4---2---2---0---0--|

<span class="tab-note">// "And I swear that I don't have a gun..."</span>
                            </pre>
                        </div>
                    </div>
                    
                    <div class="playing-tips">
                        <h5>💡 Consejos de Ejecución:</h5>
                        <ul>
                            <li>Usa distorsión media con mucho sustain</li>
                            <li>Palm mute en las notas graves del riff</li>
                            <li>Mantén un tempo constante de 120 BPM</li>
                            <li>El riff usa principalmente cuerdas graves (Drop D)</li>
                            <li>Acordes power simples pero efectivos</li>
                        </ul>
                    </div>
                </div>
            `
        },
        bajo: {
            title: "Línea de Bajo - Come As You Are",
            content: `
                <div class="sheet-music">
                    <div class="sheet-header">
                        <h4>Come As You Are - Línea de Bajo</h4>
                        <div class="sheet-meta">
                            <span><strong>Artista:</strong> Nirvana</span>
                            <span><strong>Intérprete:</strong> Krist Novoselic</span>
                            <span><strong>Estilo:</strong> Groove simple y potente</span>
                        </div>
                    </div>
                    
                    <div class="tablature">
                        <div class="tab-section">
                            <h5>Línea Principal</h5>
                            <pre class="bass-tab">
G|-----------------|
D|-----------------|
A|--2---2---4---4--|
E|--2---2---4---4--|

<span class="tab-note">// Sigue el riff de guitarra nota por nota</span>
                            </pre>
                        </div>
                        
                        <div class="tab-section">
                            <h5>Patrón Completo del Verso</h5>
                            <pre class="bass-tab">
G|---------------------|
D|---------------------|
A|--2-2-4-4-2-2-0-0---|
E|--2-2-4-4-2-2-0-0---|

<span class="tab-note">// Notas: Re - Mi - Re - Do (en la cuerda A)</span>
                            </pre>
                        </div>

                        <div class="tab-section">
                            <h5>Variación del Estribillo</h5>
                            <pre class="bass-tab">
G|-------------------------|
D|-------------------------|
A|--4-4-2-2-0-0-4-4-2-2---|
E|--4-4-2-2-0-0-4-4-2-2---|
                            </pre>
                        </div>
                    </div>
                    
                    <div class="playing-tips">
                        <h5>💡 Técnica de Bajo:</h5>
                        <ul>
                            <li>Usa dedos (fingerstyle) para un sonido más orgánico</li>
                            <li>Mantén las notas sostenidas con duración completa</li>
                            <li>Énfasis en el groove y el ritmo</li>
                            <li>Coordinación perfecta con la batería</li>
                            <li>Tono con mucho medio y bajo, poco agudo</li>
                        </ul>
                    </div>
                </div>
            `
        },
        bateria: {
            title: "Partitura de Batería - Come As You Are",
            content: `
                <div class="sheet-music">
                    <div class="sheet-header">
                        <h4>Come As You Are - Batería</h4>
                        <div class="sheet-meta">
                            <span><strong>Artista:</strong> Nirvana</span>
                            <span><strong>Intérprete:</strong> Dave Grohl</span>
                            <span><strong>Estilo:</strong> Rock/Grunge</span>
                        </div>
                    </div>
                    
                    <div class="drum-notation">
                        <div class="notation-section">
                            <h5>Patrón Básico del Verso</h5>
                            <pre class="drum-tab">
Hi-hat  | x x x x x x x x |
Snare   | - - x - - - x - |
Kick    | x - - - x - - - |
                            </pre>
                        </div>
                        
                        <div class="notation-section">
                            <h5>Patrón del Estribillo</h5>
                            <pre class="drum-tab">
Hi-hat  | x x x x x x x x |
Snare   | - - x - - - x - |
Kick    | x - x - x - x - |
Crash   | x - - - - - - - |
                            </pre>
                        </div>
                        
                        <div class="notation-section">
                            <h5>Fill de Transición (Pre-Coro)</h5>
                            <pre class="drum-tab">
Hi-hat  | - - - - - - - - |
Snare   | x x x x - - - - |
Kick    | x - - - x - - - |
Tom1    | - - - - x x x x |
Crash   | - - - - x - - - |
                            </pre>
                        </div>

                        <div class="notation-section">
                            <h5>Fill Característico (Puente)</h5>
                            <pre class="drum-tab">
Hi-hat  | - - - - - - - - |
Snare   | x - x - x x x x |
Kick    | x x - x - - - - |
Tom1    | - - - - x x x x |
Crash   | x - - - - - - - |
                            </pre>
                        </div>
                    </div>
                    
                    <div class="drum-legend">
                        <h5>Leyenda:</h5>
                        <ul>
                            <li><strong>x:</strong> Golpe</li>
                            <li><strong>-:</strong> Silencio</li>
                            <li><strong>Hi-hat:</strong> Charles cerrado</li>
                            <li><strong>Snare:</strong> Caja</li>
                            <li><strong>Kick:</strong> Bombo</li>
                            <li><strong>Tom1:</strong> Tom de aire</li>
                            <li><strong>Crash:</strong> Platillo crash</li>
                        </ul>
                    </div>
                    
                    <div class="playing-tips">
                        <h5>💡 Estilo de Dave Grohl:</h5>
                        <ul>
                            <li>Golpes potentes pero controlados</li>
                            <li>Hi-hat constante en corcheas</li>
                            <li>Uso creativo de toms para fills</li>
                            <li>Dinámica: fuerte en estribillos, suave en versos</li>
                            <li>Groove sólido y constante</li>
                        </ul>
                    </div>
                </div>
            `
        },
        voz: {
            title: "Partitura Vocal - Come As You Are",
            content: `
                <div class="sheet-music">
                    <div class="sheet-header">
                        <h4>Come As You Are - Línea Vocal</h4>
                        <div class="sheet-meta">
                            <span><strong>Artista:</strong> Nirvana</span>
                            <span><strong>Voz:</strong> Kurt Cobain</span>
                            <span><strong>Estilo:</strong> Vocal rasposo/emocional</span>
                        </div>
                    </div>
                    
                    <div class="vocal-notation">
                        <div class="vocal-section">
                            <h5>Melodía Principal - Verso</h5>
                            <div class="vocal-line">
                                <span class="lyrics">Come as you are, as you were</span>
                                <span class="notes">Sol - Sol - Fa - Mi - Re</span>
                            </div>
                            <div class="vocal-line">
                                <span class="lyrics">As I want you to be</span>
                                <span class="notes">Mi - Fa - Sol - La</span>
                            </div>
                            <div class="vocal-line">
                                <span class="lyrics">As a friend, as a friend</span>
                                <span class="notes">Sol - Sol - Fa - Mi - Re</span>
                            </div>
                            <div class="vocal-line">
                                <span class="lyrics">As an old enemy</span>
                                <span class="notes">Mi - Fa - Sol - La - Sol</span>
                            </div>
                        </div>
                        
                        <div class="vocal-section">
                            <h5>Estribillo</h5>
                            <div class="vocal-line">
                                <span class="lyrics">And I swear that I don't have a gun</span>
                                <span class="notes">La - Sol - Fa - Mi - Re - Do - La</span>
                            </div>
                            <div class="vocal-line">
                                <span class="lyrics">No, I don't have a gun</span>
                                <span class="notes">Mi - Re - Do - La - Sol</span>
                            </div>
                        </div>

                        <div class="vocal-section">
                            <h5>Segundo Verso</h5>
                            <div class="vocal-line">
                                <span class="lyrics">Come doused in mud, soaked in bleach</span>
                                <span class="notes">Sol - Sol - Fa - Mi - Re - Mi</span>
                            </div>
                            <div class="vocal-line">
                                <span class="lyrics">As I want you to be</span>
                                <span class="notes">Mi - Fa - Sol - La</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="vocal-tips">
                        <h5>💡 Técnica Vocal:</h5>
                        <ul>
                            <li>Voz rasposa característica del grunge</li>
                            <li>Dinámica: de susurro a gritos controlados</li>
                            <li>Fraseo relajado pero intenso</li>
                            <li>Uso de vibrato natural y expresivo</li>
                            <li>Énfasis en la letra y emoción</li>
                        </ul>
                    </div>
                    
                    <div class="song-structure">
                        <h5>🎵 Estructura de la Canción:</h5>
                        <ol>
                            <li><strong>Intro:</strong> 8 compases (riff de guitarra)</li>
                            <li><strong>Verso 1:</strong> 16 compases</li>
                            <li><strong>Pre-coro:</strong> 8 compases</li>
                            <li><strong>Estribillo:</strong> 16 compases</li>
                            <li><strong>Verso 2:</strong> 16 compases</li>
                            <li><strong>Pre-coro:</strong> 8 compases</li>
                            <li><strong>Estribillo:</strong> 16 compases</li>
                            <li><strong>Puente/Solo:</strong> 16 compases</li>
                            <li><strong>Estribillo Final:</strong> 16 compases + fade out</li>
                        </ol>
                    </div>
                </div>
            `
        }
    };

    // Inicialización
    init();

    function init() {
        setupEventListeners();
        loadSampleData();
        checkLoginStatus();
        initializePracticeTools();
    }

    function setupEventListeners() {
        // Navegación entre pantallas de login/registro
        document.getElementById('show-register').addEventListener('click', (e) => {
            e.preventDefault();
            showScreen('register');
        });

        document.getElementById('show-login').addEventListener('click', (e) => {
            e.preventDefault();
            showScreen('login');
        });

        // Formularios de login y registro
        document.getElementById('login-form').addEventListener('submit', handleLogin);
        document.getElementById('register-form').addEventListener('submit', handleRegister);
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
        document.getElementById('profile-btn').addEventListener('click', showProfileModal);

        // Navegación entre secciones
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                showSection(section);
                
                // Actualizar navegación
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Transcripción de audio
        document.getElementById('process-url').addEventListener('click', processUrl);
        document.getElementById('audio-file').addEventListener('change', handleFileSelect);
        document.getElementById('download-pdf').addEventListener('click', downloadPdf);
        document.getElementById('save-to-library').addEventListener('click', saveToLibrary);

        // Práctica
        document.getElementById('metronome-toggle').addEventListener('click', toggleMetronome);
        document.getElementById('bpm-slider').addEventListener('input', updateBPM);
        document.getElementById('tuner-toggle').addEventListener('click', toggleTuner);
        document.getElementById('rhythm-toggle').addEventListener('click', toggleRhythmTrainer);

        // Patrones de ritmo
        document.querySelectorAll('.pattern').forEach(pattern => {
            pattern.addEventListener('click', function() {
                document.querySelectorAll('.pattern').forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                appState.practiceTools.rhythm.pattern = this.getAttribute('data-pattern');
            });
        });

        // Comunidad
        document.getElementById('new-post-btn').addEventListener('click', () => {
            document.getElementById('new-post-modal').style.display = 'block';
        });

        document.getElementById('new-post-form').addEventListener('submit', handleNewPost);

        // Proyectos
        document.getElementById('upload-project-btn').addEventListener('click', () => {
            document.getElementById('upload-project-modal').style.display = 'block';
        });

        document.getElementById('upload-project-form').addEventListener('submit', handleProjectUpload);
        document.getElementById('project-file').addEventListener('change', handleProjectFileSelect);

        // Cerrar modales
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                this.closest('.modal').style.display = 'none';
            });
        });

        // Cerrar modales al hacer clic fuera
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    // Gestión de pantallas
    function showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenName + '-screen').classList.add('active');
    }

    function showSection(sectionName) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        // Cargar contenido específico de la sección
        switch(sectionName) {
            case 'transcripcion':
                initializeTranscriptionSection();
                break;
            case 'biblioteca':
                loadLibrary();
                break;
            case 'practica':
                initializePracticeTools();
                break;
            case 'comunidad':
                loadCommunityPosts();
                break;
            case 'proyectos':
                loadProjects();
                break;
            case 'cursos':
                loadCourses();
                break;
            case 'ranking':
                loadRankings();
                break;
            case 'recomendaciones':
                loadRecommendations();
                break;
        }
    }

    // Sistema de autenticación
    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulación de login
        if (username && password) {
            appState.currentUser = {
                username: username,
                email: username + '@ejemplo.com',
                genres: ['rock', 'grunge'],
                stats: {
                    sheetsCreated: 3,
                    postsMade: 5,
                    projectsUploaded: 2
                }
            };
            appState.isLoggedIn = true;
            appState.userGenres = ['rock', 'grunge'];
            
            showScreen('app');
            updateUIForUser();
            showSection('transcripcion');
            
            showNotification('¡Bienvenido de nuevo, ' + username + '!', 'success');
        } else {
            showNotification('Por favor completa todos los campos', 'error');
        }
    }

    function handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(cb => cb.value);

        if (username && email && password && selectedGenres.length > 0) {
            appState.currentUser = {
                username: username,
                email: email,
                genres: selectedGenres,
                stats: {
                    sheetsCreated: 0,
                    postsMade: 0,
                    projectsUploaded: 0
                }
            };
            appState.isLoggedIn = true;
            appState.userGenres = selectedGenres;
            
            showScreen('app');
            updateUIForUser();
            showSection('transcripcion');
            
            showNotification('¡Cuenta creada exitosamente!', 'success');
        } else {
            showNotification('Por favor completa todos los campos y selecciona al menos un género', 'error');
        }
    }

    function handleLogout() {
        appState.currentUser = null;
        appState.isLoggedIn = false;
        appState.userGenres = [];
        
        showScreen('login');
        showNotification('Sesión cerrada correctamente', 'info');
    }

    function showProfileModal() {
        if (appState.currentUser) {
            document.getElementById('profile-username').textContent = appState.currentUser.username;
            document.getElementById('profile-email').textContent = appState.currentUser.email;
            document.getElementById('profile-avatar-text').textContent = appState.currentUser.username.charAt(0).toUpperCase();
            
            document.getElementById('profile-sheets').textContent = appState.currentUser.stats.sheetsCreated;
            document.getElementById('profile-posts').textContent = appState.currentUser.stats.postsMade;
            document.getElementById('profile-projects').textContent = appState.currentUser.stats.projectsUploaded;
            
            const genresList = document.getElementById('profile-genres-list');
            genresList.innerHTML = appState.userGenres.map(genre => 
                `<span class="genre-tag">${genre}</span>`
            ).join('');
        }
        
        document.getElementById('profile-modal').style.display = 'block';
    }

    function checkLoginStatus() {
        // En una aplicación real, aquí se verificaría el token de sesión
        // Por ahora, mostramos directamente la pantalla de login
        showScreen('login');
    }

    function updateUIForUser() {
        if (appState.currentUser) {
            document.getElementById('user-name').textContent = appState.currentUser.username;
        }
    }

    // Sistema de transcripción
    function processUrl() {
        const url = document.getElementById('song-url').value.trim();
        
        if (!url) {
            showNotification('Por favor ingresa un enlace válido', 'error');
            return;
        }

        simulateTranscription();
    }

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            document.getElementById('file-name').textContent = 'Archivo seleccionado: ' + file.name;
        }
    }

    function handleProjectFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            document.getElementById('project-file-name').textContent = 'Archivo seleccionado: ' + file.name;
        }
    }

    function simulateTranscription() {
        const processingSection = document.getElementById('processing-section');
        const resultsSection = document.getElementById('results-section');
        
        processingSection.classList.add('active');
        resultsSection.style.display = 'none';

        // Simular progreso
        const steps = document.querySelectorAll('.processing-steps .step');
        let currentStep = 0;

        const progressInterval = setInterval(() => {
            if (currentStep > 0) {
                steps[currentStep - 1].classList.remove('active');
            }
            steps[currentStep].classList.add('active');
            currentStep++;

            if (currentStep >= steps.length) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    processingSection.classList.remove('active');
                    resultsSection.style.display = 'block';
                    generateSampleSheetMusic();
                    showNotification('¡Transcripción completada! La IA ha detectado 4 instrumentos', 'success');
                    
                    // Actualizar estadísticas
                    if (appState.currentUser) {
                        appState.currentUser.stats.sheetsCreated++;
                    }
                }, 1000);
            }
        }, 1000);
    }

    function generateSampleSheetMusic() {
        const tabsContainer = document.querySelector('.instruments-tabs');
        const instruments = [
            { name: 'Guitarra', icon: 'fas fa-guitar', key: 'guitarra' },
            { name: 'Bajo', icon: 'fas fa-guitar', key: 'bajo' },
            { name: 'Batería', icon: 'fas fa-drum', key: 'bateria' },
            { name: 'Voz', icon: 'fas fa-microphone', key: 'voz' }
        ];

        tabsContainer.innerHTML = '';
        instruments.forEach((instrument, index) => {
            const tab = document.createElement('button');
            tab.className = `instrument-tab ${index === 0 ? 'active' : ''}`;
            tab.innerHTML = `<i class="${instrument.icon}"></i> ${instrument.name}`;
            tab.setAttribute('data-instrument', instrument.key);
            tab.addEventListener('click', () => switchInstrumentTab(instrument.key));
            tabsContainer.appendChild(tab);
        });

        // Mostrar primera partitura
        showInstrumentSheet('guitarra');
    }

    function switchInstrumentTab(instrumentKey) {
        document.querySelectorAll('.instrument-tab').forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-instrument') === instrumentKey);
        });
        showInstrumentSheet(instrumentKey);
    }

    function showInstrumentSheet(instrumentKey) {
        const sheetContainer = document.querySelector('.sheet-music-container');
        if (comeAsYouAreSheets[instrumentKey]) {
            sheetContainer.innerHTML = comeAsYouAreSheets[instrumentKey].content;
        }
    }

    function downloadPdf() {
        showNotification('Generando y descargando partitura en formato PDF...', 'info');
        setTimeout(() => {
            showNotification('¡PDF descargado correctamente!', 'success');
        }, 2000);
    }

    function saveToLibrary() {
        if (!appState.currentUser) {
            showNotification('Debes iniciar sesión para guardar en la biblioteca', 'error');
            return;
        }

        const songData = {
            id: Date.now(),
            title: 'Come As You Are',
            artist: 'Nirvana',
            instruments: ['guitarra', 'bajo', 'bateria', 'voz'],
            dateAdded: new Date().toISOString()
        };

        appState.library.push(songData);
        showNotification('¡Partitura guardada en tu biblioteca!', 'success');
    }

    // Sistema de práctica
    function initializePracticeTools() {
        updateBPM();
    }

    function toggleMetronome() {
        const button = document.getElementById('metronome-toggle');
        appState.practiceTools.metronome.active = !appState.practiceTools.metronome.active;
        
        if (appState.practiceTools.metronome.active) {
            button.innerHTML = '<i class="fas fa-stop"></i> Detener';
            button.classList.add('active');
            startMetronome();
            showNotification('Metrónomo iniciado a ' + appState.practiceTools.metronome.bpm + ' BPM', 'info');
        } else {
            button.innerHTML = '<i class="fas fa-play"></i> Iniciar';
            button.classList.remove('active');
            stopMetronome();
            showNotification('Metrónomo detenido', 'info');
        }
    }

    function startMetronome() {
        const beats = document.querySelectorAll('.beat');
        let currentBeat = 0;
        
        appState.practiceTools.metronome.interval = setInterval(() => {
            beats.forEach(beat => beat.classList.remove('active'));
            beats[currentBeat].classList.add('active');
            currentBeat = (currentBeat + 1) % beats.length;
        }, 60000 / appState.practiceTools.metronome.bpm);
    }

    function stopMetronome() {
        if (appState.practiceTools.metronome.interval) {
            clearInterval(appState.practiceTools.metronome.interval);
            document.querySelectorAll('.beat').forEach(beat => beat.classList.remove('active'));
        }
    }

    function updateBPM() {
        const slider = document.getElementById('bpm-slider');
        const value = document.getElementById('bpm-value');
        const bpm = parseInt(slider.value);
        appState.practiceTools.metronome.bpm = bpm;
        value.textContent = bpm;
        
        // Reiniciar metrónomo si está activo
        if (appState.practiceTools.metronome.active) {
            stopMetronome();
            startMetronome();
        }
    }

    function toggleTuner() {
        const button = document.getElementById('tuner-toggle');
        appState.practiceTools.tuner.active = !appState.practiceTools.tuner.active;
        
        if (appState.practiceTools.tuner.active) {
            button.innerHTML = '<i class="fas fa-stop"></i> Detener Afinador';
            button.classList.add('active');
            showNotification('Afinador activado - Toca una cuerda', 'info');
        } else {
            button.innerHTML = '<i class="fas fa-microphone"></i> Iniciar Afinador';
            button.classList.remove('active');
            showNotification('Afinador desactivado', 'info');
        }
    }

    function toggleRhythmTrainer() {
        const button = document.getElementById('rhythm-toggle');
        appState.practiceTools.rhythm.active = !appState.practiceTools.rhythm.active;
        
        if (appState.practiceTools.rhythm.active) {
            button.innerHTML = '<i class="fas fa-stop"></i> Detener';
            button.classList.add('active');
            startRhythmTrainer();
            showNotification('Entrenador de ritmo iniciado', 'info');
        } else {
            button.innerHTML = '<i class="fas fa-play"></i> Practicar';
            button.classList.remove('active');
            stopRhythmTrainer();
            showNotification('Entrenador de ritmo detenido', 'info');
        }
    }

    function startRhythmTrainer() {
        const visualizers = document.querySelectorAll('.beat-visual');
        let currentBeat = 0;
        
        appState.practiceTools.rhythm.interval = setInterval(() => {
            visualizers.forEach(v => v.classList.remove('active'));
            visualizers[currentBeat].classList.add('active');
            currentBeat = (currentBeat + 1) % visualizers.length;
        }, 60000 / 120); // 120 BPM
    }

    function stopRhythmTrainer() {
        if (appState.practiceTools.rhythm.interval) {
            clearInterval(appState.practiceTools.rhythm.interval);
            document.querySelectorAll('.beat-visual').forEach(v => v.classList.remove('active'));
        }
    }

    // Sistema de comunidad
    function handleNewPost(e) {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const category = document.getElementById('post-category').value;
        const content = document.getElementById('post-content').value;

        if (containsOffensiveLanguage(content)) {
            showNotification('Tu mensaje contiene lenguaje inapropiado y no puede ser publicado', 'error');
            return;
        }

        const newPost = {
            id: Date.now(),
            title: title,
            category: category,
            content: content,
            author: appState.currentUser.username,
            date: new Date().toISOString(),
            likes: 0,
            comments: 0
        };

        appState.posts.unshift(newPost);
        document.getElementById('new-post-modal').style.display = 'none';
        e.target.reset();
        
        loadCommunityPosts();
        showNotification('¡Mensaje publicado exitosamente!', 'success');
        
        // Actualizar estadísticas
        if (appState.currentUser) {
            appState.currentUser.stats.postsMade++;
        }
    }

    function containsOffensiveLanguage(text) {
        const offensiveWords = ['idiota', 'estúpido', 'imbécil', 'tonto', 'puta', 'cabrón'];
        const lowerText = text.toLowerCase();
        return offensiveWords.some(word => lowerText.includes(word));
    }

    function loadCommunityPosts() {
        const postsContainer = document.getElementById('posts-container');
        
        if (appState.posts.length === 0) {
            // Posts de ejemplo
            postsContainer.innerHTML = `
                <div class="post-card">
                    <div class="post-header">
                        <div class="post-author">
                            <div class="avatar">M</div>
                            <div class="author-info">
                                <span class="author-name">María García</span>
                                <span class="post-date">Hace 2 horas</span>
                            </div>
                        </div>
                        <div class="post-category">
                            <span class="category-tag">Guitarra</span>
                        </div>
                    </div>
                    <div class="post-content">
                        <h3>¿Alguien tiene consejos para mejorar el fingerpicking?</h3>
                        <p>Estoy aprendiendo fingerpicking y me cuesta mantener un patrón constante con la mano derecha. ¿Algún ejercicio que recomienden para mejorar la independencia de los dedos?</p>
                    </div>
                    <div class="post-footer">
                        <div class="post-actions">
                            <button class="action-btn"><i class="far fa-thumbs-up"></i> 12</button>
                            <button class="action-btn"><i class="far fa-comment"></i> 5</button>
                            <button class="action-btn"><i class="far fa-bookmark"></i></button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            postsContainer.innerHTML = appState.posts.map(post => `
                <div class="post-card">
                    <div class="post-header">
                        <div class="post-author">
                            <div class="avatar">${post.author.charAt(0)}</div>
                            <div class="author-info">
                                <span class="author-name">${post.author}</span>
                                <span class="post-date">${formatDate(post.date)}</span>
                            </div>
                        </div>
                        <div class="post-category">
                            <span class="category-tag">${post.category}</span>
                        </div>
                    </div>
                    <div class="post-content">
                        <h3>${post.title}</h3>
                        <p>${post.content}</p>
                    </div>
                    <div class="post-footer">
                        <div class="post-actions">
                            <button class="action-btn"><i class="far fa-thumbs-up"></i> ${post.likes}</button>
                            <button class="action-btn"><i class="far fa-comment"></i> ${post.comments}</button>
                            <button class="action-btn"><i class="far fa-bookmark"></i></button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Sistema de proyectos
    function handleProjectUpload(e) {
        e.preventDefault();
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const genre = document.getElementById('project-genre').value;

        const newProject = {
            id: Date.now(),
            title: title,
            description: description,
            genre: genre,
            author: appState.currentUser.username,
            date: new Date().toISOString(),
            rating: (4 + Math.random()).toFixed(1)
        };

        appState.projects.unshift(newProject);
        document.getElementById('upload-project-modal').style.display = 'none';
        e.target.reset();
        document.getElementById('project-file-name').textContent = '';
        
        loadProjects();
        showNotification('¡Proyecto subido exitosamente!', 'success');
        
        // Actualizar estadísticas
        if (appState.currentUser) {
            appState.currentUser.stats.projectsUploaded++;
        }
    }

    function loadProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        
        if (appState.projects.length === 0) {
            // Proyectos de ejemplo
            projectsGrid.innerHTML = `
                <div class="project-card">
                    <div class="project-image">
                        <i class="fas fa-music"></i>
                    </div>
                    <div class="project-info">
                        <h3>Amanecer en Re</h3>
                        <p class="project-author">Por: Ana Martínez</p>
                        <p class="project-description">Composición acústica para guitarra y violín inspirada en los amaneceres de montaña.</p>
                        <div class="project-meta">
                            <span class="project-genre">Acústico</span>
                            <div class="project-rating">
                                <i class="fas fa-star"></i>
                                <span>4.7</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            projectsGrid.innerHTML = appState.projects.map(project => `
                <div class="project-card">
                    <div class="project-image">
                        <i class="fas fa-music"></i>
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p class="project-author">Por: ${project.author}</p>
                        <p class="project-description">${project.description}</p>
                        <div class="project-meta">
                            <span class="project-genre">${project.genre}</span>
                            <div class="project-rating">
                                <i class="fas fa-star"></i>
                                <span>${project.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Otras secciones
    function loadLibrary() {
        const libraryGrid = document.getElementById('library-grid');
        
        if (appState.library.length === 0) {
            libraryGrid.innerHTML = `
                <div class="library-item">
                    <div class="item-header">
                        <h4>Come As You Are</h4>
                        <span class="item-badge">Guardada</span>
                    </div>
                    <p class="item-artist">Nirvana</p>
                    <div class="item-instruments">
                        <span class="instrument-tag">Guitarra</span>
                        <span class="instrument-tag">Bajo</span>
                        <span class="instrument-tag">Batería</span>
                        <span class="instrument-tag">Voz</span>
                    </div>
                    <div class="item-actions">
                        <button class="btn-primary" onclick="app.showInstrumentSheet('guitarra')">Abrir</button>
                        <button class="btn-secondary">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            `;
        } else {
            libraryGrid.innerHTML = appState.library.map(item => `
                <div class="library-item">
                    <div class="item-header">
                        <h4>${item.title}</h4>
                        <span class="item-badge">Guardada</span>
                    </div>
                    <p class="item-artist">${item.artist}</p>
                    <div class="item-instruments">
                        ${item.instruments.map(instr => 
                            `<span class="instrument-tag">${instr}</span>`
                        ).join('')}
                    </div>
                    <div class="item-actions">
                        <button class="btn-primary" onclick="app.showInstrumentSheet('guitarra')">Abrir</button>
                        <button class="btn-secondary">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    function loadCourses() {
        const coursesGrid = document.getElementById('courses-grid');
        coursesGrid.innerHTML = `
            <div class="course-card">
                <div class="course-image">
                    <i class="fas fa-guitar"></i>
                </div>
                <div class="course-info">
                    <h3>Guitarra para Principiantes</h3>
                    <p>Aprende acordes, ritmos y técnicas básicas desde cero</p>
                    <div class="course-meta">
                        <span class="course-level">Principiante</span>
                        <span class="course-duration">12 lecciones</span>
                    </div>
                    <button class="btn-primary">Comenzar Curso</button>
                </div>
            </div>
            
            <div class="course-card">
                <div class="course-image">
                    <i class="fas fa-music"></i>
                </div>
                <div class="course-info">
                    <h3>Teoría Musical Esencial</h3>
                    <p>Domina escalas, acordes y progresiones armónicas</p>
                    <div class="course-meta">
                        <span class="course-level">Intermedio</span>
                        <span class="course-duration">8 lecciones</span>
                    </div>
                    <button class="btn-primary">Comenzar Curso</button>
                </div>
            </div>
            
            <div class="course-card">
                <div class="course-image">
                    <i class="fas fa-drum"></i>
                </div>
                <div class="course-info">
                    <h3>Batería: Ritmos de Rock</h3>
                    <p>Patrones esenciales y técnicas para bateristas</p>
                    <div class="course-meta">
                        <span class="course-level">Principiante</span>
                        <span class="course-duration">10 lecciones</span>
                    </div>
                    <button class="btn-primary">Comenzar Curso</button>
                </div>
            </div>
        `;
    }

    function loadRankings() {
        const rankingList = document.getElementById('ranking-list');
        const rankings = [
            { position: 1, title: 'Come As You Are', artist: 'Nirvana', searches: 1245, rating: 4.8 },
            { position: 2, title: 'Smells Like Teen Spirit', artist: 'Nirvana', searches: 987, rating: 4.7 },
            { position: 3, title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', searches: 856, rating: 4.6 },
            { position: 4, title: 'Hotel California', artist: 'Eagles', searches: 743, rating: 4.9 },
            { position: 5, title: 'Stairway to Heaven', artist: 'Led Zeppelin', searches: 689, rating: 4.9 }
        ];

        rankingList.innerHTML = rankings.map(song => `
            <div class="ranking-item">
                <div class="ranking-position">${song.position}</div>
                <div class="ranking-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
                <div class="ranking-stats">
                    <div class="stat">
                        <i class="fas fa-search"></i>
                        <span>${song.searches} búsquedas</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>${song.rating}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Event listeners para pestañas de ranking
        document.querySelectorAll('.ranking-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.ranking-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                // En una app real, aquí se cargarían datos diferentes según la pestaña
            });
        });
    }

    function loadRecommendations() {
        // Actualizar géneros del usuario
        const userGenresList = document.getElementById('user-genres-list');
        if (appState.userGenres && appState.userGenres.length > 0) {
            userGenresList.innerHTML = appState.userGenres.map(genre => 
                `<span class="genre-tag">${genre}</span>`
            ).join('');
        }

        // Recomendaciones de partituras
        document.getElementById('recommended-sheets').innerHTML = `
            <div class="recommendation-card">
                <div class="card-icon">
                    <i class="fas fa-guitar"></i>
                </div>
                <div class="card-content">
                    <h4>Smells Like Teen Spirit</h4>
                    <p>Nirvana - Guitarra eléctrica</p>
                    <div class="card-rating">
                        <i class="fas fa-star"></i>
                        <span>4.7</span>
                    </div>
                </div>
            </div>
            
            <div class="recommendation-card">
                <div class="card-icon">
                    <i class="fas fa-drum"></i>
                </div>
                <div class="card-content">
                    <h4>Enter Sandman</h4>
                    <p>Metallica - Batería completa</p>
                    <div class="card-rating">
                        <i class="fas fa-star"></i>
                        <span>4.6</span>
                    </div>
                </div>
            </div>
        `;

        // Recomendaciones de proyectos
        document.getElementById('recommended-projects').innerHTML = `
            <div class="recommendation-card">
                <div class="card-icon">
                    <i class="fas fa-headphones"></i>
                </div>
                <div class="card-content">
                    <h4>Neon Dreams</h4>
                    <p>Por: SynthWavePro - Electrónica</p>
                    <div class="card-rating">
                        <i class="fas fa-star"></i>
                        <span>4.5</span>
                    </div>
                </div>
            </div>
        `;

        // Recomendaciones de posts
        document.getElementById('recommended-posts').innerHTML = `
            <div class="recommendation-card">
                <div class="card-icon">
                    <i class="fas fa-comments"></i>
                </div>
                <div class="card-content">
                    <h4>Mejores amplificadores para rock</h4>
                    <p>45 respuestas - Guitarra</p>
                    <div class="card-meta">
                        <i class="far fa-eye"></i>
                        <span>320</span>
                    </div>
                </div>
            </div>
        `;
    }

    function initializeTranscriptionSection() {
        // Inicializar con partituras de ejemplo
        generateSampleSheetMusic();
    }

    // Utilidades
    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Hace un momento';
        if (diffMins < 60) return `Hace ${diffMins} minutos`;
        if (diffHours < 24) return `Hace ${diffHours} horas`;
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        
        return date.toLocaleDateString('es-ES');
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };
        return icons[type] || 'info-circle';
    }

    function loadSampleData() {
        // Datos de ejemplo para la aplicación
        appState.posts = [];
        appState.projects = [];
        appState.library = [];
        
        // Rankings de ejemplo
        appState.rankings.weekly = [
            { position: 1, title: 'Come As You Are', artist: 'Nirvana', searches: 1245, rating: 4.8 },
            { position: 2, title: 'Smells Like Teen Spirit', artist: 'Nirvana', searches: 987, rating: 4.7 }
        ];
    }

    // Hacer funciones disponibles globalmente para los event listeners en HTML
    window.app = {
        showInstrumentSheet: showInstrumentSheet
    };
});
