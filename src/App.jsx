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
const CoffeeIcon = () => (<svg fill="#000000" viewBox="0 0 24 24" id="coffee-left-2" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M4,10a62.37,62.37,0,0,0,.84,10.35,2,2,0,0,0,2,1.63h6.38a2,2,0,0,0,2-1.62c.13-.75.32-1.92.48-3.51l1.9-.47a3.25,3.25,0,0,0-.79-6.4H16a2,2,0,0,0-.58-1.41A2,2,0,0,0,14,8H6a2,2,0,0,0-2,2Zm11.81,4.75c.06-.85.11-1.76.15-2.77h.79a1.25,1.25,0,0,1,.31,2.46Z" style="fill: #000000;"></path><path id="secondary" d="M5,5V3A1,1,0,0,1,7,3V5A1,1,0,0,1,5,5ZM9,5V3a1,1,0,0,1,2,0V5A1,1,0,0,1,9,5Zm4,0V3a1,1,0,0,1,2,0V5a1,1,0,0,1-2,0Z" style="fill: #2ca9bc;"></path></g></svg>);
const MoonIcon = () => (<svg height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#FFD500;" d="M219.793,256c0-106.304,77.081-194.595,178.399-212.056c-36.48-21.438-78.971-33.745-124.344-33.745 C138.096,10.199,28.048,120.248,28.048,256s110.048,245.801,245.801,245.801c45.372,0,87.863-12.307,124.344-33.745 C296.874,450.595,219.793,362.304,219.793,256z"></path> <g> <path style="fill:#3D3D3D;" d="M399.924,458.005C301.459,441.035,229.992,356.08,229.992,256S301.459,70.965,399.924,53.995 c4.218-0.727,7.534-4.011,8.302-8.223c0.768-4.211-1.176-8.453-4.866-10.622C364.227,12.155,319.443,0,273.849,0 C205.468,0,141.181,26.628,92.83,74.981C44.477,123.333,17.849,187.619,17.849,256S44.477,388.667,92.83,437.019 C141.181,485.372,205.468,512,273.849,512c45.595,0,90.378-12.155,129.511-35.151c3.69-2.169,5.634-6.411,4.866-10.622 C407.457,462.016,404.142,458.732,399.924,458.005z M273.849,491.602c-129.911,0-235.602-105.69-235.602-235.602 S143.937,20.398,273.849,20.398c32.902,0,65.338,6.873,95.167,20.039c-40.885,12.529-77.747,36.647-105.786,69.61 C228.643,150.71,209.594,202.543,209.594,256s19.049,105.29,53.636,145.953c28.039,32.963,64.902,57.081,105.786,69.61 C339.187,484.728,306.75,491.602,273.849,491.602z"></path> <path style="fill:#3D3D3D;" d="M77.402,268.615c-0.264-4.17-0.398-8.415-0.398-12.615c0-5.632-4.567-10.199-10.199-10.199 S56.606,250.368,56.606,256c0,4.627,0.148,9.305,0.438,13.903c0.342,5.402,4.829,9.556,10.17,9.556c0.216,0,0.434-0.007,0.654-0.02 C73.487,279.083,77.756,274.238,77.402,268.615z"></path> <path style="fill:#3D3D3D;" d="M163.315,418.906c-32.255-21.931-57.072-52.536-71.769-88.507c-2.13-5.214-8.08-7.714-13.299-5.584 c-5.214,2.131-7.714,8.085-5.584,13.299c16.218,39.696,43.599,73.466,79.182,97.66c1.756,1.194,3.751,1.765,5.726,1.765 c3.263,0,6.47-1.564,8.443-4.465C169.181,428.417,167.972,422.073,163.315,418.906z"></path> <path style="fill:#3D3D3D;" d="M453.355,253.96v-16.319h16.319c5.632,0,10.199-4.567,10.199-10.199 c0-5.632-4.567-10.199-10.199-10.199h-16.319v-16.319c0-5.632-4.567-10.199-10.199-10.199c-5.632,0-10.199,4.567-10.199,10.199 v16.319h-16.319c-5.632,0-10.199,4.567-10.199,10.199c0,5.632,4.567,10.199,10.199,10.199h16.319v16.319 c0,5.632,4.567,10.199,10.199,10.199C448.787,264.159,453.355,259.592,453.355,253.96z"></path> <path style="fill:#3D3D3D;" d="M351.873,351.873c5.632,0,10.199-4.567,10.199-10.199v-10.709h10.709 c5.632,0,10.199-4.567,10.199-10.199c0-5.632-4.567-10.199-10.199-10.199h-10.709v-10.709c0-5.632-4.567-10.199-10.199-10.199 c-5.632,0-10.199,4.567-10.199,10.199v10.709h-10.709c-5.632,0-10.199,4.567-10.199,10.199c0,5.632,4.567,10.199,10.199,10.199 h10.709v10.709C341.673,347.305,346.241,351.873,351.873,351.873z"></path> <path style="fill:#3D3D3D;" d="M483.952,357.992h-5.1v-5.1c0-5.632-4.567-10.199-10.199-10.199 c-5.632,0-10.199,4.567-10.199,10.199v5.1h-5.1c-5.632,0-10.199,4.567-10.199,10.199c0,5.632,4.567,10.199,10.199,10.199h5.1v5.1 c0,5.632,4.567,10.199,10.199,10.199c5.632,0,10.199-4.567,10.199-10.199v-5.1h5.1c5.632,0,10.199-4.567,10.199-10.199 C494.151,362.559,489.584,357.992,483.952,357.992z"></path> </g> </g></svg>);
const SunIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M7 12a5 5 0 1 1 5 5 5 5 0 0 1-5-5zm5-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1zm-1 15v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-2 0zm10-9h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zM3 13h1a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zm14.657-5.657a1 1 0 0 0 .707-.293l.707-.707a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 0 0 .707 1.707zM5.636 16.95l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 0 0-1.414-1.414zm11.314 0a1 1 0 0 0 0 1.414l.707.707a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 0zM5.636 7.05A1 1 0 0 0 7.05 5.636l-.707-.707a1 1 0 0 0-1.414 1.414z"/></svg>);
const SettingsIcon = () => (<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M32.38 28.521C31.6284 28.523 30.8943 28.7478 30.2705 29.167C29.6467 29.5862 29.1612 30.181 28.8755 30.8761C28.5897 31.5712 28.5164 32.3354 28.665 33.0722C28.8135 33.8089 29.1772 34.485 29.7101 35.0151C30.2429 35.5451 30.921 35.9052 31.6585 36.0499C32.396 36.1946 33.1598 36.1174 33.8534 35.8279C34.547 35.5385 35.1392 35.0499 35.5551 34.4239C35.971 33.7979 36.192 33.0626 36.19 32.311C36.1895 31.8118 36.0904 31.3175 35.8985 30.8566C35.7066 30.3958 35.4256 29.9773 35.0717 29.6252C34.7177 29.2731 34.2978 28.9943 33.8359 28.8048C33.374 28.6154 32.8792 28.5189 32.38 28.521Z" fill="#000000"></path> <path d="M55.53 36.9271L51.67 33.2171C51.68 32.9071 51.69 32.6071 51.69 32.3071C51.69 32.0071 51.68 31.7071 51.67 31.3871L55.53 27.6471C56.3076 26.8975 56.811 25.9086 56.9597 24.8388C57.1084 23.7691 56.8937 22.6804 56.35 21.7471L53.5 16.7971C52.9606 15.8579 52.1209 15.1273 51.1161 14.7228C50.1113 14.3183 48.9997 14.2635 47.96 14.5671L42.81 16.0671C42.3 15.7371 41.77 15.4271 41.23 15.1471L39.92 9.94712C39.6643 8.89465 39.0615 7.95906 38.2087 7.29136C37.356 6.62366 36.3031 6.26283 35.22 6.26713H29.51C28.4264 6.26638 27.3739 6.62977 26.5215 7.29894C25.6692 7.96812 25.0664 8.90426 24.81 9.95711L23.52 15.1471C22.98 15.4271 22.45 15.7371 21.94 16.0671L16.77 14.5871C15.7319 14.2901 14.6243 14.3493 13.6237 14.7553C12.6232 15.1613 11.7875 15.8907 11.25 16.8271L8.38 21.7871C7.84427 22.7265 7.63698 23.8176 7.79092 24.888C7.94486 25.9583 8.45127 26.9468 9.23001 27.6971L13.1 31.4071C13.08 31.7171 13.07 32.0071 13.07 32.3071C13.07 32.6071 13.08 32.9271 13.1 33.2371L9.23999 36.9671C8.45974 37.7148 7.95367 38.7032 7.80313 39.7734C7.65258 40.8435 7.86633 41.9332 8.41 42.8671L11.26 47.8271C11.8003 48.7652 12.6405 49.4943 13.6454 49.8969C14.6503 50.2996 15.7614 50.3525 16.8 50.0471L21.96 48.5571C22.4695 48.8892 22.997 49.193 23.54 49.4671L24.84 54.6871C25.1011 55.735 25.706 56.6651 26.5581 57.3286C27.4101 57.9921 28.4601 58.3507 29.54 58.3471H35.25C36.3335 58.3487 37.3863 57.9871 38.2401 57.32C39.0939 56.6529 39.6995 55.7188 39.96 54.6671L41.24 49.4671C41.7831 49.1896 42.3106 48.8825 42.82 48.5471L47.99 50.0271C49.0295 50.3265 50.1393 50.2684 51.1419 49.8623C52.1445 49.4562 52.9819 48.7255 53.52 47.7871L56.38 42.8371C56.9199 41.8989 57.1296 40.8068 56.9755 39.7354C56.8214 38.6639 56.3124 37.6751 55.53 36.9271ZM40.19 32.3071C40.192 33.8498 39.7364 35.3584 38.881 36.6423C38.0256 37.9261 36.8087 38.9273 35.3841 39.5195C33.9596 40.1117 32.3915 40.2682 30.8781 39.9692C29.3647 39.6702 27.9739 38.9291 26.8816 37.8396C25.7894 36.7502 25.0447 35.3613 24.7418 33.8486C24.4389 32.336 24.5914 30.7674 25.1799 29.3414C25.7685 27.9154 26.7666 26.6959 28.0482 25.8372C29.3298 24.9785 30.8373 24.5191 32.38 24.5171C34.4482 24.5182 36.4317 25.3392 37.8957 26.8001C39.3597 28.2611 40.1847 30.2429 40.19 32.3111V32.3071Z" fill="#999999"></path> </g></svg>);
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
