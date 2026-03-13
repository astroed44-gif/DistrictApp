// Screen data and logic
const screens = {
  HOME: 'home',
  PLAY: 'play',
  DETAIL: 'detail',
  BOOKING: 'booking',
  PROFILE: 'profile',
  BUNDLE_DETAIL: 'bundle_detail',
  BUNDLE_CUSTOMIZE: 'bundle_customize',
  BUNDLE_CHECKOUT: 'bundle_checkout',
  BUNDLE_CONFIRMATION: 'bundle_confirmation',
  PAYMENT_METHOD: 'payment_method',
  ONBOARDING_INTRO: 'onboarding_intro',
  ONBOARDING_ARCHETYPE: 'onboarding_archetype',
  ONBOARDING_TRAITS: 'onboarding_traits',
  ONBOARDING_SPORTS: 'onboarding_sports',
  ONBOARDING_VIBES: 'onboarding_vibes',
  ONBOARDING_INTERESTS: 'onboarding_interests',
  ONBOARDING_AVATAR: 'onboarding_avatar',
  ONBOARDING_REVEAL: 'onboarding_reveal',
  PROFILE_HUB: 'profile_hub'
};

let currentScreen = screens.HOME;
window.hasCompletedOnboarding = localStorage.getItem('district_onboarding_done') === 'true';

const savedData = localStorage.getItem('district_onboarding_data');
window.onboardingData = savedData ? JSON.parse(savedData) : {
  archetype: '',
  traits: [],
  sports: [],
  vibes: '',
  interests: [],
  avatar: ''
};

window.saveOnboardingState = function() {
  localStorage.setItem('district_onboarding_done', 'true');
  localStorage.setItem('district_onboarding_data', JSON.stringify(window.onboardingData));
};

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

const eveningBundles = [
  {
    id: 'date-night',
    title: 'Date Night Experience',
    subtitle: 'Pickleball + Rooftop Dinner',
    price: '₹2200 for two',
    duration: '3 hours',
    image: 'images/date_night.png', // Premium date night vibe
    icons: ['<i class="fa-solid fa-table-tennis-paddle-ball"></i>', '<i class="fa-solid fa-utensils"></i>', '<i class="fa-solid fa-martini-glass"></i>']
  },
  {
    id: 'birthday',
    title: 'Birthday Celebration',
    subtitle: 'Football + Drinks + Cake',
    price: '₹4500 for group',
    duration: '4 hours',
    image: 'images/birthday.png', // Premium birthday vibe
    icons: ['<i class="fa-solid fa-futbol"></i>', '<i class="fa-solid fa-beer-mug-empty"></i>', '<i class="fa-solid fa-cake-candles"></i>']
  },
  {
    id: 'squad-night',
    title: 'Squad Night Out',
    subtitle: 'Turf Football + Sports Bar',
    price: '₹3000 for group',
    duration: '3.5 hours',
    image: 'images/squad_night.png', // Premium squad night vibe
    icons: ['<i class="fa-solid fa-futbol"></i>', '<i class="fa-solid fa-burger"></i>', '<i class="fa-solid fa-beer-mug-empty"></i>']
  }
];

window.currentBundleData = {
   players: 2,
   food: 'Italian',
   addons: []
};

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

      <section class="plan-evening-section">
        <div class="section-header" style="margin-top: 24px;">
          <span class="line"></span>
          <h3 class="section-title">PLAN YOUR EVENING</h3>
          <span class="line"></span>
        </div>
        <div class="bundle-scroll-container">
          ${eveningBundles.map(bundle => renderBundleCard(bundle)).join('')}
        </div>
      </section>

      <section class="nearby-section" style="margin-top: 16px;">
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

function renderBundleCard(bundle) {
  return `
    <div class="bundle-card" onclick="navigateTo(screens.BUNDLE_DETAIL, '${bundle.id}')">
      <div class="bundle-image" style="background-image: url('${bundle.image}')">
         <div class="bundle-duration glass"><i class="fa-regular fa-clock"></i> ${bundle.duration}</div>
      </div>
      <div class="bundle-info">
         <h4 class="bundle-title">${bundle.title}</h4>
         <p class="bundle-subtitle">${bundle.subtitle}</p>
         
         <div class="bundle-timeline-icons">
            ${bundle.icons.join('<i class="fa-solid fa-arrow-right-long arrow-dim"></i>')}
         </div>
         
         <div class="bundle-price-footer">
            <span class="price-val">${bundle.price}</span>
            <button class="book-mini-btn">VIEW</button>
         </div>
      </div>
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
  let nudgeHTML = '';
  if (window.hasCompletedOnboarding) {
      nudgeHTML = `
      <div class="onboarding-nudge glass fade-in" onclick="navigateTo(screens.PROFILE_HUB)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-left: 4px solid #bc13fe; padding: 16px;">
        <div style="display: flex; align-items: center; gap: 16px;">
            <div class="mini-card-banner" style="width: 48px; height: 64px; background: #111; border-radius: 8px; border: 1px solid #bc13fe; display: flex; align-items: center; justify-content: center; position: relative;">
                 <i class="fa-solid ${window.onboardingData.avatar || 'fa-user'}" style="color: #fff; font-size: 1.5rem;"></i>
                 <div style="position: absolute; top: 4px; left: 4px; font-weight: 800; font-size: 0.5rem; color: #fff;">99</div>
            </div>
            <div>
               <h3 style="margin-bottom: 4px; font-weight: 800; font-size: 1.2rem;">Identity Hub</h3>
               <p style="font-size: 0.85rem; color: #bc13fe; font-weight: 700;">Level 12 • ${window.onboardingData.archetype || 'Player'}</p>
            </div>
        </div>
        <i class="fa-solid fa-chevron-right" style="color: var(--text-secondary); font-size: 1.2rem;"></i>
      </div>
      `;
  } else {
      nudgeHTML = `
      <div class="onboarding-nudge glass fade-in" id="profile-nudge">
        <button class="nudge-close" onclick="document.getElementById('profile-nudge').style.display='none';"><i class="fa-solid fa-xmark"></i></button>
        <div class="nudge-visual">
           <div class="nudge-card-outline neon-glow"></div>
        </div>
        <div class="nudge-content">
           <h3>Create Your Player</h3>
           <p>Your District Card shows who you are on the court.</p>
           <button class="nudge-start-btn" onclick="navigateTo(screens.ONBOARDING_INTRO)">Start</button>
        </div>
      </div>
      `;
  }

  appContainer.innerHTML = `
    <div class="profile-screen fade-in" style="position: relative;">
      <header class="profile-header">
        <button class="back-btn-small" onclick="navigateTo(screens.HOME)"><i class="fa-solid fa-arrow-left"></i></button>
        <h2>Profile</h2>
      </header>

      ${nudgeHTML}

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
  } else if (screen === screens.PROFILE_HUB) {
    renderProfileHub();
  } else if (screen === screens.BUNDLE_DETAIL) {
    renderBundleDetail(id);
  } else if (screen === screens.BUNDLE_CUSTOMIZE) {
    renderBundleCustomize(id);
  } else if (screen === screens.BUNDLE_CHECKOUT) {
    renderBundleCheckout(id);
  } else if (screen === screens.PAYMENT_METHOD) {
    renderPaymentMethod(id);
  } else if (screen === screens.BUNDLE_CONFIRMATION) {
    renderBundleConfirmation(id);
  } else if (screen === screens.ONBOARDING_INTRO) {
    renderOnboardingIntro();
  } else if (screen === screens.ONBOARDING_ARCHETYPE) {
    renderOnboardingArchetype();
  } else if (screen === screens.ONBOARDING_TRAITS) {
    renderOnboardingTraits();
  } else if (screen === screens.ONBOARDING_SPORTS) {
    renderOnboardingSports();
  } else if (screen === screens.ONBOARDING_VIBES) {
    renderOnboardingVibes();
  } else if (screen === screens.ONBOARDING_INTERESTS) {
    renderOnboardingInterests();
  } else if (screen === screens.ONBOARDING_AVATAR) {
    renderOnboardingAvatar();
  } else if (screen === screens.ONBOARDING_REVEAL) {
    renderOnboardingReveal();
  }
}

// Attach to window so inline onclick handlers work
window.navigateTo = navigateTo;
window.screens = screens;

// Stub functions so rendering doesn't throw errors yet
window.renderBundleDetail = function(id) {
  const bundle = eveningBundles.find(b => b.id === id);
  if (!bundle) return;
  
  // Custom timelines based on the bundle type as requested
  let timelineHTML = '';
  let includedHTML = '';
  
  if (id === 'date-night') {
    timelineHTML = `
      <div class="timeline-item">
        <div class="timeline-time">7:00 PM</div>
        <div class="timeline-content">
           <h4>Pickleball at Elite Arena</h4>
           <p>1 hr court booking reserved</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-time">8:30 PM</div>
        <div class="timeline-content">
           <h4>Dinner at Rooftop Lounge</h4>
           <p>Table for two reserved</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-time">10:00 PM</div>
        <div class="timeline-content">
           <h4>Dessert or drinks nearby</h4>
           <p>Curated list of nearby spots</p>
        </div>
      </div>
    `;
    includedHTML = `
      <ul class="included-list">
        <li><i class="fa-solid fa-check"></i> Court booking (1 hour)</li>
        <li><i class="fa-solid fa-check"></i> Dinner reservation (Priority Seating)</li>
        <li><i class="fa-solid fa-check"></i> Complimentary welcome drink</li>
      </ul>
    `;
  } else if (id === 'birthday') {
    timelineHTML = `
      <div class="timeline-item">
        <div class="timeline-time">8:00 PM</div>
        <div class="timeline-content">
           <h4>Football at Arena 57</h4>
           <p>1 hr turf booking reserved</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-time">9:30 PM</div>
        <div class="timeline-content">
           <h4>Drinks & Cake at The Taproom</h4>
           <p>Large group table reserved</p>
        </div>
      </div>
    `;
    includedHTML = `
      <ul class="included-list">
        <li><i class="fa-solid fa-check"></i> Turf booking (1 hour)</li>
        <li><i class="fa-solid fa-check"></i> Bar reservation for group</li>
        <li><i class="fa-solid fa-check"></i> Custom birthday cake pre-ordered</li>
      </ul>
    `;
  } else {
    timelineHTML = `
      <div class="timeline-item">
        <div class="timeline-time">7:30 PM</div>
        <div class="timeline-content">
           <h4>Turf Football</h4>
           <p>1 hr turf booking reserved</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-time">9:00 PM</div>
        <div class="timeline-content">
           <h4>Sports Bar</h4>
           <p>Group table for the squad</p>
        </div>
      </div>
    `;
    includedHTML = `
      <ul class="included-list">
        <li><i class="fa-solid fa-check"></i> Turf booking (1 hour)</li>
        <li><i class="fa-solid fa-check"></i> Bar reservation</li>
        <li><i class="fa-solid fa-check"></i> 15% off food bill</li>
      </ul>
    `;
  }

  appContainer.innerHTML = `
    <div class="bundle-detail-screen fade-in">
      <header class="detail-header" style="background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%);">
        <button class="back-btn"><i class="fa-solid fa-arrow-left"></i></button>
      </header>

      <div class="detail-image-hero bundle-hero" style="background-image: url('${bundle.image}'); height: 320px;"></div>

      <div class="detail-content" style="margin-top: -30px; border-radius: 20px 20px 0 0; position: relative; background: var(--bg-color); padding-top: 24px;">
        <h2 class="detail-name">${bundle.title}</h2>
        
        <div class="bundle-price-row">
           <span class="price-value">${bundle.price}</span>
           <span class="duration-badge glass"><i class="fa-regular fa-clock"></i> ${bundle.duration}</span>
        </div>

        <section class="evening-plan-section">
           <div class="section-header">
              <span class="line"></span>
              <h3 class="section-title">YOUR EVENING PLAN</h3>
              <span class="line"></span>
           </div>
           
           <div class="timeline-container">
              ${timelineHTML}
           </div>
        </section>

        <section class="evening-plan-section">
           <div class="section-header">
              <span class="line"></span>
              <h3 class="section-title">WHAT'S INCLUDED</h3>
              <span class="line"></span>
           </div>
           ${includedHTML}
        </section>
        
        <!-- Bottom breathing room -->
        <div style="height: 100px;"></div>
      </div>

      <footer class="bundle-detail-footer detail-footer">
          <button class="secondary-btn" id="customize-btn">Customize Evening</button>
          <button class="book-slots-btn" id="book-bundle-btn">Book This Evening</button>
      </footer>
    </div>
  `;

  document.querySelector('.back-btn').addEventListener('click', () => navigateTo(screens.PLAY));
  document.getElementById('customize-btn').addEventListener('click', () => navigateTo(screens.BUNDLE_CUSTOMIZE, id));
  document.getElementById('book-bundle-btn').addEventListener('click', () => navigateTo(screens.BUNDLE_CHECKOUT, id));
}

window.renderBundleCustomize = function(id) {
  const bundle = eveningBundles.find(b => b.id === id);
  if (!bundle) return;

  appContainer.innerHTML = `
    <div class="profile-screen bundle-customize-screen fade-in">
      <header class="profile-header">
        <button class="back-btn-small" onclick="navigateTo(screens.BUNDLE_DETAIL, '${id}')"><i class="fa-solid fa-arrow-left"></i></button>
        <h2>Customize Your Evening</h2>
      </header>

      <div class="main-content" style="padding: 0 var(--spacing-md);">
          <section class="custom-section">
             <h3>Players</h3>
             <div class="players-selector selector-group">
                <button class="pill-btn ${window.currentBundleData.players === 2 ? 'active' : ''}" onclick="window.currentBundleData.players=2; renderBundleCustomize('${id}')">2 Players</button>
                <button class="pill-btn ${window.currentBundleData.players === 4 ? 'active' : ''}" onclick="window.currentBundleData.players=4; renderBundleCustomize('${id}')">4 Players</button>
                <button class="pill-btn ${window.currentBundleData.players === 6 ? 'active' : ''}" onclick="window.currentBundleData.players=6; renderBundleCustomize('${id}')">6+ Players</button>
             </div>
          </section>

          <section class="custom-section">
             <h3>Dinner Preference</h3>
             <div class="dinner-selector selector-group">
                <button class="pill-btn ${window.currentBundleData.food === 'Italian' ? 'active' : ''}" onclick="window.currentBundleData.food='Italian'; renderBundleCustomize('${id}')">Italian</button>
                <button class="pill-btn ${window.currentBundleData.food === 'Asian' ? 'active' : ''}" onclick="window.currentBundleData.food='Asian'; renderBundleCustomize('${id}')">Asian</button>
                <button class="pill-btn ${window.currentBundleData.food === 'Indian' ? 'active' : ''}" onclick="window.currentBundleData.food='Indian'; renderBundleCustomize('${id}')">Indian</button>
             </div>
          </section>

          <section class="custom-section">
             <h3>Add-ons</h3>
             <div class="addons-list">
                <div class="addon-item glass" onclick="toggleAddon('Wine Bottle', '${id}')">
                   <div class="addon-info">
                     <h4>Wine Bottle</h4>
                     <p>+ ₹1500</p>
                   </div>
                   <div class="checkbox ${window.currentBundleData.addons.includes('Wine Bottle') ? 'checked' : ''}"><i class="fa-solid fa-check"></i></div>
                </div>
                <div class="addon-item glass" onclick="toggleAddon('Birthday Cake', '${id}')">
                   <div class="addon-info">
                     <h4>Birthday Cake</h4>
                     <p>+ ₹800</p>
                   </div>
                   <div class="checkbox ${window.currentBundleData.addons.includes('Birthday Cake') ? 'checked' : ''}"><i class="fa-solid fa-check"></i></div>
                </div>
                <div class="addon-item glass" onclick="toggleAddon('Photographer', '${id}')">
                   <div class="addon-info">
                     <h4>Photographer</h4>
                     <p>+ ₹2500</p>
                   </div>
                   <div class="checkbox ${window.currentBundleData.addons.includes('Photographer') ? 'checked' : ''}"><i class="fa-solid fa-check"></i></div>
                </div>
             </div>
          </section>
          
          <!-- Spacer -->
          <div style="height: 120px;"></div>
      </div>

      <footer class="bundle-detail-footer detail-footer" style="flex-direction: column; align-items: stretch; gap: 8px;">
          <div class="price-summary-row" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
             <span style="color: var(--text-secondary);">Estimated Total</span>
             <span style="font-weight: 800; font-size: 1.1rem;">₹${calculateBundleTotal(id)}</span>
          </div>
          <button class="book-slots-btn" style="width: 100%;" onclick="navigateTo(screens.BUNDLE_CHECKOUT, '${id}')">Continue to Checkout</button>
      </footer>
    </div>
  `;
}

// Helper to toggle add-ons
window.toggleAddon = function(addon, id) {
  if (window.currentBundleData.addons.includes(addon)) {
    window.currentBundleData.addons = window.currentBundleData.addons.filter(a => a !== addon);
  } else {
    window.currentBundleData.addons.push(addon);
  }
  renderBundleCustomize(id);
}

// Helper to calculate estimated price dynamically
window.calculateBundleTotal = function(id) {
  let base = id === 'date-night' ? 2200 : (id === 'birthday' ? 4500 : 3000);
  
  if (window.currentBundleData.players === 4) base += 1000;
  if (window.currentBundleData.players === 6) base += 2000;
  
  if (window.currentBundleData.addons.includes('Wine Bottle')) base += 1500;
  if (window.currentBundleData.addons.includes('Birthday Cake')) base += 800;
  if (window.currentBundleData.addons.includes('Photographer')) base += 2500;
  
  return base;
}

window.renderBundleCheckout = function(id) {
  const bundle = eveningBundles.find(b => b.id === id);
  if (!bundle) return;
  
  const baseCourt = id === 'date-night' ? 900 : (id === 'birthday' ? 1500 : 1200);
  const baseFnb = id === 'date-night' ? 1500 : (id === 'birthday' ? 3500 : 2000);
  const addOnCost = calculateBundleTotal(id) - (baseCourt + baseFnb - 200); // reverse engineered for display
  const total = calculateBundleTotal(id);
  const discount = 200; // Fixed bundle discount
  
  let experience1 = '';
  let experience2 = '';
  
  if (id === 'date-night') {
     experience1 = `Pickleball Court<br><span style="color:var(--text-secondary); font-size:0.85rem; font-weight:400;">Elite Arena • 7:00 PM</span>`;
     experience2 = `Dinner Reservation<br><span style="color:var(--text-secondary); font-size:0.85rem; font-weight:400;">Rooftop Lounge • 8:30 PM</span>`;
  } else if (id === 'birthday') {
     experience1 = `Turf Football<br><span style="color:var(--text-secondary); font-size:0.85rem; font-weight:400;">Arena 57 • 8:00 PM</span>`;
     experience2 = `Group Drinks & Cake<br><span style="color:var(--text-secondary); font-size:0.85rem; font-weight:400;">The Taproom • 9:30 PM</span>`;
  } else {
     experience1 = `Turf Football<br><span style="color:var(--text-secondary); font-size:0.85rem; font-weight:400;">Arena 57 • 7:30 PM</span>`;
     experience2 = `Sports Bar Reservation<br><span style="color:var(--text-secondary); font-size:0.85rem; font-weight:400;">The Taproom • 9:00 PM</span>`;
  }

  appContainer.innerHTML = `
    <div class="profile-screen fade-in">
      <header class="profile-header">
        <button class="back-btn-small" onclick="navigateTo(screens.BUNDLE_CUSTOMIZE, '${id}')"><i class="fa-solid fa-arrow-left"></i></button>
        <h2>Checkout</h2>
      </header>

      <div class="main-content" style="padding: 16px var(--spacing-md);">
          
          <div class="checkout-summary-card glass">
             <h3>Booking Details</h3>
             
             <div class="checkout-item-row" style="margin-top: 16px;">
                <div class="checkout-dot"></div>
                <div class="checkout-item-text">${experience1}</div>
             </div>
             <div class="checkout-item-row" style="margin-top: 16px;">
                <div class="checkout-dot"></div>
                <div class="checkout-item-text">${experience2}</div>
             </div>
             
             ${window.currentBundleData.addons.length > 0 ? `
             <div class="checkout-item-row" style="margin-top: 16px;">
                <div class="checkout-dot"></div>
                <div class="checkout-item-text">Add-ons<br><span style="color:var(--text-secondary); font-size:0.85rem; font-weight:400;">${window.currentBundleData.addons.join(', ')}</span></div>
             </div>
             ` : ''}
          </div>

          <div class="checkout-summary-card glass" style="margin-top: 24px;">
             <h3>Price Summary</h3>
             <div class="price-breakdown-container" style="margin-top: 16px;">
               <div class="price-row">
                 <span>Court booking</span>
                 <span>₹${baseCourt}</span>
               </div>
               <div class="price-row">
                 <span>F&B reservation</span>
                 <span>₹${baseFnb}</span>
               </div>
               ${window.currentBundleData.addons.length > 0 ? `
               <div class="price-row">
                 <span>Add-ons</span>
                 <span>₹${addOnCost}</span>
               </div>
               ` : ''}
               <div class="price-row highlight-green">
                 <span>Bundle discount</span>
                 <span>-₹${discount}</span>
               </div>
               <div class="price-divider"></div>
               <div class="price-row total-row">
                 <span>Total Price</span>
                 <span>₹${total}</span>
               </div>
             </div>
          </div>
          
          <div style="height: 120px;"></div>
      </div>

      <footer class="bundle-detail-footer detail-footer">
          <button class="book-slots-btn" style="width: 100%;" onclick="navigateTo(screens.PAYMENT_METHOD, '${id}')">Pay Now</button>
      </footer>
    </div>
  `;
}

window.renderPaymentMethod = function(id) {
  appContainer.innerHTML = `
    <div class="payment-screen fade-in">
      <header class="payment-header">
        <button class="back-btn-small" onclick="navigateTo(screens.BUNDLE_CHECKOUT, '${id}')"><i class="fa-solid fa-arrow-left"></i></button>
        <h2>Select Payment Method</h2>
      </header>

      <div class="main-content payment-content scrollable">
        
        <div class="payment-section">
          <h3 class="payment-section-title">Recommended</h3>
          <div class="payment-list glass">
            <div class="payment-card" onclick="navigateTo(screens.BUNDLE_CONFIRMATION, '${id}')">
              <div class="payment-icon cred-icon"><i class="fa-brands fa-kickstarter-k"></i></div>
              <span class="payment-name">CRED UPI</span>
              <i class="fa-solid fa-chevron-right payment-arrow"></i>
            </div>
            <div class="payment-card" onclick="navigateTo(screens.BUNDLE_CONFIRMATION, '${id}')">
              <div class="payment-icon gpay-icon"><i class="fa-brands fa-google-pay"></i></div>
              <span class="payment-name">Google Pay UPI</span>
              <i class="fa-solid fa-chevron-right payment-arrow"></i>
            </div>
            <div class="payment-card" onclick="navigateTo(screens.BUNDLE_CONFIRMATION, '${id}')">
              <div class="payment-icon paytm-icon"><span class="paytm-text">Paytm</span></div>
              <span class="payment-name">Paytm UPI</span>
              <i class="fa-solid fa-chevron-right payment-arrow"></i>
            </div>
          </div>
        </div>

        <div class="payment-section">
          <h3 class="payment-section-title">Cards</h3>
          <div class="payment-list glass">
            <div class="payment-card">
              <div class="payment-icon white-icon"><i class="fa-regular fa-credit-card"></i></div>
              <span class="payment-name">Add credit or debit cards</span>
              <button class="payment-add-btn">ADD</button>
            </div>
          </div>
        </div>

        <div class="payment-section">
          <h3 class="payment-section-title">Pay by any UPI app</h3>
          <div class="payment-list glass">
            <div class="payment-card" onclick="navigateTo(screens.BUNDLE_CONFIRMATION, '${id}')">
              <div class="payment-icon jupiter-icon">J</div>
              <span class="payment-name">Jupiter UPI</span>
              <i class="fa-solid fa-chevron-right payment-arrow"></i>
            </div>
          </div>
        </div>

        <div class="payment-section">
          <h3 class="payment-section-title">Wallets</h3>
          <div class="payment-list glass">
            <div class="payment-card">
              <div class="payment-icon amazon-icon">pay</div>
              <div class="payment-details">
                 <span class="payment-name">Amazon Pay Balance</span>
                 <span class="payment-sub">Link your Amazon Pay Balance wallet</span>
              </div>
              <button class="payment-add-btn">ADD</button>
            </div>
            <div class="payment-card disabled-card with-bubble">
              <div class="payment-card-main">
                <div class="payment-icon wallet-icon"><i class="fa-solid fa-wallet"></i></div>
                <span class="payment-name">District Money</span>
              </div>
              <div class="payment-error-bubble">Unavailable due to insufficient balance</div>
            </div>
            <div class="payment-card disabled-card with-bubble">
              <div class="payment-card-main">
                <div class="payment-icon mobikwik-icon">M+</div>
                <span class="payment-name muted-text">Mobikwik</span>
              </div>
              <div class="payment-error-bubble">Currently disabled due to a technical problem.</div>
            </div>
          </div>
        </div>

        <div class="payment-section">
          <h3 class="payment-section-title">Pay Later</h3>
          <div class="payment-list glass">
            <div class="payment-card">
              <div class="payment-icon lazypay-icon"><i class="fa-solid fa-play"></i></div>
              <div class="payment-details">
                 <span class="payment-name">LazyPay</span>
                 <span class="payment-sub">Link your LazyPay account</span>
              </div>
              <button class="payment-add-btn">ADD</button>
            </div>
          </div>
        </div>

        <div class="payment-section">
          <h3 class="payment-section-title">Netbanking</h3>
          <div class="payment-list glass">
            <div class="payment-card">
              <div class="payment-icon white-icon"><i class="fa-solid fa-building-columns"></i></div>
              <span class="payment-name">Netbanking</span>
              <button class="payment-add-btn">ADD</button>
            </div>
          </div>
        </div>
        
        <div style="height: 40px;"></div>

      </div>
    </div>
  `;
}

window.renderBundleConfirmation = function(id) {
  const bundle = eveningBundles.find(b => b.id === id);
  if (!bundle) return;
  
  let recapHTML = '';
  if (id === 'date-night') {
      recapHTML = `
        <div class="recap-row"><span>7:00 PM</span> <span>Pickleball</span></div>
        <div class="recap-row"><span>8:30 PM</span> <span>Dinner</span></div>
      `;
  } else if (id === 'birthday') {
      recapHTML = `
        <div class="recap-row"><span>8:00 PM</span> <span>Football</span></div>
        <div class="recap-row"><span>9:30 PM</span> <span>Drinks & Cake</span></div>
      `;
  } else {
      recapHTML = `
        <div class="recap-row"><span>7:30 PM</span> <span>Turf Football</span></div>
        <div class="recap-row"><span>9:00 PM</span> <span>Sports Bar</span></div>
      `;
  }

  appContainer.innerHTML = `
    <div class="confirmation-screen fade-in">
       <div class="conf-animation">
          <i class="fa-solid fa-circle-check"></i>
       </div>
       <h2>You're all set 🎉</h2>
       <p class="conf-subtitle">${bundle.title} booked</p>
       
       <div class="conf-card glass">
          <h4 style="margin-bottom: 12px; font-size: 0.9rem; color: var(--text-secondary); text-align: center;">TIMELINE RECAP</h4>
          ${recapHTML}
       </div>
       
       <div class="conf-actions">
          <button class="pill-btn conf-btn"><i class="fa-solid fa-share-nodes"></i> Share with Partner</button>
          <button class="pill-btn conf-btn"><i class="fa-regular fa-calendar-plus"></i> Add to Calendar</button>
          <button class="pill-btn conf-btn" onclick="navigateTo(screens.HOME)"><i class="fa-solid fa-house"></i> View Venues via Home</button>
       </div>
    </div>
  `;
}

// --- ONBOARDING FLOW ---

window.renderOnboardingIntro = function() {
  appContainer.innerHTML = `
    <div class="onboarding-screen fade-in">
      <header class="ob-header">
        <button class="back-btn-small" onclick="navigateTo(screens.PROFILE)"><i class="fa-solid fa-arrow-left"></i></button>
      </header>
      <div class="ob-content centered-content">
         <div class="ob-card-hologram">
            <div class="plasma-border"></div>
            <i class="fa-solid fa-user-astronaut empty-avatar"></i>
         </div>
         <h1 class="ob-title glow-text">Create Your Player</h1>
         <p class="ob-subtitle">Your District Card shows who you are on the court.</p>
         <button class="ob-primary-btn neon-glow" onclick="navigateTo(screens.ONBOARDING_ARCHETYPE)">Start</button>
      </div>
    </div>
  `;
};

window.renderOnboardingArchetype = function() {
  window.selectArchetype = function(type) {
     window.onboardingData.archetype = type;
     navigateTo(screens.ONBOARDING_TRAITS);
  };

  appContainer.innerHTML = `
    <div class="onboarding-screen fade-in">
      <header class="ob-header">
        <button class="back-btn-small" onclick="navigateTo(screens.ONBOARDING_INTRO)"><i class="fa-solid fa-arrow-left"></i></button>
        <div class="ob-progress">
          <div class="progress-bar"><div class="progress-fill" style="width: 14%;"></div></div>
        </div>
      </header>
      <div class="ob-content">
         <h2 class="ob-step-title">Choose Your Player Type</h2>
         
         <div class="archetype-grid">
            <div class="archetype-card ${window.onboardingData.archetype === 'The Competitor' ? 'selected' : ''}" onclick="selectArchetype('The Competitor')">
               <div class="arc-icon"><i class="fa-solid fa-trophy"></i></div>
               <div class="arc-info">
                 <h4>The Competitor</h4>
                 <p>Focused, competitive sports player</p>
               </div>
            </div>
            <div class="archetype-card ${window.onboardingData.archetype === 'The Social Player' ? 'selected' : ''}" onclick="selectArchetype('The Social Player')">
               <div class="arc-icon"><i class="fa-solid fa-users"></i></div>
               <div class="arc-info">
                 <h4>The Social Player</h4>
                 <p>Plays for fun and social connection</p>
               </div>
            </div>
            <div class="archetype-card ${window.onboardingData.archetype === 'The Weekend Warrior' ? 'selected' : ''}" onclick="selectArchetype('The Weekend Warrior')">
               <div class="arc-icon"><i class="fa-solid fa-calendar-days"></i></div>
               <div class="arc-info">
                 <h4>The Weekend Warrior</h4>
                 <p>Plays mostly on weekends with friends</p>
               </div>
            </div>
            <div class="archetype-card ${window.onboardingData.archetype === 'The Fitness Enthusiast' ? 'selected' : ''}" onclick="selectArchetype('The Fitness Enthusiast')">
               <div class="arc-icon"><i class="fa-solid fa-heart-pulse"></i></div>
               <div class="arc-info">
                 <h4>The Fitness Enthusiast</h4>
                 <p>Plays sports primarily for fitness</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  `;
};

window.toggleTrait = function(el, trait) {
   const idx = window.onboardingData.traits.indexOf(trait);
   if (idx === -1) {
      if (window.onboardingData.traits.length < 3) {
         window.onboardingData.traits.push(trait);
         el.classList.add('selected-trait');
      }
   } else {
      window.onboardingData.traits.splice(idx, 1);
      el.classList.remove('selected-trait');
   }
   
   // Enable/Disable continue button
   const btn = document.getElementById('traits-continue-btn');
   if (window.onboardingData.traits.length > 0) {
      btn.classList.remove('disabled');
   } else {
      btn.classList.add('disabled');
   }
};

window.renderOnboardingTraits = function() {
  const isSelected = (t) => window.onboardingData.traits.includes(t) ? 'selected-trait' : '';
  const canContinue = window.onboardingData.traits.length > 0 ? '' : 'disabled';

  appContainer.innerHTML = `
    <div class="onboarding-screen fade-in">
      <header class="ob-header">
        <button class="back-btn-small" onclick="navigateTo(screens.ONBOARDING_ARCHETYPE)"><i class="fa-solid fa-arrow-left"></i></button>
        <div class="ob-progress">
          <div class="progress-bar"><div class="progress-fill" style="width: 28%;"></div></div>
        </div>
      </header>
      <div class="ob-content">
         <h2 class="ob-step-title">How Do You Play?</h2>
         <p class="ob-instruction">Select up to 3 traits that describe you.</p>
         
         <div class="traits-container">
            <div class="trait-token ${isSelected('Competitive but friendly')}" onclick="toggleTrait(this, 'Competitive but friendly')">Competitive but friendly</div>
            <div class="trait-token ${isSelected('Strategic thinker')}" onclick="toggleTrait(this, 'Strategic thinker')">Strategic thinker</div>
            <div class="trait-token ${isSelected('Trash talker')}" onclick="toggleTrait(this, 'Trash talker')">Trash talker</div>
            <div class="trait-token ${isSelected('Chill player')}" onclick="toggleTrait(this, 'Chill player')">Chill player</div>
            <div class="trait-token ${isSelected('Team captain')}" onclick="toggleTrait(this, 'Team captain')">Team captain</div>
            <div class="trait-token ${isSelected('Friendly opponent')}" onclick="toggleTrait(this, 'Friendly opponent')">Friendly opponent</div>
         </div>

         <footer class="ob-footer">
            <button id="traits-continue-btn" class="ob-primary-btn ${canContinue}" onclick="if(!this.classList.contains('disabled')) navigateTo(screens.ONBOARDING_SPORTS)">Continue</button>
         </footer>
      </div>
    </div>
  `;
};

window.renderOnboardingSports = function() {
  window.toggleSport = function(el, sport) {
     const idx = window.onboardingData.sports.indexOf(sport);
     if (idx === -1) {
        window.onboardingData.sports.push(sport);
        el.classList.add('selected-sport');
     } else {
        window.onboardingData.sports.splice(idx, 1);
        el.classList.remove('selected-sport');
     }
     const btn = document.getElementById('sports-continue-btn');
     if (window.onboardingData.sports.length > 0) {
        btn.classList.remove('disabled');
     } else {
        btn.classList.add('disabled');
     }
  };

  const isSel = (s) => window.onboardingData.sports.includes(s) ? 'selected-sport' : '';
  const canCont = window.onboardingData.sports.length > 0 ? '' : 'disabled';

  appContainer.innerHTML = `
    <div class="onboarding-screen fade-in">
      <header class="ob-header">
        <button class="back-btn-small" onclick="navigateTo(screens.ONBOARDING_TRAITS)"><i class="fa-solid fa-arrow-left"></i></button>
        <div class="ob-progress">
          <div class="progress-bar"><div class="progress-fill" style="width: 42%;"></div></div>
        </div>
      </header>
      <div class="ob-content">
         <h2 class="ob-step-title">What Sports Do You Play?</h2>
         
         <div class="ob-sports-grid">
            <div class="ob-sport-card ${isSel('Badminton')}" onclick="toggleSport(this, 'Badminton')"><div class="s-icon">🏸</div><span>Badminton</span></div>
            <div class="ob-sport-card ${isSel('Pickleball')}" onclick="toggleSport(this, 'Pickleball')"><div class="s-icon">🎾</div><span>Pickleball</span></div>
            <div class="ob-sport-card ${isSel('Padel')}" onclick="toggleSport(this, 'Padel')"><div class="s-icon">🎾</div><span>Padel</span></div>
            <div class="ob-sport-card ${isSel('Football')}" onclick="toggleSport(this, 'Football')"><div class="s-icon">⚽</div><span>Football</span></div>
            <div class="ob-sport-card ${isSel('Cricket')}" onclick="toggleSport(this, 'Cricket')"><div class="s-icon">🏏</div><span>Cricket</span></div>
            <div class="ob-sport-card ${isSel('Tennis')}" onclick="toggleSport(this, 'Tennis')"><div class="s-icon">🎾</div><span>Tennis</span></div>
         </div>

         <footer class="ob-footer">
            <button id="sports-continue-btn" class="ob-primary-btn ${canCont}" onclick="if(!this.classList.contains('disabled')) navigateTo(screens.ONBOARDING_VIBES)">Continue</button>
         </footer>
      </div>
    </div>
  `;
};

window.renderOnboardingVibes = function() {
  window.selectVibe = function(vibe) {
     window.onboardingData.vibes = vibe;
     navigateTo(screens.ONBOARDING_INTERESTS);
  };

  appContainer.innerHTML = `
    <div class="onboarding-screen fade-in">
      <header class="ob-header">
        <button class="back-btn-small" onclick="navigateTo(screens.ONBOARDING_SPORTS)"><i class="fa-solid fa-arrow-left"></i></button>
        <div class="ob-progress">
          <div class="progress-bar"><div class="progress-fill" style="width: 56%;"></div></div>
        </div>
      </header>
      <div class="ob-content">
         <h2 class="ob-step-title">Who Do You Like Playing With?</h2>
         
         <div class="vibes-grid">
            <div class="vibe-card ${window.onboardingData.vibes === 'Competitive players' ? 'selected' : ''}" onclick="selectVibe('Competitive players')">
               <h3>Competitive players</h3>
               <i class="fa-solid fa-fire vibe-icon"></i>
            </div>
            <div class="vibe-card ${window.onboardingData.vibes === 'Chill players' ? 'selected' : ''}" onclick="selectVibe('Chill players')">
               <h3>Chill players</h3>
               <i class="fa-regular fa-snowflake vibe-icon"></i>
            </div>
            <div class="vibe-card ${window.onboardingData.vibes === 'Social groups' ? 'selected' : ''}" onclick="selectVibe('Social groups')">
               <h3>Social groups</h3>
               <i class="fa-solid fa-people-group vibe-icon"></i>
            </div>
            <div class="vibe-card ${window.onboardingData.vibes === 'Serious athletes' ? 'selected' : ''}" onclick="selectVibe('Serious athletes')">
               <h3>Serious athletes</h3>
               <i class="fa-solid fa-medal vibe-icon"></i>
            </div>
         </div>
      </div>
    </div>
  `;
};

window.renderOnboardingInterests = function() {
  window.toggleInterest = function(el, int) {
     const idx = window.onboardingData.interests.indexOf(int);
     if (idx === -1) {
        window.onboardingData.interests.push(int);
        el.classList.add('selected-interest');
     } else {
        window.onboardingData.interests.splice(idx, 1);
        el.classList.remove('selected-interest');
     }
     const btn = document.getElementById('interests-continue-btn');
     if (window.onboardingData.interests.length > 0) {
        btn.classList.remove('disabled');
     } else {
        btn.classList.add('disabled');
     }
  };

  const isSel = (i) => window.onboardingData.interests.includes(i) ? 'selected-interest' : '';
  const canCont = window.onboardingData.interests.length > 0 ? '' : 'disabled';

  appContainer.innerHTML = `
    <div class="onboarding-screen fade-in">
      <header class="ob-header">
        <button class="back-btn-small" onclick="navigateTo(screens.ONBOARDING_VIBES)"><i class="fa-solid fa-arrow-left"></i></button>
        <div class="ob-progress">
          <div class="progress-bar"><div class="progress-fill" style="width: 70%;"></div></div>
        </div>
      </header>
      <div class="ob-content">
         <h2 class="ob-step-title">What Else Do You Love?</h2>
         
         <div class="ob-interests-grid">
            <div class="interest-card ${isSel('Movies')}" onclick="toggleInterest(this, 'Movies')"><i class="fa-solid fa-film"></i><span>Movies</span></div>
            <div class="interest-card ${isSel('Dining')}" onclick="toggleInterest(this, 'Dining')"><i class="fa-solid fa-utensils"></i><span>Dining</span></div>
            <div class="interest-card ${isSel('Nightlife')}" onclick="toggleInterest(this, 'Nightlife')"><i class="fa-solid fa-martini-glass-citrus"></i><span>Nightlife</span></div>
            <div class="interest-card ${isSel('Fitness')}" onclick="toggleInterest(this, 'Fitness')"><i class="fa-solid fa-dumbbell"></i><span>Fitness</span></div>
            <div class="interest-card ${isSel('Music')}" onclick="toggleInterest(this, 'Music')"><i class="fa-solid fa-music"></i><span>Music</span></div>
            <div class="interest-card ${isSel('Gaming')}" onclick="toggleInterest(this, 'Gaming')"><i class="fa-solid fa-gamepad"></i><span>Gaming</span></div>
         </div>

         <footer class="ob-footer">
            <button id="interests-continue-btn" class="ob-primary-btn ${canCont}" onclick="if(!this.classList.contains('disabled')) navigateTo(screens.ONBOARDING_AVATAR)">Continue</button>
         </footer>
      </div>
    </div>
  `;
};

window.renderOnboardingAvatar = function() {
  window.selectAvatar = function(avatarClass, el) {
     window.onboardingData.avatar = avatarClass;
     const btn = document.getElementById('avatar-continue-btn');
     if(btn) {
        btn.classList.remove('disabled');
     }
     
     document.querySelectorAll('.avatar-option').forEach(e => e.classList.remove('selected'));
     if(el) el.classList.add('selected');
  };

  appContainer.innerHTML = `
    <div class="onboarding-screen fade-in">
      <header class="ob-header">
        <button class="back-btn-small" onclick="navigateTo(screens.ONBOARDING_INTERESTS)"><i class="fa-solid fa-arrow-left"></i></button>
        <div class="ob-progress">
          <div class="progress-bar"><div class="progress-fill" style="width: 85%;"></div></div>
        </div>
      </header>
      <div class="ob-content">
         <h2 class="ob-step-title">Create Your Player Look</h2>
         
         <div class="avatar-creation-area">
            <div class="avatar-option" onclick="selectAvatar('fa-user-ninja', this)">
               <i class="fa-solid fa-user-ninja"></i>
            </div>
            <div class="avatar-option" onclick="selectAvatar('fa-user-astronaut', this)">
               <i class="fa-solid fa-user-astronaut"></i>
            </div>
            <div class="avatar-option" onclick="selectAvatar('fa-user-secret', this)">
               <i class="fa-solid fa-user-secret"></i>
            </div>
            <div class="avatar-option" onclick="selectAvatar('fa-user-tie', this)">
               <i class="fa-solid fa-user-tie"></i>
            </div>
         </div>
         
         <div class="upload-photo-option">
            <i class="fa-solid fa-camera"></i>
            <span>Or Upload Photo</span>
         </div>

         <footer class="ob-footer">
            <button id="avatar-continue-btn" class="ob-primary-btn disabled" onclick="if(!this.classList.contains('disabled')) navigateTo(screens.ONBOARDING_REVEAL)">Reveal My Card</button>
         </footer>
      </div>
    </div>
  `;
};

window.renderOnboardingReveal = function() {
  const d = window.onboardingData;
  appContainer.innerHTML = `
    <div class="onboarding-screen fade-in" style="background: var(--bg-color); justify-content: center; display: flex; flex-direction: column; align-items: center;">
      
      <div class="ultimate-card revealed" id="reveal-card">
         <div class="uc-hologram"></div>
         <div class="uc-header">
            <div class="uc-rating">99</div>
            <div class="uc-position">PRO</div>
         </div>
         <div class="uc-avatar">
            <i class="fa-solid ${d.avatar || 'fa-user'}"></i>
         </div>
         <div class="uc-name">ASHISH</div>
         <div class="uc-archetype">${d.archetype || 'PLAYER'}</div>
         
         <div class="uc-stats-divider"></div>
         
         <div class="uc-traits">
            ${d.traits.length ? d.traits.map(t => `<span>${t}</span>`).join('') : '<span>Balanced</span>'}
         </div>
         
         <div class="uc-sports">
            ${d.sports.length ? d.sports.map(s => `<span>${s}</span>`).join(' • ') : '<span>All Sports</span>'}
         </div>
      </div>

      <button class="ob-primary-btn save-card-btn fade-in-up" style="margin-top: 40px; width: 80%; animation-delay: 1.5s;" onclick="
         window.hasCompletedOnboarding = true; 
         saveOnboardingState();
         navigateTo(screens.PROFILE);
      ">Save My Card</button>

    </div>
  `;
  
  setTimeout(() => {
     const card = document.getElementById('reveal-card');
     if(card) card.classList.add('done');
  }, 800);
};

window.renderProfileHub = function() {
  const d = window.onboardingData;
  const topSport = d.sports && d.sports.length ? d.sports[0] : 'Pickleball';
  
  appContainer.innerHTML = `
    <div class="profile-screen fade-in" style="background: #000; min-height: 100vh; color: #fff; padding-bottom: 40px; font-family: 'Outfit', sans-serif;">
      <header class="flex items-center" style="padding: 24px 20px 10px;">
        <button class="bg-zinc-800 rounded-full border-none text-white cursor-pointer flex items-center justify-center" style="width: 36px; height: 36px; margin-right: 16px;" onclick="navigateTo(screens.PROFILE)">
          <i class="fa-solid fa-arrow-left" style="font-size: 1.1rem;"></i>
        </button>
        <h1 class="text-2xl font-bold tracking-tight m-0" style="font-size: 1.8rem;">Identity Hub</h1>
      </header>
      
      <main class="px-6">
        <!-- Profile Hero Section -->
        <section class="flex flex-row items-center gap-6 mt-4 mb-10">
          <!-- Golden Personality Card -->
          <div class="metallic-gold w-32 h-44 rounded-2xl flex flex-col items-center justify-between p-3 relative overflow-hidden">
            <div class="flex flex-col items-center mt-2">
              <span class="text-[10px] font-black text-black opacity-60 absolute top-2 left-2">99 PRO</span>
              <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mt-4 border-2 border-white/30">
                <i class="fa-solid ${d.avatar || 'fa-user-secret'} text-gold-light text-2xl"></i>
              </div>
            </div>
            <div class="text-center">
              <p class="text-black font-black text-xs tracking-widest uppercase m-0">${(d.playerName || 'ASHISH').toUpperCase()}</p>
            </div>
          </div>
          
          <!-- Name and Level -->
          <div>
            <h2 class="text-5xl font-black mb-1 m-0">${d.playerName || 'Ashish'}</h2>
            <div class="flex items-center gap-2">
              <span class="text-purple-accent font-bold text-lg">Level 12</span>
              <span class="text-zinc-500">•</span>
              <span class="text-purple-accent/80 font-medium">${d.archetype || 'The Social Player'}</span>
            </div>
          </div>
        </section>

        <!-- Player Stats Section -->
        <section class="mb-10">
          <h3 class="section-divider-purple text-xl font-black uppercase tracking-wider mb-6 m-0" style="font-style: italic; font-size: 1.2rem;">Player Stats</h3>
          <div class="grid grid-cols-3 gap-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            <div class="hub-stat-item">
               <div class="hub-stat-value">
                 <i class="fa-regular fa-clock text-blue-400"></i>
                 <span>24</span>
               </div>
               <p class="hub-stat-label">Sessions</p>
            </div>
            <div class="hub-stat-item" style="min-width: 0;">
               <div class="hub-stat-value">
                 <i class="fa-solid fa-trophy text-yellow-500" style="font-size: 1.1rem;"></i>
                 <span style="font-size: 0.9rem; white-space: nowrap;">${topSport}</span>
               </div>
               <p class="hub-stat-label">Top Sport</p>
            </div>
            <div class="hub-stat-item">
               <div class="hub-stat-value">
                 <span class="text-orange-500">3</span>
                 <span>🔥</span>
               </div>
               <p class="hub-stat-label">Win Streak</p>
            </div>
          </div>
        </section>

        <!-- Achievements Section -->
        <section class="mb-10">
          <h3 class="section-divider-purple text-xl font-black uppercase tracking-wider mb-6 m-0" style="font-style: italic; font-size: 1.2rem;">Achievements</h3>
          <div class="flex gap-8 overflow-x-auto pb-2 no-scrollbar" style="display: flex; gap: 32px; overflow-x: auto;">
             <div class="flex flex-col items-center gap-2" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                 <div class="achievement-icon-card" style="border-color: rgba(212, 175, 55, 0.5);">🏅</div>
                 <span class="text-[11px] font-bold text-zinc-400">Founder</span>
             </div>
             <div class="flex flex-col items-center gap-2" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                 <div class="achievement-icon-card" style="border-color: rgba(239, 68, 68, 0.5);">🔥</div>
                 <span class="text-[11px] font-bold text-zinc-400">Hot Streak</span>
             </div>
             <div class="flex flex-col items-center gap-2" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                 <div class="achievement-icon-card" style="border-color: rgba(59, 130, 246, 0.5);">⭐</div>
                 <span class="text-[11px] font-bold text-zinc-400">MVP</span>
             </div>
          </div>
        </section>

        <!-- Rivalries Section -->
        <section class="mb-6">
          <h3 class="section-divider-purple text-xl font-black uppercase tracking-wider mb-6 m-0" style="font-style: italic; font-size: 1.2rem;">Rivalries</h3>
          <div class="bg-card-bg p-4 rounded-2xl border border-zinc-800 flex items-center justify-between" style="display: flex; align-items: center; justify-content: space-between; background: #121212; border: 1px solid #333; padding: 16px; border-radius: 16px;">
            <div class="flex items-center gap-4" style="display: flex; align-items: center; gap: 16px;">
              <div class="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center" style="width: 48px; height: 48px; background: #27272a; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <i class="fa-solid fa-user-ninja text-zinc-400"></i>
              </div>
              <div>
                <h4 class="font-bold text-lg leading-tight m-0">Rahul M.</h4>
                <p class="text-xs text-zinc-500 m-0">Played 5 times • Tied 2-2</p>
              </div>
            </div>
            <button class="bg-white text-black font-black px-5 py-2 rounded-full text-sm hover:bg-zinc-200 transition-colors border-none cursor-pointer">
              Challenge
            </button>
          </div>
        </section>
      </main>
    </div>
  `;
};

// Initial Navigation
navigateTo(screens.HOME);
