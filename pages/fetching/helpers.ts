const WAITING_TIME = 200;

export const wrapIntoResponse = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, data }), WAITING_TIME);
  });
};
