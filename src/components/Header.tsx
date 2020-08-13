import React from "react";
import styled from "styled-components";

const HeaderParent = styled.div`
  padding: 5px 30px;
  margin-top: -60px;
  height: 50px;
  background-color: #393632;
  display: flex;
`;

const Logo = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='25' viewBox='0 0 32 25'%3E%3Cg fill='%23C74634'%3E%3Cpath d='M9.9,20.1c-5.5,0-9.9-4.4-9.9-9.9c0-5.5,4.4-9.9,9.9-9.9h11.6c5.5,0,9.9,4.4,9.9,9.9c0,5.5-4.4,9.9-9.9,9.9H9.9 M21.2,16.6c3.6,0,6.4-2.9,6.4-6.4c0-3.6-2.9-6.4-6.4-6.4h-11c-3.6,0-6.4,2.9-6.4,6.4s2.9,6.4,6.4,6.4H21.2'/%3E%3C/g%3E%3C/svg%3E");
  width: 44px;
  height: 44px;
  transform: translate(-4px, 2px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 36px;
`;

const HeaderTitle = styled.div`
  padding-top: 9px;
  padding-left: 7px;
  font-size: 20px;
  color: #fff;
  font-family: "OracleSansVF", "OracleSansVFCyGr", "Segoe UI", "Helvetica Neue";
`;

export default function Header(): JSX.Element {
  return (
    <HeaderParent>
      <Logo />
      <HeaderTitle>Aconex</HeaderTitle>
    </HeaderParent>
  );
}
