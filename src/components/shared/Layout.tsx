import { ReactElement } from 'react';
import styled from 'styled-components';

interface ILayoutProps {
  children: ReactElement | ReactElement[];
  withHeader: boolean;
  headerTitle: string;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HeaderContainer = styled.header`
  padding: 1rem;
`;

const BodyContainer = styled.div`
  flex: 1;
`

export default function Layout({
  children,
  withHeader,
  headerTitle
}: ILayoutProps) {
  return (
    <LayoutContainer>
      { withHeader &&
        <HeaderContainer>
          <h1>{ headerTitle }</h1>
        </HeaderContainer>
      }
      <BodyContainer>
        { children }
      </BodyContainer>
    </LayoutContainer>
  )
}
