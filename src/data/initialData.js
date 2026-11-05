export const INITIAL_CUSTOMERS = [
  {
    id: "cust-01",
    name: "Priya Saikia",
    email: "priya.saikia@taatxaal.com",
    phone: "+91 98640 12345",
    password: "password123",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    addresses: [
      {
        id: "addr-01",
        name: "Priya Saikia",
        phone: "+91 98640 12345",
        street: "Bungalow No. 14, Kharghuli Hills",
        city: "Guwahati",
        state: "Assam",
        pincode: "781004",
        isDefault: true,
        type: "Home"
      },
      {
        id: "addr-02",
        name: "Priya Saikia (Office)",
        phone: "+91 98640 12345",
        street: "Suite 402, G.S. Road Commercial Plaza",
        city: "Guwahati",
        state: "Assam",
        pincode: "781005",
        isDefault: false,
        type: "Work"
      }
    ]
  }
];

export const INITIAL_ADMIN = {
  id: "admin-01",
  name: "Hemanta Phukan",
  title: "Chief Handloom Curator & Master Administrator",
  email: "admin@taatxaal.com",
  password: "admin123",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
};

export const INITIAL_ORDERS = [
  {
    id: "TX-ORD-2025-9104",
    customerId: "cust-01",
    customerName: "Priya Saikia",
    customerEmail: "priya.saikia@taatxaal.com",
    date: "2025-10-24",
    items: [
      {
        productId: "tx-muga-01",
        name: "Royal Sualkuchi Muga Silk Kingkhap Bridal Set",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=85",
        price: 68500,
        quantity: 1,
        fabric: "Pure Muga Silk",
        color: "Natural Golden Honey"
      }
    ],
    subtotal: 68500,
    discountAmount: 6850,
    shippingFee: 0,
    total: 61650,
    status: "Processing",
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    shippingAddress: {
      street: "Bungalow No. 14, Kharghuli Hills",
      city: "Guwahati",
      state: "Assam",
      pincode: "781004"
    },
    timeline: [
      { status: "Order Placed", date: "24 Oct 2025, 10:30 AM", completed: true },
      { status: "Confirmed", date: "24 Oct 2025, 02:15 PM", completed: true },
      { status: "Processing (Artisan Finishing & QC)", date: "25 Oct 2025, 11:00 AM", completed: true },
      { status: "Dispatched", date: "Pending courier handover", completed: false },
      { status: "Out for Delivery", date: "Estimated 28 Oct 2025", completed: false },
      { status: "Delivered", date: "Estimated 29 Oct 2025", completed: false }
    ]
  },
  {
    id: "TX-ORD-2025-8841",
    customerId: "cust-01",
    customerName: "Priya Saikia",
    customerEmail: "priya.saikia@taatxaal.com",
    date: "2025-09-12",
    items: [
      {
        productId: "tx-eri-03",
        name: "Heirloom Eri Ahimsa Peace Silk Sador & Stole",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=300&q=85",
        price: 18900,
        quantity: 1,
        fabric: "Organic Eri Silk",
        color: "Earthy Oatmeal & Deep Charcoal"
      }
    ],
    subtotal: 18900,
    discountAmount: 0,
    shippingFee: 0,
    total: 18900,
    status: "Delivered",
    paymentMethod: "Credit Card (HDFC Visa)",
    paymentStatus: "Paid",
    shippingAddress: {
      street: "Bungalow No. 14, Kharghuli Hills",
      city: "Guwahati",
      state: "Assam",
      pincode: "781004"
    },
    timeline: [
      { status: "Order Placed", date: "12 Sep 2025, 04:20 PM", completed: true },
      { status: "Confirmed", date: "12 Sep 2025, 06:10 PM", completed: true },
      { status: "Processing", date: "13 Sep 2025, 10:00 AM", completed: true },
      { status: "Dispatched", date: "14 Sep 2025, 01:45 PM", completed: true },
      { status: "Out for Delivery", date: "16 Sep 2025, 09:30 AM", completed: true },
      { status: "Delivered", date: "16 Sep 2025, 02:15 PM", completed: true }
    ]
  }
];

export const INITIAL_CUSTOM_REQUESTS = [
  {
    id: "CUST-REQ-301",
    customerId: "cust-01",
    customerName: "Priya Saikia",
    customerEmail: "priya.saikia@taatxaal.com",
    customerPhone: "+91 98640 12345",
    fabric: "Mulberry Pat Silk",
    colorName: "Deep Crimson Red with Antique Gold",
    colorHex: "#7B263C",
    mekhelaDesign: "Traditional Kingkhap",
    sadorDesign: "Heavy Zari Anchal & Extra-weft Buta",
    motifs: ["Royal Kingkhap", "Kolka", "Jaapi"],
    finishing: "Hand-braided Pure Zari Latkan with Silk Tassels",
    estimatedPrice: 48500,
    estimatedDays: 22,
    instructions: "Please weave bride and groom initials 'P & A' discreetly inside the hem of the sador corner.",
    referenceImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
    status: "In Review",
    createdAt: "2025-10-28"
  }
];

export const INITIAL_WEDDING_CONSULTATIONS = [
  {
    id: "WED-CON-101",
    customerName: "Debjani Hazarika",
    email: "debjani.h@outlook.com",
    phone: "+91 98642 99881",
    weddingDate: "2026-01-18",
    preferredFabric: "Pure Muga Silk",
    preferredColor: "Natural Golden Honey with Scarlet Border",
    budget: "₹80,000 - ₹1,20,000",
    specialRequirements: "Looking for a complete bridal set matching heirloom Jonbiri and Lokaparo jewellery. Need delivery by 20th December for pre-wedding portraits.",
    status: "Scheduled",
    createdAt: "2025-10-29"
  },
  {
    id: "WED-CON-102",
    customerName: "Arunima Bora",
    email: "arunima.bora@gmail.com",
    phone: "+91 98112 45451",
    weddingDate: "2026-02-14",
    preferredFabric: "Mulberry Pat Silk",
    preferredColor: "Soft Champagne & Blush Pink",
    budget: "₹50,000 - ₹80,000",
    specialRequirements: "Bridal reception attire with minimalist modern gold weave and lightweight sador.",
    status: "Contacted",
    createdAt: "2025-10-25"
  }
];

export const INITIAL_COUPONS = [
  {
    code: "BOHAG10",
    discountPercent: 10,
    minOrder: 15000,
    description: "10% festive discount on all handloom orders above ₹15,000",
    isActive: true
  },
  {
    code: "BRIDAL15",
    discountPercent: 15,
    minOrder: 45000,
    description: "15% discount on wedding trousseau orders above ₹45,000",
    isActive: true
  },
  {
    code: "FIRSTWEAVE",
    discountPercent: 5,
    minOrder: 5000,
    description: "5% welcome off on your first handcrafted order",
    isActive: true
  }
];

export const INITIAL_HOMEPAGE_CMS = {
  announcements: [
    "Discover the timeless elegance of authentic Assamese handloom.",
    "Special bridal & festive collections for your most memorable occasions.",
    "Custom-designed Mekhela Sador, woven just for you by Sualkuchi master artisans.",
    "Complimentary insured doorstep shipping across India on orders above ₹10,000."
  ],
  heroHeading: "An Elegance Woven Through Generations",
  heroSubtitle: "Discover the timeless beauty of Assamese Mekhela Sador, where heritage craftsmanship meets contemporary luxury.",
  heroBadge: "The Crown of Assam Handloom",
  heroImageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
  weddingBannerHeading: "Your Wedding. Your Tradition. Your Timeless Elegance.",
  weddingBannerSub: "Experience royal Assamese bridal grandeur in pure wild Muga and crimson Mulberry Pat.",
  customiseHeading: "Designed by You. Woven for You.",
  customiseSub: "Select your fabric, palette, traditional motifs and borders. Watch your bespoke drape come alive."
};

export const INITIAL_CATEGORIES = [
  {
    id: "cat-bridal",
    name: "Bridal Mekhela Sador",
    description: "Heirloom bridal ensembles woven in pure golden Muga and crimson Pat silk.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    itemCount: 8,
    isActive: true
  },
  {
    id: "cat-muga",
    name: "Pure Muga Silk",
    description: "Assam's sovereign golden wild silk with natural eternal sheen.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    itemCount: 6,
    isActive: true
  },
  {
    id: "cat-pat",
    name: "Mulberry Pat Silk",
    description: "Lustrous ivory white silk dyed in rich festive mineral and plant hues.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    itemCount: 12,
    isActive: true
  },
  {
    id: "cat-eri",
    name: "Eri Ahimsa Silk",
    description: "Cruelty-free thermal peace silk woven into soulful shawls and sadors.",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
    itemCount: 7,
    isActive: true
  },
  {
    id: "cat-cotton",
    name: "Festive Cotton Silk",
    description: "Lightweight, breathable, everyday comfort with handwoven Gamusa accents.",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80",
    itemCount: 9,
    isActive: true
  }
];

