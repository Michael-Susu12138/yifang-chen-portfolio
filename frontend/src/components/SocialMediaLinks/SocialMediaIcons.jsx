import React from 'react';
import './SocialMediaIcons.css'; // Make sure to create a CSS file with the provided styles

const socialMediaLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', link: '#', bgColor: '#3b5999' },
    { name: 'Twitter', icon: 'fab fa-twitter', link: '#', bgColor: '#55acee' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', link: '#', bgColor: '#0077b5' },
    { name: 'GooglePlus', icon: 'fab fa-google-plus-g', link: '#', bgColor: '#dd4b39' }
];

const SocialMediaIcons = () => {
    return (
        <ul>
            {socialMediaLinks.map((social, index) => (
                <li key={index}>
                    <a href={social.link} style={{ '--hover-bg-color': social.bgColor }}>
                        <i className={`${social.icon} icon`}></i>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default SocialMediaIcons;
