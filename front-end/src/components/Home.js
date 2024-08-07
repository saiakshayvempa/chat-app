import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDribbble, faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import chatsImage from "../assets/home/chats.jpg";
import callsImage from "../assets/home/conference-calls.jpg";
import gossipImage from "../assets/home/gossip.jpg";
import groupchatImage from "../assets/home/groupchat.jpg";
import familyImage from "../assets/home/happy-family.jpg";
import shoutsImage from "../assets/home/shouts.jpg";
import videoImage from "../assets/home/video-call.jpg";
import Logo from "../assets/images/logo.png";

class Home extends Component {

    render() {
        return (
            <div>
                <NavBarMenu />
                <div>
                    <div className="card-bar">
                        <div className="card-body">
                            <h5 className="card-title">Maintaining Gangs</h5>
                            <p className="card-text">You prevent kids from joining gangs by offering after-school programs, sports, mentoring, and positive engagement with adults...</p>

                        </div>
                    </div>
                </div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='left-home col-5' >
                            <img src={Logo} alt="John" className="profile-image" />

                        </div>
                        <div className='right-home col-7'>
                            <Carousel fade>
                                <Carousel.Item>
                                    {/* <chatsImage text="First slide" /> */}
                                    <img src={chatsImage} height="430rem" />
                                    <Carousel.Caption>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    {/* <callsImage text="Second slide" /> */}
                                    <img src={callsImage} height="430rem" />
                                    <Carousel.Caption>
                                    
                                        <h3>Second slide label</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    {/* <gossipImage text="Third slide" /> */}
                                    <img src={gossipImage} height="430rem" />
                                    <Carousel.Caption>
                                    
                                        <h3>Third slide label</h3>
                                        <p>
                                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                        </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    {/* <gossipImage text="Third slide" /> */}
                                    <img src={groupchatImage} height="430rem" />
                                    <Carousel.Caption>
                                    
                                        <h3>Fourth slide label</h3>
                                        <p>
                                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                        </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    {/* <gossipImage text="Third slide" /> */}
                                    <img src={familyImage} height="430rem" />
                                    <Carousel.Caption>
                                    
                                        <h3>Fifth slide label</h3>
                                        <p>
                                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                        </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    {/* <gossipImage text="Third slide" /> */}
                                    <img src={shoutsImage} height="430rem" />
                                    <Carousel.Caption>
                                    
                                        <h3>Sixth slide label</h3>
                                        <p>
                                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                        </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    {/* <gossipImage text="Third slide" /> */}
                                    <img src={videoImage} height="430rem" />
                                    <Carousel.Caption>
                                    
                                        <h3>Seventh slide label</h3>
                                        <p>
                                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                        </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>

                </div>

                {/* <div class="marquee-container">
                    <div class="marquee-content">
                        <img src="https://picsum.photos/id/239/200/300" alt="Image 1" width="100" height="100" />
                        <img src="https://picsum.photos/id/240/200/300" alt="Image 2" width="100" height="100" />
                        <img src="https://picsum.photos/id/241/200/300" alt="Image 3" width="100" height="100" />
                       
                    </div>
                </div> */}

            </div>
        );
    }
}

export default Home;


{/* npx json-server --watch db.json --port 4000 */ }
{/* //  <img src="https://picsum.photos/id/237/200/300" alt="John" className="profile-image" /> */ }