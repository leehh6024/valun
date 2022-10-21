import React, { useState } from "react";
import Category from "./Navigation/Category.jsx";
import styled from "styled-components";
import GlobalContext from "../../../common/context/store";
import { useContext } from "react";

const UserTabContainer = styled.div`
	position: absolute;
	z-index: 7;
	width: 270px;
	left: 0px;
	top: 0px;
	background: white;
	height: calc(var(--vh, 1vh) * 100);
`;

const CloseUserTab = styled.div`
	position: absolute;
	z-index: 5;
	width: 162px;
	height: 914px;
	left: 270px;
	top: 0px;
	background: rgba(0, 0, 0, 0.25);
`;

const UserProfileImage = styled.div`
	position: absolute;
	z-index: 7;
	width: 46px;
	height: 46px;
	left: 112px;
	top: 58px;
	background: white;
`;

const UserNickname = styled.div`
	position: absolute;
	z-index: 7;
	width: 50px;
	height: 22px;
	left: 110px;
	top: 113px;
	background: white;
	border: none;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 22px;
	text-align: center;
`;

const UserToolbar = styled.div`
	position: absolute;
	z-index: 7;
	width: 260px;
	height: 43px;
	left: 0px;
	top: 162px;
	background: white;
`;

export default function UserTab() {
	const toolbars = [
		{
			id: 1,
			src: "/toolbar/myissue.png",
		},
		{
			id: 2,
			src: "/toolbar/new-writting.png",
		},
		{
			id: 3,
			src: "/toolbar/bookmark.png",
		},
		{
			id: 4,
			src: "/toolbar/settings.png",
		},
	];

	const { state, setState } = useContext(GlobalContext);

	function closeUserTab() {
		setState((prev) => ({ ...prev, usertab: false }));
	}

	return (
		<div>
			{state && (
				<UserTabContainer>
					<CloseUserTab onClick={closeUserTab} />
					<UserProfileImage>
						<img src="userprofile-small.png" alt="userprofile-small" />
					</UserProfileImage>
					<UserNickname>조현성</UserNickname>
					<UserToolbar>
						<button
							style={{
								background: "white",
								border: "none",
								width: "34px",
								height: "43px",
								position: "absolute",
								left: "30px",
							}}
						>
							<img
								src={toolbars[0].src}
								style={{
									width: "20px",
									height: "20px",
									position: "absolute",
									left: "7px",
									top: "0",
								}}
							/>
							<div
								style={{
									width: "34px",
									height: "15px",
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "12px",
									position: "absolute",
									left: "0",
									top: "28px",
								}}
							>
								내제보
							</div>
						</button>
						<button
							style={{
								background: "white",
								border: "none",
								width: "26px",
								height: "43px",
								position: "absolute",
								left: "84px",
							}}
						>
							<img
								src={toolbars[1].src}
								style={{
									width: "20px",
									height: "20px",
									position: "absolute",
									left: "3px",
									top: "0px",
								}}
							/>
							<div
								style={{
									width: "26px",
									height: "15px",
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "12px",
									lineHeight: "15px",
									position: "absolute",
									left: "0px",
									top: "28px",
								}}
							>
								내 글
							</div>
						</button>
						<button
							style={{
								background: "white",
								border: "none",
								width: "45px",
								height: "43px",
								position: "absolute",
								left: "130px",
							}}
						>
							<img
								src={toolbars[2].src}
								style={{
									width: "20px",
									height: "20px",
									position: "absolute",
									top: "0px",
									left: "12.5px",
								}}
							/>
							<div
								style={{
									width: "45px",
									height: "15px",
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "12px",
									lineHeight: "15px",
									position: "absolute",
									top: "28px",
									left: "0px",
								}}
							>
								즐겨찾기
							</div>
						</button>
						<button
							style={{
								background: "white",
								border: "none",
								width: "45px",
								height: "43px",
								position: "absolute",
								left: "195px",
							}}
						>
							<img
								src={toolbars[3].src}
								style={{
									width: "20px",
									height: "20px",
									position: "absolute",
									left: "12.5px",
									top: "0px",
								}}
							/>
							<div
								style={{
									width: "45px",
									height: "15px",
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "12px",
									lineHeight: "15px",
									position: "absolute",
									left: "0px",
									top: "28px",
								}}
							>
								환경설정
							</div>
						</button>
					</UserToolbar>
					<hr
						style={{
							position: "absolute",
							width: "270px",
							top: "235px",
							border: "1px solid #f5f5f5",
						}}
					/>
					<Category />
				</UserTabContainer>
			)}
		</div>
	);
}