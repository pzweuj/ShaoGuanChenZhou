export type Photo = {
  kind: "photo";
  src: string;
  width: number;
  height: number;
  alt: string;
  artist: string;
  license: string;
  href: string;
  note?: string;
};

export type Pic = Photo;

export type Stop = {
  id: string;
  name: string;
  note: string;
  lon?: number;
  lat?: number;
  hollow?: boolean;
  action: "drive" | "marker" | "search";
  keyword: string;
};

export type Moment = {
  time: string;
  title: string;
  detail: string;
  tags?: { tone: "eat" | "charge" | "hard"; label: string }[];
  pic?: Pic;
};

export type Dish = {
  name: string;
  spicy: "ok" | "ask" | "hot";
  note: string;
  pic?: Pic;
};

export type Charge = {
  title: string;
  text: string;
  phone?: string;
  phoneText?: string;
  search?: string;
};

export type DayId = "d1" | "d2" | "d3" | "d4" | "d5";

export type DayPlan = {
  id: DayId;
  date: string;
  tab: string;
  bar: string;
  title: string;
  overview?: string;
  summary: string;
  sleep: string;
  weather: string;
  distance: string;
  lead: Pic | null;
  mapCaption: string;
  route: DayId;
  cutAt?: { lon: number; lat: number };
  stops: Stop[];
  inset?: {
    title: string;
    caption: string;
    stops: Stop[];
  };
  walk?: { title: string; steps: string[] };
  timeline: Moment[];
  foodIntro: string;
  dishes: Dish[];
  charges: Charge[];
  notes: string[];
};

const nanhua: Photo = {
  kind: "photo",
  src: "/photos/nanhua.webp",
  width: 1400,
  height: 1050,
  alt: "南华寺宝林道场山门",
  artist: "CenkX",
  license: "公有领域",
  href: "https://commons.wikimedia.org/wiki/File:Nanhua_Temple_gate.JPG",
};

const fengcai: Photo = {
  kind: "photo",
  src: "/photos/fengcai.webp",
  width: 658,
  height: 586,
  alt: "韶关风采楼夜景",
  artist: "竹围墙",
  license: "CC BY-SA 3.0",
  href: "https://commons.wikimedia.org/wiki/File:Fengcailou.jpg",
};

const fog: Photo = {
  kind: "photo",
  src: "/photos/xiaodongjiang.webp",
  width: 1400,
  height: 1050,
  alt: "雾漫小东江，江面薄雾和一只小船",
  artist: "Karentang123",
  license: "CC BY-SA 4.0",
  href: "https://commons.wikimedia.org/wiki/File:Natural_fog_pervades_Dongjiang_Lake_of_China.jpg",
  note: "作者说明这张是小东江上的雾。用来认景，不保证 10/4 当天的雾有这么厚。",
};

const tofu: Photo = {
  kind: "photo",
  src: "/photos/tofu.webp",
  width: 1200,
  height: 900,
  alt: "一盘客家酿豆腐",
  artist: "Mx. Granger",
  license: "CC0",
  href: "https://commons.wikimedia.org/wiki/File:%E9%85%BF%E8%B1%86%E8%85%90_2.jpg",
  note: "深圳馆子的实拍，用来认菜，不是韶关或郴州某一家店。",
};

const gaoyiling: Photo = {
  kind: "photo",
  src: "/photos/gaoyiling.webp",
  width: 1280,
  height: 960,
  alt: "高椅岭丹霞，绿色山丘和深色岩层",
  artist: "Huangdan2060",
  license: "CC0",
  href: "https://commons.wikimedia.org/wiki/File:Mount_Gaoyiling_in_Chenzhou,_Hunan,_China5.jpg",
  note: "2018年6月拍的高椅岭。用来认景，不是10/3当天。",
};

const museumPhoto: Photo = {
  kind: "photo",
  src: "/photos/museum.webp",
  width: 1280,
  height: 691,
  alt: "郴州市博物馆正门",
  artist: "FradonStar",
  license: "CC BY 4.0",
  href: "https://commons.wikimedia.org/wiki/File:%E9%83%B4%E5%B7%9E%E5%B8%82%E5%8D%9A%E7%89%A9%E9%A6%86_20250710_01.jpg",
  note: "2025年7月的新馆正门。",
};

const yuhouPhoto: Photo = {
  kind: "photo",
  src: "/photos/yuhou.webp",
  width: 1280,
  height: 853,
  alt: "郴州裕后街沿河的白墙黛瓦",
  artist: "Auongkinghe",
  license: "CC BY-SA 4.0",
  href: "https://commons.wikimedia.org/wiki/File:%E8%A3%95%E5%90%8E%E9%87%8C_20240125.jpg",
  note: "2024年1月拍的裕后里，和西岸古街隔江。当天不会有雪。",
};

const yangtianPhoto: Photo = {
  kind: "photo",
  src: "/photos/yangtian.webp",
  width: 1067,
  height: 800,
  alt: "仰天湖大草原入口，山坡上有一座风车",
  artist: "百度百科",
  license: "词条配图",
  href: "https://baike.baidu.com/item/%E9%83%B4%E5%B7%9E%E5%B8%82%E4%BB%B0%E5%A4%A9%E6%B9%96%E5%A4%A7%E8%8D%89%E5%8E%9F%E6%99%AF%E5%8C%BA/64930992",
  note: "百科概要图，门口写着仰天湖大草原。用来认景，不是10/5当天。",
};

const huangpu: Stop = {
  id: "huangpu",
  name: "黄埔出发",
  note: "图上是黄埔区人民政府，只作出发方位。导航前改成你们的上车点。",
  lon: 113.4751469,
  lat: 23.184007,
  hollow: true,
  action: "search",
  keyword: "黄埔",
};

const nanhuaStop: Stop = {
  id: "nanhua",
  name: "南华寺",
  note: "门票 20 元，停车场免费。坐标对得上 OSM 里的南华寺。",
  lon: 113.6316237,
  lat: 24.649105,
  action: "drive",
  keyword: "南华寺",
};

const maba: Stop = {
  id: "maba",
  name: "马坝镇",
  note: "这是镇所在的位置，不是某一家餐馆。农家菜在镇里找。",
  lon: 113.5938029,
  lat: 24.6798812,
  action: "marker",
  keyword: "马坝镇",
};

const hotel: Stop = {
  id: "hotel",
  name: "7天酒店旁 · 西河汽车站",
  note: "店在武江区惠民南路 2 号向阳大厦，西河客运站旁边。图上是惠民南路的西河汽车站，不是大堂。",
  lon: 113.5849066,
  lat: 24.8017278,
  action: "drive",
  keyword: "韶关惠民南路2号向阳大厦",
};

const fengcaiStop: Stop = {
  id: "fengcai",
  name: "风采楼",
  note: "在浈江对岸。从酒店打车大约 10 分钟，步行要 30 分钟以上。",
  lon: 113.5942886,
  lat: 24.8101607,
  action: "marker",
  keyword: "风采楼",
};

const bainian: Stop = {
  id: "bainian",
  name: "百年东街",
  note: "骑楼夜游。晚餐可以就在东街。",
  lon: 113.5932755,
  lat: 24.8148194,
  action: "marker",
  keyword: "百年东街 韶关",
};

const guangfu: Stop = {
  id: "guangfu",
  name: "广富新街",
  note: "和百年东街、风采楼连在一起走。",
  lon: 113.592306,
  lat: 24.8162848,
  action: "marker",
  keyword: "广富新街 韶关",
};

const qingshi: Stop = {
  id: "qingshi",
  name: "青石街",
  note: "老字号面店在这一带。公开地图没有对上同名的街，用搜索。",
  action: "search",
  keyword: "青石街 韶关",
};

const southGate: Stop = {
  id: "south-gate",
  name: "高椅岭南门售票处",
  note: "OSM 有「高椅岭景区南门售票处」。门票 92 元，提前一天网上买。",
  lon: 113.1605332,
  lat: 25.9649352,
  action: "drive",
  keyword: "高椅岭景区南门",
};

const bailang: Stop = {
  id: "bailang",
  name: "东江湖方位 · 白廊镇",
  note: "白廊镇在东江湖东岸，只用来看方向。住宿在东江街道捂洞村新屋头组，不要把导航终点设在这个点上。",
  lon: 113.3945702,
  lat: 25.9196939,
  hollow: true,
  action: "search",
  keyword: "东江街道捂洞村新屋头组",
};

const museum: Stop = {
  id: "museum",
  name: "郴州市博物馆",
  note: "OSM 名称就是郴州市博物馆。离五岭广场大约 9 公里，打车约 20 分钟。",
  lon: 113.1030301,
  lat: 25.7992412,
  action: "drive",
  keyword: "郴州市博物馆",
};

const wuling: Stop = {
  id: "wuling",
  name: "五岭广场",
  note: "晚上从这里走到地下商场，再去兴旺步行街、五岭阁。",
  lon: 113.0077166,
  lat: 25.7744146,
  action: "marker",
  keyword: "五岭广场",
};

const xingwang: Stop = {
  id: "xingwang",
  name: "兴旺步行街",
  note: "夜市和吃饭可以放在这里。",
  lon: 113.0264622,
  lat: 25.8009605,
  action: "marker",
  keyword: "兴旺步行街 郴州",
};

const wulingge: Stop = {
  id: "wulingge",
  name: "五岭阁",
  note: "看夜景。离五岭广场很近。",
  lon: 113.0101082,
  lat: 25.7681218,
  action: "marker",
  keyword: "五岭阁 郴州",
};

const xinghe: Stop = {
  id: "xinghe",
  name: "郴州星河大酒店",
  note: "公开检索没有对上唯一的门牌，所以图上不猜点。设施栏只写了免费停车场。",
  action: "search",
  keyword: "郴州星河大酒店",
};

const yangtian: Stop = {
  id: "yangtian",
  name: "仰天湖大草原",
  note: "OSM 景点名「仰天湖大草原景区」，不是售票亭门口。这天不开自己的车。",
  lon: 112.8336773,
  lat: 25.5130725,
  action: "marker",
  keyword: "仰天湖大草原",
};

const tianlong: Stop = {
  id: "tianlong",
  name: "天龙汽车站",
  note: "832 路旅游专线起点。公开地图没对上这个站，用搜索。",
  action: "search",
  keyword: "郴州天龙汽车站",
};

const yuhou: Stop = {
  id: "yuhou",
  name: "裕后街",
  note: "离五岭广场大约 4–5 公里，打车或公交。化龙桥、鹊仙桥亮灯后拍。",
  lon: 113.0335728,
  lat: 25.7897134,
  action: "marker",
  keyword: "裕后街 郴州",
};

const qujiangSa: Stop = {
  id: "qujiang-sa",
  name: "曲江服务区",
  note: "京港澳高速上的曲江服务区，可作返程快充点。市区快充也行。",
  lon: 113.5904627,
  lat: 24.6416285,
  action: "drive",
  keyword: "曲江服务区",
};

const shaoguanFood: Dish[] = [
  {
    name: "薄皮蒸饺",
    spicy: "ok",
    note: "蔡玉皎薄皮蒸饺。认这笼蒸饺就行。",
  },
  {
    name: "冷水猪肚",
    spicy: "ok",
    note: "不辣，适合直接点。",
  },
  {
    name: "姜葱鸡",
    spicy: "ok",
    note: "姜和葱为主，不走辣。",
  },
  {
    name: "客家酿豆腐",
    spicy: "ask",
    note: "点单可以说免辣。",
    pic: tofu,
  },
  {
    name: "冬瓜鸭子汤",
    spicy: "ok",
    note: "汤，不辣。",
  },
  {
    name: "山坑螺",
    spicy: "ask",
    note: "先说免辣。",
  },
  {
    name: "芝麻糊",
    spicy: "ok",
    note: "万家乐芝麻糊，当甜品。",
  },
  {
    name: "利源居的面",
    spicy: "ask",
    note: "青石街老字号。面可以要清汤，南雄菜普遍辣，别的店也先说免辣。",
  },
];

const chenzhouDinner: Dish[] = [
  {
    name: "柴火鱼",
    spicy: "ask",
    note: "可以做不辣。",
  },
  {
    name: "酿豆腐",
    spicy: "ask",
    note: "郴州也有。说一声免辣。",
    pic: tofu,
  },
  {
    name: "坛子肉",
    spicy: "ok",
    note: "酱香为主，不靠辣。",
  },
  {
    name: "烧鸡公",
    spicy: "hot",
    note: "鲜辣。想尝就微辣，或只点一份试味。",
  },
];

const chenzhouMorning: Dish[] = [
  {
    name: "白露塘杀猪粉",
    spicy: "ask",
    note: "早餐别点栖凤渡鱼粉，那碗很辣。杀猪粉要说不辣。",
  },
  {
    name: "清汤鱼粉",
    spicy: "ok",
    note: "早餐的稳妥选择。",
  },
  {
    name: "米饺",
    spicy: "ok",
    note: "早餐或小吃都行。",
  },
  {
    name: "糖油粑粑",
    spicy: "ok",
    note: "甜口小吃，留到晚上裕后街。",
  },
  {
    name: "灯盏糍粑",
    spicy: "ok",
    note: "糯米小吃。夜市可以逛和平路、裕后街、兴旺步行街。",
  },
];

export const days: DayPlan[] = [
  {
    id: "d1",
    date: "2026-10-02",
    tab: "10/2 韶关",
    bar: "10/2 韶关",
    title: "南华寺，晚上过江",
    overview: "南华寺，下午百年东街",
    summary: "黄埔满电出发，曲江下高速。中午之前看完南华寺，马坝吃饭，下午进酒店充电，傍晚再过江。",
    sleep: "7天（韶关百年东街西河客运站店），武江区惠民南路 2 号向阳大厦。免费停车场和充电车位。酒店不在百年东街里面。",
    weather: "韶关有小雨。带一件薄外套，寺里石阶会滑。",
    distance: "黄埔到韶关这段大约 2.5 小时，再开约 40 分钟从马坝到酒店。单程不超过 230 公里。",
    lead: nanhua,
    mapCaption: "黄埔那个点是区人民政府，只作出发方位。酒店点是惠民南路的西河汽车站，向阳大厦在旁边。",
    route: "d1",
    cutAt: { lon: hotel.lon!, lat: hotel.lat! },
    stops: [huangpu, nanhuaStop, maba, hotel],
    inset: {
      title: "夜里过江",
      caption: "酒店到东街打车约 10 分钟。步行要 30 分钟以上，不建议走过去。",
      stops: [hotel, fengcaiStop, bainian, guangfu, qingshi],
    },
    timeline: [
      {
        time: "7:30",
        title: "黄埔满电出发",
        detail: "京港澳高速，曲江出口下。躲开出城高峰。",
        tags: [{ tone: "charge", label: "满电" }],
      },
      {
        time: "10:15–12:30",
        title: "南华寺",
        detail: "中轴线两小时够。想吃素斋就赶 11:30 的午斋。门票 20 元，停车场免费。",
        tags: [{ tone: "hard", label: "素斋 11:30" }],
      },
      {
        time: "12:30–13:30",
        title: "马坝镇午餐",
        detail: "吃农家菜，比景区便宜。",
        tags: [{ tone: "eat", label: "吃饭" }],
      },
      {
        time: "14:15",
        title: "到酒店，入住午休",
        detail: "先问前台：充电桩怎么用、要不要登记车牌，确认桩能用、没被油车占。",
        tags: [{ tone: "charge", label: "先确认桩" }],
      },
      {
        time: "17:30–21:00",
        title: "过江看灯",
        detail: "风采楼亮灯，百年东街骑楼，广富新街，再沿江边走。晚餐就在东街或青石街。回酒店打车。",
        pic: fengcai,
      },
    ],
    foodIntro: "晚饭在百年东街或青石街。按不太能吃辣来筛，南雄菜先说免辣。",
    dishes: shaoguanFood,
    charges: [
      {
        title: "今晚这充是全段最关键的",
        text: "过夜慢充或快充都算一整晚。车停在酒店免费停车场。第二天去高椅岭，就靠这一晚补满。",
        search: "韶关惠民南路2号向阳大厦",
      },
    ],
    notes: [
      "夜游可以走：酒店 → 西河体育公园 → 过桥 → 百年东街 → 风采楼 → 江边。体育公园没有对上公开坐标，打车到东街再走更省事。",
      "北园小食店也在这片，没有单独的菜图，进店挑不辣的小食。",
    ],
  },
  {
    id: "d2",
    date: "2026-10-03",
    tab: "10/3 高椅岭",
    bar: "10/3 高椅岭",
    title: "下午进山，天黑前下山",
    overview: "中午抵达高椅岭，晚上进入东江湖",
    summary: "早上退房去高椅岭南门。中午在景区外吃饭并顺路快充，下午进园，出园再去东江湖。",
    sleep: "东江街道捂洞村新屋头组。导航搜这个地址。",
    weather: "韶关到资兴这一带有小雨。龙脊背陡、几乎没遮阴，鞋要抓地，带雨具、水和帽子。",
    distance: "韶关到高椅岭南门大约 2.5 小时，高速为主。出园后再开约 50 分钟到民宿。",
    lead: gaoyiling,
    mapCaption: "实线只画到南门。白廊镇那个空心点在东江湖东岸，用来看湖在景区东边，不是捂洞村新屋头组。",
    route: "d2",
    cutAt: { lon: southGate.lon!, lat: southGate.lat! },
    stops: [hotel, southGate, bailang],
    walk: {
      title: "园内步行示意",
      steps: ["巨石阵", "登天云梯", "美丽滩", "悬空栈道", "龙脊背", "巨蜥湖"],
    },
    timeline: [
      {
        time: "8:30",
        title: "早餐后退房",
        detail: "韶关出发，去高椅岭南门。",
      },
      {
        time: "11:30–13:00",
        title: "景区外午餐，顺路快充",
        detail: "高椅岭风景区公共充电站有 120kW 桩。吃饭时插上，大约一小时。排队超过 20 分钟就放弃，直接走。",
        tags: [
          { tone: "eat", label: "吃饭" },
          { tone: "charge", label: "可放弃" },
        ],
      },
      {
        time: "14:00–17:30",
        title: "进园，天黑前下山",
        detail: "售票和入园到 17:20，闭园 19:00。山顶没有路灯，日落后尽快出园。不要 18:40 还在山上。全程大约 2.5–3 小时。",
        pic: gaoyiling,
        tags: [{ tone: "hard", label: "17:20 停止入园" }],
      },
      {
        time: "18:20",
        title: "出园去民宿",
        detail: "开车约 50 分钟。导航搜「东江街道捂洞村新屋头组」。",
      },
      {
        time: "19:30 后",
        title: "江边散步，早点睡",
        detail: "夜景规模不大，别抱太高预期。明天 5:20 起。",
        tags: [{ tone: "hard", label: "早睡" }],
      },
    ],
    foodIntro: "早餐还是韶关那几样，菜在 10/2。景区和湖边正餐溢价高、也不稳，午餐在景区外解决。想吃好的，回东江镇。",
    dishes: [],
    charges: [
      {
        title: "中午：高椅岭，能充就充",
        text: "120kW。排队超过 20 分钟就走，不把下午的入园时间押在充电排队上。",
        search: "高椅岭风景区公共充电站",
      },
      {
        title: "今晚：游客中心必须充满",
        text: "东江湖游客中心充电站：120kW 快充 12 个，7kW 慢充 4 个。这是这一段最稳的点。",
        search: "东江湖游客中心充电站",
      },
    ],
    notes: [
      "只走指定路线。龙脊背陡，鞋要抓地。",
      "门票提前一天在网上买，现场排队会吃掉进园时间。",
    ],
  },
  {
    id: "d3",
    date: "2026-10-04",
    tab: "10/4 东江",
    bar: "10/4 东江",
    title: "早上看雾，下午进郴州",
    summary: "5:20 起来赶小东江。雾薄也去；雨大就改成睡到自然醒，再骑白廊。中午退房进郴州，下午博物馆，晚上五岭。",
    sleep: "郴州星河大酒店，连住两晚。入住先问有没有充电桩。",
    weather: "小雨转阴。雾会有，但偏薄，光线平，属于能看到、不一定出片。真正的晴天窗口在 10/5–10/6。",
    distance: "民宿到郴州大约 40 分钟。博物馆离五岭广场大约 9 公里。",
    lead: fog,
    mapCaption: "起点仍用白廊镇代表东江湖一带，实际从东江街道捂洞村新屋头组出发。星河大酒店没有唯一公开门牌，搜店名。",
    route: "d3",
    cutAt: { lon: wuling.lon!, lat: wuling.lat! },
    stops: [bailang, museum, wuling, xinghe],
    inset: {
      title: "晚上在市区",
      caption: "五岭广场、兴旺步行街、五岭阁都打车或步行能串起来。",
      stops: [wuling, xingwang, wulingge],
    },
    walk: {
      title: "园内步行示意",
      steps: ["游客中心坐大巴到 2 号桥", "看渔夫撒网", "栈道走到 3 号桥", "龙景峡谷可选，台阶多"],
    },
    timeline: [
      {
        time: "5:20",
        title: "起床去游客中心",
        detail: "让民宿送，或打车。大约 2 公里，几分钟。买观湖线，78.8 元。",
        tags: [{ tone: "hard", label: "早起" }],
      },
      {
        time: "6:00–8:30",
        title: "2 号桥到 3 号桥",
        detail: "黄金时段就是这会儿。大巴到 2 号桥，看渔夫撒网，再沿栈道走到 3 号桥。",
        pic: fog,
      },
      {
        time: "8:30–11:00",
        title: "龙景峡谷，或回去睡",
        detail: "峡谷台阶多，大约 1.5–2 小时。和补觉二选一，别两个都硬撑。",
      },
      {
        time: "若雨势明显",
        title: "改白廊，不亏",
        detail: "睡到自然醒，再走白廊环湖骑行。免费，也轻松。心态上不亏。",
        tags: [{ tone: "hard", label: "备选" }],
      },
      {
        time: "12:00",
        title: "退房去星河大酒店",
        detail: "大约 40 分钟。入住先问充电桩。没有的话，下午用市区的兜底站。",
        tags: [{ tone: "charge", label: "先问桩" }],
      },
      {
        time: "14:00–16:30",
        title: "郴州市博物馆",
        detail: "10/4 是星期日。国庆 10 月 1 日到 7 日（或至 8 日）9:00–17:00 开放，16:30 停止入馆，不必卡周一闭馆。公众号「郴州市博物馆」预约，15:30 前进馆。",
        pic: museumPhoto,
        tags: [{ tone: "hard", label: "16:30 停止入馆" }],
      },
      {
        time: "17:30–20:30",
        title: "五岭广场到五岭阁",
        detail: "地下商场，兴旺步行街，五岭阁看夜景。晚餐吃柴火鱼或酿豆腐，都要说不辣。烧鸡公只试味。",
        tags: [{ tone: "eat", label: "吃饭" }],
      },
    ],
    foodIntro: "正餐优先回市区。东江湖边上的馆子溢价高。下面是今晚在市区吃的，按不太能吃辣来筛。",
    dishes: chenzhouDinner,
    charges: [
      {
        title: "星河可能没有桩",
        text: "设施栏只写了免费停车场。没有桩就去兜底：高湾变充电站（65kW×12，另有 7kW×8），或五岭站（加油站旁）。都在市区几公里内。车今晚和明晚基本不动，D5 出发前必须是满的。",
        search: "高湾变充电站 郴州",
      },
    ],
    notes: [
      "观湖线提前一天买。",
      "胖婆捆鸭、临武鸭是鲜辣口，不单列。想尝就微辣，或只点一份试味。",
    ],
  },
  {
    id: "d4",
    date: "2026-10-05",
    tab: "10/5 仰天湖",
    bar: "10/5 仰天湖",
    title: "仰天湖，不开自己的车",
    summary: "早上坐 832 或确认过的直通车上山，按时下山。晚上再去裕后街。烟花不建议等。",
    sleep: "还是星河大酒店。车继续停着充电。",
    weather: "多云转晴。资兴清晨 13–14℃，仰天湖海拔 1314 米，风大，体感更低。短袖加防风外套或冲锋衣，雨具、防晒、防滑鞋都带上。",
    distance: "从市区上山不用自己开车。裕后街离五岭广场大约 4–5 公里。",
    lead: yangtianPhoto,
    mapCaption: "这天不开自己的车。线只表示五岭广场和仰天湖的方位，下午按景区的车回来。",
    route: "d4",
    cutAt: { lon: yangtian.lon!, lat: yangtian.lat! },
    stops: [wuling, tianlong, yangtian],
    inset: {
      title: "晚上去裕后街",
      caption: "打车或公交，大约 4–5 公里。化龙桥、鹊仙桥用搜索找。乐之书店在那边，可以歇脚。",
      stops: [
        wuling,
        yuhou,
        {
          id: "hualong",
          name: "化龙桥",
          note: "亮灯后适合拍。公开地图没对上这座桥。",
          action: "search",
          keyword: "化龙桥 郴州",
        },
        {
          id: "quexian",
          name: "鹊仙桥",
          note: "和化龙桥一起看夜景。",
          action: "search",
          keyword: "鹊仙桥 郴州",
        },
        {
          id: "lezhi",
          name: "乐之书店",
          note: "逛累了可以坐一会儿。",
          action: "search",
          keyword: "乐之书店 郴州",
        },
      ],
    },
    timeline: [
      {
        time: "早上",
        title: "方案 A：832 路",
        detail: "打车到天龙汽车站。国庆流水发班，满 26 人发车。电话 0735-8183337。提前 30 分钟到站。玩完原路返回。",
        tags: [{ tone: "hard", label: "提前 30 分钟" }],
      },
      {
        time: "或者",
        title: "方案 B：五岭广场直通车",
        detail: "往年有过五岭广场集合的加班车，线路会调。必须在 9/30–10/2 打景区电话，或问星河前台。确认了再用。",
      },
      {
        time: "8:00–18:00",
        title: "景区",
        detail: "直通车 169 元，含门票。提前一天订。山上吃的贵且一般，自带水和干粮。",
        pic: yangtianPhoto,
      },
      {
        time: "17:00 前",
        title: "按时下山",
        detail: "下午 5 点后下山的车很少。篝火烟花大约 20:00 散场，直通车末班多在 16:40–17:30。要看烟花就得自己想办法下山，不建议。",
        tags: [{ tone: "hard", label: "不等烟花" }],
      },
      {
        time: "晚上",
        title: "裕后街",
        detail: "一江两岸亮灯最出片，戏台常有湘昆。",
        pic: yuhouPhoto,
      },
    ],
    foodIntro: "早上在市区吃粉。山上自带水和干粮。晚上到裕后街再吃小吃，仍然按不辣来点。",
    dishes: chenzhouMorning,
    charges: [
      {
        title: "上山前确认班次",
        text: "832 路国庆流水发班，满 26 人走。五岭广场有没有加班直通车，也打这个电话，或问星河前台。",
        phone: "tel:07358183337",
        phoneText: "拨 0735-8183337",
        search: "郴州天龙汽车站",
      },
      {
        title: "车不动，继续充",
        text: "如果星河没有桩，昨天已经把车放到高湾变或五岭站的话，确认今晚还在充。明天出发前必须满。",
        search: "五岭充电站 郴州",
      },
    ],
    notes: [
      "返程一定按时集合。",
      "10/5 是星期一。博物馆的周一闭馆不影响今天，你们不在馆里。",
    ],
  },
  {
    id: "d5",
    date: "2026-10-06",
    tab: "10/6 返程",
    bar: "10/6 返程",
    title: "韶关补一小时，天黑前到家",
    summary: "8:30 退房。郴州到韶关大约 2 小时，在韶关吃饭并把电补到 90% 以上，再回黄埔。",
    sleep: "今晚到家。",
    weather: "多云转晴。回程比来的时候好开，还是留足余量。",
    distance: "郴州到韶关约 163 公里、2 小时出头。韶关到黄埔约 230 公里、2.5–3 小时。",
    lead: null,
    mapCaption: "黄埔终点仍是区人民政府，到家前改成你们的小区。曲江服务区和市区快充二选一，不必两个都停。",
    route: "d5",
    stops: [
      {
        ...wuling,
        id: "leave-chenzhou",
        name: "郴州市区出发",
        note: "图上用五岭广场代表市区。酒店请搜「郴州星河大酒店」，不要把广场当成退房的门。",
        action: "search",
        keyword: "郴州星河大酒店",
      },
      hotel,
      qujiangSa,
      huangpu,
    ],
    timeline: [
      {
        time: "8:30",
        title: "退房出发",
        detail: "这是为了给韶关那 2 小时留余量。不想早起的话，最晚 9:30 走，18 点前仍能到家，但韶关就不能再拖。",
      },
      {
        time: "11:00–13:30",
        title: "韶关休息、午饭、快充",
        detail: "补到 90% 以上再上高速。曲江服务区或市区快充站都可以。饭看 10/2 那几道不辣的。",
        tags: [
          { tone: "eat", label: "吃饭" },
          { tone: "charge", label: "到 90%" },
        ],
      },
      {
        time: "13:30",
        title: "韶关回黄埔",
        detail: "用导航看佛冈、太和服务区的桩忙不忙，当作备选，不提前押在某一个服务区。",
      },
      {
        time: "16:30–17:00",
        title: "到家",
        detail: "留了大约 1 小时余量，目标是 18 点前进门。",
        tags: [{ tone: "hard", label: "18 点前" }],
      },
    ],
    foodIntro: "午饭在韶关解决，菜和 10/2 相同，不在这里再铺一遍。吃完就走。",
    dishes: [],
    charges: [
      {
        title: "出发前必须是满的",
        text: "星河这两晚把电补满。韶关再快充到 90% 以上。任何一段单程都不超过 230 公里。",
        search: "曲江服务区充电站",
      },
    ],
    notes: [
      "佛冈、太和服务区只做 Plan B，以导航当时的空闲为准。公开地图里没有对上同名的服务区，所以不在图上猜点。",
    ],
  },
];

export const tabs = [
  { id: "overview" as const, label: "总览" },
  ...days.map((day) => ({ id: day.id, label: day.tab })),
];

export type TabId = (typeof tabs)[number]["id"];

export function defaultTab(today: string): TabId {
  return days.find((day) => day.date === today)?.id ?? "overview";
}

export const checks = [
  { id: "id-card", label: "身份证、驾驶证" },
  { id: "clothes", label: "衣服：短袖，另加防风外套或冲锋衣" },
  { id: "rain", label: "雨具、防晒、防滑鞋" },
  { id: "snack", label: "高椅岭和仰天湖各备一瓶水和一点干粮" },
  { id: "nanhua-ticket", label: "南华寺门票已买（20 元）" },
  { id: "gaoyiling-ticket", label: "高椅岭门票已买（92 元）" },
  { id: "dongjiang-ticket", label: "东江湖观湖线已买（78.8 元）" },
  { id: "yangtian-ticket", label: "仰天湖直通车已订（169 元，含门票）" },
  { id: "museum", label: "郴州市博物馆已在公众号预约" },
];

export const chargeOverview: Charge[] = [
  {
    title: "原则",
    text: "每住一晚必补能，白天只顺路补。不把希望押在景区排队上。任何一段单程不超过 230 公里，每段起点按 80% 以上来排。",
  },
  {
    title: "D1 晚 · 韶关 7 天",
    text: "全段最关键的一充。过夜慢充或快充都算一整晚。",
    search: "韶关惠民南路2号向阳大厦",
  },
  {
    title: "D2 中午 · 高椅岭",
    text: "120kW。吃饭时插一小时。排队超过 20 分钟就放弃。",
    search: "高椅岭风景区公共充电站",
  },
  {
    title: "D2 晚 · 东江湖游客中心",
    text: "120kW×12，另有 7kW×4。当晚务必充满。",
    search: "东江湖游客中心充电站",
  },
  {
    title: "D3、D4 · 郴州",
    text: "星河大酒店没写充电桩。兜底是高湾变（65kW×12，7kW×8）和五岭站。两晚连充，D5 出发前必须满。",
    search: "高湾变充电站 郴州",
  },
  {
    title: "D5 · 韶关",
    text: "快充到 90% 以上再上高速。佛冈、太和服务区用导航看忙闲，做备选。",
    search: "曲江服务区充电站",
  },
];

export const weatherOverview = [
  {
    title: "10/2–10/4",
    text: "韶关和资兴有小雨。10/4 早上小雨转阴，雾偏薄、光线平。",
  },
  {
    title: "10/5–10/6",
    text: "多云转晴。资兴清晨 13–14℃。仰天湖 1314 米，风大，再加一件防风外套。",
  },
  {
    title: "10/1 晚上再看一次",
    text: "越远越不准。雨若在 10/4 早上明显变大，雾景就改成睡懒觉加白廊骑行。",
  },
];

export const packing = [
  "短袖，加一件防风外套或冲锋衣",
  "雨具、防晒、防滑或抓地的鞋",
  "高椅岭和仰天湖各备一瓶水和一点干粮",
];

export function shanghaiToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function weekday(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    weekday: "short",
  }).format(new Date(`${date}T12:00:00+08:00`));
}

export function dayStatus(date: string, today: string) {
  if (date === today) return "今天";
  if (date < today) return "已过";
  return "";
}
