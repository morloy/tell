let hostname = 'tell-now.com';
if (process.env.NODE_ENV === 'development') { hostname = 'localhost'; }

export const HOSTNAME = hostname;
export const PORT = 62938;
