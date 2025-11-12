"use client"

import { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Play, 
  FileText, 
  CheckCircle, 
  MessageCircle, 
  User, 
  Search, 
  Filter,
  Clock,
  Trophy,
  Target,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronRight,
  Star,
  Download,
  Eye,
  Crown,
  Lock,
  CreditCard,
  Check,
  Zap,
  Activity,
  Timer,
  Dumbbell,
  MapPin,
  Calendar,
  Medal,
  Shield,
  Flag,
  Users,
  TrendingUp
} from 'lucide-react'

// Tipos de dados
interface Course {
  id: string
  name: string
  description: string
  progress: number
  totalLessons: number
  completedLessons: number
  badge: string
}

interface Question {
  id: string
  subject: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  exam: string
}

interface VideoLesson {
  id: string
  title: string
  duration: string
  subject: string
  instructor: string
  thumbnail: string
  watched: boolean
}

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  popular?: boolean
}

interface TAFExercise {
  id: string
  name: string
  description: string
  target: string
  duration: string
  difficulty: 'recruta' | 'soldado' | 'cabo' | 'sargento'
  category: 'resistencia' | 'forca' | 'velocidade' | 'flexibilidade'
}

interface TAFTest {
  id: string
  exam: string
  badge: string
  requirements: {
    exercise: string
    male: string
    female: string
    time?: string
  }[]
  description: string
  tips: string[]
}

export default function ConcursosApp() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({})
  const [showResults, setShowResults] = useState(false)
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const [selectedTAFExam, setSelectedTAFExam] = useState<string>('PM')
  const [currentWorkout, setCurrentWorkout] = useState<TAFExercise | null>(null)
  const [workoutTimer, setWorkoutTimer] = useState(0)
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)

  // Planos de assinatura
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'monthly',
      name: 'Plano Mensal',
      price: 35,
      period: 'mês',
      features: [
        'Acesso completo às vídeo aulas',
        'Tiragem de dúvidas com IA ilimitada',
        'Banco de questões completo',
        'Simulados personalizados',
        'Treinos TAF personalizados',
        'Relatórios de progresso',
        'Suporte prioritário'
      ]
    },
    {
      id: 'annual',
      name: 'Plano Anual',
      price: 350,
      period: 'ano',
      features: [
        'Acesso completo às vídeo aulas',
        'Tiragem de dúvidas com IA ilimitada',
        'Banco de questões completo',
        'Simulados personalizados',
        'Treinos TAF personalizados',
        'Relatórios de progresso',
        'Suporte prioritário',
        'Economia de R$ 70 no ano',
        'Parcelamento em até 12x'
      ],
      popular: true
    }
  ]

  // TAF Tests por concurso
  const tafTests: TAFTest[] = [
    {
      id: 'pm',
      exam: 'PM',
      badge: '🛡️',
      description: 'Teste de Aptidão Física para Polícia Militar - Prepare-se como um verdadeiro soldado',
      requirements: [
        { exercise: 'Flexões de Braço', male: 'Mín. 25 repetições', female: 'Mín. 15 repetições' },
        { exercise: 'Abdominais', male: 'Mín. 35 repetições', female: 'Mín. 30 repetições' },
        { exercise: 'Corrida 12 minutos', male: 'Mín. 2.400m', female: 'Mín. 2.000m' },
        { exercise: 'Barra Fixa', male: 'Mín. 4 repetições', female: 'Sustentação 20s' }
      ],
      tips: [
        'Treine progressivamente - aumente 10% da carga semanalmente',
        'Foque na técnica correta dos exercícios',
        'Mantenha regularidade nos treinos - disciplina militar',
        'Hidrate-se adequadamente durante os treinos'
      ]
    },
    {
      id: 'pc',
      exam: 'PC',
      badge: '🔍',
      description: 'Teste de Aptidão Física para Polícia Civil - Resistência e determinação investigativa',
      requirements: [
        { exercise: 'Flexões de Braço', male: 'Mín. 20 repetições', female: 'Mín. 12 repetições' },
        { exercise: 'Abdominais', male: 'Mín. 30 repetições', female: 'Mín. 25 repetições' },
        { exercise: 'Corrida 12 minutos', male: 'Mín. 2.200m', female: 'Mín. 1.800m' }
      ],
      tips: [
        'Desenvolva resistência cardiovascular gradualmente',
        'Pratique exercícios funcionais',
        'Mantenha consistência nos treinos',
        'Trabalhe força e resistência muscular'
      ]
    },
    {
      id: 'pf',
      exam: 'PF',
      badge: '🇧🇷',
      description: 'Teste de Aptidão Física para Polícia Federal - Excelência e elite operacional',
      requirements: [
        { exercise: 'Flexões de Braço', male: 'Mín. 30 repetições', female: 'Mín. 18 repetições' },
        { exercise: 'Abdominais', male: 'Mín. 40 repetições', female: 'Mín. 35 repetições' },
        { exercise: 'Corrida 12 minutos', male: 'Mín. 2.600m', female: 'Mín. 2.200m' },
        { exercise: 'Natação 50m', male: 'Máx. 1min30s', female: 'Máx. 1min45s' }
      ],
      tips: [
        'Prepare-se para padrões de elite federal',
        'Inclua natação no seu treinamento',
        'Desenvolva resistência superior',
        'Mantenha disciplina rigorosa nos treinos'
      ]
    },
    {
      id: 'prf',
      exam: 'PRF',
      badge: '🛣️',
      description: 'Teste de Aptidão Física para Polícia Rodoviária Federal - Resistência rodoviária',
      requirements: [
        { exercise: 'Flexões de Braço', male: 'Mín. 25 repetições', female: 'Mín. 15 repetições' },
        { exercise: 'Abdominais', male: 'Mín. 35 repetições', female: 'Mín. 30 repetições' },
        { exercise: 'Corrida 12 minutos', male: 'Mín. 2.400m', female: 'Mín. 2.000m' }
      ],
      tips: [
        'Foque em resistência para longas jornadas',
        'Desenvolva força funcional',
        'Pratique exercícios de estabilidade',
        'Mantenha condicionamento cardiovascular'
      ]
    },
    {
      id: 'esa',
      exam: 'ESA',
      badge: '⚔️',
      description: 'Teste de Aptidão Física para Escola de Sargentos das Armas - Formação militar de elite',
      requirements: [
        { exercise: 'Flexões de Braço', male: 'Mín. 35 repetições', female: 'Mín. 20 repetições' },
        { exercise: 'Abdominais', male: 'Mín. 45 repetições', female: 'Mín. 40 repetições' },
        { exercise: 'Corrida 12 minutos', male: 'Mín. 2.800m', female: 'Mín. 2.400m' },
        { exercise: 'Barra Fixa', male: 'Mín. 6 repetições', female: 'Sustentação 30s' }
      ],
      tips: [
        'Padrão militar de excelência exigido',
        'Treine com intensidade progressiva',
        'Desenvolva mentalidade de sargento',
        'Foque em superação constante'
      ]
    },
    {
      id: 'espcex',
      exam: 'ESPCEX',
      badge: '🎖️',
      description: 'Teste de Aptidão Física para Escola Preparatória de Cadetes do Exército - Elite militar',
      requirements: [
        { exercise: 'Flexões de Braço', male: 'Mín. 40 repetições', female: 'Mín. 25 repetições' },
        { exercise: 'Abdominais', male: 'Mín. 50 repetições', female: 'Mín. 45 repetições' },
        { exercise: 'Corrida 12 minutos', male: 'Mín. 3.000m', female: 'Mín. 2.600m' },
        { exercise: 'Barra Fixa', male: 'Mín. 8 repetições', female: 'Sustentação 40s' },
        { exercise: 'Natação 100m', male: 'Máx. 3min', female: 'Máx. 3min30s' }
      ],
      tips: [
        'Padrão de elite militar exigido',
        'Prepare-se para os mais altos padrões',
        'Desenvolva mentalidade de oficial',
        'Treine com disciplina exemplar'
      ]
    }
  ]

  // Exercícios TAF
  const tafExercises: TAFExercise[] = [
    {
      id: '1',
      name: 'Flexões Militares',
      description: 'Flexões de braço com postura militar perfeita',
      target: 'Peitoral, tríceps, core',
      duration: '3 séries de 15-30 reps',
      difficulty: 'soldado',
      category: 'forca'
    },
    {
      id: '2',
      name: 'Abdominais Comando',
      description: 'Abdominais com técnica militar rigorosa',
      target: 'Core, abdômen',
      duration: '3 séries de 20-40 reps',
      difficulty: 'soldado',
      category: 'forca'
    },
    {
      id: '3',
      name: 'Corrida de Resistência',
      description: 'Treino cardiovascular para teste de 12 minutos',
      target: 'Sistema cardiovascular',
      duration: '20-30 minutos',
      difficulty: 'cabo',
      category: 'resistencia'
    },
    {
      id: '4',
      name: 'Barra Fixa Militar',
      description: 'Dominadas com pegada pronada',
      target: 'Dorsais, bíceps',
      duration: '3 séries máx. reps',
      difficulty: 'sargento',
      category: 'forca'
    },
    {
      id: '5',
      name: 'Burpees Operacionais',
      description: 'Exercício completo estilo militar',
      target: 'Corpo inteiro',
      duration: '3 séries de 10-20 reps',
      difficulty: 'cabo',
      category: 'resistencia'
    },
    {
      id: '6',
      name: 'Prancha Militar',
      description: 'Isometria para fortalecimento do core',
      target: 'Core, estabilidade',
      duration: '3 séries de 30-60s',
      difficulty: 'recruta',
      category: 'forca'
    }
  ]

  // Dados mock
  const courses: Course[] = [
    {
      id: '1',
      name: 'Polícia Militar (PM)',
      description: 'Preparação completa para servir e proteger a sociedade',
      progress: 65,
      totalLessons: 120,
      completedLessons: 78,
      badge: '🛡️'
    },
    {
      id: '2', 
      name: 'Polícia Civil (PC)',
      description: 'Formação investigativa e técnica policial',
      progress: 45,
      totalLessons: 95,
      completedLessons: 43,
      badge: '🔍'
    },
    {
      id: '3',
      name: 'Polícia Federal (PF)',
      description: 'Elite da segurança pública nacional',
      progress: 30,
      totalLessons: 150,
      completedLessons: 45,
      badge: '🇧🇷'
    },
    {
      id: '4',
      name: 'PRF - Polícia Rodoviária',
      description: 'Guardiões das rodovias federais',
      progress: 80,
      totalLessons: 85,
      completedLessons: 68,
      badge: '🛣️'
    },
    {
      id: '5',
      name: 'ESA - Escola de Sargentos',
      description: 'Formação de líderes militares',
      progress: 20,
      totalLessons: 180,
      completedLessons: 36,
      badge: '⚔️'
    },
    {
      id: '6',
      name: 'ESPCEX - Preparatória Cadetes',
      description: 'Elite da formação militar brasileira',
      progress: 15,
      totalLessons: 200,
      completedLessons: 30,
      badge: '🎖️'
    }
  ]

  const questions: Question[] = [
    {
      id: '1',
      subject: 'Direito Constitucional',
      question: 'Qual princípio fundamental rege a hierarquia militar e a disciplina nas forças armadas?',
      options: [
        'Princípio da Legalidade',
        'Princípio da Hierarquia e Disciplina',
        'Princípio da Moralidade',
        'Princípio da Publicidade'
      ],
      correctAnswer: 1,
      explanation: 'O princípio da hierarquia e disciplina é fundamental na organização militar, estabelecendo a cadeia de comando e a obediência às ordens legais.',
      difficulty: 'medium',
      exam: 'PM-SP'
    },
    {
      id: '2',
      subject: 'Português',
      question: 'Em um relatório militar, qual é a forma correta de se dirigir a um superior hierárquico?',
      options: [
        'Tratamento informal',
        'Linguagem técnica e respeitosa',
        'Gírias militares',
        'Abreviações excessivas'
      ],
      correctAnswer: 1,
      explanation: 'A comunicação militar deve ser sempre técnica, clara, respeitosa e seguir os protocolos hierárquicos estabelecidos.',
      difficulty: 'easy',
      exam: 'PC-RJ'
    },
    {
      id: '3',
      subject: 'Matemática',
      question: 'Um pelotão tem 30 soldados. Se 20% estão de folga, quantos soldados estão em serviço?',
      options: ['20', '24', '26', '28'],
      correctAnswer: 1,
      explanation: '30 soldados - 20% (6 soldados) = 24 soldados em serviço. Cálculo: 30 × 0,8 = 24',
      difficulty: 'easy',
      exam: 'PF'
    }
  ]

  const videoLessons: VideoLesson[] = [
    {
      id: '1',
      title: 'Hierarquia e Disciplina Militar',
      duration: '45:30',
      subject: 'Direito Militar',
      instructor: 'Cel. João Silva',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
      watched: false
    },
    {
      id: '2',
      title: 'Comunicação Oficial e Protocolos',
      duration: '38:15',
      subject: 'Português Militar',
      instructor: 'Maj. Maria Santos',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop',
      watched: true
    },
    {
      id: '3',
      title: 'Cálculos Táticos e Logística',
      duration: '52:20',
      subject: 'Matemática Aplicada',
      instructor: 'Cap. Carlos Lima',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=225&fit=crop',
      watched: false
    }
  ]

  // Timer para treino
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isWorkoutActive && workoutTimer > 0) {
      interval = setInterval(() => {
        setWorkoutTimer(timer => timer - 1)
      }, 1000)
    } else if (workoutTimer === 0 && isWorkoutActive) {
      setIsWorkoutActive(false)
      setCurrentWorkout(null)
    }
    return () => clearInterval(interval)
  }, [isWorkoutActive, workoutTimer])

  // Função para verificar se precisa de assinatura
  const requiresSubscription = (feature: string) => {
    return ['videos', 'ai-help', 'taf-training'].includes(feature) && !isSubscribed
  }

  // Simulação de resposta da IA
  const handleAiQuestion = () => {
    if (!aiQuestion.trim()) return
    
    if (requiresSubscription('ai-help')) {
      setShowSubscriptionModal(true)
      return
    }
    
    setAiResponse('Analisando sua dúvida com precisão militar...')
    
    setTimeout(() => {
      setAiResponse(`**BRIEFING SOBRE:** "${aiQuestion}"

**🎯 OBJETIVO DA MISSÃO:**
${aiQuestion.includes('direito') ? 'Dominar os fundamentos jurídicos essenciais para sua aprovação' : 
  aiQuestion.includes('matemática') ? 'Executar cálculos com precisão militar' : 
  aiQuestion.includes('taf') ? 'Alcançar excelência física operacional' :
  'Cumprir a missão de aprendizado com eficiência máxima'}

**📋 INTEL DETALHADO:**
1. **Conceito Base**: Este tópico é fundamental para sua formação. No contexto militar/policial, representa...

2. **Aplicação Tática**: Em provas de concurso, este assunto aparece frequentemente em questões que testam...

3. **Estratégia de Estudo**: Para dominar este conteúdo, execute o seguinte plano de ação:
   - Revisar material teórico (0800-1000h)
   - Praticar exercícios (1000-1200h)
   - Consolidar conhecimento (revisão noturna)

4. **Recursos Disponíveis**: Acesse nosso banco de questões, seção específica, para treinamento intensivo.

**🏆 MISSÃO CUMPRIDA!**
Soldado, você está no caminho certo. Mantenha a disciplina nos estudos e a vitória será sua!

**Precisa de reforço em algum ponto específico da operação?**`)
    }, 2000)
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }))
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const handleVideoClick = () => {
    if (requiresSubscription('videos')) {
      setShowSubscriptionModal(true)
      return
    }
    // Lógica para reproduzir vídeo
  }

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId)
    setShowPaymentOptions(true)
  }

  const handlePayment = (installments?: number) => {
    // Simulação de pagamento
    setTimeout(() => {
      setIsSubscribed(true)
      setShowSubscriptionModal(false)
      setShowPaymentOptions(false)
      setSelectedPlan(null)
      // Aqui você integraria com um gateway de pagamento real
    }, 2000)
  }

  const startWorkout = (exercise: TAFExercise) => {
    if (requiresSubscription('taf-training')) {
      setShowSubscriptionModal(true)
      return
    }
    
    setCurrentWorkout(exercise)
    setWorkoutTimer(300) // 5 minutos padrão
    setIsWorkoutActive(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Central de Comando', icon: BarChart3 },
    { id: 'courses', label: 'Academia de Formação', icon: BookOpen },
    { id: 'videos', label: 'Briefings em Vídeo', icon: Play, premium: true },
    { id: 'questions', label: 'Campo de Treinamento', icon: FileText },
    { id: 'taf-training', label: 'Preparação Física TAF', icon: Dumbbell, premium: true },
    { id: 'ai-help', label: 'Suporte Tático IA', icon: MessageCircle, premium: true },
    { id: 'progress', label: 'Relatório de Missão', icon: Trophy },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-800 shadow-lg border-b border-blue-500/30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-700 text-white"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">ConcursosPro</h1>
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">OPERACIONAL</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Buscar intel..."
                className="bg-transparent border-none outline-none text-sm w-40 text-white placeholder-slate-400"
              />
            </div>
            
            {/* Status da Assinatura */}
            {isSubscribed ? (
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg">
                <Crown size={16} />
                <span className="text-sm font-medium">ELITE</span>
              </div>
            ) : (
              <button 
                onClick={() => window.location.href = '/auth'}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-2 rounded-lg hover:shadow-lg transition-all"
              >
                <Crown size={16} />
                <span className="text-sm font-medium">ALISTAR-SE</span>
              </button>
            )}
            
            <button 
              onClick={() => window.location.href = '/profile'}
              className="p-2 rounded-lg hover:bg-slate-700 text-white"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={() => window.location.href = '/profile'}
              className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
            >
              <User size={16} className="text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800 shadow-lg transition-transform duration-300 ease-in-out border-r border-blue-500/30`}>
          <nav className="p-4 space-y-2 mt-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isPremium = item.premium && !isSubscribed
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isPremium) {
                      setShowSubscriptionModal(true)
                    } else {
                      setActiveTab(item.id)
                      setSidebarOpen(false)
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors relative ${
                    activeTab === item.id && !isPremium
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                      : isPremium
                      ? 'hover:bg-slate-700 text-slate-400'
                      : 'hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {isPremium && (
                    <Lock size={16} className="ml-auto text-slate-500" />
                  )}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Central de Comando</h2>
                  <p className="text-slate-300">Status operacional e progresso da missão</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all">
                    Continuar Missão
                  </button>
                </div>
              </div>

              {/* Premium Banner */}
              {!isSubscribed && (
                <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 rounded-xl p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">🚨 OPERAÇÃO ELITE DESBLOQUEADA!</h3>
                      <p className="text-orange-100 mb-4">Acesse treinamento TAF, briefings exclusivos e suporte tático IA</p>
                      <button 
                        onClick={() => setShowSubscriptionModal(true)}
                        className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                      >
                        ALISTAR-SE AGORA
                      </button>
                    </div>
                    <Shield size={64} className="text-orange-200" />
                  </div>
                </div>
              )}

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Cursos Ativos</p>
                      <p className="text-2xl font-bold text-white">6</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Missões Cumpridas</p>
                      <p className="text-2xl font-bold text-white">1,247</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Horas Operacionais</p>
                      <p className="text-2xl font-bold text-white">156h</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-orange-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Taxa de Sucesso</p>
                      <p className="text-2xl font-bold text-white">78%</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Últimas Operações</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg border border-green-500/20">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">Simulado PM-SP - Missão Cumprida</p>
                      <p className="text-sm text-slate-400">Taxa de acerto: 85% • há 2 horas</p>
                    </div>
                    <Medal className="w-5 h-5 text-yellow-400" />
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg border border-blue-500/20">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Play className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">Briefing: Hierarquia Militar - Concluído</p>
                      <p className="text-sm text-slate-400">Cel. João Silva • há 5 horas</p>
                    </div>
                    {!isSubscribed && (
                      <Crown className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg border border-orange-500/20">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">Treino TAF - Flexões Militares</p>
                      <p className="text-sm text-slate-400">30 repetições executadas • ontem</p>
                    </div>
                    {!isSubscribed && (
                      <Crown className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Academia de Formação</h2>
                  <p className="text-slate-300">Cursos especializados para cada carreira</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-700 flex items-center gap-2 text-white">
                    <Filter size={16} />
                    Filtrar por Área
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6 hover:border-blue-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{course.badge}</span>
                          <h3 className="text-lg font-semibold text-white">{course.name}</h3>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">{course.description}</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-slate-400 mb-2">
                        <span>Progresso da Missão</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">
                        {course.completedLessons} de {course.totalLessons} módulos
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                        Continuar
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAF Training */}
          {activeTab === 'taf-training' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Preparação Física TAF</h2>
                  <p className="text-slate-300">Treinamento militar para aprovação no TAF</p>
                </div>
                {!isSubscribed && (
                  <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-2 rounded-lg border border-yellow-500/30">
                    <Crown size={16} />
                    <span className="text-sm font-medium">Operação Elite</span>
                  </div>
                )}
              </div>

              {/* TAF Selector */}
              <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Selecione seu Concurso Alvo</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {tafTests.map((test) => (
                    <button
                      key={test.id}
                      onClick={() => setSelectedTAFExam(test.exam)}
                      className={`p-3 rounded-lg border transition-all text-center ${
                        selectedTAFExam === test.exam
                          ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                          : 'border-slate-600 hover:border-slate-500 text-slate-400'
                      }`}
                    >
                      <div className="text-2xl mb-1">{test.badge}</div>
                      <div className="text-sm font-medium">{test.exam}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected TAF Requirements */}
              {selectedTAFExam && (
                <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
                  {(() => {
                    const selectedTest = tafTests.find(t => t.exam === selectedTAFExam)
                    return selectedTest ? (
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">{selectedTest.badge}</span>
                          <div>
                            <h3 className="text-xl font-bold text-white">{selectedTest.exam}</h3>
                            <p className="text-slate-400">{selectedTest.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-white mb-3">Requisitos TAF</h4>
                            <div className="space-y-3">
                              {selectedTest.requirements.map((req, index) => (
                                <div key={index} className="bg-slate-700/50 p-3 rounded-lg">
                                  <div className="font-medium text-white mb-1">{req.exercise}</div>
                                  <div className="text-sm text-slate-400">
                                    <span className="text-blue-400">♂ {req.male}</span>
                                    {req.female && <span className="ml-4 text-pink-400">♀ {req.female}</span>}
                                    {req.time && <span className="ml-4 text-yellow-400">⏱ {req.time}</span>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-white mb-3">Intel Tático</h4>
                            <div className="space-y-2">
                              {selectedTest.tips.map((tip, index) => (
                                <div key={index} className="flex items-start gap-2 text-sm text-slate-400">
                                  <Target className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                  <span>{tip}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null
                  })()}
                </div>
              )}

              {/* Workout Timer */}
              {currentWorkout && (
                <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">🔥 OPERAÇÃO EM ANDAMENTO</h3>
                    <p className="text-lg mb-4">{currentWorkout.name}</p>
                    <div className="text-4xl font-bold mb-4">{formatTime(workoutTimer)}</div>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setIsWorkoutActive(!isWorkoutActive)}
                        className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        {isWorkoutActive ? 'Pausar' : 'Continuar'}
                      </button>
                      <button
                        onClick={() => {
                          setCurrentWorkout(null)
                          setIsWorkoutActive(false)
                          setWorkoutTimer(0)
                        }}
                        className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        Finalizar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Exercise Library */}
              <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Arsenal de Exercícios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tafExercises.map((exercise) => (
                    <div key={exercise.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">{exercise.name}</h4>
                          <p className="text-sm text-slate-400 mb-2">{exercise.description}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          exercise.difficulty === 'recruta' ? 'bg-green-500/20 text-green-400' :
                          exercise.difficulty === 'soldado' ? 'bg-blue-500/20 text-blue-400' :
                          exercise.difficulty === 'cabo' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {exercise.difficulty.toUpperCase()}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Target size={14} />
                          <span>{exercise.target}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Timer size={14} />
                          <span>{exercise.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Activity size={14} />
                          <span className="capitalize">{exercise.category}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => startWorkout(exercise)}
                        disabled={!isSubscribed}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                          isSubscribed
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
                            : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {isSubscribed ? (
                          <>
                            <Zap size={16} />
                            Iniciar Treino
                          </>
                        ) : (
                          <>
                            <Lock size={16} />
                            Elite
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Video Lessons */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Briefings em Vídeo</h2>
                  <p className="text-slate-300">Instruções especializadas dos melhores comandantes</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-700 flex items-center gap-2 text-white">
                    <Filter size={16} />
                    Por Especialidade
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoLessons.map((video) => (
                  <div key={video.id} className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button 
                          onClick={handleVideoClick}
                          className="w-16 h-16 bg-blue-500 bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </button>
                      </div>
                      <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                      {video.watched && isSubscribed && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white p-1 rounded-full">
                          <CheckCircle size={16} />
                        </div>
                      )}
                      {!isSubscribed && (
                        <div className="absolute top-3 left-3 bg-yellow-500 text-white p-1 rounded-full">
                          <Lock size={16} />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-slate-400 mb-2">{video.subject}</p>
                      <p className="text-sm text-slate-500">{video.instructor}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-slate-400">4.8</span>
                        </div>
                        <button 
                          onClick={handleVideoClick}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                            isSubscribed 
                              ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' 
                              : 'bg-slate-700 text-slate-500'
                          }`}
                        >
                          {isSubscribed ? <Eye size={14} /> : <Lock size={14} />}
                          {isSubscribed ? 'Assistir' : 'Elite'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questions Bank */}
          {activeTab === 'questions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Campo de Treinamento</h2>
                  <p className="text-slate-300">Simulações de combate com questões reais</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-700 flex items-center gap-2 text-white">
                    <Filter size={16} />
                    Filtros Táticos
                  </button>
                  {!showResults && (
                    <button 
                      onClick={() => setShowResults(true)}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Relatório de Missão
                    </button>
                  )}
                </div>
              </div>

              {!showResults ? (
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-medium">
                              {question.subject}
                            </span>
                            <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-sm">
                              {question.exam}
                            </span>
                            <span className={`px-2 py-1 rounded text-sm ${
                              question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                              question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {question.difficulty === 'easy' ? 'Recruta' : 
                               question.difficulty === 'medium' ? 'Soldado' : 'Sargento'}
                            </span>
                          </div>
                          <h3 className="text-lg font-medium text-white mb-4">
                            {index + 1}. {question.question}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => handleAnswerSelect(index, optionIndex)}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${
                              selectedAnswers[index] === optionIndex
                                ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                                : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50 text-slate-300'
                            }`}
                          >
                            <span className="font-medium">
                              {String.fromCharCode(65 + optionIndex)}) {option}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Relatório de Missão</h3>
                      <p className="text-lg text-slate-300">Taxa de sucesso: {calculateScore()}%</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                        <p className="text-2xl font-bold text-green-400">{Object.keys(selectedAnswers).filter(key => selectedAnswers[parseInt(key)] === questions[parseInt(key)]?.correctAnswer).length}</p>
                        <p className="text-sm text-green-400">Objetivos Cumpridos</p>
                      </div>
                      <div className="text-center p-4 bg-red-500/20 rounded-lg border border-red-500/30">
                        <p className="text-2xl font-bold text-red-400">{Object.keys(selectedAnswers).filter(key => selectedAnswers[parseInt(key)] !== questions[parseInt(key)]?.correctAnswer).length}</p>
                        <p className="text-sm text-red-400">Falhas Táticas</p>
                      </div>
                      <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                        <p className="text-2xl font-bold text-blue-400">{questions.length}</p>
                        <p className="text-sm text-blue-400">Total de Missões</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setShowResults(false)
                        setSelectedAnswers({})
                      }}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Nova Operação
                    </button>
                  </div>

                  {/* Detailed Results */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Análise Pós-Operação</h4>
                    {questions.map((question, index) => {
                      const userAnswer = selectedAnswers[index]
                      const isCorrect = userAnswer === question.correctAnswer
                      
                      return (
                        <div key={question.id} className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCorrect ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
                            }`}>
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <X className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-2">{question.question}</h5>
                              <p className="text-sm text-slate-400 mb-3">
                                <strong>Sua resposta:</strong> {question.options[userAnswer]} {isCorrect ? '✓' : '✗'}
                              </p>
                              {!isCorrect && (
                                <p className="text-sm text-slate-400 mb-3">
                                  <strong>Resposta correta:</strong> {question.options[question.correctAnswer]}
                                </p>
                              )}
                              <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
                                <p className="text-sm text-blue-300">
                                  <strong>Intel:</strong> {question.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AI Help */}
          {activeTab === 'ai-help' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Suporte Tático IA</h2>
                  <p className="text-slate-300">Central de inteligência para esclarecimento de dúvidas</p>
                </div>
                {!isSubscribed && (
                  <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-2 rounded-lg border border-yellow-500/30">
                    <Crown size={16} />
                    <span className="text-sm font-medium">Operação Elite</span>
                  </div>
                )}
              </div>

              <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Solicite suporte tático:
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="Ex: Como funciona a hierarquia militar?"
                      className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                      onKeyPress={(e) => e.key === 'Enter' && handleAiQuestion()}
                      disabled={!isSubscribed}
                    />
                    <button
                      onClick={handleAiQuestion}
                      disabled={!aiQuestion.trim() || !isSubscribed}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <MessageCircle size={20} />
                      Solicitar
                    </button>
                  </div>
                  {!isSubscribed && (
                    <p className="text-sm text-slate-500 mt-2">
                      Alistamento elite necessário para acesso ao suporte tático IA
                    </p>
                  )}
                </div>

                {aiResponse && (
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-6 border border-blue-500/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2">🤖 CENTRAL DE INTELIGÊNCIA:</h4>
                        <div className="prose prose-sm text-slate-300 whitespace-pre-line">
                          {aiResponse}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="font-medium text-white mb-3">Consultas Frequentes:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Como funciona a hierarquia militar?',
                      'Qual a diferença entre PM e PC?',
                      'Como calcular porcentagem em concursos?',
                      'O que são os princípios da administração?'
                    ].map((faq, index) => (
                      <button
                        key={index}
                        onClick={() => isSubscribed && setAiQuestion(faq)}
                        disabled={!isSubscribed}
                        className={`text-left p-3 rounded-lg transition-colors text-sm ${
                          isSubscribed 
                            ? 'bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600' 
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed border border-slate-600'
                        }`}
                      >
                        {faq}
                        {!isSubscribed && <Lock size={14} className="inline ml-2" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Relatório de Missão</h2>
                  <p className="text-slate-300">Análise completa do seu desempenho operacional</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-700 flex items-center gap-2 text-white">
                    <Download size={16} />
                    Exportar Intel
                  </button>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Progresso por Especialização</h3>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id}>
                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                          <span className="flex items-center gap-2">
                            <span>{course.badge}</span>
                            {course.name}
                          </span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Status Operacional</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Horas em Campo</span>
                      <span className="font-semibold text-white">156h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Missões Executadas</span>
                      <span className="font-semibold text-white">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Taxa de Sucesso</span>
                      <span className="font-semibold text-green-400">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Sequência Ativa</span>
                      <span className="font-semibold text-orange-400">12 dias</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Progress */}
              <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Atividade Semanal</h3>
                <div className="grid grid-cols-7 gap-2">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                    <div key={day} className="text-center">
                      <p className="text-sm text-slate-400 mb-2">{day}</p>
                      <div className={`w-full h-20 rounded-lg flex items-end justify-center ${
                        index < 5 ? 'bg-gradient-to-t from-blue-600 to-cyan-400' : 'bg-slate-700'
                      }`}>
                        {index < 5 && (
                          <span className="text-white text-xs mb-2">{Math.floor(Math.random() * 4) + 1}h</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">🚨 OPERAÇÃO ALISTAMENTO</h2>
                  <p className="text-slate-400">Desbloqueie acesso total à base de operações</p>
                </div>
                <button 
                  onClick={() => {
                    setShowSubscriptionModal(false)
                    setShowPaymentOptions(false)
                    setSelectedPlan(null)
                  }}
                  className="p-2 hover:bg-slate-700 rounded-lg text-white"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {!showPaymentOptions ? (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subscriptionPlans.map((plan) => (
                    <div 
                      key={plan.id} 
                      className={`relative border-2 rounded-xl p-6 ${
                        plan.popular 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-slate-600 bg-slate-800'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                            🏆 Recomendado
                          </span>
                        </div>
                      )}

                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-3xl font-bold text-white">R$ {plan.price}</span>
                          <span className="text-slate-400">/{plan.period}</span>
                        </div>
                        {plan.id === 'annual' && (
                          <p className="text-sm text-green-400 mt-1">💰 Economia de R$ 70 no ano</p>
                        )}
                      </div>

                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <span className="text-slate-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleSubscribe(plan.id)}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                          plan.popular
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg'
                            : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                      >
                        🎖️ Alistar-se - {plan.name}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-400">
                    🛡️ Todos os planos incluem garantia de 7 dias. Cancele quando quiser.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    🎯 Finalizar Alistamento - {subscriptionPlans.find(p => p.id === selectedPlan)?.name}
                  </h3>
                  <p className="text-2xl font-bold text-blue-400">
                    R$ {subscriptionPlans.find(p => p.id === selectedPlan)?.price}
                    <span className="text-base text-slate-400">
                      /{subscriptionPlans.find(p => p.id === selectedPlan)?.period}
                    </span>
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => handlePayment()}
                    className="w-full p-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard size={20} />
                    💳 Pagamento à Vista
                  </button>

                  {selectedPlan === 'annual' && (
                    <div className="space-y-2">
                      <p className="text-center text-slate-400 font-medium">Ou parcele em:</p>
                      {[3, 6, 12].map((installments) => {
                        const installmentValue = Math.ceil((350 * (1 + (installments * 0.02))) / installments)
                        return (
                          <button
                            key={installments}
                            onClick={() => handlePayment(installments)}
                            className="w-full p-3 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-between text-white"
                          >
                            <span>{installments}x de R$ {installmentValue}</span>
                            <span className="text-sm text-slate-400">
                              (Total: R$ {installmentValue * installments})
                            </span>
                          </button>
                        )
                      })}
                      <p className="text-xs text-slate-500 text-center mt-2">
                        *Juros de 2% ao mês aplicados no parcelamento
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowPaymentOptions(false)}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    ← Voltar aos planos
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}