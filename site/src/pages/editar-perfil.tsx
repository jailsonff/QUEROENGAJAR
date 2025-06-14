
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserMenu from '../components/UserMenu';

const Container = styled.div`
  min-height: 100vh;
  background: #0a0b0d;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Header = styled.div`
  background: rgba(10, 11, 13, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
`;

const WelcomeText = styled.h2`
  color: #00ff88;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CommentsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 8px;
  padding: 0.5rem 1rem;

  span {
    color: #b8b8b8;
    font-size: 0.9rem;
  }

  .count {
    color: #00ff88;
    font-weight: 700;
    font-size: 1.1rem;
  }
`;

const MainWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  color: #00ff88;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FormContainer = styled.div`
  background: rgba(26, 29, 33, 0.9);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #b8b8b8;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #ffffff;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff88;
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.5);
    color: #666;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &::placeholder {
    color: #666;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  color: #0a0f0a;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Success = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #00ff88;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.2);
`;

const InfoText = styled.p`
  color: #b8b8b8;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
  line-height: 1.4;
`;

export default function EditarPerfil() {
  // Dados do usuário logado
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [success, setSuccess] = useState(false);
  const [comentariosDisponiveis, setComentariosDisponiveis] = useState(0);

  // Buscar dados do usuário logado
  useEffect(() => {
    const userData = localStorage.getItem('usuario_logado');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setNome(user.nome || '');
        setEmail(user.email || '');
        
        // Buscar dados atualizados do cliente da API
        fetch('/api/clientes')
          .then(res => res.json())
          .then(data => {
            const clienteAtual = data.clientes?.find((c: any) => c.email === user.email);
            if (clienteAtual) {
              setComentariosDisponiveis(clienteAtual.comentarios || 0);
            } else {
              // Fallback para localStorage se não encontrar na API
              const clientes = JSON.parse(localStorage.getItem('admin_clientes') || '[]');
              const clienteLocal = clientes.find((c: any) => c.email === user.email);
              setComentariosDisponiveis(clienteLocal?.comentarios || 0);
            }
          })
          .catch(err => {
            console.error('Erro ao buscar comentários:', err);
            // Fallback para localStorage em caso de erro
            const clientes = JSON.parse(localStorage.getItem('admin_clientes') || '[]');
            const clienteLocal = clientes.find((c: any) => c.email === user.email);
            setComentariosDisponiveis(clienteLocal?.comentarios || 0);
          });
      } catch (error) {
        console.error('Erro ao processar dados do usuário:', error);
        setComentariosDisponiveis(0);
      }
    }
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    
    // Validação simples
    if(novaSenha && novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    if(novaSenha && novaSenha.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres!');
      return;
    }

    // Aqui você faria a chamada para API de atualização
    setSuccess(true);
    
    // Limpar campos de senha após sucesso
    setNovaSenha('');
    setConfirmarSenha('');
    
    setTimeout(() => setSuccess(false), 4000);
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <UserInfo>
            <WelcomeText>Olá, {nome}!</WelcomeText>
            <CommentsInfo>
              <span>Comentários disponíveis:</span>
              <span className="count">{comentariosDisponiveis}</span>
            </CommentsInfo>
          </UserInfo>
        </HeaderContent>
      </Header>

      <UserMenu active="dashboard" />

      <MainWrapper>
        <PageTitle>✏️ Editar Perfil</PageTitle>
        
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Nome completo</Label>
              <Input 
                type="text"
                value={nome} 
                onChange={e => setNome(e.target.value)} 
                placeholder="Digite seu nome completo"
                required 
              />
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input 
                type="email"
                value={email} 
                disabled 
                placeholder="Email não pode ser alterado"
              />
              <InfoText>
                Por motivos de segurança, o email não pode ser alterado
              </InfoText>
            </FormGroup>

            <FormGroup>
              <Label>Nova senha</Label>
              <Input 
                type="password" 
                value={novaSenha} 
                onChange={e => setNovaSenha(e.target.value)} 
                placeholder="Digite sua nova senha (opcional)"
              />
            </FormGroup>

            <FormGroup>
              <Label>Confirmar nova senha</Label>
              <Input 
                type="password" 
                value={confirmarSenha} 
                onChange={e => setConfirmarSenha(e.target.value)} 
                placeholder="Confirme sua nova senha"
              />
            </FormGroup>

            {success && (
              <Success>
                ✅ Perfil atualizado com sucesso!
              </Success>
            )}

            <Button type="submit">
              💾 Salvar Alterações
            </Button>

            <InfoText>
              Deixe os campos de senha em branco se não quiser alterá-la
            </InfoText>
          </Form>
        </FormContainer>
      </MainWrapper>
    </Container>
  );
}
