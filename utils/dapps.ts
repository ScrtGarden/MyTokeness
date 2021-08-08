import { IconName } from '../src/components/Icons'

interface Dapp {
  icon: IconName
  name: string
  description: string
}

/*
 * Function that will format tokenList from
 * https://github.com/enigmampc/ViewingKeysWizard/blob/master/src/tokens.ts
 */

// const DAPP_LIST = tokenList.reduce((acc, item) => {
//   if (item.type === 'LP' || item.type === 'REWARDS') {
//     const symbol1 = tokenList.find((x) => x.address === item.assets[0])?.symbol
//     const symbol2 = tokenList.find((x) => x.address === item.assets[1])?.symbol
//     if (!symbol1 || !symbol2) {
//       return acc
//     }
//     return {
//       ...acc,
//       [item.address]: {
//         icon: 'secret-swap-logo',
//         name: 'SecretSwap',
//         description: `${item.type} ${symbol1}-${symbol2}`,
//       },
//     }
//   }
//   return acc
// }, {})

const TESTNET_DAPPS: Record<string, Dapp> = {
  secret1l56ke78aj9jxr4wu64h4rm20cnqxevzpf6tmfc: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-SEFI',
  },
}

const MAINNET_DAPPS: Record<string, Dapp> = {
  secret17gja535zp09t9mlzzxndqqg4gzvhg0vsklhd54: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-ETH',
  },
  secret1cgd6gcc4uyrxmzsmk4tpeta8auzcgwk4n5ngrx: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-USDT',
  },
  secret1he6rzcet6jcwryu544a5zkkadxee4sk0umu703: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP YFI-sSCRT',
  },
  secret1rldr66767a4gz3adkq2vgndwgnxlfqqae4fgen: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-LINK',
  },
  secret17w0wjempgtt8ngn59y7cwlae02kve5jzar4xmw: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-DAI',
  },
  secret1xxvqanj85m7dppplku5782cn9hl8askqd329sv: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-WBTC',
  },
  secret1m8msletvevuj2vsl8rcvqq9esflxmmnd2lf7yd: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-UNI',
  },
  secret1jmv4h3f8rtlxsfaven4kstdaq55pr8rwty8ss5: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-DPI',
  },
  secret1kduh3vlszmg3snq36k6s8l4v8s26z47m3q9haa: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-OCEAN',
  },
  secret102gfpp4hgvytxlxsz8hnjy7uqndmhau3jkzps8: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-RSR',
  },
  secret1v8h6em4ya9m62qusgxqq9w2gdpevtat549l27v: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP ETH-LINK',
  },
  secret1kg8pd6ag4cx72302uflm5n8nau2m6k7q9efck3: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP FATS-sSCRT',
  },
  secret1ket00reye5tuaurqd3lh4kplsz4rjpe7hepmzf: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP OCEAN-LINK',
  },
  secret17de3ltvztmmutujlg3lwlpsmzeeykjzru8et6d: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP ETH-RSR',
  },
  secret1nvqrwwr9942gn89nk44nf2nku6gr7u8tsg6z45: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP WBTC-ETH',
  },
  secret1udzehhadgcpt3na688suy4xtra3sjxv4l42ktn: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP DAI-ETH',
  },
  secret1hsd23gm7ces9rf24e0mryhywlcl4l5903pwrts: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-TUSD',
  },
  secret1xwvxlcpdwfqpezh2gtlmyxmdr8jyedznuus3rj: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP YFI-WBTC',
  },
  secret1hk47f93mnzu702ya0akwn4p4f4gte895v0xpsk: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP WBTC-DAI',
  },
  secret1hat67au4nzpvjxuzz68540cnwng2mujpa23248: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP USDT-ETH',
  },
  secret12kw8cul8ssyvfffyctngzlr0a7c25rcmv2pva2: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP DAI-USDC',
  },
  secret1pprth4wa696lnyhtmpvwpa0x8zhqe6pr4fsrvc: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP OCEAN-ETH',
  },
  secret1azgy8zx6duz2s4yhxqvghsd25gnun6hefy7ff4: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-USDC',
  },
  secret1e9hqygaphtnp34tjv80pzpgm0r8jjug6eduz2c: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP OCEAN-DPI',
  },
  secret15atu5s5aqhkezg44d035nufq80ltwx968vey00: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-SUSHI',
  },
  secret1ysd3f2ydqawlrrjhfarkf35tc57ayca7sqpwqq: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP WBTC-USDT',
  },
  secret169j4wejhtq6s8cqptae09ftjnnm8ekkjk73hgd: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP UNI-OCEAN',
  },
  secret1y2pjf7zaswfvqtfja8uwlzep3h9xjtmupgx6vr: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SNX-ETH',
  },
  secret10phk4mdrz0wcfrmulzcvxfpaeuz20g6eatef08: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP UNI-ETH',
  },
  secret15lsv600d4jrwpl27ewy5vz6dse4kmx7fy7dznd: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP USDT-DAI',
  },
  secret1ej6n3a6zcdchvqxdjwqrj9ks7683m8fhvz9846: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP WBTC-DPI',
  },
  secret1jdvjcplxywh068jzrajdvda87faer9zz268v26: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP YFI-ETH',
  },
  secret1tp25zaypu53g8av4qcr3gdrzujerxze38hm090: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SNX-sSCRT',
  },
  secret1kp9nhawtxgxue2qggnatt73f75vh55c9fq876l: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP OCEAN-RSR',
  },
  secret1nvq2d00293k8vaeagj23c9eg6kjhec4emnpa9c: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP UNI-DAI',
  },
  secret1tq5t8y37yrqh4gatxplmks4k7vw5auslapkpx7: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP WBTC-UNI',
  },
  secret17e9ygy6e990t8gsfe8gf8lg429pncsn22wm9cu: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP ETH-FATS',
  },
  secret1s4e975hvcc37tgunfethl6mc48r6ervw6pzf63: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP USDC-USDT',
  },
  secret1n5qe4k8zf09gh8zdrydcc3jqls4ceww8wzr2kv: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-BAND',
  },
  secret1t37zhqmyfq5qe7zpwczly6lcq7qa2lrey540zq: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP USDT-DPI',
  },
  secret1tylaycndtscnkgalsfsjc8nx0lrqpvla3ajzfj: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP USDT-FATS',
  },
  secret185jen8q6ss5xnja33vj7pvqz49m8frkdekvzpy: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-MKR',
  },
  secret198qgewnmmv7ut6r45pkrknqecxfhmd440aw2gf: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP DAI-MKR',
  },
  secret1qcszs0526shrrkrwycqfurrzhk2nauu7a4lcas: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP ETH-TUSD',
  },
  secret138wwgfj4p7w87dwq8hnjckjhpy6kv76e6ez4me: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-BAC',
  },
  secret1k6ypx2hv28yd73c9ethamru48ke9vetqrjzu26: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-AAVE',
  },
  secret1djl87ynczxgsm0xzcpqslcwkpuppp5tc68yywv: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-BAT',
  },
  secret1853yqdhf2yjnaf2xerhmgsl5dt50t4grh63y3r: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-TORN',
  },
  secret1709qy2smh0r7jjac0qxfgjsqn7zpvgthsdz025: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-SEFI',
  },
  secret1xhvv5uj5fa9yxcuuk4awqw568ve7g05v7fa0vd: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-sSCRT',
  },
  secret1a9pqlergw53c0fc2nh8fuwk6vem4j4z7ywz02s: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SEFI-WBTC',
  },
  secret14rxhuxq79lhfy37htl7xkpwqekyhry59xpvjhn: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP USDT-SEFI',
  },
  secret1tjegqrmat45ur6pwkn3w4tnn7w27azxn6c2q9p: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SEFI-ETH',
  },
  secret1qxklqtynsp0fc9mc6p8vnt8m0jajgwjxwja0w9: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP LINK-ALPHA',
  },
  secret1m76hs58wqxasd7f6au3c7gx8at5xu2ez9kf44l: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-REN',
  },
  secret12pn4fehy0hkymh7p0u8jul395ywez55uhfl96h: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SEFI-FATS',
  },
  secret1qml2ktledypf0m5a7w8p2evgsejlm3qye2hurt: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP BAT-DAI',
  },
  secret1mm7df4ygxwlfg0l70jrrkshlhtp8vv5n7hj9rr: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SEFI-USDC',
  },
  secret17rch628qthxewc07dpgfjmlf28t82ghpld8hqv: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP WSCRT-ETH-SEFI',
  },
  secret13leg3yqs3jfw4cuq5dyqeczkk9grx330dfezvp: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SEFI-LINK',
  },
  secret1ymxsh0sytl7sfq8hkgcs843cd09ude285ndu2f: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SEFI-ENJ',
  },
  secret1t6vfa5wnzqgvlk7u7u6fz9dwltrn44kzr22fh6: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-WSCRT-ETH',
  },
  secret1skmznhm94a8rywghxj3vm4ltllj4n8uy4uklmc: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP ETH-AAVE',
  },
  secret14nlydvrctetjfur4rl20qctscx7mfjf944hyha: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP BAT-UNI',
  },
  secret1kg24nc3v4wm4vzufup8fvmvffxtm8425uwfvqd: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-RUNE',
  },
  secret1zk39zl9h26zjkcuam3hqultqs2nucf0lefxxrj: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP KNC-ETH',
  },
  secret120xdju4pcl9xxntf47chtt0du8cny9lzxu05x9: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP UNI-USDT',
  },
  secret1uf6kk3a6damq93w6gnjj4xyr4xdpj86kzpvrwh: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-ENJ',
  },
  secret1g88sj0xplmutyw0uupk6g6p5qcvjypdf2znpe7: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SEFI-BAC',
  },
  secret1kjefu42ujfdfcm7fq4rk08x30u5z8jtdwvndr3: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP REN-DAI',
  },
  secret1gewshds6yhyry842vnxl9q6krezaatep6rxyt2: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-MANA',
  },
  secret1q6yzuparxlk6ydc5t08zg3hma6e995klwxfwyl: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SEFI-UNI',
  },
  secret1n0gdq68hxeyu5hatqmmz8gcd08x8cs0a0u0pge: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP YFI-SEFI',
  },
  secret1w79c8pemt5k4l0ruzyxc7jkjyg6d623wvve64r: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP DAI-OCEAN',
  },
  secret1cucs46suavgnajd050qxh2923nqtnu7p67zwkj: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SEFI-RSR',
  },
  secret140gcjdue3ywsr3y6088250stamxtv2jhk05c7t: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP ALPHA-sSCRT',
  },
  secret1vrmfs5ql8w3uajer2jqr2x2prffmssa0r8zrhm: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-ZRX',
  },
  secret1dt6lw86drnlfxl5ppnawdw80vtym09p6dhvqg5: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP COMP-sSCRT',
  },
  secret1e60sgjs6vpsa0g30psjtup03urk3ggjdjqg9ln: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP FATS-DAI',
  },
  secret10sy4y68wa6649nw5c7m00zqcqx06tgrem90k4g: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SEFI-MANA',
  },
  secret1le3d0fgkrzd433fdnetdqslfxmugvg0tuaqspe: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-BNB(BSC)',
  },
  secret1mc656zt6g37u2ufqp2tw8kaj5jxpujylfzw8yw: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-DOT(BSC)',
  },
  secret1rwpy396gqqmpxxmkmd98wy9f3m5tsrufx3jdal: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-ETH(BSC)',
  },
  secret1c9ky0x6fj5gc0qw6tedxsng50mjl3szn7xhjeu: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP ETH-ETH(BSC)',
  },
  secret1efcwgj5jn0jdqw387p83lyg0tgfff5xycde84x: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-ADA(BSC)',
  },
  secret14ta2jf4muuem9hl2ktxvlestc260yz97wkmrlv: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-DOGE(BSC)',
  },
  secret1mcknw376ayfqykvvz8grya9kdwtev36luhtmrm: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP sSCRT-USDT(BSC)',
  },
  secret163e9frya0vqar70s4j3na94apf0cffl2rjgmgg: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP USDC-USDC(BSC)',
  },
  secret17udwye2ew0kl8vx3pphyas2ytrru7e0lv7sxrr: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP BNB(BSC)-USDC(BSC)',
  },
  secret1j08nzr6flvfpzx35ahkp23lk9jnte8flux4rly: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP SEFI-BNB(BSC)',
  },
  secret1xprxgq8mmwuauwx4wdea3xkjnvxwz8l9fctzs3: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP ADA(BSC)-DOT(BSC)',
  },
  secret1pzu2paj6syelj2hrgqpaqa7ps77dsxc3l96eul: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP USDT(BSC)-USDT',
  },
  secret1fehemfxexk2yxxzpzgglm4ta2r7f90kwnzcu42: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'LP USDT-BUSD(BSC)',
  },
  secret1y9z3ck449a46r4ku7klkhdxnlq07zh4shc7cuy: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS SEFI-SEFI',
  },
  secret1wuhypk53eukm9xvlzu2z30rtyqfh74qtqgvlvr: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS SEFI-SEFI v2',
  },
  secret1q6y7wz6pev80aadyjsejk5xr2yj4mkrj40zrvn: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS ETH-sSCRT',
  },
  secret1047wugr9wsxuapxgtyr407uy68cw4d6k6tkf8d: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS YFI-sSCRT',
  },
  secret1kma59tlgk66hwpxvjlcc42gys0sz9jc96v4jak: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS USDT-sSCRT',
  },
  secret19y50xzywrz98g6ljxp43fd4q47sl40gkcpm03n: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS LINK-sSCRT',
  },
  secret17negel9x6nsanvjwjy0at5ny66zjyppesytk5n: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS OCEAN-sSCRT',
  },
  secret16q4sz5s4dpzdywrdcnfe8pvucuegrm6m9ksdtd: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS DAI-sSCRT',
  },
  secret1ayl9jv7atks34l0vx9n7y6rl60t32ptycac909: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS WBTC-sSCRT',
  },
  secret1qgaxregzkc6z9wmf4rgp5frj9els95zx3cs93u: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS UNI-sSCRT',
  },
  secret12s2260yswdhry8lljp2m83cvudu0zc67h3t8st: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS AAVE-sSCRT',
  },
  secret1qgfqajzarljueaglzar8tdpgjkmdnr9cqgj9xl: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS COMP-sSCRT',
  },
  secret1fcvxek0quxhsfvh7xc80e7332hhwn2zamvtqcw: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS SNX-sSCRT',
  },
  secret1xdvsf5mah8yhd0ndk2khktkpaqqtat6jwyfecz: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS TUSD-sSCRT',
  },
  secret1hf6tvptq8c5r86dvs037fhmm6m9mclfl5jnhdu: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS KNC-sSCRT',
  },
  secret1gfxwjj5evt9p0wnarheh59shz9kqf7rjf3hjnd: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS BAND-sSCRT',
  },
  secret1q762ytweqslmvsryggnunmry6ahhlwek745rau: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS BAC-sSCRT',
  },
  secret13aukj7v7fg8xzpm343s94vp5x244qk8fxjws0j: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS MKR-sSCRT',
  },
  secret1lsvqk5h647y4qfqyn2lxacdetry22txg9mnfzd: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS SUSHI-sSCRT',
  },
  secret1p4a6pr76r4p2sn324ek2ayagr7qvrchwc0radv: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS RSR-sSCRT',
  },
  secret1sugd87x8ul2jxsqpm7gazhgz6tf9zfwmfwk095: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS USDC-sSCRT',
  },
  secret1q8ddhqvsgrwsrdrnspja70cgeyjhw7kymyxzn5: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS DPI-sSCRT',
  },
  secret1r8nge6cwweezye4n750gpeqkgaqkazax598gpg: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS WSCRT-ETH-sSCRT',
  },
  secret12u4cjgput2uvdv4y9h5h7rs9grxdx582wlvxgj: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS RUNE-sSCRT',
  },
  secret15g78xxtmcuc3y77cj89e2dwu9tg3up54vns9uf: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS TORN-sSCRT',
  },
  secret1uc0k4rwwzccz9a4an773lyuun4l8k4qpvz3k99: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS BAT-sSCRT',
  },
  secret1snr63w7m44ay9pl9sdkppmyqjxqauh7t5gvms7: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS ZRX-sSCRT',
  },
  secret1f9pn0vh8dltxhhpd5qe76ddw3qgl8prufq65yv: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS ENJ-sSCRT',
  },
  secret18ht734kgefpxk49nju3ld8qzzk8g4wcx7tm9ys: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS MANA-sSCRT',
  },
  secret1ra9l5p04sc4pu8vc5djr3c9ds7npmwmzvsee32: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS YFL-sSCRT',
  },
  secret1e3kzrxjg5eyc8t9c4l0m5s4kj0ym4ku7dwj9ru: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS ALPHA-sSCRT',
  },
  secret16n5p4d0gsuj4yu5rcg25paflwcgvtdr0tlwtsa: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS MATIC-sSCRT',
  },
  secret1xkhzk4qa45gpytku2znd2y32j83cl4werlw6gg: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS REN-sSCRT',
  },
  secret1texzs8e40dc40m4phvswxt0e3l5ymmaptzukjz: {
    icon: 'secret-swap-logo',
    name: 'SecretSwap',
    description: 'REWARDS RENBTC-sSCRT',
  },
}

const DAPPS =
  process.env.NEXT_PUBLIC_IS_MAINNET === 'true' ? MAINNET_DAPPS : TESTNET_DAPPS

export { DAPPS }
