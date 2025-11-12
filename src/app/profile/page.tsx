"use client"

import { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  CreditCard, 
  Crown, 
  Settings, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  Edit3,
  Save,
  X,
  ArrowLeft,
  Target,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react'

interface UserProfile {
  name: string
  email: string
  phone: string
  birthDate: string
  city: string
  state: string
  targetExam: string
  studyGoal: string
  joinDate: string
}

interface SubscriptionInfo {
  plan: string
  status: string
  nextBilling: string
  price: number
  paymentMethod: string
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'João Silva Santos',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    birthDate: '1995-03-15',
    city: 'São Paulo',
    state: 'SP',
    targetExam: 'pm',
    studyGoal: '3-4h',
    joinDate: '2024-01-15'
  })

  const [subscriptionInfo] = useState<SubscriptionInfo>({
    plan: 'Plano Anual',
    status: 'Ativo',
    nextBilling: '2025-01-15',
    price: 350,
    paymentMethod: '**** **** **** 1234'
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

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    // Aqui você salvaria os dados na API
    console.log('Salvando perfil:', userProfile)
    setIsEditing(false)
  }

  const handleCancelSubscription = () => {
    // Aqui você processaria o cancelamento
    console.log('Cancelando assinatura:', cancelReason)
    setShowCancelModal(false)
  }

  const handleDeleteAccount = () => {
    // Aqui você processaria a exclusão da conta
    console.log('Excluindo conta')
    setShowDeleteModal(false)
    // Redirecionar para página inicial
    window.location.href = '/'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getSelectedConcurso = () => {
    return concursos.find(c => c.id === userProfile.targetExam)
  }

  const tabs = [
    { id: 'personal', label: 'Informações Pessoais', icon: User },
    { id: 'subscription', label: 'Assinatura', icon: Crown },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => window.location.href = '/'}
            className="p-2 hover:bg-slate-700 rounded-lg text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Central de Comando Pessoal</h1>
              <p className="text-slate-400">Gerencie seu perfil e configurações</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
              {/* Profile Summary */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white">{userProfile.name}</h3>
                <p className="text-sm text-slate-400">{userProfile.email}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400 font-medium">ELITE</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                          : 'hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
              
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">👤 Informações Pessoais</h2>
                      <p className="text-slate-400">Gerencie seus dados pessoais</p>
                    </div>
                    <button
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      {isEditing ? (
                        <>
                          <Save size={16} />
                          Salvar
                        </>
                      ) : (
                        <>
                          <Edit3 size={16} />
                          Editar
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="text"
                          value={userProfile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 disabled:opacity-50"
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
                          value={userProfile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Telefone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 disabled:opacity-50"
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
                          value={userProfile.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Cidade
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="text"
                          value={userProfile.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Estado
                      </label>
                      <select
                        value={userProfile.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        disabled={!isEditing}
                        className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white disabled:opacity-50"
                      >
                        {estados.map((estado) => (
                          <option key={estado} value={estado}>{estado}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Study Goals */}
                  <div className="border-t border-slate-700 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">🎯 Objetivos de Estudo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Concurso Alvo
                        </label>
                        <div className="space-y-2">
                          {concursos.map((concurso) => (
                            <button
                              key={concurso.id}
                              onClick={() => isEditing && handleInputChange('targetExam', concurso.id)}
                              disabled={!isEditing}
                              className={`w-full p-3 rounded-lg border transition-all text-left flex items-center gap-3 ${
                                userProfile.targetExam === concurso.id
                                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                                  : 'border-slate-600 text-slate-300'
                              } ${!isEditing && 'opacity-50 cursor-not-allowed'}`}
                            >
                              <span className="text-xl">{concurso.badge}</span>
                              <span className="font-medium">{concurso.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Meta Diária de Estudo
                        </label>
                        <select
                          value={userProfile.studyGoal}
                          onChange={(e) => handleInputChange('studyGoal', e.target.value)}
                          disabled={!isEditing}
                          className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white disabled:opacity-50"
                        >
                          <option value="1-2h">1-2 horas por dia</option>
                          <option value="3-4h">3-4 horas por dia</option>
                          <option value="5-6h">5-6 horas por dia</option>
                          <option value="7+h">Mais de 7 horas por dia</option>
                        </select>

                        <div className="mt-4 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-blue-400" />
                            <span className="font-medium text-blue-300">Status Atual</span>
                          </div>
                          <p className="text-sm text-blue-200">
                            Membro desde {formatDate(userProfile.joinDate)}
                          </p>
                          <p className="text-sm text-blue-200">
                            Meta: {userProfile.studyGoal} • Alvo: {getSelectedConcurso()?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all"
                      >
                        <Save className="inline w-4 h-4 mr-2" />
                        Salvar Alterações
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-all"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Subscription Tab */}
              {activeTab === 'subscription' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">👑 Informações da Assinatura</h2>
                    <p className="text-slate-400">Gerencie sua assinatura e pagamentos</p>
                  </div>

                  {/* Current Plan */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Crown className="w-8 h-8 text-yellow-400" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{subscriptionInfo.plan}</h3>
                          <p className="text-blue-300">Status: {subscriptionInfo.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">R$ {subscriptionInfo.price}</p>
                        <p className="text-sm text-slate-400">por ano</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-blue-400" />
                          <span className="font-medium text-white">Próxima Cobrança</span>
                        </div>
                        <p className="text-slate-300">{formatDate(subscriptionInfo.nextBilling)}</p>
                      </div>

                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="w-5 h-5 text-blue-400" />
                          <span className="font-medium text-white">Método de Pagamento</span>
                        </div>
                        <p className="text-slate-300">{subscriptionInfo.paymentMethod}</p>
                      </div>
                    </div>
                  </div>

                  {/* Plan Features */}
                  <div className="bg-slate-700/50 rounded-lg p-6">
                    <h4 className="font-semibold text-white mb-4">✅ Recursos Inclusos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Acesso completo às vídeo aulas',
                        'Tiragem de dúvidas com IA ilimitada',
                        'Banco de questões completo',
                        'Simulados personalizados',
                        'Treinos TAF personalizados',
                        'Relatórios de progresso',
                        'Suporte prioritário',
                        'Economia de R$ 70 no ano'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all">
                      <CreditCard className="inline w-4 h-4 mr-2" />
                      Alterar Método de Pagamento
                    </button>
                    <button className="px-6 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-all">
                      Baixar Fatura
                    </button>
                    <button 
                      onClick={() => setShowCancelModal(true)}
                      className="px-6 py-2 border border-red-600 text-red-400 rounded-lg hover:bg-red-600/10 transition-all"
                    >
                      Cancelar Assinatura
                    </button>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">⚙️ Configurações</h2>
                    <p className="text-slate-400">Configurações gerais da conta</p>
                  </div>

                  {/* Account Settings */}
                  <div className="space-y-4">
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3">🔔 Notificações</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-slate-300">Email de lembretes de estudo</span>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-slate-300">Notificações de novos conteúdos</span>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-slate-300">Relatórios semanais de progresso</span>
                          <input type="checkbox" className="toggle" />
                        </label>
                      </div>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3">🎯 Preferências de Estudo</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-slate-300">Modo escuro automático</span>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-slate-300">Autoplay de vídeo aulas</span>
                          <input type="checkbox" className="toggle" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-slate-300">Lembretes de pausa nos estudos</span>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </label>
                      </div>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3">🔒 Segurança</h4>
                      <div className="space-y-3">
                        <button className="w-full text-left p-3 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors text-slate-300">
                          Alterar Senha
                        </button>
                        <button className="w-full text-left p-3 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors text-slate-300">
                          Configurar Autenticação em Duas Etapas
                        </button>
                        <button className="w-full text-left p-3 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors text-slate-300">
                          Gerenciar Sessões Ativas
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                    <h4 className="font-semibold text-red-400 mb-3">⚠️ Zona de Perigo</h4>
                    <p className="text-red-300 text-sm mb-4">
                      Ações irreversíveis. Proceda com cautela.
                    </p>
                    <button 
                      onClick={() => setShowDeleteModal(true)}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    >
                      <Trash2 className="inline w-4 h-4 mr-2" />
                      Excluir Conta Permanentemente
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl max-w-md w-full border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">⚠️ Cancelar Assinatura</h3>
              <button 
                onClick={() => setShowCancelModal(false)}
                className="p-2 hover:bg-slate-700 rounded-lg text-white"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-slate-300 mb-4">
              Tem certeza que deseja cancelar sua assinatura? Você perderá acesso aos recursos premium.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Motivo do cancelamento (opcional)
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
              >
                <option value="">Selecione um motivo</option>
                <option value="expensive">Muito caro</option>
                <option value="not-using">Não estou usando</option>
                <option value="found-alternative">Encontrei alternativa</option>
                <option value="temporary">Pausa temporária</option>
                <option value="other">Outro</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelSubscription}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                Confirmar Cancelamento
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-all"
              >
                Manter Assinatura
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl max-w-md w-full border border-red-500/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-red-400">🚨 Excluir Conta</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="p-2 hover:bg-slate-700 rounded-lg text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-red-300 font-medium mb-1">Ação Irreversível</p>
                  <p className="text-red-200 text-sm">
                    Esta ação não pode ser desfeita. Todos os seus dados, progresso e assinatura serão permanentemente excluídos.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-300 mb-4">
              Digite <strong>"EXCLUIR"</strong> para confirmar:
            </p>

            <input
              type="text"
              placeholder="Digite EXCLUIR"
              className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-white mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                <Trash2 className="inline w-4 h-4 mr-2" />
                Excluir Permanentemente
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}