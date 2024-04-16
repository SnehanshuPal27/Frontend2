import React from 'react';

const FeaturesSection = () => {
    return (
        <section style={{
            fontFamily: "Poppins, sans-serif",
            backgroundColor: "#FFF8E7",
            padding: "1em"
        }}>
            <div className="row" style={{
                display: "flex",
                flexWrap: "wrap"
            }}>
                <h1 style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: "3em",
                    margin: "0.6em 0",
                    fontWeight: "600",
                    color: "#DC6B19"
                }}>About Us</h1>
                <p className="about-us" style={{
                    textAlign: "center",
                    lineHeight: "1.8",
                    fontSize: "18px",
                    color: "#444"
                }}>
                    At RestroMate, we believe that dining is not just about nourishing the body, but also about feeding the soul. Our journey began with a simple yet profound vision: to create a dining destination where every dish tells a story, and every meal creates memories that last a lifetime.
                    Our culinary team is comprised of talented chefs who are not only masters of their craft but also relentless innovators, constantly pushing the boundaries of gastronomic creativity. Our commitment to excellence extends beyond the kitchen and dining room. We are proud to support local farmers, artisans, and producers, fostering sustainability and stewardship of the land that sustains us. From farm to table, we prioritize quality, integrity, and authenticity in everything we do.
                </p>
                <h1 style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: "3em",
                    margin: "0.6em 0",
                    fontWeight: "600",
                    color: "#DC6B19"
                }}>Our Features</h1>
                <div className="row" style={{
                    display: "flex",
                    flexWrap: "wrap"
                }}>
                    {/* Column One */}
                    <div className="column" style={{
                        padding: "1em",
                        flex: "0 0 33.33%",
                        maxWidth: "33.33%",
                        margin: "0 auto"
                    }}>
                        <div className="card" style={{
                            padding: "5em 2em",
                            textAlign: "center",
                            backgroundColor: "#FFFAF0",
                            boxShadow: "0 0 2.5em rgba(0, 0, 0, 0.15)",
                            borderRadius: "0.5em",
                            transition: "0.5s",
                            cursor: "pointer"
                        }}>
                            <div className="icon" style={{
                                fontSize: "2.5em",
                                height: "1.5em",
                                width: "1.5em",
                                margin: "auto",
                                backgroundColor: "#DC6B19",
                                display: "grid",
                                placeItems: "center",
                                borderRadius: "50%",
                                color: "#ffffff"
                            }}>
                                {/* SVG Path or SVG Component */}
                            </div>
                            <h3 style={{
                                fontSize: "1.3em",
                                margin: "1em 0 1.4em 0",
                                fontWeight: "600",
                                letterSpacing: "0.3px",
                                color: "#DC6B19"
                            }}>Event Calendar</h3>
                            <p style={{
                                lineHeight: "2em",
                                color: "#444"
                            }}>
                                Keep customers informed about upcoming events, promotions, or special dining experiences with an interactive event calendar.
                            </p>
                        </div>
                    </div>
                    {/* Repeat for other columns... */}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
