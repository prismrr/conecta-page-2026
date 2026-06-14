const vm = require('vm');
const fs = require('fs');
const path = require('path');

const scriptSrc = fs.readFileSync(
  path.join(__dirname, '../../assets/js/consent-init.js'),
  'utf8'
);

function runInFakeWindow() {
  const ctx = vm.createContext({});
  ctx.window = ctx; // simula window === global como no browser
  vm.runInContext(scriptSrc, ctx);
  return ctx;
}

describe('consent-init', () => {
  it('inicializa dataLayer como array', () => {
    const ctx = runInFakeWindow();
    expect(Array.isArray(ctx.dataLayer)).toBe(true);
  });

  it('expõe a função gtag globalmente', () => {
    const ctx = runInFakeWindow();
    expect(typeof ctx.gtag).toBe('function');
  });

  it('define consent default com analytics_storage e ad_storage negados', () => {
    const ctx = runInFakeWindow();
    const entry = ctx.dataLayer[0];
    expect(entry[0]).toBe('consent');
    expect(entry[1]).toBe('default');
    expect(entry[2].analytics_storage).toBe('denied');
    expect(entry[2].ad_storage).toBe('denied');
  });

  it('preserva dataLayer existente em vez de sobrescrever', () => {
    const ctx = vm.createContext({ dataLayer: [{ existing: true }] });
    ctx.window = ctx;
    vm.runInContext(scriptSrc, ctx);
    expect(ctx.dataLayer[0]).toEqual({ existing: true });
  });
});
