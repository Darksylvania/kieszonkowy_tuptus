const categorySelect = document.getElementById('category');
const unitFromSelect = document.getElementById('unitFrom');
const unitToSelect = document.getElementById('unitTo');
const inputValue = document.getElementById('inputValue');
const outputValue = document.getElementById('outputValue');

const widthValue = document.getElementById('widthValue');
const heightValue = document.getElementById('heightValue');
const lengthUnitSelect = document.getElementById('lengthUnit');
const areaUnitSelect = document.getElementById('areaUnit');
const calcAreaButton = document.getElementById('calcArea');
const areaOutput = document.getElementById('areaOutput');

const propA = document.getElementById('propA');
const propB = document.getElementById('propB');
const propC = document.getElementById('propC');
const calcProportionButton = document.getElementById('calcProportion');
const propOutput = document.getElementById('propOutput');

const unitData = {
  length: {
    label: 'Długość',
    base: 'm',
    units: {
      m: { label: 'Metry (m)', factor: 1 },
      km: { label: 'Kilometry (km)', factor: 1000 },
      cm: { label: 'Centymetry (cm)', factor: 0.01 },
      mm: { label: 'Milimetry (mm)', factor: 0.001 },
      in: { label: 'Cale (in)', factor: 0.0254 },
      ft: { label: 'Stopy (ft)', factor: 0.3048 },
      yd: { label: 'Jardy (yd)', factor: 0.9144 },
      mi: { label: 'Mile (mi)', factor: 1609.344 }
    }
  },
  weight: {
    label: 'Masa',
    base: 'kg',
    units: {
      kg: { label: 'Kilogramy (kg)', factor: 1 },
      g: { label: 'Gramy (g)', factor: 0.001 },
      mg: { label: 'Miligramy (mg)', factor: 0.000001 },
      lb: { label: 'Funty (lb)', factor: 0.45359237 },
      oz: { label: 'Uncje (oz)', factor: 0.0283495231 }
    }
  },
  volume: {
    label: 'Objętość',
    base: 'l',
    units: {
      l: { label: 'Litry (L)', factor: 1 },
      ml: { label: 'Mililitry (mL)', factor: 0.001 },
      m3: { label: 'Metry sześcienne (m³)', factor: 1000 },
      cup: { label: 'Kubki (US)', factor: 0.2365882365 },
      pt: { label: 'Pinty (US)', factor: 0.473176473 },
      qt: { label: 'Kwarty (US)', factor: 0.946352946 },
      gal: { label: 'Galony (US)', factor: 3.785411784 }
    }
  },
  area: {
    label: 'Powierzchnia',
    base: 'm2',
    units: {
      m2: { label: 'Metry kwadratowe (m²)', factor: 1 },
      km2: { label: 'Kilometry kwadratowe (km²)', factor: 1_000_000 },
      cm2: { label: 'Centymetry kwadratowe (cm²)', factor: 0.0001 },
      in2: { label: 'Cale kwadratowe (in²)', factor: 0.00064516 },
      ft2: { label: 'Stopy kwadratowe (ft²)', factor: 0.09290304 },
      yd2: { label: 'Jardy kwadratowe (yd²)', factor: 0.83612736 },
      ac: { label: 'Akry (ac)', factor: 4046.8564224 }
    }
  }
};

function buildOptions(selectElement, options) {
  selectElement.innerHTML = '';
  Object.entries(options).forEach(([key, { label }]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = label;
    selectElement.appendChild(option);
  });
}

function setCategory(categoryKey) {
  const category = unitData[categoryKey];
  if (!category) return;

  buildOptions(unitFromSelect, category.units);
  buildOptions(unitToSelect, category.units);

  // Choose a sane default
  unitFromSelect.value = category.base;
  unitToSelect.value = category.base;
}

function formatNumber(value) {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return '—';
  }
  if (Math.abs(value) < 0.000001) {
    return value.toExponential(6);
  }
  return Number(value.toFixed(6)).toString();
}

function convert() {
  const categoryKey = categorySelect.value;
  const category = unitData[categoryKey];
  if (!category) return;

  const value = Number(inputValue.value);
  if (Number.isNaN(value)) {
    outputValue.textContent = '—';
    outputValue.classList.remove('updated');
    return;
  }

  const fromUnit = category.units[unitFromSelect.value];
  const toUnit = category.units[unitToSelect.value];
  if (!fromUnit || !toUnit) return;

  const fromBase = value * fromUnit.factor;
  const converted = fromBase / toUnit.factor;
  outputValue.textContent = `${formatNumber(converted)} ${toUnit.label}`;

  outputValue.classList.add('updated');
  window.clearTimeout(outputValue._resetTimer);
  outputValue._resetTimer = window.setTimeout(() => {
    outputValue.classList.remove('updated');
  }, 600);
}

function calculateArea() {
  const width = Number(widthValue.value);
  const height = Number(heightValue.value);

  if (Number.isNaN(width) || Number.isNaN(height)) {
    areaOutput.textContent = '—';
    areaOutput.classList.remove('updated');
    return;
  }

  const lengthUnit = unitData.length.units[lengthUnitSelect.value];
  const areaUnit = unitData.area.units[areaUnitSelect.value];
  if (!lengthUnit || !areaUnit) return;

  // Convert each dimension to meters, compute m², then convert to target area unit
  const widthMeters = width * lengthUnit.factor;
  const heightMeters = height * lengthUnit.factor;
  const areaMeters = widthMeters * heightMeters;
  const converted = areaMeters / areaUnit.factor;

  areaOutput.textContent = `${formatNumber(converted)} ${areaUnit.label}`;

  areaOutput.classList.add('updated');
  window.clearTimeout(areaOutput._resetTimer);
  areaOutput._resetTimer = window.setTimeout(() => {
    areaOutput.classList.remove('updated');
  }, 600);
}

function calculateProportion() {
  const a = Number(propA.value);
  const b = Number(propB.value);
  const c = Number(propC.value);

  if (Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c) || b === 0) {
    propOutput.textContent = '—';
    propOutput.classList.remove('updated');
    return;
  }

  // Solve A : B = C : D  =>  D = (B * C) / A
  const d = (b * c) / a;
  propOutput.textContent = formatNumber(d);

  propOutput.classList.add('updated');
  window.clearTimeout(propOutput._resetTimer);
  propOutput._resetTimer = window.setTimeout(() => {
    propOutput.classList.remove('updated');
  }, 600);
}

function setupCollapsibles() {
  document.querySelectorAll('.collapsible__header').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.closest('.collapsible');
      if (!section) return;
      section.classList.toggle('collapsed');
    });
  });
}

function init() {
  buildOptions(categorySelect, Object.fromEntries(
    Object.entries(unitData).map(([key, data]) => [key, { label: data.label }])
  ));

  const firstCategory = Object.keys(unitData)[0];
  categorySelect.value = firstCategory;
  setCategory(firstCategory);

  buildOptions(lengthUnitSelect, unitData.length.units);
  buildOptions(areaUnitSelect, unitData.area.units);

  categorySelect.addEventListener('change', () => {
    setCategory(categorySelect.value);
    convert();
  });

  unitFromSelect.addEventListener('change', convert);
  unitToSelect.addEventListener('change', convert);
  inputValue.addEventListener('input', convert);

  document.getElementById('swapUnits').addEventListener('click', () => {
    const temp = unitFromSelect.value;
    unitFromSelect.value = unitToSelect.value;
    unitToSelect.value = temp;
    convert();
  });

  calcAreaButton.addEventListener('click', calculateArea);
  widthValue.addEventListener('input', calculateArea);
  heightValue.addEventListener('input', calculateArea);
  lengthUnitSelect.addEventListener('change', calculateArea);
  areaUnitSelect.addEventListener('change', calculateArea);

  calcProportionButton.addEventListener('click', calculateProportion);
  propA.addEventListener('input', calculateProportion);
  propB.addEventListener('input', calculateProportion);
  propC.addEventListener('input', calculateProportion);

  inputValue.value = '1';
  widthValue.value = '1';
  heightValue.value = '1';
  propA.value = '1';
  propB.value = '1';
  propC.value = '1';

  convert();
  calculateArea();
  calculateProportion();

  setupCollapsibles();
}

window.addEventListener('DOMContentLoaded', init);
