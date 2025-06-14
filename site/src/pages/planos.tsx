import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserMenu from '../components/UserMenu';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0b0d 0%, #1a1d21 100%);
  color: #FFF;
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
`;

const Title = styled.h2`
  color: #00ff88;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TableContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(26, 29, 33, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(0, 255, 136, 0.1);
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  min-width: 600px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const TableHeader = styled.th`
  background: linear-gradient(135deg, #00ff88, #00e67a);
  color: #0a0b0d;
  padding: 1.2rem 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:first-child {
    border-radius: 12px 0 0 12px;
  }

  &:last-child {
    border-radius: 0 12px 12px 0;
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    font-size: 0.9rem;
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
`;

const TableCell = styled.td`
  padding: 1.5rem 1rem;
  color: #ffffff;
  font-size: 1.1rem;
  vertical-align: middle;
  text-align: center;
  font-weight: 500;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    font-size: 1rem;
  }
`;

const QuantityCell = styled(TableCell)`
  font-weight: 600;
  color: #00ff88;
`;

const PriceCell = styled(TableCell)`
  font-weight: 700;
  color: #ffffff;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const BuyButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  color: #0a0b0d;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 120px;
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.4);
    background: linear-gradient(135deg, #00e67a, #00ff88);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
    min-width: 100px;
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
  margin-bottom: 1rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalBox = styled.div`
  background: linear-gradient(145deg, #1a1d21, #242831);
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  padding: 2.5rem 2rem 2rem;
  min-width: 350px;
  max-width: 90vw;
  min-height: 300px;
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  color: #00ff88;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 255, 136, 0.1);
    transform: rotate(90deg);
  }
`;

const ModalTitle = styled.h3`
  color: #00ff88;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ModalDescription = styled.div`
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const QRContainer = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 1rem;
  margin: 1.5rem 0;
  display: inline-block;
`;

const QRCode = styled.img`
  max-width: 220px;
  display: block;
`;

const PixCode = styled.div`
  word-break: break-all;
  background: rgba(26, 29, 33, 0.8);
  color: #00ff88;
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
  font-size: 0.9rem;
  font-family: monospace;
  border: 1px solid rgba(0, 255, 136, 0.2);
`;

const CopyButton = styled.button`
  margin: 1rem auto 0;
  display: block;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  color: #0a0b0d;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 255, 136, 0.3);
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #00ff88, #00e67a);
  color: #0a0b0d;
  font-weight: 700;
  border-radius: 15px;
  padding: 1.5rem 2rem;
  margin: 2rem auto;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
  font-size: 1.1rem;
`;

const LoadingText = styled.div`
  color: #00ff88;
  font-size: 1.1rem;
  margin: 1rem 0;
`;

const ErrorText = styled.div`
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
  border: 1px solid rgba(255, 107, 107, 0.3);
`;

const PaymentSuccess = styled.div`
  color: #00ff88;
  background: rgba(0, 255, 136, 0.1);
  padding: 2rem;
  border-radius: 15px;
  margin: 1.5rem 0;
  font-weight: 600;
  font-size: 1.2rem;
  border: 2px solid rgba(0, 255, 136, 0.3);
`;

export default function Planos() {
  const [modal, setModal] = useState<{valor:number, descricao:string}|null>(null);
  const [qr, setQr] = useState<{qr_code_base64:string, qr_code:string}|null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [planos, setPlanos] = useState<any[]>([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [pixPaid, setPixPaid] = useState(false);

  async function abrirPix(valor:number, descricao:string) {
    setModal({valor, descricao});
    setLoading(true);
    setErro('');
    setQr(null);
    try {
      const resp = await fetch('/api/pix', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({valor, descricao})
      });
      const data = await resp.json();
      if(data.qr_code_base64 && data.qr_code) {
        setQr({qr_code_base64: data.qr_code_base64, qr_code: data.qr_code});
        let pollingInterval: NodeJS.Timeout;
        const checkPixStatus = async () => {
          try {
            const idToCheck = data.txid || data.payment_id;
            if (!idToCheck) {
              console.error('Erro: Nenhum ID disponível para verificar status');
              return;
            }

            const statusResp = await fetch(`/api/pix-status?txid=${idToCheck}`);
            const statusData = await statusResp.json();

            if (statusData.status === 'approved' || statusData.status === 'pago' || statusData.status === 'concluido') {
              clearInterval(pollingInterval);

              const planoComprado = planos.find(p => Number(p.preco) === Number(valor));
              const qtd = planoComprado ? planoComprado.quantidade : null;

              if (qtd) {
                const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || 'null');

                if (usuarioLogado) {
                  usuarioLogado.comentarios = (usuarioLogado.comentarios || 0) + qtd;
                  localStorage.setItem('usuario_logado', JSON.stringify(usuarioLogado));

                  fetch('/api/clientes', {
                    method: 'PUT',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                      email: usuarioLogado.email,
                      comentarios: usuarioLogado.comentarios
                    })
                  });

                  setSuccessMsg(`Parabéns! Você recebeu +${qtd} comentários no seu saldo.`);
                  setPixPaid(true);
                  setQr(null);

                  alert('Saldo atualizado! Você recebeu +' + qtd + ' comentários!');

                  setTimeout(() => {
                    setModal(null);
                    window.location.href = '/dashboard';
                  }, 2000);
                }
              }
            }
          } catch (e) {
            console.error('Erro ao verificar status do pagamento:', e);
          }
        };

        pollingInterval = setInterval(checkPixStatus, 4000);
        checkPixStatus();
      } else {
        setErro(data.error ? `${data.error}${data.detalhes ? ' - ' + (data.detalhes.message || JSON.stringify(data.detalhes)) : ''}` : 'Erro ao gerar Pix. Tente novamente.');
      }
    } catch {
      setErro('Erro ao conectar ao MercadoPago.');
    }
    setLoading(false);
  }

  async function fetchPlanosFromServer() {
    try {
      const timestamp = Date.now();
      const resp = await fetch(`/api/planos?nocache=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      if (!resp.ok) {
        throw new Error(`Erro ao buscar planos: ${resp.status}`);
      }

      const data = await resp.json();

      if (data.planos && Array.isArray(data.planos)) {
        setPlanos(data.planos);
      } else {
        setPlanos([]);
      }
    } catch (err) {
      console.error('Erro ao buscar planos do servidor:', err);
      setPlanos([]);
    }
  }

  useEffect(() => {
    fetchPlanosFromServer();

    const intervalId = setInterval(() => {
      fetchPlanosFromServer();
    }, 5000);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchPlanosFromServer();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <>
      <UserMenu active="planos" />
      <Container>
        <Header>
          <Title>Pacotes de Comentários</Title>
          <Subtitle>
            Escolha o plano ideal para impulsionar seu engajamento no Instagram
          </Subtitle>
        </Header>

        <TableContainer>
          {planos.length === 0 ? (
            <EmptyState>
              <EmptyIcon>📦</EmptyIcon>
              <EmptyText>Nenhum plano disponível no momento.</EmptyText>
            </EmptyState>
          ) : (
            <Table>
              <thead>
                <tr>
                  <TableHeader>Quantidade</TableHeader>
                  <TableHeader>Plano</TableHeader>
                  <TableHeader>Preço</TableHeader>
                </tr>
              </thead>
              <tbody>
                {planos.map((plano: any, i: number) => (
                  <TableRow key={i}>
                    <QuantityCell>{plano.quantidade} Comentários</QuantityCell>

                    <TableCell>
                      <BuyButton 
                        onClick={() => abrirPix(
                          Number(plano.preco), 
                          `${plano.quantidade} Comentários`
                        )}
                      >
                        Comprar
                      </BuyButton>
                    </TableCell>

                    <PriceCell>
                      R$ {Number(plano.preco).toFixed(2).replace('.', ',')}
                    </PriceCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </TableContainer>
      </Container>

      {successMsg && (
        <SuccessMessage>{successMsg}</SuccessMessage>
      )}

      {modal && (
        <ModalOverlay>
          <ModalBox>
            <CloseButton onClick={() => setModal(null)}>×</CloseButton>

            <ModalTitle>💳 Pagamento via PIX</ModalTitle>
            <ModalDescription>
              {modal.descricao} - <strong>R$ {modal.valor.toFixed(2).replace('.', ',')}</strong>
            </ModalDescription>

            {loading && <LoadingText>⏳ Gerando QR Code...</LoadingText>}
            {erro && <ErrorText>{erro}</ErrorText>}

            {qr && !pixPaid && (
              <>
                <QRContainer>
                  <QRCode 
                    src={`data:image/png;base64,${qr.qr_code_base64}`} 
                    alt="QR Code PIX" 
                  />
                </QRContainer>

                <PixCode>{qr.qr_code}</PixCode>

                <CopyButton onClick={() => {
                  navigator.clipboard.writeText(qr.qr_code);
                }}>
                  📋 Copiar Código PIX
                </CopyButton>
              </>
            )}

            {pixPaid && (
              <PaymentSuccess>
                ✅ Pagamento confirmado com sucesso!<br/>
                Redirecionando para o dashboard...
              </PaymentSuccess>
            )}
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
}