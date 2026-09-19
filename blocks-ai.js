// Custom AI Blocks Definition
Blockly.defineBlocksWithJsonArray([
    // CAMERA BLOCKS
    {
        "type": "ai_kamera_ac",
        "message0": "Kamerayı Aç",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Web kamerasını başlatır",
        "helpUrl": ""
    },
    {
        "type": "ai_kamera_kapat",
        "message0": "Kamerayı Kapat",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Web kamerasını durdurur",
        "helpUrl": ""
    },
    {
        "type": "ai_renk_filtresi",
        "message0": "%1 Rengini Filtrele",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    ["Kırmızı", "red"],
                    ["Yeşil", "green"],
                    ["Mavi", "blue"],
                    ["Temizle", "none"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Kamerada belirli bir rengi ön plana çıkarır",
        "helpUrl": ""
    },
    
    // TEXT TO SPEECH
    {
        "type": "ai_metni_seslendir",
        "message0": "Seslendir: %1",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160,
        "tooltip": "Yazılan metni sesli okur",
        "helpUrl": ""
    },

    // SPEECH RECOGNITION
    {
        "type": "ai_ses_dinle",
        "message0": "Mikrofonu Dinle (Sonucu Al)",
        "output": "String",
        "colour": 160,
        "tooltip": "Mikrofonu açıp konuşmayı metne çevirir",
        "helpUrl": ""
    },

    // ML5 VISION
    {
        "type": "ai_yuz_tespit_et",
        "message0": "Yüz Tespit Etmeye Başla",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 290,
        "tooltip": "Kamerada yüz arar",
        "helpUrl": ""
    },
    {
        "type": "ai_el_tespit_et",
        "message0": "El Hareketlerini İzle",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 290,
        "tooltip": "Kamerada el hareketlerini arar",
        "helpUrl": ""
    },
    {
        "type": "ai_gorsel_siniflandir",
        "message0": "Görseli Sınıflandır %1",
        "args0": [
            {
                "type": "input_value",
                "name": "IMAGE_URL",
                "check": "String"
            }
        ],
        "output": "String",
        "colour": 290,
        "tooltip": "Resmin ne olduğunu tahmin eder",
        "helpUrl": ""
    },
    // YENI BLOKLAR (NEW BLOCKS)
    {
        "type": "ai_bekle",
        "message0": "%1 saniye bekle",
        "args0": [
            {
                "type": "field_number",
                "name": "SECONDS",
                "value": 1,
                "min": 0
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 120,
        "tooltip": "Belirtilen süre kadar bekler",
        "helpUrl": ""
    },
    {
        "type": "ai_arkaplan_renk",
        "message0": "Arka Planı %1 Yap",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    ["Kırmızı", "red"],
                    ["Mavi", "blue"],
                    ["Sarı", "yellow"],
                    ["Yeşil", "green"],
                    ["Siyah (Karart)", "black"],
                    ["Beyaz", "white"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Sonuç ekranının arka plan rengini değiştirir",
        "helpUrl": ""
    },
    {
        "type": "ai_ses_seviyesi",
        "message0": "Ortam Ses Seviyesini Ölç (0-100)",
        "output": "Number",
        "colour": 160,
        "tooltip": "Mikrofondan gelen anlık ses yüksekliğini ölçer",
        "helpUrl": ""
    },
    {
        "type": "ai_parmak_say",
        "message0": "Gösterilen Parmak Sayısını Bul",
        "output": "Number",
        "colour": 290,
        "tooltip": "Kameradaki elde kaç parmağın havada olduğunu sayar",
        "helpUrl": ""
    },
    {
        "type": "ai_sanal_imlec_ac",
        "message0": "🖱️ El Hareketleriyle Fareyi Kontrol Et",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210,
        "tooltip": "El hareketleri ile ekranda bir fare imleci çıkarır ve parmak kıstırma hareketiyle tıklama/sürükleme sağlar.",
        "helpUrl": ""
    },
    {
        "type": "ai_sanal_imlec_sesle",
        "message0": "🖱️ Fareyi %1 Kaydır",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "YON",
                "options": [
                    ["Yukarı ⬆️", "yukarı"],
                    ["Aşağı ⬇️", "aşağı"],
                    ["Sağ ➡️", "sağ"],
                    ["Sol ⬅️", "sol"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210,
        "tooltip": "Sanal fareyi belirtilen yönde hareket ettirir.",
        "helpUrl": ""
    },
    {
        "type": "ai_sanal_imlec_tikla",
        "message0": "🖱️ Fare ile Tıklama Yap",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210,
        "tooltip": "Sanal farenin bulunduğu noktada tıklama yapar.",
        "helpUrl": ""
    }
]);

// Helper to get generator
const generator = window.javascript ? window.javascript.javascriptGenerator : Blockly.JavaScript;
const Order = window.javascript ? window.javascript.Order : {
    ATOMIC: Blockly.JavaScript.ORDER_ATOMIC,
    NONE: Blockly.JavaScript.ORDER_NONE
};

// JavaScript Generators for the blocks

generator.forBlock['ai_sanal_imlec_ac'] = function(block) {
    return 'window.aiAPI.enableVirtualCursor();\n';
};
if (!window.javascript) generator['ai_sanal_imlec_ac'] = generator.forBlock['ai_sanal_imlec_ac'];

generator.forBlock['ai_sanal_imlec_sesle'] = function(block) {
    const yon = block.getFieldValue('YON');
    return `window.aiAPI.moveVirtualCursorByVoice('${yon}');\n`;
};
if (!window.javascript) generator['ai_sanal_imlec_sesle'] = generator.forBlock['ai_sanal_imlec_sesle'];

generator.forBlock['ai_sanal_imlec_tikla'] = function(block) {
    return 'window.aiAPI.clickVirtualCursor();\n';
};
if (!window.javascript) generator['ai_sanal_imlec_tikla'] = generator.forBlock['ai_sanal_imlec_tikla'];

generator.forBlock['ai_kamera_ac'] = function(block) {
    return 'await window.aiAPI.startCamera();\n';
};
// Fallback for older Blockly versions
if (!window.javascript) {
    generator['ai_kamera_ac'] = generator.forBlock['ai_kamera_ac'];
}

generator.forBlock['ai_kamera_kapat'] = function(block) {
    return 'window.aiAPI.stopCamera();\n';
};
if (!window.javascript) generator['ai_kamera_kapat'] = generator.forBlock['ai_kamera_kapat'];

generator.forBlock['ai_renk_filtresi'] = function(block) {
    var dropdown_color = block.getFieldValue('COLOR');
    return 'window.aiAPI.applyColorFilter("' + dropdown_color + '");\n';
};
if (!window.javascript) generator['ai_renk_filtresi'] = generator.forBlock['ai_renk_filtresi'];


generator.forBlock['ai_metni_seslendir'] = function(block) {
    var value_text = generator.valueToCode(block, 'TEXT', Order.ATOMIC) || "''";
    return 'window.aiAPI.speakText(' + value_text + ');\n';
};
if (!window.javascript) generator['ai_metni_seslendir'] = generator.forBlock['ai_metni_seslendir'];

generator.forBlock['ai_ses_dinle'] = function(block) {
    return ['await window.aiAPI.listenToSpeech()', Order.NONE];
};
if (!window.javascript) generator['ai_ses_dinle'] = generator.forBlock['ai_ses_dinle'];


generator.forBlock['ai_yuz_tespit_et'] = function(block) {
    return 'await window.aiAPI.startFaceTracking();\n';
};
if (!window.javascript) generator['ai_yuz_tespit_et'] = generator.forBlock['ai_yuz_tespit_et'];


generator.forBlock['ai_el_tespit_et'] = function(block) {
    return 'await window.aiAPI.startHandTracking();\n';
};
if (!window.javascript) generator['ai_el_tespit_et'] = generator.forBlock['ai_el_tespit_et'];


generator.forBlock['ai_gorsel_siniflandir'] = function(block) {
    var value_image_url = generator.valueToCode(block, 'IMAGE_URL', Order.ATOMIC) || "''";
    var code = 'await window.aiAPI.classifyImage(' + value_image_url + ')';
    return [code, Order.NONE];
};
if (!window.javascript) generator['ai_gorsel_siniflandir'] = generator.forBlock['ai_gorsel_siniflandir'];
 
generator.forBlock['ai_bekle'] = function(block) {
    var seconds = block.getFieldValue('SECONDS');
    return 'await window.aiAPI.wait(' + seconds + ');\n';
};
if (!window.javascript) generator['ai_bekle'] = generator.forBlock['ai_bekle'];

generator.forBlock['ai_arkaplan_renk'] = function(block) {
    var color = block.getFieldValue('COLOR');
    return 'window.aiAPI.setBackgroundColor("' + color + '");\n';
};
if (!window.javascript) generator['ai_arkaplan_renk'] = generator.forBlock['ai_arkaplan_renk'];

generator.forBlock['ai_ses_seviyesi'] = function(block) {
    return ['await window.aiAPI.getAudioLevel()', Order.NONE];
};
if (!window.javascript) generator['ai_ses_seviyesi'] = generator.forBlock['ai_ses_seviyesi'];

generator.forBlock['ai_parmak_say'] = function(block) {
    return ['await window.aiAPI.countFingers()', Order.NONE];
};
if (!window.javascript) generator['ai_parmak_say'] = generator.forBlock['ai_parmak_say'];