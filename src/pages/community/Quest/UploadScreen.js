import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";
import GlobalContext from "../../../common/context/store";
import "./UploadScreen.css";
import { API } from "../../../service.js";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import UploadAddButton from "./UploadAddButton.js";
import UploadImage from "./UploadImage.js";

const UploadQuestBoard = styled.div`
	display: grid;
	grid-template-columns: 0.4fr 0.4fr 0.4fr 0.4fr;
	row-gap: 1rem;

	margin-top: 20px;
	margin-left: 0px;
	margin-right: 20px;

	label {
		cursor: pointer;
	}
`;

export default function UploadScreen() {
	const { globalRef } = useContext(GlobalContext);
	const { state } = useLocation();

	const [files, setFiles] = useState([]);
	const [modal, setModal] = useState(false);

	const [image, setImage] = useState("");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [price, setPrice] = useState(0);

	const createPostQuest = async () => {
		const formData = new FormData();

		const postQuest = {
			title,
			body,
			price,
			location: {
				lat: Number(globalRef.current.userLocation.lat),
				lng: Number(globalRef.current.userLocation.lng),
			},
		};
		formData.append("title", postQuest.title);
		formData.append("body", postQuest.body);
		formData.append("price", postQuest.price);
		formData.append("lat", postQuest.location.lat);
		formData.append("lng", postQuest.location.lng);
		formData.append("image", image);

		if (state.activeTab == "Q") {
			const data = await API.createPostQuest(formData);
			if (!data.success) alert(data.message);
		} else {
			const data = await API.createPostTrade(formData);
			if (!data.success) alert(data.message);
		}
	};

	const onTitledChange = (e) => setTitle(e.target.value);
	const onBodyChange = (e) => setBody(e.target.value);
	const onPriceChange = (e) => setPrice(e.target.value);

	const onFileChange = useCallback(
		(e) => {
			if (e.target.files && e.target.files[0]) {
				if (files.length === 3) {
					alert("????????? ?????? 3????????? ????????? ??? ?????????");
					return;
				}
				setImage(e.target.files[0]);
				setFiles((files) => [...files, e.target.files[0]]);
			}
		},
		[files.length]
	);
	const onRemovePicture = useCallback((idx) => {
		setFiles((files) => files.filter((file, index) => idx !== index));
	}, []);
	const onModalOpen = () => {
		setModal(true);
	};
	const onModalClose = () => {
		setModal(false);
	};
	return (
		<div>
			<UploadScreenContainer>
				<Link to="/community">
					<BackBtn>
						<img src="/community/btn-back.png" />
					</BackBtn>
				</Link>
				<UploadTitle>?????? ??????</UploadTitle>

				<ImageUploadContainer>
					<h3 className="trade-image">
						?????????<h4 className="trade-text">(1??? ?????? ??????)</h4>
					</h3>

					<UploadQuestBoard>
						<UploadAddButton onFileChange={onFileChange} />

						{files &&
							files.map((file, index) => {
								return (
									<UploadImage
										key={index}
										index={index}
										file={file}
										onRemovePicture={onRemovePicture}
									/>
								);
							})}
					</UploadQuestBoard>
				</ImageUploadContainer>

				<TradeTitleContainer>
					<h3 className="trade-title">?????????</h3>
					<input
						className="input-trade-name"
						type="text"
						placeholder="???????????? ??????????????????"
						onChange={onTitledChange}
					/>
				</TradeTitleContainer>

				<TradeInfoContainer>
					<h3 className="trade-info">?????? ??????</h3>
					<textarea
						className="input-trade-info"
						type="text"
						maxLength="1000"
						placeholder="???????????? ?????? ????????? ????????? ?????????. ???????????? ????????? ????????? ?????????. (1000???)"
						onChange={onBodyChange}
					/>
				</TradeInfoContainer>

				<BrushContainer>
					<h3 className="brush">????????? ?????? ??????</h3>
					<input
						className="input-brush"
						type="number"
						placeholder="????????? ?????? ?????? (?????? 100??? ??????)"
						onChange={onPriceChange}
					/>
				</BrushContainer>

				<RegisterTrade>
					{/* ??????????????? ?????????????????? ????????? | ????????????  */}
					<div
						onClick={() => {
							createPostQuest();
							onModalOpen();
						}}
					>
						?????? ????????????
					</div>
				</RegisterTrade>
				{modal && (
					<>
						<ModalContainer />

						<Modal onClick={onModalClose}>
							?????? ????????? <br />
							?????????????????????.
							<Link to="/community">
								<ReturnCommunityBtn>??? ???????????? ????????????</ReturnCommunityBtn>
							</Link>
						</Modal>
					</>
				)}
			</UploadScreenContainer>
		</div>
	);
}

const ReturnCommunityBtn = styled.div`
	position: absolute;
	width: 90%;
	height: 20%;
	top: 70%;
	right: 5%;

	border: none;
	border-radius: 5px;
	background-color: #6ac47a;

	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;

	font-family: "Pretendard";
	font-style: normal;
	font-weight: 700;
	font-size: 15px;
	line-height: 21px;
	color: white;
`;
const ModalContainer = styled.div`
	position: absolute;
	width: 100%;
	min-height: 100vh;

	background-color: grey;
	opacity: 0.4;
`;

const Modal = styled.div`
	position: absolute;
	width: 60%;
	height: 20%;
	left: 50%;
	top: 50%;
	padding-top: 3%;
	padding-bottom: 10%;

	background-color: white;
	border-radius: 15px;

	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	transform: translate(-50%, -55%);

	font-family: "Pretendard";
	font-style: normal;
	font-weight: 700;
	font-size: 18px;
	line-height: 21px;
	color: #464646;
`;

const UploadScreenContainer = styled.div`
	position: absolute;
	width: 100%;
	height: calc(var(--vh, 1vh) * 100);
	background-color: white;
`;
const BackBtn = styled.div`
	position: absolute;
	z-index: 5;
	display: flex;
	width: 1%;
	left: 3%;
	top: 6%;
	cursor: pointer;
`;

const UploadTitle = styled.div`
	position: absolute;
	display: flex;
	width: 100%;
	margin: auto;
	top: 6%;

	display: flex;
	justify-content: center;
	align-items: center;

	font-family: "Pretendard";
	font-style: normal;
	font-weight: 700;
	font-size: 18px;
	line-height: 21px;
	color: #464646;
`;

const ImageUploadContainer = styled.div`
	position: absolute;
	display: grid;
	margin: auto;
	width: 100%;
	height: 2%;
	left: 3%;
	top: 14%;
`;
const TradeTitleContainer = styled.div`
	position: absolute;
	display: block;
	margin: auto;
	left: 3%;
	top: 36%;
	width: 96%;

	input {
		font-family: "Pretendard";
		font-style: normal;
		font-weight: 700;
		font-size: 12px;
		line-height: 16px;
		color: #464646;
	}
`;

const TradeInfoContainer = styled.div`
	position: absolute;
	display: block;
	margin: auto;
	left: 3%;
	top: 50%;
	width: 96%;

	textarea {
		left: 0%;
		margin-top: 1%;
		background-color: white;
		font-family: "Pretendard";
		font-style: normal;
		font-weight: 700;
		font-size: 12px;
		line-height: 16px;
		color: #464646;
	}
`;

const BrushContainer = styled.div`
	position: absolute;
	display: block;
	margin: auto;
	left: 3%;
	top: 70%;
	width: 94%;
`;

const RegisterTrade = styled.div`
	position: absolute;
	margin: auto;
	left: 3%;
	top: 90%;

	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	width: 94%;
	height: 3rem;
	border: none;
	border-radius: 5px;
	background-color: #6ac47a;
	color: white;

	font-family: "Pretendard";
	font-style: normal;
	font-weight: 700;
	font-size: 18px;
	line-height: 21px;
`;
