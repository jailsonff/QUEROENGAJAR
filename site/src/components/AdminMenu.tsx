
import styled from 'styled-components';

const MenuBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: linear-gradient(135deg, #0a0b0d 0%, #1a1d21 100%);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid rgba(0, 255, 136, 0.3);
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 100;
  margin-bottom: 0;
  overflow-x: auto;

  @media (max-width: 968px) {
    padding: 0.75rem 0;
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    flex-wrap: nowrap;
    gap: 0.25rem;
    min-height: 60px;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0;
    min-height: 50px;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 968px) {
    justify-content: flex-start;
    padding: 0 0.75rem;
  }

  @media (max-width: 768px) {
    gap: 0.3rem;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
    padding: 0 0.25rem;
  }
`;

const MenuLink = styled.button<{$active?: boolean}>`
  color: ${({$active}) => $active ? '#0a0f0a' : '#ffffff'};
  background: ${({$active}) => 
    $active 
      ? 'linear-gradient(135deg, #00ff88 0%, #00e67a 100%)' 
      : 'rgba(26, 29, 33, 0.8)'
  };
  font-weight: 700;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  margin: 0;
  border: 2px solid ${({$active}) => 
    $active 
      ? 'rgba(0, 255, 136, 0.5)' 
      : 'rgba(0, 255, 136, 0.2)'
  };
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  box-shadow: ${({$active}) => 
    $active 
      ? '0 4px 20px rgba(0, 255, 136, 0.4)' 
      : '0 2px 8px rgba(0, 0, 0, 0.2)'
  };
  white-space: nowrap;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: ${({$active}) => 
      $active 
        ? 'linear-gradient(135deg, #00e67a 0%, #00cc6a 100%)' 
        : 'linear-gradient(135deg, #00ff88 0%, #00e67a 100%)'
    };
    color: #0a0f0a;
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 255, 136, 0.5);
    border-color: #00ff88;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 968px) {
    font-size: 0.9rem;
    padding: 0.65rem 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.55rem 0.9rem;
    letter-spacing: 0.3px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.45rem 0.7rem;
    letter-spacing: 0.2px;
    border-radius: 6px;
  }

  @media (max-width: 360px) {
    font-size: 0.65rem;
    padding: 0.4rem 0.6rem;
    letter-spacing: 0.1px;
  }
`;

const MenuTitle = styled.div`
  color: #00ff88;
  font-size: 1.5rem;
  font-weight: 800;
  margin-right: 2rem;
  text-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 968px) {
    display: none;
  }
`;

interface AdminMenuProps {
  active: 'clientes' | 'pedidos' | 'pacotes' | 'planos';
  onSelect: (section: 'clientes' | 'pedidos' | 'pacotes' | 'planos') => void;
}

export default function AdminMenu({ active, onSelect }: AdminMenuProps) {
  return (
    <MenuBar>
      <MenuContainer>
        <MenuTitle>
          <span>⚡</span>
          Admin
        </MenuTitle>
        <MenuLink $active={active==='clientes'} onClick={()=>onSelect('clientes')}>
          👥 Clientes
        </MenuLink>
        <MenuLink $active={active==='pedidos'} onClick={()=>onSelect('pedidos')}>
          📋 Pedidos
        </MenuLink>
        <MenuLink $active={active==='pacotes'} onClick={()=>onSelect('pacotes')}>
          📦 Pacotes
        </MenuLink>
        <MenuLink $active={active==='planos'} onClick={()=>onSelect('planos')}>
          💎 Planos
        </MenuLink>
      </MenuContainer>
    </MenuBar>
  );
}
