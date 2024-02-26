import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; 2023 Your Website Name. All rights reserved.</p>
                <p>Contact us at <a href="mailto:contact@example.com">contact@example.com</a></p>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
