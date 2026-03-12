// Screen data and logic
const screens = {
  HOME: 'home',
  PLAY: 'play',
  DETAIL: 'detail',
  BOOKING: 'booking',
  PROFILE: 'profile'
};

let currentScreen = screens.HOME;

const appContainer = document.querySelector('#screen-container');

// Mock data for venues (from screenshots)
const venues = [
  {
    id: 1,
    name: 'Sachidananda Badminton Court',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1000&auto=format&fit=crop',
    rating: '5.0',
    ratingsCount: 24,
    distance: '2.7 km',
    area: 'J.P. Nagar, Bengaluru',
    price: '₹300',
    offers: ['Get 25% off up to ₹500', 'Flat ₹100 OFF'],
    amenities: ['Washroom', 'Flood lights', 'Seating Lounge']
  },
  {
    id: 2,
    name: 'Elite Badminton Arena',
    image: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=1000&auto=format&fit=crop',
    rating: '4.8',
    ratingsCount: 42,
    distance: '1.4 km',
    area: 'Arekere, Bengaluru',
    price: '₹250',
    offers: ['Get 25% off up to ₹500'],
    amenities: ['Parking', 'Water', 'Locker Room']
  }
];

function getHeaderAndTabsHTML(activeTab) {
  return `
    <header class="home-header">
      <div class="location-bar">
        <i class="fa-solid fa-location-dot"></i>
        <div class="location-text">
          <span class="location-name">Venugopal Reddy Layout</span>
          <span class="location-details">Arekere, Bengaluru</span>
        </div>
        <i class="fa-solid fa-chevron-down"></i>
        <div class="header-actions">
          <i class="fa-regular fa-bookmark"></i>
          <div class="profile-icon"></div>
        </div>
      </div>
      <div class="search-bar-container">
        <div class="search-bar neon-glow">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search for 'Badminton'">
        </div>
      </div>
    </header>

    <nav class="category-tabs">
      <div class="tab-item ${activeTab === 'home' ? 'active' : ''}" onclick="navigateTo(screens.HOME)">
        <i class="fa-solid fa-house"></i>
      </div>
      <div class="tab-item">Dining</div>
      <div class="tab-item">Movies</div>
      <div class="tab-item">Events</div>
      <div class="tab-item">Stores</div>
      <div class="tab-item">Activities</div>
      <div class="tab-item ${activeTab === 'play' ? 'active' : ''}" onclick="navigateTo(screens.PLAY)">Play</div>
    </nav>
  `;
}

function renderHome() {
  appContainer.innerHTML = getHeaderAndTabsHTML('home') + `
    <div class="main-content home-feed-content fade-in" style="padding-bottom: 80px;">
      <div class="promo-banner-home">
        <div class="promo-text">
            <span class="unlock-text">UNLOCK UP TO</span>
            <span class="fifty-off">50% OFF</span>
        </div>
        <div class="bank-offer">
          <i class="fa-solid fa-sparkles"></i> Save more with bank offers* <i class="fa-solid fa-sparkles"></i>
        </div>
        <div class="bank-logo">ICICI Bank</div>
        <button class="explore-btn">Explore now <i class="fa-solid fa-chevron-right"></i></button>
      </div>

      <div class="home-categories-grid">
        <div class="home-cat-card">
          <div class="cat-icon-wrapper">
             <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=100&h=100&fit=crop" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">
          </div>
          <span>Dining</span>
        </div>
        <div class="home-cat-card">
           <div class="cat-icon-wrapper">
             <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=100&h=100&fit=crop" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">
           </div>
           <span>Movies</span>
        </div>
        <div class="home-cat-card">
           <div class="cat-icon-wrapper">
             <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">
           </div>
           <span>Events</span>
        </div>
        <div class="home-cat-card">
           <div class="cat-icon-wrapper">
             <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">
           </div>
           <span>Stores</span>
        </div>
        <div class="home-cat-card">
           <div class="cat-icon-wrapper">
             <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">
           </div>
           <span>Activities</span>
        </div>
        <div class="home-cat-card active-play" onclick="navigateTo(screens.PLAY)">
           <span class="badge-new">NEW</span>
           <div class="cat-icon-wrapper">
             <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=100&h=100&fit=crop" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">
           </div>
           <span>Play</span>
        </div>
      </div>

      <div class="section-divider">
         <span class="line"></span>
         <span class="text">IN THE SPOTLIGHT</span>
         <span class="line"></span>
      </div>

      <div class="spotlight-carousel">
          <div class="spotlight-card">
             <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500&h=300&fit=crop" class="spotlight-img" alt="ISL Match">
             <div class="spotlight-info">
                <p class="spotlight-date">Sat, 14 Mar, 7:30 PM</p>
                <h4 class="spotlight-title">ISL 2025-26: Bengaluru FC vs Mohun Bagan SG</h4>
                <p class="spotlight-location">Bengaluru</p>
                <button class="bookmark-btn"><i class="fa-regular fa-bookmark"></i></button>
             </div>
          </div>
          <div class="spotlight-card">
             <img src="https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=500&h=300&fit=crop" class="spotlight-img" alt="Concert">
             <div class="spotlight-banner-overlay">
                <i class="fa-solid fa-tag"></i> Pay only 50% to reserve your tickets
             </div>
             <div class="spotlight-info">
                <p class="spotlight-date">Fri, 10 Apr, 4:00 PM</p>
                <h4 class="spotlight-title">Feeding India Concert 2026 ft. Shakira | Mumbai</h4>
                <p class="spotlight-location">Mumbai</p>
                <button class="bookmark-btn"><i class="fa-regular fa-bookmark"></i></button>
             </div>
          </div>
      </div>

      <div class="section-divider">
         <span class="line"></span>
         <span class="text">FOODIE FRONT ROW</span>
         <span class="line"></span>
      </div>

      <div class="spotlight-carousel">
          <div class="spotlight-card">
             <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=300&fit=crop" class="spotlight-img" alt="Foodie">
             <div class="spotlight-info">
                <p class="spotlight-date">Get creative while you sip and dine</p>
                <h4 class="spotlight-title">Paint station at Kaavu</h4>
                <button class="bookmark-btn"><i class="fa-regular fa-bookmark"></i></button>
             </div>
          </div>
      </div>

      <div class="section-divider">
         <span class="line"></span>
         <span class="text">SHOP THE F1 MERCH</span>
         <span class="line"></span>
      </div>
      
      <div class="spotlight-carousel">
          <div class="spotlight-card">
             <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=300&fit=crop" class="spotlight-img" alt="F1 Merch">
             <div class="spotlight-banner-overlay" style="background: #2b00ff;">
                <i class="fa-solid fa-tag"></i> 10% OFF up to ₹500 + Bank benefits
             </div>
             <div class="spotlight-info">
                <h4 class="spotlight-title">Pepe Jeans</h4>
                <p class="spotlight-location">10.1 km | Indiranagar, Bangalore</p>
                <button class="bookmark-btn"><i class="fa-regular fa-bookmark"></i></button>
             </div>
          </div>
      </div>

      <div class="section-divider">
         <span class="line"></span>
         <span class="text">GO OUT AND PLAY</span>
         <span class="line"></span>
      </div>
      <div class="horizontal-sports-scroll">
        <div class="sport-card-tall" onclick="navigateTo(screens.PLAY)">
          <div class="sport-card-tall-title">Badminton</div>
          <div class="sport-emoji">🏸</div>
        </div>
        <div class="sport-card-tall" onclick="navigateTo(screens.PLAY)">
          <div class="sport-card-tall-title">Pickleball</div>
          <div class="sport-emoji">🎾</div>
        </div>
        <div class="sport-card-tall" onclick="navigateTo(screens.PLAY)">
          <div class="sport-card-tall-title">Padel</div>
          <div class="sport-emoji">🎾</div>
        </div>
        <div class="sport-card-tall" onclick="navigateTo(screens.PLAY)">
          <div class="sport-card-tall-title">Table Tennis</div>
          <div class="sport-emoji">🏓</div>
        </div>
        <div class="sport-card-tall" onclick="navigateTo(screens.PLAY)">
          <div class="sport-card-tall-title">Turf Football</div>
          <div class="sport-emoji">⚽</div>
        </div>
        <div class="sport-card-tall" onclick="navigateTo(screens.PLAY)">
          <div class="sport-card-tall-title">Box Cricket</div>
          <div class="sport-emoji">🏏</div>
        </div>
      </div>

    </div>
  `;

  document.querySelector('.profile-icon').addEventListener('click', () => {
    navigateTo(screens.PROFILE);
  });
}

function renderPlay() {
  appContainer.innerHTML = getHeaderAndTabsHTML('play') + `
    <div class="main-content fade-in">
      <div class="hero-section">
        <div class="hero-image-banner">
            <h2 class="banner-title">Women's Day Specials</h2>
            <p class="banner-subtitle">25% OFF up to ₹500</p>
            <p class="banner-disclaimer">This weekend only</p>
        </div>
        <div class="view-all-venues-btn glass">
            <span>View all venues</span>
            <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>

      <section class="sport-grid-section">
        <div class="section-header">
          <span class="line"></span>
          <h3 class="section-title">PICK A SPORT</h3>
          <span class="line"></span>
        </div>
        <div class="sport-grid">
          ${renderSportItem('Badminton', '🏸')}
          ${renderSportItem('Pickleball', '🎾')}
          ${renderSportItem('Padel', '🎾')}
          ${renderSportItem('Table Tennis', '🏓')}
          ${renderSportItem('Turf Football', '⚽')}
          ${renderSportItem('Box Cricket', '🏏')}
        </div>
      </section>

      <section class="nearby-section">
        <div class="section-header">
          <span class="line"></span>
          <h3 class="section-title">BADMINTON COURTS NEAR YOU</h3>
          <span class="line"></span>
        </div>
        <div class="venue-list">
          ${venues.map(v => renderVenueCard(v)).join('')}
        </div>
      </section>
    </div>
  `;

  // Event Listeners
  document.querySelectorAll('.venue-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      navigateTo(screens.DETAIL, id);
    });
  });

  document.querySelector('.profile-icon').addEventListener('click', () => {
    navigateTo(screens.PROFILE);
  });
}

function renderSportItem(name, icon) {
  return `
    <div class="sport-item glass">
      <div class="sport-icon">${icon}</div>
      <span class="sport-name">${name}</span>
    </div>
  `;
}

function renderVenueCard(venue) {
  return `
    <div class="venue-card" data-id="${venue.id}">
      <div class="venue-image" style="background-image: url('${venue.image}')">
        <div class="venue-bookmark glass"><i class="fa-regular fa-bookmark"></i></div>
        <div class="venue-offer-badge">
             <i class="fa-solid fa-tag"></i> ${venue.offers[0]}
        </div>
      </div>
      <div class="venue-info">
        <div class="venue-title-row">
          <h4 class="venue-name">${venue.name}</h4>
          <div class="venue-rating">
            <span class="rating-value">${venue.rating} <i class="fa-solid fa-star"></i></span>
            <span class="google-label">Google</span>
            <span class="ratings-count">${venue.ratingsCount} ratings</span>
          </div>
        </div>
        <div class="venue-meta">
          <span>${venue.distance} • ${venue.area}</span>
        </div>
        <div class="venue-price-row">
            <span class="price-value">${venue.price}</span>
        </div>
      </div>
    </div>
  `;
}

function renderDetail(id) {
  const venue = venues.find(v => v.id == id);
  appContainer.innerHTML = `
    <div class="detail-screen ${venue ? 'fade-in' : ''}">
      <header class="detail-header">
        <button class="back-btn"><i class="fa-solid fa-arrow-left"></i></button>
        <div class="detail-header-actions">
           <button class="action-btn"><i class="fa-regular fa-bookmark"></i></button>
           <button class="action-btn"><i class="fa-solid fa-share-nodes"></i></button>
        </div>
      </header>

      <div class="detail-image-hero" style="background-image: url('${venue.image}')"></div>

      <div class="detail-content">
        <div class="detail-title-section">
          <h2 class="detail-name">${venue.name}</h2>
          <div class="detail-rating-row">
             <span class="rating-badge">${venue.rating} <i class="fa-solid fa-star"></i></span>
             <span class="google-text">Google</span>
             <span class="ratings-count">${venue.ratingsCount} ratings</span>
          </div>
          <p class="detail-address">${venue.distance} • 07, Ramaiah Garden, J.P. Nagar, Bengaluru, Karnataka 560078, India</p>
          <button class="directions-btn glass">
            <i class="fa-solid fa-paper-plane"></i> Directions
          </button>
        </div>

        <section class="detail-info-section">
           <h3>1 SPORT AVAILABLE</h3>
           <div class="sport-tag active">
              <i class="fa-solid fa-shuttlecock"></i> Badminton
           </div>
        </section>

        <section class="detail-info-section">
           <h3>2 OFFERS AVAILABLE</h3>
           <div class="offers-row">
              ${venue.offers.map(o => `
                <div class="detail-offer-card glass">
                   <i class="fa-solid fa-ticket"></i>
                   <div class="offer-text">${o}</div>
                </div>
              `).join('')}
           </div>
        </section>

        <section class="detail-info-section">
           <h3>AMENITIES AVAILABLE</h3>
           <div class="amenities-grid">
              ${venue.amenities.map(a => `
                <div class="amenity-item">
                   <i class="fa-solid fa-check"></i> <span>${a}</span>
                </div>
              `).join('')}
           </div>
        </section>

        <div class="more-section">
           <h3>MORE</h3>
           <div class="more-item">
              <i class="fa-solid fa-circle-exclamation"></i>
              <span>Cancellation policy</span>
              <i class="fa-solid fa-chevron-right"></i>
           </div>
           <div class="more-item">
              <i class="fa-solid fa-circle-question"></i>
              <span>Frequently asked questions</span>
              <i class="fa-solid fa-chevron-right"></i>
           </div>
        </div>
      </div>

      <footer class="detail-footer">
          <div class="footer-left">
            <span class="footer-sport">Badminton</span>
          </div>
          <button class="book-slots-btn">Book slots</button>
      </footer>
    </div>
  `;

  document.querySelector('.back-btn').addEventListener('click', () => {
    navigateTo(screens.HOME);
  });

  document.querySelector('.book-slots-btn').addEventListener('click', () => {
    navigateTo(screens.BOOKING, id);
  });
}

function renderProfile() {
  appContainer.innerHTML = `
    <div class="profile-screen fade-in">
      <header class="profile-header">
        <button class="back-btn-small"><i class="fa-solid fa-arrow-left"></i></button>
        <h2>Profile</h2>
      </header>

      <section class="user-info-section">
        <div class="profile-avatar">
          <i class="fa-solid fa-user"></i>
        </div>
        <div class="user-details">
          <h1 class="user-name">ashish jangra</h1>
          <p class="user-phone">+91 8278915274</p>
        </div>
        <i class="fa-solid fa-pen edit-profile-icon"></i>
      </section>

      <div class="pass-banner-container">
        <div class="pass-banner">
          <div class="pass-logo-group">
            <span class="pass-logo-text">district</span>
            <span class="pass-logo-main">PASS</span>
          </div>
          <span class="pass-text">Become a Pass holder at ₹999</span>
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>

      <h3 class="profile-section-title">All bookings</h3>
      <div class="booking-icons-grid">
        <div class="booking-icon-card">
          <i class="fa-solid fa-utensils"></i>
          <span class="booking-icon-label">Table bookings</span>
        </div>
        <div class="booking-icon-card">
          <i class="fa-solid fa-clapperboard"></i>
          <span class="booking-icon-label">Movie tickets</span>
        </div>
        <div class="booking-icon-card">
          <i class="fa-solid fa-guitar"></i>
          <span class="booking-icon-label">Event tickets</span>
        </div>
      </div>

      <div class="update-banner">
        <i class="fa-solid fa-arrows-rotate"></i>
        <span class="update-text">App update available</span>
        <i class="fa-solid fa-chevron-right"></i>
      </div>

      <div class="profile-group">
        <h3 class="profile-group-title">Vouchers</h3>
        <div class="profile-card-group">
          <div class="profile-list-item">
            <i class="fa-solid fa-gift"></i>
            <span class="profile-item-text">Collected vouchers</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="profile-group">
        <h3 class="profile-group-title">Payments</h3>
        <div class="profile-card-group">
          <div class="profile-list-item">
            <i class="fa-solid fa-receipt"></i>
            <span class="profile-item-text">Dining transactions</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="profile-list-item">
            <i class="fa-solid fa-receipt"></i>
            <span class="profile-item-text">Store transactions</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="profile-list-item">
            <i class="fa-solid fa-wallet"></i>
            <span class="profile-item-text">District Money</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="profile-list-item">
            <i class="fa-solid fa-credit-card"></i>
            <span class="profile-item-text">Claim a Gift Card</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="profile-group">
        <h3 class="profile-group-title">Feeding India</h3>
        <div class="profile-card-group">
          <div class="profile-list-item">
            <i class="fa-solid fa-heart"></i>
            <span class="profile-item-text">Get Feeding India receipt</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="profile-group">
        <h3 class="profile-group-title">Manage</h3>
        <div class="profile-card-group">
          <div class="profile-list-item">
            <i class="fa-solid fa-pen-to-square"></i>
            <span class="profile-item-text">Your reviews</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="profile-list-item">
            <i class="fa-solid fa-bookmark"></i>
            <span class="profile-item-text">Hotlists</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="profile-list-item">
            <i class="fa-solid fa-bell"></i>
            <span class="profile-item-text">Movie reminders</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="profile-list-item">
            <i class="fa-solid fa-credit-card"></i>
            <span class="profile-item-text">Payment settings</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="profile-list-item">
            <i class="fa-solid fa-palette"></i>
            <span class="profile-item-text">Appearance</span>
            <span class="profile-item-meta">Dark</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="profile-group">
        <h3 class="profile-group-title">Support</h3>
        <div class="profile-card-group">
          <div class="profile-list-item">
            <i class="fa-solid fa-circle-question"></i>
            <span class="profile-item-text">Frequently asked questions</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="profile-list-item">
            <i class="fa-solid fa-message"></i>
            <span class="profile-item-text">Chat with us</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="profile-list-item">
            <i class="fa-solid fa-comment-dots"></i>
            <span class="profile-item-text">Share feedback</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="profile-group">
        <h3 class="profile-group-title">More</h3>
        <div class="profile-card-group">
          <div class="profile-list-item">
            <i class="fa-solid fa-user-gear"></i>
            <span class="profile-item-text">Account settings</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="profile-list-item">
            <i class="fa-solid fa-circle-info"></i>
            <span class="profile-item-text">About us</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="profile-list-item">
            <i class="fa-solid fa-right-from-bracket"></i>
            <span class="profile-item-text">Logout</span>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="profile-footer">
        <span class="footer-logo">district</span>
        <span class="footer-version">v2.36.0</span>
      </div>
    </div>
  `;

  document.querySelector('.back-btn-small').addEventListener('click', () => {
    navigateTo(screens.HOME);
  });
}

// Booking State
let bookingState = {
  venueId: null,
  selectedDate: 8, // Default Mar 08 from screenshot
  duration: 1,
  selectedSlot: null,
  selectedCourt: null
};

function renderBooking(id) {
  const venue = venues.find(v => v.id == id);
  bookingState.venueId = id;

  const dates = [
    { num: '08', day: 'Sun' },
    { num: '09', day: 'Mon' },
    { num: '10', day: 'Tue' },
    { num: '11', day: 'Wed' },
    { num: '12', day: 'Thu' },
    { num: '13', day: 'Fri' }
  ];

  const slots = [
    { time: '7 - 8 PM', courts: 1 },
    { time: '8 - 9 PM', courts: 1 }
  ];

  const courts = [
    { id: 1, name: 'Court 1', type: 'Indoor | Synthetic | Standard', price: venue.price + '.00', img: venue.image }
  ];

  appContainer.innerHTML = `
    <div class="booking-screen fade-in">
      <header class="booking-header">
        <button class="back-btn-small"><i class="fa-solid fa-arrow-left"></i></button>
        <div class="header-title-group">
          <h2>Badminton</h2>
          <p class="header-subtitle">${venue.name}</p>
        </div>
      </header>

      <div class="date-selector">
        <div class="month-label">MAR</div>
        ${dates.map(d => `
          <div class="date-item ${bookingState.selectedDate == parseInt(d.num) ? 'active' : ''}" data-date="${d.num}">
            <span class="date-num">${d.num}</span>
            <span class="date-day">${d.day}</span>
          </div>
        `).join('')}
      </div>

      <div class="duration-container">
        <div class="duration-selector">
          <span>Duration</span>
          <div class="duration-controls">
            <button class="duration-btn minus">-</button>
            <span>${bookingState.duration} hr</span>
            <button class="duration-btn plus">+</button>
          </div>
        </div>
      </div>

      <section class="slots-section">
        <h3>Time slots available</h3>
        <div class="slots-grid">
          ${slots.map(s => `
            <div class="slot-item ${bookingState.selectedSlot === s.time ? 'active' : ''}" data-slot="${s.time}">
              <span class="slot-time">${s.time}</span>
              <span class="slot-availability">${s.courts} court</span>
            </div>
          `).join('')}
        </div>
      </section>

      ${bookingState.selectedSlot ? `
        <section class="court-selection-section fade-in">
          <h3>1 court available</h3>
          <div class="court-item" data-court-id="1">
            <img src="${courts[0].img}" class="court-img">
            <div class="court-info">
              <div class="court-name">${courts[0].name}</div>
              <div class="court-meta">${courts[0].type}</div>
              <div class="court-price">${courts[0].price}</div>
            </div>
            <div class="court-check ${bookingState.selectedCourt === 1 ? 'active' : ''}">
              ${bookingState.selectedCourt === 1 ? '<i class="fa-solid fa-check"></i>' : ''}
            </div>
          </div>
        </section>
      ` : ''}

      ${bookingState.selectedCourt ? `
        <div class="proceed-bar fade-in">
          <div class="proceed-info">
            <span class="selected-count">1 court selected</span>
            <span class="selected-slots-text">${bookingState.selectedSlot}</span>
          </div>
          <button class="proceed-btn">Proceed</button>
        </div>
      ` : ''}
    </div>
  `;

  // Event Listeners
  document.querySelector('.back-btn-small').addEventListener('click', () => {
    navigateTo(screens.DETAIL, id);
  });

  document.querySelectorAll('.date-item').forEach(item => {
    item.addEventListener('click', () => {
      bookingState.selectedDate = parseInt(item.dataset.date);
      renderBooking(id);
    });
  });

  document.querySelector('.duration-btn.plus').addEventListener('click', () => {
    bookingState.duration++;
    renderBooking(id);
  });

  document.querySelector('.duration-btn.minus').addEventListener('click', () => {
    if (bookingState.duration > 1) {
      bookingState.duration--;
      renderBooking(id);
    }
  });

  document.querySelectorAll('.slot-item').forEach(item => {
    item.addEventListener('click', () => {
      bookingState.selectedSlot = item.dataset.slot;
      renderBooking(id);
    });
  });

  if (document.querySelector('.court-item')) {
    document.querySelector('.court-item').addEventListener('click', () => {
      bookingState.selectedCourt = bookingState.selectedCourt === 1 ? null : 1;
      renderBooking(id);
    });
  }
}

function navigateTo(screen, id = null) {
  currentScreen = screen;
  if (screen === screens.HOME) {
    renderHome();
  } else if (screen === screens.PLAY) {
    renderPlay();
  } else if (screen === screens.DETAIL) {
    renderDetail(id);
  } else if (screen === screens.BOOKING) {
    renderBooking(id);
  } else if (screen === screens.PROFILE) {
    renderProfile();
  }
}

// Attach to window so inline onclick handlers work
window.navigateTo = navigateTo;
window.screens = screens;

// Initial Navigation
navigateTo(screens.HOME);
