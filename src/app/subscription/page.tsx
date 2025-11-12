"use client"

import { useState } from 'react'
import { 
  Check, 
  Crown, 
  Shield, 
  ArrowLeft
} from 'lucide-react'

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  popular?: boolean
  paymentLink: string
}

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('annual')

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'monthly',
      name: 'Plano Mensal',
      price: 35,
      period: 'mês',
      paymentLink: 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=977ac69eb0154310989581b0532cfff3',
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
      paymentLink: 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2d233e5f64024e9e91977e1bafefd8d0',
      features: [
        'Acesso completo às vídeo aulas',
        'Tiragem de dúvidas com IA ilimitada',
        'Banco de questões completo',
        'Simulados personalizados',
        'Treinos TAF personalizados',
        'Relatórios de progresso',
        'Suporte prioritário',
        '💰 Economia de R$ 70 no ano',
        '🎁 2 meses grátis',
        '📱 Parcelamento em até 12x'
      ],
      popular: true
    }
  ]

  const selectedPlanData = subscriptionPlans.find(p => p.id === selectedPlan)

  const handleSubscribe = () => {
    if (selectedPlanData) {
      window.location.href = selectedPlanData.paymentLink
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => window.history.back()}
            className="p-2 hover:bg-slate-700 rounded-lg text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Operação Alistamento</h1>
              <p className="text-slate-400">Desbloqueie acesso total à base de operações</p>
            </div>
          </div>
        </div>

        {/* PLAN SELECTION */}
        <div className="space-y-8">
          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subscriptionPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 bg-blue-500/10 shadow-lg'
                    : plan.popular 
                    ? 'border-blue-500/50 bg-blue-500/5 hover:border-blue-500' 
                    : 'border-slate-600 bg-slate-800 hover:border-slate-500'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      🏆 Mais Popular
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

                <div className="flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-400'
                  }`}>
                    {selectedPlan === plan.id && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={handleSubscribe}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-lg"
            >
              <Crown className="inline w-5 h-5 mr-2" />
              🎖️ Prosseguir com {selectedPlanData?.name}
            </button>
            <p className="text-sm text-slate-400 mt-4">
              🛡️ Pagamento 100% seguro via Mercado Pago • Cancele quando quiser • Garantia de 7 dias
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
