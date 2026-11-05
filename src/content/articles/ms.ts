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
      src: 'pressOliveOilPopularityMalaysiaHero',
      alt: 'Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun',
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
            src: 'pressOliveOilPopularityMalaysiaInline',
            alt: 'Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk',
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
      {
        "label": "Minyak zaitun: panduan lengkap",
        "path": "blog/minyak-zaitun-panduan-lengkap",
        "description": "Enam soalan asas dijawab ringkas, dengan pautan ke bacaan penuh."
      }
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
      src: 'pressEvooHealthBenefitsFamiliesHero',
      alt: 'Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai',
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
            src: 'pressEvooHealthBenefitsFamiliesInline',
            alt: 'Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan',
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
      {
        "label": "Kelebihan olive oil untuk dapur harian",
        "path": "blog/kelebihan-olive-oil-untuk-dapur-harian",
        "description": "Kelebihan di dapur dan pada bil belanja, berserta lajur had yang jujur."
      }
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
      src: 'pressChooseAuthenticEvooMalaysiaHero',
      alt: 'Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja',
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
            src: 'pressChooseAuthenticEvooMalaysiaInline',
            alt: 'Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai',
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
      {
        "label": "Cara kenal minyak zaitun palsu",
        "path": "blog/cara-kenal-minyak-zaitun-palsu",
        "description": "Bagaimana minyak dipalsukan, dan ujian rumah mana yang sebenarnya mitos."
      }
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
    "keyTakeaway": "Di Lembah Klang, kedai runcit Arab biasanya memberi pilihan minyak zaitun yang lebih baik daripada rak pasar raya kerana ia barang teras di situ. Arabian Village dijual melalui Berkat Madinah Store — lima cawangan di Selangor (Ampang, Kajang, Shah Alam, Cash & Carry di Ampang dan Sri Gombak), serta kaunter Shopee dan TikTok Shop mereka sendiri. Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam setiap hari.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-11-05",
    "readingTime": 4,
    "hero": {
      "src": "pressBeliMinyakZaitunKlHero",
      "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
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
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Di mana boleh dapatkan Arabian Village di Lembah Klang?",
        "id": "cawangan-berkat-madinah",
        "blocks": [
          {
            "type": "p",
            "text": "Arabian Village diedarkan di Malaysia oleh Berkat Madinah Store, yang bermula pada 2010. Kini ada lima cawangan di Selangor: Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak. Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad; untuk cawangan lain, WhatsApp dahulu untuk sahkan waktu buka. Stok boleh berbeza ikut cawangan."
          },
          {
            "type": "note",
            "title": "Hari perayaan boleh berbeza",
            "text": "Waktu operasi pada hari raya dan hari perayaan lain boleh berubah. Sahkan melalui WhatsApp di +60 11-1111 9912 sebelum bergerak, terutamanya kalau anda jauh."
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunKlInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
                "Cawangan Ampang dan Sri Gombak",
                "KL timur dan utara",
                "8:00 pagi – 12:00 tengah malam"
              ],
              [
                "Cawangan Kajang, Shah Alam dan Cash & Carry (Ampang)",
                "Lebih banyak lokasi di Selangor",
                "WhatsApp untuk sahkan waktu buka"
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
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
            "text": "Minyak Zaitun Extra Virgin Palestin berharga RM59.00 untuk botol 250 ml dan RM109.00 untuk botol 500 ml; versi Organik pula RM69.00 dan RM129.00. Setiap perisa Infused Collection hanya dalam botol 250 ml, pada harga RM75.00. Kalau ini kali pertama, ambil 250 ml untuk merasa dahulu; kalau anda memasak setiap hari, 500 ml lebih berbaloi."
          },
          {
            "type": "p",
            "text": "Semua perisa disenaraikan di [halaman produk](/products)."
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunKlInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
        "a": "Bergantung pada kawasan anda. Untuk Arabian Village, kaunter fizikalnya ialah lima cawangan Berkat Madinah Store di Selangor: Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak. Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam setiap hari; untuk cawangan lain, WhatsApp dahulu untuk sahkan waktu buka."
      },
      {
        "q": "Pukul berapa kedai buka dan tutup?",
        "a": "Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad. Untuk Kajang, Shah Alam dan Cash & Carry (Ampang), sahkan waktu buka melalui WhatsApp. Waktu ini boleh berubah pada hari raya dan hari perayaan lain. Kalau anda datang pada hari cuti, hantar mesej WhatsApp ke +60 11-1111 9912 dahulu untuk sahkan sebelum bergerak."
      },
      {
        "q": "Adakah Shopee dan TikTok Shop itu penjual yang berasingan?",
        "a": "Bukan. Kaunter Shopee dan TikTok Shop dikendalikan oleh Berkat Madinah Store sendiri, pengedar rasmi Arabian Village di Malaysia, dengan stok yang sama seperti di cawangan. Anda cuma memilih antara datang ke kedai atau minta ia dihantar, bukan antara dua penjual berbeza."
      },
      {
        "q": "Berapa harga minyak zaitun Arabian Village?",
        "a": "Minyak Zaitun Extra Virgin Palestin berharga RM59.00 untuk botol 250 ml dan RM109.00 untuk botol 500 ml. Versi Organik berharga RM69.00 (250 ml) dan RM129.00 (500 ml). Enam perisa Infused Collection hanya dalam botol 250 ml, pada harga RM75.00."
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
      },
      {
        "label": "Beli minyak zaitun online di Malaysia",
        "path": "blog/beli-minyak-zaitun-online-di-malaysia",
        "description": "Apa yang perlu ada pada penyenaraian sebelum anda bayar."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "harga-minyak-zaitun-malaysia",
    "slug": "harga-minyak-zaitun-di-malaysia",
    "seoTitle": "Harga Minyak Zaitun di Malaysia: Cara Kira Seliter",
    "metaTitle": "Harga Minyak Zaitun di Malaysia: Cara Kira Seliter",
    "metaDescription": "Harga minyak zaitun di Malaysia: RM59.00 bagi 250 ml, RM109.00 bagi 500 ml. Kira harga seliter dulu sebelum bayar — inilah caranya.",
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
    "keyTakeaway": "Minyak Zaitun Extra Virgin Palestin Arabian Village berharga RM59.00 bagi botol 250 ml dan RM109.00 bagi botol 500 ml. Tukar kepada seliter dan angkanya jadi RM236.00 berbanding RM218.00 — botol 500 ml RM18.00 lebih murah bagi setiap liter minyak yang sama. Bandingkan seliter, bukan harga rak.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-11-05",
    "readingTime": 4,
    "hero": {
      "src": "pressHargaMinyakZaitunMalaysiaHero",
      "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
    },
    "ogImage": "/og/blog-harga-minyak-zaitun-malaysia.jpg",
    "intro": [
      "Kalau anda sedang bandingkan harga minyak zaitun sebelum beli, masalahnya bukan nombor di rak — tetapi saiz botol yang tak sama. RM59.00 dan RM109.00 tak boleh dibanding sampailah kedua-duanya ditukar kepada harga seliter.",
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
            "text": "Minyak zaitun dara extra virgin sejuk perah Arabian Village berharga **RM59.00** bagi botol 250 ml dan **RM109.00** bagi botol 500 ml di Malaysia. Versi organiknya berharga **RM69.00** (250 ml) dan **RM129.00** (500 ml), iaitu RM276.00 dan RM258.00 seliter. Enam perisa Infused Collection pula hanya dijual dalam botol 250 ml, pada harga RM75.00."
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
                "RM109.00",
                "RM218.00"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressHargaMinyakZaitunMalaysiaInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
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
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Macam mana nak kira harga seliter minyak zaitun?",
        "id": "kira-harga-seliter",
        "blocks": [
          {
            "type": "p",
            "text": "Bahagikan harga botol dengan isi padu dalam mililiter, kemudian darab dengan 1,000. Botol 250 ml pada RM59.00 menjadi RM236.00 seliter. Botol 500 ml pada RM109.00 menjadi RM218.00 seliter. Formula yang sama berfungsi pada mana-mana saiz di mana-mana kedai, jadi anda tak perlu bergantung pada dakwaan sesiapa."
          },
          {
            "type": "ol",
            "items": [
              "Ambil harga botol: RM109.00.",
              "Bahagi dengan mililiter: RM109.00 ÷ 500 = RM0.218.",
              "Darab dengan 1,000: RM218.00 seliter."
            ]
          },
          {
            "type": "image",
            "src": "pressHargaMinyakZaitunMalaysiaInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
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
            "text": "Botol 500 ml, walaupun bezanya sederhana. Seliter, ia RM218.00 berbanding RM236.00 — anda jimat RM18.00 bagi setiap liter minyak yang sama. Beli dua botol 250 ml pula memberi 500 ml pada RM118.00, iaitu RM9.00 lebih mahal daripada satu botol 500 ml yang berharga RM109.00."
          },
          {
            "type": "p",
            "text": "Botol kecil tetap ada tempatnya: cuba kali pertama, beri sebagai hadiah, atau buka satu perisa seperti [wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme)."
          },
          {
            "type": "image",
            "src": "pressHargaMinyakZaitunMalaysiaInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
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
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
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
            "text": "Di Malaysia, Arabian Village diedarkan oleh Berkat Madinah Store, yang bermula pada 2010. Beli di mana-mana daripada lima cawangan mereka di Selangor — **Ampang**, **Kajang**, **Shah Alam**, **Cash & Carry (Ampang)** dan **Sri Gombak** — atau melalui storefront Shopee dan TikTok Shop mereka sendiri. Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad; stok boleh berbeza ikut cawangan, jadi WhatsApp dahulu."
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
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
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
          "text": "Harga minyak zaitun di Malaysia tinggi kerana setiap botol adalah barang import, dan itu takkan berubah selagi kita tiada ladang zaitun. Apa yang boleh berubah ialah cara anda membanding: RM59.00 bagi 250 ml ialah RM236.00 seliter, RM109.00 bagi 500 ml ialah RM218.00 seliter."
        }
      ]
    },
    "faqs": [
      {
        "q": "Berapa harga minyak zaitun 250ml?",
        "a": "Botol 250 ml minyak zaitun dara extra virgin Arabian Village berharga RM59.00. Ditukar kepada seliter, itu bersamaan RM236.00. Versi organik 250 ml pula berharga RM69.00, manakala perisa Infused Collection juga datang dalam botol 250 ml, pada harga RM75.00."
      },
      {
        "q": "Berapa harga minyak zaitun 500ml?",
        "a": "Botol 500 ml Extra Virgin berharga RM109.00, iaitu RM218.00 seliter. Berbanding botol 250 ml yang menjadi RM236.00 seliter, anda jimat RM18.00 bagi setiap liter. Dua botol 250 ml memberi jumlah minyak yang sama tetapi berharga RM118.00, jadi satu botol 500 ml RM9.00 lebih murah. Botol organik 500 ml berharga RM129.00."
      },
      {
        "q": "Minyak zaitun berapa harga seliter di Malaysia?",
        "a": "Ia bergantung pada saiz botol, bukan hanya jenama. Bagi Arabian Village, botol 250 ml menjadi RM236.00 seliter dan botol 500 ml menjadi RM218.00 seliter. Kira sendiri dengan formula ini: harga botol dibahagi isi padu dalam mililiter, kemudian darab dengan 1,000."
      },
      {
        "q": "Kenapa minyak zaitun extra virgin lebih mahal daripada minyak zaitun biasa?",
        "a": "Extra virgin ialah gred perahan pertama yang dikeluarkan tanpa haba atau bahan kimia, dan kaedah itu menghasilkan lebih sedikit minyak daripada buah yang sama. Minyak yang ditapis atau dicampur lebih murah dihasilkan dan rasanya lebih neutral. Anda membayar untuk gred, bukan untuk botolnya."
      },
      {
        "q": "Adakah minyak zaitun berperisa lebih mahal daripada yang klasik?",
        "a": "Ya, sedikit. Setiap perisa dalam Infused Collection — lavender-chamomile, blackseed, turmeric-black-pepper, rosemary-basil, fennel-anise dan wild-thyme — dijual dalam botol 250 ml sahaja pada harga RM75.00, berbanding RM59.00 untuk extra virgin biasa 250 ml. Semuanya infusi masakan, dibuat untuk kegunaan dapur harian."
      },
      {
        "q": "Di mana saya boleh beli minyak zaitun Arabian Village di Malaysia?",
        "a": "Melalui Berkat Madinah Store, pengedar rasmi di Malaysia yang bermula pada 2010. Beli di mana-mana daripada lima cawangannya di Selangor (Ampang, Kajang, Shah Alam, Cash & Carry di Ampang dan Sri Gombak), atau melalui storefront Shopee dan TikTok Shop mereka sendiri. Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam setiap hari; hari perayaan boleh berbeza."
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
        "description": "Lima cawangan di Selangor, serta Shopee dan TikTok Shop Berkat Madinah."
      },
      {
        "label": "Cara memilih minyak zaitun dara asli",
        "path": "blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia",
        "description": "Senarai semak label: gred, asal, tahun tuaian dan botol."
      },
      {
        "label": "Botol minyak zaitun: kaca gelap dan saiz",
        "path": "blog/botol-minyak-zaitun-kaca-gelap-dan-saiz",
        "description": "Kenapa botol itu penting, dan saiz mana untuk kadar guna anda."
      },
      {
        "label": "Kenapa minyak zaitun tak pernah murah",
        "path": "blog/kenapa-minyak-zaitun-tak-pernah-murah",
        "description": "Kos sebenar di sebalik harga, dan bila harga rendah jadi tanda amaran."
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
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressJenamaMinyakZaitunTerbaikHero",
      "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
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
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
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
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
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
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
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
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
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
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
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
                "RM109.00",
                "RM218.00"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressJenamaMinyakZaitunTerbaikInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
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
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
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
        "a": "Bagi Arabian Village, harga perisa seperti [wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme) ialah RM75.00 — ia dijual dalam botol 250 ml sahaja. Minyak extra virgin klasik pula RM59.00 untuk 250 ml dan RM109.00 untuk 500 ml. Untuk jenama lain, semak harga seliter dengan cara yang sama."
      },
      {
        "q": "Di mana saya boleh melihat botolnya sendiri sebelum membeli?",
        "a": "Arabian Village diedar di Malaysia oleh Berkat Madinah Store, yang mempunyai lima cawangan di Selangor: Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak. Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam setiap hari, dan stok boleh berbeza ikut cawangan. Hari perayaan seperti Hari Raya boleh berbeza, jadi sahkan melalui WhatsApp."
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
      },
      {
        "label": "Minyak zaitun vs minyak masak lain",
        "path": "blog/minyak-zaitun-vs-minyak-masak-lain",
        "description": "Rasa, takat asap dan kegunaan berbanding minyak sawit, kelapa, bijan dan kacang."
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
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunExtraVirginGredHero",
      "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
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
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
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
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
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
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
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
            "text": "Bandingkan harga seliter, bukan harga sebotol. Di [kedai dalam talian](/shop), 250 ml berharga **RM59.00** dan 500 ml **RM109.00** — botol besar lebih murah seliter. Perisa Koleksi Infused pula hanya dalam botol 250 ml, pada harga RM75.00."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunExtraVirginGredInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
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
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
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
        "a": "Minyak Zaitun Extra Virgin Palestin berharga RM59.00 untuk botol 250 ml dan RM109.00 untuk botol 500 ml. Versi Organik berharga RM69.00 dan RM129.00, manakala perisa Koleksi Infused hanya dalam botol 250 ml, pada harga RM75.00. Ia diedarkan di Malaysia oleh Berkat Madinah Store, dan boleh ditempah melalui WhatsApp di +60 11-1111 9912."
      },
      {
        "q": "Di mana saya boleh lihat botol itu sendiri?",
        "a": "Berkat Madinah Store, pengedar rasmi di Malaysia sejak 2010, mempunyai lima cawangan di Selangor — Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak. Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad. Hari perayaan boleh berbeza, jadi sahkan dahulu di [halaman hubungi kami](/contact)."
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
      },
      {
        "label": "Apa itu minyak zaitun pomace",
        "path": "blog/apa-itu-minyak-zaitun-pomace",
        "description": "Hampas, pelarut dan penapisan — kenapa harganya jauh lebih murah."
      },
      {
        "label": "Rasa minyak zaitun: pahit dan pedas",
        "path": "blog/rasa-minyak-zaitun-pahit-dan-pedas",
        "description": "Kenapa minyak muda terasa pahit dan pedas di tekak, dan bila ia tanda rosak."
      },
      {
        "label": "Kelebihan extra virgin berbanding gred lain",
        "path": "blog/kelebihan-extra-virgin-olive-oil-berbanding-gred-lain",
        "description": "Kelebihannya ialah apa yang masih tinggal, dan bila ia boleh musnah."
      },
      {
        "label": "Maksud olive oil dalam bahasa Malaysia",
        "path": "blog/maksud-olive-oil-dalam-bahasa-malaysia",
        "description": "Jambatan istilah antara label Inggeris dan perbualan Melayu."
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
    "dateModified": "2026-11-05",
    "readingTime": 4,
    "hero": {
      "src": "pressMinyakZaitunHalalHero",
      "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
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
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
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
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
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
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
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
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
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
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
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
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          },
          {
            "type": "p",
            "text": "Pengedar rasmi ialah Berkat Madinah Store, ditubuhkan 2010, dengan lima cawangan di Selangor (Ampang, Kajang, Shah Alam, Cash & Carry di Ampang dan Sri Gombak) — tanya melalui [halaman hubungi kami](/contact)."
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
        "a": "Boleh. Berkat Madinah Store mempunyai lima cawangan di Selangor: Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak. Cawangan Ampang dan Sri Gombak buka dari 8:00 pagi hingga 12:00 tengah malam setiap hari, kecuali hari perayaan yang mungkin berbeza; untuk cawangan lain, WhatsApp dahulu untuk sahkan waktu buka."
      }
    ],
    "related": [
      {
        "label": "Semua saiz dan perisa minyak zaitun",
        "path": "products",
        "description": "Minyak zaitun dara klasik pada RM59.00 (250 ml) dan RM109.00 (500 ml), serta siri Infused Collection dalam botol 250 ml."
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
        "description": "WhatsApp, lima cawangan dan waktu buka Berkat Madinah Store untuk sebarang soalan bahan atau dokumen."
      },
      {
        "label": "Minyak zaitun habbatus sauda",
        "path": "blog/minyak-zaitun-habbatus-sauda-apa-yang-perlu-tahu",
        "description": "Apa itu minyak zaitun infusi habbatus sauda, cara membacanya pada label, dan penggunaannya di dapur."
      },
      {
        "label": "Cara simpan minyak zaitun",
        "path": "blog/cara-simpan-minyak-zaitun",
        "description": "Rak mana, kenapa bukan peti sejuk, dan berapa lama selepas dibuka."
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
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunOrganikHero",
      "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
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
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
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
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
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
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
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
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
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
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
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
            "text": "Harga seliter ialah cara paling mudah membandingkan saiz. Botol 250 ml pada **RM59.00** bersamaan kira-kira RM236 seliter; botol 500 ml pada **RM109.00** bersamaan RM218 seliter. Minyak [Arabian Village](/products) ialah extra virgin perahan sejuk dari Palestin."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOrganikInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
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
        "a": "Boleh. Hantar soalan melalui WhatsApp ke +60 11-1111 9912 dan minta jawapan bertulis tentang gred, tarikh perahan, asal usul dan sebarang sijil. Anda juga boleh tanya di lima cawangan Berkat Madinah Store di Selangor (Ampang, Kajang, Shah Alam, Cash & Carry di Ampang dan Sri Gombak); cawangan Ampang dan Sri Gombak dibuka 8:00 pagi hingga 12:00 tengah malam."
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
        "description": "Lima cawangan Berkat Madinah Store di Selangor, serta saluran dalam talian rasminya."
      },
      {
        "label": "Maksud minyak zaitun tulen",
        "path": "blog/maksud-minyak-zaitun-tulen",
        "description": "Istilah pemasaran lawan istilah gred, dan apa yang sebenarnya dijamin."
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
    "dateModified": "2026-11-05",
    "readingTime": 4,
    "hero": {
      "src": "pressMinyakZaitunPalestinHero",
      "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
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
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
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
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
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
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
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
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
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
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Di mana boleh beli minyak zaitun Palestin di Malaysia?",
        "id": "beli-di-malaysia",
        "blocks": [
          {
            "type": "p",
            "text": "Di Malaysia, minyak zaitun Arabian Village diedarkan oleh Berkat Madinah Store, yang ditubuhkan pada 2010. Ia dijual di lima cawangan kedai itu di Selangor: Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak. Cawangan Ampang dan Sri Gombak dibuka dari 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad, dan stok boleh berbeza ikut cawangan."
          },
          {
            "type": "p",
            "text": "Minyak Zaitun Extra Virgin Palestin berharga RM59.00 untuk botol 250 ml dan RM109.00 untuk 500 ml, dan versi Organik RM69.00 dan RM129.00. Perisa dalam [koleksi infused](/products) hanya dalam botol 250 ml, pada harga RM75.00. Storefront Shopee dan TikTok Shop ialah saluran milik Berkat Madinah sendiri, bukan penjual lain."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalestinInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
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
        "a": "Minyak Zaitun Extra Virgin Palestin berharga RM59.00 untuk botol 250 ml dan RM109.00 untuk botol 500 ml; versi Organik RM69.00 dan RM129.00. Perisa dalam koleksi infused hanya dalam botol 250 ml, pada harga RM75.00. Untuk membanding dengan botol lain secara adil, bahagikan harga dengan isi padu botol supaya anda membanding harga seliter."
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
        "description": "Lima cawangan di Selangor, serta Shopee dan TikTok Shop milik Berkat Madinah."
      },
      {
        "label": "Zaitun dalam Al-Quran",
        "path": "blog/pokok-zaitun-dalam-al-quran-dan-warisan-palestin",
        "description": "Sebutan pokok zaitun dalam Al-Quran dan warisan ladang keluarga Palestin."
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
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukMasakHero",
      "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
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
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
            "text": "Minyak [Arabian Village](/products) ialah minyak zaitun dara sejuk-tekan dari Palestin, satu asal usul, pada RM59.00 (250 ml) dan RM109.00 (500 ml). Panduan [cara memilih minyak zaitun dara asli](/blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia) menerangkan apa yang perlu dibaca pada label."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukMasakInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
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
        "a": "Minyak Zaitun Extra Virgin Palestin berharga RM59.00 untuk botol 250 ml dan RM109.00 untuk botol 500 ml; versi Organik RM69.00 dan RM129.00. Perisa Infused Collection hanya dalam botol 250 ml, pada harga RM75.00. Ia diedarkan di Malaysia oleh Berkat Madinah Store, yang beroperasi sejak tahun 2010."
      },
      {
        "q": "Di mana boleh beli dan rasa minyak zaitun ini?",
        "a": "Di lima cawangan Berkat Madinah Store di Selangor — Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak. Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam setiap hari. Hari perayaan seperti Hari Raya boleh berbeza; sahkan dahulu melalui WhatsApp di +60 11-1111 9912."
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
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah."
      },
      {
        "label": "Minyak zaitun untuk salad",
        "path": "blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk",
        "description": "Sos salad, kerabu dan hidangan sejuk — di mana minyak yang tidak dipanaskan paling menyerlah."
      },
      {
        "label": "Minyak zaitun untuk goreng",
        "path": "blog/minyak-zaitun-untuk-goreng",
        "description": "Tumis, goreng cetek, goreng rendam dan wok api besar — mana yang munasabah."
      },
      {
        "label": "Minyak zaitun untuk air fryer",
        "path": "blog/minyak-zaitun-untuk-air-fryer",
        "description": "Berapa banyak, kenapa bukan sembur aerosol, dan makanan mana yang sesuai."
      },
      {
        "label": "Minyak zaitun untuk sayur panggang",
        "path": "blog/minyak-zaitun-untuk-sayur-panggang",
        "description": "Berapa banyak minyak setiap dulang, dan kenapa dulang penuh menghalang kegaringan."
      },
      {
        "label": "Minyak zaitun untuk popcorn",
        "path": "blog/minyak-zaitun-untuk-popcorn",
        "description": "Popcorn atas dapur, bukan bag mikrogelombang, dan apa yang minyak dara tambah."
      },
      {
        "label": "Minyak zaitun vs minyak bunga matahari",
        "path": "blog/minyak-zaitun-vs-minyak-bunga-matahari",
        "description": "Rasa, sifat takat berasap dan kos setiap kali guna, dua minyak berbanding."
      },
      {
        "label": "Minyak zaitun vs minyak bijan",
        "path": "blog/minyak-zaitun-vs-minyak-bijan",
        "description": "Dua minyak berperisa kuat, dan bila setiap satu menang di dapur."
      },
      {
        "label": "Kopi minyak zaitun",
        "path": "blog/kopi-minyak-zaitun",
        "description": "Trend minyak dalam kopi: kuantiti, kenapa perlu dikacau kuat, dan rasa sebenar."
      }
    ]
  },
  /* ---------------- PRESS round 2 ---------------- */
  {
    "id": "minyak-zaitun-habbatus-sauda",
    "slug": "minyak-zaitun-habbatus-sauda-apa-yang-perlu-tahu",
    "seoTitle": "Minyak Zaitun Habbatus Sauda: Apa Yang Perlu Tahu",
    "metaTitle": "Minyak Zaitun Habbatus Sauda: Apa Yang Perlu Tahu",
    "metaDescription": "Minyak zaitun habbatus sauda: apa itu minyak infusi, cara ia dibuat, rasanya, tempatnya di dapur Malaysia, bacaan bahan, saiz 250 ml dan tempat membelinya.",
    "focusKeyword": "minyak zaitun habbatus sauda",
    "relatedKeywords": [
      "minyak zaitun habbatus sauda arabian village",
      "minyak zaitun infusi habbatus sauda",
      "habbatus sauda dan minyak zaitun",
      "minyak zaitun nigella sativa",
      "minyak zaitun dara ekstra infusi",
      "harga minyak zaitun habbatus sauda",
      "minyak zaitun berperisa",
      "infused olive oil malaysia",
      "minyak zaitun habbatus sauda halal",
      "beli minyak zaitun habbatus sauda",
      "minyak zaitun untuk mencicah",
      "minyak zaitun 500ml harga"
    ],
    "category": "Panduan Produk",
    "tags": [
      "Habbatus Sauda",
      "Infused Collection",
      "Minyak Zaitun Dara",
      "Dapur Malaysia",
      "Arabian Village"
    ],
    "h1": "Minyak Zaitun Habbatus Sauda: Apa Yang Ada Di Dalam Botol",
    "excerpt": "Apa itu minyak zaitun yang diinfusi habbatus sauda, bagaimana ia dibuat, rasanya, dan di mana ia sesuai dalam dapur Malaysia.",
    "keyTakeaway": "Minyak zaitun habbatus sauda ialah minyak zaitun dara ekstra perahan sejuk yang diinfusi dengan biji Nigella sativa. Ia satu minyak, bukan campuran dua botol, dan bukan kapsul. Rasanya hangat dan berlada, paling menjadi sebagai minyak akhir untuk pencicah, perapan, nasi dan sayur panggang.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunHabbatusSaudaHero",
      "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
    },
    "ogImage": "/og/blog-minyak-zaitun-habbatus-sauda.jpg",
    "intro": [
      "Carian untuk minyak zaitun habbatus sauda biasanya datang daripada orang yang sudah kenal kedua-dua bahan itu berasingan. Zaitun di rak dapur, habbatus sauda dalam balang.",
      "Yang jarang dijelaskan ialah apa sebenarnya yang ada di dalam botol apabila keduanya digabungkan.",
      "Artikel ini menjawab bahagian produk: apa itu minyak infusi, cara ia dibuat, rasanya, tempatnya di dapur Malaysia, harga dan tempat belinya."
    ],
    "sections": [
      {
        "heading": "Apa itu minyak zaitun habbatus sauda?",
        "id": "apa-itu-minyak-zaitun-habbatus-sauda",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun habbatus sauda ialah minyak zaitun dara ekstra yang diinfusi dengan biji habbatus sauda, atau Nigella sativa. Ia bukan dua minyak yang dicampur di dalam satu botol, dan bukan minyak yang diperah daripada biji. Asasnya kekal minyak zaitun perahan sejuk; biji itu menyumbang rasa dan aroma."
          },
          {
            "type": "p",
            "text": "Artikel ini bercakap tentang produk dan penggunaannya di dapur sahaja: apa yang ada di dalam botol, dan cara ia dimasak."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHabbatusSaudaInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Bagaimana infusi dibuat, dan bezanya dengan campur sendiri",
        "id": "cara-infusi-dibuat",
        "blocks": [
          {
            "type": "p",
            "text": "Infusi bermaksud biji habbatus sauda dibiarkan di dalam minyak zaitun perahan sejuk sehingga minyak itu mengambil rasa dan aromanya. Prosesnya perlahan dan tanpa haba tinggi, kerana haba merosakkan rasa minyak zaitun dara. Hasilnya satu minyak yang seimbang, bukan dua lapisan rasa yang duduk berasingan di dalam botol."
          },
          {
            "type": "ul",
            "items": [
              "Kepekatan terkawal. Kelompok kecil diinfusi dengan nisbah yang sama, jadi botol bulan depan berasa seperti botol hari ini.",
              "Tiada perisa, pewarna atau bahan tambahan tiruan. Minyak zaitun dan biji sahaja.",
              "Biji yang dibiar terendam di rumah terus mengeluarkan rasa dan membawa lembapan masuk. Minyak yang diinfusi lalu ditapis tidak."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHabbatusSaudaInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Infusi, minyak habbatus sauda tulen dan kapsul: apa bezanya",
        "id": "beza-infusi-tulen-kapsul",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga produk yang sangat berbeza sering dicari dengan istilah yang sama. Minyak zaitun infusi ialah bahan dapur berperisa. Minyak habbatus sauda tulen diperah terus daripada biji dan rasanya jauh lebih tajam. Kapsul pula dijual sebagai suplemen, bukan sebagai bahan masakan."
          },
          {
            "type": "table",
            "head": [
              "Produk",
              "Apa itu",
              "Di mana ia digunakan"
            ],
            "rows": [
              [
                "Minyak zaitun infusi habbatus sauda",
                "Minyak zaitun dara ekstra dengan biji Nigella sativa diinfusi ke dalamnya",
                "Pencicah, perapan, nasi, sayur panggang"
              ],
              [
                "Minyak habbatus sauda tulen",
                "Diperah terus daripada biji, tanpa asas zaitun",
                "Rasa sangat pekat, jarang jadi minyak masak"
              ],
              [
                "Kapsul habbatus sauda",
                "Biji dalam bentuk suplemen berbungkus",
                "Bukan bahan dapur"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHabbatusSaudaInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Rasanya bagaimana, dan tempatnya di dapur Malaysia",
        "id": "rasa-dan-dapur-malaysia",
        "blocks": [
          {
            "type": "p",
            "text": "Rasanya hangat dan berlada dengan kedalaman herba yang bersahaja, serta sedikit bau seakan jintan. Ia jauh lebih lembut daripada biji yang dikunyah terus. Kerana rasa itu sudah ada di dalam minyak, botol ini paling menjadi sebagai minyak akhir: dititiskan ke atas hidangan siap, bukan ke dalam kuali."
          },
          {
            "type": "ul",
            "items": [
              "Dititiskan ke atas hummus, labneh atau keju segar, dicicah dengan roti.",
              "Dalam perapan ayam atau ikan sebelum dipanggang, bersama garam, lada hitam dan limau.",
              "Dikacau ke dalam nasi yang baru ditanak, sesudu sebelum dihidang.",
              "Ke atas sayur panggang seperti terung dan kembang kol, sebaik keluar dari ketuhar.",
              "Sebagai sos salad ringkas bersama cuka atau limau kasturi."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHabbatusSaudaInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          },
          {
            "type": "p",
            "text": "Untuk soal api dan haba, rujuk [panduan memasak dengan minyak zaitun](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          }
        ]
      },
      {
        "heading": "Membaca senarai bahan dan status halalnya",
        "id": "bahan-dan-status-halal",
        "blocks": [
          {
            "type": "p",
            "text": "Senarai bahan sebuah minyak infusi sepatutnya pendek. Untuk versi ini, ia minyak zaitun dara ekstra dan biji Nigella sativa, tanpa perisa, pewarna atau bahan tambahan tiruan. Kedua-duanya bahan tumbuhan, jadi tiada unsur haiwan dan tiada alkohol pembawa perisa yang perlu dipersoalkan pada botol."
          },
          {
            "type": "note",
            "title": "Sebelum bayar",
            "text": "Kalau anda mahu pengesahan bertulis, minta penjual tunjukkan dokumen untuk kelompok yang anda beli. Butiran penuh ada dalam [status halal minyak zaitun](/blog/status-halal-minyak-zaitun)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHabbatusSaudaInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Harga dan di mana hendak beli",
        "id": "harga-dan-tempat-beli",
        "blocks": [
          {
            "type": "p",
            "text": "Seperti setiap perisa dalam Infused Collection, minyak ini dijual dalam botol 250 ml sahaja pada harga RM75.00, iaitu RM300 seliter. Untuk membanding dengan botol lain, tukar harga kepada seliter: harga botol dibahagi 250, kemudian darab 1,000 — itulah cara paling jujur menilai dua botol yang berlainan saiz."
          },
          {
            "type": "p",
            "text": "Halaman produk penuh: [minyak zaitun infusi habbatus sauda](/products/infused-extra-virgin-olive-oil-blackseed)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunHabbatusSaudaInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          },
          {
            "type": "ul",
            "items": [
              "Berkat Madinah Store ialah pengedar rasmi dan satu-satunya di Malaysia, dengan lima cawangan di Selangor: Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak. Stok boleh berbeza ikut cawangan.",
              "Ampang: 17-L1, Jalan Ampang Putra 6, Taman Putra Sulaiman, 68000 Ampang, Selangor.",
              "Sri Gombak: 32, Jalan Prima SG 2, Prima Seri Gombak, 68100 Batu Caves, Selangor.",
              "Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam setiap hari; alamat cawangan lain ada di [halaman tempat membeli](/shop). Hari raya boleh berbeza, sahkan di WhatsApp +60 11-1111 9912.",
              "Dalam talian, Shopee dan TikTok Shop dikendalikan oleh Berkat Madinah sendiri."
            ]
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Ringkasnya",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun habbatus sauda ialah satu botol minyak zaitun dara ekstra yang sudah berperisa, bukan gabungan dua produk. Layan ia seperti minyak akhir: sesudu di atas pencicah, di dalam perapan, atau ke atas nasi dan sayur panggang."
        },
        {
          "type": "p",
          "text": "Kalau ini botol infusi pertama anda, mulakan dengan 250 ml. Lihat [seluruh Infused Collection](/products) atau tanya stok di [halaman hubungi kami](/contact)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Adakah minyak zaitun habbatus sauda sama dengan minyak habbatus sauda tulen?",
        "a": "Tidak. Yang ini minyak zaitun dara ekstra yang diinfusi dengan biji, jadi asasnya minyak zaitun. Minyak habbatus sauda tulen diperah terus daripada biji dan rasanya jauh lebih pekat."
      },
      {
        "q": "Boleh ke minyak ini digunakan untuk menumis?",
        "a": "Boleh pada api sederhana, tetapi haba menghilangkan aroma yang anda bayar. Guna minyak zaitun biasa untuk kuali, dan simpan botol infusi ini untuk curahan terakhir di pinggan."
      },
      {
        "q": "Rasanya terlalu kuat untuk masakan Melayu?",
        "a": "Rasanya hangat dan berlada, bukan menyengat. Sesudu cukup untuk satu pinggan. Ia paling ketara pada hidangan yang tidak berempah berat: nasi, ayam panggang dan pencicah."
      },
      {
        "q": "Ada perisa atau pewarna tiruan di dalam botol?",
        "a": "Tiada. Infused Collection menggunakan minyak zaitun perahan sejuk dan botani sebenar sahaja. Senarai bahan pada botol sepatutnya pendek dan boleh dibaca sekali pandang."
      },
      {
        "q": "Berapa harganya, dan saiz mana patut saya mula?",
        "a": "Ia dijual dalam botol 250 ml sahaja, dan harganya ada di kedai — tanya di cawangan atau melalui WhatsApp di +60 11-1111 9912. Saiz 250 ml itu juga sesuai untuk kali pertama anda mencuba minyak berperisa."
      },
      {
        "q": "Bagaimana cara menyimpannya di dapur Malaysia?",
        "a": "Jauhkan daripada haba, cahaya dan udara. Tutup rapat selepas guna dan simpan di dalam almari yang sejuk dan gelap, bukan di rak sebelah dapur."
      },
      {
        "q": "Adakah minyak zaitun habbatus sauda halal?",
        "a": "Bahannya minyak zaitun dan biji Nigella sativa, kedua-duanya daripada tumbuhan, tanpa unsur haiwan atau alkohol pembawa perisa. Untuk pengesahan bertulis, minta dokumen daripada penjual."
      },
      {
        "q": "Di mana ia dijual di Malaysia?",
        "a": "Di lima cawangan Berkat Madinah Store di Selangor (Ampang, Kajang, Shah Alam, Cash & Carry di Ampang dan Sri Gombak), serta melalui Shopee dan TikTok Shop yang dikendalikan kedai yang sama. Stok boleh berbeza ikut cawangan, jadi WhatsApp dahulu."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun infusi habbatus sauda",
        "path": "products/infused-extra-virgin-olive-oil-blackseed",
        "description": "Halaman produk penuh: senarai bahan, saiz 250 ml, dan nota rasa."
      },
      {
        "label": "Infused Collection dan minyak zaitun dara",
        "path": "products",
        "description": "Enam botani dalam Infused Collection, serta minyak zaitun dara ekstra asal Palestin."
      },
      {
        "label": "Status halal minyak zaitun",
        "path": "blog/status-halal-minyak-zaitun",
        "description": "Apa yang perlu dibaca pada botol dan apa yang boleh ditanya kepada penjual."
      },
      {
        "label": "Harga minyak zaitun di Malaysia",
        "path": "blog/harga-minyak-zaitun-di-malaysia",
        "description": "RM59 dan RM109 untuk minyak klasik, perbandingan seliter, dan apa yang ada di sebalik harga itu."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Api, takat asap dan sukatan untuk dapur Malaysia harian."
      }
    ]
  },
  /* ---------------- PRESS round 2 ---------------- */
  {
    "id": "minyak-zaitun-untuk-salad",
    "slug": "minyak-zaitun-untuk-salad-dan-hidangan-sejuk",
    "seoTitle": "Minyak Zaitun untuk Salad: Sos dan Hidangan Sejuk",
    "metaTitle": "Minyak Zaitun untuk Salad: Sos dan Hidangan Sejuk",
    "metaDescription": "Nisbah sos tiga banding satu, tiga campuran dengan limau kasturi, madu dan mustard, padanan kerabu dan ulam, kos sehidangan, dan cara simpan botol.",
    "focusKeyword": "minyak zaitun untuk salad",
    "relatedKeywords": [
      "olive oil untuk salad",
      "sos salad minyak zaitun",
      "salad dressing minyak zaitun",
      "minyak zaitun mentah",
      "cara buat sos salad sendiri",
      "minyak zaitun dengan limau kasturi",
      "minyak zaitun untuk kerabu",
      "minyak zaitun untuk ulam",
      "minyak zaitun extra virgin salad",
      "vinaigrette ala Malaysia",
      "harga minyak zaitun 250ml",
      "minyak zaitun infused rosemary basil"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun untuk Salad",
      "Sos dan Perapan",
      "Kerabu dan Ulam",
      "Dapur Malaysia",
      "Infused Collection"
    ],
    "h1": "Minyak Zaitun untuk Salad dan Hidangan Sejuk di Meja Malaysia",
    "excerpt": "Nisbah sos yang mudah diingat, tiga campuran daripada bahan yang dapur kita sudah ada, dan berapa sebenarnya kos satu hidangan.",
    "keyTakeaway": "Minyak zaitun untuk salad digunakan mentah, jadi rasanya kekal seperti dalam botol. Mulakan dengan tiga bahagian minyak kepada satu bahagian masam — jus limau kasturi atau cuka — kemudian garam dan sedikit madu. Nisbah itu cukup untuk salad, kerabu, ulam dan perapan sejuk.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukSaladHero",
      "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-salad.jpg",
    "intro": [
      "Kebanyakan orang beli minyak zaitun untuk kuali. Sedangkan tempat ia paling ketara bukan di atas api, tetapi di dalam mangkuk salad yang sejuk.",
      "Sebabnya mudah. Minyak yang tidak dipanaskan kekal seperti masa ia keluar dari botol — pahit sedikit di hujung lidah, pedas halus di kerongkong.",
      "Artikel ini pasal minyak zaitun untuk salad: satu nisbah, tiga campuran, padanan kerabu dan ulam, dan kos sehidangan."
    ],
    "sections": [
      {
        "heading": "Kenapa salad tempat minyak zaitun paling menonjol",
        "id": "kenapa-salad",
        "blocks": [
          {
            "type": "p",
            "text": "Sebab tiada haba yang mengubahnya. Rasa minyak zaitun dara datang daripada sebatian yang lembut terhadap suhu, jadi apa yang anda hidu di mulut botol itulah yang sampai ke pinggan. Dalam sos salad, minyak bukan sekadar pembawa — ia salah satu perisa utama, sama seperti garam dan limau."
          },
          {
            "type": "p",
            "text": "Untuk penggunaan berhaba pula, ada peraturannya sendiri dalam [panduan minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSaladInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Nisbah asas: tiga bahagian minyak, satu bahagian masam",
        "id": "nisbah-asas",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga sudu besar minyak zaitun kepada satu sudu besar bahan masam. Itu konvensyen dapur yang dipakai di mana-mana, dan ia berkesan sebab masam yang terlalu banyak akan menenggelamkan sayur. Kacau garam ke dalam bahan masam dahulu supaya ia larut, baru masukkan minyak sambil dipukul."
          },
          {
            "type": "ol",
            "items": [
              "Perah satu sudu besar jus limau kasturi atau cuka ke dalam mangkuk kecil.",
              "Masukkan secubit garam dan kacau sehingga larut.",
              "Titiskan tiga sudu besar minyak zaitun sambil dipukul dengan garfu.",
              "Rasa dengan sehelai daun salad, bukan dengan sudu."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSaladInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          },
          {
            "type": "note",
            "title": "Kalau ia terpisah",
            "text": "Itu normal. Setengah sudu kecil mustard atau madu mengikatnya lebih lama. Kalau tiada, kacau semula sebelum tuang."
          }
        ]
      },
      {
        "heading": "Tiga campuran daripada bahan yang dapur kita sudah ada",
        "id": "tiga-campuran",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga versi daripada nisbah yang sama, tanpa perlu membeli apa-apa yang pelik. Yang pertama untuk salad harian, kedua untuk sayur yang lebih tebal seperti timun dan kobis, ketiga untuk perapan ayam atau ikan sebelum dipanggang. Semuanya menggunakan tiga sudu besar minyak."
          },
          {
            "type": "ul",
            "items": [
              "**Limau kasturi dan madu** — jus dua biji limau kasturi, setengah sudu kecil madu, secubit garam. Ringan dan wangi.",
              "**Cuka dan mustard** — satu sudu besar cuka, setengah sudu kecil mustard, sedikit lada hitam. Lebih tajam, tahan lebih lama dalam mangkuk.",
              "**Bawang dan cili** — satu sudu besar cuka, bawang merah dihiris nipis, cili merah dibuang biji."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSaladInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Kerabu, ulam dan hidangan sejuk yang lain",
        "id": "kerabu-dan-ulam",
        "blocks": [
          {
            "type": "p",
            "text": "Kerabu dan sos salad sebenarnya keluarga yang sama: sayur mentah, bahan masam, garam dan lemak. Bezanya kerabu selalunya guna kelapa parut atau santan. Tukar sebahagian daripadanya dengan minyak zaitun dan rasa kerabu jadi lebih ringan, tetapi kekerasan sayur itu masih terasa."
          },
          {
            "type": "ul",
            "items": [
              "Kerabu timun atau mangga muda — minyak zaitun menggantikan sebahagian santan.",
              "Ulam raja, pegaga dan kacang botol — cicah dengan minyak bercampur limau, bukan disiram.",
              "Salad kentang atau pasta sejuk — gaul minyak semasa masih suam supaya ia melekat."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSaladInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Perisa infusion mana untuk salad mana",
        "id": "infusion-untuk-salad",
        "blocks": [
          {
            "type": "p",
            "text": "Infused Collection ialah minyak zaitun sejuk-tekan yang sama, diserapkan dengan botani untuk memasak. Dalam hidangan sejuk perisanya lebih ketara sebab tiada haba yang melembutkannya. Guna sedikit dahulu, kacau, kemudian tambah kalau perlu. Enam pilihan itu dijual dalam botol 250 ml sahaja pada harga RM75.00."
          },
          {
            "type": "table",
            "head": [
              "Perisa",
              "Padanan sejuk"
            ],
            "rows": [
              [
                "Rosemary-basil",
                "Salad tomato, pasta sejuk, roti cicah"
              ],
              [
                "Wild thyme",
                "Kerabu timun, telur rebus, keju putih"
              ],
              [
                "Fennel-anise",
                "Salad buah, epal dan lobak"
              ],
              [
                "Turmeric-black pepper",
                "Perapan ayam sejuk, salad kentang"
              ],
              [
                "Lavender-chamomile",
                "Salad buah dan hidangan manis"
              ],
              [
                "Blackseed",
                "Ulam, roti dan buah zaitun"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSaladInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          },
          {
            "type": "p",
            "text": "Semua enam ada di halaman [produk](/products), termasuk [rosemary-basil](/products/infused-extra-virgin-olive-oil-rosemary-basil)."
          }
        ]
      },
      {
        "heading": "Berapa kos satu hidangan",
        "id": "kos-satu-hidangan",
        "blocks": [
          {
            "type": "p",
            "text": "Botol 250 ml berharga RM59.00, iaitu RM236 seliter. Daripada situ senang dikira: satu sudu besar lebih kurang 15 ml. Sos untuk empat orang guna tiga sudu besar minyak, jadi kos minyak dalam mangkuk itu lebih rendah daripada yang orang sangka."
          },
          {
            "type": "table",
            "head": [
              "Sukatan",
              "Isi padu",
              "Kos pada RM236 seliter"
            ],
            "rows": [
              [
                "Satu sudu besar",
                "15 ml",
                "RM3.54"
              ],
              [
                "Sos untuk empat orang",
                "45 ml",
                "RM10.62"
              ],
              [
                "Sekali hidang",
                "kira-kira 11 ml",
                "RM2.66"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSaladInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          },
          {
            "type": "p",
            "text": "Botol 500 ml pada RM109.00 turun kepada RM218 seliter — lebih murah setiap titis, kalau rumah anda memang habiskan botol."
          }
        ]
      },
      {
        "heading": "Menyimpan botol yang dibuka dalam dapur panas",
        "id": "simpan-botol",
        "blocks": [
          {
            "type": "p",
            "text": "Cahaya, haba dan udara yang merosakkan rasa minyak zaitun, dan dapur Malaysia ada ketiga-tiganya sekali gus. Kaca gelap sudah menahan sebahagian daripada cahaya itu. Selebihnya bergantung pada tempat anda letakkan botol, seberapa rapat tutupnya selepas guna, dan berapa lama botol itu sudah terbuka."
          },
          {
            "type": "ul",
            "items": [
              "Jauhkan dari dapur gas, ketuhar dan tingkap yang terkena matahari petang.",
              "Tutup rapat selepas guna — udara yang perlahan-lahan menumpulkan rasa.",
              "Simpan dalam kabinet tertutup, bukan di atas rak terbuka sebelah kuali.",
              "Kalau rumah jarang guna, pilih 250 ml supaya botol habis semasa rasanya masih tajam."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSaladInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Mula dengan satu mangkuk",
      "blocks": [
        {
          "type": "p",
          "text": "Tak perlu tukar seluruh cara masak. Ambil satu mangkuk kecil, satu sudu besar jus limau kasturi, secubit garam dan tiga sudu besar minyak. Pukul, rasa, siram atas sayur yang ada."
        },
        {
          "type": "p",
          "text": "Kalau nisbah itu menjadi, barulah fikir pasal perisa dan saiz botol. [Lihat tempat membeli](/shop) untuk cawangan Berkat Madinah."
        }
      ]
    },
    "faqs": [
      {
        "q": "Minyak zaitun jenis mana sesuai untuk salad?",
        "a": "Extra virgin, sebab ia tidak ditapis dan rasanya kekal. Minyak yang ditapis memang lebih neutral, tetapi dalam sos salad ia tidak menyumbang apa-apa rasa."
      },
      {
        "q": "Berapa nisbah minyak dengan cuka untuk sos salad?",
        "a": "Tiga bahagian minyak kepada satu bahagian bahan masam. Kalau anda suka lebih tajam, naikkan bahan masam sedikit demi sedikit dan rasa setiap kali sebelum menambah lagi."
      },
      {
        "q": "Boleh guna limau kasturi ganti cuka?",
        "a": "Boleh, dan ia lebih dekat dengan selera kita. Jus limau kasturi lebih wangi dan kurang tajam daripada cuka. Perah segar sebelum guna."
      },
      {
        "q": "Kenapa sos salad saya terpisah selepas beberapa minit?",
        "a": "Minyak dan air memang tidak bercampur lama. Setengah sudu kecil mustard atau madu membantu mengikatnya. Kalau tiada, kacau semula dengan garfu sebelum tuang."
      },
      {
        "q": "Boleh guna minyak zaitun dalam kerabu?",
        "a": "Boleh. Gantikan sebahagian kelapa parut atau santan dengan minyak zaitun dan tambah limau. Rasa kerabu jadi lebih ringan tetapi tekstur sayur mentah itu tidak berubah."
      },
      {
        "q": "Perlu ke simpan minyak zaitun dalam peti sejuk?",
        "a": "Tidak perlu. Kabinet tertutup yang jauh dari dapur sudah memadai. Dalam peti sejuk minyak akan berkabus dan pekat, dan perlu kembali ke suhu bilik sebelum dituang."
      },
      {
        "q": "Berapa harga minyak zaitun Arabian Village?",
        "a": "Minyak Zaitun Extra Virgin Palestin berharga RM59.00 untuk 250 ml dan RM109.00 untuk 500 ml; versi Organik RM69.00 dan RM129.00. Setiap perisa Infused Collection hanya dalam botol 250 ml, pada harga RM75.00."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun sejuk-tekan asal Palestin dalam saiz 250 ml dan 500 ml, serta enam perisa Infused Collection."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Bila minyak zaitun menjadi di dalam kuali dan bila lebih baik guna minyak lain."
      },
      {
        "label": "Harga minyak zaitun di Malaysia",
        "path": "blog/harga-minyak-zaitun-di-malaysia",
        "description": "Perbandingan seliter antara saiz 250 ml dan 500 ml, dan apa yang ada di sebalik harga itu."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah."
      },
      {
        "label": "Resepi mudah dengan minyak zaitun",
        "path": "blog/resepi-mudah-dengan-minyak-zaitun",
        "description": "Empat resepi ringkas dengan sukatan, untuk malam ini."
      },
      {
        "label": "Minyak zaitun untuk roti dan cicahan",
        "path": "blog/minyak-zaitun-untuk-roti-dan-cicahan",
        "description": "Guna tanpa panas menunjukkan watak sebenar minyak."
      }
    ]
  },
  /* ---------------- PRESS round 2 ---------------- */
  {
    "id": "zaitun-dalam-al-quran",
    "slug": "pokok-zaitun-dalam-al-quran-dan-warisan-palestin",
    "seoTitle": "Zaitun dalam Al-Quran dan Warisan Ladang Palestin",
    "metaTitle": "Zaitun dalam Al-Quran dan Warisan Ladang Palestin",
    "metaDescription": "Ayat yang menyebut zaitun dalam Al-Quran, lengkap dengan surah dan nombor ayat, serta kisah ladang keluarga dan musim tuaian zaitun di Palestin.",
    "focusKeyword": "zaitun dalam al quran",
    "relatedKeywords": [
      "pokok zaitun dalam al quran",
      "ayat tentang zaitun",
      "surah at-tin buah zaitun",
      "surah an-nur pokok zaitun",
      "zaitun disebut dalam al quran",
      "buah tin dan zaitun",
      "pokok zaitun palestin",
      "ladang zaitun keluarga",
      "musim tuaian zaitun",
      "minyak zaitun palestin",
      "warisan zaitun palestin",
      "minyak zaitun satu sumber"
    ],
    "category": "Warisan",
    "tags": [
      "zaitun dalam al quran",
      "warisan palestin",
      "ladang zaitun",
      "musim tuaian"
    ],
    "h1": "Zaitun dalam Al-Quran dan warisan ladang zaitun Palestin",
    "excerpt": "Ayat-ayat yang menyebut zaitun dalam Al-Quran beserta rujukan surah dan nombor ayat, dan kisah ladang keluarga di Palestin yang menjaga pokok itu turun-temurun.",
    "keyTakeaway": "Zaitun disebut namanya dalam beberapa tempat di dalam Al-Quran, antaranya Surah At-Tin 95:1, Surah An-Nur 24:35, Surah Al-An'am 6:99 dan 6:141, serta Surah An-Nahl 16:11. Di Palestin pula, pokok yang sama menjadi tanaman keluarga yang dituai setiap musim luruh dan diwarisi turun-temurun.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 4,
    "hero": {
      "src": "pressZaitunDalamAlQuranHero",
      "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
    },
    "ogImage": "/og/blog-zaitun-dalam-al-quran.jpg",
    "intro": [
      "Pokok zaitun bukan nama asing bagi pembaca Muslim di Malaysia. Namanya muncul dalam beberapa surah, dan buahnya sudah dikenali di rantau Mediterranean lama sebelum minyaknya sampai ke rak kedai di sini.",
      "Artikel ini mengumpulkan rujukan zaitun dalam Al-Quran mengikut surah dan nombor ayat, supaya anda boleh menyemaknya sendiri dalam mushaf. Selepas itu ia beralih kepada sisi yang jarang ditulis: ladang keluarga di Palestin, musim tuaian pada musim luruh, dan bagaimana sebotol minyak satu sumber sampai ke meja keluarga di Malaysia."
    ],
    "sections": [
      {
        "heading": "Di mana zaitun disebut dalam Al-Quran?",
        "id": "sebutan-dalam-al-quran",
        "blocks": [
          {
            "type": "p",
            "text": "Zaitun disebut namanya dalam beberapa tempat di dalam Al-Quran. Antaranya Surah At-Tin ayat 1, Surah An-Nur ayat 35, Surah Al-An'am ayat 99 dan ayat 141, serta Surah An-Nahl ayat 11. Dalam kebanyakan tempat itu, zaitun muncul bersama tanaman lain yang dikenali penduduk rantau tersebut, seperti buah tin, anggur, delima dan kurma."
          },
          {
            "type": "table",
            "head": [
              "Surah",
              "Rujukan",
              "Disebut bersama"
            ],
            "rows": [
              [
                "At-Tin",
                "95:1",
                "Buah tin"
              ],
              [
                "An-Nur",
                "24:35",
                "Perumpamaan pelita dan pokok zaitun"
              ],
              [
                "Al-An'am",
                "6:99",
                "Anggur dan delima"
              ],
              [
                "Al-An'am",
                "6:141",
                "Kurma, tanaman dan delima"
              ],
              [
                "An-Nahl",
                "16:11",
                "Tanaman, pokok kurma dan anggur"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressZaitunDalamAlQuranInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          },
          {
            "type": "p",
            "text": "Nombor pertama ialah nombor surah dan nombor kedua ialah nombor ayat. Setiap petikan di bawah ialah terjemahan makna, bukan teks Arabnya."
          }
        ]
      },
      {
        "heading": "Surah At-Tin (95:1) dan Surah An-Nur (24:35)",
        "id": "at-tin-dan-an-nur",
        "blocks": [
          {
            "type": "p",
            "text": "Surah At-Tin dibuka dengan menyebut dua buah sekali gus: “Demi buah tin dan buah zaitun” (At-Tin 95:1). Dalam Surah An-Nur pula, sebahagian daripada ayat 35 menyebut pelita “yang dinyalakan daripada pokok yang banyak berkatnya, iaitu pokok zaitun yang bukan di timur dan bukan di barat” (An-Nur 24:35)."
          },
          {
            "type": "p",
            "text": "Ayat 35 Surah An-Nur panjang, dan yang dipetik di sini hanyalah bahagian yang menyebut pokok zaitun. Untuk membacanya penuh, rujuk mushaf atau terjemahan rasmi yang anda pegang."
          },
          {
            "type": "image",
            "src": "pressZaitunDalamAlQuranInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          },
          {
            "type": "note",
            "title": "Cara membaca rujukan ayat",
            "text": "95:1 bermaksud surah ke-95, ayat pertama. Menulis rujukan begitu memudahkan sesiapa menyemak semula ayat itu sendiri."
          }
        ]
      },
      {
        "heading": "Zaitun dalam Surah Al-An'am dan Surah An-Nahl",
        "id": "al-anam-dan-an-nahl",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga ayat lagi menyebut zaitun sebagai hasil yang tumbuh dari bumi. Surah Al-An'am ayat 99 menyebut “kebun-kebun anggur, dan zaitun serta delima, yang serupa dan yang tidak serupa”. Ayat 141 dalam surah yang sama menyebut pokok kurma dan tanaman yang berbeza-beza rasanya, bersama zaitun dan delima. Surah An-Nahl ayat 11 pula menyebut tanaman, zaitun, pokok kurma dan anggur."
          },
          {
            "type": "p",
            "text": "Nama itu kekal sampai hari ini. Dalam bahasa Arab, buahnya disebut zaytun dan minyaknya zayt az-zaytun. Dalam bahasa Melayu kita menyebutnya zaitun dan minyak zaitun."
          },
          {
            "type": "image",
            "src": "pressZaitunDalamAlQuranInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Pokok zaitun dalam kehidupan keluarga Palestin",
        "id": "warisan-keluarga-palestin",
        "blocks": [
          {
            "type": "p",
            "text": "Di Palestin, ladang zaitun selalunya milik keluarga dan diwarisi turun-temurun. Petaknya kecil, letaknya di lereng berbatu, dan sebahagian pokoknya lebih tua daripada keluarga yang menjaganya hari ini. Minyak zaitun di rumah begitu bukan barang mewah. Ia minyak harian: untuk mencelup roti, untuk memasak, dan disimpan dalam tin besar sepanjang tahun."
          },
          {
            "type": "ul",
            "items": [
              "Ladang keluarga: petak kecil yang dijaga beberapa generasi dalam satu keluarga.",
              "Pokok tua: batang berlingkar dan berongga, tanda pokok yang sudah lama hidup.",
              "Simpanan setahun: hasil satu musim disimpan dalam tin dan digunakan sehingga musim berikutnya.",
              "Kerja bersama: tuaian dibuat beramai-ramai, bukan oleh seorang."
            ]
          },
          {
            "type": "image",
            "src": "pressZaitunDalamAlQuranInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          },
          {
            "type": "p",
            "text": "Sebab itu pokok zaitun muncul dalam cerita keluarga di sana, bukan hanya di ladang."
          }
        ]
      },
      {
        "heading": "Musim tuaian zaitun dan kerja di ladang",
        "id": "musim-tuaian",
        "blocks": [
          {
            "type": "p",
            "text": "Musim tuaian zaitun di rantau Mediterranean jatuh pada musim luruh, secara amnya sekitar Oktober hingga November. Tarikh tepatnya berubah setiap tahun mengikut cuaca dan kematangan buah. Buah dikutip dengan tangan atau disikat turun ke atas jaring yang dibentang di bawah pokok, kemudian dibawa ke kilang perahan secepat mungkin."
          },
          {
            "type": "p",
            "text": "Masa antara petik dan perah penting kerana buah yang tertunggu lama mula berubah. Perahan sejuk bermaksud minyak dipisahkan tanpa haba tambahan, jadi rasa dan bau buah itu kekal dalam minyaknya. Perjalanan penuh dari ladang ke botol ditulis dalam [minyak zaitun Palestin dari ladang ke botol](/blog/minyak-zaitun-palestin-dari-ladang-ke-botol)."
          },
          {
            "type": "image",
            "src": "pressZaitunDalamAlQuranInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Dari ladang Palestin ke meja keluarga Malaysia",
        "id": "dari-ladang-ke-meja-malaysia",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun Arabian Village ialah minyak zaitun dara extra perahan sejuk satu sumber dari Palestin. Di Malaysia ia diedarkan oleh Berkat Madinah Store, pengedar rasmi dan satu-satunya. Botol 250 ml berharga RM59.00 dan botol 500 ml RM109.00; versi Organik RM69.00 dan RM129.00. Setiap rasa Koleksi Infusi hanya dalam botol 250 ml, pada harga RM75.00."
          },
          {
            "type": "p",
            "text": "Kedai itu ada lima cawangan di Selangor: Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak, dan stok boleh berbeza ikut cawangan. Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad. Untuk cawangan lain dan hari perayaan seperti Hari Raya, sahkan waktu buka dahulu melalui WhatsApp. Kaunter Shopee dan TikTok Shop juga dikendalikan oleh Berkat Madinah sendiri, bukan penjual lain."
          },
          {
            "type": "image",
            "src": "pressZaitunDalamAlQuranInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          },
          {
            "type": "p",
            "text": "Alamat penuh dan cara menghubungi kedai ada di [halaman kedai](/shop), dan botol serta saiz yang ada boleh dilihat di [halaman produk](/products)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Teks, ladang dan sebotol minyak",
      "blocks": [
        {
          "type": "p",
          "text": "Rujukan zaitun dalam Al-Quran mudah disemak sendiri: At-Tin 95:1, An-Nur 24:35, Al-An'am 6:99 dan 6:141, serta An-Nahl 16:11. Bacalah terus dari mushaf, bukan dari petikan orang."
        },
        {
          "type": "p",
          "text": "Selebihnya ialah cerita manusia: keluarga, ladang berbatu, dan musim tuaian yang berulang setiap musim luruh. Sebotol minyak satu sumber ialah cara paling ringkas untuk membawa sedikit daripada cerita itu ke dapur sendiri."
        }
      ]
    },
    "faqs": [
      {
        "q": "Ayat mana yang menyebut zaitun dalam Al-Quran?",
        "a": "Antaranya Surah At-Tin 95:1, Surah An-Nur 24:35, Surah Al-An'am 6:99 dan 6:141, serta Surah An-Nahl 16:11."
      },
      {
        "q": "Apa maksud rujukan seperti 95:1?",
        "a": "Nombor pertama ialah nombor surah dan nombor kedua ialah nombor ayat. Jadi 95:1 bermaksud Surah At-Tin, ayat pertama."
      },
      {
        "q": "Adakah Surah An-Nur menyebut pokok zaitun?",
        "a": "Ya. Sebahagian daripada ayat 35 menyebut pelita yang dinyalakan daripada pokok zaitun. Ayat itu panjang, jadi eloklah dibaca penuh dalam mushaf."
      },
      {
        "q": "Adakah artikel ini menerangkan tafsir ayat?",
        "a": "Tidak. Di sini ayat hanya dipetik dengan rujukan surah dan nombor ayatnya. Untuk tafsir, rujuk kitab tafsir atau orang yang berkelayakan."
      },
      {
        "q": "Bila musim tuaian zaitun berlangsung?",
        "a": "Pada musim luruh di rantau Mediterranean, secara amnya sekitar Oktober hingga November, bergantung kepada cuaca dan kematangan buah tahun itu."
      },
      {
        "q": "Dari mana asal minyak zaitun Arabian Village?",
        "a": "Dari Palestin. Ia minyak zaitun dara extra perahan sejuk satu sumber, bukan adunan minyak dari beberapa buah negara."
      },
      {
        "q": "Berapa harganya di Malaysia dan di mana boleh beli?",
        "a": "Minyak Zaitun Extra Virgin Palestin berharga RM59.00 untuk 250 ml dan RM109.00 untuk 500 ml, melalui lima cawangan Berkat Madinah Store di Selangor (Ampang, Kajang, Shah Alam, Cash & Carry di Ampang dan Sri Gombak), atau kaunter Shopee dan TikTok Shop mereka."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun Palestin: dari ladang ke botol",
        "path": "blog/minyak-zaitun-palestin-dari-ladang-ke-botol",
        "description": "Musim tuaian, perahan sejuk dan perjalanan minyak satu sumber sehingga sampai ke botol."
      },
      {
        "label": "Minyak zaitun Arabian Village",
        "path": "products",
        "description": "Minyak klasik perahan sejuk dan enam rasa Koleksi Infusi, semuanya asal Palestin."
      },
      {
        "label": "Kenapa kami pilih satu sumber",
        "path": "why-us",
        "description": "Bagaimana satu asal dan satu pengedar menjadikan label pada botol itu boleh disemak."
      },
      {
        "label": "Tempat membeli di Malaysia",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu buka, serta kaunter dalam talian rasmi."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "botol-minyak-zaitun",
    "slug": "botol-minyak-zaitun-kaca-gelap-dan-saiz",
    "seoTitle": "Botol Minyak Zaitun: Kaca Gelap dan Saiz Mana",
    "metaTitle": "Botol Minyak Zaitun: Kaca Gelap dan Saiz Mana",
    "metaDescription": "Kenapa kaca gelap, apa bezanya dengan plastik dan tin, saiz 250 ml lawan 500 ml ikut kadar guna dapur, tutup dan penuang, dan botol yang sudah kosong.",
    "focusKeyword": "botol minyak zaitun",
    "relatedKeywords": [
      "botol minyak zaitun kaca",
      "botol kaca gelap minyak zaitun",
      "saiz botol minyak zaitun",
      "minyak zaitun 250ml",
      "minyak zaitun 500ml",
      "botol minyak zaitun kosong",
      "bekas simpan minyak zaitun",
      "tutup botol minyak zaitun",
      "botol minyak zaitun plastik",
      "olive oil bottle Malaysia"
    ],
    "category": "Panduan Pembeli",
    "tags": [
      "Botol Minyak Zaitun",
      "Kaca Gelap",
      "Saiz dan Harga",
      "Penyimpanan",
      "Dapur Malaysia"
    ],
    "h1": "Botol Minyak Zaitun: Kaca Gelap, Saiz dan Tutup yang Betul",
    "excerpt": "Bahan botol, saiz yang padan dengan kadar guna dapur anda, tutup yang rapat, dan apa nak buat dengan botol yang sudah kosong.",
    "keyTakeaway": "Botol minyak zaitun yang baik ialah kaca berwarna gelap dengan tutup skru yang menutup rapat. Kaca tidak menyerap bau dan warna gelap menapis sebahagian cahaya. Pilih saiz mengikut kadar guna dapur anda: botol yang habis dalam sebulan atau dua selepas dibuka kekal lebih tajam rasanya daripada botol besar yang bertahan setahun.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressBotolMinyakZaitunHero",
      "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
    },
    "ogImage": "/og/blog-botol-minyak-zaitun.jpg",
    "intro": [
      "Botol bukan sekadar bekas. Ia yang menentukan berapa lama rasa minyak di dalamnya bertahan selepas anda buka tutup kali pertama.",
      "Tiga perkara menumpulkan rasa minyak zaitun: cahaya, udara dan haba. Bahan botol menahan yang pertama, dan saiz botol menentukan berapa lama minyak terdedah kepada yang kedua.",
      "Di bawah ini: kaca gelap lawan plastik lawan tin, saiz mana untuk isi rumah mana, tutup dan penuang, dan botol yang sudah kosong."
    ],
    "sections": [
      {
        "heading": "Kenapa bahan dan saiz botol mengubah rasa",
        "id": "kenapa-botol-penting",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun berubah rasa apabila terdedah kepada cahaya, oksigen dan haba. Botol menentukan berapa banyak cahaya masuk, dan berapa banyak udara duduk di atas paras minyak setiap kali tutup dibuka. Kaca hijau gelap menapis sebahagian besar cahaya yang cuba menembusi, manakala botol jernih di atas rak terbuka membiarkan semuanya masuk."
          },
          {
            "type": "note",
            "title": "Bekas, bukan kandungan",
            "text": "Harga isi botol ada dalam [harga minyak zaitun di Malaysia](/blog/harga-minyak-zaitun-di-malaysia)."
          },
          {
            "type": "image",
            "src": "pressBotolMinyakZaitunInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Kaca gelap, plastik atau tin",
        "id": "kaca-plastik-tin",
        "blocks": [
          {
            "type": "p",
            "text": "Kaca gelap ialah pilihan lazim untuk minyak zaitun dara kerana kaca tidak bertindak balas dengan minyak dan warna hijau atau coklat menapis cahaya yang paling cepat menumpulkan rasa. Tin logam pula menghalang cahaya sepenuhnya tetapi anda tidak nampak isinya. Botol plastik jernih paling murah dibuat, dan paling lemah terhadap cahaya."
          },
          {
            "type": "table",
            "head": [
              "Bekas",
              "Cahaya",
              "Sesuai untuk"
            ],
            "rows": [
              [
                "Kaca hijau atau coklat gelap",
                "Ditapis sebahagian besar",
                "Botol harian di dapur"
              ],
              [
                "Kaca jernih",
                "Menembusi sepenuhnya",
                "Hanya jika disimpan dalam kabinet"
              ],
              [
                "Tin logam",
                "Terhalang sepenuhnya",
                "Belian besar, tuang ke botol kecil"
              ],
              [
                "Plastik jernih",
                "Menembusi",
                "Pindahan sementara sahaja"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressBotolMinyakZaitunInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Saiz mana untuk isi rumah mana",
        "id": "saiz-mana",
        "blocks": [
          {
            "type": "p",
            "text": "Pilih saiz ikut berapa lama satu botol bertahan di dapur anda, bukan ikut harga seliter. Satu sudu besar lebih kurang 15 ml, jadi kadar guna senang dianggar. Isi rumah yang guna minyak zaitun untuk sos salad hujung minggu sahaja akan ambil masa jauh lebih lama menghabiskan botol berbanding rumah yang tumis hampir setiap malam."
          },
          {
            "type": "table",
            "head": [
              "Kadar guna seminggu",
              "Saiz sesuai",
              "Berapa lama satu botol"
            ],
            "rows": [
              [
                "Kira-kira 30 ml, dua sudu besar",
                "250 ml",
                "Lapan minggu"
              ],
              [
                "Kira-kira 60 ml",
                "250 ml",
                "Empat minggu"
              ],
              [
                "Kira-kira 120 ml",
                "500 ml",
                "Empat minggu"
              ],
              [
                "Kira-kira 250 ml",
                "500 ml",
                "Dua minggu"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressBotolMinyakZaitunInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          },
          {
            "type": "p",
            "text": "Botol 500 ml lebih murah setiap mililiter, tetapi jimat itu hanya menjadi kalau botol memang habis. Kedua-dua saiz ada di halaman [produk](/products)."
          }
        ]
      },
      {
        "heading": "Tutup, penuang dan mulut botol",
        "id": "tutup-dan-penuang",
        "blocks": [
          {
            "type": "p",
            "text": "Tutup yang rapat lebih penting daripada bentuk botol. Setiap kali botol dibuka, udara baharu masuk dan duduk di atas minyak sehingga kali seterusnya. Tutup skru dengan lapisan dalam menutup lebih rapat daripada gabus yang sudah longgar, dan penuang yang dipasang kekal di leher botol selalunya tidak boleh ditutup langsung."
          },
          {
            "type": "ul",
            "items": [
              "Tutup semula sebaik selesai menuang, bukan selepas habis masak.",
              "Lap bibir botol dengan kain kering — sisa minyak di situ melekit dan menarik habuk.",
              "Mulut sempit senang dikawal; mulut lebar cepat tercurah lebih daripada yang dirancang."
            ]
          },
          {
            "type": "image",
            "src": "pressBotolMinyakZaitunInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Botol yang sudah kosong",
        "id": "botol-kosong",
        "blocks": [
          {
            "type": "p",
            "text": "Botol kaca gelap yang kosong masih berguna, tetapi jangan isi minyak baharu melainkan ia dicuci dan dikeringkan betul-betul. Sisa minyak lama di dinding botol akan bercampur dengan minyak segar dan menumpulkan rasanya. Air panas dengan sedikit pencuci pinggan, bilas, kemudian terbalikkan sehingga kering sepenuhnya."
          },
          {
            "type": "ul",
            "items": [
              "Botol kecil untuk sos salad yang sudah dikacau, disimpan di pintu peti sejuk.",
              "Bekas cuka atau air limau di atas meja makan.",
              "Kitar semula kaca — asingkan tutup logam atau plastik dahulu."
            ]
          },
          {
            "type": "image",
            "src": "pressBotolMinyakZaitunInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Melihat botol itu sendiri sebelum membeli",
        "id": "lihat-sebelum-beli",
        "blocks": [
          {
            "type": "p",
            "text": "Botol yang dipegang di tangan memberitahu lebih banyak daripada gambar produk. Anda dapat lihat tebal kacanya, jenis tutupnya, dan sama ada ada penutup keselamatan di bawah tutup skru. Arabian Village dijual di lima cawangan Berkat Madinah Store di Selangor: Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak."
          },
          {
            "type": "p",
            "text": "Kaunter Shopee dan TikTok Shop itu milik penjual yang sama. Alamat dan waktu operasi ada di halaman [tempat membeli](/shop)."
          },
          {
            "type": "image",
            "src": "pressBotolMinyakZaitunInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Botol yang betul, saiz yang betul",
      "blocks": [
        {
          "type": "p",
          "text": "Kaca gelap, tutup skru yang rapat, dan saiz yang dapur anda habiskan dalam sebulan atau dua. Selebihnya bergantung pada tempat botol itu berdiri selepas anda meletakkannya."
        },
        {
          "type": "p",
          "text": "[Cara menilai jenama minyak zaitun](/blog/cara-menilai-jenama-minyak-zaitun) melihat apa yang tertulis pada botol dan apa yang tidak."
        }
      ]
    },
    "faqs": [
      {
        "q": "Kenapa minyak zaitun dijual dalam botol kaca gelap?",
        "a": "Cahaya mempercepatkan perubahan rasa minyak zaitun, dan kaca hijau atau coklat menapis sebahagian besar cahaya yang cuba menembusi. Kaca juga tidak bertindak balas dengan minyak atau menyerap bau, jadi rasa dalam botol kekal seperti masa ia diisi. Botol jernih pula memerlukan kabinet tertutup."
      },
      {
        "q": "Berapa lama satu botol 250 ml bertahan?",
        "a": "Ikut kadar guna dapur anda. Rumah yang memakai kira-kira 30 ml seminggu — dua sudu besar untuk sos salad — mengambil lapan minggu, manakala rumah yang tumis hampir setiap malam menghabiskannya dalam empat. Perbandingan harga antara dua saiz pula ada dalam [harga minyak zaitun di Malaysia](/blog/harga-minyak-zaitun-di-malaysia)."
      },
      {
        "q": "Boleh simpan minyak zaitun dalam botol plastik?",
        "a": "Boleh untuk tempoh singkat, tetapi bukan untuk botol yang duduk berbulan di dapur. Plastik jernih membiarkan cahaya masuk dan dindingnya lebih telap udara berbanding kaca. Kalau anda memindahkan minyak ke botol plastik, pindahkan sedikit sahaja dan habiskan dalam beberapa hari."
      },
      {
        "q": "Perlu tukar botol kalau beli minyak zaitun dalam tin?",
        "a": "Kalau tin itu besar, ya. Tin menghalang cahaya sepenuhnya, tetapi setiap kali dibuka udara masuk ke ruang yang semakin lapang. Tuang sebahagian ke botol kaca gelap yang kecil untuk guna harian, tutup rapat tin selebihnya, dan isi semula botol bila kosong."
      },
      {
        "q": "Boleh isi semula botol minyak zaitun yang kosong?",
        "a": "Boleh, selepas dicuci dengan air panas dan pencuci pinggan lalu dikeringkan sepenuhnya. Sisa minyak lama yang melekat di dinding botol akan bercampur dengan minyak baharu. Air yang tertinggal pula lebih teruk, kerana titisan air di dalam minyak menggalakkan perubahan rasa."
      },
      {
        "q": "Penuang yang dipasang di leher botol elok atau tidak?",
        "a": "Ia memudahkan kawalan tuangan, tetapi kebanyakan penuang tidak boleh ditutup rapat, jadi minyak terdedah kepada udara sepanjang masa. Kalau anda mahu guna penuang, pasangkannya pada botol kecil yang habis dalam beberapa hari, dan biarkan botol utama bertutup skru dalam kabinet."
      },
      {
        "q": "Berapa harga botol minyak zaitun Arabian Village?",
        "a": "Minyak Zaitun Extra Virgin Palestin berharga RM59.00 untuk botol 250 ml dan RM109.00 untuk botol 500 ml, iaitu RM236 dan RM218 seliter. Versi Organik berharga RM69.00 dan RM129.00, manakala perisa Infused Collection hanya dalam botol 250 ml, pada harga RM75.00. Kedua-dua saiz boleh dilihat di halaman produk."
      }
    ],
    "related": [
      {
        "label": "Saiz dan botol Arabian Village",
        "path": "products",
        "description": "Minyak zaitun sejuk-tekan asal Palestin dalam botol kaca 250 ml dan 500 ml, serta perisa Infused Collection."
      },
      {
        "label": "Harga minyak zaitun di Malaysia",
        "path": "blog/harga-minyak-zaitun-di-malaysia",
        "description": "Perbandingan seliter antara saiz botol, dan apa yang ada di sebalik harga itu."
      },
      {
        "label": "Cara menilai jenama minyak zaitun",
        "path": "blog/cara-menilai-jenama-minyak-zaitun",
        "description": "Apa yang tertulis pada botol, apa yang tidak, dan mana satu yang benar-benar memberitahu sesuatu."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan kaunter dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "cara-simpan-minyak-zaitun",
    "slug": "cara-simpan-minyak-zaitun",
    "seoTitle": "Cara Simpan Minyak Zaitun di Dapur Panas Malaysia",
    "metaTitle": "Cara Simpan Minyak Zaitun di Dapur Panas Malaysia",
    "metaDescription": "Rak mana dalam dapur Malaysia yang merosakkan rasa minyak zaitun, kenapa bukan dalam peti sejuk, dan berapa lama sebotol bertahan selepas dibuka.",
    "focusKeyword": "cara simpan minyak zaitun",
    "relatedKeywords": [
      "cara simpan minyak zaitun extra virgin",
      "cara simpan minyak zaitun selepas dibuka",
      "simpan minyak zaitun dalam peti sejuk",
      "minyak zaitun beku dalam peti sejuk",
      "berapa lama minyak zaitun tahan",
      "tempat simpan minyak zaitun",
      "minyak zaitun jadi keruh",
      "penyimpanan minyak zaitun di Malaysia",
      "minyak zaitun tumpul rasa"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Cara Simpan Minyak Zaitun",
      "Penyimpanan",
      "Dapur Malaysia",
      "Panduan Pembeli"
    ],
    "h1": "Cara Simpan Minyak Zaitun di Rumah Malaysia yang Panas",
    "excerpt": "Rak mana yang membunuh rasa, kenapa peti sejuk bukan tempatnya, dan berapa lama sebotol bertahan selepas tutupnya dibuka.",
    "keyTakeaway": "Cara simpan minyak zaitun di rumah Malaysia bergantung pada satu keputusan: satu tempat gelap, tertutup dan jauh dari dapur masak, dengan tutup yang dirapatkan semula setiap kali. Peti sejuk bukan tempatnya, dan botol yang sudah dibuka elok dihabiskan dalam kira-kira dua bulan.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressCaraSimpanMinyakZaitunHero",
      "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
    },
    "ogImage": "/og/blog-cara-simpan-minyak-zaitun.jpg",
    "intro": [
      "Botol minyak zaitun yang sama boleh kekal sedap beberapa bulan di satu rumah dan hilang rasanya dalam beberapa minggu di rumah sebelah. Bezanya tempat botol itu berdiri.",
      "Rumah di Malaysia panas, lembap dan dapurnya selalunya terbuka. Dapur di sini jarang sejuk, dan itu mengubah kiraan.",
      "Ini panduan cara simpan minyak zaitun di rumah sebenar: rak mana, hal peti sejuk, dan berapa lama selepas botol dibuka."
    ],
    "sections": [
      {
        "heading": "Tempat paling salah untuk letak botol",
        "id": "tempat-paling-salah",
        "blocks": [
          {
            "type": "p",
            "text": "Rak terbuka di sebelah dapur gas ialah tempat paling teruk untuk sebotol minyak zaitun. Setiap kali anda menumis, botol itu turut panas, kemudian sejuk semula apabila api ditutup. Kitaran naik turun suhu yang berulang setiap hari itulah yang menumpulkan rasa."
          },
          {
            "type": "ul",
            "items": [
              "**Sebelah dapur atau ketuhar** — haba dari kuali dan pintu ketuhar sampai ke botol.",
              "**Tepi tingkap** — cahaya matahari petang menembusi kaca dan mengubah rasa minyak.",
              "**Atas peti ais** — bahagian atas dan belakang peti membuang haba sepanjang hari."
            ]
          },
          {
            "type": "image",
            "src": "pressCaraSimpanMinyakZaitunInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Haba, cahaya dan udara, bukan kelembapan",
        "id": "haba-cahaya-udara",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga perkara mengubah rasa minyak zaitun di dalam botol: haba, cahaya dan udara. Kelembapan udara Malaysia yang tinggi tidak masuk ke dalam minyak selagi tutup dipasang rapat. Yang perlu dikawal ialah suhu yang stabil, kaca yang gelap dan tutup yang sentiasa dipulangkan ke tempatnya selepas menuang."
          },
          {
            "type": "ul",
            "items": [
              "**Haba** mempercepatkan segalanya, dan suhu yang naik turun lebih memudaratkan daripada panas yang tetap.",
              "**Cahaya** bertindak walaupun melalui kaca jernih, jadi gelap penuh lebih baik daripada teduh separuh.",
              "**Udara** masuk setiap kali tutup dibuka; botol yang tinggal separuh isi sudah separuh penuh dengan udara."
            ]
          },
          {
            "type": "image",
            "src": "pressCaraSimpanMinyakZaitunInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          },
          {
            "type": "p",
            "text": "Bahan dan saiz botol itu kerja artikel lain — [botol minyak zaitun: kaca gelap dan saiz](/blog/botol-minyak-zaitun-kaca-gelap-dan-saiz) — dan di sini kita tinggal pada tempat, suhu dan tempoh."
          }
        ]
      },
      {
        "heading": "Jadual tempat simpan di dalam rumah",
        "id": "jadual-tempat-simpan",
        "blocks": [
          {
            "type": "p",
            "text": "Tempat terbaik dalam kebanyakan rumah Malaysia ialah kabinet dapur yang tertutup, di bahagian yang jauh dari dapur masak dan tidak dilanggar cahaya matahari. Rak jubin pada dinding dalam biasanya lebih sejuk daripada kabinet kayu di atas ketuhar. Ini perbandingan tempat yang biasa dipilih orang."
          },
          {
            "type": "table",
            "head": [
              "Tempat",
              "Masalahnya",
              "Sesuai?"
            ],
            "rows": [
              [
                "Kabinet tertutup jauh dari dapur",
                "Tiada",
                "Ya, pilihan pertama"
              ],
              [
                "Almari makanan yang kering",
                "Tiada",
                "Ya"
              ],
              [
                "Kaunter terbuka dekat tingkap",
                "Cahaya matahari terus",
                "Tidak"
              ],
              [
                "Kabinet di atas ketuhar",
                "Haba naik ke atas",
                "Tidak"
              ],
              [
                "Atas peti ais",
                "Haba dari belakang peti",
                "Tidak"
              ],
              [
                "Dalam peti sejuk",
                "Minyak jadi keruh dan pekat",
                "Tidak"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressCaraSimpanMinyakZaitunInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Peti sejuk: kenapa bukan tempatnya",
        "id": "peti-sejuk",
        "blocks": [
          {
            "type": "p",
            "text": "Jangan simpan minyak zaitun dalam peti sejuk, termasuk stok yang belum dibuka. Minyak tidak rosak di dalam sejuk, tetapi ia berkabus, menjadi keruh dan separa membeku menjadi ketulan lembut berwarna putih, dan setiap kali hendak menuang anda terpaksa menunggu botol kembali ke suhu bilik. Kabinet gelap yang jauh dari dapur masak sudah memadai."
          },
          {
            "type": "ul",
            "items": [
              "**Ketulan putih itu normal** — letakkan botol di atas kaunter satu atau dua jam dan minyak jernih semula tanpa berubah rasa.",
              "**Stok simpanan** lebih elok duduk dalam kotak asalnya di dalam almari makanan yang kering."
            ]
          },
          {
            "type": "image",
            "src": "pressCaraSimpanMinyakZaitunInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Berapa lama selepas botol dibuka",
        "id": "selepas-dibuka",
        "blocks": [
          {
            "type": "p",
            "text": "Tarikh yang tercetak pada botol ialah tarikh untuk botol yang belum dibuka. Selepas tutup dibuka kali pertama, kiraan bermula semula: rasa mula tumpul dalam beberapa bulan, lebih cepat kalau botol tinggal separuh dan disimpan di tempat panas. Habiskan botol yang sudah dibuka dalam kira-kira dua bulan."
          },
          {
            "type": "ul",
            "items": [
              "Beli saiz yang munasabah dengan kadar guna rumah anda; botol besar yang bertahan setahun bukan penjimatan.",
              "Tulis tarikh botol dibuka pada pelekat kecil di bahu botol supaya kiraan dua bulan itu bukan tekaan.",
              "Kalau baunya sudah seperti krayon atau kacang lama, rasanya memang sudah pergi."
            ]
          },
          {
            "type": "image",
            "src": "pressCaraSimpanMinyakZaitunInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          },
          {
            "type": "p",
            "text": "Saiz mana yang sesuai bergantung pada kekerapan anda masak, jadi [lihat saiz dan harga](/products) dahulu."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Satu botol, satu tempat tetap",
      "blocks": [
        {
          "type": "p",
          "text": "Pilih satu tempat gelap yang jauh dari dapur masak, dan kembalikan botol ke situ setiap kali selesai guna. Itu sahaja yang membezakan minyak yang masih tajam pada bulan ketiga dengan yang sudah hambar."
        },
        {
          "type": "p",
          "text": "Kalau anda masih memilih botol pertama, mula dengan [cara memilih minyak zaitun dara asli](/blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia), kemudian [lihat tempat membeli](/shop) untuk cawangan Berkat Madinah di Selangor."
        }
      ]
    },
    "faqs": [
      {
        "q": "Di mana tempat terbaik simpan minyak zaitun di rumah?",
        "a": "Kabinet tertutup yang jauh dari dapur masak dan tidak terkena cahaya matahari. Rak bawah atau almari makanan yang kering juga sesuai. Yang penting satu tempat gelap dengan suhu yang tidak naik turun setiap kali anda memasak, dan bukan rak terbuka di sebelah kuali."
      },
      {
        "q": "Kabinet di atas ketuhar boleh dijadikan tempat simpan?",
        "a": "Tidak, walaupun ia kabinet tertutup. Haba naik ke atas, jadi ruang tepat di atas ketuhar atau dapur gas menjadi kotak panas setiap kali anda memasak. Tiga tempat lain yang sama teruk: kaunter dekat tingkap, rak terbuka di sebelah kuali, dan atas peti ais yang membuang haba sepanjang hari."
      },
      {
        "q": "Minyak zaitun saya berketul putih, adakah ia rosak?",
        "a": "Tidak. Ketulan lembut berwarna putih itu bermakna minyak menjadi sejuk, bukan rosak. Letakkan botol di atas kaunter selama satu atau dua jam dan ia akan jernih semula tanpa mengubah rasa. Minyak zaitun memang mula pekat pada suhu rendah, dan itu bukan tanda kualiti."
      },
      {
        "q": "Kenapa suhu yang naik turun lebih memudaratkan daripada panas yang tetap?",
        "a": "Setiap kali dapur dinyalakan, botol di sebelahnya turut panas, kemudian sejuk semula selepas api ditutup. Kitaran itu berulang setiap hari dan menumpulkan rasa lebih cepat daripada satu suhu suam yang tidak berubah. Sebab itu kabinet dalam lebih baik daripada rak terbuka."
      },
      {
        "q": "Kelembapan udara Malaysia boleh merosakkan minyak zaitun?",
        "a": "Kelembapan tidak masuk ke dalam minyak selagi tutup dipasang rapat. Masalah sebenar di rumah kita ialah haba dan suhu yang naik turun sepanjang hari. Air hanya menjadi isu apabila titisan peluh dari botol yang baru keluar dari peti sejuk masuk semasa anda menuang."
      },
      {
        "q": "Berapa lama minyak zaitun tahan selepas botol dibuka?",
        "a": "Rasanya mula tumpul selepas beberapa bulan, dan lebih cepat kalau botol tinggal separuh atau disimpan di tempat panas. Habiskan botol yang sudah dibuka dalam kira-kira dua bulan, dan pilih saiz mengikut kekerapan anda memasak supaya tiada botol besar tersadai di rak."
      },
      {
        "q": "Botol yang belum dibuka perlu disimpan macam mana?",
        "a": "Sama seperti botol yang sudah dibuka, cuma ia lebih bertoleransi kerana tiada udara masuk. Simpan tegak di tempat gelap dan sejuk, jauh dari tingkap dan dapur. Kotak asal berguna di sini kerana ia menghalang cahaya sepenuhnya tanpa memerlukan ruang kabinet."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun sejuk-tekan asal Palestin dalam botol kaca gelap, dua saiz, serta enam perisa Infused Collection."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Bila minyak zaitun menjadi di dalam kuali, dan bila lebih baik anda guna minyak lain."
      },
      {
        "label": "Cara memilih minyak zaitun dara asli di Malaysia",
        "path": "blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia",
        "description": "Apa yang perlu dibaca pada botol sebelum bayar, dan tanda yang patut buat anda berhenti."
      },
      {
        "label": "Botol minyak zaitun: kaca gelap dan saiz",
        "path": "blog/botol-minyak-zaitun-kaca-gelap-dan-saiz",
        "description": "Kaca gelap lawan plastik lawan tin, saiz mana untuk kadar guna mana, dan tutup yang rapat."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan Berkat Madinah di Selangor, waktu operasi, dan saluran dalam talian."
      },
      {
        "label": "Kenapa minyak zaitun jadi keruh",
        "path": "blog/kenapa-minyak-zaitun-jadi-keruh",
        "description": "Keruh sejuk, mendapan, dan minyak yang betul-betul rosak adalah tiga perkara berbeza."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "minyak-zaitun-pomace",
    "slug": "apa-itu-minyak-zaitun-pomace",
    "seoTitle": "Minyak Zaitun Pomace: Apa Itu dan Kenapa Murah",
    "metaTitle": "Minyak Zaitun Pomace: Apa Itu dan Kenapa Murah",
    "metaDescription": "Minyak daripada hampas selepas perahan: cara ia diekstrak dengan pelarut dan ditapis, kenapa harganya jauh lebih rendah, dan cara mengenalinya pada label.",
    "focusKeyword": "minyak zaitun pomace",
    "relatedKeywords": [
      "pomace olive oil maksud",
      "minyak hampas zaitun",
      "beza pomace dan extra virgin",
      "gred minyak zaitun pomace",
      "minyak zaitun murah",
      "olive pomace oil",
      "pomace untuk menggoreng",
      "label minyak zaitun pomace",
      "minyak zaitun ditapis",
      "adakah pomace minyak zaitun sebenar",
      "harga minyak zaitun pomace",
      "hampas zaitun selepas perahan"
    ],
    "category": "Panduan Pembeli",
    "tags": [
      "Minyak Zaitun Pomace",
      "Gred Minyak Zaitun",
      "Panduan Pembeli",
      "Membaca Label"
    ],
    "h1": "Minyak Zaitun Pomace: Apa Itu dan Kenapa Harganya Jauh Lebih Murah",
    "excerpt": "Apa itu hampas zaitun, bagaimana minyak dikeluarkan daripadanya, dan kenapa botol pomace berharga jauh lebih rendah di rak yang sama.",
    "keyTakeaway": "Minyak zaitun pomace ialah minyak yang diekstrak dengan pelarut daripada hampas zaitun — kulit, isi dan serpihan biji yang tinggal selepas perahan pertama — kemudian ditapis sehingga hampir neutral. Ia sah dijual sebagai minyak zaitun, tetapi gred, rasa dan harganya berbeza daripada minyak dara yang diperah terus daripada buah.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunPomaceHero",
      "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
    },
    "ogImage": "/og/blog-minyak-zaitun-pomace.jpg",
    "intro": [
      "Dua botol pada rak yang sama, kedua-duanya bertulis olive oil. Satu berharga beberapa kali ganda daripada satu lagi.",
      "Selalunya bezanya satu perkataan kecil yang dicetak di bawah nama jenama: pomace. Ia bukan gaya pemasaran, ia gred.",
      "Di sini kita lihat daripada bahagian buah yang mana minyak itu datang, bagaimana ia dikeluarkan, kenapa harganya rendah, dan cara mengenalinya sebelum bayar."
    ],
    "sections": [
      {
        "heading": "Apa itu minyak zaitun pomace",
        "id": "apa-itu-pomace",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun pomace ialah minyak yang diekstrak daripada hampas — kulit, isi dan serpihan biji yang tinggal di dalam mesin selepas buah zaitun diperah. Hampas itu masih menyimpan sedikit minyak, tetapi minyak tersebut tidak dapat dikeluarkan dengan tekanan sahaja. Ia dikeluarkan menggunakan pelarut, kemudian ditapis sebelum layak dijual sebagai makanan."
          },
          {
            "type": "p",
            "text": "Kerana bahan mentahnya lain, hasilnya pun lain: warna kuning pucat, bau nyaris tiada, rasa zaitun hampir hilang. Gred yang lain pula dibandingkan dalam [panduan gred minyak zaitun](/blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPomaceInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Hampas yang tinggal selepas perahan pertama",
        "id": "hampas-selepas-perahan",
        "blocks": [
          {
            "type": "p",
            "text": "Selepas buah zaitun dikisar dan diperah, yang mengalir keluar ialah minyak dan air, manakala yang tertinggal ialah jisim lembap berwarna coklat gelap. Itulah hampas. Di kilang besar ia keluar bertan-tan sehari dan tidak dibuang begitu sahaja: ia dijual kepada kilang lain sebagai bahan mentah."
          },
          {
            "type": "ul",
            "items": [
              "Kulit dan isi buah yang sudah kehilangan sebahagian besar minyaknya.",
              "Serpihan biji zaitun yang hancur semasa pengisaran.",
              "Air pemprosesan yang menjadikan hampas lembap dan cepat masam.",
              "Baki minyak yang terlalu sedikit untuk diperah keluar."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPomaceInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Bagaimana minyak dikeluarkan daripada hampas",
        "id": "cara-diekstrak",
        "blocks": [
          {
            "type": "p",
            "text": "Hampas dikeringkan dahulu, kemudian dibasuh dengan pelarut yang melarutkan baki minyak keluar daripada pepejalnya. Pelarut itu disejat dan dipulihkan semula, meninggalkan minyak hampas mentah yang berbau kuat dan belum boleh dimakan. Selepas itu barulah ia melalui penapisan sehingga menjadi neutral."
          },
          {
            "type": "ol",
            "items": [
              "Hampas basah dikeringkan supaya pelarut dapat bekerja.",
              "Pelarut gred makanan melarutkan baki minyak keluar daripada pepejal.",
              "Pelarut disejat keluar dan digunakan semula pada pusingan berikutnya.",
              "Minyak mentah dinyahasid, dilunturkan warnanya dan dinyahbau.",
              "Sedikit minyak zaitun dara dicampur semula sebelum dibotolkan."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPomaceInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Kenapa harganya jauh lebih rendah",
        "id": "kenapa-murah",
        "blocks": [
          {
            "type": "p",
            "text": "Bahan mentahnya ialah sisa yang kosnya sudah ditanggung oleh perahan pertama, jadi harganya bermula rendah. Pengekstrakan dengan pelarut mengeluarkan hampir semua baki minyak, jadi hasil setiap tan hampas tinggi. Selebihnya soal skala dan bungkusan: tin besar untuk dapur komersial, bukan botol kecil untuk meja."
          },
          {
            "type": "ul",
            "items": [
              "Bahan mentah ialah hasil sampingan, bukan buah yang dipetik khas.",
              "Pelarut mengeluarkan lebih banyak minyak daripada tekanan mekanikal.",
              "Tiada rasa halus yang perlu dijaga, jadi tiada kos untuk menjaganya."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPomaceInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          },
          {
            "type": "p",
            "text": "Apa yang membentuk harga di hujung sebelah lagi rak pula dipecahkan dalam [harga minyak zaitun di Malaysia](/blog/harga-minyak-zaitun-di-malaysia)."
          }
        ]
      },
      {
        "heading": "Di mana pomace berdiri antara gred lain",
        "id": "jadual-gred",
        "blocks": [
          {
            "type": "p",
            "text": "Gred menerangkan dua perkara: daripada apa minyak itu datang, dan apa yang dilakukan kepadanya selepas itu. Extra virgin dan virgin datang terus daripada buah tanpa penapisan. Minyak ditapis datang daripada buah tetapi melalui penapisan. Pomace pula bermula daripada hampas, bukan daripada buah."
          },
          {
            "type": "table",
            "head": [
              "Gred",
              "Sumber minyak",
              "Cara dikeluarkan",
              "Rasa"
            ],
            "rows": [
              [
                "Extra virgin",
                "Buah zaitun",
                "Perahan mekanikal, suhu rendah",
                "Pedas, sedikit pahit"
              ],
              [
                "Virgin",
                "Buah zaitun",
                "Perahan mekanikal",
                "Lebih lembut"
              ],
              [
                "Ditapis (pure, light)",
                "Buah zaitun",
                "Perahan, kemudian penapisan",
                "Hampir neutral"
              ],
              [
                "Pomace",
                "Hampas selepas perahan",
                "Pelarut, kemudian penapisan",
                "Nyaris tiada"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPomaceInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Cara mengenali pomace pada label di kedai",
        "id": "kenali-label",
        "blocks": [
          {
            "type": "p",
            "text": "Perkataan gred itu mesti ada pada label, cuma ia jarang dicetak sebesar nama jenama. Baca baris kecil di bawah atau di belakang botol, dan bandingkan harga seliter, bukan harga sebotol. Saiz bungkusan dan warna minyak juga memberi petunjuk sebelum tutup dibuka."
          },
          {
            "type": "ul",
            "items": [
              "Cari perkataan **pomace**, olive pomace oil atau minyak hampas zaitun.",
              "Tin lima liter berbukaan lebar biasanya minyak untuk menggoreng, bukan untuk meja.",
              "Harga seliter yang jauh lebih rendah daripada botol dara di rak yang sama.",
              "Warna kuning pucat dan hampir tiada bau apabila tutup dibuka.",
              "Jarang ada tarikh tuaian pada label, hanya tarikh luput yang panjang."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPomaceInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Baca gred, bukan perkataan zaitun",
      "blocks": [
        {
          "type": "p",
          "text": "Pomace dan extra virgin kedua-duanya sah dipanggil minyak zaitun, tetapi keduanya bahan yang berlainan kerja. Satu untuk kuali besar yang menelan minyak seliter demi seliter; satu lagi untuk hidangan yang minyaknya memang dirasa."
        },
        {
          "type": "p",
          "text": "Kalau minyak itu akan sampai ke pinggan tanpa dipanaskan, baca baris gred dahulu. [Lihat minyak dara Arabian Village](/products) sebagai titik perbandingan."
        }
      ]
    },
    "faqs": [
      {
        "q": "Adakah minyak zaitun pomace itu minyak zaitun sebenar?",
        "a": "Ia sah dilabel sebagai minyak zaitun kerana asalnya buah yang sama, tetapi ia bukan gred yang sama. Minyak dara diperah terus daripada buah tanpa penapisan. Pomace diekstrak daripada hampas yang tinggal selepas perahan itu, kemudian ditapis sehingga rasa dan baunya hampir hilang."
      },
      {
        "q": "Boleh ke guna minyak zaitun pomace untuk menggoreng?",
        "a": "Boleh, dan itulah kerja yang direka untuknya. Ia neutral, murah seliter dan tidak membawa rasa ke dalam makanan, jadi dapur komersial memakainya untuk kuali besar. Untuk salad, cicahan roti atau siraman akhir ia tidak menyumbang apa-apa rasa, jadi wangnya lebih baik dibelanjakan pada gred lain."
      },
      {
        "q": "Kenapa minyak zaitun pomace jauh lebih murah?",
        "a": "Tiga sebab bergabung. Bahan mentahnya hasil sampingan perahan pertama, pengekstrakan dengan pelarut mengeluarkan hampir semua baki minyak daripada setiap tan hampas, dan produk akhirnya dibungkus dalam tin besar untuk dapur komersial. Tiada rasa halus yang perlu dijaga sepanjang rantaian itu."
      },
      {
        "q": "Adakah pelarut masih tinggal di dalam minyak pomace?",
        "a": "Pelarut disejat keluar dan dipulihkan semula semasa pemprosesan, dan bakinya tertakluk kepada piawaian makanan yang mengawal minyak itu. Minyak hampas yang masih mentah tidak dijual terus kepada pengguna sama sekali. Ia mesti melalui penapisan penuh dahulu sebelum boleh dibotolkan dan dijual sebagai makanan."
      },
      {
        "q": "Bagaimana saya tahu botol di tangan saya pomace?",
        "a": "Baca baris gred, bukan nama jenama. Botol atau tin pomace akan menulis pomace atau olive pomace oil di suatu tempat pada label, selalunya dalam huruf jauh lebih kecil daripada perkataan olive oil di atasnya. Kalau perkataan itu ada, gred itulah isinya."
      },
      {
        "q": "Minyak Arabian Village pomace atau extra virgin?",
        "a": "Extra virgin perah sejuk dari Palestin, bukan pomace. Ia diperah secara mekanikal terus daripada buah zaitun, tanpa pelarut dan tanpa penapisan, dan dijual dalam botol kaca saiz 250 ml dan 500 ml melalui Berkat Madinah Store di Selangor serta saluran dalam talian mereka."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun extra virgin perah sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta enam perisa Infused Collection."
      },
      {
        "label": "Apa itu minyak zaitun extra virgin dan gred lain",
        "path": "blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain",
        "description": "Empat gred pada rak Malaysia dan apa yang berubah pada cara pemprosesan, rasa dan harga."
      },
      {
        "label": "Harga minyak zaitun di Malaysia",
        "path": "blog/harga-minyak-zaitun-di-malaysia",
        "description": "Perbandingan harga seliter antara saiz botol, dan apa yang ada di sebalik angka itu."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan Berkat Madinah Store di Selangor, waktu operasi, dan saluran dalam talian rasmi."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "minyak-zaitun-untuk-goreng",
    "slug": "minyak-zaitun-untuk-goreng",
    "seoTitle": "Minyak Zaitun untuk Goreng: Kaedah dan Suhu",
    "metaTitle": "Minyak Zaitun untuk Goreng: Kaedah dan Suhu",
    "metaDescription": "Goreng cetek, tumis, goreng rendam dan kerja wok bukan satu perkara yang sama. Jadual kaedah lawan suhu, kos seperiuk, dan bau minyak terlebih panas.",
    "focusKeyword": "minyak zaitun untuk goreng",
    "relatedKeywords": [
      "olive oil untuk goreng",
      "boleh ke goreng guna minyak zaitun",
      "minyak zaitun goreng ikan",
      "minyak zaitun goreng ayam",
      "minyak zaitun untuk tumis",
      "goreng rendam minyak zaitun",
      "minyak zaitun untuk wok",
      "suhu goreng minyak zaitun",
      "minyak zaitun berasap",
      "minyak zaitun guna semula",
      "kos minyak zaitun seliter"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun untuk Goreng",
      "Teknik Memasak",
      "Dapur Malaysia",
      "Kos Dapur",
      "Extra Virgin"
    ],
    "h1": "Minyak Zaitun untuk Goreng: Cetek, Tumis, Rendam dan Kerja Wok",
    "excerpt": "Empat kaedah goreng, empat suhu, dan hanya sebahagian daripadanya sesuai dengan minyak zaitun dara. Termasuk kos seperiuk untuk goreng rendam.",
    "keyTakeaway": "Minyak zaitun untuk goreng paling menjadi pada goreng cetek dan tumis, di mana suhu kuali duduk sekitar 140 hingga 180 darjah. Untuk periuk goreng rendam halangannya kos, bukan haba. Untuk kerja wok api besar pula minyak sudah mula berasap sebelum kuali sempat panas cukup.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukGorengHero",
      "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-goreng.jpg",
    "intro": [
      "Kuali sudah panas, botol minyak zaitun ada di rak, dan soalannya cuma satu: boleh ke goreng ikan dengan yang ini?",
      "Jawapannya bergantung pada jenis gorengan. Tumis, goreng cetek, goreng rendam sekuali penuh dan kerja wok api besar bukan satu perkara yang sama.",
      "Di sini kita asingkan empat kaedah itu: suhu, kos seperiuk, dan bau minyak yang terlebih panas."
    ],
    "sections": [
      {
        "heading": "Boleh ke minyak zaitun untuk goreng ikan dan ayam?",
        "id": "boleh-ke-goreng",
        "blocks": [
          {
            "type": "p",
            "text": "Boleh untuk goreng cetek dan tumis, dengan api sederhana dan minyak setakat separuh tinggi bahan sahaja. Minyak zaitun dara mula berasap lebih awal daripada minyak yang ditapis, jadi wok api besar bukan tempatnya; periuk goreng rendam pula tersekat pada kos, bukan pada haba. Ikan kembung dan ketul ayam yang nipis menjadi elok dalam kuali leper berlapis nipis."
          },
          {
            "type": "p",
            "text": "Takat asap dan suhu secara am ada dalam [panduan minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukGorengInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Empat kaedah goreng dan suhu masing-masing",
        "id": "kaedah-lawan-suhu",
        "blocks": [
          {
            "type": "p",
            "text": "Perkataan goreng merangkumi empat kerja yang berbeza suhunya. Tumis berlaku paling rendah kerana bahannya halus dan cepat masak. Goreng cetek naik sedikit. Goreng rendam perlu suhu yang stabil supaya salutan mengeras sebelum minyak masuk ke dalam. Kerja wok pula memang menuntut kuali yang hampir berasap."
          },
          {
            "type": "table",
            "head": [
              "Kaedah",
              "Suhu biasa",
              "Minyak zaitun dara?"
            ],
            "rows": [
              [
                "Tumis bawang, bawang putih, rempah",
                "140-180°C",
                "Ya, kerja yang paling sesuai"
              ],
              [
                "Goreng cetek dalam kuali leper",
                "160-180°C",
                "Ya, kekalkan api sederhana"
              ],
              [
                "Goreng rendam, bahan terapung",
                "175-190°C",
                "Boleh, tetapi kosnya tinggi"
              ],
              [
                "Wok api besar, goreng kilas",
                "220°C ke atas",
                "Tidak, pilih minyak yang lebih neutral"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukGorengInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Goreng cetek dan tumis: di sini ia paling menjadi",
        "id": "goreng-cetek-dan-tumis",
        "blocks": [
          {
            "type": "p",
            "text": "Dua sudu besar minyak dalam kuali leper sudah cukup untuk sekeping ikan atau dua ketul ayam. Panaskan kuali dahulu, baru tuang minyak, dan tunggu sehingga permukaannya bergerak nipis. Bahan yang masuk ke dalam minyak suam akan menyerap minyak dan bukan mengeras, dan itulah punca gorengan menjadi lemau."
          },
          {
            "type": "ol",
            "items": [
              "Keringkan permukaan ikan atau ayam dengan tuala dapur sebelum ia masuk.",
              "Panaskan kuali kosong, kemudian tuang dua hingga tiga sudu besar minyak.",
              "Uji dengan sehiris bawang: berdesir perlahan bermakna api sudah cukup.",
              "Angkat ke atas rak dawai, bukan ditindan atas pinggan — wap terperangkap dan salutan jadi lemau."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukGorengInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Goreng rendam: kira kos seperiuk dahulu",
        "id": "kos-goreng-rendam",
        "blocks": [
          {
            "type": "p",
            "text": "Periuk goreng rendam yang sederhana menelan satu setengah hingga dua liter minyak sekali isi. Itu bukan sukatan sudu, itu botol demi botol. Sebelum bab suhu, kira dahulu berapa nilai minyak yang duduk dalam periuk itu, kerana angka inilah yang biasanya menamatkan perbincangan di dapur rumah."
          },
          {
            "type": "table",
            "head": [
              "Saiz botol",
              "Harga",
              "Kos seliter"
            ],
            "rows": [
              [
                "250 ml",
                "RM59.00",
                "RM236"
              ],
              [
                "500 ml",
                "RM109.00",
                "RM218"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukGorengInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          },
          {
            "type": "p",
            "text": "Pada RM218 seliter, dua liter dalam periuk bermakna lebih empat ratus ringgit minyak untuk satu petang menggoreng. Lihat [saiz dan harga penuh](/products). Untuk kuantiti begitu, minyak masak biasa lebih praktikal."
          }
        ]
      },
      {
        "heading": "Kerja wok: kenapa api besar bukan tempatnya",
        "id": "kerja-wok",
        "blocks": [
          {
            "type": "p",
            "text": "Goreng kilas bergantung pada kuali yang panas melampau supaya bahan bertukar warna dalam masa singkat tanpa mengeluarkan air. Pada suhu itu minyak zaitun dara sudah berasap dan rasanya bertukar hangit sebelum kuey teow sempat masak. Minyak yang lebih neutral dan lebih tahan haba melakukan kerja itu tanpa membawa rasa sendiri."
          },
          {
            "type": "ul",
            "items": [
              "Char kuey teow, nasi goreng dan mi goreng — guna minyak masak biasa dalam wok.",
              "Selepas hidangan diangkat dari wok, renjis sedikit minyak zaitun yang tidak dipanaskan supaya rasanya kekal utuh.",
              "Untuk gred yang lebih tahan haba, rujuk [gred minyak zaitun](/blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain)."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukGorengInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Bau: tanda minyak sudah terlebih panas",
        "id": "bau-terlebih-panas",
        "blocks": [
          {
            "type": "p",
            "text": "Hidung memberitahu lebih awal daripada mata. Minyak zaitun yang panas dalam julat kerjanya berbau seperti buah dan sedikit rumput. Minyak yang melepasi hadnya bertukar tajam dan pedih di hidung, dan asapnya menjadi berterusan, bukan sekadar wap nipis daripada bahan yang basah."
          },
          {
            "type": "ul",
            "items": [
              "Asap nipis berterusan dari permukaan minyak, bukan dari bahan yang baru masuk.",
              "Bau tajam yang memedihkan mata apabila anda mendekat ke kuali.",
              "Buih halus yang tidak surut walaupun selepas bahan diangkat."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukGorengInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          },
          {
            "type": "note",
            "title": "Jika ia sudah berasap",
            "text": "Matikan api dan biarkan kuali sejuk sebelum bahan masuk. Minyak yang sudah hangit tidak pulih rasanya, jadi tuang keluar dan mula semula."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Pilih kaedah dahulu, baru minyak",
      "blocks": [
        {
          "type": "p",
          "text": "Soalan yang betul bukan sama ada minyak zaitun boleh digoreng, tetapi gorengan yang mana. Untuk kuali leper dan tumis harian, dua sudu besar sudah cukup."
        },
        {
          "type": "p",
          "text": "Untuk periuk penuh dan wok api besar, biarkan minyak masak biasa buat kerja itu. [Lihat tempat membeli](/shop) untuk cawangan Berkat Madinah Store."
        }
      ]
    },
    "faqs": [
      {
        "q": "Boleh ke goreng ikan dengan minyak zaitun?",
        "a": "Boleh, untuk goreng cetek dalam kuali leper dengan api sederhana. Guna dua hingga tiga sudu besar sahaja, keringkan permukaan ikan dahulu, dan jangan alihkan ikan pada dua minit pertama. Untuk ikan seekor penuh yang direndam dalam minyak, minyak masak biasa lebih praktikal dari segi kos."
      },
      {
        "q": "Berbaloi ke guna minyak zaitun untuk goreng rendam?",
        "a": "Jarang berbaloi di dapur rumah. Satu periuk memerlukan satu setengah hingga dua liter minyak sekali isi, dan pada harga seliter minyak zaitun dara, itu ratusan ringgit untuk satu sesi menggoreng. Simpan minyak zaitun untuk kerja bersukat sudu dan gunakan minyak biasa untuk periuk."
      },
      {
        "q": "Berapa kali minyak zaitun boleh diguna semula selepas menggoreng?",
        "a": "Untuk goreng cetek bahan yang bersih, dua atau tiga kali. Tapis semasa minyak masih suam melalui penapis halus, simpan dalam balang tertutup jauh dari dapur, dan buang apabila minyak itu gelap, berbuih atau berbau tajam. Minyak yang menggoreng salutan tepung lebih cepat rosak."
      },
      {
        "q": "Kenapa dapur berbau hangit bila saya goreng dengan minyak zaitun?",
        "a": "Biasanya api terlalu besar atau kuali dibiarkan kosong terlalu lama sebelum bahan masuk. Minyak zaitun dara berasap lebih awal daripada minyak yang ditapis. Kecilkan api ke sederhana, uji dengan sehiris bawang, dan masukkan bahan sebaik minyak mula bergerak nipis di permukaan."
      },
      {
        "q": "Minyak mana untuk char kuey teow dan nasi goreng?",
        "a": "Guna minyak masak biasa yang tahan haba tinggi. Wok untuk goreng kilas beroperasi melebihi dua ratus dua puluh darjah, jauh di atas julat minyak zaitun dara. Kalau mahu rasa minyak zaitun dalam hidangan itu, renjis sedikit minyak zaitun yang tidak dipanaskan selepas hidangan diangkat dari wok."
      },
      {
        "q": "Perlu ke guna gred yang lebih murah untuk menggoreng?",
        "a": "Untuk goreng kuantiti besar, minyak yang ditapis memang lebih neutral dan lebih tahan haba. Tetapi minyak zaitun dara membawa rasa buah dan sedikit pedas yang hilang selepas penapisan. Pilih ikut hidangan: rasa untuk tumis dan cicah, neutral untuk periuk dan wok."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Panduan am memasak dengan minyak zaitun, takat asap, dan perbandingan dengan minyak masak lain."
      },
      {
        "label": "Apa itu minyak zaitun extra virgin dan gred lain",
        "path": "blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain",
        "description": "Beza antara gred dara, dara extra dan minyak yang ditapis, dan apa yang berubah pada rasa serta haba."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun sejuk-tekan asal Palestin dalam saiz 250 ml dan 500 ml, serta Infused Collection."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      },
      {
        "label": "Minyak zaitun untuk ikan bakar",
        "path": "blog/minyak-zaitun-untuk-ikan-bakar",
        "description": "Sapu pada ikan, bukan pada jaring, dan tuangan akhir selepas ikan diangkat."
      },
      {
        "label": "Minyak zaitun untuk steak",
        "path": "blog/minyak-zaitun-untuk-steak",
        "description": "Teknik dua minyak untuk sear di atas dapur, dan bila minyak dara masuk."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "minyak-zaitun-vs-minyak-masak",
    "slug": "minyak-zaitun-vs-minyak-masak-lain",
    "seoTitle": "Minyak Zaitun vs Minyak Masak: Rasa, Suhu, Harga",
    "metaTitle": "Minyak Zaitun vs Minyak Masak: Rasa, Suhu, Harga",
    "metaDescription": "Minyak zaitun berbanding minyak sawit, kelapa dara, bijan dan kacang tanah: rasa, takat asap, dan kerja dapur mana untuk minyak mana.",
    "focusKeyword": "minyak zaitun vs minyak masak",
    "relatedKeywords": [
      "minyak zaitun vs minyak sawit",
      "beza minyak zaitun dan minyak masak",
      "olive oil vs minyak masak",
      "minyak zaitun ganti minyak masak",
      "minyak kelapa dara vs minyak zaitun",
      "minyak bijan untuk masak",
      "minyak kacang tanah untuk wok",
      "takat asap minyak masak",
      "jenis minyak masak di Malaysia",
      "minyak mana untuk goreng ikan"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Perbandingan Minyak",
      "Panduan Dapur",
      "Minyak Masak Malaysia",
      "Kos Dapur"
    ],
    "h1": "Minyak Zaitun vs Minyak Masak Lain di Dapur Malaysia",
    "excerpt": "Minyak sawit, kelapa dara, bijan, kacang tanah dan zaitun dibandingkan pada rasa, takat asap dan kerja dapur — dan kenapa harganya meletakkannya dalam kelas lain.",
    "keyTakeaway": "Minyak zaitun vs minyak masak bukan soal mana satu menang, tetapi kerja mana untuk minyak mana. Minyak sawit dan minyak kacang tanah untuk goreng rendam dan wok api besar. Minyak zaitun dara untuk tumis, panggang, sos salad dan cicah, kerana rasanya sampai ke pinggan. Harga seliternya pula meletakkannya dalam kelas lain.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunVsMinyakMasakHero",
      "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
    },
    "ogImage": "/og/blog-minyak-zaitun-vs-minyak-masak.jpg",
    "intro": [
      "Kebanyakan dapur di Malaysia ada lebih daripada satu botol minyak: sebotol besar minyak masak sawit, mungkin minyak kelapa dara, sebotol kecil minyak bijan, dan sejak beberapa tahun ini, sebotol minyak zaitun.",
      "Soalan yang lebih berguna bukan mana satu terbaik, tetapi kerja mana untuk minyak mana.",
      "Perbandingan di bawah melihat tiga perkara: rasa, takat asap dan kegunaan dapur. Harga diambil berasingan, kerana harga seliter minyak zaitun meletakkannya dalam kelas yang lain sama sekali."
    ],
    "sections": [
      {
        "heading": "Empat minyak yang memang ada di dapur Malaysia",
        "id": "empat-minyak",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak sawit ialah minyak masak lalai di kebanyakan rumah: murah, tahan panas, hampir tiada rasa. Minyak kelapa dara membawa bau kelapa yang jelas. Minyak bijan pekat dipakai titik demi titik sebagai perisa. Minyak kacang tanah tahan api besar untuk kerja wok. Minyak zaitun dara pula dibeli kerana rasanya."
          },
          {
            "type": "table",
            "head": [
              "Minyak",
              "Rasa",
              "Takat asap",
              "Kerja dapur"
            ],
            "rows": [
              [
                "Minyak zaitun dara extra",
                "Buah, pahit halus, pedas",
                "190-210°C",
                "Salad, cicah, tumis, panggang"
              ],
              [
                "Minyak masak sawit",
                "Hampir neutral",
                "kira-kira 230°C",
                "Goreng rendam, goreng ikan"
              ],
              [
                "Minyak kelapa dara",
                "Kelapa, jelas",
                "175-190°C",
                "Kuih, gorengan ringan"
              ],
              [
                "Minyak bijan pekat",
                "Bijan sangrai, kuat",
                "rendah",
                "Titis pada akhir masakan"
              ],
              [
                "Minyak kacang tanah",
                "Ringan, sedikit rasa kacang",
                "kira-kira 230°C",
                "Wok api besar"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakMasakInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          },
          {
            "type": "p",
            "text": "Baca angka takat asap sebagai julat, bukan titik tepat — perinciannya ada dalam [panduan minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          }
        ]
      },
      {
        "heading": "Rasa: minyak yang menyumbang, minyak yang neutral",
        "id": "rasa",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak masak sawit ditapis sehingga hampir tiada rasa, dan itu memang tujuannya — ia sepatutnya tidak terasa dalam lauk. Minyak zaitun dara tidak ditapis, jadi ia masuk ke dalam hidangan bersama rasanya sendiri: buah, sedikit pahit di hujung lidah, pedas halus di kerongkong."
          },
          {
            "type": "ul",
            "items": [
              "**Minyak neutral** — bila anda mahu rempah, ikan atau sayur berdiri sendiri.",
              "**Minyak berasa** — bila minyak itu sebahagian daripada rasa hidangan: sos salad, roti cicah.",
              "**Minyak perisa** — bijan pekat dan minyak zaitun infused; guna sedikit dahulu."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakMasakInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Suhu: kaedah mana untuk minyak mana",
        "id": "suhu-dan-kaedah",
        "blocks": [
          {
            "type": "p",
            "text": "Kebanyakan kerja dapur harian tidak sepanas yang orang sangka. Tumis di atas api sederhana berada sekitar 140 hingga 180°C selepas bahan masuk, dan memanggang dalam ketuhar lazimnya 180 hingga 200°C. Kedua-duanya dalam julat minyak zaitun dara. Yang keluar daripada julat itu ialah goreng rendam yang lama dan wok api penuh."
          },
          {
            "type": "ul",
            "items": [
              "Tumis bawang, bawang putih dan rempah — minyak zaitun sesuai.",
              "Panggang sayur atau ayam pada 180 hingga 200°C — sesuai.",
              "Goreng cetek ikan atau telur mata — sesuai, kalau kuali tidak berasap.",
              "Goreng rendam dan wok api penuh — minyak sawit atau kacang tanah."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakMasakInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Harga: kenapa minyak zaitun duduk dalam kelas lain",
        "id": "harga-seliter",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak masak sawit dijual dalam botol beberapa liter dan minyak zaitun dara dalam botol 250 ml atau 500 ml, jadi harga di rak membandingkan dua saiz yang berlainan. Bahagikan harga dengan isi padu dahulu. Minyak zaitun dara berkali ganda lebih mahal seliter."
          },
          {
            "type": "table",
            "head": [
              "Saiz botol",
              "Harga",
              "Harga seliter"
            ],
            "rows": [
              [
                "250 ml",
                "RM59.00",
                "RM236"
              ],
              [
                "500 ml",
                "RM109.00",
                "RM218"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakMasakInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          },
          {
            "type": "p",
            "text": "[Harga minyak zaitun di Malaysia](/blog/harga-minyak-zaitun-di-malaysia) memecahkan angka itu mengikut saiz botol."
          }
        ]
      },
      {
        "heading": "Pembahagian kerja: dua botol lebih masuk akal",
        "id": "pembahagian-kerja",
        "blocks": [
          {
            "type": "p",
            "text": "Rumah yang paling senang menggunakan minyak zaitun bukan rumah yang membuang minyak masak, tetapi rumah yang menyimpan kedua-duanya dan tahu bila hendak mencapai yang mana. Minyak masak untuk kerja kuantiti dan api besar. Minyak zaitun untuk kerja yang rasanya sampai ke pinggan."
          },
          {
            "type": "ol",
            "items": [
              "Letak minyak masak sawit dekat dapur untuk goreng rendam.",
              "Simpan minyak zaitun dalam kabinet tertutup, jauh daripada haba dapur.",
              "Guna minyak zaitun untuk tumis, panggang, sos salad dan roti cicah.",
              "Kekalkan minyak bijan pekat sebagai titisan akhir, bukan minyak menggoreng."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakMasakInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Kesilapan biasa apabila bertukar daripada minyak masak",
        "id": "kesilapan-biasa",
        "blocks": [
          {
            "type": "p",
            "text": "Orang yang baru bertukar selalunya menuang minyak zaitun sebanyak minyak masak, memanaskan kuali kosong terlalu lama, dan menyimpan botol di sebelah dapur gas. Ketiga-tiganya menghabiskan botol lebih cepat daripada patut dan mengubah rasa hidangan, dan ketiga-tiganya senang dielakkan tanpa menukar resepi."
          },
          {
            "type": "ul",
            "items": [
              "**Menuang ikut sukatan lama** — mula dengan lebih sedikit, tambah kemudian.",
              "**Kuali kosong berasap** — panaskan kuali, tuang minyak, terus masukkan bahan.",
              "**Botol di sebelah dapur** — haba berterusan menumpulkan rasa; simpan dalam kabinet."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakMasakInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Bukan ganti, tetapi bahagi",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun tidak menggantikan minyak masak di dapur Malaysia, dan tidak perlu pun. Ia mengambil kerja yang minyak neutral tidak boleh buat: hidangan yang sebahagian rasanya datang daripada minyak itu sendiri."
        },
        {
          "type": "p",
          "text": "Mula dengan satu kerja sahaja — sos salad atau sayur panggang. [Lihat botol dan saiz](/products), atau [tempat membeli](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Boleh ke minyak zaitun ganti minyak masak sepenuhnya?",
        "a": "Untuk tumis, memanggang dan goreng cetek, boleh. Untuk goreng rendam sekuali penuh dan kerja wok di atas api penuh, minyak sawit atau minyak kacang tanah lebih praktikal — bukan sahaja kerana suhunya lebih tinggi, tetapi kerana kuantiti minyak yang diperlukan sekali gus jauh lebih besar."
      },
      {
        "q": "Berapa kos minyak untuk satu hidangan berbanding satu kuali goreng?",
        "a": "Kira ikut kerja, bukan ikut botol. Sos salad untuk empat orang menghabiskan kira-kira tiga sudu besar, iaitu 45 ml. Sekuali goreng rendam menelan satu setengah hingga dua liter sekali isi. Minyak yang sama, tetapi kuantitinya berpuluh kali ganda, dan di situlah pilihan minyak ditentukan."
      },
      {
        "q": "Kenapa minyak zaitun jauh lebih mahal seliter?",
        "a": "Ia diperah daripada buah, sekali setahun selepas musim tuaian, dan buah itu menghasilkan minyak dalam kuantiti yang kecil berbanding beratnya. Minyak zaitun dara Arabian Village berharga RM59.00 untuk botol 250 ml dan RM109.00 untuk 500 ml, iaitu RM236 dan RM218 seliter."
      },
      {
        "q": "Minyak kelapa dara atau minyak zaitun untuk masakan Melayu?",
        "a": "Ikut rasa hidangan. Minyak kelapa dara membawa bau kelapa yang duduk elok dengan lauk bersantan dan kuih. Minyak zaitun dara pula membawa rasa buah dan pedas halus di kerongkong, yang lebih sesuai untuk sayur panggang, sos salad dan roti cicah."
      },
      {
        "q": "Boleh campur minyak zaitun dengan minyak masak dalam satu kuali?",
        "a": "Boleh, tetapi hasilnya separuh jalan: anda dapat sedikit rasa minyak zaitun sambil menjimatkan kos. Kalau tujuannya menaikkan api pula, campuran itu tidak menaikkan takat asap minyak zaitun. Lebih senang pilih satu minyak mengikut kaedah masakan malam itu, dan simpan yang satu lagi untuk kerja lain."
      },
      {
        "q": "Saiz mana untuk rumah yang baru mula guna minyak zaitun?",
        "a": "Botol 250 ml pada RM59.00, sebab botol yang lama terbuka akan tumpul rasanya sebelum sempat habis. Kalau rumah anda sudah biasa memakainya untuk tumis dan sos salad setiap minggu, botol 500 ml pada RM109.00 lebih murah setiap liter dan masih habis dalam masa yang munasabah."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam botol 250 ml dan 500 ml, serta enam perisa Infused Collection."
      },
      {
        "label": "Harga minyak zaitun di Malaysia",
        "path": "blog/harga-minyak-zaitun-di-malaysia",
        "description": "Kiraan harga seliter antara saiz botol, dan apa yang ada di sebalik angka itu."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Kaedah masakan mana yang sesuai dengan minyak zaitun, dan bila lebih baik guna minyak lain."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah."
      },
      {
        "label": "Minyak zaitun vs minyak kelapa",
        "path": "blog/minyak-zaitun-vs-minyak-kelapa",
        "description": "Dua minyak yang ada dalam dapur Malaysia, dibandingkan sebagai lemak masakan."
      },
      {
        "label": "Minyak zaitun vs minyak sawit",
        "path": "blog/minyak-zaitun-vs-minyak-sawit",
        "description": "Minyak yang negara ini keluarkan, lawan minyak yang diimport, sebagai lemak masakan."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "resepi-minyak-zaitun",
    "slug": "resepi-mudah-dengan-minyak-zaitun",
    "seoTitle": "Resepi Minyak Zaitun: 4 Hidangan Mudah Malam Ini",
    "metaTitle": "Resepi Minyak Zaitun: 4 Hidangan Mudah Malam Ini",
    "metaDescription": "Empat resepi ringkas dengan sukatan sudu besar: cicahan roti, perap ayam, sayur panggang dan pasta cili — dan berapa mililiter minyak setiap satu telan.",
    "focusKeyword": "resepi minyak zaitun",
    "relatedKeywords": [
      "resepi mudah minyak zaitun",
      "cicahan roti minyak zaitun",
      "perap ayam minyak zaitun",
      "sayur panggang minyak zaitun",
      "pasta bawang putih minyak zaitun",
      "aglio olio minyak zaitun",
      "olive oil recipe malaysia",
      "sukatan minyak zaitun sudu besar",
      "minyak zaitun extra virgin masak",
      "resepi ketuhar minyak zaitun"
    ],
    "category": "Resepi",
    "tags": [
      "Resepi Minyak Zaitun",
      "Panduan Dapur",
      "Ketuhar dan Panggang",
      "Dapur Malaysia",
      "Arabian Village"
    ],
    "h1": "Resepi Mudah dengan Minyak Zaitun untuk Malam Ini",
    "excerpt": "Empat resepi dengan sukatan penuh, bahan yang dapur kita memang sudah ada, dan berapa minyak yang setiap satu telan.",
    "keyTakeaway": "Resepi minyak zaitun yang paling menjadi di dapur Malaysia ialah yang ringkas: cicahan roti bawang putih, perap ayam limau nipis, sayur panggang dan pasta bawang putih cili. Semuanya menggunakan sukatan sudu besar, bahan yang sudah ada di rumah, dan siap dalam tiga puluh minit atau kurang.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressResepiMinyakZaitunHero",
      "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
    },
    "ogImage": "/og/blog-resepi-minyak-zaitun.jpg",
    "intro": [
      "Botol minyak zaitun selalunya berdiri di rak sampai lupa. Bukan sebab tak sedap, tetapi sebab tiada resepi khusus yang terlintas bila tiba waktu masak.",
      "Empat resepi di bawah menggunakan bahan yang dapur Malaysia memang sudah ada, dan setiap satu siap dalam tiga puluh minit.",
      "Sukatan dalam sudu besar. Satu sudu besar ialah 15 ml, jadi senang digandakan daripada dua orang kepada empat."
    ],
    "sections": [
      {
        "heading": "Bahan asas yang membuka keempat-empat resepi",
        "id": "bahan-asas",
        "blocks": [
          {
            "type": "p",
            "text": "Empat bahan sahaja berulang dalam resepi minyak zaitun yang ringkas: bawang putih, limau nipis, garam kasar dan lada hitam yang baru dikisar. Minyak zaitun dara membawa rasa bahan itu ke seluruh hidangan kerana kebanyakan aromanya larut dalam lemak, bukan dalam air. Herba kering seperti oregano dan thyme pilihan tambahan, bukan syarat."
          },
          {
            "type": "ul",
            "items": [
              "Bawang putih segar — diparut untuk cicahan, dihiris nipis untuk pasta.",
              "Limau nipis atau limau kasturi, diperah sejurus sebelum guna.",
              "Garam kasar untuk taburan akhir, garam halus untuk perapan.",
              "Lada hitam biji, dikisar terus ke atas hidangan.",
              "Herba kering: oregano, thyme atau daun ketumbar kering."
            ]
          },
          {
            "type": "image",
            "src": "pressResepiMinyakZaitunInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Cicahan roti bawang putih dalam dua minit",
        "id": "cicahan-roti",
        "blocks": [
          {
            "type": "p",
            "text": "Cicahan ialah cara paling cepat menggunakan minyak zaitun kerana ia langsung tidak dimasak. Tuang minyak ke dalam pinggan cetek, bukan mangkuk dalam, supaya roti boleh disapu rata dan bukan direndam. Sediakan sejurus sebelum makan, kerana bawang putih mentah yang duduk lama dalam minyak akan jadi tajam dan pahit."
          },
          {
            "type": "ol",
            "items": [
              "Tuang 3 sudu besar minyak zaitun ke dalam pinggan cetek.",
              "Parut satu ulas bawang putih terus ke dalam minyak.",
              "Taburkan secubit garam kasar, lada hitam dan setengah sudu kecil herba kering.",
              "Kacau sekali, biar lima minit, hidang dengan roti pita atau roti bakar."
            ]
          },
          {
            "type": "image",
            "src": "pressResepiMinyakZaitunInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Perap ayam untuk ketuhar atau air fryer",
        "id": "perap-ayam",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dalam perapan berfungsi sebagai pembawa: bawang putih, lada dan kulit limau melekat pada permukaan ayam dan tidak tertinggal di dasar bekas. Tiga puluh minit sudah memadai untuk ketulan bersaiz sederhana. Perapan yang lebih lama tidak menjadikan ayam lebih lembut, cuma lebih masin di luar."
          },
          {
            "type": "ol",
            "items": [
              "Gaul 500 g ayam dengan 3 sudu besar minyak zaitun.",
              "Masukkan jus satu biji limau nipis dan dua ulas bawang putih diparut.",
              "Tambah satu sudu kecil garam dan setengah sudu kecil lada hitam.",
              "Tutup, sejukkan 30 minit, panggang pada 200 darjah Celsius selama 25 minit."
            ]
          },
          {
            "type": "image",
            "src": "pressResepiMinyakZaitunInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Sayur panggang yang tidak lembik",
        "id": "sayur-panggang",
        "blocks": [
          {
            "type": "p",
            "text": "Sayur panggang gagal apabila minyaknya terlalu sedikit atau loyangnya terlalu penuh. Minyak yang cukup memindahkan haba ketuhar ke setiap permukaan sayur, jadi tepinya berkerak sebelum bahagian tengah sempat mengeluarkan air. Kentang, lobak merah, terung dan brokoli semuanya sesuai, asalkan dipotong lebih kurang sama besar."
          },
          {
            "type": "ol",
            "items": [
              "Potong 400 g sayur campur kepada saiz sesuap.",
              "Gaul dengan 2 sudu besar minyak zaitun dan satu sudu kecil garam.",
              "Susun satu lapisan sahaja di atas loyang, jangan bertindih.",
              "Panggang 200 darjah Celsius selama 25 minit, goncang loyang sekali di pertengahan."
            ]
          },
          {
            "type": "image",
            "src": "pressResepiMinyakZaitunInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Pasta bawang putih dan cili untuk dua orang",
        "id": "pasta-bawang-putih",
        "blocks": [
          {
            "type": "p",
            "text": "Pasta ini menunjukkan minyak zaitun bekerja pada haba sederhana, bukan api besar. Bawang putih dimasak perlahan sehingga kekuningan sahaja, kerana sebaik ia bertukar coklat rasanya pahit dan tiada cara memulihkannya. Air rebusan pasta yang bertepung itulah yang mengikat minyak dengan mi supaya sos tidak berasingan dalam pinggan."
          },
          {
            "type": "ol",
            "items": [
              "Rebus 200 g spageti, simpan setengah cawan air rebusannya.",
              "Panaskan 4 sudu besar minyak zaitun dengan api sederhana.",
              "Masukkan tiga ulas bawang putih dihiris nipis dan sedikit cili kering.",
              "Gaul mi masuk dengan tiga sudu besar air rebusan dan garam."
            ]
          },
          {
            "type": "image",
            "src": "pressResepiMinyakZaitunInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Berapa minyak yang setiap resepi telan",
        "id": "kos-setiap-resepi",
        "blocks": [
          {
            "type": "p",
            "text": "Satu sudu besar ialah 15 ml, jadi sukatan setiap resepi boleh dibaca terus sebagai isi padu minyak. Empat resepi ringkas ini bersama-sama menggunakan 180 ml, iaitu belum habis satu botol 250 ml, dan itu termasuk pasta untuk dua orang serta satu loyang penuh sayur panggang."
          },
          {
            "type": "table",
            "head": [
              "Resepi",
              "Sukatan",
              "Isi padu"
            ],
            "rows": [
              [
                "Cicahan roti",
                "3 sudu besar",
                "45 ml"
              ],
              [
                "Perap ayam 500 g",
                "3 sudu besar",
                "45 ml"
              ],
              [
                "Sayur panggang 400 g",
                "2 sudu besar",
                "30 ml"
              ],
              [
                "Pasta dua orang",
                "4 sudu besar",
                "60 ml"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressResepiMinyakZaitunInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          },
          {
            "type": "p",
            "text": "Harga setiap saiz dan kiraan seliternya ada di halaman [produk](/products), manakala suhu untuk setiap kaedah masak ada dalam [panduan dapur](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Pilih satu, masak malam ini",
      "blocks": [
        {
          "type": "p",
          "text": "Empat resepi ini tidak perlu dibuat mengikut urutan. Cicahan roti paling pantas, sayur panggang paling sesuai untuk hidangan tengah minggu, dan perap ayam boleh disediakan pagi sebelum keluar kerja."
        },
        {
          "type": "p",
          "text": "Untuk hidangan sejuk pula, nisbah sos dan padanan kerabu ada dalam [minyak zaitun untuk salad](/blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk). [Tempat membeli](/shop) menyenaraikan cawangan Berkat Madinah."
        }
      ]
    },
    "faqs": [
      {
        "q": "Resepi minyak zaitun mana paling mudah untuk pemula?",
        "a": "Cicahan roti. Tuang tiga sudu besar minyak ke dalam pinggan cetek, parut satu ulas bawang putih, taburkan garam kasar dan lada hitam. Siap dalam dua minit dan tidak melibatkan api langsung, jadi rasa minyak dalam botol itulah yang sampai ke mulut."
      },
      {
        "q": "Berapa banyak minyak zaitun untuk perap 500 g ayam?",
        "a": "Tiga sudu besar, iaitu lebih kurang 45 ml. Itu cukup untuk menyaluti setiap ketulan tanpa meninggalkan kolam minyak di dasar bekas. Tambah jus satu biji limau nipis, dua ulas bawang putih parut, garam dan lada hitam, kemudian perap tiga puluh minit dalam peti sejuk."
      },
      {
        "q": "Boleh guna minyak zaitun untuk sayur panggang dalam ketuhar?",
        "a": "Boleh. Dua sudu besar untuk 400 gram sayur campur, digaul rata sebelum disusun satu lapisan sahaja di atas loyang. Panggang pada 200 darjah Celsius selama kira-kira 25 minit dan goncang loyang sekali di pertengahan supaya setiap sisi sayur terkena haba."
      },
      {
        "q": "Kenapa bawang putih dalam minyak zaitun saya jadi pahit?",
        "a": "Kerana ia terlalu masak. Bawang putih cincang bertukar coklat dengan cepat dan rasa pahit itu kekal walaupun ia dibuang kemudian. Gunakan api sederhana, angkat kuali sebaik warnanya kekuningan, dan masukkan bahan lain untuk menurunkan suhu minyak dengan segera."
      },
      {
        "q": "Minyak zaitun jenis mana untuk memasak harian?",
        "a": "Extra virgin boleh digunakan untuk cicahan, perapan, sayur panggang dan tumisan pada haba sederhana. Bezanya cuma pada kos setiap hidangan, jadi banyak rumah menyimpan botol 500 ml untuk kerja dapur harian dan botol 250 ml untuk hidangan yang tidak dimasak."
      },
      {
        "q": "Berapa lama ayam yang diperap boleh disimpan?",
        "a": "Ayam yang sudah diperap elok dimasak dalam masa dua puluh empat jam, disimpan bertutup dalam peti sejuk sepanjang tempoh itu. Perapan yang mengandungi jus limau nipis lebih baik dimasak lebih awal lagi, kerana asid itu terus bekerja pada permukaan daging."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun sejuk-tekan asal Palestin dalam saiz 250 ml dan 500 ml, serta perisa Infused Collection."
      },
      {
        "label": "Minyak zaitun untuk salad dan hidangan sejuk",
        "path": "blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk",
        "description": "Nisbah sos tiga banding satu, campuran limau kasturi dan madu, serta padanan kerabu dan ulam."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Kaedah masak mana yang menjadi dengan minyak zaitun dan suhu yang sesuai untuk setiap satu."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah."
      },
      {
        "label": "Minyak zaitun untuk kek dan bakeri",
        "path": "blog/minyak-zaitun-untuk-kek-dan-bakeri",
        "description": "Penukaran mentega kepada minyak, dan kek mana sesuai dengan minyak dara."
      },
      {
        "label": "Minyak zaitun untuk pasta",
        "path": "blog/minyak-zaitun-untuk-pasta",
        "description": "Aglio olio versi rumah, dengan air pasta sebagai pengikat."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "beli-minyak-zaitun-online",
    "slug": "beli-minyak-zaitun-online-di-malaysia",
    "seoTitle": "Beli Minyak Zaitun Online: Semak Sebelum Bayar",
    "metaTitle": "Beli Minyak Zaitun Online: Semak Sebelum Bayar",
    "metaDescription": "Apa yang perlu ada pada penyenaraian sebelum anda bayar, risiko kotak dalam cuaca panas, pembungkusan yang sepatutnya, dan senarai semak enam langkah.",
    "focusKeyword": "beli minyak zaitun online",
    "relatedKeywords": [
      "beli minyak zaitun online malaysia",
      "beli minyak zaitun dalam talian",
      "beli olive oil online",
      "minyak zaitun extra virgin online",
      "kedai online minyak zaitun",
      "penghantaran minyak zaitun",
      "pembungkusan botol kaca penghantaran",
      "tarikh tuai minyak zaitun",
      "senarai semak beli minyak zaitun",
      "harga minyak zaitun seliter"
    ],
    "category": "Panduan membeli",
    "tags": [
      "Beli Minyak Zaitun Online",
      "Panduan Membeli",
      "Penghantaran",
      "Pembungkusan",
      "Malaysia"
    ],
    "h1": "Beli minyak zaitun online di Malaysia: apa yang perlu disemak sebelum bayar",
    "excerpt": "Penyenaraian dalam talian tidak boleh dipegang dan tidak boleh dirasa. Empat perkara yang mesti ada padanya, kotak dalam cuaca panas kita, dan senarai semak sebelum tekan butang bayar.",
    "keyTakeaway": "Beli minyak zaitun online dengan selamat bermula pada penyenaraian: negara asal yang dinamakan, gred yang ditulis, saiz botol, dan satu tarikh. Selepas itu barulah soal penghantaran — kotak berlapis, botol kaca gelap, dan penjual yang ada kedai fizikal serta nombor yang menjawab kalau botol sampai pecah atau salah.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressBeliMinyakZaitunOnlineHero",
      "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
    },
    "ogImage": "/og/blog-beli-minyak-zaitun-online.jpg",
    "intro": [
      "Membeli minyak zaitun dalam talian menjimatkan perjalanan, tetapi anda kehilangan dua perkara yang ada di kedai: botol di tangan dan orang yang boleh ditanya.",
      "Yang tinggal cuma gambar penyenaraian, beberapa baris teks, dan sebuah kotak yang akan bergerak dalam cuaca panas.",
      "Jadi kerja menyemak berpindah ke hadapan — sebelum bayar, bukan selepas kotak sampai."
    ],
    "sections": [
      {
        "heading": "Apa yang perlu ada pada penyenaraian sebelum anda bayar",
        "id": "apa-perlu-ada-pada-penyenaraian",
        "blocks": [
          {
            "type": "p",
            "text": "Penyenaraian yang lengkap menyebut empat perkara sekurang-kurangnya: negara asal yang dinamakan, gred minyak, saiz botol dalam mililiter, dan satu tarikh — tarikh tuai kalau ada, atau tarikh luput. Kalau tajuk penyenaraian panjang dengan kata pujian tetapi keempat-empat perkara itu tiada, itu sendiri satu jawapan tentang siapa yang menjualnya. Gambar cantik bukan maklumat."
          },
          {
            "type": "ul",
            "items": [
              "**Negara asal yang dinamakan** — satu negara, bukan \"Mediterranean\" atau \"EU\".",
              "**Gred** — extra virgin, virgin atau ditapis, ditulis dengan jelas.",
              "**Saiz botol dalam mililiter** — supaya harga seliter boleh dikira sendiri.",
              "**Tarikh tuai atau tarikh luput** — satu tarikh sebenar, bukan \"stok baru\".",
              "**Jenis bekas** — kaca gelap atau tin, bukan botol jernih."
            ]
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunOnlineInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Senarai semak sebelum tekan butang bayar",
        "id": "senarai-semak-sebelum-bayar",
        "blocks": [
          {
            "type": "p",
            "text": "Enam semakan ini mengambil masa kurang seminit dan menjimatkan satu pemulangan. Baca tajuk penyenaraian sampai habis, buka bahagian penerangan, besarkan gambar label, dan cari nama penjual. Kalau mana-mana daripadanya kosong, tanya penjual dahulu melalui ruang mesej sebelum bayar, bukan selepas kotak sampai di pintu."
          },
          {
            "type": "ol",
            "items": [
              "Gred dan negara asal tertulis pada penyenaraian, bukan hanya pada gambar.",
              "Saiz botol dinyatakan, dan harga seliter dikira sendiri sebelum membanding.",
              "Ada tarikh tuai atau tarikh luput yang boleh dibaca.",
              "Gambar label boleh dibesarkan sehingga teks kecilnya terbaca.",
              "Nama penjual, alamat kedai dan nombor yang menjawab ada di halaman kedai.",
              "Dasar pemulangan untuk botol pecah atau bocor tertulis."
            ]
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunOnlineInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Risiko penghantaran dalam cuaca panas Malaysia",
        "id": "penghantaran-cuaca-panas",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun tidak suka haba dan cahaya, dan sebuah kotak dalam talian menemui kedua-duanya. Bahagian belakang van yang berhenti di bawah matahari tengah hari jauh lebih panas daripada udara di luar, dan kotak yang ditinggalkan di depan pintu petang itu terus terdedah. Perjalanan singkat tidak merosakkan minyak; perjalanan panjang dan panas mempercepatkan penuaannya."
          },
          {
            "type": "ul",
            "items": [
              "Botol kaca jernih menerima cahaya sepanjang perjalanan.",
              "Kotak yang menunggu berjam-jam di depan pintu — pesan pada hari anda ada di rumah.",
              "Bawa masuk kotak terus, dan simpan botol dalam almari gelap yang jauh dari dapur."
            ]
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunOnlineInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Pembungkusan yang sepatutnya anda terima",
        "id": "pembungkusan-yang-sepatutnya",
        "blocks": [
          {
            "type": "p",
            "text": "Kotak yang baik kelihatan membosankan: botol berbalut kertas atau buih, ruang kosong diisi supaya botol tidak bergolek, tutup dimeterai, dan kotak luar cukup tebal untuk ditindan. Botol kaca berat, dan sudut kotak yang lembik ialah tempat ia pecah. Kalau kotak sampai berminyak di bahagian bawah, ambil gambar sebelum membukanya."
          },
          {
            "type": "table",
            "head": [
              "Apa yang sampai",
              "Apa maknanya",
              "Apa perlu dibuat"
            ],
            "rows": [
              [
                "Botol berbalut, ruang kosong diisi",
                "Penjual biasa menghantar kaca",
                "Simpan kotak sehingga botol dibuka"
              ],
              [
                "Botol longgar dalam kotak kosong",
                "Pembungkusan tidak dirancang",
                "Rakam video buka kotak"
              ],
              [
                "Meterai tutup sudah koyak",
                "Botol pernah dibuka atau bocor",
                "Hubungi penjual sebelum digunakan"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunOnlineInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Kenapa penjual yang ada kedai fizikal lebih mudah dituntut",
        "id": "penjual-ada-kedai-fizikal",
        "blocks": [
          {
            "type": "p",
            "text": "Penjual yang ada alamat kedai, waktu operasi dan nombor telefon yang menjawab boleh dicari semula minggu depan. Kalau botol sampai pecah atau salah rasa, ada tempat untuk anda pergi dan ada orang yang namanya terikat pada barang itu. Akaun dalam talian tanpa alamat tidak memberi anda apa-apa untuk dituntut."
          },
          {
            "type": "p",
            "text": "Arabian Village di Malaysia diedarkan oleh Berkat Madinah Store, dengan lima cawangan di Selangor (Ampang, Kajang, Shah Alam, Cash & Carry di Ampang dan Sri Gombak). Tiada penjual sah yang lain di Malaysia. Kaunter Shopee dan TikTok Shop untuk jenama ini ialah kaunter milik kedai itu sendiri, bukan penjual pihak ketiga — stok yang sama, pintu masuk yang berbeza. Saiz ada pada [halaman produk](/products)."
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunOnlineInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Bila lebih baik beli di kedai",
        "id": "bila-lebih-baik-beli-di-kedai",
        "blocks": [
          {
            "type": "p",
            "text": "Pergi ke kedai apabila anda mahu memegang botol, membaca label kecil dengan mata sendiri, atau bertanya bila stok itu masuk. Kedai juga menang apabila anda membeli untuk hadiah dan mahu botol yang sempurna, atau apabila cuaca sedang panas terik dan anda tidak mahu kotak menunggu di luar pintu."
          },
          {
            "type": "ul",
            "items": [
              "Beli dalam talian untuk pembelian ulangan jenama yang sudah anda kenal rasanya.",
              "Beli di kedai untuk botol pertama, untuk hadiah, dan apabila anda mahu bertanya.",
              "Untuk cawangan dan waktu operasi, lihat [halaman tempat membeli](/shop)."
            ]
          },
          {
            "type": "image",
            "src": "pressBeliMinyakZaitunOnlineInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Bayar selepas semakan lulus",
      "blocks": [
        {
          "type": "p",
          "text": "Membeli dalam talian bukan risiko dengan sendirinya. Yang berisiko ialah membayar untuk penyenaraian yang tidak memberitahu anda negara asal, gred, saiz botol mahupun tarikh tuai atau tarikh luput."
        },
        {
          "type": "p",
          "text": "Semak keempat-empatnya dan lihat siapa penjualnya. Untuk saiz botol, lihat [senarai produk](/products)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Selamat ke beli minyak zaitun online di Malaysia?",
        "a": "Selamat kalau anda beli daripada kedai rasmi jenama atau pengedarnya, dan penyenaraian itu menyebut negara asal, gred, saiz botol dan satu tarikh. Yang menjadikannya berisiko bukan pembelian dalam talian, tetapi penyenaraian yang senyap tentang empat perkara itu."
      },
      {
        "q": "Apa perlu disemak pada penyenaraian sebelum bayar?",
        "a": "Empat perkara: negara asal yang dinamakan, gred yang ditulis, saiz botol dalam mililiter, dan tarikh tuai atau tarikh luput. Tambah satu lagi kalau boleh — gambar label yang cukup jelas untuk dibesarkan dan dibaca."
      },
      {
        "q": "Panas dalam van penghantaran boleh merosakkan minyak zaitun?",
        "a": "Haba dan cahaya mempercepatkan penuaan minyak zaitun, dan bahagian belakang van yang berhenti di bawah matahari tengah hari memang panas. Satu perjalanan singkat bukan masalah besar; kotak yang menunggu berjam-jam di depan pintu itu yang perlu dielakkan."
      },
      {
        "q": "Pembungkusan macam mana yang sepatutnya untuk botol kaca?",
        "a": "Botol berbalut kertas atau buih, ruang kosong dalam kotak diisi supaya botol tidak bergolek, tutup bermeterai, dan kotak luar yang cukup tebal. Simpan kotak dan resit sehingga botol dibuka dan rasanya disemak di rumah."
      },
      {
        "q": "Kaunter Shopee dan TikTok Shop itu penjual pihak ketiga?",
        "a": "Bukan. Untuk jenama ini, kaunter Shopee dan TikTok Shop itu dikendalikan oleh Berkat Madinah Store sendiri, kedai yang sama dengan stok yang sama seperti di cawangan mereka. Pintu masuknya sahaja yang berbeza."
      },
      {
        "q": "Kenapa penjual yang ada kedai fizikal lebih mudah dituntut?",
        "a": "Sebab ada alamat, waktu operasi dan nombor yang menjawab. Kalau botol sampai pecah, bocor atau bukan yang dipesan, anda tahu ke mana hendak pergi dan siapa yang bertanggungjawab pada barang itu."
      },
      {
        "q": "Bila lebih baik beli di kedai daripada dalam talian?",
        "a": "Untuk botol pertama sesuatu jenama, untuk hadiah, dan apabila anda mahu bertanya bila stok itu masuk. Selepas anda kenal rasanya dan tahu saiz yang sesuai, pembelian ulangan dalam talian lebih mudah."
      }
    ],
    "related": [
      {
        "label": "Di mana beli minyak zaitun di Kuala Lumpur",
        "path": "blog/di-mana-beli-minyak-zaitun-di-kuala-lumpur",
        "description": "Membeli di kedai fizikal di Lembah Klang: apa nak cari pada botol dan apa nak tanya kakitangan."
      },
      {
        "label": "Harga minyak zaitun di Malaysia",
        "path": "blog/harga-minyak-zaitun-di-malaysia",
        "description": "Apa yang anda bayar sebenarnya, dan cara membanding harga seliter antara gred yang sama."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin, saiz botol dan Koleksi Infusi enam rasa."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Berkat Madinah Store, lima cawangan di Selangor, serta kaunter dalam talian mereka sendiri."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "minyak-zaitun-palsu",
    "slug": "cara-kenal-minyak-zaitun-palsu",
    "seoTitle": "Minyak Zaitun Palsu: Ujian Peti Sejuk Itu Mitos",
    "metaTitle": "Minyak Zaitun Palsu: Ujian Peti Sejuk Itu Mitos",
    "metaDescription": "Bagaimana minyak zaitun dipalsukan, kenapa ujian peti sejuk dan ujian warna tidak membuktikan apa-apa, dan lima butiran yang memang boleh disemak.",
    "focusKeyword": "minyak zaitun palsu",
    "relatedKeywords": [
      "cara kenal minyak zaitun palsu",
      "minyak zaitun asli atau palsu",
      "ujian minyak zaitun peti sejuk",
      "minyak zaitun tiruan",
      "minyak zaitun dicampur",
      "minyak zaitun ditapis dijual sebagai dara",
      "label minyak zaitun mengelirukan",
      "tarikh tuaian minyak zaitun",
      "warna minyak zaitun",
      "harga minyak zaitun seliter",
      "ujian rumah minyak zaitun"
    ],
    "category": "Panduan Pembeli",
    "tags": [
      "Ketulenan",
      "Label Makanan",
      "Panduan Pembeli",
      "Extra Virgin",
      "Mitos Dapur"
    ],
    "h1": "Minyak zaitun palsu: cara ia dipalsukan dan ujian mana yang menipu anda",
    "excerpt": "Minyak dicampur, minyak ditapis dijual sebagai dara, label yang pandai berdiam. Dan tiga ujian dapur yang viral tetapi tidak membuktikan satu apa pun.",
    "keyTakeaway": "Minyak zaitun palsu lebih kerap bermaksud penggantian gred daripada racun: minyak murah dicampur masuk, minyak ditapis dijual pada harga dara, tuaian lama dilabel semula. Ujian peti sejuk, ujian pelita dan ujian warna tidak memisahkan yang tulen daripada yang tidak. Yang boleh disemak ialah tarikh tuaian, asal usul, botol, harga seliter dan penjual.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunPalsuHero",
      "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
    },
    "ogImage": "/og/blog-minyak-zaitun-palsu.jpg",
    "intro": [
      "Setiap kali harga minyak zaitun naik, video ujian rumah pun naik sekali di media sosial.",
      "Yang paling laris ialah ujian peti sejuk: masuk botol, tunggu semalaman, tengok ia beku atau tidak. Malangnya ujian itu tidak membuktikan apa-apa.",
      "Di sini kita asingkan dua perkara — bagaimana minyak zaitun benar-benar dipalsukan, dan ujian mana yang sekadar cerita."
    ],
    "sections": [
      {
        "heading": "Apa maksud minyak zaitun palsu?",
        "id": "apa-maksud-palsu",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun palsu jarang bermaksud racun dalam botol. Yang jauh lebih biasa ialah penggantian: minyak biji yang murah dicampur ke dalam botol berlabel dara, minyak ditapis yang sudah hilang rasa dijual pada harga extra virgin, atau minyak tuaian lama dilabel semula sebagai stok baharu. Isunya harga dan gred, bukan keselamatan."
          },
          {
            "type": "p",
            "text": "Sebab itulah ujian yang mencari sesuatu yang dramatik selalu gagal. Tiada apa-apa yang dramatik untuk dicari."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalsuInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Tiga cara sebotol dipalsukan",
        "id": "cara-dipalsukan",
        "blocks": [
          {
            "type": "p",
            "text": "Pemalsuan berlaku pada tiga titik dalam rantaian bekalan: di tangki pencampur, di kilang penapis, dan di mesin cetak label. Ketiga-tiganya menghasilkan botol yang kelihatan normal di rak, berbau lemah apabila dibuka, dan berharga sedikit lebih murah daripada jiran-jirannya di rak yang sama."
          },
          {
            "type": "ul",
            "items": [
              "**Campuran dengan minyak murah.** Minyak biji bunga matahari, kanola atau soya dimasukkan dalam nisbah yang tidak dikesan oleh lidah biasa. Rasa buah dan pedas menjadi tumpul.",
              "**Minyak ditapis dijual sebagai dara.** Penapisan membuang bau, rasa dan warna daripada minyak yang gagal ujian deria. Hasilnya murah dan hampir neutral.",
              "**Label yang pandai berdiam.** \"Dibungkus di\", \"premium\", \"gold\" — semuanya sah, dan tidak satu pun menjanjikan gred, tuaian atau ladang."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalsuInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Ujian peti sejuk ialah mitos",
        "id": "ujian-peti-sejuk",
        "blocks": [
          {
            "type": "p",
            "text": "Memasukkan minyak zaitun ke dalam peti sejuk untuk melihat sama ada ia membeku tidak membuktikan ketulenan. Minyak dara yang tulen boleh kekal cair, boleh menjadi berkabus, atau boleh membeku separa — bergantung pada varieti zaitun, kandungan lilin semula jadi dan suhu peti sejuk anda. Minyak ditapis berkelakuan sama."
          },
          {
            "type": "p",
            "text": "Ujian itu mengukur takat beku, dan takat beku bukan ukuran gred. Dua botol dara tulen daripada dua varieti berbeza boleh memberi dua keputusan berbeza pada malam yang sama."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalsuInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          },
          {
            "type": "note",
            "title": "Peti sejuk bukan tempat simpan",
            "text": "Simpan dalam almari gelap dan sejuk, jauh daripada dapur. Berkabus ketika sejuk memang normal dan minyak kembali jernih pada suhu bilik."
          }
        ]
      },
      {
        "heading": "Ujian pelita dan ujian warna",
        "id": "ujian-pelita-dan-warna",
        "blocks": [
          {
            "type": "p",
            "text": "Ujian pelita mendakwa minyak tulen akan menyala dengan sumbu, dan ujian warna mendakwa hijau pekat bermakna mutu tinggi. Kedua-duanya tidak berdiri. Hampir setiap minyak sayuran di rak pasar raya menyala dengan sumbu, dan warna minyak zaitun ditentukan oleh varieti serta kematangan buah ketika dituai."
          },
          {
            "type": "ul",
            "items": [
              "**Pelita.** Minyak kanola dan minyak bunga matahari membakar dengan baik. Nyalaan tidak menyebut apa-apa tentang gred.",
              "**Warna.** Penilai profesional menggunakan gelas rasa berwarna biru supaya warna tidak mempengaruhi mereka. Itu sahaja sudah menjawab.",
              "**Kesan pada kertas.** Semua minyak meninggalkan tompok berminyak. Tiada gred boleh dibaca daripada tompok itu.",
              "**Rasa dan bau** pula memang berguna, dan caranya ada dalam [cara memilih minyak zaitun dara asli](/blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia)."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalsuInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Tanda lawan makna",
        "id": "tanda-lawan-makna",
        "blocks": [
          {
            "type": "p",
            "text": "Kebanyakan tanda yang dikongsi dalam kumpulan WhatsApp ialah tanda tanpa makna, sementara tanda yang benar-benar bermakna duduk dalam cetakan kecil di belakang botol. Jadual ini meletakkan kedua-duanya bersebelahan. Baca lajur kanan dahulu, kerana lajur kiri itu yang paling laris dikongsi orang."
          },
          {
            "type": "table",
            "head": [
              "Tanda",
              "Apa ia bermakna"
            ],
            "rows": [
              [
                "Membeku dalam peti sejuk",
                "Tiada makna. Varieti dan suhu yang menentukan."
              ],
              [
                "Kekal cair dalam peti sejuk",
                "Tiada makna juga. Sebahagian minyak dara memang begitu."
              ],
              [
                "Menyala dalam pelita",
                "Tiada makna. Hampir semua minyak sayuran menyala."
              ],
              [
                "Warna hijau pekat",
                "Varieti dan kematangan buah, bukan gred."
              ],
              [
                "Tarikh tuaian dicetak",
                "Berguna. Usia minyak boleh disemak."
              ],
              [
                "Satu negara asal dinamakan",
                "Berguna. \"Dibungkus di\" membenarkan campuran banyak sumber."
              ],
              [
                "Harga separuh rak yang sama",
                "Amaran. Ada langkah dalam rantaian yang dilangkau."
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalsuInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Lima butiran yang boleh disemak",
        "id": "yang-boleh-disemak",
        "blocks": [
          {
            "type": "p",
            "text": "Tiada ujian dapur yang menggantikan makmal, tetapi ada lima butiran yang boleh anda semak dalam satu minit di depan rak. Kelimanya berkongsi satu ciri: setiap satu menuntut seseorang di hujung sana sanggup bertanggungjawab, dan penjual yang menyembunyikan sesuatu biasanya gagal pada lebih daripada satu."
          },
          {
            "type": "ol",
            "items": [
              "**Tarikh tuaian**, bukan sekadar tarikh luput. Minyak zaitun jus buah yang segar, jadi usianya lebih bermakna.",
              "**Satu negara asal yang dinamakan.** Palestin, Tunisia, Sepanyol — satu tempat, bukan senarai benua.",
              "**Kaca gelap atau tin.** Botol jernih di bawah lampu kedai menua paling cepat.",
              "**Harga seliter yang munasabah.** Tukar setiap botol kepada harga seliter sebelum membanding.",
              "**Penjual yang boleh dihubungi.** Kriterianya penuh dalam [cara menilai jenama minyak zaitun](/blog/cara-menilai-jenama-minyak-zaitun)."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPalsuInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Semak label, bukan peti sejuk",
      "blocks": [
        {
          "type": "p",
          "text": "Ujian yang viral menarik kerana ia pantas dan kelihatan saintifik. Yang berkesan lebih membosankan: baca belakang botol, banding harga seliter, dan rasa minyak itu sendiri."
        },
        {
          "type": "p",
          "text": "Minyak zaitun dara Arabian Village datang dari Palestin dengan asal usul yang dinamakan — lihat [halaman produk](/products) atau [cawangan Berkat Madinah Store](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Betul ke minyak zaitun asli mesti membeku dalam peti sejuk?",
        "a": "Tidak. Minyak dara yang tulen boleh kekal cair, berkabus atau membeku separa bergantung pada varieti zaitun dan suhu peti sejuk itu. Minyak ditapis pun berkelakuan sama, jadi ujian itu tidak memisahkan apa-apa."
      },
      {
        "q": "Kalau minyak menyala dalam pelita, itu tanda ia tulen?",
        "a": "Tidak. Hampir semua minyak sayuran menyala apabila ada sumbu. Minyak kanola, minyak bunga matahari dan minyak zaitun ditapis semuanya membakar dengan baik, jadi nyalaan tidak menyebut apa-apa tentang gred atau ketulenan botol itu."
      },
      {
        "q": "Warna hijau pekat bermakna minyak lebih baik?",
        "a": "Tidak. Warna datang daripada varieti zaitun dan kematangan buah ketika dituai, kadangkala daripada pewarna. Penilai profesional menggunakan gelas rasa biru supaya warna langsung tidak mempengaruhi penilaian mereka, dan itu sudah cukup menjawab soalan ini."
      },
      {
        "q": "Minyak zaitun yang murah semestinya palsu?",
        "a": "Tidak semestinya. Harga rendah selalunya bermakna gred berbeza, bukan penipuan. Minyak dara ada lantai kos kerana lima hingga sepuluh kilogram zaitun menghasilkan satu liter sahaja. Banding harga seliter, bukan sebotol."
      },
      {
        "q": "Ujian rumah mana yang paling berbaloi dibuat?",
        "a": "Merasa dan menghidu. Minyak dara yang segar berbau buah, terasa sedikit pahit, dan pedas di pangkal tekak. Hambar, berlilin atau berbau krayon lama bermakna minyak sudah tua atau sudah ditapis."
      },
      {
        "q": "Apa yang perlu dicari pada label sebelum membayar?",
        "a": "Tarikh tuaian, satu negara asal yang dinamakan, perkataan gred yang tepat, kaca gelap atau tin, dan penjual yang boleh dihubungi. Lima butiran itu lebih bermakna daripada mana-mana ujian dapur yang tersebar di media sosial."
      }
    ],
    "related": [
      {
        "label": "Cara memilih minyak zaitun dara asli di Malaysia",
        "path": "blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia",
        "description": "Perkataan gred pada label, tarikh tuaian, ujian rasa dua minit di rumah, dan perangkap yang perlu dielak."
      },
      {
        "label": "Cara menilai jenama minyak zaitun",
        "path": "blog/cara-menilai-jenama-minyak-zaitun",
        "description": "Lima kriteria yang boleh anda periksa sendiri di depan rak, tanpa bergantung pada senarai nama jenama."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, berserta Koleksi Infusi enam rasa."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan kaunter dalam talian rasmi Berkat Madinah Store."
      },
      {
        "label": "Minyak zaitun original: apa perkataan itu janjikan",
        "path": "blog/minyak-zaitun-original-cara-pastikan",
        "description": "Apa yang boleh disahkan sebelum bayar, dan apa yang tidak boleh."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "minyak-zaitun-tulen",
    "slug": "maksud-minyak-zaitun-tulen",
    "seoTitle": "Minyak Zaitun Tulen: Maksud Sebenar pada Label",
    "metaTitle": "Minyak Zaitun Tulen: Maksud Sebenar pada Label",
    "metaDescription": "\"Tulen\" bukan gred rasmi. Gred ialah extra virgin, virgin dan minyak ditapis. Jadual istilah pemasaran lawan istilah gred, dan apa nak baca pada label.",
    "focusKeyword": "minyak zaitun tulen",
    "relatedKeywords": [
      "maksud minyak zaitun tulen",
      "minyak zaitun asli",
      "minyak zaitun original",
      "pure olive oil maksud",
      "extra virgin vs pure olive oil",
      "beza minyak zaitun dara dan biasa",
      "minyak zaitun premium",
      "perahan sejuk pertama",
      "label minyak zaitun",
      "gred minyak zaitun",
      "minyak zaitun light"
    ],
    "category": "Panduan Pembeli",
    "tags": [
      "Minyak Zaitun Tulen",
      "Gred Minyak Zaitun",
      "Label dan Istilah",
      "Panduan Pembeli",
      "Extra Virgin"
    ],
    "h1": "Maksud \"Minyak Zaitun Tulen\": Perkataan Pemasaran atau Gred?",
    "excerpt": "Perkataan tulen tiada takrif undang-undang, dan \"pure olive oil\" di pasaran antarabangsa bermaksud campuran ditapis. Jadual istilah pemasaran lawan istilah gred.",
    "keyTakeaway": "Minyak zaitun tulen ialah perkataan pemasaran, bukan gred. Gred yang lazim di rak runcit ada empat: extra virgin, virgin, minyak zaitun ditapis, dan pomace. Lebih mengelirukan lagi, \"pure olive oil\" di pasaran antarabangsa bermaksud campuran minyak ditapis dengan sedikit minyak dara, jadi botol bertanda pure sebenarnya kurang dara, bukan lebih.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunTulenHero",
      "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
    },
    "ogImage": "/og/blog-minyak-zaitun-tulen.jpg",
    "intro": [
      "Di rak kedai, perkataan \"tulen\" muncul pada botol demi botol minyak zaitun.",
      "Ia berbunyi seperti satu jaminan, tetapi ia bukan gred, dan tiada pihak berkuasa menetapkan apa yang layak dipanggil tulen.",
      "Yang menentukan isi botol ialah gred di sebelahnya. Artikel ini mengasingkan dua jenis perkataan itu."
    ],
    "sections": [
      {
        "heading": "\"Tulen\" bukan gred — jadi apa maksudnya?",
        "id": "tulen-bukan-gred",
        "blocks": [
          {
            "type": "p",
            "text": "Dalam bahasa harian, tulen bermaksud tidak dicampur: minyak zaitun sahaja, tanpa minyak lain dimasukkan. Itu maksud yang munasabah, tetapi ia bukan kategori undang-undang. Gred rasmi yang sampai ke rak runcit hanya tiga: extra virgin, virgin, dan minyak zaitun ditapis. Perkataan tulen tidak muncul dalam senarai itu, dan tiada makmal boleh mengujinya."
          },
          {
            "type": "p",
            "text": "Gred menerangkan cara minyak dikeluarkan daripada buah dan had keasidannya. Perinciannya ada dalam [panduan gred minyak zaitun](/blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunTulenInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Kenapa \"pure olive oil\" bermaksud kurang dara, bukan lebih",
        "id": "pure-olive-oil",
        "blocks": [
          {
            "type": "p",
            "text": "Di pasaran antarabangsa, \"pure olive oil\" ialah nama dagang untuk satu campuran: minyak zaitun ditapis, dengan sedikit minyak dara dimasukkan semula untuk mengembalikan warna dan rasa. Botol bertanda pure sebenarnya kurang dara daripada botol extra virgin di sebelahnya. Pembeli di Malaysia membaca pure sebagai tulen, dan di situlah salah fahamnya bermula."
          },
          {
            "type": "note",
            "title": "Ujian pantas di rak",
            "text": "Cari perkataan gred, bukan perkataan pujian. Botol yang menulis \"olive oil\" atau \"pure\" tanpa perkataan virgin ialah campuran yang mengandungi minyak ditapis."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunTulenInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Istilah pemasaran lawan istilah gred",
        "id": "istilah-lawan-gred",
        "blocks": [
          {
            "type": "p",
            "text": "Cara paling mudah membaca label ialah mengasingkan perkataan yang membawa makna undang-undang daripada perkataan yang membawa perasaan. Extra virgin, virgin dan ditapis ada takrif serta had yang boleh diuji. Tulen, asli, original, premium dan natural tiada takrif sebegitu, dan sesiapa sahaja boleh mencetaknya pada mana-mana botol."
          },
          {
            "type": "table",
            "head": [
              "Perkataan pada botol",
              "Ada takrif rasmi?",
              "Apa ia beritahu"
            ],
            "rows": [
              [
                "Tulen",
                "Tidak",
                "Dakwaan penjual bahawa minyak tidak dicampur"
              ],
              [
                "Asli",
                "Tidak",
                "Sama seperti tulen; bergantung pada bukti lain"
              ],
              [
                "Original",
                "Tidak",
                "Perkataan jenama, bukan maklumat isi botol"
              ],
              [
                "Premium",
                "Tidak",
                "Kedudukan harga, bukan ukuran kualiti"
              ],
              [
                "Natural",
                "Tidak",
                "Semua minyak zaitun jus buah; perkataan kosong"
              ],
              [
                "First press / perahan pertama",
                "Tidak",
                "Hari ini semua minyak dara satu perahan sahaja"
              ],
              [
                "Perahan sejuk",
                "Sebahagian",
                "Kaedah pengekstrakan; bukan gred dengan sendirinya"
              ],
              [
                "Extra virgin",
                "Ya",
                "Perahan mekanikal, keasidan bebas 0.8% atau kurang"
              ],
              [
                "Virgin",
                "Ya",
                "Kaedah sama, had keasidan lebih longgar"
              ],
              [
                "Pure / olive oil",
                "Ya",
                "Campuran ditapis dengan sedikit minyak dara"
              ],
              [
                "Light / extra light",
                "Ya",
                "Campuran ditapis; merujuk warna dan rasa"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunTulenInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Apa yang perlu dibaca pada label",
        "id": "baca-label",
        "blocks": [
          {
            "type": "p",
            "text": "Label yang jujur memberitahu empat perkara dalam satu pandangan: gred yang tepat, negara asal yang dinamakan, tarikh tuai atau tarikh pembotolan, dan siapa yang boleh dihubungi kalau ada masalah. Kalau ruang label habis untuk perkataan pujian dan keempat-empat itu tiada, botol itu bercakap tentang dirinya, bukan minyaknya."
          },
          {
            "type": "ol",
            "items": [
              "Cari perkataan gred yang tepat, extra virgin atau virgin, bukan sekadar olive oil.",
              "Semak satu negara asal yang dinamakan, bukan campuran pelbagai negara yang kabur.",
              "Cari tarikh tuai; kalau hanya ada tarikh luput, tanya bila minyak itu diperah.",
              "Lihat bekasnya: kaca gelap atau tin melindungi minyak daripada cahaya lampu rak.",
              "Pastikan ada nama pengimport atau penjual yang boleh dihubungi di Malaysia."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunTulenInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "\"Tulen\" masih berguna, tetapi bukan sebagai bukti",
        "id": "tulen-sebagai-soalan",
        "blocks": [
          {
            "type": "p",
            "text": "Perkataan tulen tetap ada tempatnya dalam percakapan harian: pembeli menggunakannya untuk bertanya sama ada minyak itu sudah dicampur dengan minyak biji yang lebih murah. Soalan itu memang munasabah. Cuma jawapannya tidak boleh datang daripada perkataan yang sama pada label; ia datang daripada gred, asal usul dan harga yang masuk akal."
          },
          {
            "type": "ul",
            "items": [
              "Tanya gred: jawapan extra virgin boleh disemak pada label, jawapan tulen tidak.",
              "Tanya asal: satu negara yang dinamakan lebih bermakna daripada wilayah yang kabur.",
              "Tanya harga seliter: minyak dara ada lantai kos, dan harga yang terlalu rendah biasanya bermakna gred berbeza. Lihat [saiz dan harga](/products)."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunTulenInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Beza tulen dengan organik dan halal",
        "id": "tulen-organik-halal",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga perkataan ini selalu berdiri bersebelahan pada botol yang sama, tetapi hanya dua daripadanya boleh disemak oleh orang luar. Organik dan halal disokong oleh badan pensijilan, nombor sijil dan senarai awam. Tulen pula tiada badan, tiada nombor dan tiada senarai; ia kekal sebagai kata-kata penjual."
          },
          {
            "type": "p",
            "text": "Apa yang sebenarnya disahkan oleh perkataan organik diterangkan dalam [maksud minyak zaitun organik](/blog/minyak-zaitun-organik-apa-maksudnya)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunTulenInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Baca gred dahulu, perkataan lain kemudian",
      "blocks": [
        {
          "type": "p",
          "text": "Perkataan tulen memberitahu apa yang penjual mahu anda rasa. Perkataan gred memberitahu apa yang ada dalam botol, dan hanya satu daripada dua itu boleh disemak."
        },
        {
          "type": "p",
          "text": "Mulakan dengan gred, kemudian tarikh tuai dan asal usul. [Lihat tempat membeli](/shop) untuk cawangan Berkat Madinah Store."
        }
      ]
    },
    "faqs": [
      {
        "q": "Adakah \"minyak zaitun tulen\" satu gred rasmi?",
        "a": "Bukan. Gred ditetapkan oleh piawaian perdagangan antarabangsa, dan yang sampai ke rak runcit ialah extra virgin, virgin serta minyak zaitun ditapis. Tulen ialah perkataan pemasaran tanpa takrif, tanpa had yang boleh diuji, dan tanpa pihak yang mengesahkannya."
      },
      {
        "q": "Adakah \"pure olive oil\" lebih tulen daripada extra virgin?",
        "a": "Sebaliknya. Pure olive oil ialah nama dagang untuk campuran minyak ditapis dengan sedikit minyak dara dimasukkan semula. Botol yang bertanda pure mengandungi kurang minyak dara berbanding botol extra virgin, walaupun perkataannya berbunyi lebih meyakinkan kepada pembeli Malaysia."
      },
      {
        "q": "Kalau botol hanya tertulis \"olive oil\", itu apa?",
        "a": "Itu biasanya campuran yang sama seperti pure: minyak ditapis dengan sedikit minyak dara. Ketiadaan perkataan virgin pada label ialah maklumatnya. Minyak begitu lebih neutral rasanya dan lebih murah seliter berbanding minyak dara."
      },
      {
        "q": "Adakah \"perahan sejuk pertama\" membuktikan minyak itu bagus?",
        "a": "Ia menerangkan kaedah, bukan gred. Perahan sejuk bermakna minyak diekstrak secara mekanikal tanpa haba tambahan, dan itu perbezaan sebenar daripada minyak ditapis. Namun ia sendiri tidak membuktikan kualiti; gred, tarikh tuai dan rasa yang membuktikannya."
      },
      {
        "q": "Bagaimana nak tahu minyak saya sudah bercampur minyak lain?",
        "a": "Ujian rumah tidak menjawab soalan itu, dan ujian peti sejuk pula mitos. Yang boleh anda semak ialah gred pada label, negara asal yang dinamakan, tarikh tuai, harga seliter yang munasabah, dan penjual yang boleh dihubungi."
      },
      {
        "q": "Berbaloi ke bayar lebih untuk botol bertanda premium?",
        "a": "Premium tiada takrif, jadi ia tidak menambah apa-apa maklumat pada harga. Bandingkan gred yang sama, saiz yang sama dan harga seliter. Kalau dua botol sama-sama extra virgin, perkataan premium pada salah satunya tidak mengubah apa-apa."
      },
      {
        "q": "Adakah minyak zaitun \"light\" lebih ringan?",
        "a": "Light merujuk warna dan rasa selepas penapisan, bukan tekstur atau berat minyak. Ia campuran ditapis yang hampir hilang aroma zaitunnya. Kalau anda mahu rasa buah, pahit dan pedas, perkataan yang dicari ialah extra virgin."
      }
    ],
    "related": [
      {
        "label": "Apa itu minyak zaitun extra virgin dan gred lain",
        "path": "blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain",
        "description": "Gred extra virgin, virgin, ditapis dan pomace, dan apa yang berubah pada rasa serta harga."
      },
      {
        "label": "Minyak zaitun organik: apa maksudnya",
        "path": "blog/minyak-zaitun-organik-apa-maksudnya",
        "description": "Apa yang disahkan oleh pensijilan organik, dan apa yang tidak disahkannya."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "minyak-zaitun-untuk-kek",
    "slug": "minyak-zaitun-untuk-kek-dan-bakeri",
    "seoTitle": "Minyak Zaitun untuk Kek: Jadual Tukar Mentega",
    "metaTitle": "Minyak Zaitun untuk Kek: Jadual Tukar Mentega",
    "metaDescription": "Ganti mentega dengan minyak zaitun pada tiga suku isi padu. Jadual penukaran, kek yang sesuai dengan minyak dara, dan satu nisbah kek oren.",
    "focusKeyword": "minyak zaitun untuk kek",
    "relatedKeywords": [
      "kek minyak zaitun",
      "ganti mentega dengan minyak zaitun",
      "nisbah minyak zaitun kek",
      "olive oil untuk kek",
      "kek lemon minyak zaitun",
      "kek oren minyak zaitun",
      "minyak zaitun untuk bakeri",
      "kek span minyak zaitun",
      "berapa ml minyak ganti mentega",
      "resepi kek minyak zaitun"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun untuk Kek",
      "Bakeri",
      "Panduan Dapur",
      "Dapur Malaysia",
      "Extra Virgin"
    ],
    "h1": "Minyak Zaitun untuk Kek: Penukaran Mentega dan Kek yang Sesuai",
    "excerpt": "Nisbah tiga suku isi padu, jadual penukaran mentega kepada minyak, kek yang menerima rasa minyak dara, dan satu nisbah kek oren yang sudah dikira.",
    "keyTakeaway": "Minyak zaitun untuk kek menggantikan mentega pada kira-kira tiga suku isi padu, jadi 100 gram mentega menjadi lebih kurang 75 mililiter minyak. Kek yang terhasil kekal lembap lebih lama kerana minyak tidak memejal apabila sejuk. Kek coklat, lemon dan oren menerima minyak dara yang kuat rasanya, manakala kek span dan kek pandan lebih baik dengan minyak yang lembut.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukKekHero",
      "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-kek.jpg",
    "intro": [
      "Kek minyak zaitun jarang muncul dalam buku resepi Melayu kerana dapur kita membesar dengan mentega dan marjerin.",
      "Tukarannya pun bukan satu lawan satu. Di bawah ada jadual penukaran, kek yang sesuai dengan minyak dara yang kuat rasanya, dan satu nisbah kek oren yang sudah dikira."
    ],
    "sections": [
      {
        "heading": "Boleh ke buat kek dengan minyak zaitun?",
        "id": "boleh-ke-buat-kek",
        "blocks": [
          {
            "type": "p",
            "text": "Boleh, dan kaedahnya lebih pendek daripada kek mentega. Minyak zaitun masuk ke dalam mangkuk sebagai lemak cair, jadi tiada langkah memukul mentega dengan gula sehingga kembang. Udara datang daripada telur dan serbuk penaik, adunan siap dalam satu mangkuk, dan kek keluar dengan serat yang halus serta lembut walaupun sudah sejuk."
          },
          {
            "type": "p",
            "text": "Yang berubah ialah rasa. Minyak zaitun dara membawa rasa buah dan sedikit pedas masuk ke dalam kek. Panduan am memasak ada dalam [panduan minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukKekInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Jadual penukaran mentega kepada minyak zaitun",
        "id": "jadual-penukaran",
        "blocks": [
          {
            "type": "p",
            "text": "Nisbah yang boleh diguna terus ialah kira-kira tiga suku: setiap 100 gram mentega dalam resepi ditukar kepada lebih kurang 75 mililiter minyak zaitun. Mentega sebahagiannya air dan pepejal susu, jadi menuang isi padu penuh minyak yang semuanya lemak akan meninggalkan kek yang berat dan berminyak. Resepi yang memang mencairkan menteganya paling senang ditukar."
          },
          {
            "type": "table",
            "head": [
              "Mentega",
              "Minyak zaitun",
              "Contoh bakeri rumah"
            ],
            "rows": [
              [
                "60 g",
                "45 ml",
                "Kek cawan"
              ],
              [
                "100 g",
                "75 ml",
                "Kek 20 cm satu lapis"
              ],
              [
                "200 g",
                "150 ml",
                "Kek dua lapis"
              ],
              [
                "250 g",
                "190 ml",
                "Kek span kenduri"
              ],
              [
                "1 cawan",
                "3/4 cawan",
                "Resepi Amerika"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukKekInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          },
          {
            "type": "p",
            "text": "Sukat minyak dalam jag bersenggat, bukan dengan cawan penyukat bahan kering."
          }
        ]
      },
      {
        "heading": "Kenapa kek minyak kekal lembap lebih lama",
        "id": "kekal-lembap",
        "blocks": [
          {
            "type": "p",
            "text": "Mentega memejal semula apabila kek sejuk, jadi kek mentega terasa keras dan kering pada hari kedua sehingga dihangatkan semula. Minyak zaitun kekal cair pada suhu bilik Malaysia yang sekitar 28 hingga 32 darjah, jadi tekstur kek hampir sama pagi esoknya. Sebab itu bakeri rumah yang menjual sehari selepas membakar lebih selesa dengan adunan minyak."
          },
          {
            "type": "ul",
            "items": [
              "Biarkan kek betul-betul sejuk sebelum ditutup, kerana wap terperangkap mempercepat kulat dalam cuaca lembap.",
              "Simpan dalam bekas kedap udara di atas meja dapur, jauh daripada matahari.",
              "Kek bersalut krim keju atau krim mentega tetap perlu masuk peti sejuk."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukKekInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Kek mana mahu minyak yang kuat, mana mahu yang lembut",
        "id": "padankan-minyak-dengan-kek",
        "blocks": [
          {
            "type": "p",
            "text": "Rasa minyak tidak sembunyi dalam kek, jadi padankan kekuatan minyak dengan kekuatan kek. Kek coklat gelap, kek lemon dan kek badam cukup kuat untuk menerima minyak dara yang pahit dan sedikit pedas. Kek span vanila, kek pandan dan kek pisang untuk budak-budak lebih baik dengan minyak zaitun yang lembut."
          },
          {
            "type": "ul",
            "items": [
              "**Terima minyak yang kuat:** kek coklat gelap, kek lemon, kek oren dan kek berempah.",
              "**Mahu minyak yang lembut:** kek span, kek pandan dan kek pisang.",
              "**Infusi yang manis** seperti lavender dan kamomil sesuai dalam adunan, di mana aromanya terlindung."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukKekInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Sitrus dan minyak zaitun: satu nisbah yang sudah dikira",
        "id": "sitrus-dan-nisbah",
        "blocks": [
          {
            "type": "p",
            "text": "Sitrus berpadan dengan minyak zaitun kerana aroma kedua-duanya terbawa dalam lemak. Gosok parutan kulit oren atau lemon ke dalam gula dengan hujung jari sebelum bahan lain masuk, sehingga gula itu menjadi lembap dan wangi. Jus sahaja memberi rasa masam; kulitnya yang memberi bau buah."
          },
          {
            "type": "ol",
            "items": [
              "Gosok parutan kulit satu biji oren ke dalam 160 g gula kastor.",
              "Pukul masuk dua biji telur, kemudian 130 ml minyak zaitun sedikit demi sedikit.",
              "Kacau masuk 150 g yogurt tawar dan tiga sudu besar jus oren.",
              "Ayak masuk 220 g tepung gandum, satu setengah sudu kecil serbuk penaik dan secubit garam.",
              "Bakar dalam loyang bar 22 cm pada 170 darjah Celsius selama 45 hingga 50 minit."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukKekInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Minyak berada dalam adunan, bukan dalam kuali panas",
        "id": "suhu-ketuhar",
        "blocks": [
          {
            "type": "p",
            "text": "Takat asap bukan kekangan apabila membakar kek. Minyak dalam kek duduk dalam adunan yang basah, dan bahagian tengah kek tidak melepasi takat didih air selagi ia masih lembap. Yang benar-benar panas ialah udara ketuhar dan permukaan loyang, bukan minyak itu sendiri. Bakar pada suhu resepi asal, biasanya 170 hingga 180 darjah Celsius."
          },
          {
            "type": "note",
            "title": "Kalau tepi kek cepat gelap",
            "text": "Turunkan suhu sepuluh darjah dan lanjutkan masa bakar lima minit. Adunan minyak lebih cair, jadi ia mengalir rapat ke tepi loyang yang panas."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukKekInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Mula dengan resepi yang anda sudah hafal",
      "blocks": [
        {
          "type": "p",
          "text": "Ambil satu resepi kek yang anda sudah biasa buat, tukar menteganya pada tiga suku isi padu minyak zaitun, dan bakar pada suhu yang sama seperti biasa tanpa mengubah apa-apa lagi."
        },
        {
          "type": "p",
          "text": "Untuk saiz botol yang ada, lihat [minyak zaitun dara Arabian Village](/products); untuk hidangan bukan kek, cuba [resepi mudah dengan minyak zaitun](/blog/resepi-mudah-dengan-minyak-zaitun)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Berapa banyak minyak zaitun ganti 250 g mentega?",
        "a": "Kira-kira 190 mililiter. Nisbahnya tiga suku isi padu, kerana mentega mengandungi air dan pepejal susu sementara minyak zaitun semuanya lemak. Sukat minyak dalam jag bersenggat dan bukan dengan cawan penyukat bahan kering."
      },
      {
        "q": "Kek saya berbau minyak zaitun terlalu kuat, kenapa?",
        "a": "Minyak dara yang pahit dan pedas memang kekal rasanya selepas dibakar. Untuk kek yang lembut seperti kek span atau kek pandan, pilih minyak zaitun yang lebih muda dan lembut, atau tukar separuh sahaja daripada menteganya."
      },
      {
        "q": "Boleh ke tukar mentega dalam butter cake?",
        "a": "Boleh dari segi teknikal, tetapi butter cake wujud kerana rasa menteganya. Tukar dengan minyak zaitun dan ia menjadi kek yang lain sama sekali. Simpan penukaran itu untuk kek yang rasanya datang daripada buah, coklat atau rempah."
      },
      {
        "q": "Perlu ke ubah suhu ketuhar bila guna minyak?",
        "a": "Tidak perlu. Bakar pada suhu yang sama seperti resepi asal, biasanya 170 hingga 180 darjah Celsius. Takat asap tidak terlibat kerana minyak berada di dalam adunan yang basah, bukan dalam kuali kosong yang panas."
      },
      {
        "q": "Kek minyak zaitun tahan berapa lama di suhu bilik?",
        "a": "Dua hingga tiga hari dalam bekas kedap udara, jauh daripada matahari. Cuaca lembap Malaysia mempercepat kulat, jadi pastikan kek betul-betul sejuk sebelum ditutup. Kek bersalut krim keju perlu masuk peti sejuk."
      },
      {
        "q": "Kenapa kek minyak zaitun saya keluar berminyak?",
        "a": "Selalunya kerana isi padu minyak yang dituang sama banyak dengan berat mentega dalam resepi asal. Turunkan kepada tiga suku. Punca kedua ialah adunan yang dipukul terlalu lama sehingga lemak berpisah daripada telur."
      }
    ],
    "related": [
      {
        "label": "Resepi mudah dengan minyak zaitun",
        "path": "blog/resepi-mudah-dengan-minyak-zaitun",
        "description": "Empat hidangan ringkas dengan sukatan sudu besar, untuk malam ini, bukan untuk ketuhar kek."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Panduan am memasak dengan minyak zaitun, julat suhu, dan kerja dapur yang paling sesuai dengannya."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi enam rasa."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      },
      {
        "label": "Ais krim minyak zaitun",
        "path": "blog/minyak-zaitun-ais-krim",
        "description": "Pencuci mulut gaya Mediterranean, rasa buah dan pedas extra virgin menonjol."
      },
      {
        "label": "Kek oren minyak zaitun",
        "path": "blog/minyak-zaitun-kek-oren",
        "description": "Satu resepi kek spesifik: kulit dan jus oren, kek lembap tanpa peti sejuk."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "minyak-zaitun-vs-minyak-kelapa",
    "slug": "minyak-zaitun-vs-minyak-kelapa",
    "seoTitle": "Minyak Zaitun vs Minyak Kelapa: Guna Mana, Bila?",
    "metaTitle": "Minyak Zaitun vs Minyak Kelapa: Guna Mana, Bila?",
    "metaDescription": "Banding dua minyak sebagai lemak masakan: rasa, tekstur pada suhu dapur Malaysia, kesan pada rendang, kek dan salad, serta kos seliter.",
    "focusKeyword": "minyak zaitun vs minyak kelapa",
    "relatedKeywords": [
      "minyak kelapa vs minyak zaitun",
      "beza minyak zaitun dan minyak kelapa",
      "minyak zaitun atau minyak kelapa untuk masak",
      "minyak kelapa dara vs minyak zaitun dara",
      "kenapa minyak kelapa membeku",
      "minyak zaitun beku ke",
      "minyak untuk salad di Malaysia",
      "minyak zaitun untuk kek",
      "kos minyak zaitun seliter",
      "minyak untuk tumis rempah rendang",
      "banding minyak masak Malaysia"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun vs Minyak Kelapa",
      "Perbandingan Minyak",
      "Dapur Malaysia",
      "Teknik Memasak",
      "Kos Dapur"
    ],
    "h1": "Minyak Zaitun vs Minyak Kelapa dalam Dapur Malaysia",
    "excerpt": "Satu mengeras putih dalam dapur berhawa dingin, satu lagi kekal cair sepanjang tahun. Banding rasa, tekstur, kesan pada rendang, kek dan salad, serta kos seliter.",
    "keyTakeaway": "Minyak zaitun vs minyak kelapa bukan soal yang mana lebih hebat, tetapi kerja yang mana. Minyak kelapa mengeras menjadi putih pejal dalam bilik berhawa dingin dan membawa bau kelapa yang jelas. Minyak zaitun dara kekal cair, membawa rasa hijau dan pedas, dan paling menjadi pada hidangan sejuk serta kerja bersukat sudu.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunVsMinyakKelapaHero",
      "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
    },
    "ogImage": "/og/blog-minyak-zaitun-vs-minyak-kelapa.jpg",
    "intro": [
      "Dapur Malaysia biasanya ada kedua-duanya: sebotol minyak kelapa di rak dan sebotol minyak zaitun di sebelahnya.",
      "Soalannya bukan yang mana lebih hebat, tetapi yang mana patut dicapai untuk kerja malam ini.",
      "Kita banding dua-dua sebagai lemak masakan sahaja: tekstur, rasa, kesan pada hidangan, dan kos."
    ],
    "sections": [
      {
        "heading": "Beza paling ketara antara dua minyak ini",
        "id": "beza-paling-ketara",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak kelapa dan minyak zaitun dara berkelakuan berbeza sebelum api dinyalakan lagi. Satu boleh mengeras menjadi putih pejal, satu lagi kekal cair sepanjang tahun. Rasanya juga menarik hidangan ke arah berlainan: kelapa membawa manis dan wangi santan, zaitun membawa hijau, sedikit pahit dan denyut pedas di hujung tekak."
          },
          {
            "type": "note",
            "title": "Kalau soalan sebenar anda ialah kesihatan",
            "text": "Artikel ini membandingkan dua minyak sebagai lemak masakan sahaja. Soalan tentang pemakanan adalah untuk pakar diet, bukan untuk penjual minyak."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakKelapaInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Suhu dapur dan bilik berhawa dingin: yang mana mengeras",
        "id": "tekstur-suhu-bilik",
        "blocks": [
          {
            "type": "p",
            "text": "Pada tengah hari yang panas di dapur tanpa penghawa dingin, minyak kelapa duduk sebagai cecair keruh yang lembut. Hidupkan penghawa dingin sehingga bilik turun ke bawah kira-kira 24 darjah, ia mula mengeras menjadi putih pejal dalam botol. Minyak zaitun kekal cair pada kedua-dua keadaan itu."
          },
          {
            "type": "ul",
            "items": [
              "Minyak kelapa dalam dapur berhawa dingin perlu dicedok, bukan dituang.",
              "Minyak zaitun boleh terus dituang dari botol pada bila-bila masa.",
              "Minyak kelapa yang mengeras dalam botol sukar disukat dengan tepat."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakKelapaInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Rasa: apa yang setiap satu bawa ke dalam pinggan",
        "id": "rasa-dua-minyak",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak kelapa dara membawa bau dan rasa kelapa yang jelas, manis dan berlemak, yang terus masuk ke dalam hidangan. Minyak zaitun dara pula membawa rasa hijau seperti rumput atau daun, dengan sedikit pahit dan denyut pedas di belakang tekak. Minyak kelapa yang ditapis pula hampir tidak berbau."
          },
          {
            "type": "p",
            "text": "Rasa itu berubah dengan haba. Minyak kelapa dara mengekalkan bau kelapanya walaupun selepas dipanaskan, manakala rasa hijau minyak zaitun dara paling utuh apabila ia tidak dipanaskan langsung. Butiran haba ada dalam [panduan minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakKelapaInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Rendang, kek dan salad: tiga ujian dapur",
        "id": "rendang-kek-salad",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga hidangan menunjukkan bezanya dengan cepat. Rendang direbus lama dengan santan, jadi rasa hijau minyak zaitun hilang di tengah rempah. Kek minyak kekal lembap kerana minyak zaitun kekal cair pada suhu bilik Malaysia. Salad pula tempat minyak zaitun paling menonjol kerana ia dituang tanpa dipanaskan langsung."
          },
          {
            "type": "ul",
            "items": [
              "Rendang: santan sudah membawa lemak kelapa, jadi tumis rempah dengan minyak masak.",
              "Kek: minyak zaitun memberi kek yang kekal lembap, minyak kelapa memberi bau kelapa yang jelas.",
              "Salad: minyak kelapa akan berketul di atas sayur sejuk, minyak zaitun tidak."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakKelapaInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Kos seliter: dua kelas harga yang berbeza",
        "id": "kos-seliter",
        "blocks": [
          {
            "type": "p",
            "text": "Dua minyak ini bukan dalam kelas harga yang sama. Minyak kelapa dibuat dan dibotolkan di rantau ini dan harganya seliter jauh lebih rendah di rak pasar raya. Minyak zaitun dara datang dari luar negara, diperah sejuk dan dibotolkan dalam kaca gelap, dan harganya mencerminkan itu. Semak sendiri kedua-dua label."
          },
          {
            "type": "p",
            "text": "Kalau kerja itu memerlukan seliter minyak sekali gus, minyak kelapa atau minyak masak biasa lebih masuk akal. Untuk renjis dan salad, sebotol kecil bertahan lama. Lihat [saiz dan harga di halaman produk](/products), dan bandingkan pula dengan [minyak masak lain](/blog/minyak-zaitun-vs-minyak-masak-lain)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakKelapaInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Guna yang mana untuk apa",
        "id": "guna-yang-mana",
        "blocks": [
          {
            "type": "p",
            "text": "Cara paling mudah memilih ialah tanya berapa banyak minyak yang kerja itu perlukan dan sama ada haba tinggi terlibat. Kerja bersukat sudu dan hidangan sejuk memihak kepada minyak zaitun. Periuk penuh, api besar dan bakeri yang mahu bau kelapa memihak kepada minyak kelapa atau minyak masak biasa."
          },
          {
            "type": "table",
            "head": [
              "Kerja dapur",
              "Pilihan biasa",
              "Sebabnya"
            ],
            "rows": [
              [
                "Tumis rempah kari atau rendang",
                "Minyak masak atau minyak kelapa",
                "Rasa neutral yang tidak melawan rempah"
              ],
              [
                "Goreng cetek ikan atau ayam",
                "Ikut rasa yang dimahukan",
                "Dua-dua menjadi pada api sederhana"
              ],
              [
                "Salad dan cicah roti",
                "Minyak zaitun dara",
                "Kekal cair, rasanya memang tujuannya"
              ],
              [
                "Kek dan mufin",
                "Minyak zaitun dara",
                "Tidak mengeras walaupun kek sejuk"
              ],
              [
                "Kuih atau bakeri berperisa kelapa",
                "Minyak kelapa",
                "Bau kelapa itu memang yang dicari"
              ],
              [
                "Renjis akhir sebelum hidang",
                "Minyak zaitun dara",
                "Rasa hijau kekal tanpa haba"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakKelapaInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Dua minyak, dua kerja",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun vs minyak kelapa bukan pertandingan yang ada pemenang tetap. Yang menentukan ialah kerja di depan anda: berapa banyak minyak diperlukan, berapa panas kuali, dan rasa apa yang anda mahu tinggal dalam pinggan."
        },
        {
          "type": "p",
          "text": "Simpan minyak zaitun untuk kerja bersukat sudu dan hidangan sejuk. Lihat [saiz botol dan harga](/products) sebelum memutuskan mana satu yang duduk di rak dapur anda."
        }
      ]
    },
    "faqs": [
      {
        "q": "Minyak zaitun atau minyak kelapa untuk menumis rempah kari?",
        "a": "Untuk tumis rempah yang lama, minyak masak biasa lebih praktikal dari segi kos; minyak kelapa dara pula mula berasap lebih awal daripada minyak zaitun dara. Minyak zaitun dara elok untuk tumis sederhana bawang dan bawang putih, di mana rasa hijaunya masih terasa dalam hidangan siap."
      },
      {
        "q": "Kenapa minyak kelapa saya jadi putih pejal tetapi minyak zaitun tidak?",
        "a": "Minyak kelapa mula mengeras apabila suhu turun ke bawah kira-kira 24 darjah, jadi ia pejal dalam dapur berhawa dingin. Minyak zaitun kekal cair pada suhu bilik Malaysia dan hanya menjadi keruh di dalam peti sejuk, tempat yang bukan untuknya."
      },
      {
        "q": "Boleh ke tukar minyak kelapa kepada minyak zaitun dalam resepi kek?",
        "a": "Boleh, nisbah satu lawan satu mengikut isi padu. Kek akan kekal lembap lebih lama kerana minyak zaitun kekal cair pada suhu bilik. Pilih minyak yang rasanya lebih lembut kalau kek itu bukan kek sitrus."
      },
      {
        "q": "Minyak mana lebih baik untuk kesihatan?",
        "a": "Itu soalan untuk pakar pemakanan atau doktor, bukan untuk penjual minyak. Laman ini membandingkan kedua-dua minyak sebagai lemak masakan sahaja: rasa, tekstur, kelakuan dalam kuali dan kos seliter. Tanya profesional kesihatan untuk bab pemakanan."
      },
      {
        "q": "Boleh ke guna minyak kelapa untuk salad?",
        "a": "Dalam bilik berhawa dingin ia akan mengeras menjadi serpihan putih apabila bertemu sayur yang sejuk. Minyak zaitun kekal cair dan bercampur dengan cuka atau lemon, jadi ia pilihan yang lebih senang untuk salad."
      },
      {
        "q": "Kenapa minyak zaitun jauh lebih mahal seliter daripada minyak kelapa?",
        "a": "Minyak kelapa dibuat dan dibotolkan berdekatan, manakala minyak zaitun dara diperah sejuk di luar negara, dibotolkan dalam kaca gelap dan dihantar ke sini. Semak harga mengikut saiz di halaman produk sebelum membandingkan seliter."
      },
      {
        "q": "Perlu ke simpan kedua-dua minyak dalam dapur?",
        "a": "Ramai memang berbuat begitu kerana kerjanya berbeza. Minyak masak atau minyak kelapa untuk periuk dan api besar, dan sebotol kecil minyak zaitun dara untuk salad, cicah roti dan renjis akhir sebelum hidang."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Panduan am memasak dengan minyak zaitun, takat asap, dan kerja dapur yang sesuai dengannya."
      },
      {
        "label": "Minyak zaitun vs minyak masak lain",
        "path": "blog/minyak-zaitun-vs-minyak-masak-lain",
        "description": "Minyak sawit, kelapa dara, bijan, kacang tanah dan zaitun dibandingkan pada rasa dan kerja dapur."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "rasa-minyak-zaitun",
    "slug": "rasa-minyak-zaitun-pahit-dan-pedas",
    "seoTitle": "Rasa Minyak Zaitun: Kenapa Pahit dan Pedas?",
    "metaTitle": "Rasa Minyak Zaitun: Kenapa Pahit dan Pedas?",
    "metaDescription": "Pahit dan pedas di tekak bukan tanda minyak rosak. Cara merasa minyak zaitun di rumah, hidangan yang sesuai, dan rasa minyak yang benar-benar rosak.",
    "focusKeyword": "rasa minyak zaitun",
    "relatedKeywords": [
      "kenapa minyak zaitun rasa pahit",
      "minyak zaitun pedas di tekak",
      "rasa minyak zaitun dara",
      "cara merasa minyak zaitun",
      "ujian rasa minyak zaitun di rumah",
      "minyak zaitun tengik",
      "minyak zaitun rosak rasa apa",
      "minyak zaitun hambar",
      "minyak zaitun extra virgin rasa",
      "oleokantal pedas tekak",
      "minyak zaitun pahit sedap ke"
    ],
    "category": "Panduan Pembeli",
    "tags": [
      "Rasa Minyak Zaitun",
      "Ujian Rasa",
      "Kesegaran",
      "Dapur Malaysia",
      "Extra Virgin"
    ],
    "h1": "Rasa Minyak Zaitun: Kenapa Pahit dan Pedas di Tekak",
    "excerpt": "Pahit di lidah, pedas di pangkal tekak, dan tangan terus capai botol untuk baca tarikh. Itu rasa minyak muda, bukan minyak rosak.",
    "keyTakeaway": "Rasa pahit di lidah dan pedas di pangkal tekak ialah rasa asli minyak zaitun dara, bukan tanda ia rosak. Kedua-duanya paling kuat pada minyak muda dan pudar mengikut umur, jadi minyak yang langsung tawar selalunya minyak lama. Minyak yang benar-benar rosak berbau berlilin, masam atau seperti kacang basi.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressRasaMinyakZaitunHero",
      "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
    },
    "ogImage": "/og/blog-rasa-minyak-zaitun.jpg",
    "intro": [
      "Sudu pertama masuk mulut, dua saat kemudian tekak terasa macam kena lada, dan tangan terus capai balik botol untuk baca tarikh luput.",
      "Ramai yang ingat minyak itu sudah rosak. Selalunya bukan.",
      "Artikel ini tentang cara membaca rasa minyak zaitun di dapur sendiri: apa itu pahit dan pedas, bila ia hilang, dan macam mana rasanya minyak yang memang dah rosak."
    ],
    "sections": [
      {
        "heading": "Pahit dan pedas itu bukan tanda minyak rosak",
        "id": "pahit-bukan-rosak",
        "blocks": [
          {
            "type": "p",
            "text": "Pahit di atas lidah dan pedas yang mencangkuk di pangkal tekak adalah rasa asli minyak zaitun dara, bukan tanda ia sudah rosak. Kedua-duanya datang daripada sebatian polifenol dalam jus buah zaitun, oleuropein di sebalik rasa pahit dan oleokantal di sebalik gigitan pedas itu. Minyak yang ditapis tidak membawa rasa ini langsung."
          },
          {
            "type": "ul",
            "items": [
              "Berbuah, iaitu bau zaitun segar, rumput baru potong, kadang-kadang tomato hijau.",
              "Pahit, iaitu rasa bersih yang merentas tengah lidah dan hilang dalam beberapa saat.",
              "Pedas, iaitu gigitan di pangkal tekak, kadang sampai terbatuk sekali."
            ]
          },
          {
            "type": "image",
            "src": "pressRasaMinyakZaitunInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Minyak yang tawar selalunya minyak lama",
        "id": "minyak-tawar-minyak-lama",
        "blocks": [
          {
            "type": "p",
            "text": "Pahit dan pedas paling kuat pada minyak yang baru diperah, dan kedua-duanya semakin pudar bulan demi bulan sementara minyak itu duduk dalam botol. Sebab itu minyak yang langsung tawar, licin dan tiada aroma selalunya minyak lama, bukan minyak lembut. Rasa yang sudah hilang tidak akan kembali walaupun botol itu disimpan elok."
          },
          {
            "type": "table",
            "head": [
              "Apa yang anda rasa",
              "Biasanya bermakna",
              "Tindakan"
            ],
            "rows": [
              [
                "Pahit jelas, pedas sampai terbatuk",
                "Minyak muda, baru dibuka",
                "Guna untuk cicah dan siram"
              ],
              [
                "Pahit lembut, pedas sekadar hangat",
                "Minyak pertengahan umur",
                "Sesuai untuk kerja harian"
              ],
              [
                "Tawar, licin, tiada bau",
                "Minyak lama atau ditapis",
                "Guna habis untuk masak"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressRasaMinyakZaitunInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          },
          {
            "type": "p",
            "text": "Beza antara gred dara, dara extra dan minyak ditapis ada dalam [panduan gred minyak zaitun](/blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain)."
          }
        ]
      },
      {
        "heading": "Cara merasa minyak zaitun di rumah",
        "id": "cara-merasa-di-rumah",
        "blocks": [
          {
            "type": "p",
            "text": "Untuk menilai rasa minyak zaitun, tuang kira-kira satu sudu besar ke dalam gelas kecil, tutup dengan tapak tangan dan hangatkan dalam genggaman sekejap. Goyang, buka, dan hidu dalam-dalam sebelum menghirup sedikit sambil menarik udara melalui gigi. Telan, kemudian tunggu sepuluh saat, kerana pedas selalunya datang lambat."
          },
          {
            "type": "ol",
            "items": [
              "Guna gelas kecil berwarna gelap supaya warna minyak tidak mempengaruhi penilaian.",
              "Rasa sebelum makan, bukan selepas kopi atau makanan pedas.",
              "Bandingkan dua minyak berturut-turut, dengan air kosong di antaranya.",
              "Jangan mula dengan roti, kerana tepung menutup pahit dan melembutkan pedas."
            ]
          },
          {
            "type": "image",
            "src": "pressRasaMinyakZaitunInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Hidangan Malaysia mana yang sesuai dengan minyak pahit",
        "id": "hidangan-yang-sesuai",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak yang pahit dan pedas paling menjadi apabila ada sesuatu untuk dilawannya, seperti sayur rebus yang tawar, kacang dal, labneh, tomato hiris, atau ikan bakar yang baru turun dari bara. Hidangan yang sudah kuat rasanya sendiri, seperti rendang atau masak lemak cili api, tidak memerlukan minyak yang bersuara."
          },
          {
            "type": "ul",
            "items": [
              "Sesuai: ulam dan kerabu, sup sayur, kailan atau bayam kukus, hummus dengan roti.",
              "Sesuai: ikan panggang, kentang bakar, keledek bakar, telur separuh masak.",
              "Kurang sesuai: kuih bersantan dan puding lembut, kerana pahit menonjol. Kek coklat, lemon dan oren pula menerima minyak yang kuat."
            ]
          },
          {
            "type": "image",
            "src": "pressRasaMinyakZaitunInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          },
          {
            "type": "p",
            "text": "Untuk kerja hidangan sejuk, lihat [minyak zaitun untuk salad dan hidangan sejuk](/blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk)."
          }
        ]
      },
      {
        "heading": "Macam mana rasanya minyak yang benar-benar rosak",
        "id": "rasa-minyak-rosak",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun yang sudah rosak tidak terasa pahit, ia terasa salah. Yang paling biasa ialah rasa berlilin seperti krayon lama atau kacang yang sudah lama disimpan. Ada juga yang berbau masam seperti wain yang bertukar cuka, atau lembap seperti kadbod yang lama tersimpan dalam stor."
          },
          {
            "type": "ul",
            "items": [
              "Krayon lama atau kacang basi, kecacatan paling lazim, tandanya minyak sudah tengik.",
              "Masam dan tajam seperti wain yang bertukar cuka.",
              "Kadbod lembap, atau hambar sepenuhnya tanpa sebarang bau."
            ]
          },
          {
            "type": "image",
            "src": "pressRasaMinyakZaitunInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          },
          {
            "type": "note",
            "title": "Pahit lawan tengik",
            "text": "Pahit datang bersama bau buah dan rumput; tengik datang bersama bau lilin dan kacang basi. Kalau hidung sudah menolak minyak itu sebelum sudu sampai ke mulut, jangan paksa."
          }
        ]
      },
      {
        "heading": "Kalau rasa pahitnya terlalu kuat untuk anda",
        "id": "kalau-terlalu-pahit",
        "blocks": [
          {
            "type": "p",
            "text": "Rasa pahit yang terasa berlebihan boleh dilembutkan tanpa menukar botol. Campurkan minyak dengan sedikit garam, jus lemon dan madu untuk dresing, kerana lemak dan asid menumpulkan pahit dengan cepat. Menyiramnya ke atas makanan panas juga membuka aroma buah dan menolak pahit ke belakang."
          },
          {
            "type": "ul",
            "items": [
              "Mula dengan satu sudu teh dalam pinggan, bukan satu siraman penuh.",
              "Pasangkan dengan bahan berkanji seperti kentang, nasi atau roti.",
              "Simpan botol jauh dari dapur dan cahaya supaya rasanya pudar mengikut masanya sendiri."
            ]
          },
          {
            "type": "image",
            "src": "pressRasaMinyakZaitunInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Rasa dulu, baru buat keputusan",
      "blocks": [
        {
          "type": "p",
          "text": "Pahit dan pedas ialah bahasa minyak zaitun dara, bukan amaran. Yang perlu dirisaukan ialah minyak yang hambar, berlilin atau masam, kerana itu yang patut keluar dari rak dapur."
        },
        {
          "type": "p",
          "text": "Rasa satu sudu sebelum menghukum sebotol. [Lihat saiz dan pilihan botol](/products) atau [tempat membeli](/shop) di cawangan Berkat Madinah Store."
        }
      ]
    },
    "faqs": [
      {
        "q": "Minyak zaitun saya pedas sampai terbatuk, rosak ke?",
        "a": "Tidak. Gigitan pedas di pangkal tekak datang daripada sebatian polifenol dalam minyak dara, dan sedikit batuk selepas menelan adalah biasa pada minyak yang baru diperah. Minyak yang rosak berbau berlilin atau masam, bukan pedas."
      },
      {
        "q": "Kenapa botol lama saya langsung tidak pahit?",
        "a": "Pahit dan pedas pudar sepanjang hayat minyak, jadi botol yang sudah lama dibuka memang terasa lebih tawar. Simpan botol dalam almari gelap yang jauh dari dapur, dan habiskan dalam kira-kira dua bulan selepas dibuka."
      },
      {
        "q": "Boleh ke masak dengan minyak zaitun yang pahit?",
        "a": "Boleh. Haba menumpulkan rasa pahit, jadi minyak yang terasa kuat ketika mentah selalunya lebih lembut selepas ditumis. Kalau anda mahu rasa pahit itu kekal, siram minyak mentah ke atas hidangan selepas ia siap."
      },
      {
        "q": "Macam mana nak beza rasa pahit dengan rasa tengik?",
        "a": "Hidu dahulu. Minyak yang pahit tetapi segar berbau seperti buah zaitun dan rumput baru potong. Minyak tengik berbau seperti krayon lama, pendempul atau kacang basi, dan rasanya berlilin serta melekat di lelangit."
      },
      {
        "q": "Anak-anak tidak suka rasa pahit, apa yang boleh dibuat?",
        "a": "Campurkan minyak ke dalam sesuatu yang berkanji atau berkrim: kentang lecek, hummus, yogurt atau nasi panas. Sedikit garam dan jus lemon juga menumpulkan pahit. Mula dengan satu sudu teh, bukan satu siraman penuh."
      },
      {
        "q": "Minyak zaitun yang lembut rasanya gred rendah ke?",
        "a": "Belum tentu. Varieti zaitun, tahap kematangan buah ketika dituai dan umur botol semuanya mempengaruhi kekuatan rasa. Yang menentukan gred ialah cara minyak itu dihasilkan dan diuji, bukan berapa kuat pahitnya di lidah anda."
      }
    ],
    "related": [
      {
        "label": "Apa itu minyak zaitun extra virgin dan gred lain",
        "path": "blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain",
        "description": "Beza antara gred dara, dara extra dan minyak ditapis, dan apa yang berubah pada rasa serta harga."
      },
      {
        "label": "Minyak zaitun untuk salad dan hidangan sejuk",
        "path": "blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk",
        "description": "Nisbah dresing, cara memukul minyak dengan asid, dan hidangan sejuk yang paling menonjolkan rasa minyak."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi enam rasa."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan kaunter dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "minyak-zaitun-keruh",
    "slug": "kenapa-minyak-zaitun-jadi-keruh",
    "seoTitle": "Minyak Zaitun Keruh dan Ada Mendapan: Rosakkah?",
    "metaTitle": "Minyak Zaitun Keruh dan Ada Mendapan: Rosakkah?",
    "metaDescription": "Keruh sejuk jernih semula dalam sejam, mendapan minyak tidak ditapis itu normal, dan hanya bau yang memberitahu minyak zaitun sudah benar-benar rosak.",
    "focusKeyword": "minyak zaitun keruh",
    "relatedKeywords": [
      "kenapa minyak zaitun jadi keruh",
      "mendapan minyak zaitun",
      "minyak zaitun ada endapan di dasar botol",
      "minyak zaitun keruh dalam peti sejuk",
      "minyak zaitun tidak ditapis",
      "minyak zaitun ditapis atau tidak ditapis",
      "minyak zaitun berkabus",
      "minyak zaitun beku putih",
      "cara tahu minyak zaitun rosak",
      "bau minyak zaitun tengik",
      "tempoh hayat minyak zaitun selepas dibuka"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun Keruh",
      "Mendapan",
      "Penyimpanan",
      "Panduan Pembeli"
    ],
    "h1": "Minyak zaitun keruh dan ada mendapan: rosakkah botol itu?",
    "excerpt": "Tiga keadaan berbeza duduk di sebalik satu botol yang keruh, dan cuma satu daripadanya bermasalah. Cara membezakannya dalam dua minit di dapur.",
    "keyTakeaway": "Minyak zaitun keruh hampir selalunya bukan minyak rosak. Keruh sejuk hilang sendiri dalam kira-kira sejam pada suhu bilik. Mendapan halus pula normal dalam minyak yang tidak ditapis, cuma ia memendekkan hayat botol, jadi habiskan awal. Hanya bau yang memberitahu sama ada minyak itu benar-benar sudah rosak.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunKeruhHero",
      "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
    },
    "ogImage": "/og/blog-minyak-zaitun-keruh.jpg",
    "intro": [
      "Anda tuang minyak untuk salad malam itu dan nampak lapisan halus di dasar botol, dan minyaknya tidak sejernih hari pertama dibuka.",
      "Soalan yang sama datang setiap kali: rosakkah botol ini, atau memang begitu sepatutnya?",
      "Selalunya memang begitu. Tetapi tiga keadaan berbeza duduk di sebalik satu botol yang keruh, dan cuma satu bermasalah."
    ],
    "sections": [
      {
        "heading": "Keruh bukan satu masalah, ia tiga keadaan",
        "id": "tiga-keadaan",
        "blocks": [
          {
            "type": "p",
            "text": "Apabila minyak zaitun jadi keruh, tiga perkara yang berbeza sama sekali boleh berada di belakangnya: minyak yang kesejukan, pepejal buah zaitun dalam minyak yang tidak ditapis, dan minyak yang memang sudah rosak. Dua yang pertama tidak mengubah keselamatan minyak itu. Yang ketiga tidak dapat dilihat dengan mata."
          },
          {
            "type": "ul",
            "items": [
              "**Keruh sejuk** — botol yang kesejukan, jernih semula pada suhu bilik.",
              "**Mendapan** — pepejal zaitun halus dalam minyak yang tidak ditapis.",
              "**Minyak rosak** — bau yang berubah, tiada kaitan dengan keruh."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKeruhInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Keruh sejuk: jernih semula pada suhu bilik",
        "id": "keruh-sejuk",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun mula berkabus apabila suhunya jatuh cukup rendah, dan sebahagian lemaknya mengeras menjadi butir putih lembut sementara selebihnya masih cair. Keluarkan botol dan biarkan ia berdiri di kaunter dapur. Dalam kira-kira sejam ia jernih semula, dan rasanya tidak berubah walau sedikit."
          },
          {
            "type": "ul",
            "items": [
              "Dapur berhawa dingin di sini jarang cukup sejuk; peti sejuk puncanya.",
              "Peti sejuk **tidak perlu**, tetapi ia juga bukan bahaya — cuma menyusahkan waktu menuang.",
              "Jangan panaskan botol untuk mempercepatkan; haba memendekkan hayat minyak."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKeruhInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          },
          {
            "type": "note",
            "title": "Keruh bukan ujian ketulenan",
            "text": "Minyak dara tulen boleh berkabus dalam sejuk dan boleh juga kekal cair, dan minyak ditapis sama sahaja. Sebab itu [ujian peti sejuk itu mitos](/blog/cara-kenal-minyak-zaitun-palsu)."
          }
        ]
      },
      {
        "heading": "Mendapan di dasar botol minyak yang tidak ditapis",
        "id": "mendapan-di-dasar-botol",
        "blocks": [
          {
            "type": "p",
            "text": "Lapisan halus di dasar botol biasanya pepejal buah zaitun yang tidak ditapis keluar selepas minyak diperah. Dalam minyak yang muda ia normal, dan ada peminat yang memang mencarinya. Tetapi pepejal itu tidak duduk diam: ia perlahan-lahan mengubah rasa minyak di sekelilingnya."
          },
          {
            "type": "ul",
            "items": [
              "Jangan goncang botol; biarkan mendapan itu duduk di dasar.",
              "Botol bermendapan elok dihabiskan awal, bukan disimpan sebagai stok setahun.",
              "Simpan tegak, gelap dan tertutup rapat — [caranya di sini](/blog/cara-simpan-minyak-zaitun)."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKeruhInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Disaring atau tidak disaring: itu pilihan, bukan kecacatan",
        "id": "ditapis-lawan-tidak-ditapis",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak yang disaring dilalukan melalui penapis halus sehingga jernih; yang tidak ditapis dibotolkan selepas dienapkan sahaja. Kedua-duanya boleh menjadi minyak dara yang sangat baik. Yang ditapis bertahan lebih lama dan senang dinilai dengan mata; yang tidak ditapis lebih tebal rasanya ketika muda, tetapi hayatnya lebih pendek."
          },
          {
            "type": "p",
            "text": "Pilihan itu milik pembuat, bukan tanda mutu. Botol yang jernih sepanjang tahun ialah botol yang ditapis, dan itu tidak bermakna ia kurang tulen. Minyak perahan sejuk Arabian Village datang dalam dua saiz — [lihat halaman produk](/products)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKeruhInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Apa yang nampak, apa sebenarnya, apa perlu buat",
        "id": "apa-yang-nampak",
        "blocks": [
          {
            "type": "p",
            "text": "Hampir semua soalan tentang botol yang keruh boleh dijawab dalam dua minit di dapur: lihat keadaannya, hidu minyaknya, kemudian putuskan. Jadual di bawah menyusun keadaan yang paling kerap ditemui pembeli di Malaysia, dan apa yang patut dibuat untuk setiap satu."
          },
          {
            "type": "table",
            "head": [
              "Apa yang nampak",
              "Apa sebenarnya",
              "Apa perlu buat"
            ],
            "rows": [
              [
                "Berkabus selepas keluar dari peti sejuk",
                "Lemak mengeras kerana sejuk",
                "Biar di kaunter kira-kira sejam"
              ],
              [
                "Butir putih lembut dalam minyak",
                "Keadaan yang sama, lebih jauh",
                "Tunggu sampai jernih, jangan panaskan"
              ],
              [
                "Lapisan halus di dasar botol",
                "Pepejal zaitun, minyak tidak ditapis",
                "Tuang tanpa menggoncang, habiskan awal"
              ],
              [
                "Keruh yang tidak jernih di suhu bilik",
                "Mendapan, bukan sejuk",
                "Hidu dahulu sebelum guna"
              ],
              [
                "Bau krayon lama atau kacang basi",
                "Minyak sudah rosak",
                "Berhenti guna, buka botol baharu"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKeruhInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Minyak yang betul-betul rosak: hidung yang menentukan",
        "id": "ujian-bau",
        "blocks": [
          {
            "type": "p",
            "text": "Cuma satu ujian yang benar-benar penting, dan mata tidak terlibat langsung. Buka tutup, tuang sedikit ke dalam gelas, hangatkan seketika, dan hidu. Minyak yang masih baik berbau seperti buah, rumput atau daun. Minyak yang sudah rosak berbau seperti krayon lama atau kacang basi."
          },
          {
            "type": "ul",
            "items": [
              "Bau tengik datang daripada usia dan udara, bukan daripada mendapan.",
              "Botol yang sudah dibuka elok dihabiskan dalam kira-kira dua bulan di iklim kita.",
              "Yang belum dibuka bertahan sehingga kira-kira 18 bulan jika disimpan gelap."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKeruhInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Lihat, hidu, kemudian putuskan",
      "blocks": [
        {
          "type": "p",
          "text": "Botol yang keruh hampir selalunya botol yang kesejukan atau botol yang tidak ditapis, dan kedua-duanya masih boleh digunakan. Yang menentukan bukan rupa minyak, tetapi baunya apabila tutup dibuka."
        },
        {
          "type": "p",
          "text": "Simpan botol di tempat gelap jauh dari dapur masak, habiskan dalam kira-kira dua bulan selepas dibuka, dan [pilih saiz](/products) yang padan dengan kadar guna rumah anda."
        }
      ]
    },
    "faqs": [
      {
        "q": "Minyak zaitun saya keruh — adakah ia sudah rosak?",
        "a": "Selalunya tidak. Keruh datang daripada sejuk atau daripada pepejal zaitun dalam minyak yang tidak ditapis, dan kedua-duanya normal. Rupa minyak tidak memberitahu apa-apa; buka tutup dan hidu, kerana bau sahaja yang menentukan."
      },
      {
        "q": "Berapa lama minyak keruh mengambil masa untuk jernih semula?",
        "a": "Kira-kira sejam di atas kaunter dapur pada suhu bilik Malaysia, kadangkala lebih lama untuk botol yang penuh. Jangan letak dalam air panas atau dekat dapur; haba tidak diperlukan dan ia memendekkan hayat minyak."
      },
      {
        "q": "Mendapan di dasar botol perlu dibuang?",
        "a": "Tidak perlu dibuang, tetapi jangan digoncang masuk ke dalam pinggan. Tuang perlahan dan biarkan lapisan itu duduk di dasar. Kerana mendapan memendekkan hayat botol, habiskan minyak itu lebih awal daripada biasa."
      },
      {
        "q": "Minyak yang keruh bermakna ia lebih tulen?",
        "a": "Tidak. Keruh tidak membuktikan apa-apa tentang ketulenan, dalam mana-mana arah. Minyak dara tulen boleh jernih dan boleh keruh, dan minyak ditapis pun sama. Yang boleh disemak ialah tarikh tuaian, asal usul dan penjual."
      },
      {
        "q": "Perlu ke simpan minyak zaitun dalam peti sejuk supaya tahan lama?",
        "a": "Tidak perlu. Almari yang gelap dan jauh daripada dapur masak sudah memadai. Peti sejuk membuatkan minyak berkabus dan pekat, jadi setiap kali menuang anda terpaksa menunggu botol kembali ke suhu bilik."
      },
      {
        "q": "Bagaimana saya tahu minyak zaitun benar-benar sudah rosak?",
        "a": "Baunya. Minyak yang rosak berbau seperti krayon lama, pendempul atau kacang basi, atau langsung hilang aroma. Itu berlaku kerana usia, udara dan haba, dan ia boleh berlaku pada minyak yang jernih sekalipun."
      },
      {
        "q": "Minyak zaitun infusi pun boleh berkeruh?",
        "a": "Boleh, dan sedikit mendapan daripada bahan botani sebenar memang dijangka. Aroma botani pudar lebih awal daripada minyaknya, jadi tutup rapat, simpan gelap dan habiskan botol infusi lebih cepat daripada botol klasik."
      }
    ],
    "related": [
      {
        "label": "Cara simpan minyak zaitun di rumah Malaysia yang panas",
        "path": "blog/cara-simpan-minyak-zaitun",
        "description": "Rak mana yang menumpulkan rasa, kenapa peti sejuk bukan tempatnya, dan berapa lama sebotol bertahan selepas dibuka."
      },
      {
        "label": "Minyak zaitun palsu dan ujian yang menipu anda",
        "path": "blog/cara-kenal-minyak-zaitun-palsu",
        "description": "Kenapa ujian peti sejuk dan ujian warna tidak membuktikan apa-apa, dan lima butiran label yang memang boleh disemak."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam kaca gelap, saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan Berkat Madinah Store di Selangor, waktu operasi, dan kaunter dalam talian mereka sendiri."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "minyak-zaitun-untuk-air-fryer",
    "slug": "minyak-zaitun-untuk-air-fryer",
    "seoTitle": "Minyak Zaitun untuk Air Fryer: Banyak Mana, Panas Mana",
    "metaTitle": "Minyak Zaitun untuk Air Fryer: Banyak Mana, Panas Mana",
    "metaDescription": "Berapa banyak untuk sebakul, kenapa sembur aerosol merosakkan salutan, suhu dail untuk keledek, ayam berempah dan popia, serta cara membersih laci.",
    "focusKeyword": "minyak zaitun untuk air fryer",
    "relatedKeywords": [
      "boleh ke guna minyak zaitun dalam air fryer",
      "minyak terbaik untuk air fryer",
      "sembur minyak zaitun air fryer",
      "berapa banyak minyak dalam air fryer",
      "minyak zaitun dara air fryer",
      "suhu air fryer keledek",
      "salutan bakul air fryer rosak",
      "ayam berempah air fryer",
      "popia beku air fryer",
      "cara cuci bakul air fryer berminyak",
      "berus minyak untuk air fryer"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Air Fryer",
      "Teknik Memasak",
      "Dapur Malaysia",
      "Minyak Zaitun Dara",
      "Panduan Peralatan"
    ],
    "h1": "Minyak Zaitun untuk Air Fryer: Berapa Banyak dan Berapa Panas",
    "excerpt": "Air fryer perlukan satu sudu kecil minyak pada makanan, bukan tuangan ke dalam bakul. Cara ia disapu lebih menentukan hasil daripada gred yang anda capai.",
    "keyTakeaway": "Minyak zaitun untuk air fryer duduk pada makanan, bukan di dalam bakul. Gaul atau sapu lebih kurang satu sudu kecil untuk sebakul penuh, jauhkan tin sembur daripada salutan, dan set dail pada 180 hingga 200 darjah untuk kebanyakan hidangan. Salut benda yang kering dan berkanji.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukAirFryerHero",
      "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-air-fryer.jpg",
    "intro": [
      "Hampir setiap rumah di Malaysia sekarang ada air fryer di atas kabinet dapur, dan tiada siapa diberi arahan tentang minyaknya.",
      "Mesin itu sebenarnya ketuhar kipas yang kecil, bukan kuali, jadi minyak di dalamnya buat kerja yang lain sama sekali.",
      "Minyak zaitun memang boleh digunakan. Yang berubah ialah berapa banyak, dan cara ia disapu."
    ],
    "sections": [
      {
        "heading": "Berapa banyak minyak zaitun untuk satu bakul",
        "id": "berapa-banyak-minyak",
        "blocks": [
          {
            "type": "p",
            "text": "Sebakul penuh perlukan lebih kurang satu sudu kecil minyak zaitun, digaul pada makanan sebelum ia masuk. Mesin ini menolak udara panas, bukan merendam, jadi minyak yang tidak melekat pada permukaan akan menitis ke laci dan hangus di situ. Gaul sehingga setiap potong berkilat."
          },
          {
            "type": "ul",
            "items": [
              "**Satu sudu kecil** untuk sebakul keledek, ubi kayu atau kentang.",
              "**Setengah sudu kecil** untuk ayam berempah, yang mengeluarkan lemaknya sendiri.",
              "**Sapuan nipis berus** untuk popia dan bebola ikan yang sudah bersalut.",
              "**Tiada langsung** untuk memanaskan semula benda yang sudah digoreng."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukAirFryerInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Kenapa sembur aerosol merosakkan salutan bakul",
        "id": "sembur-aerosol",
        "blocks": [
          {
            "type": "p",
            "text": "Tin sembur masakan membawa lebih daripada minyak. Bahan pendorong dan bahan tambahan seperti lesitin turun sebagai kabus halus pada salutan bakul, terbakar melekat, dan membina lapisan perang melekit yang tidak hilang dengan basuhan biasa. Buku panduan pengeluar lazimnya melarangnya. Guna berus silikon sebaliknya."
          },
          {
            "type": "ul",
            "items": [
              "Tin aerosol: liputan luas tidak terkawal, dan lapisan terbakar pada salutan.",
              "Botol pam boleh isi semula: kabus halus tanpa bahan pendorong.",
              "Berus silikon: minyak jatuh pada makanan sahaja.",
              "Gaul dalam mangkuk: setiap permukaan kena, bakul kekal bersih."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukAirFryerInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Julat suhu air fryer lawan minyak zaitun",
        "id": "julat-suhu",
        "blocks": [
          {
            "type": "p",
            "text": "Dail air fryer naik jauh lebih tinggi daripada yang diperlukan oleh sapuan setipis itu. Set 180 hingga 200 darjah untuk keledek, kentang dan ayam, dan turun ke 160 hingga 170 darjah untuk ikan, roti dan apa-apa yang cepat perang. Tinggalkan hujung atas dail untuk masakan tanpa minyak."
          },
          {
            "type": "p",
            "text": "Selagi makanan masih mengeluarkan wap, permukaan yang berminyak itu duduk lebih rendah daripada suhu udara di dalam ruang. Yang hangus dahulu ialah bahagian bakul yang kosong. Angka mengikut kaedah ada dalam [minyak zaitun untuk goreng](/blog/minyak-zaitun-untuk-goreng), dan gred pula dalam [gred minyak zaitun](/blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukAirFryerInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Makanan mana yang menerima minyak zaitun dengan baik",
        "id": "makanan-yang-sesuai",
        "blocks": [
          {
            "type": "p",
            "text": "Makanan yang kering, berkanji dan padat paling menerima minyak zaitun, kerana ada permukaan untuk minyak melekat dan ada sesuatu untuk haba jadikan rangup. Keledek, ubi kayu, ayam berempah, popia dan bebola ikan semuanya menjadi. Bancuhan basah tidak, dan tepung longgar akan berterbangan ke elemen."
          },
          {
            "type": "table",
            "head": [
              "Makanan",
              "Suhu dail",
              "Minyak",
              "Catatan"
            ],
            "rows": [
              [
                "Keledek potong bujur",
                "190 darjah",
                "Satu sudu kecil",
                "Keringkan dahulu"
              ],
              [
                "Ayam berempah",
                "180 darjah",
                "Setengah sudu kecil",
                "Lemaknya keluar sendiri"
              ],
              [
                "Popia beku",
                "180 darjah",
                "Sapu berus",
                "Jangan digaul"
              ],
              [
                "Bebola ikan",
                "180 darjah",
                "Sapu berus",
                "Goncang di pertengahan"
              ],
              [
                "Pisang hiris",
                "170 darjah",
                "Sapu berus",
                "Manisnya cepat perang"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukAirFryerInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Cara membersih bakul dan laci selepas guna minyak",
        "id": "cara-membersih",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak yang tidak kena makanan akan berkumpul di dalam laci bawah bakul, dan kalau dibiarkan ia terbakar menjadi lapisan varnis yang berasap pada masakan berikutnya. Basuh bakul dan laci selepas setiap masakan berminyak, semasa kedua-duanya masih suam. Air sabun dan berus lembut sudah memadai."
          },
          {
            "type": "ol",
            "items": [
              "Lap laci dengan tuala dapur dahulu supaya minyak tidak turun ke sinki.",
              "Rendam bakul dalam air sabun suam sepuluh minit kalau ada kesan melekat.",
              "Jangan sekali-kali guna wul keluli atau span kasar pada salutan.",
              "Keringkan kedua-duanya sepenuhnya sebelum disimpan semula."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukAirFryerInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Gred mana yang patut masuk ke dalam bakul",
        "id": "gred-mana",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara perahan sejuk ialah gred yang munasabah di sini, justeru kerana jumlahnya sangat sedikit. Satu sudu kecil untuk sebakul penuh bukan tempat sebotol habis, dan salutan itu sebenarnya buat kerja mekanikal: mengeringkan permukaan, membantu ia perang, dan menahannya daripada melekat pada besi."
          },
          {
            "type": "p",
            "text": "Yang hilang di bawah kipas ialah baunya, jadi simpan satu sudu lagi dan renjis selepas bakul diangkat. Saiz botol ada di [halaman produk](/products), dan kerja dapur yang lain ada dalam [panduan minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukAirFryerInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Ringkasnya",
      "blocks": [
        {
          "type": "p",
          "text": "Satu sudu kecil pada makanan, bukan tuangan ke dalam bakul. Berus atau mangkuk, bukan tin sembur. Dail pada 180 hingga 200 darjah, dan turun ke 170 untuk yang cepat perang."
        },
        {
          "type": "p",
          "text": "Renjis sedikit minyak mentah selepas bakul keluar, dan basuh laci semasa ia masih suam. Lihat [saiz botol](/products) sebelum membeli yang pertama."
        }
      ]
    },
    "faqs": [
      {
        "q": "Boleh ke guna minyak zaitun dalam air fryer?",
        "a": "Boleh, tetapi pada makanan dan bukan dituang ke dalam bakul. Gaul atau sapu lebih kurang satu sudu kecil untuk sebakul penuh sebelum memasak. Minyak yang dituang terus akan menitis ke laci dan hangus di situ."
      },
      {
        "q": "Perlu guna minyak zaitun dara atau yang ditapis?",
        "a": "Minyak dara munasabah kerana jumlahnya kecil; satu sudu kecil untuk sebakul penuh tidak membazir. Baunya memang pudar di bawah kipas, jadi simpan satu sudu lagi untuk direnjis selepas bakul diangkat."
      },
      {
        "q": "Kenapa tidak boleh guna minyak sembur dalam air fryer?",
        "a": "Tin aerosol membawa bahan pendorong dan bahan tambahan bersama minyaknya. Kabus itu melekat pada salutan bakul, terbakar, dan membina lapisan melekit yang tidak dapat dibasuh. Botol pam yang boleh diisi semula mengelakkannya."
      },
      {
        "q": "Berapa suhu untuk keledek dan ubi kayu?",
        "a": "Cuba 190 darjah selama kira-kira dua puluh minit, dengan bakul digoncang sekali di pertengahan. Potong sama besar, keringkan dengan tuala dapur, dan susun satu lapisan sahaja supaya udara boleh bergerak."
      },
      {
        "q": "Perlu ke panaskan air fryer dahulu?",
        "a": "Panaskan tiga minit supaya makanan menjadi rangup dan bukan kering. Sapu minyak pada makanan semasa mesin memanas, kemudian masukkan satu lapisan. Jangan biarkan bakul yang berminyak memanas dalam keadaan kosong."
      },
      {
        "q": "Popia beku boleh disapu minyak zaitun?",
        "a": "Boleh, tetapi sapu dengan berus dan jangan digaul dalam mangkuk kerana kulitnya akan koyak. Sapu nipis pada satu sisi, susun tanpa bertindih, dan pusing sekali di pertengahan pada 180 darjah."
      },
      {
        "q": "Minyak yang tinggal di dalam laci boleh diguna semula?",
        "a": "Minyak yang menitis ke laci itu bukan minyak goreng yang boleh ditapis dan disimpan — ia sudah bercampur cecair dan serpihan hangus. Lap keluar dengan tuala dapur, kemudian basuh laci semasa ia masih suam."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun untuk goreng",
        "path": "blog/minyak-zaitun-untuk-goreng",
        "description": "Bila minyak zaitun menjadi dalam kuali, dan takat asap mengikut gred tanpa perlu diteka."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Tumis, panggang dan renjis akhir sepanjang seminggu masakan di dapur Malaysia."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli di Malaysia",
        "path": "shop",
        "description": "Lima cawangan Berkat Madinah Store di Selangor, berserta kaunter Shopee dan TikTok Shop."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "minyak-zaitun-untuk-ikan-bakar",
    "slug": "minyak-zaitun-untuk-ikan-bakar",
    "seoTitle": "Minyak Zaitun untuk Ikan Bakar: Sapu, Bakar, Tuang",
    "metaTitle": "Minyak Zaitun untuk Ikan Bakar: Sapu, Bakar, Tuang",
    "metaDescription": "Sapu minyak pada ikan bukan pada jaring, kenapa minyak perapan menitis ke bara, daun pisang, dan tuangan akhir selepas ikan diangkat.",
    "focusKeyword": "minyak zaitun untuk ikan bakar",
    "relatedKeywords": [
      "cara bakar ikan dengan minyak zaitun",
      "sapu minyak pada ikan bakar",
      "perapan ikan bakar minyak zaitun",
      "ikan bakar daun pisang minyak zaitun",
      "minyak zaitun untuk ikan kembung",
      "ikan pari bakar sambal",
      "tuangan minyak zaitun selepas bakar",
      "api naik masa bakar ikan",
      "minyak untuk panggangan bara",
      "air asam ikan bakar",
      "minyak zaitun dara untuk makanan laut"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Ikan Bakar",
      "Teknik Memasak",
      "Dapur Malaysia",
      "Minyak Zaitun Dara",
      "Panggangan"
    ],
    "h1": "Minyak Zaitun untuk Ikan Bakar: Di Mana Minyak Itu Patut Pergi",
    "excerpt": "Kebanyakan minyak yang masuk ke dalam perapan berakhir di dalam bara, bukan di atas ikan. Panduan tempat minyak patut disapu, bila ia patut dituang, dan apa yang daun pisang ubah.",
    "keyTakeaway": "Minyak zaitun untuk ikan bakar bekerja di dua tempat sahaja: sapuan nipis pada ikan sebelum ia naik ke jaring, dan tuangan selepas ikan diangkat. Minyak yang dicurah ke dalam perapan cair akan menitis ke bara dan hilang sebelum isi ikan sempat masak.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukIkanBakarHero",
      "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-ikan-bakar.jpg",
    "intro": [
      "Ikan bakar di rumah selalunya berakhir dengan minyak yang habis di bara, bukan di atas ikan.",
      "Minyak zaitun boleh masuk ke dalam kerja ini, tetapi bukan di tempat yang ramai orang letakkan.",
      "Panduan ini tentang di mana minyak itu patut disapu, dan bila pula ia patut dituang."
    ],
    "sections": [
      {
        "heading": "Sapu pada ikan, bukan pada jaring",
        "id": "sapu-pada-ikan",
        "blocks": [
          {
            "type": "p",
            "text": "Sapu minyak pada ikan, bukan pada jaring panggangan. Minyak yang disapu pada jaring panas terbakar dalam beberapa saat dan meninggalkan lapisan hitam yang berpindah ke kulit ikan. Minyak yang disapu nipis pada ikan pula duduk pada kulit, membantu rempah melekat, dan melambatkan kulit daripada koyak apabila ikan dibalik."
          },
          {
            "type": "ul",
            "items": [
              "Lap ikan kering dahulu, kerana minyak tidak melekat pada kulit yang basah.",
              "Satu sudu besar sudah cukup untuk seekor ikan kembung sederhana.",
              "Lincirkan jaring dengan minyak masak biasa dan kain, sebelum jaring itu panas."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukIkanBakarInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Kenapa minyak dalam perapan banyak yang menitis",
        "id": "perapan-menitis",
        "blocks": [
          {
            "type": "p",
            "text": "Perapan ikan bakar biasanya cair: kunyit, cili, asam jawa, garam dan minyak. Di atas bara, bahagian cecair itu jatuh melalui jaring dalam masa satu dua minit. Minyak yang jatuh ke bara bukan sahaja hilang, ia menyala semula dan menghitamkan kulit ikan dari bawah sebelum isinya sempat masak."
          },
          {
            "type": "p",
            "text": "Sebab itu perapan tidak perlu banyak minyak. Cukup sekadar melekatkan rempah pada ikan, kira-kira satu sudu besar untuk dua ekor, dan simpan minyak zaitun dara untuk tuangan akhir."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukIkanBakarInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Api terbuka lawan api sederhana",
        "id": "api-terbuka-lawan-sederhana",
        "blocks": [
          {
            "type": "p",
            "text": "Api terbuka yang menjilat ikan datang daripada minyak dan lemak yang menitis ke bara, bukan daripada bara yang terlalu panas. Ikan bakar lebih menjadi di atas bara yang sudah kelabu berabu. Kalau api naik, alihkan ikan ke tepi jaring dan tunggu sehingga nyalaan itu padam."
          },
          {
            "type": "p",
            "text": "Permukaan jaring di atas bara jauh lebih panas daripada kuali di dapur, jadi soalan takat asap bukan lagi soalan yang sama. Angkanya ada dalam [panduan minyak zaitun untuk goreng](/blog/minyak-zaitun-untuk-goreng). Di sini yang menentukan ialah tempoh, bukan suhu."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukIkanBakarInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Daun pisang mengubah cara minyak bekerja",
        "id": "daun-pisang",
        "blocks": [
          {
            "type": "p",
            "text": "Daun pisang mengubah sepenuhnya cara minyak bekerja. Dibalut dalam daun, ikan masak dengan wapnya sendiri dan minyak tidak menitis ke bara, jadi tiada api terbuka. Layurkan daun sekejap di atas api supaya lembut, sapu sedikit minyak pada daun supaya ikan tidak melekat, kemudian balut kemas."
          },
          {
            "type": "p",
            "text": "Kerana minyak di dalam balutan tidak bertemu api secara terus, minyak zaitun dara boleh masuk di peringkat ini tanpa dibazirkan. Ikan pari dengan sambal ialah balutan yang paling biasa di sini."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukIkanBakarInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Tuangan akhir selepas ikan diangkat",
        "id": "tuangan-akhir",
        "blocks": [
          {
            "type": "p",
            "text": "Di sinilah minyak zaitun dara berbaloi. Selepas ikan diangkat dari bara dan diletakkan di atas pinggan, tuang minyak zaitun dara terus ke atasnya, kira-kira dua sudu kecil untuk seekor. Minyak itu tidak pernah bertemu api, jadi rasa hijau dan denyut pedasnya sampai ke mulut dengan penuh."
          },
          {
            "type": "ul",
            "items": [
              "Ikan kembung dengan air asam: siram air asam dahulu, minyak kemudian.",
              "Ikan pari dengan sambal: renjis minyak di tepi sambal, bukan di atasnya.",
              "Perah limau nipis dahulu, tuang minyak kemudian, supaya keduanya duduk rata."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukIkanBakarInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          },
          {
            "type": "p",
            "text": "Antara enam minyak infusi Arabian Village, adas & jintan manis memang dipasangkan dengan ikan bakar. Lihat rasa dan saiz di [halaman produk](/products)."
          }
        ]
      },
      {
        "heading": "Ikan mana, cara mana",
        "id": "ikan-mana-cara-mana",
        "blocks": [
          {
            "type": "p",
            "text": "Ikan yang berbeza mahukan cara yang berbeza, dan itu menentukan berapa banyak minyak yang patut masuk sebelum bakar. Ikan bersisik nipis seperti kembung boleh terus di atas jaring, manakala ikan pari dan isi yang lembut lebih selamat dalam balutan daun pisang."
          },
          {
            "type": "table",
            "head": [
              "Ikan",
              "Cara bakar",
              "Sebelum bakar",
              "Tuangan akhir"
            ],
            "rows": [
              [
                "Ikan kembung",
                "Atas jaring, bara kelabu",
                "Sapu nipis",
                "Minyak dara dan air asam"
              ],
              [
                "Ikan pari",
                "Balut daun pisang",
                "Sapu daun dan ikan",
                "Renjis di tepi sambal"
              ],
              [
                "Ikan cencaru",
                "Dibelah, atas jaring",
                "Sapu selepas disumbat",
                "Sedikit sahaja"
              ],
              [
                "Ikan siakap",
                "Bara sederhana",
                "Keringkan kulit, sapu nipis",
                "Minyak dara dan limau"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukIkanBakarInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Minyak di atas ikan, bukan di dalam bara",
      "blocks": [
        {
          "type": "p",
          "text": "Ikan bakar bukan kerja yang memerlukan banyak minyak. Ia memerlukan minyak di dua tempat sahaja: sapuan nipis sebelum ikan naik ke jaring, dan tuangan selepas ikan turun ke pinggan."
        },
        {
          "type": "p",
          "text": "Kalau hanya sebotol yang ada di rak, simpan ia untuk tuangan akhir itu. Lihat [saiz 250 ml dan 500 ml](/products) atau [cawangan dan cara membeli](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Boleh ke guna minyak zaitun untuk ikan bakar di atas bara?",
        "a": "Boleh, tetapi tempatnya penting. Sapu nipis pada ikan sebelum bakar, dan simpan tuangan yang lebih murah hati untuk selepas ikan diangkat. Minyak yang dicurah banyak sebelum bakar akan menitis ke bara dan hilang."
      },
      {
        "q": "Kenapa tidak elok sapu minyak pada jaring panggangan?",
        "a": "Jaring panas membakar minyak dalam beberapa saat dan lapisan hitam itu berpindah ke kulit ikan. Sapu pada ikan sebaliknya: ia melekatkan rempah dan mengurangkan kulit koyak semasa ikan dibalik di atas bara."
      },
      {
        "q": "Berapa banyak minyak untuk seekor ikan kembung?",
        "a": "Kira-kira satu sudu besar disapu nipis pada seluruh ikan sudah cukup sebelum bakar. Selepas ikan diangkat, tuang lagi dua sudu kecil minyak zaitun dara di atas pinggan, kerana di situ rasanya paling jelas."
      },
      {
        "q": "Api naik menjilat ikan saya, apa yang salah?",
        "a": "Biasanya perapan terlalu cair atau terlalu banyak minyak, jadi cecair menitis ke bara dan menyala. Toskan ikan sekejap sebelum naik jaring, dan alihkan ikan ke tepi jaring apabila nyalaan naik, sehingga api itu reda."
      },
      {
        "q": "Minyak zaitun sesuai ke untuk ikan yang dibalut daun pisang?",
        "a": "Sesuai, kerana di dalam balutan minyak tidak bertemu api secara terus dan tidak menitis keluar. Sapu sedikit pada daun supaya ikan tidak melekat, dan tambah lagi sedikit apabila balutan dibuka di meja."
      },
      {
        "q": "Perlu ke tukar minyak masak biasa kepada minyak zaitun untuk bakar?",
        "a": "Tidak semestinya. Minyak masak biasa cukup untuk melincirkan jaring dan untuk perapan yang banyak menitis. Minyak zaitun dara lebih berbaloi pada tuangan akhir, tempat rasanya sampai ke pinggan tanpa melalui bara."
      },
      {
        "q": "Di mana boleh beli minyak zaitun Arabian Village di Malaysia?",
        "a": "Melalui Berkat Madinah Store sahaja. Mereka satu-satunya penjual sah di Malaysia, dengan lima cawangan di Selangor serta kaunter Shopee dan TikTok Shop mereka sendiri. Butiran cawangan dan waktu operasi ada di halaman kedai."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun untuk goreng",
        "path": "blog/minyak-zaitun-untuk-goreng",
        "description": "Takat asap, haba dapur rumah, dan bila minyak zaitun berbaloi di dalam kuali."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Panduan am memasak dengan minyak zaitun dan kerja dapur Malaysia yang sesuai dengannya."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "minyak-zaitun-untuk-pasta",
    "slug": "minyak-zaitun-untuk-pasta",
    "seoTitle": "Minyak Zaitun untuk Pasta: Aglio Olio Versi Rumah",
    "metaTitle": "Minyak Zaitun untuk Pasta: Aglio Olio Versi Rumah",
    "metaDescription": "Aglio olio dapur Malaysia: air rebusan sebagai pengikat, bawang putih yang tidak hangus, dan pusingan cili padi, ikan bilis atau daun kari.",
    "focusKeyword": "minyak zaitun untuk pasta",
    "relatedKeywords": [
      "aglio olio minyak zaitun",
      "resepi aglio olio mudah",
      "pasta bawang putih minyak zaitun",
      "air rebusan pasta pengikat sos",
      "aglio olio cili padi",
      "aglio olio ikan bilis",
      "spageti minyak zaitun dara",
      "berapa minyak zaitun untuk pasta",
      "sos pasta berpisah",
      "pasta tanpa krim"
    ],
    "category": "Resepi",
    "tags": [
      "Minyak Zaitun untuk Pasta",
      "Aglio Olio",
      "Dapur Malaysia",
      "Teknik Memasak",
      "Arabian Village"
    ],
    "h1": "Minyak Zaitun untuk Pasta: Aglio Olio Versi Dapur Malaysia",
    "excerpt": "Sos aglio olio hanyalah minyak, air rebusan dan gaulan yang laju. Kaedah bernombor untuk dua orang, plus pusingan cili padi, ikan bilis dan daun kari.",
    "keyTakeaway": "Minyak zaitun untuk pasta menjadi apabila tiga perkara betul: bawang putih dimasak dalam minyak sejuk pada api sederhana rendah sehingga warna gandum sahaja, air rebusan pasta yang berkanji disimpan sebagai pengikat, dan minyak mentah dimasukkan sekali lagi selepas api dimatikan. Cili padi, ikan bilis atau daun kari membawanya pulang ke dapur kita.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukPastaHero",
      "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-pasta.jpg",
    "intro": [
      "Malam yang tiada apa-apa dalam peti sejuk, tinggal sebungkus spageti dan beberapa ulas bawang putih. Itu sudah senarai bahan yang lengkap.",
      "Aglio olio hidup atau mati pada minyaknya, kerana selain mi dan garam, minyak itulah sosnya.",
      "Panduan ini untuk dapur di sini: bahan pasar raya biasa, dan satu pusingan tempatan."
    ],
    "sections": [
      {
        "heading": "Kenapa pasta minyak zaitun selalu berakhir kering",
        "id": "kenapa-jadi-kering",
        "blocks": [
          {
            "type": "p",
            "text": "Masalahnya jarang kekurangan minyak. Masalahnya minyak dan mi yang tidak pernah bercantum, jadi minyak duduk di dasar mangkuk dan setiap suapan terasa berminyak sekali gus kering. Sos aglio olio sebenarnya emulsi ringkas: lemak yang dipegang air berkanji, disatukan oleh gaulan laju di dalam kuali panas."
          },
          {
            "type": "p",
            "text": "Sebab itu minyak perlu bertemu air rebusan dan haba di dalam kuali, bukan di dalam pinggan."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPastaInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Air rebusan pasta: pengikat yang selalu dibuang",
        "id": "air-rebusan-pengikat",
        "blocks": [
          {
            "type": "p",
            "text": "**Air rebusan pasta bukan air kosong.** Kanji yang keluar daripada mi menjadikannya likat sedikit, dan kanji itulah yang memegang minyak supaya ia tidak berpisah semula. Cedok satu cawan sebelum mi ditoskan, dan rebus dalam air yang kurang sedikit supaya kanjinya lebih pekat."
          },
          {
            "type": "ul",
            "items": [
              "Dua liter air untuk 200 g mi, bukan satu periuk penuh.",
              "Garamkan sehingga air itu terasa masin, kerana mi menyerap sebahagiannya.",
              "Cedok air rebusan sebelum menoskan mi, bukan selepas ia masuk sinki."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPastaInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Bawang putih yang tidak boleh hangus",
        "id": "bawang-putih-tak-hangus",
        "blocks": [
          {
            "type": "p",
            "text": "Bawang putih hangus tidak boleh dibaiki. Rasa pahitnya larut terus ke dalam minyak dan tinggal di situ sampai habis sepinggan. Mulakan bawang putih dalam minyak yang masih sejuk, hidupkan api sederhana rendah, dan berhenti sebaik tepinya bertukar **warna gandum muda**."
          },
          {
            "type": "p",
            "text": "Kalau ia sudah coklat, buang minyak itu dan mula semula. Hirisan nipis memberi kepingan yang boleh dimakan; bawang putih tumbuk hangus jauh lebih cepat. Aglio olio bukan kerja api besar, dan bab haba ada dalam [panduan minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPastaInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Kaedah aglio olio untuk dua orang",
        "id": "kaedah-aglio-olio",
        "blocks": [
          {
            "type": "p",
            "text": "Sukatan untuk dua orang: 200 g spageti, tiga ulas bawang putih dihiris nipis, dua batang cili kering dipatah, empat sudu besar minyak zaitun dara, dan sedikit daun parsli kalau ada. Tiga sudu masuk ke dalam kuali; satu sudu lagi masuk mentah selepas api dimatikan."
          },
          {
            "type": "ol",
            "items": [
              "Didihkan dua liter air, garamkan, masukkan 180 g spageti.",
              "Letak tiga sudu besar minyak dan bawang putih dalam kuali sejuk.",
              "Hidupkan api sederhana rendah; bawang putih patut berdesir perlahan sahaja.",
              "Masukkan cili kering sebaik tepinya bertukar gandum, kemudian matikan api.",
              "Cedok satu cawan air rebusan, toskan mi dua minit lebih awal.",
              "Hidupkan semula api, masukkan mi dengan setengah cawan air rebusan.",
              "Gaul laju satu hingga dua minit sehingga sos likat dan melekat.",
              "Matikan api, masukkan dua sudu minyak mentah dan parsli, hidang segera."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPastaInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Pusingan tempatan: cili padi, ikan bilis atau daun kari",
        "id": "pusingan-tempatan",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga bahan yang memang ada di dapur kita boleh mengambil tempat cili kering itu. Cili padi memberi pedas yang lebih tajam dan datang lebih awal. Ikan bilis goreng membawa masin gurih, kerja yang sama seperti anchovy dalam versi asalnya. Daun kari pula membawa wangi tersendiri."
          },
          {
            "type": "ul",
            "items": [
              "Cili padi: hiris dua biji, masukkan bersama bawang putih, mula dengan sedikit.",
              "Ikan bilis: goreng rangup dahulu, tabur di atas mi pada saat akhir.",
              "Daun kari: rendam satu tangkai dalam minyak suam sepuluh saat, kemudian angkat.",
              "Kurangkan garam apabila ikan bilis digunakan, kerana ia sudah cukup masin."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPastaInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Bahan dari pasar raya di sini",
        "id": "bahan-pasar-raya",
        "blocks": [
          {
            "type": "p",
            "text": "Semuanya ada di pasar raya biasa. Spageti kering di lorong pasta, bawang putih dan cili padi di bahagian sayur, ikan bilis di lorong barangan kering. Parsli segar tidak selalu ada; daun sup atau daun ketumbar boleh mengambil tempatnya tanpa banyak beza."
          },
          {
            "type": "table",
            "head": [
              "Bahan",
              "Apa yang dicari",
              "Nota dapur"
            ],
            "rows": [
              [
                "Spageti kering",
                "Kotak biasa, bukan mi segar",
                "Toskan dua minit awal"
              ],
              [
                "Bawang putih",
                "Ulas padat dan kering",
                "Hiris nipis, jangan tumbuk"
              ],
              [
                "Cili padi",
                "Merah, segar, bertangkai",
                "Lebih pedas daripada cili kering"
              ],
              [
                "Ikan bilis",
                "Saiz kecil, tanpa kepala",
                "Goreng rangup, tabur akhir"
              ],
              [
                "Minyak zaitun dara",
                "Kaca gelap, perahan sejuk",
                "Simpan gelap dan tertutup"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPastaInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          },
          {
            "type": "p",
            "text": "Dalam hidangan yang sosnya hampir semua minyak, minyak itulah rasanya. Minyak zaitun dara **perahan sejuk** membawa rasa hijau dan denyut pedas; minyak neutral tidak membawa apa-apa. Lihat [saiz botol](/products) atau [tempat membelinya](/shop)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Satu kuali, empat bahan",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun untuk pasta bukan soal resepi panjang. Bawang putih yang berhenti pada warna gandum, air rebusan yang tidak dibuang, dan gaulan yang laju di dalam kuali — itu sahaja sosnya."
        },
        {
          "type": "p",
          "text": "Selepas itu barulah pusingan tempatan: cili padi, ikan bilis atau daun kari. Resepi ringkas yang lain ada dalam [resepi mudah dengan minyak zaitun](/blog/resepi-mudah-dengan-minyak-zaitun)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Berapa banyak minyak zaitun untuk pasta dua orang?",
        "a": "Empat sudu besar untuk 200 g spageti, iaitu kira-kira 60 ml, sama seperti yang sudah diterbitkan dalam resepi pasta laman ini. Tiga sudu dimasak bersama bawang putih dan satu sudu lagi dimasukkan mentah selepas api dimatikan, supaya rasa hijaunya masih terasa."
      },
      {
        "q": "Kenapa sos pasta saya berpisah menjadi minyak dan air?",
        "a": "Kerana tiada kanji yang memegangnya. Air paip biasa tidak berfungsi; hanya air rebusan pasta yang berkanji boleh mengikat minyak. Gaul dalam kuali di atas api sederhana, bukan dalam pinggan hidang."
      },
      {
        "q": "Bawang putih saya sudah bertukar coklat, masih boleh guna?",
        "a": "Lebih baik tidak. Pahit daripada bawang putih hangus sudah larut ke dalam minyak dan tiada cara mengeluarkannya semula. Buang isi kuali, lap kuali itu, dan mula semula dengan minyak baharu."
      },
      {
        "q": "Ikan bilis dimasukkan bila, di dalam minyak atau di atas mi?",
        "a": "Goreng rangup dahulu dalam minyak, angkat dan ketepikan, kemudian tabur di atas mi selepas semuanya digaul. Kalau dibiar dalam sos ia menyerap air rebusan dan hilang rangupnya dalam beberapa minit."
      },
      {
        "q": "Perlu ke guna minyak zaitun dara, tidak boleh minyak biasa?",
        "a": "Boleh, tetapi hasilnya berbeza. Dalam hidangan yang sosnya hampir semua minyak, minyak neutral memberi pinggan yang neutral. Minyak zaitun dara membawa rasa hijau dan sedikit pedas yang memang menjadi tujuan hidangan ini."
      },
      {
        "q": "Di mana boleh beli minyak zaitun Arabian Village di Malaysia?",
        "a": "Di Berkat Madinah Store sahaja, dengan lima cawangan di Selangor serta kaunter Shopee dan TikTok Shop milik mereka sendiri. Tiada penjual sah yang lain di Malaysia, jadi semak sumbernya sebelum membeli."
      }
    ],
    "related": [
      {
        "label": "Resepi mudah dengan minyak zaitun",
        "path": "blog/resepi-mudah-dengan-minyak-zaitun",
        "description": "Empat resepi ringkas dengan sukatan sudu besar: cicahan roti, perap ayam, sayur panggang dan pasta."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Bab haba, kerja dapur yang sesuai, dan apa yang berlaku kepada minyak zaitun di dalam kuali."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "minyak-zaitun-untuk-roti",
    "slug": "minyak-zaitun-untuk-roti-dan-cicahan",
    "seoTitle": "Minyak Zaitun untuk Roti: Panduan Pinggan Cicahan",
    "metaTitle": "Minyak Zaitun untuk Roti: Panduan Pinggan Cicahan",
    "metaDescription": "Cicah roti dengan minyak zaitun: roti canai, roti arab, sourdough dan roti benggali, za'atar dan dukkah dan balsamik, suhu hidangan dan sukatan.",
    "focusKeyword": "minyak zaitun untuk roti",
    "relatedKeywords": [
      "cicahan minyak zaitun",
      "minyak zaitun cicah roti",
      "za'atar dan minyak zaitun",
      "dukkah minyak zaitun",
      "minyak zaitun dan balsamik",
      "roti arab dengan minyak zaitun",
      "roti canai dengan minyak zaitun",
      "roti benggali bakar",
      "cara hidang minyak zaitun",
      "minyak zaitun dara untuk cicahan",
      "suhu hidangan minyak zaitun"
    ],
    "category": "Hidangan dan Pasangan",
    "tags": [
      "Cicahan",
      "Za'atar",
      "Roti",
      "Cara Hidang",
      "Dapur Malaysia"
    ],
    "h1": "Minyak Zaitun untuk Roti: Cicahan, Za'atar dan Sukatannya",
    "excerpt": "Sepinggan minyak yang tidak dipanaskan dan sekeping roti yang dicarik ialah ujian paling jujur yang pernah dihadapi sebotol minyak zaitun.",
    "keyTakeaway": "Minyak zaitun untuk roti ialah cara guna yang paling sedikit menyembunyikan minyak: tiada haba, tiada asid, tiada bawang putih. Hidangkan pada suhu bilik dalam pinggan yang cetek, tuang satu sudu besar pada satu masa dan isi semula, carik roti yang berongga dan jangan memotongnya, kacau za'atar terus ke dalam minyak dan biarkan dukkah kering di mangkuk asing.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukRotiHero",
      "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-roti.jpg",
    "intro": [
      "Roti dan sepinggan minyak zaitun ialah cara hidang paling tua, dan paling susah untuk berselindung.",
      "Tiada api, tiada cuka, tiada bawang putih yang menutup apa-apa.",
      "Roti mana yang sesuai, apa yang za'atar, dukkah dan balsamik lakukan, dan berapa banyak dituang satu masa."
    ],
    "sections": [
      {
        "heading": "Kenapa cicahan tanpa haba menunjukkan watak sebenar minyak",
        "id": "tanpa-haba",
        "blocks": [
          {
            "type": "p",
            "text": "Mencicah ialah cara guna yang paling sedikit mengubah minyak. Haba menghalau sebatian meruap yang membawa rasa hijau dan denyut pedas, manakala dresing memotongnya dengan asid dan garam. Di atas roti, minyak sampai penuh: rasa buah dahulu, kemudian pahit, kemudian pedas di belakang tekak. Pinggan cicahan juga cepat mendedahkan botol yang sudah letih."
          },
          {
            "type": "p",
            "text": "Minyak yang lama terbiar terbuka di sebelah dapur akan berbunyi hambar di sini."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukRotiInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Roti mana yang sesuai untuk dicicah",
        "id": "roti-mana",
        "blocks": [
          {
            "type": "p",
            "text": "Roti menentukan berapa banyak minyak sampai ke mulut anda dan dalam keadaan apa. Isi yang berongga dan kenyal mengambil kadar terkawal dan kekal bentuknya. Roti yang terlalu lembut basah terus ke tengah lalu menjadi berminyak, dan kraker kering pula patah."
          },
          {
            "type": "ul",
            "items": [
              "**Roti arab atau pita.** Carik, jangan potong — tepi carik memegang lebih banyak minyak.",
              "**Sourdough.** Rongga besar mengambil minyak, kerak memberi pegangan.",
              "**Roti canai panas.** Menjadi, tetapi ia sudah berlemak, jadi tuang lebih sedikit.",
              "**Roti benggali.** Lembut dan cepat basah — bakar sehingga tepinya kering dahulu.",
              "**Roti putih sandwic.** Langkau; ia meresap terus dan koyak."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukRotiInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Za'atar, dukkah dan balsamik menarik ke tiga arah",
        "id": "tiga-arah",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga tambahan membawa sepinggan minyak ke tiga tempat berlainan. Za'atar menjadikannya berherba dan masam, dengan timi, sumak dan bijan. Dukkah menjadikannya berkacang dan rangup, campuran kering kacang serta biji panggang. Balsamik pula tajam dan memang tidak bercampur: cukanya duduk di bawah minyak sebagai manik gelap."
          },
          {
            "type": "ul",
            "items": [
              "**Za'atar dengan roti arab.** Satu sudu kecil bagi setiap sudu besar minyak, biar lima minit.",
              "**Dukkah dengan sourdough.** Kekalkan kering dalam mangkuk sendiri, tekan roti berminyak ke dalamnya.",
              "**Balsamik dengan roti artisan.** Minyak dahulu, cuka dititis di tengah, jangan dikacau.",
              "**Garam kasar dengan roti canai.** Paling sedikit mengubah rasa minyak.",
              "**Madu dengan roti benggali bakar.** Manis melawan pahit, untuk meja sarapan."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukRotiInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          },
          {
            "type": "p",
            "text": "Pasangan minyak dengan timi itu dijual siap sebagai [minyak zaitun infusi timi liar](/products/infused-extra-virgin-olive-oil-wild-thyme), satu daripada enam rasa dalam [Koleksi Infusi](/products)."
          }
        ]
      },
      {
        "heading": "Suhu hidangan dan berapa banyak dituang satu masa",
        "id": "suhu-dan-sukatan",
        "blocks": [
          {
            "type": "p",
            "text": "Hidangkan minyak zaitun untuk roti pada suhu bilik, dan dapur Malaysia menguruskan itu tanpa bantuan. Yang menyusahkan ialah botol yang baru keluar dari peti sejuk: minyak sejuk menjadi keruh dan pekat, lalu hampir tiada aromanya keluar. Peti sejuk memang tidak perlu."
          },
          {
            "type": "table",
            "head": [
              "Bilangan orang",
              "Minyak sepinggan",
              "Cara isi semula"
            ],
            "rows": [
              [
                "Seorang",
                "1 sudu besar",
                "Terus dari botol"
              ],
              [
                "Dua hingga empat",
                "2 hingga 3 sudu besar",
                "Setiap lima belas minit"
              ],
              [
                "Enam atau lebih",
                "Satu pinggan setiap dua orang",
                "Isi setiap pinggan"
              ],
              [
                "Meja mezze atau berbuka",
                "Satu jag kecil",
                "Tuang bila diminta"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukRotiInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Menyusun hidangan cicahan untuk tetamu",
        "id": "untuk-tetamu",
        "blocks": [
          {
            "type": "p",
            "text": "Hidangan cicahan mengambil masa dua minit dan satu keputusan sahaja: minyak keluar dahulu tanpa apa-apa, dan selebihnya menyusul. Tetamu yang sudah merasa minyak itu bersendirian tahu apa yang mereka cicah, dan mangkuk za'atar berhenti menjadi satu-satunya yang mereka ingat."
          },
          {
            "type": "ol",
            "items": [
              "Panaskan roti dua minit dalam kuali kering, kemudian balut dengan kain.",
              "Tuang lapisan cetek ke dalam pinggan putih supaya warnanya kelihatan.",
              "Kacau za'atar ke dalam minyak; biarkan dukkah dan garam kering di mangkuk asing.",
              "Carik roti di meja; roti yang dipotong awal kering menunggu.",
              "Isi semula dari botol, jangan biarkan pinggan penuh terbiar."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukRotiInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Silap yang biasa berlaku pada pinggan cicahan",
        "id": "silap-biasa",
        "blocks": [
          {
            "type": "p",
            "text": "Kebanyakan pinggan cicahan gagal atas sebab yang tiada kaitan dengan resipi. Pinggan yang dituang sejam awal sudah bertemu udara sepanjang masa itu. Botol yang disimpan di atas dapur pula sudah habis riwayatnya sebelum sampai ke meja."
          },
          {
            "type": "p",
            "text": "Minyak yang anda sanggup rasa kosong itulah yang berbaloi dituang ke dalam pinggan. Lihat [saiz botol dan harga](/products) dan [cara simpan minyak zaitun](/blog/cara-simpan-minyak-zaitun)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukRotiInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Meletakkannya di atas meja",
      "blocks": [
        {
          "type": "p",
          "text": "Suhu bilik, pinggan putih yang cetek, satu sudu besar pada satu masa, dan roti yang dicarik bukan dipotong. Rasa minyak itu kosong dahulu, asingkan za'atar dan dukkah, kemudian isi semula."
        }
      ]
    },
    "faqs": [
      {
        "q": "Minyak zaitun jenis mana paling sesuai untuk mencicah roti?",
        "a": "Minyak zaitun dara, kerana mencicah ialah cara guna yang paling sedikit menutup minyak. Gred yang ditapis sudah kehilangan sebahagian besar aromanya. Kesegaran sama penting dengan gred: botol yang baru dibuka terasa lebih terang."
      },
      {
        "q": "Berapa banyak minyak zaitun patut dituang dalam satu pinggan cicahan?",
        "a": "Kira-kira satu sudu besar bagi seorang, sebagai lapisan cetek dan bukan lopak yang dalam. Lapisan nipis dalam pinggan lebar bertemu banyak udara, jadi tuang sedikit dan isi semula dari botol."
      },
      {
        "q": "Boleh ke cicah roti canai dengan minyak zaitun?",
        "a": "Boleh, dan ia menjadi selagi roti canai itu masih panas. Cuma roti canai sudah membawa lemaknya sendiri, jadi tuang kira-kira separuh daripada sukatan untuk roti arab, dan pilih garam kasar berbanding za'atar."
      },
      {
        "q": "Kenapa balsamik duduk di bawah minyak zaitun dan tidak bercampur?",
        "a": "Cuka berasaskan air dan lebih tumpat daripada minyak, jadi ia turun lalu kekal sebagai manik gelap yang berasingan melainkan sesuatu dipukul untuk mengikat kedua-duanya. Di atas pinggan cicahan, pemisahan itu memang tujuannya."
      },
      {
        "q": "Bagaimana cara membuat cicahan za'atar dan minyak zaitun?",
        "a": "Tuang lapisan cetek minyak ke dalam pinggan, masukkan kira-kira satu sudu kecil za'atar bagi setiap sudu besar minyak, kacau sekali dan biarkan lima minit supaya sumak dan timi mengembang. Hidang dengan roti dicarik."
      },
      {
        "q": "Roti benggali sesuai ke untuk dicicah dengan minyak zaitun?",
        "a": "Ia lembut dan cepat basah kalau dicicah terus. Bakar keping tebal dalam kuali kering sehingga tepinya kering dan rangup, barulah cicah — kerak itu memberi pegangan yang tiada pada roti yang masih lembut."
      },
      {
        "q": "Di mana boleh beli minyak zaitun Arabian Village di Malaysia?",
        "a": "Di Berkat Madinah Store sahaja, satu-satunya penjual sah di Malaysia: lima cawangan di Selangor (Ampang, Kajang, Shah Alam, Cash & Carry di Ampang dan Sri Gombak), serta kaunter Shopee dan TikTok Shop milik mereka sendiri. Tiada penjual lain membawa jenama ini."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun untuk salad dan hidangan sejuk",
        "path": "blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk",
        "description": "Kerja sejuk yang lain: nisbah dresing, kerabu dan ulam, serta bila minyak dituang tanpa dipanaskan."
      },
      {
        "label": "Minyak zaitun Palestin: dari ladang ke botol",
        "path": "blog/minyak-zaitun-palestin-dari-ladang-ke-botol",
        "description": "Dusun, tuaian dan perahan sejuk di sebalik minyak yang duduk dalam pinggan cicahan itu."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi enam rasa."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan kaunter dalam talian Berkat Madinah Store."
      },
      {
        "label": "Minyak zaitun vs mentega",
        "path": "blog/minyak-zaitun-vs-mentega",
        "description": "Sebagai sapuan dan lemak masakan, bukan penukaran bakeri, pada rasa dan sifat perang."
      },
      {
        "label": "Minyak zaitun untuk telur goreng",
        "path": "blog/minyak-zaitun-untuk-telur-goreng",
        "description": "Gaya Sepanyol: lopak minyak cetek, disiram panas ke atas kuning."
      },
      {
        "label": "Minyak zaitun untuk pizza",
        "path": "blog/minyak-zaitun-untuk-pizza",
        "description": "Adunan dan kerak, bukan lopak untuk mencelup — minyak dilipat dan disapu."
      },
      {
        "label": "Cara makan minyak zaitun setiap hari",
        "path": "blog/cara-makan-minyak-zaitun-setiap-hari",
        "description": "Slot sebenar dalam menu Malaysia, diukur ikut hidangan bukan ikut orang."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "minyak-zaitun-vs-minyak-sawit",
    "slug": "minyak-zaitun-vs-minyak-sawit",
    "seoTitle": "Minyak Zaitun vs Minyak Sawit: Guna Mana, Bila?",
    "metaTitle": "Minyak Zaitun vs Minyak Sawit: Guna Mana, Bila?",
    "metaDescription": "Banding minyak zaitun dara dan minyak sawit sebagai lemak masakan: takat berasap, rasa, kos seliter, dan kerja dapur mana untuk minyak mana.",
    "focusKeyword": "minyak zaitun vs minyak sawit",
    "relatedKeywords": [
      "minyak sawit vs minyak zaitun",
      "beza minyak zaitun dan minyak sawit",
      "takat berasap minyak sawit",
      "takat asap minyak zaitun dara",
      "minyak zaitun ganti minyak masak",
      "minyak sawit untuk goreng rendam",
      "kos minyak zaitun seliter",
      "minyak mana untuk tumis",
      "minyak zaitun dara di Malaysia",
      "banding minyak masak Malaysia"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun vs Minyak Sawit",
      "Perbandingan Minyak",
      "Dapur Malaysia",
      "Teknik Memasak",
      "Kos Dapur"
    ],
    "h1": "Minyak Zaitun vs Minyak Sawit dalam Dapur Malaysia",
    "excerpt": "Satu ditapis untuk api besar, satu lagi diperah sejuk untuk rasanya. Banding takat berasap, rasa, kos seliter dan kerja dapur mana untuk minyak mana.",
    "keyTakeaway": "Minyak zaitun vs minyak sawit bukan soal mana lebih hebat, tetapi kerja mana untuk minyak mana. Minyak sawit ditapis untuk tahan haba tinggi dan kuantiti besar, dan takat berasapnya memang lebih tinggi. Minyak zaitun dara perahan sejuk dibeli kerana rasanya, dan paling berbaloi pada hidangan yang tidak dipanaskan lama.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunVsMinyakSawitHero",
      "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
    },
    "ogImage": "/og/blog-minyak-zaitun-vs-minyak-sawit.jpg",
    "intro": [
      "Di hampir setiap dapur di Malaysia, minyak sawit ialah minyak lalai: murah, tahan panas, dan memang dikeluarkan di negara ini sendiri.",
      "Minyak zaitun dara pula datang dalam botol kecil dan dituang dengan lebih berhati-hati.",
      "Kita banding kedua-duanya sebagai lemak masakan sahaja: takat berasap, rasa, kos seliter, dan kerja dapur mana untuk yang mana."
    ],
    "sections": [
      {
        "heading": "Beza asas antara minyak zaitun dan minyak sawit",
        "id": "beza-asas",
        "blocks": [
          {
            "type": "p",
            "text": "Kedua-duanya lemak masakan, tetapi dibuat untuk kerja yang berlainan. Minyak sawit ditapis sehingga hampir tiada rasa dan tahan haba tinggi, jadi ia sesuai untuk kuali penuh dan api besar. Minyak zaitun dara pula tidak ditapis langsung: ia diperah daripada buah dan dibotolkan dengan rasa buah itu masih ada."
          },
          {
            "type": "note",
            "title": "Kalau soalan sebenar anda ialah kesihatan",
            "text": "Artikel ini membandingkan dua minyak sebagai lemak masakan sahaja. Soalan tentang pemakanan adalah untuk pakar diet atau doktor, bukan untuk penjual minyak."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakSawitInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Takat berasap: minyak sawit memang lebih tinggi",
        "id": "takat-berasap",
        "blocks": [
          {
            "type": "p",
            "text": "Ini bahagian yang selalu diputarbelitkan, jadi kita katakan terus: minyak masak sawit tahan haba lebih tinggi daripada minyak zaitun dara. Sebagaimana angka yang kami terbitkan, minyak sawit berada sekitar 230 darjah Celsius manakala minyak zaitun dara extra berada dalam julat 190 hingga 210 darjah. Untuk goreng rendam, itu memang kelebihan sawit."
          },
          {
            "type": "table",
            "head": [
              "Ciri",
              "Minyak zaitun dara extra",
              "Minyak masak sawit"
            ],
            "rows": [
              [
                "Takat berasap",
                "190 hingga 210 darjah",
                "Kira-kira 230 darjah"
              ],
              [
                "Rasa",
                "Buah, sedikit pahit, pedas halus",
                "Hampir neutral"
              ],
              [
                "Pemprosesan",
                "Perahan sejuk, tanpa penapisan",
                "Ditapis untuk kestabilan haba"
              ],
              [
                "Saiz botol biasa",
                "250 ml dan 500 ml",
                "Botol beberapa liter"
              ],
              [
                "Kerja terbaiknya",
                "Salad, cicah, renjis akhir, tumis",
                "Goreng rendam, wok api besar"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakSawitInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Rasa: satu neutral, satu memang mahu dirasa",
        "id": "rasa-dua-minyak",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak sawit ditapis supaya tidak terasa, dan itu bukan kekurangan tetapi memang tujuannya. Sambal, rempah kari dan ikan goreng sepatutnya berdiri sendiri tanpa minyak masuk campur. Minyak zaitun dara sebaliknya: ia membawa rasa buah, sedikit pahit di hujung lidah dan denyut pedas di kerongkong, dan rasa itu sampai ke pinggan."
          },
          {
            "type": "p",
            "text": "Sebab itu menukar minyak dalam resepi bukan pertukaran satu lawan satu. Untuk perbandingan yang lebih luas merentas minyak masak tempatan, lihat [minyak zaitun vs minyak masak lain](/blog/minyak-zaitun-vs-minyak-masak-lain)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakSawitInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Kos seliter: dua kelas harga yang berbeza",
        "id": "kos-seliter",
        "blocks": [
          {
            "type": "p",
            "text": "Ini beza yang paling besar dan paling jujur. Minyak sawit ditanam, dikisar dan dibotolkan di negara ini, jadi harga seliternya rendah dan botolnya besar. Minyak zaitun dara diperah sekali setahun di luar negara dan sampai ke sini dalam botol 250 ml atau 500 ml. Bandingkan harga seliter, bukan harga sebotol."
          },
          {
            "type": "p",
            "text": "Kerana itu tiada siapa mencadangkan anda menggoreng seliter dengan minyak zaitun dara. Sebotol kecil bertahan berbulan kalau ia dipakai secara sudu, bukan secara kuali. [Lihat saiz dan harga di halaman produk](/products)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakSawitInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Kerja dapur mana untuk minyak mana",
        "id": "kerja-dapur",
        "blocks": [
          {
            "type": "p",
            "text": "Cara paling mudah memilih ialah tanya dua soalan: berapa banyak minyak kerja ini telan, dan adakah minyak itu patut dirasa dalam hidangan siap. Kuantiti besar dan api penuh memihak kepada minyak sawit. Kuantiti sudu dan hidangan yang minyaknya sebahagian daripada rasa memihak kepada minyak zaitun dara."
          },
          {
            "type": "ul",
            "items": [
              "Goreng rendam sekuali penuh seperti pisang goreng atau keropok: minyak sawit.",
              "Wok api penuh untuk kuey teow atau nasi goreng: minyak sawit.",
              "Tumis bawang putih dan sayur pada api sederhana: minyak zaitun dara sesuai.",
              "Sos salad, cicah roti dan renjis akhir sebelum hidang: minyak zaitun dara."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakSawitInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Kenapa kedua-duanya boleh duduk dalam satu dapur",
        "id": "satu-dapur-dua-botol",
        "blocks": [
          {
            "type": "p",
            "text": "Rumah yang paling senang memakai minyak zaitun bukan rumah yang membuang minyak sawit. Ia rumah yang menyimpan kedua-duanya dan tahu bila hendak mencapai yang mana. Botol besar minyak sawit duduk dekat dapur untuk kerja panas dan kerja kuantiti. Botol kecil minyak zaitun dara duduk dalam kabinet, jauh daripada haba."
          },
          {
            "type": "p",
            "text": "Mula dengan satu kerja sahaja, bukan dengan menukar seluruh dapur. Sos salad atau renjis atas sayur panggang sudah cukup. Panduan penuh ada dalam [panduan minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakSawitInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Dua alat, bukan dua lawan",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun vs minyak sawit bukan pertandingan dengan pemenang tetap. Satu ditapis untuk tahan haba dan kuantiti, satu lagi diperah sejuk supaya rasanya sampai ke pinggan. Dapur yang paling praktikal di Malaysia menyimpan kedua-duanya."
        },
        {
          "type": "p",
          "text": "Kalau mahu mula, mula dengan botol kecil dan satu kerja. [Lihat saiz botol](/products) atau [tempat membeli](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Boleh ke minyak zaitun ganti minyak sawit untuk goreng rendam?",
        "a": "Untuk sekuali penuh, minyak sawit lebih praktikal: takat berasapnya lebih tinggi dan kuantiti yang diperlukan sekali gus jauh lebih besar. Minyak zaitun dara lebih sesuai untuk goreng cetek dan tumis pada api sederhana."
      },
      {
        "q": "Minyak mana lebih tinggi takat berasapnya?",
        "a": "Minyak masak sawit. Sebagaimana angka yang kami terbitkan, sawit berada sekitar 230 darjah Celsius dan minyak zaitun dara extra dalam julat 190 hingga 210 darjah. Untuk kerja api penuh, itu memang kelebihan sawit."
      },
      {
        "q": "Minyak mana lebih baik untuk kesihatan?",
        "a": "Itu soalan untuk pakar pemakanan atau doktor, bukan untuk penjual minyak. Laman ini membandingkan kedua-duanya sebagai lemak masakan sahaja: takat berasap, rasa, tekstur dan kos seliter. Sila rujuk profesional kesihatan untuk bab pemakanan."
      },
      {
        "q": "Kenapa minyak zaitun jauh lebih mahal seliter daripada minyak sawit?",
        "a": "Minyak sawit dikeluarkan dan dibotolkan di negara ini dalam kuantiti besar. Minyak zaitun dara diperah sekali setahun di luar negara, dibotolkan dalam kaca gelap dan dihantar ke sini. Semak harga mengikut saiz di halaman produk."
      },
      {
        "q": "Boleh campur minyak zaitun dengan minyak sawit dalam satu kuali?",
        "a": "Boleh, dan hasilnya di tengah-tengah: sedikit rasa zaitun dengan kos yang lebih rendah. Tetapi campuran itu tidak menaikkan takat berasap minyak zaitun, jadi ia bukan jalan pintas untuk memasak pada api yang lebih tinggi."
      },
      {
        "q": "Minyak zaitun sesuai tak untuk masakan Melayu yang berempah?",
        "a": "Untuk tumis rempah pada api sederhana ia menjadi, tetapi rasa hijaunya akan hilang dalam lauk bersantan yang direbus lama. Simpan minyak zaitun dara untuk kerja yang rasanya masih terasa, seperti sayur panggang dan sos salad."
      },
      {
        "q": "Perlu ke simpan dua botol minyak dalam dapur kecil?",
        "a": "Ramai memang berbuat begitu kerana kerjanya berlainan. Sebotol besar minyak sawit untuk goreng dan wok, dan sebotol 250 ml minyak zaitun dara dalam kabinet untuk salad, cicah roti dan renjis akhir."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun vs minyak masak lain",
        "path": "blog/minyak-zaitun-vs-minyak-masak-lain",
        "description": "Minyak sawit, kelapa dara, bijan, kacang tanah dan zaitun dibandingkan sebagai satu set."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Kaedah masakan mana yang sesuai dengan minyak zaitun, dan bila lebih baik guna minyak lain."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "minyak-zaitun-murah",
    "slug": "kenapa-minyak-zaitun-tak-pernah-murah",
    "seoTitle": "Kenapa Minyak Zaitun Tak Pernah Murah?",
    "metaTitle": "Kenapa Minyak Zaitun Tak Pernah Murah?",
    "metaDescription": "Minyak zaitun murah selalu ada sebab. Kenapa harga tak pernah rendah, tanda amaran pada botol murah, dan cara banding harga seliter dengan adil.",
    "focusKeyword": "minyak zaitun murah",
    "relatedKeywords": [
      "minyak zaitun murah malaysia",
      "kenapa minyak zaitun mahal",
      "botol minyak zaitun murah",
      "harga minyak zaitun rendah",
      "minyak zaitun murah selamat ke tidak",
      "gred minyak zaitun",
      "minyak zaitun campuran",
      "harga seliter minyak zaitun",
      "minyak zaitun jualan",
      "tanda minyak zaitun palsu"
    ],
    "category": "Panduan Pembeli",
    "tags": [
      "Minyak Zaitun Murah",
      "Harga Minyak Zaitun",
      "Panduan Pembeli",
      "Gred Minyak Zaitun",
      "Dapur Malaysia"
    ],
    "h1": "Kenapa Minyak Zaitun Tak Pernah Murah, dan Bila Botol Murah Jadi Tanda Amaran",
    "excerpt": "Minyak zaitun murah bukan tawaran bertuah — ia hampir selalu bermakna sesuatu. Kos sebenar sebotol, sebab harga sangat rendah patut buat anda tertanya, dan bila harga rendah memang munasabah.",
    "keyTakeaway": "Minyak zaitun dara tidak pernah murah kerana pokoknya lambat berhasil, tuaian dilakukan dengan tangan, perahan mesti berlaku segera, dan setiap botol diimport ke Malaysia. Harga yang jauh lebih rendah daripada purata pasaran biasanya bermakna gred lebih rendah, campuran atau stok lama, bukan penjimatan sebenar. Banding harga seliter, bukan harga label.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunMurahHero",
      "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
    },
    "ogImage": "/og/blog-minyak-zaitun-murah.jpg",
    "intro": [
      "Sekali-sekala, sebotol minyak zaitun dara muncul jauh di bawah harga biasa — kadang-kadang separuh harga jenama lain di rak yang sama.",
      "Soalan yang patut ditanya bukan sama ada produk ini berbaloi, tetapi kenapa harga itu boleh serendah itu, dan apa yang mungkin dikorbankan untuk sampai ke situ.",
      "Di bawah ada kos sebenar sebotol minyak zaitun, sebab harga rendah keterlaluan patut buat anda berhenti sebentar, dan bila harga murah memang masuk akal."
    ],
    "sections": [
      {
        "heading": "Kenapa minyak zaitun tak pernah murah",
        "id": "kenapa-tak-pernah-murah",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara bermula daripada pokok yang mengambil bertahun untuk matang dan mengeluarkan hasil bermusim, bukan kilang yang boleh dipercepat. Buahnya dituai dalam tempoh singkat setiap tahun, kebanyakannya dengan tangan supaya buah tidak lebam, kemudian mesti diperah dalam beberapa jam supaya rasa dan mutunya tidak merosot. Setiap langkah itu perlahan dan padat kerja, dan kerja padat kos wang, sebelum botol itu pun dihantar merentasi lautan dan melepasi kastam."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunMurahInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Apa sebenarnya yang anda bayar dalam sebotol",
        "id": "kos-sebenar",
        "blocks": [
          {
            "type": "p",
            "text": "Empat kos berulang dalam setiap botol minyak zaitun dara yang tulen: penjagaan pokok sepanjang tahun, tuaian tangan yang perlahan, perahan segera di kilang berhampiran ladang supaya buah tidak sempat rosak, dan penghantaran antarabangsa lengkap dengan duti. Tiada satu pun daripadanya murah, dan tiada satu pun boleh dilangkau tanpa menjejaskan apa yang masuk ke dalam botol."
          },
          {
            "type": "ul",
            "items": [
              "**Pokok dan tuaian** — dijaga sepanjang tahun, dituai dengan tangan.",
              "**Perahan segera** — dalam beberapa jam selepas tuaian, bukan berminggu kemudian.",
              "**Pembotolan** — kaca gelap dan tutup kedap yang melindungi minyak.",
              "**Penghantaran dan duti** — merentasi benua ke negara yang tidak menanam zaitun."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunMurahInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Kenapa harga sangat rendah biasanya bermakna sesuatu",
        "id": "harga-rendah-bermakna",
        "blocks": [
          {
            "type": "p",
            "text": "Apabila sebotol dijual jauh di bawah kos munasabah untuk keempat-empat langkah di atas, sesuatu pasti telah dipotong. Selalunya itu bermakna gred yang lebih rendah daripada extra virgin, campuran dengan minyak yang lebih murah, atau stok lama yang perlu dihabiskan sebelum ia semakin tengik. Harga itu jujur tentang kosnya, walaupun label tidak."
          },
          {
            "type": "p",
            "text": "Ini bukan tuduhan terhadap mana-mana jenama — ia cara pasaran minyak zaitun berfungsi merata dunia."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunMurahInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Cara membanding harga seliter dengan adil",
        "id": "banding-harga-seliter",
        "blocks": [
          {
            "type": "p",
            "text": "Botol berlainan saiz tidak boleh dibanding pada harga label sahaja — botol kecil sentiasa kelihatan lebih murah walaupun harga seliternya lebih tinggi. Tukar setiap harga kepada harga seliter dahulu, baru banding angka itu merentasi jenama dan saiz, sebelum tanya soalan gred. Pecahan penuh formula dan contoh pengiraan ada dalam [harga minyak zaitun di Malaysia](/blog/harga-minyak-zaitun-di-malaysia)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunMurahInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Bila harga murah munasabah, dan bila ia jadi amaran",
        "id": "murah-munasabah-vs-amaran",
        "blocks": [
          {
            "type": "p",
            "text": "Harga rendah tidak semestinya mencurigakan. Jualan bermusim, saiz botol lebih besar yang menurunkan harga seliter, atau kedai membersihkan stok menjelang tarikh luput — semua itu sebab yang munasabah. Amaran sebenar muncul apabila harga jauh di bawah purata pasaran tanpa sebab yang dinyatakan, terutama pada botol tanpa tarikh tuaian atau gred yang jelas."
          },
          {
            "type": "table",
            "head": [
              "Situasi",
              "Biasanya munasabah",
              "Patut jadi tanda tanya"
            ],
            "rows": [
              [
                "Jualan bermusim dengan tarikh tamat jelas",
                "Ya",
                "Kalau 'jualan' itu tak pernah tamat"
              ],
              [
                "Botol saiz lebih besar",
                "Ya, harga seliter turun ikut saiz",
                "Kalau harga seliter sama macam botol kecil"
              ],
              [
                "Tiada tarikh tuaian atau gred pada label",
                "Tidak",
                "Hampir selalu — label jujur nyatakan kedua-duanya"
              ],
              [
                "Harga jauh di bawah purata pasaran tanpa sebab",
                "Tidak",
                "Ya — semak gred dan sumber dahulu"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunMurahInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Tanda pada label yang patut disemak sebelum membayar",
        "id": "tanda-label",
        "blocks": [
          {
            "type": "p",
            "text": "Gred, tarikh tuaian dan negara asal patut ada pada label yang jujur — kalau salah satu hilang, itu sendiri satu petunjuk, dan harga murah jadi risiko yang belum dibayar lagi. Extra virgin ialah gred perahan pertama tanpa haba atau bahan kimia. Panduan penuh untuk mengesan minyak yang dicampur atau dilabel salah ada di [cara kenal minyak zaitun palsu](/blog/cara-kenal-minyak-zaitun-palsu)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunMurahInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Harga jujur tentang kos, kalau anda tahu bacaannya",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun tak pernah murah kerana setiap langkah untuk menghasilkannya perlahan dan padat kerja — daripada pokok sehinggalah botol sampai ke rak di Malaysia. Harga yang jauh terlalu rendah biasanya bercakap tentang gred atau campuran, bukan tentang penjimatan sebenar."
        },
        {
          "type": "p",
          "text": "Banding harga seliter dahulu, semak gred dan tarikh tuaian pada label, dan simpan tawaran sebenar untuk jualan bermusim atau botol bersaiz besar. [Lihat saiz dan harga di halaman produk](/products) atau [tempat membeli rasmi](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Kenapa minyak zaitun tak boleh murah macam minyak masak biasa?",
        "a": "Minyak zaitun datang daripada pokok yang lambat berhasil, dituai dengan tangan dan diperah segera, kemudian diimport ke Malaysia yang tidak menanam zaitun. Setiap langkah itu padat kerja dan padat kos, tidak seperti minyak masak yang dikeluarkan tempatan."
      },
      {
        "q": "Botol minyak zaitun yang sangat murah tu selamat ke tidak untuk dimakan?",
        "a": "Ia mungkin selamat, tetapi harga jauh di bawah purata pasaran biasanya bermakna gred lebih rendah, campuran atau stok lama, bukan bahaya segera. Semak gred dan tarikh tuaian pada label sebelum membayar, terutama kalau harganya terasa luar biasa rendah."
      },
      {
        "q": "Macam mana nak tahu harga minyak zaitun tu munasabah atau tidak?",
        "a": "Tukar harga botol kepada harga seliter, kemudian banding angka itu merentasi jenama dan saiz. Formula dan contoh pengiraan penuh ada dalam [harga minyak zaitun di Malaysia](/blog/harga-minyak-zaitun-di-malaysia). Jangan banding harga label sahaja."
      },
      {
        "q": "Adakah jualan atau diskaun bermakna minyak zaitun itu gred rendah?",
        "a": "Tidak semestinya. Jualan bermusim dengan tempoh yang dinyatakan jelas ialah sebab harga munasabah untuk turun buat sementara. Yang patut buat anda tertanya ialah harga 'jualan' yang kekal berbulan-bulan tanpa tarikh tamat."
      },
      {
        "q": "Apa tanda pada label yang menunjukkan minyak zaitun itu gred rendah atau campuran?",
        "a": "Ketiadaan gred, tarikh tuaian atau negara asal pada label ialah petunjuk pertama. Label yang jujur menyatakan ketiga-tiganya dengan jelas. Panduan penuh untuk mengesan tanda ini ada di [cara kenal minyak zaitun palsu](/blog/cara-kenal-minyak-zaitun-palsu)."
      },
      {
        "q": "Kenapa harga Arabian Village tak turun serendah sesetengah jenama lain di rak?",
        "a": "Harganya menanggung kos yang sama seperti mana-mana minyak zaitun dara tulen: tuaian tangan, perahan segera dan penghantaran import. Saiz dan harga sebenar ada di [halaman produk](/products) — bandingkan seliter, bukan harga label."
      },
      {
        "q": "Di mana boleh beli minyak zaitun dengan harga yang boleh dipercayai di Malaysia?",
        "a": "Semak harga terus di [halaman produk](/products) atau [saluran belian rasmi](/shop) supaya anda tahu harga sebenar sebelum banding tempat lain. Elakkan penjual yang tidak boleh sahkan gred atau tarikh tuaian pada botol."
      }
    ],
    "related": [
      {
        "label": "Harga minyak zaitun di Malaysia",
        "path": "blog/harga-minyak-zaitun-di-malaysia",
        "description": "Pecahan harga penuh mengikut saiz botol, dan cara kira harga seliter langkah demi langkah."
      },
      {
        "label": "Cara kenal minyak zaitun palsu",
        "path": "blog/cara-kenal-minyak-zaitun-palsu",
        "description": "Tanda pada label dan botol yang menunjukkan minyak zaitun dicampur atau dilabel salah."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "minyak-zaitun-popcorn",
    "slug": "minyak-zaitun-untuk-popcorn",
    "seoTitle": "Minyak Zaitun Popcorn Atas Dapur: Kaedah Ringkas",
    "metaTitle": "Minyak Zaitun Popcorn Atas Dapur: Kaedah Ringkas",
    "metaDescription": "Cara buat popcorn atas dapur guna minyak zaitun: kuantiti setiap kali, kenapa penutup dan goncangan penting, tahap haba, dan waktu garam yang tepat.",
    "focusKeyword": "minyak zaitun popcorn",
    "relatedKeywords": [
      "minyak zaitun untuk popcorn",
      "popcorn minyak zaitun",
      "popcorn atas dapur",
      "cara buat popcorn guna minyak zaitun",
      "popcorn tanpa bag mikrogelombang",
      "minyak zaitun dara untuk masak",
      "kuantiti minyak zaitun popcorn",
      "garam popcorn bila masa",
      "popcorn guna minyak dara",
      "goncang periuk popcorn"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun Popcorn",
      "Popcorn Atas Dapur",
      "Teknik Memasak",
      "Dapur Malaysia",
      "Minyak Zaitun Dara"
    ],
    "h1": "Minyak Zaitun Popcorn: Kaedah Dapur, Bukan Bag Mikrogelombang",
    "excerpt": "Popcorn atas dapur dengan minyak zaitun bukan bag mikrogelombang: kuantiti minyak yang betul, penutup dan goncangan, tahap haba, dan waktu garam yang tepat.",
    "keyTakeaway": "Minyak zaitun popcorn atas dapur ialah kaedah ringkas: dua hingga tiga sudu besar minyak untuk setengah cawan biji, periuk berpenutup rapat yang digoncang kerap, api sederhana, dan garam ditabur selepas api dimatikan semasa popcorn masih boleh menyerapnya. Minyak dara menambah rasa buah dan pedas halus yang minyak neutral tidak ada — hujah rasa, bukan kesihatan.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunPopcornHero",
      "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
    },
    "ogImage": "/og/blog-minyak-zaitun-popcorn.jpg",
    "intro": [
      "Kebanyakan resipi popcorn di rumah guna bag mikrogelombang atau minyak neutral atas dapur, dan kedua-duanya memang senang.",
      "Guna minyak zaitun atas dapur pula memberi kawalan penuh — kuantiti minyak, tahap haba, dan masa garam semuanya di tangan anda, bukan di tangan pengeluar bag.",
      "Ini bukan kaedah rumit; ia cuma periuk, penutup, dan sedikit goncangan pada masa yang betul."
    ],
    "sections": [
      {
        "heading": "Kenapa Popcorn Atas Dapur, Bukan Bag Mikrogelombang",
        "id": "kenapa-dapur-bukan-mikrogelombang",
        "blocks": [
          {
            "type": "p",
            "text": "Bag popcorn mikrogelombang datang dengan minyak neutral yang sudah dicampur di dalam kertas, jadi anda tidak boleh pilih jenis atau kuantiti minyaknya. Minyak neutral atas dapur pula selamat tetapi hambar — ia cuma alat untuk memanaskan bijirin. Minyak zaitun atas dapur memberi kedua-dua kawalan: anda tentukan berapa banyak minyak, dan minyak itu sendiri membawa rasa ke dalam popcorn siap."
          },
          {
            "type": "p",
            "text": "Bag mikrogelombang juga mengandungi lebih garam dan perasa tambahan daripada yang anda perlukan. Buat sendiri atas dapur bermakna anda kawal semuanya."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPopcornInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Kuantiti Minyak Setiap Kali",
        "id": "kuantiti-minyak-setiap-kali",
        "blocks": [
          {
            "type": "p",
            "text": "Untuk kira-kira setengah cawan (100 gram) biji popcorn, dua hingga tiga sudu besar minyak zaitun sudah cukup — bukan lopak, sekadar cukup untuk melapis dasar periuk dan menyelubungi setiap biji semasa ia berputar. Terlalu sedikit minyak buat biji terbakar di dasar sebelum sempat pecah; terlalu banyak buat popcorn berminyak dan berat, bukan garing."
          },
          {
            "type": "p",
            "text": "Uji dengan tiga hingga empat biji dahulu: apabila ia pecah, minyak sudah cukup panas untuk baki biji dimasukkan sekali gus."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPopcornInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Kaedah Bernombor: Dari Periuk ke Mangkuk",
        "id": "kaedah-bernombor-periuk-ke-mangkuk",
        "blocks": [
          {
            "type": "p",
            "text": "Kaedah ini sama setiap kali dan tidak perlukan peralatan istimewa selain periuk berdinding tebal dan penutup yang muat rapat. Ikut lapan langkah di bawah mengikut turutan, dan biji akan pecah sekata di seluruh dasar tanpa mana-mana bahagian terbakar sebelum sempat pecah."
          },
          {
            "type": "ol",
            "items": [
              "Panaskan periuk kosong di atas api sederhana selama seminit.",
              "Masukkan dua hingga tiga sudu besar minyak zaitun dan biarkan panas.",
              "Uji dengan tiga biji popcorn; tutup periuk dan tunggu ia pecah.",
              "Bila biji ujian pecah, masukkan baki biji dalam satu lapisan rata.",
              "Tutup periuk rapat-rapat dan goncang sekali untuk salut setiap biji dengan minyak.",
              "Kekalkan api sederhana, goncang periuk setiap 15 hingga 20 saat.",
              "Angkat dari api sebaik bunyi pecah menjarang kepada dua atau tiga saat sekali.",
              "Tuang segera ke dalam mangkuk supaya wap tidak melembutkan popcorn yang sudah garing."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPopcornInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Kenapa Penutup Periuk dan Goncangan Penting",
        "id": "penutup-dan-goncangan",
        "blocks": [
          {
            "type": "p",
            "text": "Penutup periuk menahan wap dan haba di sekeliling setiap biji supaya ia pecah serentak, bukan satu-satu secara perlahan sambil yang lain hangus menunggu giliran. Goncangan pula menggerakkan biji yang sudah pecah ke atas dan yang belum pecah turun ke dasar panas, jadi haba diagihkan sekata dan tiada satu bahagian periuk terbakar sebelum yang lain sempat pecah."
          },
          {
            "type": "p",
            "text": "Penutup yang terbuka sedikit membenarkan wap terlepas, jadi popcorn kekal garing."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPopcornInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Waktu Garam yang Tepat",
        "id": "waktu-garam-yang-tepat",
        "blocks": [
          {
            "type": "p",
            "text": "Garam masuk selepas api dimatikan, bukan semasa memasak — garam yang jatuh atas minyak panas hanya tenggelam ke dasar dan tidak melekat pada popcorn. Sebaik periuk diangkat dan popcorn dituang ke mangkuk, permukaannya masih berminyak dan sedikit lembap, jadi garam halus melekat serta-merta selagi ia masih boleh menyerap."
          },
          {
            "type": "p",
            "text": "Goncang mangkuk, bukan kacau dengan sudu, supaya garam sampai rata tanpa memecahkan popcorn yang rapuh."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPopcornInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Apa yang Minyak Zaitun Dara Tambah Di Sini",
        "id": "apa-minyak-dara-tambah",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara perahan sejuk membawa rasa buah dan sedikit pedas di hujung lidah yang minyak neutral tidak ada — ini hujah rasa semata-mata, bukan dakwaan kesihatan. Popcorn yang dimasak dengannya terasa lebih 'penuh' walaupun garamnya sama, kerana minyaknya sendiri sudah membawa rasa sebelum garam pun masuk."
          },
          {
            "type": "p",
            "text": "Untuk sentuhan lain, renjis sedikit minyak infusi seperti rosemary & selasih atas popcorn suam selepas garam, bukan semasa memasak — haba merampas aroma botani itu. [Lihat Koleksi Infusi](/products)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPopcornInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Periuk, Penutup, Goncangan",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun popcorn bukan teknik rumit — ia periuk yang dipanaskan betul, kuantiti minyak yang tepat, penutup yang rapat, dan garam yang masuk pada waktu yang betul. Ganti mana-mana satu langkah dan hasilnya berubah: gosong di dasar, popcorn lembik, atau garam yang gugur ke bawah mangkuk."
        },
        {
          "type": "p",
          "text": "Untuk teknik memasak minyak zaitun yang lain di dapur Malaysia, baca [panduan minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur). Untuk botol 250 ml atau 500 ml, [lihat halaman produk](/products) atau [cawangan berdekatan](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Berapa banyak minyak zaitun diperlukan untuk sekali buat popcorn?",
        "a": "Untuk kira-kira setengah cawan (100 gram) biji popcorn, dua hingga tiga sudu besar minyak zaitun sudah cukup — sekadar melapis dasar periuk dan menyelubungi setiap biji semasa ia berputar, bukan lopak minyak yang menenggelamkannya."
      },
      {
        "q": "Kenapa perlu goncang periuk semasa memasak popcorn?",
        "a": "Goncangan menggerakkan biji yang sudah pecah ke atas dan biji yang belum pecah turun ke dasar panas, jadi haba teragih sekata dan tiada satu bahagian periuk hangus sebelum bahagian lain sempat pecah."
      },
      {
        "q": "Bila waktu terbaik untuk taburkan garam pada popcorn?",
        "a": "Selepas api dimatikan dan popcorn dituang ke mangkuk, semasa permukaannya masih berminyak dan boleh menyerap. Garam yang ditabur atas minyak panas dalam periuk hanya tenggelam ke dasar dan tidak melekat pada popcorn."
      },
      {
        "q": "Kenapa popcorn atas dapur guna minyak zaitun rasa lebih sedap daripada bag mikrogelombang?",
        "a": "Bag mikrogelombang guna minyak neutral yang sudah ditetapkan kuantitinya dan tidak boleh diubah. Minyak zaitun dara membawa rasa buah dan pedas halusnya sendiri ke dalam popcorn, jadi rasa terbina sebelum garam pun masuk — bukan dakwaan kesihatan, cuma perbezaan rasa."
      },
      {
        "q": "Bolehkah guna minyak zaitun infusi untuk buat popcorn?",
        "a": "Elakkan memasak popcorn terus dalam minyak infusi kerana haba merampas aroma botani yang anda bayar. Guna minyak zaitun biasa untuk memasak, kemudian renjis sedikit minyak infusi seperti rosemary & selasih ke atas popcorn suam selepas garam."
      },
      {
        "q": "Apa tanda haba terlalu tinggi semasa memasak popcorn dengan minyak zaitun?",
        "a": "Kalau minyak mula berasap sebelum biji ujian pun pecah, atau bau hangus naik daripada dasar periuk, haba terlalu tinggi. Turunkan ke api sederhana dan goncang lebih kerap supaya biji tidak terbakar sebelum sempat pecah."
      },
      {
        "q": "Perlu ke tukar kepada minyak neutral kalau minyak zaitun rasa terlalu kuat untuk popcorn?",
        "a": "Tidak semestinya — kuantiti dua hingga tiga sudu besar untuk setengah cawan biji biasanya sederhana, bukan berat. Kalau masih terlalu kuat, kurangkan sedikit kuantiti minyak zaitun dan tambah minyak neutral untuk keseimbangan, bukan gantikan sepenuhnya."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Kaedah masakan mana yang sesuai dengan minyak zaitun, dan bila lebih baik guna minyak lain."
      },
      {
        "label": "Minyak zaitun untuk goreng",
        "path": "blog/minyak-zaitun-untuk-goreng",
        "description": "Goreng cetek, tumis, goreng rendam dan kerja wok bukan satu perkara yang sama — jadual kaedah lawan suhu."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "minyak-zaitun-untuk-sayur-panggang",
    "slug": "minyak-zaitun-untuk-sayur-panggang",
    "seoTitle": "Minyak Zaitun untuk Sayur Panggang: Garing Bukan Lembik",
    "metaTitle": "Minyak Zaitun untuk Sayur Panggang: Garing Bukan Lembik",
    "metaDescription": "Berapa banyak minyak zaitun untuk sayur panggang, kenapa dulang penuh buat lembik, suhu ketuhar ikut sayur, dan jadual suhu × masa lengkap.",
    "focusKeyword": "minyak zaitun untuk sayur panggang",
    "relatedKeywords": [
      "minyak zaitun sayur panggang",
      "cara panggang sayur guna minyak zaitun",
      "suhu ketuhar sayur panggang",
      "berapa lama panggang sayur dalam ketuhar",
      "kenapa sayur panggang lembik",
      "minyak zaitun dara untuk memasak",
      "sayur panggang garing",
      "jadual suhu sayur panggang",
      "waktu tabur garam sayur panggang",
      "minyak zaitun untuk masak"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Sayur Panggang",
      "Minyak Zaitun untuk Sayur Panggang",
      "Teknik Ketuhar",
      "Dapur Malaysia",
      "Panduan Memasak"
    ],
    "h1": "Minyak Zaitun untuk Sayur Panggang: Garing, Bukan Lembik",
    "excerpt": "Kenapa sayur dalam ketuhar sering keluar lembik walaupun sudah disapu minyak zaitun, dan cara betulkan: kuantiti minyak, ruang dalam dulang, suhu, dan waktu garam.",
    "keyTakeaway": "Minyak zaitun untuk sayur panggang berfungsi sebagai lapisan nipis, bukan rendaman, dan hanya menggaring kalau dulang tidak sesak. Suhu ketuhar 200 hingga 220 darjah, sayur nipis perlukan panas tinggi masa singkat, sayur padat perlukan suhu lebih rendah lebih lama, dan renjisan mentah selepas keluar ketuhar mengembalikan rasa yang hilang semasa panggang.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukSayurPanggangHero",
      "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-sayur-panggang.jpg",
    "intro": [
      "Ramai memasukkan sayur bersapu minyak zaitun ke dalam ketuhar dan keluar dengan hasil lembik dan berair, bukan garing.",
      "Punca biasanya bukan minyaknya, tetapi kuantiti, ruang dalam dulang dan suhu.",
      "Kita liputi berapa banyak minyak diperlukan, kenapa dulang penuh menghalang kegaringan, julat suhu ketuhar, waktu garam ditabur, sayur mana perlu panas tinggi dan mana perlu suhu rendah lebih lama, serta renjisan mentah selepas keluar ketuhar."
    ],
    "sections": [
      {
        "heading": "Kenapa Sayur Panggang Jadi Lembik, Bukan Garing",
        "id": "kenapa-lembik",
        "blocks": [
          {
            "type": "p",
            "text": "Sayur menggaring apabila wap air pada permukaannya cepat terlepas dan permukaan itu kering sebelum bahagian dalamnya terlalu masak. Kalau minyak terlalu banyak atau sayur terlalu rapat dalam dulang, wap itu terperangkap dan sayur mengukus dalam lembapannya sendiri, bukan memanggang."
          },
          {
            "type": "note",
            "title": "Soal rasa dan tekstur, bukan pemakanan",
            "text": "Artikel ini tentang cara memanggang sayur supaya garing. Soalan tentang khasiat atau kesihatan minyak zaitun sebaiknya dirujuk kepada pakar pemakanan, bukan panduan dapur."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSayurPanggangInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Berapa Banyak Minyak: Lapisan Nipis, Bukan Rendaman",
        "id": "berapa-banyak-minyak",
        "blocks": [
          {
            "type": "p",
            "text": "Sayur perlu dilapisi minyak zaitun, bukan direndam. Untuk satu dulang sederhana, gaul sayur dengan kira-kira satu hingga dua sudu besar sahaja, cukup untuk setiap keping berkilat nipis apabila digosok dengan tangan atau senduk."
          },
          {
            "type": "p",
            "text": "Kalau minyak masih berkumpul di dasar mangkuk selepas gaul, itu sudah terlalu banyak. Tambah sedikit demi sedikit dan gaul semula, bukan tuang terus di atas dulang yang sudah tersusun."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSayurPanggangInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Kenapa Dulang Terlalu Penuh Menghalang Kegaringan",
        "id": "dulang-tak-padat",
        "blocks": [
          {
            "type": "p",
            "text": "Setiap keping sayur melepaskan wap air semasa dipanggang. Kalau dulang sesak, wap dari sekeping tidak sempat terlepas ke udara dan malah diserap oleh keping sebelahnya, jadi seluruh dulang mengukus bersama walaupun ketuhar cukup panas."
          },
          {
            "type": "p",
            "text": "Susun sayur dalam satu lapisan sahaja, dengan ruang kecil antara setiap keping supaya udara panas boleh beredar. Kalau sayur terpaksa bertindih, guna dua dulang berasingan, bukan satu dulang yang penuh sesak."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSayurPanggangInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Suhu Ketuhar dan Waktu Garam Ditabur",
        "id": "suhu-dan-garam",
        "blocks": [
          {
            "type": "p",
            "text": "Kebanyakan sayur panggang paling baik pada 200 hingga 220 darjah Celsius, suhu yang cukup tinggi untuk permukaan cepat kering tetapi tidak terlalu tinggi hingga minyak zaitun mula berasap dan berbau hangus sebelum sayur sempat masak."
          },
          {
            "type": "ul",
            "items": [
              "Garam ditabur sebelum masuk ketuhar untuk sayur yang sudah nipis dan cepat masak, supaya garamnya sempat meresap.",
              "Garam ditabur separuh masa memasak untuk sayur berair seperti terung dan tomato, supaya air yang ditarik keluar oleh garam tidak menggenang di dulang dari awal.",
              "Garam ditabur sekali lagi selepas keluar ketuhar kalau rasanya masih kurang, kerana sebahagian garam ikut hilang bersama wap."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSayurPanggangInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Sayur Mana Perlu Panas Tinggi, Mana Perlu Suhu Rendah Lebih Lama",
        "id": "suhu-ikut-sayur",
        "blocks": [
          {
            "type": "p",
            "text": "Sayur nipis dan berair seperti tomato ceri atau brokoli menggaring cepat pada panas tinggi kerana permukaannya sedikit dan lekas kering. Sayur padat seperti kentang dan lobak merah perlu suhu lebih rendah dan masa lebih lama supaya bahagian dalamnya masak sebelum bahagian luar hangus."
          },
          {
            "type": "table",
            "head": [
              "Sayur",
              "Suhu Ketuhar",
              "Anggaran Masa"
            ],
            "rows": [
              [
                "Kentang (potong dadu)",
                "200 darjah",
                "35 hingga 40 minit"
              ],
              [
                "Lobak merah",
                "190 darjah",
                "25 hingga 30 minit"
              ],
              [
                "Bunga kubis",
                "200 darjah",
                "22 hingga 25 minit"
              ],
              [
                "Terung",
                "190 darjah",
                "20 hingga 25 minit"
              ],
              [
                "Brokoli",
                "190 darjah",
                "15 hingga 18 minit"
              ],
              [
                "Lada benggala",
                "190 darjah",
                "15 hingga 18 minit"
              ],
              [
                "Tomato ceri",
                "180 darjah",
                "12 hingga 15 minit"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSayurPanggangInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Renjisan Mentah Selepas Keluar Ketuhar",
        "id": "renjisan-akhir",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara yang dipanggang bersama sayur selama 20 hingga 30 minit kehilangan sebahagian rasa buahnya akibat haba yang berpanjangan. Renjisan kecil minyak zaitun dara mentah selepas dulang keluar ketuhar mengembalikan rasa segar itu ke atas sayur yang sudah masak."
          },
          {
            "type": "p",
            "text": "Renjis semasa masih panas supaya baunya naik serta-merta, dan gaul ringan sebelum hidang. Untuk panduan lebih luas, lihat [minyak zaitun untuk masak: panduan dapur](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSayurPanggangInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Garing Bermula daripada Ruang dan Suhu, Bukan Lebih Minyak",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun untuk sayur panggang paling berkesan sebagai lapisan nipis di atas dulang yang tidak sesak, pada suhu 200 hingga 220 darjah. Lebih minyak atau dulang yang terlalu penuh hanya membawa balik masalah yang sama: sayur mengukus, bukan menggaring."
        },
        {
          "type": "p",
          "text": "Kalau sayur panggang masih lembik, semak dulang dahulu sebelum menyalahkan minyak. [Lihat saiz botol minyak zaitun dara](/products) atau [minyak zaitun untuk ikan bakar](/blog/minyak-zaitun-untuk-ikan-bakar)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Berapa banyak minyak zaitun untuk sedulang sayur panggang?",
        "a": "Kira-kira satu hingga dua sudu besar untuk dulang sederhana, cukup untuk setiap keping berkilat nipis selepas digaul. Kalau minyak masih berkumpul di dasar mangkuk selepas gaul, kuantiti itu sudah terlalu banyak."
      },
      {
        "q": "Kenapa sayur panggang saya lembik walaupun ketuhar sudah panas?",
        "a": "Punca biasa ialah dulang terlalu sesak. Sayur yang bertindih memerangkap wap air antara satu sama lain sehingga seluruh dulang mengukus, bukan menggaring, walaupun suhu ketuhar sudah betul."
      },
      {
        "q": "Suhu ketuhar apa yang sesuai untuk sayur panggang?",
        "a": "Kebanyakan sayur paling baik pada 180 hingga 200 darjah Celsius, sepadan dengan julat yang sudah diterbitkan untuk minyak zaitun dara. Sayur nipis dan berair sesuai dengan hujung rendah julat, sayur padat seperti kentang perlu suhu lebih tinggi dan masa lebih lama."
      },
      {
        "q": "Bila patut tabur garam pada sayur panggang?",
        "a": "Untuk sayur nipis yang cepat masak, tabur sebelum masuk ketuhar. Untuk sayur berair seperti terung dan tomato, tabur separuh masa memasak supaya air yang ditarik keluar tidak menggenang sejak awal."
      },
      {
        "q": "Patutkah semua sayur dipanggang pada suhu yang sama?",
        "a": "Tidak. Sayur nipis seperti brokoli dan tomato ceri menggaring cepat pada panas tinggi, manakala sayur padat seperti kentang dan lobak merah perlu suhu lebih rendah dan masa lebih lama supaya bahagian dalam sempat masak."
      },
      {
        "q": "Kenapa perlu renjis minyak zaitun lagi selepas sayur keluar ketuhar?",
        "a": "Haba ketuhar yang berpanjangan menghilangkan sebahagian rasa buah minyak zaitun dara. Renjisan mentah selepas keluar ketuhar mengembalikan rasa segar itu ke atas sayur yang sudah masak, semasa ia masih panas."
      },
      {
        "q": "Boleh ke guna satu dulang besar untuk semua sayur sekali gus?",
        "a": "Boleh kalau sayur muat dalam satu lapisan dengan ruang antara setiap keping. Kalau terpaksa bertindih, lebih baik guna dua dulang berasingan supaya udara panas beredar dengan baik di sekeliling setiap keping."
      },
      {
        "q": "Adakah minyak zaitun dara sesuai untuk suhu ketuhar setinggi ini?",
        "a": "Ya, dalam masa panggang biasa pada 180 hingga 200 darjah — julat yang sudah diterbitkan untuk minyak zaitun dara di laman ini."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Kaedah masakan mana yang sesuai dengan minyak zaitun, dan bila lebih baik guna minyak lain."
      },
      {
        "label": "Minyak zaitun untuk ikan bakar",
        "path": "blog/minyak-zaitun-untuk-ikan-bakar",
        "description": "Cara guna minyak zaitun semasa membakar ikan supaya kulitnya tidak melekat dan garing sekata."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "minyak-zaitun-untuk-steak",
    "slug": "minyak-zaitun-untuk-steak",
    "seoTitle": "Minyak Zaitun untuk Steak: Teknik Dua Minyak",
    "metaTitle": "Minyak Zaitun untuk Steak: Teknik Dua Minyak",
    "metaDescription": "Kaedah dua minyak untuk goreng kilas steak di dapur: minyak neutral untuk kerak garing, extra virgin dituang selepas daging berehat, tamat dengan lada.",
    "focusKeyword": "minyak zaitun untuk steak",
    "relatedKeywords": [
      "teknik dua minyak steak",
      "minyak neutral untuk goreng kilas",
      "cara goreng kilas steak di rumah",
      "rehat daging selepas masak",
      "minyak zaitun untuk masak daging",
      "tuangan minyak zaitun atas steak",
      "takat berasap minyak zaitun",
      "minyak zaitun dara untuk hidangan siap",
      "cara masak steak guna kuali",
      "minyak zaitun Arabian Village untuk daging"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun untuk Steak",
      "Teknik Dua Minyak",
      "Dapur Malaysia",
      "Teknik Memasak",
      "Panduan Masak"
    ],
    "h1": "Minyak Zaitun untuk Steak: Teknik Dua Minyak di Dapur",
    "excerpt": "Goreng Kilas keras perlukan minyak yang tahan haba lebih tinggi daripada extra virgin. Guna teknik dua minyak: neutral untuk kerak, extra virgin untuk rasa akhir selepas daging berehat.",
    "keyTakeaway": "Goreng kilas steak yang garing perlukan haba lebih tinggi daripada apa yang extra virgin selesa tahan, jadi guna teknik dua minyak: minyak neutral untuk membentuk kerak, extra virgin dituang atau disental selepas daging diangkat dan berehat. Extra virgin sampai ke pinggan sebagai rasa akhir, bukan sebagai minyak goreng kilas.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukSteakHero",
      "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-steak.jpg",
    "intro": [
      "Goreng Kilas steak yang garing di luar dan juicy di dalam perlukan kuali yang benar-benar panas — lebih panas daripada suhu yang extra virgin selesa tahan.",
      "Itu bukan sebab membuang minyak zaitun dari dapur, tetapi sebab menggunakan dua minyak, bukan satu.",
      "Kita tunjukkan kaedah bernombor: minyak neutral untuk goreng kilas, extra virgin untuk rasa akhir, dan kenapa daging perlu berehat sebelum dihiris."
    ],
    "sections": [
      {
        "heading": "Kenapa Goreng Kilas Keras Tidak Sesuai dengan Extra Virgin Sahaja",
        "id": "kenapa-goreng-kilas-perlu-minyak-lain",
        "blocks": [
          {
            "type": "p",
            "text": "Goreng kilas yang baik perlukan kuali pada suhu tinggi, cukup panas untuk membentuk kerak coklat dalam saat pertama daging menyentuh besi. Extra virgin selesa dipanaskan sehingga takat asapnya sendiri, tetapi itu masih di bawah suhu yang dikehendaki goreng kilas keras. Ini bukan kelemahan minyak, cuma bukan kerja yang ia dibuat untuk."
          },
          {
            "type": "p",
            "text": "Untuk angka takat berasap penuh, [baca panduan minyak zaitun untuk goreng](/blog/minyak-zaitun-untuk-goreng) — kerja di sini ialah steak, bukan senarai suhu."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSteakInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Teknik Dua Minyak: Neutral untuk Goreng Kilas, Extra Virgin Selepas",
        "id": "teknik-dua-minyak",
        "blocks": [
          {
            "type": "p",
            "text": "Teknik dua minyak memisahkan dua kerja yang berlainan. Minyak neutral yang tahan haba tinggi memegang kuali semasa goreng kilas keras, dan extra virgin masuk kemudian, semata-mata untuk rasa. Ini bukan penukaran satu untuk satu — ia pembahagian tugas: satu minyak untuk haba, satu lagi untuk rasa akhir di pinggan."
          },
          {
            "type": "ul",
            "items": [
              "Minyak neutral untuk goreng kilas: tahan haba tinggi, hampir tiada rasa sendiri — contohnya minyak kanola atau kacang tanah.",
              "Extra virgin selepas goreng kilas: dituang atas daging yang diangkat, atau disental nipis sebelum dihidang.",
              "Jangan tukar tempat — extra virgin dalam kuali terlalu panas jadi hangus dan pahit, bukan wangi."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSteakInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Kaedah Goreng Kilas Steak Langkah demi Langkah",
        "id": "kaedah-bernombor",
        "blocks": [
          {
            "type": "p",
            "text": "Kaedah ini mengikut turutan tetap supaya kerak terbentuk sebelum bahagian dalam terlebih masak. Keluarkan daging awal, keringkan permukaannya, panaskan kuali dahulu, baru masuk minyak neutral, goreng kilas tanpa gerak berlebihan, dan biar extra virgin serta lada jadi langkah paling akhir."
          },
          {
            "type": "ol",
            "items": [
              "Keluarkan steak dari peti sejuk 20 hingga 30 minit sebelum masak supaya tidak terlalu sejuk di tengah.",
              "Keringkan permukaan daging dengan tuala dapur dan taburkan garam sejurus sebelum masuk kuali.",
              "Panaskan kuali kosong sehingga benar-benar panas, baru tuang minyak neutral secukupnya melapisi dasar.",
              "Goreng Kilas setiap belah tanpa menggerakkan daging berulang-ulang, biar kerak terbentuk sebelum dibalik.",
              "Kecilkan api untuk bahagian tebal supaya bahagian dalam sampai ke tahap masak dikehendaki.",
              "Angkat daging dan biar ia berehat sebelum sebarang minyak zaitun menyentuhnya.",
              "Sental atau tuang extra virgin dan lada baru digiling ke atas daging yang dihiris."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSteakInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Kenapa Daging Perlu Berehat Sebelum Dihiris",
        "id": "rehat-daging",
        "blocks": [
          {
            "type": "p",
            "text": "Semasa goreng kilas, jus daging terdesak ke tengah oleh haba tinggi di permukaan. Jika dihiris serta-merta, jus itu tumpah ke atas papan pemotong, bukan kekal dalam daging. Rehat sekitar lima hingga sepuluh minit, bergantung ketebalan, membenarkan jus itu kembali tersebar rata sebelum pisau turun."
          },
          {
            "type": "p",
            "text": "Ini juga masa untuk menyediakan extra virgin dan lada, supaya tuangan akhir terus menyusul sebaik daging selesai berehat."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSteakInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Tuangan Akhir: Extra Virgin dan Lada Segar",
        "id": "tuangan-akhir",
        "blocks": [
          {
            "type": "p",
            "text": "Tuangan akhir ialah satu-satunya masa extra virgin menyentuh steak dalam kaedah ini, dan sebab itu ia paling terasa. Tuang atau sental nipis di atas daging yang telah dihiris, gilingkan lada hitam segar, dan tambah sedikit garam kasar jika kerak belum cukup masin."
          },
          {
            "type": "p",
            "text": "Kerana minyak tidak dipanaskan pada tahap ini, rasa buahnya kekal utuh berbanding jika turut digoreng kilas. [Koleksi Infusi Arabian Village](/products) turut sesuai sebagai tuangan akhir, bukan untuk goreng kilas."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSteakInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Silap Biasa Bila Guna Minyak Zaitun untuk Steak",
        "id": "silap-biasa",
        "blocks": [
          {
            "type": "p",
            "text": "Kebanyakan hasil steak yang tidak memuaskan bukan datang daripada daging, tetapi daripada minyak yang salah pada peringkat yang salah. Guna extra virgin untuk goreng kilas sahaja, atau tuang terlalu banyak minyak sehingga daging tergoreng dan bukan tersear, ialah dua silap paling biasa di dapur rumah."
          },
          {
            "type": "ul",
            "items": [
              "Goreng Kilas dengan extra virgin sahaja pada kuali sangat panas — minyak berasap dan pahit sebelum daging berkerak.",
              "Kuali tidak cukup panas sebelum minyak masuk, jadi daging melekat dan kerak tidak terbentuk rata.",
              "Terus hiris sebaik diangkat, jus terbuang dan tuangan akhir jatuh atas daging yang sudah kering.",
              "Terlalu banyak minyak dalam kuali, steak tergoreng dalam minyak berlebihan dan bukan digoreng kilas."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukSteakInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Dua Minyak, Dua Peringkat, Satu Steak",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun untuk steak bukan bermaksud satu minyak dari awal hingga akhir. Minyak neutral memegang haba semasa goreng kilas, extra virgin membawa rasa selepas daging berehat, dan lada segar menutup hidangan. Kaedah."
        },
        {
          "type": "p",
          "text": "Untuk kaedah goreng lain, [baca panduan goreng penuh](/blog/minyak-zaitun-untuk-goreng), atau [lihat panduan masak umum](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Bolehkah guna extra virgin sahaja untuk goreng kilas steak?",
        "a": "Boleh secara teknikal, tetapi kuali yang cukup panas untuk goreng kilas keras selalunya melebihi keselesaan extra virgin, dan minyak akan berasap serta pahit sebelum daging berkerak. Minyak neutral."
      },
      {
        "q": "Minyak neutral apa sesuai untuk goreng kilas steak?",
        "a": "Mana-mana minyak masak yang tahan haba tinggi dan hampir tiada rasa sendiri, seperti minyak kanola atau kacang tanah, sesuai untuk peringkat goreng kilas supaya rasa daging dan extra."
      },
      {
        "q": "Berapa lama daging patut berehat sebelum dihiris?",
        "a": "Kira-kira lima hingga sepuluh minit bergantung ketebalan steak. Tempoh ini membenarkan jus yang terdesak ke tengah semasa goreng kilas kembali tersebar rata, supaya ia kekal dalam daging, bukan."
      },
      {
        "q": "Extra virgin dituang sebelum atau selepas daging berehat?",
        "a": "Selepas. Tuang atau sental extra virgin dan lada selepas daging berehat dan dihiris, supaya minyak tidak terkena haba berlebihan dan rasa buahnya kekal utuh sebagai tuangan akhir."
      },
      {
        "q": "Kenapa bukan guna minyak zaitun sepanjang proses masak steak?",
        "a": "Kerana peringkat goreng kilas memerlukan haba lebih tinggi daripada keselesaan extra virgin, manakala tuangan akhir memerlukan minyak yang rasanya masih utuh. Dua keperluan berbeza ini dipenuhi oleh dua minyak berasingan."
      },
      {
        "q": "Adakah teknik dua minyak ini sama dengan menggoreng rendam?",
        "a": "Tidak. Goreng Kilas hanya perlukan lapisan minyak nipis untuk melicinkan kuali, bukan daging direndam. Untuk perbezaan penuh antara kaedah goreng, rujuk [panduan minyak zaitun untuk goreng](/blog/minyak-zaitun-untuk-goreng)."
      },
      {
        "q": "Berapa banyak minyak neutral diperlukan untuk goreng kilas satu steak?",
        "a": "Cukup untuk melapisi dasar kuali secara nipis dan rata, bukan lopak. Steak yang tebal mungkin perlukan sedikit lebih banyak berbanding kepingan nipis, tetapi ia tetap lapisan, bukan rendaman."
      },
      {
        "q": "Bolehkah Koleksi Infusi Arabian Village digunakan untuk tuangan akhir steak?",
        "a": "Ya, kerana ia digunakan sejuk atau suam, bukan untuk goreng kilas. Rasa seperti rosemary & selasih atau kunyit & lada hitam sesuai sebagai tuangan akhir di atas steak yang dihiris dan berehat."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun untuk goreng: cetek, tumis, rendam dan wok",
        "path": "blog/minyak-zaitun-untuk-goreng",
        "description": "Empat kaedah goreng, empat suhu, dan takat berasap penuh setiap kaedah masak dengan minyak zaitun dara."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Kaedah masakan mana yang sesuai dengan minyak zaitun dara, dan bila lebih baik guna minyak lain."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi enam rasa."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "minyak-zaitun-untuk-telur",
    "slug": "minyak-zaitun-untuk-telur-goreng",
    "seoTitle": "Minyak Zaitun untuk Telur Goreng Gaya Sepanyol",
    "metaTitle": "Minyak Zaitun untuk Telur Goreng Gaya Sepanyol",
    "metaDescription": "Cara goreng telur dengan minyak zaitun gaya Sepanyol: kuantiti minyak yang betul, haba kuali, siraman minyak panas ke atas kuning, dan waktu garam.",
    "focusKeyword": "minyak zaitun untuk telur",
    "relatedKeywords": [
      "minyak zaitun untuk telur goreng",
      "telur goreng minyak zaitun",
      "cara goreng telur ala Sepanyol",
      "minyak zaitun untuk masak telur",
      "telur mata minyak zaitun",
      "minyak zaitun dara untuk telur",
      "goreng telur minyak zaitun dara",
      "kuantiti minyak zaitun untuk telur",
      "minyak zaitun untuk sarapan",
      "resepi telur goreng Sepanyol"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun untuk Telur",
      "Telur Goreng Gaya Sepanyol",
      "Panduan Dapur",
      "Teknik Memasak",
      "Sarapan"
    ],
    "h1": "Minyak Zaitun untuk Telur: Cara Goreng Gaya Sepanyol",
    "excerpt": "Bukan telur mata biasa. Liputi kuantiti minyak yang betul, haba kuali, cara menyiram minyak panas ke atas kuning, dan waktu garam.",
    "keyTakeaway": "Minyak zaitun untuk telur bermakna guna lebih minyak daripada kebiasaan — lopak cetek, bukan lapisan nipis — pada haba sederhana-tinggi, lalu menyiram minyak panas ke atas kuning dengan sudu sehingga tepi garing dan kuning kekal lembut. Garam masuk selepas telur diangkat, bukan semasa memasak.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukTelurHero",
      "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-telur.jpg",
    "intro": [
      "Di Sepanyol, telur digoreng dalam kuali minyak zaitun yang agak dalam — bukan kuali kering — supaya tepinya renyah bergelembung dan kuningnya kekal lembut.",
      "Bezanya dengan cara biasa di dapur Malaysia bukan pada telur, tetapi pada berapa banyak minyak yang digunakan dan bagaimana ia disiram.",
      "Kita liputi kuantiti minyak, haba kuali, cara menyiram minyak panas ke atas kuning, waktu garam, dan beza minyak dara dengan minyak lembut."
    ],
    "sections": [
      {
        "heading": "Kenapa telur goreng gaya Sepanyol berbeza",
        "id": "kenapa-gaya-sepanyol",
        "blocks": [
          {
            "type": "p",
            "text": "Telur goreng ala Sepanyol digoreng dalam minyak zaitun yang cukup dalam untuk membuai keseluruhan telur, bukan sekadar melapik dasar kuali. Tepi putihnya jadi renyah dan bergelembung seperti renda, manakala bahagian tengah kuningnya kekal cair dan lembut. Ia bukan telur mata biasa yang digoreng kering atas kuali hampir tanpa minyak."
          },
          {
            "type": "p",
            "text": "Kaedah ini popular di dapur Sepanyol dan Itali kerana minyak zaitun tahan pada haba sederhana-tinggi tanpa berasap, dan rasanya sendiri menjadi sebahagian daripada hidangan. Untuk asas memasak dengan minyak zaitun di dapur Malaysia, lihat [panduan minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukTelurInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Berapa banyak minyak: lebih daripada sangkaan",
        "id": "kuantiti-minyak",
        "blocks": [
          {
            "type": "p",
            "text": "Ramai guna terlalu sedikit minyak lalu tertanya kenapa telur melekat dan tidak renyah. Untuk satu telur dalam kuali kecil, tuang minyak sehingga membentuk lopak setinggi kira-kira satu sentimeter — cukup untuk membasahi separuh badan telur apabila ia dimasukkan, bukan sekadar melicinkan dasar kuali."
          },
          {
            "type": "ul",
            "items": [
              "Kuali kecil (18–20 cm) untuk satu atau dua telur: kira-kira 100 ml minyak.",
              "Kuali sederhana untuk tiga hingga empat telur: kira-kira 150–200 ml.",
              "Minyak yang berlebih boleh ditapis dan disimpan untuk goreng seterusnya."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukTelurInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Kaedah goreng telur, langkah demi langkah",
        "id": "kaedah-bernombor",
        "blocks": [
          {
            "type": "p",
            "text": "Kaedah ini pantas sebaik minyak cukup panas, dan urutannya tetap sama setiap kali. Pecahkan telur terus ke dalam minyak panas, biar putihnya mengembang dan bergelembung di tepi, kemudian condongkan kuali dan guna sudu untuk menyiram minyak panas berulang kali ke atas kuning sehingga ia berselaput nipis tetapi masih cair di dalam."
          },
          {
            "type": "ol",
            "items": [
              "Panaskan minyak pada api sederhana-tinggi sehingga bergelembung halus apabila hujung penyudip dicelup — jangan tunggu ia berasap, itu tanda kuali sudah terlalu panas untuk mana-mana minyak.",
              "Pecahkan telur terus ke dalam minyak; biar tepinya mengembang dan bergelembung.",
              "Condongkan kuali, cedok minyak panas dengan sudu, siram berulang ke atas kuning.",
              "Angkat apabila tepi putih garing keperangan tetapi kuning masih goyang di tengah.",
              "Toskan sebentar di atas kertas penyerap sebelum hidang."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukTelurInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Bila masa untuk garam",
        "id": "waktu-garam",
        "blocks": [
          {
            "type": "p",
            "text": "Garam masuk selepas telur keluar dari kuali, bukan ke dalam minyak atau atas telur mentah. Garam yang ditabur ke atas minyak panas hanya melekat pada gelembung minyak, bukan pada telur, dan garam di atas telur mentah menarik air keluar sebelum sempat digoreng, menjadikan putih telur lembik."
          },
          {
            "type": "p",
            "text": "Tabur garam halus sejurus telur diangkat, ketika permukaannya masih panas dan sedikit berminyak supaya garam melekat rata. Sedikit lada hitam pada masa yang sama turut sesuai."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukTelurInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Minyak zaitun dara berbanding minyak zaitun lembut",
        "id": "dara-vs-lembut",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara perahan sejuk membawa rasa buah dan sedikit pedas di kerongkong yang menyerap ke dalam putih telur semasa digoreng, jadi telur itu sendiri terasa rasa minyaknya. Minyak zaitun lembut atau ditapis pula hampir neutral — ia memberi tekstur renyah yang sama tetapi tidak menambah rasa, lebih dekat dengan minyak masak biasa."
          },
          {
            "type": "table",
            "head": [
              "Ciri",
              "Minyak zaitun dara",
              "Minyak zaitun lembut"
            ],
            "rows": [
              [
                "Rasa pada telur",
                "Buah, sedikit pedas di kerongkong",
                "Hampir neutral"
              ],
              [
                "Sesuai untuk",
                "Telur dimakan sendiri atau dengan roti",
                "Telur sebagai sebahagian hidangan lain"
              ],
              [
                "Kos setiap kali guna",
                "Lebih tinggi",
                "Lebih rendah"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukTelurInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Apa untuk hidang bersama",
        "id": "sajian-selepas",
        "blocks": [
          {
            "type": "p",
            "text": "Telur ini paling sedap dimakan panas-panas terus dari kuali, dicicah dengan roti untuk menyerap kuning yang cair, atau diletak atas nasi putih dengan sedikit kicap. Ia juga sesuai atas sayur panggang atau salad sebagai tambahan protein pada waktu makan tengah hari."
          },
          {
            "type": "p",
            "text": "Minyak yang tinggal dalam kuali boleh ditapis dan digunakan sekali dua lagi untuk goreng cetek sebelum dibuang. Untuk cadangan cicahan roti yang lain, lihat [minyak zaitun untuk roti dan cicahan](/blog/minyak-zaitun-untuk-roti-dan-cicahan)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukTelurInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Bukan resepi rumit, cuma nisbah minyak yang betul",
      "blocks": [
        {
          "type": "p",
          "text": "Telur goreng gaya Sepanyol bukan sukar — ia cuma perlukan lebih minyak dan lebih keyakinan daripada kebiasaan. Lopak cetek minyak zaitun, haba yang cukup, dan sudu menyiram minyak panas ke atas kuning sudah cukup untuk tepi garing dan kuning lembut setiap kali."
        },
        {
          "type": "p",
          "text": "Mula dengan sebotol kecil dan satu kuali. [Lihat saiz botol](/products) atau [tempat membeli](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Kenapa telur saya melekat pada kuali walaupun guna minyak zaitun?",
        "a": "Minyak yang digunakan biasanya terlalu sedikit atau kuali tidak cukup panas sebelum telur dimasukkan. Guna lopak minyak setinggi kira-kira satu sentimeter dan pastikan minyak sudah panas, bukan baru suam, sebelum telur dipecahkan ke dalamnya."
      },
      {
        "q": "Perlu ke guna minyak zaitun dara untuk cara ini?",
        "a": "Tidak semestinya. Minyak dara memberi rasa buah yang menyerap ke dalam telur, manakala minyak zaitun lembut lebih neutral tetapi tetap memberi tepi renyah yang sama. Pilih ikut rasa yang dikehendaki, bukan kerana satu lebih betul."
      },
      {
        "q": "Berapa lama masa memasak telur dengan kaedah ini?",
        "a": "Biasanya satu hingga dua minit sahaja sebaik minyak panas, kerana minyak yang menyelubungi telur memasak putihnya dengan cepat dari semua arah. Angkat sebaik tepi garing dan kuning masih goyang supaya tidak terlebih masak."
      },
      {
        "q": "Kenapa perlu siram minyak panas ke atas kuning?",
        "a": "Siraman itu memasak lapisan atas kuning dengan lembut tanpa membaliknya, jadi kuning kekal cair di dalam tetapi tidak lagi mentah di permukaan. Ia juga membantu tepi putih terus bergelembung dan renyah sepanjang masa memasak."
      },
      {
        "q": "Bolehkah minyak yang sama digunakan semula untuk goreng telur lain?",
        "a": "Boleh, dua atau tiga kali untuk goreng cetek, dengan syarat minyak ditapis selepas setiap penggunaan untuk buang serpihan telur. Selepas itu warnanya gelap dan baunya berubah, tanda ia perlu dibuang."
      },
      {
        "q": "Adakah cara ini sesuai untuk sarapan harian?",
        "a": "Sesuai, terutama bila mahu sesuatu berlainan daripada telur mata biasa. Kaedahnya pantas — hanya beberapa minit sebaik minyak panas — dan hanya memerlukan kuali kecil serta satu telur untuk seorang."
      },
      {
        "q": "Minyak zaitun apa yang sesuai untuk telur goreng gaya Sepanyol?",
        "a": "Mana-mana minyak zaitun dara perahan sejuk sesuai, terutama yang rasanya sederhana kuat supaya terasa dalam telur. Minyak infusi seperti timi liar turut sesuai untuk variasi rasa pada hidangan yang sama."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Kaedah masakan mana yang sesuai dengan minyak zaitun, dan bila lebih baik guna minyak lain."
      },
      {
        "label": "Minyak zaitun untuk roti dan cicahan",
        "path": "blog/minyak-zaitun-untuk-roti-dan-cicahan",
        "description": "Cara menyediakan saucer minyak zaitun untuk dicicah dengan roti yang sudah siap."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "minyak-zaitun-vs-mentega",
    "slug": "minyak-zaitun-vs-mentega",
    "seoTitle": "Minyak Zaitun vs Mentega: Sapuan dan Masakan",
    "metaTitle": "Minyak Zaitun vs Mentega: Sapuan dan Masakan",
    "metaDescription": "Banding minyak zaitun dara dan mentega sebagai lemak sapuan dan masakan: rasa, roti panas, kuali panas, hidangan sesuai dan kos setiap kali guna.",
    "focusKeyword": "minyak zaitun vs mentega",
    "relatedKeywords": [
      "minyak zaitun vs mentega",
      "mentega vs minyak zaitun",
      "beza minyak zaitun dan mentega",
      "minyak zaitun untuk roti",
      "mentega perang dalam kuali",
      "guna minyak zaitun atau mentega",
      "minyak zaitun dara untuk masakan",
      "kos minyak zaitun seliter",
      "minyak zaitun sapuan roti",
      "lemak masakan Malaysia"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun vs Mentega",
      "Perbandingan Lemak",
      "Dapur Malaysia",
      "Teknik Memasak",
      "Kos Dapur"
    ],
    "h1": "Minyak Zaitun vs Mentega: Sapuan dan Masakan",
    "excerpt": "Mentega cair dan boleh hangus, minyak zaitun kekal cecair dan tak berkelakuan sama. Banding rasa, roti panas, kuali panas, hidangan mana sesuai dengan mana, dan kos setiap kali guna.",
    "keyTakeaway": "Minyak zaitun vs mentega bukan soal mana lebih hebat, tetapi kerja mana untuk lemak mana. Mentega bawa rasa krim tenusu dan boleh perang atau hangus dalam kuali panas; minyak zaitun dara kekal cecair dan bawa rasa buah yang menonjol di atas hidangan. Guna jadual dalam artikel ini untuk pilih ikut kerja dapur, bukan ikut sangkaan.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunVsMentegaHero",
      "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
    },
    "ogImage": "/og/blog-minyak-zaitun-vs-mentega.jpg",
    "intro": [
      "Mentega dan minyak zaitun dara sama-sama duduk di dapur, tetapi jarang buat kerja yang sama dengan cara yang sama.",
      "Mentega ialah lemak tenusu yang keras sejuk dan cair pada haba; minyak zaitun ialah **perahan sejuk** buah zaitun yang kekal cecair sepanjang masa.",
      "Kita banding kedua-duanya sebagai lemak sapuan dan masakan sahaja — rasa, kuali panas, hidangan sesuai, dan kos setiap kali guna."
    ],
    "sections": [
      {
        "heading": "Rasa: Dua Watak yang Sangat Berbeza",
        "id": "rasa-dua-lemak",
        "blocks": [
          {
            "type": "p",
            "text": "Mentega bawa rasa krim, sedikit masin dan manis tenusu yang sebati dengan apa sahaja ia sentuh. Minyak zaitun dara pula bawa rasa buah zaitun sendiri, pahit halus di pangkal lidah dan pedas ringan di kerongkong, ciri **perahan sejuk** yang segar. Dua rasa ini tidak saling menggantikan; masing-masing menonjolkan hidangan secara berbeza."
          },
          {
            "type": "p",
            "text": "Sebab itu tukar satu untuk satu jarang berjaya. Sos yang minta mentega mahukan body lemak pejal itu; salad atau cicahan yang minta minyak zaitun mahukan rasa buah yang menonjol, bukan lemak yang hilang."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMentegaInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Roti Panas Berbanding Roti Suhu Bilik",
        "id": "roti-panas-vs-suhu-bilik",
        "blocks": [
          {
            "type": "p",
            "text": "Atas roti panas terus dari pembakar, mentega cair serta-merta dan meresap ke dalam setiap liang, membawa rasa krimnya sekali. Atas roti suhu bilik, mentega kekal separuh pejal dan perlu disapu, jadi lapisannya lebih tebal dan lebih terasa di mulut. Minyak zaitun tidak berkelakuan begitu, ia cecair sama ada roti panas atau sejuk, jadi tekstur sapuannya tidak berubah banyak, cuma meresap lebih laju bila roti masih panas."
          },
          {
            "type": "p",
            "text": "Itu sebab ramai suka mentega atas roti panggang panas dan minyak zaitun atas roti suhu bilik untuk dicicah. [Lihat lebih lanjut tentang minyak zaitun untuk roti dan cicahan](/blog/minyak-zaitun-untuk-roti-dan-cicahan)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMentegaInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Sifat Perang Mentega dalam Kuali",
        "id": "mentega-dalam-kuali",
        "blocks": [
          {
            "type": "p",
            "text": "Mentega mengandungi pepejal susu yang berubah warna dalam kuali, mula-mula berbuih, kemudian perang keemasan, dan jika ditinggalkan sesaat lagi, hangus dan pahit. Itu sebab mentega perlu diperhati sepanjang masa di atas api. Minyak zaitun tidak mengandungi pepejal susu itu, jadi ia tidak bertukar warna atau berbuih dengan cara yang sama; ia hanya semakin panas sehingga mula berasap."
          },
          {
            "type": "p",
            "text": "Sebab itu rasa mentega perang, browned butter, sengaja dimasak sehingga ke tahap itu, sesuatu yang tidak boleh ditiru minyak zaitun. Untuk kerja panas lebih tinggi dan lama, [panduan memasak dengan minyak zaitun](/blog/minyak-zaitun-untuk-masak-panduan-dapur) sesuai dirujuk."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMentegaInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Satu Hidangan untuk Mentega, Satu untuk Minyak",
        "id": "hidangan-untuk-setiap-lemak",
        "blocks": [
          {
            "type": "p",
            "text": "Telur hancur yang lembut dan berkrim jelas milik mentega, pepejal susu itu yang beri tekstur licin dan rasa kaya yang sukar ditiru minyak. Sebaliknya, tumisan bawang putih dan sayur hijau pada api sederhana, atau renjisan akhir atas sup dan salad, jelas milik minyak zaitun dara, rasa buahnya kekal terasa di atas hidangan, bukan hilang ke dalamnya."
          },
          {
            "type": "p",
            "text": "Ini bukan peraturan tetap, sekadar corak berulang: mentega menang bila hidangan mahukan kekayaan tenusu, minyak zaitun menang bila ia mahukan rasa buah segar di atas."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMentegaInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Kos Setiap Kali Guna",
        "id": "kos-setiap-kali-guna",
        "blocks": [
          {
            "type": "p",
            "text": "Mentega biasanya dibeli dalam blok besar dan digunakan secara senduk, jadi kos setiap hidangan kelihatan rendah walaupun harga sebalok tidak murah. Minyak zaitun dara dijual dalam botol kecil dan digunakan secara renjisan, jadi walaupun harga sebotol lebih tinggi, kos setiap kali guna tidak sejauh mana ia kelihatan pada label harga."
          },
          {
            "type": "p",
            "text": "Cara paling adil menilai ialah bahagikan harga botol dengan bilangan sudu yang ia beri, bukan bandingkan harga sebotol dengan harga sebalok terus. [Semak saiz dan harga di halaman produk](/products)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMentegaInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Guna Yang Mana Untuk Apa",
        "id": "guna-mana-untuk-apa",
        "blocks": [
          {
            "type": "p",
            "text": "Jadual di bawah rumuskan corak biasa di dapur Malaysia, bukan peraturan keras, sekadar titik permulaan bila anda tak pasti lemak mana untuk kerja mana. Ura-ura mudahnya: haba tinggi dan rasa tenusu memihak mentega, rasa buah dan sapuan sejuk memihak minyak zaitun."
          },
          {
            "type": "table",
            "head": [
              "Kerja dapur",
              "Guna",
              "Kenapa"
            ],
            "rows": [
              [
                "Roti panas dari pembakar",
                "Mentega",
                "Cair terus, rasa krim sebati"
              ],
              [
                "Roti suhu bilik untuk dicicah",
                "Minyak zaitun dara",
                "Kekal cecair, rasa buah menonjol"
              ],
              [
                "Telur hancur atau dadar lembut",
                "Mentega",
                "Tekstur licin, rasa kaya"
              ],
              [
                "Tumis bawang & sayur api sederhana",
                "Minyak zaitun dara",
                "Rasa buah kekal, tak mudah hangus"
              ],
              [
                "Renjisan akhir atas sup atau salad",
                "Minyak zaitun dara",
                "Rasa segar di atas, bukan dimasak"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMentegaInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Dua Lemak, Dua Kerja",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun vs mentega bukan pertandingan mencari juara sejagat. Mentega bawa kekayaan tenusu yang cair pada haba; minyak zaitun dara bawa rasa buah yang kekal dari botol ke pinggan. Dapur paling praktikal simpan kedua-duanya dan tahu bila hendak mencapai yang mana."
        },
        {
          "type": "p",
          "text": "Untuk kerja bakeri seperti menukar mentega kepada minyak dalam resipi, [panduan penukaran minyak zaitun](/blog/minyak-zaitun-untuk-kek-dan-bakeri) ada nisbah penuh. Untuk mula, [lihat saiz botol Arabian Village](/products) atau [tempat membeli](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Patutkah saya sapu mentega atau minyak zaitun atas roti panas?",
        "a": "Mentega biasanya menang di sini kerana ia cair serta-merta dan rasa krimnya sebati dengan roti panas. Minyak zaitun dara lebih sesuai atas roti suhu bilik untuk dicicah, di mana rasa buahnya kekal menonjol."
      },
      {
        "q": "Kenapa mentega boleh hangus dalam kuali tapi minyak zaitun jarang begitu?",
        "a": "Mentega mengandungi pepejal susu yang berbuih lalu bertukar perang, dan jika dibiarkan lama ia hangus dan pahit. Minyak zaitun tiada pepejal susu itu, jadi ia tidak bertukar warna sama; ia hanya semakin panas."
      },
      {
        "q": "Boleh guna minyak zaitun ganti mentega dalam resipi bakeri?",
        "a": "Boleh, tetapi bakeri ada nisbah penukarannya sendiri kerana mentega membawa struktur pejal yang minyak tiada. Artikel ini fokus pada sapuan dan masakan sahaja, untuk nisbah bakeri, rujuk [panduan penukaran minyak zaitun](/blog/minyak-zaitun-untuk-kek-dan-bakeri)."
      },
      {
        "q": "Yang mana lebih murah setiap kali guna, mentega atau minyak zaitun?",
        "a": "Mentega dibeli dalam blok dan digunakan secara senduk, jadi kos setiap hidangan kelihatan rendah walaupun harga sebalok tidak murah. Minyak zaitun dara digunakan secara renjisan kecil, jadi sebotol bertahan lama walaupun harganya lebih tinggi."
      },
      {
        "q": "Adakah minyak zaitun lebih sihat daripada mentega?",
        "a": "Itu soalan untuk pakar pemakanan atau doktor, bukan untuk penjual minyak. Artikel ini membandingkan kedua-duanya sebagai lemak sapuan dan masakan sahaja, rasa, kuali panas dan kos setiap kali guna. Rujuk profesional kesihatan untuk bab pemakanan."
      },
      {
        "q": "Kenapa mentega jadi keras dalam peti sejuk tapi minyak zaitun tidak semestinya?",
        "a": "Mentega ialah lemak tenusu yang keras pada suhu sejuk dan lembut pada suhu bilik, itu sifat asasnya. Minyak zaitun kekal cecair pada suhu bilik dan tidak perlu peti sejuk; ia hanya jadi keruh jika disimpan sejuk, dan itu normal."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Kaedah masakan mana yang sesuai dengan minyak zaitun, dan bila lebih baik guna lemak lain."
      },
      {
        "label": "Minyak zaitun untuk roti dan cicahan",
        "path": "blog/minyak-zaitun-untuk-roti-dan-cicahan",
        "description": "Cara menyediakan pinggan cicah roti yang betul, dan roti mana sesuai dengan minyak zaitun."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "kopi-minyak-zaitun",
    "slug": "kopi-minyak-zaitun",
    "seoTitle": "Kopi Minyak Zaitun: Trend Tekstur dan Rasa",
    "metaTitle": "Kopi Minyak Zaitun: Trend Tekstur dan Rasa",
    "metaDescription": "Kopi minyak zaitun dari sudut tekstur dan rasa: kuantiti bermula, sebab dikacau kuat, gred minyak sesuai, sejuk lawan panas — bukan dakwaan kesihatan.",
    "focusKeyword": "kopi minyak zaitun",
    "relatedKeywords": [
      "kopi minyak zaitun",
      "minyak zaitun dalam kopi",
      "cara buat kopi minyak zaitun",
      "trend kopi zaitun",
      "sudu minyak zaitun dalam kopi",
      "kopi minyak zaitun sejuk",
      "kopi minyak zaitun panas",
      "blend kopi dan minyak zaitun",
      "rasa kopi bercampur minyak zaitun",
      "minyak zaitun extra virgin untuk kopi"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Kopi Minyak Zaitun",
      "Trend Kopi",
      "Minyak Zaitun Extra Virgin",
      "Dapur Malaysia"
    ],
    "h1": "Kopi Minyak Zaitun: Trend Tekstur dan Rasa",
    "excerpt": "Sesudu kecil minyak zaitun dara dikacau masuk kopi mengubah tekstur dan rasa, bukan khasiatnya. Kuantiti bermula, kenapa ia perlu dikacau kuat, gred minyak sesuai, dan sejuk lawan panas.",
    "keyTakeaway": "Kopi minyak zaitun ialah soal tekstur dan rasa, bukan khasiat: mulakan separuh sudu teh, kacau kuat atau blend kerana minyak dan kopi terpisah, pilih extra virgin lembut bukan yang pedas, dan sesuai untuk sejuk atau panas. Soalan tentang kesihatan sebaiknya dibawa kepada doktor atau pakar pemakanan.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressKopiMinyakZaitunHero",
      "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
    },
    "ogImage": "/og/blog-kopi-minyak-zaitun.jpg",
    "intro": [
      "Kopi minyak zaitun ialah secawan kopi biasa dengan sedikit minyak zaitun dara dikacau masuk, trend yang tular semula di media sosial sebagai perubahan tekstur dan rasa pada minuman harian, bukan sebagai ramuan berkhasiat.",
      "Ia bukan resipi rumit — cuma cara lama menambah lemak pada kopi, dipopularkan semula dengan nama baru dan botol minyak zaitun dara di tangan.",
      "Artikel ini berhenti pada tekstur dan rasa: berapa banyak minyak untuk mula, kenapa ia perlu dikacau kuat, gred minyak yang sesuai, dan kopi sejuk berbanding panas. Soalan kesihatan dijawab ringkas, kemudian dihantar kepada profesional yang betul."
    ],
    "sections": [
      {
        "heading": "Apa Sebenarnya Trend Ini",
        "id": "apa-itu-kopi-minyak-zaitun",
        "blocks": [
          {
            "type": "p",
            "text": "Kopi minyak zaitun bukan minuman baru dengan formula rahsia, cuma kopi hitam biasa yang dikacau dengan sedikit minyak zaitun dara sebelum diminum. Perubahan yang berlaku ada pada tekstur cawan dan rasa akhir di lidah, bukan pada apa yang kopi itu buat kepada badan."
          },
          {
            "type": "p",
            "text": "Trend ini popular kerana mudah dicuba di rumah tanpa alat khas — hanya kopi yang biasa diseduh dan minyak zaitun dara yang sudah ada di dapur."
          },
          {
            "type": "image",
            "src": "pressKopiMinyakZaitunInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Kuantiti Untuk Mula",
        "id": "kuantiti-untuk-mula",
        "blocks": [
          {
            "type": "p",
            "text": "Mulakan dengan kira-kira separuh sudu teh minyak zaitun dara untuk satu cawan kopi biasa, bukan satu sudu penuh. Kuantiti sekecil ini sudah cukup mengubah tekstur dan rasa; terlalu banyak buat kopi terasa berminyak dan berat di mulut, bukan lebih sedap."
          },
          {
            "type": "p",
            "text": "Selepas cuba sekali pada kuantiti itu, boleh tambah sedikit demi sedikit pada cawan seterusnya mengikut citarasa sendiri — bukan mengikut sebarang dos tetap."
          },
          {
            "type": "image",
            "src": "pressKopiMinyakZaitunInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Kenapa Perlu Dikacau Kuat, Bukan Dituang Terus",
        "id": "kenapa-perlu-dikacau-kuat",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak dan kopi tidak bercampur secara semula jadi kerana kopi kebanyakannya air, dan minyak zaitun tidak larut dalam air. Tuang terus tanpa kacau, minyak hanya terapung sebagai lapisan nipis di permukaan dan cawan pertama hirupan akan terasa berminyak sahaja, bukan bercampur."
          },
          {
            "type": "ul",
            "items": [
              "**Kacau laju** dengan sudu selama sepuluh hingga lima belas saat sehingga minyak berpecah menjadi titik halus.",
              "**Guna frother tangan** atau blender kecil untuk campuran lebih sekata dan berbuih.",
              "**Tutup dan goncang** dalam balang berpenutup jika kopi sudah sejuk sedikit, kaedah paling mudah tanpa alat."
            ]
          },
          {
            "type": "image",
            "src": "pressKopiMinyakZaitunInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Rasa Sebenar: Bukan Manis, Bukan Dakwaan Kesihatan",
        "id": "rasa-sebenar-kopi-minyak-zaitun",
        "blocks": [
          {
            "type": "p",
            "text": "Kopi bercampur minyak zaitun terasa lebih penuh di mulut, tekstur sedikit berkrim tanpa tenusu, dan ada nota halus yang melembutkan kepahitan kopi hitam. Ia tidak manis — jangan harap rasa seperti kopi berkrim atau bergula, kerana minyak zaitun tidak membawa gula langsung."
          },
          {
            "type": "p",
            "text": "Jika soalan sebenar ialah sama ada ini baik untuk badan, itu soalan untuk doktor atau pakar pemakanan, bukan untuk artikel dapur. Di sini kita berhenti pada apa yang lidah rasa, bukan apa yang badan buat dengannya."
          },
          {
            "type": "image",
            "src": "pressKopiMinyakZaitunInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Gred Minyak Zaitun Yang Sesuai",
        "id": "gred-minyak-yang-sesuai",
        "blocks": [
          {
            "type": "p",
            "text": "Pilih minyak zaitun dara yang lembut dan buah-buahan, bukan yang pedas atau tajam di kerongkong. Minyak pedas cenderung bergaduh dengan kepahitan kopi dan buat rasa akhir tidak seimbang, sementara minyak lembut membiarkan kopi kekal watak utama."
          },
          {
            "type": "p",
            "text": "Elak juga minyak dari Koleksi Infusi seperti rosemary & selasih atau kunyit & lada hitam untuk kopi — perisa herba itu direka untuk masakan berat, bukan untuk secawan kopi pagi."
          },
          {
            "type": "image",
            "src": "pressKopiMinyakZaitunInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Sejuk Berbanding Panas",
        "id": "sejuk-vs-panas",
        "blocks": [
          {
            "type": "p",
            "text": "Kopi panas melarutkan minyak lebih cepat semasa dikacau kerana haba membantu pecahkan titik minyak, tetapi lapisan minyak juga naik semula ke permukaan lebih pantas apabila kacauan berhenti. Kopi sejuk atau ais perlukan kacauan lebih kuat pada mulanya, tetapi campuran kekal stabil lebih lama dalam gelas."
          },
          {
            "type": "p",
            "text": "Kedua-dua cara sah dicuba; pilih ikut minuman biasa anda, bukan kerana satu cara dianggap lebih betul daripada yang lain."
          },
          {
            "type": "image",
            "src": "pressKopiMinyakZaitunInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Kaedah Ringkas: Langkah Demi Langkah",
        "id": "kaedah-ringkas-langkah-demi-langkah",
        "blocks": [
          {
            "type": "p",
            "text": "Berikut kaedah ringkas untuk satu cawan, sama ada kopi seduh biasa, kopi segera, panas atau sejuk, tanpa perlu alat khas selain sudu atau frother tangan yang mungkin sudah ada di dapur. Sesuaikan kuantiti minyak selepas cubaan pertama mengikut citarasa sendiri, bukan ikut sukatan tetap yang sama untuk semua orang."
          },
          {
            "type": "ol",
            "items": [
              "Seduh kopi seperti biasa, panas atau sejuk mengikut pilihan.",
              "Tambah kira-kira separuh sudu teh minyak zaitun dara yang lembut.",
              "Kacau laju dengan sudu selama sepuluh hingga lima belas saat, atau blend sekejap.",
              "Rasa dahulu sebelum tambah gula atau susu supaya nota minyak dapat dikenali.",
              "Minum segera — lapisan minyak naik semula ke permukaan jika dibiarkan lama."
            ]
          },
          {
            "type": "image",
            "src": "pressKopiMinyakZaitunInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Ringkasan Ringkas",
      "blocks": [
        {
          "type": "p",
          "text": "Kopi minyak zaitun ialah eksperimen tekstur dan rasa yang mudah dicuba di dapur sendiri: sedikit minyak, kacauan kuat, dan minyak dara yang lembut. Ia bukan ubat atau suplemen, cuma cara lain menikmati secawan kopi."
        },
        {
          "type": "p",
          "text": "Untuk teknik memasak lain dengan minyak zaitun dara, [lihat panduan dapur penuh](/blog/minyak-zaitun-untuk-masak-panduan-dapur), atau [semak saiz botol Arabian Village](/products) untuk mula mencuba di rumah."
        }
      ]
    },
    "faqs": [
      {
        "q": "Berapa banyak minyak zaitun patut dimasukkan dalam secawan kopi?",
        "a": "Mulakan dengan kira-kira separuh sudu teh untuk satu cawan biasa. Kuantiti sekecil ini sudah mengubah tekstur dan rasa; lebih banyak daripada itu cenderung terasa berminyak dan berat, bukan lebih sedap."
      },
      {
        "q": "Kenapa minyak zaitun tak boleh terus dituang atas kopi?",
        "a": "Minyak dan kopi tidak bercampur secara semula jadi kerana kopi kebanyakannya air. Tuang terus tanpa kacau, minyak hanya terapung sebagai lapisan nipis di permukaan, bukan sebati dengan minuman."
      },
      {
        "q": "Apa rasa sebenar kopi bercampur minyak zaitun?",
        "a": "Tekstur terasa lebih penuh dan sedikit berkrim tanpa tenusu, dengan nota halus yang melembutkan kepahitan. Ia tidak manis — minyak zaitun tidak membawa gula, jadi jangan harap rasa seperti kopi berkrim."
      },
      {
        "q": "Gred minyak zaitun mana paling sesuai untuk kopi?",
        "a": "Pilih minyak zaitun dara yang lembut dan buah-buahan, bukan yang pedas atau tajam di kerongkong. Minyak pedas cenderung bergaduh dengan kepahitan kopi dan buat rasa akhir tidak seimbang."
      },
      {
        "q": "Bolehkah kopi minyak zaitun dibuat sejuk atau ais?",
        "a": "Boleh. Kacau lebih kuat pada mulanya kerana kopi sejuk tidak membantu pecahkan minyak seperti haba, tetapi campuran cenderung kekal stabil lebih lama dalam gelas berbanding kopi panas."
      },
      {
        "q": "Adakah kopi minyak zaitun baik untuk kesihatan?",
        "a": "Itu soalan untuk doktor atau pakar pemakanan, bukan untuk artikel dapur ini. Di sini kita bincang tekstur dan rasa sahaja — kuantiti, kaedah kacau, dan gred minyak yang sesuai."
      },
      {
        "q": "Bolehkah guna minyak dari Koleksi Infusi untuk kopi?",
        "a": "Lebih baik elak. Perisa seperti rosemary & selasih atau kunyit & lada hitam direka untuk masakan berat dan cenderung bergaduh dengan kopi. Minyak zaitun dara klasik yang lembut lebih sesuai untuk secawan kopi."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Kaedah masakan mana yang sesuai dengan minyak zaitun dara, dan bila lebih baik guna lemak lain."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "minyak-zaitun-ais-krim",
    "slug": "minyak-zaitun-ais-krim",
    "seoTitle": "Ais Krim Minyak Zaitun: Teknik Pencuci Mulut",
    "metaTitle": "Ais Krim Minyak Zaitun: Teknik Pencuci Mulut",
    "metaDescription": "Ais krim minyak zaitun dara: teknik Mediterranean, bukan pertukaran kesihatan — emulsi semasa churn, rasa buah pedas, garam flaky, dan cara tanpa mesin.",
    "focusKeyword": "ais krim minyak zaitun",
    "relatedKeywords": [
      "ais krim minyak zaitun",
      "resepi ais krim minyak zaitun",
      "minyak zaitun dalam ais krim",
      "ais krim minyak zaitun dara",
      "cara buat ais krim minyak zaitun",
      "ais krim tanpa mesin minyak zaitun",
      "pencuci mulut minyak zaitun",
      "minyak zaitun untuk pencuci mulut",
      "ais krim gaya Mediterranean",
      "garam flaky ais krim minyak zaitun"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Ais Krim Minyak Zaitun",
      "Pencuci Mulut",
      "Extra Virgin",
      "Dapur Malaysia",
      "Teknik Memasak"
    ],
    "h1": "Ais Krim Minyak Zaitun: Teknik Pencuci Mulut Mediterranean",
    "excerpt": "Minyak zaitun dara diemulsikan ke dalam ais krim semasa dikacau untuk tekstur lebih licin dan rasa buah yang menonjol — teknik pencuci mulut Mediterranean, bukan pertukaran kesihatan.",
    "keyTakeaway": "Ais krim minyak zaitun ialah teknik Mediterranean: minyak zaitun dara diemulsikan ke dalam krim semasa dikacau untuk tekstur licin dan rasa buah pedas yang melawan manis, bukan versi 'lebih sihat'. Guna minyak dara sederhana, tambah hampir akhir churn, dan tutup dengan garam flaky atau kulit sitrus.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunAisKrimHero",
      "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
    },
    "ogImage": "/og/blog-minyak-zaitun-ais-krim.jpg",
    "intro": [
      "Ais krim minyak zaitun bukan versi \"lebih sihat\" bagi pencuci mulut sejuk beku ini — ia teknik gaya Mediterranean yang sudah lama wujud di dapur Itali dan Sepanyol, di mana minyak zaitun dara diemulsikan ke dalam adunan krim semasa dikacau.",
      "Artikel ini fokus pada teknik sahaja: bagaimana minyak bercampur rata dengan krim, kenapa rasa buah dan pedas extra virgin lebih ketara berbanding pencuci mulut minyak neutral, sentuhan akhir yang biasa digunakan, dan cara ringkas jika anda tiada mesin ais krim."
    ],
    "sections": [
      {
        "heading": "Apa Itu Ais Krim Minyak Zaitun",
        "id": "apa-itu-ais-krim-minyak-zaitun",
        "blocks": [
          {
            "type": "p",
            "text": "Ais krim minyak zaitun ialah pencuci mulut sejuk beku di mana minyak zaitun dara menggantikan sebahagian krim atau menyertainya, diemulsikan rata semasa adunan dikacau atau di-churn. Ia bukan trend baru — teknik ini biasa di gelato Itali dan pencuci mulut Sepanyol, di mana minyak dara ialah lemak, bukan hiasan atas hidangan."
          },
          {
            "type": "p",
            "text": "Sebab utama guna minyak zaitun di sini ialah tekstur dan rasa, bukan kesihatan: minyak beri kelicinan berbeza daripada krim tenusu semata-mata, dan bawa nota buah serta pedas halus yang melawan manis gula."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunAisKrimInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Teknik: Minyak Menggantikan atau Menyertai Krim",
        "id": "teknik-emulsi-minyak-dan-krim",
        "blocks": [
          {
            "type": "p",
            "text": "Untuk 500 ml campuran krim dan susu, mula dengan 2 hingga 3 sudu besar minyak zaitun dara — cukup untuk rasa dan tekstur tanpa menenggelamkan manis. Minyak dituang perlahan semasa mesin masih berputar, bukan sekali gus, supaya ia berpisah menjadi titisan halus, bukan lapisan berminyak di atas."
          },
          {
            "type": "p",
            "text": "Masa terbaik menambah minyak ialah lewat dalam proses churn, ketika adunan sudah mula memekat tetapi belum keras sepenuhnya. Tambah terlalu awal dan minyak boleh memisah semula semasa beku; tambah terlalu lewat dan ia tidak sempat sebati rata."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunAisKrimInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Kenapa Rasa Buah dan Pedas Extra Virgin Lebih Menonjol",
        "id": "rasa-buah-dan-pedas-lebih-menonjol",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara membawa rasa buahnya sendiri — sedikit pedas di kerongkong, sedikit pahit di pangkal lidah — ciri **perahan sejuk** yang minyak neutral seperti minyak sayur tidak ada. Dalam ais krim, rasa itu melawan manis gula dan buat setiap suapan terasa lebih kompleks."
          },
          {
            "type": "p",
            "text": "Pilih minyak zaitun dara sederhana, bukan yang paling pedas dalam rangkaian, supaya pedasnya tambah lapisan rasa dan bukan tenggelamkan manis serta vanila."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunAisKrimInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Sentuhan Akhir: Garam Flaky, Kulit Oren atau Lemon",
        "id": "sentuhan-akhir-garam-dan-sitrus",
        "blocks": [
          {
            "type": "p",
            "text": "Sedikit garam flaky ditabur atas semangkuk ais krim minyak zaitun tajamkan lagi kontras antara pedas minyak dan manis gula, cara yang sama garam bekerja atas coklat gelap. Kulit oren atau lemon parut tambah nota segar tanpa ubah tekstur asasnya."
          },
          {
            "type": "ul",
            "items": [
              "**Garam flaky** — satu cubitan kecil atas setiap mangkuk, sejurus sebelum dihidang.",
              "**Kulit oren atau lemon parut** — hiasan segar, guna buah segar, bukan perisa botol.",
              "**Renjisan minyak zaitun tambahan** — beberapa titis atas permukaan untuk rasa yang lebih ketara."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunAisKrimInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Cara Ringkas Tanpa Mesin Ais Krim",
        "id": "cara-tanpa-mesin-ais-krim",
        "blocks": [
          {
            "type": "p",
            "text": "Tanpa mesin churn, udara perlu dimasukkan secara manual supaya hasil akhir tidak jadi ketulan ais keras yang sukar disudu. Kaedah paling mudah ialah pukul krim sejuk sehingga kaku dan berbuih, gaul rata dengan susu pekat manis serta minyak zaitun dara, kemudian bekukan dalam bekas kalis udara sambil dikacau sekali-sekala pada jam-jam awal."
          },
          {
            "type": "ol",
            "items": [
              "Pukul 250 ml krim sejuk sehingga kaku dan berbentuk puncak lembut.",
              "Gaul rata dengan satu tin susu pekat manis dan 2 sudu besar minyak zaitun dara, kacau perlahan supaya udara dalam krim tidak hilang.",
              "Tuang ke dalam bekas kalis udara dan bekukan sekurang-kurangnya 6 jam.",
              "Kacau kasar dengan garpu pada jam pertama dan kedua untuk pecahkan hablur ais sebelum ia keras sepenuhnya."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunAisKrimInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Ramuan Asas untuk Cuba di Rumah",
        "id": "ramuan-asas-ais-krim-minyak-zaitun",
        "blocks": [
          {
            "type": "p",
            "text": "Jadual di bawah senaraikan ramuan asas untuk satu kelompok kecil ais krim minyak zaitun, sesuai digunakan dengan mesin churn atau kaedah pukul-dan-bekukan tanpa mesin di atas. Kuantiti boleh digandakan dua atau tiga kali, dan minyak boleh dilaraskan naik atau turun sedikit ikut citarasa masing-masing."
          },
          {
            "type": "table",
            "head": [
              "Ramuan",
              "Kuantiti",
              "Nota"
            ],
            "rows": [
              [
                "Krim sejuk",
                "250–500 ml",
                "Sejukkan bekas dan pemukul dahulu"
              ],
              [
                "Minyak zaitun dara",
                "2–3 sudu besar",
                "Gred sederhana, bukan yang paling pedas"
              ],
              [
                "Susu pekat manis atau gula halus",
                "1 tin / secukup rasa",
                "Sumber manis dan kestabilan tekstur"
              ],
              [
                "Garam flaky",
                "Secubit",
                "Ditabur sejurus sebelum dihidang"
              ],
              [
                "Kulit oren atau lemon",
                "Secukup rasa",
                "Parut halus, guna buah segar"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunAisKrimInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Ringkasnya",
      "blocks": [
        {
          "type": "p",
          "text": "Ais krim minyak zaitun ialah teknik, bukan pertukaran kesihatan — minyak dara diemulsikan lewat churn untuk tekstur licin dan rasa buah pedas yang melawan manis. Pilih gred sederhana, tutup dengan garam flaky atau kulit sitrus."
        },
        {
          "type": "p",
          "text": "Untuk teknik lain minyak zaitun dalam bakeri dan pencuci mulut, [panduan minyak zaitun untuk kek dan bakeri](/blog/minyak-zaitun-untuk-kek-dan-bakeri) ada nisbah dan langkah penuh. Untuk mula, [lihat saiz botol Arabian Village](/products)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Adakah ais krim minyak zaitun lebih sihat daripada ais krim biasa?",
        "a": "Itu soalan untuk pakar pemakanan atau doktor, bukan artikel dapur ini. Artikel ini bercakap tentang teknik dan rasa sahaja — minyak zaitun sebagai lemak dalam ais krim, bukan dakwaan kesihatan tentang produk ini."
      },
      {
        "q": "Berapa banyak minyak zaitun patut digunakan dalam ais krim?",
        "a": "Mulakan dengan 2 hingga 3 sudu besar minyak zaitun dara bagi setiap 500 ml campuran krim. Terlalu banyak buat adunan berminyak dan sukar sebati; terlalu sedikit dan rasa buahnya tidak akan terasa."
      },
      {
        "q": "Bolehkah buat ais krim minyak zaitun tanpa mesin churn?",
        "a": "Boleh. Pukul krim sejuk sehingga kaku, gaul rata dengan susu pekat manis dan minyak zaitun, kemudian bekukan sambil dikacau kasar sekali-sekala pada dua jam pertama untuk pecahkan hablur ais."
      },
      {
        "q": "Kenapa ais krim minyak zaitun terasa lebih pedas berbanding ais krim biasa?",
        "a": "Minyak zaitun dara membawa rasa buah dan pedas halusnya sendiri, ciri perahan sejuk yang minyak neutral tidak ada. Rasa itu melawan manis gula, jadi setiap suapan terasa lebih kompleks berbanding ais krim biasa."
      },
      {
        "q": "Minyak zaitun gred apa sesuai untuk ais krim?",
        "a": "Minyak zaitun dara gred sederhana, bukan yang paling pedas dalam rangkaian. Pedas yang terlalu kuat boleh buat ais krim terasa pahit di hujung, jadi elakkan minyak paling tajam untuk pencuci mulut ini."
      },
      {
        "q": "Bolehkah minyak zaitun infusi digunakan ganti minyak dara biasa?",
        "a": "Boleh dicuba, tetapi rasa infusi seperti rosemary atau lavender akan mendominasi manis dan vanila. Untuk rasa buah dan pedas yang seimbang seperti diterangkan di sini, minyak zaitun dara klasik lebih sesuai bermula."
      },
      {
        "q": "Berapa lama ais krim minyak zaitun boleh disimpan dalam peti sejuk beku?",
        "a": "Seperti ais krim biasa, sebaiknya dihabiskan dalam dua hingga tiga minggu dalam bekas kalis udara sebelum hablur ais mula terbentuk dan tekstur jadi kasar. Kacau semula sedikit sebelum dihidang jika ia jadi terlalu keras."
      }
    ],
    "related": [
      {
        "label": "Minyak Zaitun Palestin Arabian Village",
        "path": "products",
        "description": "Minyak zaitun dara perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, sesuai untuk teknik dapur seperti ini."
      },
      {
        "label": "Minyak zaitun untuk kek dan bakeri",
        "path": "blog/minyak-zaitun-untuk-kek-dan-bakeri",
        "description": "Nisbah penukaran minyak zaitun dalam bakeri, dan teknik lain minyak zaitun dalam pencuci mulut."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "minyak-zaitun-kek-oren",
    "slug": "minyak-zaitun-kek-oren",
    "seoTitle": "Kek Oren Minyak Zaitun: Resepi Lembap Tahan Lama",
    "metaTitle": "Kek Oren Minyak Zaitun: Resepi Lembap Tahan Lama",
    "metaDescription": "Resepi kek oren minyak zaitun: kuantiti minyak dalam adunan, kulit dan jus oren, kenapa ia lembap tanpa peti sejuk, dan glais mudah untuk melengkapkan.",
    "focusKeyword": "kek oren minyak zaitun",
    "relatedKeywords": [
      "resepi kek oren minyak zaitun",
      "kek minyak zaitun",
      "kek oren tanpa mentega",
      "kek oren lembap",
      "minyak zaitun untuk kek",
      "kek oren tanpa peti sejuk",
      "glais oren untuk kek",
      "kulit oren dalam kek",
      "kek oren extra virgin",
      "resepi kek guna minyak"
    ],
    "category": "Resepi",
    "tags": [
      "Kek Oren",
      "Bakeri",
      "Resepi",
      "Minyak Zaitun Dara",
      "Kek Tanpa Mentega"
    ],
    "h1": "Kek Oren Minyak Zaitun: Resepi Lembap Tahan Lama",
    "excerpt": "Satu resepi kek oren yang guna minyak zaitun dara, bukan mentega — kuantiti dalam adunan, kulit dan jus oren, kenapa ia kekal lembap beberapa hari di suhu bilik, dan glais mudah untuk melengkapkan.",
    "keyTakeaway": "Kek oren minyak zaitun guna kira-kira 180 ml minyak zaitun dara untuk satu loyang, kulit dan jus dua biji oren, dan tiada mentega langsung. Minyak kekal cecair selepas kek sejuk, jadi remahnya terus lembap beberapa hari di suhu bilik, siap dengan glais oren atau taburan gula ais ringkas.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunKekOrenHero",
      "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
    },
    "ogImage": "/og/blog-minyak-zaitun-kek-oren.jpg",
    "intro": [
      "Kebanyakan kek oren guna mentega, tetapi versi minyak zaitun dara datang dari dapur Mediterranean dan hasilnya berbeza — remah lebih lembap dan tahan lebih lama tanpa peti sejuk.",
      "Ini bukan panduan penukaran mentega-ke-minyak am; untuk nisbah itu, [panduan minyak zaitun untuk kek dan bakeri](/blog/minyak-zaitun-untuk-kek-dan-bakeri) sudah menerangkannya. Artikel ini fokus pada satu resepi: kuantiti minyak, kulit dan jus oren, kaedah bakar, dan glais akhir."
    ],
    "sections": [
      {
        "heading": "Kenapa Minyak Zaitun untuk Kek Ini",
        "id": "kenapa-minyak-zaitun",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara kekal cecair pada suhu bilik, tidak seperti mentega yang mengeras bila sejuk. Sifat itu yang buat kek oren jenis ini kekal lembut sehari selepas dibakar, bukan keras di tepi macam kek berasaskan mentega yang disimpan tanpa peti sejuk."
          },
          {
            "type": "p",
            "text": "Guna minyak zaitun dara **perahan sejuk** yang sederhana rasanya, bukan yang pedas kuat, supaya ia tidak melawan rasa oren. Botol klasik Arabian Village sesuai untuk ini; jangan guna varian berinfusi kerana tiada satu pun daripada enam infusi itu bercitarasa oren."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKekOrenInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Kuantiti Minyak dan Bahan Dalam Adunan",
        "id": "kuantiti-minyak-adunan",
        "blocks": [
          {
            "type": "p",
            "text": "Untuk satu loyang bulat 20 cm, guna kira-kira 180 ml minyak zaitun dara, 200 g tepung naik sendiri, 200 g gula kastor, tiga biji telur saiz sederhana dan satu sudu kecil serbuk penaik tambahan. Nisbah minyak ini lebih tinggi daripada kek mentega biasa kerana minyak tidak bawa udara semasa dikacau seperti mentega dikrimkan."
          },
          {
            "type": "table",
            "head": [
              "Bahan",
              "Kuantiti"
            ],
            "rows": [
              [
                "Minyak zaitun dara (klasik)",
                "180 ml"
              ],
              [
                "Tepung naik sendiri",
                "200 g"
              ],
              [
                "Gula kastor",
                "200 g"
              ],
              [
                "Telur",
                "3 biji"
              ],
              [
                "Kulit oren, diparut",
                "2 biji oren"
              ],
              [
                "Jus oren",
                "120 ml"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKekOrenInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Kulit dan Jus Oren",
        "id": "kulit-dan-jus-oren",
        "blocks": [
          {
            "type": "p",
            "text": "Parut kulit sebelum oren dipicit, kerana kulit yang sudah lembik lebih sukar diparut halus. Kulit bawa minyak pati oren yang beri bau kuat; jus pula beri kelembapan dan sedikit keasidan yang imbangi manis gula."
          },
          {
            "type": "p",
            "text": "Gaul kulit oren terus ke dalam gula sebelum campur bahan lain — geseran gula lepaskan lebih banyak minyak pati daripada kulit berbanding gaul terus ke adunan cecair."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKekOrenInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Kaedah Bakar Langkah demi Langkah",
        "id": "kaedah-bakar",
        "blocks": [
          {
            "type": "p",
            "text": "Panaskan ketuhar pada 170°C dan lapik loyang dengan kertas minyak. Kacau minyak zaitun, gula dan kulit oren dahulu, kemudian masukkan telur satu-satu, baru jus oren, dan akhir sekali tepung diayak masuk perlahan supaya adunan tidak keras."
          },
          {
            "type": "ol",
            "items": [
              "Gaul kulit oren ke dalam gula, kacau rata.",
              "Tuang minyak zaitun, kacau sehingga sebati dan berkilat.",
              "Masukkan telur satu-satu, kacau selepas setiap satu.",
              "Tuang jus oren, kacau sebentar sahaja.",
              "Ayak tepung dan serbuk penaik masuk, lipat perlahan sehingga rata.",
              "Bakar 35–40 minit sehingga lidi keluar bersih, kemudian sejukkan dalam loyang 10 minit sebelum dikeluarkan."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKekOrenInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Kenapa Kek Ini Kekal Lembap Tanpa Peti Sejuk",
        "id": "kek-lembap-tanpa-peti-sejuk",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara tidak mengeras pada suhu bilik seperti lemak tenusu, jadi remah kek kekal lembut tanpa perlu disimpan sejuk. Kek jenis mentega selalunya keras di tepi lepas semalam di atas kaunter; kek minyak ini tidak berkelakuan begitu."
          },
          {
            "type": "p",
            "text": "Simpan dalam bekas kedap udara di atas kaunter, bukan peti sejuk — sejuk sebenarnya buat remah kek jenis ini rasa lebih kering, bukan lebih segar. Ia biasanya kekal baik tiga hingga empat hari begitu."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKekOrenInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Glais atau Taburan Gula Ais",
        "id": "glais-atau-gula-ais",
        "blocks": [
          {
            "type": "p",
            "text": "Cara paling ringkas ialah tabur gula ais atas kek yang sudah sejuk sepenuhnya, guna penapis halus supaya lapisannya sekata. Untuk sentuhan lebih basah, gaul gula ais dengan sedikit jus oren sehingga jadi glais cair, kemudian tuang atas kek dan biar ia meleleh ke tepi sebelum dipotong."
          },
          {
            "type": "p",
            "text": "Glais oren yang terlalu pekat akan retak bila dipotong; nisbah biasa ialah dua sudu besar jus oren untuk setiap 150 g gula ais, laraskan sehingga kepekatan boleh dituang perlahan dari sudu."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunKekOrenInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Ringkasnya",
      "blocks": [
        {
          "type": "p",
          "text": "Kek oren minyak zaitun bukan sekadar tukar mentega dengan minyak dalam resepi lama — ia guna nisbah dan kaedah sendiri supaya minyak zaitun dara kekal terasa dan remah kek kekal lembap beberapa hari di suhu bilik. Untuk pengganti bahan lain dalam bakeri, [panduan penukaran minyak zaitun](/blog/olive-oil-substitute-what-to-use-instead) ada nisbah tambahan."
        }
      ]
    },
    "faqs": [
      {
        "q": "Berapa banyak minyak zaitun untuk satu kek oren?",
        "a": "Untuk loyang bulat 20 cm, kira-kira 180 ml minyak zaitun dara sudah cukup. Kuantiti ini lebih tinggi daripada kek berasaskan mentega kerana minyak tidak bawa udara semasa dikacau seperti mentega dikrimkan."
      },
      {
        "q": "Bolehkah guna minyak zaitun berinfusi untuk kek oren ini?",
        "a": "Tidak digalakkan — enam infusi yang ada (thyme liar, blackseed, kunyit & lada hitam, rosemary & basil, adas manis, lavender & chamomile) tiada satu pun bercitarasa oren. Guna minyak klasik yang sederhana rasanya."
      },
      {
        "q": "Kenapa kek ini tidak perlu peti sejuk?",
        "a": "Minyak zaitun dara kekal cecair pada suhu bilik, tidak mengeras seperti lemak tenusu, jadi remah kek kekal lembut tanpa penyejukan. Simpan dalam bekas kedap udara di atas kaunter selama tiga hingga empat hari."
      },
      {
        "q": "Apa beza resepi ini dengan nisbah penukaran mentega-ke-minyak am?",
        "a": "Ini satu resepi kek oren yang khusus, bukan panduan penukaran am. Untuk nisbah menukar mentega kepada minyak dalam resepi lain, rujuk [panduan minyak zaitun untuk kek dan bakeri](/blog/minyak-zaitun-untuk-kek-dan-bakeri) yang sudah menerangkannya."
      },
      {
        "q": "Bolehkah kulit oren digantikan dengan perisa oren botol?",
        "a": "Kulit oren segar beri minyak pati sebenar dan bau yang lebih kuat berbanding perisa botol, yang selalunya lebih rata dan kurang kompleks. Kulit segar juga tidak tambah kemanisan atau bahan tambahan lain ke dalam adunan."
      },
      {
        "q": "Kenapa telur dimasukkan satu-satu, bukan sekali gus?",
        "a": "Memasukkan telur satu-satu bagi adunan minyak dan gula masa untuk sebati sebelum telur seterusnya, jadi campuran tidak berlerai atau kelihatan berketul. Ini penting kerana minyak dan telur lebih mudah terpisah berbanding mentega dikrimkan."
      },
      {
        "q": "Berapa lama kek ini kekal baik di suhu bilik?",
        "a": "Biasanya tiga hingga empat hari dalam bekas kedap udara di atas kaunter, tanpa keras di tepi. Ini kelebihan utama minyak zaitun berbanding kek mentega yang cenderung keras selepas semalam."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml untuk resepi bakeri."
      },
      {
        "label": "Minyak zaitun untuk kek dan bakeri",
        "path": "blog/minyak-zaitun-untuk-kek-dan-bakeri",
        "description": "Nisbah penukaran mentega kepada minyak zaitun untuk bakeri secara umum."
      },
      {
        "label": "Olive oil substitute: what to use instead",
        "path": "blog/olive-oil-substitute-what-to-use-instead",
        "description": "Pengganti bahan lain dalam bakeri bila minyak zaitun bukan pilihan pertama."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, serta saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "minyak-zaitun-untuk-pizza",
    "slug": "minyak-zaitun-untuk-pizza",
    "seoTitle": "Minyak Zaitun untuk Pizza: Adunan, Kerak, Tuangan",
    "metaTitle": "Minyak Zaitun untuk Pizza: Adunan, Kerak, Tuangan",
    "metaDescription": "Minyak zaitun dilipat ke adunan, disapu pada kerak sebelum bakar, dititik ringan selepas keluar ketuhar — bukan lopak untuk mencelup roti.",
    "focusKeyword": "minyak zaitun untuk pizza",
    "relatedKeywords": [
      "minyak zaitun dalam adunan pizza",
      "sapu minyak zaitun pada kerak pizza",
      "berapa banyak minyak zaitun untuk pizza",
      "minyak zaitun extra virgin untuk pizza",
      "tuangan minyak zaitun selepas bakar pizza",
      "resepi adunan pizza minyak zaitun",
      "minyak zaitun kerak pizza rangup",
      "pizza tanpa minyak zaitun",
      "minyak zaitun untuk masak pizza rumah",
      "kerak pizza emas minyak zaitun"
    ],
    "category": "Memasak dengan minyak zaitun",
    "tags": [
      "pizza",
      "adunan",
      "kerak",
      "extra virgin"
    ],
    "h1": "Minyak Zaitun untuk Pizza: Adunan, Kerak dan Tuangan Akhir",
    "excerpt": "Minyak zaitun bekerja pada pizza di tiga peringkat berbeza — dilipat ke dalam adunan, disapu pada kerak sebelum bakar, dan dititik ringan selepas keluar ketuhar. Ini bukan tentang lopak untuk mencelup roti.",
    "keyTakeaway": "Minyak zaitun ada tiga tugas berasingan pada pizza: melembutkan dan meregangkan adunan, menyapu kerak untuk warna dan rangup sebelum bakar, dan tuangan akhir selepas ketuhar untuk rasa buah serta pedas yang tidak terdedah kepada haba penuh. Ketiga-tiganya berbeza daripada lopak untuk mencelup roti.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunUntukPizzaHero",
      "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
    },
    "ogImage": "/og/blog-minyak-zaitun-untuk-pizza.jpg",
    "intro": [
      "Minyak zaitun masuk ke dalam pizza rumah pada tiga masa berbeza, dan setiap satu buat kerja yang tidak sama — bukan sekadar satu tuangan longgar sebelum masuk ketuhar.",
      "Artikel ini fokus pada adunan dan kerak: berapa banyak minyak dilipat ke dalam doh, sapuan pada kerak sebelum bakar, tuangan akhir selepas keluar ketuhar, dan beza rasa berbanding pizza tanpa minyak zaitun langsung. Ini bukan lopak minyak untuk mencelup roti — subjek itu sudah dimiliki oleh [minyak zaitun untuk roti dan cicahan](/blog/minyak-zaitun-untuk-roti-dan-cicahan), dipautkan di sini, tidak diulang."
    ],
    "sections": [
      {
        "heading": "Minyak zaitun dalam adunan, bukan sekadar di atas kerak",
        "id": "minyak-dalam-adunan",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dilipat terus ke dalam adunan pizza sebelum diuli, bukan hanya disapu di atas selepas dibentuk. Ia melincirkan gluten semasa diuli, jadi doh lebih senang diregang nipis tanpa koyak, dan kekal lembut walaupun sudah sejuk keesokan hari."
          },
          {
            "type": "p",
            "text": "Kesan ini paling ketara pada kerak nipis gaya rumah — doh tanpa minyak cenderung keras dan rapuh selepas sejuk, manakala doh berminyak kekal lembut untuk dipanaskan semula esoknya."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPizzaInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Berapa banyak minyak untuk dilipat ke dalam adunan",
        "id": "kuantiti-dalam-adunan",
        "blocks": [
          {
            "type": "p",
            "text": "Kadar biasa ialah kira-kira dua sudu besar minyak zaitun untuk setiap 500 gram tepung — cukup untuk mengubah tekstur tanpa menjadikan doh berminyak atau susah dibentuk. Masukkan selepas air dan ragi bercampur, sebelum diuli sepenuhnya."
          },
          {
            "type": "ul",
            "items": [
              "**Terlalu sikit** (kurang satu sudu besar per 500g): doh masih rapuh, tiada beza ketara berbanding tanpa minyak.",
              "**Kadar biasa** (dua sudu besar per 500g): doh licin, mudah diregang, kerak lembut di dalam.",
              "**Terlalu banyak** (lebih empat sudu besar): doh melekit, sukar dibentuk nipis, dan gluten lemah."
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPizzaInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Sapuan minyak pada kerak sebelum masuk ketuhar",
        "id": "sapuan-kerak",
        "blocks": [
          {
            "type": "p",
            "text": "Sapuan minyak zaitun nipis pada pinggir kerak sebelum bakar memberi warna keemasan dan permukaan yang lebih rangup, kerana minyak membantu haba ketuhar mencoklatkan permukaan doh dengan lebih rata berbanding doh kering."
          },
          {
            "type": "p",
            "text": "Sapu dengan berus dapur, fokus pada pinggir kerak yang tidak dilitupi topping, bukan seluruh permukaan tengah — bahagian itu sudah dilindungi sos dan keju daripada haba terus."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPizzaInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Tuangan akhir selepas pizza keluar dari ketuhar",
        "id": "tuangan-akhir",
        "blocks": [
          {
            "type": "p",
            "text": "Ketuhar rumah untuk pizza selalunya jauh melepasi julat takat berasap minyak zaitun extra virgin (190–210°C), jadi tuangan ringan dilakukan selepas pizza keluar, bukan sebelum masuk — ini mengelakkan haba penuh sepenuhnya dan mengekalkan rasa asal minyak."
          },
          {
            "type": "p",
            "text": "Satu hingga dua sudu teh dititik merata atas pizza panas sudah cukup — lebih daripada itu menenggelamkan rasa topping dan keju yang sudah ada."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPizzaInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Rasa pizza dengan minyak zaitun berbanding tanpa",
        "id": "perbezaan-rasa",
        "blocks": [
          {
            "type": "p",
            "text": "Pizza tanpa minyak zaitun langsung terasa lebih kering pada kerak dan lebih rata pada rasa keseluruhan — sos dan keju mendominasi tanpa lawan. Minyak zaitun extra virgin bawa nota berumput atau sedikit pedas yang memotong kemanisan sos tomato."
          },
          {
            "type": "p",
            "text": "Perbezaan paling jelas pada pizza ringkas seperti margherita, di mana sedikit topping bermaksud rasa minyak lebih mudah dikesan berbanding pizza penuh topping berat."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPizzaInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Tiga peringkat, tiga kegunaan: ringkasan pantas",
        "id": "ringkasan-tiga-peringkat",
        "blocks": [
          {
            "type": "p",
            "text": "Setiap peringkat pizza — adunan, kerak sebelum bakar, dan pizza siap — ada tugas minyak zaitun tersendiri, dan mengelirukan ketiga-tiganya biasanya bermakna terlalu banyak minyak di satu tempat dan tiada langsung di tempat lain."
          },
          {
            "type": "table",
            "head": [
              "Peringkat",
              "Kegunaan minyak",
              "Kenapa"
            ],
            "rows": [
              [
                "Adunan (sebelum diuli)",
                "~2 sudu besar / 500g tepung",
                "Melincirkan gluten, doh lebih lembut dan kekal begitu selepas sejuk"
              ],
              [
                "Kerak (sebelum bakar)",
                "Sapuan nipis dengan berus",
                "Warna keemasan dan pinggir lebih rangup"
              ],
              [
                "Pizza siap (selepas ketuhar)",
                "1–2 sudu teh dititik",
                "Rasa buah dan pedas terpelihara, tidak terdedah haba penuh"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunUntukPizzaInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Ringkasnya",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun pada pizza bukan satu tuangan, tetapi tiga langkah berasingan — dalam adunan, pada kerak, dan selepas ketuhar. Guna ketiga-tiganya dengan kadar yang betul, dan kerak akan lebih lembut, lebih rangup di pinggir, serta rasa lebih hidup tanpa menenggelamkan topping."
        }
      ]
    },
    "faqs": [
      {
        "q": "Kenapa perlu lipat minyak zaitun ke dalam adunan pizza?",
        "a": "Minyak melincirkan gluten semasa diuli, jadi doh lebih senang diregang nipis tanpa koyak dan kekal lembut walaupun disimpan sejuk semalaman untuk dipanggang esoknya."
      },
      {
        "q": "Berapa banyak minyak zaitun untuk satu adunan pizza rumah?",
        "a": "Kira-kira dua sudu besar untuk setiap 500 gram tepung, dimasukkan selepas air dan ragi bercampur. Lebih daripada empat sudu besar buat doh melekit dan sukar dibentuk nipis."
      },
      {
        "q": "Patut sapu minyak pada kerak sebelum atau selepas bakar?",
        "a": "Kedua-duanya, untuk tujuan berbeza. Sapuan nipis sebelum bakar bagi warna dan rangup pinggir; tuangan ringan selepas keluar ketuhar bagi rasa buah dan pedas yang tidak terdedah haba penuh."
      },
      {
        "q": "Bolehkah guna minyak zaitun berperisa untuk pizza?",
        "a": "Boleh untuk tuangan akhir — rosmari & basil atau thyme liar sesuai dengan pizza gaya Mediterranean. Untuk adunan dan sapuan kerak, minyak zaitun biasa lebih neutral dan tidak mengatasi rasa doh."
      },
      {
        "q": "Apa beza rasa pizza dengan dan tanpa minyak zaitun?",
        "a": "Tanpa minyak, kerak terasa lebih kering dan rasa keseluruhan lebih rata kerana sos serta keju mendominasi. Dengan minyak zaitun extra virgin, ada nota berumput atau pedas yang memotong kemanisan sos."
      },
      {
        "q": "Adakah ini sama dengan minyak zaitun untuk mencelup roti?",
        "a": "Tidak — itu subjek lopak minyak untuk mencelup, sudah dibincangkan penuh di [minyak zaitun untuk roti dan cicahan](/blog/minyak-zaitun-untuk-roti-dan-cicahan). Artikel ini fokus pada adunan dan kerak pizza sahaja."
      },
      {
        "q": "Minyak zaitun jenis apa paling sesuai untuk pizza?",
        "a": "Extra virgin perahan sejuk sesuai untuk ketiga-tiga peringkat — dalam adunan, sapuan kerak, dan tuangan akhir. Gred yang sama boleh digunakan sepanjang proses tanpa perlu bertukar jenis."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun Arabian Village",
        "path": "products",
        "description": "Minyak zaitun extra virgin perahan sejuk dari Palestin, 250 ml dan 500 ml, serta enam perisa infused."
      },
      {
        "label": "Minyak zaitun untuk roti dan cicahan",
        "path": "blog/minyak-zaitun-untuk-roti-dan-cicahan",
        "description": "Versi lopak minyak zaitun untuk mencelup roti pada suhu bilik, dengan za'atar, dukkah dan balsamik."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Bila guna minyak zaitun untuk tumis, goreng cetek atau tuangan mentah dalam dapur Malaysia."
      },
      {
        "label": "Di mana beli di Malaysia",
        "path": "shop",
        "description": "Lima cawangan Berkat Madinah Store di Selangor, serta kaunter Shopee dan TikTok Shop penjual yang sama."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "minyak-zaitun-vs-minyak-bijan",
    "slug": "minyak-zaitun-vs-minyak-bijan",
    "seoTitle": "Minyak Zaitun vs Minyak Bijan: Bila Guna Yang Mana",
    "metaTitle": "Minyak Zaitun vs Minyak Bijan: Bila Guna Yang Mana",
    "metaDescription": "Banding minyak zaitun dan minyak bijan: rasa berumput lawan panggang, bijan panggang lawan lembut, guna mentah dan tumisan.",
    "focusKeyword": "minyak zaitun vs minyak bijan",
    "relatedKeywords": [
      "minyak zaitun vs minyak bijan",
      "minyak bijan vs minyak zaitun",
      "beza minyak zaitun dan minyak bijan",
      "minyak bijan panggang",
      "minyak bijan lembut",
      "minyak zaitun untuk tumisan",
      "minyak bijan untuk masakan Cina",
      "minyak zaitun dara perahan sejuk",
      "guna minyak bijan atau minyak zaitun",
      "minyak berperisa kuat untuk dapur"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun vs Minyak Bijan",
      "Perbandingan Minyak",
      "Dapur Malaysia",
      "Teknik Memasak",
      "Minyak Berperisa Kuat"
    ],
    "h1": "Minyak Zaitun vs Minyak Bijan: Bila Guna Yang Mana",
    "excerpt": "Dua minyak berperisa kuat, dua watak yang tak sama langsung. Banding rasa berumput lawan panggang, bijan panggang lawan lembut, cara masing-masing digunakan mentah dan dimasak, dan di mana minyak zaitun sesuai dalam dapur yang sudah ada bijan.",
    "keyTakeaway": "Minyak zaitun vs minyak bijan bukan pertandingan mencari satu pemenang, kerana kedua-duanya berperisa terlalu kuat untuk saling menggantikan senyap-senyap. Minyak bijan panggang bawa rasa gorengan yang tebal dan biasanya dituang di hujung masakan; minyak zaitun dara bawa rasa buah dan pedas ringan yang sesuai mentah atau tumisan sederhana. Simpan kedua-duanya sebagai dua alat berasingan, bukan satu ganti satu.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunVsMinyakBijanHero",
      "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
    },
    "ogImage": "/og/blog-minyak-zaitun-vs-minyak-bijan.jpg",
    "intro": [
      "Minyak zaitun dara dan minyak bijan sama-sama tergolong dalam minyak berperisa kuat, bukan minyak neutral yang senyap di latar belakang.",
      "Tapi rasa kuat itu datang dari arah yang berbeza sama sekali: minyak zaitun dari buah zaitun yang **perahan sejuk**, minyak bijan dari biji bijan yang selalunya dipanggang dahulu.",
      "Kita banding kedua-duanya sebagai minyak mentah dan minyak masakan — rasa, dua jenis bijan yang sering keliru, cara masing-masing digunakan di dapur, dan di mana minyak zaitun sesuai dalam dapur yang sudah ada bijan."
    ],
    "sections": [
      {
        "heading": "Rasa: Berumput Lawan Panggang",
        "id": "rasa-berumput-lawan-panggang",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara bawa rasa berumput dan sedikit pedas di kerongkong, ciri buah zaitun yang **perahan sejuk** dan belum dipanaskan. Minyak bijan, terutama jenis panggang, bawa rasa gorengan yang tebal dan wangi yang datang dari biji yang telah dipanggang sebelum diperah. Dua rasa ini sama-sama kuat, tetapi tidak sama sifat."
          },
          {
            "type": "p",
            "text": "Sebab itu satu titisan bijan panggang boleh menguasai seluruh hidangan, manakala minyak zaitun lebih sering dirasa sebagai lapisan tambahan, bukan penguasa tunggal."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBijanInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Bijan Panggang Lawan Bijan Lembut: Dua Produk Berbeza",
        "id": "bijan-panggang-lawan-lembut",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak bijan panggang berwarna perang gelap, wangi kuat dan digunakan dalam kuantiti kecil sebagai penamat rasa. Minyak bijan lembut atau ringan berwarna kuning cerah, rasa lebih neutral dan boleh tahan haba lebih tinggi, lebih dekat sifatnya dengan minyak masakan biasa berbanding sepupunya yang panggang."
          },
          {
            "type": "p",
            "text": "Dua jenis ini bukan satu produk dengan nama berbeza; label perlu disemak sebelum beli, kerana resipi yang minta bijan panggang akan terasa janggal jika ditukar dengan bijan lembut."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBijanInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Guna Mentah: Renjisan dan Cicahan",
        "id": "guna-mentah-renjisan-cicahan",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara mentah sesuai atas salad, hummus, atau direnjis atas sup panas sebaik sahaja diangkat dari api, rasa buahnya kekal terasa tanpa dimasak lagi. Minyak bijan panggang mentah pula lebih kerap muncul dalam sos cicah, salad gaya Asia, atau digaul terus ke dalam mi sejuk, sekadar beberapa titik kerana rasanya begitu pekat."
          },
          {
            "type": "p",
            "text": "Kedua-duanya digunakan mentah kerana haba merosakkan wangian istimewa mereka, tetapi corak hidangan yang dituju jauh berbeza antara masakan Mediterranean dan Asia."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBijanInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Kenapa Bijan Dituang Selepas Masak, Bukan Dari Sejuk",
        "id": "bijan-selepas-masak",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak bijan panggang jarang digunakan untuk memulakan tumisan dari kuali sejuk, kerana wangian panggangnya mudah hilang atau bertukar pahit bila terlalu lama di atas api. Cara biasa ialah tumis dahulu dengan minyak neutral atau minyak zaitun, kemudian renjis minyak bijan di saat-saat akhir sebelum kuali diangkat, supaya wangiannya kekal segar."
          },
          {
            "type": "p",
            "text": "Minyak zaitun dara pula lebih tahan digunakan dari awal pada api sederhana, walaupun ia juga lebih baik ditamatkan sebagai renjisan bila tujuannya ialah rasa, bukan sekadar haba masakan."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBijanInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Di Mana Minyak Zaitun Sesuai Dalam Dapur Yang Sudah Ada Bijan",
        "id": "minyak-zaitun-dalam-dapur-bijan",
        "blocks": [
          {
            "type": "p",
            "text": "Dapur Malaysia yang sudah ada minyak bijan tidak perlu buang salah satu untuk terima yang satu lagi, kerana kedua-duanya bukan bersaing untuk kerja yang sama. Minyak zaitun dara sesuai masuk untuk tumisan sayur bergaya Mediterranean, sos pasta, atau renjisan atas roti dan salad; minyak bijan kekal untuk kerja gaya Asia yang sudah biasa dengannya."
          },
          {
            "type": "p",
            "text": "Anggap ia alat tambahan, bukan pengganti. [Panduan memasak dengan minyak zaitun](/blog/minyak-zaitun-untuk-masak-panduan-dapur) ada lebih lanjut."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBijanInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Guna Yang Mana Untuk Apa",
        "id": "guna-mana-untuk-apa",
        "blocks": [
          {
            "type": "p",
            "text": "Jadual di bawah rumuskan corak biasa bila dua minyak berperisa kuat ini berada dalam dapur yang sama, sekadar titik permulaan bila anda tak pasti minyak mana untuk kerja mana. Laman ini tidak menyebut sebarang angka takat berasap untuk minyak bijan kerana ia tidak pernah diterbitkan di sini; untuk angka minyak zaitun, rujuk [artikel takat berasap](/blog/minyak-zaitun-untuk-goreng)."
          },
          {
            "type": "table",
            "head": [
              "Kerja dapur",
              "Guna",
              "Kenapa"
            ],
            "rows": [
              [
                "Renjisan akhir atas sup atau salad Mediterranean",
                "Minyak zaitun dara",
                "Rasa buah kekal terasa di atas"
              ],
              [
                "Sos cicah atau mi sejuk gaya Asia",
                "Minyak bijan panggang",
                "Wangi panggang pekat, sedikit sudah cukup"
              ],
              [
                "Tumis sayur api sederhana",
                "Minyak zaitun dara",
                "Tahan haba lebih lama tanpa jadi pahit"
              ],
              [
                "Titisan akhir sebelum kuali diangkat",
                "Minyak bijan panggang",
                "Wangian kekal segar, tak hilang ke haba"
              ],
              [
                "Masakan neutral suhu lebih tinggi",
                "Minyak bijan lembut",
                "Rasa lebih senyap, lebih tahan haba"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBijanInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Dua Minyak Kuat, Dua Watak Berbeza",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun vs minyak bijan bukan soal mencari satu pemenang, kerana kedua-duanya terlalu berperisa untuk bertukar ganti tanpa disedari. Minyak zaitun bawa rasa buah gaya Mediterranean; minyak bijan bawa wangi gorengan gaya Asia. Dapur paling praktikal simpan kedua-duanya."
        },
        {
          "type": "p",
          "text": "Untuk kaedah masakan yang sesuai dengan minyak zaitun dan suhu yang perlu dielak, [panduan minyak zaitun untuk goreng](/blog/minyak-zaitun-untuk-goreng) ada butiran penuh. Untuk mula, [lihat saiz botol Arabian Village](/products) atau [tempat membeli](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Bolehkah minyak zaitun ganti minyak bijan dalam resipi?",
        "a": "Boleh dicuba, tetapi rasa akhir akan berbeza kerana wangi panggang bijan tiada pada minyak zaitun. Untuk hidangan gaya Asia yang bergantung pada wangi bijan, lebih baik kekalkan minyak bijan dan guna minyak zaitun untuk kerja lain."
      },
      {
        "q": "Apa beza minyak bijan panggang dan minyak bijan lembut?",
        "a": "Bijan panggang berwarna perang gelap dan wangi kuat, digunakan sedikit sebagai penamat. Bijan lembut berwarna kuning cerah, rasa neutral dan lebih tahan haba. Kedua-dua bukan produk yang sama walaupun sering dijual bersebelahan."
      },
      {
        "q": "Kenapa minyak bijan biasanya dituang selepas masak, bukan dari kuali sejuk?",
        "a": "Wangi panggang bijan mudah hilang atau bertukar pahit bila terlalu lama terdedah kepada haba tinggi. Kaedah biasa ialah tumis dengan minyak lain dahulu, kemudian renjis bijan di akhir sebelum kuali diangkat."
      },
      {
        "q": "Apakah takat berasap minyak bijan?",
        "a": "Laman ini tidak menerbitkan angka khusus untuk minyak bijan. Secara umum ia lebih rendah daripada minyak neutral tulen, jadi ia lebih sesuai sebagai penamat berbanding minyak masakan haba tinggi utama."
      },
      {
        "q": "Perlukah saya buang minyak bijan jika sudah ada minyak zaitun?",
        "a": "Tidak perlu. Kedua-duanya buat kerja berbeza — minyak zaitun untuk gaya Mediterranean, minyak bijan untuk gaya Asia. Dapur yang guna kedua-dua masakan lebih senang simpan kedua-dua botol berasingan."
      },
      {
        "q": "Yang mana lebih sesuai untuk salad?",
        "a": "Bergantung gaya salad. Salad ala Mediterranean dengan sayur segar dan cuka lebih sesuai minyak zaitun dara; salad gaya Asia dengan mi sejuk atau sos soya lebih sesuai beberapa titik minyak bijan panggang."
      },
      {
        "q": "Adakah minyak zaitun atau minyak bijan lebih sihat?",
        "a": "Itu soalan untuk pakar pemakanan atau doktor, bukan untuk penjual minyak. Artikel ini banding kedua-duanya dari segi rasa dan kegunaan dapur sahaja. Rujuk profesional kesihatan untuk bab pemakanan dan diet."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Kaedah masakan mana yang sesuai dengan minyak zaitun, dan bila lebih baik guna minyak lain."
      },
      {
        "label": "Minyak Zaitun untuk Goreng",
        "path": "blog/minyak-zaitun-untuk-goreng",
        "description": "Empat kaedah goreng, empat suhu, dan sejauh mana minyak zaitun dara sesuai dengan setiap satu."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "minyak-zaitun-vs-minyak-bunga-matahari",
    "slug": "minyak-zaitun-vs-minyak-bunga-matahari",
    "seoTitle": "Minyak Zaitun vs Minyak Bunga Matahari: Guna Mana",
    "metaTitle": "Minyak Zaitun vs Minyak Bunga Matahari: Guna Mana",
    "metaDescription": "Banding minyak zaitun dara dan minyak bunga matahari tapis: rasa, takat berasap, kegunaan dapur dan kos setiap kali guna, plus jadual guna-mana-untuk-apa.",
    "focusKeyword": "minyak zaitun vs minyak bunga matahari",
    "relatedKeywords": [
      "minyak zaitun vs minyak bunga matahari",
      "minyak bunga matahari vs minyak zaitun",
      "beza minyak zaitun dan minyak bunga matahari",
      "minyak zaitun untuk goreng",
      "minyak bunga matahari untuk goreng",
      "takat berasap minyak zaitun",
      "takat berasap minyak bunga matahari",
      "minyak zaitun dara untuk masakan",
      "kos minyak zaitun seliter",
      "minyak neutral untuk goreng",
      "minyak zaitun untuk tumis"
    ],
    "category": "Panduan Dapur",
    "tags": [
      "Minyak Zaitun vs Minyak Bunga Matahari",
      "Perbandingan Minyak",
      "Dapur Malaysia",
      "Teknik Memasak",
      "Kos Dapur"
    ],
    "h1": "Minyak Zaitun vs Minyak Bunga Matahari: Yang Mana Patut Anda Guna",
    "excerpt": "Satu neutral dan tahan haba tinggi, satu lagi bawa rasa buah yang menonjol. Banding rasa, sifat takat berasap, kegunaan dapur dan kos setiap kali guna antara minyak zaitun dara dan minyak bunga matahari tapis.",
    "keyTakeaway": "Minyak zaitun vs minyak bunga matahari bukan soal mana lebih hebat, tetapi kerja dapur mana untuk minyak mana. Bunga matahari tapis tahan haba tinggi dan murah seliter untuk goreng rendam; minyak zaitun dara bawa rasa buah yang menonjol untuk renjisan dan tumisan sederhana. Guna jadual dalam artikel ini untuk pilih ikut kerja dapur, bukan sangkaan.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunVsMinyakBungaMatahariHero",
      "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
    },
    "ogImage": "/og/blog-minyak-zaitun-vs-minyak-bunga-matahari.jpg",
    "intro": [
      "Minyak zaitun dara dan minyak bunga matahari tapis duduk bersebelahan di banyak dapur Malaysia, tetapi jarang buat kerja yang sama dengan cara yang sama.",
      "Bunga matahari tapis ialah minyak neutral yang tahan haba tinggi; minyak zaitun ialah **perahan sejuk** buah zaitun yang bawa rasa sendiri ke dalam apa sahaja ia sentuh.",
      "Kita banding kedua-duanya pada rasa, sifat takat berasap secara umum, kegunaan dapur mana sesuai dengan mana, dan kos setiap kali guna."
    ],
    "sections": [
      {
        "heading": "Rasa: Neutral Berbanding Buah",
        "id": "rasa-neutral-lawan-buah",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak bunga matahari tapis nyaris tiada rasa sendiri, itu sebab ia sesuai untuk goreng tanpa mengubah rasa asal makanan. Minyak zaitun dara pula bawa rasa buah zaitun yang jelas, kadang pahit halus dan pedas ringan di kerongkong, ciri **perahan sejuk** yang tak boleh disembunyikan walau digunakan sedikit."
          },
          {
            "type": "p",
            "text": "Sebab itu tukar satu untuk satu jarang berjaya bila resipi memang mahukan salah satu watak rasa itu. Goreng ringan yang perlukan minyak senyap pilih bunga matahari; hidangan yang mahu rasa minyak sendiri menonjol pilih minyak zaitun dara."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBungaMatahariInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Sifat Takat Berasap Secara Umum",
        "id": "sifat-takat-berasap",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak bunga matahari tapis ialah minyak neutral bertakat berasap tinggi, kira-kira 225°C, jadi ia tahan panas kuali yang lama sebelum mula berasap. Minyak zaitun dara pula bertakat berasap sederhana, lebih sesuai untuk goreng ringan dan tumis, bukan goreng rendam pada suhu paling tinggi di dapur."
          },
          {
            "type": "p",
            "text": "Angka tepat takat berasap minyak zaitun dara serta perbandingan penuh dengan minyak lain ada dalam [Minyak Zaitun vs Minyak Sawit dalam Dapur Malaysia](/blog/minyak-zaitun-vs-minyak-sawit), rujuk di situ sebelum pilih minyak untuk kerja goreng suhu tinggi."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBungaMatahariInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Untuk Goreng Suhu Tinggi",
        "id": "goreng-suhu-tinggi",
        "blocks": [
          {
            "type": "p",
            "text": "Goreng rendam atau goreng cetek pada api paling kuat, seperti ayam goreng atau keropok, lebih sesuai dengan minyak bunga matahari tapis kerana takat berasapnya lebih tinggi dan harganya lebih rendah untuk kuantiti besar yang kerja itu telan."
          },
          {
            "type": "p",
            "text": "Guna minyak zaitun dara untuk goreng rendam bermakna rasa buahnya hilang dalam haba tinggi, dan botol yang lebih mahal habis lebih cepat daripada yang berbaloi. Jadi ia bukan pilihan praktikal untuk kerja jenis ini."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBungaMatahariInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Untuk Tuangan Mentah dan Tumis Sederhana",
        "id": "tuangan-mentah-tumis-sederhana",
        "blocks": [
          {
            "type": "p",
            "text": "Renjisan atas salad, sup atau roti, dan tumisan bawang atau sayur pada api sederhana, ialah tempat minyak zaitun dara menang jelas — rasa buahnya kekal terasa di atas hidangan, sesuatu yang minyak bunga matahari neutral tidak boleh berikan."
          },
          {
            "type": "p",
            "text": "Minyak bunga matahari pada kerja yang sama hanya beri lemak tanpa rasa tambahan. Kalau hidangan memang mahukan watak rasa minyak sendiri, minyak zaitun dara ialah pilihan yang betul, bukan sekadar pengganti biasa."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBungaMatahariInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Kos Setiap Kali Guna",
        "id": "kos-setiap-kali-guna",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak bunga matahari tapis dijual dalam botol besar dengan harga seliter jauh lebih rendah, sesuai untuk kuantiti banyak yang goreng rendam telan setiap kali masak. Minyak zaitun dara harganya lebih tinggi seliter, tetapi digunakan secara renjisan kecil, jadi kos setiap kali guna tidak sejauh mana jurang harga label kelihatan."
          },
          {
            "type": "p",
            "text": "Jurang harga wujud kerana cara pengeluaran berbeza sepenuhnya — minyak zaitun dara ialah **perahan sejuk** buah tunggal, minyak bunga matahari tapis melalui proses penulenan yang jauh lebih murah untuk kuantiti besar. [Semak saiz dan harga botol Arabian Village](/products)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBungaMatahariInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      },
      {
        "heading": "Guna Yang Mana Untuk Apa",
        "id": "guna-mana-untuk-apa",
        "blocks": [
          {
            "type": "p",
            "text": "Jadual di bawah rumuskan corak biasa dapur Malaysia, bukan peraturan keras — cuma titik permulaan bila anda tak pasti minyak mana untuk kerja mana pada bila-bila masa memasak. Ura-ura mudahnya: haba tinggi dan kuantiti besar memihak bunga matahari, rasa buah dan renjisan sejuk memihak minyak zaitun."
          },
          {
            "type": "table",
            "head": [
              "Kerja dapur",
              "Guna",
              "Kenapa"
            ],
            "rows": [
              [
                "Goreng rendam suhu tinggi",
                "Minyak bunga matahari tapis",
                "Takat berasap lebih tinggi, kos seliter lebih rendah"
              ],
              [
                "Tumis bawang & sayur api sederhana",
                "Minyak zaitun dara",
                "Rasa buah kekal, sesuai haba sederhana"
              ],
              [
                "Renjisan akhir atas salad atau sup",
                "Minyak zaitun dara",
                "Rasa segar di atas, bukan dimasak"
              ],
              [
                "Goreng ringan tanpa ubah rasa asal",
                "Minyak bunga matahari tapis",
                "Neutral, tak ganggu rasa makanan"
              ],
              [
                "Kuih atau gorengan kuantiti besar",
                "Minyak bunga matahari tapis",
                "Harga seliter lebih murah untuk kuantiti banyak"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunVsMinyakBungaMatahariInline",
            "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Dua Minyak, Dua Kerja Dapur",
      "blocks": [
        {
          "type": "p",
          "text": "Minyak zaitun vs minyak bunga matahari bukan pertandingan mencari juara sejagat, tetapi soal kerja dapur mana untuk minyak mana. Bunga matahari tapis menang pada goreng suhu tinggi dan kos seliter; minyak zaitun dara menang pada rasa buah dan renjisan mentah."
        },
        {
          "type": "p",
          "text": "Dapur paling praktikal simpan kedua-duanya dan tahu bila hendak mencapai yang mana. [Lihat saiz botol Arabian Village](/products) atau baca [panduan memasak dengan minyak zaitun](/blog/minyak-zaitun-untuk-masak-panduan-dapur) untuk kaedah masakan lain yang sesuai dengannya."
        }
      ]
    },
    "faqs": [
      {
        "q": "Minyak zaitun atau minyak bunga matahari, mana lebih murah setiap kali guna?",
        "a": "Minyak bunga matahari tapis lebih murah seliter dan sesuai untuk kuantiti besar seperti goreng rendam. Minyak zaitun dara lebih mahal seliter tetapi digunakan secara renjisan kecil, jadi kos sebenar setiap kali guna tidak sejauh jurang harga di label."
      },
      {
        "q": "Kenapa jurang harga antara dua minyak ini begitu besar?",
        "a": "Minyak zaitun dara ialah **perahan sejuk** buah tunggal dengan hasil terhad setiap pokok. Minyak bunga matahari tapis melalui proses penulenan besar-besaran yang jauh lebih murah bagi setiap liter, itulah punca jurang harga."
      },
      {
        "q": "Bolehkah minyak zaitun dara digunakan untuk goreng rendam suhu tinggi?",
        "a": "Boleh secara teknikal, tetapi tidak praktikal — rasa buahnya hilang dalam haba tinggi dan botol yang mahal habis lebih cepat. Minyak bunga matahari tapis lebih sesuai untuk kerja goreng rendam kerana takat berasapnya lebih tinggi dan harganya lebih rendah."
      },
      {
        "q": "Apakah takat berasap minyak zaitun dan minyak bunga matahari?",
        "a": "Minyak bunga matahari tapis bertakat berasap kira-kira 225°C. Angka tepat untuk minyak zaitun dara serta perbandingan penuh dengan minyak lain ada dalam [Minyak Zaitun vs Minyak Sawit](/blog/minyak-zaitun-vs-minyak-sawit)."
      },
      {
        "q": "Adakah minyak zaitun lebih sihat daripada minyak bunga matahari?",
        "a": "Itu soalan untuk pakar pemakanan atau doktor, bukan untuk penjual minyak. Artikel ini membandingkan kedua-duanya pada rasa, takat berasap, kegunaan dapur dan kos setiap kali guna sahaja. Rujuk profesional kesihatan untuk bab pemakanan."
      },
      {
        "q": "Bolehkah dua minyak ini dicampur dalam satu botol untuk digunakan?",
        "a": "Boleh, sesetengah dapur campur kedua-duanya untuk goreng ringan supaya rasa minyak zaitun sedikit menonjol tanpa kos seliter penuh. Tetapi rasa dan takat berasap campuran itu jadi tidak menentu, jadi guna berasingan mengikut kerja lebih boleh diramal."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Kaedah masakan mana yang sesuai dengan minyak zaitun, dan bila lebih baik guna lemak lain."
      },
      {
        "label": "Minyak Zaitun vs Minyak Sawit dalam Dapur Malaysia",
        "path": "blog/minyak-zaitun-vs-minyak-sawit",
        "description": "Takat berasap, rasa, kos seliter dan kerja dapur mana untuk minyak sawit berbanding minyak zaitun."
      },
      {
        "label": "Minyak zaitun dara Arabian Village",
        "path": "products",
        "description": "Minyak zaitun perahan sejuk asal Palestin dalam saiz 250 ml dan 500 ml, serta Koleksi Infusi."
      },
      {
        "label": "Tempat membeli dan cawangan",
        "path": "shop",
        "description": "Lima cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store."
      }
    ]
  },
  /* ---------------- PRESS round 8 ---------------- */
  {
    "id": "cara-makan-minyak-zaitun-setiap-hari",
    "slug": "cara-makan-minyak-zaitun-setiap-hari",
    "seoTitle": "Cara Makan Minyak Zaitun: 5 Kesilapan Biasa",
    "metaTitle": "Cara Makan Minyak Zaitun: 5 Kesilapan Biasa",
    "metaDescription": "Lima kesilapan biasa bila makan minyak zaitun di dapur Malaysia, dan cara betulkan setiap satu tanpa mengubah menu anda.",
    "focusKeyword": "cara makan minyak zaitun",
    "relatedKeywords": [
      "kesilapan guna minyak zaitun",
      "minyak zaitun untuk sambal",
      "minyak zaitun perisa hilang",
      "minyak zaitun dituang bila",
      "minyak zaitun habbatus sauda cara guna",
      "minyak zaitun za'atar cara guna",
      "berapa lama minyak zaitun elok",
      "minyak zaitun botol terbuka",
      "cara makan minyak zaitun betul",
      "minyak zaitun bau tengik"
    ],
    "category": "Memasak dengan minyak zaitun",
    "tags": [
      "kesilapan",
      "harian",
      "penggunaan",
      "menu Malaysia"
    ],
    "h1": "Cara Makan Minyak Zaitun: Lima Kesilapan yang Membazirkan Rasa",
    "excerpt": "Bukan cara makan minyak zaitun yang salah, tetapi lima kesilapan kecil yang membazirkan rasa sebelum ia sampai ke mulut. Setiap satu boleh dibetulkan tanpa mengubah menu.",
    "keyTakeaway": "Lima kesilapan biasa membazirkan minyak zaitun sebelum rasanya sampai ke mulut: menuang ke dalam kuali panas dan bukan selepas api ditutup, membeli botol besar untuk penggunaan mentah yang kecil, menyimpannya di sebelah dapur, menambah ke dalam sup yang masih mendidih, dan tidak menghidu sebelum guna.",
    "datePublished": "2026-09-10",
    "dateModified": "2026-09-10",
    "readingTime": 5,
    "hero": {
      "src": "pressCaraMakanMinyakZaitunSetiapHariHero",
      "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
    },
    "ogImage": "/og/blog-cara-makan-minyak-zaitun-setiap-hari.jpg",
    "intro": [
      "Kebanyakan orang yang beli minyak zaitun tidak silap pada pilihan botol. Mereka silap pada lima langkah kecil selepas botol itu dibuka, dan setiap satu membazirkan sebahagian daripada rasa yang mereka bayar untuknya.",
      "Ini bukan senarai resipi. Ini lima kesilapan sebenar, dilihat berulang kali di dapur Malaysia, dan cara membetulkannya tanpa mengubah apa yang sudah dimasak."
    ],
    "sections": [
      {
        "heading": "Kesilapan satu: menuang ke dalam kuali yang masih panas",
        "id": "kesilapan-kuali-panas",
        "blocks": [
          {
            "type": "p",
            "text": "Ramai menuang minyak zaitun ke dalam sambal atau tumisan semasa api masih menyala, sama seperti minyak masak biasa. Haba itu menghilangkan aroma dalam saat, sebelum sempat terasa di lidah. Betulkan dengan menutup api dahulu, kemudian gaul minyak masuk selepas kuali sejuk sedikit."
          },
          {
            "type": "p",
            "text": "Cara ini paling sesuai untuk sambal, tumisan dan kari yang sudah siap. Rasa yang terhasil lebih jelas berbanding minyak yang dimasak bersama dari awal."
          },
          {
            "type": "image",
            "src": "pressCaraMakanMinyakZaitunSetiapHariInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Kesilapan dua: beli botol besar untuk kegunaan mentah",
        "id": "kesilapan-botol-besar",
        "blocks": [
          {
            "type": "p",
            "text": "Botol 500 ml kelihatan lebih berbaloi seliter, tetapi kalau ia hanya digunakan mentah dalam sudu kecil, ia mengambil masa berbulan-bulan untuk habis. Rasanya sudah datar sebelum separuh botol digunakan. Betulkan dengan memadankan saiz botol dengan corak penggunaan, bukan dengan harga seliter."
          },
          {
            "type": "p",
            "text": "Kalau minyak itu digunakan mentah sahaja, botol 250 ml selalunya sampai ke meja dalam keadaan lebih segar berbanding botol besar yang sama."
          },
          {
            "type": "image",
            "src": "pressCaraMakanMinyakZaitunSetiapHariInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Kesilapan tiga: simpan botol di sebelah dapur",
        "id": "kesilapan-simpan-dapur",
        "blocks": [
          {
            "type": "p",
            "text": "Kaunter sebelah dapur kelihatan praktikal tetapi paling panas dalam seluruh dapur. Udara panas dan cahaya di situ mengambil rasa antara satu waktu masak dengan yang seterusnya, bukan semasa memasak. Betulkan dengan memindahkan botol ke dalam almari tertutup beberapa langkah dari dapur."
          },
          {
            "type": "table",
            "head": [
              "Kesilapan",
              "Kenapa ia berlaku",
              "Cara betulkan"
            ],
            "rows": [
              [
                "Tuang ke kuali panas",
                "Aroma hilang dalam saat",
                "Gaul selepas api ditutup"
              ],
              [
                "Botol besar, guna sikit",
                "Rasa datar sebelum habis",
                "Padankan saiz dengan corak guna"
              ],
              [
                "Simpan sebelah dapur",
                "Panas dan cahaya sepanjang hari",
                "Simpan dalam almari tertutup"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressCaraMakanMinyakZaitunSetiapHariInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Kesilapan empat: masuk sup yang masih mendidih",
        "id": "kesilapan-sup-mendidih",
        "blocks": [
          {
            "type": "p",
            "text": "Menuang minyak zaitun ke dalam periuk sup yang masih menggelegak berkelakuan sama seperti kuali panas: haba mengambil aromanya sebelum sampai ke mangkuk. Betulkan dengan menitiskannya ke atas mangkuk yang sudah dihidang, bukan ke dalam periuk."
          },
          {
            "type": "p",
            "text": "Titisan atas mangkuk juga membolehkan setiap orang menentukan sendiri berapa banyak, berbanding satu jumlah yang dimasak untuk seluruh periuk."
          },
          {
            "type": "image",
            "src": "pressCaraMakanMinyakZaitunSetiapHariInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      },
      {
        "heading": "Kesilapan lima: tidak menghidu sebelum guna",
        "id": "kesilapan-tidak-hidu",
        "blocks": [
          {
            "type": "p",
            "text": "Sesetengah orang guna botol yang sama berbulan-bulan tanpa memeriksa sama ada rasanya masih ada. Minyak yang sudah datar tidak berbahaya, tetapi ia tidak menambah apa-apa kepada hidangan, jadi setiap sudu yang digunakan hanyalah lemak tanpa tujuan."
          },
          {
            "type": "p",
            "text": "Hidu sebelum guna. Bau hijau atau berbuah bermakna ia masih hidup. Bau datar atau seperti krayon bermakna sudah tiba masa untuk botol baharu, walaupun tarikh luput masih jauh."
          },
          {
            "type": "image",
            "src": "pressCaraMakanMinyakZaitunSetiapHariInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          },
          {
            "type": "p",
            "text": "Ujian ini mengambil masa kurang dua saat dan lebih dipercayai daripada tarikh pada label, kerana tarikh luput memberitahu bila penjual mahu botol itu habis, bukan keadaan sebenar minyak di dalamnya hari ini."
          }
        ]
      },
      {
        "heading": "Bagaimana dengan minyak zaitun berperisa?",
        "id": "minyak-berperisa",
        "blocks": [
          {
            "type": "p",
            "text": "Lima kesilapan yang sama terpakai, dan malah lebih ketara kerana perisanya lebih halus. Enam perisa dalam koleksi ini ialah Timi Liar (Za'atar), Habbatus Sauda, Kunyit & Lada Hitam, Rosemary & Selasih, Adas & Jintan Manis, serta Lavender & Kamomil, setiap satunya minyak zaitun dara ekstra yang direndam dengan tumbuhan kering."
          },
          {
            "type": "p",
            "text": "Habbatus Sauda sesuai dititis atas roti atau nasi; Timi Liar sesuai dengan telur dan keju; Rosemary & Selasih sesuai dengan ayam panggang. Memanaskannya dengan kuat menghilangkan sebab ia dibeli — guna cara yang sama seperti minyak klasik: selepas api ditutup, bukan sebelum."
          },
          {
            "type": "image",
            "src": "pressCaraMakanMinyakZaitunSetiapHariInline",
            "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Bukan resipi baharu, cuma lima langkah dibetulkan",
      "blocks": [
        {
          "type": "p",
          "text": "Tiada satu pun daripada lima kesilapan ini memerlukan menu baharu. Semuanya soal bila menuang, saiz mana dibeli, dan di mana botol itu diletak. Minyak zaitun ialah makanan, bukan rawatan untuk apa-apa penyakit, dan halaman ini bukan nasihat perubatan — ia hanya tentang cara mengekalkan rasa yang anda sudah bayar untuknya."
        }
      ]
    },
    "faqs": [
      {
        "q": "Kenapa minyak zaitun saya tidak berasa apa-apa dalam masakan?",
        "a": "Selalunya kerana ditambah ke dalam kuali atau periuk yang masih panas. Cuba tutup api dahulu, tunggu sebentar, baru gaul minyaknya masuk supaya aromanya tidak hilang serta-merta."
      },
      {
        "q": "Botol 250 ml atau 500 ml lebih sesuai untuk kegunaan mentah?",
        "a": "250 ml, jika kegunaan hanya mentah dalam sudu kecil. Botol besar kelihatan berbaloi tetapi mengambil masa lebih lama untuk habis, dan rasanya sudah datar sebelum sampai ke penghujung."
      },
      {
        "q": "Boleh masuk minyak zaitun dalam sup panas?",
        "a": "Lebih baik dititis atas mangkuk yang sudah dihidang berbanding dimasukkan ke dalam periuk yang masih mendidih. Haba dalam periuk mengambil aromanya sebelum sampai ke mangkuk."
      },
      {
        "q": "Macam mana nak tahu minyak zaitun sudah tidak segar?",
        "a": "Hidu sebelum guna. Bau hijau atau berbuah bermakna masih baik. Bau datar, seperti krayon atau tiada bau langsung bermakna sudah tiba masa untuk botol baharu."
      },
      {
        "q": "Minyak zaitun berperisa guna dengan cara sama?",
        "a": "Ya, ditambah selepas api ditutup, bukan sebelum. Perisanya lebih halus daripada minyak klasik, jadi haba tinggi menghilangkan sebab ia dibeli lebih cepat."
      },
      {
        "q": "Berapa kerap patut periksa botol yang sedang digunakan?",
        "a": "Setiap kali sebelum guna, dengan menghidunya sekali sebelum menuang. Ia mengambil masa dua saat dan mengelak sudu demi sudu ditambah tanpa memberi apa-apa kepada hidangan."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun Arabian Village",
        "path": "products",
        "description": "Minyak zaitun dara ekstra perahan sejuk pertama dari Palestin, dalam saiz 250 ml dan 500 ml."
      },
      {
        "label": "Minyak zaitun untuk roti dan cicahan",
        "path": "blog/minyak-zaitun-untuk-roti-dan-cicahan",
        "description": "Pinggan cicahan, apa yang masuk ke dalamnya, dan kenapa minyaknya dituang bukan dimasak."
      },
      {
        "label": "Cara simpan minyak zaitun",
        "path": "blog/cara-simpan-minyak-zaitun",
        "description": "Haba, cahaya dan penutup botol, dan kenapa peti sejuk bukan jawapannya."
      }
    ]
  },
  /* ---------------- PRESS round 8 ---------------- */
  {
    "id": "kelebihan-extra-virgin-olive-oil-berbanding-gred-lain",
    "slug": "kelebihan-extra-virgin-olive-oil-berbanding-gred-lain",
    "seoTitle": "Kelebihan Extra Virgin Olive Oil Berbanding Gred Lain",
    "metaTitle": "Kelebihan Extra Virgin Olive Oil: Apa Yang Tinggal",
    "metaDescription": "Kelebihan gred tertinggi ialah apa yang masih tinggal dalam botol selepas gred lain membuangnya, dan bila kelebihan itu musnah.",
    "focusKeyword": "kelebihan extra virgin olive oil",
    "relatedKeywords": [
      "extra virgin vs minyak zaitun ditapis",
      "gred minyak zaitun",
      "minyak zaitun dara maksud",
      "keasidan minyak zaitun",
      "polifenol minyak zaitun",
      "minyak zaitun light maksud",
      "kenapa extra virgin mahal",
      "minyak zaitun pomace beza",
      "rasa pahit minyak zaitun",
      "minyak zaitun perahan sejuk"
    ],
    "category": "Memilih minyak zaitun",
    "tags": [
      "gred",
      "extra virgin",
      "polifenol",
      "rasa"
    ],
    "h1": "Kelebihan Extra Virgin Olive Oil Ialah Apa Yang Masih Tinggal",
    "excerpt": "Gred tertinggi tidak menambah apa-apa. Ia sekadar tidak membuang apa-apa. Itulah kelebihannya, dan itu juga sebab kelebihan itu boleh musnah dalam sekelip mata di dapur.",
    "keyTakeaway": "Kelebihan extra virgin olive oil bukan sesuatu yang ditambah, tetapi sesuatu yang tidak dibuang. Aroma, rasa pahit, pedas di tekak dan sebatian polifenol masih ada kerana minyak itu tidak pernah ditapis. Haba tinggi, cahaya dan botol yang dibiar terbuka boleh menghapuskan kelebihan itu.",
    "datePublished": "2026-09-10",
    "dateModified": "2026-09-10",
    "readingTime": 5,
    "hero": {
      "src": "pressKelebihanExtraVirginOliveOilBerbandingGredLainHero",
      "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
    },
    "ogImage": "/og/blog-kelebihan-extra-virgin-olive-oil-berbanding-gred-lain.jpg",
    "intro": [
      "Orang selalu bertanya apa yang extra virgin tambahkan kepada minyak zaitun. Jawapannya tiada apa-apa. Kelebihannya datang daripada senarai perkara yang tidak dibuat kepadanya.",
      "Sebab itu kelebihan ini rapuh. Ia bukan bahan tambah yang kekal dalam botol, tetapi sesuatu yang boleh hilang di rak kedai, di dalam almari, atau di dalam kuali."
    ],
    "sections": [
      {
        "heading": "Apa yang gred lain sudah buang?",
        "id": "apa-yang-dibuang",
        "blocks": [
          {
            "type": "p",
            "text": "Gred tapisan dibuat daripada minyak yang tidak lulus ujian extra virgin, kemudian dibersihkan dengan haba dan kadangkala pelarut. Proses itu berjaya membuang kecacatan, tetapi ia turut membawa pergi aroma, warna dan sebahagian besar sebatian yang memberi rasa. Hasilnya minyak yang neutral dan hampir tiada bau."
          },
          {
            "type": "p",
            "text": "Jadi perbandingan sebenar bukan antara minyak baik dan minyak jahat. Ia antara minyak yang masih membawa isi buah dan minyak yang sudah dibersihkan sehingga senyap. Tangga gred penuh ada dalam [apa itu minyak zaitun extra virgin](/blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain)."
          },
          {
            "type": "image",
            "src": "pressKelebihanExtraVirginOliveOilBerbandingGredLainInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Apa yang masih tinggal dalam botol extra virgin?",
        "id": "apa-yang-tinggal",
        "blocks": [
          {
            "type": "p",
            "text": "Aroma rumput atau buah, rasa pahit di lidah, dan pedas yang mencengkam di pangkal tekak. Ketiga-tiganya datang daripada sebatian polifenol yang hanya bertahan dalam minyak yang tidak ditapis, antaranya hidroksitirosol, tirosol dan oleokantal. Warna hijau atau keemasan pula datang daripada klorofil dan karotenoid."
          },
          {
            "type": "p",
            "text": "Yang berguna untuk pembeli: semua itu boleh dirasa. Tiada label yang boleh memberitahu anda perkara yang lidah boleh sahkan dalam dua saat, dan [rasa minyak zaitun pahit dan pedas](/blog/rasa-minyak-zaitun-pahit-dan-pedas) mengupas sebabnya."
          },
          {
            "type": "image",
            "src": "pressKelebihanExtraVirginOliveOilBerbandingGredLainInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Apa maksud had keasidan yang selalu disebut?",
        "id": "had-keasidan",
        "blocks": [
          {
            "type": "p",
            "text": "Keasidan bebas ialah ukuran makmal terhadap penguraian lemak dalam minyak, ditulis sebagai peratusan. Piawai perdagangan menetapkan had extra virgin pada 0.8 peratus, minyak dara pada 2.0 peratus, dan minyak tapisan pada 0.3 peratus. Angka itu had kategori, bukan ukuran rasa."
          },
          {
            "type": "p",
            "text": "Angka rendah tidak menjamin minyak yang sedap, tetapi angka tinggi menjamin minyak yang penat. Mana-mana angka yang dicetak pada label sepatutnya ada sijil ujian di belakangnya, dan berhak ditanya."
          },
          {
            "type": "image",
            "src": "pressKelebihanExtraVirginOliveOilBerbandingGredLainInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Kenapa perkataan ditapis sering disalah faham?",
        "id": "perkataan-ditapis",
        "blocks": [
          {
            "type": "p",
            "text": "Dalam kategori minyak zaitun, ditapis merujuk kepada gred tapisan, bukan kepada minyak yang ditapis halus daripada hampas. Banyak label menggunakan perkataan pure atau light untuk gred yang sama. Light pula bermaksud ringan pada rasa, bukan ringan pada kalori."
          },
          {
            "type": "table",
            "head": [
              "Gred",
              "Apa yang tinggal",
              "Sesuai untuk"
            ],
            "rows": [
              [
                "Extra virgin",
                "Aroma, pahit, pedas, polifenol",
                "Mentah, salad, cicahan, tumis"
              ],
              [
                "Dara (virgin)",
                "Sebahagian aroma dan rasa",
                "Masakan harian"
              ],
              [
                "Ditapis, pure atau light",
                "Hampir tiada rasa atau bau",
                "Goreng bersuhu tinggi"
              ],
              [
                "Pomace atau hampas",
                "Diekstrak daripada sisa perahan",
                "Kegunaan pukal"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressKelebihanExtraVirginOliveOilBerbandingGredLainInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Bila kelebihan itu musnah?",
        "id": "bila-kelebihan-musnah",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga keadaan. Haba tinggi melebihi takat berasapnya pada kira-kira 190 hingga 210 darjah Celsius. Cahaya yang menembusi botol jernih di rak yang terang. Dan botol yang dibiarkan terbuka di sebelah dapur, di mana udara panas mengambil sedikit demi sedikit antara waktu masak."
          },
          {
            "type": "p",
            "text": "Yang ketiga paling kerap berlaku dan paling mudah dielakkan. Tutup botol setiap kali, simpan jauh dari dapur, dan habiskan dalam kira-kira dua bulan selepas dibuka."
          },
          {
            "type": "image",
            "src": "pressKelebihanExtraVirginOliveOilBerbandingGredLainInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Jadi bila gred lain lebih masuk akal?",
        "id": "bila-gred-lain-sesuai",
        "blocks": [
          {
            "type": "p",
            "text": "Apabila haba tinggi dan jumlahnya banyak. Mengisi periuk untuk goreng dalam menggunakan minyak jauh lebih banyak daripada tumis, dan haba itu menghapuskan setiap kelebihan yang anda bayar lebih untuknya. Minyak tapisan bukan kompromi di situ, ia pilihan yang betul."
          },
          {
            "type": "p",
            "text": "Dapur yang menyimpan dua botol, satu neutral dan satu extra virgin, biasanya berbelanja lebih rendah sebulan berbanding satu botol yang cuba buat kedua-dua kerja."
          },
          {
            "type": "image",
            "src": "pressKelebihanExtraVirginOliveOilBerbandingGredLainInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      },
      {
        "heading": "Macam mana nak uji kelebihan itu di rumah?",
        "id": "uji-di-rumah",
        "blocks": [
          {
            "type": "p",
            "text": "Dengan merasa, dan itu satu-satunya ujian yang benar-benar boleh dibuat tanpa makmal. Tuang sedikit ke dalam tangan atau gelas kecil, hangatkannya sebentar, hidu, kemudian hirup dan biarkan ia sampai ke pangkal tekak. Minyak yang masih membawa kelebihannya akan berbau hijau dan mencengkam sedikit."
          },
          {
            "type": "p",
            "text": "Minyak yang datar, berlilin atau berbau seperti krayon sudah kehilangan bahagian yang anda bayar lebih untuknya, walaupun label masih menulis extra virgin. Label bercakap tentang gred pada masa pembotolan; lidah bercakap tentang keadaan botol itu hari ini."
          },
          {
            "type": "image",
            "src": "pressKelebihanExtraVirginOliveOilBerbandingGredLainInline",
            "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Ringkasnya",
      "blocks": [
        {
          "type": "p",
          "text": "Kelebihan extra virgin ialah apa yang masih ada dalam botol, bukan apa yang ditambah. Jaga tiga perkara yang boleh menghapuskannya, guna ia untuk hidangan mentah dan haba sederhana, dan biarkan minyak tapisan yang murah menguruskan kuali api penuh."
        }
      ]
    },
    "faqs": [
      {
        "q": "Apa kelebihan extra virgin olive oil berbanding gred lain?",
        "a": "Ia tidak pernah ditapis, jadi aroma, rasa pahit, pedas di tekak dan sebatian polifenol masih ada. Gred tapisan membuang semua itu bersama kecacatannya."
      },
      {
        "q": "Kenapa minyak extra virgin lebih cepat rosak berbanding minyak tapisan?",
        "a": "Kerana sebatian yang memberi rasa juga cepat bertindak balas dengan udara dan cahaya. Minyak tapisan sudah kehilangan sebatian itu, jadi ia lebih stabil tetapi juga lebih senyap."
      },
      {
        "q": "Adakah ditapis bermaksud minyak yang lebih bersih?",
        "a": "Dalam kategori ini ditapis merujuk kepada gred tapisan, bukan penapisan halus. Ia minyak yang gagal ujian extra virgin dan dibersihkan secara industri selepas itu."
      },
      {
        "q": "Apa maksud keasidan 0.8 peratus?",
        "a": "Itu had kategori untuk gred extra virgin dalam piawai perdagangan. Ia mengukur penguraian lemak, bukan rasa, dan angka tinggi menandakan minyak yang sudah penat."
      },
      {
        "q": "Kenapa botol extra virgin lebih mahal daripada botol tapisan?",
        "a": "Kerana proses perahannya tidak boleh menyelamatkan buah yang rosak sedikit pun — hasil lebih rendah, jadi kos seliter lebih tinggi. Gred tapisan boleh guna buah yang gagal ujian."
      },
      {
        "q": "Kelebihan ini hilang kalau dimasak?",
        "a": "Sebahagiannya. Tumis pada 140 hingga 180 darjah masih mengekalkan banyak. Goreng dalam pada sekitar 200 darjah menghapuskan hampir kesemuanya."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun Arabian Village",
        "path": "products",
        "description": "Minyak zaitun dara perahan sejuk pertama dari Palestin, tidak ditapis, dalam 250 ml dan 500 ml."
      },
      {
        "label": "Apa itu minyak zaitun extra virgin dan gred lain",
        "path": "blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain",
        "description": "Tangga gred penuh, daripada extra virgin hingga hampas, dan apa maksud setiap perkataan pada label."
      },
      {
        "label": "Rasa minyak zaitun pahit dan pedas",
        "path": "blog/rasa-minyak-zaitun-pahit-dan-pedas",
        "description": "Dari mana datangnya pahit dan pedas itu, dan kenapa ketiadaannya lebih membimbangkan."
      }
    ]
  },
  /* ---------------- PRESS round 8 ---------------- */
  {
    "id": "kelebihan-olive-oil-untuk-dapur-harian",
    "slug": "kelebihan-olive-oil-untuk-dapur-harian",
    "seoTitle": "Kelebihan Olive Oil dalam Dapur Malaysia Harian",
    "metaTitle": "Kelebihan Olive Oil dalam Dapur Malaysia Harian",
    "metaDescription": "Di mana kelebihan olive oil benar-benar nampak dalam sehari, berbanding minyak yang sudah ada di dapur anda, dan bila ia terbazir.",
    "focusKeyword": "kelebihan olive oil",
    "relatedKeywords": [
      "kelebihan olive oil berbanding minyak masak",
      "olive oil untuk masakan melayu",
      "olive oil vs minyak sawit",
      "kos guna minyak zaitun",
      "olive oil untuk dapur harian",
      "perlu tukar minyak masak",
      "minyak zaitun berperisa",
      "olive oil atas nasi",
      "kelebihan minyak zaitun dara",
      "olive oil untuk tumis"
    ],
    "category": "Memilih minyak zaitun",
    "tags": [
      "kelebihan",
      "dapur",
      "harian",
      "kos"
    ],
    "h1": "Kelebihan Olive Oil yang Betul-betul Nampak dalam Dapur Harian",
    "excerpt": "Bukan senarai sebab untuk membeli, tetapi tiga saat dalam sehari di mana perbezaannya benar-benar terasa, apa yang berlaku bila ia bertemu minyak yang sudah ada di dapur anda, dan bila ia terbazir.",
    "keyTakeaway": "Kelebihan olive oil paling nampak dalam tiga saat sehari: pada roti atau nasi panas waktu pagi, sebagai titisan akhir selepas api ditutup, dan dalam salad atau ulam. Di luar tiga saat itu ia bersaing dengan minyak yang lebih murah dan selalunya kalah.",
    "datePublished": "2026-09-10",
    "dateModified": "2026-09-10",
    "readingTime": 5,
    "hero": {
      "src": "pressKelebihanOliveOilUntukDapurHarianHero",
      "alt": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"
    },
    "ogImage": "/og/blog-kelebihan-olive-oil-untuk-dapur-harian.jpg",
    "intro": [
      "Kebanyakan senarai kelebihan minyak zaitun ditulis seolah-olah dapur itu kosong. Dapur Malaysia tidak kosong: sudah ada minyak masak, mungkin minyak kelapa, mungkin minyak bijan, dan semuanya lebih murah.",
      "Jadi soalannya bukan sama ada olive oil ada kelebihan. Soalannya di mana kelebihan itu benar-benar nampak dalam sehari, dan di mana ia hilang begitu sahaja."
    ],
    "sections": [
      {
        "heading": "Bila kelebihan itu betul-betul terasa?",
        "id": "bila-terasa",
        "blocks": [
          {
            "type": "p",
            "text": "Dalam tiga saat, dan ketiga-tiganya melibatkan minyak yang tidak dipanaskan. Waktu pagi, dituang ke dalam pinggan cicahan untuk roti. Waktu makan, dititis ke atas hidangan yang sudah siap. Dan dalam salad atau ulam, di mana minyak itu bercampur dengan bahan masam dan menjadi sos."
          },
          {
            "type": "p",
            "text": "Di ketiga-tiga saat itu, lidah boleh membezakan minyak zaitun dara daripada minyak neutral dalam satu suapan. Di luar tiga saat itu perbezaannya semakin kecil, dan pada suhu tinggi ia hilang."
          },
          {
            "type": "image",
            "src": "pressKelebihanOliveOilUntukDapurHarianInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Berbanding minyak yang sudah ada di dapur?",
        "id": "berbanding-yang-sedia-ada",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun dara bukan pengganti minyak lain, ia alat yang berbeza. Minyak masak tapisan menang pada haba tinggi dan pada harga. Minyak bijan menang sebagai penyedap akhir masakan Cina. Minyak zaitun dara menang di tempat yang tiada satu pun daripada mereka pergi: rasa buah dan pedas dalam hidangan sejuk atau suam."
          },
          {
            "type": "table",
            "head": [
              "Minyak",
              "Ia menang di mana",
              "Ia kalah di mana"
            ],
            "rows": [
              [
                "Minyak masak tapisan",
                "Goreng dalam, kuali api penuh, kos",
                "Tiada rasa untuk disumbang"
              ],
              [
                "Minyak kelapa dara",
                "Aroma kelapa dalam kuih dan kari",
                "Membeku bila sejuk, aroma menguasai"
              ],
              [
                "Minyak bijan",
                "Titisan akhir masakan Cina",
                "Terlalu kuat untuk hidangan lembut"
              ],
              [
                "Minyak zaitun dara",
                "Mentah, salad, cicahan, tumis sederhana",
                "Kuali api penuh dan goreng dalam"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressKelebihanOliveOilUntukDapurHarianInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Kos setiap kali guna, bukan harga botol",
        "id": "kos-setiap-guna",
        "blocks": [
          {
            "type": "p",
            "text": "Angka yang menakutkan orang ialah harga rak, tetapi bukan itu yang dibayar setiap kali. Titisan akhir menggunakan satu sudu kecil. Pinggan cicahan untuk semeja menggunakan satu sudu besar. Sos salad untuk empat orang menggunakan dua sudu besar. Sebotol yang digunakan begini bertahan berminggu-minggu."
          },
          {
            "type": "p",
            "text": "Bandingkan dengan menuangnya ke dalam periuk untuk goreng dalam, yang menghabiskan berkali ganda dalam satu hidangan dan memusnahkan rasa itu sebelum sampai ke pinggan. Kos sebenar diukur setiap hidangan yang benar-benar berasa minyak zaitun, bukan seliter."
          },
          {
            "type": "image",
            "src": "pressKelebihanOliveOilUntukDapurHarianInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Bila kelebihan itu terbazir?",
        "id": "bila-terbazir",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga keadaan, dan kesemuanya lazim. Haba melebihi takat berasapnya pada kira-kira 190 hingga 210 darjah Celsius. Hidangan bersos pekat atau berempah kuat yang menenggelamkan rasa minyak itu sepenuhnya. Dan jumlah besar, kerana harga yang berbaloi untuk satu sudu tidak berbaloi untuk satu cawan."
          },
          {
            "type": "table",
            "head": [
              "Kelebihan",
              "Had yang datang bersamanya"
            ],
            "rows": [
              [
                "Rasa kekal kerana tiada apa yang ditapis keluar",
                "Rasa itulah yang mula-mula diambil oleh haba"
              ],
              [
                "Satu bahan sahaja dalam botol",
                "Tiada label membuktikan isi sebenar botol"
              ],
              [
                "Serba boleh untuk mentah dan haba sederhana",
                "Bukan minyak untuk kuali api penuh"
              ],
              [
                "Botol kecil kekal segar sepanjang guna",
                "Kos seliter lebih tinggi berbanding botol besar"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressKelebihanOliveOilUntukDapurHarianInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      },
      {
        "heading": "Bagaimana kelebihan itu hilang di rumah?",
        "id": "bagaimana-kelebihan-hilang",
        "blocks": [
          {
            "type": "p",
            "text": "Paling kerap bukan di dalam kuali, tetapi di dalam almari. Botol yang dibiarkan terbuka di sebelah dapur terdedah kepada udara panas dan cahaya sepanjang hari, dan kehilangan itu berlaku antara waktu masak, bukan semasa memasak. Ia cara paling biasa isi rumah membazir beza harga yang telah dibayar."
          },
          {
            "type": "ul",
            "items": [
              "Tutup penutup setiap kali menuang, bukan hanya selepas habis memasak",
              "Simpan dalam almari jauh daripada dapur dan daripada cahaya matahari",
              "Habiskan dalam kira-kira dua bulan selepas dibuka",
              "Nilai dengan bau; bau datar atau seperti krayon bermakna ia sudah lepas tempoh terbaiknya"
            ]
          },
          {
            "type": "image",
            "src": "pressKelebihanOliveOilUntukDapurHarianInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          },
          {
            "type": "p",
            "text": "Butiran penyimpanan penuh ada dalam [cara simpan minyak zaitun](/blog/cara-simpan-minyak-zaitun)."
          }
        ]
      },
      {
        "heading": "Adakah ini hujah kesihatan?",
        "id": "bukan-hujah-kesihatan",
        "blocks": [
          {
            "type": "p",
            "text": "Bukan pada halaman ini. Semua di atas tentang rasa, kos dan dapur. Soal pemakanan ialah topik berasingan yang perlu ditulis dengan berhati-hati, dan ia sudah ada di [manfaat kesihatan minyak zaitun dara](/blog/manfaat-kesihatan-minyak-zaitun-dara-untuk-keluarga-malaysia) bersama batasan yang dinyatakan dengan jelas."
          },
          {
            "type": "p",
            "text": "Minyak zaitun ialah makanan, bukan rawatan untuk apa-apa penyakit. Jika ada keadaan kesihatan yang didiagnosis, orang yang patut ditanya ialah doktor atau pakar diet berdaftar, bukan sebuah label."
          },
          {
            "type": "image",
            "src": "pressKelebihanOliveOilUntukDapurHarianInline",
            "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Cara paling mudah menguji sendiri",
      "blocks": [
        {
          "type": "p",
          "text": "Ambil satu daripada tiga saat itu minggu ini dan buat sekali. Tuang sesudu ke dalam pinggan cicahan untuk roti pagi, atau titiskan atas nasi panas sebelum hidang. Kalau anda boleh membezakannya, kelebihan itu nyata untuk dapur anda. Kalau tidak, simpan wang itu untuk perkara lain."
        }
      ]
    },
    "faqs": [
      {
        "q": "Kelebihan olive oil berbanding minyak masak biasa apa?",
        "a": "Rasa. Minyak masak tapisan sengaja dibuat tanpa bau dan tanpa rasa, sedangkan minyak zaitun dara membawa aroma buah dan pedas yang boleh dikesan dalam hidangan mentah atau suam."
      },
      {
        "q": "Boleh ke guna olive oil untuk masakan Melayu?",
        "a": "Boleh untuk tumis dan panggang pada haba sederhana. Untuk hidangan bersos pekat atau berempah kuat, rasanya tenggelam, jadi minyak yang lebih murah lebih masuk akal di situ."
      },
      {
        "q": "Kenapa olive oil mahal berbanding minyak sawit?",
        "a": "Minyak sawit dikeluarkan di rantau ini dalam jumlah besar, manakala setiap botol minyak zaitun diimport. Tambang, duti, gred dan tahun tuai semuanya duduk dalam harga rak."
      },
      {
        "q": "Perlu ke tukar semua minyak di dapur kepada olive oil?",
        "a": "Tidak, dan itu biasanya lebih mahal tanpa manfaat. Kebanyakan dapur lebih baik menyimpan dua botol: satu minyak murah untuk haba tinggi dan satu minyak zaitun dara untuk yang mentah."
      },
      {
        "q": "Minyak zaitun berperisa ada kelebihan yang sama?",
        "a": "Asasnya sama kerana ia minyak zaitun dara yang direndam dengan tumbuhan kering. Perisanya halus, jadi tempatnya sebagai titisan akhir dan bukan untuk dipanaskan dengan kuat."
      },
      {
        "q": "Perlu beli yang paling mahal untuk dapat kelebihan ini?",
        "a": "Tidak. Yang menentukan ialah gred dan kesegaran, bukan harga. Botol dari tuaian terbaru yang boleh anda habiskan dalam dua bulan selalunya mengalahkan botol premium yang sudah lama."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun Arabian Village",
        "path": "products",
        "description": "Minyak zaitun dara perahan sejuk pertama dari Palestin, dalam botol 250 ml dan 500 ml."
      },
      {
        "label": "Manfaat kesihatan minyak zaitun dara",
        "path": "blog/manfaat-kesihatan-minyak-zaitun-dara-untuk-keluarga-malaysia",
        "description": "Soal pemakanan, ditulis dengan hujah antarabangsa dan batasannya dinyatakan dengan jelas."
      },
      {
        "label": "Minyak zaitun vs minyak masak lain",
        "path": "blog/minyak-zaitun-vs-minyak-masak-lain",
        "description": "Perbandingan penuh dengan minyak yang sudah ada di dapur Malaysia, dari segi rasa dan haba."
      }
    ]
  },
  /* ---------------- PRESS round 8 ---------------- */
  {
    "id": "maksud-olive-oil-dalam-bahasa-malaysia",
    "slug": "maksud-olive-oil-dalam-bahasa-malaysia",
    "seoTitle": "Maksud Olive Oil dalam Bahasa Malaysia: Minyak Zaitun",
    "metaTitle": "Maksud Olive Oil dalam Bahasa Malaysia",
    "metaDescription": "Olive oil bermaksud minyak zaitun. Jadual istilah label Inggeris dan padanan Melayunya, termasuk gred, perahan sejuk dan tarikh tuai.",
    "focusKeyword": "maksud olive oil dalam bahasa malaysia",
    "relatedKeywords": [
      "olive oil dalam bahasa melayu",
      "minyak zaitun bahasa inggeris",
      "maksud extra virgin dalam bahasa melayu",
      "cold pressed maksud",
      "minyak zaitun dara maksud",
      "zaitun dan zaiton ejaan",
      "istilah label minyak zaitun",
      "harvest date maksud",
      "refined olive oil bahasa melayu",
      "pomace maksud melayu"
    ],
    "category": "Asas minyak zaitun",
    "tags": [
      "istilah",
      "label",
      "bahasa",
      "gred"
    ],
    "h1": "Maksud Olive Oil dalam Bahasa Malaysia dan Istilah Label Lain",
    "excerpt": "Olive oil ialah minyak zaitun. Selebihnya pada label pula bercampur antara dua bahasa, dan beberapa terjemahan yang biasa digunakan sebenarnya salah.",
    "keyTakeaway": "Olive oil bermaksud minyak zaitun dalam bahasa Malaysia. Zaitun ialah buahnya dan minyak zaitun ialah minyaknya. Extra virgin ialah minyak zaitun dara, cold pressed ialah perahan sejuk, dan refined atau pure ialah gred ditapis. Ejaan zaiton yang muncul dalam carian merujuk kepada perkara yang sama.",
    "datePublished": "2026-09-10",
    "dateModified": "2026-09-10",
    "readingTime": 4,
    "hero": {
      "src": "pressMaksudOliveOilDalamBahasaMalaysiaHero",
      "alt": "Pekerja menuai zaitun di celah dahan ketika musim tuai"
    },
    "ogImage": "/og/blog-maksud-olive-oil-dalam-bahasa-malaysia.jpg",
    "intro": [
      "Label botol ditulis dalam bahasa Inggeris, perbualan di kedai dalam bahasa Melayu, dan carian di telefon bercampur kedua-duanya. Halaman ini jambatan antara ketiga-tiganya.",
      "Beberapa terjemahan yang biasa dipakai sebenarnya salah, dan satu daripadanya boleh menyebabkan pembeli memilih gred yang bukan yang dia mahu."
    ],
    "sections": [
      {
        "heading": "Olive oil bermaksud apa?",
        "id": "maksud-asas",
        "blocks": [
          {
            "type": "p",
            "text": "Olive oil bermaksud minyak zaitun. Zaitun ialah nama buahnya dan minyak zaitun ialah minyak yang diperah daripada buah itu. Kedua-dua perkataan digunakan di Malaysia, kerap dalam ayat yang sama, dan tiada satu pun lebih betul daripada yang lain."
          },
          {
            "type": "p",
            "text": "Ejaan zaiton juga muncul dalam carian dan pada sesetengah pembungkusan. Ia merujuk kepada perkara yang sama; cuma cara ejaan yang berbeza sahaja."
          },
          {
            "type": "image",
            "src": "pressMaksudOliveOilDalamBahasaMalaysiaInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Apa padanan istilah gred?",
        "id": "istilah-gred",
        "blocks": [
          {
            "type": "p",
            "text": "Di sinilah kebanyakan kekeliruan berlaku, kerana perkataan Inggeris pada label bukan penerangan biasa tetapi nama gred yang ditetapkan piawai perdagangan. Extra virgin ialah gred tertinggi dan padanan Melayunya minyak zaitun dara ekstra — bukan sekadar dara, yang merujuk kepada gred kedua. Pure dan light pula bukan pujian; kedua-duanya merujuk kepada gred ditapis."
          },
          {
            "type": "table",
            "head": [
              "Istilah label",
              "Padanan Melayu",
              "Maksudnya"
            ],
            "rows": [
              [
                "Extra virgin olive oil",
                "Minyak zaitun dara ekstra",
                "Gred tertinggi, tidak ditapis"
              ],
              [
                "Virgin olive oil",
                "Minyak zaitun dara",
                "Diperah mekanikal, gred kedua, lebih tinggi keasidan"
              ],
              [
                "Refined, pure atau light",
                "Ditapis",
                "Minyak yang gagal ujian, dibersihkan"
              ],
              [
                "Pomace olive oil",
                "Minyak hampas zaitun",
                "Diekstrak daripada sisa perahan"
              ],
              [
                "Cold pressed",
                "Perahan sejuk",
                "Diperah tanpa haba ditambah"
              ],
              [
                "First cold press",
                "Perahan sejuk pertama",
                "Satu perahan mekanikal sahaja"
              ],
              [
                "Harvest date",
                "Tarikh tuai",
                "Bila buah itu dituai"
              ],
              [
                "Acidity",
                "Keasidan",
                "Ukuran makmal penguraian lemak"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMaksudOliveOilDalamBahasaMalaysiaInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Kenapa sejuk-tekan salah?",
        "id": "sejuk-tekan-salah",
        "blocks": [
          {
            "type": "p",
            "text": "Kerana ia terjemahan perkataan demi perkataan yang tidak wujud dalam bahasa Melayu sebenar. Cold pressed diterjemah dengan betul sebagai perahan sejuk, kerana proses itu memerah, bukan menekan. Sejuk-tekan muncul dalam terjemahan mesin dan pada beberapa penyenaraian dalam talian."
          },
          {
            "type": "p",
            "text": "Kalau sebuah penyenaraian menggunakan istilah itu, ia petunjuk kecil bahawa penerangan produk tidak ditulis oleh orang yang mengenali kategori ini."
          },
          {
            "type": "image",
            "src": "pressMaksudOliveOilDalamBahasaMalaysiaInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Kenapa perkataan ditapis paling mengelirukan?",
        "id": "perkataan-ditapis",
        "blocks": [
          {
            "type": "p",
            "text": "Kerana dalam bahasa harian ditapis membawa maksud yang baik, iaitu dibersihkan daripada kotoran. Dalam kategori minyak zaitun ia nama gred, dan gred itu dibuat daripada minyak yang gagal ujian extra virgin kemudian dibersihkan dengan haba dan kadangkala pelarut."
          },
          {
            "type": "p",
            "text": "Jadi sebotol yang dilabel pure bukan lebih tulen daripada extra virgin. Ia lebih neutral, kerana rasanya sudah dibuang. Tangga gred penuh ada dalam [apa itu minyak zaitun extra virgin](/blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain)."
          },
          {
            "type": "image",
            "src": "pressMaksudOliveOilDalamBahasaMalaysiaInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Istilah mana yang paling berguna semasa membeli?",
        "id": "istilah-paling-berguna",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga sahaja. Perkataan extra virgin olive oil yang ditulis penuh, bukan versi yang dipendekkan atau dilembutkan. Satu tarikh, dan tarikh tuai lebih berguna daripada tarikh luput. Dan satu negara asal yang dinamakan, bukan ayat samar tentang tempat ia dibungkus."
          },
          {
            "type": "ul",
            "items": [
              "Extra virgin olive oil ditulis penuh, bukan olive oil sahaja",
              "Tarikh tuai lebih memberitahu daripada tarikh luput",
              "Satu negara asal yang dinamakan, bukan dibungkus di",
              "Kaca gelap, kerana cahaya menjejaskan rasa"
            ]
          },
          {
            "type": "image",
            "src": "pressMaksudOliveOilDalamBahasaMalaysiaInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Apa maksud istilah rasa yang muncul pada label?",
        "id": "istilah-rasa",
        "blocks": [
          {
            "type": "p",
            "text": "Label dan penerangan produk kerap menggunakan perkataan rasa yang bunyinya seperti aduan tetapi sebenarnya pujian. Bitter bermaksud pahit, dan itu tanda baik. Pungent bermaksud pedas atau mencengkam di pangkal tekak, juga tanda baik. Fruity bermaksud berbau buah, iaitu aroma zaitun segar itu sendiri."
          },
          {
            "type": "p",
            "text": "Ketiga-tiganya datang daripada sebatian polifenol yang hanya bertahan dalam minyak yang tidak ditapis. Minyak yang langsung tiada ketiga-tiga sifat ini biasanya minyak yang sudah lama atau sudah ditapis. [Rasa minyak zaitun pahit dan pedas](/blog/rasa-minyak-zaitun-pahit-dan-pedas) mengupasnya lebih lanjut."
          },
          {
            "type": "image",
            "src": "pressMaksudOliveOilDalamBahasaMalaysiaInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          }
        ]
      },
      {
        "heading": "Kenapa istilah ini penting semasa membeli dalam talian?",
        "id": "istilah-dalam-talian",
        "blocks": [
          {
            "type": "p",
            "text": "Kerana penyenaraian dalam talian ditulis oleh banyak penjual berlainan, dan sebahagiannya menterjemah label dengan mesin. Penyenaraian yang menulis minyak zaitun tulen sedangkan gambar botol menunjukkan pure olive oil sedang bercakap tentang dua perkara berbeza, dan pembeli yang mengenali istilah akan perasan percanggahan itu."
          },
          {
            "type": "p",
            "text": "Jadi bacalah gambar label, bukan tajuk penyenaraian. Tajuk ditulis untuk carian; label dicetak oleh pengeluar, dan hanya satu daripada dua itu terikat kepada piawai."
          },
          {
            "type": "image",
            "src": "pressMaksudOliveOilDalamBahasaMalaysiaInline",
            "alt": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"
          },
          {
            "type": "p",
            "text": "Perkara yang sama berlaku pada perkataan original, yang muncul dalam ribuan penyenaraian tetapi bukan gred dan bukan piawai kualiti. Ia dakwaan tentang siapa yang menjual botol itu, bukan tentang apa yang ada di dalamnya, dan kedua-dua soalan itu perlu dijawab berasingan."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Langkah seterusnya",
      "blocks": [
        {
          "type": "p",
          "text": "Setelah istilahnya jelas, selebihnya lebih mudah dibaca di rak. [Panduan lengkap minyak zaitun](/blog/minyak-zaitun-panduan-lengkap) mengumpulkan soalan asas yang lain dalam satu halaman, daripada gred hinggalah cara simpan."
        }
      ]
    },
    "faqs": [
      {
        "q": "Olive oil dalam bahasa Malaysia apa?",
        "a": "Minyak zaitun. Zaitun ialah nama buahnya dan minyak zaitun ialah minyak yang diperah daripada buah itu. Kedua-dua istilah digunakan di Malaysia."
      },
      {
        "q": "Apa maksud extra virgin dalam bahasa Melayu?",
        "a": "Minyak zaitun dara ekstra, iaitu gred tertinggi — bukan sekadar dara, yang merujuk kepada gred kedua. Ia diperah secara mekanikal tanpa haba dan tanpa pelarut, dan tidak pernah melalui proses penapisan."
      },
      {
        "q": "Zaiton dan zaitun sama?",
        "a": "Sama. Zaiton ialah ejaan lain yang muncul dalam carian dan pada sesetengah pembungkusan. Kedua-duanya merujuk kepada buah dan minyak yang sama."
      },
      {
        "q": "Kenapa sejuk-tekan tidak digunakan?",
        "a": "Kerana ia terjemahan perkataan demi perkataan yang tidak wujud dalam bahasa Melayu sebenar. Istilah yang betul untuk cold pressed ialah perahan sejuk."
      },
      {
        "q": "Minyak zaitun pure lebih tulen?",
        "a": "Tidak. Pure ialah nama gred ditapis, bukan pujian. Ia lebih neutral kerana rasanya sudah dibuang semasa proses pembersihan."
      },
      {
        "q": "Tarikh mana yang patut dicari pada botol?",
        "a": "Tarikh tuai, jika ada. Ia memberitahu umur sebenar minyak itu, sedangkan tarikh luput hanya memberitahu bila penjual mahu botol itu habis."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun Arabian Village",
        "path": "products",
        "description": "Minyak zaitun dara perahan sejuk pertama dari Palestin, dalam 250 ml dan 500 ml."
      },
      {
        "label": "Minyak zaitun: panduan lengkap",
        "path": "blog/minyak-zaitun-panduan-lengkap",
        "description": "Enam soalan asas dijawab ringkas, dengan pautan ke bacaan penuh bagi setiap satu."
      },
      {
        "label": "Apa itu minyak zaitun extra virgin dan gred lain",
        "path": "blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain",
        "description": "Tangga gred penuh dan apa yang dibuang pada setiap anak tangga."
      }
    ]
  },
  /* ---------------- PRESS round 8 ---------------- */
  {
    "id": "minyak-zaitun-original-cara-pastikan",
    "slug": "minyak-zaitun-original-cara-pastikan",
    "seoTitle": "Minyak Zaitun Original: Apa Perkataan Itu Janjikan",
    "metaTitle": "Minyak Zaitun Original: Apa Perkataan Itu Janjikan",
    "metaDescription": "Perkataan original dalam penyenaraian Shopee dan TikTok bukan gred dan bukan piawai. Apa yang boleh disahkan, dan apa yang tidak boleh.",
    "focusKeyword": "minyak zaitun original",
    "relatedKeywords": [
      "minyak zaitun original shopee",
      "minyak zaitun asli atau tiruan",
      "penjual rasmi minyak zaitun",
      "cara semak penjual minyak zaitun",
      "minyak zaitun tiktok shop",
      "meterai botol minyak zaitun",
      "tarikh tuai minyak zaitun",
      "negara asal minyak zaitun",
      "pengedar rasmi malaysia",
      "beli minyak zaitun dengan selamat"
    ],
    "category": "Membeli minyak zaitun",
    "tags": [
      "original",
      "penyenaraian",
      "pengedar",
      "pengesahan"
    ],
    "h1": "Minyak Zaitun Original: Apa Perkataan Itu Janjikan, dan Apa Tidak",
    "excerpt": "Original ialah perkataan penyenaraian, bukan gred dan bukan piawai. Ini tentang apa yang boleh disahkan sebelum bayar, dan apa yang tidak boleh disahkan daripada sekeping gambar.",
    "keyTakeaway": "Dalam penyenaraian marketplace, original biasanya bermaksud bukan tiruan penjual semula. Ia bukan gred, bukan piawai kualiti, dan bukan jaminan kesegaran. Yang boleh disahkan ialah siapa penjual rasmi, ada atau tiada kedai fizikal, meterai botol, tarikh tuai dan negara asal yang dinamakan.",
    "datePublished": "2026-09-10",
    "dateModified": "2026-11-05",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunOriginalCaraPastikanHero",
      "alt": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"
    },
    "ogImage": "/og/blog-minyak-zaitun-original-cara-pastikan.jpg",
    "intro": [
      "Taip minyak zaitun original ke dalam mana-mana marketplace dan ratusan penyenaraian akan menggunakan perkataan itu. Ia jarang bermaksud perkara yang pembeli fikirkan.",
      "Halaman ini tentang apa yang perkataan itu janjikan, apa yang boleh disahkan sebelum bayar, dan di mana pengesahan itu berhenti."
    ],
    "sections": [
      {
        "heading": "Apa maksud original dalam penyenaraian?",
        "id": "maksud-original",
        "blocks": [
          {
            "type": "p",
            "text": "Dalam bahasa marketplace, original biasanya bermaksud bukan tiruan dan bukan barang penjual semula yang tidak dibenarkan. Ia dakwaan tentang rantaian bekalan, bukan tentang isi botol. Tiada badan yang mengeluarkan gred bernama original, dan tiada ujian makmal yang menghasilkannya."
          },
          {
            "type": "p",
            "text": "Sebab itu dua penyenaraian boleh sama-sama menulis original sedangkan satu daripadanya menjual botol yang sudah dua tahun di gudang. Perkataan itu tidak menyentuh kesegaran langsung."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOriginalCaraPastikanInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Apa bezanya dengan tulen dan palsu?",
        "id": "beza-tulen-dan-palsu",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga perkataan berlainan yang selalu dicampur aduk. Tulen bercakap tentang gred dan ketiadaan campuran. Palsu bercakap tentang penipuan pada isi botol. Original pula bercakap tentang siapa yang menjualnya kepada anda. Satu penyenaraian boleh original tetapi menjual gred yang lebih rendah daripada sangkaan anda."
          },
          {
            "type": "p",
            "text": "Maksud tulen dikupas dalam [maksud minyak zaitun tulen](/blog/maksud-minyak-zaitun-tulen), dan tanda-tanda penipuan dalam [cara kenal minyak zaitun palsu](/blog/cara-kenal-minyak-zaitun-palsu)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOriginalCaraPastikanInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Apa yang boleh disahkan sebelum bayar?",
        "id": "boleh-disahkan",
        "blocks": [
          {
            "type": "p",
            "text": "Lebih banyak daripada yang disangka, dan semuanya boleh dibuat dalam beberapa minit. Siapa penjual rasmi jenama itu di Malaysia. Ada atau tiada kedai fizikal yang boleh didatangi. Sama ada penyenaraian menunjukkan meterai penutup, tarikh, gred penuh dan satu negara asal yang dinamakan."
          },
          {
            "type": "table",
            "head": [
              "Boleh disahkan",
              "Tidak boleh disahkan dari penyenaraian"
            ],
            "rows": [
              [
                "Nama penjual rasmi dan alamat kedai fizikal",
                "Berapa lama botol itu berada di gudang"
              ],
              [
                "Meterai penutup masih utuh apabila sampai",
                "Suhu semasa penghantaran dan penyimpanan"
              ],
              [
                "Gred penuh tertulis pada label",
                "Rasa sebenar minyak dalam botol itu"
              ],
              [
                "Satu negara asal yang dinamakan",
                "Ladang atau kilang perahan yang tepat"
              ],
              [
                "Nombor yang menjawab jika ada masalah",
                "Sama ada gambar itu gambar stok semasa"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOriginalCaraPastikanInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Apa yang tidak boleh disahkan daripada gambar?",
        "id": "tidak-boleh-disahkan",
        "blocks": [
          {
            "type": "p",
            "text": "Segala yang penting tentang rasa. Umur minyak, suhu gudang, berapa lama ia berdiri di bawah lampu, dan sama ada gambar penyenaraian itu gambar stok semasa atau gambar pemasaran berumur tiga tahun. Tiada tangkapan skrin yang menjawab satu pun daripadanya."
          },
          {
            "type": "p",
            "text": "Sebab itu pembelian dalam talian bergantung kepada akauntabiliti penjual, bukan kepada penyenaraian. [Beli minyak zaitun online](/blog/beli-minyak-zaitun-online-di-malaysia) mengupas bahagian penghantaran dan pembungkusan."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOriginalCaraPastikanInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Apa rupa rantaian yang boleh dijejaki?",
        "id": "rantaian-boleh-dijejaki",
        "blocks": [
          {
            "type": "p",
            "text": "Setiap sambungan boleh dinamakan, dan di hujungnya ada orang yang boleh ditemui. Bukan satu akaun marketplace tanpa muka, tetapi satu premis dengan alamat. Ujian ringkasnya: berapa banyak sambungan yang penjual boleh namakan apabila ditanya, dan berapa cepat mereka menjawab."
          },
          {
            "type": "p",
            "text": "Arabian Village satu contoh rantaian sebegitu: ladang zaitun Palestin, dituai dengan tangan, diperah dalam beberapa jam, dan dijual di Malaysia melalui Berkat Madinah Store dengan lima cawangan di Selangor (Ampang, Kajang, Shah Alam, Cash & Carry di Ampang dan Sri Gombak) serta kaunter Shopee dan TikTok Shop milik penjual yang sama."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOriginalCaraPastikanInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Soalan apa yang patut ditanya penjual?",
        "id": "soalan-kepada-penjual",
        "blocks": [
          {
            "type": "p",
            "text": "Empat soalan pendek yang jawapannya lebih bermakna daripada perkataan original itu sendiri. Penjual yang benar-benar rasmi menjawabnya tanpa teragak, dan penjual semula yang tidak dibenarkan biasanya tidak boleh menjawab yang kedua dan keempat."
          },
          {
            "type": "ol",
            "items": [
              "Siapa pengedar rasmi jenama ini di Malaysia, dan adakah anda mereka?",
              "Bila stok ini sampai ke gudang anda?",
              "Ada tarikh tuai atau tarikh pengeluaran pada botol?",
              "Ada kedai fizikal yang saya boleh datang kalau botol sampai pecah?"
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOriginalCaraPastikanInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      },
      {
        "heading": "Apa yang berlaku selepas bungkusan sampai?",
        "id": "selepas-sampai",
        "blocks": [
          {
            "type": "p",
            "text": "Di situlah pengesahan sebenar bermula, kerana buat kali pertama anda memegang botol itu. Periksa meterai penutup masih utuh, baca gred yang tertulis penuh, cari tarikh, dan hidu minyaknya. Kalau meterai sudah pecah sebelum anda membukanya, itu sebab yang munasabah untuk menolak penghantaran."
          },
          {
            "type": "p",
            "text": "Ujian terakhir ialah rasa. Minyak zaitun dara yang sihat berbau hijau, terasa sedikit pahit, dan mencengkam di pangkal tekak. Minyak yang datar atau berbau seperti krayon sudah memberitahu apa yang perlu diketahui, tanpa mengira apa yang ditulis pada penyenaraian."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunOriginalCaraPastikanInline",
            "alt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Cara guna perkataan itu",
      "blocks": [
        {
          "type": "p",
          "text": "Anggap original sebagai permulaan perbualan, bukan jawapan. Sahkan penjual, sahkan meterai, sahkan tarikh dan negara asal, dan tanya empat soalan di atas. Kalau penjual boleh menjawab kesemuanya, perkataan itu baru bermakna."
        }
      ]
    },
    "faqs": [
      {
        "q": "Apa maksud minyak zaitun original?",
        "a": "Dalam penyenaraian marketplace ia biasanya bermaksud bukan tiruan atau bukan barang penjual semula yang tidak dibenarkan. Ia bukan gred dan bukan piawai kualiti."
      },
      {
        "q": "Original sama dengan tulen?",
        "a": "Tidak. Tulen bercakap tentang gred dan ketiadaan campuran dalam botol. Original bercakap tentang siapa yang menjual botol itu kepada anda."
      },
      {
        "q": "Macam mana nak tahu penjual itu rasmi?",
        "a": "Tanya siapa pengedar rasmi jenama itu di Malaysia dan sama ada mereka mempunyai kedai fizikal. Penjual rasmi menjawab kedua-duanya tanpa teragak."
      },
      {
        "q": "Meterai botol penting?",
        "a": "Penting apabila bungkusan sampai. Meterai penutup yang sudah pecah sebelum anda membukanya sebab yang munasabah untuk menolak penghantaran itu."
      },
      {
        "q": "Boleh percaya gambar dalam penyenaraian?",
        "a": "Gambar tidak memberitahu umur minyak, suhu gudang atau sama ada ia stok semasa. Ia sekadar menunjukkan rupa botol, bukan keadaan isinya."
      },
      {
        "q": "Berapa cawangan Berkat Madinah Store?",
        "a": "Lima, semuanya di Selangor: Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak. Cawangan Ampang dan Sri Gombak buka 8:00 pagi hingga 12:00 tengah malam setiap hari; untuk cawangan lain, WhatsApp untuk sahkan waktu buka."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun Arabian Village",
        "path": "products",
        "description": "Minyak zaitun dara perahan sejuk pertama dari Palestin, dengan satu pengedar rasmi di Malaysia."
      },
      {
        "label": "Cara kenal minyak zaitun palsu",
        "path": "blog/cara-kenal-minyak-zaitun-palsu",
        "description": "Tanda-tanda penipuan pada isi botol, dan ujian mana yang benar-benar berfungsi di rumah."
      },
      {
        "label": "Beli minyak zaitun online di Malaysia",
        "path": "blog/beli-minyak-zaitun-online-di-malaysia",
        "description": "Penyenaraian, pembungkusan dan risiko penghantaran dalam cuaca panas."
      }
    ]
  },
  /* ---------------- PRESS round 8 ---------------- */
  {
    "id": "minyak-zaitun-panduan-lengkap",
    "slug": "minyak-zaitun-panduan-lengkap",
    "seoTitle": "Minyak Zaitun: Panduan Lengkap untuk Dapur Malaysia",
    "metaTitle": "Minyak Zaitun: Panduan Lengkap untuk Dapur Malaysia",
    "metaDescription": "Enam soalan asas tentang minyak zaitun, dijawab ringkas, dengan pautan ke bacaan penuh bagi setiap satu. Peta, bukan syarahan.",
    "focusKeyword": "minyak zaitun",
    "relatedKeywords": [
      "apa itu minyak zaitun",
      "gred minyak zaitun",
      "minyak zaitun untuk masak",
      "cara simpan minyak zaitun",
      "beli minyak zaitun di malaysia",
      "rasa minyak zaitun",
      "minyak zaitun extra virgin",
      "minyak zaitun dari mana",
      "harga minyak zaitun",
      "minyak zaitun halal"
    ],
    "category": "Asas minyak zaitun",
    "tags": [
      "panduan",
      "asas",
      "indeks",
      "Malaysia"
    ],
    "h1": "Minyak Zaitun: Enam Soalan Asas dan Ke Mana Nak Baca Lanjut",
    "excerpt": "Satu halaman untuk sesiapa yang baru bermula: apa itu minyak zaitun, gredanya, cara guna, cara simpan, di mana beli, dan kenapa rasanya begitu. Setiap jawapan ringkas, dengan pautan ke bacaan penuh.",
    "keyTakeaway": "Minyak zaitun ialah minyak yang diperah daripada buah zaitun. Gred tertinggi, extra virgin, diperah secara mekanikal tanpa haba dan tanpa pelarut. Di Malaysia semuanya diimport, jadi tarikh tuai dan cara simpan lebih penting di sini berbanding di negara pengeluar.",
    "datePublished": "2026-09-10",
    "dateModified": "2026-09-10",
    "readingTime": 5,
    "hero": {
      "src": "pressMinyakZaitunPanduanLengkapHero",
      "alt": "Barisan pokok zaitun dalam cahaya terakhir petang"
    },
    "ogImage": "/og/blog-minyak-zaitun-panduan-lengkap.jpg",
    "intro": [
      "Halaman ini peta, bukan syarahan. Enam soalan yang paling kerap ditanya tentang minyak zaitun, setiap satu dijawab dalam beberapa ayat, dengan pautan ke artikel yang mengupasnya sepenuhnya.",
      "Kalau anda tahu soalan mana yang anda ada, terus ke bahagian itu."
    ],
    "sections": [
      {
        "heading": "Apa itu minyak zaitun dan dari mana ia datang?",
        "id": "apa-dan-dari-mana",
        "blocks": [
          {
            "type": "p",
            "text": "Minyak zaitun ialah minyak yang diperah daripada buah pokok zaitun, sama seperti jus diperah daripada buah lain. Zaitun ialah buahnya; minyak zaitun ialah minyaknya. Buah itu dituai, dikisar menjadi pes, dan minyaknya diasingkan secara mekanikal tanpa haba jika ia hendak dipanggil perahan sejuk."
          },
          {
            "type": "p",
            "text": "Malaysia tidak menanam zaitun, jadi setiap botol di sini diimport. Kisah dari ladang ke botol ada dalam [minyak zaitun Palestin](/blog/minyak-zaitun-palestin-dari-ladang-ke-botol), dan sebab kategori ini membesar di sini dalam [kenapa minyak zaitun semakin popular](/blog/mengapa-minyak-zaitun-semakin-popular-di-malaysia)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPanduanLengkapInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Apa beza gred pada label?",
        "id": "gred",
        "blocks": [
          {
            "type": "p",
            "text": "Extra virgin ialah gred tertinggi: diperah secara mekanikal, tanpa haba dan tanpa pelarut, dan lulus had keasidan 0.8 peratus. Gred ditapis, yang sering dilabel pure atau light, dibuat daripada minyak yang gagal ujian itu kemudian dibersihkan. Pomace pula diekstrak daripada hampas perahan."
          },
          {
            "type": "p",
            "text": "Perbezaan itu terasa di lidah, bukan hanya pada harga. Tangga gred penuh ada dalam [apa itu minyak zaitun extra virgin](/blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPanduanLengkapInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Boleh guna untuk masak Melayu?",
        "id": "guna-di-dapur",
        "blocks": [
          {
            "type": "p",
            "text": "Boleh, untuk kebanyakan masakan. Minyak zaitun dara ekstra mula berasap pada kira-kira 190 hingga 210 darjah Celsius, sedangkan tumis biasa di rumah berlegar antara 140 hingga 180 darjah. Yang di luar jangkauannya hanyalah kuali di api penuh dan goreng dalam minyak banyak."
          },
          {
            "type": "p",
            "text": "Panduan hidangan demi hidangan ada dalam [minyak zaitun untuk masak](/blog/minyak-zaitun-untuk-masak-panduan-dapur), dan penggunaan mentah dalam [salad dan hidangan sejuk](/blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPanduanLengkapInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Macam mana nak simpan?",
        "id": "simpan",
        "blocks": [
          {
            "type": "p",
            "text": "Jauh dari haba dan cahaya, dengan penutup rapat. Botol yang belum dibuka tahan sehingga kira-kira lapan belas bulan; selepas dibuka, rasanya bertahan kira-kira dua bulan. Almari sebelah dapur ialah tempat paling teruk kerana ia panas sepanjang hari."
          },
          {
            "type": "p",
            "text": "Peti sejuk tidak perlu, tetapi juga bukan bahaya: minyak sejuk berkabus dan memekat, kemudian jernih semula pada suhu bilik tanpa kehilangan apa-apa. Butirannya dalam [cara simpan minyak zaitun](/blog/cara-simpan-minyak-zaitun)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPanduanLengkapInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Di mana nak beli dan berapa harganya?",
        "id": "beli-dan-harga",
        "blocks": [
          {
            "type": "p",
            "text": "Tiga tempat: rak pasar raya, kedai runcit Arab, dan penyenaraian dalam talian. Kedai runcit Arab selalunya mempunyai pusing ganti stok lebih laju kerana minyak zaitun barang teras di situ, jadi botolnya cenderung lebih segar berbanding rak pasar raya yang terang dan suam."
          },
          {
            "type": "p",
            "text": "Untuk harga dan cara mengira seliter, lihat [harga minyak zaitun di Malaysia](/blog/harga-minyak-zaitun-di-malaysia). Untuk lokasi di Lembah Klang, lihat [di mana beli di Kuala Lumpur](/blog/di-mana-beli-minyak-zaitun-di-kuala-lumpur)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPanduanLengkapInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Kenapa rasanya pahit dan pedas?",
        "id": "kenapa-rasa-begitu",
        "blocks": [
          {
            "type": "p",
            "text": "Kerana sebatian polifenol yang masih tinggal dalam minyak yang tidak ditapis. Rasa pahit di lidah dan pedas yang mencengkam di pangkal tekak ialah tanda minyak itu masih hidup, bukan tanda ia rosak. Minyak yang datar dan berlilin tanpa kesan akhir itulah yang patut dicurigai."
          },
          {
            "type": "table",
            "head": [
              "Soalan",
              "Jawapan ringkas",
              "Baca lanjut"
            ],
            "rows": [
              [
                "Apa itu minyak zaitun?",
                "Minyak yang diperah daripada buah zaitun",
                "Minyak zaitun Palestin"
              ],
              [
                "Gred mana yang terbaik?",
                "Extra virgin untuk mentah dan haba sederhana",
                "Apa itu minyak zaitun extra virgin"
              ],
              [
                "Boleh masak dengannya?",
                "Boleh, di bawah 190 darjah Celsius",
                "Minyak zaitun untuk masak"
              ],
              [
                "Perlu masuk peti sejuk?",
                "Tidak perlu, dan juga bukan bahaya",
                "Cara simpan minyak zaitun"
              ],
              [
                "Halal atau tidak?",
                "Ia buah yang diperah, tanpa bahan haiwan",
                "Status halal minyak zaitun"
              ],
              [
                "Macam mana kenal yang asli?",
                "Gred, tarikh, negara asal, dan rasa",
                "Cara memilih minyak zaitun dara asli"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPanduanLengkapInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      },
      {
        "heading": "Apa yang perlu disemak sebelum bayar?",
        "id": "sebelum-bayar",
        "blocks": [
          {
            "type": "p",
            "text": "Empat perkara, dan semuanya mengambil masa kurang seminit di hadapan rak. Perkataan extra virgin olive oil ditulis penuh, bukan versi yang dipendekkan. Satu tarikh, dan tarikh tuai lebih berguna daripada tarikh luput. Satu negara asal yang dinamakan. Dan botol yang tidak berdiri lama di bawah lampu rak yang suam."
          },
          {
            "type": "p",
            "text": "Ujian penuh, termasuk ujian rasa di rumah, ada dalam [cara memilih minyak zaitun dara asli](/blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia). Status halal pula dikupas dalam [status halal minyak zaitun](/blog/status-halal-minyak-zaitun)."
          },
          {
            "type": "image",
            "src": "pressMinyakZaitunPanduanLengkapInline",
            "alt": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Mula dari mana",
      "blocks": [
        {
          "type": "p",
          "text": "Kalau ini botol pertama anda, mulakan dengan gred dan rasa: baca [apa itu extra virgin](/blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain), kemudian [rasa minyak zaitun](/blog/rasa-minyak-zaitun-pahit-dan-pedas). Selebihnya dalam jadual di atas boleh ditunggu sehingga anda memerlukannya."
        }
      ]
    },
    "faqs": [
      {
        "q": "Apa maksud minyak zaitun dara?",
        "a": "Itu istilah Melayu untuk virgin, iaitu minyak yang diperah secara mekanikal tanpa penapisan. Extra virgin ialah gred tertinggi dalam kumpulan itu."
      },
      {
        "q": "Minyak zaitun halal?",
        "a": "Ia buah yang diperah, tanpa bahan berasaskan haiwan dan tanpa alkohol. Butiran tentang status dan apa yang perlu disemak ada pada artikel halal."
      },
      {
        "q": "Minyak zaitun boleh untuk goreng?",
        "a": "Untuk goreng cetek pada haba sederhana, boleh. Untuk goreng dalam minyak banyak, minyak tapisan yang murah pilihan yang lebih masuk akal."
      },
      {
        "q": "Kenapa minyak zaitun mahal di Malaysia?",
        "a": "Semuanya diimport, jadi tambang, duti, gred dan tahun tuai semuanya duduk dalam harga rak. Artikel harga mengupas setiap bahagiannya."
      },
      {
        "q": "Berapa lama minyak zaitun boleh disimpan?",
        "a": "Sehingga kira-kira lapan belas bulan jika belum dibuka, dan kira-kira dua bulan untuk rasa selepas dibuka. Bau ialah ujian yang paling boleh dipercayai."
      },
      {
        "q": "Kenapa minyak saya jadi keruh?",
        "a": "Biasanya kerana sejuk. Kabus itu perubahan fizikal, bukan tanda rosak, dan ia jernih semula dalam kira-kira sejam pada suhu bilik."
      }
    ],
    "related": [
      {
        "label": "Minyak zaitun Arabian Village",
        "path": "products",
        "description": "Minyak zaitun dara perahan sejuk pertama dari Palestin, dalam 250 ml dan 500 ml."
      },
      {
        "label": "Mengapa minyak zaitun semakin popular di Malaysia",
        "path": "blog/mengapa-minyak-zaitun-semakin-popular-di-malaysia",
        "description": "Apa yang berubah dalam pasaran Malaysia, dan kenapa kategori ini membesar di sini."
      },
      {
        "label": "Minyak zaitun untuk masak: panduan dapur",
        "path": "blog/minyak-zaitun-untuk-masak-panduan-dapur",
        "description": "Hidangan demi hidangan, di mana minyak zaitun sesuai dalam dapur Malaysia."
      },
      {
        "label": "Cara simpan minyak zaitun",
        "path": "blog/cara-simpan-minyak-zaitun",
        "description": "Haba, cahaya dan penutup botol, dan kenapa peti sejuk bukan jawapannya."
      }
    ]
  },
];
