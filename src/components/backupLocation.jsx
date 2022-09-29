import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import "./Location.css";
import ModalBasic from "./ModalBasic";

const { kakao } = window;
const nowLoc = { lat: 37.454334, longitude: 127.130338 };
var container, options, map;

async function getIssuePointsAPI(){
    const res = await axios({
        method: "GET",
        url: "http://43.200.121.200:3000/",
    })

    return res.data;
}

export default function Location() {
    const [locations, setLocations] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState("");
    const outside = useRef();

    useEffect(() => {
        const clickOutside = e => {
            if (modalOpen && outside.current && !outside.current.contains(e.target)) {
                setModalOpen(false);
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [modalOpen])
    
    // 서버와의 통신
    const getIssuePoints = useCallback(async () =>{
        const data = await getIssuePointsAPI();
        // console.log(data);
        if (data){
            const processedLocation = data.data.map((issuePoint) => {
                return {
                    title:issuePoint.title,
                    class:issuePoint.class,
                    latlng:new kakao.maps.LatLng(issuePoint.latitude, issuePoint.longitude),
                }
            })
            console.log(processedLocation);

            setLocations(processedLocation);
        }
    }, []);

    const makeModalShow = (title)=>{
        return function () {
            setModalData(title);
            setModalOpen(true);
        }
    }

    const closeModal = () => {
        setModalOpen(false);
    }
    // 맵 만들기
    useEffect( () => {
        container = document.getElementById("map");
        options = {
            center: new kakao.maps.LatLng(nowLoc.lat, nowLoc.longitude),
            level: 2,
        };
        map = new kakao.maps.Map(container, options);
    }, []);

    useEffect(() => {
        getIssuePoints();
    }, [getIssuePoints]);

    useEffect(() => {
        for (var i = 0; i < locations.length; i++) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: locations[i].latlng, // 마커를 표시할 위치
                title: locations[i].title,
            });

            kakao.maps.event.addListener(marker, 'click', makeModalShow(locations[i].title) );
        }
    }, [locations]);

    return (
        <div>
            <div id="map" style={{ width: "432px", height: "940px", margin: "auto" }}></div>
            {modalOpen && <ModalBasic title={modalData} />}
            <button onClick={closeModal}>XXX</button>
            <div ref={outside}>
                <div onClick={() => setModalOpen((pre) => !pre)}>닫기</div>
            </div>
        </div>
    );
}

// 0.000001 => 10cm
/*-
1. 현재 위치 받아서 변수에 저장 (서버에 보내는척 하는거임) -> (x, y)
    func(x, y) -> 반환하는 값 : 임시좌표 여러 개
2. 임시 좌표 만들어서 지도에 마크로 표시
*/

// kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            // kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

// // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        // function makeOverListener(map, marker, infowindow) {
        //     return function() {
        //         infowindow.open(map, marker);
        //     };
        // }

        // // 인포윈도우를 닫는 클로저를 만드는 함수입니다
        // function makeOutListener(infowindow) {
        //     return function() {
        //         infowindow.close();
        //     };
        // }
        

        // 마커 클릭되면 해당 지점을 nowLoc 으로 바꿀수있게구현
        // style.css 조정
        // 