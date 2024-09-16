import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Carousel.css';

const carouselItems = [
    {
        id: 1,
        image: 'path_to_wedding_image.jpg', // החלף בתמונה המתאימה
        name: 'John & Jane Doe',
        testimonial: 'Our wedding photos are absolutely stunning! The service was impeccable and made our day even more special. Highly recommended!',
    },
    {
        id: 2,
        image: 'path_to_bar_mitzvah_image.jpg', // החלף בתמונה המתאימה
        name: 'Michael Cohen',
        testimonial: 'The bar mitzvah photos were amazing! Every moment was captured perfectly. The team was professional and friendly throughout the event.',
    },
    {
        id: 3,
        image: 'path_to_brit_mila_image.jpg', // החלף בתמונה המתאימה
        name: 'David & Sarah Levi',
        testimonial: 'Our son\'s brit mila was beautifully documented. The photos are priceless and the service was top-notch. Thank you for making this day unforgettable!',
    },
    {
        id: 4,
        image: 'path_to_8200_event_image.jpg', // החלף בתמונה המתאימה
        name: '8200 Alumni Event',
        testimonial: 'The 8200 alumni event was perfectly captured with great attention to detail. The team did a fantastic job and everyone was very pleased with the results.',
    },
];

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="carousel-section">
            <Slider {...settings}>
                {carouselItems.map(item => (
                    <div key={item.id} className="carousel-item">
                        <div className="client-card">
                            <img src={item.image} alt={item.name} className="client-image" />
                            <h3 className="client-name">{item.name}</h3>
                            <p className="client-testimonial">"{item.testimonial}"</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
