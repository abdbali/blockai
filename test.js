const lessons = [
    {
        id: 1,
        title: "Ders 1: KoÅŸullu Durumlar",
        description: "EÄŸer - Ä°se yapÄ±larÄ±nÄ± kullanarak karar verme mekanizmalarÄ± oluÅŸturalÄ±m.",
        icon: "fa-code-branch",
        blocks: ['controls_if', 'logic_compare', 'math_number', 'text_print']
    },
    {
        id: 2,
        title: "Ders 2: DÃ¶ngÃ¼ler ve Tekrar",
        description: "AynÄ± iÅŸlemi defalarca yapmak iÃ§in dÃ¶ngÃ¼leri (Loops) kullanalÄ±m.",
        icon: "fa-rotate-right",
        blocks: ['controls_repeat_ext', 'math_number', 'text_print']
    },
    {
        id: 3,
        title: "Ders 3: Kamera ve Piksel",
        description: "TarayÄ±cÄ±da kamerayÄ± aÃ§mayÄ± ve gÃ¶rÃ¼ntÃ¼nÃ¼n piksellerden oluÅŸtuÄŸunu Ã¶ÄŸrenelim.",
        icon: "fa-camera",
        blocks: ['ai_kamera_ac', 'ai_kamera_kapat']
    },
    {
        id: 4,
        title: "Ders 4: Renk Filtreleme",
        description: "Kamera gÃ¶rÃ¼ntÃ¼sÃ¼ndeki pikselleri analiz edip renkleri filtreleyelim.",
        icon: "fa-palette",
        blocks: ['ai_kamera_ac', 'ai_renk_filtresi']
    },
    {
        id: 5,
        title: "Ders 5: YÃ¼z Konumu Takibi",
        description: "Yapay zeka (ml5.js) ile kameradaki yÃ¼zleri tespit edip takip edelim.",
        icon: "fa-face-smile",
        blocks: ['ai_kamera_ac', 'ai_yuz_tespit_et', 'ai_yuz_koordinat']
    },
    {
        id: 6,
        title: "Ders 6: El Hareketi (Jest)",
        description: "El hareketlerini algÄ±layÄ±p ekranda simÃ¼lasyon yapalÄ±m.",
        icon: "fa-hand",
        blocks: ['ai_kamera_ac', 'ai_el_tespit_et', 'ai_parmak_sayisi']
    },
    {
        id: 7,
        title: "Ders 7: Metinden Sese",
        description: "YazdÄ±ÄŸÄ±mÄ±z metinleri bilgisayara sesli olarak okutalÄ±m (Text-to-Speech).",
        icon: "fa-volume-high",
        blocks: ['ai_metni_seslendir', 'text']
    },
    {
        id: 8,
        title: "Ders 8: Ses TanÄ±ma",
        description: "KonuÅŸtuklarÄ±mÄ±zÄ± metne Ã§evirelim (Speech Recognition).",
        icon: "fa-microphone",
        blocks: ['ai_ses_dinle', 'ai_ses_sonucu']
    },
    {
        id: 9,
        title: "Ders 9: Makine Ã–ÄŸrenmesi",
        description: "Makine Ã¶ÄŸrenmesinin temellerini kavrayalÄ±m.",
        icon: "fa-brain",
        blocks: ['ai_model_egit', 'ai_veri_ekle']
    },
    {
        id: 10,
        title: "Ders 10: Sohbet Botu (Chatbot)",
        description: "Yapay zeka ile karÅŸÄ±lÄ±klÄ± konuÅŸabilen akÄ±llÄ± bir sesli asistan tasarlayalÄ±m.",
        icon: "fa-robot",
        blocks: ['ai_metni_seslendir', 'ai_ses_dinle', 'ai_arkaplan_renk'] 
    },
    {
        id: 11,
        title: "Ders 11: El Hareketleri ile Fare KontrolÃ¼",
        description: "Kameraya elinizi gÃ¶stererek ekrandaki sanal fareyi tÄ±pkÄ± sihir gibi hareket ettirin.",
        icon: "fa-hand-pointer",
        blocks: ['ai_kamera_ac', 'ai_el_tespit_et', 'ai_sanal_imlec_ac', 'ai_metni_seslendir', 'ai_bekle'] 
    },
    {
        id: 12,
        title: "Ders 12: El ile Blok KontrolÃ¼",
        description: "BaÅŸ parmak ve iÅŸaret parmaÄŸÄ±nÄ±zÄ± birleÅŸtirerek ekrandaki Ã¶ÄŸeleri havadan sÃ¼rÃ¼kleyin.",
        icon: "fa-hand-grab",
        blocks: ['ai_kamera_ac', 'ai_el_tespit_et', 'ai_sanal_imlec_ac', 'ai_metni_seslendir', 'ai_bekle'] 
    },
    {
        id: 13,
        title: "Ders 13: Ses ile Fare YÃ¶nlendirme",
        description: "'YukarÄ±', 'AÅŸaÄŸÄ±', 'SaÄŸ', 'Sol' komutlarÄ±yla veya 'TÄ±kla' diyerek farenizi sadece sesinizle yÃ¶netin.",
        icon: "fa-microphone-alt",
        blocks: ['ai_ses_dinle', 'ai_sanal_imlec_ac', 'ai_sanal_imlec_sesle', 'ai_sanal_imlec_tikla', 'ai_metni_seslendir'] 
    },
    {
        id: 14,
        title: "Ders 14: Ses Seviyesi ve Ã‡evre",
        description: "Mikrofondaki ses yÃ¼ksekliÄŸini Ã¶lÃ§erek ortamÄ± analiz edelim.",
        icon: "fa-volume-low",
        blocks: ['ai_ses_seviyesi', 'ai_arkaplan_renk']
    },
    {
        id: 15,
        title: "Ders 15: Parmak Sayma (Handpose)",
        description: "Yapay zeka ile kameraya gÃ¶sterdiÄŸimiz parmak sayÄ±sÄ±nÄ± bulalÄ±m.",
        icon: "fa-hand-peace",
        blocks: ['ai_el_tespit_et', 'ai_parmak_say']
    }
];
