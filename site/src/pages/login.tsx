
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CLIENTES_KEY = 'admin_clientes';
const USUARIO_LOGADO_KEY = 'usuario_logado';

const Container = styled.div`
  min-height: 100vh;
  background: #0a0b0d;
  color: #ffffff;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const LoginWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    gap: 2rem;
  }
`;

const LeftContent = styled.div`
  @media (max-width: 968px) {
    display: none;
  }
  
  h1 {
    font-size: 4rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    
    span {
      color: #00ff88;
    }
  }
  
  p {
    font-size: 1.2rem;
    color: #b8b8b8;
    line-height: 1.6;
    margin-bottom: 2rem;
    max-width: 600px;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e0e0e0;
  
  &::before {
    content: '✓';
    color: #00ff88;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  color: #888;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &::before {
      content: '📱';
    }
  }
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00ff88;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(-5px);
    color: #00e67a;
  }
  
  &::before {
    content: '←';
    font-size: 1.2rem;
  }
`;

const LoginCard = styled.div`
  background: rgba(26, 29, 33, 0.95);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 16px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  width: 100%;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    color: #00ff88;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  p {
    color: #b8b8b8;
    font-size: 0.95rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 0.25rem;
`;

const Tab = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: ${props => props.active ? '#00ff88' : 'transparent'};
  color: ${props => props.active ? '#0a0f0a' : '#ffffff'};
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#00ff88' : 'rgba(0, 255, 136, 0.1)'};
  }
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
  
  label {
    display: flex;
    align-items: center;
    color: #b8b8b8;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .icon {
    margin-right: 0.5rem;
    font-size: 1.1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
    background: rgba(0, 0, 0, 0.4);
  }
  
  &::placeholder {
    color: #666;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem 0;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  color: #0a0f0a;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  &:hover {
    background: linear-gradient(135deg, #00e67a, #00cc6a);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 255, 136, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 71, 87, 0.1);
  border: 1px solid rgba(255, 71, 87, 0.3);
  color: #ff4757;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
`;

const SwitchText = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #b8b8b8;
  font-size: 0.95rem;
  
  a {
    color: #00ff88;
    text-decoration: none;
    font-weight: 600;
    margin-left: 0.5rem;
    
    &:hover {
      color: #00e67a;
      text-decoration: underline;
    }
  }
`;

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro('');
    
    if (isRegister) {
      // Cadastro
      if (!nome || !email || !whatsapp || !senha) {
        setErro('Preencha todos os campos!');
        setLoading(false);
        return;
      }
      try {
        const resp = await fetch('/api/clientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, whatsapp, senha })
        });
        if (resp.status === 409) {
          setErro('Já existe uma conta com este e-mail.');
          setLoading(false);
          return;
        }
        if (!resp.ok) {
          setErro('Erro ao registrar. Tente novamente.');
          setLoading(false);
          return;
        }
        const data = await resp.json();
        const listaResp = await fetch('/api/clientes');
        const lista = await listaResp.json();
        if (typeof window !== 'undefined') {
          localStorage.setItem(CLIENTES_KEY, JSON.stringify(lista.clientes || []));
          localStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify(data.cliente));
        }
        router.push('/dashboard');
      } catch (err) {
        setErro('Erro de conexão. Tente novamente.');
        setLoading(false);
      }
    } else {
      // Login
      if (!email || !senha) {
        setErro('Preencha e-mail e senha!');
        setLoading(false);
        return;
      }
      try {
        const listaResp = await fetch('/api/clientes');
        const lista = await listaResp.json();
        const clientes = lista.clientes || [];
        const usuario = clientes.find((c) => c.email === email && c.senha === senha);
        if (!usuario) {
          setErro('E-mail ou senha inválidos!');
          setLoading(false);
          return;
        }
        if (usuario.status !== 'ativo') {
          setErro('Usuário bloqueado. Entre em contato com o suporte.');
          setLoading(false);
          return;
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
          localStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify(usuario));
        }
        router.push('/dashboard');
      } catch (err) {
        setErro('Erro ao conectar. Tente novamente.');
        setLoading(false);
      }
    }
  }

  return (
    <Container>
      <BackButton href="/">
        Voltar para home
      </BackButton>
      
      <LoginWrapper>
        <LeftContent>
          <h1>
            QUERO<br />
            <span>ENGAJAR</span>
          </h1>
          <p>
            A ferramenta mais simples e fácil para turbinar seus comentários no Instagram de forma totalmente automática
          </p>
          
          <FeatureList>
            <FeatureItem>Cole o link → Receba comentários</FeatureItem>
            <FeatureItem>Mais Engajamento</FeatureItem>
            <FeatureItem>Maior Alcance</FeatureItem>
            <FeatureItem>Comentários Reais</FeatureItem>
          </FeatureList>
          
          <ContactInfo>
            <span>@agenrecife_</span>
            <span>(81) 9779-4726</span>
          </ContactInfo>
        </LeftContent>

        <LoginCard>
          <LoginHeader>
            <h2>QUERO ENGAJAR</h2>
            <p>{isRegister ? 'Crie sua conta e comece agora' : 'Entre na sua conta e crie uma nova'}</p>
          </LoginHeader>
          
          <TabContainer>
            <Tab 
              active={!isRegister} 
              onClick={() => {setIsRegister(false); setErro('');}}
            >
              Login
            </Tab>
            <Tab 
              active={isRegister} 
              onClick={() => {setIsRegister(true); setErro('');}}
            >
              Cadastro
            </Tab>
          </TabContainer>
          
          {erro && <ErrorMessage>{erro}</ErrorMessage>}
          
          <StyledForm onSubmit={handleSubmit}>
            {isRegister && (
              <FormGroup>
                <label>
                  <span className="icon">👤</span>
                  Nome de usuário
                </label>
                <Input 
                  placeholder="Nome de usuário" 
                  required 
                  value={nome} 
                  onChange={e => setNome(e.target.value)} 
                />
              </FormGroup>
            )}
            
            <FormGroup>
              <label>
                <span className="icon">📧</span>
                E-mail válido
              </label>
              <Input 
                type="email" 
                placeholder="Insira seu email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            </FormGroup>
            
            {isRegister && (
              <FormGroup>
                <label>
                  <span className="icon">📱</span>
                  WhatsApp
                </label>
                <Input 
                  placeholder="WhatsApp" 
                  required 
                  value={whatsapp} 
                  onChange={e => setWhatsapp(e.target.value)} 
                />
              </FormGroup>
            )}
            
            <FormGroup>
              <label>
                <span className="icon">🔒</span>
                Senha
              </label>
              <Input 
                type="password" 
                placeholder="Sua senha" 
                required 
                value={senha} 
                onChange={e => setSenha(e.target.value)} 
              />
            </FormGroup>
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Carregando...' : (isRegister ? 'Cadastrar' : 'Entrar')}
            </Button>
          </StyledForm>
          
          <SwitchText>
            {isRegister ? (
              <>
                Já tem conta?
                <a href="#" onClick={e => {e.preventDefault(); setIsRegister(false); setErro('');}}>
                  Entrar
                </a>
              </>
            ) : (
              <>
                Não tem conta?
                <a href="#" onClick={e => {e.preventDefault(); setIsRegister(true); setErro('');}}>
                  Cadastre-se
                </a>
              </>
            )}
          </SwitchText>
        </LoginCard>
      </LoginWrapper>
    </Container>
  );
}
