import { NextRequest, NextResponse } from 'next/server';
import { createPreference } from '@/lib/mercadopago';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, planName, price } = body;

    // Criar item para o Mercado Pago
    const items = [
      {
        id: planId,
        title: planName,
        quantity: 1,
        unit_price: price,
        currency_id: 'BRL',
      }
    ];

    // Criar preferência de pagamento
    const preference = await createPreference(items);

    return NextResponse.json({
      success: true,
      init_point: preference.init_point,
      preference_id: preference.id,
    });
  } catch (error) {
    console.error('Erro ao criar checkout:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao criar preferência de pagamento' },
      { status: 500 }
    );
  }
}
