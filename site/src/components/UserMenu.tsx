
import styled from 'styled-components';
import Link from 'next/link';

const MenuBar = styled.nav`
  width: 100%;
  background: rgba(10, 11, 13, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    gap: 0.25rem;
    padding: 0 0.5rem;
  }
`;

const MenuLink = styled.a<{$active?: boolean}>`
  color: ${({$active}) => $active ? '#0a0b0d' : '#ffffff'};
  background: ${({$active}) => $active ? 
    'linear-gradient(135deg, #00ff88, #00e67a)' : 
    'rgba(26, 29, 33, 0.6)'
  };
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid ${({$active}) => $active ? 
    'transparent' : 
    'rgba(0, 255, 136, 0.2)'
  };
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #00ff88, #00e67a);
    transition: left 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: #0a0b0d;
    border-color: #00ff88;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 255, 136, 0.3);

    &:before {
      left: 0;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.6rem 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
`;

interface UserMenuProps {
  active: 'dashboard' | 'pedido' | 'planos' | 'editar-perfil';
}

export default function UserMenu({ active }: UserMenuProps) {
  return (
    <MenuBar>
      <MenuContainer>
        <Link href="/dashboard" passHref legacyBehavior>
          <MenuLink $active={active==='dashboard'}>Dashboard</MenuLink>
        </Link>
        <Link href="/pedido" passHref legacyBehavior>
          <MenuLink $active={active==='pedido'}>Pedidos</MenuLink>
        </Link>
        <Link href="/planos" passHref legacyBehavior>
          <MenuLink $active={active==='planos'}>Planos</MenuLink>
        </Link>
        <Link href="/editar-perfil" passHref legacyBehavior>
          <MenuLink $active={active==='editar-perfil'}>Editar Perfil</MenuLink>
        </Link>
      </MenuContainer>
    </MenuBar>
  );
}
