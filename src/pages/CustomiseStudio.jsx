import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShoppingBag, 
  Bookmark, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Upload, 
  Palette, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import DrapedFabricVisualizer from '../components/three/DrapedFabricVisualizer';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import confetti from 'canvas-confetti';

const FABRICS = [
  {
    id: 'muga',
    name: 'Pure Muga Silk',
    tag: 'GI Tagged Heritage',
    description: 'Assam’s exclusive wild golden silk. Naturally lustrous, durable, grows more golden with age.',
    basePrice: 58000,
    days: 28,
    sheen: 'Golden Radiance'
  },
  {
    id: 'pat',
    name: 'Mulberry Pat Silk',
    tag: 'Royal Bridal Weave',
    description: 'Glossy ivory mulberry silk, supremely soft and magnificent in fluid drapes.',
    basePrice: 34000,
    days: 20,
    sheen: 'High Luster Silk'
  },
  {
    id: 'eri',
    name: 'Eri Ahimsa Peace Silk',
    tag: 'Non-violent & Thermal',
    description: 'Cruelty-free peace silk harvested gently. Wonderfully textured and breathable.',
    basePrice: 22000,
    days: 16,
    sheen: 'Tactile Organic Matte'
  },
  {
    id: 'kesha-pat',
    name: 'Raw Kesha Pat Silk',
    tag: 'Contemporary Crisp',
    description: 'Unboiled raw mulberry silk with a crisp structured modern fall.',
    basePrice: 26000,
    days: 18,
    sheen: 'Subtle Raw Sheen'
  },
  {
    id: 'cotton-silk',
    name: 'Sualkuchi Cotton Silk',
    tag: 'Breathable Everyday',
    description: 'Pure fine-count cotton interwoven with mulberry silk for lightweight comfort.',
    basePrice: 13500,
    days: 12,
    sheen: 'Soft Breathable Weave'
  }
];

const COLOURS = [
  { name: 'Traditional Scarlet Red', hex: '#8B1E2F', family: 'Red' },
  { name: 'Warm Ivory White', hex: '#FDFBF7', family: 'Ivory' },
  { name: 'Natural Muga Honey Gold', hex: '#C6A15B', family: 'Gold' },
  { name: 'Royal Ahom Sapphire Blue', hex: '#1B365D', family: 'Blue' },
  { name: 'Deep Forest Emerald', hex: '#1E4620', family: 'Green' },
  { name: 'Imperial Bridal Maroon', hex: '#651D32', family: 'Maroon' },
  { name: 'Rani Magenta Pink', hex: '#9E2A5B', family: 'Pink' },
  { name: 'Midnight Obsidian Black', hex: '#212022', family: 'Black' }
];

const MEKHELA_DESIGNS = [
  { id: 'traditional-kingkhap', name: 'Traditional Kingkhap Royal Lion', addPrice: 6000 },
  { id: 'contemporary-geometrics', name: 'Contemporary Diamond Geometrics', addPrice: 3500 },
  { id: 'lata-floral-vine', name: 'Lata Blooming Floral Vine', addPrice: 4500 },
  { id: 'temple-border-chariot', name: 'Ancient Temple Chariot Weave', addPrice: 5000 }
];

const SADOR_DESIGNS = [
  { id: 'heavy-zari-anchal', name: 'Heavy Zari Anchal & Extra-weft Buta', addPrice: 7500 },
  { id: 'minimalist-sleek-border', name: 'Minimalist Sleek Guna Border', addPrice: 2000 },
  { id: 'traditional-gamusa-border', name: 'Sacred Crimson Gamusa Border', addPrice: 3500 },
  { id: 'royal-bridal-cascade', name: 'Royal Bridal Gunari Cascade', addPrice: 9000 }
];

const MOTIFS = [
  { id: 'jaapi', name: 'Sacred Jaapi (Auspicious Headgear)', desc: 'Symbol of respect and Assamese pride' },
  { id: 'kingkhap', name: 'Royal Kingkhap (Ahom Lion Crest)', desc: 'Imperial valor and dynasty heritage' },
  { id: 'kolka', name: 'Kolka (Sacred Mango Paisley)', desc: 'Fertility, prosperity and auspicious beginnings' },
  { id: 'phool', name: 'Phool & Lata (Wildflower Creeper)', desc: 'Blossoms from the hills of Assam' },
  { id: 'kaziranga', name: 'Kaziranga Rhino & Fauna', desc: 'Assam wildlife motif hand-embroidered' }
];

const FINISHINGS = [
  { id: 'standard', name: 'Traditional Hand-knotted Tassels (Kohi)', addPrice: 0 },
  { id: 'latkan', name: 'Pure Copper-Gold Zari Braided Latkans', addPrice: 2500 },
  { id: 'dual-tone', name: 'Dual-tone Mulberry Silk Hemming', addPrice: 1500 }
];

export default function CustomiseStudio() {
  const { addToCart, addToast } = useShop();
  const { saveCustomDesign } = useAuth();
  const { customRequests } = useAdmin();
  const navigate = useNavigate();

  // Wizard Step State (1 to 7)
  const [currentStep, setCurrentStep] = useState(1);

  // User Selections
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOURS[0]);
  const [selectedMekhela, setSelectedMekhela] = useState(MEKHELA_DESIGNS[0]);
  const [selectedSador, setSelectedSador] = useState(SADOR_DESIGNS[0]);
  const [selectedMotifs, setSelectedMotifs] = useState(['jaapi', 'kingkhap']);
  const [selectedFinishing, setSelectedFinishing] = useState(FINISHINGS[0]);
  const [customInstructions, setCustomInstructions] = useState('');
  const [referenceFileName, setReferenceFileName] = useState('');
  const [savedSuccessModal, setSavedSuccessModal] = useState(false);

  // Toggle Motifs
  const handleToggleMotif = (motifId) => {
    setSelectedMotifs((prev) => {
      if (prev.includes(motifId)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((id) => id !== motifId);
      } else {
        return [...prev, motifId];
      }
    });
  };

  // Pricing Calculation
  const estimatedPrice = 
    selectedFabric.basePrice + 
    selectedMekhela.addPrice + 
    selectedSador.addPrice + 
    selectedFinishing.addPrice + 
    (selectedMotifs.length > 2 ? (selectedMotifs.length - 2) * 1500 : 0);

  const estimatedDays = selectedFabric.days + 3;

  // Step Navigation
  const nextStep = () => setCurrentStep((prev) => Math.min(7, prev + 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  // Save Design
  const handleSaveDesign = () => {
    const designData = {
      fabric: selectedFabric.name,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      mekhelaDesign: selectedMekhela.name,
      sadorDesign: selectedSador.name,
      motifs: selectedMotifs.map((id) => MOTIFS.find((m) => m.id === id)?.name),
      finishing: selectedFinishing.name,
      estimatedPrice,
      estimatedDays,
      instructions: customInstructions,
      referenceImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"
    };

    saveCustomDesign(designData);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setSavedSuccessModal(true);
    addToast('Your bespoke Mekhela Sador design has been saved to your account!');
  };

  // Add Custom To Bag
  const handleAddCustomToBag = () => {
    const customProduct = {
      id: `custom-mekhela-${Date.now()}`,
      name: `Bespoke ${selectedFabric.name} Mekhela Sador`,
      price: estimatedPrice,
      fabric: selectedFabric.name,
      color: selectedColor.name,
      images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85"],
      sku: `TX-BESPOKE-${Math.floor(1000 + Math.random() * 9000)}`
    };

    const specs = {
      fabric: selectedFabric.name,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      mekhelaDesign: selectedMekhela.name,
      sadorDesign: selectedSador.name,
      motifs: selectedMotifs.map((id) => MOTIFS.find((m) => m.id === id)?.name).join(', '),
      finishing: selectedFinishing.name,
      instructions: customInstructions,
      estimatedDays
    };

    addToCart(customProduct, 1, specs);
  };

  const stepsList = [
    'Fabric',
    'Palette',
    'Mekhela',
    'Sador',
    'Motifs',
    'Finishing',
    'Personalisation'
  ];

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-[#2c0e17] via-[#521727] to-[#1c080e] text-ivory py-12 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Bespoke Loom Studio
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Customise Your Mekhela Sador
            </h1>
            <p className="font-editorial text-sm sm:text-base text-champagne/90 italic mt-1">
              "Designed by You. Woven on Authentic Sualkuchi Looms by Master Artisans."
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-gold/30">
            <div>
              <span className="text-[11px] text-champagne/70 block uppercase tracking-wider">Estimated Investment</span>
              <span className="font-serif text-2xl font-bold text-gold">
                ₹{estimatedPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="w-px h-8 bg-gold/30" />
            <div>
              <span className="text-[11px] text-champagne/70 block uppercase tracking-wider">Loom Weave Time</span>
              <span className="text-sm font-semibold text-white flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold" /> ~{estimatedDays} Days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Step Progress Stepper Bar */}
        <div className="bg-white p-4 rounded-2xl border border-champagne shadow-sm mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px] px-4">
            {stepsList.map((stepName, idx) => {
              const stepNumber = idx + 1;
              const isPassed = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;

              return (
                <div key={stepName} className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep(stepNumber)}
                    className={`flex items-center gap-2 text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'text-burgundy'
                        : isPassed
                        ? 'text-emerald-700'
                        : 'text-charcoal/40 hover:text-charcoal'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-burgundy text-gold ring-4 ring-gold/20'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-beige text-charcoal/60'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4" /> : stepNumber}
                    </span>
                    <span className="hidden sm:inline font-sans">{stepName}</span>
                  </button>

                  {idx < stepsList.length - 1 && (
                    <div className="w-8 lg:w-12 h-0.5 bg-champagne mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Studio Grid: Live Preview (Left) & Customization Wizard Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: LIVE VISUAL PREVIEW AREA (Sticky) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            
            {/* Interactive 3D Fabric Simulation Canvas */}
            <DrapedFabricVisualizer
              fabricType={selectedFabric.name}
              colorHex={selectedColor.hex}
              motif={selectedMotifs.map((id) => MOTIFS.find((m) => m.id === id)?.name)[0] || 'Kingkhap'}
              borderStyle={selectedSador.name}
              height="380px"
            />

            {/* Live Specifications Card */}
            <div className="bg-white rounded-2xl p-5 border border-champagne shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-champagne">
                <h3 className="font-serif text-sm font-bold text-burgundy flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-gold" />
                  Current Specifications
                </h3>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Live Interactive
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-charcoal/50 block text-[10px] uppercase font-bold">Fabric</span>
                  <span className="font-semibold text-charcoal">{selectedFabric.name}</span>
                </div>
                <div>
                  <span className="text-charcoal/50 block text-[10px] uppercase font-bold">Shade</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-charcoal/20" style={{ backgroundColor: selectedColor.hex }} />
                    <span className="font-semibold text-charcoal">{selectedColor.name}</span>
                  </div>
                </div>
                <div>
                  <span className="text-charcoal/50 block text-[10px] uppercase font-bold">Mekhela Weave</span>
                  <span className="text-charcoal/90">{selectedMekhela.name}</span>
                </div>
                <div>
                  <span className="text-charcoal/50 block text-[10px] uppercase font-bold">Sador Anchal</span>
                  <span className="text-charcoal/90">{selectedSador.name}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-charcoal/50 block text-[10px] uppercase font-bold">Selected Motifs</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedMotifs.map((id) => (
                      <span key={id} className="px-2 py-0.5 bg-beige rounded text-[10px] font-medium text-burgundy">
                        {MOTIFS.find((m) => m.id === id)?.name.split(' (')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons for Current Config */}
              <div className="pt-2 border-t border-champagne flex gap-2">
                <button
                  onClick={handleSaveDesign}
                  className="flex-1 py-2.5 px-3 bg-white hover:bg-gold/10 text-charcoal border border-champagne hover:border-gold rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5 text-gold" />
                  <span>Save Design</span>
                </button>
                <button
                  onClick={handleAddCustomToBag}
                  className="flex-1 py-2.5 px-3 bg-burgundy hover:bg-maroon text-ivory rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md border border-gold/40"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                  <span>Add Custom to Bag</span>
                </button>
              </div>

            </div>

          </div>

          {/* RIGHT: INTERACTIVE WIZARD STEP WORKFLOW */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-champagne shadow-sm min-h-[560px] flex flex-col justify-between">
            
            <div>
              {/* Step 1: Select Fabric */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">Step 1 of 7</span>
                    <h2 className="font-serif text-2xl font-bold text-charcoal mt-1">Select Foundation Fabric</h2>
                    <p className="text-xs text-charcoal/60 mt-1">Choose the natural Assamese silk or organic handloom base.</p>
                  </div>

                  <div className="space-y-3">
                    {FABRICS.map((fabric) => (
                      <div
                        key={fabric.id}
                        onClick={() => setSelectedFabric(fabric)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedFabric.id === fabric.id
                            ? 'border-burgundy bg-burgundy/5 shadow-sm'
                            : 'border-champagne hover:border-gold bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif text-base font-bold text-charcoal">{fabric.name}</h4>
                              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-gold/20 text-burgundy">
                                {fabric.tag}
                              </span>
                            </div>
                            <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">{fabric.description}</p>
                            <span className="text-[11px] text-gold-dark font-medium italic mt-1 block">
                              Drape Sheen: {fabric.sheen} &bull; Weave Time: ~{fabric.days} Days
                            </span>
                          </div>

                          <div className="text-right shrink-0 ml-3">
                            <span className="font-serif font-bold text-burgundy text-sm block">
                              Base ₹{fabric.basePrice.toLocaleString('en-IN')}
                            </span>
                            <div className={`w-5 h-5 rounded-full border-2 mt-1 ml-auto flex items-center justify-center ${
                              selectedFabric.id === fabric.id ? 'border-burgundy bg-burgundy text-white' : 'border-charcoal/30'
                            }`}>
                              {selectedFabric.id === fabric.id && <Check className="w-3 h-3 text-gold" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Select Colour */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">Step 2 of 7</span>
                    <h2 className="font-serif text-2xl font-bold text-charcoal mt-1">Select Dye Palette</h2>
                    <p className="text-xs text-charcoal/60 mt-1">
                      Mineral and organic dyes prepared in certified natural vat baths.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {COLOURS.map((col) => (
                      <div
                        key={col.name}
                        onClick={() => setSelectedColor(col)}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                          selectedColor.name === col.name
                            ? 'border-burgundy bg-burgundy/5 shadow-sm'
                            : 'border-champagne hover:border-gold bg-white'
                        }`}
                      >
                        <span
                          className="w-8 h-8 rounded-full border-2 border-white shadow-md shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm font-semibold text-charcoal truncate">{col.name}</p>
                          <span className="text-[11px] text-charcoal/50 capitalize">{col.family} Family</span>
                        </div>
                        {selectedColor.name === col.name && (
                          <Check className="w-4 h-4 text-burgundy shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-beige/40 rounded-xl border border-champagne text-xs text-charcoal/70">
                    <p className="font-semibold text-burgundy flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-gold" /> Custom Pantones or Swatches
                    </p>
                    <p className="mt-0.5">
                      Need an exact shade match for your wedding lehenga or jewellery? Note your hex/RGB in Step 7.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Select Mekhela Design */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">Step 3 of 7</span>
                    <h2 className="font-serif text-2xl font-bold text-charcoal mt-1">Select Mekhela Base Pattern</h2>
                    <p className="text-xs text-charcoal/60 mt-1">The skirt portion pleated gracefully at the waist.</p>
                  </div>

                  <div className="space-y-3">
                    {MEKHELA_DESIGNS.map((design) => (
                      <div
                        key={design.id}
                        onClick={() => setSelectedMekhela(design)}
                        className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                          selectedMekhela.id === design.id
                            ? 'border-burgundy bg-burgundy/5 shadow-sm'
                            : 'border-champagne hover:border-gold bg-white'
                        }`}
                      >
                        <div>
                          <h4 className="font-serif text-sm font-bold text-charcoal">{design.name}</h4>
                          <span className="text-xs text-charcoal/60">Includes authentic extra-weft pit loom borders</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-burgundy">
                            +{design.addPrice > 0 ? `₹${design.addPrice.toLocaleString('en-IN')}` : 'Included'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Select Sador Design */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">Step 4 of 7</span>
                    <h2 className="font-serif text-2xl font-bold text-charcoal mt-1">Select Sador Anchal Styling</h2>
                    <p className="text-xs text-charcoal/60 mt-1">The showpiece drape that falls across the shoulder.</p>
                  </div>

                  <div className="space-y-3">
                    {SADOR_DESIGNS.map((design) => (
                      <div
                        key={design.id}
                        onClick={() => setSelectedSador(design)}
                        className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                          selectedSador.id === design.id
                            ? 'border-burgundy bg-burgundy/5 shadow-sm'
                            : 'border-champagne hover:border-gold bg-white'
                        }`}
                      >
                        <div>
                          <h4 className="font-serif text-sm font-bold text-charcoal">{design.name}</h4>
                          <span className="text-xs text-charcoal/60">Pure metallic zari (guna) weave on anchal edge</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-burgundy">
                            +{design.addPrice > 0 ? `₹${design.addPrice.toLocaleString('en-IN')}` : 'Included'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Select Motifs */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">Step 5 of 7</span>
                    <h2 className="font-serif text-2xl font-bold text-charcoal mt-1">Select Traditional Motifs</h2>
                    <p className="text-xs text-charcoal/60 mt-1">
                      Choose one or multiple motifs to be woven into your sador body and borders.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {MOTIFS.map((motif) => {
                      const isSelected = selectedMotifs.includes(motif.id);
                      return (
                        <div
                          key={motif.id}
                          onClick={() => handleToggleMotif(motif.id)}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-burgundy bg-burgundy/5 shadow-sm'
                              : 'border-champagne hover:border-gold bg-white'
                          }`}
                        >
                          <div>
                            <h4 className="font-serif text-sm font-bold text-charcoal">{motif.name}</h4>
                            <p className="text-xs text-charcoal/60">{motif.desc}</p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center border ${
                              isSelected ? 'bg-burgundy text-gold border-burgundy' : 'border-charcoal/30'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 6: Select Finishing */}
              {currentStep === 6 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">Step 6 of 7</span>
                    <h2 className="font-serif text-2xl font-bold text-charcoal mt-1">Select Hemming &amp; Tassel Finishing</h2>
                    <p className="text-xs text-charcoal/60 mt-1">The exquisite artisanal edge work of your Mekhela Sador.</p>
                  </div>

                  <div className="space-y-3">
                    {FINISHINGS.map((fin) => (
                      <div
                        key={fin.id}
                        onClick={() => setSelectedFinishing(fin)}
                        className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                          selectedFinishing.id === fin.id
                            ? 'border-burgundy bg-burgundy/5 shadow-sm'
                            : 'border-champagne hover:border-gold bg-white'
                        }`}
                      >
                        <div>
                          <h4 className="font-serif text-sm font-bold text-charcoal">{fin.name}</h4>
                          <span className="text-xs text-charcoal/60">Crafted by master finishing artisans</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-burgundy">
                            {fin.addPrice > 0 ? `+₹${fin.addPrice.toLocaleString('en-IN')}` : 'Complimentary'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 7: Personalisation & Special Preferences */}
              {currentStep === 7 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">Step 7 of 7</span>
                    <h2 className="font-serif text-2xl font-bold text-charcoal mt-1">Bespoke Personalisation</h2>
                    <p className="text-xs text-charcoal/60 mt-1">
                      Add special weaver instructions, custom initials, or reference photos.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-1.5">
                        Artisan Instructions / Monogram Request:
                      </label>
                      <textarea
                        rows="3"
                        value={customInstructions}
                        onChange={(e) => setCustomInstructions(e.target.value)}
                        placeholder="E.g. Please weave initials 'P & A' on the corner of the sador anchal in antique gold thread..."
                        className="w-full p-3 rounded-xl border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold bg-beige/20 font-sans"
                      />
                    </div>

                    {/* Upload Reference Photo simulation */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-1.5">
                        Upload Reference Image (Optional):
                      </label>
                      <div className="border-2 border-dashed border-champagne hover:border-gold rounded-xl p-4 text-center cursor-pointer bg-beige/10">
                        <Upload className="w-6 h-6 text-gold mx-auto mb-1" />
                        <span className="text-xs text-charcoal/70 block">
                          {referenceFileName || 'Click to select jewelry or saree reference photo'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setReferenceFileName(e.target.files[0].name);
                              addToast(`Photo "${e.target.files[0].name}" attached to customization.`);
                            }
                          }}
                          className="hidden"
                          id="ref-upload"
                        />
                        <label htmlFor="ref-upload" className="text-[11px] text-burgundy font-semibold hover:underline cursor-pointer block mt-1">
                          Browse files (JPEG, PNG)
                        </label>
                      </div>
                    </div>

                    {/* Summary confirmation */}
                    <div className="p-4 bg-gold/10 rounded-xl border border-gold/30 text-xs space-y-1">
                      <p className="font-serif font-bold text-burgundy">Your Bespoke Mekhela Sador is Ready for the Loom!</p>
                      <p className="text-charcoal/80">
                        Review your configuration in the preview pane, then Save Design or Add to Bag.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="pt-6 mt-6 border-t border-champagne flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  currentStep === 1
                    ? 'opacity-40 cursor-not-allowed text-charcoal/40'
                    : 'bg-beige hover:bg-champagne text-charcoal'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="text-xs text-charcoal/50 font-medium">
                Step {currentStep} of 7
              </div>

              {currentStep < 7 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2.5 bg-burgundy hover:bg-maroon text-ivory rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-gold/40 shadow-sm"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </button>
              ) : (
                <button
                  onClick={handleAddCustomToBag}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-shimmer text-charcoal-dark font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-gold"
                >
                  <span>Add to Bag (₹{estimatedPrice.toLocaleString('en-IN')})</span>
                  <ShoppingBag className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Save Success Modal */}
      {savedSuccessModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-ivory rounded-2xl max-w-md w-full p-6 text-center border border-gold shadow-2xl space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-burgundy">Design Saved to Dashboard!</h3>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Your bespoke configuration for <strong>{selectedFabric.name}</strong> in <strong>{selectedColor.name}</strong> has been saved under your account's "Custom Designs" section.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSavedSuccessModal(false)}
                className="flex-1 py-2.5 bg-beige text-charcoal text-xs font-semibold rounded-xl"
              >
                Continue Tweaking
              </button>
              <button
                onClick={() => {
                  setSavedSuccessModal(false);
                  navigate('/account/custom-designs');
                }}
                className="flex-1 py-2.5 bg-burgundy text-ivory text-xs font-semibold rounded-xl"
              >
                View in Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

