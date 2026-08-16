import { useActionState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'hooks/useAuth';
import { RoutePaths } from 'resources/enum';
import * as S from './Login.styles';

interface FormState {
  error: string | null;
  isSuccess: boolean;
  values: {
    email: string;
    password?: string;
  };
}

export const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useLoginMutation();

 const [state, formAction, isPending] = useActionState(
  async (_: FormState | null, formData: FormData): Promise<FormState> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const response = await mutateAsync({ email, passwordHash: password });

    if (response.isSuccess) {
      navigate(RoutePaths.HOME); 
      return { error: null, isSuccess: true, values: { email } };
    }

    return { 
      error: response.errorMessage || 'Authentication failed.', 
      isSuccess: false,
      values: { email, password } 
    };
  },
  { error: null, isSuccess: false, values: { email: '' } }
);

  useEffect(() => {
    if (state?.isSuccess) {
      navigate(RoutePaths.HOME);
    }
  }, [state?.isSuccess, navigate]);

  return (
    <S.Container>
      <S.FormCard action={formAction}>
        <S.Title>NorthernRoute Logistics</S.Title>

        <S.InputGroup>
          <S.Label htmlFor="email">Email</S.Label>
          <S.Input 
            id="email" 
            name="email" 
            type="email" 
            key={`email-${state?.values.email}`}
            defaultValue={state?.values.email}
            disabled={isPending} 
            required 
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label htmlFor="password">Password</S.Label>
          <S.Input 
            id="password" 
            name="password" 
            type="password" 
            key={`pass-${state?.values.password}`}
            defaultValue={state?.values.password}
            disabled={isPending} 
            required 
          />
        </S.InputGroup>

        <S.Button type="submit" disabled={isPending}>
          {isPending ? <S.LoadingSpinner /> : 'Sign In'}
        </S.Button>

        {state?.error && <S.ErrorMessage>{state.error}</S.ErrorMessage>}
      </S.FormCard>
    </S.Container>
  );
};
