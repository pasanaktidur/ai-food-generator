import React, { useState, useMemo, useCallback, useEffect } from 'react';

// --- Data & Descriptions (Expanded List) ---
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
  'Nasi Uduk': 'Fragrant coconut rice from Jakarta, cooked with coconut milk and lemongrass, served with fried chicken, tempeh, and sambal',
  'Ayam Geprek': 'smashed fried chicken with a fiery chili sambal, served with rice and fresh cucumber slices',
  'Soto Mie Bogor': 'a flavorful beef broth soup from Bogor, filled with yellow noodles, beef slices, risol (spring roll), tomato, and celery',
  'Tahu Tek': 'a Surabaya dish of fried tofu, rice cake, and bean sprouts, all covered in a savory black petis (shrimp paste) and peanut sauce',
  'Seblak': 'a spicy and savory Sundanese dish made of wet krupuk cooked with sources of protein (egg, chicken, or seafood) in a spicy sauce',
  'Nasi Tutug Oncom': 'a Sundanese dish of rice mixed with roasted oncom, served with fried chicken, sambal, and fresh vegetables (lalapan)',
  'Lontong Kupang': 'a specialty from East Java, featuring small clams (kupang) served with rice cakes (lontong) and a sweet, savory petis-based sauce',
  'Sop Konro': 'a spicy and rich beef rib soup from Makassar, with a dark, flavorful broth made from kluwek and various spices',
  'Pallu Basa': 'a creamy and savory beef and offal soup from Makassar, with a broth enriched with roasted grated coconut',
  'Kue Cubit': 'a popular Indonesian small pancake, typically half-cooked and gooey, often topped with chocolate sprinkles or cheese',
  'Asinan Bogor': 'a pickled tropical fruit salad from Bogor, West Java, with a sweet, sour, and spicy vinegar and chili dressing',
  'Sate Taichan': 'plain grilled chicken skewers served with a fiery sambal and a squeeze of lime, without peanut or soy sauce',
  'Nasi Liwet': 'savory rice cooked with coconut milk and chicken broth, served with shredded chicken, omelette, and areh (thickened coconut milk)',
  'Tahu Campur': 'a beef and tofu soup from East Java, with yellow noodles, bean sprouts, and a savory petis-based broth',
  'Lontong Kari': 'rice cakes in a rich and aromatic chicken curry soup, topped with shredded chicken, boiled egg, and fried shallots',
  'Sop Saudara': 'a spicy beef and offal soup from Makassar, with a rich broth, perkedel (potato fritter), and rice vermicelli',
  'Pallu Butung': 'a sweet Makassar dessert of sliced banana in a thick, creamy rice flour and coconut milk porridge, served with a red syrup',
  'Kue Putu': 'steamed green rice flour cakes filled with palm sugar, coated with grated coconut',
  'Es Cendol': 'a sweet iced dessert with green rice flour jellies, coconut milk, and palm sugar syrup',
  'Es Doger': 'a pink-colored shaved ice dessert with fermented black glutinous rice, tapioca pearls, and condensed milk',
  'Bajigur': 'a hot and sweet Sundanese drink made from coconut milk, palm sugar, ginger, and pandan leaves'
};

// --- Options for UI Controls ---
const foodOptions = Object.keys(foodData);
const backgroundOptions = ['Rustic wooden table', 'Batik tablecloth', 'Green banana leaf base', 'Clean white studio table'];
const lightingOptions = ['Natural soft daylight from the left', 'Golden hour light with long shadows', 'Bright overhead studio lighting', 'Dramatic single-source side light'];
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
const CoffeeIcon = () => (<svg fill="#000000" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.996 511.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M431.571,229.096c-2.968,0-5.279,0.174-8.827,0.49v35.628h0.004c0,0.076,0.04,0.151,0.039,0.228 c2.843-0.566,5.802-0.869,8.809-0.869c24.76,0,44.914,20.143,44.914,44.904s-20.139,44.903-44.899,44.903 c-9.524,0-18.354-2.988-25.628-8.064c-4.214,9.709-9.165,19.13-14.894,28.155c-0.671,1.057-1.375,2.087-2.065,3.13 c12.358,7.754,26.955,12.258,42.59,12.258c44.323,0,80.382-36.059,80.382-80.382S475.894,229.096,431.571,229.096z"></path> </g> </g> <g> <g> <path d="M444.057,417.622h-89.983h-39.435c51.954-31.93,84.457-90.187,84.457-152.409v-61.642H62.054v61.642 c0,62.223,33.15,120.479,85.104,152.409h-39.434H17.739C7.942,417.622,0,425.564,0,435.361S7.942,453.1,17.739,453.1h38.373 h24.177c4.641,17.739,20.272,29.565,38.8,29.565h223.512c18.527,0,34.16-11.826,38.8-29.565h24.177h38.478 c9.797,0,17.739-7.942,17.739-17.739S453.854,417.622,444.057,417.622z"></path> </g> </g> <g> <g> <path d="M177.756,148.643l-8.7-6.992c-3.355-2.696-5.246-6.71-5.188-11.014c0.058-4.303,2.057-8.265,5.484-10.869 c12.012-9.13,19.112-23.016,19.48-38.1s-6.047-29.299-17.599-39.003c-7.501-6.301-18.691-5.328-24.993,2.174 c-6.301,7.501-5.328,18.691,2.174,24.993c4.45,3.737,5.012,8.478,4.952,10.972c-0.06,2.493-0.854,7.201-5.48,10.718 c-12.18,9.256-19.285,23.338-19.49,38.635c-0.207,15.297,6.513,29.566,18.439,39.15l8.7,6.992 c3.277,2.633,7.201,3.912,11.101,3.912c5.19,0,10.335-2.267,13.839-6.627C186.609,165.946,185.393,154.781,177.756,148.643z"></path> </g> </g> <g> <g> <path d="M251.423,157.823l-10.205-8.2c-4.675-3.757-7.31-9.351-7.228-15.348c0.08-5.997,2.867-11.517,7.641-15.147 c13.342-10.14,21.229-25.564,21.637-42.317s-6.716-32.544-19.547-43.322c-7.501-6.302-18.692-5.329-24.992,2.172 c-6.302,7.501-5.329,18.691,2.172,24.992c4.529,3.804,7.045,9.378,6.899,15.291c-0.144,5.913-2.928,11.358-7.637,14.936 c-13.528,10.28-21.419,25.922-21.649,42.913c-0.231,16.99,7.234,32.84,20.479,43.483l3.807,3.058l6.398,5.142 c3.278,2.632,7.203,3.912,11.102,3.912c5.19,0,10.335-2.267,13.839-6.627c0.621-0.773,1.147-1.589,1.618-2.426 C259.943,172.909,258.287,163.338,251.423,157.823z"></path> </g> </g> <g> <g> <path d="M322.319,148.643l-8.7-6.992c-3.355-2.696-5.246-6.71-5.188-11.014c0.058-4.303,2.057-8.265,5.484-10.869 c12.012-9.13,19.112-23.016,19.48-38.1c0.368-15.084-6.047-29.299-17.599-39.003c-7.502-6.301-18.692-5.328-24.993,2.174 c-6.301,7.501-5.328,18.691,2.174,24.993c4.45,3.737,5.012,8.478,4.952,10.972c-0.061,2.493-0.854,7.201-5.48,10.718 c-12.18,9.256-19.285,23.338-19.49,38.635c-0.207,15.297,6.513,29.566,18.439,39.15l8.7,6.992 c3.277,2.633,7.201,3.912,11.101,3.912c5.19,0,10.335-2.267,13.839-6.627C331.172,165.946,329.956,154.781,322.319,148.643z"></path> </g> </g> </g></svg>);
const MoonIcon = () => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 6V3M18.5 12V7M14.5 4.5H11.5M21 9.5H16M15.5548 16.8151C16.7829 16.8151 17.9493 16.5506 19 16.0754C17.6867 18.9794 14.7642 21 11.3698 21C6.74731 21 3 17.2527 3 12.6302C3 9.23576 5.02061 6.31331 7.92462 5C7.44944 6.05072 7.18492 7.21708 7.18492 8.44523C7.18492 13.0678 10.9322 16.8151 15.5548 16.8151Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>);
const SunIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M7 12a5 5 0 1 1 5 5 5 5 0 0 1-5-5zm5-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1zm-1 15v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-2 0zm10-9h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zM3 13h1a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zm14.657-5.657a1 1 0 0 0 .707-.293l.707-.707a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 0 0 .707 1.707zM5.636 16.95l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 0 0-1.414-1.414zm11.314 0a1 1 0 0 0 0 1.414l.707.707a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 0zM5.636 7.05A1 1 0 0 0 7.05 5.636l-.707-.707a1 1 0 0 0-1.414 1.414z"/></svg>);
const SettingsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<linearGradient id="L4rKfs~Qrm~k0Pk8MRsoza_s5NUIabJrb4C_gr1" x1="32.012" x2="15.881" y1="32.012" y2="15.881" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset=".242" stop-color="#f2f2f2"></stop><stop offset="1" stop-color="#ccc"></stop></linearGradient><circle cx="24" cy="24" r="11.5" fill="url(#L4rKfs~Qrm~k0Pk8MRsoza_s5NUIabJrb4C_gr1)"></circle><linearGradient id="L4rKfs~Qrm~k0Pk8MRsozb_s5NUIabJrb4C_gr2" x1="17.45" x2="28.94" y1="17.45" y2="28.94" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0d61a9"></stop><stop offset=".363" stop-color="#0e5fa4"></stop><stop offset=".78" stop-color="#135796"></stop><stop offset="1" stop-color="#16528c"></stop></linearGradient><circle cx="24" cy="24" r="7" fill="url(#L4rKfs~Qrm~k0Pk8MRsozb_s5NUIabJrb4C_gr2)"></circle><linearGradient id="L4rKfs~Qrm~k0Pk8MRsozc_s5NUIabJrb4C_gr3" x1="5.326" x2="38.082" y1="5.344" y2="38.099" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#889097"></stop><stop offset=".331" stop-color="#848c94"></stop><stop offset=".669" stop-color="#78828b"></stop><stop offset="1" stop-color="#64717c"></stop></linearGradient><path fill="url(#L4rKfs~Qrm~k0Pk8MRsozc_s5NUIabJrb4C_gr3)" d="M43.407,19.243c-2.389-0.029-4.702-1.274-5.983-3.493c-1.233-2.136-1.208-4.649-0.162-6.693 c-2.125-1.887-4.642-3.339-7.43-4.188C28.577,6.756,26.435,8,24,8s-4.577-1.244-5.831-3.131c-2.788,0.849-5.305,2.301-7.43,4.188 c1.046,2.044,1.071,4.557-0.162,6.693c-1.281,2.219-3.594,3.464-5.983,3.493C4.22,20.77,4,22.358,4,24 c0,1.284,0.133,2.535,0.364,3.752c2.469-0.051,4.891,1.208,6.213,3.498c1.368,2.37,1.187,5.204-0.22,7.345 c2.082,1.947,4.573,3.456,7.34,4.375C18.827,40.624,21.221,39,24,39s5.173,1.624,6.303,3.971c2.767-0.919,5.258-2.428,7.34-4.375 c-1.407-2.141-1.588-4.975-0.22-7.345c1.322-2.29,3.743-3.549,6.213-3.498C43.867,26.535,44,25.284,44,24 C44,22.358,43.78,20.77,43.407,19.243z M24,34.5c-5.799,0-10.5-4.701-10.5-10.5c0-5.799,4.701-10.5,10.5-10.5S34.5,18.201,34.5,24 C34.5,29.799,29.799,34.5,24,34.5z"></path>
</svg>);
const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const ThreadsIcon = () => (<svg aria-label="Threads" className="h-6 w-6" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path></svg>);

// --- Settings Modal Component ---
const SettingsModal = ({ isOpen, onClose, systemPrompt, setSystemPrompt, themeClasses }) => {
    if (!isOpen) return null;
    
    const [tempPrompt, setTempPrompt] = useState(systemPrompt);
    const [saveStatus, setSaveStatus] = useState('');

    const handleSave = () => {
        setSystemPrompt(tempPrompt);
        setSaveStatus('Tersimpan!');
        setTimeout(() => {
            setSaveStatus('');
            onClose();
        }, 500);
    };

    const handleReset = () => {
        setTempPrompt(DEFAULT_SYSTEM_PROMPT);
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-30 flex justify-center items-center p-4" onClick={onClose}>
            <div className={`w-full max-w-2xl p-6 sm:p-8 rounded-2xl shadow-lg border ${themeClasses.cardBg}`} onClick={e => e.stopPropagation()}>
                <h1 className={`text-2xl font-bold ${themeClasses.titleText} mb-6`}>Pengaturan</h1>
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
                        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <button onClick={handleReset} className={`w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${themeClasses.buttonSecondary}`}>
                                Reset ke Default
                            </button>
                           <div className="flex items-center gap-4">
                               {saveStatus && <span className="text-rose-500 text-sm italic">{saveStatus}</span>}
                               <button onClick={handleSave} className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors shadow-lg ${themeClasses.buttonPrimary}`}>
                                    Save Changes
                               </button>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
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
    iconHover: theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200',
    cardBg: theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200',
    cardBorder: theme === 'dark' ? 'border-slate-700' : 'border-slate-200',
    titleText: theme === 'dark' ? 'text-white' : 'text-slate-900',
    subtitleText: theme === 'dark' ? 'text-slate-400' : 'text-slate-500',
    labelText: theme === 'dark' ? 'text-slate-300' : 'text-slate-600',
    inputBg: theme === 'dark' ? 'bg-slate-700/50 border-slate-600 placeholder-slate-400' : 'bg-slate-100 border-slate-300 placeholder-slate-400',
    inputFocus: 'focus:ring-2 focus:ring-indigo-500',
    buttonPrimary: theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-rose-500 hover:bg-rose-600 text-white',
    buttonSecondary: theme === 'dark' ? 'bg-slate-600 hover:bg-slate-500 text-slate-200' : 'bg-slate-200 hover:bg-slate-300 text-slate-700',
    footerText: theme === 'dark' ? 'text-slate-400' : 'text-slate-500',
    footerLink: theme === 'dark' ? 'hover:text-indigo-400' : 'hover:text-rose-600'
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 flex flex-col ${themeClasses.mainBg}`}>
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
            <button onClick={() => setIsSettingsModalOpen(true)} className={`p-2 rounded-full ${themeClasses.iconHover}`}>
                <SettingsIcon />
            </button>
          </div>
      </header>
      
      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        systemPrompt={systemPrompt}
        setSystemPrompt={setSystemPrompt}
        themeClasses={themeClasses}
      />
      
      <main className="p-4 sm:p-8 flex-grow">
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
                            </div>
                            <div>
                              <label htmlFor="lighting-select" className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}>Pencahayaan</label>
                              <select id="lighting-select" value={lighting} onChange={e => setLighting(e.target.value)} className={`w-full p-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputFocus}`}>{lightingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
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
                                {isCopied ? <path d="M20 6 9 17l-5-5"/> : <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></>}
                            </svg>
                            {isCopied ? 'Tersalin!' : 'Salin Prompt'}
                        </button>
                    )}
                </div>
            </div>
        </div>
      </main>
      <footer className={`p-6 border-t ${themeClasses.cardBorder} ${themeClasses.mainBg}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p className={themeClasses.subtitleText}>© 2025 Pasanaktidur</p>
            <div className={`flex items-center gap-4 ${themeClasses.subtitleText}`}>
                <a href="https://www.instagram.com/pasanaktidur" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full ${themeClasses.iconHover}`}><InstagramIcon /></a>
                <a href="https://www.threads.net/@pasanaktidur" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full ${themeClasses.iconHover}`}><ThreadsIcon /></a>
            </div>
        </div>
      </footer>
    </div>
  );
}
