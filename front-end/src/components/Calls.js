import React, { useEffect } from 'react'
import ws, { createPeerConnection, sendMessage } from '../utils/Websocket'
import {

    useParams,
} from "react-router-dom";


function Calls() {
    let params = useParams();
    useEffect(() => {
        const PeopleID = JSON.parse(localStorage.getItem('login'))[0].people_id;
        // sendMessage({ type: 'call', sender: PeopleID, receiver: params.id })
        let peerConnection = createPeerConnection(() => {
            console.log('Last candidate');
            let offer = peerConnection.localDescription;
            // document.getElementById('offerData').value = JSON.stringify(offer);
            console.warn("18 offer ==>>", JSON.stringify(offer))

            sendMessage({
                type: 'call', sender: PeopleID, receiver: parseInt(params.id), offer: JSON.stringify(offer)
            })
            console.warn("call requested")
        });

        let dataChannel = peerConnection.createDataChannel('chat');
        // dataChannel.onopen = datachannelopen;
        dataChannel.onmessage = function (message) {
            // datachannelmessage("peer", PeopleID, message);
        }

        let createOfferPromise = peerConnection.createOffer();
        createOfferPromise.then((offer) => {
            console.log('createOffer success');

            let setLocalPromise = peerConnection.setLocalDescription(offer);
            setLocalPromise.then(() => {
                console.log('setLocalDescription success');
            }, (reason) => {
                console.log('setLocalDescription Failed', reason);
            });
        }, (reason) => {
            console.log('createOffer failed', reason);
        });
    }, [])
    return (
        <div>calls</div>
    )
}


export default Calls;