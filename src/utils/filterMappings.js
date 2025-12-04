/**
 * Filter Mappings - Normalize and group dataset values
 * for consistent filtering across the application
 */

// Job Category Mapping - Normalize database values to standardized categories
export const jobCategoryMapping = {
  'Office Worker': [
    'Pegawai Kantoran',
    'Admin',
    'Staff',
    'Manager',
    'Director',
    'Office Worker',
    'Administration',
    'Management',
  ],
  'Field / Operations': [
    'Pekerja Lapangan',
    'Operasional',
    'Technician',
    'Driver',
    'Security',
    'Maintenance',
    'Mekanik',
    'Services',
    'Blue Collar',
    'blue-collar',
  ],
  'Self Employed': [
    'Wiraswasta',
    'Entrepreneur',
    'Business Owner',
    'Self Employed',
    'Self-employed',
    'Pengusaha',
    'Bisnis Sendiri',
    'Self-employment',
  ],
  'Student': [
    'Pelajar',
    'Mahasiswa',
    'Student',
    'School',
  ],
  'Homemaker': [
    'Ibu Rumah Tangga',
    'Housewife',
    'IRT',
  ],
  'Retired': [
    'Pensiunan',
    'Retired',
    'Pensioner',
  ],
  'Unemployed': [
    'Tidak Bekerja',
    'Pengangguran',
    'Unemployed',
    'Jobless',
  ],
  'Other': [
    'Lainnya',
    'Tidak diketahui',
    'Unknown',
    'Other',
    'N/A',
    '',
  ],
};

// Reverse mapping: database value → standardized category
export const getJobCategory = (dbValue) => {
  const normalizedValue = (dbValue || '').trim().toLowerCase();

  for (const [category, values] of Object.entries(jobCategoryMapping)) {
    if (values.some(v => v.toLowerCase() === normalizedValue)) {
      return category;
    }
  }

  // Jika tidak match, cek dengan partial matching (contains)
  for (const [category, values] of Object.entries(jobCategoryMapping)) {
    if (values.some(v => normalizedValue.includes(v.toLowerCase()) || v.toLowerCase().includes(normalizedValue))) {
      return category;
    }
  }

  return 'Other';
};// Education Level Mapping
export const educationMapping = {
  'Bachelor': [
    'Sarjana',
    'Bachelor',
    'S1',
    'University',
    'Universitas',
    'university.degree',
  ],
  'High School': [
    'SMA',
    'SMK',
    'High School',
    'Senior',
    'Sekolah Menengah',
    'high.school',
  ],
  'Elementary': [
    'SD',
    'Elementary',
    'Sekolah Dasar',
    'basic.4y',
    'basic.6y',
  ],
  'Junior High': [
    'SMP',
    'Middle School',
    'Sekolah Menengah Pertama',
    'basic.9y',
  ],
  'Illiterate': [
    'Illiterate',
    'Illiteracy',
    'Tidak Melek Huruf',
    'Buta Huruf',
  ],
  'Professional Course': [
    'Kursus',
    'Pelatihan',
    'Training',
    'Certification',
    'Course',
    'professional.course',
  ],
  'Unknown': [
    'Tidak diketahui',
    'Unknown',
    'N/A',
    '',
  ],
};

// Reverse mapping: database value → standardized education
export const getEducationLevel = (dbValue) => {
  const normalizedValue = (dbValue || '').trim();
  
  for (const [level, values] of Object.entries(educationMapping)) {
    if (values.some(v => v.toLowerCase() === normalizedValue.toLowerCase())) {
      return level;
    }
  }
  
  return 'Unknown';
};

// Marital Status Mapping - Simplified to 3 categories
export const maritalMapping = {
  'Single': [
    'Single',
    'Belum Menikah',
    'Lajang',
  ],
  'Married': [
    'Married',
    'Menikah',
    'Kawin',
  ],
  'Divorced': [
    'Divorced',
    'Cerai',
    'Cerai Hidup',
    'Cerai Mati',
    'Janda',
    'Duda',
    'Widowed',
  ],
};

// Reverse mapping: database value → standardized marital status
export const getMaritalStatus = (dbValue) => {
  const normalizedValue = (dbValue || '').trim();
  
  for (const [status, values] of Object.entries(maritalMapping)) {
    if (values.some(v => v.toLowerCase() === normalizedValue.toLowerCase())) {
      return status;
    }
  }
  
  return null;
};

// Age Range Categories
export const ageRanges = [
  { id: 'under25', label: '< 25', min: 0, max: 24 },
  { id: 'age25to35', label: '25–35', min: 25, max: 35 },
  { id: 'age36to45', label: '36–45', min: 36, max: 45 },
  { id: 'age46to59', label: '46–59', min: 46, max: 59 },
  { id: 'age60plus', label: '60+', min: 60, max: 150 },
];

// Check if age falls within range
export const getAgeRange = (age) => {
  const numAge = parseInt(age) || 0;
  const range = ageRanges.find(r => numAge >= r.min && numAge <= r.max);
  const result = range?.id || null;
  console.log(`getAgeRange(${age}) = ${numAge} → ${result}`);
  return result;
};

// Boolean filter options (Housing, Loan, etc.)
export const booleanFilterOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unknown', label: 'Unknown' },
];

// Filter label formatting
export const filterLabelMap = {
  age: 'Age',
  job: 'Job',
  education: 'Education',
  marital: 'Marital',
  housing: 'Housing',
  loan: 'Loan',
};

// Get display label for filter value
export const getFilterDisplayLabel = (filterType, value) => {
  switch (filterType) {
    case 'age':
      return ageRanges.find(r => r.id === value)?.label || value;
    case 'job':
      return value;
    case 'education':
      return value;
    case 'marital':
      return value;
    case 'housing':
    case 'loan':
      return booleanFilterOptions.find(o => o.value === value)?.label || value;
    default:
      return value;
  }
};
