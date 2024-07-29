import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDribbble, faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

class Home extends Component {
    render() {
        return (
            <div>
                <NavBarMenu />
               
                <div className='left-home'>
                    <div className="card-bar">
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div> 
                    
                </div>
                <div className='right-home'>
                    <div className="card-group">
                        <div className="card">
                            <h1>John Doe</h1>
                            <img src="https://picsum.photos/id/237/200/300" alt="Jane" className="profile-image" />
                            <div className="profile-text">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <div className="social-links">
                                    <a href="#"><FontAwesomeIcon icon={faDribbble} /> </a>
                                    <a href="#"><FontAwesomeIcon icon={faTwitter} /> </a>
                                    <a href="#"><FontAwesomeIcon icon={faLinkedin} /> </a>
                                    <a href="#"><FontAwesomeIcon icon={faFacebook} /> </a>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Cras justo odio</li>
                                    <li className="list-group-item">Dapibus ac facilisis in</li>
                                    <li className="list-group-item">Vestibulum at eros</li>
                                </ul>
                                <div className="card-body">
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a><br/><br/>
                                    <p><button>Contact</button></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* npx json-server --watch db.json --port 4000 */}
            </div>
        );
    }
}

export default Home;


{/* npx json-server --watch db.json --port 4000 */}
{/* //  <img src="https://picsum.photos/id/237/200/300" alt="John" className="profile-image" /> */}