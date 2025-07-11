# 🎓 Pixel Sınav: Öğrenme Yolculuğumun En Kapsamlı Projesi

Merhaba! Ben Poyraz Avsever. Yazılım öğrenme sürecimde yeni bir seviyeye geçmek, hem teknik becerilerimi geliştirmek hem de anlamlı bir ürün ortaya koymak için Pixel Sınav adını verdiğim bu projeyi geliştirdim.

Pixel Sınav, öğretmenlerin ders içerikleri oluşturabildiği ve öğrencilerin bu içerikleri takip ederek gelişimlerini görebildiği, modern web teknolojileriyle hazırlanmış kapsamlı bir eğitim platformudur. 

Bu yazıda projenin gelişim sürecini, kullandığım teknolojileri, karşılaştığım zorlukları, öğrendiklerimi ve gelecek planlarımı detaylı olarak anlatacağım.

---

## Projenin Amacı ve Arka Planı

Bu projeye başlama motivasyonum iki temel sebebe dayanıyor:

1. Artık daha kaliteli, daha geniş kapsamlı ve daha zor projeler geliştirmek istiyorum.
2. NestJS ve Docker gibi backend odaklı teknolojileri öğrenmek istiyordum.

Ayrıca eğitim teknolojileri alanına olan ilgim ve bu alanda projeler geliştirme isteğim de Pixel Sınav'ın konseptini şekillendirdi. Eğitim alanında dijitalleşmenin arttığı bu dönemde, öğretici içeriklerle kullanıcıları buluşturmayı hedefleyen bir platform geliştirmek istedim.

---

## Neden Eğitim Platformu?

Eğitim teknolojileri, kişisel gelişimimle örtüşen ve aynı zamanda toplumsal fayda üreten bir alan. Öğretmenlerin içerik oluşturabildiği, öğrencilerin ise kendi hızlarında öğrenme süreçlerini takip edebildiği bir sistem fikri bana hem motive edici hem de teknik olarak zorlayıcı geldi.

Bu sayede hem frontend hem backend alanında birçok konsepti uygulamalı olarak öğrenme fırsatı yakaladım.

---

## Teknoloji Yığını

Projenin teknolojik altyapısını oluştururken JS ekosisteminde kalmaya karar verdim. Bu sayede Next.js ve NestJS gibi birbirini tamamlayan teknolojilerle hem frontend hem backend geliştirmeyi aynı dilde (TypeScript) sürdürebildim.

### Kullanılan Ana Teknolojiler

| Teknoloji | İkon | Açıklama |
|----------|------|----------|
| **Next.js** | ![Next.js](https://skillicons.dev/icons?i=next) | React tabanlı, SSR destekli modern frontend framework |
| **React** | ![React](https://skillicons.dev/icons?i=react) | Bileşen tabanlı kullanıcı arayüzü kütüphanesi |
| **TailwindCSS** | ![Tailwind](https://skillicons.dev/icons?i=tailwind) | Utility-first CSS framework |
| **NestJS** | ![NestJS](https://skillicons.dev/icons?i=nestjs) | TypeScript tabanlı progressive Node.js framework |
| **MongoDB** | ![MongoDB](https://skillicons.dev/icons?i=mongodb) | NoSQL veritabanı çözümü |
| **TypeScript** | ![TS](https://skillicons.dev/icons?i=ts) | JavaScript'in tip güvenli süper kümesi |
| **Docker** | ![Docker](https://skillicons.dev/icons?i=docker) | Uygulamaları izole ortamlarda çalıştırmak için container teknolojisi |
| **Jest** | ![Jest](https://skillicons.dev/icons?i=jest) | JavaScript test framework'ü |

### Diğer Kütüphaneler

- **Framer Motion** – Profesyonel animasyonlar
- **React Markdown** – Markdown içerik desteği
- **Chart.js + react-chartjs-2** – Öğrenci ilerlemesini grafiklerle göstermek
- **React Hot Toast** – Kullanıcı bildirimleri

---

## Tasarım Süreci

UI/UX tarafında referans aldığım platform **[Codedex](https://www.codedex.io/)** oldu. İlham verici renk paletleri, sade tipografi ve kullanıcı dostu yapı, tasarım kararlarımı etkiledi.

Tasarımı ben hazırladım ve şunlara dikkat ettim:

- Renk kontrastları
- Yazı tipi okunabilirliği
- Tutarlı spacing/margin yapısı
- Mobil uyum ve responsive grid sistemi

🔗 **Frontend Kodları:** [GitHub - PixelSinav-Frontend](https://github.com/poyrazavsever/PixelSinav-Frontend)  
🔗 **Backend Kodları:** [GitHub - PixelSinav-Backend](https://github.com/poyrazavsever/PixelSinav-Backend)

---

## Kullanıcı Rolleri ve Yapılar

Pixel Sınav’da iki temel kullanıcı tipi bulunuyor:

1. **Öğretmen:** Ders oluşturabilir, içerik ekleyebilir, öğrenci ilerlemesini görebilir.
2. **Öğrenci:** Derslere kayıt olabilir, içerik okuyabilir, kendi gelişimini takip edebilir.

Bu rollere göre sistemde authentication, authorization ve özel endpoint'ler tanımlandı.

---

## Geliştirme Süreci

### Başlangıç
Projeye frontend ile başladım. İlk olarak kullanıcı girişi, kayıt olma ve JWT ile authentication yapılarını kurdum. Ardından öğretmen paneline geçerek ders oluşturma modülünü yazdım.

### Backend Entegrasyonu
NestJS ile backend tarafını sıfırdan öğrendim. En çok zorlandığım alanlar modüler yapı kurmak ve Swagger ile API dokümantasyonu oluşturmak oldu.

Kısa sürede şunları başardım:

- Kullanıcı kayıt/giriş
- JWT ile token bazlı güvenli oturum
- E-posta doğrulama sistemi
- Ders oluşturma, listeleme, silme
- Öğretmen bazlı filtreleme

---

## Authentication & Authorization

NestJS backend'inde JWT tabanlı kimlik doğrulama sistemi kuruldu. Kullanıcı rolleri doğrultusunda korunan endpoint'ler oluşturuldu. Swagger/OpenAPI ile API dokümantasyonu hazırlandı.

### Örnek Endpoint'ler:

- `POST /auth/register` – Kayıt ol
- `POST /auth/login` – Giriş yap ve token al
- `POST /lessons` – Yeni ders oluştur (sadece öğretmen)
- `GET /lessons/teacher/:id` – Öğretmene ait dersleri listele

---

## Test, Validasyon ve Güvenlik

- **Validation Pipe**: NestJS içerisinde class-validator ile her API isteği filtrelendi.
- **Jest**: Backend test altyapısı için Jest eklendi.
- **Rate Limiting**: Kimliği doğrulanmamış kullanıcılar için saatlik istek sınırı getirildi.

---

## Öğrendiklerim

Bu projeyle birlikte:

- **NestJS mimarisi** konusunda ciddi yol katettim.
- **MongoDB aggregation** ile veri filtreleme yapısını öğrendim.
- **Clean Architecture** kavramını backend'de uygulamaya başladım.
- **Responsive UI tasarımı** konusunda pratiğimi güçlendirdim.

---

## Gelecek Planları

Projeyi ilerletmeyi düşünüyorum. Aklımda şunlar var:

- React Native ile mobil uygulama versiyonunu geliştirmek
- Gelişmiş sınav sonuç analiz sistemleri
- Gerçek zamanlı bildirim altyapısı
- Admin paneli ve rapor ekranları

---

## Son Söz

Pixel Sınav benim için sadece bir proje değil; kendimi test ettiğim, geliştirdiğim ve vizyonumu şekillendirdiğim bir öğrenme platformu oldu.

Eğer siz de benzer bir yolculuğa çıkmak istiyorsanız bu projeyi klonlayabilir, katkı sunabilir veya yıldızlayarak destek olabilirsiniz ⭐

---

## Faydalı Bağlantılar

- [Frontend Repo](https://github.com/poyrazavsever/PixelSinav-Frontend)
- [Backend Repo](https://github.com/poyrazavsever/PixelSinav-Backend)
- [Figma Tasarım](https://www.figma.com/design/9lpzqI7EmUKKfEh0S7vfWO/Pixel-S%C4%B1nav?node-id=0-1&p=f&t=CHImoBwT1CzSSeqd-0)
- [LinkedIn](https://www.linkedin.com/in/poyrazavsever)
- [Email](mailto:poyrazavsever@gmail.com)

---

Teşekkürler! 🙌
