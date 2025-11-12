"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { Clock, ArrowLeft } from 'lucide-react'

export default function PaymentPending() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('payment_id')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-yellow-500/30 p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-12 h-12 text-yellow-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          ⏳ Pagamento Pendente
        </h1>

        <p className="text-slate-300 mb-6">
          Seu pagamento está sendo processado. Você receberá uma confirmação em breve por email.
        </p>

        {paymentId && (
          <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-slate-400 mb-1">ID do Pagamento</p>
            <p className="text-white font-mono text-sm">{paymentId}</p>
          </div>
        )}

        <div className="bg-blue-500/20 rounded-lg p-4 mb-6 border border-blue-500/30">
          <p className="text-sm text-blue-300">
            💡 <strong>Dica:</strong> Pagamentos via boleto ou PIX podem levar até 2 dias úteis para serem confirmados.
          </p>
        </div>

        <button
          onClick={() => router.push('/')}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold"
        >
          <ArrowLeft size={20} />
          Voltar ao Início
        </button>

        <p className="text-xs text-slate-500 mt-4">
          Acompanhe o status do pagamento no seu email
        </p>
      </div>
    </div>
  )
}
