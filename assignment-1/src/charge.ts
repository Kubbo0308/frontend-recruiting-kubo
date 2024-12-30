export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type Payment = {
  type: "CASH" | "COUPON";
  percentage?: number;
  amount?: number;
};

export function charge(invoice: Invoice, payments: Payment[]) {
  const total = invoice.total;
  let deposit = 0;

  payments
    .sort((payment) => (payment.type === 'COUPON' ? -1 : 1))
    .map((payment) => {
      if (deposit >= total) {
        throw new Error('OverCharge');
      }
      if (payment.type === 'COUPON') {
        if (payment.percentage != null) {
          deposit += Math.floor(total * (payment.percentage / 100));
        } else {
          deposit += payment.amount || 0;
        }
      } else {
        deposit += payment.amount || 0;
      }
    });
  if (total > deposit) {
    throw new Error('Shortage');
  }

  const isCoupon = payments.every((payment) => payment.type === 'COUPON');
  return {
    total,
    deposit,
    change: isCoupon ? 0 : deposit - total,
  };
}
