// ─────────────────────────────────────────────────────────
// Chatbot Knowledge Base
// Each entry: { keywords[], answer, link?, linkText? }
// ─────────────────────────────────────────────────────────

const DATA_INDEX = [

  // ── Destinations ─────────────────────────────────────────
  {
    keywords: ['sharm', 'sharm el sheikh', 'شرم', 'شرم الشيخ', 'sinai', 'سيناء', 'ssh'],
    answer: '🏖 Sharm El Sheikh is a world-class diving destination at the tip of the Sinai Peninsula. Starting from $299/person. Best time: October – April.',
    link: '/destination/1',
    linkText: 'Explore Sharm El Sheikh →',
  },
  {
    keywords: ['hurghada', 'الغردقة', 'hrg', 'red sea', 'البحر الاحمر'],
    answer: '🌊 Hurghada is a vibrant Red Sea resort city with warm clear waters and year-round sunshine. Starting from $249/person.',
    link: '/destination/2',
    linkText: 'Explore Hurghada →',
  },
  {
    keywords: ['alexandria', 'اسكندرية', 'alex', 'hbe', 'mediterranean', 'متوسط'],
    answer: "🏛 Alexandria is Egypt's pearl on the Mediterranean — ancient ruins, colonial architecture and fresh seafood. Starting from $199/person.",
    link: '/destination/3',
    linkText: 'Explore Alexandria →',
  },
  {
    keywords: ['dahab', 'دهب', 'blue hole', 'الثقب الازرق'],
    answer: '🤿 Dahab is a relaxed coastal town famous for the legendary Blue Hole diving site and Bedouin camps. Starting from $219/person.',
    link: '/destination/4',
    linkText: 'Explore Dahab →',
  },
  {
    keywords: ['maldives', 'مالديف', 'mle', 'overwater', 'manta'],
    answer: '🌴 The Maldives offer overwater bungalows, pristine white sand, and world-class diving in the Indian Ocean. Starting from $1299/person.',
    link: '/destination/5',
    linkText: 'Explore Maldives →',
  },
  {
    keywords: ['bali', 'indonesia', 'بالي', 'اندونيسيا', 'ubud', 'seminyak'],
    answer: '🌿 Bali — the Island of the Gods — blends surf beaches, rice paddies and ancient Hindu temples. Starting from $699/person.',
    link: '/destination/6',
    linkText: 'Explore Bali →',
  },
  {
    keywords: ['santorini', 'greece', 'سانتوريني', 'يونان', 'oia', 'aegean'],
    answer: '🌅 Santorini is a romantic Greek island with iconic white-washed cliffs, legendary sunsets and volcanic beaches. Starting from $899/person.',
    link: '/destination/7',
    linkText: 'Explore Santorini →',
  },
  {
    keywords: ['phuket', 'thailand', 'فوكيت', 'تايلاند', 'phi phi', 'patong'],
    answer: '🐘 Phuket offers azure waters, jungle-clad hills, vibrant street food and ancient Buddhist temples. Starting from $599/person.',
    link: '/destination/8',
    linkText: 'Explore Phuket →',
  },
  {
    keywords: ['ain sokhna', 'عين سخنة', 'sokhna', 'سخنة'],
    answer: "🏊 Ain Sokhna is Cairo's closest Red Sea escape — calm waters and private beach resorts just 120km from the capital. Starting from $149/person.",
    link: '/destination/9',
    linkText: 'Explore Ain Sokhna →',
  },
  {
    keywords: ['zanzibar', 'tanzania', 'زنجبار', 'تنزانيا', 'stone town', 'spice'],
    answer: '🌺 Zanzibar is the Spice Island of the Indian Ocean — turquoise waters, white beaches and Stone Town alleys. Starting from $849/person.',
    link: '/destination/10',
    linkText: 'Explore Zanzibar →',
  },

  // ── Blog Posts ────────────────────────────────────────────
  {
    keywords: ['sinai hidden', 'hidden gems', 'canyon', 'oasis', 'bedouin'],
    answer: '📖 Check out our blog post "10 Hidden Gems in Sinai You Must Explore" — secret canyons, oases and Bedouin trails.',
    link: '/blog/1',
    linkText: 'Read the Article →',
  },
  {
    keywords: ['packing', 'pack', 'luggage', 'bag', 'what to bring', 'ايه اجيب', 'شنطة'],
    answer: '🧳 Our packing guide "The Ultimate Packing Guide for Beach Trips" covers everything you need for the perfect beach holiday.',
    link: '/blog/2',
    linkText: 'Read Packing Guide →',
  },
  {
    keywords: ['worth', 'expensive', 'santorini worth', 'why santorini'],
    answer: "💎 Read our article 'Why Santorini is Worth Every Penny' — honest review of the island's best experiences.",
    link: '/blog/3',
    linkText: 'Read the Article →',
  },
  {
    keywords: ['solo', 'alone', 'solo travel', 'بوحدي', 'سفر منفرد', 'bali solo'],
    answer: "🎒 Read our guide 'Solo Travel in Bali: A First-Timer's Guide' — everything you need before your solo trip.",
    link: '/blog/4',
    linkText: 'Read Solo Guide →',
  },
  {
    keywords: ['diving', 'snorkeling', 'underwater', 'غوص', 'عوم', 'reef', 'coral'],
    answer: '🤿 Check out "The Best Underwater Spots Along the Red Sea" — from Dahab\'s Blue Hole to Hurghada\'s reefs.',
    link: '/blog/5',
    linkText: 'Read Diving Guide →',
  },
  {
    keywords: ['family', 'kids', 'children', 'family trip', 'عائلة', 'اطفال'],
    answer: '👨‍👩‍👧 Read "How to Plan a Family Trip Without Losing Your Mind" — practical tips for traveling with children.',
    link: '/blog/6',
    linkText: 'Read Family Guide →',
  },

  // ── Pages ─────────────────────────────────────────────────
  {
    keywords: ['book', 'booking', 'reserve', 'حجز', 'flight', 'hotel', 'طيران', 'فندق'],
    answer: "✈️ You can book flights and hotels directly through our Booking Terminal. Choose your destination and we'll handle the rest!",
    link: '/booking',
    linkText: 'Go to Booking →',
  },
  {
    keywords: ['destinations', 'all destinations', 'explore', 'وجهات', 'اماكن', 'سفر', 'travel'],
    answer: '🌍 Browse all our hand-picked destinations — Egyptian beaches and international escapes, all in one place.',
    link: '/destinations',
    linkText: 'Browse Destinations →',
  },
  {
    keywords: ['blog', 'articles', 'stories', 'tips', 'مدونة', 'مقالات'],
    answer: '📚 Our Travel Journal features stories, tips and guides written by real travelers.',
    link: '/blog',
    linkText: 'Visit the Blog →',
  },
  {
    keywords: ['contact', 'message', 'email', 'reach', 'تواصل', 'رسالة', 'ايميل'],
    answer: '📬 You can reach us through our Contact page. Send us a message — we usually reply within 24 hours.',
    link: '/contact',
    linkText: 'Contact Us →',
  },
  {
    keywords: ['login', 'sign in', 'log in', 'دخول', 'تسجيل دخول'],
    answer: '🔑 Already have an account? Head to the Login page and enter your passport credentials.',
    link: '/login',
    linkText: 'Go to Login →',
  },
  {
    keywords: ['register', 'sign up', 'create account', 'new account', 'تسجيل', 'حساب جديد'],
    answer: "🛫 Don't have an account yet? Register now and get your Travel Explorer boarding pass!",
    link: '/register',
    linkText: 'Sign Up →',
  },
  {
    keywords: ['home', 'main', 'الرئيسية', 'الصفحة الرئيسية'],
    answer: '🏠 Head back to the Home page to start your journey.',
    link: '/',
    linkText: 'Go Home →',
  },

  // ── FAQs ──────────────────────────────────────────────────
  {
    keywords: ['price', 'cost', 'how much', 'cheap', 'expensive', 'سعر', 'تكلفة', 'بكام'],
    answer: '💰 Our destinations start from $149 (Ain Sokhna) up to $1299 (Maldives). Each destination page shows the starting price per person.',
    link: '/destinations',
    linkText: 'View All Prices →',
  },
  {
    keywords: ['best time', 'when to go', 'when to visit', 'season', 'افضل وقت', 'امتى'],
    answer: '📅 Best times vary by destination: Egypt beaches are best Oct–May. Bali & Santorini shine Apr–Oct. Maldives peak season is Nov–Apr.',
    link: '/destinations',
    linkText: 'View Destinations →',
  },
  {
    keywords: ['egypt', 'مصر', 'egyptian'],
    answer: '🇪🇬 We have 5 beautiful Egyptian destinations: Sharm El Sheikh, Hurghada, Alexandria, Dahab and Ain Sokhna.',
    link: '/destinations',
    linkText: 'Browse Egyptian Destinations →',
  },
  {
    keywords: ['international', 'abroad', 'دولي', 'خارج'],
    answer: '✈️ Our international destinations include Maldives, Bali, Santorini, Phuket and Zanzibar.',
    link: '/destinations',
    linkText: 'Browse International Destinations →',
  },
  {
    keywords: ['weather', 'temperature', 'climate', 'طقس', 'حرارة', 'درجة حرارة'],
    answer: '☀️ Weather varies by destination. Most Red Sea spots are 22–35°C, while Santorini and Bali range from 26–32°C. Check each destination for details.',
    link: '/destinations',
    linkText: 'Check Destinations →',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'مرحبا', 'اهلا', 'هاي', 'السلام عليكم'],
    answer: "✈️ Hello, traveler! I'm your Travel Explorer assistant. Ask me about destinations, bookings, blog articles or anything about the site!",
    link: null,
    linkText: null,
  },
  {
    keywords: ['who are you', 'what are you', 'مين انت', 'انت مين', 'bot', 'assistant'],
    answer: "🤖 I'm the Travel Explorer assistant bot! I can help you find destinations, blog articles, booking info or guide you around the site.",
    link: null,
    linkText: null,
  },
  {
    keywords: ['thanks', 'thank you', 'شكرا', 'تسلم', 'ممتاز', 'كويس'],
    answer: '😊 You\'re welcome! Happy travels! Is there anything else I can help you with?',
    link: null,
    linkText: null,
  },
];

// ── Matching Engine ───────────────────────────────────────
export function findAnswer(userInput) {
  const input = userInput.toLowerCase().trim();
  if (!input) return null;

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of DATA_INDEX) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        // longer keyword = more specific = higher weight
        score += keyword.length + 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // minimum score threshold to avoid false positives
  return bestScore >= 2 ? bestMatch : null;
}

export default DATA_INDEX;
