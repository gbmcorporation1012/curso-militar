"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function PaymentSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('payment_id')
  const status = searchParams.get('status')

  useEffect(() => {
    // Aqui você pode fazer uma chamada para seu backend para confirmar o pagamento
    console.log('Pagamento aprovado:', { paymentId, status })
  }, [paymentId, status])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-green-500/30 p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          🎉 Pagamento Aprovado!
        </h1>

        <p className="text-slate-300 mb-6">
          Seu alistamento foi confirmado com sucesso! Agora você tem acesso completo a todas as funcionalidades elite.
        </p>

        <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-400 mb-1">ID do Pagamento</p>
          <p className="text-white font-mono text-sm">{paymentId || 'N/A'}</p>
        </div>

        <button
          onClick={() => router.push('/')}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold"
        >
          Acessar Plataforma
          <ArrowRight size={20} />
        </button>

        <p className="text-xs text-slate-500 mt-4">
          Um email de confirmação foi enviado para você
        </p>
      </div>
    </div>
  )
}
