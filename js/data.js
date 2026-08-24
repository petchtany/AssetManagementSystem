// --- DATA STORE & LOCALSTORAGE SYNCHRONIZATION ---

const DEFAULT_CATEGORIES = [
  {
    id: 1,
    code: "CAT-01",
    name: "ครุภัณฑ์คอมพิวเตอร์และสารสนเทศ",
    icon: "ph-desktop",
    color: "blue",
    count: 480,
    desc: "คอมพิวเตอร์ตั้งโต๊ะ, โน้ตบุ๊ก, เซิร์ฟเวอร์, แท็บเล็ต, จอภาพ และอุปกรณ์ประมวลผล",
    isActive: true
  },
  {
    id: 2,
    code: "CAT-02",
    name: "ครุภัณฑ์สำนักงาน",
    icon: "ph-chair",
    color: "amber",
    count: 320,
    desc: "โต๊ะทำงาน, ตู้เก็บเอกสาร, เก้าอี้สำนักงาน, เครื่องพิมพ์, เครื่องทำลายเอกสาร",
    isActive: true
  },
  {
    id: 3,
    code: "CAT-03",
    name: "ครุภัณฑ์อุปกรณ์เครือข่ายและการสื่อสาร",
    icon: "ph-wifi-high",
    color: "cyan",
    count: 145,
    desc: "Switch, Router, Access Point, ตู้ Rack, ระบบโทรศัพท์ IP, สายสัญญาณหลัก",
    isActive: true
  },
  {
    id: 4,
    code: "CAT-04",
    name: "ครุภัณฑ์โสตทัศนูปกรณ์",
    icon: "ph-projector-screen",
    color: "purple",
    count: 85,
    desc: "โปรเจคเตอร์, จอ Interactive Touch Screen, เครื่องเสียง, ไมโครโฟน, กล้องบันทึกภาพ",
    isActive: true
  },
  {
    id: 5,
    code: "CAT-05",
    name: "ครุภัณฑ์ไฟฟ้าและวิทยุ",
    icon: "ph-lightning",
    color: "indigo",
    count: 110,
    desc: "เครื่องปรับอากาศ, เครื่องสำรองไฟฟ้า (UPS), เครื่องกำเนิดไฟฟ้า, หม้อแปลงไฟฟ้า",
    isActive: true
  },
  {
    id: 6,
    code: "CAT-06",
    name: "ครุภัณฑ์ยานพาหนะและขนส่ง",
    icon: "ph-car",
    color: "emerald",
    count: 14,
    desc: "รถยนต์ส่วนกลาง, รถตู้โดยสาร, รถกระบะบรรทุก, รถจักรยานยนต์ตรวจการ",
    isActive: true
  },
  {
    id: 7,
    code: "CAT-07",
    name: "ครุภัณฑ์วิทยาศาสตร์และการแพทย์",
    icon: "ph-flask",
    color: "rose",
    count: 42,
    desc: "กล้องจุลทรรศน์, เครื่องวัดความดัน, ตู้บ่มเพาะเชื้อ, เครื่องชั่งสารละเอียด",
    isActive: true
  },
  {
    id: 8,
    code: "CAT-08",
    name: "ครุภัณฑ์งานบ้านงานครัว",
    icon: "ph-cooking-pot",
    color: "teal",
    count: 38,
    desc: "ตู้เย็น, ไมโครเวฟ, ตู้กดน้ำร้อน-เย็น, เครื่องฟอกอากาศ, เครื่องล้างจาน",
    isActive: true
  },
  {
    id: 9,
    code: "CAT-09",
    name: "ครุภัณฑ์ก่อสร้างและเครื่องมือช่าง",
    icon: "ph-wrench",
    color: "orange",
    count: 64,
    desc: "สว่านแท่น, เครื่องเชื่อมไฟฟ้า, เครื่องตัดไฟเบอร์, ชุดเครื่องมือช่างกล",
    isActive: true
  },
  {
    id: 10,
    code: "CAT-10",
    name: "ครุภัณฑ์การเกษตรและสิ่งแวดล้อม",
    icon: "ph-plant",
    color: "green",
    count: 20,
    desc: "เครื่องตัดหญ้า, ปั๊มน้ำแรงดันสูง, เครื่องพ่นละอองยา, เครื่องวัดสภาพอากาศ",
    isActive: true
  }
];

const DEFAULT_LOCATIONS = [
  {
    id: 1,
    code: "LOC-01",
    name: "ห้องธุรการและสารบรรณ",
    building: "อาคารอำนวยการ",
    floor: "ชั้น 1",
    responsiblePerson: "สมชาย ใจดี",
    phone: "1101",
    count: 45,
    desc: "ศูนย์กลางงานสารบรรณ พัสดุ และเอกสารธุรการของหน่วยงาน",
    isActive: true
  },
  {
    id: 2,
    code: "LOC-02",
    name: "ห้องปฏิบัติการคอมพิวเตอร์ 1",
    building: "อาคารเทคโนโลยี",
    floor: "ชั้น 2",
    responsiblePerson: "วิภาดา สอนดี",
    phone: "1201",
    count: 82,
    desc: "ห้องปฏิบัติการคอมพิวเตอร์สำหรับการเรียนรู้และฝึกอบรม",
    isActive: true
  },
  {
    id: 3,
    code: "LOC-03",
    name: "ห้องปฏิบัติการคอมพิวเตอร์ 2",
    building: "อาคารเทคโนโลยี",
    floor: "ชั้น 2",
    responsiblePerson: "อนันต์ ระบบดี",
    phone: "1202",
    count: 75,
    desc: "ห้องปฏิบัติการระบบเครือข่ายและซอฟต์แวร์ประยุกต์",
    isActive: true
  },
  {
    id: 4,
    code: "LOC-04",
    name: "ห้องประชุมใหญ่ (Auditorium)",
    building: "อาคารอำนวยการ",
    floor: "ชั้น 3",
    responsiblePerson: "พงษ์ศิริ มัลติมีเดีย",
    phone: "1301",
    count: 38,
    desc: "ห้องประชุมขนาดใหญ่พร้อมระบบภาพ แสง เสียง และโปรเจคเตอร์",
    isActive: true
  },
  {
    id: 5,
    code: "LOC-05",
    name: "ห้องกลุ่มงานวิชาการ",
    building: "อาคาร 1",
    floor: "ชั้น 2",
    responsiblePerson: "กิตติพงษ์ งานดี",
    phone: "1401",
    count: 52,
    desc: "ห้องทำงานและประสานงานกลุ่มงานวิชาการและทะเบียน",
    isActive: true
  },
  {
    id: 6,
    code: "LOC-06",
    name: "ห้องศูนย์เซิร์ฟเวอร์และระบบเครือข่าย",
    building: "อาคารเทคโนโลยี",
    floor: "ชั้น 1",
    responsiblePerson: "อนันต์ ระบบดี",
    phone: "1200",
    count: 64,
    desc: "ศูนย์คอมพิวเตอร์ Data Center ตู้ Rack และอุปกรณ์เครือข่ายหลัก",
    isActive: true
  },
  {
    id: 7,
    code: "LOC-07",
    name: "ห้องปฏิบัติการวิทยาศาสตร์",
    building: "อาคารวิทยาศาสตร์",
    floor: "ชั้น 3",
    responsiblePerson: "ดร. สุภาภรณ์ วิทย์ดี",
    phone: "1501",
    count: 48,
    desc: "ห้องทดลองวิทยาศาสตร์ เครื่องมือวัด และอุปกรณ์ทดลอง",
    isActive: true
  },
  {
    id: 8,
    code: "LOC-08",
    name: "ลานจอดรถส่วนกลางและโรงซ่อมบำรุง",
    building: "อาคารซ่อมบำรุง",
    floor: "ชั้น 1",
    responsiblePerson: "สมพงษ์ ขับปลอดภัย",
    phone: "1601",
    count: 26,
    desc: "พื้นที่จอดรถส่วนกลาง โรงเก็บพัสดุขนาดใหญ่ และเครื่องมือช่าง",
    isActive: true
  }
];

const DEFAULT_ASSETS = [
  {
    id: 1,
    code: "DEMO-2569-001",
    serial: "DEMO00001",
    name: "คอมพิวเตอร์สำนักงาน 01",
    brandModel: "Dell / OptiPlex 7090",
    categoryId: 1,
    location: "ห้องธุรการและสารบรรณ",
    responsiblePerson: "สมชาย ใจดี",
    status: "in_use",
    condition: "ดี",
    icon: "ph-desktop",
    iconColor: "text-blue-500"
  },
  {
    id: 2,
    code: "DEMO-2569-002",
    serial: "DEMO00002",
    name: "จอแสดงผล Dell 24 นิ้ว",
    brandModel: "Dell / P2419H",
    categoryId: 1,
    location: "ห้องธุรการและสารบรรณ",
    responsiblePerson: "สมชาย ใจดี",
    status: "in_use",
    condition: "ดี",
    icon: "ph-desktop",
    iconColor: "text-blue-500"
  },
  {
    id: 3,
    code: "DEMO-2569-003",
    serial: "DEMO00003",
    name: "Notebook ครู 01",
    brandModel: "Lenovo / ThinkBook 14",
    categoryId: 1,
    location: "ห้องปฏิบัติการคอมพิวเตอร์ 1",
    responsiblePerson: "วิภาดา สอนดี",
    status: "borrowed",
    condition: "ดี",
    icon: "ph-laptop",
    iconColor: "text-indigo-500"
  },
  {
    id: 4,
    code: "DEMO-2569-004",
    serial: "DEMO00004",
    name: "ชุดโต๊ะทำงานผู้บริหารพร้อมตู้เอกสาร",
    brandModel: "Modernform / Executive Series",
    categoryId: 2,
    location: "ห้องธุรการและสารบรรณ",
    responsiblePerson: "ผู้อำนวยการ",
    status: "in_use",
    condition: "ดี",
    icon: "ph-chair",
    iconColor: "text-amber-500"
  },
  {
    id: 5,
    code: "DEMO-2569-005",
    serial: "DEMO00005",
    name: "เครื่องพิมพ์เลเซอร์สี Multifunction",
    brandModel: "HP / LaserJet Pro MFP M479",
    categoryId: 2,
    location: "ห้องกลุ่มงานวิชาการ",
    responsiblePerson: "กิตติพงษ์ งานดี",
    status: "maintenance",
    condition: "ชำรุด (รออะไหล่)",
    icon: "ph-printer",
    iconColor: "text-orange-500"
  },
  {
    id: 6,
    code: "DEMO-2569-006",
    serial: "DEMO00006",
    name: "Core Switch 48-Port PoE+",
    brandModel: "Cisco / Catalyst 9300",
    categoryId: 3,
    location: "ห้องศูนย์เซิร์ฟเวอร์และระบบเครือข่าย",
    responsiblePerson: "อนันต์ ระบบดี",
    status: "in_use",
    condition: "ดี",
    icon: "ph-wifi-high",
    iconColor: "text-cyan-500"
  },
  {
    id: 7,
    code: "DEMO-2569-007",
    serial: "DEMO00007",
    name: "โปรเจคเตอร์ 4K Laser ความสว่างสูง",
    brandModel: "Epson / EB-L630U",
    categoryId: 4,
    location: "ห้องประชุมใหญ่ (Auditorium)",
    responsiblePerson: "พงษ์ศิริ มัลติมีเดีย",
    status: "in_use",
    condition: "ดี",
    icon: "ph-projector-screen",
    iconColor: "text-purple-500"
  },
  {
    id: 8,
    code: "DEMO-2569-008",
    serial: "DEMO00008",
    name: "รถตู้โดยสาร 11 ที่นั่ง",
    brandModel: "Toyota / Commuter 2.8",
    categoryId: 6,
    location: "ลานจอดรถส่วนกลางและโรงซ่อมบำรุง",
    responsiblePerson: "สมพงษ์ ขับปลอดภัย",
    status: "in_use",
    condition: "ดี",
    icon: "ph-car",
    iconColor: "text-emerald-500"
  }
];

const DEFAULT_TRANSFERS = [
  {
    id: 1,
    docNo: "MV-2569-001",
    type: "borrow",
    assetId: 3,
    assetCode: "DEMO-2569-003",
    assetName: "Notebook ครู 01",
    person: "วิภาดา สอนดี",
    fromLocation: "ห้องปฏิบัติการคอมพิวเตอร์ 1",
    toLocation: "-",
    startDate: "2026-08-20",
    dueDate: "2026-08-27",
    status: "borrowing"
  },
  {
    id: 2,
    docNo: "MV-2569-002",
    type: "transfer",
    assetId: 7,
    assetCode: "DEMO-2569-007",
    assetName: "โปรเจคเตอร์ 4K Laser ความสว่างสูง",
    person: "พงษ์ศิริ มัลติมีเดีย",
    fromLocation: "ห้องธุรการและสารบรรณ",
    toLocation: "ห้องประชุมใหญ่ (Auditorium)",
    startDate: "2026-08-18",
    dueDate: "-",
    status: "completed"
  },
  {
    id: 3,
    docNo: "MV-2569-003",
    type: "return",
    assetId: 2,
    assetCode: "DEMO-2569-002",
    assetName: "จอแสดงผล Dell 24 นิ้ว",
    person: "สมเกียรติ มั่นคง",
    fromLocation: "-",
    toLocation: "ห้องธุรการและสารบรรณ",
    startDate: "2026-08-15",
    dueDate: "2026-08-15",
    status: "completed"
  }
];

// Clean concise initial maintenance records
const DEFAULT_MAINTENANCE = [
  {
    id: 1,
    repairNo: "REP-2569-001",
    assetId: 5,
    assetCode: "DEMO-2569-005",
    assetName: "เครื่องพิมพ์เลเซอร์สี Multifunction",
    problem: "พิมพ์เอกสารไม่ออก กระดาษติด และมีเสียงดังผิดปกติ",
    reporter: "กิตติพงษ์ งานดี",
    repairDate: "2026-08-21",
    status: "pending" // 'pending' (กำลังซ่อม), 'completed' (ซ่อมเสร็จแล้ว)
  },
  {
    id: 2,
    repairNo: "REP-2569-002",
    assetId: 1,
    assetCode: "DEMO-2569-001",
    assetName: "คอมพิวเตอร์สำนักงาน 01",
    problem: "เปิดไม่ติด พาวเวอร์ซัพพลายเสื่อมสภาพ",
    reporter: "สมชาย ใจดี",
    repairDate: "2026-08-10",
    status: "completed"
  }
];

const availableIcons = [
  'ph-desktop', 'ph-chair', 'ph-wifi-high', 'ph-projector-screen',
  'ph-lightning', 'ph-car', 'ph-flask', 'ph-cooking-pot',
  'ph-wrench', 'ph-plant', 'ph-package', 'ph-printer',
  'ph-camera', 'ph-headphones', 'ph-gear', 'ph-buildings'
];

// Helper Functions
function formatNumber(num) {
  return Number(num).toLocaleString('th-TH');
}

function getCategoryColorClass(color) {
  const map = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', tag: 'bg-blue-100 text-blue-800' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', tag: 'bg-amber-100 text-amber-800' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', tag: 'bg-emerald-100 text-emerald-800' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', tag: 'bg-purple-100 text-purple-800' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', tag: 'bg-cyan-100 text-cyan-800' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', tag: 'bg-indigo-100 text-indigo-800' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', tag: 'bg-rose-100 text-rose-800' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', tag: 'bg-orange-100 text-orange-800' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', tag: 'bg-teal-100 text-teal-800' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', tag: 'bg-green-100 text-green-800' },
  };
  return map[color] || map.blue;
}

// LocalStorage Handlers
function loadCategories() {
  try {
    const saved = localStorage.getItem('kurupan_categories');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [...DEFAULT_CATEGORIES];
}

function saveCategories(cats) {
  try {
    localStorage.setItem('kurupan_categories', JSON.stringify(cats));
  } catch (e) {}
}

function loadLocations() {
  try {
    const saved = localStorage.getItem('kurupan_locations');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [...DEFAULT_LOCATIONS];
}

function saveLocations(locs) {
  try {
    localStorage.setItem('kurupan_locations', JSON.stringify(locs));
  } catch (e) {}
}

function loadAssets() {
  try {
    const saved = localStorage.getItem('kurupan_assets');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [...DEFAULT_ASSETS];
}

function saveAssets(ast) {
  try {
    localStorage.setItem('kurupan_assets', JSON.stringify(ast));
  } catch (e) {}
}

function loadTransfers() {
  try {
    const saved = localStorage.getItem('kurupan_transfers');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [...DEFAULT_TRANSFERS];
}

function saveTransfers(list) {
  try {
    localStorage.setItem('kurupan_transfers', JSON.stringify(list));
  } catch (e) {}
}

function loadMaintenance() {
  try {
    const saved = localStorage.getItem('kurupan_maintenance');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [...DEFAULT_MAINTENANCE];
}

function saveMaintenance(list) {
  try {
    localStorage.setItem('kurupan_maintenance', JSON.stringify(list));
  } catch (e) {}
}

// Global active in-memory state
let categories = loadCategories();
let locations = loadLocations();
let assets = loadAssets();
let transfers = loadTransfers();
let maintenance = loadMaintenance();
