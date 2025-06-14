
import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
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

const LogoutButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: transparent;
  border: 1px solid #ff4757;
  color: #ff4757;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff4757;
    color: #ffffff;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;

const MainWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StatusCard = styled.div`
  background: rgba(26, 29, 33, 0.9);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  text-align: center;

  h3 {
    color: #00ff88;
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .status {
    color: #b8b8b8;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .comments-display {
    color: #00ff88;
    font-size: 2.5rem;
    font-weight: 800;
    margin: 1rem 0;
  }

  .subtitle {
    color: #b8b8b8;
    font-size: 0.9rem;
  }
`;

const FormContainer = styled.div`
  background: rgba(26, 29, 33, 0.9);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;

const SectionTitle = styled.h3`
  color: #00ff88;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const GenderButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const GenderButton = styled.button<{$active?: boolean}>`
  padding: 0.75rem;
  border: 1px solid ${props => props.$active ? '#00ff88' : 'rgba(255, 255, 255, 0.1)'};
  background: ${props => props.$active ? '#00ff88' : 'rgba(0, 0, 0, 0.3)'};
  color: ${props => props.$active ? '#0a0f0a' : '#ffffff'};
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${props => props.$active ? '#00e67a' : 'rgba(0, 255, 136, 0.1)'};
    border-color: #00ff88;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    color: #b8b8b8;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
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

  &::placeholder {
    color: #666;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.875rem;
  min-height: 120px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #ffffff;
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff88;
  }

  &::placeholder {
    color: #666;
  }
`;

const PreviewBox = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;

  h4 {
    color: #00ff88;
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  ul {
    margin: 0;
    padding-left: 1.2rem;
    color: #ffffff;
    font-size: 0.9rem;

    li {
      margin-bottom: 0.25rem;

      .number {
        color: #00ff88;
        font-weight: bold;
      }
    }
  }
`;

const ProgressBar = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  height: 8px;
  overflow: hidden;
  margin-top: 0.5rem;

  .fill {
    background: linear-gradient(90deg, #00ff88, #00e67a);
    height: 100%;
    border-radius: 6px;
    transition: width 0.3s ease;
  }
`;

const SubmitButton = styled.button`
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
`;

const AlertMessage = styled.div<{$type?: 'success' | 'warning' | 'error'}>`
  background: ${props => {
    switch(props.$type) {
      case 'success': return 'rgba(0, 255, 136, 0.1)';
      case 'warning': return 'rgba(255, 193, 7, 0.1)';
      case 'error': return 'rgba(255, 71, 87, 0.1)';
      default: return 'rgba(0, 255, 136, 0.1)';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$type) {
      case 'success': return 'rgba(0, 255, 136, 0.3)';
      case 'warning': return 'rgba(255, 193, 7, 0.3)';
      case 'error': return 'rgba(255, 71, 87, 0.3)';
      default: return 'rgba(0, 255, 136, 0.3)';
    }
  }};
  color: ${props => {
    switch(props.$type) {
      case 'success': return '#00ff88';
      case 'warning': return '#ffc107';
      case 'error': return '#ff4757';
      default: return '#00ff88';
    }
  }};
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
  font-weight: 600;
`;

const WarningText = styled.div`
  color: #ffc107;
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

export default function Dashboard() {
  // Estados para interface e feedback
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('Pedido realizado com sucesso');
  // Dados reais do localStorage
  const [user, setUser] = useState<any>(null);
  const [comentarios, setComentarios] = useState(0);
  const [ordens, setOrdens] = useState<any[]>([]);
  const [planos, setPlanos] = useState<any[]>([]);

  // Buscar planos do backend centralizado
  async function fetchPlanos() {
    try {
      console.log('[DASHBOARD] Iniciando busca de planos...');
      const resp = await fetch('/api/planos');
      const data = await resp.json();
      
      // Executar script de sincronização se disponível
      if (data.syncScript && typeof window !== 'undefined') {
        try {
          console.log('[DASHBOARD] Executando script de sincronização');
          // eslint-disable-next-line no-eval
          eval(data.syncScript);
        } catch (e) {
          console.error('[DASHBOARD] Erro ao executar script de sincronização:', e);
        }
      }
      
      if (data.planos && data.planos.length > 0) {
        console.log('[DASHBOARD] Planos recebidos da API:', data.planos);
        setPlanos(data.planos);
      } else {
        console.log('[DASHBOARD] Nenhum plano recebido da API, verificando localStorage...');
        // Fallback para localStorage se a API não retornar planos
        if (typeof window !== 'undefined') {
          const planosStorage = JSON.parse(localStorage.getItem('admin_planos') || '[]');
          if (planosStorage.length > 0) {
            console.log('[DASHBOARD] Planos encontrados no localStorage:', planosStorage);
            setPlanos(planosStorage);
          } else {
            console.log('[DASHBOARD] Nenhum plano encontrado no localStorage');
            setPlanos([]);
          }
        }
      }
    } catch (err) {
      console.error('[DASHBOARD] Erro ao buscar planos da API:', err);
      // Fallback para localStorage em caso de erro
      if (typeof window !== 'undefined') {
        const planosStorage = JSON.parse(localStorage.getItem('admin_planos') || '[]');
        if (planosStorage.length > 0) {
          console.log('[DASHBOARD] Usando planos do localStorage após erro:', planosStorage);
          setPlanos(planosStorage);
        } else {
          console.log('[DASHBOARD] Nenhum plano encontrado no localStorage após erro');
          setPlanos([]);
        }
      } else {
        setPlanos([]);
      }
    }
  }

  React.useEffect(() => {
    fetchPlanos();
    // Opcional: atualizar a cada 30 segundos
    const interval = setInterval(fetchPlanos, 30000);
    return () => clearInterval(interval);
  }, []);
  const [link, setLink] = useState('');
  const [comentariosEnvio, setComentariosEnvio] = useState('');
  const [generoComentario, setGeneroComentario] = useState('misto');

  // Botões de seleção de gênero
  const generos = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Aleatório', value: 'misto' }
  ];
  const [linkInvalido, setLinkInvalido] = useState(false);
  const [perfilPrivado, setPerfilPrivado] = useState(false);
  const [atualizandoStatus, setAtualizandoStatus] = useState(false);

  // Função para verificar status dos pedidos
  async function verificarStatusPedidos() {
    if (atualizandoStatus) return; // Evita múltiplas requisições simultâneas
    
    try {
      setAtualizandoStatus(true);
      console.log('Verificando status dos pedidos...');
      
      // Buscar status atualizado dos pedidos com timestamp para evitar cache
      const timestamp = Date.now();
      const resposta = await fetch(`/api/status-pedidos?t=${timestamp}`);
      
      if (!resposta.ok) {
        console.error('Erro ao buscar status dos pedidos');
        return;
      }
      
      const { pendentes, processados } = await resposta.json();
      console.log('Pedidos pendentes:', pendentes.length);
      console.log('Pedidos processados:', processados.length);
      
      // Se temos ordens na interface
      if (ordens.length > 0) {
        console.log('Ordens atuais na interface:', ordens);
        let algumPedidoAtualizado = false;
        const ordensAtualizadas = [...ordens];
        
        // Verificar pedidos processados explicitamente
        // Esta parte é crucial para identificar pedidos que já foram processados pelo bot
        processados.forEach((pedidoProcessado: any) => {
          // Procurar o pedido com correspondência de ID OU link
          const idx = ordensAtualizadas.findIndex((ordem: any) => {
            // Primeiro tentar encontrar por ID (mais preciso)
            if (pedidoProcessado.id && ordem.id) {
              return pedidoProcessado.id === ordem.id;
            }
            // Se não tiver ID, usar o link como fallback
            return ordem.link === pedidoProcessado.link;
          });
          
          // Se encontramos o pedido E ele está em processamento OU pendente E o processado está concluído
          if (idx !== -1 && 
              (ordensAtualizadas[idx].status === 'processando' || ordensAtualizadas[idx].status === 'pendente') && 
              pedidoProcessado.status === 'concluido') {
            
            console.log(`Pedido para ${pedidoProcessado.link} encontrado como CONCLUÍDO, atualizando status`);
            // Atualizar status na interface
            ordensAtualizadas[idx].status = 'concluido';
            algumPedidoAtualizado = true;
            
            // Mostrar mensagem de sucesso
            setSuccessMsg(`Pedido de comentários concluído para o link ${pedidoProcessado.link}`);
            setShowSuccess(true);
          }
        });
        
        // Depois verificar pedidos em processamento que não estão mais na lista de pendentes
        // Isso é uma verificação adicional para casos onde o pedido saiu da lista de pendentes
        // mas não apareceu na lista de processados
        ordensAtualizadas.forEach((ordem, idx) => {
          if (ordem.status === 'processando') {
            // Aqui apenas lógica de atualização, sem JSX
          }
        });
        
        // Apenas atualizar se houve mudanças
        if (algumPedidoAtualizado) {
          console.log('Atualizando ordens com novos status:', ordensAtualizadas);
          
          // Atualizar no localStorage
          if (typeof window !== 'undefined') {
            const pedidosStorage = JSON.parse(localStorage.getItem('admin_pedidos') || '[]');
            
            // Atualizar status no localStorage para todos os pedidos atualizados
            // Buscar por ID primeiro e depois por link para maior precisão
            ordensAtualizadas.forEach((ordem: any) => {
              const idxStorage = pedidosStorage.findIndex((p: any) => {
                if (ordem.id && p.id) {
                  return p.id === ordem.id;
                }
                return p.link === ordem.link;
              });
              
              if (idxStorage !== -1 && pedidosStorage[idxStorage].status !== ordem.status) {
                console.log(`Atualizando status no localStorage para ${ordem.id || ordem.link}: ${pedidosStorage[idxStorage].status} -> ${ordem.status}`);
                pedidosStorage[idxStorage].status = ordem.status;
              }
            });
            
            // Salvar as mudanças no localStorage
            localStorage.setItem('admin_pedidos', JSON.stringify(pedidosStorage));
          }
        }
        
        // Atualizar estado na interface
        setOrdens(ordensAtualizadas);
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
    } finally {
      setAtualizandoStatus(false);
    }
  }
  
  // Função para buscar pedidos do backend e sincronizar status para o usuário logado
  async function fetchPedidosUsuario() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || 'null');
    if (!usuarioLogado) {
      setOrdens([]);
      return;
    }
    try {
      const resp = await fetch('/api/status-pedidos');
      const data = await resp.json();
      // Filtrar apenas os pedidos do usuário logado
      const pedidosUsuario = [...(data.pendentes || []), ...(data.processados || [])].filter((p:any) => p.cliente === usuarioLogado.nome || p.email === usuarioLogado.email);
      setOrdens(pedidosUsuario);
      // Atualizar localStorage para manter compatibilidade com lógicas antigas
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_pedidos', JSON.stringify(pedidosUsuario));
      }
    } catch (err) {
      // fallback para localStorage
      const pedidos = JSON.parse(localStorage.getItem('admin_pedidos') || '[]');
      setOrdens(pedidos.filter((p:any) => p.cliente === usuarioLogado.nome));
    }
  }

  // Função para carregar os dados do localStorage
  async function loadUserData() {
    // Busca o usuário logado corretamente
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || 'null');
    if (!usuarioLogado) {
      setUser(null);
      setComentarios(0);
      setOrdens([]);
      setPlanos([]);
      return;
    }
    // Buscar o usuário atualizado na lista de clientes da API
    try {
      const resp = await fetch('/api/clientes');
      const data = await resp.json();
      const usuarioAtualizado = data.clientes.find((c:any) => c.email === usuarioLogado.email) || usuarioLogado;
      setUser(usuarioAtualizado);
      setComentarios(usuarioAtualizado.comentarios || 0);
    } catch (err) {
      // fallback para localStorage, se a API falhar
      const clientes = JSON.parse(localStorage.getItem('admin_clientes') || '[]');
      const usuarioAtualizado = clientes.find((c:any) => c.email === usuarioLogado.email) || usuarioLogado;
      setUser(usuarioAtualizado);
      setComentarios(usuarioAtualizado.comentarios || 0);
    }
    // Não atualizar ordens aqui, pois será feito por fetchPedidosUsuario
  }

  useEffect(() => {
    loadUserData();
    fetchPedidosUsuario(); // Buscar pedidos do backend ao abrir o dashboard

    // Verificar status inicial
    verificarStatusPedidos();
    
    // Verificar com mais frequência para manter a fila fluindo
    const intervalId = setInterval(() => {
      verificarStatusPedidos();
      fetchPedidosUsuario(); // Sincronizar com backend a cada ciclo
    }, 5000);
    
    if (typeof window !== 'undefined') {
      // Listener para sincronizar em tempo real
      const onStorage = (e: StorageEvent) => {
        if (["admin_clientes", "admin_pedidos", "admin_planos", "usuario_logado"].includes(e.key || "")) {
          loadUserData();
          fetchPedidosUsuario();
        }
      };
      window.addEventListener('storage', onStorage);
      
      // Listener para recarregar ao focar/voltar para a aba
      const onVisibility = () => {
        if (document.visibilityState === 'visible') {
          loadUserData();
          fetchPedidosUsuario();
          verificarStatusPedidos(); // Também verificar status quando a aba receber foco
        }
      };
      document.addEventListener('visibilitychange', onVisibility);
      
      // Limpar todos os event listeners e intervalos quando o componente for desmontado
      return () => {
        clearInterval(intervalId);
        window.removeEventListener('storage', onStorage);
        document.removeEventListener('visibilitychange', onVisibility);
      };
    } else {
      // Se window não estiver definido, apenas limpar o intervalo
      return () => clearInterval(intervalId);
    }
  }, []);

  if (user === null) {
    // Nenhum usuário encontrado
    return (
      <Container>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          color: '#00ff88'
        }}>
          <h2>Nenhum usuário encontrado</h2>
          <p style={{color: '#b8b8b8', margin: '1rem 0'}}>
            Você precisa estar logado para acessar o dashboard
          </p>
          <a 
            href="/login" 
            style={{
              color: '#00ff88',
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              border: '1px solid #00ff88',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}
          >
            Fazer Login
          </a>
        </div>
      </Container>
    );
  }

  // Função renderPlanos removida - os planos agora são exibidos apenas na página de planos
  function isInstagramPostLink(url: string) {
    // Aceita posts, reels, tv e vídeo do Instagram
    const regex = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[\w\-]+/i;
    return regex.test(url.trim());
  }

  async function enviarComentarios(e: any) {
    e.preventDefault();
    if (!isInstagramPostLink(link)) {
      setLinkInvalido(true);
      return;
    }
    setLinkInvalido(false);
    
    // Obter lista de comentários
    const linhas = comentariosEnvio.split('\n').filter(Boolean);
    if (linhas.length > comentarios) {
      alert('Você não tem comentários suficientes. Compre um novo pacote!');
      return;
    }
    
    // Criar o pedido
    const novoSaldo = comentarios - linhas.length;
    const novaOrdem = { 
      link, 
      enviados: linhas.length, 
      status: 'processando', 
      cliente: user?.nome,
      email: user?.email, 
      data: new Date().toLocaleString() 
    };
    
    try {
      // Enviar para a API de comentários
      setShowSuccess(true); // Mostrar mensagem de "processando"
      
      // Enviar pedido para o bot
      const resposta = await fetch('/api/comentarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          link,
          comentarios: linhas,
          cliente: user?.nome,
          email: user?.email,
          generoComentario
        })
      });
      
      const resultado = await resposta.json();
      
      if (!resposta.ok) {
        throw new Error(resultado.error || 'Erro ao enviar comentários');
      }
      
      console.log('Comentários enviados para processamento:', resultado);
      
      // Atualizar saldo no localStorage (usuario_logado e admin_clientes)
      if (typeof window !== 'undefined' && user) {
        // Atualiza usuario_logado
        const usuarioLogado = { ...user, comentarios: novoSaldo };
        localStorage.setItem('usuario_logado', JSON.stringify(usuarioLogado));
        // Atualiza na lista de clientes
        const clientes = JSON.parse(localStorage.getItem('admin_clientes') || '[]');
        const idx = clientes.findIndex((c:any) => c.email === user.email);
        if (idx !== -1) {
          clientes[idx].comentarios = novoSaldo;
          localStorage.setItem('admin_clientes', JSON.stringify(clientes));
        }
      }
      
      // Atualizar interface
      setComentarios(novoSaldo);
      const novasOrdens = [...ordens, novaOrdem];
      setOrdens(novasOrdens);
      
      // Salvar o pedido com seu ID para referência futura
      const pedidoComId = {
        ...novaOrdem,
        pedido_id: resultado.pedido_id
      };
      
      // Atualiza no localStorage para persistir o status
      if (typeof window !== 'undefined') {
        const pedidos = JSON.parse(localStorage.getItem('admin_pedidos') || '[]');
        pedidos.push(pedidoComId);
        localStorage.setItem('admin_pedidos', JSON.stringify(pedidos));
      }
      
      // Configurar uma verificação imediata do status após alguns segundos
      setTimeout(() => {
        verificarStatusPedidos();
      }, 2000);
      
      // Configurar verificações adicionais em intervalos mais frequentes por um curto período
      const checkInterval = setInterval(() => {
        verificarStatusPedidos();
      }, 5000); // Verificar a cada 5 segundos
      
      // Limpar o intervalo após 2 minutos (quando provavelmente já terá sido processado)
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 120000);
      
      // Limpar campos
      setLink('');
      setComentariosEnvio('');
      
      // Mostrar mensagem de sucesso
      setSuccessMsg('Comentários enviados com sucesso! O bot está processando seu pedido.');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error: any) {
      console.error('Erro ao enviar comentários:', error);
      alert(`Erro ao enviar comentários: ${error.message}`);
      setShowSuccess(false);
    }
  }

  const comentariosDigitados = comentariosEnvio.split('\n').filter(Boolean);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <UserInfo>
            <WelcomeText>Olá, {user.nome}!</WelcomeText>
            <CommentsInfo>
              <span>Comentários disponíveis:</span>
              <span className="count">{comentarios}</span>
            </CommentsInfo>
          </UserInfo>
          <LogoutButton
            onClick={() => {
              localStorage.removeItem('usuario_logado');
              window.location.href = '/login';
            }}
          >
            Sair
          </LogoutButton>
        </HeaderContent>
      </Header>

      <UserMenu active="dashboard" />

      <MainWrapper>
        <StatusCard>
          <h3>Status da Conta</h3>
          <div className="status">Status: <strong style={{color: '#00ff88'}}>Conectado</strong></div>
          <div className="comments-display">{comentarios}</div>
          <div className="subtitle">comentários disponíveis para uso</div>
        </StatusCard>

        <FormContainer>
          <SectionTitle>Enviar Comentários</SectionTitle>
          
          <form onSubmit={enviarComentarios}>
            <FormGroup>
              <label>Tipo de Comentário</label>
              <GenderButtons>
                {generos.map(g => (
                  <GenderButton
                    key={g.value}
                    type="button"
                    $active={generoComentario === g.value}
                    onClick={() => setGeneroComentario(g.value)}
                  >
                    {g.label}
                  </GenderButton>
                ))}
              </GenderButtons>
            </FormGroup>

            <FormGroup>
              <label>Link do Post do Instagram</label>
              <Input 
                placeholder="Cole o link do post, reel ou IGTV" 
                value={link} 
                onChange={async e => {
                  const val = e.target.value;
                  setLink(val);
                  setLinkInvalido(false);
                  setPerfilPrivado(false);
                  // Verificação automática se o perfil é privado
                  if (/^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\//i.test(val.trim())) {
                    try {
                      const resp = await fetch(val, { mode: 'cors' });
                      const html = await resp.text();
                      if (html.includes('Esta publicação é de uma conta privada') || html.includes('This post is from a private account') || html.includes('Esta Página Não Está Disponível') || html.includes('This page isn\'t available')) {
                        setPerfilPrivado(true);
                      } else {
                        setPerfilPrivado(false);
                      }
                    } catch (err) {
                      setPerfilPrivado(false); // Não conseguiu verificar
                    }
                  }
                }} 
                required 
              />
              {linkInvalido && (
                <AlertMessage $type="error">
                  Link inválido! Insira um link de post, reel ou IGTV do Instagram.
                </AlertMessage>
              )}
              {perfilPrivado && (
                <AlertMessage $type="error">
                  NÃO FUNCIONA EM PERFIL PRIVADO
                </AlertMessage>
              )}
            </FormGroup>

            <FormGroup>
              <label>Comentários (um por linha)</label>
              <Textarea 
                placeholder="Digite os comentários, um por linha..." 
                value={comentariosEnvio} 
                onChange={e => setComentariosEnvio(e.target.value)} 
                required 
              />
            </FormGroup>

            {comentariosDigitados.length > 0 && (
              <PreviewBox>
                <h4>Pré-visualização dos comentários:</h4>
                <ul>
                  {comentariosDigitados.map((coment, idx) => (
                    <li key={idx}>
                      <span className="number">{idx+1}.</span> {coment}
                    </li>
                  ))}
                </ul>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem'}}>
                  <span style={{color: '#00ff88', fontWeight: 'bold'}}>
                    {comentariosDigitados.length} comentário(s) digitado(s)
                  </span>
                  <ProgressBar>
                    <div 
                      className="fill" 
                      style={{width: `${Math.min(comentariosDigitados.length / 20 * 100, 100)}%`}}
                    />
                  </ProgressBar>
                </div>
              </PreviewBox>
            )}

            <SubmitButton type="submit">
              Enviar Comentários
            </SubmitButton>

            <WarningText>
              ⚠️ NÃO FUNCIONA EM PERFIL PRIVADO
            </WarningText>
          </form>
        </FormContainer>

        {showSuccess && (
          <AlertMessage $type="success">
            {successMsg}
          </AlertMessage>
        )}
      </MainWrapper>
    </Container>
  );
}
