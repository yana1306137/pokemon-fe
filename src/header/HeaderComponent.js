import React from 'react';
import { Link } from 'react-router-dom';

class HeaderComponent extends React.Component {
    
    render() {
        return (
            <div className='No-Padding No-Margin'>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/pokemon-list"} className="nav-link White">
                                    Pokemon  |
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/my-pokemon-list"} className="nav-link White">
                                    My Pokemon  |
                                </Link>
                            </li>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default HeaderComponent;