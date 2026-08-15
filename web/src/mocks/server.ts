import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = 5001;
const JWT_SECRET = 'SuperSecretSecureKeyForNorthernRouteLogistics2026';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.disable('x-powered-by');

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const endpointCollection = [
  {
    category: 'Authentication',
    items: [
      {
        method: 'POST',
        path: '/api/auth/login',
        label: 'Correct Password Scenario',
        isSuccess: true,
        payload: { email: 'driver@test.com', passwordHash: 'Secure123' },
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        label: 'Wrong Password Scenario',
        isSuccess: false,
        payload: { email: 'driver@test.com', passwordHash: 'WrongPassword123' },
      },
    ],
  },
];

app.get('/api/endpoints', (_req, res) => {
  res.json(endpointCollection);
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(
    `  \x1b[32m➜\x1b[0m  Mock Server - Running on: \x1b[36mhttp://localhost:${PORT}\x1b[0m`,
  );
});

app.post('/api/auth/login', (req, res) => {
  const { email, passwordHash } = req.body;

  if (email === 'driver@test.com' && passwordHash === 'Secure123') {
    const generatedToken = jwt.sign(
      {
        sub: 'mock-id-123',
        name: 'Alexandre Santos',
        email: 'driver@test.com',
        role: 'DRIVER',
      },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    return res.status(200).json({
      isSuccess: true,
      errorMessage: null,
      data: {
        userId: 'mock-id-123',
        name: 'Alexandre Santos',
        email: 'driver@test.com',
        role: 'DRIVER',
        token: generatedToken,
      },
    });
  }

  return res.status(400).json({
    isSuccess: false,
    errorMessage: 'Invalid credentials.',
    data: null,
  });
});
