Stat Bubbles v1.2.0 - grndgcc.github.io/trybb hazır paket

KURULUM
1) Bu ZIP içindeki dosyaları GitHub repo içindeki trybb klasörüne yükle/değiştir.
   trybb klasöründe direkt şu dosyalar görünmeli:
   - manifest.json
   - index.html
   - background.html
   - icon.svg
   - assets/

2) Tarayıcıdan kontrol et:
   https://grndgcc.github.io/trybb/manifest.json
   JSON olarak açılmalı ve version 1.2.0 görünmeli.

3) Owlbear Rodeo eklenti adresi aynı kalır:
   https://grndgcc.github.io/trybb/manifest.json

BU SÜRÜMDE DÜZELTİLENLER
- Kaydetme artık görünür/kalıcı harita label bubble'ı oluşturmaz.
- Bubble'lar sadece token üzerine gelince local POPOVER katmanında görünür.
- Pointer aracı aktifken hover modu otomatik etkinleşmeye çalışır; tokena gelince click gerekmeden açılır.
- Eski v1.1 kalıcı bubble'ları paneldeki "Eski kalıcı bubble’ları temizle" düğmesiyle silinir.
- Yerleşim daire/grit varsayımıyla değil token görselinin bounding box çevresine göre yapılır.
- Bubble'lar üst POPOVER katmanında çizildiği için büyük resimlerin altında kalmaz.

KULLANIM
1) GM olarak sahnede bir karakter token'ı seç.
2) Statları gir ve "Seçili token’a kaydet" de.
3) Eski v1.1 bubble'ları hâlâ görünüyorsa "Eski kalıcı bubble’ları temizle" düğmesine bas.
4) Pointer aracı aktifken imleci token üzerine getir; bubble'lar token çevresinde görünür.
