import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	width: 100%;
	height: 45px;
	margin-top: 50px;

	display: flex;
	justify-content: space-between;
	font-weight: 700;
	font-size: 16px;
`;
const TabItem = styled.div`
	padding: 4px;
	opacity: 0.5;
	width: 50%;
	border-bottom: ${(props) => props.isActive && "2px solid #6AC47A"};
	opacity: ${(props) => props.isActive && 1};
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;

function Tab({ activeTab, setActiveTab }) {
	return (
		<Wrapper>
			<TabItem isActive={activeTab === "Q"} onClick={() => setActiveTab("Q")}>
				퀘스트
			</TabItem>
			<TabItem isActive={activeTab === "T"} onClick={() => setActiveTab("T")}>
				거래
			</TabItem>
		</Wrapper>
	);
}

export default Tab;
