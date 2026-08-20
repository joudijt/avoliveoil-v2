import type { Article } from './types';

const PUBLISHED = '2026-08-01';
const MODIFIED = '2026-08-01';

/**
 * Bahasa Melayu article bodies. Ids match `en.ts` and `ar.ts` so the registry
 * can pair them for hreflang. The copy is written natively for Malaysian
 * readers rather than translated line by line from the English version.
 */
export const MS_ARTICLES: Article[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'olive-oil-popularity-malaysia',
    slug: 'mengapa-minyak-zaitun-semakin-popular-di-malaysia',

    seoTitle: 'Mengapa Minyak Zaitun Semakin Popular di Malaysia (Panduan 2026)',
    metaTitle: 'Mengapa Minyak Zaitun Semakin Popular di Malaysia',
    metaDescription:
      'Minyak zaitun kini bukan lagi barang hadiah — ia sudah masuk dapur rakyat Malaysia. Ini punca sebenarnya: kesedaran kesihatan, status halal, masakan Arab dan Mediterranean, serta kemudahan membeli dalam talian.',
    focusKeyword: 'minyak zaitun Malaysia',
    relatedKeywords: [
      'minyak zaitun di Malaysia',
      'kenapa minyak zaitun popular',
      'minyak zaitun dara Malaysia',
      'minyak zaitun halal',
      'minyak zaitun untuk memasak',
      'harga minyak zaitun Malaysia',
      'jenama minyak zaitun terbaik Malaysia',
      'beli minyak zaitun online',
      'minyak zaitun extra virgin',
      'minyak zaitun Palestin',
      'minyak zaitun vs minyak sawit',
      'manfaat minyak zaitun',
    ],

    category: 'Panduan Minyak Zaitun',
    tags: ['Minyak Zaitun Malaysia', 'Trend Makanan', 'Makanan Halal', 'Masakan Sihat', 'Extra Virgin'],

    h1: 'Mengapa Minyak Zaitun Semakin Popular di Malaysia',
    excerpt:
      'Dahulu minyak zaitun hanya barang hadiah yang tersimpan dalam kotak. Hari ini ia berdiri di sebelah dapur, digunakan untuk tumis, salad dan amalan harian. Inilah sebab perubahan itu berlaku.',
    keyTakeaway:
      'Minyak zaitun semakin popular di Malaysia kerana empat perkara berlaku serentak: kesedaran tentang penyakit berkaitan pemakanan, keyakinan halal kerana ia minyak tumbuhan tulen, penyebaran masakan Arab dan Mediterranean, serta e-dagang yang menjadikan minyak zaitun dara import mampu dimiliki keluarga biasa.',

    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    readingTime: 11,

    hero: {
      src: 'bottleField',
      alt: 'Botol minyak zaitun dara Arabian Village berdiri di dalam kebun zaitun ketika senja',
    },
    ogImage: '/og/blog-olive-oil-popularity-malaysia.jpg',

    intro: [
      'Sepuluh tahun lalu, minyak zaitun di Malaysia ialah barang hadiah. Datang dalam kotak cantik, dibeli untuk orang lain, dan selalunya tersimpan sebelah kurma sehingga akhirnya digunakan pada satu salad yang tiada siapa minta.',
      'Gambarannya sudah berubah. Masuk sahaja ke pasar raya besar di Lembah Klang, minyak zaitun kini ada ruang raknya sendiri — beberapa gred, beberapa julat harga. Buka Shopee atau TikTok Shop menjelang Ramadan, ia dijual macam beras dan kurma: berkotak, kepada pembeli yang memang sudah tahu apa yang mereka mahu.',
      'Artikel ini menerangkan apa yang sebenarnya mendorong perubahan itu, bagaimana orang Malaysia benar-benar menggunakan minyak zaitun dalam dapur sendiri (bukan dapur buku resipi Itali), dan apa maknanya kepada cara anda memilih botol.',
    ],

    sections: [
      {
        id: 'quiet-arrival',
        heading: 'Kemasukan senyap minyak zaitun ke dapur Malaysia',
        blocks: [
          {
            type: 'p',
            text: 'Malaysia tidak menanam zaitun. Setiap titis minyak zaitun di sini diimport, kebanyakannya dari lembangan Mediterranean — Sepanyol, Itali, Greece, Turkiye, Tunisia, Palestin dan Syria antaranya. Fakta itu sahaja membentuk kategori ini selama berdekad: import bermakna mahal, mahal bermakna sekali-sekala, dan sekali-sekala bermakna kebanyakan keluarga tidak pernah tahu rasa minyak zaitun yang betul-betul bagus.',
          },
          {
            type: 'p',
            text: 'Tiga perkara menghakis keadaan itu. Kedai runcit Arab bertauliah halal membesar daripada satu kedai menjadi rangkaian kebangsaan. Pasaran dalam talian menghapuskan keperluan pengimport khusus untuk memujuk pembeli pasar raya. Dan satu generasi rakyat Malaysia yang mengembara, belajar atau menunaikan umrah pulang dengan citarasa makanan yang sebelum ini tidak dijual di sini.',
          },
          {
            type: 'p',
            text: 'Hasilnya, kategori ini bertindak kurang seperti barang mewah import dan lebih seperti keputusan dapur biasa — hampir sama dengan cara kita sudah lama berfikir tentang minyak bijan atau minyak kelapa: satu jenis lemak untuk satu tugas tertentu.',
          },
          {
            type: 'image',
            src: 'kampungBottle',
            alt: 'Seorang wanita Malaysia bertudung memegang botol minyak zaitun Palestin Arabian Village di hadapan rumah kampung tradisional',
            caption:
              'Botol Palestin di hadapan rumah kampung — itulah jarak yang dilalui minyak zaitun dalam satu dekad, daripada barang import jarang kepada bahan dapur.',
          },
        ],
      },
      {
        id: 'five-reasons',
        heading: 'Lima sebab rakyat Malaysia beralih kepada minyak zaitun',
        blocks: [
          { type: 'h3', text: '1. Penyakit berkaitan pemakanan menjadi perbualan nasional' },
          {
            type: 'p',
            text: 'Malaysia telah sedekad bercakap secara terbuka tentang obesiti, diabetes dan penyakit jantung. Usaha pendidikan awam Kementerian Kesihatan melalui [MyHEALTH](https://www.myhealth.gov.my/) dan Tinjauan Kebangsaan Kesihatan dan Morbiditi menolak isu komposisi pemakanan — bukan sekadar saiz hidangan — ke dalam perbualan harian. Minyak masak ialah tuas paling mudah ditarik oleh sesebuah keluarga tanpa menukar menu, dan minyak zaitun ialah lemak yang paling kerap dikaitkan dengan corak pemakanan Mediterranean yang dirujuk berulang kali oleh [Pertubuhan Kesihatan Sedunia](https://www.who.int/) dan garis panduan kebangsaan.',
          },
          {
            type: 'p',
            text: 'Perlu jelas di sini: menukar minyak bukan penawar kepada apa-apa penyakit. Ia satu perubahan kecil yang muat ke dalam tabiat sedia ada — dan perubahan kecil itulah yang benar-benar kekal.',
          },
          { type: 'h3', text: '2. Soal halal selesai tanpa perlu berpanjangan' },
          {
            type: 'p',
            text: 'Minyak zaitun tulen ialah jus buah yang diperah. Tiada bahan haiwan, tiada alkohol, tiada pengemulsi. Dalam pasaran majoriti Muslim yang menapis setiap kategori makanan baharu dengan soalan halal terlebih dahulu, itu perbualan yang sangat pendek — sebab itu minyak zaitun tersebar lebih laju daripada, katakan, produk tenusu atau gula-gula import. Pembeli yang mahukan dokumentasi biasanya melihat pengiktirafan [JAKIM](https://www.halal.gov.my/) pada pengimport atau peruncit, bukan pada minyak itu sendiri.',
          },
          { type: 'h3', text: '3. Masakan Arab dan Mediterranean sudah arus perdana' },
          {
            type: 'p',
            text: 'Shawarma, nasi mandi, hummus, mutabbal, falafel, sarapan ala Turki — sedekad lalu semua ini masih asing di KL. Hari ini ia biasa di medan selera, dan setiap satu menggunakan minyak zaitun sebagai bahan akhir yang boleh dirasa, bukan bahan tersembunyi. Apabila sesebuah keluarga makan minyak yang mereka boleh rasa, mereka mula ambil kisah minyak mana yang dibeli.',
          },
          { type: 'h3', text: '4. Ada dimensi agama dan warisan' },
          {
            type: 'p',
            text: 'Minyak zaitun membawa makna dalam Islam yang tiada pada mana-mana minyak masak lain — zaitun disebut dalam al-Quran, dan pemakaiannya banyak diamalkan sebagai sunnah. Bagi ramai keluarga Malaysia, satu sudu minyak zaitun sehari bukan trend kesihatan yang diimport dari Eropah; ia amalan agama dan budaya yang kebetulan juga lemak yang baik. Itu sebab pembelian yang tahan lama, bukan bermusim.',
          },
          { type: 'h3', text: '5. E-dagang menyelesaikan masalah capaian' },
          {
            type: 'p',
            text: 'Halangan lama ialah pengedaran: minyak import perlukan ruang rak yang tidak boleh diperoleh sebelum ia laku. Shopee, Lazada, TikTok Shop dan rangkaian runcit halal membuang langkah itu. Sesebuah jenama kini boleh menjual botol 500 ml ke seluruh negara dari hari pertama, dengan ulasan pembeli yang memujuk. Ia juga bermakna harga menjadi telus — rakyat Malaysia membandingkan minyak zaitun per liter sama seperti membandingkan telefon.',
          },
          {
            type: 'note',
            title: 'Ringkasnya',
            text: 'Kesedaran kesihatan mencipta sebab, status halal membuang halangan, masakan Arab dan Mediterranean mencipta selera, agama menjadikannya tabiat, dan e-dagang menjadikannya mudah didapati. Satu faktor sahaja tidak akan mencukupi.',
          },
        ],
      },
      {
        id: 'how-malaysians-use-it',
        heading: 'Bagaimana rakyat Malaysia benar-benar guna minyak zaitun',
        blocks: [
          {
            type: 'p',
            text: 'Di sinilah nasihat import selalunya gagal. Masakan Malaysia berapi besar, berasaskan kuali, dan penuh rempah. Nasihat yang ditulis untuk dapur Itali tidak bertahan bertembung dengan satu kali tumis.',
          },
          { type: 'h3', text: 'Hidangan akhir dan curahan — di sinilah extra virgin berbaloi' },
          {
            type: 'p',
            text: 'Atas hummus, atas ikan bakar, ke dalam sup selepas ditutup api, atas hirisan tomato dengan sedikit garam. Tiada haba langsung, jadi tiada apa yang hilang. Kalau anda hanya guna minyak zaitun dara dengan cara ini pun, anda tetap dapat sepenuhnya apa yang anda bayar.',
          },
          { type: 'h3', text: 'Tumis harian — boleh, dengan had' },
          {
            type: 'p',
            text: 'Minyak zaitun dara mampu menangani tumisan rumah dengan baik. Tumis di rumah biasanya berada antara 140°C dan 180°C; minyak zaitun dara yang baik berasap melebihi kira-kira 190°C. Peraturan praktikalnya mudah: kalau kuali sudah berasap sebelum bahan masuk, kuali itu terlalu panas untuk mana-mana minyak, bukan minyak ini sahaja.',
          },
          { type: 'h4', text: 'Bagaimana dengan menggoreng keropok atau ayam goreng?' },
          {
            type: 'p',
            text: 'Boleh dari segi teknikal, tetapi membazir dari segi wang. Menggoreng rendam perlukan isi padu yang banyak, dan menggunakan minyak perahan sejuk pertama untuk seliter minyak goreng mensia-siakan kedua-dua rasa dan polifenol yang menjadikannya bernilai. Simpan minyak neutral yang lebih murah untuk kuali goreng, dan simpan yang extra virgin untuk selebihnya.',
          },
          { type: 'h3', text: 'Bakeri, kuih dan salad' },
          {
            type: 'p',
            text: 'Minyak zaitun boleh menggantikan mentega atau marjerin dalam banyak resipi bakar pada kira-kira tiga suku isi padu, dan ia memberi tekstur yang lebih lembut keesokan harinya. Untuk salad pula ia buat semua kerja sendirian — minyak zaitun, limau atau cuka, garam, dan apa-apa herba yang ada dalam peti.',
          },
          { type: 'h3', text: 'Satu sudu harian, kulit dan rambut' },
          {
            type: 'p',
            text: 'Satu sudu pada waktu pagi, minyak diurut ke kulit kepala, beberapa titis pada kulit kering — amalan ini biasa dalam rumah Malaysia dan wujud jauh sebelum trend semasa. Ia juga penggunaan yang paling mendedahkan kualiti minyak, kerana tiada apa untuk menyembunyikannya.',
          },
        ],
      },
      {
        id: 'grades',
        heading: 'Apa sebenarnya maksud "extra virgin" — dan kenapa ia makin penting',
        blocks: [
          {
            type: 'p',
            text: 'Apabila kategori ini membesar, bertambah juga jenis barang yang dijual sebagai "minyak zaitun". Gred ini ditetapkan di peringkat antarabangsa, bukan oleh pemasaran: piawaian perdagangan [Majlis Zaitun Antarabangsa](https://www.internationaloliveoil.org/) dan piawaian [Codex Alimentarius](https://www.fao.org/fao-who-codexalimentarius/en/) untuk minyak zaitun menetapkan kedua-dua kimia dan ujian deria.',
          },
          {
            type: 'table',
            head: ['Gred pada label', 'Cara ia dihasilkan', 'Maknanya kepada anda'],
            rows: [
              [
                'Minyak zaitun dara (extra virgin)',
                'Diperah secara mekanikal sahaja, tanpa haba melebihi had, tanpa pelarut. Mesti bebas kecacatan deria dan memenuhi had keasidan rendah.',
                'Rasa dan aroma penuh, kandungan antioksidan semula jadi tertinggi. Gred yang berbaloi dibayar.',
              ],
              [
                'Minyak zaitun virgin',
                'Proses mekanikal sama, tetapi toleransi keasidan lebih longgar dan kecacatan deria kecil dibenarkan.',
                'Sesuai untuk memasak, tetapi jelas lebih hambar apabila dirasa sendiri.',
              ],
              [
                '"Pure", "Light" atau sekadar "Minyak Zaitun"',
                'Campuran minyak zaitun ditapis dengan sedikit minyak virgin. Penapisan menggunakan haba dan pemprosesan industri.',
                '"Light" merujuk rasa dan warna, bukan kalori. Hampir semua aroma dan polifenol sudah hilang.',
              ],
              [
                'Minyak pomace zaitun',
                'Diekstrak daripada hampas dan kulit menggunakan pelarut, kemudian ditapis.',
                'Tingkat paling murah. Sah sebagai minyak menggoreng, tetapi bukan yang dibayangkan orang bila membeli "minyak zaitun".',
              ],
            ],
          },
          { type: 'h4', text: 'Keasidan bebas, dalam satu perenggan' },
          {
            type: 'p',
            text: 'Keasidan bebas mengukur sejauh mana molekul lemak minyak itu sudah terurai — akibat buah lebam, perahan lambat, atau simpanan yang buruk. Ia dinyatakan sebagai peratusan asid oleik. Had extra virgin ialah 0.8%. Pengeluar yang serius berada jauh di bawah had itu; Arabian Village diuji di bawah 0.028%. Angka rendah tidak menjamin minyak yang sedap, tetapi angka tinggi menjamin minyak yang sudah letih.',
          },
        ],
      },
      {
        id: 'price-and-access',
        heading: 'Harga, saiz dan di mana rakyat Malaysia membeli',
        blocks: [
          {
            type: 'p',
            text: 'Bandingkan minyak zaitun per liter, bukan per botol — itu sahaja cara rak kedai jadi masuk akal. Botol 500 ml minyak zaitun dara tulen berada dalam dunia berbeza daripada tong 2 liter campuran ditapis, dan jurang itu bukan margin peniaga, ia isi botol.',
          },
          {
            type: 'ul',
            items: [
              '**Rangkaian runcit halal** — laluan yang paling kerap diambil keluarga Malaysia, kerana pekerjanya boleh menjawab soalan dan stok bergerak laju. Arabian Village dibawa oleh [Berkat Madinah Store](https://madinah.com.my/en/), pengedar rasmi kami di Malaysia.',
              '**Pasaran dalam talian** — Shopee dan TikTok Shop, tempat ulasan dan jualan langsung membuat penerangan. Pastikan penjualnya jenama atau pengedar sah, bukan penjual pihak ketiga yang stoknya tidak diketahui usianya.',
              '**Terus daripada jenama** — kurang tangan antara mesin perah dan dapur anda, dan biasanya maklumat paling jelas tentang tarikh tuaian dan asal usul. Lihat [di mana untuk membeli Arabian Village](/shop).',
            ],
          },
          {
            type: 'note',
            title: 'Botol 500 ml bukan botol kecil',
            text: 'Ia saiz yang betul untuk kebanyakan rumah. Minyak zaitun merosot selepas dibuka — cahaya, haba dan udara semuanya bekerja menentangnya — jadi botol yang habis dalam dua bulan lebih berbaloi daripada tong yang habis dalam setahun, walau apa pun kiraan per liter.',
          },
        ],
      },
      {
        id: 'what-the-trend-means',
        heading: 'Apa makna pasaran yang membesar kepada cara anda memilih',
        blocks: [
          {
            type: 'p',
            text: 'Pertumbuhan menarik semua orang, termasuk penjual yang bergantung pada perkataan "zaitun" untuk melakukan semua kerja. Apabila kategori ini membesar di Malaysia, beban berpindah kepada pembeli untuk membaca melepasi label hadapan.',
          },
          {
            type: 'ol',
            items: [
              'Baca perkataan gred dengan tepat — "extra virgin" ialah gred yang sah di sisi undang-undang; "premium", "pure" dan "light" bukan.',
              'Cari tarikh tuaian, bukan sekadar tarikh luput. Minyak zaitun produk segar; usianya lebih penting daripada tarikh luputnya.',
              'Semak asal usul. Satu negara atau wilayah yang dinamakan mengalahkan "dibungkus di" atau "keluaran EU", yang boleh bermaksud campuran beberapa tuaian dan beberapa negara.',
              'Pilih kaca gelap atau tin. Botol jernih di bawah lampu pasar raya paling cepat tua.',
              'Rasa. Minyak zaitun dara segar berbau buah, sedikit pahit, dan pedas di pangkal tekak. Hambar, berlilin atau berbau macam krayon bermakna sudah lama.',
            ],
          },
          {
            type: 'p',
            text: 'Kami tulis panduan penuh proses itu — termasuk ujian rasa di rumah — dalam [Cara Memilih Minyak Zaitun Dara Asli di Malaysia](/blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia).',
          },
        ],
      },
    ],

    conclusion: {
      heading: 'Kesimpulan',
      blocks: [
        {
          type: 'p',
          text: 'Minyak zaitun membesar di Malaysia kerana ia menjawab beberapa soalan serentak: ia muat dalam perbualan kesihatan yang negara ini memang sedang lalui, ia melepasi soal halal serta-merta, ia milik masakan yang sudah dicintai rakyat Malaysia, dan harganya kini boleh dirancang oleh keluarga biasa.',
        },
        {
          type: 'p',
          text: 'Kematangan kategori ini berita baik, dengan satu syarat — rak yang lebih besar bermakna lebih banyak pilihan yang bukan seperti yang didakwa. Pelajari perkataan gred, cari tarikh tuaian, dan beli daripada pihak yang boleh memberitahu anda di mana zaitun itu tumbuh.',
        },
        {
          type: 'p',
          text: 'Arabian Village ialah minyak zaitun dara perahan sejuk pertama dari kebun Palestin berusia ratusan tahun, dituai dengan tangan dan diperah dalam beberapa jam selepas dipetik. Baca spesifikasi kualiti penuh di [halaman produk](/products), lihat [mengapa keluarga mempercayai kami](/why-us), atau [hubungi kami terus](/contact) untuk urusan runcit dan borong.',
        },
      ],
    },

    faqs: [
      {
        q: 'Kenapa minyak zaitun semakin popular di Malaysia?',
        a: 'Empat faktor tiba serentak: kesedaran awam yang meningkat tentang penyakit berkaitan pemakanan, hakikat bahawa minyak zaitun tulen halal secara semula jadi dan tidak perlu penjelasan panjang, masakan Arab dan Mediterranean yang menjadi arus perdana di bandar-bandar Malaysia, serta e-dagang yang menjadikan minyak zaitun dara import boleh didapati di seluruh negara pada harga yang telus.',
      },
      {
        q: 'Adakah minyak zaitun halal?',
        a: 'Minyak zaitun tulen halal secara semula jadi. Ia jus buah yang diperah, tanpa bahan berasaskan haiwan, tanpa alkohol dan tanpa bahan tambahan. Pembeli yang mahukan dokumentasi rasmi biasanya mencari pengiktirafan JAKIM pada pengimport atau peruncit, kerana minyak tumbuhan satu bahan tidak menimbulkan isu halal.',
      },
      {
        q: 'Bolehkah minyak zaitun dara digunakan untuk tumis?',
        a: 'Boleh. Tumis di rumah biasanya antara 140°C hingga 180°C, selesa di bawah takat asap minyak zaitun dara yang baik. Ia bukan pilihan yang ekonomik untuk menggoreng rendam, kerana isi padu yang besar lebih sesuai menggunakan minyak neutral yang lebih murah dan rasa minyak premium itu akan terbazir.',
      },
      {
        q: 'Minyak zaitun lebih baik daripada minyak sawit atau minyak kelapa?',
        a: 'Ia lemak berbeza dengan tugas berbeza. Minyak zaitun dara tinggi lemak tak tepu tunggal dan membawa polifenol serta vitamin E semula jadi kerana ia tidak pernah ditapis. Minyak sawit dan kelapa lebih tinggi lemak tepu dan lebih tahan haba tinggi. Kebanyakan dapur Malaysia akhirnya menyimpan lebih daripada satu jenis minyak, bukan menggantikan semuanya.',
      },
      {
        q: 'Berapa harga minyak zaitun di Malaysia?',
        a: 'Harga berbeza mengikut gred, asal usul dan saiz botol, serta berubah dengan kos import, jadi bandingkan per liter dan bukan per botol. Minyak zaitun dara tulen berada jauh di atas campuran ditapis dan minyak pomace, kerana harganya mencerminkan tuaian tangan, perahan pantas dan hasil yang rendah. Harga Arabian Village semasa dipaparkan di setiap platform rasmi termasuk Berkat Madinah Store, Shopee dan TikTok Shop.',
      },
      {
        q: 'Di mana boleh beli minyak zaitun dara asli di Malaysia?',
        a: 'Beli daripada jenama atau pengedar rasminya dan bukan penjual semula yang tidak dikenali, supaya anda tahu tarikh tuaian dan sejarah penyimpanannya. Minyak zaitun Arabian Village diedarkan di Malaysia oleh Berkat Madinah Store, dan juga boleh didapati melalui penyenaraian rasmi jenama ini di Shopee dan TikTok Shop.',
      },
    ],

    related: [
      {
        label: 'Manfaat Kesihatan Minyak Zaitun Dara untuk Keluarga Malaysia',
        path: 'blog/manfaat-kesihatan-minyak-zaitun-dara-untuk-keluarga-malaysia',
        description: 'Apa sebenarnya isi botol, apa kata pihak berkuasa kesihatan, dan cara memasukkannya ke menu harian.',
      },
      {
        label: 'Cara Memilih Minyak Zaitun Dara Asli di Malaysia',
        path: 'blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia',
        description: 'Perkataan label, tarikh tuaian, ujian rasa di rumah, dan perangkap yang perlu dielak.',
      },
      {
        label: 'Minyak Zaitun Arabian Village',
        path: 'products',
        description: 'Minyak zaitun dara perahan sejuk pertama dari kebun Palestin berusia ratusan tahun.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'evoo-health-benefits-families',
    slug: 'manfaat-kesihatan-minyak-zaitun-dara-untuk-keluarga-malaysia',

    seoTitle: 'Manfaat Kesihatan Minyak Zaitun Dara untuk Keluarga Malaysia',
    metaTitle: 'Manfaat Minyak Zaitun Dara untuk Keluarga Malaysia',
    metaDescription:
      'Apa sebenarnya kandungan minyak zaitun dara, apa yang disokong bukti dan apa yang tidak, serta cara praktikal keluarga Malaysia memasukkannya ke dalam menu harian — dari sahur hingga bekal sekolah.',
    focusKeyword: 'manfaat minyak zaitun dara',
    relatedKeywords: [
      'manfaat minyak zaitun untuk kesihatan',
      'khasiat minyak zaitun',
      'minyak zaitun untuk jantung',
      'minyak zaitun dan kolesterol',
      'polifenol minyak zaitun',
      'minyak zaitun untuk anak',
      'minyak masak sihat Malaysia',
      'minyak zaitun untuk kulit dan rambut',
      'minyak zaitun ketika Ramadan',
      'satu sudu minyak zaitun sehari',
      'minyak zaitun extra virgin manfaat',
      'minyak zaitun terbaik untuk kesihatan',
    ],

    category: 'Kesihatan & Kesejahteraan',
    tags: ['Kesihatan', 'Extra Virgin', 'Pemakanan Keluarga', 'Dapur Malaysia', 'Ramadan'],

    h1: 'Manfaat Kesihatan Minyak Zaitun Dara untuk Keluarga Malaysia',
    excerpt:
      'Pandangan berpijak di bumi nyata tentang kandungan minyak zaitun dara, apa yang sanggup dinyatakan oleh pihak berkuasa kesihatan, dan cara realistik keluarga Malaysia memasukkannya ke dalam makanan harian.',
    keyTakeaway:
      'Minyak zaitun dara mengandungi kira-kira 70–80% lemak tak tepu tunggal dan, kerana ia tidak pernah ditapis, ia mengekalkan polifenol serta vitamin E yang hilang daripada minyak ditapis. Pihak berkuasa seperti EFSA dan FDA Amerika Syarikat menerima dakwaan kesihatan yang dirangka berhati-hati tentang minyak zaitun dan kesihatan jantung — dengan syarat ia menggantikan lemak tepu dalam diet, bukan ditambah di atasnya.',

    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    readingTime: 12,

    hero: {
      src: 'pouringField',
      alt: 'Minyak zaitun dara segar dicurah dari jag ke dalam mangkuk di tepi kebun zaitun',
    },
    ogImage: '/og/blog-evoo-health-benefits-families.jpg',

    intro: [
      'Setiap beberapa bulan ada minyak baharu diisytiharkan paling sihat dalam dapur. Minyak zaitun luar biasa kerana ia bertahan empat puluh tahun kitaran itu, dan ia bertahan kerana kajian terus menunjuk ke arah yang sama, bukan kerana pemasarannya lebih baik.',
      'Artikel ini buat dua perkara. Pertama, menerangkan apa yang benar-benar ada dalam sebotol minyak zaitun dara dan kenapa penapisan memusnahkan sebahagian besarnya. Kedua, ia jujur tentang hadnya — apa yang benar-benar diluluskan pengawal selia sebagai dakwaan kesihatan, dan di mana bukti itu berhenti.',
      'Ia ditulis untuk keluarga Malaysia: menu kita berasaskan nasi, masakan kita panas dan pantas, kita berpuasa sebulan setahun, dan masalah kesihatan berkaitan pemakanan kita sudah terdokumentasi. Nasihat Mediterranean generik tidak berpindah dengan sendirinya, jadi kami cuba memindahkannya.',
    ],

    sections: [
      {
        id: 'whats-inside',
        heading: 'Apa sebenarnya kandungan minyak zaitun dara',
        blocks: [
          {
            type: 'p',
            text: 'Minyak zaitun dara ialah jus buah zaitun yang diasingkan secara mekanikal, tidak lebih daripada itu. Tiada pelarut, tiada pelunturan, tiada penyahbauan. Ini penting kerana sebatian yang orang cari itu rapuh, dan penapisan industri ialah proses yang membuangnya.',
          },
          { type: 'h3', text: 'Lemak tak tepu tunggal — isi utama botol' },
          {
            type: 'p',
            text: 'Kira-kira 70 hingga 80% minyak zaitun dara ialah asid oleik, satu asid lemak tak tepu tunggal. Bahagian ini bertahan walaupun melalui penapisan, jadi minyak zaitun murah pun ada. Ia juga bahagian yang dirujuk kebanyakan garis panduan pemakanan apabila mengesyorkan penggantian lemak tepu dengan lemak tak tepu.',
          },
          { type: 'h3', text: 'Polifenol — bahagian yang dimusnahkan penapisan' },
          {
            type: 'p',
            text: 'Minyak zaitun dara yang segar dan dibuat dengan baik membawa sebatian fenolik — hidroksitirosol, tirosol, oleokantal, terbitan oleuropein. Inilah punca rasa pahit dan pedas di pangkal tekak. Ia antioksidan, ia melindungi minyak itu sendiri daripada menjadi tengik, dan ia hampir tiada langsung dalam minyak zaitun ditapis, "pure" atau "light".',
          },
          {
            type: 'note',
            title: 'Rasa pedas yang buat terbatuk itu satu ciri',
            text: 'Kalau satu sudu minyak zaitun membuat anda terbatuk sedikit, itu oleokantal merengsa tekak. Penilai deria memanggilnya "kepedasan" dan mengiranya sebagai ciri positif. Minyak yang licin sepenuhnya tanpa gigitan biasanya sama ada sudah sangat lama atau bukan extra virgin.',
          },
          { type: 'h3', text: 'Vitamin E dan sebatian kecil lain' },
          {
            type: 'p',
            text: 'Minyak zaitun sumber vitamin E (alfa-tokoferol) yang bermakna dalam diet, ditambah skualena dan sterol tumbuhan. Sekali lagi, kuantitinya bergantung pada kesegaran dan pada minyak itu yang tidak pernah ditapis dengan haba.',
          },
          { type: 'h3', text: 'Apa yang tiada di dalamnya' },
          {
            type: 'p',
            text: 'Tiada kolesterol — tiada minyak tumbuhan mengandungi kolesterol. Tiada protein atau karbohidrat yang bermakna. Dan dalam minyak zaitun dara asal tunggal yang tulen, tiada minyak lain: pencampuran dengan minyak biji murah ialah penipuan klasik minyak zaitun, sebab itulah kebolehkesanan sebahagian daripada soalan kesihatan, bukan soalan berasingan.',
          },
        ],
      },
      {
        id: 'evidence',
        heading: 'Apa yang disokong bukti — dan apa yang tidak',
        blocks: [
          { type: 'p', text: 'Di sinilah kebanyakan artikel minyak zaitun melampau. Ini versi berhati-hati.' },
          { type: 'h3', text: 'Dakwaan yang diluluskan, dinyatakan dengan tepat' },
          {
            type: 'ul',
            items: [
              '**Menggantikan lemak tepu.** Panduan pemakanan antarabangsa, termasuk daripada [Pertubuhan Kesihatan Sedunia](https://www.who.int/), menyokong penggantian lemak tepu dengan lemak tak tepu untuk membantu mengekalkan paras kolesterol darah yang normal. Minyak zaitun cara mudah untuk sesebuah keluarga melakukannya.',
              '**Polifenol minyak zaitun.** [Pihak Berkuasa Keselamatan Makanan Eropah (EFSA)](https://www.efsa.europa.eu/) menerima dakwaan bahawa polifenol minyak zaitun menyumbang kepada perlindungan lipid darah daripada tekanan oksidatif, pada pengambilan harian hidroksitirosol dan terbitannya yang ditetapkan — paras yang hanya dicapai oleh minyak zaitun dara tulen yang kaya polifenol.',
              '**Asid oleik dan penyakit jantung.** [Pentadbiran Makanan dan Ubat Amerika Syarikat (FDA)](https://www.fda.gov/) membenarkan satu dakwaan kesihatan *bersyarat* tentang asid oleik dalam minyak makan dan risiko penyakit jantung koronari. "Bersyarat" bermakna FDA menilai buktinya terhad dan mewajibkan dakwaan itu menyatakan hal tersebut.',
            ],
          },
          { type: 'h3', text: 'Di mana dakwaan itu berhenti' },
          {
            type: 'p',
            text: 'Minyak zaitun tidak merawat, menyembuh atau mencegah sebarang penyakit. Ia tidak melarutkan lemak, tidak mengundurkan diabetes, dan tidak menggantikan ubat. Sesiapa yang menjualnya dengan cara itu sedang memberitahu anda sesuatu tentang dirinya, bukan tentang minyak itu. Jika anda ada penyakit yang telah didiagnosis, atau sedang mengawal kolesterol, tekanan darah atau gula dalam darah, orang yang perlu ditanya ialah doktor atau pakar diet berdaftar — bukan label.',
          },
          {
            type: 'p',
            text: 'Perlu diingat juga bahawa kebanyakan kajian terkenal mengkaji keseluruhan *corak pemakanan* Mediterranean — sayur, kekacang, ikan, bijirin penuh, dan minyak zaitun sebagai lemak utama — bukan minyak zaitun sahaja di atas diet yang tidak berubah.',
          },
          {
            type: 'note',
            title: 'Ganti, bukan tambah',
            text: 'Minyak zaitun mengandungi kira-kira 120 kcal setiap sudu besar, sama seperti mana-mana minyak lain. Menambahnya di atas apa yang anda sudah masak bermakna menambah kalori. Manfaat dalam setiap garis panduan utama datang daripada menggunakannya *menggantikan* mentega, marjerin, minyak sapi atau lemak masak tinggi tepu.',
          },
        ],
      },
      {
        id: 'malaysian-context',
        heading: 'Kenapa ini penting khusus untuk keluarga Malaysia',
        blocks: [
          {
            type: 'p',
            text: 'Malaysia mencatat antara kadar obesiti dan diabetes jenis 2 yang lebih tinggi di rantau ini, didokumentasikan berulang kali dalam Tinjauan Kebangsaan Kesihatan dan Morbiditi serta dibincangkan terbuka dalam kempen Kementerian Kesihatan di [MyHEALTH](https://www.myhealth.gov.my/). Penyakit tidak berjangkit, bukan jangkitan, ialah beban kesihatan utama kita.',
          },
          {
            type: 'p',
            text: 'Budaya makanan kita juga berat dengan lemak dalam cara yang mudah terlepas pandang: santan dalam kari, sarapan bergoreng, roti bersapu marjerin, dan minyak goreng yang diguna semula dalam kuali rumah. Semua itu tidak perlu lenyap. Tetapi lemak yang digunakan untuk tumis harian, salad dan hidangan akhir memang mudah digantikan — tiada siapa perlu melepaskan mana-mana hidangan untuk melakukannya.',
          },
          {
            type: 'p',
            text: 'Itulah hujah praktikal minyak zaitun dalam dapur Malaysia. Bukan pembaharuan diet menyeluruh. Satu pertukaran bahan yang bertahan bertembung dengan masakan keluarga sebenar.',
          },
          {
            type: 'image',
            src: 'tasting',
            alt: 'Seorang lelaki Malaysia bersongkok menilai aroma minyak zaitun dara dari gelas penilaian biru',
            caption: 'Penilaian kualiti bermula dengan hidung. Minyak segar berbau rumput, buah hijau dan kadangkala daun tomato.',
          },
        ],
      },
      {
        id: 'everyday-meals',
        heading: 'Memasukkan minyak zaitun ke dalam menu harian Malaysia',
        blocks: [
          { type: 'h3', text: 'Sarapan' },
          {
            type: 'ul',
            items: [
              'Minyak zaitun menggantikan marjerin pada roti bakar, dengan sedikit garam atau za\'atar.',
              'Telur hancur atau separuh masak disiram minyak zaitun, bukan digoreng dengan mentega.',
              'Atas oat atau ke dalam mangkuk smoothie — tidak dijangka, tetapi ia menjadi dengan kurma dan pisang.',
            ],
          },
          { type: 'h3', text: 'Makan tengah hari dan makan malam' },
          {
            type: 'ul',
            items: [
              'Tumis bawang, bawang putih dan cili dengan minyak zaitun pada api sederhana.',
              'Siram sup ayam, sup tulang atau mana-mana sup dengan satu sudu selepas api ditutup — ia membawa aroma seperti minyak sapi.',
              'Ikan kukus atau bakar dengan minyak zaitun, limau dan daun ketumbar menggantikan sos berat.',
              'Gaul ulam, salad dan timun dengan minyak zaitun, limau kasturi dan garam.',
            ],
          },
          { type: 'h3', text: 'Kanak-kanak' },
          {
            type: 'p',
            text: 'Minyak zaitun sesuai untuk kanak-kanak sebagai lemak masak biasa. Selera muda selalunya rasa minyak yang terlalu pedas itu tajam kalau diminum sendiri, jadi gunakannya di dalam masakan dan salad, bukan sebagai satu sudu. Soal pemakanan bayi ialah urusan pakar pediatrik atau klinik kesihatan, bukan artikel makanan.',
          },
          { type: 'h3', text: 'Warga emas dalam keluarga' },
          {
            type: 'p',
            text: 'Bagi ibu bapa atau datuk nenek yang mengawal kolesterol atau tekanan darah di bawah pengawasan perubatan, pertukaran minyak antara perubahan paling tidak mengganggu — makanannya kekal sama. Maklumkan doktor tentang perubahan diet, jangan jadikan ia pengganti rawatan.',
          },
          { type: 'h4', text: 'Ramadan, sahur dan iftar' },
          {
            type: 'p',
            text: 'Ketika bulan puasa, banyak keluarga sengaja menjadikan sahur ringan dan lambat dihadam. Minyak zaitun muat di situ: satu sudu bersama kurma dan yogurt, atau disiram atas telur sahur, ialah amalan lama dalam rumah Arab dan kini biasa dalam rumah Malaysia. Ketika berbuka pula ia cara menjadikan hidangan terasa mewah tanpa satu lagi pusingan menggoreng.',
          },
        ],
      },
      {
        id: 'heat-and-storage',
        heading: 'Haba, takat asap dan penyimpanan — melindungi apa yang anda bayar',
        blocks: [
          { type: 'h3', text: 'Berapa panas terlalu panas' },
          {
            type: 'p',
            text: 'Minyak zaitun dara yang baik mempunyai takat asap melebihi kira-kira 190°C, dan kandungan antioksidannya yang tinggi menjadikannya lebih stabil terhadap haba daripada tanggapan umum. Tumisan Malaysia biasa berada di bawah paras itu. Menggoreng rendam berpanjangan pada 200°C tidak, dan ia turut memusnahkan polifenol yang anda bayar. Guna minyak lebih murah untuk kuali goreng.',
          },
          { type: 'h3', text: 'Penyimpanan tempat kebanyakan rumah kehilangan kualiti' },
          {
            type: 'ol',
            items: [
              'Simpan botol dalam almari, bukan di tepi tingkap dan bukan di sebelah dapur. Cahaya dan haba dua pembunuh terpantas.',
              'Tutup rapat. Oksigen buat kerosakan perlahan.',
              'Jangan simpan dalam peti sejuk — minyak zaitun berkabus dan membeku dalam sejuk; tidak bahaya tetapi menyusahkan.',
              'Habiskan botol yang sudah dibuka dalam masa dua bulan. Sebab itulah botol 500 ml selalunya belian yang lebih bijak dalam iklim lembap.',
            ],
          },
          {
            type: 'p',
            text: 'Dapur Malaysia panas dan lembap sepanjang tahun, jadi disiplin penyimpanan lebih penting di sini berbanding pantri Mediterranean. Minyak terbaik yang disimpan dengan buruk selama enam bulan bukan lagi minyak terbaik.',
          },
        ],
      },
      {
        id: 'caution',
        heading: 'Siapa yang perlu berhati-hati',
        blocks: [
          {
            type: 'ul',
            items: [
              'Sesiapa yang mempunyai penyakit didiagnosis atau mengambil ubat kolesterol, tekanan darah atau diabetes — bincang perubahan diet dengan doktor, jangan uruskan sendiri.',
              'Mereka yang mengawal berat badan: minyak zaitun padat tenaga. Gantikan, jangan tambah.',
              'Sesiapa yang alah kepada zaitun atau debunga zaitun, jarang tetapi wujud.',
              'Mereka yang ada masalah pundi hempedu, yang mungkin dinasihatkan mengehadkan semua lemak.',
            ],
          },
          {
            type: 'p',
            text: 'Tiada apa-apa dalam halaman ini merupakan nasihat perubatan. Ia maklumat makanan, ditulis untuk tepat tentang apa yang diketahui dan jujur tentang apa yang tidak.',
          },
        ],
      },
    ],

    conclusion: {
      heading: 'Kesimpulan',
      blocks: [
        {
          type: 'p',
          text: 'Minyak zaitun dara ialah lemak yang dikaji secara meluas dan diproses secara minimum, yang mengekalkan sebatian yang dibuang oleh penapisan. Pengawal selia meluluskan dakwaan yang sempit dan berhati-hati tentangnya dan kesihatan jantung, dan semua dakwaan itu berdiri di atas syarat yang sama: gunakannya menggantikan lemak tepu, bukan menambahnya.',
        },
        {
          type: 'p',
          text: 'Bagi keluarga Malaysia, versi realistiknya ialah satu botol di sebelah dapur, digunakan untuk tumis, salad dan hidangan akhir, menggantikan marjerin dan sebahagian minyak masak harian. Itu perubahan yang boleh dipegang bertahun-tahun.',
        },
        {
          type: 'p',
          text: 'Kualiti menentukan berapa banyak bahagian yang baik itu benar-benar ada dalam botol anda — itulah subjek panduan kami, [cara memilih minyak zaitun dara asli di Malaysia](/blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia). Anda juga boleh membaca spesifikasi penuh [minyak zaitun Arabian Village](/products) atau melihat [di mana untuk membelinya](/shop).',
        },
      ],
    },

    faqs: [
      {
        q: 'Apakah manfaat utama minyak zaitun dara?',
        a: 'Ia tinggi lemak tak tepu tunggal (terutamanya asid oleik) dan, kerana tidak pernah ditapis, mengekalkan polifenol serta vitamin E. EFSA menerima bahawa polifenol minyak zaitun membantu melindungi lipid darah daripada tekanan oksidatif pada pengambilan harian yang ditetapkan, dan menggantikan lemak tepu dengan lemak tak tepu disokong panduan pemakanan arus perdana untuk mengekalkan kolesterol darah normal. Ia makanan, bukan rawatan untuk sebarang penyakit.',
      },
      {
        q: 'Berapa banyak minyak zaitun patut diambil setiap hari?',
        a: 'Tiada satu angka rasmi. Banyak keluarga menggunakan satu hingga dua sudu besar sehari merentas masakan dan salad. Kerana minyak zaitun mengandungi kira-kira 120 kcal setiap sudu besar, manfaatnya datang daripada menggunakannya menggantikan mentega, marjerin atau lemak masak lain, bukan menambahnya. Sesiapa yang mengawal berat badan atau penyakit tertentu perlu berbincang dengan doktor atau pakar diet.',
      },
      {
        q: 'Minyak zaitun dara lebih baik daripada minyak zaitun "pure" atau "light"?',
        a: 'Dari segi pemakanan, ya. Minyak zaitun ditapis, "pure" dan "light" diproses dengan haba dan penapisan industri, yang membuang hampir semua polifenol dan sebahagian besar aroma. Lemak tak tepu tunggalnya kekal, tetapi kandungan antioksidan yang membezakan minyak zaitun sebahagian besarnya tidak. "Light" merujuk rasa dan warna, tidak pernah merujuk kalori.',
      },
      {
        q: 'Bolehkah kanak-kanak di Malaysia mengambil minyak zaitun?',
        a: 'Boleh, sebagai lemak masak biasa dalam hidangan keluarga. Minyak yang sangat pedas boleh terasa tajam kepada kanak-kanak kecil kalau diminum sendiri, jadi ia lebih sesuai dimasak dalam makanan atau dalam salad. Apa-apa berkaitan pemakanan bayi perlu dibincangkan dengan pakar pediatrik atau klinik kesihatan anda.',
      },
      {
        q: 'Adakah memasak memusnahkan manfaat minyak zaitun?',
        a: 'Tumis biasa di rumah pada 140–180°C mengekalkan sebahagian besar nilainya; minyak zaitun dara yang baik berasap melebihi kira-kira 190°C dan antioksidannya sendiri menjadikannya lebih stabil terhadap haba daripada yang disangka. Menggoreng rendam berpanjangan memang merosakkan polifenol, jadi gunakan minyak neutral yang lebih murah untuk kuali goreng dan simpan yang extra virgin untuk memasak, salad dan hidangan akhir.',
      },
      {
        q: 'Baguskah minyak zaitun untuk kulit dan rambut?',
        a: 'Ia digunakan secara meluas dalam rumah Malaysia dan Arab sebagai minyak kulit kepala dan kulit, dan ia amalan tradisi, bukan rawatan klinikal. Jika anda gunakan pada kulit, cuba sedikit dahulu — sesetengah orang mendapati mana-mana minyak menyumbat atau merengsa, dan sesiapa yang ada masalah kulit patut bertanya doktor sebelum menambah minyak ke dalam rutin.',
      },
    ],

    related: [
      {
        label: 'Cara Memilih Minyak Zaitun Dara Asli di Malaysia',
        path: 'blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia',
        description: 'Cara membezakan minyak zaitun dara sebenar daripada campuran ditapis sebelum anda membayar.',
      },
      {
        label: 'Mengapa Minyak Zaitun Semakin Popular di Malaysia',
        path: 'blog/mengapa-minyak-zaitun-semakin-popular-di-malaysia',
        description: 'Faktor kesihatan, halal, budaya dan komersial di sebalik perubahan ini.',
      },
      {
        label: 'Mengapa Arabian Village',
        path: 'why-us',
        description: 'Asal usul Palestin yang boleh dikesan, tuaian tangan, dan perahan dalam beberapa jam.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'choose-authentic-evoo-malaysia',
    slug: 'cara-memilih-minyak-zaitun-dara-asli-di-malaysia',

    seoTitle: 'Cara Memilih Minyak Zaitun Dara Asli di Malaysia',
    metaTitle: 'Cara Memilih Minyak Zaitun Dara Asli di Malaysia',
    metaDescription:
      'Panduan pembeli Malaysia untuk minyak zaitun dara yang benar-benar asli: perkataan label, tarikh tuaian, keasidan, jenis botol, ujian rasa di rumah, harga yang jujur, dan tempat membeli dengan selamat.',
    focusKeyword: 'minyak zaitun dara asli',
    relatedKeywords: [
      'cara memilih minyak zaitun',
      'minyak zaitun asli atau palsu',
      'minyak zaitun terbaik Malaysia',
      'maksud label minyak zaitun',
      'keasidan minyak zaitun',
      'perahan sejuk pertama',
      'tarikh tuaian minyak zaitun',
      'pure vs extra virgin',
      'minyak pomace zaitun',
      'beli minyak zaitun dalam talian Malaysia',
      'ujian rasa minyak zaitun',
      'minyak zaitun tulen',
    ],

    category: 'Panduan Pembeli',
    tags: ['Panduan Pembeli', 'Extra Virgin', 'Ketulenan', 'Minyak Zaitun Malaysia', 'Label'],

    h1: 'Cara Memilih Minyak Zaitun Dara Asli di Malaysia',
    excerpt:
      'Semua yang ada di depan botol itu pemasaran. Ini cara membaca bahagian belakangnya, membuat ujian rasa dua minit, dan membeli minyak zaitun yang benar-benar seperti yang didakwa.',
    keyTakeaway:
      'Untuk membeli minyak zaitun dara asli di Malaysia: pastikan label menyebut tepat "extra virgin olive oil", cari tarikh tuaian dan satu negara asal yang dinamakan, pilih kaca gelap atau tin, curiga jika harganya jauh di bawah kategori, dan rasa sendiri — minyak zaitun dara sebenar berbau buah, pahit dan pedas, tidak pernah hambar atau berlilin.',

    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    readingTime: 13,

    hero: {
      src: 'bottling',
      alt: 'Minyak zaitun dara yang baru diperah sedang dibotolkan dan dimeterai di kilang perahan',
    },
    ogImage: '/og/blog-choose-authentic-evoo-malaysia.jpg',

    intro: [
      'Minyak zaitun antara makanan yang paling kerap dipalsukan dalam perdagangan dunia. Biasanya bukan dalam cara dramatik atau berbahaya — lebih kerap ia minyak ditapis dijual pada harga extra virgin, minyak lama dijual sebagai tuaian baharu, atau campuran empat negara dijual di bawah nama berbunyi Itali.',
      'Malaysia mengimport semua minyak zaitunnya, bermakna pembeli di sini mempunyai kurang konteks berbanding pembeli di Andalusia dan lebih jauh jarak antara mesin perah dan rak kedai. Berita baiknya, anda tidak perlukan makmal. Anda perlu tahu empat perkara pada label yang bermakna, dan anda perlukan dua minit serta satu sudu.',
      'Ini senarai semak yang kami sendiri gunakan.',
    ],

    sections: [
      {
        id: 'why-authenticity',
        heading: 'Kenapa ketulenan masalah sebenar, bukan cerita menakutkan',
        blocks: [
          {
            type: 'p',
            text: 'Minyak zaitun dara mahal untuk dihasilkan: tuaian tangan atau mekanikal yang berhati-hati, perahan dalam beberapa jam, hasil yang rendah, dan tiada cara menyelamatkan kelompok yang rosak melalui penapisan. Minyak ditapis pula murah dihasilkan dan hampir tiada rasa, jadi ia mudah dilepaskan sebagai sesuatu yang lain setelah masuk ke dalam botol hijau berlabel kampung.',
          },
          {
            type: 'p',
            text: 'Kategorinya ditetapkan di peringkat antarabangsa — oleh piawaian perdagangan [Majlis Zaitun Antarabangsa](https://www.internationaloliveoil.org/) dan piawaian [Codex Alimentarius](https://www.fao.org/fao-who-codexalimentarius/en/) untuk minyak zaitun — tetapi penguatkuasaan berlaku di titik pengeluaran dan import, bukan di dapur anda. Sebab itulah perkataan pada label sangat penting.',
          },
        ],
      },
      {
        id: 'read-the-label',
        heading: 'Langkah 1: Baca label dengan betul',
        blocks: [
          { type: 'h3', text: 'Perkataan gred sahaja bahagian yang dikawal selia' },
          {
            type: 'p',
            text: 'Cari frasa tepat **"extra virgin olive oil"** (minyak zaitun dara). Apa-apa selain itu produk berbeza, walau sehebat mana bunyinya.',
          },
          {
            type: 'table',
            head: ['Apa tertulis pada label', 'Apa sebenarnya'],
            rows: [
              ['Extra virgin olive oil', 'Gred tertinggi. Pengekstrakan mekanikal sahaja, tiada kecacatan, keasidan bebas 0.8% atau lebih rendah.'],
              ['Virgin olive oil', 'Kaedah sama, had keasidan lebih longgar dan kecacatan deria kecil dibenarkan.'],
              ['Olive oil / "Pure" olive oil', 'Campuran minyak ditapis dengan sedikit minyak virgin. Ditapis bermakna haba dan pemprosesan industri.'],
              ['Light / Extra light olive oil', 'Campuran ditapis. "Light" menerangkan warna dan rasa. Kalorinya sama seperti mana-mana minyak.'],
              ['Olive pomace oil', 'Diekstrak dengan pelarut daripada hampas dan kulit, kemudian ditapis. Tingkat paling murah.'],
              ['"Premium", "Gold", "Classic", "Import"', 'Pemasaran. Tiada makna undang-undang langsung.'],
            ],
          },
          {
            type: 'note',
            title: 'Perangkap paling biasa',
            text: 'Botol berlabel besar "Olive Oil" tanpa perkataan "extra virgin" di mana-mana ialah campuran ditapis. Ia bukan palsu dan bukan tidak selamat — ia sekadar gred lebih rendah yang dijual di sebelah gred lebih tinggi, dan pembeli yang tergesa-gesa membaca perkataan "zaitun" lalu berhenti di situ.',
          },
          { type: 'h3', text: 'Tarikh tuaian mengalahkan tarikh luput' },
          {
            type: 'p',
            text: 'Minyak zaitun jus segar, bukan produk awet. Tarikh "baik sebelum" hanya memberitahu bila pembungkus berhenti menjamin — biasanya 18 hingga 24 bulan selepas dibotolkan, yang mungkin setahun selepas zaitun dipetik. **Tarikh tuaian** atau tahun tanaman memberitahu kebenarannya. Pilih tuaian terkini yang ada; zaitun hemisfera utara biasanya dipetik antara Oktober dan Januari.',
          },
          { type: 'h3', text: 'Asal usul patut satu tempat, dinamakan' },
          {
            type: 'p',
            text: 'Satu negara atau wilayah — Palestin, Jaén, Kalamata, Sfax — bermakna ada pihak bertanggungjawab terhadap minyak itu. Ayat seperti "dibungkus di Itali", "dibotolkan di EU" atau "campuran minyak zaitun EU dan bukan EU" adalah sah dan biasa, tetapi ia memberitahu minyak itu mungkin datang dari beberapa negara dan beberapa tuaian, dicampur demi kestabilan harga, bukan demi rasa.',
          },
          { type: 'h3', text: 'Keasidan dan "perahan sejuk pertama", jika dinyatakan' },
          {
            type: 'p',
            text: 'Keasidan bebas ialah ukuran makmal terhadap penguraian lemak, ditulis sebagai peratusan. Had extra virgin ialah 0.8%. Pengeluar serius menerbitkan angka jauh lebih rendah — Arabian Village diuji di bawah 0.028%. "Perahan sejuk pertama" bermakna minyak itu datang daripada satu pengekstrakan mekanikal tanpa haba tambahan; ia perbezaan sebenar daripada minyak ditapis, walaupun ia sendiri tidak menjamin rasa.',
          },
          { type: 'h4', text: 'Bagaimana dengan pensijilan?' },
          {
            type: 'p',
            text: 'Tanda organik, tanda wilayah PDO/PGI dan pengiktirafan halal masing-masing memberitahu sesuatu yang sempit dan khusus. Tiada satu pun menggantikan gred, tarikh tuaian dan asal usul. Berhati-hati juga dengan kesilapan sebaliknya — menganggap sesuatu minyak rendah mutunya semata-mata kerana pengeluar kecil tidak membayar untuk skim pensijilan.',
          },
        ],
      },
      {
        id: 'the-bottle',
        heading: 'Langkah 2: Nilai pembungkusan',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Kaca gelap atau tin.** Cahaya memacu pengoksidaan. Botol jernih yang duduk di bawah lampu kedai berbulan-bulan ialah minyak yang sudah tua.',
              '**Saiz yang masuk akal.** 250–500 ml untuk rumah yang menghabiskan botol dalam beberapa minggu; tin besar hanya jika anda benar-benar memasak banyak. Tong 3 liter yang separuh guna ialah kekecewaan yang perlahan.',
              '**Meterai yang betul.** Penutup bukti gangguan, paras isi yang kemas, tiada sisa atau kebocoran di leher botol.',
              '**Maklumat sebenar di belakang.** Nama dan alamat pengeluar, negara asal, gred, nombor lot. Label belakang yang hanya ada pelekat pengimport ialah label yang menyembunyikan sesuatu.',
            ],
          },
          {
            type: 'image',
            src: 'filtering',
            alt: 'Minyak zaitun hijau keemasan sedang ditapis dan dienapkan selepas perahan sejuk pertama',
            caption: 'Antara perahan dan botol, setiap langkah dan setiap minggu tambahan ada kosnya pada minyak.',
          },
        ],
      },
      {
        id: 'taste-test',
        heading: 'Langkah 3: Rasa sendiri — ujian dua minit di rumah',
        blocks: [
          {
            type: 'p',
            text: 'Penilai profesional guna gelas biru supaya warna tidak mempengaruhi mereka. Anda boleh buat versi kasarnya di rumah, dan ia paling banyak mendedahkan berbanding apa-apa dalam senarai ini.',
          },
          {
            type: 'ol',
            items: [
              'Tuang kira-kira satu sudu besar ke dalam gelas kecil dan tutup bahagian atas dengan tapak tangan.',
              'Panaskan dengan haba tapak tangan selama dua puluh hingga tiga puluh saat, kemudian goyangkan.',
              'Buka dan hidu. Anda mencari rumput hijau, daun baru dipotong, tomato hijau, artichoke, kadangkala badam hijau atau epal.',
              'Hirup sedikit, tarik udara masuk bersamanya, dan biarkan ia melapisi mulut.',
              'Telan dan perhatikan rasa akhir di pangkal tekak.',
            ],
          },
          { type: 'h3', text: 'Tiga ciri positif' },
          {
            type: 'ul',
            items: [
              '**Buah (fruity)** — bau dan rasa zaitun segar. Daripada hijau berumput hingga masak dan manis.',
              '**Pahit** — kepahitan bersih merentas lidah, daripada sebatian fenolik.',
              '**Pedas (pungent)** — gigitan lada di pangkal tekak yang boleh membuat anda terbatuk. Ini oleokantal. Ia tanda baik, bukan kecacatan.',
            ],
          },
          { type: 'h3', text: 'Kecacatan yang patut buat anda berpatah balik' },
          {
            type: 'ul',
            items: [
              '**Tengik** — krayon lama, kacang basi, pendempul. Kecacatan paling biasa, tanda minyak yang sudah terlalu lama.',
              '**Fusty** — bau berat, masam berpeluh, terperam, daripada zaitun ditimbun terlalu lama sebelum diperah.',
              '**Berkulat atau lembap** — kadbod lembap, almari basah.',
              '**Berbau wain atau cuka** — tajam, terperam, masam.',
              '**Hambar dan berminyak** tanpa aroma langsung — biasanya minyak ditapis, walau apa pun dakwaan label hadapan.',
            ],
          },
          {
            type: 'note',
            title: 'Abaikan warna sepenuhnya',
            text: 'Hijau tidak bermakna segar dan keemasan tidak bermakna lama. Warna datang daripada varieti zaitun dan tahap kematangan ketika tuaian — itulah sebabnya gelas penilaian profesional berwarna biru.',
          },
        ],
      },
      {
        id: 'price',
        heading: 'Langkah 4: Semak harga secara waras',
        blocks: [
          {
            type: 'p',
            text: 'Minyak zaitun dara sebenar ada lantai kos. Zaitun mesti dituai pada waktu yang betul, diangkut cepat, diperah dalam beberapa jam, dan disimpan dengan teliti — dan kira-kira lima hingga sepuluh kilogram zaitun menghasilkan satu liter minyak sahaja. Apabila sesuatu botol berharga jauh di bawah setiap minyak zaitun dara setanding di rak, ada sesuatu dalam rantaian itu yang dilangkau.',
          },
          {
            type: 'p',
            text: 'Tukar semuanya kepada harga per liter sebelum membandingkan, dan bandingkan yang setara: extra virgin dengan extra virgin, bukan dengan campuran ditapis dalam botol lebih besar. Kemudian timbang asal usul, tahun tuaian dan pembungkusan. Minyak zaitun dara tulen yang paling murah dalam sesuatu kategori biasanya belian berpatutan; yang harganya separuh daripada semua yang lain biasanya bukan dalam kategori yang sama langsung.',
          },
        ],
      },
      {
        id: 'where-to-buy',
        heading: 'Langkah 5: Beli daripada pihak yang bertanggungjawab',
        blocks: [
          {
            type: 'p',
            text: 'Tempat anda membeli mempengaruhi apa yang anda dapat, kerana penyimpanan dan putaran stok berlaku sebelum anda melihat botol itu.',
          },
          {
            type: 'ul',
            items: [
              '**Jenama atau pengedar rasminya.** Paling sedikit tangan, asal usul paling jelas, dan ada orang yang boleh menjawab soalan tentang tarikh tuaian. Arabian Village diedarkan di Malaysia oleh [Berkat Madinah Store](https://madinah.com.my/en/), syarikat makanan Arab halal yang ditubuhkan pada 2010.',
              '**Kedai rasmi di pasaran dalam talian.** Penyenaraian Shopee dan TikTok Shop yang dikendalikan jenama atau pengedar, bukan penjual semula yang tiada kaitan. Semak nama kedai, bukan sekadar gambar produk.',
              '**Kedai runcit halal dengan putaran stok pantas.** Rak yang sibuk ialah rak yang segar. Botol berhabuk di lorong sunyi sudah lama menua di bawah lampu.',
            ],
          },
          {
            type: 'p',
            text: 'Semua saluran rasmi Arabian Village disenaraikan di [halaman kedai kami](/shop), dan anda boleh [hubungi kami terus](/contact) untuk pertanyaan runcit atau borong.',
          },
        ],
      },
      {
        id: 'storage',
        heading: 'Langkah 6: Jangan rosakkannya di rumah',
        blocks: [
          {
            type: 'ol',
            items: [
              'Simpan dalam almari gelap, jauh dari dapur. Haba dan cahaya musuhnya.',
              'Tutup penutup rapat — oksigen merosakkan minyak perlahan tetapi kekal.',
              'Jangan tuang ke dalam balang jernih di atas kaunter, walau secantik mana rupanya.',
              'Tidak perlu peti sejuk. Berkabus dalam udara sejuk perkara biasa dan tidak berbahaya.',
              'Habiskan botol yang dibuka dalam kira-kira dua bulan, sesuai dengan iklim panas dan lembap Malaysia.',
            ],
          },
        ],
      },
      {
        id: 'checklist',
        heading: 'Senarai semak 10 perkara',
        blocks: [
          {
            type: 'ol',
            items: [
              'Label menyebut tepat "extra virgin olive oil".',
              'Ada tarikh tuaian atau tahun tanaman, dan ia terkini.',
              'Asal usul ialah satu negara atau wilayah yang dinamakan.',
              'Keasidan bebas dinyatakan, dan jauh di bawah 0.8%.',
              'Botolnya kaca gelap atau tin.',
              'Saiznya padan dengan kelajuan sebenar memasak di rumah anda.',
              'Label belakang menamakan pengeluar sebenar, bukan pengimport sahaja.',
              'Harganya dalam julat sama dengan minyak zaitun dara tulen yang lain.',
              'Ia berbau buah hijau segar — dan rasanya berbuah, pahit dan pedas.',
              'Anda membelinya daripada jenama, pengedarnya, atau kedai rasmi.',
            ],
          },
        ],
      },
    ],

    conclusion: {
      heading: 'Kesimpulan',
      blocks: [
        {
          type: 'p',
          text: 'Memilih minyak zaitun dara asli di Malaysia berbalik kepada empat fakta label — gred, tarikh tuaian, asal usul, keasidan — satu semakan pembungkusan, dan satu ujian rasa. Tiada apa di depan botol yang menjadi bukti kepada apa-apa.',
        },
        {
          type: 'p',
          text: 'Buat sekali dengan teliti dan selepas itu anda akan mengenali minyak yang baik hanya melalui bau. Gigitan pedas yang anda belajar jangkakan itu ialah sebatian yang sama yang kajian terus kembali kepadanya — satu kebetulan yang kemas: minyak yang paling terasa hidup biasanya minyak yang berbaloi dibeli.',
        },
        {
          type: 'p',
          text: 'Arabian Village ialah minyak zaitun dara perahan sejuk pertama dari kebun Palestin berusia ratusan tahun, dituai dengan tangan dan diperah dalam beberapa jam, dengan keasidan diuji di bawah 0.028%. Lihat [butiran produk penuh](/products), baca [mengapa keluarga mempercayai kami](/why-us), atau cari [di mana untuk membeli](/shop).',
        },
      ],
    },

    faqs: [
      {
        q: 'Bagaimana nak tahu minyak zaitun itu extra virgin yang asli?',
        a: 'Pastikan label menyebut tepat "extra virgin olive oil", ada tarikh tuaian terkini dan satu negara asal yang dinamakan, dan keasidan bebas dinyatakan jauh di bawah had 0.8%. Kemudian rasa: minyak zaitun dara tulen berbau buah hijau segar dan rasanya berbuah, pahit dan pedas. Rasa hambar, berlilin atau seperti krayon bermakna ia sudah lama atau telah ditapis.',
      },
      {
        q: 'Apa beza extra virgin, "pure" dan "light" olive oil?',
        a: 'Extra virgin diekstrak secara mekanikal tanpa haba atau pelarut dan mesti bebas kecacatan deria. "Pure" dan "light" ialah campuran minyak ditapis dengan sedikit minyak virgin; penapisan menggunakan haba dan pemprosesan industri, membuang sebahagian besar aroma dan polifenol. "Light" merujuk rasa dan warna, bukan kalori — semua minyak zaitun mempunyai kandungan tenaga yang lebih kurang sama.',
      },
      {
        q: 'Adakah warna minyak zaitun menunjukkan kualitinya?',
        a: 'Tidak. Warna bergantung kepada varieti zaitun dan tahap kematangan buah ketika dituai, bukan kualiti atau kesegaran. Penilai profesional menggunakan gelas biru khusus supaya warna tidak mempengaruhi penilaian mereka. Bergantunglah pada bau dan rasa.',
      },
      {
        q: 'Adakah minyak zaitun murah di Malaysia palsu?',
        a: 'Tidak semestinya palsu, tetapi harga yang sangat rendah biasanya bermakna gred berbeza — campuran ditapis atau minyak pomace yang dijual bersebelahan dengan extra virgin. Minyak zaitun dara tulen ada lantai kos kerana kira-kira lima hingga sepuluh kilogram zaitun menghasilkan satu liter, dan buahnya mesti diperah dalam beberapa jam. Bandingkan harga per liter dan hanya dengan minyak extra virgin yang lain.',
      },
      {
        q: 'Apa maksud "perahan sejuk pertama"?',
        a: 'Ia bermakna minyak itu diekstrak secara mekanikal dalam satu perahan tanpa haba tambahan, jadi tiada apa yang "dimasak" keluar daripadanya. Ia perbezaan sebenar daripada minyak ditapis. Namun ia sendiri tidak membuktikan kualiti — gandingkan dengan tarikh tuaian terkini, asal usul yang dinamakan dan angka keasidan yang rendah.',
      },
      {
        q: 'Di mana boleh beli minyak zaitun dara asli di Malaysia?',
        a: 'Beli daripada jenama atau pengedar rasminya dan bukan penjual semula yang tidak dikenali, supaya asal usul dan usia stok boleh dikesan. Minyak zaitun Arabian Village diedarkan di Malaysia oleh Berkat Madinah Store (madinah.com.my), dan juga dijual melalui penyenaraian rasmi jenama ini di Shopee dan TikTok Shop.',
      },
    ],

    related: [
      {
        label: 'Manfaat Kesihatan Minyak Zaitun Dara untuk Keluarga Malaysia',
        path: 'blog/manfaat-kesihatan-minyak-zaitun-dara-untuk-keluarga-malaysia',
        description: 'Apa isi botol, dan apa yang sebenarnya dikatakan pihak berkuasa kesihatan.',
      },
      {
        label: 'Mengapa Minyak Zaitun Semakin Popular di Malaysia',
        path: 'blog/mengapa-minyak-zaitun-semakin-popular-di-malaysia',
        description: 'Faktor yang mengubah barang import khusus menjadi bahan dapur harian.',
      },
      {
        label: 'Di Mana Untuk Membeli',
        path: 'shop',
        description: 'Berkat Madinah Store, Shopee dan TikTok Shop — setiap saluran rasmi.',
      },
    ],
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "beli-minyak-zaitun-kl",
    "slug": "di-mana-beli-minyak-zaitun-di-kuala-lumpur",
    "seoTitle": "Kedai Arab KL: Di Mana Beli Minyak Zaitun di Lembah Klang",
    "metaTitle": "Kedai Arab KL: Di Mana Beli Minyak Zaitun di Lembah Klang",
    "metaDescription": "Panduan kedai arab KL untuk beli minyak zaitun: apa nak cari pada botol, apa nak tanya kakitangan, dan di mana Arabian Village dijual di Lembah Klang.",
    "focusKeyword": "kedai arab kl",
    "relatedKeywords": [
      "kedai arab near me",
      "kedai arab kuala lumpur",
      "kedai runcit arab",
      "kedai makanan arab",
      "kedai arab bukit bintang",
      "minyak zaitun near me",
      "beli minyak zaitun",
      "minyak zaitun kuala lumpur",
      "harga minyak zaitun",
      "minyak zaitun extra virgin"
    ],
    "category": "Panduan membeli",
    "tags": [
      "kedai arab",
      "kuala lumpur",
      "minyak zaitun",
      "panduan membeli"
    ],
    "h1": "Di mana beli minyak zaitun di Kuala Lumpur: panduan kedai arab KL",
    "excerpt": "Panduan ringkas untuk membeli minyak zaitun di Lembah Klang — kenapa kedai runcit Arab biasanya menang, apa yang perlu dilihat pada botol, dan di mana Arabian Village dijual.",
    "keyTakeaway": "Di Lembah Klang, kedai runcit Arab biasanya memberi pilihan minyak zaitun yang lebih baik daripada rak pasar raya kerana ia barang teras di situ. Arabian Village dijual melalui Berkat Madinah Store — cawangan Ampang Jaya dan Batu Caves, buka 8:00 pagi hingga 12:00 tengah malam setiap hari, serta kaunter Shopee dan TikTok Shop mereka sendiri.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 4,
    "hero": {
      "src": "pressBeliMinyakZaitunKlHero",
      "alt": "Rak minyak zaitun di sebuah kedai arab KL, botol kaca gelap disusun mengikut saiz"
    },
    "ogImage": "/og/blog-beli-minyak-zaitun-kl.jpg",
    "intro": [
      "Soalan yang paling kerap ditaip orang di Lembah Klang bukan \"minyak zaitun mana yang terbaik\", tetapi \"di mana nak beli\". Jawapan itulah yang menentukan apa yang sampai ke dapur anda.",
      "Pasar raya besar biasanya menyimpan satu atau dua botol di rak minyak masak. Kedai runcit Arab menjualnya sebagai barang teras, dan itu mengubah pilihan gred serta kesegaran botol.",
      "Di bawah: apa yang perlu dilihat pada botol, apa yang boleh ditanya kepada kakitangan kedai, dan di mana Arabian Village dijual di Lembah Klang."
    ],
    "sections": [
      {
        "heading": "Di mana nak beli minyak zaitun di Kuala Lumpur?",
        "id": "di-mana-nak-beli",
        "blocks": [
          {
            "type": "p",
            "text": "Ada tiga tempat yang berbaloi dicuba di Kuala Lumpur dan sekitarnya: kedai runcit Arab, lorong barangan import di pasar raya besar, dan kaunter dalam talian rasmi jenama itu sendiri. Kedai runcit Arab menang dari segi pilihan, pasar raya menang dari segi kemudahan, dan kaunter dalam talian menang dari segi masa."
          },
          {
            "type": "ul",
            "items": [
              "**Kedai runcit Arab** — pilihan paling luas, kakitangan tahu asal usul setiap botol.",
              "**Pasar raya besar** — mudah, tetapi selalunya satu atau dua jenama sahaja.",
              "**Kaunter dalam talian jenama** — stok sama, dihantar ke rumah."
            ]
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunKlInline",
            "alt": "Botol minyak zaitun dara extra Arabian Village saiz 250 ml dan 500 ml di atas kaunter kedai"
          }
        ]
      },
      {
        "heading": "Kenapa kedai runcit Arab selalunya ada pilihan yang lebih baik?",
        "id": "kenapa-kedai-arab",
        "blocks": [
          {
            "type": "p",
            "text": "Sebab minyak zaitun ialah barang teras di kedai itu. Kedai makanan Arab menjual kepada pelanggan yang memasak dengannya setiap hari, jadi stok bergerak laju dan botol tidak lama menunggu di rak. Anda juga jumpa saiz, gred dan asal usul yang tidak muat di lorong pasar raya."
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunKlInline",
            "alt": "Botol minyak zaitun dara extra Arabian Village saiz 250 ml dan 500 ml di atas kaunter kedai"
          }
        ]
      },
      {
        "heading": "Apa yang perlu dicari pada botol sebelum bayar?",
        "id": "apa-nak-cari-pada-botol",
        "blocks": [
          {
            "type": "p",
            "text": "Lihat lima perkara sebelum bayar: gred, cara ia diperah, asal usul yang dinyatakan dengan jelas, jenis bekas, dan tarikh pada label. Kalau label hanya tulis \"minyak zaitun\" tanpa gred dan tanpa nama negara, itu sendiri sudah satu jawapan tentang apa yang ada di dalamnya."
          },
          {
            "type": "ul",
            "items": [
              "**Gred** — *extra virgin* bermaksud perahan pertama, tanpa pelarut kimia.",
              "**Perah sejuk** — tanpa haba tinggi, jadi rasa dan aroma kekal.",
              "**Asal usul** — satu negara yang dinamakan. Lihat [pendirian kami](/why-us).",
              "**Bekas** — kaca gelap atau tin; cahaya musuh minyak zaitun.",
              "**Harga seliter** — banding 250 ml dengan 500 ml."
            ]
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunKlInline",
            "alt": "Botol minyak zaitun dara extra Arabian Village saiz 250 ml dan 500 ml di atas kaunter kedai"
          }
        ]
      },
      {
        "heading": "Apa yang boleh ditanya kepada kakitangan kedai?",
        "id": "soalan-kepada-kakitangan",
        "blocks": [
          {
            "type": "p",
            "text": "Tanya soalan yang ada jawapan fakta, bukan pendapat: minyak ini dari negara mana, bila stok masuk, siapa pengimport rasminya, dan boleh tak saya rasa dahulu. Kedai yang tahu barangnya akan jawab terus. Kalau jawapannya kabur untuk keempat-empatnya, ambil botol lain."
          },
          {
            "type": "ul",
            "items": [
              "\"Minyak ini dari negara mana?\"",
              "\"Bila stok ini sampai?\"",
              "\"Siapa pengimport rasminya?\"",
              "\"Ada botol untuk rasa?\""
            ]
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunKlInline",
            "alt": "Botol minyak zaitun dara extra Arabian Village saiz 250 ml dan 500 ml di atas kaunter kedai"
          }
        ]
      },
      {
        "heading": "Di mana boleh dapatkan Arabian Village di Lembah Klang?",
        "id": "cawangan-berkat-madinah",
        "blocks": [
          {
            "type": "p",
            "text": "Arabian Village diedarkan di Malaysia oleh Berkat Madinah Store, yang bermula pada 2010. Ada dua cawangan, Ampang Jaya dan Batu Caves, dan Batu Caves ialah yang lebih besar. Waktu operasi kedua-duanya 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad."
          },
          {
            "type": "note",
            "title": "Hari perayaan boleh berbeza",
            "text": "Waktu operasi pada hari raya dan hari perayaan lain boleh berubah. Sahkan melalui WhatsApp di +60 11-1111 9912 sebelum bergerak, terutamanya kalau anda jauh."
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunKlInline",
            "alt": "Botol minyak zaitun dara extra Arabian Village saiz 250 ml dan 500 ml di atas kaunter kedai"
          }
        ]
      },
      {
        "heading": "Kalau tak sempat pergi kedai, boleh beli dalam talian?",
        "id": "beli-dalam-talian",
        "blocks": [
          {
            "type": "p",
            "text": "Boleh. Berkat Madinah mengendalikan kaunter Shopee dan TikTok Shop mereka sendiri — bukan penjual pihak ketiga, tetapi kedai yang sama dengan stok yang sama. Jadi anda tidak perlu memilih antara membeli di kedai atau dalam talian; kaunternya sama, cuma pintu masuknya berbeza."
          },
          {
            "type": "table",
            "head": [
              "Cara beli",
              "Sesuai untuk",
              "Nota"
            ],
            "rows": [
              [
                "Cawangan Ampang Jaya",
                "KL timur",
                "8:00 pagi – 12:00 tengah malam"
              ],
              [
                "Cawangan Batu Caves",
                "Pilihan terluas",
                "Cawangan lebih besar"
              ],
              [
                "Shopee",
                "Penghantaran",
                "Kaunter Berkat Madinah sendiri"
              ],
              [
                "TikTok Shop",
                "Beli sambil menonton",
                "Kaunter Berkat Madinah sendiri"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunKlInline",
            "alt": "Botol minyak zaitun dara extra Arabian Village saiz 250 ml dan 500 ml di atas kaunter kedai"
          },
          {
            "type": "p",
            "text": "Semua kaunter rasmi ada di [halaman tempat membeli](/shop)."
          }
        ]
      },
      {
        "heading": "Berapa harga dan saiz mana patut dibeli dahulu?",
        "id": "harga-dan-saiz",
        "blocks": [
          {
            "type": "p",
            "text": "Botol 250 ml berharga RM59.00 dan botol 500 ml berharga RM103.00. Harga mengikut saiz itu sama untuk minyak klasik dan untuk setiap perisa Infused Collection. Kalau ini kali pertama, ambil 250 ml untuk merasa dahulu; kalau anda memasak setiap hari, 500 ml lebih berbaloi."
          },
          {
            "type": "p",
            "text": "Semua perisa disenaraikan di [halaman produk](/products)."
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunKlInline",
            "alt": "Botol minyak zaitun dara extra Arabian Village saiz 250 ml dan 500 ml di atas kaunter kedai"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Jadi, di mana patut anda beli?",
      "blocks": [
        {
          "type": "p",
          "text": "Mahu pilihan luas dan orang yang boleh jawab soalan di depan rak? Pergi ke kedai runcit Arab. Mahu botol sampai ke pintu rumah? Guna kaunter Shopee atau TikTok Shop Berkat Madinah. Stoknya sama."
        },
        {
          "type": "p",
          "text": "Sebelum bergerak pada hari cuti, [hubungi kami](/contact) untuk sahkan waktu operasi."
        }
      ]
    },
    "faqs": [
      {
        "q": "Di mana kedai arab yang paling dekat dengan saya di KL?",
        "a": "Bergantung pada kawasan anda. Untuk Arabian Village, dua kaunter fizikalnya ialah Berkat Madinah Store cawangan Ampang Jaya dan cawangan Batu Caves, dan Batu Caves ialah yang lebih besar. Kedua-duanya buka 8:00 pagi hingga 12:00 tengah malam setiap hari."
      },
      {
        "q": "Pukul berapa kedai buka dan tutup?",
        "a": "8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad, di kedua-dua cawangan. Waktu ini boleh berubah pada hari raya dan hari perayaan lain. Kalau anda datang pada hari cuti, hantar mesej WhatsApp ke +60 11-1111 9912 dahulu untuk sahkan sebelum bergerak."
      },
      {
        "q": "Adakah Shopee dan TikTok Shop itu penjual yang berasingan?",
        "a": "Bukan. Kaunter Shopee dan TikTok Shop dikendalikan oleh Berkat Madinah Store sendiri, pengedar rasmi Arabian Village di Malaysia, dengan stok yang sama seperti di cawangan. Anda cuma memilih antara datang ke kedai atau minta ia dihantar, bukan antara dua penjual berbeza."
      },
      {
        "q": "Berapa harga minyak zaitun Arabian Village?",
        "a": "RM59.00 untuk botol 250 ml dan RM103.00 untuk botol 500 ml. Harga mengikut saiz itu sama untuk minyak klasik dan untuk setiap perisa dalam Infused Collection, jadi anda memilih perisa mengikut cara anda memasak, bukan mengikut bajet yang tinggal."
      },
      {
        "q": "Apa beza extra virgin dengan minyak zaitun biasa?",
        "a": "Extra virgin ialah gred perahan pertama, diperah secara mekanikal tanpa haba tinggi atau pelarut kimia, dan itulah yang mengekalkan rasa serta aromanya. Gred lain selalunya diproses lebih lanjut sehingga rasanya lebih neutral. Bezanya paling ketara apabila anda memakannya mentah, bukan menggorengnya."
      },
      {
        "q": "Boleh saya rasa dahulu sebelum beli?",
        "a": "Tanya di kaunter. Kedai runcit Arab yang biasa menjual minyak zaitun selalunya sanggup membuka botol untuk pelanggan merasa, terutamanya pembeli kali pertama. Merasanya mentah di atas sudu atau sekeping roti ialah cara paling cepat untuk tahu sama ada minyak itu kena dengan selera anda."
      }
    ],
    "related": [
      {
        "label": "Semua saiz dan perisa minyak zaitun",
        "path": "products",
        "description": "Minyak zaitun dara extra klasik dan enam perisa Infused Collection, lengkap dengan harga."
      },
      {
        "label": "Kaunter rasmi tempat membeli",
        "path": "shop",
        "description": "Cawangan Berkat Madinah serta kaunter Shopee dan TikTok Shop mereka sendiri."
      },
      {
        "label": "Sahkan waktu operasi melalui WhatsApp",
        "path": "contact",
        "description": "Waktu boleh berbeza pada hari raya — tanya dahulu sebelum bergerak."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "harga-minyak-zaitun-malaysia",
    "slug": "harga-minyak-zaitun-di-malaysia",
    "seoTitle": "Harga Minyak Zaitun di Malaysia: Cara Kira Seliter",
    "metaTitle": "Harga Minyak Zaitun di Malaysia: Cara Kira Seliter",
    "metaDescription": "Harga minyak zaitun di Malaysia: RM59.00 bagi 250 ml, RM103.00 bagi 500 ml. Kira harga seliter dulu sebelum bayar — inilah caranya.",
    "focusKeyword": "harga minyak zaitun",
    "relatedKeywords": [
      "harga minyak zaitun di malaysia",
      "minyak zaitun berapa harga",
      "harga seliter minyak zaitun",
      "harga minyak zaitun 250ml",
      "harga minyak zaitun 500ml",
      "harga minyak zaitun extra virgin",
      "harga minyak zaitun terkini",
      "harga minyak zaitun asli",
      "beli minyak zaitun di malaysia",
      "minyak zaitun sejuk perah harga"
    ],
    "category": "Panduan Pembeli",
    "tags": [
      "harga",
      "minyak zaitun",
      "extra virgin",
      "panduan beli"
    ],
    "h1": "Harga minyak zaitun di Malaysia: apa yang anda bayar sebenarnya",
    "excerpt": "Harga sebenar mengikut saiz botol, sebab minyak zaitun mahal di Malaysia, dan cara kira harga seliter supaya perbandingan anda adil.",
    "keyTakeaway": "Arabian Village berharga RM59.00 bagi botol 250 ml dan RM103.00 bagi botol 500 ml. Tukar kepada seliter dan angkanya jadi RM236.00 berbanding RM206.00 — botol 500 ml RM30.00 lebih murah bagi jumlah minyak yang sama. Bandingkan seliter, bukan harga rak.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 4,
    "hero": {
      "src": "pressHargaMinyakZaitunMalaysiaHero",
      "alt": "Botol minyak zaitun dara Arabian Village di atas meja dapur, dengan tanda harga minyak zaitun bagi saiz 250 ml dan 500 ml"
    },
    "ogImage": "/og/blog-harga-minyak-zaitun-malaysia.jpg",
    "intro": [
      "Kalau anda sedang bandingkan harga minyak zaitun sebelum beli, masalahnya bukan nombor di rak — tetapi saiz botol yang tak sama. RM59.00 dan RM103.00 tak boleh dibanding sampailah kedua-duanya ditukar kepada harga seliter.",
      "Sebabnya mudah: Malaysia langsung tidak menanam zaitun. Setiap botol adalah barang import, dan kos perjalanan itu ada dalam harga di kaunter.",
      "Di bawah ada harga sebenar Arabian Village dan pengiraan seliter yang boleh anda buat sendiri pada mana-mana botol."
    ],
    "sections": [
      {
        "heading": "Berapa harga minyak zaitun di Malaysia hari ini?",
        "id": "harga-semasa",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara extra virgin sejuk perah Arabian Village berharga **RM59.00** bagi botol 250 ml dan **RM103.00** bagi botol 500 ml di Malaysia. Harga itu sama untuk minyak klasik dan untuk setiap perisa dalam Infused Collection — memilih perisa tidak menaikkan harga botol anda."
          },
          {
            "type": "table",
            "head": [
              "Saiz botol",
              "Harga botol",
              "Harga seliter"
            ],
            "rows": [
              [
                "250 ml",
                "RM59.00",
                "RM236.00"
              ],
              [
                "500 ml",
                "RM103.00",
                "RM206.00"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressHargaMinyakZaitunMalaysiaInline",
            "alt": "Dua botol minyak zaitun bersebelahan, satu 250 ml dan satu 500 ml, untuk membandingkan harga seliter"
          },
          {
            "type": "p",
            "text": "Lajur ketiga itulah yang penting: hanya harga seliter membolehkan dua botol berlainan saiz dibanding secara adil. Semua saiz ada pada [halaman produk kami](/products)."
          }
        ]
      },
      {
        "heading": "Kenapa harga minyak zaitun mahal di Malaysia?",
        "id": "kenapa-mahal",
        "blocks": [
          {
            "type": "p",
            "text": "Kerana tiada setitik pun daripadanya dihasilkan di sini. Pokok zaitun perlukan iklim Mediterranean — musim panas kering dan musim sejuk yang nyata — jadi Malaysia tiada ladang zaitun komersial. Setiap botol melalui penghantaran antarabangsa, kastam, duti dan cukai import sebelum sampai ke rak kedai."
          },
          {
            "type": "ul",
            "items": [
              "**Penghantaran dan duti** — minyak berat, berbotol kaca, dan dicukai sebelum sempat dijual.",
              "**Saiz botol** — kaca, tutup dan label berharga hampir sama, tetapi dikongsi oleh lebih sedikit minyak."
            ]
          },
          {
            "type": "image",
            "src": "pressHargaMinyakZaitunMalaysiaInline",
            "alt": "Dua botol minyak zaitun bersebelahan, satu 250 ml dan satu 500 ml, untuk membandingkan harga seliter"
          }
        ]
      },
      {
        "heading": "Macam mana nak kira harga seliter minyak zaitun?",
        "id": "kira-harga-seliter",
        "blocks": [
          {
            "type": "p",
            "text": "Bahagikan harga botol dengan isi padu dalam mililiter, kemudian darab dengan 1,000. Botol 250 ml pada RM59.00 menjadi RM236.00 seliter. Botol 500 ml pada RM103.00 menjadi RM206.00 seliter. Formula yang sama berfungsi pada mana-mana saiz di mana-mana kedai, jadi anda tak perlu bergantung pada dakwaan sesiapa."
          },
          {
            "type": "ol",
            "items": [
              "Ambil harga botol: RM103.00.",
              "Bahagi dengan mililiter: RM103.00 ÷ 500 = RM0.206.",
              "Darab dengan 1,000: RM206.00 seliter."
            ]
          },
          {
            "type": "image",
            "src": "pressHargaMinyakZaitunMalaysiaInline",
            "alt": "Dua botol minyak zaitun bersebelahan, satu 250 ml dan satu 500 ml, untuk membandingkan harga seliter"
          },
          {
            "type": "note",
            "title": "Simpan formula ini",
            "text": "harga ÷ mililiter × 1,000 = harga seliter. Lima saat dalam kalkulator telefon."
          }
        ]
      },
      {
        "heading": "250 ml atau 500 ml — mana lebih berbaloi?",
        "id": "saiz-mana-berbaloi",
        "blocks": [
          {
            "type": "p",
            "text": "Botol 500 ml, dan bezanya bukan kecil. Seliter, ia RM206.00 berbanding RM236.00 — anda jimat RM30.00 bagi setiap liter minyak yang sama. Beli dua botol 250 ml pula memberi 500 ml pada RM118.00, iaitu RM15.00 lebih mahal daripada satu botol 500 ml yang berharga RM103.00."
          },
          {
            "type": "p",
            "text": "Botol kecil tetap ada tempatnya: cuba kali pertama, beri sebagai hadiah, atau buka satu perisa seperti [wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme)."
          },
          {
            "type": "image",
            "src": "pressHargaMinyakZaitunMalaysiaInline",
            "alt": "Dua botol minyak zaitun bersebelahan, satu 250 ml dan satu 500 ml, untuk membandingkan harga seliter"
          }
        ]
      },
      {
        "heading": "Apa yang buat satu botol lebih mahal daripada botol lain?",
        "id": "apa-gerakkan-harga",
        "blocks": [
          {
            "type": "p",
            "text": "Gred, asal usul dan berapa banyak yang label itu sanggup beritahu. Extra virgin ialah gred perahan pertama yang dikeluarkan tanpa haba atau bahan kimia. Minyak yang ditapis, dicampur atau dilabel sekadar minyak zaitun biasa lebih murah dihasilkan — dan sepatutnya lebih murah dibeli."
          },
          {
            "type": "ul",
            "items": [
              "**Gred** — extra virgin, virgin, ditapis atau campuran; berbeza kos, berbeza rasa.",
              "**Asal dan tahun tuaian** — maklumat yang boleh disemak, bukan sekadar tarikh luput."
            ]
          },
          {
            "type": "image",
            "src": "pressHargaMinyakZaitunMalaysiaInline",
            "alt": "Dua botol minyak zaitun bersebelahan, satu 250 ml dan satu 500 ml, untuk membandingkan harga seliter"
          },
          {
            "type": "p",
            "text": "Setiap tanda ini kami huraikan dalam [cara memilih minyak zaitun dara asli](/blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia)."
          }
        ]
      },
      {
        "heading": "Di mana beli, dan apa perlu disemak sebelum bayar?",
        "id": "di-mana-beli",
        "blocks": [
          {
            "type": "p",
            "text": "Di Malaysia, Arabian Village diedarkan oleh Berkat Madinah Store, yang bermula pada 2010. Beli di kaunter mereka di **Ampang Jaya** dan **Batu Caves** — Batu Caves lebih besar — atau melalui storefront Shopee dan TikTok Shop mereka sendiri. Waktu buka 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad."
          },
          {
            "type": "ul",
            "items": [
              "Kira harga seliter dahulu, kemudian baru banding.",
              "Semak gred pada label: extra virgin, bukan sekadar minyak zaitun."
            ]
          },
          {
            "type": "image",
            "src": "pressHargaMinyakZaitunMalaysiaInline",
            "alt": "Dua botol minyak zaitun bersebelahan, satu 250 ml dan satu 500 ml, untuk membandingkan harga seliter"
          },
          {
            "type": "note",
            "title": "Sebelum bergerak ke kedai",
            "text": "Hari perayaan boleh mengubah waktu buka. Sahkan melalui WhatsApp di +60 11-1111 9912, atau lihat [saluran belian rasmi](/shop)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Bandingkan seliter, bukan harga rak",
      "blocks": [
        {
          "type": "p",
          "text": "Harga minyak zaitun di Malaysia tinggi kerana setiap botol adalah barang import, dan itu takkan berubah selagi kita tiada ladang zaitun. Apa yang boleh berubah ialah cara anda membanding: RM59.00 bagi 250 ml ialah RM236.00 seliter, RM103.00 bagi 500 ml ialah RM206.00 seliter."
        }
      ]
    },
    "faqs": [
      {
        "q": "Berapa harga minyak zaitun 250ml?",
        "a": "Botol 250 ml minyak zaitun dara extra virgin Arabian Village berharga RM59.00. Ditukar kepada seliter, itu bersamaan RM236.00. Harga sama dikenakan untuk minyak klasik dan setiap perisa Infused Collection, jadi memilih perisa tidak mengubah apa yang anda bayar bagi saiz botol itu."
      },
      {
        "q": "Berapa harga minyak zaitun 500ml?",
        "a": "Botol 500 ml berharga RM103.00, iaitu RM206.00 seliter. Berbanding botol 250 ml yang menjadi RM236.00 seliter, anda jimat RM30.00 bagi setiap liter. Dua botol 250 ml memberi jumlah minyak yang sama tetapi berharga RM118.00, jadi satu botol 500 ml RM15.00 lebih murah."
      },
      {
        "q": "Minyak zaitun berapa harga seliter di Malaysia?",
        "a": "Ia bergantung pada saiz botol, bukan hanya jenama. Bagi Arabian Village, botol 250 ml menjadi RM236.00 seliter dan botol 500 ml menjadi RM206.00 seliter. Kira sendiri dengan formula ini: harga botol dibahagi isi padu dalam mililiter, kemudian darab dengan 1,000."
      },
      {
        "q": "Kenapa minyak zaitun extra virgin lebih mahal daripada minyak zaitun biasa?",
        "a": "Extra virgin ialah gred perahan pertama yang dikeluarkan tanpa haba atau bahan kimia, dan kaedah itu menghasilkan lebih sedikit minyak daripada buah yang sama. Minyak yang ditapis atau dicampur lebih murah dihasilkan dan rasanya lebih neutral. Anda membayar untuk gred, bukan untuk botolnya."
      },
      {
        "q": "Adakah minyak zaitun berperisa lebih mahal daripada yang klasik?",
        "a": "Tidak. Setiap perisa dalam Infused Collection — lavender-chamomile, blackseed, turmeric-black-pepper, rosemary-basil, fennel-anise dan wild-thyme — berharga sama dengan minyak klasik pada saiz yang sama: RM59.00 bagi 250 ml dan RM103.00 bagi 500 ml. Semuanya infusi masakan, dibuat untuk kegunaan dapur harian."
      },
      {
        "q": "Di mana saya boleh beli minyak zaitun Arabian Village di Malaysia?",
        "a": "Melalui Berkat Madinah Store, pengedar rasmi di Malaysia yang bermula pada 2010. Beli di kaunter cawangan Ampang Jaya atau Batu Caves, atau melalui storefront Shopee dan TikTok Shop mereka sendiri. Waktu buka 8:00 pagi hingga 12:00 tengah malam setiap hari; hari perayaan boleh berbeza."
      }
    ],
    "related": [
      {
        "label": "Semua saiz dan perisa",
        "path": "products",
        "description": "Lihat botol 250 ml dan 500 ml, minyak klasik dan enam perisa Infused Collection."
      },
      {
        "label": "Tempat membeli di Malaysia",
        "path": "shop",
        "description": "Kaunter Ampang Jaya dan Batu Caves, serta Shopee dan TikTok Shop Berkat Madinah."
      },
      {
        "label": "Cara memilih minyak zaitun dara asli",
        "path": "blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia",
        "description": "Senarai semak label: gred, asal, tahun tuaian dan botol."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "jenama-minyak-zaitun-terbaik",
    "slug": "cara-menilai-jenama-minyak-zaitun",
    "seoTitle": "Jenama Minyak Zaitun Terbaik: Cara Menilai Sendiri",
    "metaTitle": "Jenama Minyak Zaitun Terbaik: Cara Menilai Sendiri",
    "metaDescription": "Bukan senarai nama. Lima kriteria untuk menilai jenama minyak zaitun terbaik sendiri: gred, tarikh, bekas, asal-usul dan harga seliter.",
    "focusKeyword": "jenama minyak zaitun terbaik",
    "relatedKeywords": [
      "jenama minyak zaitun terbaik di pasaran",
      "minyak zaitun terbaik",
      "minyak zaitun yang terbaik",
      "minyak zaitun terbaik untuk masak",
      "cara pilih minyak zaitun",
      "label minyak zaitun",
      "minyak zaitun extra virgin",
      "harga minyak zaitun seliter",
      "tarikh tuaian minyak zaitun",
      "botol kaca gelap minyak zaitun"
    ],
    "category": "Panduan Pembeli",
    "tags": [
      "minyak zaitun",
      "panduan membeli",
      "label makanan",
      "extra virgin",
      "harga"
    ],
    "h1": "Jenama minyak zaitun terbaik: lima kriteria yang anda boleh periksa sendiri",
    "excerpt": "Daripada menghafal senarai nama, gunakan lima kriteria — gred, tarikh, bekas, asal-usul dan harga seliter — untuk menilai mana-mana botol minyak zaitun di rak.",
    "keyTakeaway": "Tiada satu jenama minyak zaitun terbaik untuk semua orang. Yang ada ialah botol yang lulus lima pemeriksaan: gred yang dinyatakan jelas, tarikh yang boleh dibaca, bekas yang menghalang cahaya, asal-usul sampai ke negara ladangnya, dan harga yang anda banding seliter dan bukan sebotol.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 5,
    "hero": {
      "src": "pressJenamaMinyakZaitunTerbaikHero",
      "alt": "Beberapa botol minyak zaitun di rak kedai, dibandingkan mengikut kriteria jenama minyak zaitun terbaik seperti gred dan tarikh pada label"
    },
    "ogImage": "/og/blog-jenama-minyak-zaitun-terbaik.jpg",
    "intro": [
      "Carian untuk **jenama minyak zaitun terbaik** biasanya berakhir dengan senarai nama. Masalahnya, senarai itu bertukar setiap tahun, dan botol di rak berhampiran rumah anda selalunya tiada.",
      "Yang tidak bertukar ialah kriterianya. Gred, tarikh, bekas, asal-usul dan harga seliter tercetak pada botol itu sendiri. Artikel ini tidak menyusun kedudukan syarikat lain; ia satu senarai semak untuk depan rak."
    ],
    "sections": [
      {
        "heading": "Apa sebenarnya yang menentukan jenama minyak zaitun terbaik?",
        "id": "kriteria-asas",
        "blocks": [
          {
            "type": "p",
            "text": "Bukan nama pada botol, tetapi maklumat yang jenama itu sanggup cetak. Botol yang menyatakan gred, tarikh, negara ladang dan isi padu dengan jelas memberi anda lima titik pemeriksaan. Botol yang hanya menulis pujian tanpa satu pun butiran boleh disemak meminta anda percaya, bukan menilai."
          },
          {
            "type": "note",
            "title": "Kenapa tiada nama jenama di sini",
            "text": "Kedudukan produk syarikat lain menjadi lapuk dalam beberapa bulan. Kriteria kekal berguna selagi minyak zaitun dijual berbotol."
          },
          {
            "type": "image",
            "src": "pressJenamaMinyakZaitunTerbaikInline",
            "alt": "Tangan memegang botol kaca gelap sambil membaca label minyak zaitun extra virgin"
          }
        ]
      },
      {
        "heading": "Apa maksud extra virgin dan cold pressed pada label?",
        "id": "gred-label",
        "blocks": [
          {
            "type": "p",
            "text": "Extra virgin ialah gred tertinggi dalam pengelasan minyak zaitun, iaitu minyak perahan buah zaitun tanpa pelarut kimia. Cold pressed pula bermaksud buah diperah pada suhu rendah, bukan dipanaskan untuk mengeluarkan lebih banyak minyak. Kedua-dua istilah merujuk cara pemprosesan, bukan rasa atau warna botol."
          },
          {
            "type": "ul",
            "items": [
              "**Extra virgin**: gred tertinggi, ditulis penuh.",
              "**Cold pressed**: diperah suhu rendah.",
              "**Pure**, **light**, campuran: gred lain."
            ]
          },
          {
            "type": "image",
            "src": "pressJenamaMinyakZaitunTerbaikInline",
            "alt": "Tangan memegang botol kaca gelap sambil membaca label minyak zaitun extra virgin"
          }
        ]
      },
      {
        "heading": "Tarikh mana yang lebih penting, tuaian atau luput?",
        "id": "tarikh",
        "blocks": [
          {
            "type": "p",
            "text": "Tarikh tuaian lebih memberitahu daripada tarikh luput. Tarikh luput hanyalah had akhir yang ditetapkan pembotol, manakala tarikh tuaian memberitahu umur sebenar minyak itu. Minyak zaitun bukan wain — ia tidak bertambah baik dengan usia, dan rasa segarnya paling ketara semasa ia masih muda."
          },
          {
            "type": "p",
            "text": "Jika tarikh tuaian tiada, gunakan tarikh pembotolan. Jika hanya tarikh luput dicetak, anda tidak tahu botol itu diisi bulan lepas atau dua tahun lalu."
          },
          {
            "type": "image",
            "src": "pressJenamaMinyakZaitunTerbaikInline",
            "alt": "Tangan memegang botol kaca gelap sambil membaca label minyak zaitun extra virgin"
          }
        ]
      },
      {
        "heading": "Kaca gelap, kaca jernih atau plastik — adakah bekas penting?",
        "id": "botol",
        "blocks": [
          {
            "type": "p",
            "text": "Penting, kerana cahaya dan udara paling cepat mengubah rasa minyak zaitun. Bekas gelap melambatkan kesan cahaya, manakala bekas jernih membiarkan lampu kedai dan cahaya dapur masuk sepanjang hari. Di iklim Malaysia yang panas, haba di atas dapur mempercepat lagi perubahan rasa itu."
          },
          {
            "type": "table",
            "head": [
              "Bekas",
              "Cahaya",
              "Nota"
            ],
            "rows": [
              [
                "Kaca gelap, tin",
                "Baik",
                "Lazim untuk extra virgin"
              ],
              [
                "Kaca jernih",
                "Lemah",
                "Simpan dalam kabinet"
              ],
              [
                "Plastik",
                "Lemah",
                "Isi padu besar"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressJenamaMinyakZaitunTerbaikInline",
            "alt": "Tangan memegang botol kaca gelap sambil membaca label minyak zaitun extra virgin"
          }
        ]
      },
      {
        "heading": "Ditanam di mana, dibotolkan di mana?",
        "id": "asal-usul",
        "blocks": [
          {
            "type": "p",
            "text": "Ini dua perkara berbeza yang sering dikelirukan. Sebuah botol boleh menyebut satu negara sebagai tempat ia diisi dan dilabel, sedangkan buah zaitunnya datang dari negara lain. Jenama yang telus menyatakan negara ladangnya, bukan sekadar alamat kilang pembotolan atau nama syarikat pengedar."
          },
          {
            "type": "p",
            "text": "Istilah yang dicari ialah asal tunggal: satu negara, satu sumber. Arabian Village ialah minyak zaitun dara perahan sejuk dari Palestin, diedar oleh Berkat Madinah Store sejak 2010, seperti pada [halaman tentang kami](/why-us)."
          },
          {
            "type": "image",
            "src": "pressJenamaMinyakZaitunTerbaikInline",
            "alt": "Tangan memegang botol kaca gelap sambil membaca label minyak zaitun extra virgin"
          }
        ]
      },
      {
        "heading": "Bagaimana membanding harga botol yang saiznya berbeza?",
        "id": "harga-seliter",
        "blocks": [
          {
            "type": "p",
            "text": "Tukar setiap harga kepada harga seliter sebelum membanding. Bahagikan harga botol dengan isi padunya dalam liter, dan botol kecil yang nampak murah serta botol besar yang nampak mahal jatuh pada skala sama. Inilah cara paling adil menilai jenama minyak zaitun terbaik dari segi nilai."
          },
          {
            "type": "table",
            "head": [
              "Saiz",
              "Harga",
              "Seliter"
            ],
            "rows": [
              [
                "250 ml",
                "RM59.00",
                "RM236.00"
              ],
              [
                "500 ml",
                "RM103.00",
                "RM206.00"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressJenamaMinyakZaitunTerbaikInline",
            "alt": "Tangan memegang botol kaca gelap sambil membaca label minyak zaitun extra virgin"
          },
          {
            "type": "p",
            "text": "Harga di atas ialah harga Arabian Village, sama mengikut saiz bagi minyak klasik dan [koleksi berperisa](/products)."
          }
        ]
      },
      {
        "heading": "Apa senarai semak 60 saat di depan rak?",
        "id": "senarai-semak",
        "blocks": [
          {
            "type": "p",
            "text": "Angkat botol dan pusingkan sekali. Anda mencari empat perkara pada label dan satu pengiraan di kepala: gred, tarikh, bekas, negara asal, dan harga seliter. Jika tiga daripada lima itu tidak dapat ditandakan, letak semula botol tersebut dan ambil yang seterusnya."
          },
          {
            "type": "ul",
            "items": [
              "Gred ditulis penuh.",
              "Tarikh tuaian atau pembotolan.",
              "Bekas gelap atau tin.",
              "Negara ladang dinyatakan.",
              "Harga seliter dikira."
            ]
          },
          {
            "type": "image",
            "src": "pressJenamaMinyakZaitunTerbaikInline",
            "alt": "Tangan memegang botol kaca gelap sambil membaca label minyak zaitun extra virgin"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Pilih kriteria, bukan nama",
      "blocks": [
        {
          "type": "p",
          "text": "Senarai jenama bertukar; label tidak. Apabila anda tahu membaca gred, tarikh, bekas, asal-usul dan harga seliter, anda menilai botol di depan mata, bukan iklan yang menemani botol itu di rak."
        },
        {
          "type": "p",
          "text": "Uji senarai semak ini pada botol sebenar: lihat [senarai produk](/products), [cara membeli dan lokasi kedai](/shop), atau [hubungi kami](/contact)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Jenama minyak zaitun mana yang terbaik untuk masak?",
        "a": "Yang terbaik untuk memasak ialah botol yang gred dan tarikhnya jelas serta masih segar. Untuk menumis, mencampur nasi atau menyalut sayur sebelum dibakar, minyak zaitun dara berfungsi baik pada api sederhana. Nama pada botol kurang penting berbanding maklumat pada labelnya."
      },
      {
        "q": "Adakah minyak zaitun yang lebih mahal semestinya lebih baik?",
        "a": "Tidak semestinya. Harga tinggi boleh datang daripada saiz botol yang kecil, kos import atau pembungkusan. Tukar setiap harga kepada harga seliter dahulu, kemudian bandingkan botol yang sama gred dan sama umurnya. Botol mahal yang tidak menyatakan tarikh tetap kekurangan satu maklumat penting."
      },
      {
        "q": "Bagaimana nak tahu minyak zaitun itu asli atau campuran?",
        "a": "Baca label sepenuhnya. Minyak gred tertinggi menulis extra virgin dengan jelas, menyatakan negara asal buah, dan selalunya mencetak tarikh. Botol yang menulis pure, light atau menyenaraikan lebih daripada satu jenis minyak dalam ramuannya ialah campuran; sah dijual, tetapi bukan barang yang sama."
      },
      {
        "q": "Berapa lama minyak zaitun boleh disimpan selepas dibuka?",
        "a": "Anggap ia bahan segar, bukan bahan simpanan lama. Selepas dibuka, tutup rapat, simpan jauh daripada cahaya dan haba dapur, dan gunakan dalam beberapa bulan supaya rasanya kekal. Saiz yang sepadan dengan penggunaan rumah lebih baik daripada botol besar yang lambat habis."
      },
      {
        "q": "Adakah minyak zaitun berperisa lebih mahal daripada yang klasik?",
        "a": "Bagi Arabian Village, tidak. Harga ditetapkan mengikut saiz — RM59.00 untuk 250 ml dan RM103.00 untuk 500 ml — dan harga itu sama untuk minyak klasik mahupun mana-mana perisa seperti [wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme). Anda boleh menyemak dasar harga jenama lain dengan cara yang sama."
      },
      {
        "q": "Di mana saya boleh melihat botolnya sendiri sebelum membeli?",
        "a": "Arabian Village diedar di Malaysia oleh Berkat Madinah Store, yang mempunyai dua cawangan: Ampang Jaya dan Batu Caves, dengan Batu Caves lebih besar. Waktu buka 8:00 pagi hingga 12:00 tengah malam setiap hari. Hari perayaan seperti Hari Raya boleh berbeza, jadi sahkan melalui WhatsApp."
      }
    ],
    "related": [
      {
        "label": "Semua produk minyak zaitun",
        "path": "products",
        "description": "Minyak zaitun dara klasik dan koleksi berperisa, lengkap dengan saiz dan harga."
      },
      {
        "label": "Cara memilih minyak zaitun dara asli di Malaysia",
        "path": "blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia",
        "description": "Panduan lanjut membaca label dan mengenal pasti gred yang sebenar."
      },
      {
        "label": "Kedai dan cara membeli",
        "path": "shop",
        "description": "Cawangan, waktu buka dan saluran rasmi Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "minyak-zaitun-extra-virgin-gred",
    "slug": "apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain",
    "seoTitle": "Minyak Zaitun Extra Virgin: Beza Gred & Maksudnya",
    "metaTitle": "Minyak Zaitun Extra Virgin: Beza Gred & Maksudnya",
    "metaDescription": "Minyak zaitun extra virgin, virgin, ditapis atau pomace — apa bezanya dari segi pemprosesan, keasidan, rasa dan harga. Jadual perbandingan gred.",
    "focusKeyword": "minyak zaitun extra virgin",
    "relatedKeywords": [
      "minyak zaitun extra virgin terbaik",
      "jenis minyak zaitun",
      "gred minyak zaitun",
      "minyak zaitun dara",
      "extra virgin vs virgin",
      "minyak zaitun pomace",
      "minyak zaitun ditapis",
      "maksud extra virgin",
      "keasidan minyak zaitun",
      "minyak zaitun pure dan light"
    ],
    "category": "Panduan Pembeli",
    "tags": [
      "minyak zaitun",
      "extra virgin",
      "gred minyak zaitun",
      "panduan pembeli"
    ],
    "h1": "Minyak Zaitun Extra Virgin dan Gred Lain: Apa Sebenarnya Bezanya?",
    "excerpt": "Panduan ringkas kepada gred minyak zaitun — extra virgin, virgin, ditapis dan pomace — dan apa yang berubah pada rasa serta harga.",
    "keyTakeaway": "Gred minyak zaitun menerangkan cara minyak itu dikeluarkan daripada buah. Extra virgin dan virgin diperah secara mekanikal sahaja; minyak ditapis dan pomace melalui proses penapisan. Extra virgin ialah gred yang paling ketat had keasidannya, paling kuat rasanya, dan paling tinggi harganya seliter.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunExtraVirginGredHero",
      "alt": "Botol minyak zaitun extra virgin di atas meja kayu bersama buah zaitun segar"
    },
    "ogImage": "/og/blog-minyak-zaitun-extra-virgin-gred.jpg",
    "intro": [
      "Di mana-mana rak minyak zaitun di Malaysia, empat perkataan yang sama berulang pada label: extra virgin, virgin, refined atau pure, dan pomace. Botolnya nampak serupa. Harganya tidak.",
      "Perbezaan itu bukan gaya pemasaran. Ia sistem gred yang menerangkan bagaimana minyak dikeluarkan daripada buah zaitun — dan gred itu menentukan rasa, bau dan harga seliter."
    ],
    "sections": [
      {
        "heading": "Apa itu minyak zaitun extra virgin?",
        "id": "apa-itu-extra-virgin",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun extra virgin ialah gred tertinggi: minyak yang diperah terus daripada buah zaitun secara mekanikal, tanpa haba tinggi dan tanpa pelarut kimia. Kerana ia tidak melalui penapisan, rasa, bau dan warna asal buah kekal dalam botol. Ia juga gred paling ketat had keasidan bebasnya."
          },
          {
            "type": "p",
            "text": "**Perah sejuk** atau cold-pressed bermaksud suhu pengekstrakan dikawal rendah supaya aroma buah tidak hilang. Minyak Arabian Village di [halaman produk kami](/products) ialah extra virgin perah sejuk dari Palestin."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunExtraVirginGredInline",
            "alt": "Minyak zaitun berwarna hijau keemasan dituang ke dalam mangkuk kecil untuk dicicah dengan roti"
          }
        ]
      },
      {
        "heading": "\"Dara\" atau \"virgin\" — mana satu betul pada label?",
        "id": "dara-atau-virgin",
        "blocks": [
          {
            "type": "p",
            "text": "Kedua-duanya merujuk perkara yang sama. \"Minyak zaitun dara\" ialah terjemahan Bahasa Melayu bagi virgin olive oil, dan ramai orang Malaysia menyebut \"dara asli\" apabila maksud mereka extra virgin. Botol import mencetak istilah Inggeris kerana gred itu ditakrifkan dalam piawaian antarabangsa, bukan dalam Bahasa Melayu."
          },
          {
            "type": "p",
            "text": "Jadi kalau anda mencari \"minyak zaitun dara\" tetapi botol tertulis \"extra virgin\", anda tidak tersalah barang. Baca perkataan gred itu sendiri, bukan perkataan pemasaran seperti \"premium\"."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunExtraVirginGredInline",
            "alt": "Minyak zaitun berwarna hijau keemasan dituang ke dalam mangkuk kecil untuk dicicah dengan roti"
          }
        ]
      },
      {
        "heading": "Apakah gred minyak zaitun yang ada?",
        "id": "senarai-gred",
        "blocks": [
          {
            "type": "p",
            "text": "Empat gred lazim di pasaran Malaysia ialah extra virgin, virgin, minyak zaitun ditapis (refined, selalunya dilabel \"pure\" atau \"light\"), dan pomace. Bezanya ialah cara minyak dikeluarkan: dua gred pertama secara mekanikal sahaja, dua gred terakhir melibatkan penapisan atau pelarut."
          },
          {
            "type": "table",
            "head": [
              "Gred",
              "Cara dikeluarkan",
              "Rasa dan bau",
              "Harga relatif"
            ],
            "rows": [
              [
                "Extra virgin",
                "Perahan mekanikal sahaja, suhu rendah",
                "Paling kuat — pedas, sedikit pahit, berbau daun",
                "Paling tinggi"
              ],
              [
                "Virgin",
                "Perahan mekanikal sahaja",
                "Lebih lembut; sedikit kecacatan deria dibenarkan",
                "Sederhana tinggi"
              ],
              [
                "Ditapis / refined (\"pure\", \"light\")",
                "Ditapis dengan haba atau proses kimia",
                "Hampir neutral, bau hampir hilang",
                "Sederhana"
              ],
              [
                "Pomace",
                "Diekstrak dari hampas buah guna pelarut, lalu ditapis",
                "Neutral sepenuhnya",
                "Paling murah"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunExtraVirginGredInline",
            "alt": "Minyak zaitun berwarna hijau keemasan dituang ke dalam mangkuk kecil untuk dicicah dengan roti"
          },
          {
            "type": "note",
            "title": "\"Light\" bukan bermaksud kurang kalori",
            "text": "Pada botol minyak zaitun, \"light\" merujuk warna dan rasa yang lebih neutral selepas penapisan — bukan kandungan lemak atau kalori."
          }
        ]
      },
      {
        "heading": "Kenapa keasidan menentukan gred?",
        "id": "keasidan-dan-gred",
        "blocks": [
          {
            "type": "p",
            "text": "Keasidan bebas ialah ukuran makmal bagi berapa banyak asid lemak sudah terlerai daripada buah — petunjuk buah yang lewat diproses, tercedera, atau tersimpan terlalu lama sebelum diperah. Di bawah piawaian antarabangsa yang lazim dirujuk, extra virgin mesti berada pada 0.8% atau ke bawah, manakala virgin dibenarkan sehingga 2.0%."
          },
          {
            "type": "p",
            "text": "Angka itu tidak dirasa di lidah — minyak berkeasidan tinggi tidak terasa masam. Ia cerita tentang kepantasan: berapa lama buah menunggu antara petik dan perah."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunExtraVirginGredInline",
            "alt": "Minyak zaitun berwarna hijau keemasan dituang ke dalam mangkuk kecil untuk dicicah dengan roti"
          }
        ]
      },
      {
        "heading": "Apa beza rasa dan harga extra virgin berbanding virgin?",
        "id": "beza-rasa-dan-harga",
        "blocks": [
          {
            "type": "p",
            "text": "Extra virgin sepatutnya bersih daripada kecacatan deria: pedas sedikit di kerongkong, ada nada pahit, dan berbau daun hijau. Virgin masih minyak perahan mekanikal, tetapi piawaian membenarkan sedikit kecacatan rasa. Extra virgin lebih mahal kerana ia menuntut buah yang lebih baik dan pemprosesan yang lebih pantas."
          },
          {
            "type": "p",
            "text": "Bandingkan harga seliter, bukan harga sebotol. Di [kedai dalam talian](/shop), 250 ml berharga **RM59.00** dan 500 ml **RM103.00** — botol besar lebih murah seliter. Harga sama mengikut saiz terpakai untuk setiap perisa Koleksi Infused."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunExtraVirginGredInline",
            "alt": "Minyak zaitun berwarna hijau keemasan dituang ke dalam mangkuk kecil untuk dicicah dengan roti"
          }
        ]
      },
      {
        "heading": "Gred mana sesuai untuk dapur di Malaysia?",
        "id": "gred-untuk-dapur",
        "blocks": [
          {
            "type": "p",
            "text": "Untuk hidangan yang minyaknya memang dirasa — salad, hummus, cicah roti, siraman atas ikan bakar atau nasi — extra virgin masuk akal kerana rasanya sebahagian daripada hidangan. Untuk menumis pada api sederhana ia juga berfungsi. Gred ditapis dan pomace dipilih semata-mata kerana neutral dan lebih murah."
          },
          {
            "type": "ul",
            "items": [
              "Cicah roti, salad, hummus, labneh — extra virgin, terus dari botol.",
              "Menumis telur atau sayur pada api sederhana — extra virgin masih sesuai.",
              "Menggoreng banyak minyak berulang kali — kebanyakan dapur pilih gred ditapis kerana kos.",
              "Marinad dan pembalut salad — cuba [minyak infused wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme)."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunExtraVirginGredInline",
            "alt": "Minyak zaitun berwarna hijau keemasan dituang ke dalam mangkuk kecil untuk dicicah dengan roti"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Gred ialah maklumat, bukan slogan",
      "blocks": [
        {
          "type": "p",
          "text": "Perkataan gred memberitahu cara minyak itu dibuat, dan itu boleh disemak. Perkataan pemasaran tidak. Seterusnya, panduan [cara memilih minyak zaitun dara asli](/blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia) meneruskan cerita ini, atau baca [kisah di sebalik minyak kami](/why-us)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Adakah minyak zaitun dara sama dengan extra virgin?",
        "a": "\"Dara\" ialah terjemahan Bahasa Melayu bagi \"virgin\", jadi ia merujuk keluarga gred yang sama — minyak yang diperah secara mekanikal tanpa penapisan. Namun extra virgin ialah tingkat paling atas dalam keluarga itu, dengan had keasidan yang lebih ketat dan tiada kecacatan deria yang dibenarkan."
      },
      {
        "q": "Apa beza \"pure olive oil\" dan extra virgin?",
        "a": "\"Pure\" atau \"light\" pada label biasanya bermaksud minyak zaitun ditapis, kadangkala dicampur sedikit minyak virgin untuk mengembalikan warna dan bau. Ia bukan gred yang lebih tinggi daripada extra virgin, walaupun perkataan \"pure\" berbunyi begitu. Rasanya jauh lebih neutral dan harganya lebih rendah."
      },
      {
        "q": "Minyak zaitun pomace itu apa?",
        "a": "Pomace ialah minyak yang diekstrak daripada hampas buah zaitun — kulit, isi dan serpihan biji yang tinggal selepas perahan pertama — biasanya menggunakan pelarut, kemudian ditapis. Ia gred paling murah, hampir tiada rasa zaitun padanya, dan lazimnya digunakan untuk menggoreng berskala besar."
      },
      {
        "q": "Bolehkah minyak zaitun extra virgin digunakan untuk menumis?",
        "a": "Boleh. Untuk menumis dan menggoreng cetek pada api sederhana, extra virgin berfungsi seperti minyak masak lain. Yang mengubah rasanya ialah api terlalu tinggi dan terlalu lama, yang menghilangkan aroma yang anda bayar. Untuk menggoreng berulang kali dalam kuali penuh, ramai memilih gred yang lebih murah."
      },
      {
        "q": "Berapa harga minyak zaitun extra virgin Arabian Village?",
        "a": "Botol 250 ml berharga RM59.00 dan botol 500 ml berharga RM103.00. Harga itu sama mengikut saiz untuk minyak klasik dan untuk setiap perisa dalam Koleksi Infused. Ia diedarkan di Malaysia oleh Berkat Madinah Store, dan boleh ditempah melalui WhatsApp di +60 11-1111 9912."
      },
      {
        "q": "Di mana saya boleh lihat botol itu sendiri?",
        "a": "Berkat Madinah Store, pengedar rasmi di Malaysia sejak 2010, mempunyai dua cawangan — Ampang Jaya dan Batu Caves, dengan Batu Caves yang lebih besar. Waktu buka 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad. Hari perayaan boleh berbeza, jadi sahkan dahulu di [halaman hubungi kami](/contact)."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun extra virgin Arabian Village",
        "path": "products",
        "description": "Minyak zaitun extra virgin perah sejuk dari Palestin, dalam saiz 250 ml dan 500 ml."
      },
      {
        "label": "Cara memilih minyak zaitun dara asli di Malaysia",
        "path": "blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia",
        "description": "Langkah seterusnya selepas anda faham gred: menyemak botol yang sudah ada di tangan."
      },
      {
        "label": "Koleksi Infused — wild thyme",
        "path": "products/infused-extra-virgin-olive-oil-wild-thyme",
        "description": "Minyak extra virgin yang sama, diinfusikan untuk kegunaan masakan."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "minyak-zaitun-halal",
    "slug": "status-halal-minyak-zaitun",
    "seoTitle": "Minyak Zaitun Halal: Apa Yang Perlu Disemak",
    "metaTitle": "Minyak Zaitun Halal: Apa Yang Perlu Disemak",
    "metaDescription": "Minyak zaitun halal — minyak tulen ialah satu bahan daripada buah zaitun. Ini yang patut disemak pada minyak campuran, minyak berperisa dan logo import.",
    "focusKeyword": "minyak zaitun halal",
    "relatedKeywords": [
      "adakah minyak zaitun halal",
      "status halal minyak zaitun",
      "minyak masak zaitun halal",
      "minyak zaitun berperisa halal",
      "bahan minyak zaitun",
      "senarai bahan minyak zaitun",
      "sijil halal makanan import",
      "logo halal JAKIM",
      "badan pensijilan halal luar negara",
      "pencemaran silang pemprosesan makanan"
    ],
    "category": "Panduan pembeli",
    "tags": [
      "minyak zaitun halal",
      "senarai bahan",
      "makanan import",
      "logo halal",
      "minyak berperisa"
    ],
    "h1": "Status halal minyak zaitun: apa yang pembeli patut semak",
    "excerpt": "Minyak zaitun tulen ialah satu bahan daripada tumbuhan, jadi jawapannya mudah — tetapi senarai bahan, minyak berperisa dan logo import masih berbaloi disemak.",
    "keyTakeaway": "Minyak zaitun dara tulen ialah satu bahan tunggal daripada tumbuhan: jus buah zaitun yang diperah secara mekanikal, tanpa pelarut dan tanpa bahan haiwan. Keraguan halal hampir selalu datang daripada apa yang ditambah selepas itu — minyak campuran, pembawa perisa, atau talian pengeluaran yang dikongsi.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 4,
    "hero": {
      "src": "pressMinyakZaitunHalalHero",
      "alt": "Botol minyak zaitun halal dipegang di hadapan rak kedai sambil label belakang dibaca"
    },
    "ogImage": "/og/blog-minyak-zaitun-halal.jpg",
    "intro": [
      "Adakah minyak zaitun halal? Untuk minyak zaitun dara tulen, jawapan jujurnya mudah — ia satu bahan sahaja, iaitu jus buah zaitun yang diperah.",
      "Yang berbaloi disemak bukan minyak tulen, tetapi apa yang datang selepasnya: minyak campuran, minyak berperisa, pembawa perisa, dan cara kilang mengendalikan talian pengeluarannya.",
      "Di bawah, apa yang logo halal pada produk import beritahu — dan apa yang tidak."
    ],
    "sections": [
      {
        "heading": "Adakah minyak zaitun halal?",
        "id": "adakah-minyak-zaitun-halal",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara tulen ialah satu bahan tunggal daripada tumbuhan: buah zaitun yang dikisar dan diperah secara mekanikal, tanpa pelarut, tanpa alkohol dan tanpa bahan berasaskan haiwan. Tiada langkah dalam proses itu memperkenalkan bahan yang menimbulkan persoalan halal. Keraguan datang daripada apa yang ditambah kemudian, bukan daripada zaitun itu sendiri."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHalalInline",
            "alt": "Tangan menunjuk senarai bahan pada label belakang botol minyak zaitun"
          }
        ]
      },
      {
        "heading": "Apa yang patut dibaca pada senarai bahan?",
        "id": "senarai-bahan",
        "blocks": [
          {
            "type": "p",
            "text": "Balikkan botol dan baca senarai bahan sebelum apa-apa lagi. Minyak zaitun dara tulen sepatutnya menyenaraikan satu bahan. Jika anda nampak perkataan seperti minyak sayuran, perisa, aroma atau pengemulsi, itu bukan bukti sesuatu yang haram — ia tanda ada bahan kedua yang sumbernya perlu anda tanya."
          },
          {
            "type": "table",
            "head": [
              "Pada label",
              "Maksudnya",
              "Yang disemak"
            ],
            "rows": [
              [
                "Minyak zaitun dara",
                "Satu bahan sahaja",
                "Tiada tambahan"
              ],
              [
                "Campuran / blended",
                "Dicampur minyak lain",
                "Minyak apa"
              ],
              [
                "Perisa, aroma",
                "Perisa pekat dilarutkan",
                "Pembawa perisa apa"
              ],
              [
                "Infusi botani",
                "Tumbuhan direndam terus",
                "Tumbuhan dinamakan?"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHalalInline",
            "alt": "Tangan menunjuk senarai bahan pada label belakang botol minyak zaitun"
          }
        ]
      },
      {
        "heading": "Minyak berperisa: di mana keraguannya?",
        "id": "minyak-berperisa",
        "blocks": [
          {
            "type": "p",
            "text": "Pada minyak berperisa, soalannya bukan tentang minyak tetapi tentang pembawa perisa. Perisa pekat selalunya dilarutkan dalam sesuatu sebelum dicampur, dan pelarut itulah yang patut dinamakan pada label. Minyak yang mendapat rasanya daripada bahan tumbuhan yang direndam terus di dalamnya tidak melalui langkah itu langsung."
          },
          {
            "type": "p",
            "text": "Siri [Infused Collection](/products) ialah infusi botani untuk masakan sahaja — [wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme), blackseed dan rosemary-basil direndam dalam minyak yang sama, bukan perisa tambahan."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHalalInline",
            "alt": "Tangan menunjuk senarai bahan pada label belakang botol minyak zaitun"
          }
        ]
      },
      {
        "heading": "Bolehkah pencemaran silang berlaku?",
        "id": "pencemaran-silang",
        "blocks": [
          {
            "type": "p",
            "text": "Secara teori boleh, dan itulah sebab pensijilan halal wujud walaupun untuk makanan yang nampak mudah. Kilang yang mengisi lebih daripada satu produk boleh berkongsi tangki, paip, penapis dan mesin pengisi. Jika talian yang sama pernah mengendalikan bahan lain, prosedur pembersihan antara kelompok itulah yang menentukan, bukan label."
          },
          {
            "type": "p",
            "text": "Bagi minyak zaitun risikonya kecil kerana kilang perahan lazimnya hanya mengendalikan zaitun. Ia relevan apabila minyak dibotolkan semula di negara ketiga."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHalalInline",
            "alt": "Tangan menunjuk senarai bahan pada label belakang botol minyak zaitun"
          }
        ]
      },
      {
        "heading": "Apa yang logo halal beritahu — dan tidak?",
        "id": "logo-halal-import",
        "blocks": [
          {
            "type": "p",
            "text": "Logo halal pada produk import bermakna satu badan pensijilan di negara asal telah memperakui produk itu. Ia tidak automatik bermakna JAKIM mengiktiraf badan tersebut, dan ia bukan sijil halal Malaysia. JAKIM menyiarkan senarai rasmi badan pensijilan luar negara yang diiktirafnya, dan senarai itulah rujukan yang betul bagi logo asing."
          },
          {
            "type": "p",
            "text": "Logo yang tiada dalam senarai itu bukan bermakna produk itu haram — cuma anda menilai daripada bahan dan jawapan penjual."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHalalInline",
            "alt": "Tangan menunjuk senarai bahan pada label belakang botol minyak zaitun"
          },
          {
            "type": "note",
            "title": "Kami tidak mendakwa apa yang tidak boleh kami tunjukkan",
            "text": "Laman ini tidak menyatakan sebarang sijil, nombor sijil atau pengiktirafan JAKIM bagi minyak yang dijual di sini. Jika perkara itu penting kepada anda, tanya pengedar rasmi Berkat Madinah Store di WhatsApp +60 11-1111 9912."
          }
        ]
      },
      {
        "heading": "Soalan apa yang patut ditanya kepada penjual?",
        "id": "soalan-kepada-penjual",
        "blocks": [
          {
            "type": "p",
            "text": "Tanya soalan yang perlu dijawab dengan bukti, bukan dengan ya. Minta gambar label belakang yang penuh, tanya negara perahan dan tempat pembotolan, tanya apa lagi yang ada dalam minyak berperisa selain zaitun, dan tanya sama ada ada sijil dipegang serta badan mana yang mengeluarkannya."
          },
          {
            "type": "ul",
            "items": [
              "Boleh hantar gambar label belakang penuh?",
              "Diperah di negara mana, dibotolkan di mana?",
              "Ada sijil? Dikeluarkan oleh badan mana?"
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHalalInline",
            "alt": "Tangan menunjuk senarai bahan pada label belakang botol minyak zaitun"
          },
          {
            "type": "p",
            "text": "Pengedar rasmi ialah Berkat Madinah Store, ditubuhkan 2010, dengan cawangan di Ampang Jaya dan Batu Caves — tanya melalui [halaman hubungi kami](/contact)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Ringkasnya",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun tulen antara makanan paling mudah disemak: satu bahan, satu perahan. Kerja pembeli bukan mencari lambang pada kotak, tetapi membaca senarai bahan, bertanya di mana botol itu diisi, dan meminta bukti bertulis apabila ia penting. Mulakan dengan [cara memilih minyak zaitun dara asli](/blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia), kemudian bandingkan [harga](/blog/harga-minyak-zaitun-di-malaysia)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Adakah minyak zaitun halal walaupun tiada logo halal?",
        "a": "Ketiadaan logo bukan bukti sesuatu yang haram; ia bermakna tiada badan pensijilan memperakui produk itu. Untuk minyak zaitun dara yang senarai bahannya satu baris, anda menilai berdasarkan bahan dan sumbernya. Jika anda mahu kepastian rasmi, rujuk pihak berkuasa agama atau minta dokumen daripada penjual."
      },
      {
        "q": "Adakah minyak zaitun mengandungi alkohol?",
        "a": "Minyak zaitun dara diperah secara mekanikal daripada buah zaitun, jadi tiada alkohol ditambah dalam prosesnya. Persoalan alkohol biasanya timbul pada minyak berperisa, kerana sesetengah perisa pekat dilarutkan dalam pelarut sebelum dicampur. Itu sebabnya label minyak berperisa perlu dibaca lebih teliti."
      },
      {
        "q": "Adakah minyak zaitun berperisa halal?",
        "a": "Bergantung pada cara rasa itu dimasukkan ke dalam botol. Minyak yang dirasakan melalui rendaman bahan tumbuhan hanya mengandungi minyak dan tumbuhan tersebut. Minyak yang menggunakan perisa tambahan pula membawa masuk bahan kedua yang sumber dan pelarutnya perlu anda tanya kepada penjual."
      },
      {
        "q": "Bagaimana saya semak sijil halal makanan import?",
        "a": "Mula dengan nama badan pensijilan yang tercetak pada logo, kemudian semak sama ada badan itu ada dalam senarai rasmi badan pensijilan halal luar negara yang diiktiraf JAKIM. Selain itu, minta penjual tunjukkan salinan sijil berserta tarikh sah dan nama produk yang dilindunginya."
      },
      {
        "q": "Adakah minyak zaitun Arabian Village memegang sijil halal JAKIM?",
        "a": "Laman ini tidak menyatakan sebarang status pensijilan, nombor sijil atau pengiktirafan JAKIM bagi minyak yang dijual di sini, kerana kami tidak menerbitkan apa yang tidak boleh kami tunjukkan. Sila tanya pengedar rasmi Berkat Madinah Store di WhatsApp +60 11-1111 9912."
      },
      {
        "q": "Boleh saya baca label sendiri sebelum membeli?",
        "a": "Boleh. Berkat Madinah Store mempunyai dua cawangan, iaitu di Ampang Jaya dan di Batu Caves, dan cawangan Batu Caves adalah yang lebih besar. Kedua-duanya buka dari 8:00 pagi hingga 12:00 tengah malam setiap hari, kecuali hari perayaan yang mungkin berbeza."
      }
    ],
    "related": [
      {
        "label": "Semua saiz dan perisa minyak zaitun",
        "path": "products",
        "description": "Minyak zaitun dara klasik dan siri Infused Collection, RM59.00 untuk 250 ml dan RM103.00 untuk 500 ml."
      },
      {
        "label": "Cara memilih minyak zaitun dara asli",
        "path": "blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia",
        "description": "Apa yang perlu dibaca pada label sebelum anda percaya perkataan asli pada botol."
      },
      {
        "label": "Harga minyak zaitun di Malaysia",
        "path": "blog/harga-minyak-zaitun-di-malaysia",
        "description": "Apa yang menentukan harga sebotol, dan cara membandingkan harga seliter dengan adil."
      },
      {
        "label": "Hubungi pengedar rasmi",
        "path": "contact",
        "description": "WhatsApp, dua cawangan dan waktu buka Berkat Madinah Store untuk sebarang soalan bahan atau dokumen."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "minyak-zaitun-organik",
    "slug": "minyak-zaitun-organik-apa-maksudnya",
    "seoTitle": "Minyak Zaitun Organik: Apa Maksud Label Itu?",
    "metaTitle": "Minyak Zaitun Organik: Apa Maksud Label Itu?",
    "metaDescription": "Label minyak zaitun organik merujuk kepada cara ladang bertani, bukan gred, rasa atau kesegaran. Ini bezanya dengan extra virgin dan semula jadi.",
    "focusKeyword": "minyak zaitun organik",
    "relatedKeywords": [
      "minyak zaitun organik terbaik",
      "apa itu organik",
      "label organik makanan",
      "pensijilan organik",
      "sijil organik minyak zaitun",
      "minyak zaitun natural",
      "minyak zaitun semula jadi",
      "beza organik dan extra virgin",
      "cara baca label minyak zaitun",
      "minyak zaitun tulen"
    ],
    "category": "Panduan Pembeli",
    "tags": [
      "organik",
      "label makanan",
      "extra virgin",
      "panduan beli"
    ],
    "h1": "Minyak zaitun organik: apa yang label itu sebenarnya beritahu anda",
    "excerpt": "Perkataan organik pada botol minyak zaitun merujuk kepada cara pokok itu diusahakan di ladang, bukan kepada gred, rasa atau kesegaran minyak di dalamnya.",
    "keyTakeaway": "Organik ialah label tentang cara bertani: racun perosak, baja dan pengurusan tanah di ladang. Ia bukan gred, bukan penanda rasa dan bukan penanda kesegaran. Extra virgin pula ialah gred minyak. Satu botol boleh memegang satu label, kedua-duanya, atau tiada satu pun daripadanya.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunOrganikHero",
      "alt": "Botol minyak zaitun organik dipegang di hadapan pokok zaitun di ladang"
    },
    "ogImage": "/og/blog-minyak-zaitun-organik.jpg",
    "intro": [
      "Anda pusing botol itu di rak dan nampak perkataan **organik** pada label. Maknanya minyak ini lebih baik? Lebih tulen? Lebih segar?",
      "Jawapannya lebih membosankan daripada yang disangka. Organik merujuk kepada satu perkara sahaja: cara pokok zaitun itu diusahakan di ladang. Bukan rasa, bukan gred, bukan tarikh ia diperah.",
      "Ramai pembeli menyamakan organik dengan kualiti, dan di situlah kekeliruan bermula."
    ],
    "sections": [
      {
        "heading": "Apa sebenarnya maksud \"organik\" pada botol minyak zaitun?",
        "id": "maksud-organik",
        "blocks": [
          {
            "type": "p",
            "text": "Organik merujuk kepada amalan pertanian di ladang zaitun, bukan kepada minyak di dalam botol. Skim organik menetapkan apa yang boleh digunakan semasa menanam: racun perosak sintetik, baja kimia, dan cara tanah diuruskan. Pokok itu perlu diusahakan begitu selama tempoh tertentu sebelum hasilnya layak dilabel organik."
          },
          {
            "type": "ul",
            "items": [
              "Had ke atas racun perosak dan racun rumpai sintetik",
              "Had ke atas baja kimia; sandaran kepada kompos dan tanaman penutup",
              "Rekod ladang dan pemeriksaan berkala oleh badan pensijilan"
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOrganikInline",
            "alt": "Tangan memeriksa label di belakang botol minyak zaitun di kaunter kedai"
          },
          {
            "type": "p",
            "text": "Organik ialah label proses, bukan label produk."
          }
        ]
      },
      {
        "heading": "Apa yang label organik tidak beritahu anda?",
        "id": "apa-yang-tidak-diberitahu",
        "blocks": [
          {
            "type": "p",
            "text": "Label organik tidak memberitahu anda gred minyak, rasanya, atau berapa lama ia sudah berada di dalam botol. Zaitun organik masih boleh diperah lewat atau duduk lama di gudang. Sebaliknya, minyak bukan organik boleh diperah pada hari petikan dan rasanya cukup segar."
          },
          {
            "type": "ul",
            "items": [
              "**Bukan gred.** Gred datang daripada perahan dan ujian.",
              "**Bukan rasa.** Varieti zaitun dan masa petikan yang menentukannya.",
              "**Bukan kesegaran.** Tarikh perahan dan cara simpan yang menentukannya."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOrganikInline",
            "alt": "Tangan memeriksa label di belakang botol minyak zaitun di kaunter kedai"
          }
        ]
      },
      {
        "heading": "Organik, semula jadi dan extra virgin — apa bezanya?",
        "id": "organik-vs-natural-vs-extra-virgin",
        "blocks": [
          {
            "type": "p",
            "text": "Ketiga-tiga istilah ini menjawab soalan yang berlainan sama sekali, dan itulah sebabnya orang keliru. Organik menjawab bagaimana pokok ditanam. Extra virgin menjawab bagaimana minyak diperah dan gred yang diperolehnya. Semula jadi pula selalunya tidak menjawab apa-apa, kerana ia bukan istilah yang dikawal."
          },
          {
            "type": "table",
            "head": [
              "Istilah",
              "Merujuk kepada",
              "Siapa periksa"
            ],
            "rows": [
              [
                "Organik",
                "Cara pokok ditanam",
                "Badan pensijilan skim negara"
              ],
              [
                "Semula jadi",
                "Tiada takrifan sejagat",
                "Selalunya tiada sesiapa"
              ],
              [
                "Extra virgin",
                "Gred selepas perahan",
                "Ujian makmal dan panel rasa"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOrganikInline",
            "alt": "Tangan memeriksa label di belakang botol minyak zaitun di kaunter kedai"
          },
          {
            "type": "p",
            "text": "Panduan [cara memilih minyak zaitun dara asli](/blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia) menunjukkan cara mengasingkan gred daripada perkataan pemasaran."
          }
        ]
      },
      {
        "heading": "Kenapa pensijilan organik berbeza mengikut negara?",
        "id": "pensijilan-berbeza-negara",
        "blocks": [
          {
            "type": "p",
            "text": "Tiada satu sijil organik sejagat. Setiap negara menjalankan skimnya sendiri dengan senarai bahan, tempoh peralihan dan kekerapan audit yang berbeza. Logo pada botol import merujuk kepada skim negara pengeluar atau pasaran eksportnya, dan ia tidak semestinya diiktiraf secara automatik di bawah peraturan Malaysia."
          },
          {
            "type": "ul",
            "items": [
              "Nama badan pensijilan, bukan sekadar logo daun hijau",
              "Nombor sijil yang boleh disemak pada pangkalan datanya",
              "Tarikh luput, dan skop sijil: ladang sahaja atau termasuk pembotolan"
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOrganikInline",
            "alt": "Tangan memeriksa label di belakang botol minyak zaitun di kaunter kedai"
          },
          {
            "type": "note",
            "title": "Tanya, jangan andai",
            "text": "Jika penjual tidak dapat menamakan badan pensijilan dan menunjukkan sijil yang masih sah, anggap minyak itu tidak disijilkan organik. Itu bukan bermakna ia minyak yang lemah."
          }
        ]
      },
      {
        "heading": "Apa yang patut anda tanya penjual sebelum bayar?",
        "id": "soalan-untuk-penjual",
        "blocks": [
          {
            "type": "p",
            "text": "Tanya soalan yang mempunyai jawapan berbentuk dokumen, bukan jawapan berbentuk pujian. Penjual yang mengendalikan stoknya sendiri sepatutnya boleh menjawab dengan cepat dan tepat, dan jawapan yang berbelit itu sendiri sudah menjadi maklumat berguna kepada anda sebelum duit keluar dari poket."
          },
          {
            "type": "ol",
            "items": [
              "Adakah minyak ini memegang sijil organik, dan badan mana mengeluarkannya?",
              "Boleh saya lihat salinan sijil itu dan tarikh sahnya?",
              "Apa gred minyak ini dan bagaimana ia diperah?",
              "Bila musim petikan lot ini, dan dari kawasan mana buahnya?"
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOrganikInline",
            "alt": "Tangan memeriksa label di belakang botol minyak zaitun di kaunter kedai"
          },
          {
            "type": "p",
            "text": "Hantar soalan yang sama melalui WhatsApp, atau tanya di kaunter apabila anda [datang melawat kedai](/contact)."
          }
        ]
      },
      {
        "heading": "Kalau bukan label organik, penanda apa yang boleh diperiksa?",
        "id": "penanda-kualiti-sebenar",
        "blocks": [
          {
            "type": "p",
            "text": "Beberapa perkara boleh disahkan tanpa bergantung pada mana-mana logo: gred, kaedah perahan, asal usul tunggal, bekas yang melindungi daripada cahaya, dan harga seliter. Penanda ini boleh dibandingkan antara botol secara terus, dan ia lebih memberitahu tentang isi botol berbanding perkataan pemasaran."
          },
          {
            "type": "p",
            "text": "Harga seliter ialah cara paling mudah membandingkan saiz. Botol 250 ml pada **RM59.00** bersamaan kira-kira RM236 seliter; botol 500 ml pada **RM103.00** bersamaan RM206 seliter. Minyak [Arabian Village](/products) ialah extra virgin perahan sejuk dari Palestin."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOrganikInline",
            "alt": "Tangan memeriksa label di belakang botol minyak zaitun di kaunter kedai"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Satu label, bukan keseluruhan cerita",
      "blocks": [
        {
          "type": "p",
          "text": "Organik ialah maklumat yang sah, tetapi ia menjawab soalan tentang ladang, bukan tentang botol. Baca ia sebagai satu baris dalam senarai semak anda, bukan sebagai kesimpulan."
        },
        {
          "type": "p",
          "text": "Periksa gred, tarikh, asal usul, bekas dan harga seliter, kemudian tanya penjual soalan yang memerlukan dokumen. WhatsApp **+60 11-1111 9912** atau lihat [tempat membeli](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Adakah minyak zaitun organik lebih tulen daripada yang biasa?",
        "a": "Tidak semestinya. Organik merujuk kepada cara pokok ditanam, manakala ketulenan merujuk kepada sama ada minyak itu dicampur dengan minyak lain atau minyak gred rendah. Itu dua soalan berasingan. Minyak boleh disijilkan organik tetapi bergred rendah, atau tidak disijilkan langsung tetapi tetap extra virgin tulen."
      },
      {
        "q": "Apa beza minyak zaitun organik dan extra virgin?",
        "a": "Organik menerangkan pertanian di ladang: racun perosak, baja dan pengurusan tanah. Extra virgin menerangkan gred minyak selepas perahan, iaitu perahan mekanikal tanpa haba tinggi, keasidan bebas yang rendah dan tiada kecacatan rasa. Satu botol boleh memegang kedua-duanya, salah satu, atau tiada."
      },
      {
        "q": "Adakah label \"semula jadi\" bermakna sama dengan organik?",
        "a": "Tidak sama. Semula jadi atau natural bukan istilah yang dikawal dengan skim pensijilan seperti organik. Ia boleh bermaksud apa sahaja yang pengeluar mahu, dan selalunya cuma bermaksud tiada bahan tambahan. Jangan bayar lebih untuk perkataan itu tanpa penanda lain yang boleh diperiksa."
      },
      {
        "q": "Bagaimana saya semak sama ada sijil organik pada botol itu sah?",
        "a": "Cari nama badan pensijilan dan nombor sijil pada label, bukan sekadar logo. Kebanyakan badan menyediakan pangkalan data dalam talian untuk menyemak nama pengeluar dan tarikh luput sijil. Jika label hanya menunjukkan logo tanpa nama badan atau nombor rujukan, minta penjual tunjukkan salinannya."
      },
      {
        "q": "Adakah minyak zaitun organik lebih sedap?",
        "a": "Rasa tidak ditentukan oleh label organik. Ia datang daripada varieti zaitun, masa petikan, kepantasan buah sampai ke kilang perah, dan cara minyak disimpan selepas dibotolkan. Dua minyak organik dari ladang berbeza boleh mempunyai rasa yang jauh berbeza antara satu sama lain."
      },
      {
        "q": "Boleh saya tanya kedai tentang sijil sebelum datang?",
        "a": "Boleh. Hantar soalan melalui WhatsApp ke +60 11-1111 9912 dan minta jawapan bertulis tentang gred, tarikh perahan, asal usul dan sebarang sijil. Anda juga boleh tanya di kaunter Ampang Jaya atau Batu Caves, yang dibuka 8:00 pagi hingga 12:00 tengah malam."
      }
    ],
    "related": [
      {
        "label": "Cara memilih minyak zaitun dara asli di Malaysia",
        "path": "blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia",
        "description": "Senarai semak label demi label untuk mengasingkan gred sebenar daripada perkataan pemasaran."
      },
      {
        "label": "Mengapa minyak zaitun semakin popular di Malaysia",
        "path": "blog/mengapa-minyak-zaitun-semakin-popular-di-malaysia",
        "description": "Apa yang mendorong minyak zaitun masuk ke dapur Malaysia dan bagaimana orang menggunakannya."
      },
      {
        "label": "Semua produk Arabian Village",
        "path": "products",
        "description": "Minyak zaitun dara extra virgin perahan sejuk dan Infused Collection, dengan harga mengikut saiz."
      },
      {
        "label": "Tempat membeli di Malaysia",
        "path": "shop",
        "description": "Kaunter Berkat Madinah Store di Ampang Jaya dan Batu Caves, serta saluran dalam talian rasminya."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "minyak-zaitun-palestin",
    "slug": "minyak-zaitun-palestin-dari-ladang-ke-botol",
    "seoTitle": "Minyak Zaitun Palestin: Dari Ladang ke Botol",
    "metaTitle": "Minyak Zaitun Palestin: Dari Ladang ke Botol",
    "metaDescription": "Bagaimana minyak zaitun Palestin sampai ke botol anda: musim tuaian, cara perahan sejuk, dan sebab minyak satu sumber lebih mudah disahkan pembeli.",
    "focusKeyword": "minyak zaitun palestin",
    "relatedKeywords": [
      "minyak zaitun dari palestin",
      "minyak zaitun asal palestin",
      "minyak zaitun palestine original",
      "zaitun palestin",
      "minyak zaitun satu sumber",
      "musim tuaian zaitun",
      "minyak zaitun perahan sejuk",
      "extra virgin olive oil palestin",
      "harga minyak zaitun palestin",
      "beli minyak zaitun palestin malaysia"
    ],
    "category": "Asal-usul",
    "tags": [
      "minyak zaitun palestin",
      "satu sumber",
      "musim tuaian",
      "perahan sejuk"
    ],
    "h1": "Minyak zaitun Palestin: perjalanan dari ladang ke botol",
    "excerpt": "Bagaimana buah zaitun di ladang Palestin bertukar menjadi minyak dalam botol di dapur anda, dan apa yang boleh anda semak sendiri pada label.",
    "keyTakeaway": "Minyak zaitun Palestin ialah minyak yang dituai dan diperah di Palestin, biasanya pada musim luruh, lalu dibotolkan sebagai minyak zaitun dara extra perahan sejuk. Kerana ia satu sumber, pembeli boleh menjejak asalnya kepada satu kawasan dan satu musim tuaian, bukan campuran beberapa buah negara.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 4,
    "hero": {
      "src": "pressMinyakZaitunPalestinHero",
      "alt": "Buah zaitun hijau dan ungu di dahan pokok sebelum tuaian, sumber minyak zaitun Palestin"
    },
    "ogImage": "/og/blog-minyak-zaitun-palestin.jpg",
    "intro": [
      "Setiap botol minyak zaitun bermula sebagai buah di atas pokok. Antara dahan dan dapur anda ada beberapa langkah sahaja, tetapi setiap satunya menentukan rasa, warna dan kesegaran minyak yang anda tuang ke atas roti.",
      "Artikel ini mengikut perjalanan itu: keadaan di ladang, musim tuaian, cara perahan sejuk, dan sebab minyak satu sumber lebih senang disahkan pembeli."
    ],
    "sections": [
      {
        "heading": "Dari mana datangnya minyak zaitun Palestin?",
        "id": "asal-usul-ladang",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun Palestin datang daripada pokok zaitun yang tumbuh di kawasan bukit dan lereng berbatu di Palestin. Iklimnya iklim Mediterranean: musim panas yang panas dan kering, musim sejuk yang lebih dingin dan berhujan. Buahnya dituai pada musim luruh, diperah menjadi minyak, kemudian dibotolkan sebagai minyak zaitun dara extra."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalestinInline",
            "alt": "Minyak zaitun baharu mengalir keluar dari kilang perahan sejuk ke dalam bekas keluli"
          }
        ]
      },
      {
        "heading": "Bila musim tuaian zaitun berlangsung?",
        "id": "musim-tuaian",
        "blocks": [
          {
            "type": "p",
            "text": "Musim tuaian zaitun di rantau Mediterranean jatuh pada musim luruh, secara amnya bermula sekitar Oktober dan berterusan sehingga November. Tarikh tepatnya berubah setiap tahun mengikut cuaca dan kematangan buah. Tuaian berlaku sekali setahun sahaja, jadi minyak yang anda beli datang daripada satu musim tertentu."
          },
          {
            "type": "p",
            "text": "Di rantau itu, musim tuaian juga musim berkumpul: keluarga turun ke ladang bersama-sama, jaring dibentang, dan minyak baharu dimakan mentah dahulu, dicicah roti atau dicampur zaatar."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalestinInline",
            "alt": "Minyak zaitun baharu mengalir keluar dari kilang perahan sejuk ke dalam bekas keluli"
          }
        ]
      },
      {
        "heading": "Bagaimana buah zaitun dituai dan diperah?",
        "id": "tuaian-dan-perahan",
        "blocks": [
          {
            "type": "p",
            "text": "Di banyak ladang zaitun, buah dituai dengan tangan atau disikat turun ke atas jaring yang dibentang di bawah pokok, kemudian dibawa ke kilang perahan secepat mungkin. Di kilang, buah dibasuh, dikisar menjadi pes, lalu minyaknya diasingkan secara mekanikal tanpa haba tinggi. Itulah maksud perahan sejuk."
          },
          {
            "type": "ul",
            "items": [
              "**Tuai** — disikat ke atas jaring supaya kulit buah tidak lebam.",
              "**Angkut** — dihantar ke kilang cepat, kerana kelewatan menjejaskan rasa.",
              "**Kisar** — buah berserta bijinya dikisar menjadi pes.",
              "**Kacau** — pes dikacau perlahan supaya titisan minyak bercantum.",
              "**Asing** — minyak diasingkan tanpa pelarut dan tanpa haba tinggi.",
              "**Botol** — disimpan jauh daripada cahaya sebelum dibotolkan."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalestinInline",
            "alt": "Minyak zaitun baharu mengalir keluar dari kilang perahan sejuk ke dalam bekas keluli"
          },
          {
            "type": "p",
            "text": "Gred dara extra bukan gaya pemasaran; maksudnya diterangkan dalam [panduan minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          }
        ]
      },
      {
        "heading": "Apa maksud minyak zaitun satu sumber?",
        "id": "satu-sumber",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak satu sumber bermaksud minyak dalam botol itu datang dari satu tempat asal, bukan adunan minyak dari beberapa buah negara. Kerana rantaiannya lebih pendek, pembeli boleh bertanya soalan yang ada jawapan: dari mana asalnya, dari musim tuaian yang mana, dan siapa yang membawanya masuk."
          },
          {
            "type": "table",
            "head": [
              "Yang anda semak",
              "Satu sumber",
              "Campuran pelbagai negara"
            ],
            "rows": [
              [
                "Negara asal",
                "Satu negara",
                "Beberapa negara atau ayat umum"
              ],
              [
                "Musim tuaian",
                "Satu musim",
                "Bercampur antara kelompok"
              ],
              [
                "Ketekalan rasa",
                "Watak satu kawasan",
                "Berubah ikut adunan"
              ],
              [
                "Pengimport",
                "Satu pengedar rasmi",
                "Beberapa tangan"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalestinInline",
            "alt": "Minyak zaitun baharu mengalir keluar dari kilang perahan sejuk ke dalam bekas keluli"
          },
          {
            "type": "p",
            "text": "Bukan setiap campuran itu buruk. Satu sumber cuma memberi lebih banyak perkara yang boleh disahkan sendiri, dan itu sebabnya [kami kekal dengan satu asal](/why-us)."
          }
        ]
      },
      {
        "heading": "Bagaimana pembeli menyemak asal-usul sebotol minyak?",
        "id": "cara-semak",
        "blocks": [
          {
            "type": "p",
            "text": "Semak lima perkara sebelum bayar: negara asal yang dinyatakan dengan jelas, gred pada label, tarikh tuaian atau tarikh terbaik sebelum, jenis botol dan kemasannya, serta siapa pengedar yang membawanya masuk ke Malaysia. Kalau penjual tidak dapat menjawab kelima-limanya, itu sendiri sudah satu jawapan."
          },
          {
            "type": "ul",
            "items": [
              "**Asal** — nama negara, bukan nama berbunyi Mediterranean.",
              "**Gred** — dara extra, dara, atau sekadar minyak zaitun.",
              "**Tarikh** — tarikh tuaian; jika tiada, tarikh terbaik sebelum.",
              "**Botol** — kaca gelap atau tin, bukan plastik jernih.",
              "**Harga seliter** — bahagikan harga dengan isi padu botol.",
              "**Pengedar** — nama, alamat kedai dan nombor yang boleh dihubungi."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalestinInline",
            "alt": "Minyak zaitun baharu mengalir keluar dari kilang perahan sejuk ke dalam bekas keluli"
          }
        ]
      },
      {
        "heading": "Di mana boleh beli minyak zaitun Palestin di Malaysia?",
        "id": "beli-di-malaysia",
        "blocks": [
          {
            "type": "p",
            "text": "Di Malaysia, minyak zaitun Arabian Village diedarkan oleh Berkat Madinah Store, yang ditubuhkan pada 2010. Ia dijual di dua cawangan kedai itu, di Ampang Jaya dan di Batu Caves, dan cawangan Batu Caves ialah yang lebih besar. Kedai dibuka dari 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad."
          },
          {
            "type": "p",
            "text": "Harganya RM59.00 untuk botol 250 ml dan RM103.00 untuk 500 ml, sama harga mengikut saiz untuk minyak klasik mahupun mana-mana perisa dalam [koleksi infused](/products). Storefront Shopee dan TikTok Shop ialah saluran milik Berkat Madinah sendiri, bukan penjual lain."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalestinInline",
            "alt": "Minyak zaitun baharu mengalir keluar dari kilang perahan sejuk ke dalam bekas keluli"
          },
          {
            "type": "note",
            "title": "Waktu perayaan",
            "text": "Waktu buka boleh berubah pada hari perayaan seperti Hari Raya. Sahkan dahulu melalui WhatsApp di +60 11-1111 9912, atau [hubungi kedai](/contact)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Dari dahan ke meja anda",
      "blocks": [
        {
          "type": "p",
          "text": "Buah dituai pada musim luruh, diperah tanpa haba tinggi, kemudian dibotolkan jauh daripada cahaya. Yang membezakan sebotol minyak bukan ayat di hadapan label, tetapi maklumat yang boleh disemak di belakangnya, dan [di mana ia dijual](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Apa itu minyak zaitun satu sumber?",
        "a": "Ia bermaksud semua minyak dalam botol datang dari satu tempat asal, bukan adunan dari beberapa buah negara. Kesannya mudah: anda boleh bertanya dari mana asalnya, dari musim tuaian yang mana, dan siapa pengedar yang membawanya masuk, dan setiap soalan itu ada jawapan yang boleh disemak."
      },
      {
        "q": "Bila musim tuaian zaitun berlaku?",
        "a": "Musim tuaian di rantau Mediterranean jatuh pada musim luruh, secara amnya sekitar Oktober hingga November, dan tarikh tepatnya berubah setiap tahun mengikut cuaca serta kematangan buah. Tuaian berlaku sekali setahun sahaja, jadi setiap kelompok minyak terikat kepada satu musim."
      },
      {
        "q": "Apa maksud perahan sejuk?",
        "a": "Perahan sejuk bermaksud minyak diasingkan daripada buah secara mekanikal, tanpa haba tinggi dan tanpa bahan pelarut. Buah dikisar menjadi pes, pes dikacau perlahan, kemudian minyaknya diasingkan. Kaedah ini mengekalkan aroma dan rasa buah yang mudah hilang apabila minyak dipanaskan semasa pemprosesan."
      },
      {
        "q": "Bagaimana saya tahu minyak itu betul-betul dari Palestin?",
        "a": "Baca label untuk negara asal yang dinyatakan dengan jelas, bukan sekadar nama berbunyi Mediterranean. Kemudian tanya penjual siapa pengedar rasminya di Malaysia dan di mana kedainya. Pengedar yang ada kaunter fizikal dan nombor telefon yang boleh dihubungi lebih senang disemak daripada penjual tanpa alamat."
      },
      {
        "q": "Berapa harga minyak zaitun Palestin ini di Malaysia?",
        "a": "Botol 250 ml berharga RM59.00 dan botol 500 ml berharga RM103.00. Harga sama mengikut saiz untuk minyak klasik dan untuk setiap perisa dalam koleksi infused. Untuk membanding dengan botol lain secara adil, bahagikan harga dengan isi padu botol supaya anda membanding harga seliter."
      },
      {
        "q": "Bagaimana cara simpan minyak zaitun di iklim Malaysia?",
        "a": "Simpan dalam almari yang gelap dan sejuk, jauh daripada dapur masak dan cahaya matahari terus. Tutup botol rapat selepas guna supaya kurang udara masuk. Elakkan meletakkan botol di sebelah dapur gas atau di atas peti sejuk, kerana haba berterusan mempercepat minyak kehilangan aromanya."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun Arabian Village",
        "path": "products",
        "description": "Minyak klasik perahan sejuk dan enam infusi masakan, semuanya asal Palestin."
      },
      {
        "label": "Kenapa kami pilih satu sumber",
        "path": "why-us",
        "description": "Bagaimana satu asal, satu musim tuaian dan satu pengedar menjadikan label itu boleh disemak."
      },
      {
        "label": "Tempat membeli di Malaysia",
        "path": "shop",
        "description": "Kaunter di Ampang Jaya dan Batu Caves, serta Shopee dan TikTok Shop milik Berkat Madinah."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "minyak-zaitun-untuk-masak",
    "slug": "minyak-zaitun-untuk-masak-panduan-dapur",
    "seoTitle": "Minyak Zaitun untuk Masak: Panduan Dapur Malaysia",
    "metaTitle": "Minyak Zaitun untuk Masak: Panduan Dapur Malaysia",
    "metaDescription": "Panduan minyak zaitun untuk masak di dapur Malaysia: bila sesuai untuk tumis, panggang dan mencicah, apa itu takat asap, dan bila guna minyak biasa.",
    "focusKeyword": "minyak zaitun untuk masak",
    "relatedKeywords": [
      "olive oil untuk memasak",
      "minyak olive oil untuk masak",
      "minyak masak zaitun",
      "jenis minyak zaitun untuk masak",
      "minyak zaitun yang sesuai untuk memasak",
      "olive oil yang sesuai untuk masak",
      "minyak zaitun extra virgin untuk masak",
      "minyak zaitun untuk tumis",
      "takat asap minyak zaitun",
      "minyak zaitun untuk goreng ikan",
      "harga minyak zaitun 500ml"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun untuk Masak",
      "Teknik Memasak",
      "Dapur Malaysia",
      "Extra Virgin",
      "Infused Collection"
    ],
    "h1": "Minyak Zaitun untuk Masak: Panduan Dapur untuk Masakan Malaysia",
    "excerpt": "Bila minyak zaitun menjadi di dalam kuali, bila ia membazir, dan bagaimana takat asap menentukan hidangan Malaysia mana yang sesuai dengannya.",
    "keyTakeaway": "Minyak zaitun untuk masak paling menjadi pada api kecil hingga sederhana — tumis, panggang, goreng cetek — dan sebagai minyak mentah untuk salad dan mencicah. Untuk goreng rendam api besar, minyak yang lebih neutral dan lebih tinggi takat asapnya masih pilihan yang lebih praktikal.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukMasakHero",
      "alt": "Minyak zaitun untuk masak dicurah ke dalam kuali panas berisi bawang merah yang sedang ditumis"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-masak.jpg",
    "intro": [
      "Soalan pertama orang Malaysia tentang minyak zaitun jarang soal harga. Ia soal kuali: boleh ke minyak ni guna untuk tumis?",
      "Boleh — tetapi bukan untuk semua benda, dan bukan dengan tabiat yang sama seperti minyak masak biasa. Minyak zaitun ada rasa, dan rasa itu bertindak balas dengan haba.",
      "Panduan ini untuk dapur kita: sambal tumis, ikan panggang, telur dan sayur campur."
    ],
    "sections": [
      {
        "heading": "Boleh ke minyak zaitun digunakan untuk masak setiap hari?",
        "id": "boleh-guna-setiap-hari",
        "blocks": [
          {
            "type": "p",
            "text": "Boleh. Minyak zaitun dara sesuai untuk tumis, memanggang dalam ketuhar atau air fryer, goreng cetek, dan sebagai minyak mentah untuk salad dan mencicah. Dua tabiat sahaja yang perlu berubah: api sederhana dan bukan api besar berjela, serta sukatan sudu dan bukan curahan separuh botol ke dalam kuali."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukMasakInline",
            "alt": "Botol minyak zaitun dara di atas meja dapur bersebelahan ikan kembung bersalut kunyit sebelum dipanggang"
          }
        ]
      },
      {
        "heading": "Apa itu takat asap dan kenapa ia penting di dapur?",
        "id": "takat-asap",
        "blocks": [
          {
            "type": "p",
            "text": "Takat asap ialah suhu apabila minyak mula berasap berterusan di dalam kuali. Pada tahap itu minyak terurai: rasanya bertukar pahit dan hangit, baunya tajam, dan hidangan menerima rasa itu sepenuhnya. Ini isu rasa dan teknik — minyak yang melepasi takat asapnya sudah merosakkan lauk sebelum ia sampai ke pinggan."
          },
          {
            "type": "note",
            "title": "Menilai suhu tanpa termometer",
            "text": "Titiskan sehiris bawang ke dalam minyak. Berdesir perlahan bermakna api sederhana — sesuai. Meletup kuat dan minyak berasap nipis bermakna api terlalu besar; kecilkan sebelum bahan masuk."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukMasakInline",
            "alt": "Botol minyak zaitun dara di atas meja dapur bersebelahan ikan kembung bersalut kunyit sebelum dipanggang"
          }
        ]
      },
      {
        "heading": "Bagaimana ia berbanding minyak masak yang kita sudah guna?",
        "id": "banding-minyak-masak",
        "blocks": [
          {
            "type": "p",
            "text": "Dua perbezaan sahaja: takat asap dan rasa. Minyak sawit dan minyak bunga matahari yang ditapis tahan suhu lebih tinggi dan hampir tiada rasa, jadi ia sesuai untuk goreng rendam. Minyak zaitun dara tahan suhu sederhana tetapi membawa rasa sendiri — buah, sedikit pedas di kerongkong."
          },
          {
            "type": "table",
            "head": [
              "Minyak",
              "Anggaran takat asap",
              "Paling sesuai untuk"
            ],
            "rows": [
              [
                "Minyak zaitun dara (extra virgin)",
                "±190–210°C",
                "Tumis, panggang, goreng cetek, salad"
              ],
              [
                "Minyak zaitun ditapis (light)",
                "±230°C",
                "Goreng suhu tinggi, rasa neutral"
              ],
              [
                "Minyak sawit",
                "±230°C",
                "Goreng rendam, api besar"
              ],
              [
                "Minyak kelapa dara",
                "±175–190°C",
                "Tumis ringan, kuih"
              ],
              [
                "Minyak bunga matahari ditapis",
                "±225°C",
                "Goreng neutral"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukMasakInline",
            "alt": "Botol minyak zaitun dara di atas meja dapur bersebelahan ikan kembung bersalut kunyit sebelum dipanggang"
          },
          {
            "type": "p",
            "text": "Angka ini anggaran; ia berubah mengikut penapisan dan umur minyak."
          }
        ]
      },
      {
        "heading": "Masakan Malaysia mana yang menjadi dengan minyak zaitun?",
        "id": "masakan-malaysia",
        "blocks": [
          {
            "type": "p",
            "text": "Hidangan api sederhana dan hidangan siap. Tumis bawang untuk sambal, telur, ikan panggang, sayur campur, ayam bermarinad dan sup semuanya berjalan elok. Yang tidak menjadi ialah goreng rendam api besar dan nasi goreng gaya kedai, kerana teknik itu memang menuntut kuali membakar dan minyak neutral."
          },
          {
            "type": "ul",
            "items": [
              "**Sambal tumis:** kecilkan api, tumis cili kisar perlahan sehingga pecah minyak.",
              "**Ikan kembung panggang:** sapu kunyit, garam dan minyak sebelum masuk ketuhar atau air fryer.",
              "**Telur mata:** api sederhana, satu sudu cukup, tepi rangup tanpa hangit.",
              "**Kangkung dan sayur:** minyak masuk selepas kuali panas."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukMasakInline",
            "alt": "Botol minyak zaitun dara di atas meja dapur bersebelahan ikan kembung bersalut kunyit sebelum dipanggang"
          }
        ]
      },
      {
        "heading": "Jenis minyak zaitun mana yang sesuai untuk memasak?",
        "id": "jenis-yang-sesuai",
        "blocks": [
          {
            "type": "p",
            "text": "Untuk dapur harian, minyak zaitun dara sejuk-tekan paling serba boleh: cukup untuk api sederhana, dan cukup sedap untuk dimakan mentah. Minyak zaitun ditapis pula neutral dan tahan panas lebih tinggi, tetapi anda kehilangan rasa yang menjadi sebab orang membeli minyak zaitun pada mulanya."
          },
          {
            "type": "p",
            "text": "Minyak [Arabian Village](/products) ialah minyak zaitun dara sejuk-tekan dari Palestin, satu asal usul, pada RM59.00 (250 ml) dan RM103.00 (500 ml). Panduan [cara memilih minyak zaitun dara asli](/blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia) menerangkan apa yang perlu dibaca pada label."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukMasakInline",
            "alt": "Botol minyak zaitun dara di atas meja dapur bersebelahan ikan kembung bersalut kunyit sebelum dipanggang"
          }
        ]
      },
      {
        "heading": "Bila guna Infused Collection dan bila guna minyak biasa?",
        "id": "infused-collection",
        "blocks": [
          {
            "type": "p",
            "text": "Guna siri Infused Collection pada hidangan yang sudah siap, bukan di dalam kuali. Ia infusi kulinari — perisa yang dibina untuk dirasa terus. Haba tinggi meratakan aroma itu, jadi satu curahan terakhir di atas pinggan memberi pulangan rasa yang jauh lebih jelas berbanding menumisnya."
          },
          {
            "type": "ul",
            "items": [
              "**Wild thyme** di atas roti panas, telur rebus atau labneh — [lihat perisa wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme).",
              "**Rosemary-basil** di atas ayam panggang, kentang dan pasta.",
              "**Turmeric-black-pepper** ke atas sup, bubur atau nasi putih.",
              "**Blackseed** untuk mencicah roti; **fennel-anise** dan **lavender-chamomile** untuk yogurt dan hidangan manis."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukMasakInline",
            "alt": "Botol minyak zaitun dara di atas meja dapur bersebelahan ikan kembung bersalut kunyit sebelum dipanggang"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Kesimpulan: ini minyak api sederhana",
      "blocks": [
        {
          "type": "p",
          "text": "Satu ayat untuk diingat: minyak zaitun ialah minyak api sederhana dan minyak hidangan siap. Kecilkan api, kurangkan sukatan, dan simpan curahan terakhir untuk atas pinggan. Untuk goreng rendam, biarkan minyak lama anda buat kerja itu."
        },
        {
          "type": "p",
          "text": "Mahu rasa dahulu sebelum ambil botol besar? Mulakan dengan 250 ml — [lihat tempat membeli](/shop) atau tanya di [halaman hubungi kami](/contact)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Boleh ke minyak zaitun extra virgin untuk goreng ikan?",
        "a": "Boleh untuk goreng cetek — ikan dalam minyak nipis pada api sederhana, bukan ikan tenggelam dalam kuali penuh. Untuk goreng rendam api besar, minyak yang lebih neutral dan lebih tinggi takat asapnya lebih praktikal, dan lebih jimat kerana goreng rendam menelan kuantiti minyak yang jauh lebih besar."
      },
      {
        "q": "Minyak zaitun jenis mana paling sesuai untuk tumis?",
        "a": "Minyak zaitun dara sejuk-tekan sudah memadai untuk tumis harian, kerana tumis di rumah jarang melebihi api sederhana. Kalau anda memang menumis pada api sangat besar sehingga kuali berasap, minyak zaitun ditapis atau minyak neutral lain lebih sesuai untuk peringkat panas itu."
      },
      {
        "q": "Kenapa minyak zaitun saya berasap semasa menumis?",
        "a": "Kemungkinan besar kuali sudah terlalu panas sebelum minyak masuk, atau api dibiar besar terlalu lama tanpa bahan di dalamnya. Panaskan kuali pada api sederhana, masukkan minyak, kemudian terus masukkan bahan. Minyak yang duduk lama di atas api kosong paling cepat mencapai takat asapnya."
      },
      {
        "q": "Bagaimana menyimpan minyak zaitun dalam cuaca panas Malaysia?",
        "a": "Jauhkan daripada haba, cahaya dan udara. Simpan di dalam kabinet tertutup, bukan di sebelah dapur gas atau tepi tingkap, dan tutup rapat selepas guna. Peti sejuk tidak perlu — minyak akan menjadi keruh dan pekat, kemudian jernih semula di suhu bilik."
      },
      {
        "q": "Berapa harga minyak zaitun Arabian Village di Malaysia?",
        "a": "RM59.00 untuk botol 250 ml dan RM103.00 untuk botol 500 ml. Harga sama mengikut saiz untuk minyak klasik dan untuk setiap perisa Infused Collection, jadi pilihan perisa tidak mengubah kos. Ia diedarkan di Malaysia oleh Berkat Madinah Store, yang beroperasi sejak tahun 2010."
      },
      {
        "q": "Di mana boleh beli dan rasa minyak zaitun ini?",
        "a": "Di dua cawangan Berkat Madinah Store — Ampang Jaya dan Batu Caves, yang lebih besar — dari 8:00 pagi hingga 12:00 tengah malam setiap hari. Hari perayaan seperti Hari Raya boleh berbeza; sahkan dahulu melalui WhatsApp di +60 11-1111 9912."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun sejuk-tekan asal Palestin dalam saiz 250 ml dan 500 ml, serta enam perisa Infused Collection."
      },
      {
        "label": "Cara memilih minyak zaitun dara asli di Malaysia",
        "path": "blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia",
        "description": "Apa yang perlu dibaca pada label, botol dan harga sebelum anda membayar."
      },
      {
        "label": "Mengapa minyak zaitun semakin popular di Malaysia",
        "path": "blog/mengapa-minyak-zaitun-semakin-popular-di-malaysia",
        "description": "Bagaimana minyak zaitun berpindah dari kotak hadiah ke rak dapur rumah orang Malaysia."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Cawangan Ampang Jaya dan Batu Caves, waktu operasi, dan saluran dalam talian Berkat Madinah."
      }
    ]
  },
];
