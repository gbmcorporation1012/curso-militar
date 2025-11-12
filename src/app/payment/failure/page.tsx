"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { XCircle, ArrowLeft } from 'lucide-react'

export default function PaymentFailure() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('payment_id')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-red-500/30 p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          ❌ Pagamento Recusado
        </h1>

        <p className="text-slate-300 mb-6">
          Não foi possível processar seu pagamento. Por favor, verifique seus dados e tente novamente.
        </p>

        {paymentId && (
          <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-slate-400 mb-1">ID da Tentativa</p>
            <p className="text-white font-mono text-sm">{paymentId}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => router.push('/subscription')}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Tentar Novamente
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full px-6 py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Voltar ao Início
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Se o problema persistir, entre em contato com o suporte
        </p>
      </div>
    </div>
  )
}
