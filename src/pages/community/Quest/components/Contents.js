import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { geocoder, kakao } from "../../../../common/context/store";
import { useRef } from "react";

export default function ContentPreview({ data }) {
	// const address = useRef("");
	const [address, setAddress] = useState("");
	useEffect(() => {
		const coords = new kakao.maps.LatLng(data.location.lat, data.location.lng);
		geocoder.coord2RegionCode(
			coords.getLng(),
			coords.getLat(),
			(result, status) => {
				// address.current =
				setAddress(
					result[0].region_1depth_name +
						" " +
						result[0].region_2depth_name +
						" " +
						result[0].region_3depth_name
				);
			}
		);
	}, []);

	return (
		<div>
			<ContentsContainer>
				<ContentsImage>
					<img src={data.image} alt="image" />
				</ContentsImage>
				<ContentsTitle>
					<div>{data.title}</div>
				</ContentsTitle>
				<ContentsAddress>
					<div>{address}</div>
				</ContentsAddress>
				<ContentsBrush>
					<img src="/brush.png" alt="brush" />
					<span>{data.price}</span>
				</ContentsBrush>
			</ContentsContainer>
		</div>
	);
}

const ContentsContainer = styled.div`
	position: relative;
	width: 100%;
	height: 16vh;
	border-bottom: 1px solid #eeeeee;
	margin-bottom: 6%;
`;
const ContentsImage = styled.div`
	position: absolute;
	left: 3%;
	img {
		width: 100px;
		height: 100px;
	}
`;
const ContentsAddress = styled.div`
	position: absolute;
	left: 32%;
	top: 18%;
	display: flex;

	font-weight: 400;
	font-family: "Inter";
	font-style: "regular";
	font-size: 12px;
	color: #464646;
`;
const ContentsTitle = styled.div`
	position: absolute;
	left: 32%;
	top: 34%;
	display: flex;

	font-weight: 700;
	font-family: "Inter";
	font-style: "regular";
	font-size: 16px;
	color: #464646;
`;
const ContentsBrush = styled.div`
	position: absolute;
	width: 10%;
	height: 100px;
	right: 3%;
	padding-top: 24px;

	border: none;
	background-color: #f5f6f8;

	img {
		width: 28px;
		height: 28px;

		margin: auto;
		margin-bottom: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		vertical-align: bottom;
	}
	span {
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		vertical-align: bottom;

		font-family: Inter;
		font-style: bold;
		font-weight: 700;
		font-size: 12px;
		line-height: 15px;
		color: #6ac47a;
	}
`;
