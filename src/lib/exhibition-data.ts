export interface Showroom {
  id: string;
  name: string;
  addressLines: string[];
  phone: string;
}

export interface CommunityExhibitions {
  id: string;
  communityName: string;
  showrooms: Showroom[];
}

export const exhibitionData: CommunityExhibitions[] = [
  {
    id: 'galicia',
    communityName: 'Galicia',
    showrooms: [
      {
        id: 'ourense-eulogio',
        name: 'OURENSE',
        addressLines: ['EULOGIO GÓMEZ FRANQUEIRA, 9 BAJO', '32001 OURENSE'],
        phone: '988 213 891 / 92 / 93',
      },
      {
        id: 'ourense-cachamuina',
        name: 'OURENSE - CACHAMUIÑA',
        addressLines: ['CR. DE TRIVES, C-536 KM 6', '32710 OURENSE'],
        phone: '988 519 412',
      },
      {
        id: 'vigo-arenal',
        name: 'VIGO',
        addressLines: ['ARENAL, 58', '36200 VIGO'],
        phone: '986 225 181',
      },
    ],
  },
  {
    id: 'cantabria',
    communityName: 'Cantabria',
    showrooms: [
      {
        id: 'noja-santander',
        name: 'NOJA',
        addressLines: ['AV. SANTANDER, 72', '39180 NOJA'],
        phone: '942 630 629',
      },
      {
        id: 'santander-lealtad',
        name: 'SANTANDER',
        addressLines: ['LEALTAD, 2', '39001 SANTANDER'],
        phone: '942 210 900',
      },
    ],
  },
  {
    id: 'pais-vasco',
    communityName: 'País Vasco',
    showrooms: [
      {
        id: 'bilbao-egana',
        name: 'BILBAO',
        addressLines: ['EGAÑA, 19', '48010 BILBAO (VIZCAYA)'],
        phone: '944 431 950 / 108',
      },
      {
        id: 'vitoria-coronacion',
        name: 'VITORIA',
        addressLines: ['CORONACIÓN VIRGEN BLANCA, 20-22', '01012 VITORIA (ÁLAVA)'],
        phone: '945 150 098',
      },
    ],
  },
  {
    id: 'navarra',
    communityName: 'Navarra',
    showrooms: [
      {
        id: 'pamplona-soto',
        name: 'PAMPLONA',
        addressLines: ['SOTO AIZOAIN, 2', '31013 PAMPLONA'],
        phone: '948 303 724',
      },
    ],
  },
  {
    id: 'valencia',
    communityName: 'Comunidad Valenciana',
    showrooms: [
      {
        id: 'manises-mas-oli',
        name: 'MANISES',
        addressLines: ['AV. MAS DE L’OLI, 182', '46940 MANISES (VALENCIA)'],
        phone: '961 539 820',
      },
      {
        id: 'valencia-cid',
        name: 'VALENCIA',
        addressLines: ['AV. DEL CID, 78', '46018 VALENCIA'],
        phone: '963 794 100',
      },
    ],
  },
  {
    id: 'castilla-y-leon',
    communityName: 'Castilla y León',
    showrooms: [
      {
        id: 'aranda-puerta-nueva',
        name: 'ARANDA DE DUERO',
        addressLines: ['PUERTA NUEVA, 3', '09400 ARANDA DE DUERO (BURGOS)'],
        phone: '947 500 128',
      },
      {
        id: 'burgos-lopidana',
        name: 'BURGOS',
        addressLines: ['ANA MARÍA LOPIDANA, 9', '09005 BURGOS'],
        phone: '947 218 054',
      },
    ],
  },
];
