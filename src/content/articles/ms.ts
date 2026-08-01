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
];
