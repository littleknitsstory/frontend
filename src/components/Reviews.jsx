import React from "react";
import CardReview from "./CardReview";

const Reviews = () => {
    return (
        <section className="reviews">
            <h3 className="title">Отзывы</h3>
            <CardReview title={''}
                        authorName={''}
                        description={''}/>
        </section>
    );
};

export default Reviews;
