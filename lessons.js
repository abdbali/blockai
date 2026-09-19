const lessons = [
    {
        id: 1,
        title: "Ders 1: Koşullu Durumlar",
        description: "Eğer - İse yapılarını kullanarak karar verme mekanizmaları oluşturalım.",
        icon: "fa-code-branch",
        blocks: ['controls_if', 'logic_compare', 'math_number', 'text_print']
    },
    {
        id: 2,
        title: "Ders 2: Döngüler ve Tekrar",
        description: "Aynı işlemi defalarca yapmak için döngüleri (Loops) kullanalım.",
        icon: "fa-rotate-right",
        blocks: ['controls_repeat_ext', 'math_number', 'text_print']
    },
    {
        id: 3,
        title: "Ders 3: Kamera ve Piksel",
        description: "Tarayıcıda kamerayı açmayı ve görüntünün piksellerden oluştuğunu öğrenelim.",
        icon: "fa-camera",
        blocks: ['ai_kamera_ac', 'ai_kamera_kapat']
    },
    {
        id: 4,
        title: "Ders 4: Renk Filtreleme",
        description: "Kamera görüntüsündeki pikselleri analiz edip renkleri filtreleyelim.",
        icon: "fa-palette",
        blocks: ['ai_kamera_ac', 'ai_renk_filtresi']
    },
    {
        id: 5,
        title: "Ders 5: Yüz Konumu Takibi",
        description: "Yapay zeka (ml5.js) ile kameradaki yüzleri tespit edip takip edelim.",
        icon: "fa-face-smile",
        blocks: ['ai_kamera_ac', 'ai_yuz_tespit_et', 'ai_yuz_koordinat']
    },
    {
        id: 6,
        title: "Ders 6: El Hareketi (Jest)",
        description: "El hareketlerini algılayıp ekranda simülasyon yapalım.",
        icon: "fa-hand",
        blocks: ['ai_kamera_ac', 'ai_el_tespit_et', 'ai_parmak_sayisi']
    },
    {
        id: 7,
        title: "Ders 7: Metinden Sese",
        description: "Yazdığımız metinleri bilgisayara sesli olarak okutalım (Text-to-Speech).",
        icon: "fa-volume-high",
        blocks: ['ai_metni_seslendir', 'text']
    },
    {
        id: 8,
        title: "Ders 8: Ses Tanıma",
        description: "Konuştuklarımızı metne çevirelim (Speech Recognition).",
        icon: "fa-microphone",
        blocks: ['ai_ses_dinle', 'ai_ses_sonucu']
    },
    {
        id: 9,
        title: "Ders 9: Makine Öğrenmesi",
        description: "Makine öğrenmesinin temellerini kavrayalım.",
        icon: "fa-brain",
        blocks: ['ai_model_egit', 'ai_veri_ekle']
    },
    {
        id: 10,
        title: "Ders 10: Sohbet Botu (Chatbot)",
        description: "Yapay zeka ile karşılıklı konuşabilen akıllı bir sesli asistan tasarlayalım.",
        icon: "fa-robot",
        blocks: ['ai_metni_seslendir', 'ai_ses_dinle', 'ai_arkaplan_renk'] 
    },
    {
        id: 11,
        title: "Ders 11: El Hareketleri ile Fare Kontrolü",
        description: "Kameraya elinizi göstererek ekrandaki sanal fareyi tıpkı sihir gibi hareket ettirin.",
        icon: "fa-hand-pointer",
        blocks: ['ai_kamera_ac', 'ai_el_tespit_et', 'ai_sanal_imlec_ac', 'ai_metni_seslendir', 'ai_bekle'] 
    },
    {
        id: 12,
        title: "Ders 12: El ile Blok Kontrolü",
        description: "Baş parmak ve işaret parmağınızı birleştirerek ekrandaki öğeleri havadan sürükleyin.",
        icon: "fa-hand-grab",
        blocks: ['ai_kamera_ac', 'ai_el_tespit_et', 'ai_sanal_imlec_ac', 'ai_metni_seslendir', 'ai_bekle'] 
    },
    {
        id: 13,
        title: "Ders 13: Ses ile Fare Yönlendirme",
        description: "'Yukarı', 'Aşağı', 'Sağ', 'Sol' komutlarıyla veya 'Tıkla' diyerek farenizi sadece sesinizle yönetin.",
        icon: "fa-microphone-alt",
        blocks: ['ai_ses_dinle', 'ai_sanal_imlec_ac', 'ai_sanal_imlec_sesle', 'ai_sanal_imlec_tikla', 'ai_metni_seslendir'] 
    },
    {
        id: 14,
        title: "Ders 14: Ses Seviyesi ve Çevre",
        description: "Mikrofondaki ses yüksekliğini ölçerek ortamı analiz edelim.",
        icon: "fa-volume-low",
        blocks: ['ai_ses_seviyesi', 'ai_arkaplan_renk']
    },
    {
        id: 15,
        title: "Ders 15: Parmak Sayma (Handpose)",
        description: "Yapay zeka ile kameraya gösterdiğimiz parmak sayısını bulalım.",
        icon: "fa-hand-peace",
        blocks: ['ai_el_tespit_et', 'ai_parmak_say']
    }
];
