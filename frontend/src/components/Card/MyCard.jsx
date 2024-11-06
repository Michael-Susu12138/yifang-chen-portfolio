import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './MyCard.scss'; // Ensure you have this CSS file

const MyCard = ({ title, subtitle, imageUrl, episodeLength, onPlay }) => {
    return (
        <div className="postcard dark blue">
            <a className="postcard__img_link" href="#">
                <Card.Img variant="top" src={imageUrl} alt="Image Title" className="postcard__img" />
            </a>
            <Card.Body className="postcard__text">
                <Card.Title className="postcard__title blue">
                    <a href="#">{title}</a>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted postcard__subtitle small">
                    <time dateTime="2020-05-25 12:00:00">
                        <i className="fas fa-calendar-alt mr-2"></i>{subtitle}
                    </time>
                </Card.Subtitle>
                <div className="postcard__bar"></div>
                <Card.Text className="postcard__preview-txt">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius!
                </Card.Text>
                <Button variant="primary" onClick={onPlay}><i className="fas fa-play mr-2"></i>Play Episode</Button>
            </Card.Body>
        </div>
    );
};

export default MyCard;
