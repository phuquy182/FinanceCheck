const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;
const Svg = ({
  size = 18,
  children,
  ...p
}) => React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...p
}, children);
const P = d => React.createElement("path", {
  d,
  key: d
});
const ChevronLeft = p => React.createElement(Svg, p, P("m15 18-6-6 6-6"));
const ChevronRight = p => React.createElement(Svg, p, P("m9 18 6-6-6-6"));
const Plus = p => React.createElement(Svg, p, [P("M5 12h14"), P("M12 5v14")]);
const Trash2 = p => React.createElement(Svg, p, [P("M3 6h18"), P("M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"), P("M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2")]);
const Check = p => React.createElement(Svg, p, P("M20 6 9 17l-5-5"));
const Wallet = p => React.createElement(Svg, p, [P("M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"), P("M18 12h.01")]);
const PiggyBank = p => React.createElement(Svg, p, [P("M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"), P("M2 9v1c0 1.1.9 2 2 2h1")]);
const CalendarDays = p => React.createElement(Svg, p, [P("M8 2v4"), P("M16 2v4"), P("M3 10h18"), P("M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"), P("M8 14h.01"), P("M12 14h.01"), P("M16 14h.01")]);
const Pencil = p => React.createElement(Svg, p, P("M21.2 6.2 17.8 2.8a2 2 0 0 0-2.8 0L3 14.8V21h6.2L21.2 9a2 2 0 0 0 0-2.8z"));
const X = p => React.createElement(Svg, p, [P("M18 6 6 18"), P("m6 6 12 12")]);
const TriangleAlert = p => React.createElement(Svg, p, [P("m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3z"), P("M12 9v4"), P("M12 17h.01")]);
const Flag = p => React.createElement(Svg, p, [P("M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"), P("M4 22v-7")]);
const RotateCcw = p => React.createElement(Svg, p, [P("M3 12a9 9 0 1 0 3-6.7L3 8"), P("M3 3v5h5")]);
const CreditCard = p => React.createElement(Svg, p, [P("M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"), P("M2 10h20")]);
const Banknote = p => React.createElement(Svg, p, [P("M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"), P("M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"), P("M6 12h.01"), P("M18 12h.01")]);
const LogOut = p => React.createElement(Svg, p, [P("M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"), P("m16 17 5-5-5-5"), P("M21 12H9")]);
const ChevronDown = p => React.createElement(Svg, p, P("m6 9 6 6 6-6"));
const ChevronUp = p => React.createElement(Svg, p, P("m18 15-6-6-6 6"));
const ShoppingBag = p => React.createElement(Svg, p, [P("M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"), P("M3 6h18"), P("M16 10a4 4 0 0 1-8 0")]);

/* ================================================================== */
/* Dữ liệu mồi: chỉ hiện khi tài khoản chưa có gì trên đám mây          */
/* ================================================================== */

const SEED_DEBTS = [{
  id: "d01",
  name: "MoMo trả góp",
  source: "MoMo",
  day: 3,
  start: "2026-10",
  periods: 21,
  amount: 3101000,
  ov: {
    "2026-10": 3100000
  }
}, {
  id: "d02",
  name: "Vay nhanh 8tr",
  source: "Vay nhanh",
  day: 4,
  start: "2026-09",
  periods: 15,
  amount: 787948,
  ov: {}
}, {
  id: "d03",
  name: "SEasy 5tr (05/05)",
  source: "SEasy",
  day: 5,
  start: "2026-10",
  periods: 8,
  amount: 577461,
  ov: {
    "2027-05": 591362
  }
}, {
  id: "d04",
  name: "Góp Sacombank",
  source: "Sacombank",
  day: 5,
  start: "2026-10",
  periods: 10,
  amount: 1192246,
  ov: {
    "2027-02": 858994,
    "2027-03": 858994,
    "2027-04": 192328,
    "2027-05": 192328,
    "2027-06": 192328,
    "2027-07": 192328
  }
}, {
  id: "d05",
  name: "HD Saison lớn",
  source: "HD Saison",
  day: 7,
  start: "2026-10",
  periods: 16,
  amount: 1820000,
  ov: {}
}, {
  id: "d06",
  name: "HD Saison nhỏ",
  source: "HD Saison",
  day: 7,
  start: "2026-09",
  periods: 6,
  amount: 1100000,
  ov: {}
}, {
  id: "d07",
  name: "SEasy 1tr",
  source: "SEasy",
  day: 8,
  start: "2026-10",
  periods: 5,
  amount: 199651,
  ov: {
    "2027-02": 201227
  }
}, {
  id: "d08",
  name: "SEasy 15,6tr",
  source: "SEasy",
  day: 9,
  start: "2026-10",
  periods: 10,
  amount: 1801679,
  ov: {
    "2027-07": 1839485
  }
}, {
  id: "d09",
  name: "SEasy 2,2tr",
  source: "SEasy",
  day: 12,
  start: "2026-10",
  periods: 5,
  amount: 439232,
  ov: {
    "2027-02": 442701
  }
}, {
  id: "d10",
  name: "SEasy 8tr",
  source: "SEasy",
  day: 13,
  start: "2026-10",
  periods: 1,
  amount: 839894,
  ov: {}
}, {
  id: "d11",
  name: "TGDĐ 144595886643",
  source: "Thế Giới Di Động",
  day: 15,
  start: "2026-10",
  periods: 11,
  amount: 872667,
  ov: {}
}, {
  id: "d12",
  name: "TGDĐ chuyển đổi 07/2026",
  source: "Thế Giới Di Động",
  day: 15,
  start: "2026-10",
  periods: 9,
  amount: 708458,
  ov: {
    "2027-06": 708450
  }
}, {
  id: "d13",
  name: "TGDĐ chuyển đổi 08/2026",
  source: "Thế Giới Di Động",
  day: 15,
  start: "2026-10",
  periods: 7,
  amount: 763607,
  ov: {
    "2027-04": 763598
  }
}, {
  id: "d14",
  name: "TGDĐ chuyển đổi 09/2026",
  source: "Thế Giới Di Động",
  day: 15,
  start: "2026-10",
  periods: 8,
  amount: 764848,
  ov: {
    "2027-05": 764843
  }
}, {
  id: "d15",
  name: "TGDĐ 144877800475",
  source: "Thế Giới Di Động",
  day: 15,
  start: "2026-10",
  periods: 6,
  amount: 122327,
  ov: {
    "2027-03": 122325
  }
}, {
  id: "d16",
  name: "Ứng trước 3tr",
  source: "Ứng trước",
  day: 20,
  start: "2026-09",
  periods: 1,
  amount: 3313322,
  ov: {}
}, {
  id: "d17",
  name: "SEasy 5tr (24/04)",
  source: "SEasy",
  day: 24,
  start: "2026-09",
  periods: 8,
  amount: 577461,
  ov: {
    "2027-04": 584033
  }
}, {
  id: "d18",
  name: "Vay 20tr",
  source: "Vay 20tr",
  day: 25,
  start: "2026-09",
  periods: 9,
  amount: 2620000,
  ov: {}
}, {
  id: "d19",
  name: "SEasy 5tr (28/02)",
  source: "SEasy",
  day: 28,
  start: "2026-09",
  periods: 3,
  amount: 664826,
  ov: {
    "2026-11": 650858
  }
}];
const SEED_PAID = {
  "2026-09|d01": true,
  "2026-09|d03": true,
  "2026-09|d04": true,
  "2026-09|d05": true,
  "2026-09|d07": true,
  "2026-09|d08": true,
  "2026-09|d09": true
};
const NGUON_MAC_DINH = [{
  id: "n1",
  ten: "Tiền mặt",
  traSau: false
}, {
  id: "n2",
  ten: "Sacombank",
  traSau: true,
  ngayHoaDon: 5
}, {
  id: "n3",
  ten: "MoMo",
  traSau: true,
  ngayHoaDon: 3
}];
const NHOM = [{
  id: "an",
  ten: "Ăn uống",
  nen: "bg-rose-300",
  chu: "text-rose-600",
  nhat: "bg-rose-50"
}, {
  id: "dilai",
  ten: "Đi lại",
  nen: "bg-sky-300",
  chu: "text-sky-600",
  nhat: "bg-sky-50"
}, {
  id: "khac",
  ten: "Khác",
  nen: "bg-violet-300",
  chu: "text-violet-600",
  nhat: "bg-violet-50"
}];
const DATA_VERSION = 4;

/* ================================================================== */
/* Tiện ích                                                            */
/* ================================================================== */

const mk = (y, m) => `${y}-${String(m).padStart(2, "0")}`;
const parseMk = k => ({
  y: +k.slice(0, 4),
  m: +k.slice(5, 7)
});
const addM = (k, n) => {
  const {
    y,
    m
  } = parseMk(k);
  const t = y * 12 + (m - 1) + n;
  return mk(Math.floor(t / 12), t % 12 + 1);
};
const diffM = (a, b) => {
  const A = parseMk(a),
    B = parseMk(b);
  return B.y * 12 + B.m - (A.y * 12 + A.m);
};
const soNgayThang = k => {
  const {
    y,
    m
  } = parseMk(k);
  return new Date(y, m, 0).getDate();
};
const ngayThuc = (day, month) => Math.min(day, soNgayThang(month));
const fmt = n => {
  const v = Math.round(Math.abs(n || 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (n < 0 ? "-" : "") + v;
};
const digits = s => String(s).replace(/\D/g, "");
const monthLabel = k => {
  const {
    y,
    m
  } = parseMk(k);
  return `Tháng ${String(m).padStart(2, "0")}/${y}`;
};
const shortMonth = k => {
  const {
    y,
    m
  } = parseMk(k);
  return `${String(m).padStart(2, "0")}/${y}`;
};
function homNay() {
  const d = new Date();
  return {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    ngay: d.getDate(),
    key: mk(d.getFullYear(), d.getMonth() + 1)
  };
}
function debtInMonth(debt, month) {
  const i = diffM(debt.start, month);
  if (i < 0 || i >= debt.periods) return null;
  return {
    amount: debt.ov?.[month] ?? debt.amount,
    period: i + 1,
    isLast: i === debt.periods - 1
  };
}
const incomeInMonth = (inc, month) => inc.repeat ? diffM(inc.month, month) >= 0 ? inc : null : inc.month === month ? inc : null;
function nangCap(s) {
  if (!s || typeof s !== "object") return null;
  const v = s.v || 1;
  const out = {
    v: DATA_VERSION,
    debts: s.debts || [],
    incomes: s.incomes || [],
    chi: s.chi || [],
    hanMuc: s.hanMuc || s.expenses || {},
    nguon: s.nguon && s.nguon.length ? s.nguon : NGUON_MAC_DINH,
    paid: s.paid || {},
    dungHanMuc: !!s.dungHanMuc,
    boUocTinh: s.boUocTinh || {},
    updatedAt: s.updatedAt || 0
  };
  if (v < 2) out.debts = out.debts.map(d => ({
    ...d,
    ov: d.ov || {}
  }));
  if (v < 4) out.nguon = out.nguon.map(n => n.traSau && !n.ngayHoaDon ? {
    ...n,
    ngayHoaDon: 5
  } : n);
  return out;
}
const goiNoiDung = d => JSON.stringify({
  v: DATA_VERSION,
  debts: d.debts,
  incomes: d.incomes,
  chi: d.chi,
  hanMuc: d.hanMuc,
  nguon: d.nguon,
  paid: d.paid,
  dungHanMuc: d.dungHanMuc,
  boUocTinh: d.boUocTinh
});

/* ================================================================== */
/* Ứng dụng                                                            */
/* ================================================================== */

function App() {
  const NAY = useMemo(() => homNay(), []);
  const [sync, setSync] = useState({
    state: "cho",
    msg: ""
  });
  const [banMoi, setBanMoi] = useState(false);
  const [debts, setDebts] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [chi, setChi] = useState([]);
  const [hanMuc, setHanMuc] = useState({});
  const [nguon, setNguon] = useState(NGUON_MAC_DINH);
  const [paid, setPaid] = useState({});
  const [dungHanMuc, setDungHanMuc] = useState(false);
  const [boUocTinh, setBoUocTinh] = useState({});
  const [coDuLieu, setCoDuLieu] = useState(false);
  const [month, setMonth] = useState(NAY.key);
  const [tab, setTab] = useState("thang");
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [picker, setPicker] = useState(null);
  const [themMo, setThemMo] = useState(false);
  const [nguonGanNhat, setNguonGanNhat] = useState("n1");
  const noiDungRef = useRef("");

  /* ---------- nối với lớp đồng bộ ---------- */
  useEffect(() => {
    window.nhanDuLieu = raw => {
      const d = nangCap(raw);
      if (!d) return;
      noiDungRef.current = goiNoiDung(d);
      setDebts(d.debts);
      setIncomes(d.incomes);
      setChi(d.chi);
      setHanMuc(d.hanMuc);
      setNguon(d.nguon);
      setPaid(d.paid);
      setDungHanMuc(d.dungHanMuc);
      setBoUocTinh(d.boUocTinh);
      setCoDuLieu(true);
    };
    window.khoTrong = () => {
      // Tài khoản chưa có gì: hiện danh sách mẫu nhưng KHÔNG ghi, KHÔNG đẩy lên
      const d = nangCap({
        debts: SEED_DEBTS,
        paid: SEED_PAID
      });
      noiDungRef.current = goiNoiDung(d);
      setDebts(d.debts);
      setIncomes(d.incomes);
      setChi(d.chi);
      setHanMuc(d.hanMuc);
      setNguon(d.nguon);
      setPaid(d.paid);
      setCoDuLieu(true);
    };
    window.coBanMoi = () => setBanMoi(true);
    let dem = 0,
      id = null;
    const gan = () => {
      if (!window.Sync) return false;
      window.Sync.onStatus = setSync;
      setSync(window.Sync.status);
      return true;
    };
    if (!gan()) {
      id = setInterval(() => {
        if (gan() || ++dem > 80) {
          clearInterval(id);
          if (!window.Sync) setSync({
            state: "loi",
            msg: "Chưa nạp được thư viện đồng bộ."
          });
        }
      }, 250);
    }
    return () => {
      if (id) clearInterval(id);
      window.nhanDuLieu = null;
      window.khoTrong = null;
      window.coBanMoi = null;
      if (window.Sync) window.Sync.onStatus = null;
    };
  }, []);

  /* ---------- lưu khi có thay đổi thật ---------- */
  useEffect(() => {
    if (!coDuLieu) return;
    const goi = {
      debts,
      incomes,
      chi,
      hanMuc,
      nguon,
      paid,
      dungHanMuc,
      boUocTinh
    };
    const noiDung = goiNoiDung(goi);
    if (noiDung === noiDungRef.current) return;
    noiDungRef.current = noiDung;
    const json = JSON.stringify({
      ...JSON.parse(noiDung),
      updatedAt: Date.now()
    });
    if (window.Sync) window.Sync.save(json);
  }, [debts, incomes, chi, hanMuc, nguon, paid, dungHanMuc, boUocTinh, coDuLieu]);

  /* ---------- tra cứu nguồn ---------- */
  const nguonMap = useMemo(() => {
    const m = {};
    nguon.forEach(n => {
      m[n.id] = n;
    });
    return m;
  }, [nguon]);
  const laTraSau = id => !!(nguonMap[id] && nguonMap[id].traSau);

  /* ---------- các tháng ---------- */
  const months = useMemo(() => {
    let dau = NAY.key,
      cuoi = NAY.key;
    const push = k => {
      if (!k) return;
      if (diffM(k, dau) > 0) dau = k;
      if (diffM(cuoi, k) > 0) cuoi = k;
    };
    debts.forEach(d => {
      push(d.start);
      push(addM(d.start, d.periods - 1));
    });
    incomes.forEach(i => push(i.month));
    chi.forEach(c => {
      push(c.month);
      if (laTraSau(c.nguon)) push(addM(c.month, 1)); // để xem được hóa đơn dự kiến
    });
    Object.keys(hanMuc).forEach(push);
    const out = [];
    for (let k = dau; diffM(k, cuoi) >= 0; k = addM(k, 1)) out.push(k);
    return out;
  }, [debts, incomes, chi, hanMuc, nguon, NAY.key]);

  /* ---------- chi tiêu theo tháng ---------- */
  const chiThang = k => chi.filter(c => c.month === k);
  const tinhChi = k => {
    const ds = chiThang(k);
    let tong = 0,
      traNgay = 0,
      traSau = 0;
    const theoNhom = {
      an: 0,
      dilai: 0,
      khac: 0
    };
    const theoNguon = {};
    ds.forEach(c => {
      tong += c.amount;
      if (laTraSau(c.nguon)) {
        traSau += c.amount;
        theoNguon[c.nguon] = (theoNguon[c.nguon] || 0) + c.amount;
      } else traNgay += c.amount;
      theoNhom[c.nhom || "khac"] = (theoNhom[c.nhom || "khac"] || 0) + c.amount;
    });
    return {
      ds,
      tong,
      traNgay,
      traSau,
      theoNhom,
      theoNguon,
      soKhoan: ds.length
    };
  };

  /* Hóa đơn thẻ dự kiến của tháng k, sinh từ chi trả sau của tháng trước */
  const uocTinhHoaDon = k => {
    const truoc = addM(k, -1);
    const ra = [];
    nguon.forEach(n => {
      if (!n.traSau) return;
      if (boUocTinh[`${k}|${n.id}`]) return;
      const tong = chi.reduce((s, c) => c.month === truoc && c.nguon === n.id ? s + c.amount : s, 0);
      if (tong > 0) ra.push({
        nguon: n,
        tong,
        day: ngayThuc(n.ngayHoaDon || 5, k)
      });
    });
    return ra;
  };
  const tongUocTinh = k => uocTinhHoaDon(k).reduce((s, u) => s + u.tong, 0);

  /* Con số sinh hoạt dùng cho dòng tiền */
  const sinhHoatChoDongTien = k => {
    const hm = hanMuc[k] || 0;
    const c = tinhChi(k);
    const lech = diffM(NAY.key, k); // <0 quá khứ, 0 tháng này, >0 tương lai
    if (lech > 0) return {
      so: hm,
      kieu: "hanmuc"
    };
    if (lech === 0) return dungHanMuc ? {
      so: hm,
      kieu: "hanmuc"
    } : {
      so: c.traNgay,
      kieu: "thucte"
    };
    if (c.soKhoan === 0) return {
      so: hm,
      kieu: "hanmuc-thieu"
    };
    return {
      so: c.traNgay,
      kieu: "thucte"
    };
  };

  /* ---------- tổng hợp từng tháng ---------- */
  const byMonth = useMemo(() => {
    const map = {};
    let dong = 0;
    months.forEach(k => {
      const due = debts.reduce((s, d) => s + (debtInMonth(d, k)?.amount || 0), 0);
      const paidSum = debts.reduce((s, d) => {
        const o = debtInMonth(d, k);
        return s + (o && paid[`${k}|${d.id}`] ? o.amount : 0);
      }, 0);
      const inc = incomes.reduce((s, i) => s + (incomeInMonth(i, k) ? i.amount : 0), 0);
      const sh = sinhHoatChoDongTien(k);
      const uoc = tongUocTinh(k);
      const net = inc - sh.so - due - uoc;
      dong += net;
      map[k] = {
        due,
        paidSum,
        remain: due - paidSum,
        inc,
        sh,
        uoc,
        net,
        cum: dong
      };
    });
    return map;
  }, [months, debts, incomes, chi, hanMuc, paid, nguon, dungHanMuc, boUocTinh, NAY.key]);
  const cur = byMonth[month] || {
    due: 0,
    paidSum: 0,
    remain: 0,
    inc: 0,
    sh: {
      so: 0,
      kieu: "hanmuc"
    },
    uoc: 0,
    net: 0,
    cum: 0
  };
  const prevCum = useMemo(() => {
    const i = months.indexOf(month);
    return i > 0 ? byMonth[months[i - 1]].cum : 0;
  }, [months, month, byMonth]);

  /* ---------- dòng thời gian ---------- */
  const timeline = useMemo(() => {
    const items = [];
    debts.forEach(d => {
      const o = debtInMonth(d, month);
      if (o) items.push({
        loai: "no",
        id: d.id,
        day: ngayThuc(d.day, month),
        ten: d.name,
        phu: `Kỳ ${o.period}/${d.periods} · ${d.source}`,
        tien: -o.amount,
        cuoiKy: o.isLast,
        daTra: !!paid[`${month}|${d.id}`],
        goc: d
      });
    });
    incomes.forEach(i => {
      if (incomeInMonth(i, month)) items.push({
        loai: "thu",
        id: i.id,
        day: ngayThuc(i.day, month),
        ten: i.name,
        phu: i.repeat ? "Thu nhập · lặp hàng tháng" : "Thu nhập",
        tien: i.amount,
        goc: i
      });
    });

    // Chi trả ngay: gộp theo ngày thành một dòng
    const theoNgay = {};
    chiThang(month).forEach(c => {
      if (laTraSau(c.nguon)) return;
      const d = ngayThuc(c.day, month);
      if (!theoNgay[d]) theoNgay[d] = [];
      theoNgay[d].push(c);
    });
    Object.keys(theoNgay).forEach(d => {
      const ds = theoNgay[d];
      const tong = ds.reduce((s, c) => s + c.amount, 0);
      items.push({
        loai: "chi",
        id: "chi-" + d,
        day: +d,
        ten: `Chi tiêu trong ngày (${ds.length} khoản)`,
        phu: ds.map(c => c.name).join(", "),
        tien: -tong,
        ds
      });
    });
    uocTinhHoaDon(month).forEach(u => {
      items.push({
        loai: "uoc",
        id: "uoc-" + u.nguon.id,
        day: u.day,
        ten: `Hóa đơn thẻ dự kiến · ${u.nguon.ten}`,
        phu: `Ước tính từ chi tiêu tháng ${shortMonth(addM(month, -1))}`,
        tien: -u.tong,
        nguonId: u.nguon.id
      });
    });
    items.sort((a, b) => a.day - b.day || (a.loai === "thu" ? -1 : b.loai === "thu" ? 1 : 0));
    let bal = prevCum;
    const out = items.map(it => {
      bal += it.tien;
      return {
        ...it,
        bal
      };
    });
    if (out.length) {
      const min = Math.min(...out.map(o => o.bal));
      if (min < 0) out[out.findIndex(o => o.bal === min)].day_ = true;
    }
    return out;
  }, [debts, incomes, chi, month, paid, prevCum, nguon, boUocTinh]);
  const lowest = timeline.length ? Math.min(...timeline.map(t => t.bal)) : prevCum;
  const totalLeft = months.reduce((s, k) => diffM(month, k) >= 0 ? s + byMonth[k].remain : s, 0);
  const endMonth = months.length ? months[months.length - 1] : month;
  const progress = cur.due > 0 ? cur.paidSum / cur.due : 0;
  const maxDue = Math.max(1, ...months.map(k => byMonth[k].due));
  const monthIdx = months.indexOf(month);
  const soChi = tinhChi(month);

  /* ---------- hành động ---------- */
  const togglePaid = id => setPaid(p => ({
    ...p,
    [`${month}|${id}`]: !p[`${month}|${id}`]
  }));
  const doDelete = () => {
    if (!confirm) return;
    const {
      loai,
      id
    } = confirm;
    if (loai === "no") setDebts(l => l.filter(x => x.id !== id));
    if (loai === "thu") setIncomes(l => l.filter(x => x.id !== id));
    if (loai === "chi") setChi(l => l.filter(x => x.id !== id));
    if (loai === "nguon") {
      setChi(l => l.map(c => c.nguon === id ? {
        ...c,
        nguon: nguon.find(n => !n.traSau)?.id || "n1"
      } : c));
      setNguon(l => l.filter(x => x.id !== id));
    }
    setConfirm(null);
  };
  const luuKhoan = (loai, obj) => {
    const setter = loai === "no" ? setDebts : loai === "thu" ? setIncomes : setChi;
    setter(l => l.some(x => x.id === obj.id) ? l.map(x => x.id === obj.id ? {
      ...obj
    } : x) : [...l, {
      ...obj
    }]);
    if (loai === "chi" && obj.nguon) setNguonGanNhat(obj.nguon);
    setModal(null);
  };

  /* ---------- màn hình đăng nhập ---------- */
  if (sync.state !== "on") {
    return /*#__PURE__*/React.createElement(ManHinhDangNhap, {
      sync: sync,
      banMoi: banMoi
    });
  }
  if (!coDuLieu) {
    return /*#__PURE__*/React.createElement(ManHinhCho, {
      text: "Đang tải sổ nợ…"
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-[#F7F5FB] text-slate-700",
    style: {
      fontFamily: "'Inter','Segoe UI',system-ui,sans-serif"
    }
  }, banMoi && /*#__PURE__*/React.createElement("button", {
    onClick: () => location.reload(),
    className: "w-full bg-violet-500 text-white text-sm py-2 hover:bg-violet-600"
  }, "Có bản mới. Bấm để tải lại."), /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-2xl lg:max-w-6xl pb-28"
  }, /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-20 px-4 lg:px-8 pt-4 pb-5 rounded-b-3xl shadow-sm bg-gradient-to-br from-rose-100 via-violet-100 to-sky-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => monthIdx > 0 && setMonth(months[monthIdx - 1]),
    disabled: monthIdx <= 0,
    className: "p-2 rounded-xl bg-white/60 hover:bg-white disabled:opacity-30",
    "aria-label": "Tháng trước"
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPicker({
      value: month,
      allowed: months,
      onPick: setMonth
    }),
    className: "flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/60 hover:bg-white transition"
  }, /*#__PURE__*/React.createElement(CalendarDays, {
    size: 16,
    className: "text-violet-500"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-semibold text-slate-700"
  }, monthLabel(month)), month === NAY.key && /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] bg-violet-400 text-white px-1.5 py-0.5 rounded"
  }, "nay")), /*#__PURE__*/React.createElement("button", {
    onClick: () => monthIdx < months.length - 1 && setMonth(months[monthIdx + 1]),
    disabled: monthIdx >= months.length - 1,
    className: "p-2 rounded-xl bg-white/60 hover:bg-white disabled:opacity-30",
    "aria-label": "Tháng sau"
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500"
  }, "Còn phải trả trong tháng"), /*#__PURE__*/React.createElement("div", {
    className: "text-4xl font-bold tracking-tight tabular-nums mt-1 text-slate-800"
  }, fmt(cur.remain), /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-normal text-slate-500 ml-1"
  }, "đ")), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500 mt-1"
  }, "Cả tháng ", fmt(cur.due), "đ · đã trả ", fmt(cur.paidSum), "đ")), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 h-2 rounded-full bg-white/70 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-emerald-300 transition-all duration-500 rounded-full",
    style: {
      width: `${progress * 100}%`
    }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "mt-4 flex gap-1 bg-white/60 p-1 rounded-2xl text-sm"
  }, [["thang", "Tháng này"], ["tongquan", "Tổng quan"], ["dongbo", "Đồng bộ"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setTab(k),
    className: `flex-1 py-2 rounded-xl transition ${tab === k ? "bg-white text-slate-800 font-medium shadow-sm" : "text-slate-500"}`
  }, l)))), tab === "thang" && /*#__PURE__*/React.createElement(TabThang, {
    month: month,
    NAY: NAY,
    cur: cur,
    lowest: lowest,
    timeline: timeline,
    hanMuc: hanMuc,
    setHanMuc: setHanMuc,
    soChi: soChi,
    nguonMap: nguonMap,
    dungHanMuc: dungHanMuc,
    setDungHanMuc: setDungHanMuc,
    togglePaid: togglePaid,
    boUoc: nguonId => setBoUocTinh(b => ({
      ...b,
      [`${month}|${nguonId}`]: true
    })),
    moSua: (loai, obj) => setModal({
      loai,
      edit: obj
    }),
    moXoa: (loai, id, ten) => setConfirm({
      loai,
      id,
      ten
    })
  }), tab === "tongquan" && /*#__PURE__*/React.createElement(TabTongQuan, {
    months: months,
    byMonth: byMonth,
    month: month,
    setMonth: setMonth,
    setTab: setTab,
    totalLeft: totalLeft,
    endMonth: endMonth,
    maxDue: maxDue,
    debts: debts,
    incomes: incomes,
    nguon: nguon,
    setNguon: setNguon,
    moSua: (loai, obj) => setModal({
      loai,
      edit: obj
    }),
    moXoa: (loai, id, ten) => setConfirm({
      loai,
      id,
      ten
    }),
    moThem: loai => setModal({
      loai
    })
  }), tab === "dongbo" && /*#__PURE__*/React.createElement(TabDongBo, {
    sync: sync
  })), tab === "thang" && /*#__PURE__*/React.createElement(NutThem, {
    mo: themMo,
    setMo: setThemMo,
    chon: loai => {
      setThemMo(false);
      setModal({
        loai
      });
    }
  }), modal && /*#__PURE__*/React.createElement(FormModal, {
    key: `${modal.loai}-${modal.edit?.id || "new"}`,
    modal: modal,
    month: month,
    nguon: nguon,
    nguonGanNhat: nguonGanNhat,
    onOpenPicker: setPicker,
    onClose: () => setModal(null),
    onSave: obj => luuKhoan(modal.loai, obj)
  }), picker && /*#__PURE__*/React.createElement(MonthPicker, {
    value: picker.value,
    allowed: picker.allowed,
    onPick: k => {
      picker.onPick(k);
      setPicker(null);
    },
    onClose: () => setPicker(null)
  }), confirm && /*#__PURE__*/React.createElement(Sheet, {
    onClose: () => setConfirm(null)
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold text-slate-800"
  }, confirm.loai === "nguon" ? "Xóa nguồn tiền?" : "Xóa khoản này?"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 mt-2"
  }, confirm.loai === "nguon" ? `Các khoản chi đang dùng “${confirm.ten}” sẽ chuyển sang nguồn trả ngay đầu tiên, không bị mất.` : `“${confirm.ten}” sẽ bị xóa. Không khôi phục lại được.`), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mt-5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirm(null),
    className: "flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-medium hover:bg-slate-200"
  }, "Hủy"), /*#__PURE__*/React.createElement("button", {
    onClick: doDelete,
    className: "flex-1 py-3 rounded-xl bg-rose-300 text-rose-900 font-medium hover:bg-rose-400"
  }, "Xóa"))));
}

/* ================================================================== */
/* Tab: Tháng này                                                      */
/* ================================================================== */

function TabThang({
  month,
  NAY,
  cur,
  lowest,
  timeline,
  hanMuc,
  setHanMuc,
  soChi,
  nguonMap,
  dungHanMuc,
  setDungHanMuc,
  togglePaid,
  boUoc,
  moSua,
  moXoa
}) {
  const [chon, setChon] = useState(null);
  const [moNgay, setMoNgay] = useState({});
  const [moDs, setMoDs] = useState(false);
  const hm = hanMuc[month] || 0;
  const laThangNay = month === NAY.key;
  const soNgay = soNgayThang(month);
  const ngayHienTai = laThangNay ? NAY.ngay : soNgay;
  const nhipDo = hm > 0 ? hm * ngayHienTai / soNgay : 0;
  const tiLe = hm > 0 ? soChi.tong / hm : 0;
  const duBao = laThangNay && ngayHienTai > 0 ? soChi.tong / ngayHienTai * soNgay : soChi.tong;
  const lechNhip = soChi.tong - nhipDo;
  return /*#__PURE__*/React.createElement("div", {
    className: "px-4 lg:grid lg:grid-cols-[1fr_20rem] lg:gap-6 lg:items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:order-2 lg:sticky lg:top-6 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 lg:grid-cols-1 gap-2 -mt-3 lg:mt-0 relative z-10"
  }, /*#__PURE__*/React.createElement(ChiSo, {
    nhan: "Thu nhập",
    gt: cur.inc,
    tot: true
  }), /*#__PURE__*/React.createElement(ChiSo, {
    nhan: "Dư trong tháng",
    gt: cur.net,
    tot: cur.net >= 0
  }), /*#__PURE__*/React.createElement(ChiSo, {
    nhan: "Lũy kế",
    gt: cur.cum,
    tot: cur.cum >= 0
  })), cur.uoc > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-sky-50 border border-sky-200 text-sky-800 rounded-2xl p-3 text-sm"
  }, "Đã trừ ", /*#__PURE__*/React.createElement("b", null, fmt(cur.uoc), "đ"), " hóa đơn thẻ dự kiến từ chi tiêu tháng trước. Xem dòng có nhãn ", /*#__PURE__*/React.createElement("b", null, "ước tính"), " trong lịch."), lowest < 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 items-start bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-3 text-sm"
  }, /*#__PURE__*/React.createElement(TriangleAlert, {
    size: 16,
    className: "mt-0.5 shrink-0"
  }), /*#__PURE__*/React.createElement("span", null, "Số dư chạm đáy ", /*#__PURE__*/React.createElement("b", null, fmt(lowest), "đ"), " trong tháng. Dòng có nhãn ", /*#__PURE__*/React.createElement("b", null, "đáy"), " cho biết cần xoay tiền trước ngày nào.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl p-3 shadow-sm space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-slate-600"
  }, "Hạn mức sinh hoạt"), /*#__PURE__*/React.createElement(NumInput, {
    value: hanMuc[month] ?? "",
    onChange: v => setHanMuc(e => ({
      ...e,
      [month]: v === "" ? 0 : v
    })),
    className: "w-36 text-right font-semibold tabular-nums bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 outline-none focus:border-amber-300"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, cur.sh.kieu === "thucte" && "Dòng tiền đang trừ theo chi tiêu thực tế đã ghi.", cur.sh.kieu === "hanmuc" && "Dòng tiền đang trừ theo hạn mức.", cur.sh.kieu === "hanmuc-thieu" && "Tháng đã qua nhưng chưa ghi chi tiêu, đang tạm tính theo hạn mức."), laThangNay && /*#__PURE__*/React.createElement("label", {
    className: "flex items-center gap-2 text-xs text-slate-500 pt-1 border-t border-slate-100"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: dungHanMuc,
    onChange: e => setDungHanMuc(e.target.checked),
    className: "w-4 h-4 accent-violet-400"
  }), "Tháng này tính theo hạn mức thay vì chi tiêu thực"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 lg:mt-0 lg:order-1 space-y-5"
  }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between px-1 mb-2"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-semibold text-slate-700"
  }, "Lịch trong tháng"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "số nhỏ = số dư sau khoản đó")), timeline.length === 0 ? /*#__PURE__*/React.createElement(Trong, {
    text: "Tháng này chưa có khoản nào. Bấm nút cộng góc dưới để thêm."
  }) : /*#__PURE__*/React.createElement("ol", {
    className: "space-y-1.5"
  }, timeline.map((it, n) => /*#__PURE__*/React.createElement("li", {
    key: `${it.loai}-${it.id}-${n}`,
    className: `bg-white rounded-2xl shadow-sm border-l-4 ${it.loai === "thu" ? "border-emerald-300" : it.loai === "chi" ? "border-amber-200" : it.loai === "uoc" ? "border-sky-300 border-dashed" : it.daTra ? "border-slate-200" : it.cuoiKy ? "border-violet-300" : "border-rose-200"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-9 shrink-0 text-center rounded-xl py-1.5 text-xs font-bold ${it.loai === "thu" ? "bg-emerald-50 text-emerald-600" : it.loai === "chi" ? "bg-amber-50 text-amber-600" : it.loai === "uoc" ? "bg-sky-50 text-sky-600" : "bg-violet-50 text-violet-500"}`
  }, String(it.day).padStart(2, "0")), /*#__PURE__*/React.createElement("button", {
    onClick: () => it.loai === "chi" ? setMoNgay(m => ({
      ...m,
      [it.day]: !m[it.day]
    })) : it.loai === "uoc" ? null : setChon(it),
    className: "min-w-0 flex-1 text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: `font-medium truncate ${it.daTra ? "line-through text-slate-300" : it.loai === "chi" ? "text-slate-500 text-sm" : "text-slate-700"}`
  }, it.ten), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 flex items-center gap-1.5 flex-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate"
  }, it.phu), it.cuoiKy && /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-0.5 bg-violet-50 text-violet-600 px-1.5 py-0.5 rounded-md font-medium"
  }, /*#__PURE__*/React.createElement(Flag, {
    size: 10
  }), " kỳ cuối"), it.loai === "uoc" && /*#__PURE__*/React.createElement("span", {
    className: "bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded-md font-medium"
  }, "ước tính"), it.day_ && /*#__PURE__*/React.createElement("span", {
    className: "bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-md font-medium"
  }, "đáy"))), /*#__PURE__*/React.createElement("div", {
    className: "text-right shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: `font-semibold tabular-nums ${it.loai === "thu" ? "text-emerald-500" : it.daTra ? "text-slate-300" : it.loai === "chi" ? "text-amber-600 text-sm" : it.loai === "uoc" ? "text-sky-600 text-sm" : "text-slate-700"}`
  }, it.tien > 0 ? "+" : "", fmt(it.tien)), /*#__PURE__*/React.createElement("div", {
    className: `text-xs tabular-nums ${it.bal < 0 ? "text-rose-400" : "text-slate-400"}`
  }, fmt(it.bal))), it.loai === "no" && /*#__PURE__*/React.createElement("button", {
    onClick: () => togglePaid(it.id),
    className: `w-9 h-9 shrink-0 rounded-xl border flex items-center justify-center transition ${it.daTra ? "bg-emerald-300 border-emerald-300 text-white" : "border-slate-200 text-transparent hover:border-emerald-300"}`,
    "aria-label": it.daTra ? "Bỏ đánh dấu đã trả" : "Đánh dấu đã trả"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 16
  })), it.loai === "uoc" && /*#__PURE__*/React.createElement("button", {
    onClick: () => boUoc(it.nguonId),
    className: "w-9 h-9 shrink-0 rounded-xl border border-sky-200 text-sky-500 flex items-center justify-center hover:bg-sky-50",
    title: "Đã nhập hóa đơn thật, bỏ dòng ước tính này",
    "aria-label": "Bỏ dòng ước tính"
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  })), it.loai === "chi" && /*#__PURE__*/React.createElement("span", {
    className: "w-9 h-9 shrink-0 flex items-center justify-center text-slate-300"
  }, moNgay[it.day] ? /*#__PURE__*/React.createElement(ChevronUp, {
    size: 16
  }) : /*#__PURE__*/React.createElement(ChevronDown, {
    size: 16
  }))), it.loai === "chi" && moNgay[it.day] && /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-50 px-3 py-2 space-y-1"
  }, it.ds.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: "flex items-center gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: `w-2 h-2 rounded-full shrink-0 ${(NHOM.find(x => x.id === (c.nhom || "khac")) || NHOM[2]).nen}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "flex-1 truncate text-slate-600"
  }, c.name), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, nguonMap[c.nguon]?.ten || "?"), /*#__PURE__*/React.createElement("span", {
    className: "tabular-nums text-slate-700"
  }, fmt(c.amount)), /*#__PURE__*/React.createElement("button", {
    onClick: () => moSua("chi", c),
    className: "p-1 text-slate-300 hover:text-violet-500",
    "aria-label": "Sửa"
  }, /*#__PURE__*/React.createElement(Pencil, {
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => moXoa("chi", c.id, c.name),
    className: "p-1 text-slate-300 hover:text-rose-500",
    "aria-label": "Xóa"
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 14
  }))))))))), /*#__PURE__*/React.createElement("section", {
    className: "bg-white rounded-2xl p-4 shadow-sm space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-semibold text-slate-700 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(ShoppingBag, {
    size: 16
  }), " Chi tiêu"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm tabular-nums text-slate-600"
  }, fmt(soChi.tong), " / ", fmt(hm), "đ")), /*#__PURE__*/React.createElement("div", {
    className: "h-2.5 rounded-full bg-slate-100 overflow-hidden relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-full rounded-full transition-all ${tiLe > 1 ? "bg-rose-400" : tiLe > 0.85 ? "bg-amber-300" : "bg-emerald-300"}`,
    style: {
      width: `${Math.min(100, tiLe * 100)}%`
    }
  }), hm > 0 && laThangNay && /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 bottom-0 w-0.5 bg-slate-500",
    style: {
      left: `${Math.min(100, ngayHienTai / soNgay * 100)}%`
    }
  })), hm > 0 ? /*#__PURE__*/React.createElement("div", {
    className: `text-sm rounded-xl p-2.5 ${lechNhip > 0 ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`
  }, laThangNay ? lechNhip > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, "Đang tiêu nhanh hơn nhịp, vượt ", /*#__PURE__*/React.createElement("b", null, fmt(lechNhip), "đ"), " so với mốc ngày ", ngayHienTai, ". Theo đà này cuối tháng khoảng ", /*#__PURE__*/React.createElement("b", null, fmt(duBao), "đ"), ".") : /*#__PURE__*/React.createElement(React.Fragment, null, "Đang trong nhịp, còn dư ", /*#__PURE__*/React.createElement("b", null, fmt(-lechNhip), "đ"), " so với mốc ngày ", ngayHienTai, ". Theo đà này cuối tháng khoảng ", /*#__PURE__*/React.createElement("b", null, fmt(duBao), "đ"), ".") : tiLe > 1 ? /*#__PURE__*/React.createElement(React.Fragment, null, "Tháng này đã vượt hạn mức ", /*#__PURE__*/React.createElement("b", null, fmt(soChi.tong - hm), "đ"), ".") : /*#__PURE__*/React.createElement(React.Fragment, null, "Còn lại ", /*#__PURE__*/React.createElement("b", null, fmt(hm - soChi.tong), "đ"), " trong hạn mức.")) : /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400"
  }, "Đặt hạn mức sinh hoạt để theo dõi nhịp độ chi tiêu."), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2"
  }, NHOM.map(n => {
    const v = soChi.theoNhom[n.id] || 0;
    const p = soChi.tong > 0 ? v / soChi.tong : 0;
    return /*#__PURE__*/React.createElement("div", {
      key: n.id,
      className: `${n.nhat} rounded-xl p-2`
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-slate-500"
    }, n.ten), /*#__PURE__*/React.createElement("div", {
      className: `font-semibold tabular-nums text-sm ${n.chu}`
    }, fmt(v)), /*#__PURE__*/React.createElement("div", {
      className: "h-1 rounded-full bg-white/70 mt-1 overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: `h-full ${n.nen}`,
      style: {
        width: `${p * 100}%`
      }
    })));
  })), soChi.traSau > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-sky-50 border border-sky-200 rounded-xl p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-sm text-sky-800 font-medium"
  }, /*#__PURE__*/React.createElement(CreditCard, {
    size: 15
  }), " Đã tiêu bằng thẻ và trả sau: ", fmt(soChi.traSau), "đ"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-sky-700 mt-1"
  }, "Khoản này chưa trừ vào dòng tiền, sẽ vào hóa đơn tháng sau."), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 space-y-1"
  }, Object.keys(soChi.theoNguon).map(id => /*#__PURE__*/React.createElement("div", {
    key: id,
    className: "flex justify-between text-xs text-sky-800"
  }, /*#__PURE__*/React.createElement("span", null, nguonMap[id]?.ten || "?"), /*#__PURE__*/React.createElement("span", {
    className: "tabular-nums"
  }, fmt(soChi.theoNguon[id]), "đ")))), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-sky-600 mt-2"
  }, "Số này sẽ hiện thành dòng “Hóa đơn thẻ dự kiến” ở tháng sau. Khi hóa đơn thật về, nhập nó như một khoản nợ rồi bấm dấu X trên dòng ước tính để khỏi đếm hai lần.")), soChi.soKhoan === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400"
  }, "Chưa ghi khoản chi nào trong tháng.") : /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-100 pt-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMoDs(!moDs),
    className: "flex items-center gap-1 text-sm font-medium text-slate-600 mb-2"
  }, "Tất cả khoản chi (", soChi.soKhoan, ")", moDs ? /*#__PURE__*/React.createElement(ChevronUp, {
    size: 15
  }) : /*#__PURE__*/React.createElement(ChevronDown, {
    size: 15
  })), moDs && /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, soChi.ds.slice().sort((a, b) => a.day - b.day).map(c => {
    const n = NHOM.find(x => x.id === (c.nhom || "khac")) || NHOM[2];
    const ng = nguonMap[c.nguon];
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      className: "flex items-center gap-2 text-sm py-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-7 shrink-0 text-xs text-slate-400 text-center"
    }, String(c.day).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
      className: `w-2 h-2 rounded-full shrink-0 ${n.nen}`
    }), /*#__PURE__*/React.createElement("span", {
      className: "flex-1 min-w-0 truncate text-slate-600"
    }, c.name), /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] px-1.5 py-0.5 rounded shrink-0 ${ng?.traSau ? "bg-sky-50 text-sky-600" : "bg-emerald-50 text-emerald-600"}`
    }, ng?.ten || "?"), /*#__PURE__*/React.createElement("span", {
      className: "tabular-nums text-slate-700 shrink-0"
    }, fmt(c.amount)), /*#__PURE__*/React.createElement("button", {
      onClick: () => moSua("chi", c),
      className: "p-1 text-slate-300 hover:text-violet-500 shrink-0",
      "aria-label": "Sửa"
    }, /*#__PURE__*/React.createElement(Pencil, {
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => moXoa("chi", c.id, c.name),
      className: "p-1 text-slate-300 hover:text-rose-500 shrink-0",
      "aria-label": "Xóa"
    }, /*#__PURE__*/React.createElement(Trash2, {
      size: 14
    })));
  }))))), chon && /*#__PURE__*/React.createElement(Sheet, {
    onClose: () => setChon(null)
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold text-slate-800 truncate"
  }, chon.ten), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 mt-1"
  }, chon.phu), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 space-y-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      moSua(chon.loai, chon.goc);
      setChon(null);
    },
    className: "w-full py-3 rounded-xl bg-violet-100 text-violet-800 font-medium hover:bg-violet-200 flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Pencil, {
    size: 16
  }), " Sửa"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      moXoa(chon.loai, chon.goc.id, chon.ten);
      setChon(null);
    },
    className: "w-full py-3 rounded-xl bg-rose-100 text-rose-800 font-medium hover:bg-rose-200 flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 16
  }), " Xóa"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setChon(null),
    className: "w-full py-3 rounded-xl bg-slate-100 text-slate-600 font-medium"
  }, "Đóng"))));
}

/* ================================================================== */
/* Tab: Tổng quan                                                      */
/* ================================================================== */

function TabTongQuan({
  months,
  byMonth,
  month,
  setMonth,
  setTab,
  totalLeft,
  endMonth,
  maxDue,
  debts,
  incomes,
  nguon,
  setNguon,
  moSua,
  moXoa,
  moThem
}) {
  const [mo, setMo] = useState({
    thang: true,
    no: true,
    thu: true,
    nguon: false
  });
  const bat = k => setMo(m => ({
    ...m,
    [k]: !m[k]
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "px-4 pt-4 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 lg:items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, /*#__PURE__*/React.createElement(ONho, {
    nhan: "Còn phải trả từ tháng này",
    gt: totalLeft,
    nen: "bg-rose-50"
  }), /*#__PURE__*/React.createElement(ONho, {
    nhan: "Dự kiến hết nợ",
    chu: monthLabel(endMonth),
    nen: "bg-emerald-50"
  })), /*#__PURE__*/React.createElement(Muc, {
    tieuDe: "Tất cả các tháng",
    mo: mo.thang,
    bat: () => bat("thang")
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl overflow-hidden shadow-sm"
  }, months.map(k => {
    const b = byMonth[k];
    const active = k === month;
    const ends = debts.filter(d => debtInMonth(d, k)?.isLast).length;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => {
        setMonth(k);
        setTab("thang");
      },
      className: `w-full flex items-center gap-3 px-3 py-2.5 border-b border-slate-50 last:border-0 text-left transition ${active ? "bg-violet-50" : "hover:bg-slate-50"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-20 shrink-0 text-sm font-medium text-slate-600"
    }, shortMonth(k)), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-2 rounded-full bg-slate-100 overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full rounded-full bg-gradient-to-r from-violet-200 to-rose-300",
      style: {
        width: `${b.due / maxDue * 100}%`
      }
    })), ends > 0 && /*#__PURE__*/React.createElement("div", {
      className: "text-xs mt-0.5 text-violet-500"
    }, ends, " khoản kết thúc")), /*#__PURE__*/React.createElement("span", {
      className: "tabular-nums text-sm font-semibold shrink-0 text-slate-700"
    }, fmt(b.due)));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Muc, {
    tieuDe: `Khoản nợ (${debts.length})`,
    mo: mo.no,
    bat: () => bat("no"),
    them: () => moThem("no")
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl overflow-hidden shadow-sm"
  }, debts.slice().sort((a, b) => a.day - b.day).map(d => {
    const end = addM(d.start, d.periods - 1);
    return /*#__PURE__*/React.createElement(Dong, {
      key: d.id,
      nhan: String(d.day).padStart(2, "0"),
      mau: "violet",
      ten: d.name,
      done: diffM(end, month) > 0,
      phu: `${d.periods} kỳ · ${shortMonth(d.start)} → ${shortMonth(end)}`,
      tien: fmt(d.amount),
      tienMau: "text-slate-700",
      sua: () => moSua("no", d),
      xoa: () => moXoa("no", d.id, d.name)
    });
  }), debts.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "p-4 text-sm text-slate-400 text-center"
  }, "Chưa có khoản nợ nào."))), /*#__PURE__*/React.createElement(Muc, {
    tieuDe: `Thu nhập (${incomes.length})`,
    mo: mo.thu,
    bat: () => bat("thu"),
    them: () => moThem("thu")
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl overflow-hidden shadow-sm"
  }, incomes.map(i => /*#__PURE__*/React.createElement(Dong, {
    key: i.id,
    nhan: String(i.day).padStart(2, "0"),
    mau: "emerald",
    ten: i.name,
    phu: i.repeat ? `Lặp hàng tháng từ ${shortMonth(i.month)}` : monthLabel(i.month),
    tien: `+${fmt(i.amount)}`,
    tienMau: "text-emerald-500",
    sua: () => moSua("thu", i),
    xoa: () => moXoa("thu", i.id, i.name)
  })), incomes.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "p-4 text-sm text-slate-400 text-center"
  }, "Chưa có khoản thu nào."))), /*#__PURE__*/React.createElement(Muc, {
    tieuDe: "Nguồn tiền",
    mo: mo.nguon,
    bat: () => bat("nguon")
  }, /*#__PURE__*/React.createElement(QuanLyNguon, {
    nguon: nguon,
    setNguon: setNguon,
    moXoa: moXoa
  }))));
}
function QuanLyNguon({
  nguon,
  setNguon,
  moXoa
}) {
  const [ten, setTen] = useState("");
  const [traSau, setTraSau] = useState(false);
  const them = () => {
    if (!ten.trim()) return;
    setNguon(l => [...l, {
      id: "u" + Date.now(),
      ten: ten.trim(),
      traSau
    }]);
    setTen("");
    setTraSau(false);
  };
  const doi = (id, k, v) => setNguon(l => l.map(n => n.id === id ? {
    ...n,
    [k]: v
  } : n));
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl p-3 shadow-sm space-y-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Nguồn ", /*#__PURE__*/React.createElement("b", null, "trả ngay"), " trừ vào dòng tiền ngay ngày chi. Nguồn ", /*#__PURE__*/React.createElement("b", null, "trả sau"), " gom lại thành dòng hóa đơn dự kiến ở tháng sau, đặt vào ngày bạn điền trong ô số bên cạnh."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, nguon.map(n => /*#__PURE__*/React.createElement("div", {
    key: n.id,
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    value: n.ten,
    onChange: e => doi(n.id, "ten", e.target.value),
    className: "flex-1 min-w-0 border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-violet-300"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => doi(n.id, "traSau", !n.traSau),
    className: `px-2 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 shrink-0 ${n.traSau ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-700"}`
  }, n.traSau ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CreditCard, {
    size: 12
  }), " Trả sau") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Banknote, {
    size: 12
  }), " Trả ngay")), n.traSau && /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "31",
    value: n.ngayHoaDon || 5,
    onChange: e => doi(n.id, "ngayHoaDon", Math.min(31, Math.max(1, +e.target.value || 1))),
    title: "Ngày hóa đơn đến hạn ở tháng sau",
    className: "w-12 text-center border border-sky-200 rounded-lg px-1 py-1.5 text-xs outline-none focus:border-sky-400 shrink-0"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => moXoa("nguon", n.id, n.ten),
    className: "p-1.5 text-slate-300 hover:text-rose-500 shrink-0",
    "aria-label": "Xóa"
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 15
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 pt-2 border-t border-slate-100"
  }, /*#__PURE__*/React.createElement("input", {
    value: ten,
    onChange: e => setTen(e.target.value),
    placeholder: "Tên nguồn mới",
    className: "flex-1 min-w-0 border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-violet-300"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTraSau(!traSau),
    className: `px-2 py-1.5 rounded-lg text-xs font-medium shrink-0 ${traSau ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-700"}`
  }, traSau ? "Trả sau" : "Trả ngay"), /*#__PURE__*/React.createElement("button", {
    onClick: them,
    disabled: !ten.trim(),
    className: "px-3 py-1.5 rounded-lg bg-violet-200 text-violet-800 text-sm font-medium disabled:opacity-30 shrink-0"
  }, "Thêm")));
}

/* ================================================================== */
/* Tab: Đồng bộ                                                        */
/* ================================================================== */

function TabDongBo({
  sync
}) {
  const tone = {
    on: "bg-emerald-50 text-emerald-700 border-emerald-200",
    loi: "bg-rose-50 text-rose-700 border-rose-200",
    dang: "bg-amber-50 text-amber-700 border-amber-200"
  }[sync.state] || "bg-slate-50 text-slate-500 border-slate-200";
  return /*#__PURE__*/React.createElement("div", {
    className: "px-4 pt-4 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: `rounded-2xl border p-3 text-sm ${tone}`
  }, sync.msg || "Đang hoạt động."), sync.email && /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl p-4 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400"
  }, "Đang đăng nhập"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-slate-700 break-all"
  }, sync.email)), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.Sync && window.Sync.disconnect(),
    className: "w-full py-3 rounded-xl bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(LogOut, {
    size: 16
  }), " Đăng xuất thiết bị này"), /*#__PURE__*/React.createElement("button", {
    onClick: donSach,
    className: "w-full py-3 rounded-xl bg-violet-50 text-violet-700 font-medium hover:bg-violet-100 text-sm"
  }, "Xóa bộ nhớ đệm và tải lại"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 text-center"
  }, "Dữ liệu nằm trên Firebase. Đăng xuất hay xóa bộ nhớ đệm đều không làm mất gì, đăng nhập lại là thấy đủ."));
}

/* ================================================================== */
/* Màn hình đăng nhập                                                  */
/* ================================================================== */

async function donSach() {
  try {
    if (navigator.serviceWorker) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }
    if (window.caches) {
      const ks = await caches.keys();
      await Promise.all(ks.map(k => caches.delete(k)));
    }
  } catch (e) {/* bỏ qua */}
  location.reload();
}
function ManHinhCho({
  text
}) {
  const [lau, setLau] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLau(true), 6000);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-[#F7F5FB] flex flex-col items-center justify-center gap-4 px-6 text-center",
    style: {
      fontFamily: "'Inter','Segoe UI',system-ui,sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-slate-400 text-sm"
  }, text), lau && /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Lâu hơn bình thường. Mạng chậm hoặc kết nối bị treo."), /*#__PURE__*/React.createElement("button", {
    onClick: () => location.reload(),
    className: "px-4 py-2 rounded-xl bg-violet-200 text-violet-800 text-sm font-medium hover:bg-violet-300"
  }, "Tải lại trang"), /*#__PURE__*/React.createElement("button", {
    onClick: donSach,
    className: "block w-full text-xs text-violet-500 hover:text-violet-700"
  }, "Xóa bộ nhớ đệm và tải lại"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.Sync) window.Sync.disconnect().finally(() => location.reload());
      else location.reload();
    },
    className: "block w-full text-xs text-slate-400 hover:text-rose-500"
  }, "Vẫn treo? Quay về màn hình đăng nhập")));
}
function ManHinhDangNhap({
  sync,
  banMoi
}) {
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem("fb-email") || "";
    } catch (e) {
      return "";
    }
  });
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [loi, setLoi] = useState("");
  const moBangFile = typeof location !== "undefined" && location.protocol === "file:";
  if (sync.state === "cho") {
    return /*#__PURE__*/React.createElement(ManHinhCho, {
      text: sync.msg || "Đang mở sổ nợ…"
    });
  }
  const dayDu = email.trim() && pass;
  const vao = async () => {
    if (!dayDu || busy) return;
    setLoi("");
    if (!window.Sync) {
      setLoi(moBangFile ? "Trình duyệt chặn thư viện đồng bộ khi mở file trực tiếp. Cần mở qua địa chỉ web." : "Chưa nạp xong thư viện. Chờ vài giây rồi thử lại.");
      return;
    }
    setBusy(true);
    try {
      try {
        localStorage.setItem("fb-email", email.trim());
      } catch (e) {}
      await window.Sync.connect(email, pass);
    } catch (e) {
      setLoi(String(e && (e.code || e.message) || "Không đăng nhập được"));
    }
    setBusy(false);
  };
  const enter = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      vao();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-rose-50 via-violet-50 to-sky-50 flex items-center justify-center p-4",
    style: {
      fontFamily: "'Inter','Segoe UI',system-ui,sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-sm"
  }, banMoi && /*#__PURE__*/React.createElement("button", {
    onClick: () => location.reload(),
    className: "w-full mb-3 bg-violet-500 text-white text-sm py-2 rounded-xl"
  }, "Có bản mới. Bấm để tải lại."), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl"
  }, "📒"), /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-semibold text-slate-800 mt-2"
  }, "Sổ theo dõi trả nợ"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 mt-1"
  }, "Đăng nhập để xem và đồng bộ dữ liệu")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl p-5 shadow-sm space-y-3"
  }, moBangFile && /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-50 border border-amber-300 text-amber-900 rounded-xl p-3 text-sm"
  }, "Bạn đang mở file trực tiếp từ máy nên đồng bộ bị chặn. Hãy mở qua địa chỉ web đã đưa lên Netlify."), /*#__PURE__*/React.createElement(Truong, {
    nhan: "Email"
  }, /*#__PURE__*/React.createElement("input", {
    value: email,
    onChange: e => setEmail(e.target.value),
    onKeyDown: enter,
    type: "email",
    autoComplete: "username",
    className: inp
  })), /*#__PURE__*/React.createElement(Truong, {
    nhan: "Mật khẩu"
  }, /*#__PURE__*/React.createElement("input", {
    value: pass,
    onChange: e => setPass(e.target.value),
    onKeyDown: enter,
    type: "password",
    autoComplete: "current-password",
    className: inp
  })), (loi || sync.state === "loi") && /*#__PURE__*/React.createElement("div", {
    className: "bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-3 text-sm break-words"
  }, sync.state === "loi" && sync.msg ? sync.msg : loi), sync.state === "dang" && !loi && /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 text-sm"
  }, sync.msg || "Đang xử lý…"), /*#__PURE__*/React.createElement("button", {
    onClick: vao,
    disabled: busy || !dayDu,
    className: "w-full py-3 rounded-xl bg-violet-400 text-white font-medium disabled:opacity-30 hover:bg-violet-500"
  }, busy ? "Đang đăng nhập…" : "Đăng nhập"), busy && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 text-center"
  }, "Chờ tối đa 15 giây. Nếu quá lâu app sẽ báo lý do cụ thể ngay tại đây."), !dayDu && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 text-center"
  }, "Điền đủ các ô thì nút mới bấm được.")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 text-center mt-4"
  }, "Đăng nhập một lần, lần sau mở lên là vào thẳng."), /*#__PURE__*/React.createElement("button", {
    onClick: donSach,
    className: "w-full mt-2 text-xs text-slate-400 hover:text-violet-600"
  }, "Vừa cập nhật bản mới mà app lỗi? Xóa bộ nhớ đệm và tải lại")));
}

/* ================================================================== */
/* Nút thêm nổi                                                        */
/* ================================================================== */

function NutThem({
  mo,
  setMo,
  chon
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, mo && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-30 bg-slate-900/20",
    onClick: () => setMo(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2"
  }, mo && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NutNho, {
    nhan: "Chi tiêu",
    mau: "bg-amber-400",
    onClick: () => chon("chi"),
    icon: /*#__PURE__*/React.createElement(ShoppingBag, {
      size: 16
    })
  }), /*#__PURE__*/React.createElement(NutNho, {
    nhan: "Thu nhập",
    mau: "bg-emerald-400",
    onClick: () => chon("thu"),
    icon: /*#__PURE__*/React.createElement(Wallet, {
      size: 16
    })
  }), /*#__PURE__*/React.createElement(NutNho, {
    nhan: "Khoản nợ",
    mau: "bg-violet-400",
    onClick: () => chon("no"),
    icon: /*#__PURE__*/React.createElement(CreditCard, {
      size: 16
    })
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMo(!mo),
    className: `w-12 h-12 rounded-2xl bg-violet-500 text-white shadow-lg flex items-center justify-center transition ${mo ? "rotate-45" : ""}`,
    "aria-label": "Thêm khoản mới"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 22
  }))));
}
function NutNho({
  nhan,
  mau,
  onClick,
  icon
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: `${mau} text-white pl-2.5 pr-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium`
  }, icon, nhan);
}

/* ================================================================== */
/* Lịch                                                                */
/* ================================================================== */

const THU = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
function MonthPicker({
  value,
  allowed,
  onPick,
  onClose
}) {
  const [year, setYear] = useState(parseMk(value).y);
  const set = allowed ? new Set(allowed) : null;
  const minY = allowed ? parseMk(allowed[0]).y : 2020;
  const maxY = allowed ? parseMk(allowed[allowed.length - 1]).y : 2040;
  return /*#__PURE__*/React.createElement(Sheet, {
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => year > minY && setYear(year - 1),
    disabled: year <= minY,
    className: "p-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-25",
    "aria-label": "Năm trước"
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-semibold text-slate-800"
  }, year), /*#__PURE__*/React.createElement("button", {
    onClick: () => year < maxY && setYear(year + 1),
    disabled: year >= maxY,
    className: "p-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-25",
    "aria-label": "Năm sau"
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2"
  }, Array.from({
    length: 12
  }, (_, i) => i + 1).map(m => {
    const k = mk(year, m);
    const on = k === value;
    const off = set ? !set.has(k) : false;
    return /*#__PURE__*/React.createElement("button", {
      key: m,
      onClick: () => !off && onPick(k),
      disabled: off,
      className: `py-3 rounded-2xl text-sm font-medium transition ${on ? "bg-violet-400 text-white shadow" : off ? "bg-slate-50 text-slate-300" : "bg-violet-50 text-violet-700 hover:bg-violet-100"}`
    }, "Th ", String(m).padStart(2, "0"));
  })));
}
function DayGrid({
  value,
  onPick,
  tone = "violet",
  month
}) {
  const tones = {
    violet: {
      on: "bg-violet-400 text-white",
      off: "bg-violet-50 text-violet-600 hover:bg-violet-100"
    },
    emerald: {
      on: "bg-emerald-400 text-white",
      off: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
    },
    amber: {
      on: "bg-amber-400 text-white",
      off: "bg-amber-50 text-amber-700 hover:bg-amber-100"
    }
  }[tone];
  const {
    y,
    m
  } = parseMk(month || mk(2026, 1));
  const soNgay = new Date(y, m, 0).getDate();
  const thuDau = (new Date(y, m - 1, 1).getDay() + 6) % 7;
  const o = [];
  for (let i = 0; i < thuDau; i++) o.push(null);
  for (let d = 1; d <= 31; d++) o.push(d);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-1 mb-1"
  }, THU.map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    className: `text-center text-[11px] font-medium ${t === "CN" ? "text-rose-400" : "text-slate-400"}`
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-1"
  }, o.map((d, i) => d === null ? /*#__PURE__*/React.createElement("div", {
    key: "x" + i
  }) : /*#__PURE__*/React.createElement("button", {
    key: d,
    type: "button",
    onClick: () => onPick(d),
    className: `aspect-square rounded-lg text-xs font-medium transition ${+value === d ? `${tones.on} shadow` : tones.off} ${d > soNgay ? "opacity-60" : ""}`
  }, d))), +value > 28 && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1.5 mt-2"
  }, "Tháng nào không có ngày ", value, " thì tính vào ngày cuối tháng đó."));
}

/* ================================================================== */
/* Form thêm và sửa                                                    */
/* ================================================================== */

function FormModal({
  modal,
  month,
  nguon,
  nguonGanNhat,
  onClose,
  onSave,
  onOpenPicker
}) {
  const e = modal.edit;
  const loai = modal.loai;
  const laNo = loai === "no",
    laThu = loai === "thu",
    laChi = loai === "chi";
  const [f, setF] = useState(() => {
    if (laNo) return {
      name: e?.name || "",
      source: e?.source || "",
      amount: e?.amount ?? "",
      periods: e?.periods ?? "",
      day: e?.day ?? "",
      start: e?.start || month
    };
    if (laThu) return {
      name: e?.name || "",
      amount: e?.amount ?? "",
      day: e?.day ?? "",
      month: e?.month || month,
      repeat: e ? !!e.repeat : true
    };
    return {
      name: e?.name || "",
      amount: e?.amount ?? "",
      day: e?.day ?? new Date().getDate(),
      month: e?.month || month,
      nhom: e?.nhom || "an",
      nguon: e?.nguon || nguonGanNhat || nguon[0]?.id
    };
  });
  const [ov, setOv] = useState(e?.ov || {});
  const set = (k, v) => setF(p => ({
    ...p,
    [k]: v
  }));
  const ovKeys = Object.keys(ov).sort();
  const monthValue = laNo ? f.start : f.month;
  const ok = laNo ? f.name && +f.amount > 0 && +f.periods > 0 && +f.day >= 1 : f.name && +f.amount > 0 && +f.day >= 1;
  const luu = () => {
    if (!ok) return;
    if (laNo) onSave({
      id: e?.id || `u${Date.now()}`,
      name: f.name.trim(),
      source: f.source.trim() || "Khác",
      amount: +f.amount,
      periods: +f.periods,
      day: +f.day,
      start: f.start,
      ov
    });else if (laThu) onSave({
      id: e?.id || `i${Date.now()}`,
      name: f.name.trim(),
      amount: +f.amount,
      day: +f.day,
      month: f.month,
      repeat: f.repeat
    });else onSave({
      id: e?.id || `c${Date.now()}`,
      name: f.name.trim(),
      amount: +f.amount,
      day: +f.day,
      month: f.month,
      nhom: f.nhom,
      nguon: f.nguon
    });
  };
  const tieuDe = laNo ? e ? "Sửa khoản nợ" : "Thêm khoản nợ" : laThu ? e ? "Sửa khoản thu" : "Thêm thu nhập" : e ? "Sửa khoản chi" : "Thêm chi tiêu";
  return /*#__PURE__*/React.createElement(Sheet, {
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-semibold text-slate-800"
  }, tieuDe), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-1 text-slate-300 hover:text-slate-700",
    "aria-label": "Đóng"
  }, /*#__PURE__*/React.createElement(X, {
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2.5"
  }, /*#__PURE__*/React.createElement(Truong, {
    nhan: laNo ? "Tên khoản nợ" : laThu ? "Tên khoản thu" : "Tiêu gì"
  }, /*#__PURE__*/React.createElement("input", {
    value: f.name,
    onChange: ev => set("name", ev.target.value),
    placeholder: laNo ? "VD: Trả góp xe" : laThu ? "VD: Lương tháng" : "VD: Cơm trưa",
    className: inp
  })), laNo && /*#__PURE__*/React.createElement(Truong, {
    nhan: "Nguồn hoặc app"
  }, /*#__PURE__*/React.createElement("input", {
    value: f.source,
    onChange: ev => set("source", ev.target.value),
    placeholder: "VD: MoMo, Sacombank",
    className: inp
  })), /*#__PURE__*/React.createElement("div", {
    className: laNo ? "grid grid-cols-2 gap-3" : ""
  }, /*#__PURE__*/React.createElement(Truong, {
    nhan: laNo ? "Số tiền mỗi kỳ" : "Số tiền"
  }, /*#__PURE__*/React.createElement(NumInput, {
    value: f.amount,
    onChange: v => set("amount", v),
    className: `${inp} tabular-nums`
  })), laNo && /*#__PURE__*/React.createElement(Truong, {
    nhan: "Tổng số kỳ"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "numeric",
    value: f.periods,
    onChange: ev => set("periods", ev.target.value),
    placeholder: "12",
    className: inp
  }))), laChi && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Truong, {
    nhan: "Nhóm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2"
  }, NHOM.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.id,
    type: "button",
    onClick: () => set("nhom", n.id),
    className: `py-1.5 rounded-lg text-sm font-medium transition ${f.nhom === n.id ? `${n.nen} text-white` : `${n.nhat} ${n.chu}`}`
  }, n.ten)))), /*#__PURE__*/React.createElement(Truong, {
    nhan: "Trả bằng"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, nguon.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.id,
    type: "button",
    onClick: () => set("nguon", n.id),
    className: `px-2.5 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition ${f.nguon === n.id ? n.traSau ? "bg-sky-400 text-white" : "bg-emerald-400 text-white" : n.traSau ? "bg-sky-50 text-sky-700" : "bg-emerald-50 text-emerald-700"}`
  }, n.traSau ? /*#__PURE__*/React.createElement(CreditCard, {
    size: 13
  }) : /*#__PURE__*/React.createElement(Banknote, {
    size: 13
  }), n.ten))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-1.5"
  }, nguon.find(n => n.id === f.nguon)?.traSau ? "Trả sau: không trừ dòng tiền tháng này, sẽ vào hóa đơn tháng sau." : "Trả ngay: trừ vào dòng tiền đúng ngày chi."))), laNo && ovKeys.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-50 border border-amber-200 rounded-xl p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-amber-800 mb-2"
  }, ovKeys.length, " kỳ có số tiền riêng, không đổi theo ô số tiền ở trên."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, ovKeys.map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-500 w-14 shrink-0"
  }, shortMonth(k)), /*#__PURE__*/React.createElement(NumInput, {
    value: ov[k],
    onChange: v => setOv(o => ({
      ...o,
      [k]: v === "" ? 0 : v
    })),
    className: "flex-1 text-right tabular-nums text-sm bg-white border border-amber-200 rounded-lg px-2 py-1 outline-none focus:border-amber-400"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOv(o => {
      const n = {
        ...o
      };
      delete n[k];
      return n;
    }),
    className: "p-1 text-amber-500 hover:text-rose-500",
    "aria-label": "Bỏ số riêng"
  }, /*#__PURE__*/React.createElement(X, {
    size: 14
  }))))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOv({}),
    className: "mt-2 text-xs text-amber-700 underline hover:text-rose-600"
  }, "Dùng một mức chung cho tất cả các kỳ")), /*#__PURE__*/React.createElement(Truong, {
    nhan: laNo ? "Kỳ đầu tiên rơi vào tháng" : laThu ? "Bắt đầu từ tháng" : "Thuộc tháng"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onOpenPicker({
      value: monthValue,
      onPick: k => set(laNo ? "start" : "month", k)
    }),
    className: `${inp} flex items-center justify-between text-left hover:border-violet-300`
  }, /*#__PURE__*/React.createElement("span", null, monthLabel(monthValue)), /*#__PURE__*/React.createElement(CalendarDays, {
    size: 16,
    className: "text-violet-400"
  }))), /*#__PURE__*/React.createElement(ChonNgay, {
    nhan: laNo ? "Đến hạn ngày" : laThu ? "Nhận tiền ngày" : "Chi vào ngày",
    value: f.day,
    onPick: d => set("day", d),
    tone: laNo ? "violet" : laThu ? "emerald" : "amber",
    month: monthValue,
    lapLai: !laChi
  }), laThu && /*#__PURE__*/React.createElement("label", {
    className: "flex items-center gap-2 text-sm text-slate-600 pt-1"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: f.repeat,
    onChange: ev => set("repeat", ev.target.checked),
    className: "w-4 h-4 accent-emerald-400"
  }), "Lặp lại hàng tháng")), /*#__PURE__*/React.createElement("button", {
    onClick: luu,
    disabled: !ok,
    className: "mt-4 w-full py-2.5 rounded-xl bg-violet-300 text-violet-900 font-medium disabled:opacity-30 hover:bg-violet-400"
  }, e ? "Lưu thay đổi" : "Thêm"));
}

/* ================================================================== */
/* Mảnh nhỏ dùng chung                                                 */
/* ================================================================== */

const inp = "w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-violet-300 bg-white text-slate-700";
function ChonNgay({
  nhan,
  value,
  onPick,
  tone,
  month,
  lapLai
}) {
  const [mo, setMo] = useState(!value);
  const mau = {
    violet: "bg-violet-100 text-violet-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700"
  }[tone];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setMo(!mo),
    className: "w-full flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2 hover:border-violet-300"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, nhan), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: `${mau} px-2 py-0.5 rounded-lg text-sm font-semibold`
  }, value ? value : "chọn", value && lapLai ? " hàng tháng" : ""), mo ? /*#__PURE__*/React.createElement(ChevronUp, {
    size: 15,
    className: "text-slate-400"
  }) : /*#__PURE__*/React.createElement(ChevronDown, {
    size: 15,
    className: "text-slate-400"
  }))), mo && /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement(DayGrid, {
    value: value,
    onPick: d => {
      onPick(d);
      setMo(false);
    },
    tone: tone,
    month: month
  })));
}
function Truong({
  nhan,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400 mb-1 block"
  }, nhan), children);
}
function NumInput({
  value,
  onChange,
  className,
  placeholder = "0"
}) {
  return /*#__PURE__*/React.createElement("input", {
    type: "text",
    inputMode: "numeric",
    value: value === "" || value === undefined ? "" : fmt(value),
    onChange: e => {
      const d = digits(e.target.value);
      onChange(d === "" ? "" : +d);
    },
    placeholder: placeholder,
    className: className
  });
}
function ChiSo({
  nhan,
  gt,
  tot
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl p-2.5 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-slate-400 text-xs"
  }, nhan), /*#__PURE__*/React.createElement("div", {
    className: `font-bold tabular-nums mt-0.5 text-sm ${tot ? "text-emerald-500" : "text-rose-500"}`
  }, fmt(gt)));
}
function ONho({
  nhan,
  gt,
  chu,
  nen
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `${nen} rounded-2xl p-3 shadow-sm`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500"
  }, nhan), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-slate-800 tabular-nums mt-1"
  }, chu ?? `${fmt(gt)}đ`));
}
function Muc({
  tieuDe,
  mo,
  bat,
  them,
  children
}) {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2 px-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: bat,
    className: "flex items-center gap-1 font-semibold text-slate-700"
  }, tieuDe, mo ? /*#__PURE__*/React.createElement(ChevronUp, {
    size: 16
  }) : /*#__PURE__*/React.createElement(ChevronDown, {
    size: 16
  })), them && /*#__PURE__*/React.createElement("button", {
    onClick: them,
    className: "flex items-center gap-1 text-sm bg-violet-200 text-violet-800 px-3 py-1.5 rounded-xl hover:bg-violet-300"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 14
  }), " Thêm")), mo && children);
}
function Dong({
  nhan,
  mau,
  ten,
  phu,
  tien,
  tienMau,
  done,
  sua,
  xoa
}) {
  const mauNhan = {
    emerald: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-500"
  }[mau];
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 px-3 py-2.5 border-b border-slate-50 last:border-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-9 shrink-0 text-center rounded-xl py-1.5 text-xs font-bold ${mauNhan}`
  }, nhan), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: `font-medium truncate ${done ? "text-slate-300 line-through" : "text-slate-700"}`
  }, ten), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400"
  }, phu)), /*#__PURE__*/React.createElement("span", {
    className: `tabular-nums text-sm font-semibold shrink-0 ${tienMau}`
  }, tien), /*#__PURE__*/React.createElement("button", {
    onClick: sua,
    className: "p-1.5 text-slate-300 hover:text-violet-500",
    "aria-label": "Sửa"
  }, /*#__PURE__*/React.createElement(Pencil, {
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    onClick: xoa,
    className: "p-1.5 text-slate-300 hover:text-rose-500",
    "aria-label": "Xóa"
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 15
  })));
}
function Trong({
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl p-6 text-center text-sm text-slate-400 shadow-sm"
  }, text);
}
function Sheet({
  children,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/30 backdrop-blur-sm sm:p-4",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-4 sm:p-5 max-h-[85vh] overflow-y-auto",
    onClick: e => e.stopPropagation()
  }, children));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
