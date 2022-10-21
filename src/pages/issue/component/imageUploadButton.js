import styled from "styled-components";
import "./imageUploadButton.css";

const Box = styled.div`
	& > img {
		width: 237px;
		height: 153px;
	}

	& > label {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	& > input {
		display: none;
	}

	.button-upload {
		width: 100%;
		object-fit: contain;
		margin: auto;
	}

	label {
		cursor: pointer;
	}
`;

function ImageUploadButton({ onUpload }) {
	return (
		<Box className="Box">
			<img
				src="/photo.png"
				alt="ss"
				style={{
					width: "237px",
					height: "153px",
					margin: "auto",
					verticalAlign: "middle",
				}}
			/>
			<label htmlFor="button-upload"></label>
			<input
				id="button-upload"
				type="file"
				accept="image/jpg, image/png, image/jpeg"
				onChange={onUpload}
			/>
		</Box>
	);
}

export default ImageUploadButton;