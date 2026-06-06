STAT BUBBLES - GITHUB PAGES READY BUILD

Bu klasördeki dosyalar doğrudan GitHub Pages kök dizinine yüklenecek hazır build dosyalarıdır.

Kullanım:
1) Yeni bir GitHub repo oluştur: owlbear-stat-bubbles
2) Bu ZIP'in içindeki dosyaları repo köküne yükle:
   - manifest.json
   - index.html
   - background.html
   - icon.svg
   - assets/...
3) GitHub -> Settings -> Pages:
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
4) Pages yayına girdikten sonra Owlbear extension manifest URL'si:
   https://KULLANICI_ADI.github.io/owlbear-stat-bubbles/manifest.json

ÖNEMLİ:
- Owlbear'a github.com/.../blob/... linki verme. Bu JSON değil HTML sayfasıdır.
- raw.githubusercontent.com linki yerine GitHub Pages linki kullan.
- manifest URL tarayıcıda açılınca JSON metni görünmeli ve 404 vermemeli.
