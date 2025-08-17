/* ====================================================
   CTET Subjects -> Topic Sidebar -> Content Loader
   (हिंदी टिप्पणियाँ)
   ==================================================== */

/* -----------------------------------------------
   SUBJECTS: सभी विषय + टॉपिक्स (slug सहित)
   ----------------------------------------------- */
   const SUBJECTS = {
    "बाल विकास एवं शिक्षाशास्त्र (CDP)": {
      slug: "cdp",
      topics: [
        ["परिचय","intro"],
        ["विकास के सिद्धांत","theories_of_development"],
        ["सीखना एवं प्रेरणा","learning_and_motivation"],
        ["बाल-केंद्रित शिक्षा","child_centered_education"],
        ["समावेशी शिक्षा","inclusive_education"],
        ["अभिरुचि, बुद्धि, व्यक्तित्व","aptitude_intelligence_personality"],
        ["मूल्यांकन एवं आकलन","assessment_and_evaluation"],
        ["भाषा एवं विचार","language_and_thought"]
      ]
    },
    "हिंदी भाषा": {
      slug: "hindi",
      topics: [
        ["भाषा की प्रकृति","nature_of_language"],
        ["वर्ण, शब्द, वाक्य","varn_shabd_vaaky"],
        ["व्याकरण एवं शुद्धलेखन","vyakaran_shuddhlekhan"],
        ["अपठित गद्यांश","unseen_passage"],
        ["भाषा-अधिगम","language_acquisition"],
        ["शिक्षण विधियाँ","teaching_methods"],
        ["मूल्यांकन","assessment"],
        ["शब्द भंडार एवं मुहावरे","vocabulary_idioms"]
      ]
    },
    "English Language": {
      slug: "english",
      topics: [
        ["Nature of Language","nature_of_language"],
        ["Grammar & Usage","grammar_usage"],
        ["Unseen Passage","unseen_passage"],
        ["Language Acquisition","language_acquisition"],
        ["Teaching Methods","teaching_methods"],
        ["Phonics & Pronunciation","phonics_pronunciation"],
        ["Assessment","assessment"],
        ["Vocabulary & Idioms","vocabulary_idioms"]
      ]
    },
    "गणित (Mathematics)": {
      slug: "maths",
      topics: [
        ["संख्या पद्धति","number_system"],
        ["भिन्न एवं दशमलव","fractions_decimals"],
        ["अनुपात एवं समानुपात","ratio_proportion"],
        ["बीजगणित की मूल बातें","basics_of_algebra"],
        ["ज्यामिति की मूल बातें","basics_of_geometry"],
        ["माप एवं क्षेत्रफल","mensuration"],
        ["डेटा व हैंडलिंग","data_handling"],
        ["समस्या समाधान रणनीतियाँ","problem_solving"]
      ]
    },
    "पर्यावरण अध्ययन (EVS)": {
      slug: "evs",
      topics: [
        ["हमारा पर्यावरण","our_environment"],
        ["परिवार एवं दोस्त","family_and_friends"],
        ["भोजन","food"],
        ["आवास","shelter"],
        ["जल, वायु, मौसम","water_air_weather"],
        ["यातायात एवं संचार","transport_communication"],
        ["स्वास्थ्य एवं सफाई","health_hygiene"],
        ["शिक्षण-अधिगम और EVS","teaching_learning_evs"]
      ]
    },
    "विज्ञान (Science)": {
      slug: "science",
      topics: [
        ["पदार्थ एवं उसकी प्रकृति","matter_and_its_nature"],
        ["जीव जगत","living_world"],
        ["बल एवं गति","force_and_motion"],
        ["ऊष्मा एवं ताप","heat_temperature"],
        ["विद्युत एवं चुम्बकत्व","electricity_magnetism"],
        ["ध्वनि","sound"],
        ["पर्यावरण एवं संसाधन","environment_resources"],
        ["विज्ञान शिक्षण विधियाँ","science_teaching_methods"]
      ]
    },
    "सामाजिक अध्ययन/सामाजिक विज्ञान (SST)": {
      slug: "sst",
      topics: [
        ["इतिहास का परिचय","intro_history"],
        ["भारतीय संविधान","indian_constitution"],
        ["भूगोल की आधारभूत बातें","basics_of_geography"],
        ["नागरिक शास्त्र","civics"],
        ["अर्थशास्त्र की आधारभूत बातें","basics_of_economics"],
        ["संसाधन एवं विकास","resources_development"],
        ["मानचित्र कौशल","map_skills"],
        ["शिक्षण विधियाँ","teaching_methods"]
      ]
    }
  };
  
  /* -------------------------------------------------
     CONTENT: प्रत्येक टॉपिक का बेसिक प्लेसहोल्डर कंटेंट
     (यदि आप चाहें तो बाद में API/डेटाबेस से लोड करें)
     key = `${subjectSlug}/${topicSlug}`
     ------------------------------------------------- */
  const CONTENT = {};
  Object.values(SUBJECTS).forEach(meta => {
    meta.topics.forEach(([tName, tSlug]) => {
      const key = `${meta.slug}/${tSlug}`;
      CONTENT[key] = `
        <article class="topic-article">
          <h1>${tName}</h1>
          <p>यह <strong>${tName}</strong> का प्लेसहोल्डर पेज है। यहाँ आप अपने नोट्स, अवधारणाएँ, उदाहरण और MCQs जोड़ सकते हैं।</p>
          <ul>
            <li>मुख्य बिंदु 1</li>
            <li>मुख्य बिंदु 2</li>
            <li>मुख्य बिंदु 3</li>
          </ul>
          <div class="note">फ़ाइल-फ्री मोड: कंटेंट <code>app.js</code> की <code>CONTENT</code> मैप से आ रहा है।</div>
        </article>
      `;
    });
  });
  
  /* -------------------------
     DOM रेफरेंसेज़
     ------------------------- */
  const subjectButtonsEl = document.getElementById("subjectButtons");
  const topicListEl      = document.getElementById("topicList");
  const contentAreaEl    = document.getElementById("contentArea");
  
  /* -------------------------
     Active स्टेट ट्रैकिंग
     ------------------------- */
  let activeSubjectSlug = null;
  let activeTopicSlug = null;
  
  /* -------------------------
     Helper: element creator
     ------------------------- */
  function el(tag, attrs = {}, children = []){
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k,v])=>{
      if(k === "class") node.className = v;
      else if(k === "text") node.textContent = v;
      else if(k.startsWith("on") && typeof v === "function") node.addEventListener(k.substring(2), v);
      else node.setAttribute(k, v);
    });
    children.forEach(ch => node.appendChild(ch));
    return node;
  }
  
  /* ---------------------------------
     Render: Subject buttons (main)
     --------------------------------- */
  function renderSubjectButtons(){
    subjectButtonsEl.innerHTML = "";
    Object.entries(SUBJECTS).forEach(([subjectName, meta])=>{
      const btn = el("button", { class: "subject-btn", text: subjectName });
      btn.addEventListener("click", ()=> selectSubject(meta.slug));
      subjectButtonsEl.appendChild(btn);
    });
  }
  
  /* ----------------------------------------------------
     Select Subject: साइडबार में टॉपिक्स को भरें
     ---------------------------------------------------- */
  function selectSubject(slug){
    activeSubjectSlug = slug;
    activeTopicSlug = null;
    topicListEl.innerHTML = "";
  
    const entry = Object.entries(SUBJECTS).find(([, m]) => m.slug === slug);
    if(!entry) return;
    const [subjectName, meta] = entry;
  
    meta.topics.forEach(([topicName, topicSlug])=>{
      const btn = el("button", { class:"topic-btn", text: topicName });
      btn.addEventListener("click", ()=> loadTopic(slug, topicSlug, btn));
      topicListEl.appendChild(btn);
    });
  
    contentAreaEl.innerHTML = `
      <section class="welcome">
        <h2>${subjectName}</h2>
        <p class="muted">बाएँ से कोई टॉपिक चुनें ताकि उसका कंटेंट यहाँ लोड हो सके।</p>
      </section>
    `;
  
    // URL hash अपडेट करें (subject तक)
    location.hash = `#${slug}`;
  }
  
  /* ----------------------------------------------------
     Load Topic: JS मैप से कंटेंट लाएँ और दिखाएँ
     ---------------------------------------------------- */
  function loadTopic(subjectSlug, topicSlug, btnRef){
    activeTopicSlug = topicSlug;
  
    // Active UI
    [...document.querySelectorAll(".topic-btn")].forEach(b => b.classList.remove("active"));
    if(btnRef) btnRef.classList.add("active");
  
    const key = `${subjectSlug}/${topicSlug}`;
    const html = CONTENT[key] || `
      <article class="topic-article">
        <h1>कंटेंट नहीं मिला</h1>
        <p class="muted">Key: <code>${key}</code></p>
      </article>
    `;
    contentAreaEl.innerHTML = html;
  
    // URL hash अपडेट करें (subject/topic)
    location.hash = `#${subjectSlug}/${topicSlug}`;
  }
  
  /* ----------------------------------------------------
     Hash Routing: #cdp/theories_of_development जैसी direct लिंक
     ---------------------------------------------------- */
  function handleHashRoute(){
    const hash = location.hash.replace(/^#/, "");
    if(!hash) return; // कोई हैश नहीं
  
    const [sSlug, tSlug] = hash.split("/");
    if(!sSlug) return;
  
    // वैध subject?
    const isValidSubject = Object.values(SUBJECTS).some(m => m.slug === sSlug);
    if(!isValidSubject) return;
  
    // पहले subject चुनें, फिर वैकल्पिक रूप से topic
    selectSubject(sSlug);
  
    if(tSlug){
      // बटन बन जाने दें, फिर लोड करें
      setTimeout(()=>{
        // topic index के आधार पर बटन पकड़ें
        const meta = Object.values(SUBJECTS).find(m => m.slug === sSlug);
        const idx = meta.topics.findIndex(t => t[1] === tSlug);
        const btn = document.querySelectorAll(".topic-btn")[idx] || null;
        loadTopic(sSlug, tSlug, btn);
      }, 50);
    }
  }
  
  /* Init */
  renderSubjectButtons();
  window.addEventListener("hashchange", handleHashRoute);
  handleHashRoute();
  