import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  User, 
  HelpCircle, 
  FileText, 
  Globe, 
  X, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Trophy
} from 'lucide-react';

const SECTIONS = [
  'General Intelligence',
  'General Awareness',
  'Quantitative Aptitude',
  'English Comprehension',
];

const MOCK_QUESTIONS = [
  // SECTION 1: General Intelligence (Q1 to Q10)
  {
    id: 1,
    section: 'General Intelligence',
    textEn: 'Select the related word from the given alternatives:\nThermometer : Temperature :: Barometer : ?',
    textHi: 'दिए गए विकल्पों में से संबंधित शब्द का चयन करें:\nथर्मामीटर : तापमान :: बैरोमीटर : ?',
    optionsEn: ['Atmospheric Pressure', 'Humidity', 'Current', 'Altitude'],
    optionsHi: ['वायुमंडलीय दबाव', 'आर्द्रता', 'विद्युत प्रवाह', 'ऊंचाई'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 2,
    section: 'General Intelligence',
    textEn: 'Find the missing number in the sequence:\n7, 14, 28, 56, ?',
    textHi: 'श्रृंखला में लुप्त संख्या ज्ञात कीजिए:\n7, 14, 28, 56, ?',
    optionsEn: ['98', '112', '108', '120'],
    optionsHi: ['98', '112', '108', '120'],
    correct: 1,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 3,
    section: 'General Intelligence',
    textEn: 'In a code language, if "ROAD" is written as "URDG", how is "SWAN" written in that code?',
    textHi: 'एक कूट भाषा में, यदि "ROAD" को "URDG" लिखा जाता है, तो उसी कूट में "SWAN" को क्या लिखा जाएगा?',
    optionsEn: ['VZDQ', 'VXDO', 'VZCQ', 'UXDQ'],
    optionsHi: ['VZDQ', 'VXDO', 'VZCQ', 'UXDQ'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 4,
    section: 'General Intelligence',
    textEn: 'Pointing to a photograph, a woman says: "He is the only son of the wife of my father." How is the man related to the woman?',
    textHi: 'एक तस्वीर की ओर इशारा करते हुए एक महिला कहती है: "वह मेरे पिता की पत्नी का इकलौता पुत्र है।" वह पुरुष महिला से किस प्रकार संबंधित है?',
    optionsEn: ['Brother', 'Uncle', 'Father', 'Son'],
    optionsHi: ['भाई', 'चाचा', 'पिता', 'पुत्र'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 5,
    section: 'General Intelligence',
    textEn: 'Four pairs of words are given. Three are alike in a certain way. Find the odd one out:',
    textHi: 'चार शब्द युग्म दिए गए हैं। तीन किसी प्रकार समान हैं। बेमेल का चयन कीजिए:',
    optionsEn: ['Doctor : Hospital', 'Teacher : School', 'Lawyer : Court', 'Engineer : Bridge'],
    optionsHi: ['डॉक्टर : अस्पताल', 'शिक्षक : विद्यालय', 'वकील : न्यायालय', 'इंजीनियर : पुल'],
    correct: 3,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 6,
    section: 'General Intelligence',
    textEn: 'If "+" means "-", "-" means "*", "*" means "/", and "/" means "+", then what is the value of: 15 - 3 + 10 * 2 / 5 ?',
    textHi: 'यदि "+" का अर्थ "-", "-" का अर्थ "*", "*" का अर्थ "/", और "/" का अर्थ "+" है, तो 15 - 3 + 10 * 2 / 5 का मान क्या होगा?',
    optionsEn: ['45', '40', '50', '35'],
    optionsHi: ['45', '40', '50', '35'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 7,
    section: 'General Intelligence',
    textEn: 'Arrange the following words in a logical sequence:\n1. Birth  2. Death  3. Childhood  4. Education  5. Marriage',
    textHi: 'निम्नलिखित शब्दों को एक तार्किक क्रम में व्यवस्थित करें:\n1. जन्म  2. मृत्यु  3. बचपन  4. शिक्षा  5. विवाह',
    optionsEn: ['1, 3, 4, 5, 2', '1, 4, 3, 5, 2', '3, 1, 4, 5, 2', '1, 3, 5, 4, 2'],
    optionsHi: ['1, 3, 4, 5, 2', '1, 4, 3, 5, 2', '3, 1, 4, 5, 2', '1, 3, 5, 4, 2'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 8,
    section: 'General Intelligence',
    textEn: 'In a class of 45 students, a boy is ranked 20th from the top. What is his rank from the bottom?',
    textHi: '45 छात्रों की एक कक्षा में, एक लड़का ऊपर से 20वें स्थान पर है। नीचे से उसका स्थान क्या होगा?',
    optionsEn: ['26th', '25th', '27th', '24th'],
    optionsHi: ['26वां', '25वां', '27वां', '24वां'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 9,
    section: 'General Intelligence',
    textEn: 'Select the letter-cluster that can replace the question mark (?):\nBCE, CDG, DEH, ?',
    textHi: 'उस अक्षर-समूह का चयन करें जो प्रश्न चिह्न (?) को प्रतिस्थापित कर सकता है:\nBCE, CDG, DEH, ?',
    optionsEn: ['EFI', 'EFJ', 'EEI', 'FFJ'],
    optionsHi: ['EFI', 'EFJ', 'EEI', 'FFJ'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 10,
    section: 'General Intelligence',
    textEn: 'A man travels 4 km North, then turns left and travels 3 km. How far is he from his initial starting point?',
    textHi: 'एक व्यक्ति उत्तर की ओर 4 किमी चलता है, फिर बाएं मुड़ता है और 3 किमी चलता है। वह अपने प्रारंभिक बिंदु से कितनी दूरी पर है?',
    optionsEn: ['5 km', '7 km', '1 km', '6 km'],
    optionsHi: ['5 किमी', '7 किमी', '1 किमी', '6 किमी'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },

  // SECTION 2: General Awareness (Q11 to Q20)
  {
    id: 11,
    section: 'General Awareness',
    textEn: 'Which Article of the Indian Constitution empowers the President to declare a National Emergency on grounds of war or external aggression?',
    textHi: 'भारतीय संविधान का कौन सा अनुच्छेद राष्ट्रपति को युद्ध या बाहरी आक्रमण के आधार पर राष्ट्रीय आपातकाल घोषित करने का अधिकार देता है?',
    optionsEn: ['Article 352', 'Article 356', 'Article 360', 'Article 370'],
    optionsHi: ['अनुच्छेद 352', 'अनुच्छेद 356', 'अनुच्छेद 360', 'अनुच्छेद 370'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 12,
    section: 'General Awareness',
    textEn: 'The Battle of Plassey took place in which year?',
    textHi: 'प्लासी का युद्ध किस वर्ष हुआ था?',
    optionsEn: ['1757', '1764', '1857', '1707'],
    optionsHi: ['1757', '1764', '1857', '1707'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 13,
    section: 'General Awareness',
    textEn: 'What is the chemical formula for baking soda?',
    textHi: 'बेकिंग सोडा का रासायनिक सूत्र क्या है?',
    optionsEn: ['NaHCO3', 'Na2CO3', 'NaCl', 'NaOH'],
    optionsHi: ['NaHCO3', 'Na2CO3', 'NaCl', 'NaOH'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 14,
    section: 'General Awareness',
    textEn: 'Which Indian state shares the longest international boundary with Bangladesh?',
    textHi: 'कौन सा भारतीय राज्य बांग्लादेश के साथ सबसे लंबी अंतरराष्ट्रीय सीमा साझा करता है?',
    optionsEn: ['West Bengal', 'Assam', 'Tripura', 'Meghalaya'],
    optionsHi: ['पश्चिम बंगाल', 'असम', 'त्रिपुरा', 'मेघालय'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 15,
    section: 'General Awareness',
    textEn: 'Who is known as the "Father of the Indian Constitution"?',
    textHi: 'भारतीय संविधान का जनक किसे कहा जाता है?',
    optionsEn: ['Dr. B.R. Ambedkar', 'Dr. Rajendra Prasad', 'Jawaharlal Nehru', 'Mahatma Gandhi'],
    optionsHi: ['डॉ. बी.आर. अम्बेडकर', 'डॉ. राजेन्द्र प्रसाद', 'जवाहरलाल नेहरू', 'महात्मा गांधी'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 16,
    section: 'General Awareness',
    textEn: 'Which vitamin is essential for blood coagulation (clotting)?',
    textHi: 'रक्त के थक्के जमने के लिए कौन सा विटामिन आवश्यक है?',
    optionsEn: ['Vitamin K', 'Vitamin A', 'Vitamin C', 'Vitamin D'],
    optionsHi: ['विटामिन K', 'विटामिन A', 'विटामिन C', 'विटामिन D'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 17,
    section: 'General Awareness',
    textEn: 'The famous Sun Temple of Konark was built by which dynasty?',
    textHi: 'कोणार्क का प्रसिद्ध सूर्य मंदिर किस राजवंश द्वारा बनवाया गया था?',
    optionsEn: ['Eastern Ganga Dynasty', 'Chola Dynasty', 'Maurya Dynasty', 'Gupta Dynasty'],
    optionsHi: ['पूर्वी गंग राजवंश', 'चोल राजवंश', 'मौर्य राजवंश', 'गुप्त राजवंश'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 18,
    section: 'General Awareness',
    textEn: 'Which gas is predominantly responsible for the Greenhouse Effect on Earth?',
    textHi: 'पृथ्वी पर ग्रीनहाउस प्रभाव के लिए मुख्य रूप से कौन सी गैस जिम्मेदार है?',
    optionsEn: ['Carbon Dioxide (CO2)', 'Methane', 'Oxygen', 'Nitrogen'],
    optionsHi: ['कार्बन डाइऑक्साइड (CO2)', 'मीथेन', 'ऑक्सीजन', 'नाइट्रोजन'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 19,
    section: 'General Awareness',
    textEn: 'In which year did the Reserve Bank of India (RBI) start its operations?',
    textHi: 'भारतीय रिजर्व बैंक (RBI) ने किस वर्ष अपना परिचालन शुरू किया था?',
    optionsEn: ['1935', '1947', '1950', '1921'],
    optionsHi: ['1935', '1947', '1950', '1921'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 20,
    section: 'General Awareness',
    textEn: 'Where are the headquarters of the United Nations (UN) situated?',
    textHi: 'संयुक्त राष्ट्र (UN) का मुख्यालय कहाँ स्थित है?',
    optionsEn: ['New York, USA', 'Geneva, Switzerland', 'Paris, France', 'London, UK'],
    optionsHi: ['न्यूयॉर्क, अमेरिका', 'जिनेवा, स्विट्जरलैंड', 'पेरिस, फ्रांस', 'लंदन, यूके'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },

  // SECTION 3: Quantitative Aptitude (Q21 to Q30)
  {
    id: 21,
    section: 'Quantitative Aptitude',
    textEn: 'A sum of money doubles itself in 5 years at simple interest. In how many years will it become 4 times of itself at the same rate of interest?',
    textHi: 'एक धनराशि साधारण ब्याज पर 5 वर्षों में दोगुनी हो जाती है। उसी ब्याज दर पर वह कितने वर्षों में 4 गुना हो जाएगी?',
    optionsEn: ['15 Years', '20 Years', '10 Years', '12 Years'],
    optionsHi: ['15 वर्ष', '20 वर्ष', '10 वर्ष', '12 वर्ष'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 22,
    section: 'Quantitative Aptitude',
    textEn: 'A shopkeeper marks an article 25% above cost price and allows a discount of 10%. Find the profit percentage.',
    textHi: 'एक दुकानदार किसी वस्तु पर क्रय मूल्य से 25% अधिक अंकित करता है और 10% की छूट देता है। लाभ प्रतिशत ज्ञात कीजिए।',
    optionsEn: ['12.5%', '15%', '10%', '14%'],
    optionsHi: ['12.5%', '15%', '10%', '14%'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 23,
    section: 'Quantitative Aptitude',
    textEn: 'If A:B = 2:3 and B:C = 4:5, find the ratio A:B:C.',
    textHi: 'यदि A:B = 2:3 और B:C = 4:5 है, तो अनुपात A:B:C ज्ञात कीजिए।',
    optionsEn: ['8 : 12 : 15', '6 : 10 : 15', '8 : 10 : 15', '4 : 6 : 10'],
    optionsHi: ['8 : 12 : 15', '6 : 10 : 15', '8 : 10 : 15', '4 : 6 : 10'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 24,
    section: 'Quantitative Aptitude',
    textEn: 'A train 180 meters long is traveling at 54 km/h. How many seconds will it take to pass an electric pole?',
    textHi: '180 मीटर लंबी एक ट्रेन 54 किमी/घंटा की गति से चल रही है। एक बिजली के खंभे को पार करने में इसे कितने सेकंड लगेंगे?',
    optionsEn: ['12 Seconds', '10 Seconds', '15 Seconds', '18 Seconds'],
    optionsHi: ['12 सेकंड', '10 सेकंड', '15 सेकंड', '18 सेकंड'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 25,
    section: 'Quantitative Aptitude',
    textEn: 'What is the value of: (sin² 30° + cos² 30°) + tan 45°?',
    textHi: '(sin² 30° + cos² 30°) + tan 45° का मान क्या है?',
    optionsEn: ['2', '1', '0', '3'],
    optionsHi: ['2', '1', '0', '3'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 26,
    section: 'Quantitative Aptitude',
    textEn: 'The average of 5 consecutive odd numbers is 27. What is the largest of these numbers?',
    textHi: '5 लगातार विषम संख्याओं का औसत 27 है। इनमें से सबसे बड़ी संख्या कौन सी है?',
    optionsEn: ['31', '29', '33', '35'],
    optionsHi: ['31', '29', '33', '35'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 27,
    section: 'Quantitative Aptitude',
    textEn: 'A can complete a piece of work in 12 days and B in 24 days. Working together, in how many days can they complete the work?',
    textHi: 'A किसी कार्य को 12 दिनों में और B 24 दिनों में पूरा कर सकता है। एक साथ कार्य करते हुए, वे इसे कितने दिनों में पूरा करेंगे?',
    optionsEn: ['8 Days', '9 Days', '10 Days', '6 Days'],
    optionsHi: ['8 दिन', '9 दिन', '10 दिन', '6 दिन'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 28,
    section: 'Quantitative Aptitude',
    textEn: 'Find the greatest common divisor (GCD) of 36, 54, and 72.',
    textHi: '36, 54, और 72 का महत्तम समापवर्तक (HCF / GCD) ज्ञात कीजिए।',
    optionsEn: ['18', '9', '6', '12'],
    optionsHi: ['18', '9', '6', '12'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 29,
    section: 'Quantitative Aptitude',
    textEn: 'If x + 1/x = 3, what is the value of x² + 1/x²?',
    textHi: 'यदि x + 1/x = 3 है, तो x² + 1/x² का मान क्या होगा?',
    optionsEn: ['7', '9', '11', '8'],
    optionsHi: ['7', '9', '11', '8'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 30,
    section: 'Quantitative Aptitude',
    textEn: 'The radius of a circle is increased by 20%. By what percentage does its area increase?',
    textHi: 'एक वृत्त की त्रिज्या में 20% की वृद्धि की जाती है। इसके क्षेत्रफल में कितने प्रतिशत की वृद्धि होगी?',
    optionsEn: ['44%', '40%', '20%', '42%'],
    optionsHi: ['44%', '40%', '20%', '42%'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },

  // SECTION 4: English Comprehension (Q31 to Q40)
  {
    id: 31,
    section: 'English Comprehension',
    textEn: 'Select the most appropriate synonym of the given word: "METICULOUS"',
    textHi: 'दिए गए शब्द का सबसे उपयुक्त पर्यायवाची चुनें: "METICULOUS" (सूक्ष्म/सावधान)',
    optionsEn: ['Careful and precise', 'Careless', 'Hasty', 'Indifferent'],
    optionsHi: ['सावधान और सटीक', 'लापरवाह', 'जल्दबाज', 'उदासीन'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 32,
    section: 'English Comprehension',
    textEn: 'Select the correctly spelled word:',
    textHi: 'सही वर्तनी वाले शब्द का चयन करें:',
    optionsEn: ['Accommodate', 'Acommodate', 'Accomodate', 'Acomodate'],
    optionsHi: ['Accommodate', 'Acommodate', 'Accomodate', 'Acomodate'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 33,
    section: 'English Comprehension',
    textEn: 'Fill in the blank with the most appropriate preposition:\n"He is junior ______ me in the office."',
    textHi: 'रिक्त स्थान के लिए सबसे उपयुक्त शब्द चुनें:\n"He is junior ______ me in the office."',
    optionsEn: ['to', 'than', 'from', 'with'],
    optionsHi: ['to', 'than', 'from', 'with'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 34,
    section: 'English Comprehension',
    textEn: 'Select the antonym of the given word: "AFFLUENT"',
    textHi: 'दिए गए शब्द का विलोम चुनें: "AFFLUENT" (धनी/समृद्ध)',
    optionsEn: ['Poor', 'Wealthy', 'Prosperous', 'Generous'],
    optionsHi: ['गरीब (Poor)', 'धनी', 'समृद्ध', 'उदार'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 35,
    section: 'English Comprehension',
    textEn: 'Choose the correct meaning of the idiom: "Burn the midnight oil"',
    textHi: 'मुहावरे का सही अर्थ चुनें: "Burn the midnight oil"',
    optionsEn: ['Work or study late into the night', 'Waste fuel', 'Create trouble', 'Sleep early'],
    optionsHi: ['देर रात तक काम या पढ़ाई करना', 'ईंधन बर्बाद करना', 'समस्या पैदा करना', 'जल्दी सोना'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 36,
    section: 'English Comprehension',
    textEn: 'Select the option that can be used as a one-word substitute:\n"A person who does not believe in the existence of God"',
    textHi: 'एक शब्द प्रतिस्थापन चुनें:\n"A person who does not believe in the existence of God"',
    optionsEn: ['Atheist', 'Theist', 'Agnostic', 'Fatalist'],
    optionsHi: ['नास्तिक (Atheist)', 'आस्तिक', 'अज्ञेयवादी', 'भाग्यवादी'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 37,
    section: 'English Comprehension',
    textEn: 'Identify the segment containing a grammatical error:\n"Neither the teacher / nor the students / were present in / the auditorium."',
    textHi: 'व्याकरणिक त्रुटि वाले भाग की पहचान करें:\n"Neither the teacher / nor the students / were present in / the auditorium."',
    optionsEn: ['No Error', 'Neither the teacher', 'nor the students', 'were present in'],
    optionsHi: ['कोई त्रुटि नहीं (No Error)', 'Neither the teacher', 'nor the students', 'were present in'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 38,
    section: 'English Comprehension',
    textEn: 'Choose the correct passive voice of:\n"She sings a melodious song."',
    textHi: 'सही कर्मवाच्य (Passive Voice) का चयन करें:\n"She sings a melodious song."',
    optionsEn: ['A melodious song is sung by her.', 'A melodious song was sung by her.', 'A melodious song has been sung by her.', 'A melodious song is being sung by her.'],
    optionsHi: ['A melodious song is sung by her.', 'A melodious song was sung by her.', 'A melodious song has been sung by her.', 'A melodious song is being sung by her.'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 39,
    section: 'English Comprehension',
    textEn: 'Select the most appropriate antonym of: "DILIGENT"',
    textHi: 'दिए गए शब्द का सबसे उपयुक्त विलोम चुनें: "DILIGENT" (परिश्रमी)',
    optionsEn: ['Lazy', 'Hardworking', 'Active', 'Careful'],
    optionsHi: ['आलसी (Lazy)', 'मेहनती', 'सक्रिय', 'सावधान'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
  {
    id: 40,
    section: 'English Comprehension',
    textEn: 'Fill in the blank with the correct phrase:\n"The meeting was ______ due to heavy rains."',
    textHi: 'सही मुहावरेदार अभिव्यक्ति से रिक्त स्थान भरें:\n"The meeting was ______ due to heavy rains."',
    optionsEn: ['called off', 'called up', 'called in', 'called out'],
    optionsHi: ['called off (रद्द की गई)', 'called up', 'called in', 'called out'],
    correct: 0,
    marksPos: 2.0,
    marksNeg: 0.5,
  },
];

export default function CbtExamScreen({ onClose, onComplete }) {
  const [activeSection, setActiveSection] = useState('General Intelligence');
  const [currentQId, setCurrentQId] = useState(1);
  const [language, setLanguage] = useState('EN'); // 'EN' | 'HI'
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 mins

  // State: answers: { [qId]: optionIndex }
  const [answers, setAnswers] = useState({});
  // Status: { [qId]: 'not-visited' | 'not-answered' | 'answered' | 'marked' }
  const [questionStatus, setQuestionStatus] = useState(() => {
    const initial = {};
    MOCK_QUESTIONS.forEach((q, idx) => {
      initial[q.id] = idx === 0 ? 'not-answered' : 'not-visited';
    });
    return initial;
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isPaperOpen, setIsPaperOpen] = useState(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);

  const currentQ = useMemo(() => {
    return MOCK_QUESTIONS.find((q) => q.id === currentQId) || MOCK_QUESTIONS[0];
  }, [currentQId]);

  // Keep active section in sync with the current question
  useEffect(() => {
    if (currentQ && currentQ.section !== activeSection) {
      setActiveSection(currentQ.section);
    }
  }, [currentQ?.section]);

  // Sync selectedOption whenever current question changes
  useEffect(() => {
    if (currentQ) {
      setSelectedOption(answers[currentQ.id] !== undefined ? answers[currentQ.id] : null);

      // If status is 'not-visited', mark as 'not-answered'
      setQuestionStatus((prev) => {
        if (prev[currentQ.id] === 'not-visited') {
          return { ...prev, [currentQ.id]: 'not-answered' };
        }
        return prev;
      });
    }
  }, [currentQ?.id]);

  // Live Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitModalOpen(false);
          setIsResultModalOpen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Timer HH:MM:SS with standard round circular zeroes (zero slashes)
  const formattedTimer = useMemo(() => {
    const p = (n) => String(n).padStart(2, '0');
    const h = p(Math.floor(timeRemaining / 3600));
    const m = p(Math.floor((timeRemaining % 3600) / 60));
    const s = p(timeRemaining % 60);
    return `${h}:${m}:${s}`;
  }, [timeRemaining]);

  const isTimerAmber = timeRemaining < 600 && timeRemaining >= 120;
  const isTimerRed = timeRemaining < 120;

  // Counts of Status for Legend (Only 4 Clean States)
  const counts = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let notVisited = 0;
    let marked = 0;

    MOCK_QUESTIONS.forEach((q) => {
      const st = questionStatus[q.id];
      if (st === 'answered') answered++;
      else if (st === 'not-answered') notAnswered++;
      else if (st === 'marked') marked++;
      else notVisited++;
    });

    return { answered, notAnswered, notVisited, marked };
  }, [questionStatus]);

  // Score Calculations on Submission
  const resultStats = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let score = 0;

    MOCK_QUESTIONS.forEach((q) => {
      const ans = answers[q.id];
      if (ans !== undefined) {
        if (ans === q.correct) {
          correct++;
          score += q.marksPos;
        } else {
          incorrect++;
          score -= q.marksNeg;
        }
      } else {
        unattempted++;
      }
    });

    return { correct, incorrect, unattempted, score: Math.max(0, score) };
  }, [answers]);

  // Save & Next Action
  const handleSaveAndNext = () => {
    if (selectedOption !== null) {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: selectedOption }));
      setQuestionStatus((prev) => ({ ...prev, [currentQ.id]: 'answered' }));
    } else {
      setQuestionStatus((prev) => {
        if (prev[currentQ.id] !== 'answered') {
          return { ...prev, [currentQ.id]: 'not-answered' };
        }
        return prev;
      });
    }

    if (currentQId < MOCK_QUESTIONS.length) {
      setCurrentQId((prev) => prev + 1);
    }
  };

  // Clear Response Action
  const handleClearResponse = () => {
    setSelectedOption(null);
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
    setQuestionStatus((prev) => ({ ...prev, [currentQ.id]: 'not-answered' }));
  };

  // Mark for Review & Next Action (Clean solid purple, zero green dots)
  const handleMarkForReviewAndNext = () => {
    if (selectedOption !== null) {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: selectedOption }));
    }
    setQuestionStatus((prev) => ({ ...prev, [currentQ.id]: 'marked' }));

    if (currentQId < MOCK_QUESTIONS.length) {
      setCurrentQId((prev) => prev + 1);
    }
  };

  // Previous Question Action
  const handlePrevious = () => {
    if (currentQId > 1) {
      setCurrentQId((prev) => prev - 1);
    }
  };

  // Jump to specific Question from Palette
  const handleJumpToQuestion = (qId) => {
    setCurrentQId(qId);
    setIsMobilePaletteOpen(false);
  };

  // Final Submit Action
  const handleConfirmSubmit = () => {
    setIsSubmitModalOpen(false);
    setIsResultModalOpen(true);
    if (onComplete) {
      onComplete(`${resultStats.correct}/${MOCK_QUESTIONS.length}`);
    }
  };

  // Palette button styling: 10 per row, small, clean circular soft numbers
  const getStatusButtonClass = (st, isCurrent) => {
    let base = 'h-7.5 w-full rounded-md text-xs font-bold flex items-center justify-center transition-all cursor-pointer font-sans ';
    if (isCurrent) {
      base += 'ring-2 ring-white ring-offset-1 ring-offset-[#0b0c10] scale-105 z-10 ';
    }

    switch (st) {
      case 'answered':
        return base + 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm';
      case 'not-answered':
        return base + 'bg-[#ff2d55] text-white hover:bg-red-500 shadow-sm';
      case 'marked':
        return base + 'bg-purple-600 text-white hover:bg-purple-500 shadow-sm';
      case 'not-visited':
      default:
        return base + 'bg-[#181a24] border border-white/10 text-neutral-400 hover:text-white hover:border-white/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090a0f] text-white flex flex-col h-screen w-screen overflow-hidden select-none font-sans">
      
      {/* =========================================================================
          TOP EXAM HEADER BAR
         ========================================================================= */}
      <header className="h-16 bg-[#10121a] border-b border-white/[0.08] px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
        
        {/* Left: Test Name & Section Tabs */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-1">
          <div className="flex items-center gap-2 pr-4 border-r border-white/10 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2d55]" />
            <span className="font-bold text-xs sm:text-sm tracking-wide uppercase text-white whitespace-nowrap">
              SDLPC CBT EXAM
            </span>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {SECTIONS.map((sec) => {
              const isActive = sec === activeSection;
              const secQuestions = MOCK_QUESTIONS.filter((q) => q.section === sec);
              const firstQId = secQuestions[0]?.id;

              return (
                <button
                  key={sec}
                  onClick={() => {
                    setActiveSection(sec);
                    if (firstQId) setCurrentQId(firstQId);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#ff2d55] text-white font-bold shadow-sm'
                      : 'bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <span>{sec}</span>
                  <span className="ml-1 opacity-70">({secQuestions.length})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Controls, Candidate Info & Live Countdown Timer */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 pl-4">
          
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 hover:border-white/20 text-xs font-medium tracking-wide text-neutral-200 cursor-pointer"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#ff2d55]" />
            <span>{language === 'EN' ? 'HINDI' : 'ENGLISH'}</span>
          </button>

          {/* Utility: Question Paper */}
          <button
            onClick={() => setIsPaperOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 hover:border-white/20 text-xs font-medium tracking-wide text-neutral-200 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-400" />
            <span>PAPER</span>
          </button>

          {/* Utility: Instructions */}
          <button
            onClick={() => setIsInstructionsOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 hover:border-white/20 text-xs font-medium tracking-wide text-neutral-200 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
            <span>RULES</span>
          </button>

          {/* Live Digital Countdown Timer with Clean Soft Font (No Slashed Zero) */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-bold text-xs sm:text-sm tracking-wide transition-all ${
              isTimerRed
                ? 'bg-red-950/60 border-red-500 text-red-400 animate-pulse'
                : isTimerAmber
                ? 'bg-amber-950/60 border-amber-500 text-amber-400'
                : 'bg-[#151824] border-white/10 text-white'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${isTimerRed ? 'text-red-400' : 'text-[#ff2d55]'}`} />
            <span>{formattedTimer}</span>
          </div>

          {/* Candidate Tile */}
          <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#ff2d55]/15 border border-[#ff2d55]/30 flex items-center justify-center text-[#ff2d55]">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left leading-tight">
              <div className="text-xs font-bold text-neutral-200">Rahul Kumar</div>
              <div className="text-[10px] text-neutral-400">Roll: SDLPC-8910</div>
            </div>
          </div>

          {/* Mobile Palette Drawer Toggle */}
          <button
            onClick={() => setIsMobilePaletteOpen(!isMobilePaletteOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/[0.05] border border-white/10 text-neutral-300 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#ff2d55]" />
          </button>

          {/* Exit Exam Session */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Exit CBT Session"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN WORKSPACE (Split Left Question Area / Right Palette)
         ========================================================================= */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* -----------------------------------------------------------------------
            LEFT PANEL: QUESTION & ATTEMPT AREA
           ----------------------------------------------------------------------- */}
        <div className="flex-1 flex flex-col h-full bg-[#0c0d13] overflow-hidden">
          
          {/* Sub-bar: Question Number, Section & Marking Scheme */}
          <div className="h-12 bg-[#12141e] border-b border-white/[0.06] px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-bold text-xs sm:text-sm tracking-wide uppercase text-neutral-200">
                Question No. {currentQ?.id}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-xs text-[#ff2d55] uppercase font-bold">
                {activeSection}
              </span>
            </div>

            {/* Marking Scheme Badge */}
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded">
                +{currentQ?.marksPos.toFixed(2)}
              </span>
              <span className="text-red-400 font-bold bg-red-950/40 border border-red-500/30 px-2.5 py-0.5 rounded">
                -{currentQ?.marksNeg.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Question & Options Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 max-w-4xl mx-auto w-full">
            
            {/* Question Text Container */}
            <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-[#141622] border border-white/[0.08]">
              <p className="text-base sm:text-lg text-neutral-100 font-medium leading-relaxed whitespace-pre-line font-sans">
                {language === 'EN' ? currentQ?.textEn : currentQ?.textHi}
              </p>
            </div>

            {/* Options Container (A, B, C, D) */}
            <div className="space-y-3.5 mb-8">
              {(language === 'EN' ? currentQ?.optionsEn : currentQ?.optionsHi)?.map((optText, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    onClick={() => setSelectedOption(optIdx)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#ff2d55]/10 border-[#ff2d55] shadow-[0_0_15px_rgba(255,45,85,0.15)] ring-1 ring-[#ff2d55]'
                        : 'bg-[#131520] border-white/[0.07] hover:border-white/20 hover:bg-[#171927]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Option Letter Badge */}
                      <div
                        className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#ff2d55] text-white'
                            : 'bg-white/[0.06] text-neutral-300 border border-white/10'
                        }`}
                      >
                        {letter}
                      </div>

                      <span className="text-sm sm:text-base font-sans text-neutral-200 font-medium">
                        {optText}
                      </span>
                    </div>

                    {/* Radio indicator circle */}
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'border-[#ff2d55] bg-[#ff2d55]' : 'border-white/20'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Bottom Action Toolbar */}
          <div className="h-18 bg-[#10121a] border-t border-white/[0.08] px-4 sm:px-8 flex items-center justify-between shrink-0">
            {/* Left Group */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleMarkForReviewAndNext}
                className="px-3.5 sm:px-5 py-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer"
              >
                Mark for Review & Next
              </button>

              <button
                onClick={handleClearResponse}
                className="px-3.5 sm:px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-400 hover:text-white text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer"
              >
                Clear Response
              </button>
            </div>

            {/* Right Group */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePrevious}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold tracking-wide uppercase transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={handleSaveAndNext}
                className="px-6 sm:px-8 py-2.5 rounded-xl bg-[#ff2d55] hover:bg-[#e0264b] text-white text-xs sm:text-sm font-bold tracking-wide uppercase transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,45,85,0.3)] active:scale-95"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            RIGHT PANEL: QUESTION PALETTE & STATUS DASHBOARD (10 BOXES PER ROW)
           ----------------------------------------------------------------------- */}
        <div
          className={`w-full lg:w-96 xl:w-[26rem] bg-[#10121a] border-l border-white/[0.08] flex flex-col justify-between shrink-0 z-30 transition-transform duration-300 lg:translate-x-0 ${
            isMobilePaletteOpen
              ? 'fixed inset-y-0 right-0 max-w-sm translate-x-0 shadow-2xl'
              : 'fixed lg:relative inset-y-0 right-0 translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Palette Top / Header */}
          <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-neutral-300 font-bold">
              Question Palette (40 Total Questions)
            </span>

            {/* Mobile close */}
            <button
              onClick={() => setIsMobilePaletteOpen(false)}
              className="lg:hidden p-1 rounded-md text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Clean Legend Matrix - Only 4 Clear States, NO Green Dot on Purple */}
          <div className="p-4 border-b border-white/[0.06] bg-[#0c0d14] text-xs grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                {counts.answered}
              </span>
              <span className="text-neutral-300 font-medium">Answered</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#ff2d55] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                {counts.notAnswered}
              </span>
              <span className="text-neutral-300 font-medium">Not Answered</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#181a24] border border-white/10 text-neutral-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                {counts.notVisited}
              </span>
              <span className="text-neutral-300 font-medium">Not Visited</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-purple-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                {counts.marked}
              </span>
              <span className="text-neutral-300 font-medium">Marked for Review</span>
            </div>
          </div>

          {/* All Subjects & 10 Boxes Per Row Grid */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {SECTIONS.map((secName) => {
              const secList = MOCK_QUESTIONS.filter((q) => q.section === secName);
              const isThisActiveSection = secName === activeSection;

              return (
                <div key={secName} className="rounded-xl p-3 bg-white/[0.02] border border-white/[0.05]">
                  {/* Subject Header & Question Count */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.05]">
                    <span className={`text-xs font-bold uppercase tracking-wide ${
                      isThisActiveSection ? 'text-[#ff2d55]' : 'text-neutral-300'
                    }`}>
                      {secName}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-medium">
                      ({secList.length} Questions)
                    </span>
                  </div>

                  {/* 10 Boxes Per Row Grid */}
                  <div className="grid grid-cols-10 gap-1.5">
                    {secList.map((q) => {
                      const st = questionStatus[q.id] || 'not-visited';
                      const isCurrent = q.id === currentQ?.id;

                      return (
                        <button
                          key={q.id}
                          onClick={() => handleJumpToQuestion(q.id)}
                          className={getStatusButtonClass(st, isCurrent)}
                          title={`Jump to Question ${q.id} (${st})`}
                        >
                          {q.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Panel Action: Full-Width Submit Test */}
          <div className="p-4 border-t border-white/[0.08] bg-[#0c0d14]">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Submit Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CONFIRMATION SUBMISSION MODAL
         ========================================================================= */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#131520] border border-white/10 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl font-sans"
            >
              <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-2">
                Confirm Test Submission
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Are you sure you want to finalize your exam session? Once submitted, answers cannot be edited.
              </p>

              {/* Summary Stats Matrix */}
              <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-[#0c0d14] border border-white/5 mb-6 text-center">
                <div>
                  <div className="text-lg font-bold text-emerald-400">{counts.answered}</div>
                  <div className="text-[11px] text-neutral-400 uppercase font-medium">Attempted</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#ff2d55]">{counts.notAnswered + counts.notVisited}</div>
                  <div className="text-[11px] text-neutral-400 uppercase font-medium">Unattempted</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-400">{counts.marked}</div>
                  <div className="text-[11px] text-neutral-400 uppercase font-medium">Marked</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs uppercase font-semibold text-neutral-300 cursor-pointer"
                >
                  Resume Exam
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase font-bold tracking-wider cursor-pointer shadow-sm"
                >
                  Confirm & Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          RESULT / SCORECARD MODAL
         ========================================================================= */}
      <AnimatePresence>
        {isResultModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-lg bg-[#11131c] border border-white/10 rounded-3xl p-8 z-10 text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-[#ff2d55]/15 border border-[#ff2d55]/30 flex items-center justify-center mx-auto mb-6 text-[#ff2d55]">
                <Trophy className="w-8 h-8" />
              </div>

              <span className="text-xs tracking-wider text-[#ff2d55] uppercase font-bold">
                OFFICIAL CBT RESULT
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white mt-1 mb-6">
                Score: {resultStats.score.toFixed(2)} Marks
              </h3>

              {/* Performance Breakdown */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0c0d14] border border-white/5 mb-8 text-center">
                <div>
                  <div className="text-xl font-bold text-emerald-400">{resultStats.correct}</div>
                  <div className="text-[11px] text-neutral-400 uppercase font-medium">Correct (+{resultStats.correct * 2})</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#ff2d55]">{resultStats.incorrect}</div>
                  <div className="text-[11px] text-neutral-400 uppercase font-medium">Incorrect (-{resultStats.incorrect * 0.5})</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-neutral-400">{resultStats.unattempted}</div>
                  <div className="text-[11px] text-neutral-400 uppercase font-medium">Skipped</div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-xl bg-[#ff2d55] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#e0264b] transition-all cursor-pointer shadow-[0_0_20px_rgba(255,45,85,0.35)]"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          QUESTION PAPER PREVIEW MODAL
         ========================================================================= */}
      <AnimatePresence>
        {isPaperOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPaperOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-[#12141e] border border-white/10 rounded-3xl p-6 sm:p-8 z-10 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 shrink-0">
                <h4 className="text-sm uppercase tracking-wide text-white font-bold">
                  Complete Question Paper (40 Questions)
                </h4>
                <button
                  onClick={() => setIsPaperOpen(false)}
                  className="p-1 rounded-md text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {MOCK_QUESTIONS.map((q) => (
                  <div key={q.id} className="p-4 rounded-xl bg-[#0c0d14] border border-white/5">
                    <div className="flex items-center justify-between text-xs text-[#ff2d55] font-bold mb-2">
                      <span>Q{q.id}. {q.section}</span>
                      <span>Marks: +{q.marksPos} / -{q.marksNeg}</span>
                    </div>
                    <p className="text-sm text-neutral-200 mb-3 whitespace-pre-line font-medium">
                      {language === 'EN' ? q.textEn : q.textHi}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 font-medium">
                      {(language === 'EN' ? q.optionsEn : q.optionsHi).map((opt, oIdx) => (
                        <div key={oIdx} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                          {String.fromCharCode(65 + oIdx)}. {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          INSTRUCTIONS MODAL
         ========================================================================= */}
      <AnimatePresence>
        {isInstructionsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInstructionsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl bg-[#12141e] border border-white/10 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <h4 className="text-sm uppercase tracking-wide text-white font-bold">
                  Official CBT Instructions
                </h4>
                <button
                  onClick={() => setIsInstructionsOpen(false)}
                  className="p-1 rounded-md text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs text-neutral-300 space-y-3 leading-relaxed mb-6 font-medium">
                <p>1. Total duration of examination is 60 minutes.</p>
                <p>2. The countdown timer in the top header displays remaining time in standard format.</p>
                <p>3. Each correct answer carries +2.00 marks. Each wrong answer deducts 0.50 marks.</p>
                <p>4. Click any question number in the right-side palette to jump directly to that question.</p>
                <p>5. Click "Save & Next" to save your response and advance.</p>
              </div>

              <button
                onClick={() => setIsInstructionsOpen(false)}
                className="w-full py-3 rounded-xl bg-[#ff2d55] text-white text-xs uppercase font-bold tracking-wider cursor-pointer"
              >
                I Understand
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
