
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

generator.forBlock['ai_duygu_tahmin_et'] = function(block) {
    return ['await window.aiAPI.getEmotion()', Order.NONE];
};
if (!window.javascript) generator['ai_duygu_tahmin_et'] = generator.forBlock['ai_duygu_tahmin_et'];
