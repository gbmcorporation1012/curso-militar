// Configuração do Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Inicializar o cliente do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY || '',
});

export const mercadoPagoClient = client;

// Criar preferência de pagamento
export async function createPreference(items: any[]) {
  try {
    const preference = new Preference(client);
    
    const response = await preference.create({
      body: {
        items: items,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/failure`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/pending`,
        },
        auto_return: 'approved' as const,
      }
    });

    return response;
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    throw error;
  }
}
