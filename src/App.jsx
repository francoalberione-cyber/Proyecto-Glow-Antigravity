import React, { useState, useEffect } from 'react';
import {
    ShoppingBag, Users, Activity, Calendar, Trophy,
    ChevronRight, Star, Clock, MapPin, Search,
    Dumbbell, Play, LogOut, Menu, X, CheckCircle,
    BarChart, Wallet, MessageCircle, AlertCircle, Plus, Trash2, Edit
} from 'lucide-react';

// ==========================================
// 1. CONSTANTS & MOCK DATABASE
// ==========================================

const EXERCISE_LIBRARY = [
    // PECHO
    { id: 1, name: 'Press de Banca Plano', category: 'Pecho' },
    { id: 2, name: 'Press Inclinado con Mancuernas', category: 'Pecho' },
    { id: 3, name: 'Aperturas con Mancuernas', category: 'Pecho' },
    { id: 4, name: 'Fondos en Paralelas', category: 'Pecho' },
    { id: 5, name: 'Press Declinado', category: 'Pecho' },
    { id: 6, name: 'Cruces en Polea Alta', category: 'Pecho' },

    // ESPALDA
    { id: 7, name: 'Dominadas Pronas', category: 'Espalda' },
    { id: 8, name: 'Peso Muerto Convencional', category: 'Espalda' },
    { id: 9, name: 'Remo con Barra', category: 'Espalda' },
    { id: 10, name: 'Remo en Polea Baja', category: 'Espalda' },
    { id: 11, name: 'Jalón al Pecho', category: 'Espalda' },
    { id: 12, name: 'Pull Over', category: 'Espalda' },

    // PIERNAS
    { id: 13, name: 'Sentadilla Libre', category: 'Piernas' },
    { id: 14, name: 'Prensa 45°', category: 'Piernas' },
    { id: 15, name: 'Estocadas con Mancuernas', category: 'Piernas' },
    { id: 16, name: 'Peso Muerto Rumano', category: 'Piernas' },
    { id: 17, name: 'Extensión de Cuádriceps', category: 'Piernas' },
    { id: 18, name: 'Curl Femoral', category: 'Piernas' },
    { id: 19, name: 'Elevación de Gemelos', category: 'Piernas' },

    // BRAZOS - BÍCEPS
    { id: 20, name: 'Curl con Barra Z', category: 'Brazos - Bíceps' },
    { id: 21, name: 'Curl Martillo', category: 'Brazos - Bíceps' },
    { id: 22, name: 'Curl Concentrado', category: 'Brazos - Bíceps' },
    { id: 23, name: 'Curl en Polea Baja', category: 'Brazos - Bíceps' },

    // BRAZOS - TRÍCEPS
    { id: 24, name: 'Press Francés', category: 'Brazos - Tríceps' },
    { id: 25, name: 'Extensiones en Polea', category: 'Brazos - Tríceps' },
    { id: 26, name: 'Fondos para Tríceps', category: 'Brazos - Tríceps' },
    { id: 27, name: 'Patada de Tríceps', category: 'Brazos - Tríceps' },

    // ZONA MEDIA
    { id: 28, name: 'Plancha Frontal', category: 'Zona Media' },
    { id: 29, name: 'Plancha Lateral', category: 'Zona Media' },
    { id: 30, name: 'Abdominales con Polea', category: 'Zona Media' },
    { id: 31, name: 'Elevación de Piernas', category: 'Zona Media' },
    { id: 32, name: 'Russian Twist', category: 'Zona Media' },
    { id: 33, name: 'Mountain Climbers', category: 'Zona Media' },

    // RUNNING - TÉCNICA
    { id: 34, name: 'Skipping Alto', category: 'Running - Técnica' },
    { id: 35, name: 'Talones al Glúteo', category: 'Running - Técnica' },
    { id: 36, name: 'Zancadas Dinámicas', category: 'Running - Técnica' },
    { id: 37, name: 'Carrera Lateral', category: 'Running - Técnica' },

    // RUNNING - PASADAS
    { id: 38, name: 'Intervalos 400m', category: 'Running - Pasadas' },
    { id: 39, name: 'Fartlek 30/30', category: 'Running - Pasadas' },
    { id: 40, name: 'Tempo Run 5K', category: 'Running - Pasadas' },
    { id: 41, name: 'Sprints 100m', category: 'Running - Pasadas' },

    // MOVILIDAD
    { id: 42, name: 'Estiramiento de Cuádriceps', category: 'Movilidad' },
    { id: 43, name: 'Estiramiento de Isquiotibiales', category: 'Movilidad' },
    { id: 44, name: 'Rotación de Hombros', category: 'Movilidad' },
    { id: 45, name: 'Cat-Cow (Gato-Vaca)', category: 'Movilidad' },
    { id: 46, name: 'Apertura de Cadera', category: 'Movilidad' },
    { id: 47, name: 'Foam Rolling Espalda', category: 'Movilidad' }
];

const DB_PRODUCTS = [
    // INFRAESTRUCTURA
    {
        id: 1,
        name: 'Glow Box Óptimo',
        category: 'Infraestructura',
        price: 'COTIZAR',
        image: 'https://lh3.googleusercontent.com/d/1ABt04GmrkqelTDQzPn6u7-zSDkL6PpPl',
        description: `<strong>Glow Box Óptimo: El Epicentro del Bienestar Outdoor</strong><br>
    Estación saludable integral diseñada para conectar a las personas a través del movimiento. Ideal para hoteles y desarrollos inmobiliarios.<br><br>
    <strong>📦 Inteligencia y Espacio:</strong><br>
    • Capacidad: +30 personas simultáneas<br>
    • Superficie: 18 m² de área operativa (4.1m x 4.8m abierto)<br>
    • Seguridad: Cerramiento total antivandálico<br><br>
    <strong>⚙️ Equipamiento Full:</strong><br>
    • 4 Módulos de Poleas (140kg carga c/u)<br>
    • Rack de Sentadillas y Press de Banca<br>
    • Sector de Calistenia y Almacenamiento (+600kg)`,
        specs: ['18m2 Superficie', 'Capacidad 30 personas', 'Acero Galvanizado', 'Piso de Caucho'],
        gallery: [
            'https://lh3.googleusercontent.com/d/1ABt04GmrkqelTDQzPn6u7-zSDkL6PpPl',
            'https://lh3.googleusercontent.com/d/1u8KAzp9_nIOI3nrRWa9caC15zOzxItuz',
            'https://lh3.googleusercontent.com/d/10YZNeCIUWIsef6Fxc595skhjPDWnGTkB',
            'https://lh3.googleusercontent.com/d/1Pt-pLRsE3Gt5afKA2keaUUxx4K3hWgOY',
            'https://lh3.googleusercontent.com/d/1w5RMLmHeleFersdc6XnXChc9AtbXBk_j',
            'https://lh3.googleusercontent.com/d/1XFziU6UrONM9qAX-aDzXfoABvEUDdh7E',
            'https://lh3.googleusercontent.com/d/1jReqsY73f5AJ5-ZIjGBrIY5gklGOA6Ev'
        ]
    },
    {
        id: 2,
        name: 'Personal Móvil Gym',
        category: 'Infraestructura',
        price: 'COTIZAR',
        image: 'https://lh3.googleusercontent.com/d/13geGHjZtKeKEAzcuw6BDn8zv-3kE_9Zz',
        description: `<strong>🚀 Movilidad sin Límites</strong><br>
    El Personal Gym de Glow es una solución de entrenamiento móvil diseñada para entrenadores personales. Montado sobre un tráiler de ingeniería avanzada, permite trasladar una estación de musculación completa.<br><br>
    <strong>📦 Especificaciones:</strong><br>
    • Chasis: Tráiler de 1 eje con suspensión reforzada<br>
    • Compatibilidad: Apto para autos pequeños (VW Up, Ford Ka)<br>
    • Estabilidad: Apoyos niveladores retráctiles<br><br>
    <strong>⚙️ Equipamiento Integrado:</strong><br>
    • 2 Módulos de Poleas (ajustables)<br>
    • Rack de Sentadillas y Módulo de Dominadas<br>
    • Gabinete de guardado para discos y accesorios<br><br>
    <strong>🛠️ Calidad Profesional:</strong><br>
    • Estructura: Acero industrial y pintura electroestática<br>
    • Seguridad: Poleas con rodamientos blindados`,
        specs: ['Tráiler 1 eje', 'Despliegue rápido', 'Capacidad 10 personas'],
        gallery: [
            'https://lh3.googleusercontent.com/d/13geGHjZtKeKEAzcuw6BDn8zv-3kE_9Zz',
            'https://lh3.googleusercontent.com/d/1aNV1eVpb-vQjw9nbXWyHPjlFRl3ZJdWQ',
            'https://lh3.googleusercontent.com/d/1g9aAe003yc8KraPLWbPsBxbtk3rENRKm'
        ]
    },
    {
        id: 3,
        name: 'Sala Outdoor Full',
        category: 'Infraestructura',
        price: 'COTIZAR',
        image: 'https://lh3.googleusercontent.com/d/1yO8oB13x2L7_Fma61roKMY32iVc4rHre',
        description: `<strong>🚀 Potencia e Independencia Masiva</strong><br>
    El Mobile Gym Outdoor Full es el buque insignia de Glow. Una sala de musculación profesional montada sobre un tráiler de doble eje, operando 100% con energía solar.<br><br>
    <strong>📦 Especificaciones:</strong><br>
    • Chasis: Tráiler doble eje (4.6m largo cerrado | 6.3m abierto)<br>
    • Capacidad: +80 personas simultáneas<br>
    • Energía: Paneles solares + Banco de baterías + Luces LED<br><br>
    <strong>⚙️ Equipamiento:</strong><br>
    • 6 Módulos de Poleas (Sistema 87.500)<br>
    • Doble Rack de Fuerza (Sentadillas/Banca)<br>
    • Módulos de Dominadas y Calistenia<br>
    • Almacenamiento masivo (+1000kg)<br><br>
    <strong>🛠️ Calidad Glow:</strong><br>
    • Estructura: Acero industrial bajo normas IRAM-ISO<br>
    • Seguridad: 4 apoyos niveladores de alta carga`,
        specs: ['Tráiler Doble Eje', 'Energía Solar', 'Sonido Integrado', '+80 Personas'],
        gallery: [
            'https://lh3.googleusercontent.com/d/1yO8oB13x2L7_Fma61roKMY32iVc4rHre',
            'https://lh3.googleusercontent.com/d/1UFdEehifDASj-5pGLj35HPxqNmxBxqKa',
            'https://lh3.googleusercontent.com/d/1oleokuTnAf_Tt7mMLFVJAl-ABrBBQEza',
            'https://lh3.googleusercontent.com/d/1PQc9J7NzDpuMdTVt02o4RtCkIQIX0NMS',
            'https://lh3.googleusercontent.com/d/1ToX0q4L_LFLLzrrWcIASBkH_FZfoUORK',
            'https://lh3.googleusercontent.com/d/1S1hwwBeVCJbUtlGOc_ltoNzRV8THcHM3',
            'https://lh3.googleusercontent.com/d/1Y9siNvcP3Ghx_A5bQRzi9wgmDGOQKhHC'
        ]
    },
    // GLOW HOME
    {
        id: 4,
        name: 'Módulo de Polea',
        category: 'Glow Home',
        price: '$450.000',
        image: 'https://lh3.googleusercontent.com/d/1SD8-Aq2NqpUHaFobqtmvnk83hpBkzB1t',
        description: 'Sistema de polea alta y baja para montar en pared.',
        specs: ['Carga a Discos', 'Cable de Acero', 'Incluye Agarres'],
        gallery: ['https://lh3.googleusercontent.com/d/1SD8-Aq2NqpUHaFobqtmvnk83hpBkzB1t']
    },
    {
        id: 5,
        name: 'Rack Plegable',
        category: 'Glow Home',
        price: '$380.000',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop',
        description: 'Rack de potencia Heavy Duty plegable a la pared.',
        specs: ['Perfil 60x60', 'Soporta 300kg', 'Ahorra Espacio'],
        gallery: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop']
    },
    {
        id: 6,
        name: 'Banca Regulable',
        category: 'Glow Home',
        price: '$220.000',
        image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&h=600&fit=crop',
        description: 'Bando multiposición profesional.',
        specs: ['Plano/Inclinado/Declinado', 'Tapizado Premium'],
        gallery: []
    },
    {
        id: 7,
        name: 'Kit Calistenia',
        category: 'Glow Home',
        price: '$120.000',
        image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600&h=600&fit=crop',
        description: 'Paralelas bajas, anillas de madera y bandas de tensión.',
        specs: ['Madera Guatambú', 'Cintas numeradas'],
        gallery: []
    }
];

// Initial Data Population
const INIT_USERS = {
    '9999': { dni: '9999', name: 'Admin', surname: 'General', role: 'admin', email: 'admin@glow.com' },
    '5555': {
        dni: '5555',
        name: 'Martín',
        surname: 'García',
        role: 'professor',
        email: 'martin@glow.com',
        avgRating: 4.7,
        photo: 'https://i.pravatar.cc/150?u=martin'
    },
    '1111': {
        dni: '1111',
        name: 'Pedro',
        surname: 'Alumno',
        role: 'student',
        email: 'pedro@glow.com',
        plan: 'Pase Libre',
        active: true,
        hasRoutine: true,
        stats: { totalHours: 14.5, sessions: 12 },
        trainingPlan: [
            {
                id: 1,
                name: 'Bloque 1: Fuerza',
                exercises: [
                    { id: 1, name: 'Press de Banca Plano', category: 'Pecho', sets: 4, reps: 10, weight: 60 },
                    { id: 13, name: 'Sentadilla Libre', category: 'Piernas', sets: 4, reps: 8, weight: 80 },
                    { id: 9, name: 'Remo con Barra', category: 'Espalda', sets: 3, reps: 12, weight: 50 }
                ]
            }
        ],
        runningPlan: "Fartlek: 1' Rápido / 1' Lento x 20 min"
    },
    '2222': {
        dni: '2222',
        name: 'Ana',
        surname: 'Gómez',
        role: 'student',
        email: 'ana@glow.com',
        plan: '3x Semana',
        active: true,
        hasRoutine: false,
        trainingPlan: null,
        stats: { totalHours: 2, sessions: 2 }
    }
};

const MOCK_RANKING = [
    { id: 1, name: 'Juan P.', distance: '10km', time: '00:42:15' },
    { id: 2, name: 'Ana M.', distance: '5km', time: '00:21:30' },
    { id: 3, name: 'Pedro A.', distance: '10km', time: '00:48:10' },
];

// ==========================================
// 2. UTILS
// ==========================================

const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

// ==========================================
// 3. UI ATOMS & COMPONENTS
// ==========================================

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const base = "font-bold rounded-xl transition-all duration-300 transform active:scale-95 px-6 py-3 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-[#330066] text-white hover:bg-purple-900 shadow-lg hover:shadow-purple-200",
        secondary: "bg-[#FF6600] text-white hover:bg-orange-600 shadow-lg hover:shadow-orange-200",
        outline: "border-2 border-gray-200 hover:border-[#330066] text-gray-600 hover:text-[#330066] bg-white",
        ghost: "text-gray-500 hover:text-[#330066] hover:bg-purple-50",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg"
    };
    return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

const Card = ({ children, className = '', onClick }) => (
    <div
        onClick={onClick}
        className={`bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''} ${className}`}
    >
        {children}
    </div>
);

const Badge = ({ children, color = 'purple' }) => {
    const colors = {
        purple: "bg-purple-100 text-[#330066]",
        orange: "bg-orange-100 text-[#FF6600]",
        green: "bg-green-100 text-green-700",
        red: "bg-red-100 text-red-700",
        gray: "bg-gray-100 text-gray-500",
        teal: "bg-teal-100 text-teal-700"
    };
    return <span className={`${colors[color]} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>{children}</span>;
};

const GalleryModal = ({ isOpen, images, onClose }) => {
    const [idx, setIdx] = useState(0);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center animate-in fade-in duration-200">
            <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-[#FF6600]"><X size={32} /></button>
            <button onClick={() => setIdx(i => i > 0 ? i - 1 : images.length - 1)} className="absolute left-4 text-white hover:text-[#FF6600]"><ChevronRight size={48} className="rotate-180" /></button>
            <img src={images[idx]} className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg" />
            <button onClick={() => setIdx(i => i < images.length - 1 ? i + 1 : 0)} className="absolute right-4 text-white hover:text-[#FF6600]"><ChevronRight size={48} /></button>
            <div className="absolute bottom-6 flex gap-2">
                {images.map((_, i) => (
                    <div key={i} className={`h-2 w-2 rounded-full transition-all ${i === idx ? 'bg-[#FF6600] w-6' : 'bg-gray-600'}`} />
                ))}
            </div>
        </div>
    );
};

// ==========================================
// 4. LOGIC COMPONENTS (Sub-views)
// ==========================================

const RunningRecords = () => {
    const [activeTab, setActiveTab] = useState('plan');
    const [myTime, setMyTime] = useState('');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                <button onClick={() => setActiveTab('plan')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'plan' ? 'bg-white shadow text-[#330066]' : 'text-gray-500'}`}>Mi Plan</button>
                <button onClick={() => setActiveTab('ranking')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'ranking' ? 'bg-white shadow text-[#330066]' : 'text-gray-500'}`}>Ranking</button>
            </div>

            {activeTab === 'plan' ? (
                <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl text-center">
                    <div className="text-4xl mb-4">🏃💨</div>
                    <h3 className="font-bold text-blue-900 mb-2 uppercase tracking-wide">Entrenamiento de Hoy</h3>
                    <p className="text-xl font-black text-blue-700 leading-tight">10k Progresivos (4k suaves + 4k ritmo + 2k a fondo)</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <Card className="p-6 bg-orange-50 border-orange-100">
                        <h3 className="font-bold text-[#FF6600] mb-4 flex items-center gap-2"><Clock size={16} /> Cargar Tiempo</h3>
                        <div className="flex gap-2">
                            <select className="p-3 rounded-xl border border-orange-200 font-bold text-gray-600 w-1/3 outline-none">
                                <option>5km</option>
                                <option>10km</option>
                                <option>21km</option>
                            </select>
                            <input
                                placeholder="00:00:00"
                                value={myTime}
                                onChange={e => setMyTime(e.target.value)}
                                className="flex-1 p-3 rounded-xl border border-orange-200 outline-none"
                            />
                        </div>
                        <Button variant="secondary" className="w-full mt-3 py-2 text-sm">SUBIR</Button>
                    </Card>

                    <div className="border border-gray-100 rounded-2xl overflow-hidden">
                        <div className="bg-gray-50 p-3 text-xs font-bold text-gray-400 uppercase">Ranking Sala</div>
                        {MOCK_RANKING.map((r, i) => (
                            <div key={i} className="flex justify-between items-center p-4 border-b border-gray-50 hover:bg-purple-50 transition">
                                <div className="flex items-center gap-3">
                                    <span className={`font-black w-6 ${i === 0 ? 'text-yellow-500 text-lg' : 'text-gray-300'}`}>#{i + 1}</span>
                                    <div>
                                        <p className="font-bold text-gray-800">{r.name}</p>
                                        <Badge color="orange">{r.distance}</Badge>
                                    </div>
                                </div>
                                <span className="font-mono font-bold text-[#330066]">{r.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const PlanBuilder = ({ onClose, users, setUsers, targetStudentId, exerciseLibrary, setExerciseLibrary }) => {
    const [blocks, setBlocks] = useState([{ id: 1, name: 'Bloque 1', exercises: [] }]);
    const [activeBlockId, setActiveBlockId] = useState(1);
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [newExercise, setNewExercise] = useState({ name: '', category: 'Pecho' });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [showExerciseConfig, setShowExerciseConfig] = useState(null);
    const [exerciseConfig, setExerciseConfig] = useState({ sets: 3, reps: 10, weight: 0 });

    const categories = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos - Bíceps', 'Brazos - Tríceps', 'Zona Media', 'Running - Técnica', 'Running - Pasadas', 'Movilidad'];

    const addBlock = () => {
        const newBlock = { id: Date.now(), name: `Bloque ${blocks.length + 1}`, exercises: [] };
        setBlocks([...blocks, newBlock]);
        setActiveBlockId(newBlock.id);
    };

    const deleteBlock = (blockId) => {
        if (blocks.length > 1) {
            setBlocks(blocks.filter(b => b.id !== blockId));
            if (activeBlockId === blockId) setActiveBlockId(blocks[0].id);
        }
    };

    const addExerciseToBlock = (exercise) => {
        setShowExerciseConfig(exercise);
    };

    const confirmAddExercise = () => {
        const exerciseWithConfig = {
            ...showExerciseConfig,
            sets: exerciseConfig.sets,
            reps: exerciseConfig.reps,
            weight: exerciseConfig.weight
        };

        setBlocks(blocks.map(b =>
            b.id === activeBlockId ? { ...b, exercises: [...b.exercises, exerciseWithConfig] } : b
        ));

        setShowExerciseConfig(null);
        setExerciseConfig({ sets: 3, reps: 10, weight: 0 });
    };

    const removeExerciseFromBlock = (blockId, exerciseIndex) => {
        setBlocks(blocks.map(b =>
            b.id === blockId ? { ...b, exercises: b.exercises.filter((_, i) => i !== exerciseIndex) } : b
        ));
    };

    const handleAddNewExercise = () => {
        if (newExercise.name.trim()) {
            const newEx = {
                id: Date.now(),
                name: newExercise.name,
                category: newExercise.category
            };
            setExerciseLibrary([...exerciseLibrary, newEx]);
            setNewExercise({ name: '', category: 'Pecho' });
            setShowAddExercise(false);
        }
    };

    const handleSave = () => {
        const updatedUsers = { ...users };
        Object.keys(updatedUsers).forEach(key => {
            if (updatedUsers[key].name === targetStudentId) {
                updatedUsers[key].hasRoutine = true;
                updatedUsers[key].trainingPlan = blocks; // Save the block structure
            }
        });
        setUsers(updatedUsers);
        onClose();
    };

    const filteredExercises = exerciseLibrary.filter(ex => {
        const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || ex.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const activeBlock = blocks.find(b => b.id === activeBlockId);

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto animate-in slide-in-from-bottom">
            <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-700 p-4 text-white flex justify-between items-center z-20 shadow-lg">
                <div>
                    <h2 className="font-black text-xl">Constructor de Rutinas</h2>
                    <p className="text-xs text-teal-100">Alumno: {targetStudentId}</p>
                </div>
                <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition"><X /></button>
            </div>

            <div className="p-4 space-y-4 pb-32">
                {/* Block Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {blocks.map(block => (
                        <button
                            key={block.id}
                            onClick={() => setActiveBlockId(block.id)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition ${activeBlockId === block.id
                                ? 'bg-teal-600 text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {block.name} ({block.exercises.length})
                        </button>
                    ))}
                    <button
                        onClick={addBlock}
                        className="px-4 py-2 rounded-lg font-bold text-sm bg-white text-teal-600 border-2 border-dashed border-teal-300 hover:border-teal-600 transition whitespace-nowrap"
                    >
                        + BLOQUE
                    </button>
                </div>

                {/* Active Block Editor */}
                {activeBlock && (
                    <Card className="p-6 border-teal-100">
                        <div className="flex justify-between items-center mb-4">
                            <input
                                value={activeBlock.name}
                                onChange={(e) => setBlocks(blocks.map(b => b.id === activeBlock.id ? { ...b, name: e.target.value } : b))}
                                className="font-bold text-2xl text-[#330066] outline-none border-b-2 border-transparent focus:border-teal-500 transition flex-1"
                                placeholder="Nombre del bloque"
                            />
                            {blocks.length > 1 && (
                                <button onClick={() => deleteBlock(activeBlock.id)} className="text-red-400 hover:text-red-600 ml-4">
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </div>

                        {/* Exercises in Block */}
                        <div className="space-y-2 mb-6">
                            {activeBlock.exercises.map((ex, i) => (
                                <div key={i} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800">{ex.name}</p>
                                        <p className="text-xs text-gray-500">{ex.category}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-teal-700">
                                                {ex.sets}x{ex.reps} {ex.weight > 0 && `@ ${ex.weight}kg`}
                                            </p>
                                        </div>
                                        <button onClick={() => removeExerciseFromBlock(activeBlock.id, i)} className="text-red-400 hover:text-red-600">
                                            <X size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {activeBlock.exercises.length === 0 && (
                                <div className="text-center py-8 text-gray-400">
                                    <p className="text-sm italic">Sin ejercicios. Selecciona de la biblioteca ↓</p>
                                </div>
                            )}
                        </div>
                    </Card>
                )}

                {/* Exercise Library */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-[#330066]">Biblioteca de Ejercicios</h3>
                        <button
                            onClick={() => setShowAddExercise(!showAddExercise)}
                            className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                        >
                            <Plus size={16} /> NUEVO
                        </button>
                    </div>

                    {/* Add Exercise Form */}
                    {showAddExercise && (
                        <div className="bg-teal-50 p-4 rounded-xl mb-4 space-y-3 border border-teal-200">
                            <input
                                placeholder="Nombre del ejercicio"
                                value={newExercise.name}
                                onChange={e => setNewExercise({ ...newExercise, name: e.target.value })}
                                className="w-full p-3 rounded-lg border border-teal-200 outline-none focus:border-teal-500"
                            />
                            <select
                                value={newExercise.category}
                                onChange={e => setNewExercise({ ...newExercise, category: e.target.value })}
                                className="w-full p-3 rounded-lg border border-teal-200 outline-none focus:border-teal-500"
                            >
                                {categories.filter(c => c !== 'Todos').map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <div className="flex gap-2">
                                <Button onClick={handleAddNewExercise} className="flex-1 bg-teal-600">AGREGAR</Button>
                                <Button variant="outline" onClick={() => setShowAddExercise(false)} className="flex-1">CANCELAR</Button>
                            </div>
                        </div>
                    )}

                    {/* Search and Filter */}
                    <div className="space-y-3 mb-4">
                        <input
                            placeholder="Buscar ejercicio..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-teal-500"
                        />
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition ${selectedCategory === cat
                                        ? 'bg-teal-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Exercise List */}
                    <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                        {filteredExercises.map(ex => (
                            <button
                                key={ex.id}
                                onClick={() => addExerciseToBlock(ex)}
                                className="text-left p-3 rounded-lg bg-white border border-gray-200 hover:border-teal-500 hover:shadow-md transition group"
                            >
                                <p className="font-bold text-sm text-gray-800 group-hover:text-teal-700">{ex.name}</p>
                                <p className="text-xs text-gray-400">{ex.category}</p>
                            </button>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Exercise Configuration Modal */}
            {showExerciseConfig && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
                        <h3 className="font-bold text-xl text-[#330066] mb-4">Configurar Ejercicio</h3>
                        <p className="text-sm text-gray-600 mb-4">{showExerciseConfig.name}</p>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">Series</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={exerciseConfig.sets}
                                    onChange={e => setExerciseConfig({ ...exerciseConfig, sets: parseInt(e.target.value) })}
                                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-teal-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">Repeticiones</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={exerciseConfig.reps}
                                    onChange={e => setExerciseConfig({ ...exerciseConfig, reps: parseInt(e.target.value) })}
                                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-teal-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">Peso (kg) - Opcional</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="2.5"
                                    value={exerciseConfig.weight}
                                    onChange={e => setExerciseConfig({ ...exerciseConfig, weight: parseFloat(e.target.value) })}
                                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-teal-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                            <Button onClick={confirmAddExercise} className="flex-1 bg-teal-600">AGREGAR AL BLOQUE</Button>
                            <Button variant="outline" onClick={() => setShowExerciseConfig(null)} className="flex-1">CANCELAR</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Save Button */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-2xl z-10">
                <Button onClick={handleSave} className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 py-4 text-lg shadow-lg">
                    GUARDAR Y ASIGNAR RUTINA
                </Button>
            </div>
        </div>
    );
};

const FeedbackModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl scale-100">
                <h3 className="text-2xl font-black text-[#330066] mb-2">¡Clase Finalizada!</h3>
                <p className="text-gray-500 mb-6">¿Cómo te sentiste hoy?</p>
                <div className="flex justify-center gap-2 mb-8">
                    {['😡', '☹️', '😐', '🙂', '🤩'].map(emoji => (
                        <button key={emoji} onClick={onClose} className="text-4xl hover:scale-125 transition grayscale hover:grayscale-0">{emoji}</button>
                    ))}
                </div>
                <Button onClick={onClose} className="w-full">ENVIAR FEEDBACK</Button>
            </div>
        </div>
    );
};

// ==========================================
// 5. DETAIL VIEWS
// ==========================================

const ProductDetail = ({ product, onBack }) => {
    const [mainImage, setMainImage] = useState(product.image);
    const [showGallery, setShowGallery] = useState(false);

    const handleWhatsapp = () => {
        window.open(`https://wa.me/5493512326943?text=Hola, me interesa: ${product.name}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-white/90 backdrop-blur z-40 px-6 py-4 flex justify-between items-center shadow-sm">
                <button onClick={onBack} className="text-[#330066] font-bold flex items-center gap-1 hover:-translate-x-1 transition">
                    <ChevronRight className="rotate-180" size={20} /> VOLVER
                </button>
                <span className="font-black text-[#FF6600]">GLOW.STORE</span>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-12">
                {/* Images */}
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-[400px] flex items-center justify-center relative group">
                        <img src={mainImage} className="max-h-full max-w-full object-contain transition duration-500" />
                        <button
                            onClick={() => setShowGallery(true)}
                            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-[#330066] shadow-lg flex items-center gap-2 hover:scale-105 transition"
                        >
                            <Search size={16} /> Ver Galería
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.gallery?.map((img, i) => (
                            <img key={i} src={img} onClick={() => setMainImage(img)} className={`w-20 h-20 rounded-xl object-cover cursor-pointer border-2 transition ${mainImage === img ? 'border-[#FF6600]' : 'border-transparent opacity-60'}`} />
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-8">
                    <div>
                        <Badge color="orange">{product.category}</Badge>
                        <h1 className="text-4xl font-black text-[#330066] mt-4 mb-2 leading-tight">{product.name}</h1>
                        <p className="text-2xl font-bold text-gray-700">{product.price}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">Características</h3>
                        <ul className="grid grid-cols-2 gap-2">
                            {product.specs?.map((s, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle size={14} className="text-[#FF6600]" /> {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        className="text-gray-600 leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    <Button variant="secondary" onClick={handleWhatsapp} className="w-full text-lg py-4 rounded-2xl">
                        <MessageCircle size={24} /> COTIZAR AHORA
                    </Button>
                </div>
            </div>

            <GalleryModal
                isOpen={showGallery}
                onClose={() => setShowGallery(false)}
                images={[product.image, ...(product.gallery || [])]}
            />
        </div>
    );
};

// ==========================================
// 6. DASHBOARDS
// ==========================================

const StudentDashboard = ({ user, onLogout }) => {
    const [activeSession, setActiveSession] = useState(null); // 'musculacion' | 'funcional' | 'running'
    const [timer, setTimer] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [viewProfile, setViewProfile] = useState(false);

    useEffect(() => {
        let interval;
        if (activeSession) {
            interval = setInterval(() => setTimer(t => t + 1), 1000);
        } else {
            setTimer(0);
        }
        return () => clearInterval(interval);
    }, [activeSession]);

    const handleCheckout = () => {
        setActiveSession(null);
        if (activeSession === 'funcional' || activeSession === 'musculacion') {
            setShowFeedback(true);
        }
    };

    const toggleExercise = (id) => {
        const box = document.getElementById(`check-${id}`);
        if (box) box.classList.toggle('bg-green-500');
    };

    if (viewProfile) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col p-6 animate-in slide-in-from-right">
                <Button variant="ghost" onClick={() => setViewProfile(false)} className="self-start mb-6">← Volver</Button>
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-[#330066] rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white">{user.name.charAt(0)}</div>
                    <h2 className="font-bold text-2xl text-[#330066]">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 text-center">
                        <p className="text-xs text-gray-400 font-bold uppercase">Sesiones</p>
                        <p className="text-2xl font-black text-[#FF6600]">{user.stats.sessions}</p>
                    </Card>
                    <Card className="p-4 text-center">
                        <p className="text-xs text-gray-400 font-bold uppercase">Horas</p>
                        <p className="text-2xl font-black text-[#330066]">{user.stats.totalHours}</p>
                    </Card>
                </div>
            </div>
        );
    }

    if (activeSession) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col animate-in fade-in">
                <div className="bg-white p-4 shadow-sm sticky top-0 z-40 flex justify-between items-center">
                    <div className="text-left">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">TIEMPO</span>
                        <div className="text-3xl font-black text-[#330066] font-mono">{formatTime(timer)}</div>
                    </div>
                    <Button onClick={handleCheckout} variant="secondary" className="bg-red-500 hover:bg-red-600 animate-pulse">
                        ■ FINALIZAR
                    </Button>
                </div>

                <div className="flex-1 p-6 max-w-lg mx-auto w-full space-y-6">
                    {activeSession === 'musculacion' && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-2xl text-[#330066] mb-6">MI RUTINA</h3>

                            {user.trainingPlan && user.trainingPlan.length > 0 ? (
                                user.trainingPlan.map((block, blockIndex) => (
                                    <Card key={block.id} className="p-6 border-[#330066]/20 bg-gradient-to-br from-white to-purple-50">
                                        <div className="bg-gradient-to-r from-[#330066] to-purple-700 text-white p-4 rounded-xl mb-4 shadow-md">
                                            <h4 className="font-black text-lg">{block.name}</h4>
                                            <p className="text-xs text-purple-200 mt-1">{block.exercises.length} ejercicios</p>
                                        </div>

                                        <div className="space-y-3">
                                            {block.exercises.map((ex, exIndex) => (
                                                <div
                                                    key={`${blockIndex}-${exIndex}`}
                                                    onClick={() => toggleExercise(`${blockIndex}-${exIndex}`)}
                                                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-[#FF6600] cursor-pointer bg-white transition group"
                                                >
                                                    <div
                                                        id={`check-${blockIndex}-${exIndex}`}
                                                        className="w-7 h-7 rounded-lg border-2 border-gray-300 flex items-center justify-center text-white transition-all duration-200 group-hover:border-[#FF6600]"
                                                    >
                                                        ✓
                                                    </div>
                                                    <div className="flex-1">
                                                        <h5 className="font-bold text-gray-800 group-hover:text-[#FF6600] transition">{ex.name}</h5>
                                                        <p className="text-xs text-gray-500">{ex.category}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold text-[#330066]">{ex.sets}x{ex.reps}</p>
                                                        {ex.weight > 0 && <p className="text-xs text-gray-500">{ex.weight}kg</p>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <Card className="p-8 text-center border-dashed border-2">
                                    <div className="text-4xl mb-4 opacity-50">📋</div>
                                    <p className="text-gray-500 font-medium">Aún no tienes una rutina asignada</p>
                                    <p className="text-xs text-gray-400 mt-2">Habla con tu profesor</p>
                                </Card>
                            )}
                        </div>
                    )}

                    {activeSession === 'funcional' && (
                        <div className="text-center py-20 opacity-80">
                            <div className="text-6xl mb-6 animate-bounce">🔥</div>
                            <h2 className="text-3xl font-black text-[#330066]">CLASE GUIADA</h2>
                            <p className="text-xl text-gray-600 mt-2 font-bold">¡Dalo todo!</p>
                            <p className="text-sm text-gray-400 mt-4">Escucha las instrucciones del coach</p>
                        </div>
                    )}

                    {activeSession === 'running' && <RunningRecords />}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 animate-in fade-in">
            {/* Simple Header */}
            <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-30">
                <div className="flex items-center gap-3" onClick={() => setViewProfile(true)}>
                    <div className="w-10 h-10 bg-[#330066] rounded-full flex items-center justify-center text-white font-bold cursor-pointer">{user.name.charAt(0)}</div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">HOLA</p>
                        <p className="text-sm font-bold text-[#330066]">{user.name}</p>
                    </div>
                </div>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-500"><LogOut size={20} /></button>
            </div>

            <div className="p-6 max-w-lg mx-auto space-y-8">
                {/* Stats Card */}
                <div className="bg-gradient-to-br from-[#330066] to-purple-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition duration-700" />
                    <p className="text-xs font-bold text-purple-200 uppercase tracking-widest mb-1">Tiempo Invertido</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black">{user.stats.totalHours}</span>
                        <span className="text-xl font-medium text-purple-200">horas</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex gap-4 text-sm font-medium text-purple-200">
                        <span>📅 {user.stats.sessions} Sesiones</span>
                        <span>🏆 Nivel Oro</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div>
                    <h3 className="font-bold text-gray-800 mb-4 px-2">Comenzar Entrenamiento</h3>
                    <div className="grid gap-4">
                        <button onClick={() => setActiveSession('musculacion')} className="bg-white p-5 rounded-3xl border border-gray-100 hover:border-[#FF6600] hover:shadow-lg hover:-translate-y-1 transition flex items-center gap-5 text-left group">
                            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition">🏋️</div>
                            <div>
                                <h4 className="font-black text-lg text-[#330066]">Musculación</h4>
                                <Badge color="gray">Mi Rutina</Badge>
                            </div>
                        </button>

                        <button onClick={() => setActiveSession('funcional')} className="bg-white p-5 rounded-3xl border border-gray-100 hover:border-purple-500 hover:shadow-lg hover:-translate-y-1 transition flex items-center gap-5 text-left group">
                            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition">⚡</div>
                            <div>
                                <h4 className="font-black text-lg text-[#330066]">Funcional</h4>
                                <Badge color="gray">Clase Grupal</Badge>
                            </div>
                        </button>

                        <button onClick={() => setActiveSession('running')} className="bg-white p-5 rounded-3xl border border-gray-100 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition flex items-center gap-5 text-left group">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition">🏃</div>
                            <div>
                                <h4 className="font-black text-lg text-[#330066]">Running</h4>
                                <Badge color="gray">Ranking</Badge>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
        </div>
    );
};

const ProfessorDashboard = ({ user, globalUsers, setGlobalUsers, exerciseLibrary, setExerciseLibrary, onLogout }) => {
    const [builderOpen, setBuilderOpen] = useState(false);
    const [selectedStudentName, setSelectedStudentName] = useState(null);

    const students = Object.values(globalUsers).filter(u => u.role === 'student');

    const handleAssign = (studentName) => {
        setSelectedStudentName(studentName);
        setBuilderOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 animate-in fade-in">
            <div className="bg-teal-600 text-white p-4 shadow-md sticky top-0 z-30 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl">👨‍🏫 PANEL PROFE</span>
                </div>
                <button onClick={onLogout} className="text-white/80 hover:text-white font-bold text-xs bg-white/20 px-3 py-1 rounded-full">SALIR</button>
            </div>

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex gap-4">
                    <Card className="flex-1 p-6 bg-white flex items-center gap-4">
                        <img src={user.photo} className="w-16 h-16 rounded-full border-2 border-teal-100" />
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Calificación</p>
                            <div className="flex items-center gap-1">
                                <p className="text-2xl font-black text-gray-800">{user.rating}</p>
                                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                            </div>
                        </div>
                    </Card>
                </div>

                <div>
                    <h3 className="font-bold text-gray-700 mb-4 flex justify-between items-center">
                        <span>Mis Alumnos</span>
                        <Badge color="teal">{students.length}</Badge>
                    </h3>
                    <div className="space-y-3">
                        {students.map((s, i) => (
                            <Card key={i} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${s.hasRoutine ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                                    <div>
                                        <p className="font-bold text-[#330066]">{s.name}</p>
                                        <p className="text-xs text-gray-500">{s.plan}</p>
                                    </div>
                                </div>
                                <Button variant="outline" className="py-2 text-xs px-4" onClick={() => !s.hasRoutine && handleAssign(s.name)}>
                                    {s.hasRoutine ? 'VER PLAN' : 'ASIGNAR +'}
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card className="p-6 mt-8">
                    <h3 className="font-bold text-teal-700 mb-4">Biblioteca de Ejercicios</h3>
                    <div className="h-40 overflow-y-auto space-y-2 pr-2">
                        {EXERCISE_LIBRARY.map(ex => (
                            <div key={ex.id} className="flex justify-between items-center text-sm border-b pb-1">
                                <span>{ex.name}</span>
                                <span className="text-gray-400 text-xs">{ex.category}</span>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-dashed">+ AGREGAR EJERCICIO</Button>
                </Card>
            </div>

            {builderOpen && (
                <PlanBuilder
                    onClose={() => setBuilderOpen(false)}
                    users={globalUsers}
                    setUsers={setGlobalUsers}
                    targetStudentId={selectedStudentName}
                    exerciseLibrary={exerciseLibrary}
                    setExerciseLibrary={setExerciseLibrary}
                />
            )}
        </div>
    );
};

const AdminDashboard = ({ onLogout }) => (
    <div className="min-h-screen bg-slate-900 text-white animate-in fade-in">
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <span className="font-bold flex items-center gap-2">🛡️ ADMIN PANEL</span>
            <button onClick={onLogout} className="text-xs bg-red-500 hover:bg-red-600 px-3 py-1 rounded">SALIR</button>
        </div>
        <div className="p-8 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Ingresos Mes</h3>
                <p className="text-4xl font-black text-green-400">$4.2M</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Socios Activos</h3>
                <p className="text-4xl font-black text-blue-400">142</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Morosos</h3>
                <p className="text-4xl font-black text-red-400">8</p>
            </div>
        </div>
    </div>
);

// ==========================================
// 7. MAIN CONTROLLERS
// ==========================================

const StoreView = ({ onBack }) => {
    const [view, setView] = useState('list'); // 'list' | 'detail'
    const [selectedProduct, setSelectedProduct] = useState(null);

    const infrastructure = DB_PRODUCTS.filter(p => p.category === 'Infraestructura');
    const glowHome = DB_PRODUCTS.filter(p => p.category === 'Glow Home');

    const openDetail = (p) => {
        setSelectedProduct(p);
        setView('detail');
    };

    if (view === 'detail') return <ProductDetail product={selectedProduct} onBack={() => setView('list')} />;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 animate-in slide-in-from-right duration-500">
            {/* Marketing Header */}
            <div className="bg-[#330066] text-white pt-16 pb-12 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="relative z-10 text-center">
                    <p className="text-[#FF6600] font-bold tracking-widest text-xs uppercase mb-2 animate-bounce">Líderes en Equipamiento Outdoor</p>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">SENTITE BIEN,<br />SENTITE GLOW.</h1>
                </div>
            </div>

            <div className="sticky top-0 bg-white/95 backdrop-blur z-30 px-6 py-4 flex justify-between items-center shadow-sm -mt-4 rounded-t-3xl border-t border-gray-100">
                <button onClick={onBack} className="text-[#330066] font-bold flex items-center gap-2 hover:-translate-x-1 transition">
                    <span>←</span> INICIO
                </button>
                <span className="font-black text-xl text-[#330066]">GLOW<span className="text-[#FF6600]">.</span>STORE</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-16">
                {/* Infraestructura */}
                <section>
                    <h2 className="text-2xl font-black text-[#330066] mb-6 flex items-center gap-2"><Trophy className="text-[#FF6600]" /> LÍNEA PROFESIONAL</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {infrastructure.map(p => (
                            <Card key={p.id} onClick={() => openDetail(p)} className="h-full bg-white flex flex-col">
                                <div className="h-56 p-6 bg-gray-50 flex items-center justify-center">
                                    <img src={p.image} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <Badge color="orange">{p.category}</Badge>
                                        <h3 className="text-xl font-bold text-gray-800 mt-2 hover:text-[#FF6600] transition">{p.name}</h3>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                                        <span className="font-bold text-gray-400 text-sm">Ver Detalles</span>
                                        <div className="w-8 h-8 rounded-full bg-[#330066] text-white flex items-center justify-center">→</div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Divider Glow Home */}
                <div className="relative py-8 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-dashed border-gray-200"></div></div>
                    <div className="relative z-10 bg-gray-50 px-8">
                        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#330066] to-[#FF6600] uppercase tracking-tighter">LÍNEA GLOW HOME</h2>
                    </div>
                </div>

                {/* Glow Home Grid */}
                <section>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {glowHome.map(p => (
                            <Card key={p.id} onClick={() => openDetail(p)} className="border-gray-100 hover:border-[#FF6600]">
                                <div className="h-40 p-4 flex items-center justify-center bg-white"><img src={p.image} className="max-h-full object-contain mix-blend-multiply" /></div>
                                <div className="p-4 text-center">
                                    <p className="font-bold text-gray-800 text-sm leading-tight">{p.name}</p>
                                    <p className="text-xs text-[#FF6600] font-bold mt-2">VER</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

const OnboardingWizard = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', surname: '', dni: '', email: '',
        goal: null, generatedPin: null
    });

    const goals = [
        { id: 'muscle', label: 'Ganar Masa Muscular', icon: '💪', logic: ['musculacion'], color: 'orange' },
        { id: 'weight', label: 'Bajar de Peso / Definir', icon: '🔥', logic: ['musculacion', 'funcional'], color: 'red' },
        { id: 'wellness', label: 'Salud y Bienestar', icon: '🧘', logic: ['funcional'], color: 'green' },
        { id: 'performance', label: 'Rendimiento / Running', icon: '⚡', logic: ['running', 'musculacion'], color: 'blue' }
    ];

    const handleNext = () => {
        if (step === 1 && formData.name && formData.dni && formData.email) {
            setStep(2);
        }
    };

    const handleGoalSelect = (goal) => {
        const pin = Math.floor(1000 + Math.random() * 9000).toString();
        setFormData({ ...formData, goal, generatedPin: pin });
        setStep(3);
    };

    const finish = () => {
        onComplete({
            ...formData,
            role: 'student',
            active: true,
            hasRoutine: false,
            trainingPlan: null,
            stats: { totalHours: 0, sessions: 0 },
            goalRecommendations: formData.goal.logic
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            {step === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right duration-300">
                    <h3 className="text-xl font-bold text-[#330066] mb-4">Vamos a conocerte</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            placeholder="Nombre"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-[#330066] transition"
                        />
                        <input
                            placeholder="Apellido"
                            value={formData.surname}
                            onChange={e => setFormData({ ...formData, surname: e.target.value })}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-[#330066] transition"
                        />
                    </div>
                    <input
                        placeholder="DNI"
                        value={formData.dni}
                        onChange={e => setFormData({ ...formData, dni: e.target.value })}
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-[#330066] transition"
                    />
                    <input
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-[#330066] transition"
                    />

                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-purple-50 hover:border-[#330066] transition group">
                        <div className="w-12 h-12 bg-gray-200 group-hover:bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-400 group-hover:text-[#330066] transition text-2xl">📷</div>
                        <p className="text-xs text-gray-400 group-hover:text-[#330066] font-bold uppercase transition">Subir Foto de Perfil</p>
                    </div>

                    <Button onClick={handleNext} className="w-full py-4 text-lg rounded-xl mt-4">SIGUIENTE</Button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right duration-300">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-[#330066] mb-2">¿Cuál es tu objetivo?</h3>
                        <p className="text-sm text-gray-500">Selecciona tu meta principal</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {goals.map(g => (
                            <div
                                key={g.id}
                                onClick={() => handleGoalSelect(g)}
                                className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm hover:border-[#FF6600] hover:shadow-lg cursor-pointer hover:-translate-y-1 transition-all duration-300 text-center group"
                            >
                                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{g.icon}</div>
                                <p className="font-bold text-gray-800 text-sm leading-tight">{g.label}</p>
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" onClick={() => setStep(1)} className="w-full mt-4">← VOLVER</Button>
                </div>
            )}

            {step === 3 && (
                <div className="text-center space-y-6 py-8 animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto flex items-center justify-center text-5xl animate-bounce shadow-lg">🎉</div>

                    <div className="space-y-3">
                        <h3 className="text-3xl font-black text-[#330066]">¡Bienvenido, {formData.name}!</h3>
                        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 mx-4">
                            <p className="text-gray-600 leading-relaxed">
                                Basado en tu objetivo de <span className="text-[#FF6600] font-bold">{formData.goal.label}</span>,
                                te recomendamos enfocarte en:
                            </p>
                            <div className="flex justify-center gap-2 mt-4 flex-wrap">
                                {formData.goal.logic.map(l => (
                                    <Badge key={l} color="purple" className="text-sm px-4 py-2">
                                        {l.toUpperCase()}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border-2 border-orange-200 mx-4 shadow-lg">
                        <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">Tu PIN de Acceso</p>
                        <p className="text-6xl font-black text-[#FF6600] tracking-widest font-mono mb-3">{formData.generatedPin}</p>
                        <div className="bg-white/50 rounded-lg p-3 mt-4">
                            <p className="text-xs text-gray-600">📧 Te lo enviamos a <span className="font-bold">{formData.email}</span></p>
                        </div>
                    </div>

                    <Button onClick={finish} className="w-full py-5 text-xl rounded-2xl shadow-2xl shadow-purple-300 hover:shadow-purple-400 transition-all">
                        IR A ENTRENAR →
                    </Button>
                </div>
            )}
        </div>
    );
};

const AcademiaView = ({ onBack, users, setUsers, exerciseLibrary, setExerciseLibrary, planTemplates, setPlanTemplates }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [loginDni, setLoginDni] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const u = Object.values(users).find(u => u.dni === loginDni || u.generatedPin === loginDni);
        if (u) {
            setCurrentUser(u);
        } else {
            alert('Usuario no encontrado. Prueba: 1111 (Alumno), 5555 (Profe), 9999 (Admin)');
        }
    };

    const handleRegistrationComplete = (newUserData) => {
        const userId = newUserData.dni;
        setUsers({ ...users, [userId]: newUserData });
        setMode('login');
        setLoginDni(newUserData.generatedPin);
    };

    if (currentUser) {
        // Get fresh user data from global state
        const freshUserData = Object.values(users).find(u => u.dni === currentUser.dni) || currentUser;

        if (freshUserData.role === 'admin') return <AdminDashboard onLogout={() => setCurrentUser(null)} />;
        if (freshUserData.role === 'professor') return <ProfessorDashboard user={freshUserData} globalUsers={users} setGlobalUsers={setUsers} exerciseLibrary={exerciseLibrary} setExerciseLibrary={setExerciseLibrary} planTemplates={planTemplates} setPlanTemplates={setPlanTemplates} onLogout={() => setCurrentUser(null)} />;
        return <StudentDashboard user={freshUserData} onLogout={() => setCurrentUser(null)} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 animate-in zoom-in-95 duration-300">
            <div className="max-w-md w-full mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden">
                <div className="bg-[#330066] p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                    <button onClick={onBack} className="absolute top-6 left-6 text-white/50 hover:text-white transition z-10">
                        <ChevronRight className="rotate-180" />
                    </button>
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl relative z-10">🏋️</div>
                    <h2 className="text-2xl font-black relative z-10">GLOW ACADEMIA</h2>
                    <p className="text-purple-200 text-sm relative z-10">Tu evolución comienza aquí</p>
                </div>

                <div className="p-8">
                    <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
                        <button
                            onClick={() => setMode('login')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${mode === 'login' ? 'bg-white shadow text-[#330066]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            YA SOY GLOWER
                        </button>
                        <button
                            onClick={() => setMode('register')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${mode === 'register' ? 'bg-white shadow text-[#330066]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            QUIERO SER GLOWER
                        </button>
                    </div>

                    {mode === 'login' ? (
                        <form onSubmit={handleLogin} className="space-y-4 animate-in fade-in">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase ml-2">DNI o PIN</label>
                                <input
                                    value={loginDni}
                                    onChange={e => setLoginDni(e.target.value)}
                                    placeholder="Ingresa tu DNI o PIN"
                                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-[#330066] focus:bg-white font-bold text-lg text-center tracking-wider transition-all"
                                />
                            </div>
                            <Button className="w-full py-4 text-lg rounded-xl mt-4">INGRESAR</Button>

                            <div className="mt-8 text-center text-xs text-gray-400 bg-gray-50 p-4 rounded-xl">
                                <p className="font-bold mb-1">Accesos Demo:</p>
                                <p>Alumno: <span className="font-mono">1111</span> | Profe: <span className="font-mono">5555</span> | Admin: <span className="font-mono">9999</span></p>
                            </div>
                        </form>
                    ) : (
                        <OnboardingWizard onComplete={handleRegistrationComplete} onCancel={() => setMode('login')} />
                    )}
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 8. ROOT APP
// ==========================================

function App() {
    const [view, setView] = useState('landing');
    const [users, setUsers] = useState(INIT_USERS); // Global User State
    const [exerciseLibrary, setExerciseLibrary] = useState(EXERCISE_LIBRARY); // Global Exercise Library
    const [planTemplates, setPlanTemplates] = useState([]); // Global Plan Templates

    if (view === 'store') return <StoreView onBack={() => setView('landing')} />;
    if (view === 'academia') return (
        <AcademiaView
            onBack={() => setView('landing')}
            users={users}
            setUsers={setUsers}
            exerciseLibrary={exerciseLibrary}
            setExerciseLibrary={setExerciseLibrary}
        />
    );

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#330066] selection:text-white">
            <header className="py-8 text-center border-b border-gray-100">
                <h1 className="text-6xl font-extrabold text-[#330066] tracking-tighter cursor-default">
                    GLOW<span className="text-[#FF6600]">.</span>
                </h1>
                <p className="text-sm text-gray-400 font-bold tracking-widest mt-2 uppercase">Outdoor Performance System</p>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card onClick={() => setView('store')} className="p-16 flex flex-col items-center text-center group border-2 hover:border-gray-200">
                        <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center text-[#FF6600] mb-8 group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                            <ShoppingBag size={48} />
                        </div>
                        <h2 className="text-4xl font-black text-[#330066] mb-4">STORE</h2>
                        <p className="text-gray-500 mb-8 max-w-sm">Equipamiento de vanguardia para municipios, clubes y hogares.</p>
                        <Button variant="secondary" className="w-full max-w-xs">VER CATÁLOGO</Button>
                    </Card>

                    <Card onClick={() => setView('academia')} className="p-16 flex flex-col items-center text-center group border-2 hover:border-gray-200">
                        <div className="w-32 h-32 bg-purple-50 rounded-full flex items-center justify-center text-[#330066] mb-8 group-hover:scale-110 group-hover:-rotate-6 transition duration-300">
                            <Dumbbell size={48} />
                        </div>
                        <h2 className="text-4xl font-black text-[#330066] mb-4">ACADEMIA</h2>
                        <p className="text-gray-500 mb-8 max-w-sm">Sistema de gestión integral para alumnos y profesores.</p>
                        <Button variant="primary" className="w-full max-w-xs">INGRESAR</Button>
                    </Card>
                </div>

                <div className="mt-20 text-center space-y-8 opacity-60">
                    <h3 className="font-bold text-[#330066] uppercase tracking-widest">Sedes Activas</h3>
                    <div className="flex justify-center gap-8 flex-wrap">
                        {['Parque del Kempes', 'Parque Sarmiento', 'Tejas del Sur'].map(s => (
                            <div key={s} className="flex items-center gap-2 text-gray-500 font-bold"><MapPin size={16} /> {s}</div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-gray-300 text-xs font-bold uppercase border-t border-gray-50">
                © 2026 GLOW Outdoor Gym • Córdoba, Argentina
            </footer>
        </div>
    );
}

export default App;
