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
const CoffeeIcon = () => (<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 21C2 20.4477 2.44772 20 3 20H17C17.5523 20 18 20.4477 18 21C18 21.5523 17.5523 22 17 22H3C2.44772 22 2 21.5523 2 21Z" fill="#152C70"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5714 6C16.5714 5.44772 17.0191 5 17.5714 5H18C20.2091 5 22 6.79086 22 9C22 11.2091 20.2091 13 18 13H17C16.4477 13 16 12.5523 16 12C16 11.4477 16.4477 11 17 11H18C19.1046 11 20 10.1046 20 9C20 7.89543 19.1046 7 18 7H17.5714C17.0191 7 16.5714 6.55228 16.5714 6Z" fill="#152C70"></path> <path d="M5.26316 2C3.4599 2 2.03534 3.52994 2.16382 5.32862L2.57509 11.0865C2.85334 14.9819 6.0947 18 10 18C13.9054 18 17.1467 14.9819 17.425 11.0865L17.8363 5.32862C17.9647 3.52994 16.5402 2 14.7369 2H5.26316Z" fill="#4296FF"></path> </g></svg>);
const MoonIcon = () => (<svg width="64px" height="64px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle fill="#FFD983" cx="18" cy="18" r="18"> </circle> <g fill="#FFCC4D"> <circle cx="10.5" cy="8.5" r="3.5"> </circle> <circle cx="20" cy="17" r="3"> </circle> <circle cx="24.5" cy="28.5" r="3.5"> </circle> <circle cx="22" cy="5" r="2"> </circle> <circle cx="3" cy="18" r="1"> </circle> <circle cx="30" cy="9" r="1"> </circle> <circle cx="15" cy="31" r="1"> </circle> <circle cx="32" cy="19" r="2"> </circle> <circle cx="10" cy="23" r="2"> </circle> </g> </g></svg>);
const SunIcon = () => (<svg width="32px" height="32px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#FFAC33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"></path><circle fill="#FFAC33" cx="18" cy="18" r="10"></circle></g></svg>);
const SettingsIcon = () => (<svg width="32px" height="32px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M897.28 597.76l-74.24-53.76c1.28-10.24 1.28-21.76 1.28-32 0-11.52 0-21.76-1.28-32l74.24-53.76c12.8-7.68 16.64-23.04 8.96-34.56l-90.88-154.88c-7.68-12.8-23.04-16.64-35.84-8.96l-84.48 37.12c-17.92-12.8-37.12-23.04-57.6-32l-7.68-92.16c0-14.08-11.52-25.6-25.6-25.6H422.4c-14.08 0-25.6 11.52-25.6 25.6l-8.96 90.88c-20.48 8.96-39.68 19.2-57.6 32l-84.48-37.12c-12.8-7.68-28.16-2.56-35.84 8.96l-89.6 156.16c-7.68 12.8-2.56 28.16 8.96 34.56l74.24 53.76c-1.28 10.24-1.28 21.76-1.28 32s0 21.76 1.28 32l-74.24 53.76c-12.8 7.68-16.64 23.04-8.96 34.56l90.88 154.88c7.68 12.8 23.04 16.64 35.84 8.96l84.48-37.12c17.92 12.8 37.12 23.04 57.6 32L396.8 883.2c0 14.08 11.52 25.6 25.6 25.6h181.76c14.08 0 25.6-11.52 25.6-25.6l8.96-90.88c20.48-8.96 39.68-19.2 57.6-32l84.48 37.12c12.8 7.68 28.16 2.56 35.84-8.96l90.88-154.88c6.4-12.8 1.28-28.16-10.24-35.84z m-384 65.28c-84.48 0-153.6-67.84-153.6-151.04s69.12-151.04 153.6-151.04 153.6 67.84 153.6 151.04-69.12 151.04-153.6 151.04z" fill="#FAC546"></path><path d="M604.16 921.6H422.4c-20.48 0-38.4-16.64-38.4-37.12l-8.96-81.92c-16.64-7.68-32-16.64-46.08-26.88l-76.8 34.56c-17.92 10.24-42.24 3.84-52.48-14.08L108.8 638.72c-5.12-8.96-6.4-19.2-3.84-29.44 2.56-10.24 8.96-17.92 17.92-23.04l67.84-48.64c-1.28-8.96-1.28-17.92-1.28-26.88s0-17.92 1.28-26.88L122.88 435.2c-8.96-5.12-15.36-12.8-17.92-23.04-2.56-10.24-1.28-20.48 3.84-29.44l90.88-154.88c10.24-17.92 33.28-24.32 52.48-14.08l76.8 34.56c14.08-10.24 30.72-19.2 46.08-26.88l8.96-81.92C384 119.04 400.64 102.4 422.4 102.4h181.76c20.48 0 38.4 16.64 38.4 37.12l8.96 81.92c16.64 7.68 32 16.64 46.08 26.88l76.8-34.56c17.92-10.24 42.24-3.84 52.48 14.08l90.88 154.88c5.12 8.96 6.4 19.2 3.84 29.44-2.56 10.24-8.96 17.92-17.92 23.04l-67.84 48.64c1.28 8.96 1.28 17.92 1.28 26.88 0 8.96 0 17.92-1.28 26.88l67.84 48.64c8.96 5.12 15.36 12.8 17.92 23.04 2.56 10.24 1.28 20.48-3.84 29.44L826.88 793.6c-10.24 17.92-33.28 24.32-52.48 14.08l-76.8-34.56c-14.08 10.24-30.72 19.2-46.08 26.88l-8.96 81.92c0 23.04-17.92 39.68-38.4 39.68zM330.24 747.52c2.56 0 5.12 1.28 7.68 2.56 16.64 12.8 35.84 23.04 55.04 30.72 3.84 1.28 7.68 6.4 7.68 10.24l8.96 90.88v1.28c0 7.68 6.4 12.8 12.8 12.8h181.76c7.68 0 12.8-5.12 12.8-12.8v-1.28l8.96-90.88c0-5.12 3.84-8.96 7.68-10.24 19.2-8.96 37.12-19.2 55.04-30.72 3.84-2.56 8.96-2.56 12.8-1.28l84.48 37.12h1.28c6.4 3.84 14.08 1.28 17.92-5.12L896 625.92c1.28-2.56 2.56-6.4 1.28-8.96-1.28-3.84-2.56-6.4-6.4-7.68 0 0-1.28 0-1.28-1.28l-74.24-53.76c-3.84-2.56-6.4-7.68-5.12-11.52 1.28-10.24 1.28-20.48 1.28-30.72 0-10.24 0-20.48-1.28-30.72 0-5.12 1.28-8.96 5.12-11.52l74.24-53.76s1.28 0 1.28-1.28c2.56-1.28 5.12-5.12 6.4-7.68 1.28-3.84 0-6.4-1.28-8.96L805.12 243.2c-3.84-6.4-11.52-7.68-17.92-5.12h-1.28l-84.48 37.12c-3.84 1.28-8.96 1.28-12.8-1.28-16.64-12.8-35.84-23.04-55.04-30.72-3.84-1.28-7.68-6.4-7.68-10.24l-8.96-90.88V140.8c0-7.68-6.4-12.8-12.8-12.8H422.4c-7.68 0-12.8 5.12-12.8 12.8v1.28l-8.96 90.88c0 5.12-3.84 8.96-7.68 10.24-19.2 8.96-37.12 19.2-55.04 30.72-3.84 2.56-8.96 2.56-12.8 1.28l-84.48-37.12h-1.28c-6.4-3.84-14.08-1.28-17.92 5.12l-90.88 154.88c-1.28 2.56-2.56 6.4-1.28 8.96 1.28 3.84 2.56 6.4 6.4 7.68 0 0 1.28 0 1.28 1.28l74.24 53.76c3.84 2.56 6.4 7.68 5.12 11.52-1.28 10.24-1.28 20.48-1.28 30.72s0 20.48 1.28 30.72c0 5.12-1.28 8.96-5.12 11.52l-74.24 53.76s-1.28 0-1.28 1.28c-2.56 1.28-5.12 5.12-6.4 7.68-1.28 3.84 0 6.4 1.28 8.96L221.44 780.8c3.84 6.4 11.52 7.68 17.92 5.12h1.28l84.48-37.12c1.28-1.28 2.56-1.28 5.12-1.28z m183.04-71.68c-92.16 0-166.4-74.24-166.4-163.84s74.24-163.84 166.4-163.84 166.4 74.24 166.4 163.84-75.52 163.84-166.4 163.84z m0-302.08c-78.08 0-140.8 62.72-140.8 138.24 0 76.8 62.72 138.24 140.8 138.24s140.8-62.72 140.8-138.24c0-76.8-64-138.24-140.8-138.24z" fill="#231C1C"></path><path d="M513.28 332.8C413.44 332.8 332.8 413.44 332.8 512s80.64 179.2 180.48 179.2 180.48-80.64 180.48-179.2-81.92-179.2-180.48-179.2z m0 281.6c-57.6 0-103.68-46.08-103.68-102.4s46.08-102.4 103.68-102.4 103.68 46.08 103.68 102.4-47.36 102.4-103.68 102.4z" fill="#E1E0A6"></path><path d="M513.28 704C407.04 704 320 618.24 320 512s87.04-192 193.28-192 193.28 85.76 193.28 192c-1.28 106.24-87.04 192-193.28 192z m0-358.4C421.12 345.6 345.6 419.84 345.6 512s75.52 166.4 167.68 166.4c92.16 0 167.68-74.24 167.68-166.4-1.28-92.16-75.52-166.4-167.68-166.4z m0 281.6c-64 0-116.48-51.2-116.48-115.2s52.48-115.2 116.48-115.2 116.48 51.2 116.48 115.2-52.48 115.2-116.48 115.2z m0-204.8c-49.92 0-90.88 39.68-90.88 89.6s40.96 89.6 90.88 89.6c49.92 0 90.88-39.68 90.88-89.6s-40.96-89.6-90.88-89.6z" fill="#231C1C"></path></g></svg>);
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
