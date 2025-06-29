import React, { useState, useMemo } from 'react';

// --- Data & Descriptions ---
const foodData = {
  'Rawon': 'rich black kluwek broth with beef chunks, bean sprouts, salted egg halves',
  'Soto Betawi': 'creamy coconut milk and beef broth with beef pieces, fried potato, tomato, and emping crackers',
  'Sate Ayam': 'grilled chicken skewers glazed with peanut sauce on banana leaves, topped with fried shallots and pickles',
  'Mie Ayam': 'yellow wheat noodles with diced chicken, steamed bok choy, and a savory broth on the side',
  'Pempek': 'fish cakes with a tangy dark cuko sauce, shredded cucumber, and ebi powder garnish',
  'Nasi Padang': 'a plate of steamed rice served with various pre-cooked dishes, including beef rendang, gulai ayam, and sambal ijo',
  'Sop Iga': 'clear and savory beef rib soup with carrots, potatoes, celery, and a sprinkle of fried shallots',
  'Gado-Gado': 'Indonesian salad of steamed vegetables, hard-boiled eggs, tofu, and lontong, all dressed in a peanut sauce dressing',
  'Bakso': 'beef meatballs served in a clear broth with noodles, tofu, and bok choy, garnished with celery and fried shallots',
  'Nasi Goreng': 'Indonesian fried rice with chicken, shrimp, and vegetables, topped with a fried egg and prawn crackers',
  'Rendang': 'slow-cooked beef in coconut milk and a rich mixture of spices, tender and flavorful',
};

// --- Options for UI Controls ---
const foodOptions = Object.keys(foodData);
const backgroundOptions = ['Rustic wooden table', 'Batik tablecloth', 'Green banana leaf base', 'Clean white studio table', 'Custom (free text)'];
const lightingOptions = ['Natural soft daylight from the left', 'Golden hour light with long shadows', 'Bright overhead studio lighting', 'Dramatic single-source side light', 'Custom (free text)'];
const aspectRatioOptions = ['1:1 (Instagram Post)', '4:3 (Blog Photo)', '9:16 (Reels/TikTok)', '16:9 (YouTube Thumbnail)'];
// --- UPDATED: More Composition Options ---
const compositionOptions = [
    'Top-down flat lay', 
    '45-degree angle shot', 
    'Eye-level straight-on shot', 
    'Macro close-up on texture', 
    'Dynamic action shot (e.g., sauce being poured)',
    'Dutch angle for a creative, tilted perspective',
    'Human element (e.g., hands holding the bowl)',
    'Symmetrical arrangement on a clean background'
];


// --- Main App Component ---
export default function App() {
  // --- State Management ---
  const [selectedFoods, setSelectedFoods] = useState(['Rawon', 'Sate Ayam', 'Pempek']);
  const [background, setBackground] = useState(backgroundOptions[0]);
  const [customBackground, setCustomBackground] = useState('');
  const [lighting, setLighting] = useState(lightingOptions[0]);
  const [customLighting, setCustomLighting] = useState('');
  const [aspectRatio, setAspectRatio] = useState(aspectRatioOptions[0]);
  const [composition, setComposition] = useState(compositionOptions[0]); // State for composition
  
  const [displayPrompt, setDisplayPrompt] = useState(''); // State for the prompt shown in textarea
  const [isCopied, setIsCopied] = useState(false);

  // --- Event Handlers ---
  const handleFoodToggle = (food) => {
    setSelectedFoods(prev => {
      if (prev.includes(food)) {
        return prev.filter(f => f !== food);
      } else if (prev.length < 3) {
        return [...prev, food];
      }
      return prev;
    });
  };
  
  const handleCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = displayPrompt; // Copy the displayed prompt
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        console.error('Fallback: Gagal menyalin teks');
      }
    } catch (err) {
      console.error('Fallback: Gagal menyalin teks', err);
    }
    document.body.removeChild(textArea);
  };

  // --- Prompt Calculation (Memoized) ---
  const potentialPrompt = useMemo(() => {
    const foodDescriptions = selectedFoods.length > 0 ? selectedFoods.map(food => `- ${food}: ${foodData[food]}`).join('\n') : '- [Pilih makanan untuk melihat deskripsi]';
    const foodList = selectedFoods.length > 0 ? selectedFoods.join(', ') : '[pilih makanan]';
    const finalBackground = background === 'Custom (free text)' ? (customBackground || '[ketik deskripsi background]') : background;
    const finalLighting = lighting === 'Custom (free text)' ? (customLighting || '[ketik deskripsi pencahayaan]') : lighting;
    const finalAspectRatio = aspectRatio.split(' ')[0];

    // UPDATED to include composition
    return `Generate a hyper-realistic top-down food photo featuring ${foodList}, beautifully arranged on a ${finalBackground}.

Each dish must be highly detailed and authentic to its Indonesian origin:
${foodDescriptions}

Use ${finalLighting} to bring out natural textures, steam, and gloss of the dishes.
Do not include any text, logos, or watermarks.

Style: Hyper-realistic food photography
Camera: DSLR, 35mm lens, f/4.0
Composition: ${composition}
Aspect ratio: ${finalAspectRatio}
Resolution: 6K
Usage: Food showcase, culinary blog, or social media visual`;
  }, [selectedFoods, background, customBackground, lighting, customLighting, aspectRatio, composition]);

  // --- Handle Generate Button Click ---
  const handleGenerateClick = () => {
    setDisplayPrompt(potentialPrompt);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-2">
            AI Food Photo Prompt Generator
          </h1>
          <p className="text-lg text-gray-300">Buat prompt deskriptif untuk fotografi makanan khas Indonesia.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* --- Left Column: Control Panel --- */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col">
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-3">1. Atur Opsi</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-200 mb-3">Pilih Hingga 3 Makanan</label>
                  <div className="flex flex-wrap gap-3">
                    {foodOptions.map(food => {
                      const isSelected = selectedFoods.includes(food);
                      const isDisabled = !isSelected && selectedFoods.length >= 3;
                      return (<button key={food} onClick={() => handleFoodToggle(food)} disabled={isDisabled} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isSelected ? 'bg-emerald-500 text-white shadow-md ring-2 ring-emerald-400' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>{food}</button>);
                    })}
                  </div>
                  {selectedFoods.length >= 3 && <p className="text-xs text-amber-400 mt-2">Batas maksimum 3 makanan telah tercapai.</p>}
                </div>
                
                {/* --- Composition Dropdown --- */}
                <div>
                  <label htmlFor="composition-select" className="block text-lg font-medium text-gray-200 mb-2">Gaya Pengambilan Foto</label>
                  <select 
                    id="composition-select" 
                    value={composition} 
                    onChange={e => setComposition(e.target.value)} 
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {compositionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="background-select" className="block text-lg font-medium text-gray-200 mb-2">Background</label>
                  <select id="background-select" value={background} onChange={e => setBackground(e.target.value)} className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none">{backgroundOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                  {background === 'Custom (free text)' && (<input type="text" value={customBackground} onChange={e => setCustomBackground(e.target.value)} placeholder="Contoh: Marble table with gold veins" className="w-full mt-2 p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none"/>)}
                </div>
                <div>
                  <label htmlFor="lighting-select" className="block text-lg font-medium text-gray-200 mb-2">Pencahayaan</label>
                  <select id="lighting-select" value={lighting} onChange={e => setLighting(e.target.value)} className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none">{lightingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                  {lighting === 'Custom (free text)' && (<input type="text" value={customLighting} onChange={e => setCustomLighting(e.target.value)} placeholder="Contoh: Blue neon light from the back" className="w-full mt-2 p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none"/>)}
                </div>
                <div>
                  <label htmlFor="aspect-ratio-select" className="block text-lg font-medium text-gray-200 mb-2">Aspect Ratio</label>
                  <select id="aspect-ratio-select" value={aspectRatio} onChange={e => setAspectRatio(e.target.value)} className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none">{aspectRatioOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
               <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-3">2. Buat Prompt</h2>
               <button 
                onClick={handleGenerateClick}
                className="w-full py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white shadow-lg"
              >
                Generate Prompt
              </button>
            </div>
          </div>

          {/* --- Right Column: Prompt Output --- */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">Hasil Prompt untuk AI</h2>
              <textarea
                readOnly
                value={displayPrompt}
                placeholder="Klik 'Generate Prompt' setelah mengatur opsi untuk melihat hasilnya di sini..."
                className="w-full h-full flex-grow bg-gray-900/50 text-gray-200 p-4 rounded-lg border border-gray-600 resize-none text-base leading-relaxed focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-gray-500"
                rows="20"
              />
              {displayPrompt && (
                <button 
                  onClick={handleCopy}
                  className="w-full mt-4 py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {isCopied ? <path d="M20 6 9 17l-5-5"/> : <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></>}
                  </svg>
                  {isCopied ? 'Tersalin!' : 'Salin Prompt'}
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
