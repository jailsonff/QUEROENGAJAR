import React, { useState } from 'react';
import styled from 'styled-components';
import UserMenu from '../components/UserMenu';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0b0d 0%, #1a1d21 100%);
  color: #ffffff;
  padding: 2rem 1rem;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.25rem;
  }
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 2rem;
  text-align: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin: 0 auto 1.5rem;
    padding: 0 0.5rem;
  }
`;

const Title = styled.h2`
  color: #00ff88;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const TableContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(26, 29, 33, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(0, 255, 136, 0.1);
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    margin: 0 0.5rem;
    padding: 1rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    margin: 0 0.25rem;
    padding: 0.75rem;
    border-radius: 8px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
`;

const TableHeader = styled.th`
  background: linear-gradient(135deg, #00ff88, #00e67a);
  color: #0a0b0d;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;

  &:first-child {
    border-radius: 12px 0 0 12px;
  }

  &:last-child {
    border-radius: 0 12px 12px 0;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.25rem;
    font-size: 0.8rem;
    word-break: break-word;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 136, 0.05);
    transform: translateY(-1px);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    &:hover {
      transform: none;
    }
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #ffffff;
  font-size: 0.9rem;
  vertical-align: middle;

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.25rem;
    font-size: 0.8rem;
    word-break: break-word;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${({ status }) => {
    switch (status) {
      case 'concluido':
        return 'linear-gradient(135deg, #00ff88, #00e67a)';
      case 'processando':
        return 'linear-gradient(135deg, #ffd700, #ffed4a)';
      case 'parado':
        return 'linear-gradient(135deg, #ff4757, #ff3742)';
      default:
        return 'linear-gradient(135deg, #74b9ff, #0984e3)';
    }
  }};
  color: #0a0b0d;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.7rem;
  }
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #00ff88, #00e67a);
  color: #0a0b0d;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 255, 136, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 255, 136, 0.4);
    background: linear-gradient(135deg, #00e67a, #00d96a);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    border-radius: 6px;

    &:hover {
      transform: none;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.6);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const NewOrderButton = styled(ActionButton)`
  background: linear-gradient(135deg, #74b9ff, #0984e3);

  &:hover {
    background: linear-gradient(135deg, #0984e3, #0770c7);
  }
`;

// Modal Styles
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1a1d21 0%, #2d3340 100%);
  border: 2px solid rgba(0, 255, 136, 0.2);
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
    max-height: 90vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 255, 136, 0.2);

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
  }
`;

const ModalTitle = styled.h3`
  color: #00ff88;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ff4757;
  }
`;

const ModalSection = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const ModalLabel = styled.label`
  display: block;
  color: #00ff88;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.4rem;
  }
`;

const ModalValue = styled.div`
  color: #ffffff;
  font-size: 1rem;
  padding: 0.75rem;
  background: rgba(0, 255, 136, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 136, 0.1);
  word-break: break-all;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const CommentsContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding: 0.75rem;
  background: rgba(0, 255, 136, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 136, 0.1);
`;

const CommentItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  line-height: 1.4;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 255, 136, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding-top: 0.75rem;
  }
`;

const IdContainer = styled.div`
  @media (min-width: 769px) {
    /* Desktop: sempre mostra o ID completo */
  }

  @media (max-width: 768px) {
    /* Mobile: comportamento personalizado */
  }
`;

const IdButton = styled.button`
  background: none;
  border: none;
  color: #00ff88;
  font-weight: 500;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: inherit;

  &:hover {
    background: rgba(0, 255, 136, 0.1);
    text-decoration: underline;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const IdDisplay = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ClientName = styled.span`
  color: #000000;

  @media (max-width: 768px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
    display: inline-block;
  }
`;

export default function Pedido() {
  const [ordens, setOrdens] = React.useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFullId, setShowFullId] = useState<{ [key: number]: boolean }>({});

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || 'null');
      const pedidos = JSON.parse(localStorage.getItem('admin_pedidos') || '[]');
      if (usuarioLogado && usuarioLogado.nome) {
        setOrdens(pedidos.filter((p: any) => p.cliente === usuarioLogado.nome));
      } else {
        setOrdens([]);
      }
    }
  }, []);

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'Concluído';
      case 'parado':
        return 'Parado';
      case 'processando':
        return 'Processando';
      default:
        return 'Pendente';
    }
  };

  const formatDate = (id: string) => {
    try {
      const date = new Date(parseInt(id));
      return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
    } catch {
      return 'Data não disponível';
    }
  };

  const handleNewOrder = () => {
    window.location.href = '/dashboard';
  };

  const toggleIdVisibility = (index: number) => {
    setShowFullId(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      <UserMenu active="pedido" />
      <Container>
        <Header>
          <Title>Histórico de Pedidos</Title>
          <Subtitle>Acompanhe o status dos seus pedidos de comentários</Subtitle>
        </Header>

        <TableContainer>
          {ordens.length === 0 ? (
            <EmptyState>
              <EmptyIcon>📋</EmptyIcon>
              <EmptyText>Você ainda não fez nenhum pedido</EmptyText>
              <NewOrderButton onClick={handleNewOrder}>
                Fazer Primeiro Pedido
              </NewOrderButton>
            </EmptyState>
          ) : (
            <Table>
              <thead>
                <tr>
                  <TableHeader>ID do Pedido</TableHeader>
                  <TableHeader>Link</TableHeader>
                  <TableHeader>Comentários</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Ações</TableHeader>
                </tr>
              </thead>
              <tbody>
                {ordens.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <IdContainer>
                        <IdDisplay>
                          #{order.id || (index + 1).toString().padStart(6, '0')}
                        </IdDisplay>
                        <IdButton onClick={() => toggleIdVisibility(index)}>
                          {showFullId[index] ? 
                            `#${order.id || (index + 1).toString().padStart(6, '0')}` : 
                            'VER ID'
                          }
                        </IdButton>
                      </IdContainer>
                    </TableCell>
                    <TableCell>
                      <a 
                        href={order.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          color: '#00ff88',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                      >
                        Ver Post ↗
                      </a>
                    </TableCell>
                    <TableCell>
                      {Array.isArray(order.comentarios) ? order.comentarios.length : (order.enviados || 0)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status || 'pendente'}>
                        {getStatusText(order.status)}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <ActionButton onClick={() => handleViewOrder(order)}>
                        Ver Detalhes
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </TableContainer>

        <ModalOverlay $isOpen={isModalOpen} onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Detalhes do Pedido</ModalTitle>
              <CloseButton onClick={closeModal}>×</CloseButton>
            </ModalHeader>

            {selectedOrder && (
              <>
                <ModalSection>
                  <ModalLabel>ID do Pedido</ModalLabel>
                  <ModalValue>#{selectedOrder.id || 'N/A'}</ModalValue>
                </ModalSection>

                <ModalSection>
                  <ModalLabel>Data/Hora</ModalLabel>
                  <ModalValue>{formatDate(selectedOrder.id || Date.now().toString())}</ModalValue>
                </ModalSection>

                <ModalSection>
                  <ModalLabel>Link do Post</ModalLabel>
                  <ModalValue>
                    <a 
                      href={selectedOrder.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#00ff88', textDecoration: 'none' }}
                    >
                      {selectedOrder.link}
                    </a>
                  </ModalValue>
                </ModalSection>

                <ModalSection>
                  <ModalLabel>Quantidade de Comentários</ModalLabel>
                  <ModalValue>
                    {Array.isArray(selectedOrder.comentarios) ? selectedOrder.comentarios.length : (selectedOrder.enviados || 0)} comentários
                  </ModalValue>
                </ModalSection>

                <ModalSection>
                  <ModalLabel>Status</ModalLabel>
                  <ModalValue>
                    <StatusBadge status={selectedOrder.status || 'pendente'}>
                      {getStatusText(selectedOrder.status)}
                    </StatusBadge>
                  </ModalValue>
                </ModalSection>

                {Array.isArray(selectedOrder.comentarios) && selectedOrder.comentarios.length > 0 && (
                  <ModalSection>
                    <ModalLabel>Comentários Enviados</ModalLabel>
                    <CommentsContainer>
                      {selectedOrder.comentarios.map((comment: string, index: number) => (
                        <CommentItem key={index}>
                          "{comment}"
                        </CommentItem>
                      ))}
                    </CommentsContainer>
                  </ModalSection>
                )}

                <ModalFooter>
                  <ActionButton onClick={closeModal}>Fechar</ActionButton>
                  <NewOrderButton onClick={handleNewOrder}>
                    Fazer Novo Pedido
                  </NewOrderButton>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      </Container>
    </>
  );
}