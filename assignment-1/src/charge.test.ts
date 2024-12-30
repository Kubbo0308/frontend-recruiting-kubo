import { charge, Invoice, Payment, Receipt } from "./charge";

describe('failed: charge', () => {
  test('OverCharge', () => {
    const invoice: Invoice = { total: 100 };
    const payments: Payment[] = [{ type: 'CASH', amount: 100 }, { type: 'COUPON', amount: 100 }];
    expect(() => charge(invoice, payments)).toThrow('OverCharge');
  });

  test('Shortage', () => {
    const invoice: Invoice = { total: 100 };
    const payments: Payment[] = [{ type: 'CASH', amount: 99 }];
    expect(() => charge(invoice, payments)).toThrow('Shortage');
  });
});

describe('success: charge', () => {
  test('Only Cash(No Change)', () => {
    const invoice: Invoice = { total: 100 };
    const payments: Payment[] = [{ type: 'CASH', amount: 50 }, { type: 'CASH', amount: 50 }];
    const expectedReceipt: Receipt = { total: 100, deposit: 100, change: 0 };
    expect(charge(invoice, payments)).toEqual(expectedReceipt);
  });

  test('Only Cash(Has Change)', () => {
    const invoice: Invoice = { total: 100 };
    const payments: Payment[] = [{ type: 'CASH', amount: 50 }, { type: 'CASH', amount: 70 }];
    const expectedReceipt: Receipt = { total: 100, deposit: 120, change: 20 };
    expect(charge(invoice, payments)).toEqual(expectedReceipt);
  });

  test('Only Coupon', () => {
    const invoice: Invoice = { total: 100 };
    const payments: Payment[] = [{ type: 'COUPON', percentage: 50 }, { type: 'COUPON', amount: 70 }];
    const expectedReceipt: Receipt = { total: 100, deposit: 120, change: 0 };
    expect(charge(invoice, payments)).toEqual(expectedReceipt);
  });

  test('Mixed Payment(No Change)', () => {
    const invoice: Invoice = { total: 100 };
    const payments: Payment[] = [{ type: 'CASH', amount: 50 }, { type: 'COUPON', percentage: 50 }];
    const expectedReceipt: Receipt = { total: 100, deposit: 100, change: 0 };
    expect(charge(invoice, payments)).toEqual(expectedReceipt);
  });

  test('Mixed Payment(Has Change)', () => {
    const invoice: Invoice = { total: 100 };
    const payments: Payment[] = [{ type: 'CASH', amount: 70 }, { type: 'COUPON', percentage: 50 }];
    const expectedReceipt: Receipt = { total: 100, deposit: 120, change: 20 };
    expect(charge(invoice, payments)).toEqual(expectedReceipt);
  });
});
