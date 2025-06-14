import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Container = styled.div`
  min-height: 100vh;
  background: #0a0b0d;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  background: rgba(10, 11, 13, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;

  span {
    color: #00ff88;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const HeaderBtn = styled.button`
  padding: 0.5rem 1.5rem;
  border: 1px solid #00ff88;
  background: ${props => props.$primary ? '#00ff88' : 'transparent'};
  color: ${props => props.$primary ? '#0a0f0a' : '#00ff88'};
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$primary ? '#00e67a' : '#00ff8820'};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;

const MainWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const MainSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 4rem 0;
  align-items: center;
  min-height: 70vh;

  @media (min-width: 968px) {
    grid-template-columns: 1fr 480px;
  }
`;

const MainContent = styled.div`
  text-align: center;
  
  @media (min-width: 968px) {
    text-align: center;
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;

    span {
      color: #00ff88;
    }

    @media (min-width: 768px) {
      font-size: 4rem;
    }

    @media (max-width: 480px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: #b8b8b8;
    line-height: 1.6;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 3rem auto;
  max-width: 400px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: #e0e0e0;
  font-size: 1.1rem;

  &::before {
    content: '✓';
    color: #00ff88;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
  color: #888;
  align-items: center;

  @media (min-width: 480px) {
    flex-direction: row;
    gap: 3rem;
    justify-content: center;
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #00ff88;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #00e67a;
      transform: translateY(-1px);
    }

    &.instagram::before {
      content: '📱';
    }

    &.whatsapp::before {
      content: '📞';
    }
  }
`;

const LoginCard = styled.div`
  background: rgba(26, 29, 33, 0.9);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 480px;
  margin: 0 auto;

  @media (min-width: 968px) {
    margin: 0;
    max-width: none;
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h3 {
    color: #00ff88;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #b8b8b8;
    font-size: 0.9rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 0.25rem;
`;

const Tab = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: ${props => props.$active ? '#00ff88' : 'transparent'};
  color: ${props => props.$active ? '#0a0f0a' : '#ffffff'};
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    color: #b8b8b8;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
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

    &::placeholder {
      color: #666;
    }
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;

  input[type="checkbox"] {
    width: auto;
  }

  label {
    font-size: 0.85rem;
    color: #b8b8b8;
    margin: 0;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 0.875rem;
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
`;

const CtaSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: rgba(16, 18, 20, 0.8);

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;

    span {
      color: #00ff88;
    }

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    color: #b8b8b8;
    margin-bottom: 2rem;
    font-size: 1rem;

    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const UrlInput = styled.div`
  max-width: 600px;
  margin: 0 auto 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  input {
    flex: 1;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    color: #ffffff;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #00ff88;
    }

    &::placeholder {
      color: #666;
    }
  }

  button {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #00ff88, #00e67a);
    color: #0a0f0a;
    border: none;
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
    }
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }

  span {
    color: #00ff88;
    font-size: 0.9rem;

    &::before {
      content: '✓';
      margin-right: 0.5rem;
    }
  }
`;

const FeaturesGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 4rem 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const FeatureCard = styled.div`
  background: rgba(26, 29, 33, 0.8);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(26, 29, 33, 0.95);
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.1);
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: #00ff88;
    margin-bottom: 1rem;
  }

  p {
    color: #b8b8b8;
    line-height: 1.6;
  }
`;

const TestimonialSection = styled.section`
  background: rgba(16, 18, 20, 0.9);
  padding: 4rem 0;
  text-align: center;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    color: #b8b8b8;
    margin-bottom: 2rem;
  }

  button {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #00ff88, #00e67a);
    color: #0a0b0d;
    border: none;
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
    }
  }
`;

const Footer = styled.footer`
  background: rgba(16, 18, 20, 0.95);
  padding: 3rem 0 2rem 0;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;

    @media (min-width: 768px) {
      grid-template-columns: 2fr 1fr;
      text-align: left;
    }
  }

  .footer-left {
    h4 {
      color: #00ff88;
      margin-bottom: 1rem;
    }

    p {
      color: #b8b8b8;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .contact {
      color: #888;
      font-size: 0.9rem;
    }
  }

  .footer-right {
    .contact-info {
      color: #b8b8b8;

      div {
        margin-bottom: 0.5rem;
      }

      a {
        color: #00ff88;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #00e67a;
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 2rem;
    padding-top: 1rem;
    text-align: center;
    color: #666;
    font-size: 0.9rem;
  }
`;

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: rgba(26, 29, 33, 0.95);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 450px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-50px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #b8b8b8;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #00ff88;
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

export default function Home() {
  const [activeTab, setActiveTab] = useState('login');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    senha: '',
    saveLogin: false
  });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    if (activeTab === 'cadastro') {
      // Cadastro
      if (!formData.nome || !formData.email || !formData.whatsapp || !formData.senha) {
        setErro('Preencha todos os campos!');
        setLoading(false);
        return;
      }
      try {
        const resp = await fetch('/api/clientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
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
          localStorage.setItem('admin_clientes', JSON.stringify(lista.clientes || []));
          localStorage.setItem('usuario_logado', JSON.stringify(data.cliente));
        }
        router.push('/dashboard');
      } catch (err) {
        setErro('Erro de conexão. Tente novamente.');
        setLoading(false);
      }
    } else {
      // Login
      if (!formData.email || !formData.senha) {
        setErro('Preencha e-mail e senha!');
        setLoading(false);
        return;
      }
      try {
        const listaResp = await fetch('/api/clientes');
        const lista = await listaResp.json();
        const clientes = lista.clientes || [];
        const usuario = clientes.find((c) => c.email === formData.email && c.senha === formData.senha);
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
          localStorage.setItem('admin_clientes', JSON.stringify(clientes));
          localStorage.setItem('usuario_logado', JSON.stringify(usuario));
        }
        router.push('/dashboard');
      } catch (err) {
        setErro('Erro ao conectar. Tente novamente.');
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Header>
        <Logo>
          QUERO <span>ENGAJAR</span>
        </Logo>
        <HeaderButtons>
          <HeaderBtn onClick={() => {setActiveTab('login'); setErro(''); setShowModal(true);}}>
            LOGIN
          </HeaderBtn>
          <HeaderBtn $primary onClick={() => {setActiveTab('cadastro'); setErro(''); setShowModal(true);}}>
            CADASTRO
          </HeaderBtn>
        </HeaderButtons>
      </Header>

      <MainWrapper>
        <MainSection>
          <MainContent>
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
              <a href="https://www.instagram.com/agenciarecife_/" target="_blank" rel="noopener noreferrer" className="instagram">
                @agenciarecife_
              </a>
              <a href="https://wa.me/5581971196726" target="_blank" rel="noopener noreferrer" className="whatsapp">
                (81) 97119-6726
              </a>
            </ContactInfo>
          </MainContent>

          <LoginCard>
            <LoginHeader>
              <h3>QUERO ENGAJAR</h3>
              <p>Entre na sua conta ou cadastre-se para começar</p>
            </LoginHeader>

            <TabContainer>
              <Tab 
                $active={activeTab === 'login'} 
                onClick={() => {setActiveTab('login'); setErro('');}}
              >
                Login
              </Tab>
              <Tab 
                $active={activeTab === 'cadastro'} 
                onClick={() => {setActiveTab('cadastro'); setErro('');}}
              >
                Cadastro
              </Tab>
            </TabContainer>

            {erro && <ErrorMessage>{erro}</ErrorMessage>}

            <form onSubmit={handleSubmit}>
              {activeTab === 'cadastro' && (
                <FormGroup>
                  <label>Nome completo</label>
                  <input 
                    type="text" 
                    name="nome"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required 
                  />
                </FormGroup>
              )}

              <FormGroup>
                <label>E-mail</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Insira seu email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </FormGroup>

              {activeTab === 'cadastro' && (
                <FormGroup>
                  <label>WhatsApp</label>
                  <input 
                    type="text" 
                    name="whatsapp"
                    placeholder="(81) 99999-9999"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required 
                  />
                </FormGroup>
              )}

              <FormGroup>
                <label>Senha</label>
                <input 
                  type="password" 
                  name="senha"
                  placeholder="Sua senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  required 
                />
              </FormGroup>

              <CheckboxGroup>
                <input 
                  type="checkbox" 
                  id="saveLogin"
                  name="saveLogin"
                  checked={formData.saveLogin}
                  onChange={handleInputChange}
                />
                <label htmlFor="saveLogin">Salvar login</label>
              </CheckboxGroup>

              <SubmitBtn type="submit" disabled={loading}>
                {loading ? 'Carregando...' : (activeTab === 'cadastro' ? 'Cadastrar' : 'Entrar')}
              </SubmitBtn>
            </form>
          </LoginCard>
        </MainSection>

        <CtaSection>
          <h2>
            Pronto para <span>ENGAJAR AGORA?</span>
          </h2>
          <p>Cole o link do seu post do Instagram e receba comentários reais em segundos!</p>

          <UrlInput>
            <input placeholder="Link da Instagram Foto ou Vídeo" />
            <button onClick={() => {setActiveTab('cadastro'); setErro(''); setShowModal(true);}}>🔥 GERAR COMENTÁRIOS AGORA</button>
          </UrlInput>

          <Stats>
            <span>Funciona em Reels e Fotos</span>
            <span>Resultados em segundos</span>
            <span>100% automático</span>
          </Stats>
        </CtaSection>

        <FeaturesGrid>
          <FeatureCard>
            <div className="icon">💬</div>
            <h3>Comentários Reais</h3>
            <p>Comentários autênticos que parecem genuínos, aumentando seu engajamento de forma natural</p>
          </FeatureCard>

          <FeatureCard>
            <div className="icon">⚡</div>
            <h3>Super Rápido</h3>
            <p>Receba seus comentários em segundos. Sem demora, apenas resultados rápidos e eficazes</p>
          </FeatureCard>

          <FeatureCard>
            <div className="icon">📈</div>
            <h3>Mais Alcance</h3>
            <p>O algoritmo do Instagram favorece posts com mais comentários, aumentando seu alcance</p>
          </FeatureCard>
        </FeaturesGrid>

        <TestimonialSection>
          <h2>Milhares de influencers já usam nossa ferramenta!</h2>
          <p>Junte-se aos criadores de conteúdo que já turbinaram seu engajamento</p>
          <button onClick={() => {setActiveTab('cadastro'); setErro(''); setShowModal(true);}}>COMECE AGORA!</button>
        </TestimonialSection>
      </MainWrapper>

      <Footer>
        <div className="footer-content">
          <div className="footer-left">
            <h4>QUERO ENGAJAR</h4>
            <p>A ferramenta mais simples para turbinar seus comentários no Instagram</p>
            <div className="contact">
              Desenvolvido pela melhor agência de mercado
            </div>
          </div>

          <div className="footer-right">
            <div className="contact-info">
              <div>
                <a href="https://www.instagram.com/agenciarecife_/" target="_blank" rel="noopener noreferrer">
                  📱 @agenciarecife_
                </a>
              </div>
              <div>
                <a href="https://wa.me/5581971196726" target="_blank" rel="noopener noreferrer">
                  📞 (81) 97119-6726
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2024 QUERO ENGAJAR. Todos os direitos reservados.<br />
          Agência Recife - Líderes em Marketing Digital
        </div>
      </Footer>

      {showModal && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            
            <LoginHeader>
              <h3>QUERO ENGAJAR</h3>
              <p>{activeTab === 'cadastro' ? 'Realize seu cadastro para conseguir enviar comentários' : 'Faça seu login para conseguir enviar comentários'}</p>
            </LoginHeader>

            <TabContainer>
              <Tab 
                $active={activeTab === 'login'} 
                onClick={() => {setActiveTab('login'); setErro('');}}
              >
                Login
              </Tab>
              <Tab 
                $active={activeTab === 'cadastro'} 
                onClick={() => {setActiveTab('cadastro'); setErro('');}}
              >
                Cadastro
              </Tab>
            </TabContainer>

            {erro && <ErrorMessage>{erro}</ErrorMessage>}

            <form onSubmit={handleSubmit}>
              {activeTab === 'cadastro' && (
                <FormGroup>
                  <label>Nome completo</label>
                  <input 
                    type="text" 
                    name="nome"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required 
                  />
                </FormGroup>
              )}

              <FormGroup>
                <label>E-mail</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Insira seu email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </FormGroup>

              {activeTab === 'cadastro' && (
                <FormGroup>
                  <label>WhatsApp</label>
                  <input 
                    type="text" 
                    name="whatsapp"
                    placeholder="(81) 99999-9999"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required 
                  />
                </FormGroup>
              )}

              <FormGroup>
                <label>Senha</label>
                <input 
                  type="password" 
                  name="senha"
                  placeholder="Sua senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  required 
                />
              </FormGroup>

              <CheckboxGroup>
                <input 
                  type="checkbox" 
                  id="saveLogin"
                  name="saveLogin"
                  checked={formData.saveLogin}
                  onChange={handleInputChange}
                />
                <label htmlFor="saveLogin">Salvar login</label>
              </CheckboxGroup>

              <SubmitBtn type="submit" disabled={loading}>
                {loading ? 'Carregando...' : (activeTab === 'cadastro' ? 'Cadastrar' : 'Entrar')}
              </SubmitBtn>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

    </Container>
  );
}