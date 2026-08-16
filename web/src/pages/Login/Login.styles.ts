import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #0f172a;
`;

export const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #1e293b;
  padding: 32px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  color: #3b82f6;
  font-size: 1.5rem;
  margin-bottom: 24px;
  text-align: center;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  background-color: #0f172a;
  border: 1px solid #334155;
  border-radius: 4px;
  color: #f8fafc;
  padding: 10px 12px;
  outline: none;

  &:focus { border-color: #3b82f6; }
`;

export const Button = styled.button`
  background-color: #3b82f6;
  color: #f8fafc;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    background-color: #64748b;
    cursor: not-allowed;
  }
`;

export const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid #f8fafc;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${rotate} 0.6s linear infinite;
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 12px;
  text-align: center;
`;
