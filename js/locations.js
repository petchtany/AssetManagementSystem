// --- LOCATION MANAGEMENT CONTROLLER ---

let locationViewMode = 'grid'; // 'grid' or 'table'

function initLocationPage() {
  renderSidebar('locations');
  renderHeader('สถานที่ / ห้อง');
  updateBuildingFilter();
  renderLocationView();
}

function updateBuildingFilter() {
  const bldgFilter = document.getElementById('filter-location-building');
  if (!bldgFilter) return;
  const uniqueBuildings = [...new Set(locations.map(l => l.building))];
  const curBldgVal = bldgFilter.value;
  bldgFilter.innerHTML = '<option value="">ทุกอาคาร</option>';
  uniqueBuildings.forEach(bldg => {
    const opt = document.createElement('option');
    opt.value = bldg;
    opt.textContent = bldg;
    bldgFilter.appendChild(opt);
  });
  bldgFilter.value = curBldgVal;
}

function renderLocationView() {
  const searchInput = document.getElementById('search-location-input');
  const searchTerm = (searchInput ? searchInput.value : '').toLowerCase().trim();
  const bldgFilter = document.getElementById('filter-location-building') ? document.getElementById('filter-location-building').value : '';
  const sortSelect = document.getElementById('sort-location-select');
  const sortBy = sortSelect ? sortSelect.value : 'code_asc';

  let filtered = locations.filter(loc => {
    const matchesSearch = !searchTerm ||
      loc.name.toLowerCase().includes(searchTerm) ||
      loc.code.toLowerCase().includes(searchTerm) ||
      loc.building.toLowerCase().includes(searchTerm) ||
      (loc.responsiblePerson && loc.responsiblePerson.toLowerCase().includes(searchTerm)) ||
      (loc.desc && loc.desc.toLowerCase().includes(searchTerm));

    const matchesBldg = !bldgFilter || loc.building === bldgFilter;

    return matchesSearch && matchesBldg;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'code_asc') return a.code.localeCompare(b.code);
    if (sortBy === 'count_desc') return b.count - a.count;
    if (sortBy === 'name_asc') return a.name.localeCompare(b.name, 'th');
    if (sortBy === 'building_asc') return a.building.localeCompare(b.building, 'th');
    return 0;
  });

  // Update KPI Cards
  const totalStat = document.getElementById('loc-stat-total');
  if (totalStat) totalStat.innerHTML = locations.length + ' <span class="text-xs font-normal text-slate-500">แห่ง</span>';
  
  const uniqueBldgs = new Set(locations.map(l => l.building));
  const bldgsStat = document.getElementById('loc-stat-buildings');
  if (bldgsStat) bldgsStat.innerHTML = uniqueBldgs.size + ' <span class="text-xs font-normal text-slate-500">อาคาร</span>';

  let maxLoc = locations.reduce((prev, current) => (prev.count > current.count) ? prev : current, locations[0]);
  if (maxLoc) {
    const maxStat = document.getElementById('loc-stat-max');
    const maxCountStat = document.getElementById('loc-stat-max-count');
    if (maxStat) maxStat.textContent = maxLoc.name;
    if (maxCountStat) maxCountStat.textContent = formatNumber(maxLoc.count) + ' ชิ้น';
  }

  let totalItems = locations.reduce((sum, l) => sum + (l.count || 0), 0);
  const totalItemsStat = document.getElementById('loc-stat-total-items');
  if (totalItemsStat) totalItemsStat.innerHTML = formatNumber(totalItems) + ' <span class="text-xs font-normal text-slate-500">ชิ้น</span>';

  // Render Grid View
  const gridContainer = document.getElementById('location-grid-container');
  if (gridContainer) {
    gridContainer.innerHTML = '';
    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <i class="ph ph-map-pin-line text-5xl mb-2 block text-slate-300"></i>
          <p class="text-base font-medium">ไม่พบสถานที่หรือห้องที่ตรงกับการค้นหา</p>
          <p class="text-xs mt-1">ลองเปลี่ยนคำค้นหา หรือกดปุ่ม "เพิ่มสถานที่ / ห้องใหม่"</p>
        </div>
      `;
    } else {
      filtered.forEach(loc => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between group";
        card.innerHTML = `
          <div>
            <div class="flex items-start justify-between gap-3 mb-3.5">
              <div class="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition">
                <i class="ph ph-door"></i>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                  ${loc.code}
                </span>
                <div class="relative">
                  <button onclick="editLocation(${loc.id})" class="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition" title="แก้ไข">
                    <i class="ph ph-pencil-simple text-base"></i>
                  </button>
                  <button onclick="deleteLocation(${loc.id})" class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition" title="ลบ">
                    <i class="ph ph-trash text-base"></i>
                  </button>
                </div>
              </div>
            </div>
            <h3 class="font-bold text-slate-900 text-base leading-snug mb-1 group-hover:text-pink-600 transition">${loc.name}</h3>
            <div class="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
              <span class="inline-flex items-center gap-1"><i class="ph ph-buildings text-slate-400"></i> ${loc.building}</span>
              <span class="text-slate-300">•</span>
              <span>${loc.floor}</span>
            </div>
            <p class="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">${loc.desc || 'ไม่มีคำอธิบาย'}</p>
          </div>
          <div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs mb-3.5 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-slate-400">ผู้รับผิดชอบ:</span>
                <span class="font-medium text-slate-800">${loc.responsiblePerson || '-'}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-400">เบอร์ภายใน:</span>
                <span class="font-mono text-slate-700">${loc.phone || '-'}</span>
              </div>
              <div class="flex items-center justify-between pt-1.5 border-t border-slate-200/60">
                <span class="text-slate-400">จำนวนครุภัณฑ์ในห้อง:</span>
                <span class="font-bold text-slate-900 text-sm">${formatNumber(loc.count)} <span class="font-normal text-xs text-slate-500">ชิ้น</span></span>
              </div>
            </div>
            <a href="assets.html?location=${encodeURIComponent(loc.name)}" class="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-pink-50 text-slate-700 hover:text-pink-600 font-medium text-xs flex items-center justify-center gap-1.5 transition">
              <span>ดูครุภัณฑ์ในห้องนี้</span>
              <i class="ph ph-arrow-right"></i>
            </a>
          </div>
        `;
        gridContainer.appendChild(card);
      });
    }
  }

  // Render Table View
  const tableBody = document.getElementById('location-table-body');
  if (tableBody) {
    tableBody.innerHTML = '';
    filtered.forEach(loc => {
      const tr = document.createElement('tr');
      tr.className = "hover:bg-pink-50/30 transition";
      tr.innerHTML = `
        <td class="py-3.5 px-4 font-mono font-semibold text-slate-700 text-xs">${loc.code}</td>
        <td class="py-3.5 px-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center text-lg flex-shrink-0">
              <i class="ph ph-door"></i>
            </div>
            <div>
              <span class="font-semibold text-slate-800 block">${loc.name}</span>
              <span class="text-xs text-slate-400 line-clamp-1">${loc.desc || '-'}</span>
            </div>
          </div>
        </td>
        <td class="py-3.5 px-4 text-slate-700">${loc.building}</td>
        <td class="py-3.5 px-4 text-center text-slate-600">${loc.floor}</td>
        <td class="py-3.5 px-4 text-slate-700 font-medium">${loc.responsiblePerson || '-'}</td>
        <td class="py-3.5 px-4 text-center font-mono text-xs text-slate-600">${loc.phone || '-'}</td>
        <td class="py-3.5 px-4 text-center font-semibold text-slate-800">${formatNumber(loc.count)} ชิ้น</td>
        <td class="py-3.5 px-4 text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> พร้อมใช้งาน
          </span>
        </td>
        <td class="py-3.5 px-4 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <a href="assets.html?location=${encodeURIComponent(loc.name)}" class="px-2 py-1 text-xs font-medium bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg transition" title="ดูครุภัณฑ์">ดู</a>
            <button onclick="editLocation(${loc.id})" class="px-2 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition" title="แก้ไข">แก้ไข</button>
            <button onclick="deleteLocation(${loc.id})" class="px-2 py-1 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition" title="ลบ">ลบ</button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }
}

function setLocationViewMode(mode) {
  locationViewMode = mode;
  const gridBtn = document.getElementById('btn-view-loc-grid');
  const tableBtn = document.getElementById('btn-view-loc-table');
  const gridEl = document.getElementById('location-grid-container');
  const tableEl = document.getElementById('location-table-container');

  if (mode === 'grid') {
    gridEl.classList.remove('hidden');
    tableEl.classList.add('hidden');
    gridBtn.className = "px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-800 shadow-sm flex items-center gap-1.5 transition";
    tableBtn.className = "px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition";
  } else {
    gridEl.classList.add('hidden');
    tableEl.classList.remove('hidden');
    tableBtn.className = "px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-800 shadow-sm flex items-center gap-1.5 transition";
    gridBtn.className = "px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition";
  }
}

function openAddLocationModal() {
  document.getElementById('loc-form-id').value = '';
  document.getElementById('modal-location-title').textContent = 'เพิ่มสถานที่ / ห้องใหม่';
  document.getElementById('loc-form-code').value = 'LOC-' + String(locations.length + 1).padStart(2, '0');
  document.getElementById('loc-form-name').value = '';
  document.getElementById('loc-form-building').value = 'อาคารอำนวยการ';
  document.getElementById('loc-form-floor').value = 'ชั้น 1';
  document.getElementById('loc-form-person').value = '';
  document.getElementById('loc-form-phone').value = '';
  document.getElementById('loc-form-desc').value = '';

  document.getElementById('modal-location').classList.remove('hidden');
}

function editLocation(id) {
  const loc = locations.find(l => l.id === id);
  if (!loc) return;

  document.getElementById('loc-form-id').value = loc.id;
  document.getElementById('modal-location-title').textContent = 'แก้ไขสถานที่ / ห้อง (' + loc.code + ')';
  document.getElementById('loc-form-code').value = loc.code;
  document.getElementById('loc-form-name').value = loc.name;
  document.getElementById('loc-form-building').value = loc.building;
  document.getElementById('loc-form-floor').value = loc.floor;
  document.getElementById('loc-form-person').value = loc.responsiblePerson || '';
  document.getElementById('loc-form-phone').value = loc.phone || '';
  document.getElementById('loc-form-desc').value = loc.desc || '';

  document.getElementById('modal-location').classList.remove('hidden');
}

function closeLocationModal() {
  document.getElementById('modal-location').classList.add('hidden');
}

function saveLocation(e) {
  e.preventDefault();
  const id = document.getElementById('loc-form-id').value;
  const code = document.getElementById('loc-form-code').value.trim();
  const name = document.getElementById('loc-form-name').value.trim();
  const building = document.getElementById('loc-form-building').value.trim();
  const floor = document.getElementById('loc-form-floor').value.trim();
  const person = document.getElementById('loc-form-person').value.trim();
  const phone = document.getElementById('loc-form-phone').value.trim();
  const desc = document.getElementById('loc-form-desc').value.trim();

  if (id) {
    const index = locations.findIndex(l => l.id === Number(id));
    if (index !== -1) {
      const oldName = locations[index].name;
      locations[index] = {
        ...locations[index],
        code,
        name,
        building,
        floor,
        responsiblePerson: person,
        phone,
        desc
      };
      saveLocations(locations);

      if (oldName !== name) {
        assets.forEach(a => {
          if (a.location === oldName) a.location = name;
        });
        saveAssets(assets);
      }
      showToast('อัปเดตสถานที่ "' + name + '" สำเร็จ');
    }
  } else {
    const newLoc = {
      id: Date.now(),
      code,
      name,
      building,
      floor,
      responsiblePerson: person,
      phone,
      count: 0,
      desc,
      isActive: true
    };
    locations.push(newLoc);
    saveLocations(locations);
    showToast('เพิ่มสถานที่ "' + name + '" เรียบร้อยแล้ว');
  }

  closeLocationModal();
  updateBuildingFilter();
  renderLocationView();
  renderSidebar('locations');
}

function deleteLocation(id) {
  const loc = locations.find(l => l.id === id);
  if (!loc) return;

  if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสถานที่ "' + loc.name + '"?')) {
    locations = locations.filter(l => l.id !== id);
    saveLocations(locations);
    updateBuildingFilter();
    renderLocationView();
    renderSidebar('locations');
    showToast('ลบสถานที่ "' + loc.name + '" แล้ว');
  }
}

window.addEventListener('DOMContentLoaded', initLocationPage);
