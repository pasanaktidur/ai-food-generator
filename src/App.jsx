import React, { useState, useMemo, useCallback, useEffect } from 'react';

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
  'Gulai Ikan': 'Indonesian fish curry in a rich, fragrant, and spicy yellow coconut milk sauce, often with pieces of fish fillet and whole red chilies',
  'Coto Makassar': 'a rich, dark, and nutty beef soup with tender pieces of beef and offal, seasoned with ground roasted peanuts, served with rice cakes (buras)',
  'Gudeg': 'a traditional Javanese sweet stew from young jackfruit, stewed for hours with palm sugar and coconut milk, served with rice, egg, and chicken',
  'Sate Padang': 'spicy beef skewers from West Sumatra, grilled and served with a thick, yellow spicy sauce made from rice flour and turmeric',
  'Ikan Bakar': 'Indonesian style grilled fish, marinated in a sweet soy sauce and chili paste, grilled over charcoal with a smoky aroma and caramelized glaze',
  'Ayam Taliwang': 'a spicy grilled chicken dish from Lombok, marinated in a fiery sambal made from red chili peppers, garlic, and shrimp paste',
  'Sop Buntut': 'a flavorful and aromatic oxtail soup, with tender oxtail chunks simmered in a clear broth with potatoes, carrots, and tomatoes',
  'Ketoprak': 'Jakarta street food vegetarian dish with tofu, vegetables, rice vermicelli, and rice cakes (lontong) served in a rich peanut sauce',
  'Siomay': 'Indonesian steamed fish dumplings, served with steamed potatoes, cabbage, and egg, all covered in a savory peanut sauce and sweet soy sauce',
  'Sate Lilit': 'A Balinese satay made from minced meat mixed with grated coconut and spices, wrapped around a lemongrass skewer and grilled',
  'Bebek Betutu': 'A Balinese dish of a whole duck stuffed and marinated with rich "bumbu betutu" spice mix, slow-cooked until incredibly tender',
  'Nasi Uduk': 'Fragrant coconut rice from Jakarta, cooked with coconut milk and lemongrass, served with fried chicken, tempeh, and sambal'
};

// --- Options for UI Controls ---
const foodOptions = Object.keys(foodData);
const backgroundOptions = ['Rustic wooden table', 'Batik tablecloth', 'Green banana leaf base', 'Clean white studio table', 'Custom (free text)'];
const lightingOptions = ['Natural soft daylight from the left', 'Golden hour light with long shadows', 'Bright overhead studio lighting', 'Dramatic single-source side light', 'Custom (free text)'];
const aspectRatioOptions = ['1:1 (Square)', '4:3 (Landscape)', '9:16 (Portrait)', '16:9 (Widescreen)'];
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

const DEFAULT_SYSTEM_PROMPT = "You are a world-class food photographer AI. Your mission is to generate hyper-realistic, appetizing images of Indonesian cuisine based on the user's detailed request. Prioritize authenticity, rich textures, glistening sauces, and beautiful, natural-looking light. The final image should look as if it was captured with a professional DSLR camera for a high-end culinary magazine or a popular food blog. Pay close attention to every detail described in the user's request.";

// --- SVG Icon Components ---
const CoffeeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"><path d="M10 14h26v14.52A7.48 7.48 0 0 1 28.52 36h-11A7.48 7.48 0 0 1 10 28.52V14h0z"/><path d="M4 36h38v0a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v0h0z"/><path d="M36 16h3.71A4.29 4.29 0 0 1 44 20.29v3.43A4.29 4.29 0 0 1 39.71 28H36h0V16h0z"/><path d="M27 4a3.7 3.7 0 0 1 2 3c0 2-2 1.76-2 4"/><path d="M19 4a3.7 3.7 0 0 1 2 3c0 2-2 1.76-2 4"/></g></svg>);
const MoonIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>);
const SunIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M7 12a5 5 0 1 1 5 5 5 5 0 0 1-5-5zm5-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1zm-1 15v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-2 0zm10-9h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zM3 13h1a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zm14.657-5.657a1 1 0 0 0 .707-.293l.707-.707a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 0 0 .707 1.707zM5.636 16.95l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 0 0-1.414-1.414zm11.314 0a1 1 0 0 0 0 1.414l.707.707a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 0zM5.636 7.05A1 1 0 0 0 7.05 5.636l-.707-.707a1 1 0 0 0-1.414 1.414z"/></svg>);
const UserIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);
const GeneratorIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
const SettingsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);

const GeneratePage = ({
    themeClasses,
    numberOfFoods,
    setNumberOfFoods,
    selectedFoods,
    handleFoodSelectionChange,
    composition,
    setComposition,
    background,
    setBackground,
    setFinalCustomBackground,
    lighting,
    setLighting,
    setFinalCustomLighting,
    aspectRatio,
    setAspectRatio,
    handleGenerateClick,
    displayPrompt,
    handleCopy,
    isCopied,
    promptError,
}) => {
    const [customBgInput, setCustomBgInput] = useState('');
    const [customLightInput, setCustomLightInput] = useState('');
    const [bgSaveStatus, setBgSaveStatus] = useState(false);
    const [lightSaveStatus, setLightSaveStatus] = useState(false);

    const handleSaveBg = () => {
        setFinalCustomBackground(customBgInput);
        setBgSaveStatus(true);
        setTimeout(() => setBgSaveStatus(false), 1500);
    };

    const handleSaveLight = () => {
        setFinalCustomLighting(customLightInput);
        setLightSaveStatus(true);
        setTimeout(() => setLightSaveStatus(false), 1500);
    };

    return (
        <div className="w-full">
            <h1 className={`text-3xl sm:text-4xl font-bold ${themeClasses.titleText} mb-2`}>AI Food Photo Prompt Generator</h1>
            <p className={`text-lg mb-8 ${themeClasses.subtitleText}`}>Buat prompt deskriptif untuk fotografi makanan khas indonesia.</p>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className={`p-6 rounded-2xl shadow-lg border flex flex-col ${themeClasses.cardBg}`}>
                    <div className="flex-grow">
                        <h2 className={`text-xl font-semibold mb-6 border-b pb-3 ${themeClasses.cardBorder}`}>Atur Komposisi</h2>
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="number-of-foods-select" className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}>Jumlah Makanan</label>
                                <select id="number-of-foods-select" value={numberOfFoods} onChange={(e) => setNumberOfFoods(e.target.value)} className={`w-full p-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputFocus}`}>
                                    <option value="">Pilih jumlah makanan</option>
                                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                            {Number(numberOfFoods) > 0 && Array.from({ length: Number(numberOfFoods) }).map((_, index) => {
                                const availableOptions = foodOptions.filter(food => !selectedFoods.includes(food) || selectedFoods[index] === food);
                                return (
                                    <div key={index}>
                                        <label htmlFor={`food-select-${index}`} className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}>{`Pilihan Makanan ${index + 1}`}</label>
                                        <select id={`food-select-${index}`} value={selectedFoods[index] || ''} onChange={(e) => handleFoodSelectionChange(index, e.target.value)} className={`w-full p-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputFocus}`}>
                                            <option value="">-- Pilih Makanan --</option>
                                            {availableOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                );
                            })}
                            <div>
                                <label htmlFor="composition-select" className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}>Gaya Pengambilan Foto</label>
                                <select id="composition-select" value={composition} onChange={(e) => setComposition(e.target.value)} className={`w-full p-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputFocus}`}>{compositionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                            </div>
                            <div>
                                <label htmlFor="background-select" className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}>Background</label>
                                <select id="background-select" value={background} onChange={e => setBackground(e.target.value)} className={`w-full p-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputFocus}`}>{backgroundOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                                {background === 'Custom (free text)' && (
                                    <div className="mt-2">
                                        <div className="flex gap-2">
                                            <input type="text" value={customBgInput} onChange={e => setCustomBgInput(e.target.value)} placeholder="Contoh: Marble table with gold veins" maxLength="200" className={`w-full p-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputFocus}`} />
                                            <button onClick={handleSaveBg} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${bgSaveStatus ? 'bg-green-600 text-white' : themeClasses.buttonSecondary}`}>{bgSaveStatus ? 'Saved!' : 'Save'}</button>
                                        </div>
                                        <div className={`text-right text-xs mt-1 ${themeClasses.subtitleText}`}>{customBgInput.length} / 200</div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="lighting-select" className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}>Pencahayaan</label>
                                <select id="lighting-select" value={lighting} onChange={e => setLighting(e.target.value)} className={`w-full p-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputFocus}`}>{lightingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                                {lighting === 'Custom (free text)' && (
                                    <div className="mt-2">
                                        <div className="flex gap-2">
                                            <input type="text" value={customLightInput} onChange={e => setCustomLightInput(e.target.value)} placeholder="Contoh: Blue neon light from the back" maxLength="200" className={`w-full p-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputFocus}`} />
                                            <button onClick={handleSaveLight} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${lightSaveStatus ? 'bg-green-600 text-white' : themeClasses.buttonSecondary}`}>{lightSaveStatus ? 'Saved!' : 'Save'}</button>
                                        </div>
                                        <div className={`text-right text-xs mt-1 ${themeClasses.subtitleText}`}>{customLightInput.length} / 200</div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="aspect-ratio-select" className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}>Aspect Ratio</label>
                                <select id="aspect-ratio-select" value={aspectRatio} onChange={e => setAspectRatio(e.target.value)} className={`w-full p-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputFocus}`}>{aspectRatioOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
                            </div>
                        </div>
                    </div>
                    <div className={`mt-8 pt-6 border-t ${themeClasses.cardBorder}`}>
                        <button onClick={handleGenerateClick} className={`w-full py-4 px-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${themeClasses.buttonPrimary}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Generate Prompt
                        </button>
                        {promptError && <p className="text-red-500 text-sm text-center mt-2">{promptError}</p>}
                    </div>
                </div>
                <div className={`p-6 rounded-2xl shadow-lg border flex flex-col ${themeClasses.cardBg}`}>
                    <h2 className="text-xl font-semibold mb-4">Hasil Prompt</h2>
                    <textarea
                        readOnly
                        value={displayPrompt}
                        placeholder="Klik 'Generate Prompt' untuk melihat hasilnya di sini..."
                        className={`w-full h-full flex-grow p-4 rounded-lg resize-none text-base leading-relaxed ${themeClasses.inputBg} ${themeClasses.inputFocus}`}
                        rows="20"
                    />
                    {displayPrompt && (
                        <button onClick={handleCopy} className={`w-full mt-4 py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${themeClasses.buttonPrimary}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {isCopied ? <path d="M20 6 9 17l-5-5" /> : <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></>}
                            </svg>
                            {isCopied ? 'Tersalin!' : 'Salin Prompt'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const SettingPage = ({ systemPrompt, setSystemPrompt, themeClasses }) => {
    const [tempPrompt, setTempPrompt] = useState(systemPrompt);
    const [saveStatus, setSaveStatus] = useState('');

    const handleSave = () => {
        setSystemPrompt(tempPrompt);
        setSaveStatus('Tersimpan!');
        setTimeout(() => setSaveStatus(''), 2000);
    };

    const handleReset = () => {
        setTempPrompt(DEFAULT_SYSTEM_PROMPT);
    }

    return (
        <div className="w-full">
            <h1 className={`text-3xl sm:text-4xl font-bold ${themeClasses.titleText} mb-8`}>Pengaturan</h1>
            <div className={`max-w-3xl p-8 rounded-2xl shadow-lg border ${themeClasses.cardBg}`}>
                <div className="space-y-8">
                    <div>
                        <label htmlFor="system-prompt-input" className={`block text-lg font-medium ${themeClasses.labelText} mb-2`}>System Prompt</label>
                        <textarea
                            id="system-prompt-input"
                            value={tempPrompt}
                            onChange={(e) => setTempPrompt(e.target.value)}
                            rows="8"
                            className={`w-full p-3 rounded-lg text-sm leading-relaxed ${themeClasses.inputBg} ${themeClasses.inputFocus}`}
                        />
                        <div className="mt-4 flex justify-end items-center gap-4">
                            <button onClick={handleReset} className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${themeClasses.buttonSecondary}`}>
                                Reset ke Default
                            </button>
                            {saveStatus && <span className="text-rose-500 text-sm italic">{saveStatus}</span>}
                            <button onClick={handleSave} className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors shadow-lg ${themeClasses.buttonPrimary}`}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavButton = ({ page, label, icon, themeClasses, currentPage, setCurrentPage, setIsNavVisible }) => (
    <button
        onClick={() => {
            setCurrentPage(page);
            setIsNavVisible(false);
        }}
        className={`flex items-center w-full text-left p-3 rounded-lg font-semibold transition-colors ${currentPage === page ? themeClasses.dropdownActive : themeClasses.dropdownItem}`}
    >
        {icon}
        <span className="ml-3">{label}</span>
    </button>
);


// --- Main App Component ---
export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState('generate');
  const [numberOfFoods, setNumberOfFoods] = useState('');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [background, setBackground] = useState(backgroundOptions[0]);
  const [lighting, setLighting] = useState(lightingOptions[0]);
  const [aspectRatio, setAspectRatio] = useState(aspectRatioOptions[0]);
  const [composition, setComposition] = useState(compositionOptions[0]);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [displayPrompt, setDisplayPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [promptError, setPromptError] = useState('');

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const handleFoodSelectionChange = (index, newFood) => {
    const newSelection = [...selectedFoods];
    const existingIndex = newSelection.indexOf(newFood);
    if (newFood && existingIndex !== -1 && existingIndex !== index) {
      const oldFoodInCurrentDropdown = newSelection[index];
      newSelection[existingIndex] = oldFoodInCurrentDropdown;
    }
    newSelection[index] = newFood;
    setSelectedFoods(newSelection);
  };
  
  const handleCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = displayPrompt;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const potentialPrompt = useMemo(() => {
    const activeFoods = selectedFoods.filter(food => food && food !== '');
    const foodDescriptions = activeFoods.length > 0 ? activeFoods.map(food => `- ${food}: ${foodData[food]}`).join('\n') : '- [Pilih makanan untuk melihat deskripsi]';
    const foodList = activeFoods.length > 0 ? activeFoods.join(', ') : '[pilih makanan]';
    const finalAspectRatio = aspectRatio.split(' ')[0];
    const userRequestPrompt = `Generate a hyper-realistic food photo featuring ${foodList}, beautifully arranged on a ${background}.\n\nEach dish must be highly detailed and authentic to its Indonesian origin:\n${foodDescriptions}\n\nUse ${lighting} to bring out natural textures, steam, and gloss of the dishes.\nDo not include any text, logos, or watermarks.\n\nStyle: Hyper-realistic food photography\nCamera: DSLR, 35mm lens, f/4.0\nComposition: ${composition}\nAspect ratio: ${finalAspectRatio}\nResolution: 6K\nUsage: Food showcase, culinary blog, or social media visual`;
    return `${systemPrompt}\n\n--- USER REQUEST ---\n\n${userRequestPrompt}`;
  }, [selectedFoods, background, lighting, aspectRatio, composition, systemPrompt]);
  
  const handleGenerateClick = () => {
    if (!numberOfFoods || numberOfFoods === '') {
        setPromptError('Silakan pilih jumlah makanan terlebih dahulu.');
        return;
    }
    const activeFoods = selectedFoods.filter(food => food && food !== '');
    if (activeFoods.length !== Number(numberOfFoods)) {
        setPromptError('Silakan lengkapi semua pilihan makanan.');
        return;
    }
    
    setPromptError('');
    setDisplayPrompt(potentialPrompt);
  };

  useEffect(() => {
    const num = Number(numberOfFoods);
    if (num > 0) {
      setSelectedFoods(currentFoods => {
        const currentValidFoods = currentFoods.filter(Boolean);
        const newSelection = new Array(num).fill('');
        for (let i = 0; i < Math.min(num, currentValidFoods.length); i++) {
          newSelection[i] = currentValidFoods[i];
        }
        return newSelection;
      });
    } else {
        setSelectedFoods([]);
    }
  }, [numberOfFoods]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  const themeClasses = {
    mainBg: theme === 'dark' ? 'bg-slate-900 text-slate-300' : 'bg-sky-50 text-slate-700',
    headerBg: theme === 'dark' ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-200',
    headerText: theme === 'dark' ? 'text-slate-300' : 'text-slate-600',
    iconHover: theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200',
    dropdownBg: theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200',
    dropdownItem: theme === 'dark' ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    dropdownActive: theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-rose-500 text-white',
    cardBg: theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200',
    cardBorder: theme === 'dark' ? 'border-slate-700' : 'border-slate-200',
    titleText: theme === 'dark' ? 'text-white' : 'text-slate-900',
    subtitleText: theme === 'dark' ? 'text-slate-400' : 'text-slate-500',
    labelText: theme === 'dark' ? 'text-slate-300' : 'text-slate-600',
    inputBg: theme === 'dark' ? 'bg-slate-700/50 border-slate-600 placeholder-slate-400' : 'bg-slate-100 border-slate-300 placeholder-slate-400',
    inputFocus: 'focus:ring-2 focus:ring-indigo-500',
    buttonPrimary: theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-rose-500 hover:bg-rose-600 text-white',
    buttonSecondary: theme === 'dark' ? 'bg-slate-600 hover:bg-slate-500 text-slate-200' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${themeClasses.mainBg}`}>
      <header className={`backdrop-blur-sm p-4 border-b flex justify-between items-center sticky top-0 z-20 ${themeClasses.headerBg}`}>
          <div className={`font-bold text-xl ${themeClasses.titleText}`}>
              Pasanaktidur
          </div>
          <div className="flex items-center gap-4">
            <a href="http://lynk.id/pasanaktidur/s/re2yoep3v6r0" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full ${themeClasses.iconHover}`}>
                <CoffeeIcon />
            </a>
            <button onClick={toggleTheme} className={`p-2 rounded-full ${themeClasses.iconHover}`}>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <div className="relative">
              <button onClick={() => setIsNavVisible(!isNavVisible)} className={`p-2 rounded-full ${themeClasses.iconHover}`}>
                  <UserIcon />
              </button>
              <div className={`absolute top-full right-0 mt-2 w-64 border rounded-xl shadow-lg p-4 transition-all duration-300 ${themeClasses.dropdownBg} ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <nav className="flex flex-col gap-2">
                    <NavButton page="generate" label="Generator" icon={<GeneratorIcon />} themeClasses={themeClasses} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsNavVisible={setIsNavVisible}/>
                    <NavButton page="setting" label="Settings" icon={<SettingsIcon />} themeClasses={themeClasses} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsNavVisible={setIsNavVisible}/>
                </nav>
              </div>
            </div>
          </div>
      </header>
      
      <main className="p-4 sm:p-8">
        {currentPage === 'generate' ? 
          <GeneratePage 
            themeClasses={themeClasses} 
            numberOfFoods={numberOfFoods}
            setNumberOfFoods={setNumberOfFoods}
            selectedFoods={selectedFoods}
            setSelectedFoods={setSelectedFoods}
            handleFoodSelectionChange={handleFoodSelectionChange}
            composition={composition}
            setComposition={setComposition}
            background={background}
            setBackground={setBackground}
            lighting={lighting}
            setLighting={setLighting}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            handleGenerateClick={handleGenerateClick}
            displayPrompt={displayPrompt}
            handleCopy={handleCopy}
            isCopied={isCopied}
            promptError={promptError}
          />
        : 
          <SettingPage 
            systemPrompt={systemPrompt} 
            setSystemPrompt={setSystemPrompt} 
            themeClasses={themeClasses} 
          />
        }
      </main>
    </div>
  );
}
