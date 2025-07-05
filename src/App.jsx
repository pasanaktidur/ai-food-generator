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
const CoffeeIcon = () => (<svg fill="#000000" height="32px" width="32px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.996 511.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M431.571,229.096c-2.968,0-5.279,0.174-8.827,0.49v35.628h0.004c0,0.076,0.04,0.151,0.039,0.228 c2.843-0.566,5.802-0.869,8.809-0.869c24.76,0,44.914,20.143,44.914,44.904s-20.139,44.903-44.899,44.903 c-9.524,0-18.354-2.988-25.628-8.064c-4.214,9.709-9.165,19.13-14.894,28.155c-0.671,1.057-1.375,2.087-2.065,3.13 c12.358,7.754,26.955,12.258,42.59,12.258c44.323,0,80.382-36.059,80.382-80.382S475.894,229.096,431.571,229.096z"></path> </g> </g> <g> <g> <path d="M444.057,417.622h-89.983h-39.435c51.954-31.93,84.457-90.187,84.457-152.409v-61.642H62.054v61.642 c0,62.223,33.15,120.479,85.104,152.409h-39.434H17.739C7.942,417.622,0,425.564,0,435.361S7.942,453.1,17.739,453.1h38.373 h24.177c4.641,17.739,20.272,29.565,38.8,29.565h223.512c18.527,0,34.16-11.826,38.8-29.565h24.177h38.478 c9.797,0,17.739-7.942,17.739-17.739S453.854,417.622,444.057,417.622z"></path> </g> </g> <g> <g> <path d="M177.756,148.643l-8.7-6.992c-3.355-2.696-5.246-6.71-5.188-11.014c0.058-4.303,2.057-8.265,5.484-10.869 c12.012-9.13,19.112-23.016,19.48-38.1s-6.047-29.299-17.599-39.003c-7.501-6.301-18.691-5.328-24.993,2.174 c-6.301,7.501-5.328,18.691,2.174,24.993c4.45,3.737,5.012,8.478,4.952,10.972c-0.06,2.493-0.854,7.201-5.48,10.718 c-12.18,9.256-19.285,23.338-19.49,38.635c-0.207,15.297,6.513,29.566,18.439,39.15l8.7,6.992 c3.277,2.633,7.201,3.912,11.101,3.912c5.19,0,10.335-2.267,13.839-6.627C186.609,165.946,185.393,154.781,177.756,148.643z"></path> </g> </g> <g> <g> <path d="M251.423,157.823l-10.205-8.2c-4.675-3.757-7.31-9.351-7.228-15.348c0.08-5.997,2.867-11.517,7.641-15.147 c13.342-10.14,21.229-25.564,21.637-42.317s-6.716-32.544-19.547-43.322c-7.501-6.302-18.692-5.329-24.992,2.172 c-6.302,7.501-5.329,18.691,2.172,24.992c4.529,3.804,7.045,9.378,6.899,15.291c-0.144,5.913-2.928,11.358-7.637,14.936 c-13.528,10.28-21.419,25.922-21.649,42.913c-0.231,16.99,7.234,32.84,20.479,43.483l3.807,3.058l6.398,5.142 c3.278,2.632,7.203,3.912,11.102,3.912c5.19,0,10.335-2.267,13.839-6.627c0.621-0.773,1.147-1.589,1.618-2.426 C259.943,172.909,258.287,163.338,251.423,157.823z"></path> </g> </g> <g> <g> <path d="M322.319,148.643l-8.7-6.992c-3.355-2.696-5.246-6.71-5.188-11.014c0.058-4.303,2.057-8.265,5.484-10.869 c12.012-9.13,19.112-23.016,19.48-38.1c0.368-15.084-6.047-29.299-17.599-39.003c-7.502-6.301-18.692-5.328-24.993,2.174 c-6.301,7.501-5.328,18.691,2.174,24.993c4.45,3.737,5.012,8.478,4.952,10.972c-0.061,2.493-0.854,7.201-5.48,10.718 c-12.18,9.256-19.285,23.338-19.49,38.635c-0.207,15.297,6.513,29.566,18.439,39.15l8.7,6.992 c3.277,2.633,7.201,3.912,11.101,3.912c5.19,0,10.335-2.267,13.839-6.627C331.172,165.946,329.956,154.781,322.319,148.643z"></path> </g> </g> </g></svg>);
const MoonIcon = () => (<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.9001 2.30719C19.7392 1.8976 19.1616 1.8976 19.0007 2.30719L18.5703 3.40247C18.5212 3.52752 18.4226 3.62651 18.298 3.67583L17.2067 4.1078C16.7986 4.26934 16.7986 4.849 17.2067 5.01054L18.298 5.44252C18.4226 5.49184 18.5212 5.59082 18.5703 5.71587L19.0007 6.81115C19.1616 7.22074 19.7392 7.22074 19.9001 6.81116L20.3305 5.71587C20.3796 5.59082 20.4782 5.49184 20.6028 5.44252L21.6941 5.01054C22.1022 4.849 22.1022 4.26934 21.6941 4.1078L20.6028 3.67583C20.4782 3.62651 20.3796 3.52752 20.3305 3.40247L19.9001 2.30719Z" fill="#1C274C"></path> <path d="M16.0328 8.12967C15.8718 7.72009 15.2943 7.72009 15.1333 8.12967L14.9764 8.52902C14.9273 8.65407 14.8287 8.75305 14.7041 8.80237L14.3062 8.95987C13.8981 9.12141 13.8981 9.70107 14.3062 9.86261L14.7041 10.0201C14.8287 10.0694 14.9273 10.1684 14.9764 10.2935L15.1333 10.6928C15.2943 11.1024 15.8718 11.1024 16.0328 10.6928L16.1897 10.2935C16.2388 10.1684 16.3374 10.0694 16.462 10.0201L16.8599 9.86261C17.268 9.70107 17.268 9.12141 16.8599 8.95987L16.462 8.80237C16.3374 8.75305 16.2388 8.65407 16.1897 8.52902L16.0328 8.12967Z" fill="#1C274C"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1C274C"></path> </g></svg>);
const SunIcon = () => (<svg width="32px" height="32px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#FFAC33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"></path><circle fill="#FFAC33" cx="18" cy="18" r="10"></circle></g></svg>);
const SettingsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
<linearGradient id="L4rKfs~Qrm~k0Pk8MRsoza_s5NUIabJrb4C_gr1" x1="32.012" x2="15.881" y1="32.012" y2="15.881" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset=".242" stop-color="#f2f2f2"></stop><stop offset="1" stop-color="#ccc"></stop></linearGradient><circle cx="24" cy="24" r="11.5" fill="url(#L4rKfs~Qrm~k0Pk8MRsoza_s5NUIabJrb4C_gr1)"></circle><linearGradient id="L4rKfs~Qrm~k0Pk8MRsozb_s5NUIabJrb4C_gr2" x1="17.45" x2="28.94" y1="17.45" y2="28.94" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0d61a9"></stop><stop offset=".363" stop-color="#0e5fa4"></stop><stop offset=".78" stop-color="#135796"></stop><stop offset="1" stop-color="#16528c"></stop></linearGradient><circle cx="24" cy="24" r="7" fill="url(#L4rKfs~Qrm~k0Pk8MRsozb_s5NUIabJrb4C_gr2)"></circle><linearGradient id="L4rKfs~Qrm~k0Pk8MRsozc_s5NUIabJrb4C_gr3" x1="5.326" x2="38.082" y1="5.344" y2="38.099" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#889097"></stop><stop offset=".331" stop-color="#848c94"></stop><stop offset=".669" stop-color="#78828b"></stop><stop offset="1" stop-color="#64717c"></stop></linearGradient><path fill="url(#L4rKfs~Qrm~k0Pk8MRsozc_s5NUIabJrb4C_gr3)" d="M43.407,19.243c-2.389-0.029-4.702-1.274-5.983-3.493c-1.233-2.136-1.208-4.649-0.162-6.693 c-2.125-1.887-4.642-3.339-7.43-4.188C28.577,6.756,26.435,8,24,8s-4.577-1.244-5.831-3.131c-2.788,0.849-5.305,2.301-7.43,4.188 c1.046,2.044,1.071,4.557-0.162,6.693c-1.281,2.219-3.594,3.464-5.983,3.493C4.22,20.77,4,22.358,4,24 c0,1.284,0.133,2.535,0.364,3.752c2.469-0.051,4.891,1.208,6.213,3.498c1.368,2.37,1.187,5.204-0.22,7.345 c2.082,1.947,4.573,3.456,7.34,4.375C18.827,40.624,21.221,39,24,39s5.173,1.624,6.303,3.971c2.767-0.919,5.258-2.428,7.34-4.375 c-1.407-2.141-1.588-4.975-0.22-7.345c1.322-2.29,3.743-3.549,6.213-3.498C43.867,26.535,44,25.284,44,24 C44,22.358,43.78,20.77,43.407,19.243z M24,34.5c-5.799,0-10.5-4.701-10.5-10.5c0-5.799,4.701-10.5,10.5-10.5S34.5,18.201,34.5,24 C34.5,29.799,29.799,34.5,24,34.5z"></path>
</svg>);
const InstagramIcon = () => (<svg width="32px" height="32px" viewBox="0 0 3364.7 3364.7" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><radialGradient id="0" cx="217.76" cy="3290.99" r="4271.92" gradientUnits="userSpaceOnUse"><stop offset=".09" stop-color="#fa8f21"></stop><stop offset=".78" stop-color="#d82d7e"></stop></radialGradient><radialGradient id="1" cx="2330.61" cy="3182.95" r="3759.33" gradientUnits="userSpaceOnUse"><stop offset=".64" stop-color="#8c3aaa" stop-opacity="0"></stop><stop offset="1" stop-color="#8c3aaa"></stop></radialGradient></defs><path d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9" fill="url(#0)"></path><path d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9" fill="url(#1)"></path><path d="M1269.25,1689.52c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7-416.6-186.59-416.6-416.7m-225.26,0c0,354.5,287.36,641.86,641.86,641.86s641.86-287.36,641.86-641.86-287.36-641.86-641.86-641.86S1044,1335,1044,1689.52m1159.13-667.31a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M1180.85,2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27S2059.13,666,2191,672c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M1170.5,447.09c-133.07,6.06-224,27.16-303.41,58.06-82.19,31.91-151.86,74.72-221.43,144.18S533.39,788.47,501.48,870.76c-30.9,79.46-52,170.34-58.06,303.41-6.16,133.28-7.57,175.89-7.57,515.35s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43s139.14,112.18,221.43,144.18c79.56,30.9,170.34,52,303.41,58.06,133.35,6.06,175.89,7.57,515.35,7.57s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2586.8,537.06,2504.71,505.15c-79.56-30.9-170.44-52.1-303.41-58.06C2068,441,2025.41,439.52,1686,439.52s-382.1,1.41-515.45,7.57" fill="#ffffff"></path></g></svg>);
const ThreadsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 724.2 724"><path d="M138.09,487.2c.9-54.09-1.69-121,1.31-187.95,1.55-34.62,9.85-67.16,31.25-95.49,28.23-37.4,65.76-58,112.09-63a282.23,282.23,0,0,1,28.58-2.06c127.33-.69,254.66-1.18,382,.2,43.93.48,84.21,12.36,117.13,43.6,34.91,33.12,49.46,74.7,50.14,121.58,1.91,131.17,2.21,262.36-.13,393.53-1.1,61.35-26,110.24-80.12,142.07-26.76,15.74-56.46,21.05-86.89,21.44-122.83,1.54-245.68.67-368.52.5a342.33,342.33,0,0,1-49.13-3.31c-73-10.64-125.71-64.71-134.49-137.85-2.43-20.22-3.14-40.49-3.18-60.82q-.08-39.89,0-79.79Z" transform="translate(-137.9 -138)"/><path d="M523,771c-63,0-105.56-7.6-144.5-29.84C329,712.91,298.06,669.57,282,615.9c-24.45-81.54-24.6-163.54,4.13-244,30.56-85.55,93.59-131.64,183.17-141.7,52-5.85,102.84-.5,150.35,22.95,59.5,29.36,94.09,79.08,112.69,141.34,1.33,4.47-.23,5.76-4.13,6.74-11.87,3-23.73,6.09-35.48,9.51-4.73,1.37-5.41-1.05-6.47-4.63a215.44,215.44,0,0,0-18.71-44.45c-21.21-37.82-52.81-62.86-94-75.39a236.79,236.79,0,0,0-134.44-1.59c-60.11,16.7-96.31,58-113.2,116.43-19.57,67.65-19.58,135.8,2,203.09C350.85,676,401.86,714,476,721.7c38.49,4,76.76,2.2,112.49-14.29,36.83-17,64.43-43,73.58-84.51,7.64-34.67-6.08-69.3-35-89.77-5.92-4.2-7-2.22-8,3.62-3.15,20-9.08,39-20.1,56.12-25.07,38.81-62.43,51.91-106.53,49.06-32.11-2.08-60.11-13.94-79.14-41.07-28.2-40.2-16.34-95.24,25.4-121.4,18.88-11.84,39.64-17.91,61.71-19.63,21.8-1.69,43.6-1.73,65.27,1.65,6.27,1,8.41.08,6.55-7.2-6.62-25.86-20.59-44.48-48-49.6-28.79-5.38-55.62-1.94-76.13,21.77-4,4.61-6.49,5.42-11.46,1.66-8.8-6.66-18-12.76-27.32-18.76-4.3-2.78-4.57-4.89-1.38-9.05,25.38-33.09,59.82-46.54,100.34-45.48,44.55,1.15,79.73,18.85,99.92,60.59,8,16.6,12.15,34.33,13.51,52.62.45,6,2.28,9.29,8.09,12,99.73,46.77,100.68,163.48,39.84,227C624.35,754.35,567.78,771.24,523,771Z" transform="translate(-137.9 -138)" fill="#fefefe"/><path d="M526.79,506.77c14.09-.39,28,1.51,41.87,3.49,4,.57,6.68,1.56,6,6.67-2.32,16.61-5.26,33-13.83,47.79-8,13.88-19.56,23.16-35.17,27-19.07,4.64-38,4.38-56-4.12-13.79-6.49-23.18-16.75-24-32.88-.84-16.33,7.07-27.94,20.52-36.13,14.75-9,31.36-10.86,48.14-11.75C518.43,506.58,522.61,506.77,526.79,506.77Z" transform="translate(-137.9 -138)"/></svg>);

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
