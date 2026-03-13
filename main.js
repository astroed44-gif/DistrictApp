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
  PROFILE_HUB: 'profile_hub',
  SWIPE_RIVALS: 'swipe_rivals',
  RIVAL_PROFILE: 'rival_profile',
  CHALLENGE_CREATE: 'challenge_create',
  CHALLENGE_NOTIFICATION: 'challenge_notification',
  CHALLENGE_VENUE: 'challenge_venue',
  CHALLENGE_CONFIRM: 'challenge_confirm',
  EXCLUSIVE_HUB: 'exclusive_hub',
  EVENT_DETAIL: 'event_detail',
  JOIN_EVENT: 'join_event',
  GROUP_BOOKING: 'group_booking',
  EVENT_CONFIRMATION: 'event_confirmation'
};

let currentScreen = screens.HOME;
window.hasCompletedOnboarding = false;

window.onboardingData = {
  archetype: '',
  traits: [],
  sports: [],
  vibes: '',
  interests: [],
  avatar: ''
};

window.saveOnboardingState = function() {
  // Persistence removed per request to restart from scratch
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
      <div class="promo-banner-home" onclick="navigateTo(screens.EXCLUSIVE_HUB)">
        <div class="promo-text">
            <span class="unlock-text">DISTRICT NEON NIGHTS</span>
            <span class="fifty-off" style="font-size: 2.2rem;">SPORTS AFTER DARK</span>
        </div>
        <div class="bank-offer" style="background: rgba(188, 19, 254, 0.2); color: #fff;">
          ✨ Exclusive Neon Events Now Live ✨
        </div>
        <button class="explore-btn" style="background: #bc13fe; color: #fff;">Explore Neon Games <i class="fa-solid fa-chevron-right"></i></button>
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
      
      ${window.hasCompletedOnboarding ? `
      <section class="rival-section" style="margin-top: 16px;">
        <div class="section-header" style="justify-content: space-between; align-items: flex-end; display: flex; padding-right: 16px;">
            <div>
              <h3 class="section-title" style="margin:0; text-align: left; background: none; -webkit-text-fill-color: #fff; text-fill-color: #fff; font-size: 1.2rem; font-weight: 800;">Find Your Next Rival</h3>
              <p style="margin: 4px 0 0 0; color: #888; font-size: 0.85rem; text-transform: none; letter-spacing: normal;">Swipe players near you</p>
            </div>
            <button style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; cursor: pointer;" onclick="navigateTo(screens.SWIPE_RIVALS)">
               Start Swiping
            </button>
        </div>
        <div class="rival-cards-scroll" style="display: flex; gap: 16px; overflow-x: auto; padding: 16px 0 16px 20px; scroll-snap-type: x mandatory;">
            <div class="mini-rival-card" onclick="navigateTo(screens.RIVAL_PROFILE, 'rohan')" style="min-width: 240px; background: #121212; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 16px; scroll-snap-align: start; cursor: pointer; display: flex; flex-direction: column; gap: 12px; position: relative; overflow: hidden;">
                <div style="display: flex; gap: 12px; align-items: center;">
                    <span style="font-size: 2.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.5);">🥷</span>
                    <div>
                        <h4 style="margin: 0; font-weight: 800; font-size: 1.1rem; color: #fff;">Rohan</h4>
                        <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: #bc13fe; font-weight: bold;">The Competitor</p>
                    </div>
                </div>
                <div style="font-size: 0.8rem; color: #aaa;">
                    <span style="color: #fff; font-weight: bold;">Traits:</span> Strategic • Friendly Rival
                </div>
                <div style="font-size: 0.8rem; color: #aaa;">
                    <span style="color: #fff; font-weight: bold;">Sports:</span> Padel • Badminton
                </div>
                <div style="font-size: 0.8rem; color: #bc13fe; font-weight: 600;">
                    <i class="fa-solid fa-location-dot"></i> 1.2 km away
                </div>
            </div>
            
            <div class="mini-rival-card" onclick="navigateTo(screens.RIVAL_PROFILE, 'kavita')" style="min-width: 240px; background: #121212; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 16px; scroll-snap-align: start; cursor: pointer; display: flex; flex-direction: column; gap: 12px; position: relative; overflow: hidden;">
                <div style="display: flex; gap: 12px; align-items: center;">
                    <span style="font-size: 2.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.5);">🧑‍🚀</span>
                    <div>
                        <h4 style="margin: 0; font-weight: 800; font-size: 1.1rem; color: #fff;">Kavita</h4>
                        <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: #48dbfb; font-weight: bold;">The Weekend Warrior</p>
                    </div>
                </div>
                <div style="font-size: 0.8rem; color: #aaa;">
                    <span style="color: #fff; font-weight: bold;">Traits:</span> Relentless • Energetic
                </div>
                <div style="font-size: 0.8rem; color: #aaa;">
                    <span style="color: #fff; font-weight: bold;">Sports:</span> Pickleball
                </div>
                <div style="font-size: 0.8rem; color: #48dbfb; font-weight: 600;">
                    <i class="fa-solid fa-location-dot"></i> 2.5 km away
                </div>
            </div>
        </div>
      </section>
      ` : ''}

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

      <section class="exclusive-games-section" style="margin-top: 24px;">
        <div class="section-header" style="justify-content: space-between; align-items: flex-end; display: flex; padding-right: 16px;">
            <div>
              <h3 class="section-title" style="margin:0; text-align: left; background: none; -webkit-text-fill-color: #fff; text-fill-color: #fff; font-size: 1.2rem; font-weight: 800;">Exclusive Games</h3>
              <p style="margin: 4px 0 0 0; color: #888; font-size: 0.85rem;">Play sports like you've never seen before</p>
            </div>
            <button style="background: rgba(188, 19, 254, 0.1); border: 1px solid rgba(188, 19, 254, 0.3); color: #bc13fe; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; cursor: pointer;" onclick="navigateTo(screens.EXCLUSIVE_HUB)">
               View All
            </button>
        </div>
        <div class="exclusive-scroll" style="display: flex; gap: 16px; overflow-x: auto; padding: 16px 20px; scroll-snap-type: x mandatory;">
          ${exclusiveGames.map(game => `
            <div class="exclusive-card glass" onclick="navigateTo(screens.EVENT_DETAIL, '${game.id}')" style="min-width: 280px; height: 380px; border-radius: 24px; position: relative; overflow: hidden; scroll-snap-align: center; border: 1px solid rgba(255,255,255,0.1); background: #080808;">
               <div style="width: 100%; height: 100%; position: absolute; top:0; left:0; background: linear-gradient(to top, #080808 30%, transparent 100%); z-index: 1;"></div>
               <img src="${game.image}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top:0; left:0; opacity: 0.6;">
               
               <div style="position: absolute; top: 16px; right: 16px; background: ${game.color}; color: #000; padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 900; z-index: 2; text-transform: uppercase;">✨ EXCLUSIVE</div>
               
               <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 24px; z-index: 2;">
                  <h4 style="font-size: 1.4rem; font-weight: 900; color: #fff; margin-bottom: 8px; line-height: 1.2;">${game.title}</h4>
                  <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 20px; color: #ccc; font-size: 0.85rem;">
                     <span><i class="fa-regular fa-calendar" style="width: 20px; color: ${game.color};"></i> ${game.time}</span>
                     <span><i class="fa-solid fa-location-dot" style="width: 20px; color: ${game.color};"></i> ${game.venue}</span>
                     <span><i class="fa-solid fa-users" style="width: 20px; color: ${game.color};"></i> ${game.players} joining</span>
                  </div>
                  <button class="join-game-btn" style="width: 100%; background: #fff; color: #000; border: none; padding: 14px; border-radius: 12px; font-weight: 800; font-size: 1rem;">Join Game</button>
               </div>
            </div>
          `).join('')}
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
      <style>
      @keyframes cardFloat {
        0%, 100% { transform: translateY(0) rotate(0); }
        50% { transform: translateY(-3px) rotate(1deg); }
      }
      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 5px rgba(188, 19, 254, 0.4), inset 0 0 5px rgba(188, 19, 254, 0.2); border-color: rgba(188, 19, 254, 0.6); }
        50% { box-shadow: 0 0 15px rgba(188, 19, 254, 0.8), inset 0 0 10px rgba(188, 19, 254, 0.4); border-color: rgba(188, 19, 254, 1); }
      }
      @keyframes textShimmer {
        0% { background-position: -100px; }
        100% { background-position: 100px; }
      }
      @keyframes particleFloat {
        0% { transform: translateY(0) scale(1); opacity: 0; }
        50% { opacity: 0.8; }
        100% { transform: translateY(-40px) scale(0.5); opacity: 0; }
      }
      @keyframes cardShine {
        0% { transform: translateX(-150%) skewX(-20deg); }
        20%, 100% { transform: translateX(150%) skewX(-20deg); }
      }
      .mini-card-container {
        position: relative; width: 60px; height: 80px; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: cardFloat 4s infinite ease-in-out;
        border-radius: 10px; overflow: hidden;
      }
      .mini-card-container:active { transform: scale(1.1); }
      .mini-card-shine {
        position: absolute; top: 0; left: 0; width: 40%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
        animation: cardShine 4s 1s infinite ease-in-out; pointer-events: none; z-index: 5;
      }
      .particle {
        position: absolute; width: 2px; height: 2px; background: #bc13fe; border-radius: 50%; pointer-events: none;
        animation: particleFloat 3s infinite linear;
      }
      .level-badge-glow {
        background: linear-gradient(90deg, #fff 0%, #bc13fe 50%, #fff 100%);
        background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        animation: textShimmer 2s infinite linear;
      }

      .mini-archetype-icon {
        animation: bounceIcon 2s infinite ease-in-out;
        font-size: 8px; color: #bc13fe; margin-left: 4px;
      }
      @keyframes bounceIcon {
        0%, 100% { transform: translateY(0); opacity: 0.7; }
        50% { transform: translateY(-2px); opacity: 1; }
      }
      </style>
      <div class="onboarding-nudge glass fade-in" id="identity-hub-card" onclick="this.style.transform='scale(0.98)'; setTimeout(()=>navigateTo(screens.PROFILE_HUB), 100)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px; margin: 16px; margin-bottom: 24px; border: 1px solid rgba(188, 19, 254, 0.2); background: linear-gradient(135deg, rgba(30, 30, 40, 0.9), rgba(15, 15, 20, 0.99)) !important; transition: all 0.3s ease; position: relative; z-index: 10;">
        <div style="display: flex; align-items: center; gap: 20px;">
            <div class="mini-card-container">
                ${[...Array(5)].map((_, i) => `<div class="particle" style="left: ${Math.random()*100}%; bottom: 0; animation-delay: ${Math.random()*3}s;"></div>`).join('')}
                <div class="mini-card-shine"></div>
                <div class="mini-card-banner" style="width: 100%; height: 100%; background: #0a0a0a; border-radius: 10px; border: 2px solid #bc13fe; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; animation: glowPulse 3s infinite ease-in-out; z-index: 1;">
                     <div style="position: absolute; top: 6px; left: 6px; font-weight: 900; font-size: 0.6rem; color: #bc13fe; opacity: 0.8;">99</div>
                     <span style="font-size: 2.2rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.8)); transition: transform 0.3s ease;">${window.onboardingData.avatar || '🥷'}</span>
                     <div style="margin-top: 4px; font-weight: 900; font-size: 0.45rem; color: #fff; text-transform: uppercase; letter-spacing: 1px; opacity: 0.7;">${window.onboardingData.archetype ? window.onboardingData.archetype.split(' ')[0] : 'PRO'}</div>
                </div>
            </div>
            <div>
               <div style="font-size: 0.65rem; color: #888; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2px; font-weight: 800;">Your District Card</div>
               <h3 style="margin-bottom: 2px; font-weight: 900; font-size: 1.35rem; color: #fff; letter-spacing: -0.5px;">Identity Hub</h3>
               <div style="display: flex; align-items: center;">
                 <p style="font-size: 0.85rem; color: #fff; font-weight: 700; margin: 0;">
                   <span class="level-badge-glow">Level 12</span> 
                   <span style="color: #444; margin: 0 6px;">•</span> 
                   <span style="color: #bc13fe;">${window.onboardingData.archetype || 'The Social Player'}</span>
                 </p>
                 <i class="fa-solid fa-bolt mini-archetype-icon"></i>
               </div>
            </div>
        </div>
        <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center;">
          <i class="fa-solid fa-chevron-right" style="color: #fff; font-size: 1rem; opacity: 0.5;"></i>
        </div>
      </div>
      `;
  } else {
      nudgeHTML = `
      <style>
      @keyframes cardShuffleY {
         0% { opacity: 0; transform: translateY(100%) scale(0.8); filter: blur(4px); }
         4% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); box-shadow: 0 0 10px rgba(188,19,254,0.4); }
         13% { opacity: 1; transform: translateY(-5%) scale(1); filter: blur(0px); box-shadow: 0 0 15px rgba(0,255,255,0.3); }
         17% { opacity: 0; transform: translateY(-100%) scale(0.8); filter: blur(4px); }
         17.1%, 100% { opacity: 0; transform: translateY(100%); }
      }
      .shuffled-card-item {
         position: absolute; top: 0; left: 0; right: 0; bottom: 0;
         border-radius: 8px; background: linear-gradient(135deg, #180924 0%, #0d0414 100%);
         border: 2px solid #bc13fe; display: flex; flex-direction: column;
         align-items: center; justify-content: center; opacity: 0;
         animation: cardShuffleY 9s infinite cubic-bezier(0.25, 1, 0.5, 1);
         overflow: hidden; box-shadow: 0 0 15px rgba(188,19,254,0.3);
      }
      .shuffled-card-item::after {
         content: ''; position: absolute; top: -50%; left: -50%; right: -50%; bottom: -50%;
         background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%);
         transform: translateX(-100%); animation: particleShimmer 9s infinite;
      }
      @keyframes particleShimmer { 0%, 5% { transform: translateX(-100%); } 12%, 100% { transform: translateX(100%); } }
      .c-comp { animation-delay: 0s; } .c-comp::after { animation-delay: 0s; }
      .c-chill { animation-delay: 1.5s; } .c-chill::after { animation-delay: 1.5s; }
      .c-strat { animation-delay: 3s; } .c-strat::after { animation-delay: 3s; }
      .c-talk { animation-delay: 4.5s; } .c-talk::after { animation-delay: 4.5s; }
      .c-capt { animation-delay: 6s; } .c-capt::after { animation-delay: 6s; }
      .c-warrior { animation-delay: 7.5s; } .c-warrior::after { animation-delay: 7.5s; }
      .shuffled-emoji { font-size: 1.6rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); margin-bottom: 4px; }
      .shuffled-label { font-size: 0.5rem; font-weight: 900; text-transform: uppercase; text-align: center; color: #fff; line-height: 1.1; }
      </style>
      <div class="onboarding-nudge glass fade-in" id="profile-nudge" style="align-items: center; padding: 24px; margin: 16px; margin-bottom: 24px;">
        <button class="nudge-close" onclick="document.getElementById('profile-nudge').style.display='none';"><i class="fa-solid fa-xmark"></i></button>
        <div class="nudge-visual" style="width: 70px; height: 95px; margin-right: 20px;">
           <div style="position: relative; width: 100%; height: 100%;">
              <div class="shuffled-card-item c-comp"><span class="shuffled-emoji">⚡</span><span class="shuffled-label">Competitive</span></div>
              <div class="shuffled-card-item c-chill"><span class="shuffled-emoji">😎</span><span class="shuffled-label">Chill</span></div>
              <div class="shuffled-card-item c-strat"><span class="shuffled-emoji">🧠</span><span class="shuffled-label">Strategic</span></div>
              <div class="shuffled-card-item c-talk"><span class="shuffled-emoji">🎤</span><span class="shuffled-label">Trash Talker</span></div>
              <div class="shuffled-card-item c-capt"><span class="shuffled-emoji">🏆</span><span class="shuffled-label">Captain</span></div>
              <div class="shuffled-card-item c-warrior"><span class="shuffled-emoji">🏸</span><span class="shuffled-label">Warrior</span></div>
           </div>
        </div>
        <div class="nudge-content">
           <h3 style="font-size: 1.25rem; font-weight: 900; margin-bottom: 4px; letter-spacing: -0.5px;">Create Your Player</h3>
           <p style="font-size: 0.85rem; color: #ccc; margin-bottom: 12px; line-height: 1.3;">Your District Card shows who you are on the court.</p>
           <button class="nudge-start-btn" style="background: #bc13fe; border: none; border-radius: 30px; padding: 8px 24px; font-weight: 900; font-size: 1rem; color: #fff; cursor: pointer;" onclick="navigateTo(screens.ONBOARDING_INTRO)">Start</button>
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


function renderExclusiveGamesHub() {
  appContainer.innerHTML = `
    <div class="exclusive-hub-page fade-in" style="background: #000; min-height: 100vh; padding-bottom: 100px;">
      <header style="padding: 20px; display: flex; align-items: center; gap: 16px;">
        <button class="back-btn-small" onclick="navigateTo(screens.PLAY)"><i class="fa-solid fa-arrow-left"></i></button>
        <h2 style="font-size: 1.2rem; font-weight: 800;">Exclusive Games</h2>
      </header>
      
      <div class="hub-hero-banner" style="position: relative; height: 260px; margin-bottom: 24px; overflow: hidden;">
         <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1000&auto=format&fit=crop" style="width: 100%; height: 100%; object-fit: cover;">
         <div style="position: absolute; inset: 0; background: linear-gradient(to top, #000 10%, transparent 60%);"></div>
         <div style="position: absolute; bottom: 24px; left: 24px;">
            <div style="background: #bc13fe; color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 900; display: inline-block; margin-bottom: 8px;">DISTRICT NEON NIGHTS</div>
            <h1 style="font-size: 2rem; font-weight: 900; margin: 0;">Sports After Dark</h1>
         </div>
      </div>
      
      <div style="padding: 0 20px; display: flex; flex-direction: column; gap: 20px;">
         ${exclusiveGames.map(game => `
            <div class="event-stack-card glass" onclick="navigateTo(screens.EVENT_DETAIL, '${game.id}')" style="display: flex; background: #111; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05);">
               <div style="width: 120px; flex-shrink: 0; position: relative;">
                  <img src="${game.image}" style="width: 100%; height: 100%; object-fit: cover;">
                  <div style="position: absolute; inset: 0; background: linear-gradient(to right, transparent, #111);"></div>
               </div>
               <div style="padding: 20px; flex: 1;">
                  <h4 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 12px;">${game.title}</h4>
                  <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.8rem; color: #888; margin-bottom: 16px;">
                     <span><i class="fa-regular fa-calendar-days" style="width: 18px; color: ${game.color};"></i> ${game.time}</span>
                     <span><i class="fa-solid fa-location-dot" style="width: 18px; color: ${game.color};"></i> ${game.venue}</span>
                     <span><i class="fa-solid fa-users" style="width: 18px; color: ${game.color};"></i> ${game.players} players joined</span>
                  </div>
                  <button style="background: ${game.color}; color: #000; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 800; font-size: 0.8rem;">View Event</button>
               </div>
            </div>
         `).join('')}
      </div>
    </div>
  `;
}

function renderEventDetail(id) {
  const game = exclusiveGames.find(g => g.id === id) || exclusiveGames[0];
  appContainer.innerHTML = `
    <div class="event-detail-page fade-in" style="background: #000; min-height: 100vh; padding-bottom: 120px;">
       <div style="position: relative; height: 350px;">
          <img src="${game.image}" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, #000, transparent 60%);"></div>
          <button class="back-btn-small" onclick="navigateTo(screens.EXCLUSIVE_HUB)" style="position: absolute; top: 20px; left: 20px; background: rgba(0,0,0,0.5); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff;"><i class="fa-solid fa-arrow-left"></i></button>
       </div>
       
       <div style="padding: 24px; margin-top: -40px; position: relative; z-index: 2;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
             <h1 style="font-size: 2.2rem; font-weight: 900; letter-spacing: -1px; margin: 0;">${game.title}</h1>
          </div>
          <div style="color: #bc13fe; font-weight: 800; font-size: 0.95rem; margin-bottom: 24px; text-transform: uppercase;">✨ District Exclusive Experience</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px;">
             <div style="background: #111; padding: 16px; border-radius: 16px;">
                <span style="color: #666; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">Venue</span>
                <p style="margin: 4px 0 0 0; font-weight: 700;">${game.venue}</p>
             </div>
             <div style="background: #111; padding: 16px; border-radius: 16px;">
                <span style="color: #666; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">Time</span>
                <p style="margin: 4px 0 0 0; font-weight: 700; color: #bc13fe;">${game.time}</p>
             </div>
          </div>
          
          <div style="margin-bottom: 32px;">
             <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h3 style="font-size: 1rem; font-weight: 800;">Players Joined</h3>
                <span style="color: #bc13fe; font-weight: bold;">${game.players}/${game.maxPlayers}</span>
             </div>
             <div style="width: 100%; height: 8px; background: #222; border-radius: 10px; overflow: hidden; margin-bottom: 20px;">
                <div style="width: ${(game.players/game.maxPlayers)*100}%; height: 100%; background: linear-gradient(90deg, #bc13fe, #4cc9f0); border-radius: 10px;"></div>
             </div>
             
             <div style="background: #111; padding: 20px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);">
                <h4 style="margin: 0 0 12px 0; font-size: 0.9rem; color: #ccc;">Match Format</h4>
                <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 8px;">2v2 King of the Court</div>
                <p style="color: #888; font-size: 0.85rem; margin: 0;">5 minute matches • Winner stays on. Fast-paced action under neon lights.</p>
             </div>
          </div>
          
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 16px;">What's Included</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
             <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 600; color: #ccc;">
                <span style="width: 32px; height:32px; background: rgba(188,19,254,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #bc13fe;"><i class="fa-solid fa-moon"></i></span> Glow Shuttlecocks
             </div>
             <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 600; color: #ccc;">
                <span style="width: 32px; height:32px; background: rgba(188,19,254,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #bc13fe;"><i class="fa-solid fa-music"></i></span> Live DJ Set
             </div>
             <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 600; color: #ccc;">
                <span style="width: 32px; height:32px; background: rgba(188,19,254,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #bc13fe;"><i class="fa-solid fa-video"></i></span> Highlight Reel
             </div>
             <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 600; color: #ccc;">
                <span style="width: 32px; height:32px; background: rgba(188,19,254,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #bc13fe;"><i class="fa-solid fa-martini-glass"></i></span> Post-game Drinks
             </div>
          </div>
       </div>
       
       <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #000; border-top: 1px solid #222; padding: 20px; display: flex; align-items: center; justify-content: space-between; gap: 20px; z-index: 100;">
          <div style="display: flex; flex-direction: column;">
             <span style="font-size: 0.75rem; color: #888; font-weight: 800;">PER PERSON</span>
             <span style="font-size: 1.25rem; font-weight: 900;">₹650</span>
          </div>
          <div style="display: flex; gap: 12px; flex: 1;">
             <button onclick="navigateTo(screens.GROUP_BOOKING, '${id}')" style="flex: 1; padding: 14px; border-radius: 12px; background: rgba(255,255,255,0.1); color: #fff; border: 1px solid #333; font-weight: 800; font-size: 0.9rem;">With Squad</button>
             <button onclick="navigateTo(screens.JOIN_EVENT, '${id}')" style="flex: 1.5; padding: 14px; border-radius: 12px; background: #bc13fe; color: #fff; border: none; font-weight: 900; font-size: 1rem; box-shadow: 0 0 20px rgba(188,19,254,0.4);">Join Game</button>
          </div>
       </div>
    </div>
  `;
}

function renderJoinEvent(id) {
  const game = exclusiveGames.find(g => g.id === id) || exclusiveGames[0];
  appContainer.innerHTML = `
    <div class="join-event-page fade-in" style="background: #000; min-height: 100vh; padding: 20px;">
       <header style="display: flex; align-items: center; gap: 16px; margin-bottom: 32px;">
         <button class="back-btn-small" onclick="navigateTo(screens.EVENT_DETAIL, '${id}')"><i class="fa-solid fa-arrow-left"></i></button>
         <h2 style="font-size: 1.1rem; font-weight: 800;">Join ${game.title}</h2>
       </header>
       
       <div style="background: #111; border-radius: 20px; padding: 24px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 32px;">
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 20px;">Select number of spots</h3>
          <div style="display: flex; gap: 12px;">
             ${[1, 2, 4].map(n => `<div onclick="this.parentElement.querySelectorAll('div').forEach(d=>d.style.borderColor='transparent'); this.style.borderColor='#bc13fe'" style="flex: 1; padding: 16px; background: #000; border: 2px solid ${n==1 ? '#bc13fe' : 'transparent'}; border-radius: 16px; text-align: center; cursor: pointer;">
                <div style="font-size: 1.2rem; font-weight: 900;">${n}</div>
                <div style="font-size: 0.7rem; color: #888; font-weight: bold; text-transform: uppercase;">PLAYER${n>1?'S':''}</div>
             </div>`).join('')}
          </div>
       </div>
       
       <div style="background: #111; border-radius: 20px; padding: 24px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 32px;">
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 16px;">Invite Friends</h3>
          <div style="display: flex; gap: 12px;">
             <button style="flex: 1; background: rgba(255,255,255,0.05); border: 1px solid #333; color: #fff; padding: 12px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700;">
                <i class="fa-solid fa-share-nodes"></i> Share Link
             </button>
             <button style="flex: 1; background: rgba(255,255,255,0.05); border: 1px solid #333; color: #fff; padding: 12px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700;">
                <i class="fa-solid fa-user-plus"></i> Select Friends
             </button>
          </div>
       </div>
       
       <div style="background: #080808; border-radius: 20px; padding: 24px; border: 1px solid rgba(188,19,254,0.2);">
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 16px;">Price Summary</h3>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #888; font-weight: 600;">
             <span>Entry Fee (1 player)</span>
             <span>₹650</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #888; font-weight: 600;">
             <span>Platform Fee</span>
             <span>₹25</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid #222; font-weight: 900; font-size: 1.2rem;">
             <span>Total</span>
             <span>₹675</span>
          </div>
       </div>
       
       <button onclick="navigateTo(screens.EVENT_CONFIRMATION, '${id}')" style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: #bc13fe; border: none; padding: 18px; border-radius: 16px; font-weight: 900; font-size: 1.1rem; color: #fff; box-shadow: 0 0 30px rgba(188,19,254,0.5);">Confirm Spot</button>
    </div>
  `;
}

function renderGroupBooking(id) {
  const game = exclusiveGames.find(g => g.id === id) || exclusiveGames[0];
  appContainer.innerHTML = `
    <div class="group-booking-page fade-in" style="background: #000; min-height: 100vh; padding: 20px;">
       <header style="display: flex; align-items: center; gap: 16px; margin-bottom: 32px;">
         <button class="back-btn-small" onclick="navigateTo(screens.EVENT_DETAIL, '${id}')"><i class="fa-solid fa-arrow-left"></i></button>
         <h2 style="font-size: 1.1rem; font-weight: 800;">Book With Your Squad</h2>
       </header>
       
       <div style="background: #111; border-radius: 20px; padding: 24px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 32px;">
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 8px;">Add Team Name</h3>
          <p style="color: #666; font-size: 0.8rem; margin-bottom: 20px;">Your squad will see this on the scoreboard.</p>
          <input type="text" placeholder="e.g. Midnight Smashers" style="width: 100%; background: #000; border: 1px solid #333; padding: 16px; border-radius: 12px; color: #fff; font-weight: 800; font-size: 1rem; outline: none;">
       </div>

       <div style="background: #111; border-radius: 20px; padding: 24px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 32px;">
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 20px;">Reserve Spots</h3>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
             <span style="font-weight: 700; color: #ccc;">Players: 4 Spots</span>
             <div style="display: flex; gap: 12px; align-items: center;">
                <button style="width: 36px; height: 36px; border-radius: 12px; background: #222; border: 1px solid #333; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">-</button>
                <span style="font-size: 1.2rem; font-weight: 900; min-width: 24px; text-align: center;">4</span>
                <button style="width: 36px; height: 36px; border-radius: 12px; background: #222; border: 1px solid #333; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">+</button>
             </div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
             ${[1, 2, 3, 4].map(n => `<div style="aspect-ratio: 1; border-radius: 50%; border: 2px dashed ${n==1 ? '#bc13fe' : '#444'}; display: flex; align-items: center; justify-content: center; background: ${n==1 ? 'rgba(188,19,254,0.1)' : 'transparent'};">
                ${n==1 ? `<span style="font-size: 1.5rem;">${window.onboardingData.avatar || '🥷'}</span>` : `<i class="fa-solid fa-plus" style="color: #444;"></i>`}
             </div>`).join('')}
          </div>
       </div>
       
       <button onclick="navigateTo(screens.EVENT_CONFIRMATION, '${id}')" style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: #39FF14; border: none; padding: 18px; border-radius: 16px; font-weight: 900; font-size: 1.1rem; color: #000; box-shadow: 0 0 30px rgba(57,255,20,0.3);">Reserve Spots</button>
    </div>
  `;
}

function renderEventConfirmation(id) {
  const game = exclusiveGames.find(g => g.id === id) || exclusiveGames[0];
  appContainer.innerHTML = `
    <div class="event-confirm-page fade-in" style="background: #000; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px;">
       <div style="font-size: 5rem; margin-bottom: 24px; animation: scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);">✨</div>
       <h1 style="font-size: 3rem; font-weight: 900; margin: 0; background: linear-gradient(to bottom, #fff, #bc13fe); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">You're In!</h1>
       <p style="color: #888; font-size: 1.1rem; margin: 8px 0 40px 0;">Get ready for the neon showdown.</p>
       
       <div style="background: #111; border: 1px solid rgba(188,19,254,0.3); border-radius: 20px; padding: 30px; width: 100%; position: relative; overflow: hidden;">
          <h2 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 20px; color: #fff;">${game.title}</h2>
          <div style="text-align: left; display: flex; flex-direction: column; gap: 16px; font-weight: 700;">
             <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Venue</span>
                <span>${game.venue}</span>
             </div>
             <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Time</span>
                <span style="color: #bc13fe;">${game.time}</span>
             </div>
             <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Entry Code</span>
                <span style="font-family: monospace; font-size: 1.2rem; letter-spacing: 2px;">DX-552</span>
             </div>
          </div>
       </div>
       
       <div style="margin-top: 40px; display: flex; flex-direction: column; gap: 16px; width: 100%;">
          <button onclick="navigateTo(screens.HOME)" style="width: 100%; padding: 18px; border-radius: 16px; background: #fff; color: #000; border: none; font-size: 1rem; font-weight: 900;">Add to Calendar</button>
          <div style="display: flex; gap: 12px;">
             <button style="flex: 1; padding: 14px; border-radius: 12px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid #333; font-weight: 800; font-size: 0.9rem;">Invite Friends</button>
             <button onclick="navigateTo(screens.EVENT_DETAIL, '${id}')" style="flex: 1; padding: 14px; border-radius: 12px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid #333; font-weight: 800; font-size: 0.9rem;">View Event</button>
          </div>
       </div>
    </div>
  `;
}

function navigateTo(screen, id = null, fromPopState = false) {
  currentScreen = screen;

  
  // Update browser history for back button support (unless we came from a popstate)
  if (!fromPopState) {
    const historyState = { screen, id };
    history.pushState(historyState, "", `#${screen}${id ? '-' + id : ''}`);
  }

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
  } else if (screen === screens.SWIPE_RIVALS) {
    renderSwipeRivals();
  } else if (screen === screens.RIVAL_PROFILE) {
    renderRivalProfile(id);
  } else if (screen === screens.CHALLENGE_CREATE) {
    renderChallengeCreate(id);
  } else if (screen === screens.CHALLENGE_NOTIFICATION) {
    renderChallengeNotification(id);
  } else if (screen === screens.CHALLENGE_VENUE) {
    renderChallengeVenue(id);
  } else if (screen === screens.CHALLENGE_CONFIRM) {
    renderChallengeConfirm(id);
  } else if (screen === screens.EXCLUSIVE_HUB) {
    renderExclusiveGamesHub();
  } else if (screen === screens.EVENT_DETAIL) {
    renderEventDetail(id);
  } else if (screen === screens.JOIN_EVENT) {
    renderJoinEvent(id);
  } else if (screen === screens.GROUP_BOOKING) {
    renderGroupBooking(id);
  } else if (screen === screens.EVENT_CONFIRMATION) {
    renderEventConfirmation(id);
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

      <footer class="bundle-detail-footer detail-footer" style="display: flex; gap: 12px; padding: 16px; background: #000; border-top: 1px solid #222;">
          <button id="customize-btn" style="flex: 1; padding: 14px 0; background: transparent; color: #fff; border: 1px solid #555; border-radius: 12px; font-weight: 800; font-size: 0.95rem; text-align: center; cursor: pointer;">Customize</button>
          <button id="book-bundle-btn" style="flex: 1; padding: 14px 0; background: #fff; color: #000; border: none; border-radius: 12px; font-weight: 900; font-size: 0.95rem; text-align: center; cursor: pointer;">Book Evening</button>
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
               <span style="font-size: 2.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.5);">🔥</span>
            </div>
            <div class="vibe-card ${window.onboardingData.vibes === 'Chill players' ? 'selected' : ''}" onclick="selectVibe('Chill players')">
               <h3>Chill players</h3>
               <span style="font-size: 2.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.5);">❄️</span>
            </div>
            <div class="vibe-card ${window.onboardingData.vibes === 'Social groups' ? 'selected' : ''}" onclick="selectVibe('Social groups')">
               <h3>Social groups</h3>
               <span style="font-size: 2.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.5);">👥</span>
            </div>
            <div class="vibe-card ${window.onboardingData.vibes === 'Serious athletes' ? 'selected' : ''}" onclick="selectVibe('Serious athletes')">
               <h3>Serious athletes</h3>
               <span style="font-size: 2.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.5);">🏅</span>
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
            <div class="avatar-option ${window.onboardingData.avatar === '🥷' ? 'selected' : ''}" onclick="selectAvatar('🥷', this)">
               <span style="font-size: 3.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.5);">🥷</span>
            </div>
            <div class="avatar-option ${window.onboardingData.avatar === '🧑‍🚀' ? 'selected' : ''}" onclick="selectAvatar('🧑‍🚀', this)">
               <span style="font-size: 3.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.5);">🧑‍🚀</span>
            </div>
            <div class="avatar-option ${window.onboardingData.avatar === '🕵️' ? 'selected' : ''}" onclick="selectAvatar('🕵️', this)">
               <span style="font-size: 3.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.5);">🕵️</span>
            </div>
            <div class="avatar-option ${window.onboardingData.avatar === '🤵' ? 'selected' : ''}" onclick="selectAvatar('🤵', this)">
               <span style="font-size: 3.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.5);">🤵</span>
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
         <div class="uc-avatar" style="font-size: 4.5rem; margin-top: 16px;">
            <span style="filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));">${d.avatar || '🥷'}</span>
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
      <header class="flex items-center" style="padding: 24px 24px 16px;">
        <button style="background: transparent; border: none; padding: 0; margin-right: 16px; cursor: pointer; color: #fff; display: flex; align-items: center;" onclick="navigateTo(screens.PROFILE)">
          <i class="fa-solid fa-arrow-left" style="font-size: 1.4rem;"></i>
        </button>
        <h1 class="font-black tracking-tight m-0" style="font-size: 1.6rem;">Identity Hub</h1>
      </header>
      
      <main class="px-6">
        <!-- Profile Hero Section -->
        <section class="flex flex-row items-center gap-6 mt-2 mb-10">
          <!-- Golden Personality Card -->
          <div class="metallic-gold w-32 h-44 rounded-2xl flex flex-col items-center justify-between p-3 relative overflow-hidden" style="box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);">
            <span class="font-black text-white opacity-90 absolute top-3 left-3" style="font-size: 0.65rem;">99 PRO</span>
            <div class="flex-1 flex items-center justify-center w-full mt-4">
               <span style="font-size: 3.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.3); line-height: 1;">${d.avatar || '🥷'}</span>
            </div>
            <p class="text-white font-black tracking-widest uppercase m-0" style="font-size: 0.75rem; text-shadow: 0px 2px 4px rgba(0,0,0,0.5);">${(d.playerName || 'ASHISH').toUpperCase()}</p>
          </div>
          
          <!-- Name and Level -->
          <div>
            <h2 class="font-black mb-1 m-0" style="font-size: 2.4rem; letter-spacing: -0.5px;">${d.playerName || 'Ashish'}</h2>
            <div class="flex items-center gap-2" style="font-size: 0.95rem; margin-top: 4px;">
              <span class="font-bold" style="color: #bc13fe;">Level 12</span>
              <span class="text-zinc-500">•</span>
              <span class="font-medium text-white">${d.archetype || 'The Competitor'}</span>
            </div>
          </div>
        </section>

        <!-- Find Rivals Action -->
        <button onclick="navigateTo(screens.SWIPE_RIVALS)" style="width: 100%; background: #fff; color: #000; padding: 16px; border-radius: 16px; font-weight: 900; font-size: 1.1rem; border: none; cursor: pointer; margin-bottom: 32px; display: flex; align-items: center; justify-content: center; gap: 12px;">
            <i class="fa-solid fa-fire"></i> Find Rivals
        </button>

        <!-- Player Stats Section -->
        <section class="mb-10">
          <h3 class="section-divider-purple text-xl font-black uppercase tracking-wider mb-6" style="font-style: italic; font-size: 1.2rem; margin: 0 0 20px 0;">Player Stats</h3>
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
          <h3 class="section-divider-purple text-xl font-black uppercase tracking-wider mb-6" style="font-style: italic; font-size: 1.2rem; margin: 0 0 20px 0;">Achievements</h3>
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
          <h3 class="section-divider-purple text-xl font-black uppercase tracking-wider mb-6" style="font-style: italic; font-size: 1.2rem; margin: 0 0 20px 0;">Rivalries</h3>
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
            <button onclick="navigateTo(screens.CHALLENGE_CREATE, 'rahul')" style="background: #fff; color: #000; font-weight: 900; padding: 8px 20px; border-radius: 30px; font-size: 0.85rem; border: none; cursor: pointer;">
              Challenge
            </button>
          </div>
        </section>
      </main>
    </div>
  `;
};

// RIVAL DISCOVERY FLOW
window.swipeRivalList = [
  { id: 'rohan', name: 'Rohan', title: 'The Competitor', emoji: '🥷', traits: 'Strategic • Friendly Rival', sports: 'Padel • Badminton', dist: '1.2 km away', sessions: 45, level: 15 },
  { id: 'priya', name: 'Priya', title: 'The Casual Pro', emoji: '👩', traits: 'Chill • Good Vibes Only', sports: 'Badminton', dist: '3.4 km away', sessions: 12, level: 7 },
  { id: 'dev', name: 'Dev', title: 'The Tactician', emoji: '👨‍🎤', traits: 'Competitive • Fast Paced', sports: 'Pickleball', dist: '5.1 km away', sessions: 80, level: 22 },
  { id: 'meera', name: 'Meera', title: 'The Marathon', emoji: '👱‍♀️', traits: 'Relentless • Friendly', sports: 'Tennis • Padel', dist: '2.0 km away', sessions: 33, level: 11 },
  { id: 'kabir', name: 'Kabir', title: 'The Powerhouse', emoji: '🏋️', traits: 'Aggressive • Quick Match', sports: 'Football', dist: '7.8 km away', sessions: 50, level: 18 },
  { id: 'rahul', name: 'Rahul M.', title: 'The Nemesis', emoji: '🥷', traits: 'Aggressive • Friendly', sports: 'Padel', dist: '0.5 km away', sessions: 25, level: 12 }
];
window.currentSwipeIndex = 0;
window.nextSwipeRival = function() {
  window.currentSwipeIndex = (window.currentSwipeIndex + 1) % window.swipeRivalList.length;
  renderSwipeRivals();
};

window.renderSwipeRivals = function() {
  const rival = window.swipeRivalList[window.currentSwipeIndex];
  appContainer.innerHTML = `
    <div class="profile-screen fade-in" style="background: #000; min-height: 100vh; display: flex; flex-direction: column;">
      <header class="flex items-center" style="padding: 24px 20px 10px; display: flex; align-items: center;">
        <button style="background: transparent; border: none; padding: 0; margin-right: 16px; cursor: pointer; color: #fff; display: flex; align-items: center;" onclick="navigateTo(screens.PLAY)">
          <i class="fa-solid fa-arrow-left" style="font-size: 1.4rem;"></i>
        </button>
        <h1 class="text-2xl font-bold tracking-tight m-0" style="font-size: 1.5rem; text-align: center; flex: 1; margin-right: 48px;">Find Your Next Rival</h1>
      </header>
      
      <main style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; position: relative; overflow: hidden;">
        
        <div class="swipe-card" id="swipe-card" style="width: 100%; max-width: 340px; background: #121212; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.8); overflow: hidden; position: relative;">
          
          <div style="background: linear-gradient(160deg, #1a1525 0%, #0d0a14 100%); padding: 30px 20px; display: flex; flex-direction: column; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer;" onclick="navigateTo(screens.RIVAL_PROFILE, '${rival.id}')">
             <span style="font-size: 5rem; line-height: 1; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8)); margin-bottom: 20px;">${rival.emoji}</span>
             <h2 style="font-size: 2.2rem; font-weight: 900; margin: 0; color: #fff;">${rival.name}</h2>
             <span style="color: #bc13fe; font-weight: bold; font-size: 1rem; margin-top: 4px;">${rival.title}</span>
          </div>
          
          <div style="padding: 24px;">
             <div style="margin-bottom: 16px;">
                <p style="margin: 0 0 6px 0; color: #888; font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">Traits</p>
                <div style="color: #fff; font-size: 0.95rem; font-weight: 500;">${rival.traits}</div>
             </div>
             <div style="margin-bottom: 16px;">
                <p style="margin: 0 0 6px 0; color: #888; font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">Sports</p>
                <div style="color: #fff; font-size: 0.95rem; font-weight: 500;">${rival.sports}</div>
             </div>
             
             <div style="display: flex; justify-content: space-between; margin-top: 24px; border-top: 1px solid #222; padding-top: 16px;">
                <div style="display: flex; align-items: center; gap: 8px; color: #aaa; font-size: 0.9rem;">
                   <i class="fa-solid fa-location-dot" style="color: #bc13fe;"></i> ${rival.dist}
                </div>
                <div style="display: flex; align-items: center; gap: 8px; color: #aaa; font-size: 0.9rem;">
                   <i class="fa-regular fa-clock" style="color: #48dbfb;"></i> ${rival.sessions} Sessions
                </div>
             </div>
          </div>
        </div>
        
        <div style="display: flex; gap: 30px; margin-top: 40px;">
           <button style="width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); color: #aaa; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" onmousedown="this.style.transform='scale(0.9)';" onmouseup="this.style.transform='scale(1)';" onclick="window.nextSwipeRival()">
              <i class="fa-solid fa-xmark"></i>
           </button>
           <button style="width: 64px; height: 64px; border-radius: 50%; background: #fff; border: none; color: #000; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" onmousedown="this.style.transform='scale(0.9)';" onmouseup="this.style.transform='scale(1)';" onclick="navigateTo(screens.CHALLENGE_CREATE, '${rival.id}')">
              <i class="fa-solid fa-bolt"></i>
           </button>
        </div>
      </main>
    </div>
  `;
};

window.renderRivalProfile = function(id) {
  const rival = window.swipeRivalList.find(r => r.id === id) || window.swipeRivalList[0];
  appContainer.innerHTML = `
    <div class="profile-screen fade-in" style="background: #000; min-height: 100vh; color: #fff; padding-bottom: 40px;">
      <header class="flex items-center" style="padding: 24px 20px 10px; display: flex; align-items: center;">
        <button style="background: transparent; border: none; padding: 0; margin-right: 16px; cursor: pointer; color: #fff; display: flex; align-items: center;" onclick="navigateTo(screens.SWIPE_RIVALS)">
          <i class="fa-solid fa-arrow-left" style="font-size: 1.4rem;"></i>
        </button>
      </header>
      
      <main class="px-6" style="padding: 0 24px;">
        <section class="flex flex-row items-center gap-6 mt-4 mb-10" style="display: flex; gap: 24px; align-items: center; margin-bottom: 40px; margin-top: 10px;">
          <div class="metallic-gold" style="width: 128px; height: 176px; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 12px; position: relative; background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 50%, #FBF5B7 55%, #AA771C 100%);">
            <span style="font-weight: 900; color: #000; opacity: 0.6; position: absolute; top: 8px; left: 8px; font-size: 0.65rem;">99 PRO</span>
            <div style="flex: 1; display: flex; align-items: center; justify-content: center; width: 100%; margin-top: 16px;">
               <span style="font-size: 3.5rem; text-shadow: 0px 4px 10px rgba(0,0,0,0.3); line-height: 1;">${rival.emoji}</span>
            </div>
            <p style="color: #000; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; font-size: 0.75rem;">${rival.name}</p>
          </div>
          
          <div>
            <h2 style="font-size: 2.5rem; font-weight: 900; margin: 0 0 4px 0; letter-spacing: -0.5px;">${rival.name}</h2>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: #bc13fe; font-weight: bold;">Level ${rival.level}</span>
              <span style="color: #666;">•</span>
              <span style="color: #fff; font-weight: 500;">${rival.title}</span>
            </div>
            <div style="margin-top: 12px; font-size: 0.85rem; color: #aaa;">
               ${rival.traits}
            </div>
          </div>
        </section>

        <section style="margin-bottom: 40px;">
          <h3 class="section-divider-purple" style="font-style: italic; font-size: 1.2rem; margin: 0 0 20px 0; font-weight: 900; text-transform: uppercase; border-left: 3px solid #bc13fe; padding-left: 10px;">Player Stats</h3>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            <div style="background: #111; border: 1px solid #333; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
               <div style="font-weight: 900; font-size: 1.3rem; display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                 <i class="fa-regular fa-clock" style="color: #48dbfb;"></i>
                 <span>${rival.sessions}</span>
               </div>
               <p style="font-size: 0.7rem; color: #888; text-transform: uppercase; font-weight: 800; margin: 0;">Sessions</p>
            </div>
            <div style="background: #111; border: 1px solid #333; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
               <div style="font-weight: 900; font-size: 1.1rem; display: flex; align-items: center; gap: 6px; margin-bottom: 4px; text-align: center; line-height: 1.2;">
                 <i class="fa-solid fa-trophy" style="color: #feca57;"></i>
                 <span>${rival.sports.split(' ')[0]}</span>
               </div>
               <p style="font-size: 0.7rem; color: #888; text-transform: uppercase; font-weight: 800; margin: 0;">Top Sport</p>
            </div>
            <div style="background: #111; border: 1px solid #333; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
               <div style="font-weight: 900; font-size: 1.3rem; display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                 <span style="color: #ff6b6b;">6</span>
                 <span>🔥</span>
               </div>
               <p style="font-size: 0.7rem; color: #888; text-transform: uppercase; font-weight: 800; margin: 0;">Win Streak</p>
            </div>
          </div>
        </section>

        <section style="margin-bottom: 40px;">
          <h3 class="section-divider-purple" style="font-style: italic; font-size: 1.2rem; margin: 0 0 20px 0; font-weight: 900; text-transform: uppercase; border-left: 3px solid #bc13fe; padding-left: 10px;">Achievements</h3>
          <div style="display: flex; gap: 32px; overflow-x: auto; padding-bottom: 8px;">
             <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                 <div style="width: 56px; height: 56px; border-radius: 50%; background: #111; border: 2px solid rgba(239, 68, 68, 0.5); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🔥</div>
                 <span style="font-size: 11px; font-weight: bold; color: #aaa;">Hot Streak</span>
             </div>
             <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                 <div style="width: 56px; height: 56px; border-radius: 50%; background: #111; border: 2px solid rgba(59, 130, 246, 0.5); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">⭐</div>
                 <span style="font-size: 11px; font-weight: bold; color: #aaa;">MVP</span>
             </div>
          </div>
        </section>

        <button onclick="navigateTo(screens.CHALLENGE_CREATE, '${rival.id}')" style="width: 100%; padding: 18px; border-radius: 16px; background: #fff; color: #000; border: none; font-size: 1.1rem; font-weight: 900; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px; box-shadow: 0 4px 14px rgba(255,255,255,0.2);">
           <i class="fa-solid fa-bolt"></i> Challenge Player
        </button>

      </main>
    </div>
  `;
};

window.challengeState = window.challengeState || { sport: 'Padel', time: 'Sat, 7:00 PM', venue: 'Elite Arena' };

window.updateChallengeSport = function(s) { window.challengeState.sport = s; renderChallengeCreate(); };
window.updateChallengeTime = function(t) { window.challengeState.time = t; renderChallengeCreate(); };
window.updateChallengeVenue = function(v) { window.challengeState.venue = v; renderChallengeCreate(); };

window.renderChallengeCreate = function(id) {
  const s = window.challengeState;
  const rival = window.swipeRivalList.find(r => r.id === id) || window.swipeRivalList[0];
  
  appContainer.innerHTML = `
    <div class="profile-screen fade-in" style="background: #000; min-height: 100vh; color: #fff; padding-bottom: 40px;">
      <header class="flex items-center" style="padding: 24px 20px 10px; display: flex; align-items: center;">
        <button style="background: transparent; border: none; padding: 0; margin-right: 16px; cursor: pointer; color: #fff; display: flex; align-items: center;" onclick="navigateTo(screens.SWIPE_RIVALS)">
          <i class="fa-solid fa-arrow-left" style="font-size: 1.4rem;"></i>
        </button>
        <h1 class="font-black tracking-tight m-0" style="font-size: 1.5rem; text-align: center; flex: 1; margin-right: 48px;">Challenge ${rival.name}</h1>
      </header>
      
      <main class="px-6" style="padding: 0 24px; margin-top: 20px;">
        
        <div style="margin-bottom: 32px;">
           <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 16px;">Choose Sport</h3>
           <div style="background: #111; border: 1px solid #333; border-radius: 16px; overflow: hidden;">
              ${['Padel', 'Badminton', 'Football'].map((sport, idx) => `
              <div onclick="updateChallengeSport('${sport}')" style="padding: 16px; border-bottom: ${idx < 2 ? '1px solid #222' : 'none'}; display: flex; justify-content: space-between; align-items: center; cursor: pointer; ${s.sport === sport ? 'background: rgba(255,255,255,0.05); color: #fff;' : 'color: #aaa;'}">
                 <span style="font-weight: 700;">${sport}</span>
                 ${s.sport === sport ? '<i class="fa-solid fa-circle-check" style="color: #fff; font-size: 1.2rem;"></i>' : '<i class="fa-regular fa-circle" style="font-size: 1.2rem;"></i>'}
              </div>
              `).join('')}
           </div>
        </div>

        <div style="margin-bottom: 32px;">
           <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 16px;">Suggested Time</h3>
           <div style="display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px;">
              ${['Sat, 7:00 PM', 'Sun, 8:00 AM', 'Custom Time'].map(time => `
              <div onclick="updateChallengeTime('${time}')" style="padding: 12px 20px; border-radius: 12px; white-space: nowrap; cursor: pointer; font-weight: 800; transition: 0.2s; ${s.time === time ? 'background: #fff; color: #000; border: 1px solid #fff;' : 'background: #111; border: 1px solid #333; color: #fff;'}">
                 ${time}
              </div>
              `).join('')}
           </div>
        </div>

        <div style="margin-bottom: 40px;">
           <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 16px;">Suggested Venue</h3>
           ${[{name: 'Elite Arena', dist: '1.2 km away'}, {name: 'City Sports Club', dist: '2.5 km away'}].map(venue => `
           <div onclick="updateChallengeVenue('${venue.name}')" style="background: #111; border: 1px solid #333; border-radius: 16px; padding: 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; cursor: pointer;">
              <div>
                 <h4 style="margin: 0 0 4px 0; font-weight: 800; ${s.venue === venue.name ? 'color: #fff;' : 'color: #aaa;'}">${venue.name}</h4>
                 <p style="margin: 0; color: #aaa; font-size: 0.85rem;"><i class="fa-solid fa-location-dot"></i> ${venue.dist}</p>
              </div>
              ${s.venue === venue.name ? '<i class="fa-solid fa-circle-check" style="color: #fff; font-size: 1.2rem;"></i>' : '<i class="fa-regular fa-circle" style="font-size: 1.2rem; color: #555;"></i>'}
           </div>
           `).join('')}
        </div>

        <button onclick="navigateTo(screens.CHALLENGE_NOTIFICATION)" style="width: 100%; padding: 18px; border-radius: 16px; background: #fff; color: #000; border: none; font-size: 1.1rem; font-weight: 900; cursor: pointer; display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 14px rgba(255,255,255,0.2);">
           Send Challenge
        </button>
      </main>
    </div>
  `;
};

window.renderChallengeNotification = function(id) {
  // Mocking the receiving side for demonstration
  appContainer.innerHTML = `
    <div class="profile-screen fade-in" style="background: #000; min-height: 100vh; color: #fff; padding: 40px 24px; display: flex; flex-direction: column; justify-content: center;">
      
      <div style="text-align: center; margin-bottom: 32px;">
         <div style="width: 80px; height: 80px; background: #bc13fe; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 0 30px rgba(188, 19, 254, 0.5);">
            <i class="fa-solid fa-bolt" style="font-size: 2.5rem; color: #fff;"></i>
         </div>
         <h1 style="font-weight: 900; font-size: 2rem; margin: 0 0 8px 0;">You've Been Challenged!</h1>
         <p style="color: #aaa; font-size: 1.1rem; margin: 0;">Ashish challenged you to a match.</p>
      </div>
      
      <div style="background: #121212; border: 1px solid #333; border-radius: 20px; padding: 24px; margin-bottom: 40px;">
         <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 24px; border-bottom: 1px solid #222; padding-bottom: 20px;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background: #222; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 2rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">${window.onboardingData.avatar || '🥷'}</span>
            </div>
            <div>
               <h3 style="margin: 0 0 4px 0; font-weight: 800; font-size: 1.2rem;">Ashish</h3>
               <p style="margin: 0; color: #bc13fe; font-size: 0.85rem; font-weight: bold;">Level 12 • The Competitor</p>
            </div>
         </div>
         
         <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; justify-content: space-between;">
               <span style="color: #888;">Sport</span>
               <span style="font-weight: bold;">Padel</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
               <span style="color: #888;">Time</span>
               <span style="font-weight: bold;">Sat, 7:00 PM</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
               <span style="color: #888;">Venue</span>
               <span style="font-weight: bold;">Elite Arena</span>
            </div>
         </div>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 16px;">
         <button onclick="navigateTo(screens.CHALLENGE_VENUE)" style="width: 100%; padding: 18px; border-radius: 16px; background: #fff; color: #000; border: none; font-size: 1.1rem; font-weight: 900; cursor: pointer;">
            Accept
         </button>
         <div style="display: flex; gap: 16px;">
            <button onclick="navigateTo(screens.PLAY)" style="flex: 1; padding: 16px; border-radius: 16px; background: transparent; color: #fff; border: 1px solid #444; font-size: 1rem; font-weight: bold; cursor: pointer;">
               Decline
            </button>
            <button onclick="navigateTo(screens.CHALLENGE_CREATE)" style="flex: 1; padding: 16px; border-radius: 16px; background: #222; color: #fff; border: none; font-size: 1rem; font-weight: bold; cursor: pointer;">
               Counter
            </button>
         </div>
      </div>
    </div>
  `;
};

window.renderChallengeVenue = function() {
  appContainer.innerHTML = `
    <div class="profile-screen fade-in" style="background: #000; min-height: 100vh; color: #fff; padding-bottom: 40px;">
      <header class="flex items-center" style="padding: 24px 20px 10px; display: flex; align-items: center; justify-content: space-between;">
        <button style="background: transparent; border: none; padding: 0; margin-right: 16px; cursor: pointer; color: #fff; display: flex; align-items: center;" onclick="navigateTo(screens.CHALLENGE_NOTIFICATION)">
          <i class="fa-solid fa-arrow-left" style="font-size: 1.4rem;"></i>
        </button>
        <h1 class="font-black tracking-tight m-0" style="font-size: 1.3rem;">Choose a Venue</h1>
        <div style="width: 36px;"></div>
      </header>
      
      <main class="px-6" style="padding: 0 20px; margin-top: 16px;">
        <div style="background: #121212; border-radius: 20px; overflow: hidden; border: 1px solid #333; margin-bottom: 24px;">
           <div style="height: 140px; background-image: url('/images/elite_arena.png'); background-size: cover; background-position: center;"></div>
           <div style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                 <h3 style="margin: 0; font-size: 1.3rem; font-weight: 800;">Elite Arena</h3>
                 <span style="background: #bc13fe; color: #fff; padding: 4px 8px; border-radius: 8px; font-size: 0.8rem; font-weight: bold;">4.8 <i class="fa-solid fa-star" style="font-size: 0.7rem;"></i></span>
              </div>
              <p style="margin: 0 0 16px 0; color: #aaa; font-size: 0.9rem;">1.2 km away</p>
              <div style="display: flex; gap: 12px; margin-bottom: 20px;">
                 <div style="background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: bold;"><i class="fa-solid fa-check" style="color: #1dd1a1; margin-right: 4px;"></i> 2 Courts Available</div>
              </div>
              <button onclick="navigateTo(screens.CHALLENGE_CONFIRM)" style="width: 100%; padding: 14px; border-radius: 12px; background: #fff; color: #000; border: none; font-weight: 900; font-size: 1rem; cursor: pointer;">
                 Book Court ₹800
              </button>
           </div>
        </div>
        
        <div style="background: #121212; border-radius: 20px; overflow: hidden; border: 1px solid #333;">
           <div style="height: 140px; background-image: url('/images/city_sports_club.png'); background-size: cover; background-position: center;"></div>
           <div style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                 <h3 style="margin: 0; font-size: 1.3rem; font-weight: 800;">City Sports Club</h3>
                 <span style="background: #333; color: #fff; padding: 4px 8px; border-radius: 8px; font-size: 0.8rem; font-weight: bold;">4.2 <i class="fa-solid fa-star" style="font-size: 0.7rem;"></i></span>
              </div>
              <p style="margin: 0 0 16px 0; color: #aaa; font-size: 0.9rem;">2.5 km away</p>
              <div style="display: flex; gap: 12px; margin-bottom: 20px;">
                 <div style="background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: bold;"><i class="fa-solid fa-clock" style="color: #feca57; margin-right: 4px;"></i> Slots filling fast</div>
              </div>
              <button onclick="navigateTo(screens.CHALLENGE_CONFIRM)" style="width: 100%; padding: 14px; border-radius: 12px; background: rgba(255,255,255,0.1); color: #fff; border: none; font-weight: 900; font-size: 1rem; cursor: pointer;">
                 View Availability
              </button>
           </div>
        </div>
      </main>
    </div>
  `;
};

window.renderChallengeConfirm = function() {
  appContainer.innerHTML = `
    <div class="profile-screen fade-in" style="background: #000; min-height: 100vh; color: #fff; padding: 60px 24px 40px; display: flex; flex-direction: column; align-items: center; text-align: center;">
      
      <div style="width: 100px; height: 100px; background: rgba(29, 209, 161, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 2px solid #1dd1a1; box-shadow: 0 0 40px rgba(29, 209, 161, 0.4);">
         <i class="fa-solid fa-check" style="font-size: 3rem; color: #1dd1a1;"></i>
      </div>
      
      <h1 style="font-weight: 900; font-size: 2.5rem; margin: 0 0 12px 0;">Match Confirmed!</h1>
      <p style="color: #aaa; font-size: 1.1rem; margin: 0 0 40px 0;">Get ready to dominate the court.</p>
      
      <div style="background: #111; border: 1px solid #333; border-radius: 20px; padding: 30px; width: 100%; max-width: 400px; position: relative;">
         
         <!-- Versus Header -->
         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
               <span style="font-size: 2.5rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">${window.onboardingData.avatar || '🥷'}</span>
               <span style="font-weight: 800; font-size: 1rem;">Ashish</span>
            </div>
            
            <div style="font-weight: 900; font-size: 1.5rem; color: #bc13fe; font-style: italic;">VS</div>
            
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
               <span style="font-size: 2.5rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">🥷</span>
               <span style="font-weight: 800; font-size: 1rem;">Rohan</span>
            </div>
         </div>
         
         <div style="text-align: left; padding-top: 20px; border-top: 1px solid #222;">
            <div style="margin-bottom: 16px;">
               <span style="color: #888; font-size: 0.8rem; text-transform: uppercase; font-weight: bold;">Sport</span>
               <div style="font-size: 1.1rem; font-weight: 800;">Padel</div>
            </div>
            <div style="margin-bottom: 16px;">
               <span style="color: #888; font-size: 0.8rem; text-transform: uppercase; font-weight: bold;">Venue</span>
               <div style="font-size: 1.1rem; font-weight: 800;">Elite Arena</div>
            </div>
            <div>
               <span style="color: #888; font-size: 0.8rem; text-transform: uppercase; font-weight: bold;">Time</span>
               <div style="font-size: 1.1rem; font-weight: 800; color: #bc13fe;">Sat, 7:00 PM</div>
            </div>
         </div>
      </div>
      
      <div style="margin-top: 40px; display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 400px;">
         <button onclick="navigateTo(screens.HOME)" style="width: 100%; padding: 18px; border-radius: 16px; background: #fff; color: #000; border: none; font-size: 1.1rem; font-weight: 900; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px;">
            <i class="fa-regular fa-calendar-plus"></i> Add to Calendar
         </button>
         <button onclick="navigateTo(screens.PROFILE_HUB)" style="width: 100%; padding: 18px; border-radius: 16px; background: rgba(255,255,255,0.1); color: #fff; border: none; font-size: 1.1rem; font-weight: bold; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Share Match
         </button>
      </div>
    </div>
  `;
};

// Initial Navigation
navigateTo(screens.HOME);

// Handle Back Button & Swipe Gestures (Mobile Browser Navigation)
window.addEventListener('popstate', (event) => {
  if (event.state) {
    const { screen, id } = event.state;
    navigateTo(screen, id, true);
  } else {
    // Fallback for initial page load state
    navigateTo(screens.HOME, null, true);
  }
});

// Setup initial history state so first back press works
(function() {
  const initialState = { screen: screens.HOME, id: null };
  history.replaceState(initialState, "", "#home");
})();
