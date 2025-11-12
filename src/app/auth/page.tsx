"use client"

import { useState } from 'react'
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  ArrowLeft,
  Phone,
  Calendar,
  MapPin,
  UserCheck,
  CheckCircle
} from 'lucide-react'

interface UserData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  birthDate: string
  city: string
  state: string
  targetExam: string
  studyGoal: string
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    city: '',
    state: '',
    targetExam: '',
    studyGoal: ''
  })

  const concursos = [
    { id: 'pm', name: 'Polícia Militar (PM)', badge: '🛡️' },
    { id: 'pc', name: 'Polícia Civil (PC)', badge: '🔍' },
    { id: 'pf', name: 'Polícia Federal (PF)', badge: '🇧🇷' },
    { id: 'prf', name: 'PRF - Polícia Rodoviária', badge: '🛣️' },
    { id: 'esa', name: 'ESA - Escola de Sargentos', badge: '⚔️' },
    { id: 'espcex', name: 'ESPCEX - Preparatória Cadetes', badge: '🎖️' }
  ]

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }))
  }

  const handleLogin = () => {
    // Simulação de login
    console.log('Login:', { email: userData.email, password: userData.password })
    // Aqui você integraria com sua API de autenticação
    window.location.href = '/'
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleRegister()
    }
  }

  const handleRegister = () => {
    // Simulação de cadastro
    console.log('Cadastro completo:', userData)
    // Aqui você integraria com sua API de cadastro
    window.location.href = '/subscription'
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return userData.name && userData.email && userData.password && userData.confirmPassword && userData.password === userData.confirmPassword
      case 2:
        return userData.phone && userData.birthDate && userData.city && userData.state
      case 3:
        return userData.targetExam && userData.studyGoal
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">ConcursosPro</h1>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            {isLogin ? '🎯 Acesso à Base' : '🚨 Alistamento Militar'}
          </h2>
          <p className="text-slate-400">
            {isLogin ? 'Entre com suas credenciais de acesso' : 'Cadastre-se para iniciar sua jornada'}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
          {isLogin ? (
            /* LOGIN FORM */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email de Acesso
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Senha de Acesso
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={!userData.email || !userData.password}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                🎖️ Acessar Base de Operações
              </button>

              <div className="text-center">
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Não tem acesso? Faça seu alistamento
                </button>
              </div>
            </div>
          ) : (
            /* REGISTRATION FORM */
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => currentStep === 1 ? setIsLogin(true) : setCurrentStep(currentStep - 1)}
                    className="p-2 hover:bg-slate-700 rounded-lg text-white"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <span className="text-white font-medium">
                    Etapa {currentStep} de 3
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full ${
                        step <= currentStep ? 'bg-blue-500' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Dados Básicos */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-white">📋 Dados Básicos</h3>
                    <p className="text-sm text-slate-400">Informações essenciais para seu cadastro</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={userData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                        placeholder="Mínimo 8 caracteres"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Confirmar Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={userData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                        placeholder="Confirme sua senha"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {userData.password && userData.confirmPassword && userData.password !== userData.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">As senhas não coincidem</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Informações Pessoais */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-white">👤 Informações Pessoais</h3>
                    <p className="text-sm text-slate-400">Dados para personalizar sua experiência</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Telefone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Data de Nascimento
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="date"
                        value={userData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Cidade
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="text"
                          value={userData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                          placeholder="Sua cidade"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Estado
                      </label>
                      <select
                        value={userData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        required
                      >
                        <option value="">UF</option>
                        {estados.map((estado) => (
                          <option key={estado} value={estado}>{estado}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Objetivos */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-white">🎯 Seus Objetivos</h3>
                    <p className="text-sm text-slate-400">Personalize sua jornada de estudos</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Concurso Alvo
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {concursos.map((concurso) => (
                        <button
                          key={concurso.id}
                          onClick={() => handleInputChange('targetExam', concurso.id)}
                          className={`p-3 rounded-lg border transition-all text-left flex items-center gap-3 ${
                            userData.targetExam === concurso.id
                              ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                              : 'border-slate-600 hover:border-slate-500 text-slate-300'
                          }`}
                        >
                          <span className="text-xl">{concurso.badge}</span>
                          <span className="font-medium">{concurso.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Meta de Estudo
                    </label>
                    <select
                      value={userData.studyGoal}
                      onChange={(e) => handleInputChange('studyGoal', e.target.value)}
                      className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                      required
                    >
                      <option value="">Selecione sua meta</option>
                      <option value="1-2h">1-2 horas por dia</option>
                      <option value="3-4h">3-4 horas por dia</option>
                      <option value="5-6h">5-6 horas por dia</option>
                      <option value="7+h">Mais de 7 horas por dia</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                onClick={handleNextStep}
                disabled={!isStepValid()}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold mt-6"
              >
                {currentStep === 3 ? (
                  <>
                    <CheckCircle className="inline w-5 h-5 mr-2" />
                    🎖️ Completar Alistamento
                  </>
                ) : (
                  'Continuar →'
                )}
              </button>

              <div className="text-center mt-4">
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Já tem acesso? Faça login
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-500">
            🛡️ Seus dados estão protegidos com criptografia militar
          </p>
        </div>
      </div>
    </div>
  )
}