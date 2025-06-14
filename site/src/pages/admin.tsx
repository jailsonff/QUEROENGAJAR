import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  padding: 8rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 6rem 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 5rem 0.25rem 1rem;
  }

  @keyframes popupSlideIn {
    from {
      opacity: 0;
      transform: translateY(-30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const Title = styled.h2`
  color: #00ff88;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Section = styled.div`
  background: rgba(10, 11, 13, 0.95);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  max-width: 1400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(0, 255, 136, 0.3);
  backdrop-filter: blur(15px);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, transparent 50%, rgba(0, 255, 136, 0.05) 100%);
    border-radius: 16px;
    pointer-events: none;
  }

  @media (max-width: 1200px) {
    max-width: 100%;
    margin: 0 1rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 0.5rem 1.5rem;
    border-radius: 12px;

    &::before {
      border-radius: 12px;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin: 0 0.25rem 1rem;
    border-radius: 8px;

    &::before {
      border-radius: 8px;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background: #000000;
  color: #ffffff;
  border-radius: 16px;
  margin-top: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border-collapse: collapse;
  overflow: hidden;
  border: 2px solid rgba(0, 255, 136, 0.2);

  th, td {
    padding: 1.2rem 0.75rem;
    text-align: center;
    vertical-align: middle;
    border-bottom: 1px solid rgba(0, 255, 136, 0.15);
    word-wrap: break-word;
    min-width: 0;
  }

  th {
    background: linear-gradient(135deg, #00ff88 0%, #00e67a 100%);
    color: #000000;
    font-weight: 800;
    text-align: center;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    text-shadow: none;
    position: relative;
    white-space: nowrap;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #00ff88, #00e67a, #00ff88);
    }
  }

  tbody tr {
    transition: all 0.3s ease;
    background: rgba(10, 11, 13, 0.5);

    &:nth-child(even) {
      background: rgba(0, 255, 136, 0.02);
    }

    &:hover {
      background: rgba(0, 255, 136, 0.08);
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 255, 136, 0.1);
    }
  }

  @media (max-width: 1024px) {
    font-size: 0.9rem;

    th, td {
      padding: 1rem 0.6rem;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    display: block;
    overflow-x: auto;
    white-space: nowrap;

    th, td {
      padding: 0.8rem 0.4rem;
      min-width: 110px;
    }

    th:first-child, td:first-child {
      min-width: 130px;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;

    th, td {
      padding: 0.6rem 0.25rem;
      min-width: 90px;
    }

    th:first-child, td:first-child {
      min-width: 110px;
    }

    th {
      font-size: 0.7rem;
      letter-spacing: 0.3px;
    }
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.6rem;
  background: linear-gradient(135deg, #00ff88 0%, #00e67a 100%);
  color: #000000;
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 800;
  margin: 0.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  box-shadow: 0 6px 20px rgba(0, 255, 136, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, #00e67a 0%, #00cc6a 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.5);
    border-color: rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.85rem;
    margin: 0.25rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    margin: 0.2rem;
  }
`;

import AdminMenu from '../components/AdminMenu';

// Interfaces para tipagem
interface Plano {
  nome: string;
  quantidade: number;
  preco: number;
  descricao?: string;
  id?: string;
}

const CLIENTES_KEY = 'admin_clientes';
const PEDIDOS_KEY = 'admin_pedidos';
const PACOTES_KEY = 'admin_pacotes';
const PLANOS_KEY = 'admin_planos';

const mockClientes = [
  { nome: 'João', email: 'joao@email.com', whatsapp: '11999999999', senha: 'senha123', status: 'ativo', comentarios: 20, admin: true, simultaneos: 1 },
  { nome: 'Maria', email: 'maria@email.com', whatsapp: '11888888888', senha: 'senha456', status: 'bloqueado', comentarios: 10, admin: false, simultaneos: 1 },
];

interface Pedido {
  id?: string;
  cliente: string;
  link: string;
  enviados: number;
  status?: string;
  comentarios?: string[];
  data_criacao?: string;
  data_processamento?: string;
  visualId?: number;
}

const mockPedidos: Pedido[] = [
  { cliente: 'Ricardo', link: 'https://instagram.com/p/abc123', enviados: 30, status: 'concluido' },
  { cliente: 'Maria', link: 'https://instagram.com/p/xyz789', enviados: 10, status: 'processando' }
];

const mockPacotes = [
  { cliente: 'Ricardo', pacote: '100', status: 'liberado' },
  { cliente: 'Maria', pacote: '50', status: 'aguardando' }
];

export default function Admin() {
  async function handleDeleteUser(idx:number) {
    if(window.confirm('Tem certeza que deseja excluir este usuário?')){
      const email = clientes[idx].email;
      try {
        const resp = await fetch('/api/clientes', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await resp.json();
        if (resp.ok && data.success) {
          await fetchClientes();
          setMsg('Usuário excluído!');
          setTimeout(()=>setMsg(''), 1500);
        } else {
          setMsg(data.error || 'Erro ao excluir usuário!');
          setTimeout(()=>setMsg(''), 2500);
        }
      } catch (err) {
        setMsg('Erro ao excluir usuário!');
        setTimeout(()=>setMsg(''), 2500);
      }
    }
  }

  const [clientes, setClientes] = useState(mockClientes);
  const [pedidos, setPedidos] = useState(mockPedidos);
  const [pacotes, setPacotes] = useState(mockPacotes);

  async function fetchPedidosAdmin() {
    try {
      const resp = await fetch('/api/status-pedidos');
      const data = await resp.json();
      const todosPedidos = [...(data.pendentes || []), ...(data.processados || [])];
      const pedidosUnicos = todosPedidos.filter((pedido, idx, arr) => {
        if (pedido.id) {
          return arr.findIndex(p => p.id === pedido.id) === idx;
        } else {
          return arr.findIndex(p => p.link === pedido.link) === idx;
        }
      });
      setPedidos(pedidosUnicos);
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_pedidos', JSON.stringify(pedidosUnicos));
      }
    } catch (err) {
      if (typeof window !== 'undefined') {
        const localPedidos = localStorage.getItem('admin_pedidos');
        if (localPedidos) setPedidos(JSON.parse(localPedidos));
      }
    }
  }

  async function handleDeletePedido(idx:number) {
    if(window.confirm('Tem certeza que deseja deletar este pedido?')){
      const pedido = pedidos[idx];
      let tipo: 'pendente' | 'processado' = 'pendente';
      if (pedido.status === 'concluido' || pedido.status === 'falha' || pedido.success === true || pedido.success === false) {
        tipo = 'processado';
      }
      try {
        const resp = await fetch('/api/pedidos', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: pedido.id, link: pedido.link, tipo })
        });
        let pedidosLocal = JSON.parse(localStorage.getItem('admin_pedidos') || '[]');
        pedidosLocal = pedidosLocal.filter((p:any) => (p.id && p.id !== pedido.id) || (!p.id && p.link !== pedido.link));
        localStorage.setItem('admin_pedidos', JSON.stringify(pedidosLocal));
        setPedidos(pedidos.filter((p, i) => i !== idx));
      } catch (err) {
        alert('Erro ao deletar pedido!');
      }
    }
  }

  async function handleEditPedido(idx:number, novoPedido:any) {
    const pedido = pedidos[idx];
    let tipo: 'pendente' | 'processado' = 'pendente';
    if (pedido.status === 'concluido' || pedido.status === 'falha' || pedido.success === true || pedido.success === false) {
      tipo = 'processado';
    }
    try {
      await fetch('/api/pedidos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pedido.id, link: pedido.link, tipo, ...novoPedido })
      });
      let pedidosLocal = JSON.parse(localStorage.getItem('admin_pedidos') || '[]');
      pedidosLocal = pedidosLocal.map((p:any) => ((p.id && p.id === pedido.id) || (!p.id && p.link === pedido.link)) ? { ...p, ...novoPedido } : p);
      localStorage.setItem('admin_pedidos', JSON.stringify(pedidosLocal));
      setPedidos(pedidos.map((p, i) => i === idx ? { ...p, ...novoPedido } : p));
    } catch (err) {
      alert('Erro ao editar pedido!');
    }
  }

  const [planos, setPlanos] = useState<any[]>([]);
  const [clientesLoaded, setClientesLoaded] = useState(false);

  const verificarStatusPedidos = async () => {
    try {
      console.log('Verificando status dos pedidos na área administrativa...');
      const timestamp = Date.now();
      const resposta = await fetch(`/api/status-pedidos?t=${timestamp}`);

      if (!resposta.ok) {
        console.error('Erro ao buscar status dos pedidos');
        return;
      }

      const { pendentes, processados } = await resposta.json();
      console.log('Pedidos pendentes:', pendentes.length);
      console.log('Pedidos processados:', processados.length);

      if (typeof window !== 'undefined') {
        const localPedidos = JSON.parse(localStorage.getItem(PEDIDOS_KEY) || '[]');
        let pedidosAtualizados = [...localPedidos];
        let houveAlteracao = false;

        console.log('Verificando pedidos processados:', processados.length, 'pendentes:', pendentes.length);

        interface PedidoProcessado {
          id?: string; 
          link: string; 
          status?: string; 
          success?: boolean; 
          mensagem?: string; 
          message?: string;
          cliente?: string;
          comentarios?: string[];
        }

        processados.forEach((pedidoProcessado: PedidoProcessado) => {
          const idx = pedidosAtualizados.findIndex(p => 
            (pedidoProcessado.id && p.id && pedidoProcessado.id === p.id) || 
            pedidoProcessado.link === p.link
          );

          const pedidoConcluido = 
            pedidoProcessado.status === 'concluido' || 
            pedidoProcessado.success === true ||
            (pedidoProcessado.mensagem && (
              pedidoProcessado.mensagem.includes('sucesso') ||
              (pedidoProcessado.mensagem.includes('Todos os') && pedidoProcessado.mensagem.includes('comentários'))
            )) ||
            (pedidoProcessado.message && (
              pedidoProcessado.message.includes('sucesso') ||
              (pedidoProcessado.message.includes('Todos os') && pedidoProcessado.message.includes('comentários'))
            ));

          if (pedidoProcessado.status === 'concluido') {
            if (idx !== -1 && pedidosAtualizados[idx].status !== 'concluido') {
              pedidosAtualizados[idx].status = 'concluido';
              houveAlteracao = true;
            }
          }

          if (idx !== -1) {
            if (pedidosAtualizados[idx].status !== 'concluido' && pedidoConcluido) {
              console.log(`Atualizando pedido ${pedidoProcessado.id || pedidoProcessado.link} para concluído`);
              pedidosAtualizados[idx].status = 'concluido';
              houveAlteracao = true;
            }
          } else if (pedidoConcluido) {
            console.log(`Adicionando pedido processado ${pedidoProcessado.id || pedidoProcessado.link} ao localStorage`);
            pedidosAtualizados.push({
              ...pedidoProcessado,
              status: 'concluido',
              cliente: pedidoProcessado.cliente || 'Cliente',
              enviados: pedidoProcessado.comentarios?.length || 1
            });
            houveAlteracao = true;
          }
        });

        if (houveAlteracao) {
          localStorage.setItem(PEDIDOS_KEY, JSON.stringify(pedidosAtualizados));
          setPedidos(pedidosAtualizados);
          setMsg('Status dos pedidos atualizado!');
          setTimeout(() => setMsg(''), 1500);
        }
      }

    } catch (error) {
      console.error('Erro ao verificar status dos pedidos:', error);
    }
  };

  async function fetchPlanos() {
    try {
      const resp = await fetch('/api/planos');
      const data = await resp.json();
      setPlanos(data.planos || []);
    } catch (err) {
      setPlanos([]);
    }
  }

  async function fetchClientes() {
    try {
      const resp = await fetch('/api/clientes');
      const data = await resp.json();
      setClientes(data.clientes || []);
      if (typeof window !== 'undefined') {
        localStorage.setItem(CLIENTES_KEY, JSON.stringify(data.clientes || []));
      }
      setClientesLoaded(true);
    } catch (err) {
      if (typeof window !== 'undefined') {
        const localClientes = localStorage.getItem(CLIENTES_KEY);
        if (localClientes) setClientes(JSON.parse(localClientes));
      }
      setClientesLoaded(true);
    }
  }

  React.useEffect(() => {
    fetchPlanos();
    fetchClientes();
    fetchPedidosAdmin();

    if (typeof window !== 'undefined') {
      const localPacotes = localStorage.getItem(PACOTES_KEY);
      if (localPacotes) setPacotes(JSON.parse(localPacotes));
      verificarStatusPedidos();
      const intervalId = setInterval(() => {
        console.log('Verificação automática de status dos pedidos...');
        verificarStatusPedidos();
      }, 10000);
      return () => clearInterval(intervalId);
    }
  }, []);

  React.useEffect(() => {
    if (clientesLoaded) {
      localStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
      localStorage.setItem(PEDIDOS_KEY, JSON.stringify(pedidos));
      localStorage.setItem(PACOTES_KEY, JSON.stringify(pacotes));
    }
  }, [clientes, pedidos, pacotes, planos, clientesLoaded]);

  const [section, setSection] = useState<'clientes'|'pedidos'|'pacotes'|'planos'>('clientes');
  const [busca, setBusca] = useState('');
  const [editIdx, setEditIdx] = useState<number|null>(null);
  const [editData, setEditData] = useState<any>({});
  const [novoPacote, setNovoPacote] = useState({cliente:'', pacote:'', status:'aguardando'});
  const [filtroPedido, setFiltroPedido] = useState('');
  const [msg, setMsg] = useState('');
  const [novoUsuario, setNovoUsuario] = useState({nome:'', email:'', whatsapp:'', senha:'', comentarios:0, admin:false, simultaneos:1});
  const [showCadastroPopup, setShowCadastroPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showEditPedidoPopup, setShowEditPedidoPopup] = useState(false);

  async function handleStopPedido(idx:number) {
    const pedido = pedidos[idx];
    let tipo: 'pendente' | 'processado' = 'pendente';
    if (pedido.status === 'concluido' || pedido.status === 'falha' || pedido.success === true || pedido.success === false) {
      tipo = 'processado';
    }
    try {
      await fetch('/api/pedidos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pedido.id, link: pedido.link, tipo, status: 'parado' })
      });
      const novas = [...pedidos];
      novas[idx].status = 'parado';
      setPedidos(novas);
      if(typeof window !== 'undefined'){
        localStorage.setItem('admin_pedidos', JSON.stringify(novas));
      }
      setMsg('Pedido parado!');
      setTimeout(()=>setMsg(''), 1500);
    } catch (err) {
      setMsg('Erro ao parar pedido!');
      setTimeout(()=>setMsg(''), 2500);
    }
  }

  async function handleSavePedidoPopup(idx:number) {
    if (editIdx === null) return;

    const pedido = pedidos[editIdx];
    let tipo: 'pendente' | 'processado' = 'pendente';
    if (pedido.status === 'concluido' || pedido.status === 'falha' || pedido.success === true || pedido.success === false) {
      tipo = 'processado';
    }

    try {
      await fetch('/api/pedidos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: pedido.id, 
          link: pedido.link, 
          tipo, 
          ...editData 
        })
      });

      const novas = [...pedidos];
      novas[editIdx] = {...editData};
      setPedidos(novas);
      setEditIdx(null);
      setShowEditPedidoPopup(false);

      if(typeof window !== 'undefined'){
        localStorage.setItem('admin_pedidos', JSON.stringify(novas));
      }

      setMsg('Pedido atualizado!');
      setTimeout(()=>setMsg(''), 1500);
    } catch (err) {
      setMsg('Erro ao atualizar pedido!');
      setTimeout(()=>setMsg(''), 2500);
    }
  }

  const [isClient, setIsClient] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [loginErro, setLoginErro] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('usuario_logado') || 'null');
      setUsuarioLogado(user);
    }
  }, []);

  async function handleAddComentarios(idx:number, qtd:number) {
    if(isNaN(qtd) || qtd<=0) return setMsg('Informe um número válido!');
    const cliente = { ...clientes[idx], comentarios: clientes[idx].comentarios + qtd };
    try {
      const resp = await fetch('/api/clientes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        await fetchClientes();
        setMsg('Comentários adicionados!');
        setTimeout(()=>setMsg(''), 1500);
      } else {
        setMsg(data.error || 'Erro ao atualizar comentários!');
        setTimeout(()=>setMsg(''), 2500);
      }
    } catch (err) {
      setMsg('Erro ao atualizar comentários!');
      setTimeout(()=>setMsg(''), 2500);
    }
  }

  const [novoPlano, setNovoPlano] = useState({nome:'', quantidade:0, preco:0, descricao:''});
  const [editPlanoIdx, setEditPlanoIdx] = useState<number|null>(null);
  const [editPlanoData, setEditPlanoData] = useState<any>({descricao: ''});

  function handleEdit(idx:number) {
    setEditIdx(idx);
    setEditData({...clientes[idx]});
    setShowEditPopup(true);
  }

  async function handleSave(idx:number) {
    const cliente = { ...editData, simultaneos: Number(editData.simultaneos) > 0 ? Number(editData.simultaneos) : 1 };
    try {
      const resp = await fetch('/api/clientes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        await fetchClientes();
        setEditIdx(null);
        setShowEditPopup(false);
        setMsg('Cliente atualizado!');
        setTimeout(()=>setMsg(''), 1500);
      } else {
        setMsg(data.error || 'Erro ao atualizar cliente!');
        setTimeout(()=>setMsg(''), 2500);
      }
    } catch (err) {
      setMsg('Erro ao atualizar cliente!');
      setTimeout(()=>setMsg(''), 2500);
    }
  }

  async function handleToggleAdmin(idx:number) {
    const cliente = { ...clientes[idx], admin: !clientes[idx].admin };
    try {
      const resp = await fetch('/api/clientes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        await fetchClientes();
        setMsg(cliente.admin ? 'Usuário agora é administrador!' : 'Permissão de administrador removida!');
        setTimeout(()=>setMsg(''), 1500);
      } else {
        setMsg(data.error || 'Erro ao atualizar permissão!');
        setTimeout(()=>setMsg(''), 2500);
      }
    } catch (err) {
      setMsg('Erro ao atualizar permissão!');
      setTimeout(()=>setMsg(''), 2500);
    }
  }

  async function handleBlock(idx:number) {
    const cliente = { ...clientes[idx], status: clientes[idx].status === 'ativo' ? 'bloqueado' : 'ativo' };
    try {
      const resp = await fetch('/api/clientes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        await fetchClientes();
        setMsg(cliente.status === 'ativo' ? 'Cliente liberado!' : 'Cliente bloqueado!');
        setTimeout(()=>setMsg(''), 1500);
      } else {
        setMsg(data.error || 'Erro ao atualizar status!');
        setTimeout(()=>setMsg(''), 2500);
      }
    } catch (err) {
      setMsg('Erro ao atualizar status!');
      setTimeout(()=>setMsg(''), 2500);
    }
  }

  function handlePacoteAdd(e:any) {
    e.preventDefault();
    if(!novoPacote.cliente || !novoPacote.pacote) return setMsg('Preencha todos os campos do pacote!');
    setPacotes([...pacotes, {...novoPacote}]);
    setNovoPacote({cliente:'', pacote:'', status:'aguardando'});
    setMsg('Pacote criado!');
    setTimeout(()=>setMsg(''), 1500);
  }

  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.email.toLowerCase().includes(busca.toLowerCase())
  );

  const pedidosFiltrados = pedidos;

  const handleAdminLogin = async (e:any) => {
    e.preventDefault();
    setLoginErro('');
    setLoginLoading(true);
    try {
      const clientes = JSON.parse(localStorage.getItem(CLIENTES_KEY) || '[]');
      const user = clientes.find((c:any) => c.email === loginEmail && c.senha === loginSenha && c.admin);
      if (user) {
        localStorage.setItem('usuario_logado', JSON.stringify(user));
        setUsuarioLogado(user);
        window.location.reload();
      } else {
        setLoginErro('Credenciais inválidas ou sem permissão de administrador.');
      }
    } catch {
      setLoginErro('Erro ao tentar logar.');
    }
    setLoginLoading(false);
  };

  if (!isClient || !clientesLoaded) {
    return <div style={{color:'#FFD600',textAlign:'center',marginTop:'3rem'}}>Carregando...</div>;
  }

  if (!usuarioLogado || !usuarioLogado.admin) {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#181A1B'}}>
        <div style={{background:'#232528',padding:'2.5rem 2rem',borderRadius:14,boxShadow:'0 2px 16px #0007',maxWidth:360,width:'100%'}}>
          <h2 style={{color:'#FFD600',marginBottom:24,textAlign:'center'}}>Login Administrador</h2>
          <form onSubmit={handleAdminLogin} style={{display:'flex',flexDirection:'column',gap:16}}>
            <input type="email" placeholder="Email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} style={{padding:12,borderRadius:6,border:'1.5px solid #FFD600',background:'#181A1B',color:'#FFD600',fontSize:'1rem',marginBottom:6}} required />
            <input type="password" type="password" placeholder="Senha" value={loginSenha} onChange={e=>setLoginSenha(e.target.value)} style={{padding:12,borderRadius:6,border:'1.5px solid #FFD600',background:'#181A1B',color:'#FFD600',fontSize:'1rem'}} required />
            <button type="submit" style={{marginTop:10,padding:'0.7rem',borderRadius:6,background:'#FFD600',color:'#181A1B',fontWeight:'bold',fontSize:'1.07rem',border:'none',cursor:'pointer',transition:'0.2s',letterSpacing:0.5}} disabled={loginLoading}>{loginLoading ? 'Entrando...' : 'Entrar'}</button>
            {loginErro && <div style={{color:'#F44336',marginTop:8,textAlign:'center',fontWeight:'bold'}}>{loginErro}</div>}
          </form>
          <div style={{marginTop:18,color:'#FFD600',fontSize:'0.96rem',textAlign:'center',opacity:0.8}}>Acesso restrito a administradores</div>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <Title style={{textAlign:'center', width:'100%'}}>Área Administrativa</Title>
      <AdminMenu active={section} onSelect={setSection} />
      {msg && <div style={{background:'#FFD600',color:'#181A1B',padding:'8px 16px',borderRadius:8,marginBottom:16,fontWeight:'bold'}}>{msg}</div>}

      {section==='clientes' && (
        <Section>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', marginBottom:'2rem'}}>
            <h3 style={{color:'#00ff88', fontSize:'2.2rem', fontWeight:'700', margin:0, display:'flex', alignItems:'center', gap:'0.75rem', textShadow:'0 0 15px rgba(0, 255, 136, 0.4)', textAlign:'center'}}>
              <span style={{fontSize:'2rem'}}>👥</span>
              Clientes Registrados
            </h3>
          </div>

          <div style={{
            display:'flex', 
            gap:'1.5rem', 
            marginBottom:'2rem', 
            alignItems:'stretch',
            flexWrap:'wrap'
          }}>
            <div style={{
              background:'#000000', 
              borderRadius:'16px', 
              padding:'1.5rem', 
              border:'2px solid rgba(0, 255, 136, 0.3)', 
              boxShadow:'0 6px 24px rgba(0, 255, 136, 0.12)', 
              backdropFilter:'blur(15px)', 
              position:'relative',
              flex:'1',
              minWidth:'320px'
            }}>
              <div style={{position:'absolute', top:0, left:0, right:0, bottom:0, background:'linear-gradient(135deg, rgba(0, 255, 136, 0.03) 0%, transparent 50%, rgba(0, 255, 136, 0.03) 100%)', borderRadius:'16px', pointerEvents:'none'}}></div>
              <div style={{position:'relative', zIndex:1}}>
                <span style={{position:'absolute', left:'1.2rem', top:'50%', transform:'translateY(-50%)', color:'#00ff88', fontSize:'1.2rem', textShadow:'0 0 10px rgba(0, 255, 136, 0.6)', zIndex:2}}>🔍</span>
                <input
                  type="text"
                  placeholder="Buscar por nome ou email..."
                  value={busca}
                  onChange={e=>setBusca(e.target.value)}
                  style={{
                    width:'100%', 
                    padding:'1rem 1rem 1rem 3.2rem', 
                    borderRadius:'12px', 
                    border:'2px solid rgba(0, 255, 136, 0.2)', 
                    background:'rgba(0, 0, 0, 0.6)', 
                    color:'#ffffff', 
                    fontSize:'1rem', 
                    transition:'all 0.3s ease', 
                    outline:'none', 
                    boxShadow:'0 2px 8px rgba(0, 0, 0, 0.2)', 
                    fontWeight:'400'
                  }}
                  onFocus={e=>{e.target.style.borderColor='#00ff88'; e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.15), 0 2px 8px rgba(0, 0, 0, 0.2)'}}
                  onBlur={e=>{e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)'}}
                />
              </div>
            </div>

            <div style={{display:'flex', alignItems:'center'}}>
              <Button 
                onClick={() => setShowCadastroPopup(true)}
                style={{
                  background:'linear-gradient(135deg, #00ff88 0%, #00e67a 100%)', 
                  color:'#0a0f0a', 
                  padding:'1rem 2rem', 
                  fontSize:'1rem', 
                  fontWeight:'700', 
                  boxShadow:'0 4px 20px rgba(0, 255, 136, 0.3)', 
                  transform:'translateY(0)', 
                  transition:'all 0.3s ease', 
                  textTransform:'uppercase', 
                  letterSpacing:'0.6px',
                  border:'none',
                  borderRadius:'12px',
                  cursor:'pointer',
                  display:'flex',
                  alignItems:'center',
                  gap:'0.6rem',
                  whiteSpace:'nowrap',
                  height:'fit-content'
                }}
                onMouseEnter={e=>{
                  e.currentTarget.style.transform='translateY(-2px)'; 
                  e.currentTarget.style.boxShadow='0 6px 25px rgba(0, 255, 136, 0.5)';
                }} 
                onMouseLeave={e=>{
                  e.currentTarget.style.transform='translateY(0)'; 
                  e.currentTarget.style.boxShadow='0 4px 20px rgba(0, 255, 136, 0.3)';
                }}
              >
                <span style={{fontSize:'1.2rem'}}>➕</span>
                Cadastrar Novo Cliente
              </Button>
            </div>
          </div>

          <div style={{display:'flex', alignItems:'center', margin:'2.5rem 0', opacity:0.8}}>
            <div style={{flex:1, height:'2px', background:'linear-gradient(90deg, transparent 0%, #00ff88 50%, transparent 100%)', boxShadow:'0 0 10px rgba(0, 255, 136, 0.3)'}}></div>
            <span style={{color:'#00ff88', padding:'0 1.5rem', fontSize:'1.5rem', textShadow:'0 0 15px rgba(0, 255, 136, 0.5)'}}>📋</span>
            <div style={{flex:1, height:'2px', background:'linear-gradient(90deg, transparent 0%, #00ff88 50%, transparent 100%)', boxShadow:'0 0 10px rgba(0, 255, 136, 0.3)'}}></div>
          </div>

          <div style={{
            background:'#000000', 
            borderRadius:'16px', 
            overflow:'hidden', 
            border:'2px solid rgba(0, 255, 136, 0.3)', 
            boxShadow:'0 8px 32px rgba(0, 255, 136, 0.15)', 
            backdropFilter:'blur(15px)', 
            position:'relative',
            maxWidth:'100%'
          }}>
            <div style={{position:'absolute', top:0, left:0, right:0, bottom:0, background:'linear-gradient(135deg, rgba(0, 255, 136, 0.02) 0%, transparent 50%, rgba(0, 255, 136, 0.02) 100%)', borderRadius:'16px', pointerEvents:'none'}}></div>
            <div style={{overflowX:'auto', position:'relative', zIndex:1, maxWidth:'100%'}}>
              <Table style={{
                margin:0, 
                borderRadius:0, 
                boxShadow:'none', 
                background:'transparent', 
                border:'none',
                minWidth:'1000px'
              }}>
                <thead>
                  <tr>
                    <th>👤 Nome</th>
                    <th>📧 Email</th>
                    <th>📱 WhatsApp</th>
                    <th>🔐 Senha</th>
                    <th>📊 Status</th>
                    <th>👑 Admin</th>
                    <th>💬 Comentários</th>
                    <th>⚡ Simultâneos</th>
                    <th>⚙️ Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesFiltrados.map((c, i) => (
                      <tr key={i}>
                        <td style={{padding:'0.8rem 0.5rem', fontSize:'0.9rem', fontWeight:'500', color:'#FFF', textAlign:'center', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'150px'}} title={c.nome}>{c.nome}</td>
                        <td style={{padding:'0.8rem 0.5rem', fontSize:'0.85rem', color:'#B0B0B0'}}>{c.email}</td>
                        <td style={{padding:'0.8rem 0.5rem', fontSize:'0.85rem', color:'#B0B0B0'}}>{c.whatsapp}</td>
                        <td style={{padding:'0.8rem 0.5rem', fontSize:'0.85rem'}}>{c.senha ? <span style={{color:'#FFD600', fontSize:'1rem'}}>🔒 ••••••••</span> : <span style={{color:'#FF6B6B', fontWeight:'bold'}}>⚠️ Não definida</span>}</td>
                        <td style={{padding:'0.8rem 0.5rem', textAlign:'center'}}>
                          {c.status === 'ativo' ? 
                            <span style={{background:'linear-gradient(135deg, #00ff88 0%, #00e67a 100%)', color:'#0a0f0a', padding:'0.4rem 0.8rem', borderRadius:'20px', fontSize:'0.8rem', fontWeight:'700', display:'inline-flex', alignItems:'center', gap:'0.3rem', boxShadow:'0 2px 10px rgba(0, 255, 136, 0.3)', textTransform:'uppercase', letterSpacing:'0.2px'}}>
                              ✅ Ativo
                            </span> : 
                            <span style={{background:'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)', color:'#FFF', padding:'0.4rem 0.8rem', borderRadius:'20px', fontSize:'0.8rem', fontWeight:'700', display:'inline-flex', alignItems:'center', gap:'0.3rem', boxShadow:'0 2px 10px rgba(255, 71, 87, 0.3)', textTransform:'uppercase', letterSpacing:'0.2px'}}>
                              🚫 Bloqueado
                            </span>
                          }
                        </td>
                        <td style={{padding:'0.8rem 0.5rem', textAlign:'center'}}>
                          {c.admin ? 
                            <span style={{background:'linear-gradient(135deg, #00ff88 0%, #00e67a 100%)', color:'#0a0f0a', padding:'0.4rem 0.8rem', borderRadius:'20px', fontSize:'0.8rem', fontWeight:'700', display:'inline-flex', alignItems:'center', gap:'0.3rem', boxShadow:'0 2px 10px rgba(0, 255, 136, 0.3)', textTransform:'uppercase', letterSpacing:'0.2px'}}>
                              👑 Admin
                            </span> : 
                            <span style={{color:'rgba(255, 255, 255, 0.6)', fontSize:'0.8rem', fontStyle:'italic'}}>👤 Usuário</span>
                          }
                        </td>
                        <td style={{padding:'0.8rem 0.5rem', textAlign:'center'}}>
                          <span style={{background:'rgba(0, 255, 136, 0.2)', color:'#00ff88', padding:'0.4rem 0.8rem', borderRadius:'20px', fontSize:'0.8rem', fontWeight:'700', boxShadow:'0 1px 6px rgba(0, 255, 136, 0.2)', border:'1px solid rgba(0, 255, 136, 0.3)'}}>
                            {c.comentarios}
                          </span>
                        </td>
                        <td style={{padding:'0.8rem 0.5rem', textAlign:'center'}}>
                          <span style={{background:'rgba(0, 255, 136, 0.2)', color:'#00ff88', padding:'0.4rem 0.8rem', borderRadius:'20px', fontSize:'0.8rem', fontWeight:'700', boxShadow:'0 1px 6px rgba(0, 255, 136, 0.2)', border:'1px solid rgba(0, 255, 136, 0.3)'}}>
                            {c.simultaneos || 1}
                          </span>
                        </td>
                        <td style={{padding:'0.8rem 0.5rem', textAlign:'center', verticalAlign:'middle'}}>
                          <Button onClick={()=>handleEdit(i)} style={{background:'linear-gradient(135deg, #00ff88 0%, #00e67a 100%)', color:'#0a0f0a', padding:'0.6rem 1.2rem', fontSize:'0.85rem', fontWeight:'700', boxShadow:'0 4px 15px rgba(0, 255, 136, 0.3)', display:'flex', alignItems:'center', gap:'0.5rem', textTransform:'uppercase', letterSpacing:'0.3px', borderRadius:'8px', height:'40px', justifyContent:'center', transition:'all 0.3s ease'}}>
                            ✏️ Editar
                          </Button>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Section>
      )}

      {section==='pedidos' && (
        <Section>
          <h3>Pedidos</h3>
          <Table>
            <thead>
              <tr><th>ID</th><th>Cliente</th><th>Comentários</th><th>Status</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map((p, i) => (
                <tr key={i}>
                  <td>#{i + 1}</td>
                  <td>{p.cliente}</td>
                  <td>{Array.isArray(p.comentarios) ? p.comentarios.length : (p.enviados || 0)}</td>
                  <td>{p.status || 'processando'}</td>
                  <td>
                    <Button onClick={()=>{
                      setEditIdx(i);
                      setEditData({...p});
                      setShowEditPedidoPopup(true);
                    }}>Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      )}

      {section==='pacotes' && (
        <Section>
          <h3>Recargas</h3>
          <form onSubmit={handlePacoteAdd} style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
            <input
              type="text"
              placeholder="Cliente"
              value={novoPacote.cliente}
              onChange={e=>setNovoPacote({...novoPacote,cliente:e.target.value})}
              style={{padding:8,borderRadius:6,border:'1px solid #292B2E',background:'#181A1B',color:'#FFF'}}
            />
            <input
              type="text"
              placeholder="Pacote (ex: 50, 100...)"
              value={novoPacote.pacote}
              onChange={e=>setNovoPacote({...novoPacote,pacote:e.target.value})}
              style={{padding:8,borderRadius:6,border:'1px solid #292B2E',background:'#181A1B',color:'#FFF'}}
            />
            <select value={novoPacote.status} onChange={e=>setNovoPacote({...novoPacote,status:e.target.value})} style={{padding:8,borderRadius:6,border:'1px solid #292B2E',background:'#181A1B',color:'#FFF'}}>
              <option value="aguardando">Aguardando</option>
              <option value="liberado">Liberado</option>
            </select>
            <Button type="submit">Adicionar Pacote</Button>
          </form>
          <Table>
            <thead>
              <tr><th>Cliente</th><th>Pacote</th><th>Status</th></tr>
            </thead>
            <tbody>
              {pacotes.map((p,i)=>(
                <tr key={i}>
                  <td>{p.cliente}</td>
                  <td>{p.pacote}</td>
                  <td>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      )}

      {section==='planos' && (
        <Section>
          <h3>Planos</h3>
          <form onSubmit={async e => {
            e.preventDefault();
            if(!novoPlano.nome||!novoPlano.quantidade||!novoPlano.preco) return setMsg('Preencha todos os campos do plano!');
            try {
              const resp = await fetch('/api/planos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(novoPlano)
              });
              const data = await resp.json();
              if (resp.ok && data.plano) {
                setPlanos([...planos, data.plano]);
                setNovoPlano({nome:'',quantidade:0,preco:0, descricao:''});
                setMsg('Plano criado!');
                setTimeout(()=>setMsg(''), 1500);
              } else {
                setMsg(data.error || 'Erro ao criar plano.');
                setTimeout(()=>setMsg(''), 2500);
              }
            } catch (err) {
              setMsg('Erro ao criar plano.');
              setTimeout(()=>setMsg(''), 2500);
            }
          }} style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
            <input type="text" placeholder="Nome do Plano" value={novoPlano.nome} onChange={e=>setNovoPlano({...novoPlano,nome:e.target.value})} style={{padding:8,borderRadius:6,border:'1px solid #292B2E',background:'#181A1B',color:'#FFF'}} />
            <input type="number" placeholder="Qtd. Comentários" value={novoPlano.quantidade||''} onChange={e=>setNovoPlano({...novoPlano,quantidade:Number(e.target.value)})} style={{padding:8,borderRadius:6,border:'1px solid #292B2E',background:'#181A1B',color:'#FFF',width:120}} />
            <input type="number" placeholder="Preço (R$)" value={novoPlano.preco||''} onChange={e=>setNovoPlano({...novoPlano,preco:Number(e.target.value)})} style={{padding:8,borderRadius:6,border:'1px solid #292B2E',background:'#181A1B',color:'#FFF',width:120}} />
            <Button type="submit">Adicionar Plano</Button>
          </form>
          <Table>
            <thead>
              <tr><th>Qtd.</th><th>Preço (R$)</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {planos.map((p,i)=>(
                <tr key={i}>
                  <td>{editPlanoIdx===i ? <input type="number" value={editPlanoData.quantidade} onChange={e=>setEditPlanoData({...editPlanoData,quantidade:Number(e.target.value)})} style={{width:'100%',background:'#232528',color:'#FFD600',border:'1px solid #FFD600',borderRadius:4}}/> : p.quantidade}</td>
                  <td>{editPlanoIdx===i ? <input type="number" value={editPlanoData.preco} onChange={e=>setEditPlanoData({...editPlanoData,preco:Number(e.target.value)})} style={{width:'100%',background:'#232528',color:'#FFD600',border:'1px solid #FFD600',borderRadius:4}}/> : p.preco.toFixed(2)}</td>
                  <td>
                    {editPlanoIdx===i ? (
                      <>
                        <Button onClick={async () => {
                          try {
                            const resp = await fetch('/api/planos', {
                              method: 'PUT',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify({ ...editPlanoData, id: planos[i].id })
                            });
                            const data = await resp.json();
                            if (resp.ok && data.success) {
                              const novos = [...planos];
                              novos[i] = data.plano;
                              setPlanos(novos); setEditPlanoIdx(null); setMsg('Plano atualizado!'); setTimeout(()=>setMsg(''), 1500);
                            } else {
                              setMsg(data.error || 'Erro ao atualizar plano.'); setTimeout(()=>setMsg(''), 2500);
                            }
                          } catch (err) {
                            setMsg('Erro ao atualizar plano.'); setTimeout(()=>setMsg(''), 2500);
                          }
                        }}>Salvar</Button>
                        <Button onClick={()=>setEditPlanoIdx(null)}>Cancelar</Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => {setEditPlanoIdx(i);setEditPlanoData({...p});}}>Editar</Button>
                        <Button style={{background:'#F44336',color:'#FFF'}} onClick={async () => {
                          if(window.confirm('Tem certeza que deseja excluir este plano?')){
                            try {
                              const resp = await fetch('/api/planos', {
                                method: 'DELETE',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({ id: p.id })
                              });
                              const data = await resp.json();
                              if (resp.ok && data.success) {
                                const novos = planos.filter((_, idx) => idx !== i);
                                setPlanos(novos);
                                setMsg('Plano excluído!'); setTimeout(()=>setMsg(''), 1500);
                              } else {
                                setMsg(data.error || 'Erro ao excluir plano.'); setTimeout(()=>setMsg(''), 2500);
                              }
                            } catch (err) {
                              setMsg('Erro ao excluir plano.'); setTimeout(()=>setMsg(''), 2500);
                            }
                          }
                        }}>Excluir</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      )}

    {/* Popups aqui... */}
     {showCadastroPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: '#000000',
            border: '3px solid rgba(0, 255, 136, 0.5)',
            borderRadius: '24px',
            padding: '3rem',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 80px rgba(0, 255, 136, 0.3)',
            position: 'relative',
            animation: 'popupSlideIn 0.3s ease-out'
          }}>
            {/* Botão de fechar */}
            <button
              onClick={() => setShowCadastroPopup(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#00ff88',
                fontSize: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 71, 87, 0.2)';
                e.currentTarget.style.color = '#ff4757';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#00ff88';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              ✕
            </button>

            {/* Título do popup */}
            <h3 style={{
              color: '#00ff88',
              fontSize: '1.8rem',
              marginBottom: '2rem',
              textAlign: 'center',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              textShadow: '0 0 15px rgba(0, 255, 136, 0.4)'
            }}>
              <span style={{fontSize: '1.6rem'}}>👤</span>
              Cadastrar Novo Cliente
            </h3>

            {/* Formulário */}
            <form onSubmit={async e => {
              e.preventDefault();
              if(!novoUsuario.nome||!novoUsuario.email||!novoUsuario.whatsapp||!novoUsuario.senha) {
                setMsg('Preencha todos os campos!');
                setTimeout(()=>setMsg(''), 2500);
                return;
              }

              try {
                const resp = await fetch('/api/clientes', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({...novoUsuario, status:'ativo'})
                });
                const data = await resp.json();
                if (resp.ok && data.success) {
                  await fetchClientes();
                  setNovoUsuario({nome:'',email:'',whatsapp:'',senha:'',comentarios:0, admin:false, simultaneos:1});
                  setShowCadastroPopup(false);
                  setMsg('Cliente criado com sucesso!');
                  setTimeout(()=>setMsg(''), 2000);
                } else {
                  setMsg(data.error || 'Erro ao criar cliente!');
                  setTimeout(()=>setMsg(''), 2500);
                }
              } catch (err) {
                setMsg('Erro ao criar cliente!');
                setTimeout(()=>setMsg(''), 2500);
              }
            }} style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>

              {/* Nome */}
              <div style={{gridColumn: 'span 2'}}>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  📝 Nome Completo
                </label>
                <input 
                  type="text" 
                  placeholder="Digite o nome completo" 
                  value={novoUsuario.nome} 
                  onChange={e=>setNovoUsuario({...novoUsuario,nome:e.target.value})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* Email */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  📧 Email
                </label>
                <input 
                  type="email" 
                  placeholder="email@exemplo.com" 
                  value={novoUsuario.email} 
                  onChange={e=>setNovoUsuario({...novoUsuario,email:e.target.value})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  📱 WhatsApp
                </label>
                <input 
                  type="text" 
                  placeholder="(11) 99999-9999" 
                  value={novoUsuario.whatsapp} 
                  onChange={e=>setNovoUsuario({...novoUsuario,whatsapp:e.target.value})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* Senha */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  🔐 Senha
                </label>
                <input 
                  type="password" 
                  placeholder="Senha segura" 
                  value={novoUsuario.senha} 
                  onChange={e=>setNovoUsuario({...novoUsuario,senha:e.target.value})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* Admin */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  👑 Permissões
                </label>
                <select 
                  value={novoUsuario.admin ? 'sim' : 'não'} 
                  onChange={e=>setNovoUsuario({...novoUsuario,admin:e.target.value==='sim'})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    outline: 'none'
                  }}
                >
                  <option value="não">👤 Usuário Normal</option>
                  <option value="sim">👑 Administrador</option>
                </select>
              </div>

              {/* Simultâneos */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  ⚡ Pedidos Simultâneos
                </label>
                <select 
                  value={novoUsuario.simultaneos} 
                  onChange={e=>setNovoUsuario({...novoUsuario,simultaneos:Number(e.target.value)})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    outline: 'none'
                  }}
                >
                  {[1,2,3,4,5].map(q=> 
                    <option key={q} value={q}>⚡ {q} simultâneo{q>1?'s':''}</option>
                  )}
                </select>
              </div>

              {/* Botões de ação */}
              <div style={{gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem'}}>
                <Button 
                  type="submit" 
                  style={{
                    background: 'linear-gradient(135deg, #00ff88 0%, #00e67a 100%)',
                    color: '#0a0f0a',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 20px rgba(0, 255, 136, 0.4)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.transform='translateY(-3px)'; 
                    e.currentTarget.style.boxShadow='0 8px 25px rgba(0, 255, 136, 0.6)';
                  }} 
                  onMouseLeave={e=>{
                    e.currentTarget.style.transform='translateY(0)'; 
                    e.currentTarget.style.boxShadow='0 4px 20px rgba(0, 255, 136, 0.4)';
                  }}
                >
                  <span>✨</span>
                  Criar Cliente
                </Button>

                <Button 
                  type="button"
                  onClick={() => setShowCadastroPopup(false)}
                  style={{
                    background: 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)',
                    color: '#FFF',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 20px rgba(255, 71, 87, 0.4)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.transform='translateY(-3px)'; 
                    e.currentTarget.style.boxShadow='0 8px 25px rgba(255, 71, 87, 0.6)';
                  }} 
                  onMouseLeave={e=>{
                    e.currentTarget.style.transform='translateY(0)'; 
                    e.currentTarget.style.boxShadow='0 4px 20px rgba(255, 71, 87, 0.4)';
                  }}
                >
                  <span>❌</span>
                  Cancelar
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Popup de Edição */}
      {showEditPopup && editIdx !== null && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: '#000000',
            border: '3px solid rgba(0, 255, 136, 0.5)',
            borderRadius: '24px',
            padding: '3rem',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 80px rgba(0, 255, 136, 0.3)',
            position: 'relative',
            animation: 'popupSlideIn 0.3s ease-out'
          }}>
            {/* Botão de fechar */}
            <button
              onClick={() => {setShowEditPopup(false); setEditIdx(null);}}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#00ff88',
                fontSize: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 71, 87, 0.2)';
                e.currentTarget.style.color = '#ff4757';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#00ff88';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              ✕
            </button>

            {/* Título do popup */}
            <h3 style={{
              color: '#00ff88',
              fontSize: '1.8rem',
              marginBottom: '2rem',
              textAlign: 'center',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              textShadow: '0 0 15px rgba(0, 255, 136, 0.4)'
            }}>
              <span style={{fontSize: '1.6rem'}}>✏️</span>
              Editar Cliente
            </h3>

            {/* Formulário */}
            <form onSubmit={async e => {
              e.preventDefault();
              await handleSave(editIdx);
            }} style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>

              {/* Nome */}
              <div style={{gridColumn: 'span 2'}}>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  📝 Nome Completo
                </label>
                <input 
                  type="text" 
                  placeholder="Digite o nome completo" 
                  value={editData.nome || ''} 
                  onChange={e=>setEditData({...editData,nome:e.target.value})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* Email */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  📧 Email
                </label>
                <input 
                  type="email" 
                  placeholder="email@exemplo.com" 
                  value={editData.email || ''} 
                  onChange={e=>setEditData({...editData,email:e.target.value})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  📱 WhatsApp
                </label>
                <input 
                  type="text" 
                  placeholder="(11) 99999-9999" 
                  value={editData.whatsapp || ''} 
                  onChange={e=>setEditData({...editData,whatsapp:e.target.value})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* Senha */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  🔐 Senha
                </label>
                <input 
                  type="password" 
                  placeholder="Senha segura" 
                  value={editData.senha || ''} 
                  onChange={e=>setEditData({...editData,senha:e.target.value})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* Status */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  📊 Status
                </label>
                <select 
                  value={editData.status || 'ativo'} 
                  onChange={e=>setEditData({...editData,status:e.target.value})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    outline: 'none'
                  }}
                >
                  <option value="ativo">✅ Ativo</option>
                  <option value="bloqueado">🚫 Bloqueado</option>
                </select>
              </div>

              {/* Admin */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  👑 Permissões
                </label>
                <select 
                  value={editData.admin ? 'sim' : 'não'} 
                  onChange={e=>setEditData({...editData,admin:e.target.value==='sim'})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    outline: 'none'
                  }}
                >
                  <option value="não">👤 Usuário Normal</option>
                  <option value="sim">👑 Administrador</option>
                </select>
              </div>

              {/* Comentários */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  💬 Comentários
                </label>
                <input 
                  type="number" 
                  placeholder="0" 
                  value={editData.comentarios || 0} 
                  onChange={e=>setEditData({...editData,comentarios:Number(e.target.value)})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* Simultâneos */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  ⚡ Pedidos Simultâneos
                </label>
                <select 
                  value={editData.simultaneos || 1} 
                  onChange={e=>setEditData({...editData,simultaneos:Number(e.target.value)})} 
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    outline: 'none'
                  }}
                >
                  {[1,2,3,4,5].map(q=> 
                    <option key={q} value={q}>⚡ {q} simultâneo{q>1?'s':''}</option>
                  )}
                </select>
              </div>

              {/* Botões de ação */}
              <div style={{
                gridColumn: 'span 2', 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center', 
                marginTop: '1rem'
              }}>
                <Button 
                  type="submit" 
                  style={{
                    background: 'linear-gradient(135deg, #00ff88 0%, #00e67a 100%)',
                    color: '#0a0f0a',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 20px rgba(0, 255, 136, 0.4)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.transform='translateY(-3px)'; 
                    e.currentTarget.style.boxShadow='0 8px 25px rgba(0, 255, 136, 0.6)';
                  }} 
                  onMouseLeave={e=>{
                    e.currentTarget.style.transform='translateY(0)'; 
                    e.currentTarget.style.boxShadow='0 4px 20px rgba(0, 255, 136, 0.4)';
                  }}
                >
                  <span>✅</span>
                  Salvar Alterações
                </Button>

                <Button 
                  type="button"
                  onClick={() => {setShowEditPopup(false); setEditIdx(null);}}
                  style={{
                    background: 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)',
                    color: '#FFF',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 20px rgba(255, 71, 87, 0.4)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.transform='translateY(-3px)'; 
                    e.currentTarget.style.boxShadow='0 8px 25px rgba(255, 71, 87, 0.6)';
                  }} 
                  onMouseLeave={e=>{
                    e.currentTarget.style.transform='translateY(0)'; 
                    e.currentTarget.style.boxShadow='0 4px 20px rgba(255, 71, 87, 0.4)';
                  }}
                >
                  <span>❌</span>
                  Cancelar
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Popup de Edição de Pedido */}
      {showEditPedidoPopup && editIdx !== null && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: '#000000',
            border: '3px solid rgba(0, 255, 136, 0.5)',
            borderRadius: '20px',
            padding: '1.5rem',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 25px 80px rgba(0, 255, 136, 0.3)',
            position: 'relative',
            animation: 'popupSlideIn 0.3s ease-out'
          }}>
            {/* Botão de fechar */}
            <button
              onClick={() => {setShowEditPedidoPopup(false); setEditIdx(null);}}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'none',
                border: 'none',
                color: '#00ff88',
                fontSize: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 71, 87, 0.2)';
                e.currentTarget.style.color = '#ff4757';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#00ff88';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              ✕
            </button>

            {/* Título do popup */}
            <h3 style={{
              color: '#00ff88',
              fontSize: '1.4rem',
              marginBottom: '1rem',
              textAlign: 'center',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              textShadow: '0 0 15px rgba(0, 255, 136, 0.4)'
            }}>
              <span style={{fontSize: '1.2rem'}}>✏️</span>
              Editar Pedido #{editIdx + 1}
            </h3>

            {/* Status no topo */}
            <div style={{marginBottom: '1rem'}}>
              <label style={{
                color: '#00ff88',
                fontSize: '0.85rem',
                fontWeight: '700',
                marginBottom: '0.4rem',
                display: 'block',
                textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
              }}>
                📊 Status
              </label>
              <select 
                value={editData.status || 'processando'} 
                onChange={e=>setEditData({...editData,status:e.target.value})} 
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '10px',
                  border: '2px solid rgba(0, 255, 136, 0.2)',
                  background: 'rgba(10, 11, 13, 0.8)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  outline: 'none'
                }}
              >
                <option value="processando">⚡ Processando</option>
                <option value="parado">⏸️ Parado</option>
                <option value="concluido">✅ Concluído</option>
              </select>
            </div>

            {/* Formulário */}
            <form onSubmit={async e => {
              e.preventDefault();
              await handleSavePedidoPopup(editIdx);
            }} style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>

              {/* Nome do Cliente */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  marginBottom: '0.4rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  👤 Cliente
                </label>
                <input 
                  type="text" 
                  placeholder="Nome do cliente" 
                  value={editData.cliente || ''} 
                  onChange={e=>setEditData({...editData,cliente:e.target.value})} 
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '10px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* Link do Post */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  marginBottom: '0.4rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  🔗 Link do Post
                </label>
                <input 
                  type="url" 
                  placeholder="https://instagram.com/p/..." 
                  value={editData.link || ''} 
                  onChange={e=>setEditData({...editData,link:e.target.value})} 
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '10px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* Quantidade de Comentários */}
              <div>
                <label style={{
                  color: '#00ff88',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  marginBottom: '0.4rem',
                  display: 'block',
                  textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
                }}>
                  💬 Comentários Enviados
                </label>
                <input 
                  type="number" 
                  placeholder="0" 
                  value={editData.enviados || 0} 
                  onChange={e=>setEditData({...editData,enviados:Number(e.target.value)})} 
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '10px',
                    border: '2px solid rgba(0, 255, 136, 0.2)',
                    background: 'rgba(10, 11, 13, 0.8)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={e=>{
                    e.target.style.borderColor='#00ff88'; 
                    e.target.style.boxShadow='0 0 0 3px rgba(0, 255, 136, 0.1)';
                  }} 
                  onBlur={e=>{
                    e.target.style.borderColor='rgba(0, 255, 136, 0.2)'; 
                    e.target.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.2)';
                  }} 
                />
              </div>

              {/* Botões de ação */}
              <div style={{
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem', 
                marginTop: '1rem'
              }}>
                <Button 
                  type="submit" 
                  style={{
                    background: 'linear-gradient(135deg, #00ff88 0%, #00e67a 100%)',
                    color: '#0a0f0a',
                    padding: '0.6rem 1rem',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 15px rgba(0, 255, 136, 0.4)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.transform='translateY(-2px)'; 
                    e.currentTarget.style.boxShadow='0 6px 20px rgba(0, 255, 136, 0.6)';
                  }} 
                  onMouseLeave={e=>{
                    e.currentTarget.style.transform='translateY(0)'; 
                    e.currentTarget.style.boxShadow='0 4px 15px rgba(0, 255, 136, 0.4)';
                  }}
                >
                  <span>✅</span>
                  Salvar
                </Button>

                <Button 
                  type="button"
                  onClick={async () => {
                    if (editIdx !== null) {
                      await handleStopPedido(editIdx);
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)',
                    color: '#FFF',
                    padding: '0.6rem 1rem',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 15px rgba(255, 165, 0, 0.4)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.transform='translateY(-2px)'; 
                    e.currentTarget.style.boxShadow='0 6px 20px rgba(255, 165, 0, 0.6)';
                  }} 
                  onMouseLeave={e=>{
                    e.currentTarget.style.transform='translateY(0)'; 
                    e.currentTarget.style.boxShadow='0 4px 15px rgba(255, 165, 0, 0.4)';
                  }}
                >
                  <span>⏸️</span>
                  Parar
                </Button>

                <Button 
                  type="button"
                  onClick={async () => {
                    if (editIdx !== null && window.confirm('Tem certeza que deseja deletar este pedido?')) {
                      await handleDeletePedido(editIdx);
                      setShowEditPedidoPopup(false);
                      setEditIdx(null);
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)',
                    color: '#FFF',
                    padding: '0.6rem 1rem',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.transform='translateY(-2px)'; 
                    e.currentTarget.style.boxShadow='0 6px 20px rgba(255, 71, 87, 0.6)';
                  }} 
                  onMouseLeave={e=>{
                    e.currentTarget.style.transform='translateY(0)'; 
                    e.currentTarget.style.boxShadow='0 4px 15px rgba(255, 71, 87, 0.4)';
                  }}
                >
                  <span>🗑️</span>
                  Deletar
                </Button>

                <Button 
                  type="button"
                  onClick={() => {setShowEditPedidoPopup(false); setEditIdx(null);}}
                  style={{
                    background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                    color: '#FFF',
                    padding: '0.6rem 1rem',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 15px rgba(108, 117, 125, 0.4)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.transform='translateY(-2px)'; 
                    e.currentTarget.style.boxShadow='0 6px 20px rgba(108, 117, 125, 0.6)';
                  }} 
                  onMouseLeave={e=>{
                    e.currentTarget.style.transform='translateY(0)'; 
                    e.currentTarget.style.boxShadow='0 4px 15px rgba(108, 117, 125, 0.4)';
                  }}
                >
                  <span>❌</span>
                  Cancelar
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

    </Container>
  );
}