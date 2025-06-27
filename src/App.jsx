import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import Routes, Route, and useNavigate

// IMPORTANT: For Font Awesome icons to display and for custom fonts to load,
// the following script tags and font links MUST be included in your main HTML document's <head> section:
// <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">


// --- Common Data Structures ---
const COMMON_PALETTE = {
    primaryBg: 'bg-stone-50',
    secondaryBg: 'bg-stone-100',
    headerBg: 'bg-white',
    textDark: 'text-stone-800',
    textNormal: 'text-stone-700',
    textLight: 'text-stone-600',
    accentBlueDark: 'text-indigo-800',
    accentBlueMedium: 'text-indigo-700',
    accentBlueLight: 'text-indigo-600',
    buttonGradientStart: 'from-indigo-700',
    buttonGradientEnd: 'to-indigo-500',
    buttonShadow: 'shadow-indigo-200',
    border: 'border-stone-200',
    shadowBase: 'shadow-md',
    shadowLg: 'shadow-lg',
    hoverScale: 'hover:scale-105',
    transition: 'transition-all duration-300 ease-in-out',
    fontHeading: 'font-poppins', // New font for headings
    fontBody: 'font-inter' // Main body font (Inter is still good and legible)
};

const COMMON_CLASSES = {
    sectionPadding: 'py-20 sm:py-24',
    container: 'container mx-auto px-4 sm:px-6 lg:px-8',
    headingMain: `text-4xl font-extrabold tracking-tight ${COMMON_PALETTE.textDark} sm:text-5xl ${COMMON_PALETTE.fontHeading}`,
    headingSub: `mt-4 text-lg ${COMMON_PALETTE.textLight}`,
    card: `${COMMON_PALETTE.headerBg} p-6 rounded-2xl ${COMMON_PALETTE.shadowBase} ${COMMON_PALETTE.border}`,
    btnPrimary: `${COMMON_PALETTE.buttonGradientStart} ${COMMON_PALETTE.buttonGradientEnd} text-white font-bold py-3 px-8 rounded-full text-lg ${COMMON_PALETTE.shadowBase} ${COMMON_PALETTE.buttonShadow} ${COMMON_PALETTE.hoverScale} ${COMMON_PALETTE.transition}`,
    btnSecondary: `${COMMON_PALETTE.secondaryBg}/50 backdrop-blur-sm border ${COMMON_PALETTE.accentBlueMedium}/50 ${COMMON_PALETTE.textNormal} font-bold py-3 px-8 rounded-full text-lg hover:${COMMON_PALETTE.secondaryBg} ${COMMON_PALETTE.transition}`,
    // New class for white buttons with blue border/text
    btnOutlinePrimary: `bg-white text-indigo-700 border border-indigo-700 hover:bg-indigo-50 hover:border-indigo-800 hover:text-indigo-800 rounded-full font-bold ${COMMON_PALETTE.transition}`
};


// --- Page Components ---

// Page Placeholder (for pages without unique content, but all specified pages now have content)
const PagePlaceholder = ({ title, subtitle }) => {
    return (
        <div className={`${COMMON_CLASSES.sectionPadding} ${COMMON_PALETTE.primaryBg} ${COMMON_PALETTE.fontBody}`}>
            <div className={`${COMMON_CLASSES.container}`}>
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className={COMMON_CLASSES.headingMain}>{title}</h1>
                    <p className={COMMON_CLASSES.headingSub}>{subtitle}</p>
                    <p className="mt-8 text-indigo-500">Content for this page is coming soon.</p>
                </div>
            </div>
        </div>
    );
};

const HomePage = ({ navigateTo }) => {
    const slides = [
        { image: "https://images.unsplash.com/photo-1507692049602-4b6f40a9a7a8?q=80&w=2670&auto=format&fit=crop", title: "Welcome Home.", subtitle: "Experience God's presence in a 360-degree atmosphere of vibrant worship, life-changing word, and authentic community." },
        { image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop", title: "Find Your People.", subtitle: "We are a family of young believers passionate about Jesus and dedicated to authentic relationships." },
        { image: "https://images.unsplash.com/photo-1533576099719-219a3b23194a?q=80&w=2574&auto=format&fit=crop", title: "Live With Purpose.", subtitle: "Discover your God-given calling and be empowered to make a difference in our world." }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 7000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className={`${COMMON_PALETTE.primaryBg} ${COMMON_PALETTE.fontBody}`}>
            <section className="relative h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden bg-stone-800">
                {slides.map((slide, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                        <div className="absolute inset-0 bg-stone-900/40 bg-gradient-to-t from-stone-900 to-transparent"></div>
                    </div>
                ))}
                <div className="relative z-10">
                    <div className="transition-all duration-700" key={currentSlide}>
                        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight animate-fade-in-down ${COMMON_PALETTE.fontHeading}`}>{slides[currentSlide].title}</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-stone-300 animate-fade-in-up">{slides[currentSlide].subtitle}</p>
                    </div>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                        <button onClick={() => navigateTo('/new-member-form')} className={COMMON_CLASSES.btnPrimary + ' w-full sm:w-auto'}>I'm New Here</button>
                        <button onClick={() => navigateTo('/sermons')} className={COMMON_CLASSES.btnSecondary + ' w-full sm:w-auto'}>Watch Latest Sermon</button>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
                    {slides.map((_, index) => (
                        <button key={index} onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full ${COMMON_PALETTE.transition} ${currentSlide === index ? COMMON_PALETTE.accentBlueLight + ' scale-125' : 'bg-stone-300/50'}`}></button>
                    ))}
                </div>
            </section>

            <section className={`${COMMON_PALETTE.accentBlueMedium}/5 py-16 sm:py-20 -mt-16 relative z-10 rounded-t-3xl shadow-2xl shadow-indigo-100 border-t ${COMMON_PALETTE.border}`}>
                <div className={`${COMMON_CLASSES.container} text-center`}>
                    <h2 className={`text-3xl font-bold tracking-tight ${COMMON_PALETTE.accentBlueDark} sm:text-4xl ${COMMON_PALETTE.fontHeading}`}>Join Us This Sunday!</h2>
                    <div className={`mt-8 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-lg sm:text-xl font-semibold ${COMMON_PALETTE.textDark}`}>
                        <div className="flex items-center gap-3">
                            <i className={`fa-solid fa-calendar-days ${COMMON_PALETTE.accentBlueLight}`}></i>
                            <span>Sunday Service: 10:00 AM</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className={`fa-solid fa-location-dot ${COMMON_PALETTE.accentBlueLight}`}></i>
                            <span>The Youth Place, Lekki Phase 1</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const AboutPage = () => {
    return (
        <div className={`${COMMON_CLASSES.sectionPadding} ${COMMON_PALETTE.primaryBg} ${COMMON_PALETTE.fontBody}`}>
            <div className={`${COMMON_CLASSES.container}`}>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className={COMMON_CLASSES.headingMain}>About RCCG 360 Degrees Youth Church</h1>
                    <p className={COMMON_CLASSES.headingSub}>Discover the heart and soul behind our dynamic youth church.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
                    <div className={`${COMMON_CLASSES.card}`}>
                        <h2 className={`text-3xl font-bold ${COMMON_PALETTE.accentBlueMedium} mb-6 ${COMMON_PALETTE.fontHeading}`}>Our Vision & Mission</h2>
                        <p className={`${COMMON_PALETTE.textNormal} leading-relaxed mb-4`}>
                            Our vision is to raise a generation of vibrant youth passionately committed to Christ, equipped to fulfill their divine purpose, and impacting their world for God's glory.
                        </p>
                        <p className={`${COMMON_PALETTE.textNormal} leading-relaxed`}>
                            We are committed to creating an atmosphere where young people experience God's presence in a 360-degree way: through vibrant worship, life-changing Word, and authentic community, empowering them to live a life of purpose and influence.
                        </p>
                    </div>
                    <div className={`${COMMON_CLASSES.card}`}>
                        <h2 className={`text-3xl font-bold ${COMMON_PALETTE.accentBlueMedium} mb-6 ${COMMON_PALETTE.fontHeading}`}>Our Core Values</h2>
                        <ul className={`list-disc list-inside ${COMMON_PALETTE.textNormal} space-y-3`}>
                            <li><strong className={COMMON_PALETTE.textDark}>Passion for Christ:</strong> Deep love and devotion to Jesus in all we do.</li>
                            <li><strong className={COMMON_PALETTE.textDark}>Authentic Community:</strong> Fostering genuine, supportive relationships.</li>
                            <li><strong className={COMMON_PALETTE.textDark}>Purpose-Driven Living:</strong> Empowering individuals to discover and walk in their God-given calling.</li>
                            <li><strong className={COMMON_PALETTE.textDark}>Excellence:</strong> Doing all things with utmost dedication and quality for God's glory.</li>
                            <li><strong className={COMMON_PALETTE.textDark}>Impact:</strong> Making a tangible difference in our generation and beyond.</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 text-center max-w-3xl mx-auto">
                    <h2 className={`text-3xl font-bold ${COMMON_PALETTE.textDark} mb-6 ${COMMON_PALETTE.fontHeading}`}>Our Story So Far...</h2>
                    <p className={`${COMMON_PALETTE.textNormal}`}>
                        Founded with a passion to reach young people, RCCG 360 Degrees Youth Church began as a small gathering of enthusiastic believers. Over the years, we have grown into a thriving community, witnessing countless lives transformed by the power of God's Word and the warmth of genuine fellowship. We believe in nurturing young leaders and providing a platform for every individual to grow spiritually, personally, and professionally.
                    </p>
                </div>
            </div>
        </div>
    );
};

const GroupsMinistriesPage = ({ navigateTo }) => {
    const tribes = [
        { month: "January", name: "Tribe of Judah", verse: "Genesis 49:10", description: "Known for leadership and praise. Members are trailblazers and worshipers." },
        { month: "February", name: "Tribe of Benjamin", verse: "Deuteronomy 33:12", description: "Characterized by boldness and strength. Members are fearless and strategic thinkers." },
        { month: "March", name: "Tribe of Levi", verse: "Numbers 3:12", description: "Dedicated to service and worship. Members are ministers and intercessors." },
        { month: "April", name: "Tribe of Zebulun", verse: "Deuteronomy 33:18", description: "Excels in evangelism and outreach. Members are passionate soul-winners." },
        { month: "May", name: "Tribe of Asher", verse: "Deuteronomy 33:24", description: "Known for prosperity and abundance. Members are resourceful and blessed." },
        { month: "June", name: "Tribe of Naphtali", verse: "Genesis 49:21", description: "Symbolizes freedom and good news. Members are messengers and joyful givers." },
        { month: "July", name: "Tribe of Dan", verse: "Genesis 49:16", description: "Represents justice and wisdom. Members are discerning and fair." },
        { month: "August", name: "Tribe of Gad", verse: "Genesis 49:19", description: "Embodies strength and overcoming. Members are resilient and victorious." },
        { month: "September", name: "Tribe of Simeon", verse: "Genesis 49:7", description: "Focused on community and unity. Members are peacekeepers and builders." },
        { month: "October", name: "Tribe of Issachar", verse: "1 Chronicles 12:32", description: "Possesses understanding of times. Members are insightful and strategic." },
        { month: "November", name: "Tribe of Manasseh", verse: "Genesis 41:51", description: "Signifies fruitfulness and forgetfulness of past troubles. Members are resilient and productive." },
        { month: "December", name: "Tribe of Ephraim", verse: "Genesis 41:52", description: "Represents fruitfulness and multitude. Members are fruitful and multiply impact." },
    ];

    const ministries = [
        { name: "Choir & Music", description: "Leading the congregation into God's presence through anointed praise and worship.", iconClass: "fa-solid fa-microphone" },
        { name: "Ushering & Protocol", description: "Ensuring order, warmth, and hospitality during services and events.", iconClass: "fa-solid fa-handshake" },
        { name: "Media & IT", description: "Managing audio-visuals, live streaming, and church technology.", iconClass: "fa-solid fa-display" },
        { name: "Follow-up & Care", description: "Nurturing new members and providing pastoral care to the church family.", iconClass: "fa-solid fa-heart-pulse" },
        { name: "Evangelism & Outreach", description: "Spreading the gospel and impacting our community with the love of Christ.", iconClass: "fa-solid fa-globe" },
        { name: "Sanctuary Keepers", description: "Maintaining the cleanliness and sanctity of the church environment.", iconClass: "fa-solid fa-broom" },
    ];

    return (
        <div className={`${COMMON_CLASSES.sectionPadding} ${COMMON_PALETTE.secondaryBg} ${COMMON_PALETTE.fontBody}`}>
            <div className={`${COMMON_CLASSES.container}`}>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className={COMMON_CLASSES.headingMain}>Our Tribes & Ministries</h1>
                    <p className={COMMON_CLASSES.headingSub}>Find your place to belong, serve, and grow within our vibrant community.</p>
                </div>

                <section className="mb-20">
                    <h2 className={`text-3xl font-bold ${COMMON_PALETTE.accentBlueMedium} text-center mb-10 ${COMMON_PALETTE.fontHeading}`}>The 360DYC Tribal System</h2>
                    <p className={`text-center ${COMMON_PALETTE.textNormal} max-w-3xl mx-auto mb-12`}>
                        At 360DYC, we believe in fostering deep connections and spiritual growth through our unique Tribal System. Every member belongs to a tribe based on their birth month, creating a close-knit family within the larger church body. Your tribe is your first point of contact for fellowship, support, and collaborative service.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {tribes.map((tribe, index) => (
                            <div key={index} className={`${COMMON_CLASSES.card} ${COMMON_PALETTE.transition} ${COMMON_PALETTE.hoverScale}`}>
                                <h3 className={`text-xl font-bold ${COMMON_PALETTE.textDark} mb-2 ${COMMON_PALETTE.fontHeading}`}>{tribe.month} - {tribe.name}</h3>
                                <p className={`${COMMON_PALETTE.accentBlueLight} text-sm italic mb-3`}>{tribe.verse}</p>
                                <p className={`${COMMON_PALETTE.textNormal} text-sm`}>{tribe.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <p className={COMMON_PALETTE.textNormal}>Don't know your tribe? Just check your birth month! We encourage you to actively connect with your tribe members for fellowship and support.</p>
                    </div>
                </section>

                <section>
                    <h2 className={`text-3xl font-bold ${COMMON_PALETTE.accentBlueMedium} text-center mb-10 ${COMMON_PALETTE.fontHeading}`}>Our Ministries</h2>
                    <p className={`text-center ${COMMON_PALETTE.textNormal} max-w-3xl mx-auto mb-12`}>
                        Beyond our tribal system, we have various ministries where you can serve God and develop your gifts. These ministries are the hands and feet of the church, working together to achieve our collective vision.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {ministries.map((ministry, index) => (
                            <div key={index} className={`${COMMON_CLASSES.card} flex items-start space-x-4`}>
                                <div className={`${COMMON_PALETTE.accentBlueLight}/10 p-3 rounded-full ${COMMON_PALETTE.accentBlueMedium} text-xl flex-shrink-0`}>
                                    <i className={ministry.iconClass}></i>
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${COMMON_PALETTE.textDark} mb-2 ${COMMON_PALETTE.fontHeading}`}>{ministry.name}</h3>
                                    <p className={`${COMMON_PALETTE.textNormal} text-sm`}>{ministry.description}</p>
                                    <button onClick={() => navigateTo('/forms-centre')} className={`mt-3 ${COMMON_PALETTE.accentBlueMedium} hover:${COMMON_PALETTE.accentBlueLight} font-medium text-sm ${COMMON_PALETTE.transition}`}>Join Ministry</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

const ImNewPage = ({ navigateTo }) => {
    return (
        <div className={`${COMMON_CLASSES.sectionPadding} ${COMMON_PALETTE.primaryBg} ${COMMON_PALETTE.fontBody}`}>
            <div className={`${COMMON_CLASSES.container}`}>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className={COMMON_CLASSES.headingMain}>Welcome to RCCG 360 Degrees Youth Church!</h1>
                    <p className={COMMON_CLASSES.headingSub}>We're so glad you're here. This page is designed to help you get acquainted with our church family.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
                    <div className={`${COMMON_CLASSES.card} ${COMMON_PALETTE.shadowLg}`}>
                        <h2 className={`text-3xl font-bold ${COMMON_PALETTE.accentBlueMedium} mb-6 ${COMMON_PALETTE.fontHeading}`}>What to Expect</h2>
                        <div className="space-y-6">
                            <div className="p-5 rounded-xl">
                                <h3 className={`font-semibold text-xl ${COMMON_PALETTE.textDark} mb-2 ${COMMON_PALETTE.fontHeading}`}>Vibrant Worship & Powerful Word</h3>
                                <p className={COMMON_PALETTE.textNormal}>Our services typically last 90 minutes, filled with an electrifying atmosphere of worship, a life-changing message, and heartfelt prayers.</p>
                            </div>
                            <div className="p-5 rounded-xl">
                                <h3 className={`font-semibold text-xl ${COMMON_PALETTE.textDark} mb-2 ${COMMON_PALETTE.fontHeading}`}>Come As You Are</h3>
                                <p className={COMMON_PALETTE.textNormal}>There's no dress code or expectation. We're simply excited to have you, regardless of what you're wearing or where you're from.</p>
                            </div>
                            <div className="p-5 rounded-xl">
                                <h3 className={`font-semibold text-xl ${COMMON_PALETTE.textDark} mb-2 ${COMMON_PALETTE.fontHeading}`}>Authentic Community</h3>
                                <p className={COMMON_PALETTE.textNormal}>We believe in genuine connections. You'll find a friendly environment where you can connect with others and build lasting relationships.</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${COMMON_CLASSES.card} ${COMMON_PALETTE.shadowLg}`}>
                        <h2 className={`text-3xl font-bold ${COMMON_PALETTE.accentBlueMedium} mb-6 ${COMMON_PALETTE.fontHeading}`}>Your Next Steps</h2>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <i className={`fa-solid fa-user-plus ${COMMON_PALETTE.accentBlueLight} text-3xl flex-shrink-0`}></i>
                                <div>
                                    <h3 className={`font-semibold text-xl ${COMMON_PALETTE.textDark} mb-1 ${COMMON_PALETTE.fontHeading}`}>Fill Our First Timer's Form</h3>
                                    <p className={COMMON_PALETTE.textNormal}>Let us know you were here! We have a special welcome gift just for you.</p>
                                    <button onClick={() => navigateTo('/new-member-form')} className={`mt-3 ${COMMON_PALETTE.accentBlueMedium} hover:${COMMON_PALETTE.accentBlueLight} font-medium flex items-center gap-1 ${COMMON_PALETTE.transition}`}>
                                        Fill Form <i className="fa-solid fa-arrow-right text-sm"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <i className={`fa-solid fa-users ${COMMON_PALETTE.accentBlueLight} text-3xl flex-shrink-0`}></i>
                                <div>
                                    <h3 className={`font-semibold text-xl ${COMMON_PALETTE.textDark} mb-1 ${COMMON_PALETTE.fontHeading}`}>Join a Tribe & Ministry</h3>
                                    <p className={COMMON_PALETTE.textNormal}>Connect deeper with our family through various groups and ministries.</p>
                                    <button onClick={() => navigateTo('/groups-ministries')} className={`mt-3 ${COMMON_PALETTE.accentBlueMedium} hover:${COMMON_PALETTE.accentBlueLight} font-medium flex items-center gap-1 ${COMMON_PALETTE.transition}`}>
                                        Explore Groups <i className="fa-solid fa-arrow-right text-sm"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <i className={`fa-solid fa-graduation-cap ${COMMON_PALETTE.accentBlueLight} text-3xl flex-shrink-0`}></i>
                                <div>
                                    <h3 className={`font-semibold text-xl ${COMMON_PALETTE.textDark} mb-1 ${COMMON_PALETTE.fontHeading}`}>Attend Believer's Class</h3>
                                    <p className={COMMON_PALETTE.textNormal}>Learn the foundational truths of your faith in an interactive setting.</p>
                                    <button onClick={() => navigateTo('/believers-class-form')} className={`mt-3 ${COMMON_PALETTE.accentBlueMedium} hover:${COMMON_PALETTE.accentBlueLight} font-medium flex items-center gap-1 ${COMMON_PALETTE.transition}`}>
                                        Register Now <i className="fa-solid fa-arrow-right text-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EventsPage = () => {
    const events = [
        {
            id: 1,
            title: "Youth Summit 2025",
            date: "August 15-17, 2025",
            time: "9:00 AM - 5:00 PM Daily",
            location: "The Youth Place, Lekki Phase 1",
            description: "A transformative gathering for young people, featuring inspiring speakers, workshops, and electrifying praise and worship sessions. Don't miss out!",
            imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Annual Missions Trip Briefing",
            date: "September 5, 2025",
            time: "7:00 PM - 9:00 PM",
            location: "Church Auditorium",
            description: "Information session for those interested in participating in our upcoming missions trip. Learn about destinations, requirements, and impact.",
            imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Couples Hangout",
            date: "September 20, 2025",
            time: "6:00 PM - 9:00 PM",
            location: "Exclusive City Rooftop",
            description: "A relaxing and insightful evening for couples to connect, share, and grow together in faith and love.",
            imageUrl: "https://images.unsplash.com/photo-1542037104857-4bb49a87abe4?q=80&w=2574&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "Thanksgiving Service",
            date: "November 24, 2025",
            time: "10:00 AM - 1:00 PM",
            location: "Church Main Auditorium",
            description: "Join us as we give thanks to God for His faithfulness throughout the year. A service filled with gratitude and celebration.",
            imageUrl: "https://images.unsplash.com/photo-1598448375973-753b8fb3a054?q=80&w=2574&auto=format&fit=crop",
        },
    ];

    return (
        <div className={`${COMMON_CLASSES.sectionPadding} ${COMMON_PALETTE.primaryBg} ${COMMON_PALETTE.fontBody}`}>
            <div className={`${COMMON_CLASSES.container}`}>
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className={COMMON_CLASSES.headingMain}>Upcoming Events</h1>
                    <p className={COMMON_CLASSES.headingSub}>Stay connected with our vibrant community. Mark your calendars and join us!</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {events.map(event => (
                        <div key={event.id} className={`${COMMON_CLASSES.card} overflow-hidden transform ${COMMON_PALETTE.transition} ${COMMON_PALETTE.hoverScale}`}>
                            <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" onError={(e) => e.target.style.display='none'} />
                            <div className="p-6">
                                <h2 className={`text-2xl font-bold ${COMMON_PALETTE.textDark} mb-2 ${COMMON_PALETTE.fontHeading}`}>{event.title}</h2>
                                <p className={`font-semibold mb-2 flex items-center gap-2 ${COMMON_PALETTE.accentBlueMedium}`}><i className="fa-solid fa-calendar-day"></i>{event.date}</p>
                                <p className={`${COMMON_PALETTE.textNormal} mb-4`}>{event.description}</p>
                                <div className={`text-sm ${COMMON_PALETTE.textLight} space-y-1`}>
                                    <p className="flex items-center gap-2"><i className="fa-solid fa-clock"></i>{event.time}</p>
                                    <p className="flex items-center gap-2"><i className="fa-solid fa-location-dot"></i>{event.location}</p>
                                </div>
                                <button className={`mt-6 w-full ${COMMON_CLASSES.btnPrimary.replace('py-3 px-8 text-lg', 'py-3 px-6 text-base')}`}>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SermonsPage = () => {
    const sermons = [
        {
            id: 1,
            title: "The Power of Forgiveness",
            preacher: "Pastor John Doe",
            date: "June 23, 2025",
            description: "A profound message on the liberating power of forgiveness, both in giving and receiving.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder, replace with actual embed URL
            imageUrl: "https://images.unsplash.com/photo-1598448375973-753b8fb3a054?q=80&w=2574&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Walking in Faith",
            preacher: "Minister Jane Doe",
            date: "June 16, 2025",
            description: "Discover practical steps to strengthen your faith and walk confidently in God's promises.",
            videoUrl: "https://www.youtube.com/embed/Fw0v_L1P6vQ", // Placeholder
            imageUrl: "https://images.unsplash.com/photo-1533576099719-219a3b23194a?q=80&w=2574&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Unlocking Your Divine Purpose",
            preacher: "Pastor Sam Smith",
            date: "June 9, 2025",
            description: "An inspiring sermon on identifying and embracing the unique purpose God has for your life.",
            videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", // Placeholder
            imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "The Importance of Community",
            preacher: "Pastor John Doe",
            date: "June 2, 2025",
            description: "Exploring the biblical foundation and practical benefits of being part of a Christ-centered community.",
            videoUrl: "https://www.youtube.com/embed/q_dYj3y49p8", // Placeholder
            imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop",
        },
    ];

    return (
        <div className={`${COMMON_CLASSES.sectionPadding} ${COMMON_PALETTE.secondaryBg} ${COMMON_PALETTE.fontBody}`}>
            <div className={`${COMMON_CLASSES.container}`}>
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className={COMMON_CLASSES.headingMain}>Our Latest Sermons</h1>
                    <p className={COMMON_CLASSES.headingSub}>Catch up on recent messages and be blessed by the Word of God. You can listen or watch them here.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {sermons.map(sermon => (
                        <div key={sermon.id} className={`${COMMON_CLASSES.card} overflow-hidden transform ${COMMON_PALETTE.transition} ${COMMON_PALETTE.hoverScale}`}>
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <iframe
                                    className="w-full h-full"
                                    src={sermon.videoUrl}
                                    title={sermon.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    onError={(e) => { e.target.src = sermon.imageUrl; e.target.style.objectFit = 'cover'; e.target.style.filter = 'grayscale(50%)'; }} // Fallback to image if video fails
                                ></iframe>
                            </div>
                            <div className="p-6">
                                <h2 className={`text-2xl font-bold ${COMMON_PALETTE.textDark} mb-2 ${COMMON_PALETTE.fontHeading}`}>{sermon.title}</h2>
                                <p className={`font-semibold mb-2 flex items-center gap-2 ${COMMON_PALETTE.accentBlueMedium}`}><i className="fa-solid fa-user-tie"></i>{sermon.preacher}</p>
                                <p className={`${COMMON_PALETTE.textNormal} mb-4`}>{sermon.description}</p>
                                <div className={`text-sm ${COMMON_PALETTE.textLight} flex items-center gap-2`}>
                                    <i className="fa-solid fa-calendar-day"></i>
                                    <span>{sermon.date}</span>
                                </div>
                                <button className={`mt-6 w-full ${COMMON_CLASSES.btnPrimary.replace('py-3 px-8 text-lg', 'py-3 px-6 text-base')}`}>
                                    Watch Sermon
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FaqPage = () => {
    const faqs = [
        {
            question: "What should I expect on my first visit?",
            answer: "Expect a warm welcome, vibrant praise and worship, and a powerful message from the Word of God. Our services typically last about 90 minutes. Feel free to connect with our 'New Members' team after the service!"
        },
        {
            question: "Is there a dress code?",
            answer: "No, there isn't! We encourage you to come as you are and wear whatever you feel comfortable in. Our focus is on connecting with God and each other, not on outward appearance."
        },
        {
            question: "Do you have programs for children or teenagers?",
            answer: "While 360 Degrees Youth Church primarily caters to young adults, our parent church (RCCG The Youth Place) has dedicated children's church and teenage ministries. Please ask one of our ushers for more details."
        },
        {
            question: "How can I join a small group or ministry?",
            answer: "You can explore our 'Our Tribes & Ministries' page to see the various groups and serving opportunities. Fill out the respective forms in our 'Forms Centre' and our team will connect with you."
        },
        {
            question: "How can I get baptized?",
            answer: "If you've given your life to Christ and are ready for water baptism, please indicate your interest by filling out the 'Believer's Class' form. Our team will guide you through the process, which includes a foundational class."
        },
        {
            question: "Can I watch past sermons online?",
            answer: "Yes! All our past sermons are available on our 'Sermons' page, where you can watch or listen to messages you might have missed or want to revisit."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`${COMMON_CLASSES.sectionPadding} ${COMMON_PALETTE.secondaryBg} ${COMMON_PALETTE.fontBody}`}>
            <div className={`${COMMON_CLASSES.container}`}>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className={COMMON_CLASSES.headingMain}>Frequently Asked Questions</h1>
                    <p className={COMMON_CLASSES.headingSub}>Find answers to common questions about our church and services.</p>
                </div>
                <div className="max-w-3xl mx-auto space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`${COMMON_CLASSES.card}`}>
                            <button
                                className="w-full flex justify-between items-center text-left focus:outline-none"
                                onClick={() => toggleFaq(index)}
                            >
                                <span className={`text-xl font-semibold ${COMMON_PALETTE.textDark}`}>{faq.question}</span>
                                <i className={`fa-solid ${openIndex === index ? 'fa-chevron-up' : 'fa-chevron-down'} ${COMMON_PALETTE.accentBlueLight} transition-transform duration-300`}></i>
                            </button>
                            {openIndex === index && (
                                <p className={`mt-4 ${COMMON_PALETTE.textNormal} leading-relaxed`}>{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ContactPage = () => {
    return (
        <div className={`${COMMON_CLASSES.sectionPadding} ${COMMON_PALETTE.primaryBg} ${COMMON_PALETTE.fontBody}`}>
            <div className={`${COMMON_CLASSES.container}`}>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className={COMMON_CLASSES.headingMain}>Get in Touch</h1>
                    <p className={COMMON_CLASSES.headingSub}>We'd love to hear from you. Reach out with any questions, prayer requests, or feedback.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
                    <div className={`${COMMON_CLASSES.card} ${COMMON_PALETTE.shadowLg}`}>
                        <h2 className={`text-3xl font-bold ${COMMON_PALETTE.accentBlueMedium} mb-6 ${COMMON_PALETTE.fontHeading}`}>Contact Information</h2>
                        <div className={`space-y-6 ${COMMON_PALETTE.textNormal}`}>
                            <p className="flex items-center gap-3">
                                <i className={`fa-solid fa-location-dot ${COMMON_PALETTE.accentBlueLight} text-2xl w-6 text-center`}></i>
                                <div><strong className={COMMON_PALETTE.textDark}>Location:</strong><br/>The Youth Place, Lekki Phase 1, Lagos, Nigeria</div>
                            </p>
                            <p className="flex items-center gap-3">
                                <i className={`fa-solid fa-phone ${COMMON_PALETTE.accentBlueLight} text-2xl w-6 text-center`}></i>
                                <div><strong className={COMMON_PALETTE.textDark}>Phone:</strong><br/>+234 800 123 4567 (Mon-Fri, 9am-5pm)</div>
                            </p>
                            <p className="flex items-center gap-3">
                                <i className={`fa-solid fa-envelope ${COMMON_PALETTE.accentBlueLight} text-2xl w-6 text-center`}></i>
                                <div><strong className={COMMON_PALETTE.textDark}>Email:</strong><br/>info@rccg360dyc.org</div>
                            </p>
                            <div className="mt-8">
                                <h3 className={`text-xl font-bold ${COMMON_PALETTE.textDark} mb-4 ${COMMON_PALETTE.fontHeading}`}>Follow Us</h3>
                                <div className="flex space-x-6">
                                    <a href="#" className={`${COMMON_PALETTE.textNormal} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}><i className="fa-brands fa-x-twitter text-2xl"></i></a>
                                    <a href="#" className={`${COMMON_PALETTE.textNormal} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}><i className="fa-brands fa-instagram text-2xl"></i></a>
                                    <a href="#" className={`${COMMON_PALETTE.textNormal} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}><i className="fa-brands fa-youtube text-2xl"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${COMMON_CLASSES.card} ${COMMON_PALETTE.shadowLg}`}>
                        <h2 className={`text-3xl font-bold ${COMMON_PALETTE.accentBlueMedium} mb-6 ${COMMON_PALETTE.fontHeading}`}>Send Us a Message</h2>
                        <form className={`space-y-6 ${COMMON_PALETTE.textNormal}`}>
                            <div>
                                <label htmlFor="contact-name" className={`block text-sm font-medium ${COMMON_PALETTE.textNormal}`}>Your Name</label>
                                <input type="text" id="contact-name" name="name" required className={`mt-1 block w-full border ${COMMON_PALETTE.border} rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 ${COMMON_PALETTE.headerBg} ${COMMON_PALETTE.textDark}`} />
                            </div>
                            <div>
                                <label htmlFor="contact-email" className={`block text-sm font-medium ${COMMON_PALETTE.textNormal}`}>Your Email</label>
                                <input type="email" id="contact-email" name="email" required className={`mt-1 block w-full border ${COMMON_PALETTE.border} rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 ${COMMON_PALETTE.headerBg} ${COMMON_PALETTE.textDark}`} />
                            </div>
                            <div>
                                <label htmlFor="contact-message" className={`block text-sm font-medium ${COMMON_PALETTE.textNormal}`}>Your Message</label>
                                <textarea id="contact-message" name="message" rows="5" required className={`mt-1 block w-full border ${COMMON_PALETTE.border} rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 ${COMMON_PALETTE.headerBg} ${COMMON_PALETTE.textDark}`}></textarea>
                            </div>
                            <button type="submit" className={`w-full ${COMMON_CLASSES.btnPrimary.replace('py-3 px-8 text-lg', 'py-3 px-4')}`}>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GivePage = () => {
    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Account number copied to clipboard!'); // Using alert as a simple confirmation for this demo
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy account number. Please copy manually.');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed"; // Avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                alert('Account number copied to clipboard!');
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
                alert('Failed to copy account number. Please copy manually.');
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div className={`${COMMON_CLASSES.sectionPadding} ${COMMON_PALETTE.secondaryBg} ${COMMON_PALETTE.fontBody}`}>
            <div className={`${COMMON_CLASSES.container}`}>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className={COMMON_CLASSES.headingMain}>Partner With Us</h1>
                    <p className={COMMON_CLASSES.headingSub}>Your generosity enables us to fulfill our vision and impact more lives.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    <div className={`${COMMON_CLASSES.card} ${COMMON_PALETTE.shadowLg}`}>
                        <h2 className={`text-3xl font-bold ${COMMON_PALETTE.accentBlueMedium} mb-6 ${COMMON_PALETTE.fontHeading}`}>Why Your Giving Matters</h2>
                        <p className={`${COMMON_PALETTE.textNormal} leading-relaxed mb-4`}>
                            At RCCG 360 Degrees Youth Church, every seed sown empowers us to spread the gospel, nurture young believers, and serve our community. Your tithes, offerings, and donations directly fuel our ministries, outreach programs, and facility enhancements.
                        </p>
                        <p className={`${COMMON_PALETTE.textNormal} leading-relaxed`}>
                            Through your partnership, we can continue to create a vibrant environment for spiritual growth, organize impactful events, and extend a helping hand to those in need. Thank you for your obedience and faith!
                        </p>
                    </div>
                    <div className={`${COMMON_CLASSES.card} ${COMMON_PALETTE.shadowLg}`}>
                        <h2 className={`text-3xl font-bold ${COMMON_PALETTE.accentBlueMedium} mb-6 ${COMMON_PALETTE.fontHeading}`}>Ways to Give</h2>
                        <ul className={`space-y-6 ${COMMON_PALETTE.textNormal}`}>
                            <li className="flex items-start gap-4">
                                <i className={`fa-solid fa-money-bill-transfer ${COMMON_PALETTE.accentBlueLight} text-3xl mt-1 flex-shrink-0`}></i>
                                <div>
                                    <h3 className={`font-semibold text-xl ${COMMON_PALETTE.textDark} mb-2 ${COMMON_PALETTE.fontHeading}`}>Bank Transfer (Naira Accounts)</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center bg-stone-50 p-3 rounded-lg border border-stone-200">
                                            <div>
                                                <p className="text-sm"><strong>Bank:</strong> Zenith Bank</p>
                                                <p className="text-sm"><strong>Acct Name:</strong> RCCG 360 Youth Church</p>
                                                <p className="text-lg font-bold">1234567890 <button onClick={() => copyToClipboard('1234567890')} className="ml-2 text-indigo-600 hover:text-indigo-800 text-base"><i className="fa-solid fa-copy"></i></button></p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center bg-stone-50 p-3 rounded-lg border border-stone-200">
                                            <div>
                                                <p className="text-sm"><strong>Bank:</strong> GTBank</p>
                                                <p className="text-sm"><strong>Acct Name:</strong> RCCG 360 Youth Church</p>
                                                <p className="text-lg font-bold">0987654321 <button onClick={() => copyToClipboard('0987654321')} className="ml-2 text-indigo-600 hover:text-indigo-800 text-base"><i className="fa-solid fa-copy"></i></button></p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center bg-stone-50 p-3 rounded-lg border border-stone-200">
                                            <div>
                                                <p className="text-sm"><strong>Bank:</strong> Access Bank</p>
                                                <p className="text-sm"><strong>Acct Name:</strong> RCCG 360 Youth Church</p>
                                                <p className="text-lg font-bold">1122334455 <button onClick={() => copyToClipboard('1122334455')} className="ml-2 text-indigo-600 hover:text-indigo-800 text-base"><i className="fa-solid fa-copy"></i></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <i className={`fa-solid fa-dollar-sign ${COMMON_PALETTE.accentBlueLight} text-3xl mt-1 flex-shrink-0`}></i>
                                <div>
                                    <h3 className={`font-semibold text-xl ${COMMON_PALETTE.textDark} mb-2 ${COMMON_PALETTE.fontHeading}`}>Bank Transfer (USD Account)</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center bg-stone-50 p-3 rounded-lg border border-stone-200">
                                            <div>
                                                <p className="text-sm"><strong>Bank:</strong> Citibank</p>
                                                <p className="text-sm"><strong>Acct Name:</strong> RCCG 360 Youth Church</p>
                                                <p className="text-lg font-bold">9876543210 <button onClick={() => copyToClipboard('9876543210')} className="ml-2 text-indigo-600 hover:text-indigo-800 text-base"><i className="fa-solid fa-copy"></i></button></p>
                                                <p className="text-sm mt-1"><strong>SWIFT/BIC:</strong> CITIUS33</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 text-center">
                    <p className={`${COMMON_PALETTE.textNormal} max-w-2xl mx-auto italic`}>"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7 (NIV)</p>
                </div>
            </div>
        </div>
    );
};

// --- Form Pages (Functional Components) ---
// Corrected FormPage to explicitly return JSX and properly handle useState
const FormPage = ({ title, subtitle, fields, successMessage, navigateTo, redirectOnSuccess }) => {
    const [formData, setFormData] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        setSubmitted(true);
        if (redirectOnSuccess && navigateTo) {
            setTimeout(() => {
                navigateTo(redirectOnSuccess);
            }, 2000); // Redirect after 2 seconds
        }
    };

    return (
        <div className={`${COMMON_CLASSES.sectionPadding} ${COMMON_PALETTE.secondaryBg} ${COMMON_PALETTE.fontBody}`}>
            <div className={`${COMMON_CLASSES.container} max-w-2xl`}>
                <div className={`${COMMON_CLASSES.card} ${COMMON_PALETTE.shadowLg}`}>
                    <div className="text-center mb-8">
                        <h1 className={`text-3xl font-extrabold tracking-tight ${COMMON_PALETTE.textDark} sm:text-4xl ${COMMON_PALETTE.fontHeading}`}>{title}</h1>
                        <p className={`mt-2 text-lg ${COMMON_PALETTE.textLight}`}>{subtitle}</p>
                    </div>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className={`space-y-6 ${COMMON_PALETTE.textNormal}`}>
                            {fields.map((field, index) => (
                                <div key={index}>
                                    <label htmlFor={field.name} className={`block text-sm font-medium ${COMMON_PALETTE.textNormal}`}>
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            rows="4"
                                            required={field.required}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className={`mt-1 block w-full border ${COMMON_PALETTE.border} rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 ${COMMON_PALETTE.headerBg} ${COMMON_PALETTE.textDark}`}
                                        ></textarea>
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={field.name}
                                            name={field.name}
                                            required={field.required}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className={`mt-1 block w-full border ${COMMON_PALETTE.border} rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 ${COMMON_PALETTE.headerBg} ${COMMON_PALETTE.textDark}`}
                                        />
                                    )}
                                </div>
                            ))}
                            <button type="submit" className={`w-full ${COMMON_CLASSES.btnPrimary.replace('py-3 px-8 text-lg', 'py-3 px-4')}`}>
                                Submit Form
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-10">
                            <h2 className={`text-3xl font-bold ${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.fontHeading}`}>Success!</h2>
                            <p className={`mt-4 text-lg ${COMMON_PALETTE.textNormal}`}>{successMessage}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const NewMemberFormPage = ({ navigateTo }) => {
    return (
        <FormPage
            title="First-Timer's Welcome Form"
            subtitle="We're excited you visited! Please fill out this form so we can connect and offer a special welcome."
            fields={[
                { name: 'name', label: 'Full Name', type: 'text', required: true },
                { name: 'email', label: 'Email Address', type: 'email', required: true },
                { name: 'phone', label: 'Phone Number (Optional)', type: 'tel' }
            ]}
            successMessage="Thank you for visiting! Your information has been received. Redirecting you to our New Members page..."
            navigateTo={navigateTo}
            redirectOnSuccess="/im-new"
        />
    );
};

const BelieversClassFormPage = () => {
    return (
        <FormPage
            title="Believer's Class Registration"
            subtitle="Begin your foundational journey in Christ by registering for our Believer's Class."
            fields={[
                { name: 'name', label: 'Full Name', type: 'text', required: true },
                { name: 'email', label: 'Email Address', type: 'email', required: true },
                { name: 'phone', label: 'Phone Number (Optional)', type: 'tel' }
            ]}
            successMessage="Thank you for registering! We have received your registration for the Believer's Class. We will contact you soon with more details."
        />
    );
};

const WorkersInTrainingFormPage = () => {
    return (
        <FormPage
            title="Workers In Training Registration"
            subtitle="Get equipped to serve effectively in God's house. Join our Workers In Training program."
            fields={[
                { name: 'name', label: 'Full Name', type: 'text', required: true },
                { name: 'email', label: 'Email Address', type: 'email', required: true },
                { name: 'reason', label: 'Why do you want to serve?', type: 'textarea', required: true }
            ]}
            successMessage="Thank you for enrolling! We have received your application for Workers In Training. We will reach out shortly."
        />
    );
};

const SchoolOfDiscipleshipFormPage = () => {
    return (
        <FormPage
            title="School of Discipleship Registration"
            subtitle="Go deeper in your walk with God and grow in spiritual maturity through our School of Discipleship."
            fields={[
                { name: 'name', label: 'Full Name', type: 'text', required: true },
                { name: 'email', label: 'Email Address', type: 'email', required: true },
                { name: 'journey', label: 'Share your spiritual journey briefly:', type: 'textarea', required: true }
            ]}
            successMessage="Thank you for registering! Your registration for the School of Discipleship has been received. We look forward to your journey with us."
        />
    );
};

const PrayerFormPage = () => {
    return (
        <FormPage
            title="Submit a Prayer Request"
            subtitle="Let us stand in faith with you. Share your prayer needs with our intercessory team."
            fields={[
                { name: 'name', label: 'Name (Optional)', type: 'text', required: false },
                { name: 'email', label: 'Email (Optional)', type: 'email', required: false },
                { name: 'request', label: 'Your Prayer Request', type: 'textarea', required: true }
            ]}
            successMessage="Thank you for your prayer request! Your request has been received by our prayer team. We are standing in agreement with you."
        />
    );
};

const CounsellingFormPage = () => {
    return (
        <FormPage
            title="Confidential Counselling"
            subtitle="Receive faith-based support and guidance in a safe and confidential environment."
            fields={[
                { name: 'name', label: 'Full Name', type: 'text', required: true },
                { name: 'email', label: 'Email Address', type: 'email', required: true },
                { name: 'issue', label: 'Briefly describe your concern', type: 'textarea', required: true }
            ]}
            successMessage="Counselling Request Sent! Your request has been received. Our counseling team will reach out to you within 48 hours to schedule a session."
        />
    );
};

const FormsCentrePage = ({ navigateTo }) => {
    const formsLinks = [
        { id: '/new-member-form', title: 'First-Timer\'s Welcome Form', iconClass: 'fa-solid fa-user-plus' },
        { id: '/believers-class-form', title: 'Join Believer\'s Class', iconClass: 'fa-solid fa-book-open' },
        { id: '/wit-form', title: 'Workers in Training', iconClass: 'fa-solid fa-screwdriver-wrench' },
        { id: '/sod-form', title: 'School of Discipleship', iconClass: 'fa-solid fa-graduation-cap' },
        { id: '/prayer-form', title: 'Need Prayers', iconClass: 'fa-solid fa-hands-praying' },
        { id: '/counselling-form', title: 'Need Counselling', iconClass: 'fa-solid fa-hand-holding-heart' }
    ];

    return (
        <div className={`${COMMON_CLASSES.sectionPadding} ${COMMON_PALETTE.primaryBg} ${COMMON_PALETTE.fontBody}`}>
            <div className={`${COMMON_CLASSES.container}`}>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className={COMMON_CLASSES.headingMain}>Forms Centre</h1>
                    <p className={COMMON_CLASSES.headingSub}>Ready to take your next step? Find the right form below to get started on your journey with us.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {formsLinks.map(form => (
                        <div key={form.id} className={`${COMMON_CLASSES.card} flex flex-col items-center text-center ${COMMON_PALETTE.shadowLg} ${COMMON_PALETTE.transition} ${COMMON_PALETTE.hoverScale}`}>
                            <div className={`${COMMON_PALETTE.accentBlueMedium}/10 p-4 rounded-full mb-4 ${COMMON_PALETTE.accentBlueMedium} text-3xl`}>
                                <i className={form.iconClass}></i>
                            </div>
                            <h2 className={`text-xl font-bold ${COMMON_PALETTE.textDark} ${COMMON_PALETTE.fontHeading}`}>{form.title}</h2>
                            <button onClick={() => navigateTo(form.id)}
                                className={`mt-6 w-full ${COMMON_CLASSES.btnOutlinePrimary} py-2 px-6 text-base`}>
                                Open Form
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Main App Component ---
export default function App() {
    // The 'page' state is no longer used for direct page rendering, but can be kept for other purposes
    const [page, setPage] = useState('home'); 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const navigateTo = (path) => { // 'path' will now be the route, e.g., '/about'
        navigate(path); // Use React Router's navigate function
        setIsMobileMenuOpen(false);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    // Main navigation links
    const navLinks = [
        { id: '/', title: 'Home' }, // Home now maps to '/'
        { id: 'explore', title: 'Explore', dropdown: [ // Explore dropdown content
            { id: '/about', title: 'About Us', iconClass: 'fa-solid fa-circle-info' },
            { id: '/groups-ministries', title: 'Our Tribes & Ministries', iconClass: 'fa-solid fa-users-gear' },
            { id: '/im-new', title: "I'm New", iconClass: 'fa-solid fa-handshake-angle' },
            { id: '/faq', title: 'FAQ', iconClass: 'fa-solid fa-circle-question' },
            { id: '/forms-centre', title: 'Forms Centre', iconClass: 'fa-solid fa-file-lines' } // Forms Centre is now a direct link within Explore
        ]},
        { id: '/sermons', title: 'Sermons' },
        { id: '/events', title: 'Events' },
        { id: '/contact', title: 'Contact' },
        { id: '/give', title: 'Give' },
    ];

    // Effect to control body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto'; // Cleanup on unmount
        };
    }, [isMobileMenuOpen]);


    // The renderPage function is replaced by direct <Routes> in the JSX
    // So, this function is no longer needed.

    return (
        <div className={`min-h-screen ${COMMON_PALETTE.fontBody} ${COMMON_PALETTE.primaryBg}`}>
            {/* Header */}
            <header className={`${COMMON_PALETTE.headerBg} sticky top-0 z-50 ${COMMON_PALETTE.shadowLg} border-b ${COMMON_PALETTE.border}`}>
                <div className={`${COMMON_CLASSES.container}`}>
                    <div className="flex items-center justify-between h-20">
                        <a href="#home" onClick={() => navigateTo('/')} className="flex items-center space-x-2">
                            <img src="https://res.cloudinary.com/dph4emzfu/image/upload/v1751022640/rccg_logo_tosbsv.jpg" alt="RCCG 360 Logo" className="h-14 sm:h-16 object-contain"></img>
                        </a>
                        
                        <nav className="hidden lg:flex items-center space-x-2">
                            {navLinks.map((link) => (
                                link.dropdown ? (
                                    <div key={link.id} className="relative group">
                                        <button className={`nav-link ${COMMON_PALETTE.textNormal} hover:${COMMON_PALETTE.accentBlueMedium} px-4 py-2 rounded-md font-medium ${COMMON_PALETTE.transition} flex items-center`}>
                                            {link.title}
                                            <i className={`fa-solid fa-chevron-down ml-2 text-sm ${COMMON_PALETTE.transition} group-hover:rotate-180`}></i>
                                        </button>
                                        <div className={`absolute top-full left-0 mt-2 w-64 ${COMMON_PALETTE.headerBg} rounded-lg ${COMMON_PALETTE.shadowLg} ${COMMON_PALETTE.border} opacity-0 group-hover:opacity-100 ${COMMON_PALETTE.transition} invisible group-hover:visible translate-y-1 group-hover:translate-y-0`}>
                                            {link.dropdown.map(item => (
                                                <button key={item.id} onClick={() => navigateTo(item.id)}
                                                    className={`w-full text-left block px-4 py-3 text-sm ${COMMON_PALETTE.textNormal} hover:${COMMON_PALETTE.secondaryBg} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition} flex items-center`}>
                                                    <i className={`${item.iconClass} mr-3 ${COMMON_PALETTE.accentBlueLight}`}></i>{item.title}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <button key={link.id} onClick={() => navigateTo(link.id)}
                                        className={`nav-link ${COMMON_PALETTE.textNormal} hover:${COMMON_PALETTE.accentBlueMedium} px-4 py-2 rounded-md font-medium ${COMMON_PALETTE.transition} ${window.location.pathname === link.id ? COMMON_PALETTE.accentBlueMedium + ' ' + COMMON_PALETTE.secondaryBg : ''}`}>
                                        {link.title}
                                    </button>
                                )
                            ))}
                        </nav>

                        <div className="hidden lg:block">
                            <button onClick={() => navigateTo('/new-member-form')} className={`${COMMON_CLASSES.btnOutlinePrimary} py-2 px-6 text-base`}>
                                New Member
                            </button>
                        </div>

                        <div className="lg:hidden">
                            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
                                <i className={`fa-solid fa-bars text-xl ${COMMON_PALETTE.textDark}`}></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div id="mobile-menu" className={`fixed inset-0 h-full w-full max-w-xs ${COMMON_PALETTE.headerBg} ${COMMON_PALETTE.shadowLg} z-50 p-6 overflow-y-auto open`}>
                        <div className="flex justify-end mb-8">
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                                <i className={`fa-solid fa-xmark text-2xl ${COMMON_PALETTE.textDark}`}></i>
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                link.dropdown ? (
                                    <React.Fragment key={link.id}>
                                        <button className={`mobile-nav-link ${COMMON_PALETTE.textNormal} hover:${COMMON_PALETTE.accentBlueMedium} text-xl font-medium flex items-center py-2`}>
                                            <i className={`${link.dropdown[0].iconClass.replace('fa-circle-info', 'fa-book')} w-8 text-center ${COMMON_PALETTE.accentBlueLight}`}></i>{link.title}
                                        </button>
                                        <div className="ml-8 space-y-2">
                                            {link.dropdown.map(item => (
                                                <button key={item.id} onClick={() => navigateTo(item.id)}
                                                    className={`w-full text-left block text-lg ${COMMON_PALETTE.textNormal} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition} flex items-center`}>
                                                    <i className={`${item.iconClass} mr-2 text-base ${COMMON_PALETTE.accentBlueLight}`}></i>{item.title}
                                                </button>
                                            ))}
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <button key={link.id} onClick={() => navigateTo(link.id)}
                                        className={`mobile-nav-link ${COMMON_PALETTE.textNormal} hover:${COMMON_PALETTE.accentBlueMedium} text-xl font-medium flex items-center py-2 ${window.location.pathname === link.id ? COMMON_PALETTE.accentBlueMedium : ''}`}>
                                        <i className={`${link.id === '/' ? 'fa-solid fa-house' : link.id === '/sermons' ? 'fa-solid fa-book-bible' : link.id === '/events' ? 'fa-solid fa-calendar-check' : link.id === '/contact' ? 'fa-solid fa-envelope-open-text' : link.id === '/give' ? 'fa-solid fa-hand-holding-dollar' : ''} w-8 text-center ${COMMON_PALETTE.accentBlueLight}`}></i>{link.title}
                                    </button>
                                )
                            ))}
                            <button onClick={() => navigateTo('/new-member-form')} className={`mt-6 ${COMMON_CLASSES.btnPrimary.replace('text-lg', 'text-xl')} w-full text-center flex items-center justify-center`}>
                                <i className="fa-solid fa-user-plus mr-2"></i> New Member
                            </button>
                        </nav>
                    </div>
                )}
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<HomePage navigateTo={navigateTo} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/groups-ministries" element={<GroupsMinistriesPage navigateTo={navigateTo} />} />
                    <Route path="/im-new" element={<ImNewPage navigateTo={navigateTo} />} />
                    <Route path="/sermons" element={<SermonsPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/give" element={<GivePage />} />
                    <Route path="/forms-centre" element={<FormsCentrePage navigateTo={navigateTo} />} />
                    <Route path="/new-member-form" element={<NewMemberFormPage navigateTo={navigateTo} />} />
                    <Route path="/believers-class-form" element={<BelieversClassFormPage />} />
                    <Route path="/wit-form" element={<WorkersInTrainingFormPage />} />
                    <Route path="/sod-form" element={<SchoolOfDiscipleshipFormPage />} />
                    <Route path="/prayer-form" element={<PrayerFormPage />} />
                    <Route path="/counselling-form" element={<CounsellingFormPage />} />
                    {/* Fallback for unknown paths */}
                    <Route path="*" element={<HomePage navigateTo={navigateTo} />} />
                </Routes>
            </main>

            {/* Footer */}
            <footer className={`${COMMON_PALETTE.headerBg} border-t ${COMMON_PALETTE.border}`}>
                <div className={`${COMMON_CLASSES.container} py-12`}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left ${COMMON_PALETTE.textNormal}">
                        <div>
                            <h3 className={`text-xl font-bold ${COMMON_PALETTE.textDark} mb-4 ${COMMON_PALETTE.fontHeading}`}>360° DYC</h3>
                            <p className={`${COMMON_PALETTE.textLight} text-sm`}>A full-circle experience of God's love, power, and purpose.</p>
                        </div>
                        <div>
                            <h3 className={`text-xl font-bold ${COMMON_PALETTE.textDark} mb-4 ${COMMON_PALETTE.fontHeading}`}>Explore</h3>
                            <ul className="space-y-2 text-sm">
                                <li><button onClick={() => navigateTo('/about')} className={`${COMMON_PALETTE.textLight} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}>About Us</button></li>
                                <li><button onClick={() => navigateTo('/groups-ministries')} className={`${COMMON_PALETTE.textLight} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}>Tribes & Ministries</button></li>
                                <li><button onClick={() => navigateTo('/sermons')} className={`${COMMON_PALETTE.textLight} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}>Sermons</button></li>
                                <li><button onClick={() => navigateTo('/events')} className={`${COMMON_PALETTE.textLight} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}>Events</button></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`text-xl font-bold ${COMMON_PALETTE.textDark} mb-4 ${COMMON_PALETTE.fontHeading}`}>Get Help</h3>
                            <ul className="space-y-2 text-sm">
                                <li><button onClick={() => navigateTo('/prayer-form')} className={`${COMMON_PALETTE.textLight} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}>Prayer Request</button></li>
                                <li><button onClick={() => navigateTo('/counselling-form')} className={`${COMMON_PALETTE.textLight} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}>Counselling</button></li>
                                <li><button onClick={() => navigateTo('/contact')} className={`${COMMON_PALETTE.textLight} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}>Contact Us</button></li>
                                <li><button onClick={() => navigateTo('/faq')} className={`${COMMON_PALETTE.textLight} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}>FAQ</button></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`text-xl font-bold ${COMMON_PALETTE.textDark} mb-4 ${COMMON_PALETTE.fontHeading}`}>Connect</h3>
                            <div className="flex justify-center md:justify-start space-x-6 mb-4">
                                <a href="#" className={`${COMMON_PALETTE.textLight} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}><i className="fa-brands fa-x-twitter text-2xl"></i></a>
                                <a href="#" className={`${COMMON_PALETTE.textLight} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}><i className="fa-brands fa-instagram text-2xl"></i></a>
                                <a href="#" className={`${COMMON_PALETTE.textLight} hover:${COMMON_PALETTE.accentBlueMedium} ${COMMON_PALETTE.transition}`}><i className="fa-brands fa-youtube text-2xl"></i></a>
                            </div>
                            <p className={`${COMMON_PALETTE.textLight} text-sm`}><strong className={COMMON_PALETTE.textDark}>Service:</strong> Sundays, 10:00 AM</p>
                            <p className={`${COMMON_PALETTE.textLight} text-sm`}><strong className={COMMON_PALETTE.textDark}>Location:</strong> The Youth Place, Lekki Phase 1</p>
                        </div>
                    </div>
                    <div className={`mt-12 pt-8 border-t ${COMMON_PALETTE.border} text-center ${COMMON_PALETTE.textLight} text-sm`}>
                        <p>© {new Date().getFullYear()} RCCG 360 Degrees Youth Church. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
