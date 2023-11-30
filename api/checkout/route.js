import paypal from '@paypal/checkout-server-sdk';
import { NextResponse } from 'next/server';

const clientId =
  'AYr_TRftw--yMftF62GNnhXACya5ES85JHXrB96yt1OM7hTZwHpcYhCDQ_7sQNE8T93OdNTHKPSy3I24';

const clientSecret =
  'EMfrDY47GoJP6UXxnFhnwdH2tJElFSFLLaiUudXW-sE5FBhgxBwp4yX4dat4En6_kHGQMOVs2emk_tvO';

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);
export async function POST() {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_unit: [
      {
        amount: {
          currency_code: 'USD',
          value: '10.00',
        },
        description: 'Update Vip User For PH SOCIAL',
      },
    ],
  });
  const response = await client.execute(request);

  return NextResponse.json({
    message: response.result.id,
  });
}
