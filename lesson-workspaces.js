const lessonWorkspaces = {
    1: `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="puan_var">Puan</variable>
  </variables>
  <block type="variables_set" x="50" y="50">
    <field name="VAR" id="puan_var">Puan</field>
    <value name="VALUE">
      <block type="math_random_int">
        <value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
        <value name="TO"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
      </block>
    </value>
    <next>
      <block type="text_print">
        <value name="TEXT">
          <block type="text_join">
            <mutation items="2"></mutation>
            <value name="ADD0"><block type="text"><field name="TEXT">Aldığın Puan: </field></block></value>
            <value name="ADD1"><block type="variables_get"><field name="VAR" id="puan_var">Puan</field></block></value>
          </block>
        </value>
        <next>
          <block type="controls_if">
            <mutation else="1"></mutation>
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">GT</field>
                <value name="A"><block type="variables_get"><field name="VAR" id="puan_var">Puan</field></block></value>
                <value name="B"><block type="math_number"><field name="NUM">50</field></block></value>
              </block>
            </value>
            <statement name="DO0">
              <block type="ai_metni_seslendir">
                <value name="TEXT"><block type="text"><field name="TEXT">Tebrikler, sınavı geçtin!</field></block></value>
                <next><block type="ai_arkaplan_renk"><field name="COLOR">green</field></block></next>
              </block>
            </statement>
            <statement name="ELSE">
              <block type="ai_metni_seslendir">
                <value name="TEXT"><block type="text"><field name="TEXT">Maalesef kaldın, tekrar dene.</field></block></value>
                <next><block type="ai_arkaplan_renk"><field name="COLOR">red</field></block></next>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,
    
    2: `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="sayac_var">GeriSayım</variable>
  </variables>
  <block type="variables_set" x="50" y="50">
    <field name="VAR" id="sayac_var">GeriSayım</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">5</field></block></value>
    <next>
      <block type="controls_repeat_ext">
        <value name="TIMES"><block type="math_number"><field name="NUM">5</field></block></value>
        <statement name="DO">
          <block type="ai_metni_seslendir">
            <value name="TEXT"><block type="variables_get"><field name="VAR" id="sayac_var">GeriSayım</field></block></value>
            <next>
              <block type="variables_set">
                <field name="VAR" id="sayac_var">GeriSayım</field>
                <value name="VALUE">
                  <block type="math_arithmetic">
                    <field name="OP">MINUS</field>
                    <value name="A"><block type="variables_get"><field name="VAR" id="sayac_var">GeriSayım</field></block></value>
                    <value name="B"><block type="math_number"><field name="NUM">1</field></block></value>
                  </block>
                </value>
                <next>
                  <block type="ai_bekle"><field name="SECONDS">1</field></block>
                </next>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="ai_arkaplan_renk">
            <field name="COLOR">red</field>
            <next>
              <block type="ai_metni_seslendir"><value name="TEXT"><block type="text"><field name="TEXT">Ateş!</field></block></value></block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

    3: `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="ai_kamera_ac" x="50" y="50">
    <next>
      <block type="ai_metni_seslendir">
        <value name="TEXT"><block type="text"><field name="TEXT">Güvenlik kamerası devrede. 10 saniye kayıt yapılacak.</field></block></value>
        <next>
          <block type="controls_repeat_ext">
            <value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value>
            <statement name="DO">
              <block type="text_print">
                <value name="TEXT"><block type="text"><field name="TEXT">Kayıt alınıyor...</field></block></value>
                <next>
                  <block type="ai_bekle"><field name="SECONDS">1</field></block>
                </next>
              </block>
            </statement>
            <next>
              <block type="ai_kamera_kapat">
                <next>
                  <block type="ai_metni_seslendir">
                    <value name="TEXT"><block type="text"><field name="TEXT">Kamera kapatıldı. Teşekkürler.</field></block></value>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

    4: `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="ses_var">Komut</variable>
  </variables>
  <block type="ai_kamera_ac" x="50" y="50">
    <next>
      <block type="ai_metni_seslendir">
        <value name="TEXT"><block type="text"><field name="TEXT">Renk asistanı hazır. Kırmızı, Yeşil veya Mavi deyin.</field></block></value>
        <next>
          <block type="controls_whileUntil">
            <field name="MODE">WHILE</field>
            <value name="BOOL"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value>
            <statement name="DO">
              <block type="variables_set">
                <field name="VAR" id="ses_var">Komut</field>
                <value name="VALUE"><block type="ai_ses_dinle"></block></value>
                <next>
                  <block type="controls_if">
                    <mutation elseif="2" else="1"></mutation>
                    <value name="IF0">
                      <block type="logic_compare">
                        <field name="OP">EQ</field>
                        <value name="A"><block type="variables_get"><field name="VAR" id="ses_var">Komut</field></block></value>
                        <value name="B"><block type="text"><field name="TEXT">kırmızı</field></block></value>
                      </block>
                    </value>
                    <statement name="DO0">
                      <block type="ai_renk_filtresi"><field name="COLOR">red</field>
                        <next><block type="ai_arkaplan_renk"><field name="COLOR">red</field></block></next>
                      </block>
                    </statement>
                    <value name="IF1">
                      <block type="logic_compare">
                        <field name="OP">EQ</field>
                        <value name="A"><block type="variables_get"><field name="VAR" id="ses_var">Komut</field></block></value>
                        <value name="B"><block type="text"><field name="TEXT">yeşil</field></block></value>
                      </block>
                    </value>
                    <statement name="DO1">
                      <block type="ai_renk_filtresi"><field name="COLOR">green</field>
                        <next><block type="ai_arkaplan_renk"><field name="COLOR">green</field></block></next>
                      </block>
                    </statement>
                    <value name="IF2">
                      <block type="logic_compare">
                        <field name="OP">EQ</field>
                        <value name="A"><block type="variables_get"><field name="VAR" id="ses_var">Komut</field></block></value>
                        <value name="B"><block type="text"><field name="TEXT">mavi</field></block></value>
                      </block>
                    </value>
                    <statement name="DO2">
                      <block type="ai_renk_filtresi"><field name="COLOR">blue</field>
                        <next><block type="ai_arkaplan_renk"><field name="COLOR">blue</field></block></next>
                      </block>
                    </statement>
                    <statement name="ELSE">
                      <block type="ai_renk_filtresi"><field name="COLOR">none</field>
                        <next><block type="ai_arkaplan_renk"><field name="COLOR">black</field></block></next>
                      </block>
                    </statement>
                  </block>
                </next>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

    5: `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="ai_kamera_ac" x="50" y="50">
    <next>
      <block type="ai_metni_seslendir">
        <value name="TEXT"><block type="text"><field name="TEXT">Yüz tespit güvenlik sistemi aktifleştiriliyor.</field></block></value>
        <next>
          <block type="ai_yuz_tespit_et">
            <next>
              <block type="ai_bekle">
                <field name="SECONDS">3</field>
                <next>
                  <block type="ai_metni_seslendir">
                    <value name="TEXT"><block type="text"><field name="TEXT">Yüzünüz başarıyla doğrulandı, sisteme hoş geldiniz.</field></block></value>
                    <next>
                      <block type="ai_arkaplan_renk"><field name="COLOR">green</field></block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

    6: `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="ai_kamera_ac" x="50" y="50">
    <next>
      <block type="ai_el_tespit_et">
        <next>
          <block type="ai_metni_seslendir">
            <value name="TEXT"><block type="text"><field name="TEXT">El takip asistanı başlatıldı. Hareketlerinizi izliyorum.</field></block></value>
            <next>
              <block type="controls_whileUntil">
                <field name="MODE">WHILE</field>
                <value name="BOOL"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value>
                <statement name="DO">
                  <block type="text_print">
                    <value name="TEXT"><block type="text"><field name="TEXT">Sanal fare kontrol ediliyor...</field></block></value>
                    <next>
                      <block type="ai_bekle"><field name="SECONDS">2</field></block>
                    </next>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

    7: `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="isim_var">MisafirAdı</variable>
  </variables>
  <block type="variables_set" x="50" y="50">
    <field name="VAR" id="isim_var">MisafirAdı</field>
    <value name="VALUE"><block type="text"><field name="TEXT">Ahmet</field></block></value>
    <next>
      <block type="ai_metni_seslendir">
        <value name="TEXT">
          <block type="text_join">
            <mutation items="2"></mutation>
            <value name="ADD0"><block type="text"><field name="TEXT">Yapay Zeka Laboratuvarına hoş geldin, </field></block></value>
            <value name="ADD1"><block type="variables_get"><field name="VAR" id="isim_var">MisafirAdı</field></block></value>
          </block>
        </value>
        <next>
          <block type="ai_bekle">
            <field name="SECONDS">3</field>
            <next>
              <block type="ai_metni_seslendir">
                <value name="TEXT"><block type="text"><field name="TEXT">Seninle çalışmak çok eğlenceli olacak.</field></block></value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

    8: `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="duyulan_var">Duyulan</variable>
  </variables>
  <block type="controls_whileUntil" x="50" y="50">
    <field name="MODE">WHILE</field>
    <value name="BOOL"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value>
    <statement name="DO">
      <block type="variables_set">
        <field name="VAR" id="duyulan_var">Duyulan</field>
        <value name="VALUE"><block type="ai_ses_dinle"></block></value>
        <next>
          <block type="controls_if">
            <mutation elseif="2" else="1"></mutation>
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">EQ</field>
                <value name="A"><block type="variables_get"><field name="VAR" id="duyulan_var">Duyulan</field></block></value>
                <value name="B"><block type="text"><field name="TEXT">merhaba</field></block></value>
              </block>
            </value>
            <statement name="DO0">
              <block type="ai_metni_seslendir"><value name="TEXT"><block type="text"><field name="TEXT">Sana da merhaba dostum!</field></block></value></block>
            </statement>
            <value name="IF1">
              <block type="logic_compare">
                <field name="OP">EQ</field>
                <value name="A"><block type="variables_get"><field name="VAR" id="duyulan_var">Duyulan</field></block></value>
                <value name="B"><block type="text"><field name="TEXT">nasılsın</field></block></value>
              </block>
            </value>
            <statement name="DO1">
              <block type="ai_metni_seslendir"><value name="TEXT"><block type="text"><field name="TEXT">Ben bir yapay zekayım, o yüzden hep mükemmelim!</field></block></value></block>
            </statement>
            <value name="IF2">
              <block type="logic_compare">
                <field name="OP">EQ</field>
                <value name="A"><block type="variables_get"><field name="VAR" id="duyulan_var">Duyulan</field></block></value>
                <value name="B"><block type="text"><field name="TEXT">kapat</field></block></value>
              </block>
            </value>
            <statement name="DO2">
              <block type="ai_metni_seslendir"><value name="TEXT"><block type="text"><field name="TEXT">Sistem kapanıyor. Görüşürüz.</field></block></value>
                <next><block type="controls_flow_statements"><field name="FLOW">BREAK</field></block></next>
              </block>
            </statement>
            <statement name="ELSE">
              <block type="text_print">
                <value name="TEXT">
                  <block type="text_join">
                    <mutation items="2"></mutation>
                    <value name="ADD0"><block type="text"><field name="TEXT">Dediğini tam anlamadım, şunu dedin: </field></block></value>
                    <value name="ADD1"><block type="variables_get"><field name="VAR" id="duyulan_var">Duyulan</field></block></value>
                  </block>
                </value>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>`,

    9: `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="text_print" x="50" y="50">
    <value name="TEXT"><block type="text"><field name="TEXT">Robotik Köpek Eğitimi Başlıyor!</field></block></value>
    <next>
      <block type="controls_repeat_ext">
        <value name="TIMES"><block type="math_number"><field name="NUM">100</field></block></value>
        <statement name="DO">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">Ödül maması verildi, oturmayı öğreniyor...</field></block></value>
          </block>
        </statement>
        <next>
          <block type="ai_metni_seslendir">
            <value name="TEXT"><block type="text"><field name="TEXT">Köpeğiniz artık komutlarınızı öğrendi!</field></block></value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

    10: `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="text_print" x="50" y="50">
    <value name="TEXT"><block type="text"><field name="TEXT">TensorFlow.js Ağı (Beyin Modeli) Başlatıldı.</field></block></value>
    <next>
      <block type="ai_bekle">
        <field name="SECONDS">2</field>
        <next>
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">Milyonlarca sinir hücresi bağlantısı kuruldu.</field></block></value>
            <next>
              <block type="ai_metni_seslendir">
                <value name="TEXT"><block type="text"><field name="TEXT">Ben dünyanın en zeki tarayıcısıyım!</field></block></value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

    11: `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="tahmin_var">Nesne</variable>
  </variables>
  <block type="text_print" x="50" y="50">
    <value name="TEXT"><block type="text"><field name="TEXT">Resim analiz ediliyor, lütfen bekleyin...</field></block></value>
    <next>
      <block type="variables_set">
        <field name="VAR" id="tahmin_var">Nesne</field>
        <value name="VALUE">
          <block type="ai_gorsel_siniflandir">
            <value name="IMAGE_URL"><block type="text"><field name="TEXT">https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Motorboat_at_Kankaria_lake.JPG/1200px-Motorboat_at_Kankaria_lake.JPG</field></block></value>
          </block>
        </value>
        <next>
          <block type="ai_metni_seslendir">
            <value name="TEXT">
              <block type="text_join">
                <mutation items="2"></mutation>
                <value name="ADD0"><block type="text"><field name="TEXT">Sanırım bu resimdeki şey bir: </field></block></value>
                <value name="ADD1"><block type="variables_get"><field name="VAR" id="tahmin_var">Nesne</field></block></value>
              </block>
            </value>
            <next>
              <block type="text_print">
                <value name="TEXT"><block type="variables_get"><field name="VAR" id="tahmin_var">Nesne</field></block></value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

    12: `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="renk_var">Renk</variable>
    <variable id="buyukluk_var">Büyüklük</variable>
  </variables>
  <block type="variables_set" x="50" y="50">
    <field name="VAR" id="renk_var">Renk</field>
    <value name="VALUE"><block type="text"><field name="TEXT">Kırmızı</field></block></value>
    <next>
      <block type="variables_set">
        <field name="VAR" id="buyukluk_var">Büyüklük</field>
        <value name="VALUE"><block type="text"><field name="TEXT">Küçük</field></block></value>
        <next>
          <block type="controls_if">
            <mutation else="1"></mutation>
            <value name="IF0">
              <block type="logic_operation">
                <field name="OP">AND</field>
                <value name="A">
                  <block type="logic_compare">
                    <field name="OP">EQ</field>
                    <value name="A"><block type="variables_get"><field name="VAR" id="renk_var">Renk</field></block></value>
                    <value name="B"><block type="text"><field name="TEXT">Kırmızı</field></block></value>
                  </block>
                </value>
                <value name="B">
                  <block type="logic_compare">
                    <field name="OP">EQ</field>
                    <value name="A"><block type="variables_get"><field name="VAR" id="buyukluk_var">Büyüklük</field></block></value>
                    <value name="B"><block type="text"><field name="TEXT">Küçük</field></block></value>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="ai_metni_seslendir"><value name="TEXT"><block type="text"><field name="TEXT">Bu bir Çilek olmalı!</field></block></value></block>
            </statement>
            <statement name="ELSE">
              <block type="ai_metni_seslendir"><value name="TEXT"><block type="text"><field name="TEXT">Bu nesneyi tanımlayamadım.</field></block></value></block>
            </statement>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

    13: `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="text_print" x="50" y="50">
    <value name="TEXT"><block type="text"><field name="TEXT">Sürükle bırak özelliği için dosya bekleniyor...</field></block></value>
    <next>
      <block type="ai_metni_seslendir">
        <value name="TEXT"><block type="text"><field name="TEXT">Resmin URL'sini girerseniz ne olduğunu bilebilirim.</field></block></value>
      </block>
    </next>
  </block>
</xml>`,

    14: `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="gurultu_var">Gürültü</variable>
  </variables>
  <block type="controls_whileUntil" x="50" y="50">
    <field name="MODE">WHILE</field>
    <value name="BOOL"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value>
    <statement name="DO">
      <block type="variables_set">
        <field name="VAR" id="gurultu_var">Gürültü</field>
        <value name="VALUE"><block type="ai_ses_seviyesi"></block></value>
        <next>
          <block type="controls_if">
            <mutation elseif="1" else="1"></mutation>
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">GT</field>
                <value name="A"><block type="variables_get"><field name="VAR" id="gurultu_var">Gürültü</field></block></value>
                <value name="B"><block type="math_number"><field name="NUM">60</field></block></value>
              </block>
            </value>
            <statement name="DO0">
              <block type="ai_arkaplan_renk"><field name="COLOR">red</field>
                <next><block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">Çok gürültülü! Lütfen sessiz olun.</field></block></value></block></next>
              </block>
            </statement>
            <value name="IF1">
              <block type="logic_compare">
                <field name="OP">GT</field>
                <value name="A"><block type="variables_get"><field name="VAR" id="gurultu_var">Gürültü</field></block></value>
                <value name="B"><block type="math_number"><field name="NUM">30</field></block></value>
              </block>
            </value>
            <statement name="DO1">
              <block type="ai_arkaplan_renk"><field name="COLOR">yellow</field></block>
            </statement>
            <statement name="ELSE">
              <block type="ai_arkaplan_renk"><field name="COLOR">green</field></block>
            </statement>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>`,

    15: `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="parmak_var">ParmakSayısı</variable>
  </variables>
  <block type="ai_kamera_ac" x="50" y="50">
    <next>
      <block type="ai_el_tespit_et">
        <next>
          <block type="ai_metni_seslendir">
            <value name="TEXT"><block type="text"><field name="TEXT">Parmaklarını kameraya göster!</field></block></value>
            <next>
              <block type="controls_whileUntil">
                <field name="MODE">WHILE</field>
                <value name="BOOL"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value>
                <statement name="DO">
                  <block type="variables_set">
                    <field name="VAR" id="parmak_var">ParmakSayısı</field>
                    <value name="VALUE"><block type="ai_parmak_say"></block></value>
                    <next>
                      <block type="controls_if">
                        <mutation elseif="1" else="1"></mutation>
                        <value name="IF0">
                          <block type="logic_compare">
                            <field name="OP">EQ</field>
                            <value name="A"><block type="variables_get"><field name="VAR" id="parmak_var">ParmakSayısı</field></block></value>
                            <value name="B"><block type="math_number"><field name="NUM">5</field></block></value>
                          </block>
                        </value>
                        <statement name="DO0">
                          <block type="ai_arkaplan_renk"><field name="COLOR">green</field>
                            <next>
                              <block type="ai_metni_seslendir"><value name="TEXT"><block type="text"><field name="TEXT">Çak bir beşlik!</field></block></value>
                                <next><block type="ai_bekle"><field name="SECONDS">3</field></block></next>
                              </block>
                            </next>
                          </block>
                        </statement>
                        <value name="IF1">
                          <block type="logic_compare">
                            <field name="OP">EQ</field>
                            <value name="A"><block type="variables_get"><field name="VAR" id="parmak_var">ParmakSayısı</field></block></value>
                            <value name="B"><block type="math_number"><field name="NUM">2</field></block></value>
                          </block>
                        </value>
                        <statement name="DO1">
                          <block type="ai_arkaplan_renk"><field name="COLOR">blue</field>
                            <next>
                              <block type="ai_metni_seslendir"><value name="TEXT"><block type="text"><field name="TEXT">Barış işareti! Kilit açıldı.</field></block></value>
                                <next><block type="ai_bekle"><field name="SECONDS">3</field></block></next>
                              </block>
                            </next>
                          </block>
                        </statement>
                        <statement name="ELSE">
                          <block type="ai_arkaplan_renk"><field name="COLOR">black</field>
                            <next><block type="ai_bekle"><field name="SECONDS">0.2</field></block></next>
                          </block>
                        </statement>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`
};
