import React from "react";
import styled from "styled-components";

const List = styled.ul`
	display: ${(p) => (p.expanded ? "block" : "none")};
	margin: 0px;
	padding: 0px;
	padding-left: 20px;
	list-style: none;
`;

function NavList({ children, expanded = true }) {
	return <List expanded={expanded}>{children}</List>;
}

export default NavList;
