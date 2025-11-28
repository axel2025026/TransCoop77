// script.js - TransCoope (Versión Mejorada)
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
            metronome: { active: false, bpm: 120 },
            tuner: { active: false },
            rhythm: { active: false }
        },
        rankings: {
            weekly: [],
            monthly: [],
            alltime: []
        }
    };

    // Elementos DOM principales
    const elements = {
        loginScreen: document.getElementById('login-screen'),
        registerScreen: document.getElementById('register-screen'),
        appScreen: document.getElementById('app-screen'),
        loginForm: document.getElementById('login-form'),
        registerForm: document.getElementById('register-form'),
        showRegister: document.getElementById('show-register'),
        showLogin: document.getElementById('show-login'),
        logoutBtn: document.getElementById('logout-btn'),
        profileBtn: document.getElementById('profile-btn'),
        navLinks: document.querySelectorAll('.nav-link'),
        contentSections: document.querySelectorAll('.content-section'),
        userName: document.getElementById('user-name')
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

<span class="tab-note">// Repetir 4 veces</span>
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

<span class="tab-note">// Palabras: "Come as you are..."</span>
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
                    </div>
                    
                    <div class="playing-tips">
                        <h5>💡 Consejos de Ejecución:</h5>
                        <ul>
                            <li>Usa distorsión media con mucho sustain</li>
                            <li>Palm mute en las notas graves</li>
                            <li>Mantén un tempo constante de 120 BPM</li>
                            <li>El riff usa principalmente cuerdas graves</li>
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

<span class="tab-note">// Sigue el riff de guitarra</span>
                            </pre>
                        </div>
                        
                        <div class="tab-section">
                            <h5>Patrón Completo</h5>
                            <pre class="bass-tab">
G|---------------------|
D|---------------------|
A|--2-2-4-4-2-2-0-0---|
E|--2-2-4-4-2-2-0-0---|

<span class="tab-note">// Notas: Re - Mi - Re - Do</span>
                            </pre>
                        </div>
                    </div>
                    
                    <div class="playing-tips">
                        <h5>💡 Técnica de Bajo:</h5>
                        <ul>
                            <li>Usa dedos (fingerstyle) para un sonido más orgánico</li>
                            <li>Mantén las notas sostenidas</li>
                            <li>Énfasis en el groove y el ritmo</li>
                            <li>Coordinación perfecta con la batería</li>
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
C|----------------|      SNARE|----x-------x---|
H|--x-x-x-x-x-x-x-|      KICK |x-------x-------|
R|----------------|      TOM1 |----------------|
                            </pre>
                        </div>
                        
                        <div class="notation-section">
                            <h5>Patrón del Estribillo</h5>
                            <pre class="drum-tab">
C|----------------|      SNARE|----x-------x---|
H|--x-x-x-x-x-x-x-|      KICK |x---x---x---x---|
R|----------------|      TOM1 |------------xxxx|
                            </pre>
                        </div>
                        
                        <div class="notation-section">
                            <h5>Fill de Transición</h5>
                            <pre class="drum-tab">
C|----------------|      SNARE|----x-----------|
H|----------------|      KICK |x---------------|
R|--xxxx----------|      TOM1 |--------xxxx----|
                            </pre>
                        </div>
                    </div>
                    
                    <div class="drum-legend">
                        <h5>Leyenda:</h5>
                        <ul>
                            <li><strong>H:</strong> Hi-hat</li>
                            <li><strong>SNARE:</strong> Caja</li>
                            <li><strong>KICK:</strong> Bombo</li>
                            <li><strong>TOM1:</strong> Tom de aire</li>
                            <li><strong>C:</strong> Crash</li>
                            <li><strong>R:</strong> Ride</li>
                        </ul>
                    </div>
                    
                    <div class="playing-tips">
                        <h5>💡 Estilo de Dave Grohl:</h5>
                        <ul>
                            <li>Golpes potentes pero controlados</li>
                            <li>Hi-hat constante en corcheas</li>
                            <li>Uso de toms para fills creativos</li>
                            <li>Dinámica: fuerte en estribillos, suave en versos</li>
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
                        </div>
                        
                        <div class="vocal-section">
                            <h5>Estribillo</h5>
                            <div class="vocal-line">
                                <span class="lyrics">And I swear that I don't have a gun</span>
                                <span class="notes">La - Sol - Fa - Mi - Re - Do</span>
                            </div>
                            <div class="vocal-line">
                                <span class="lyrics">No, I don't have a gun</span>
                                <span class="notes">Mi - Re - Do - La</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="vocal-tips">
                        <h5>💡 Técnica Vocal:</h5>
                        <ul>
                            <li>Voz rasposa característica del grunge</li>
                            <li>Dinámica: de susurro a gritos controlados</li>
                            <li>Fraseo relajado pero intenso</li>
                            <li>Uso de vibrato natural</li>
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
        if (elements.showRegister) {
            elements.showRegister.addEventListener('click', (e) => {
                e.preventDefault();
                showScreen('register');
            });
        }

        if (elements.showLogin) {
            elements.showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                showScreen('login');
            });
        }

        // Formularios de login y registro
        if (elements.loginForm) {
            elements.loginForm.addEventListener('submit', handleLogin);
        }

        if (elements.registerForm) {
            elements.registerForm.addEventListener('submit', handleRegister);
        }

        if (elements.logoutBtn) {
            elements.logoutBtn.addEventListener('click', handleLogout);
        }

        if (elements.profileBtn) {
            elements.profileBtn.addEventListener('click', showProfileModal);
        }

        // Navegación entre secciones
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                showSection(section);
                
                // Actualizar navegación
                elements.navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Transcripción de audio
        setupTranscriptionListeners();
        
        // Biblioteca
        setupLibraryListeners();
        
        // Práctica
        setupPracticeListeners();
        
        // Comunidad
        setupCommunityListeners();
        
        // Proyectos
        setupProjectsListeners();
        
        // Cursos
        setupCoursesListeners();
        
        // Ranking
        setupRankingListeners();

        // Cerrar modales al hacer clic fuera
        setupModalListeners();
    }

    function setupModalListeners() {
        // Cerrar modales al hacer clic fuera
        window.addEventListener('click', (e) => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Cerrar modales con botones de cerrar
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    // Gestión de pantallas
    function showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        if (screenName === 'login') {
            elements.loginScreen.classList.add('active');
        } else if (screenName === 'register') {
            elements.registerScreen.classList.add('active');
        } else if (screenName === 'app') {
            elements.appScreen.classList.add('active');
        }
    }

    function showSection(sectionName) {
        // Mostrar sección
        elements.contentSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionName) {
                section.classList.add('active');
            }
        });

        appState.currentSection = sectionName;
        
        // Cargar datos específicos de la sección
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

    // SISTEMA DE AUTENTICACIÓN
    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }

        // Buscar usuario en localStorage
        const userData = JSON.parse(localStorage.getItem(`user_${username}`));
        
        if (userData && userData.password === password) {
            // Login exitoso
            appState.currentUser = {
                username: username,
                email: userData.email,
                genres: userData.genres || []
            };
            appState.isLoggedIn = true;
            appState.userGenres = userData.genres || [];
            
            // Guardar sesión
            localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
            
            // Mostrar aplicación
            showScreen('app');
            updateUIForUser();
            showSection('transcripcion');
            
            showNotification(`¡Bienvenido de nuevo, ${username}!`, 'success');
        } else {
            showNotification('Usuario o contraseña incorrectos', 'error');
        }
    }

    function handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const genreCheckboxes = document.querySelectorAll('input[name="genre"]:checked');
        
        const selectedGenres = Array.from(genreCheckboxes).map(cb => cb.value);

        // Validaciones
        if (!username || !email || !password) {
            showNotification('Por favor completa todos los campos obligatorios', 'error');
            return;
        }

        if (selectedGenres.length === 0) {
            showNotification('Por favor selecciona al menos un género musical', 'error');
            return;
        }

        // Verificar si el usuario ya existe
        if (localStorage.getItem(`user_${username}`)) {
            showNotification('Este nombre de usuario ya está en uso', 'error');
            return;
        }

        // Crear usuario
        const userData = {
            username: username,
            email: email,
            password: password,
            genres: selectedGenres,
            joinDate: new Date().toISOString(),
            stats: {
                sheetsCreated: 0,
                postsMade: 0,
                projectsUploaded: 0
            }
        };
        
        // Guardar usuario
        localStorage.setItem(`user_${username}`, JSON.stringify(userData));
        
        // Iniciar sesión automáticamente
        appState.currentUser = {
            username: username,
            email: email,
            genres: selectedGenres,
            stats: userData.stats
        };
        appState.isLoggedIn = true;
        appState.userGenres = selectedGenres;
        
        localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
        
        showScreen('app');
        updateUIForUser();
        showSection('transcripcion');
        
        showNotification('¡Cuenta creada exitosamente!', 'success');
    }

    function handleLogout() {
        appState.currentUser = null;
        appState.isLoggedIn = false;
        appState.userGenres = [];
        
        localStorage.removeItem('currentUser');
        
        showScreen('login');
        
        // Limpiar formularios
        if (elements.loginForm) elements.loginForm.reset();
        if (elements.registerForm) elements.registerForm.reset();
        
        showNotification('Sesión cerrada correctamente', 'info');
    }

    function showProfileModal() {
        const modal = document.getElementById('profile-modal');
        if (!modal) return;

        if (appState.currentUser) {
            document.getElementById('profile-username').textContent = appState.currentUser.username;
            document.getElementById('profile-email').textContent = appState.currentUser.email;
            document.getElementById('profile-avatar-text').textContent = appState.currentUser.username.charAt(0).toUpperCase();
            
            // Actualizar estadísticas
            document.getElementById('profile-sheets').textContent = appState.currentUser.stats?.sheetsCreated || 0;
            document.getElementById('profile-posts').textContent = appState.currentUser.stats?.postsMade || 0;
            document.getElementById('profile-projects').textContent = appState.currentUser.stats?.projectsUploaded || 0;
            
            // Actualizar géneros
            const genresList = document.getElementById('profile-genres-list');
            if (genresList && appState.userGenres) {
                genresList.innerHTML = appState.userGenres.map(genre => 
                    `<span class="genre-tag">${genre}</span>`
                ).join('');
            }
        }
        
        modal.style.display = 'block';
    }

    function checkLoginStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                appState.currentUser = userData;
                appState.isLoggedIn = true;
                appState.userGenres = userData.genres || [];
                
                showScreen('app');
                updateUIForUser();
                showSection('transcripcion');
            } catch (error) {
                console.error('Error al cargar usuario:', error);
                localStorage.removeItem('currentUser');
                showScreen('login');
            }
        } else {
            showScreen('login');
        }
    }

    function updateUIForUser() {
        if (appState.currentUser && elements.userName) {
            elements.userName.textContent = appState.currentUser.username;
        }
    }

    // SISTEMA DE TRANSCRIPCIÓN MEJORADO
    function setupTranscriptionListeners() {
        const processUrlBtn = document.getElementById('process-url');
        const audioFileInput = document.getElementById('audio-file');
        const downloadPdfBtn = document.getElementById('download-pdf');
        const saveToLibraryBtn = document.getElementById('save-to-library');

        if (processUrlBtn) {
            processUrlBtn.addEventListener('click', processUrl);
        }

        if (audioFileInput) {
            audioFileInput.addEventListener('change', processFile);
        }

        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', downloadPdf);
        }

        if (saveToLibraryBtn) {
            saveToLibraryBtn.addEventListener('click', saveToLibrary);
        }
    }

    function initializeTranscriptionSection() {
        // Inicializar con partituras de ejemplo
        generateSampleSheetMusic();
    }

    function processUrl() {
        const urlInput = document.getElementById('song-url');
        if (!urlInput) return;

        const url = urlInput.value.trim();
        
        if (!url) {
            showNotification('Por favor ingresa un enlace válido', 'error');
            return;
        }

        if (!isValidUrl(url)) {
            showNotification('Por favor ingresa un enlace válido de YouTube, Spotify o similar', 'error');
            return;
        }

        simulateTranscription();
    }

    function processFile(e) {
        const file = e.target.files[0];
        
        if (!file) return;

        if (!file.type.startsWith('audio/')) {
            showNotification('Por favor selecciona un archivo de audio válido', 'error');
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            showNotification('El archivo es demasiado grande (máximo 50MB)', 'error');
            return;
        }

        simulateTranscription();
    }

    function simulateTranscription() {
        const processingSection = document.getElementById('processing-section');
        const resultsSection = document.getElementById('results-section');
        
        if (!processingSection || !resultsSection) return;

        processingSection.classList.add('active');
        resultsSection.style.display = 'none';

        // Simular progreso paso a paso
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
                    
                    // Actualizar estadísticas del usuario
                    if (appState.currentUser) {
                        appState.currentUser.stats.sheetsCreated++;
                        localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
                    }
                }, 1000);
            }
        }, 1000);
    }

    function generateSampleSheetMusic() {
        const tabsContainer = document.querySelector('.instruments-tabs');
        const sheetContainer = document.querySelector('.sheet-music-container');

        if (!tabsContainer || !sheetContainer) return;

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
        const tabs = document.querySelectorAll('.instrument-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-instrument') === instrumentKey);
        });
        
        showInstrumentSheet(instrumentKey);
    }

    function showInstrumentSheet(instrumentKey) {
        const sheetContainer = document.querySelector('.sheet-music-container');
        if (!sheetContainer || !comeAsYouAreSheets[instrumentKey]) return;

        const sheet = comeAsYouAreSheets[instrumentKey];
        sheetContainer.innerHTML = sheet.content;
        
        // Agregar estilos para las partituras
        addSheetMusicStyles();
    }

    function addSheetMusicStyles() {
        if (!document.getElementById('sheet-music-styles')) {
            const style = document.createElement('style');
            style.id = 'sheet-music-styles';
            style.textContent = `
                .tablature, .drum-notation, .vocal-notation {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    padding: 1rem;
                    margin: 1rem 0;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .guitar-tab, .bass-tab, .drum-tab {
                    color: var(--accent);
                    margin: 0.5rem 0;
                }
                
                .tab-note {
                    color: var(--light);
                    font-style: italic;
                    font-size: 12px;
                }
                
                .tab-section, .notation-section, .vocal-section {
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .tab-section h5, .notation-section h5, .vocal-section h5 {
                    color: var(--accent);
                    margin-bottom: 0.5rem;
                }
                
                .playing-tips, .vocal-tips, .drum-legend {
                    background: rgba(76, 201, 240, 0.1);
                    border-radius: 8px;
                    padding: 1rem;
                    margin: 1rem 0;
                }
                
                .playing-tips h5, .vocal-tips h5, .drum-legend h5 {
                    color: var(--accent);
                    margin-bottom: 0.5rem;
                }
                
                .playing-tips ul, .vocal-tips ul, .drum-legend ul {
                    margin: 0;
                    padding-left: 1.5rem;
                }
                
                .playing-tips li, .vocal-tips li, .drum-legend li {
                    margin-bottom: 0.25rem;
                }
                
                .vocal-line {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    padding: 0.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 4px;
                }
                
                .lyrics {
                    color: white;
                    font-weight: 500;
                }
                
                .notes {
                    color: var(--accent);
                    font-family: 'Courier New', monospace;
                }
                
                .song-structure {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    padding: 1rem;
                    margin-top: 1rem;
                }
                
                .song-structure h5 {
                    color: var(--accent);
                    margin-bottom: 0.5rem;
                }
                
                .song-structure ol {
                    margin: 0;
                    padding-left: 1.5rem;
                }
                
                .song-structure li {
                    margin-bottom: 0.5rem;
                }
            `;
            document.head.appendChild(style);
        }
    }

    function downloadPdf() {
        showNotification('Generando y descargando partitura en formato PDF...', 'info');
        
        setTimeout(() => {
            showNotification('¡PDF descargado correctamente!', 'success');
        }, 2000);
    }

    function saveToLibrary() {
        if (!appState.currentUser) return;

        const songData = {
            id: Date.now(),
            title: 'Come As You Are',
            artist: 'Nirvana',
            instruments: ['guitarra', 'bajo', 'bateria', 'voz'],
            dateAdded: new Date().toISOString(),
            sheets: comeAsYouAreSheets
        };

        // Agregar a la biblioteca del usuario
        appState.library.push(songData);
        saveLibraryToStorage();
        
        showNotification('¡Partitura guardada en tu biblioteca!', 'success');
    }

    // SISTEMA DE BIBLIOTECA
    function setupLibraryListeners() {
        const genreFilter = document.getElementById('library-genre-filter');
        const instrumentFilter = document.getElementById('library-instrument-filter');

        if (genreFilter) {
            genreFilter.addEventListener('change', loadLibrary);
        }

        if (instrumentFilter) {
            instrumentFilter.addEventListener('change', loadLibrary);
        }
    }

    function loadLibrary() {
        const libraryGrid = document.querySelector('.library-grid');
        if (!libraryGrid) return;

        loadLibraryFromStorage();

        if (appState.library.length === 0) {
            // Mostrar biblioteca de ejemplo
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
                        <button class="btn-primary" onclick="openSheetFromLibrary('Come As You Are')">Abrir</button>
                        <button class="btn-secondary">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
                
                <div class="library-item">
                    <div class="item-header">
                        <h4>Smells Like Teen Spirit</h4>
                        <span class="item-badge">Guardada</span>
                    </div>
                    <p class="item-artist">Nirvana</p>
                    <div class="item-instruments">
                        <span class="instrument-tag">Guitarra</span>
                        <span class="instrument-tag">Batería</span>
                    </div>
                    <div class="item-actions">
                        <button class="btn-primary">Abrir</button>
                        <button class="btn-secondary">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Mostrar biblioteca real del usuario
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
                        <button class="btn-primary" onclick="openSheetFromLibrary('${item.title}')">Abrir</button>
                        <button class="btn-secondary">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    // SISTEMA DE PRÁCTICA
    function setupPracticeListeners() {
        const metronomeToggle = document.getElementById('metronome-toggle');
        const bpmSlider = document.getElementById('bpm-slider');
        const tunerToggle = document.getElementById('tuner-toggle');
        const rhythmToggle = document.getElementById('rhythm-toggle');

        if (metronomeToggle) {
            metronomeToggle.addEventListener('click', toggleMetronome);
        }

        if (bpmSlider) {
            bpmSlider.addEventListener('input', updateBPM);
        }

        if (tunerToggle) {
            tunerToggle.addEventListener('click', toggleTuner);
        }

        if (rhythmToggle) {
            rhythmToggle.addEventListener('click', toggleRhythmTrainer);
        }
    }

    function initializePracticeTools() {
        updateBPM();
    }

    function toggleMetronome() {
        const button = document.getElementById('metronome-toggle');
        appState.practiceTools.metronome.active = !appState.practiceTools.metronome.active;
        
        if (appState.practiceTools.metronome.active) {
            button.innerHTML = '<i class="fas fa-stop"></i> Detener';
            button.classList.add('active');
            showNotification('Metrónomo iniciado a ' + appState.practiceTools.metronome.bpm + ' BPM', 'info');
        } else {
            button.innerHTML = '<i class="fas fa-play"></i> Iniciar';
            button.classList.remove('active');
            showNotification('Metrónomo detenido', 'info');
        }
    }

    function updateBPM() {
        const slider = document.getElementById('bpm-slider');
        const value = document.getElementById('bpm-value');
        
        if (slider && value) {
            const bpm = parseInt(slider.value);
            appState.practiceTools.metronome.bpm = bpm;
            value.textContent = bpm;
        }
    }

    function toggleTuner() {
        const button = document.getElementById('tuner-toggle');
        appState.practiceTools.tuner.active = !appState.practiceTools.tuner.active;
        
        if (appState.practiceTools.tuner.active) {
            button.innerHTML = '<i class="fas fa-stop"></i> Detener Afinador';
            button.classList.add('active');
            showNotification('Afinador activado - Habla o toca una nota', 'info');
        } else {
            button.innerHTML = '<i class="fas fa-microphone"></i
